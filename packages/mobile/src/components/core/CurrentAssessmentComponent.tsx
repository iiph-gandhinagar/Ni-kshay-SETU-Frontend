import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  default as Icon,
} from 'react-native-vector-icons/Feather';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';

interface Props {
  Quetions: number;
  min: number;
  FutureAssessment?: boolean;
  IsBtnDisable?: boolean;
  headerTitle: string;
  ReleasesDateTime?: string;
  BtnName?: string;
  onPress?: () => void;
}

export const AssessmentListCard: React.FC<Props> = ({
  Quetions = '00',
  min = '00',
  headerTitle = '',
  ReleasesDateTime = '',
  BtnName = 'Start Now',
  FutureAssessment = false,
  IsBtnDisable = false,
  onPress = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View style={[styles.Container, { backgroundColor: colors.cardBackground }]}>
      {FutureAssessment ? (<View style={[styles.futureContainer, { backgroundColor: colors.Grey_4 }]}>
        <Text style={[FontStyle.RalewayText12, styles.futureText, { color: colors.white }]}>{ReleasesDateTime}</Text>
      </View>) : null}
      <View style={{ padding: RFValue(10) }}>
        <ImageBackground source={require('../../assets/AssessmentBg.png')} resizeMode="contain" style={styles.ImageBackground} />
        <Text style={[FontStyle.Raleway18, { color: colors.assessmentTitle }]}>{headerTitle}</Text>
        <View style={styles.SubContainer}>
          <View style={[styles.QusContainer, { backgroundColor: colors.assessPointBackground }]}>
            <Text style={[FontStyle.Nunito11, { color: colors.assessPointText }]}>{Quetions} Quetions</Text>
          </View>

          <View style={[styles.MinContainer, { backgroundColor: colors.assessPointBackground }]}>
            <Icon
              name="clock"
              size={RFValue(15)}
              color={colors.green} />
            <Text style={[FontStyle.Nunito11, { color: colors.assessPointText, paddingStart: RFValue(3) }]}>{min} min.</Text>
          </View>
        </View>

        <Pressable disabled={IsBtnDisable} onPress={onPress}>
          <View style={[styles.BtnContainer, { backgroundColor: IsBtnDisable ? colors.Grey_4 : colors.tealGreen, shadowColor: IsBtnDisable ? colors.Grey_3 : colors.tealGreen }]}>
            <Text style={[FontStyle.RalewayText12, { color: colors.white, marginBottom: RFValue(3) }]}>{BtnName}</Text>
          </View>
        </Pressable>

      </View>
    </View>
  );
};
let styles = StyleSheet.create({
  Container: {
    elevation: RFValue(5),
    borderRadius: RFValue(4),
    flex: 1,
    margin: RFValue(10),
    marginBottom: RFValue(20),
    minHeight: RFValue(145),
    overflow: 'hidden',
  },
  ImageBackground: {
    position: 'absolute',
    alignSelf: 'flex-end',
    height: RFValue(115), width: RFValue(110),
  },
  SubContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginVertical: RFValue(10),
  },
  QusContainer: {
    padding: RFValue(5),
    borderRadius: RFValue(5),
    justifyContent: 'center',
  },
  MinContainer: {
    padding: RFValue(5),
    borderRadius: RFValue(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: RFValue(10),
  },
  BtnContainer: {
    alignSelf: 'flex-end',
    padding: RFValue(5),
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(5),
    elevation: 8,
    alignItems: 'center',
  },
  futureContainer: {
    padding: RFValue(5),
  },
  futureText: {
    alignSelf: 'center',
  },
});
