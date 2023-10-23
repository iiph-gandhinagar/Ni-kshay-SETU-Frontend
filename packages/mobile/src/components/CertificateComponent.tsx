import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Props } from 'react-native-tab-view/lib/typescript/TabBarItem';
import { useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { appTheme } from '../config/theme';
import { appConfigTypes, themeProps } from '../types';


interface Props {
    onPress?: () => void;
    title: string;
}

export const CertificateComponent: React.FC<Props> = ({
    onPress = () => null,
    title = '',


}) => {
    const { colors } = useTheme() as unknown as themeProps;
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
      );
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.Container,appTheme.themes.iosShadow ,{ backgroundColor: colors.certiSubHeaderBack }]}>
                <View style={[styles.subContainer, { backgroundColor: colors.certificateHeaderBack }]}>
                    <Text style={[FontStyle.RalewayTitle, styles.Txt, { color: colors.certificateHeader }]}>{appTranslations?.COMPLETION_CERTIFICATE}</Text>
                    <Image
                        style={styles.img}
                        source={require('../assets/ribbon.png')} />
                </View>
                <Text style={[FontStyle.Nunito16, styles.Txt, { color: colors.certiSubHeaderTitle }]}>{title}</Text>
            </View>
        </Pressable>

    );
};





let styles = StyleSheet.create({
    Container:
    {
        marginHorizontal: RFValue(10),
        marginTop: RFValue(30),
        borderRadius: RFValue(5),
        elevation: RFValue(5),
        paddingBottom: RFValue(15),
    },
    subContainer:
    {
        padding: RFValue(5),
        justifyContent: 'space-between',
        marginBottom: RFValue(15),
        borderTopLeftRadius: RFValue(5),
        borderTopRightRadius: RFValue(5),
        flexDirection: 'row',
    },


    Txt: { alignSelf: 'center', textAlign: 'center' },
    img: {
        height: RFValue(55),
        width: RFValue(55),
        marginTop: RFValue(-25),
    },
});
