import { useTheme } from '@react-navigation/native';
import {
  getAllSimilarApps, getAppConfig, getAppDynamicAlgo, getFlashNews, getRecentlyAdded, getTopModule, setAppLang
} from '@tb-frontend/shared/Store/action/appActions';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/core/Header';
import { AppLoader } from '../components/core/Loaders/Loader';
import { LangComponent } from '../components/LangComponent';
import { storeDataToAsyncStorage } from '../functions';
import { appConfigTypes, themeProps } from '../types';

export const LangSelecter = () => {
  const { colors } = useTheme() as unknown as themeProps;
  const dispatch = useDispatch();
  const { appLanggusges, appLang, loader } = useSelector(state => state?.app);
  const appTranslations: appConfigTypes = useSelector(state => state?.app?.appTranslations,);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header headerTitle={appTranslations.HEADER_APP_LANG} />
      {loader ? <AppLoader /> : null}
      <FlatGrid
        itemDimension={RFValue(120)}
        data={appLanggusges}
        style={styles.gridView}
        spacing={RFValue(15)}
        keyExtractor={(item, index) => item?.title + index}
        renderItem={({ item }) => {
          return (
            <LangComponent
              title={item?.title}
              subTitle={item?.sub_title}
              onPress={async () => {
                await dispatch(setAppLang(item.code));
                await storeDataToAsyncStorage('appLang', item.code);
                dispatch(getAppConfig());
                dispatch(getFlashNews());
                dispatch(getAllSimilarApps());
                dispatch(getAppDynamicAlgo());
                dispatch(getTopModule());
                dispatch(getRecentlyAdded());
              }}
              isSelected={item.code == appLang}
              source={item.img_url ? { uri: item.img_url } : require('../assets/Translate.png')} />
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  gridView: {
    marginTop: RFValue(10),
    flex: 1,
  },
});
