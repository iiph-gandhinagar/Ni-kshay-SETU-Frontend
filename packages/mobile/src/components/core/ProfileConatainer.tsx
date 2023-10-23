import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import MapPin from 'react-native-vector-icons/MaterialIcons';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
interface ProfileConatainerProps {
  style?: any;
  ShowAppPerformance: boolean;
}
export const ProfileConatainer: React.FC<ProfileConatainerProps> = ({
  style,
  ShowAppPerformance = true,

}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const userDetails = useSelector(state => state?.user?.userData);
  const media = userDetails?.[0]?.media?.[0];
  return (
    <View style={[style]}>
      <LinearGradient
        colors={colors.Blue_Gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.TopContainer}>
        <View style={styles.ProfilePicContainer}>
          {media ?
            <Image
              source={{ uri: BASE_MEDIA_URL + media?.thumb_100 }}
              style={[styles.PhotoProfile, { borderColor: colors.Blue_Theme, backgroundColor: colors.Blue_Theme }]}
            />
            :
            <Icon
              name="account-circle"
              size={RFValue(90)}
              color={colors.cream}
            />
          }
          <Text style={[FontStyle.Nunito18Title, styles.NameText, { color: colors.ProfileColor }]}>{userDetails?.[0]?.name}</Text>
          {ShowAppPerformance ? (
            <View>
              <Text style={[FontStyle.Nunito15, { color: colors.whiteYellow, marginBottom: RFValue(5) }]}>
                App performance rank: {userDetails?.[0]?.level_title}
              </Text>
              <View style={styles.ProgressBarContainer}>
                <Progress.Bar
                  progress={userDetails?.[0]?.percentage / 100 || 0}
                  unfilledColor={colors.Grey_1}
                  color={colors.ORANGE}
                  borderWidth={0}
                  height={RFValue(5.12)}
                  width={null}
                  style={{ flex: 1, marginRight: RFValue(10) }}
                />
                <Text style={[FontStyle.Nunito12, { color: colors.whiteYellow }]}>
                  {parseFloat(userDetails?.[0]?.percentage).toFixed(2) || 0}%
                </Text>
              </View>
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={[FontStyle.Nunito16, styles.CadreText, { color: colors.ProfileColor }]}>{userDetails?.[0]?.cadre_title}</Text>
              <View style={styles.StateArea}>
                <MapPin
                  name="location-on"
                  size={RFValue(16)}
                  color={colors.ProfileColor}
                  style={{ marginRight: RFValue(5) }}
                />
                <Text style={[FontStyle.Nunito16, styles.CadreText, { color: colors.ProfileColor }]}>
                  {userDetails?.[0]?.state_title || userDetails?.[0]?.country_title}
                </Text>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  ProfilePicContainer: {
    // flex: 1.5,
    justifyContent: 'center',
    // borderRadius: 150,
    alignItems: 'center',
    marginTop: RFValue(30),
    paddingBottom: RFValue(34),
  },
  PhotoProfile: {
    width: RFValue(90),
    height: RFValue(90),
    borderRadius: RFValue(150),
    overflow: 'hidden',
    borderWidth: 1.5,
    elevation: RFValue(20),
  },
  NameText: {
    marginVertical: RFValue(3),
  },
  CadreText: {
    // marginBottom: RFValue(5),
  },
  AccountDetailsContainer: {
    // flex: 2.2,
    paddingTop: RFValue(24),
    paddingLeft: RFValue(25),
    paddingRight: RFValue(34),
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
  },
  TopContainer: {
    // flex: 1.3,
    paddingBottom: RFValue(30),
    // justifyContent: 'center',
    alignItems: 'center',
  },
  StateArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(24),
  },

  AccountHeading: {
    marginBottom: RFValue(14),
  },

  SupportArea: {
    marginTop: RFValue(30),
  },

  poweredbyCon: {
    flexDirection: 'row',
    marginTop: RFValue(50),
    marginBottom: RFValue(5),
    // justifyContent: 'space-between',
  },
  ProgressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: RFValue(40),
    marginBottom: RFValue(10),
  },
});
