/** @jsxImportSource theme-ui */
import { getLeaderboardTaskList } from '@tb-frontend/shared/Store/action/leaderBoardAction';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LevelShowComponent from './LevelShowComponent';
import TasksCard from './TasksCard';
const TasksComponent = (props) => {
  const { lederBoardTaskList } = useSelector(state => state?.leaderBoard);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLeaderboardTaskList());
  }, [])
  return (
    <div className="" sx={{ mt: 7 }} >
      <TasksCard />
      <div className="row mx-0">

        {lederBoardTaskList?.task_list_data
          ? Object.keys(lederBoardTaskList?.task_list_data)?.map((item, i) => {
            const dis =
              i + 1 >
              lederBoardTaskList?.current_badge_details?.[0]?.level_id;
            return (
              <div className="level-show accordion" id={"#accordion" + item.replace(" ", "")}>
                <LevelShowComponent
                  disable={dis}
                  activeBadge={lederBoardTaskList?.current_badge_details?.[0]}
                  levelBadges={lederBoardTaskList?.task_list_data[item]}
                  level={item}
                  LevelImg={
                    dis
                      ? i + 1 == 1
                        ? "images/Beg/dis/B.png"
                        : i + 1 == 2
                          ? "images/Beg/dis/AB.png"
                          : i + 1 == 3
                            ? "images/Beg/dis/C.png"
                            : i + 1 == 4
                              ? "images/Beg/dis/P.png"
                              : "images/Beg/dis/E.png"
                      : i + 1 == 1
                        ? "images/Beg/active/BG.png"
                        : i + 1 == 2
                          ? "images/Beg/active/ABG.png"
                          : i + 1 == 3
                            ? "images/Beg/active/CB.png"
                            : i + 1 == 4
                              ? "images/Beg/active/PG.png"
                              : "images/Beg/active/CG.png"
                  }

                />
              </div>
            );
          })
          : null}
      </div>


    </div>

  );
}
export default TasksComponent;