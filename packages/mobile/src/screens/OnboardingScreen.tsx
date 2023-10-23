import { useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { clearAppTour } from '@tb-frontend/shared/Store/action/appActions';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { getDataFromAsyncStorage, storeDataToAsyncStorage } from '../functions';
import { themeProps } from '../types';
export default function OnboardingScreen(): JSX.Element {
  const dispatch = useDispatch();
  const { colors } = useTheme() as unknown as themeProps;
  const { tourSlider } = useSelector(state => state?.app);
  const tourEnd = () => {
    getDataFromAsyncStorage('tourIds').then((ids) => {
      if (ids) {
        const newIds = ids.concat(tourSlider?.map(e => e.id));
        const updateIds = newIds.filter((item, index) => newIds.indexOf(item) === index);
        storeDataToAsyncStorage('tourIds', updateIds).then(() => {
          dispatch(clearAppTour());
        });

      } else {
        storeDataToAsyncStorage('tourIds', tourSlider?.map(e => e.id)).then(() => {
          dispatch(dispatch(clearAppTour()));
        });
      }

    });
  };
  const renderSkipButton = () => {
    return (
      <Text onPress={tourEnd} style={[styles.SkipT, FontStyle.RalewayText12, { color: '#666666' }]}>Skip</Text>
    );
  };
  const renderDoneButton = () => {
    return (
      <Text onPress={tourEnd} style={[styles.SkipT, FontStyle.RalewayText12, { color: '#666666' }]}>Done</Text>
    );
  };
  const RenderItem = ({ item, index }) => {
    const media = item?.media?.[0];
    return (
      <React.Fragment>
        <ImageBackground
          style={styles.imageBackground}
          source={index % 3 == 0 ? require('../assets/Tools/tourbg1.png') : index % 3 == 1 ? require('../assets/Tools/tourbg2.png') : require('../assets/Tools/tourbg3.png')}>
          <Image
            resizeMode="center"
            style={styles.introImageStyle}
            source={{ uri: BASE_MEDIA_URL + media?.id + '/' + media?.file_name }} />
          <Text style={[FontStyle.Raleway20Bold, styles.introTitleStyle, { color: index % 3 == 0 ? '#8D8806' : index % 3 == 1 ? '#1E5680' : '#80331E' }]}>
            {item.title}
          </Text>
          <Text style={[FontStyle.Nunito18Title, styles.introTextStyle]}>
            {item.description}
          </Text>
        </ImageBackground>
      </React.Fragment>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppIntroSlider
        data={tourSlider}
        renderItem={RenderItem}
        renderSkipButton={renderSkipButton}
        renderDoneButton={renderDoneButton}
        showSkipButton={true}
        dotStyle={{ backgroundColor: colors.Grey_1 }}
        activeDotStyle={{ backgroundColor: colors.HOVER_ORANGE }}
        dotClickEnabled
        bottomButton
        showNextButton={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  introImageStyle: {
    width: RFValue(250),
    height: RFValue(250),
    marginBottom: RFValue(100),
  },
  introTextStyle: {
    color: '#5A5A5A',
    margin: RFValue(10),
    textAlign: 'center',
  },
  introTitleStyle: {
    marginBottom: RFValue(22),
  },
  SkipT:
  {
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});
