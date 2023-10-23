import { useNavigation, useTheme } from '@react-navigation/native';
import { getRMMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Linking,
  StyleSheet, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { themeProps } from '../../types';
import { getImage, getMaterialsUrl } from '../../utils/functions';
import { MasterSearchSkeleton } from '../core/Loaders/Skeletons';
import { NoResultFound } from '../core/NoResultFound';
import { MasterListCard } from './ListCard';
export const ResourceMaterialComponent = ({ search }) => {
  const { rmData, rmLoader } = useSelector(state => state?.masterSearch);
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
    if (isFocus && search !== '') { dispatch(getRMMasterSearch(search)); }
  }, [search, isFocus]);
  return (
    rmLoader ? <MasterSearchSkeleton /> : <FlatList
      contentContainerStyle={{
        paddingBottom: RFValue(20),
        marginHorizontal: RFValue(10),
      }}
      ListEmptyComponent={rmLoader ?
        <MasterSearchSkeleton />
        : search !== '' ?
          <NoResultFound /> : null}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={rmData || []}
      keyExtractor={(item, idx) => 'Resource Material List -' + idx}
      renderItem={({ item, index }) => {
        return (
          <MasterListCard onPress={() => {
            switch (item.type_of_materials) {
              case 'folder':
                navigation.push('Materials', item);
                break;
              case 'videos':
                navigation.navigate('VideoView', getMaterialsUrl(item.media));
                break;
              case 'pdfs':
                navigation.navigate('PDFView', {
                  header: item.title,
                  url: getMaterialsUrl(item.media),
                });
                break;
              case 'pdf_office_orders':
                navigation.navigate('PDFView', {
                  header: item.title,
                  url: getMaterialsUrl(item.media),
                });
                break;
              case 'ppt':
                Linking.openURL(getMaterialsUrl(item.media));
                break;
              case 'document':
                Linking.openURL(getMaterialsUrl(item.media));
                break;
              case 'images':
                Linking.openURL(getMaterialsUrl(item.media));
                break;
              default:
                console.log('', getMaterialsUrl(item.media));

                break;
            }
          }}
            title={item.title}
            source={getImage(item?.type_of_materials, item?.icon, null)}
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
