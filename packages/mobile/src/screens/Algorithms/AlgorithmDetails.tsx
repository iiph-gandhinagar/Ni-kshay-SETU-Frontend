import { useNavigation, useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import {
  cleanAlgorithmFlow,
  cleanAlgorithmsDependentNode, getDynamicAlgoDependentNode, getlgorithmsDependentNode,
} from '@tb-frontend/shared/Store/action/algorithmAction';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { DescriptionCMSModal } from '../../components/core/Algo/DescriptionComponents';
import { SubModuleCard } from '../../components/core/AlgoLIstCard';
import { Header } from '../../components/core/Header';
import { dBInstance } from '../../SqlStore/Database';
import { themeProps } from '../../types';

export default function AlgorithmDetails(props): JSX.Element {
  var timeIntervalSubmoduleId;
  const [isVisible, setVisible] = useState(false);
  const [selectedalgo, setSelectedAlgo] = useState({});
  const dispatch = useDispatch();
  const { colors } = useTheme() as unknown as themeProps;
  const [expand, setExpand] = useState({});
  const navigation = useNavigation();
  const flatlistRef = useRef(null);
  const MasterObject = props?.route?.params;
  const algorithmDependentObj = useSelector(
    state => state?.algorithm?.algorithmDependentNodes,
  );
  var x = 0;
  const { algorithmFlow, loader } = useSelector(state => state?.algorithm);
  const moduleUsage = () => {

    timeIntervalSubmoduleId = setInterval(() => {
      x = x + 1;
    }, 1000);
  };
  useEffect(() => {
    const Focus = props.navigation.addListener('focus', () => {

      if (MasterObject?.id && MasterObject?.type !== 'Dynamic') {
        dispatch(getlgorithmsDependentNode(MasterObject));
      } else if (MasterObject?.id && MasterObject?.type === 'Dynamic') {
        dispatch(getDynamicAlgoDependentNode(MasterObject));
      }
    });
    return Focus;
  });
  useEffect(() => {
    console.log('useEffect');
    moduleUsage();
    return function cleanup() {
      clearInterval(timeIntervalSubmoduleId);
      dBInstance()?.transaction(txn => {
        txn.executeSql(
          'INSERT INTO app_time(module,activity_type,sub_module_id,time)values(?,?,?,?)',
          [
            MasterObject?.type === 'CGC' ? 'NTEP Intervention' : MasterObject?.type,
            'submodule_usage',
            MasterObject?.id,
            x,
          ],
        );
      }).then(() => {
        x = 0;
        dispatch(cleanAlgorithmsDependentNode());
        setExpand({});
        dispatch(cleanAlgorithmFlow());
      });


    };
  }, [MasterObject]);
  function Cmscall(item) {
    if (
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
      item?.node_type === 'CMS Node' &&
      item?.redirect_algo_type !== null &&
      item?.redirect_node_id !== 0
    ) {
      if (item?.header && item?.sub_header) {
        // setLastModal(true);
        // setLastModalclose({
        //   isLastModal: false,
        //   screenName: 'AlgorithmDetails',
        //   name: item?.redirect_algo_type,
        //   type: item?.redirect_algo_type,
        //   id: item?.redirect_node_id,
        // });
      } else {
        navigation.navigate('AlgorithmDetails', {
          name: item?.redirect_algo_type,
          type: item?.redirect_algo_type,
          id: item?.redirect_node_id,
        });
      }
    } else {
      console.log('no action 1');
      if (item?.header && item?.sub_header) {
        // setLastModal(true);
        // setLastModalclose({ isLastModal: false });
      }
    }
  }
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={
          algorithmDependentObj?.title
            ? algorithmDependentObj?.title
            : props?.route?.params?.title
        }
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: RFValue(15), marginTop: RFValue(20) }}
        refreshControl={<RefreshControl
          onRefresh={() => {
            if (MasterObject?.id && MasterObject?.type !== 'Dynamic') {
              dispatch(getlgorithmsDependentNode(MasterObject));
            } else if (MasterObject?.id && MasterObject?.type === 'Dynamic') {
              dispatch(getDynamicAlgoDependentNode(MasterObject));
            }
          }}
          refreshing={loader} />
        }
        data={algorithmDependentObj?.children || []}
        ref={flatlistRef}
        keyExtractor={(item, index) => index + '- algo Details -' + item?.id}
        renderItem={({ item, index }) => {
          return (
            <SubModuleCard
              master={item}
              key={'SubModuleCard' + index}
              is_expandable={item.is_expandable === 1}
              list={item?.children}
              onPress={() => {
                item?.node_type === 'CMS Node(New Page)' ?
                  navigation.navigate('CmsScreen', {
                    title: item?.title,
                    description: item?.description,
                  })
                  :
                  item?.node_type === 'CMS Node'
                    ? item?.is_expandable === 1
                      ? item?.id === expand?.id ? setExpand({}) : setExpand(item)
                      : Cmscall(item)
                    : item?.node_type === 'Linking Node Without Options'
                      ? (
                        // setLastModal(true);
                        // setLastModalclose({
                        //   isLastModal: false,
                        //   screenName: 'LinkingScreen',
                        //   data: data,
                        // });
                        console.log('Linking Node Without Options')
                      )
                      : item?.is_expandable === 1
                        ? item?.id === expand?.id ? setExpand({}) : setExpand(item)
                        : console.log(' Linking Node not expandable', item?.node_type);
              }}
              isSelect={item?.id === expand?.id}
              ImgUrl={item?.media?.[0]?.id
                ? BASE_MEDIA_URL +
                item?.media?.[0]?.id +
                '/' +
                item?.media?.[0]?.file_name
                : undefined}
              title={item.title}
              openBydefault={MasterObject?.bmiID === item?.id || false}
            />
          );
        }}
      />
      <DescriptionCMSModal
        isVisible={isVisible}
        setVisible={val => {
          setVisible(val);
          setSelectedAlgo({});
        }}
        selectedalgo={selectedalgo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  desTitle: {
    marginBottom: RFValue(15),
    borderTopWidth: 1,
    paddingTop: RFValue(15),
  },

});
