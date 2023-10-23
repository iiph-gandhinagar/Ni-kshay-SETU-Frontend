import { appTheme } from './theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const baseFontStyle = {
  fontSize: RFValue(14),
  color: 'black',
  padding: 0,
  margin: 0,
  fontFamily: appTheme.fontFamily.NunitoRegular,
  paddingBottom: RFValue(4),
};

export const p = {
  fontSize: RFValue(16),
  padding: 0,
  margin: 0,
  fontFamily: appTheme.fontFamily.NunitoRegular,
  paddingBottom: RFValue(4),
  textAlign: 'justify',
};

export const span = {
  fontSize: RFValue(16),
  color: 'black',
  padding: 0,
  margin: 0,
  fontFamily: appTheme.fontFamily.NunitoRegular,
  paddingBottom: RFValue(4),
  // textAlign: 'justify',
};

export const em = {
  fontSize: RFValue(16),
  padding: 0,
  margin: 0,
  fontFamily: appTheme.fontFamily.NunitoItalic,
  paddingBottom: RFValue(4),
  lineHeight: RFValue(21),
  // textAlign: 'justify',
};

export const ul = {
  fontSize: RFValue(24),
  fontFamily: appTheme.fontFamily.NunitoRegular,
};

export const li = {
  fontSize: RFValue(16),
  color: 'black',
  padding: RFValue(0),
  fontFamily: appTheme.fontFamily.NunitoRegular,
  // lineHeight: RFValue(19),
};

export const strong = {
  fontSize: RFValue(18),
  fontFamily: appTheme.fontFamily.NunitoRegular,
};

export const tableStyles = {
  // maxWidth: '90%',
  // borderRadius: RFValue(4),
  borderWidth: 1,
  // marginBottom: RFValue(24),
};

export const img = {
  height: RFValue(50),
  width: RFValue(50),
};
export const a = {
  fontSize: RFValue(16),
  fontFamily: appTheme.fontFamily.NunitoRegular,
};

export const iframe = {
  alignSelf: 'center',
  padding: RFValue(12),
  maxWidth: '100%',
  maxHeight: '100%',
};
