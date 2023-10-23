import { useTheme } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface Props {
  isModalVisible: boolean;
  close: () => void
}
export const SurveyThanksModal: React.FC<Props> = ({ isModalVisible, close }) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Modal
      coverScreen={false}
      onBackdropPress={close}
      animationIn="slideInDown"
      animationOut="slideOutDown"
      isVisible={isModalVisible}>
      <View
        style={[styles.container, {
          backgroundColor: colors.white,
        }]}>
        {/* <Pressable style={styles.SubContainer} onPress={close}>
          <Icon
            onPress={close}
            name="cancel"
            size={RFValue(20)}
            color={colors.Blue_Theme}
            style={{ margin: RFValue(10) }}
          />
        </Pressable> */}

        <View
          style={styles.AnimeContiner}>
          <Lottie
            loop
            autoPlay
            source={require('../../../assets/Animations//DRbackground.json')}
            style={{}}
          // loop
          />
        </View>

        <Pressable onPress={close}>
          <Image
            resizeMode="center"
            source={require('../../../assets/successFeedback.png')}
            style={styles.img}
          />
        </Pressable>

        <View
          style={styles.HTxtCoantiner}>
          <Text
            style={[FontStyle.Raleway18, styles.TopTxt, { color: colors.Blue_Theme }]}>
            Survey Submitted
          </Text>
          <Text
            style={[FontStyle.RalewayText12, { color: colors.Blue_2, marginBottom: RFValue(10), textAlign: 'center' }]}>
            We appreciate you taking the time to participate in this survey and assist us in our analysis, and pledge to utilizing the information gained to contemplate and implement worthwhile improvements.
          </Text>
        </View>


      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RFValue(6),
    margin: RFValue(20),

    alignItems: 'center',
  },
  AnimeContiner: {
    height: RFValue(300),
    width: RFValue(400),
    position: 'absolute',
    zIndex: 1000,
  },
  img: {
    // marginTop: RFValue(-260),
    height: RFValue(180),
    width: RFValue(180),
  },
  HTxtCoantiner: {
    alignItems: 'center',
    margin: RFValue(10),
  },
  store: {
    marginVertical: RFValue(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  StoreImg: {
    height: RFValue(35),
    width: RFValue(115),
  }, StoreImg1: {
    height: RFValue(35),
    width: RFValue(115),
    marginStart: RFValue(30),
  },
  TopTxt: {
    marginTop: RFValue(10),
    marginBottom: RFValue(20),
    textAlign: 'center',
  },
  SubContainer: {
    alignSelf: 'flex-end',
    marginHorizontal: RFValue(8),
    paddingVertical: RFValue(10),
  },
  img2: {
    height: RFValue(15),
    width: RFValue(15),
  },

});
