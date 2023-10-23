import { useNavigation, useTheme } from '@react-navigation/native';
import { AlgorithmFlow } from '@tb-frontend/shared/Store/action/algorithmAction';
import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appTheme } from '../../config/theme';
import { themeProps } from '../../types';
import { SingleOption } from './Algo/Accordian';
import { DescriptionCMSModal } from './Algo/DescriptionComponents';
interface AlgoLIstCardProps {
  title: string;
  ImgUrl: ImageSourcePropType | undefined;
  onPress?: () => void;
}
export const AlgoLIstCard: React.FC<AlgoLIstCardProps> = ({
  title = '',
  onPress = () => null,
  ImgUrl = undefined,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable onPress={onPress} style={[styles.Container, appTheme.themes.iosShadow, { backgroundColor: colors.background, shadowColor: colors.black }]}>
      <View style={[styles.ImgConiainer, appTheme.themes.iosShadow, { backgroundColor: colors.cardBorder, shadowColor: colors.Blue_Theme }]}>
        <Image
          source={ImgUrl}
          style={[styles.Img]}
          resizeMethod="auto"
          resizeMode="center"
        />
      </View>
      <Text
        numberOfLines={5}
        lineBreakMode="clip"
        style={[FontStyle.Nunito16, styles.text, {
          color: colors.Blue_Theme,
        }]}>
        {title}
      </Text>
    </Pressable  >
  );
};
interface subModuleCardProps {
  master?: any;
  isSelect?: boolean;
  onPress?: () => void;
  title: string;
  ImgUrl?: string | undefined;
  openBydefault?: boolean;
  is_expandable?: boolean;
  list?: any[];
}
export const SubModuleCard: React.FC<subModuleCardProps> = ({
  master = {},
  isSelect = false,
  onPress = () => null,
  title = '',
  ImgUrl = undefined,
  openBydefault = false,
  is_expandable = false,
  list = [],
}) => {
  const [isVisible, setVisible] = useState(false);
  const [selectedalgo, setSelectedAlgo] = useState({});
  const { colors } = useTheme() as unknown as themeProps;
  const [selected, setSelected] = useState(isSelect);
  const { algorithmFlow } = useSelector(state => state?.algorithm);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (openBydefault) {
      onPress();
    }
  }, [openBydefault]);
  useEffect(() => {
    setTimeout(() => {
      setSelected(isSelect);
    }, 0);
  }, [isSelect]);
  const clickOptionList = (master, selfobj, dependent) => {
    var NewArray = algorithmFlow;
    NewArray.push(master);
    NewArray.push(selfobj);
    NewArray.push(dependent[0]);
    dispatch(AlgorithmFlow([...NewArray]));
    navigation.navigate('AlgorithmScreen', { name: master?.title });
  };
  return (
    <View
      style={[styles.SubModuleCardContainer, {
        backgroundColor: selected ? colors.Blue_2 : colors.cardBorder,
        borderColor: colors.Blue_Theme,
      }]}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: RFValue(5),
          marginBottom: RFValue(5),
        }}
        onPress={onPress}
      >
        {ImgUrl &&
          <Image
            source={{ uri: ImgUrl }}
            style={styles.Img2}
          />}
        <Text
          style={[FontStyle.Nunito16, styles.subModuleText, {
            color: selected ? colors.white : colors.black,

          }]}>
          {title}
        </Text>
        {is_expandable ?
          <React.Fragment>
            {selected ?
              <Icon
                name="up"
                size={RFValue(11)}
                color={colors.white}
                style={{ padding: RFValue(11) }}
              /> :
              <Icon
                name="down"
                size={RFValue(11)}
                color={colors.black}
                style={{ padding: RFValue(11) }}
              />
            }
          </React.Fragment> : null
        }

      </Pressable>
      {selected && is_expandable ?
        <View style={{
          backgroundColor: colors.cardBorder,

        }}>
          <Text style={[FontStyle.Nunito12, styles.resultTitle,
          { color: colors.Grey_3, borderColor: colors.Grey_3, marginBottom: RFValue(10) }]}>
            Select any one result
          </Text>
          {list?.map((item, i) => {
            return (
              <SingleOption
                isSelected={algorithmFlow?.findIndex(e => e?.title == item?.title && e.id === item?.id) !== -1}
                key={title + i}
                title={item?.title}
                children={item}
                isOnPress={true}
                onPress={() => {
                  if (item?.node_type === 'CMS Node(New Page)') {
                    navigation.navigate('CmsScreen', {
                      title: item?.title,
                      description: item?.description,
                    });
                  } else if (
                    item?.node_type === 'CMS Node' &&
                    item?.redirect_algo_type !== null
                  ) {
                    console.log(' children redirect_node_id 1');
                    if (item?.redirect_node_id !== 0) {
                      console.log(' children redirect_node_id 2');
                      // setLastModal(true);
                      // setLastModalclose({
                      //   isLastModal: false,
                      //   screenName: 'AlgorithmDetails',
                      //   name: item?.redirect_algo_type,
                      //   type: item?.redirect_algo_type,
                      //   id: item?.redirect_node_id,
                      // });
                      navigation.navigate('AlgorithmList', {
                        name: item?.redirect_algo_type,
                        type: item?.redirect_algo_type,
                        algo_Id: item?.redirect_node_id,
                      });
                    } else {
                      console.log(' children redirect_node_id 3');
                      // setLastModal(true);
                      // setLastModalclose({
                      //   isLastModal: false,
                      //   screenName: 'AlgorithmList',
                      //   name: item?.redirect_algo_type,
                      //   type: item?.redirect_algo_type,
                      //   net: true,
                      // });
                      navigation.navigate('AlgorithmList', {
                        name: item?.redirect_algo_type,
                        type: item?.redirect_algo_type,
                      });
                    }
                  } else if (
                    item?.node_type === 'CMS Node' &&
                    item?.description
                  ) {
                    setVisible(true);
                    setSelectedAlgo(item);
                    // navigation.navigate('CmsScreen', {
                    //   title: item?.title,
                    //   description: item?.description,
                    // });
                  } else if (
                    item?.is_expandable === 1 ||
                    item?.has_options === 1 ||
                    item?.children?.length > 0
                  ) {
                    console.log(' item?.node_type', item?.node_type);
                    clickOptionList(master, item, item?.children);
                  }

                }}
              />

            );
          })}
        </View> : null}
      <DescriptionCMSModal
        isVisible={isVisible}
        setVisible={val => {
          setVisible(val);
          setSelectedAlgo({});
        }}
        selectedalgo={selectedalgo}
      />
    </View>

  );
};



