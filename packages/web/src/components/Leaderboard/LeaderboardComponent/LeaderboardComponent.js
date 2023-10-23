/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import { BASE_MEDIA_URL } from "@tb-frontend/shared/globles";
import LeaderboardCard from './LeaderboardCard';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearLeaderboardDetailes, getLeaderboardDetailes,
} from '@tb-frontend/shared/Store/action/leaderBoardAction';
const LeaderboardComponent = (props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state?.user);
  const { lederBoardList, listData, loader } = useSelector(state => state?.leaderBoard);
  const pageSize = 10;
  const [offset, SetOffSet] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isloading, setLoading] = useState(false);
  const handleLoadMore = () => {
    if (!loader && (listData?.current_page < listData?.last_page)) {
      setLoading(true)
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
    dispatch(
      getLeaderboardDetailes({
        pageSize: pageSize,
        page: offset,
      }),
    );
    return () => {
      SetOffSet(1)
      dispatch(clearLeaderboardDetailes())
    }
  }, []);
  useEffect(() => {
    if (listData?.next_page_url) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }, [listData])

  return (
    <div className='vh-100 overflow-auto'>
      <InfiniteScroll
        useWindow={false}
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {lederBoardList?.map((item, i) => {
          const media = item.user?.media?.[0];
          return (
            <LeaderboardCard
              ImgUrl={media ? BASE_MEDIA_URL + media?.thumb_60 : undefined}
              name={item.name}
              rank={item?.lb_level?.level}
              subTitle={item?.user?.cadre?.title}
              percentage={item?.percentage}
              isUser={userData?.[0]?.id === item?.subscriber_id}
            />
          )
        })
        }
      </InfiniteScroll>
    </div>
  );
}
export default LeaderboardComponent;