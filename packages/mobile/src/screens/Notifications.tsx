import { useTheme } from '@react-navigation/native';
import { getAppNotification, clearAppNotification } from '@tb-frontend/shared/Store/action/appActions';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Linking, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/core/Header';
import { NoResultFound } from '../components/core/NoResultFound';
import { NotificationsCard } from '../components/core/NotificationsCard';
import { appConfigTypes, themeProps } from '../types';
import { getImage } from '../utils/functions';
export default function Notifications(): JSX.Element {
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const dispatch = useDispatch();
  const { loader, notificationList, notificationObj } = useSelector(state => state?.app);
  const [page, SetPage] = useState(1);
  const handleLoadMore = async () => {
    if (!loader && (notificationObj?.current_page < notificationObj?.last_page)) {
      SetPage(page + 1);
      dispatch(getAppNotification(page + 1));
    }
  };
  useEffect(() => {
    console.log('useEffect');

    dispatch(getAppNotification(1));
    return function clear() {
      console.log('useEffect clear');
      SetPage(1);
      dispatch(clearAppNotification());
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header headerTitle={'Notifications'} />
      <FlatList
        data={notificationList}
        automaticallyAdjustKeyboardInsets={false}
        ListEmptyComponent={loader ?
          null
          : notificationList?.length == 0 ?
            <NoResultFound
              header={appTranslations?.NO_DATA_NOTIFICATION}
            /> : null}
        renderItem={({ item, index }) => {
          return (
            <NotificationsCard
              onPress={() => {
                Linking.openURL(item.linking_url);
              }}
              key={(item?.title) + item?.id}
              Title={item.title}
              Text2={item.description}
              time={moment(item.created_at).format('L')}
              ImgSrc={getImage(item.type, item.type, undefined)}
            />
          );
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loader ? (
          <ActivityIndicator
            color={colors.Blue_2}
            style={{ justifyContent: 'center', alignItems: 'center', marginBottom: RFValue(20) }}
          />
        ) : null}
      />
    </SafeAreaView>
  );
}

