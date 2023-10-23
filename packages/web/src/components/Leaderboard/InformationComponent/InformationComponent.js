/** @jsxImportSource theme-ui */
import React from 'react';
import { useSelector } from 'react-redux';
import { Paragraph } from 'theme-ui';
import LevelInfoCard from './LevelInfoCard';
const InformationComponent = (props) => {
  const { leaderboardInfo } = useSelector(state => state?.app);
  const appTranslations = useSelector(state => state?.app?.appTranslations);
  return (
    <div className="mx-4" sx={{ mt: 7 }} >
      <Paragraph variant="Nunito18title" sx={{ color: "black2" }} className="mb-4">
        {appTranslations.LEADERBOARD_INFOTAB_HEADER}
      </Paragraph>
      <div className="row justify-content-center">
        {leaderboardInfo?.map((item, i) => {
          return (
            <LevelInfoCard
              key={'leaderboardInfo - ' + i}
              Level={item?.id}
              TitleLvl={item?.level}
              description={item?.content}
              BronzeImg={
                item?.id == 1
                  ? '../../images/Beg/active/BB.png'
                  : item?.id == 2
                    ? '../../images/Beg/active/ABB.png'
                    : item?.id == 3
                      ? '../../images/Beg/active/CB.png'
                      : item?.id == 4
                        ? '../../images/Beg/active/PB.png'
                        : '../../images/Beg/active/EB.png'
              }
              GoldImg={
                item?.id == 1
                  ? '../../images/Beg/active/BG.png'
                  : item?.id == 2
                    ? '../../images/Beg/active/ABG.png'
                    : item?.id == 3
                      ? '../../images/Beg/active/CG.png'
                      : item?.id == 4
                        ? '../../images/Beg/active/PG.png'
                        : '../../images/Beg/active/EG.png'
              }
              SilverImg={
                item?.id == 1
                  ? '../../images/Beg/active/BS.png'
                  : item?.id == 2
                    ? '../../images/Beg/active/ABS.png'
                    : item?.id == 3
                      ? '../../images/Beg/active/CS.png'
                      : item?.id == 4
                        ? '../../images/Beg/active/PS.png'
                        : '../../images/Beg/active/ES.png'
              }
              TopColor={
                item?.id == 1
                  ? '#362F64'
                  : item?.id == 2
                    ? '#2F6434'
                    : item?.id == 3
                      ? '#28315D'
                      : item?.id == 4
                        ? '#612C3B'
                        : '#2F6434'
              }
              colored={
                item?.id == 1
                  ? "linear-gradient(180.04deg, #80689D 55.37%, #1F1E54 105%)"
                  : item?.id == 2
                    ? "linear-gradient(180.04deg, #6F9D67 55.37%, #285D40 105%)"
                    : item?.id == 3
                      ? "linear-gradient(180.04deg, #67899D 55.37%, #29335F 105%)"
                      : item?.id == 4
                        ? "linear-gradient(180.04deg, #9D6767 55.37%, #5E2939 105%)"
                        : "linear-gradient(180.04deg, #679D96 55.37%, #2D4961 105%)"
              }
            />
          );
        })}
      </div>
    </div>

  );
}
export default InformationComponent;