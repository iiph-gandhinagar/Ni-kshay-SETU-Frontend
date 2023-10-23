/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation, useTheme } from '@react-navigation/native';
import Carousel, { Pagination } from '@sergiorj/react-native-snap-carousel';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { storeUserActivity } from '@tb-frontend/shared/Store/action/appActions';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, Linking, NativeModules, Platform, SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useTourGuideController } from 'rn-tourguide';
import { FeatureContainer } from '../components/core/FeatureContainer';
import { Header2 } from '../components/core/Header';
import { ItemConteiner } from '../components/core/ItemConteiner';
import { NewsFeedSkeleton, RecentlyAddedSkeleton, SimilarAppsSkeleton, TopModulesSkeleton } from '../components/core/Loaders/Skeletons';
import CarouselCardItem from '../components/core/NewsFeed/CarouelCardItem';
import { RecentlyAddedComponents } from '../components/core/NewsFeed/RecentlyAdded';
import { SimilarAppComponent } from '../components/core/NewsFeed/SimilarAppCompo';
import { AppStyle } from '../config/appStyles';
import { FontStyle } from '../config/FontStyle';
import { getDataFromAsyncStorage, storeDataToAsyncStorage } from '../functions';
import { appConfigTypes, themeProps } from '../types';
import { getImage, getMaterialsUrl } from '../utils/functions';
const dimensions = Dimensions.get('screen');
export default function HomeScreenV2(): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const { flashNews, allSimilarApps, recentlyAdded, topModules, isScrolling } = useSelector(state => state?.app);
  const { topModulesLoader, flashNewsLoader, allSimilarAppsLoader, recentlyAddedLoader } = useSelector(state => state?.app);
  const { colors } = useTheme() as unknown as themeProps;
  useEffect(() => {
    dispatch(storeUserActivity('user_home_page_visit'));
  }, []);
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController('first-tour');

  React.useEffect(() => {
    if (canStart) {
      getDataFromAsyncStorage('first-tour').then((data) => {

        if (data) {
        } else {
          start();
        }


      });

    }
  }, [canStart]);
  const handleOnStart = () => console.log('start');
  const handleOnStop = () => {
    navigation.navigate('SelectLang');
    storeDataToAsyncStorage('first-tour', true);
  };
  const handleOnStepChange = () => storeDataToAsyncStorage('first-tour', true);

  React.useEffect(() => {
    eventEmitter?.on('start', handleOnStart);
    eventEmitter?.on('stop', handleOnStop);
    eventEmitter?.on('stepChange', handleOnStepChange);

    return () => {
      eventEmitter?.off('start', handleOnStart);
      eventEmitter?.off('stop', handleOnStop);
      eventEmitter?.off('stepChange', handleOnStepChange);
    };
  }, [eventEmitter]);

  const FeatureContainerfun = (item) => {
    switch (item.name) {
      case 'F_RESO_MATERIAL':
        navigation.navigate('ResourceMaterial');
        break;
      case 'F_MANG_PATIENT':
        navigation.navigate('Algorithms', {
          name: item.name,
          sectionKey: item.sectionKey,
        });
        break;
      case 'F_CASE_FINDING':
        navigation.navigate('Algorithms', {
          name: item.name,
          sectionKey: item.sectionKey,
        });
        break;
      case 'F_REF_HEALTH_FACILITY':
        navigation.navigate('HealthFaci');
        break;
      default:
        console.log('default');
        break;
    }
  };

  const { OpneAppModule } = NativeModules;

  const [activeSlide, setActiveSlide] = useState(0);
  const [items, setItems] = React.useState([
    {
      name: 'F_CASE_FINDING',
      sectionKey: 'LEARN',
      code: '#B57031',
      ImgUrl: require('../assets/CaseFinding.png'),
    },
    {
      name: 'F_MANG_PATIENT',
      sectionKey: 'PMT',
      code: '#4277FF',
      ImgUrl: require('../assets/ManageTB.png'),
    },
    {
      name: 'F_RESO_MATERIAL',
      code: '#31B564',
      ImgUrl: require('../assets/ResourceMaterial.png'),
    },
    {
      name: 'F_REF_HEALTH_FACILITY',
      code: '#E1546F',
      ImgUrl: require('../assets/Hospital.png'),
    },
  ]);

  const CheckAvailableAppsIOS = async (url) => {
    url && Linking.openURL(url);
  };

  const CheckAvailableApps = async (packageName) => {

    OpneAppModule.isAppAvailable(packageName).then(is => {
      if (is == true) {
        OpneAppModule.openApp(packageName,
          res => {
            console.log('success ', res);
          },
          res => {
            console.log('failed ', res);
          },);
      } else {
        Linking.openURL('https://play.google.com/store/apps/details?id=' + packageName);
        console.log('app not installed');
      }

    });
  };
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header2 />
      <FlatGrid
        scrollEnabled={isScrolling}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <React.Fragment>
            {topModulesLoader && topModules?.length === 0 ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TopModulesSkeleton />
              </View>
            ) :
              <View
                style={styles.TopContainer}>
                {topModules?.most_usefull?.map((item, i) => {
                  return (

                    <ItemConteiner
                      key={item.title}
                      title={appTranslations?.[item.title] || item.title}
                      onPress={() => {
                        switch (item.link) {
                          case 'Screening':
                            navigation.navigate('Screening');
                            break;
                          case 'survey':
                            navigation.navigate('Survey');
                            break;
                          case 'rating':
                            navigation.navigate('FeedBackScreen');
                            break;
                          case 'certificate':
                            navigation.navigate('Certificates');
                            break;
                          case 'ResourceMaterials':
                            navigation.navigate('Materials', item);
                            break;
                          case 'CurrentAssessments':
                            navigation.navigate('Assessment', {
                              screen: 'CurrentAssessment',
                            });
                            break;
                          case 'PastAssessments':
                            navigation.navigate('Assessment', {
                              screen: 'PastAssessment',
                            });
                            break;
                          case 'AlgorithmList':
                            if (item.type == 'Dynamic') {
                              navigation.navigate('AlgorithmList', {
                                name: item.title,
                                type: item.type,
                                algo_Id: item.id,
                              });
                            }
                            else if (item.id) {
                              navigation.navigate('AlgorithmDetails', {
                                name: item.title,
                                type: item.type,
                                algo_Id: item.id,
                                id: item.id,
                              });
                            }
                            else {
                              navigation.navigate('AlgorithmList', {
                                name: item.title,
                                type: item.type,
                              });
                            }
                            break;
                          default:
                            break;
                        }

                      }}
                      ImgSrc={getImage(item?.type, item?.icon, item?.imageUrl)}
                    />
                  );
                })}

                <ItemConteiner
                  title={appTranslations.MORE_TOOLS}
                  onPress={() => navigation.navigate('AllModules')}
                  ImgSrc={require('../assets/MoreTools.png')}
                />
              </View>
            }

            <View
              style={[AppStyle.Divider, {
                marginHorizontal: RFValue(15),
                backgroundColor: colors.dividerColor,
              }]}
            />
            <Text style={[styles.HeaderText, FontStyle.Nunito15, { color: colors.titleOrange, marginHorizontal: RFValue(15) }]}>
              {appTranslations?.F_FEATURES}
            </Text>

          </React.Fragment>
        }
        itemDimension={Platform.OS == 'android' ? RFValue(150) : RFValue(130)}
        data={items}
        spacing={RFValue(5)}
        ListFooterComponentStyle={{ marginHorizontal: RFValue(15), marginTop: -RFValue(5) }}
        renderItem={({ item }) => (
          <FeatureContainer
            title={item.name}
            ImgUrl={item.ImgUrl}
            color={item.code}
            onPress={() => FeatureContainerfun(item)} />
        )}
        ListFooterComponent={
          <React.Fragment>
            <View
              style={[AppStyle.Divider, {
                backgroundColor: colors.dividerColor,
              }]}
            />
            <Text style={[styles.HeaderText, FontStyle.Nunito15, { color: colors.titleOrange }]}>
              {appTranslations?.N_NEWS_FEED}
            </Text>
            {flashNewsLoader && flashNews?.length === 0 ? <NewsFeedSkeleton /> :
              <View style={{ alignItems: 'center' }}>
                <Carousel
                  data={flashNews}
                  scrollEnabled={isScrolling}
                  renderItem={({ item, index }) => (
                    <CarouselCardItem
                      index={index}
                      item={item}
                      setUrl={uri => {
                        if (uri) {
                          navigation.navigate('WebView', {
                            url: uri,
                            title: item?.title,
                          });
                        }
                      }}
                      key={index}
                      image={
                        item?.media?.[0]
                          ? BASE_MEDIA_URL +
                          item?.media?.[0]?.id +
                          '/' +
                          item?.media?.[0]?.file_name
                          : undefined
                      }
                    />
                  )}
                  pagingEnabled={true}
                  sliderWidth={dimensions.width - RFValue(30)}
                  itemWidth={dimensions.width - RFValue(30)}
                  itemHeight={RFValue(110)}
                  sliderHeight={RFValue(130)}
                  style={{ flex: 1 }}
                  inactiveSlideScale={0.95}
                  inactiveSlideOpacity={1}
                  enableMomentum={true}
                  onSnapToItem={index => setActiveSlide(index)}
                  activeSlideAlignment={'start'}
                  activeAnimationType={'spring'}
                  activeAnimationOptions={{
                    friction: 4,
                    tension: 30,
                  }}
                />
                {flashNews.length > 0 && <Pagination
                  key={'Pagination'}
                  dotsLength={flashNews.length}
                  activeDotIndex={activeSlide}
                  dotStyle={styles.paginationDot}
                  containerStyle={styles.paginationContainer}
                  dotColor={colors.Blue_2}
                  inactiveDotColor={colors.Grey_1}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={1}
                />}
              </View>}
            <View
              style={[AppStyle.Divider, {
                backgroundColor: colors.dividerColor,
              }]}
            />
            <Text style={[styles.HeaderText, FontStyle.Nunito15, { color: colors.titleOrange }]}>
              {appTranslations?.SIMILAR_APPLI}
            </Text>
            {allSimilarAppsLoader && allSimilarApps?.length === 0 ?
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
              }}>
                <SimilarAppsSkeleton />
              </View> :
              <View style={{ flexDirection: 'row', marginHorizontal: -RFValue(15), marginTop: RFValue(10), marginBottom: RFValue(10) }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                  {allSimilarApps?.map((item, i) => {
                    return (
                      <SimilarAppComponent
                        subTitle={item?.sub_title}
                        Heading={item?.title}
                        key={item?.title}
                        Logo={
                          item?.media?.[0]
                            ? BASE_MEDIA_URL +
                            item?.media?.[0]?.id +
                            '/' +
                            item?.media?.[0]?.file_name
                            : undefined
                        }
                        onPress={() => {
                          if (Platform.OS === 'android') {
                            CheckAvailableApps(item.href);
                          }
                          else { CheckAvailableAppsIOS(item.href_ios); }
                        }} />
                    );
                  })}
                </ScrollView>
              </View>
            }
            <View
              style={[AppStyle.Divider, {
                backgroundColor: colors.dividerColor,
              }]}
            />
            <Text style={[styles.HeaderText, FontStyle.Nunito15, { color: colors.titleOrange }]}>
              {appTranslations?.RECENTLY_ADDED}
            </Text>
            {recentlyAddedLoader && recentlyAdded?.length === 0 ? <RecentlyAddedSkeleton /> : <>
              {recentlyAdded?.map((item, i) => {
                const url = item?.media?.[0]?.id ?
                  item?.media?.[0]?.id + '/' + item?.media?.[0]?.file_name : undefined;
                return (
                  <RecentlyAddedComponents
                    key={(item?.title || item?.name) + item?.id}
                    Title={item?.title || item?.name}
                    time={moment(item?.created_at).fromNow()}
                    Text2={item?.type_of_materials ? 'F_RESO_MATERIAL' : 'MODULE'}
                    ImgSrc={getImage(item?.type_of_materials, item?.type_of_materials, url)}
                    onPress={() => {
                      if (item?.type_of_materials) {
                        switch (item.type_of_materials) {
                          case 'folder':
                            navigation.push('Materials', item);
                            break;
                          case 'videos':
                            navigation.navigate('VideoView', getMaterialsUrl(item.media));
                            break;
                          case 'pdfs':
                            navigation.navigate('PDFView', {
                              header: item.title,
                              url: getMaterialsUrl(item.media),
                            });
                            break;
                          case 'pdf_office_orders':
                            navigation.navigate('PDFView', {
                              header: item.title,
                              url: getMaterialsUrl(item.media),
                            });
                            break;
                          case 'ppt':
                            Linking.openURL(getMaterialsUrl(item.media));
                            break;
                          case 'document':
                            Linking.openURL(getMaterialsUrl(item.media));
                            break;
                          case 'images':
                            Linking.openURL(getMaterialsUrl(item.media));
                            break;
                          default:
                            console.log('', getMaterialsUrl(item.media));

                            break;
                        }
                      } else {
                        navigation.navigate('AlgorithmList', {
                          name: item.name,
                          type: 'Dynamic',
                          algo_Id: item.id,
                          id: item.id,
                        });

                      }

                    }}
                  />
                );
              })}
            </>
            }
          </React.Fragment>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    paddingVertical: 8,
  },

  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // marginHorizontal: 3,
  },

  Container: {
    flex: 1,
  }, TopContainer: {
    flexDirection: 'row',
    paddingVertical: RFValue(5),
    justifyContent: 'space-between',
  },
  ScrollView: {
    paddingTop: RFValue(17),
    paddingHorizontal: RFValue(24),
  },
  HeaderText: {
    // marginStart: RFValue(15),
    marginVertical: RFValue(5),
    // marginBottom:RFValue(10),
  },

});
