import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Appearance, Image, Platform, Pressable, Text, View, ViewStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';
import Lottie from 'lottie-react-native';


interface ChatBotLogoProps {
    onPress: () => void;

}
export const ChatBotLogo: React.FC<ChatBotLogoProps> = ({
    onPress = () => null,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    const [count, setCount] = useState(0);
    const [style, setStyle] = useState({
        bottom: '5%',
        right: 5,
    });
    useEffect(() => {
        if (count % 4 == 0) {
            setStyle({
                bottom: '5%',
                right: 5,
            });

        } else if (count % 4 == 1) {
            setStyle({
                top: '5%',
                right: 5,
            });
        }
        else if (count % 4 == 2) {
            setStyle({
                top: '5%',
                left: 5,
            });
        } else {
            setStyle({
                bottom: '5%',
                left: 5,
            });
        }
    }, [count]);
    return (
        <Pressable
            style={[{
                zIndex: Platform.OS == 'android' ? 10000000000000000000 : 100, position: 'absolute',
            }, style]}
            onLongPress={() => {
                setCount(old => old + 1);
            }}
            onPress={onPress}>
            <Image style={{ height: RFValue(70), width: RFValue(70) }}
                source={Appearance.getColorScheme() === 'dark' ? require('../../assets/ChatbotB.png') : require('../../assets/ChatbotW.png')} />
            <Lottie
                loop
                autoPlay
                style={{
                    borderRadius: RFValue(190),
                    overflow: 'hidden',
                }}
                source={require('../../assets/Animations/chatBot3.json')} />
        </Pressable>
    );
};









