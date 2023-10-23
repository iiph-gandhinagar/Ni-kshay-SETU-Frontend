import { useNavigation } from '@react-navigation/native';
import { getLeaderboardTaskList } from '@tb-frontend/shared/Store/action/leaderBoardAction';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { TaskCardComponent } from '../../components/core/Cards/taskCards';
import { LevelShowComponent } from '../../components/LevelShowComponent';
export const TasksTab = () => {
  const { lederBoardTaskList } = useSelector(state => state?.leaderBoard);
  const navigaion = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const Focus = navigaion.addListener('focus', () => {
      dispatch(getLeaderboardTaskList());
    });
    return Focus;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TaskCardComponent
        taskPending={lederBoardTaskList?.total_task_pending}
        taskCompleted={lederBoardTaskList?.total_task_completed}
      />
      {lederBoardTaskList?.task_list_data
        ? Object.keys(lederBoardTaskList?.task_list_data)?.map((item, i) => {
          const dis =
            i + 1 >
            lederBoardTaskList?.current_badge_details?.[0]?.level_id;

          return (
            <React.Fragment key={'task_list_data' + i}>
              <LevelShowComponent
                disable={dis}
                activeBadge={lederBoardTaskList?.current_badge_details?.[0]}
                levelBadges={lederBoardTaskList?.task_list_data[item]}
                level={item}
                LevelImg={
                  dis
                    ? i + 1 == 1
                      ? require('../../assets/Beg/dis/B.png')
                      : i + 1 == 2
                        ? require('../../assets/Beg/dis/AB.png')
                        : i + 1 == 3
                          ? require('../../assets/Beg/dis/C.png')
                          : i + 1 == 4
                            ? require('../../assets/Beg/dis/P.png')
                            : require('../../assets/Beg/dis/E.png')
                    : i + 1 == 1
                      ? require('../../assets/Beg/active/BG.png')
                      : i + 1 == 2
                        ? require('../../assets/Beg/active/ABG.png')
                        : i + 1 == 3
                          ? require('../../assets/Beg/active/CB.png')
                          : i + 1 == 4
                            ? require('../../assets/Beg/active/PG.png')
                            : require('../../assets/Beg/active/CG.png')
                }
              />
            </React.Fragment>
          );
        })
        : null}
    </ScrollView>
  );
};
