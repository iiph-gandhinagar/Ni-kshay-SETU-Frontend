import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';
import RNImagePicker from 'react-native-image-crop-picker';

interface ImagePickerProps {
  setPickedImage: () => void;
  onClose: () => void;
}
export const ImagePicker: React.FC<ImagePickerProps> = ({
  title = '',
  onClose = () => null,
  setPickedImage = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const pickImageFromLibrary = () => {
    try {
      RNImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        avoidEmptySpaceAroundImage: true,
        compressImageQuality: 0.8,
      })
        .then(image => {
          console.log(image?.path);
          onClose();
          if (image?.path) {
            setPickedImage(image?.path);
          }
        })
        .catch(error => {
          console.log('pickImageFromLibrary', error);
          RNImagePicker.clean()
            .then(() => {
              console.log('removed all tmp images from tmp directory');
            })
            .catch(e => {
              console.log('e');
            });
        });
    } catch (error) {
      console.log('catch', error);
    }
  };

  const pickImageFromCamera = () => {
    try {
      RNImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        avoidEmptySpaceAroundImage: true,
        useFrontCamera: false,
        compressImageQuality: 0.8,
      })
        .then(image => {
          console.log('img', image);
          onClose();

          setPickedImage(image?.path);
        })
        .catch(error => {
          console.log('pickImageFromCamera', error);
          RNImagePicker.clean()
            .then(() => {
              console.log('removed all tmp images from tmp directory');
            })
            .catch(e => {
              console.log('e');
            });
        });
    } catch (error) {
      console.log('catch', error);
    }
  };

  const Camera = () => {
    pickImageFromCamera();
    // onClose();
  };

  const Gallery = () => {
    pickImageFromLibrary();
    // onClose();
  };
  return (
    <View style={styles.ImagePicker}>
      <Text style={[FontStyle.Raleway18, { color: colors.Grey_3 }]}>
        Choose Photo
      </Text>
      <Pressable onPress={Gallery} style={[styles.FlexRow]}>
        <Image source={require('../../assets/Gallery.png')} style={styles.Image} />
        <Text style={[FontStyle.Raleway18, { color: colors.Grey_3, marginLeft: RFValue(20) }]}>Gallery
        </Text>
      </Pressable>
      <Pressable onPress={Camera} style={[styles.FlexRow]}>
        <Image source={require('../../assets/photo-camera.png')} style={styles.Image} />
        <Text style={[FontStyle.Raleway18, { color: colors.Grey_3, marginLeft: RFValue(20) }]}>Camera
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  FlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFValue(10),
    marginTop: RFValue(15),
  },
  ImagePicker: {
    padding: RFValue(10),
  },
  Image: {
    height: RFValue(24),
    width: RFValue(24),
  },

});
