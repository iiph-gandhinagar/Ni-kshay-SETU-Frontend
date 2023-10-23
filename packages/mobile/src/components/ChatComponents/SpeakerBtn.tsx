import { BASE_URL } from '@tb-frontend/shared/globles';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Sound from 'react-native-sound';
import { useSelector } from 'react-redux';
import RNBloblUtils from 'react-native-blob-util';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { appTheme } from '../../config/theme';
import { useTheme } from '@react-navigation/native';
import { themeProps } from '../../types';
interface Props {
    disabled: boolean;
    text: string;
    onSpeakerPlay: (play: boolean) => void;
}

export const SpeakerBtn: React.FC<Props> = ({
    disabled,
    onSpeakerPlay = () => null,
    text = '',
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    Sound.setMode('SpokenAudio');
    Sound.setActive(true);
    Sound.setCategory('SoloAmbient', false);
    const [isload, setload] = useState(false);
    const [play, setPlay] = useState(false);
    const [sound, setSound] = useState(null);
    const appLange = useSelector(state => state?.app?.appLang);
    const token = useSelector(state => state?.auth?.token);
    useEffect(() => {
        onSpeakerPlay(play);
    }, [play]);
    useEffect(() => {
        return () => {
            if (sound) { sound.release(); }
        };
    }, [sound]);
    return (
        <Pressable
            disabled={sound ? false : disabled}
            onPress={async () => {
                if (sound) {
                    setload(false);
                    setPlay(false);
                    sound.release();
                    setSound(null);
                } else {
                    Sound.setActive(!play);
                    setload(true);
                    setPlay(true);
                    const callback = (error: any, sound: any) => {
                        if (error) {
                            Sound.setActive(false);
                            setPlay(false);
                            setSound(null);
                            return null;
                        }
                        sound.play(() => {
                            setPlay(false);
                            setSound(null);
                            Sound.setActive(false);
                            // Success counts as getting to the end
                            // Release when it's done so we're not using up resources
                            sound.release();
                        });
                    };
                    try {
                        RNBloblUtils.config({
                            path: RNBloblUtils.fs.dirs.CacheDir + '/tbvoice',
                            fileCache: false,
                        })
                            .fetch(
                                'POST',
                                `${BASE_URL}get-text-to-speech`,
                                {
                                    lang: appLange,
                                    Authorization: 'Bearer ' + token,
                                    'Content-Type': 'application/json',
                                },
                                JSON.stringify({ text: text }),
                            )
                            .then(res => {
                                console.log('The file saved to ', res.path());
                                return (
                                    (Platform.OS === 'android' ? 'file://' : '') + res.path()
                                );
                            })
                            .then(path => {
                                setload(false);
                                const sound: any = new Sound(
                                    path,
                                    Platform.OS === 'ios' ? '' : Sound.MAIN_BUNDLE,
                                    error => callback(error, sound),
                                );
                                setSound(sound);
                            })
                            .catch(error => {
                                setload(false);
                                setPlay(false);
                                setSound(null);
                                console.log('RNFetchBlob', error);
                            });
                    } catch (error) {
                        setload(false);
                        setPlay(false);
                        setSound(null);
                        console.log('catch error', error);
                    }
                }
            }}
            style={styles.btn}>
            {isload ? (
                <ActivityIndicator size={'small'} color={colors.Blue_Theme} />
            ) : (
                <Icon
                    size={RFValue(25)}
                    name="volume-up"
                    color={play
                        ? colors.Blue_2
                        : disabled
                            ? colors.BorderColor
                            : colors.lightBlue3}
                />
            )}
        </Pressable>
    );
};

let styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
