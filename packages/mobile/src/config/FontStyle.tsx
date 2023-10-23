import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { appTheme } from './theme';

export const FontStyle = StyleSheet.create({
    Nunito15: {
        fontFamily: appTheme.fontFamily.NunitoRegular,
        fontSize: RFValue(15),
        lineHeight:Platform.OS == 'android' ? RFValue(22.5) : 0,
        textAlignVertical: 'center',
    },
    Nunito16: {
        fontFamily: appTheme.fontFamily.NunitoMedium,
        fontSize: RFValue(16),
        lineHeight:Platform.OS == 'android' ? RFValue(24) : 0,
        textAlignVertical: 'center',
    },
    Nunito11: {
        fontFamily: appTheme.fontFamily.NunitoMedium,
        fontSize: RFValue(11),
        lineHeight:Platform.OS == 'android' ? RFValue(14.45) : 0,
        textAlignVertical: 'center',
    },
    Nunito11semiBold: {
        fontFamily: appTheme.fontFamily.NunitoSemiBold,
        fontSize: RFValue(11),
        lineHeight:Platform.OS == 'android' ? RFValue(14.45) : 0,
        textAlignVertical: 'center',
    },
    Nunito12: {
        fontFamily: appTheme.fontFamily.NunitoRegular,
        fontSize: RFValue(12),
        lineHeight:Platform.OS == 'android' ? RFValue(18) : 0,
        textAlignVertical: 'center',
    },
    Nunito18Title: {
        fontFamily: appTheme.fontFamily.NunitoSemiBold,
        fontSize: RFValue(18),
        lineHeight:Platform.OS == 'android' ? RFValue(27) : 0,
        textAlignVertical: 'center',
    },
    NunitoDate: {
        fontFamily: appTheme.fontFamily.NunitoLightItalic,
        fontSize: RFValue(8),
        lineHeight:Platform.OS == 'android' ? RFValue(10.51) : 0,
        textAlignVertical: 'center',
    },
    NunitoDate11: {
        fontFamily: appTheme.fontFamily.NunitoLightItalic,
        fontSize: RFValue(11),
        lineHeight:Platform.OS == 'android' ? RFValue(14.45) : 0,
        textAlignVertical: 'center',
    },
    Heading4: {
        fontFamily: appTheme.fontFamily.NunitoMedium,
        fontSize: RFValue(25),
        lineHeight:Platform.OS == 'android' ? RFValue(34.1) : 0,
        textAlignVertical: 'center',
    },
    RalewayTitle: {
        fontFamily: appTheme.fontFamily.RalewaySemiBold,
        fontSize: RFValue(15),
        lineHeight:Platform.OS == 'android' ? RFValue(22.5) : 0,
        textAlignVertical: 'center',
    },
    RalewayText12: {
        fontFamily: appTheme.fontFamily.RalewaySemiBold,
        fontSize: RFValue(12),
        lineHeight:Platform.OS == 'android' ? RFValue(18) : 0,
        textAlignVertical: 'center',
    },
    Raleway18: {
        fontFamily: appTheme.fontFamily.RalewaySemiBold,
        fontSize: RFValue(18),
        lineHeight:Platform.OS == 'android' ? RFValue(27) : 0,
        textAlignVertical: 'center',
    },
    Raleway20Bold: {
        fontFamily: appTheme.fontFamily.RalewayBold,
        fontSize: RFValue(20),
        lineHeight:Platform.OS == 'android' ? RFValue(30) : 0,
        textAlignVertical: 'center',
    }, Raleway18Bold: {
        fontFamily: appTheme.fontFamily.RalewayBold,
        fontSize: RFValue(18),
        lineHeight:Platform.OS == 'android' ? RFValue(20) : 0,
        textAlignVertical: 'center',
    },
    Raleway22: {
        fontFamily: appTheme.fontFamily.RalewaySemiBold,
        fontSize: RFValue(22),
        lineHeight:Platform.OS == 'android' ? RFValue(33) : 0,
        textAlignVertical: 'center',
    },
    Raleway18ExtraBlod: {
        fontFamily: appTheme.fontFamily.RalewayExtraBold,
        fontSize: RFValue(18),
        lineHeight:Platform.OS == 'android' ? RFValue(27) : 0,
        textAlignVertical: 'center',
    },
});
