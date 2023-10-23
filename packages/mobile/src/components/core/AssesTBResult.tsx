import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Fontisto';
import { useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';


interface Props {
  max: number;
}
interface colorResultProps {
  color: string;
  type: string | number;
  DataType: string | number;
  name: string;
  style: ViewStyle
}
export const ColorResult: React.FC<colorResultProps> = ({ color, type, DataType, name, style = {} }) => {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: RFValue(158),
          backgroundColor: color,
          paddingVertical: RFValue(6),
          paddingHorizontal: RFValue(5),
          ...style,
        }}
      >
        <Text
          style={[FontStyle.RalewayText12, {
            textAlign: 'right', color: '#000',
          }]}>
          {appTranslations[name] || name}
        </Text>
      </View>
      {type === DataType && (
        <View style={{ justifyContent: 'center' }} >
          <Icon
            name="caret-left"
            size={RFValue(20)}
            color={colors.Blue_Theme}
          />
        </View>
      )}
    </View>


  );
};
export const AssesTBResult: React.FC<Props> = ({
  max = 0,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const Result = [
    {
      name: 'Differentiated_Care_Normal_Risk',
      color: '#51F16B',
      type: 0,
    },
    {
      name: 'Differentiated_Care_Low_Risk',
      color: '#F8E74F',
      type: 1,
    },
    {
      name: 'Differentiated_Care_Moderate_Risk',
      color: '#FFC56D',
      type: 2,
    },
    {
      name: 'Differentiated_Care_High_Risk',
      color: '#FF5F5F',
      type: 3,
    },
  ];
  return (
    <View style={styles.container}>

      <View style={[styles.BmiCard,
      { borderColor: colors.Card_Gradian, backgroundColor: colors.purple_light }]}>
        <Text style={[FontStyle.RalewayTitle, { color: colors.Blue_Theme, textAlign: 'center', marginBottom: RFValue(15) }]} >
          {appTranslations.Differentiated_Care_Result_Thanks_Message}
        </Text>
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: RFValue(10) }}>
          <View
            style={{
              borderRadius: RFValue(5),
              overflow: 'hidden',
            }}>
            {Result.map((data, i) => {
              return (
                <ColorResult
                  key={data?.type}
                  style={{
                    borderTopEndRadius: i == 0 ? RFValue(5) : 0,
                    borderBottomEndRadius: i == 3 ? RFValue(5) : 0,
                  }}
                  DataType={data?.type} color={data?.color} type={max} name={data?.name} />
              );
            })}
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={[FontStyle.Raleway18, { color: colors.labText, textAlign: 'center' }]}>
              {appTranslations[Result.find(e => e.type == max)?.name]}
            </Text>
          </View>
        </View>
        <Text style={[FontStyle.Nunito12, { textAlign: 'center', color: colors.Blue_2 }]}>
          {max >= 3
            ? appTranslations?.Differentiated_Care_Result_3
            : max == 2
              ? appTranslations?.Differentiated_Care_Result_2
              : appTranslations?.Differentiated_Care_Result_1}
        </Text>
      </View>
    </View>
  );
};
interface AssesTBResultCardProps {
  title: string;
  score: string | number;
  value: string;
}
export const AssesTBResultCard: React.FC<AssesTBResultCardProps> = ({
  title = '',
  score = 'No Data',
  value = 'No Data',
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View style={[styles.Container,
    {
      backgroundColor: colors.dropDownBack,
      shadowColor: score == "3" ? '#FF5F5F' : score == "2" ? '#FFC56D' : score == "1" ? '#F8E74F' : colors.black,
      borderColor: score == "3" ? '#FF5F5F' : score == "2" ? '#FFC56D' : score == "1" ? '#F8E74F' : colors.dropDownBack
    }]}>
      <Text style={[FontStyle.RalewayTitle, styles.Title, { color: colors.tealGreen }]}>{title}</Text>
      <View style={{ flexDirection: 'row', marginBottom: RFValue(10) }}>
        <Text style={[FontStyle.Nunito11, { color: colors.dropDownText }]}>Score : </Text>
        <Text style={[FontStyle.Nunito12, { color: value == 'No Data' ? colors.Notification_red : colors.Blue_2, flex: 1 }]}>{score}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[FontStyle.Nunito11, { color: colors.dropDownText }]}>Value : </Text>
        <Text style={[FontStyle.Nunito12, { color: value == 'No Data' ? colors.Notification_red : colors.Blue_2, flex: 1 }]}>{value}</Text>
      </View>
    </View>
  );
};
let styles = StyleSheet.create({
  Container: {
    height: RFValue(139),
    padding: RFValue(5),
    elevation: RFValue(8),
    borderRadius: RFValue(5),
    marginBottom: RFValue(15),
    borderWidth: 1
  },
  Title: {
    flex: 1,
    paddingHorizontal: RFValue(3),
    textAlign: 'center',
  },
  value: {
    textAlign: 'center',
  },
  container: {
    // marginTop: RFValue(64),
    flex: 1,
  },
  BmiText: {
    textAlign: 'center',
    // flex: 1,
    // marginBottom: RFValue(37),
  },
  image: {
    width: RFValue(20),
    height: RFValue(20),
  },
  BmiCard: {
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(25),
    marginTop: RFValue(20),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
    flex: 1,
  },
});
