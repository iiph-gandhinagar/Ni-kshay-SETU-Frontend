import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { appTheme } from '../config/theme';
import { appConfigTypes, themeProps } from '../types';
import { RankContainer } from './RankComponents';
interface LevelShowProps {
  level: String;
  LevelImg: String;
  disable: boolean;
  activeBadge: {};
  levelBadges: [];
}
export const LevelShowComponent: React.FC<LevelShowProps> = ({
  level = '',
  LevelImg = '',
  disable = true,
  activeBadge = {},
  levelBadges = [],
}) => {
  const [isOpne, setSetOpen] = useState(false);
  const { colors } = useTheme() as unknown as themeProps;
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  return (
    <React.Fragment>
      <Pressable
        onPress={() => {
          setSetOpen(state => !state);
        }}
        style={[style.LevelContainer, appTheme.themes.iosShadow, { backgroundColor: colors.cardBackground }]}>
        <View
          style={style.Conatiner1}>
          <Image
            source={LevelImg}
            style={style.LevelImg}
          />
          <Text style={[FontStyle.Nunito15, style.LevelTxt, { color: colors.tabInActive }]}>
          {appTranslations?.LEVEL} : {level}
          </Text>
        </View>
        {isOpne ? (
          <View style={style.ImgConatiner}>
            <Image
              source={require('../assets/arrowUp.png')}
              style={style.Img}
            />
          </View>
        ) : (
          <View style={style.ImgConatiner}>
            <Image
              source={require('../assets/arrowDown.png')}
              style={style.Img}
            />
          </View>

        )}
      </Pressable>
      {isOpne && (
        <ScrollView horizontal={true}>
          {levelBadges?.map((item, i) => {
            return (
              <RankContainer
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
                    ? require('../assets/Beg/dis/B.png')
                    : item?.level == 2
                      ? require('../assets/Beg/dis/AB.png')
                      : item?.level == 3
                        ? require('../assets/Beg/dis/C.png')
                        : item?.level == 4
                          ? require('../assets/Beg/dis/P.png')
                          : require('../assets/Beg/dis/E.png')
                }
                medalImg={
                  item?.badges == 1
                    ? require('../assets/Beg/active/BB.png')
                    : item?.badges == 2
                      ? require('../assets/Beg/active/BS.png')
                      : item?.badges == 3
                        ? require('../assets/Beg/active/BG.png')
                        : item?.badges == 4
                          ? require('../assets/Beg/active/ABB.png')
                          : item?.badges == 5
                            ? require('../assets/Beg/active/ABS.png')
                            : item?.badges == 6
                              ? require('../assets/Beg/active/ABG.png')
                              : item?.badges == 7
                                ? require('../assets/Beg/active/CB.png')
                                : item?.badges == 8
                                  ? require('../assets/Beg/active/CS.png')
                                  : item?.badges == 9
                                    ? require('../assets/Beg/active/CG.png')
                                    : item?.badges == 10
                                      ? require('../assets/Beg/active/PB.png')
                                      : item?.badges == 11
                                        ? require('../assets/Beg/active/PS.png')
                                        : item?.badges == 12
                                          ? require('../assets/Beg/active/PG.png')
                                          : item?.badges == 13
                                            ? require('../assets/Beg/active/EB.png')
                                            : item?.badges == 14
                                              ? require('../assets/Beg/active/ES.png')
                                              : require('../assets/Beg/active/EG.png')
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
        </ScrollView>
      )}
    </React.Fragment>
  );
};
const style = StyleSheet.create({
  LevelContainer: {
    flexDirection: 'row',
    padding: RFValue(5),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: RFValue(5),
    elevation: 7,
    marginVertical: RFValue(10),
    marginHorizontal: RFValue(15),
    overflow: Platform.OS == 'android' ? 'hidden' : 'visible',
  },
  Img: {
    height: RFValue(8),
    width: RFValue(12),
    justifyContent: 'flex-end',
  },
  LevelImg: {
    height: RFValue(35),
    width: RFValue(35),
  },
  Conatiner1: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  ImgConatiner: {
    padding: RFValue(15),
  },
  LevelTxt: {
    marginHorizontal: RFValue(10),
  },
});
