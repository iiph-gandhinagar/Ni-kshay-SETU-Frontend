import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '@react-navigation/native';
import { getAppHelthStatusError, getFeedbackDetails } from '@tb-frontend/shared/Store/action/appActions';
import React, { useEffect, useState } from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../../types';
import { Button } from '../Button';
interface Props { }

export const AppBanner: React.FC<Props> = ({ }) => {
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const { colors } = useTheme() as unknown as themeProps;
  const netInfo = useNetInfo();
  const [isVisible, setVisible] = useState(false);
  const Status = useSelector(state => state?.app?.appStatus);
  const dispatch = useDispatch();
  const onBackdropPress = () => {
    if (Status?.alertCategory) {
      if (Status?.errorCode === 103 || Status?.errorCode === 202) {
        setVisible(false);
        dispatch(getFeedbackDetails({
          ismodal: true,
          val: 1,
        }));
      }
    }
    return null;
  };
  useEffect(() => {
    if (netInfo.isInternetReachable) {
      if (Status?.alertCategory) {
        if (
          Status?.errorCode === 426 ||
          Status?.errorCode === 103 ||
          Status?.errorCode === 202 ||
          Status?.errorCode === 503
        ) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      } else {
        setVisible(false);
      }
    } else {
      if (Status?.alertCategory) {
        setVisible(false);
        dispatch(getAppHelthStatusError({}));
      }
    }
  }, [Status, netInfo]);
  return Status?.alertCategory ? (
    <Modal
      coverScreen={false}
      isVisible={isVisible}
      onBackButtonPress={onBackdropPress}
      onBackdropPress={onBackdropPress}
      hasBackdrop={true}>
      <View style={[styles.item, { backgroundColor: colors.white }]}>
        <Text style={[FontStyle.RalewayTitle, { color: colors.black2 }]}>{Status?.errorMessage}</Text>
        {Status?.Update_size &&
          <Text style={[FontStyle.NunitoDate, styles.DownloadText, { color: colors.Grey_4 }]}>Download Size: {Status?.Update_size} MB</Text>}
        <Text style={[FontStyle.Nunito11semiBold, styles.UpdateAppText, { color: colors.Grey_3, marginTop: RFValue(25) }]}>
          {Status?.message?.value ||
            appTranslations.ERROR_503_MESSAGE ||
            'The server is temporarily down. try again later!'}
        </Text>
        {Status?.Update_size && <Text style={[styles.WhatsNewHeading, FontStyle.Nunito12, { color: colors.black }]}>What’s New!</Text>}
        {Status?.new_feature?.split('|')?.map((feature, i) => {
          return (
            <Text key={feature + i} style={[styles.UpdateAppText, { color: colors.Grey_3 }]}>
              {'\u2022'} {feature}
            </Text>
          );
        })}
        <View style={styles.ButtonContainer}>
          <Button
            buttonText={appTranslations.BTN_OK}
            onPress={() => {
              dispatch(getFeedbackDetails({
                ismodal: true,
                val: 1,
              }));
              setVisible(false);
            }}
            disabled={Status?.errorCode === 202 || Status?.severity == 'High'}
          />
          <View style={{ flex: 0.3 }} />
          {(Status?.errorCode === 426 || Status?.errorCode === 103) && (
            <Button
              buttonText={appTranslations.BTN_UPDATE_APP}
              onPress={() => {
                if (Platform.OS === 'android') {
                  Linking.openURL(
                    'https://play_store_URL',
                  );
                } else {
                  Linking.openURL(
                    'https://apps_store_URL',
                  );
                }
              }}
            />)}
        </View>
      </View>
    </Modal>
  ) : null;
};

export default AppBanner;


const styles = StyleSheet.create({
  item: {
    borderRadius: RFValue(5),
    padding: RFValue(15),
    justifyContent: 'center',
  },
  DownloadText: {
    marginTop: RFValue(5),
  },
  UpdateAppText: {
    marginBottom: RFValue(15),

  },
  WhatsNewHeading: {
    marginBottom: RFValue(15),
  },
  ButtonContainer: {
    flexDirection: 'row',
    marginTop: RFValue(20),
  },
});
