import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator, Image, Pressable,
  StyleSheet,
  Text, TextStyle, View,
  ViewStyle,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  default as Icon,
} from 'react-native-vector-icons/Feather';
import {
  default as MaterialIcon,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';

interface Props {
  onPress: () => void;
  buttonText: string;
  testID?: string;
  disabled?: boolean;
  style?: ViewStyle;
  loader?: boolean;
  textStyle?: TextStyle;
  leftIcon?: boolean;
  rightIcon?: boolean;
}

export const Button: React.FC<Props> = ({
  onPress = () => null,
  buttonText,
  disabled = false,
  style = {},
  loader = false,
  textStyle = {},
  leftIcon = false,
  rightIcon = false,
  testID = 'testID',
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable
      testID={testID}
      style={[
        disabled || loader ? styles.btnDisabledStyles : styles.btnStyles,
        {
          borderColor: colors.Blue_2,
          backgroundColor: colors.Blue_2,
        },
        style,
      ]}
      disabled={disabled || loader == true}
      onPress={onPress}>
      {loader ? (
        <ActivityIndicator
          size="small"
          color={colors.purple_light}
        />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {leftIcon ?
            <Icon
              name="chevrons-left"
              size={RFValue(18)}
              color={colors.purple_light}
              style={{ marginRight: RFValue(6), marginTop: RFValue(3) }}
            /> : null}
          <Text
            style={[
              FontStyle.RalewayTitle,
              { color: colors.purple_light }, textStyle,
            ]}>
            {buttonText}
          </Text>
          {rightIcon ?
            <Icon
              name="chevron-right"
              size={RFValue(18)}
              color={colors.purple_light}
              style={{ marginLeft: RFValue(6), marginTop: RFValue(3) }}
            /> : null}
        </View>
      )}
    </Pressable>
  );
};


interface Props1 {
  onPress: () => void;
  buttonText: string;
  disabled?: boolean;
  style?: ViewStyle;
  Textstyle?: TextStyle;
}

export const Button1: React.FC<Props1> = ({
  onPress = () => null,
  buttonText,
  disabled = false,
  style = {},
  Textstyle = {},
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <View style={[styles.BtnContainer,
      { backgroundColor: disabled ? colors.Grey_4 : colors.tealGreen, shadowColor: colors.tealGreen }, style]}>
        <Text style={[FontStyle.RalewayText12, { color: colors.white, marginBottom: RFValue(3) }, Textstyle]}>
          {buttonText}
        </Text>
      </View>
    </Pressable>
  );
};
interface DirectionButtonProps {
  onPress: () => void;
  buttonText?: string;
  style?: ViewStyle;
}

export const DirectionButton: React.FC<DirectionButtonProps> = ({
  onPress = () => null,
  buttonText = 'Direction',
  style = {},

}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={[styles.DirectionBtnContainer, { backgroundColor: colors.Card_Gradian }, style]}>
          <MaterialIcon
            name="directions"
            size={RFValue(20)}
            color={colors.white}
          />
          <Text style={[FontStyle.RalewayText12, styles.DirectionTxt, { color: colors.white }]}>{buttonText}</Text>
        </View>
      </Pressable>
    </>
  );
};




interface CertificateButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
}
export const CertificateButton: React.FC<CertificateButtonProps> = ({
  onPress = () => null,
  title = '',
  style = {},
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <>
      <Pressable style={{ flex: 1 }} onPress={onPress}>
        <View
          style={[styles.BottomConatiner, style, { backgroundColor: colors.headerBackground, borderColor: colors.primary }]}>
          <Image
            source={require('../../assets/certi.png')}
            style={styles.Img}
          />

          <Text
            style={[FontStyle.Raleway18, styles.CompletionAssText,
            { color: colors.headertext },
            ]}
          >{title}
          </Text>
        </View>
      </Pressable>
    </>
  );
};






let styles = StyleSheet.create({
  btnStyles: {
    borderRadius: RFValue(5),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(34),
    borderWidth: 1,
    justifyContent: 'center',
    opacity: 1,
  },
  btnDisabledStyles: {
    borderRadius: RFValue(5),
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(34),
    borderWidth: 1,
    justifyContent: 'center',
    opacity: 0.5,
  },
  BtnContainer: {
    alignSelf: 'flex-end',
    padding: RFValue(5),
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(5),
    elevation: 8,
    alignItems: 'center',
  },
  BottomConatiner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: RFValue(5),
    borderRadius: RFValue(7),
    borderWidth: 1,
    marginHorizontal: RFValue(5),
    marginVertical: RFValue(30),
  },
  Img: {
    height: RFValue(30),
    width: RFValue(30),
    marginVertical: RFValue(5),
  },
  CompletionAssText: {
    marginHorizontal: RFValue(10),
  },
  DirectionBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: RFValue(20),
    padding: RFValue(5),
    margin: RFValue(5),
    paddingLeft: RFValue(10),
  },
  DirectionTxt: {
    marginHorizontal: RFValue(10),
    textAlign: 'center',
    alignSelf: 'center',
  },
});
