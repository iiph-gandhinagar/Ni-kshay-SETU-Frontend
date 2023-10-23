import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FormInput, FormPicker } from '../../components/core/input';
import { FontStyle } from '../../config/FontStyle';
import { appTheme } from '../../config/theme';
import { appConfigTypes, themeProps } from '../../types';
interface Props {
  children: PropTypes.ReactNodeLike | PropTypes.ReactElementLike;
  data: any;
  Answer: any;
  onChangeText: (e: string | number) => void;
}

export const LabInvestigationCard: React.FC<Props> =
  ({
    data = {},
    Answer = {},
    onChangeText = () => null,
  }) => {
    const { colors } = useTheme() as unknown as themeProps;
    const appTranslations: appConfigTypes = useSelector(
      state => state?.app?.appTranslations,
    );
    return (
      <View style={styles.LabInvestigationCardContainer}>
        <Image
          source={data?.image}
          style={{ height: RFValue(32), width: RFValue(32) }}
          resizeMode="center"
        />
        <View style={styles.Details}>
          {data.type == 'dropDown' ? (
            <>
              <FormPicker
                label={'Select'}
                header={appTranslations[data?.title]}
                allowEmpty={true}
                options={data?.items?.split(',')?.map((data, id) => {
                  return {
                    id: id,
                    name: data,
                    value: data,
                  };
                })}
                value={Answer?.value}
                onChangeValue={itemValue =>
                  onChangeText(itemValue, data.id)
                }
                style={{ marginBottom: 0 }}
              />
              <View style={styles.LabInvestigationCardSubTitleContainer}>

                <Text style={[styles.LabInvestigationCardSubTitle, FontStyle.RalewayText12, { color: colors.Card_Gradian }]}>
                  {data?.subtitle}:
                </Text>
                <Text
                  style={[
                    styles.LabInvestigationCardSubTitle,
                    FontStyle.Nunito12,
                    { color: colors.Card_Gradian, flex: 1 },
                  ]}>
                  {data.range}
                </Text>
              </View>
            </>

          ) : data.type == 'inputRang' ? null : (
            <>
              <FormInput
                value={Answer?.value}
                onChangeText={text => onChangeText(text, data.id)}
                header={appTranslations[data?.title]}
                style={{ marginBottom: 0 }}
              />
              <View style={styles.LabInvestigationCardSubTitleContainer}>

                <Text style={[styles.LabInvestigationCardSubTitle, FontStyle.RalewayText12, { color: colors.Card_Gradian }]}>
                  {data?.subtitle}:
                </Text>
                <Text
                  style={[
                    styles.LabInvestigationCardSubTitle,
                    FontStyle.Nunito12,
                    { color: colors.Card_Gradian, flex: 1 },
                  ]}>
                  {data.range}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  LabInvestigationCardContainer: {
    flexDirection: 'row',
    // backgroundColor: 'cyan',
    marginBottom: RFValue(24),
    alignItems: 'center',
  },
  Image: { height: RFValue(64), width: RFValue(64) },
  Details: { paddingLeft: RFValue(4), flex: 1 },
  LabInvestigationCardTitle: {
    marginBottom: RFValue(8),
  },
  LabInvestigationCardSubTitleContainer: { flexDirection: 'row', justifyContent: 'flex-end', flex: 1 },
  LabInvestigationCardSubTitle: {
    marginVertical: RFValue(8),
    marginLeft: RFValue(8),
    // textAlign: 'right',
  },
  textBox: {
    borderWidth: 1,
    height: RFValue(50),
    borderColor: '#DADADA',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    // backgroundColor: '#fff',
    color: appTheme.colors.colorDark1,
    fontSize: RFValue(14),
    fontFamily: appTheme.fontFamily.OpenSansRegular,
    padding: RFValue(15),
  },
  ErrorText: {
    fontFamily: appTheme.fontFamily.OpenSansRegular,
    fontSize: RFValue(12),
    color: appTheme.colors.error,
    marginTop: RFValue(3),
  },
});
