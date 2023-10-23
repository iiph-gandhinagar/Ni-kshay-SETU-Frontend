import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { getUserData, updateUserData } from '@tb-frontend/shared/Store/action/usersActions';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { ImagePicker } from '../../components/core/ImagePicker';
import BottomSheetModal from '../../components/core/Modals/BottomSheet';
import { appConfigTypes, themeProps } from '../../types';
export default function EditProfilePicture(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [pickedImage, setImage] = useState('');
  const { colors } = useTheme() as unknown as themeProps;
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state?.user);
  const media = userData?.[0]?.media?.[0];
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  const navigation = useNavigation();
  const updateCallback = async response => {
    console.log('onSubmit', response);
    if (response?.code == 200) {
      Alert.alert('Success !', response?.data, [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
            dispatch(getUserData());
          },
        },
      ]);
    } else {
      Alert.alert('Error!', response?.data);
    }
  };
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={appTranslations.EDIT_PROFILE_PICTURE}
      />
      <View style={[styles.ProfilePicContainer, { backgroundColor: colors.background }]}>
        <View>
          {pickedImage ?
            <Image
              source={{ uri: pickedImage }}
              style={styles.PhotoProfile}
            />
            :
            <Image
              source={media ? { uri: BASE_MEDIA_URL + media?.thumb_100 }
                : require('../../assets/dp.png')}
              style={styles.PhotoProfile}
            />
          }
          <View />
          <Pressable
            style={styles.addCamCont}
            onPress={() => setIsOpen(true)}>
            <Image
              source={require('../../assets/AddPic.png')}
              style={styles.addCam}
            />
          </Pressable>
        </View>
        <Button
          style={styles.btn}
          loader={false}
          disabled={pickedImage == ''}
          onPress={() => {
            let body = new FormData();
            body.append('cadre_type', userData[0]?.cadre_type);
            pickedImage ? body.append('profile_image', {
              uri: pickedImage,
              name: pickedImage?.split('/')[pickedImage.split('/')?.length - 1],
              filename: pickedImage?.split('/')[pickedImage.split('/')?.length - 1],
              type: 'image/png',
            }) : null;
            dispatch(updateUserData(body, updateCallback));
          }}
          buttonText={appTranslations.UPDATE_DETAILS}
        />
      </View>
      <BottomSheetModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ImagePicker
          onClose={() => setIsOpen(false)}
          setPickedImage={img => setImage(img)}
        />
      </BottomSheetModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ProfilePicContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCamCont: {
    // flex: 1.5,
    marginLeft: 80,
    marginTop: 95,
    position: 'absolute',
    height: RFValue(40),
    width: RFValue(40),
    justifyContent: 'center',
    // borderRadius: 150,
    alignItems: 'center',
    backgroundColor: '#FA967E',
    borderRadius: 30,
    paddingLeft: RFValue(3),
  },
  addCam: {
    width: RFValue(23),
    height: RFValue(20),
  },
  btn: {
    paddingHorizontal: 30,
    marginTop: RFValue(40),
  },
  PhotoProfile: {
    width: RFValue(120),
    height: RFValue(120),
    resizeMode: 'cover',
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FA967E',
  },
});
