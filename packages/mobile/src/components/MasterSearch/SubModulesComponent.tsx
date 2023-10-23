import { useNavigation, useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { getSubModuleMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import React, { useEffect, useState } from 'react';
import {
  FlatList, StyleSheet, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { themeProps } from '../../types';
import { MasterSearchSkeleton } from '../core/Loaders/Skeletons';
import { NoResultFound } from '../core/NoResultFound';
import { MasterListCard } from './ListCard';
export const SubModulesComponent = ({ search }) => {
  const { subModuleData, subModuleLoader } = useSelector(state => state?.masterSearch);
  const { colors } = useTheme() as unknown as themeProps;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFocus, setFocus] = useState(false);
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      setFocus(true);
    });
    return focus;
  });
  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      setFocus(false);
    });
    return blur;
  });
  useEffect(() => {
    if (isFocus && search !== '') { dispatch(getSubModuleMasterSearch(search)); }
  }, [search, isFocus]);
  return (
    subModuleLoader ? <MasterSearchSkeleton /> : <FlatList
      contentContainerStyle={{
        paddingBottom: RFValue(20),
        marginHorizontal: RFValue(10),
      }}
      ListEmptyComponent={subModuleLoader ?
        <MasterSearchSkeleton />
        : search !== '' ?
          <NoResultFound /> : null}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={subModuleData || []}
      keyExtractor={(item, idx) => 'Sub Modules List -' + idx}
      renderItem={({ item, index }) => {
        return (
          <MasterListCard onPress={() => {
            if (item?.node_type == 'App Screen Node') {
              navigation.navigate('LabInvestigation', {
                type: 'Differentiated Care Of TB Patients',
                id: item?.id,
              });
            } else if (
              item?.node_type === 'CMS Node' &&
              item?.description
            ) {
              navigation.navigate('CmsScreen', {
                title: item?.title,
                description: item?.description,
              });
            } else if (
              item?.node_type === 'CMS Node(New Page)' &&
              item?.description
            ) {
              navigation.navigate('CmsScreen', {
                title: item?.title,
                description: item?.description,
              });
            } else if (item?.type == 'Dynamic') {
              navigation.navigate('AlgorithmDetails', {
                name: item?.name,
                type: item?.type,
                algo_Id: item?.algo_Id,
                id: item?.id,
              });
            } else {
              navigation.navigate('AlgorithmDetails', {
                name: item.title,
                type: item.module,
                id: item.id,
              });
            }
          }}
            title={item.title}
            source={{
              uri: BASE_MEDIA_URL + item?.media,
            }}
          />
        );
      }}
      ItemSeparatorComponent={props => {
        return (
          <View style={[styles.Divider, { borderColor: colors.Grey_2, marginHorizontal: 0 }]} />
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  Divider: {
    borderTopWidth: 1,
    marginHorizontal: RFValue(24),
  },
});
