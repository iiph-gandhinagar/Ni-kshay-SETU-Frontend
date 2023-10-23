import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Fontisto';
import { useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';


interface Props {
  user_bmi: string;
  type: string;
}

export const BmiResult: React.FC<Props> = ({
  user_bmi = '',
  type = '',
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const bmi = [
    {
      name: appTranslations.OBESE,
      color: '#FF906D',
      type: 'Obese',
    },
    {
      name: appTranslations.OVERWEIGHT,
      color: '#F8E74F',
      type: 'Overweight',
    },
    {
      name: appTranslations.NORMAL,
      color: '#51F16B',
      type: 'Normal',
    },
    {
      name: appTranslations.MILD_UNDERWEIGHT,
      color: '#62C6E5',
      type: 'Mild Underweight',
    },
    {
      name: appTranslations.MODERATE_UNDERWEIGHT,
      color: '#FFC56D',
      type: 'Moderately Underweight',
    },
    {
      name: appTranslations.SEVERE_UNDERWEIGHT,
      color: '#AF7B2D',
      type: 'Severely Underweight',
    },
    {
      name: appTranslations.EXTREME_UNDERWEIGHT,
      color: '#FF6666',
      type: 'Extremely Underweight',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={[styles.BmiCard, { flex: 1, flexDirection: 'row', borderColor: colors.Card_Gradian, backgroundColor: colors.purple_light }]}>
        <View
          style={{
            flexDirection: 'column-reverse',
            width: RFValue(178),
          }}>
          {bmi.map((data, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                }}
                key={i}
              >
                <View
                  style={[styles.BmiComponent, {
                    backgroundColor: data.color,
                    borderBottomLeftRadius: i === 0 ? RFValue(5) : 0,
                    borderBottomRightRadius: i === 0 ? RFValue(5) : 0,
                    borderTopLeftRadius: (i === bmi.length - 1) ? RFValue(5) : 0,
                    borderTopRightRadius: (i === bmi.length - 1) ? RFValue(5) : 0,
                  }]}
                >
                  <Text
                    style={[FontStyle.RalewayText12, {
                      textAlign: 'right', color: colors.white,
                    }]}>
                    {data.name}
                  </Text>
                </View>
                {type === data.type && (
                  <Icon
                    name="caret-left"
                    size={RFValue(20)}
                    color={colors.Blue_Theme}
                  />
                )}
              </View>
            );
          })}
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[FontStyle.Raleway18, styles.BmiText, { color: colors.Blue_Theme }]}>
            BMI
          </Text>
          <Text style={[FontStyle.Nunito11, styles.BmiText, { color: colors.black2 }]}>(Body Mass Index)
          </Text>
          <Text style={[FontStyle.Nunito16, styles.BmiText, { color: colors.Card_Gradian, marginTop: RFValue(5) }]}>
            {parseFloat(user_bmi).toPrecision(4)} kg/m2
          </Text>
        </View>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BmiText: {
    textAlign: 'center',
  },
  image: {
    width: RFValue(20),
    height: RFValue(20),
  },
  BmiCard: {
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(10),
    marginHorizontal: RFValue(24),
    marginBottom: RFValue(39),
    marginTop: RFValue(20),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),

  },
  BmiComponent: {
    width: RFValue(158),
    paddingVertical: RFValue(6),
    paddingHorizontal: RFValue(5),

  },
});
