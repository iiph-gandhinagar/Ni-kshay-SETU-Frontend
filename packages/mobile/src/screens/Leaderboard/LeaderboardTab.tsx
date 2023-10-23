import { useNavigation, useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import {
  clearLeaderboardDetailes, getLeaderboardDetailes,
} from '@tb-frontend/shared/Store/action/leaderBoardAction';
import { getUserData } from '@tb-frontend/shared/Store/action/usersActions';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { LeaderboardListCard } from '../../components/core/Cards/LeaderboardCard';
import { themeProps } from '../../types';
export const LeaderboardComponent = () => {
  const { lederBoardList, listData } = useSelector(state => state?.leaderBoard);
  const { userData } = useSelector(state => state?.user);
  const [fetchAllData, setFetchAllData] = useState(false);
  const [fetchMoreData, setFetchMoreData] = useState(false);
  const [offset, SetOffSet] = useState(1);
  const pageSize = 10;
  const navigaion = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme() as unknown as themeProps;
  const handleLoadMore = () => {
    if (!fetchAllData) {
      setFetchMoreData(true);
      SetOffSet(old => old + 1);
      dispatch(
        getLeaderboardDetailes({
          pageSize: pageSize,
          page: offset + 1,
        }),
      );
    }
  };

  useEffect(() => {
    const Focus = navigaion.addListener('focus', () => {
      dispatch(getUserData());
      dispatch(
        getLeaderboardDetailes({
          pageSize: pageSize,
          page: offset,
        }),
      );
    });
    return Focus;
  });
  useEffect(() => {
    const Blur = navigaion.addListener('blur', () => {
      console.log('blur');
      SetOffSet(1);
      dispatch(clearLeaderboardDetailes());
    });
    return Blur;
  });
  useEffect(() => {
    setFetchMoreData(false);
    if (listData?.next_page_url) {
      setFetchAllData(false);
    } else {
      setFetchAllData(true);
    }
  }, [listData]);
  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: RFValue(20),
        marginHorizontal: RFValue(10),
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={lederBoardList || []}
      keyExtractor={(item, idx) => 'Leaderboard List - ' + idx}
      renderItem={({ item }) => {
        const media = item.user?.media?.[0];
        return (
          <LeaderboardListCard
            ImgUrl={media ? { uri: BASE_MEDIA_URL + media?.thumb_60 } : undefined}
            name={item.name}
            rank={item?.lb_level?.level}
            subTitle={item?.user?.cadre?.title}
            percentage={item?.percentage}
            isUser={userData?.[0]?.id === item?.subscriber_id}
          />
        );
      }}
      onEndReachedThreshold={0.8}
      onEndReached={() => handleLoadMore()}
      initialNumToRender={pageSize}
      refreshControl={
        <RefreshControl
          refreshing={fetchMoreData}
          onRefresh={() => {
            dispatch(clearLeaderboardDetailes());
            setFetchMoreData(true);
            SetOffSet(old => 1);
            dispatch(
              getLeaderboardDetailes({
                pageSize: pageSize,
                page: 1,
              }),
            );
          }}
        />
      }
      ItemSeparatorComponent={props => {
        return (
          <View style={[styles.Divider, { borderColor: colors.Grey_2 }]} />
        );
      }}
      ListFooterComponent={
        fetchMoreData ? (
          <View style={{ marginVertical: RFValue(10) }}>
            <ActivityIndicator
              size={'small'}
              color={colors.Blue_2}
            />
          </View>
        ) : null
      }
    />
  );
};
const styles = StyleSheet.create({
  Divider: {
    borderTopWidth: 1,
    marginHorizontal: RFValue(24),
  },
});
