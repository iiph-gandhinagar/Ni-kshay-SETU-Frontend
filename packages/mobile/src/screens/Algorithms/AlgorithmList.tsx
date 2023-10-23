import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation, useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import {
  clearAlgorithmsMasterNode,
  getAlgorithmsMasterNode,
  getDynamicAlgorithmsMasterNode,
} from '@tb-frontend/shared/Store/action/algorithmAction';
import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';
import { useDispatch, useSelector } from 'react-redux';
import { DescriptionCMSModal } from '../../components/core/Algo/DescriptionComponents';
import { AlgoLIstCard } from '../../components/core/AlgoLIstCard';
import { Header } from '../../components/core/Header';
import { appConfigTypes, themeProps } from '../../types';
export default function AlgorithmList(props): JSX.Element {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme() as unknown as themeProps;
  const AlgorithmObj = props?.route?.params;
  const List = useSelector(state => state?.algorithm?.algorithmMasterNodes);
  const loader = useSelector(state => state?.algorithm?.loader);
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const [isVisible, setVisible] = useState(false);
  const [selectedalgo, setSelectedAlgo] = useState({});
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = async () => {
      if (
        isMounted &&
        AlgorithmObj?.type !== 'Dynamic' &&
        netInfo.isInternetReachable
      ) {
        dispatch(getAlgorithmsMasterNode(AlgorithmObj?.type));
      } else if (
        isMounted &&
        AlgorithmObj?.type == 'Dynamic' &&
        netInfo.isInternetReachable
      ) {
        dispatch(getDynamicAlgorithmsMasterNode(AlgorithmObj?.algo_Id));
      }
    };

    if (isMounted) {
      unsubscribe();
    }
    return function cleanup() {
      isMounted = false;
      dispatch(clearAlgorithmsMasterNode());
    };
  }, [AlgorithmObj, netInfo]);

  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={appTranslations[AlgorithmObj?.name] || AlgorithmObj?.name} />
      <FlatGrid
        refreshControl={<RefreshControl refreshing={loader} />}
        showsVerticalScrollIndicator={false}
        adjustGridToStyles={true}
        style={{ marginHorizontal: RFValue(5) }}
        itemContainerStyle={{ borderRadius: RFValue(5) }}
        data={List}
        renderItem={({ item }) => (
          <AlgoLIstCard
            title={item.title}
            onPress={() => {
              if (item?.node_type === 'CMS Node(New Page)') {
                navigation.navigate('CmsScreen', {
                  title: item?.title,
                  description: item?.description,
                });
              } else if (item?.node_type == 'App Screen Node') {
                navigation.navigate('LabInvestigation', {
                  name: item.title,
                  type: AlgorithmObj?.type,
                  id: item?.id,
                });
              } else if (
                item?.node_type === 'CMS Node' &&
                item?.description
              ) {
                setVisible(true);
                setSelectedAlgo(item);

              } else if (AlgorithmObj?.type == 'Dynamic') {
                navigation.navigate('AlgorithmDetails', {
                  name: item.title,
                  type: AlgorithmObj?.type,
                  algo_Id: AlgorithmObj?.algo_Id,
                  id: item?.id,
                });
              } else {
                navigation.navigate('AlgorithmDetails', {
                  name: item.title,
                  type: AlgorithmObj?.type,
                  id: item?.id,
                });
              }
            }}
            ImgUrl={item?.media?.[0]?.file_name
              ? {
                uri: BASE_MEDIA_URL +
                  item?.media?.[0]?.id +
                  '/' +
                  item?.media?.[0]?.file_name,
              }
              : undefined}
          />
        )}

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
  ScrollView: {
    paddingTop: RFValue(16),
    paddingHorizontal: RFValue(24),
  },
  HeaderText: {
    marginHorizontal: RFValue(15),
    marginTop: RFValue(15),
  },
});
