import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import {
  clearFilterDetails, getFilterDetails,
  setBlockId,
  setDistrictId,
  setFacilities, setFilterPage, setStateId,
} from '@tb-frontend/shared/Store/action/healthFacilityAction';
import {
  clearBlock,
  clearDistrict,
  getAllState,
  getBlockByDistrict,
  getDistrictByState,
} from '@tb-frontend/shared/Store/action/usersActions';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { FormMultiselect, FormPicker } from '../../components/core/input';
import { FontStyle } from '../../config/FontStyle';
import { appTheme } from '../../config/theme';
import { appConfigTypes, themeProps } from '../../types';
export default function HealthFaci(): JSX.Element {
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const navigation = useNavigation();
  const { colors } = useTheme() as unknown as themeProps;
  const dispatch = useDispatch();
  const { State, allDistricts, allBlocks } = useSelector(state => state?.user);
  const { healthFacility } = useSelector(state => state?.app);
  const { stateID, districtID, sortBy, blockID, facility, searchTerm, filterDetails } = useSelector(state => state?.health);
  useEffect(() => {
    dispatch(getAllState());
  }, []);
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header headerTitle={appTranslations.HEADER_HEALTH_FACILITY} />
      <ScrollView
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollContiner}>
        <View style={styles.tabContainer}>
          <Image source={require('../../assets/Hospital.png')} style={styles.Img} />
        </View>
        <View style={{ marginTop: RFValue(45) }}>
          <View style={[{ backgroundColor: colors.purple_light },
          appTheme.themes.cardPurple]}>
            <Text style={[FontStyle.Heading4,
            { color: colors.assessmentTitle, textAlign: 'left', marginBottom: RFValue(20) }]}>
              {appTranslations.SEARCH_HEALTH_FACILITY}
            </Text>
            <FormPicker
              header={appTranslations.HEADER_STATE}
              label={appTranslations.DROPDOWN_SELECT_STATE}
              Icon={'Layers'}
              options={State?.map(e => {
                return {
                  name: e?.title,
                  value: e?.id,
                  id: e?.id,
                };
              })}
              value={stateID}
              onChangeValue={async (x) => {
                await dispatch(setStateId(x));
                await dispatch(setDistrictId(-1));
                await dispatch(setBlockId(-1));
                await dispatch(clearDistrict());
                await dispatch(clearBlock());
                await dispatch(getDistrictByState(x));
              }}
              onBlur={() => null}
              errors={''}
              touched={false}
            />
            <FormPicker
              header={appTranslations.DISTRICT}
              label={appTranslations.DROPDOWN_SELECT_DISTRICT}
              Icon={'Layers'}
              options={allDistricts?.map(e => {
                return {
                  name: e?.title,
                  value: e?.id,
                  id: e?.id,
                };
              })}
              value={districtID}
              onChangeValue={async (x) => {
                console.log('x >>>', x);

                dispatch(setDistrictId(x));
                dispatch(setBlockId(-1));
                dispatch(clearBlock());
                dispatch(getBlockByDistrict(x));
              }}
              onBlur={() => null}
              errors={''}
              touched={false}
            />
            <FormPicker
              header={'TU'}
              label={appTranslations.DROPDOWN_SELECT_TU}
              Icon={'Layers'}
              options={allBlocks?.map(e => {
                return {
                  name: e?.title,
                  value: e?.id,
                  id: e?.id,
                };
              })}
              value={blockID}
              onChangeValue={async (x) => {
                dispatch(setBlockId(x));
              }}
              onBlur={() => null}
              errors={''}
              touched={false}
            />

            <FormMultiselect
              header={appTranslations.HEADER_FACILITIES}
              value={facility !== '' ? facility?.split(',') : []}
              onChangeValue={(value) => {
                dispatch(setFacilities(value.join()));
              }}
              options={Object.keys(healthFacility)?.map((e, i) => {
                return {
                  name: healthFacility[e],
                  id: e,
                };
              }) || []} Icon={''} />
            <Button
              buttonText={appTranslations.PLACEHOLDER_SEARCH}
              style={styles.btn}
              onPress={async () => {
                await dispatch(clearFilterDetails());
                dispatch(setFilterPage(1));
                await dispatch(
                  getFilterDetails({
                    page: 1,
                    HF: facility,
                    ST: searchTerm,
                    stateID: stateID,
                    districtID: districtID,
                    blockID: blockID,
                    sort: sortBy,
                  }),
                );
                navigation.navigate('AllHealthFaci');
              }} />

          </View>

          <View style={[{ borderColor: colors.Blue_2 }, styles.ViewAllbtn]}>
            <Button
              buttonText={appTranslations.VIEW_ALL}
              onPress={async () => {
                dispatch(setFilterPage(1));
                await dispatch(clearFilterDetails());
                await dispatch(
                  getFilterDetails({
                    page: 1,

                  }),
                );
                navigation.navigate('AllHealthFaci');
              }}
              style={{ paddingHorizontal: RFValue(10), paddingVertical: RFValue(5) }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Img: {
    height: RFValue(120),
    width: RFValue(120),
  },
  tabContainer: {
    alignItems: 'center',
  },
  btn: {
    alignSelf: 'center',
  },
  ViewAllbtn: {
    alignItems: 'flex-end',
    marginVertical: RFValue(20),
  },
  ScrollContiner: {
    paddingHorizontal: RFValue(25),
  },
});
