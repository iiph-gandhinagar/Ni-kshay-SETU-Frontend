import { useTheme } from '@react-navigation/native';
import { setNotificationPop } from '@tb-frontend/shared/Store/action/appActions';
import Lottie from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import Sound from 'react-native-sound';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
interface Props {
  ShowTitle?: boolean;
  ShowsubDescription?: boolean;
  Description2?: string;
}
export const NotificationPopUp: React.FC<Props> = ({
  ShowTitle = true,
  ShowsubDescription = false,
  Description2 = '',
}) => {
  const [isModalVisible, setModal] = useState(false);
  const [isLevelUnlock, setLevelUnlock] = useState(false);
  const [isAllLevel, setAllLevel] = useState(false);
  const { notificationObj } = useSelector(state => state?.app);
  const [sound, setSound] = useState(null);
  const { colors } = useTheme() as unknown as themeProps;
  const dispatch = useDispatch();
  Sound.setMode('SpokenAudio');
  Sound.setActive(true);
  Sound.setCategory('Playback');
  const close = () => {
    setSound(null);
    setModal(false);
    dispatch(setNotificationPop({}));
  };
  useEffect(() => {
    if (notificationObj) {
      if (notificationObj?.data?.old_badge && notificationObj?.data?.old_level && notificationObj?.data?.current_badge && notificationObj?.data?.current_level) {
        console.log('notificationObj', notificationObj?.data?.old_badge, notificationObj?.data?.current_badge);
        console.log('notificationObj', notificationObj?.data?.old_level, notificationObj?.data?.current_level);
        if (notificationObj?.data?.old_level !== notificationObj?.data?.current_level) {
          setLevelUnlock(true);
        } else {
          if ((notificationObj?.data?.old_level === notificationObj?.data?.current_level) && (notificationObj?.data?.old_badge == notificationObj?.data?.current_badge)) {
            setAllLevel(true);
          } else {
            setLevelUnlock(false);
          }
        }
        setModal(true);
        const callback = (error: any, sound: any) => {
          if (error) {
            Sound.setActive(false);
            setSound(null);
            return null;
          }
          sound.play(() => {
            setSound(null);
            Sound.setActive(false);
            sound.release();
          });
        };
        const sound: any = new Sound(
          'clap.wav',
          Platform.OS === 'ios' ? '' : Sound.MAIN_BUNDLE,
          error => callback(error, sound),
        );
        setSound(sound);
      }
    }

  }, [notificationObj]);
  useEffect(() => {
    return () => {
      if (sound) { sound.release(); }
    };
  }, [sound]);

  return (
    <Modal
      coverScreen={false}
      animationIn={'bounceInLeft'}
      animationOut={'bounceOutRight'}
      onBackdropPress={close}
      onBackButtonPress={close}
      isVisible={isModalVisible}>
      <View
        style={[styles.Container, { backgroundColor: colors.white }]}>
        <View
          style={styles.Anim}>
          {isAllLevel ?
            <Lottie
              autoPlay
              source={require('../../../assets/Animations/winner.json')}
            /> :
            <Lottie
              autoPlay
              source={
                isLevelUnlock ? require('../../../assets/Animations/trophy-badge-award.json')
                  : notificationObj?.data?.old_badge == 'Bronze' ?
                    require('../../../assets/Animations/Medalbr.json')
                    : require('../../../assets/Animations/Medalsilver.json')
              }
            />}
        </View>
        <View
          style={styles.SubContainer}
        />
        {ShowTitle ? (
          <Text
            style={[FontStyle.Heading4, { color: colors.secondary }]}>
            {isLevelUnlock ? 'Level Unlocked!' :
              'Congratulations!'
            }
          </Text>
        ) : null}
        <Text
          style={[FontStyle.Raleway18, styles.DescriptionTxt, { color: colors.Blue_2 }]}>
          {isAllLevel ? 'You have achieved all the level in leaderboard' :
            isLevelUnlock ? 'You have achived all three medals in ' + notificationObj?.data?.old_level + ' Level and unlocked ' + notificationObj?.data?.current_level + ' Level' :
              'You have achived a ' + notificationObj?.data?.old_badge + ' medal in ' + notificationObj?.data?.current_level + ' Level'
          }
        </Text>
        {ShowsubDescription ? (
          <Text
            style={[FontStyle.Raleway18, { textAlign: 'center', color: colors.Blue_2 }]}>
            {Description2}
          </Text>
        ) : null}

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: RFValue(10),
    minHeight: RFValue(360),
    borderRadius: RFValue(6),
    alignItems: 'center',
  },
  Anim: {
    height: RFValue(190),
    width: RFValue(195),
  },
  SubContainer: {
    alignSelf: 'flex-end',
    padding: RFValue(5),
  },
  DescriptionTxt: {
    textAlign: 'center',
    marginTop: RFValue(20),
  },
});
