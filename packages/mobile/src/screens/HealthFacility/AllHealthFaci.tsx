import { useTheme } from '@react-navigation/native';
import {
  clearFilterDetails, getFilterDetails,
  setFilterPage, setSortBy,
} from '@tb-frontend/shared/Store/action/healthFacilityAction';
import React, { useRef } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  default as MaterialIcon,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { NoResultFound } from '../../components/core/NoResultFound';
import { HealthFaciListContainer } from '../../components/HealthFaciListContainer';
import { SearchHeader } from '../../components/SearchHeader';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';
export default function AllHealthFaci(props): JSX.Element {
  const dispatch = useDispatch();
  const { colors } = useTheme() as unknown as themeProps;
  const { healthFacility } = useSelector(state => state?.app);
  const { stateID, districtID, sortBy,  blockID, facility, searchTerm, filterDetails, filterObj, loader } = useSelector(state => state?.health);
  const refRBSheet = useRef(null);
  const page = useSelector(state => state?.health?.filterPage);
  const handleLoadMore = async () => {
    if (!loader && (filterObj?.current_page < filterObj?.last_page)) {
      await dispatch(setFilterPage(page + 1));
      await dispatch(
        getFilterDetails({
          page: page + 1,
          HF: facility,
          ST: searchTerm,
          stateID: stateID,
          districtID: districtID,
          blockID: blockID,
          sort: sortBy,
        }),
      );
    }
  };
  const ListHeaderComponent = () => {
    return (
      <React.Fragment>
        <SearchHeader
          onClickSorting={() => {
            refRBSheet?.current?.open();
          }}
        />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <FlatList
        style={[styles.Container, { backgroundColor: colors.background }]}
        ListHeaderComponentStyle={[{ backgroundColor: colors.background, elevation: 5, marginBottom: RFValue(15) }]}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        keyboardShouldPersistTaps={undefined}
        keyboardDismissMode={undefined}
        automaticallyAdjustKeyboardInsets={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={loader ?
          null
          : filterDetails?.length == 0 ? <NoResultFound /> : null}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={filterDetails}
        keyExtractor={(item, idx) => item?.id}
        renderItem={({ item, index }) => {
          return (
            <View key={item?.id} style={{ marginHorizontal: RFValue(25) }}>
              <HealthFaciListContainer
                Hospital={item?.health_facility_code}
                State={item?.state?.title}
                City={item?.district?.title}
                Area={item?.block?.title}
                data={item}
                facilityName={healthFacility}
              />
            </View>
          );
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loader ? (
          <ActivityIndicator
            color={colors.Blue_2}
            style={{ justifyContent: 'center', alignItems: 'center', marginBottom: RFValue(20) }}
          />
        ) : null}
      />
      <RBSheet
        ref={refRBSheet}
        customStyles={{
          container: {
            backgroundColor: colors.cardBackground,
          },
          draggableIcon: {
            backgroundColor: colors.black,
          },
        }}
      >
        <View style={[{ backgroundColor: colors.cardBackground }, styles.item]}>
          <Text style={[FontStyle.Nunito12, { color: colors.assessPointText }]}>Sorting</Text>
          <Pressable
            disabled={sortBy === 'ASC' ? true : false}
            onPress={async () => {
              dispatch(setSortBy('ASC'));
              await dispatch(clearFilterDetails());
              await dispatch(
                getFilterDetails({
                  page: 1,
                  HF: facility,
                  ST: searchTerm,
                  stateID: stateID,
                  districtID: districtID,
                  blockID: blockID,
                  sort: 'ASC',
                }),
              );
              refRBSheet?.current?.close();
            }}
            style={styles.FilterModalTextContainer}>

            <Text style={[FontStyle.Nunito16, styles.FilterModalText, { color: colors.assessPointText }]}>
              Sort by Name (A-Z)
            </Text>
            {sortBy === 'ASC' && (
              <MaterialIcon
                name="check"
                size={RFValue(20)}
                color={colors.Blue_2}
              />
            )}
          </Pressable>
          <Pressable
            disabled={sortBy === 'DESC' ? true : false}
            onPress={async () => {
              dispatch(setSortBy('DESC'));
              await dispatch(clearFilterDetails());
              await dispatch(
                getFilterDetails({
                  page: 1,
                  HF: facility,
                  ST: searchTerm,
                  stateID: stateID,
                  districtID: districtID,
                  blockID: blockID,
                  sort: 'DESC',
                }),
              );
              refRBSheet?.current?.close();
            }}
            style={styles.FilterModalTextContainer}>

            <Text style={[FontStyle.Nunito16, styles.FilterModalText, { color: colors.assessPointText }]}>
              Sort by Name (Z-A)
            </Text>
            {sortBy === 'DESC' && (
              <MaterialIcon
                name="check"
                size={RFValue(20)}
                color={colors.Blue_2}
              />
            )}
          </Pressable>
        </View>


      </RBSheet>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingBottom: RFValue(15),
    flex: 1,
  },
  FilterModalText: {
    flex: 1,
  },
  item: {
    padding: RFValue(24),
    justifyContent: 'center',
  },
  FilterModalTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: RFValue(24),
  },
});
