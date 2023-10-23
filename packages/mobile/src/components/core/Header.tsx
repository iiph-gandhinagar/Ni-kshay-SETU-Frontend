import { useNavigation } from '@react-navigation/core';
import { StackActions, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
import Icon from 'react-native-vector-icons/AntDesign';
import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
interface Props {
  noBackArrow?: boolean;
  headerTitle: string;
  isTransparent?: boolean
}

export const Header: React.FC<Props> = ({
  noBackArrow = null,
  headerTitle = '',
  isTransparent = false,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,);
  return (
    <SafeAreaView>
      <View style={[styles.headerContainer, { backgroundColor: isTransparent ? colors.background : colors.headerBackground }]}>
        {noBackArrow
          ? null
          :
          navigation.canGoBack() && (
            <View style={styles.headerLeft}>
              <Pressable onPress={() => navigation.goBack()}>
                <Icon
                  name="arrowleft"
                  size={RFValue(20)}
                  color={isTransparent ? colors.Blue_2 : colors.headertext}
                />
              </Pressable>
            </View>
          )}
        <Text
          style={[
            styles.title, FontStyle.Raleway18, { color: isTransparent ? colors.Blue_2 : colors.headertext },
          ]}
          numberOfLines={1}>
          {appTranslations?.[headerTitle] || headerTitle}
        </Text>

      </View>
      {noBackArrow || isTransparent ? null : <BreadCrums />}
    </SafeAreaView>
  );
};

interface Header2Props {
}
export const Header2: React.FC<Header2Props> = ({
}) => {

  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  return (
    <View style={styles.header2Container}>
      <Pressable style={styles.logoContainer} onPress={() => {
        navigation.dispatch(StackActions.popToTop());
      }}>
        <Image
          source={require('../../assets/Nikshay_Setu.png')}
          style={styles.logoContainer}
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TourGuideZone
          zone={1}
          tourKey="first-tour"
          style={{ justifyContent: 'center', marginHorizontal: RFValue(4) }}
          text={'Browse Content in Modules, Submodules, Resource Materials, and FAQs'}
          shape="circle">
          <Pressable
            style={[styles.picBtn, {
              backgroundColor: colors.Grey_2,
            }]}
            onPress={() => navigation.navigate('MasterSearch')}>
            <Image
              source={require('../../assets/Search.png')}
              resizeMode="contain"
              style={[styles.PhotoProfile]}
            />
          </Pressable>
        </TourGuideZone>
        <TourGuideZone
          zone={2}
          tourKey="first-tour"
          text={'Switch your Language'}
          style={{ justifyContent: 'center', marginHorizontal: RFValue(4) }}
          shape="circle">
          <Pressable
            onPress={() => navigation.navigate('SelectLang')}
            style={[styles.picBtn, {
              backgroundColor: colors.Grey_2,
            }]}
          >
            <Image
              source={require('../../assets/Translate.png')}
              style={styles.PhotoProfile}
            />
          </Pressable>
        </TourGuideZone>
        <Pressable
          onPress={() => navigation.navigate('Notifications')}
          style={[styles.picBtn, {
            backgroundColor: colors.Grey_2,
            marginHorizontal: RFValue(4),
          }]}
        >
          <Image
            source={require('../../assets/Bell.png')}
            style={styles.PhotoProfile}
          />
        </Pressable>


      </View>
    </View>
  );
};
export const BreadCrums = () => {
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const [screensRoute, setRoute] = useState([]);
  const { appTranslations }: appConfigTypes = useSelector(
    state => state?.app,
  );
  const BreadCrumsRef = useRef(null);
  useEffect(() => {
    const stateNav = navigation.addListener('state', (ans) => {
      setRoute(ans?.data?.state?.routes);
    });
    return stateNav;
  });
  useEffect(() => {
    BreadCrumsRef?.current?.scrollToEnd();
  }, [BreadCrumsRef, screensRoute]);
  return (
    <ScrollView
      ref={BreadCrumsRef}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: RFValue(10), marginVertical: RFValue(5) }}
      horizontal={true}>
      {screensRoute?.map((item, i) => {
        return (
          <React.Fragment key={'screensRoute - ' + i}>
            <Text
              onPress={() => {
                navigation.navigate(item?.name, item?.params);
              }}
              style={[FontStyle.Nunito12, { marginRight: RFValue(10), color: colors.Grey_3 }]}>
              {
                appTranslations[item?.params?.name] ||
                appTranslations[item?.params?.title] ||
                item?.params?.name ||
                item?.params?.title ||
                item?.name}
            </Text>
            {i !== screensRoute.length - 1 && < Icon
              name="right"
              size={RFValue(12)}
              color={colors.Grey_3}
              style={{ marginRight: RFValue(10), alignSelf: 'center', paddingTop: RFValue(5) }}
            />}
          </React.Fragment>
        );

      })}
    </ScrollView>
  );
};
let styles = StyleSheet.create({
  title: {
    flex: 1,
    paddingLeft: RFValue(15),
    // textTransform: 'capitalize',
  },
  headerContainer: {
    paddingVertical: RFValue(11),
    paddingHorizontal: RFValue(15),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header2Container: {
    paddingHorizontal: RFValue(10),
    height: RFValue(50),
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: appTheme.colors.Grey_1,
  },
  headerLeft: {
    marginTop: RFValue(5),
    alignItems: 'center',
  },
  HeaderRightIcons: {
    width: RFValue(35),
    height: RFValue(35),
    borderWidth: RFValue(1),

    borderRadius: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
    height: RFValue(15),
    width: RFValue(135),
  },
  PhotoProfile: {
    height: RFValue(30),
    width: RFValue(30),

  },
  picBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: RFValue(35),
    height: RFValue(35),
    width: RFValue(35),
  },
});
