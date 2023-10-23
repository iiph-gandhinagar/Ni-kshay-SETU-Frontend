import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable, StyleSheet, Text, View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Feather';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';

interface ItemConteinerProps {
  item: String;
  index: String;
  image: String;
  setUrl: (url: string) => void
}
export const CarouselCardItem: React.FC<ItemConteinerProps> = ({
  item = '',
  index = '',
  image = '',
  setUrl = () => null,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable onPress={() => setUrl(item?.href)}>
      <LinearGradient
        colors={colors.Feed_Gradient} useAngle angle={90}
        style={[styles.contenier, { borderColor: colors.cardBorder }]}
        key={'CarouselCardItem - ' + index + item?.href}
      >
        <View
          style={[styles.ImageConatiner, { borderColor: colors.cardBorder }]}>
          {image ?
            <Image
              source={{ uri: image }}
              style={styles.Img}
            /> :
            <Image
              source={require('../../../assets/blog.png')}
              style={styles.Img}
            />}
        </View>

        <View style={styles.InfoContainer}>
          <Text
            style={[FontStyle.RalewayTitle, styles.TitleText, { color: colors.Blue_2 }]} numberOfLines={2}>
            {item?.title}
          </Text>

          <View style={styles.Conatiner1}>
            <View>
              <Text
                style={[FontStyle.Nunito11, styles.SourceTxT, {

                  color: colors.Grey_3,
                }]}>
                Source : {item?.source}
              </Text>
              {/* <Text
              style={[FontStyle.NunitoDate, styles.DateTxt]}>
              {item.publish_date}
            </Text> */}
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenier: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    // marginEnd:RFValue(25),
    // marginStart:RFValue(10),
    alignItems: 'center',
    marginTop: RFValue(10),
    padding: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth: 1,
  },
  RightArrowCon: {
    borderRadius: RFValue(25),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(25),
    width: RFValue(25),
  },
  ImageConatiner: {
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: RFValue(15),
    backgroundColor: '#FFF',
  },
  InfoContainer: {
    marginLeft: RFValue(20),
    flex: 1,
  },
  ArrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginLeft: RFValue(3),
    height: RFValue(25),
    width: RFValue(25),
  }, ArrowIcon: {
    // marginTop: RFValue(2),
    marginRight: RFValue(-3),
  },
  Img: {
    height: RFValue(65),
    width: RFValue(65),
  },
  TitleText: {
    flex: 1,
    // marginTop: RFValue(-9),
  },
  DateTxt: {
    marginTop: RFValue(5),
  },
  SourceTxT: {
    marginTop: RFValue(20),
  },
  Conatiner1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CarouselCardItem;
