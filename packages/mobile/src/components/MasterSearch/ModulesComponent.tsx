import { useNavigation, useTheme } from '@react-navigation/native';
import { getModuleMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { themeProps } from '../../types';
import { getImage } from '../../utils/functions';
import { MasterSearchSkeleton } from '../core/Loaders/Skeletons';
import { NoResultFound } from '../core/NoResultFound';
import { MasterListCard } from './ListCard';
export const ModulesComponent = ({ search }) => {
  const { moduleData, moduleLoader } = useSelector(state => state?.masterSearch);
  const navigation = useNavigation();
  const { colors } = useTheme() as unknown as themeProps;
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
    if (isFocus && search !== '') { dispatch(getModuleMasterSearch(search)); }
  }, [search, isFocus]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {moduleLoader ? <MasterSearchSkeleton /> :
        <FlatList
          contentContainerStyle={{
            paddingBottom: RFValue(20),
            marginHorizontal: RFValue(10),
          }}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            moduleLoader ?
              null
              : search !== '' ?
                <NoResultFound /> : null

          }
          showsVerticalScrollIndicator={false}
          data={moduleData || []}
          keyExtractor={(item, idx) => 'Modules List -' + idx}
          renderItem={({ item, index }) => {
            return (
              <MasterListCard
                onPress={() => {
                  switch (item.link) {
                    case 'Algorithms':
                      navigation.navigate('Algorithms', {
                        name: item.title,
                        sectionKey: item.sectionKey,
                      });
                      break;
                    case 'Screening':
                      navigation.navigate('Screening');
                      break;
                    case 'rating':
                      navigation.navigate('FeedBackScreen');
                      break;
                    case 'certificate':
                      navigation.navigate('Certificates');
                      break;
                    case 'ResourceMaterials':
                      navigation.navigate('Materials', item);
                      break;
                    case 'CurrentAssessments':
                      navigation.navigate('Assessment', {
                        screen: 'CurrentAssessment',
                      });
                      break;
                    case 'PastAssessments':
                      navigation.navigate('Assessment', {
                        screen: 'PastAssessment',
                      });
                      break;
                    case 'AlgorithmList':
                      if (item.type == 'Dynamic') {
                        navigation.navigate('AlgorithmList', {
                          name: item.title,
                          type: item.type,
                          algo_Id: item.id,
                        });
                      } else if (item.id) {
                        navigation.navigate('AlgorithmDetails', {
                          name: item.title,
                          type: item.type,
                          algo_Id: item.id,
                          id: item.id,
                        });
                      } else {
                        navigation.navigate('AlgorithmList', {
                          name: item.title,
                          type: item.type,
                        });
                      }
                      break;
                    default:
                      break;
                  }
                }}
                source={getImage(item?.type, item?.icon, item?.imageUrl)}
                title={item.title} />

            );
          }}
          ItemSeparatorComponent={props => {
            return (
              <View style={[styles.Divider, { borderColor: colors.Grey_2, marginHorizontal: 0 }]} />
            );
          }}
        />}

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Divider: {
    borderTopWidth: 1,
    marginHorizontal: RFValue(24),
  },
});