interface symptomsCardProps {
  isSelect?: boolean;
  title: string;
  onPress?: () => void;
  ImgUrl?: ImageSourcePropType | undefined;
}
export const SymptomsCard: React.FC<symptomsCardProps> = ({
  isSelect = false,
  title = '',
  onPress = () => null,
  ImgUrl = undefined,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Pressable style={[styles.CardContainer, { backgroundColor: colors.dropDownBack, borderColor: colors.Blue_2 }]}
      onPress={onPress}
    >
      <Image
        source={ImgUrl}
        style={styles.Img2}
      />
      <Text
        style={[FontStyle.Nunito16, styles.subModuleText, {
          color: colors.Grey_3,
        }]}>
        {title}
      </Text>
      <BouncyCheckbox
        disableBuiltInState
        isChecked={isSelect}
        size={RFValue(16)}
        fillColor={colors.Blue_Theme}
        unfillColor={colors.dropDownBack}
        onPress={onPress}
        textComponent={<View />}
      />
    </Pressable>
  );
};
let styles = StyleSheet.create({

  resultTitle: {
    padding: RFValue(5),
    borderBottomWidth: 1,
  },
  Container: {
    elevation: 5,
    height: RFValue(135),
    borderRadius: 5,
    padding: RFValue(10),
    marginTop: RFValue(35),
  },
  text: {
    textAlign: 'left',
    marginTop: RFValue(40),
  },
  ImgConiainer: {
    height: RFValue(55),
    width: RFValue(55),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(55),
    position: 'absolute',
    top: -RFValue(27.5),
    left: RFValue(10),
    elevation: 5,
  },
  Img: {
    height: RFValue(35),
    width: RFValue(35),
  },
  Img2: {
    height: RFValue(26),
    width: RFValue(26),
    marginRight: RFValue(8),
  },
  SubModuleCardContainer: {
    borderLeftWidth: RFValue(4),
    borderRadius: RFValue(5),
    overflow: 'hidden',
    paddingTop: RFValue(8),
    marginBottom: RFValue(20),
    marginHorizontal: RFValue(5),
  },
  subModuleText: {
    flex: 1,
  },
  CardContainer: {
    borderLeftWidth: RFValue(4),
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(16),
    marginBottom: RFValue(20),
    // marginHorizontal: RFValue(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
