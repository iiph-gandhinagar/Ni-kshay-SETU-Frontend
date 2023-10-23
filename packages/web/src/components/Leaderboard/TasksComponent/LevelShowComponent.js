/** @jsxImportSource theme-ui */
import React from 'react';
import { Heading } from 'theme-ui';
import RankComponent from './RankComponent';
const LevelShowComponent = ({
  level,
  LevelImg,
  disable,
  activeBadge,
  levelBadges,
}) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={"heading" + level.replace(" ", "")}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + level.replace(" ", "")}
          aria-expanded="false" aria-controls={level.replace(" ", "")}>
          <img style={{}} src={LevelImg} alt="Task" sx={{ width: 45 }} className="me-2" />
          <Heading variant="Nunito18title" sx={{ color: "Blue_Theme" }}>Level : {level}</Heading>
        </button>
      </h2>
      <div
        id={level.replace(" ", "")}
        className="accordion-collapse collapse border-0"
        aria-labelledby={"heading" + level.replace(" ", "")}
        data-bs-parent={"#accordion" + level.replace(" ", "")}>
        <div className="accordion-body border-0 p-0">
          <div className="row">
            {levelBadges?.map((item, i) => {
              return (
                <RankComponent
                  TAO={item?.App_opended_count}
                  AO={
                    item?.badges < activeBadge?.badge_id
                      ? item?.App_opended_count
                      : activeBadge?.App_opended_count
                  }
                  TRMU={item?.resource_material_accessed_count}
                  RMU={
                    item?.badges < activeBadge?.badge_id
                      ? item?.resource_material_accessed_count
                      : activeBadge?.resource_material_accessed_count
                  }
                  TCBU={item?.chatbot_usage_count}
                  CBU={
                    item?.badges < activeBadge?.badge_id
                      ? item?.chatbot_usage_count
                      : activeBadge?.chatbot_usage_count
                  }
                  TSMV={item?.sub_module_usage_count}
                  SMV={
                    item?.badges < activeBadge?.badge_id
                      ? item?.sub_module_usage_count
                      : activeBadge?.sub_module_usage_count
                  }
                  TMS={item?.mins_spent}
                  MS={
                    item?.badges < activeBadge?.badge_id
                      ? item?.mins_spent
                      : (activeBadge?.mins_spent_count / 60).toFixed(0)
                  }
                  key={level + ' - ' + i}
                  DisableImg={
                    item?.level == 1
                      ? "images/Beg/dis/B.png"
                      : item?.level == 2
                        ? "images/Beg/dis/AB.png"
                        : item?.level == 3
                          ? "images/Beg/dis/C.png"
                          : item?.level == 4
                            ? "images/Beg/dis/P.png"
                            : "images/Beg/dis/E.png"
                  }
                  medalImg={
                    item?.badges == 1
                      ? 'images/Beg/active/BB.png'
                      : item?.badges == 2
                        ? 'images/Beg/active/BS.png'
                        : item?.badges == 3
                          ? 'images/Beg/active/BG.png'
                          : item?.badges == 4
                            ? 'images/Beg/active/ABB.png'
                            : item?.badges == 5
                              ? 'images/Beg/active/ABS.png'
                              : item?.badges == 6
                                ? 'images/Beg/active/ABG.png'
                                : item?.badges == 7
                                  ? 'images/Beg/active/CB.png'
                                  : item?.badges == 8
                                    ? 'images/Beg/active/CS.png'
                                    : item?.badges == 9
                                      ? 'images/Beg/active/CG.png'
                                      : item?.badges == 10
                                        ? 'images/Beg/active/PB.png'
                                        : item?.badges == 11
                                          ? 'images/Beg/active/PS.png'
                                          : item?.badges == 12
                                            ? 'images/Beg/active/PG.png'
                                            : item?.badges == 13
                                              ? 'images/Beg/active/EB.png'
                                              : item?.badges == 14
                                                ? 'images/Beg/active/ES.png'
                                                : 'images/Beg/active/EG.png'
                  }
                  isDisable={
                    disable ? disable : item?.badges >= activeBadge?.badge_id
                  }
                  badgeName={item?.lb_badge?.badge}
                  isBronze={
                    item?.badges == 1 ||
                    item?.badges == 4 ||
                    item?.badges == 7 ||
                    item?.badges == 10 ||
                    item?.badges == 13
                  }
                  isSilver={
                    item?.badges == 2 ||
                    item?.badges == 5 ||
                    item?.badges == 8 ||
                    item?.badges == 11 ||
                    item?.badges == 14
                  }

                />
              );
            })}
          </div>
        </div>
      </div>
    </div>

  );
}
export default LevelShowComponent;