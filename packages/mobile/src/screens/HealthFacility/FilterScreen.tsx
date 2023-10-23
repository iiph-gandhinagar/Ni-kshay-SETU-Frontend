import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import {
    clearFilterDetails,
    clearFilters,
    getFilterDetails, setBlockId,
    setDistrictId,
    setFacilities,
    setStateId,
} from '@tb-frontend/shared/Store/action/healthFacilityAction';
import {
    clearBlock,
    clearDistrict, getBlockByDistrict,
    getDistrictByState,
} from '@tb-frontend/shared/Store/action/usersActions';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
const tabName = [
    {
        id: 1,
        title: 'State',
    },
    {
        id: 2,
        title: 'District',
    },
    {
        id: 3,
        title: 'Block',
    },
    {
        id: 4,
        title: 'Facilities',
    },
];
export default function FilterScreen(props): JSX.Element {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = useState('Facilities');
    const { colors } = useTheme() as unknown as themeProps;
    const { healthFacility } = useSelector(state => state?.app);
    const { stateID, districtID, sortBy, blockID, facility, searchTerm } = useSelector(state => state?.health);
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const { State, allDistricts, allBlocks } = useSelector(state => state?.user);
    const checkBox = facility !== '' ? facility?.split(',') : [];
    const CheckBoxUpdate = Object.assign([], checkBox);
    const filter = async name => {
        const index = CheckBoxUpdate.findIndex(e => e === name);
        if (index == -1) {
            CheckBoxUpdate.push(name);
        } else {
            CheckBoxUpdate.splice(index, 1);
        }
        await dispatch(setFacilities(CheckBoxUpdate.join()));
    };
    const StateComponent = () => {
        return (
            <View
                style={styles.filterList}>
                <ScrollView contentContainerStyle={[]} showsVerticalScrollIndicator={false}>
                    {State?.map((data, i) => {
                        return (
                            <BouncyCheckbox
                                key={data?.title}
                                isChecked={stateID === data?.id}
                                fillColor={colors.Card_Gradian}
                                textStyle={[FontStyle.Nunito12,
                                {
                                    color: colors.black,
                                    textDecorationLine: 'none',
                                }]}
                                text={data?.title}
                                disableBuiltInState
                                style={{ flex: 1, margin: RFValue(8) }}
                                onPress={() => {
                                    dispatch(setStateId(data?.id));
                                    dispatch(setDistrictId(-1));
                                    dispatch(setBlockId(-1));
                                    dispatch(clearDistrict());
                                    dispatch(clearBlock());
                                    dispatch(getDistrictByState(data?.id));
                                }}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    };
    const DistrictComponent = () => {
        return (
            <View style={styles.filterList}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {allDistricts?.map((data, i) => {
                        return (
                            <BouncyCheckbox
                                key={data?.title}
                                isChecked={districtID === data?.id}
                                fillColor={colors.Card_Gradian}
                                textStyle={[FontStyle.Nunito12,
                                {
                                    color: colors.black,
                                    textDecorationLine: 'none',
                                }]}
                                text={data?.title}
                                disableBuiltInState
                                style={{ flex: 1, margin: RFValue(8) }}
                                onPress={() => {
                                    dispatch(setDistrictId(data?.id));
                                    dispatch(setBlockId(-1));
                                    dispatch(clearBlock());
                                    dispatch(getBlockByDistrict(data?.id));
                                }}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    };
    const BlockComponent = () => {
        return (
            <View style={styles.filterList}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {allBlocks?.map((data, i) => {
                        return (
                            <BouncyCheckbox
                                key={data?.title}
                                isChecked={blockID === data?.id}
                                fillColor={colors.Card_Gradian}
                                textStyle={[FontStyle.Nunito12,
                                {
                                    color: colors.black,
                                    textDecorationLine: 'none',
                                }]}
                                text={data?.title}
                                disableBuiltInState
                                style={{ flex: 1, margin: RFValue(8) }}
                                onPress={() => {
                                    dispatch(setBlockId(data?.id));
                                }}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    };
    const Facilities = () => {
        return (
            <View style={styles.filterList}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {Object.keys(healthFacility).map((data, i) => {
                        return (
                            <BouncyCheckbox
                                key={data}
                                isChecked={checkBox.find(e => e === data) ? true : false}
                                fillColor={colors.Card_Gradian}
                                textStyle={[FontStyle.Nunito12,
                                {
                                    color: colors.black,
                                    textDecorationLine: 'none',
                                }]}
                                text={healthFacility[data]}
                                disableBuiltInState
                                style={{ flex: 1, margin: RFValue(8) }}
                                onPress={() => {
                                    filter(data);
                                }}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    };
    const selectedTabView = () => {
        switch (selectedTab) {
            case 'State':
                return <StateComponent />;
            case 'District':
                return <DistrictComponent />;
            case 'Block':
                return <BlockComponent />;
            case 'Facilities':
                return <Facilities />;
            default:
                return;
        }
    };
    return (
        <View style={[styles.Container, { backgroundColor: colors.certiSubHeaderBack }]}>
            <View style={styles.FilterScreenContainer}>
                <View style={[styles.FilterScreenHeader, { borderBottomColor: colors.Grey_4 }]}>
                    <Text style={[FontStyle.Nunito12, { color: colors.certiSubHeaderTitle }]}>{appTranslations.TEXT_FILTERS}</Text>
                    <Pressable
                        onPress={async () => {
                            await dispatch(clearFilters(-1));
                            setSelectedTab('State');
                        }}>
                        <Text style={[FontStyle.Nunito12, { color: colors.ORANGE }]}>
                            {appTranslations.TEXT_CLEAR_ALL}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.FilterScreenBody}>
                    <View style={[styles.FilterScreenLeftTabs, { borderRightColor: colors.Grey_4 }]}>
                        {tabName?.map((data, i) => {
                            return (
                                <Pressable
                                    key={i}
                                    style={{
                                        paddingVertical: RFValue(12),
                                        paddingLeft: RFValue(16),
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.Grey_4,
                                        backgroundColor:
                                            selectedTab == data?.title
                                                ? colors.Blue_Theme
                                                : data?.title == 'District'
                                                    ? stateID !== -1 && stateID !== 0
                                                        ? 'transparent'
                                                        : colors.Grey_4
                                                    : data?.title == 'Block'
                                                        ? districtID !== -1 && districtID !== 0
                                                            ? 'transparent'
                                                            : colors.Grey_4
                                                        : 'transparent',
                                    }}
                                    disabled={
                                        data?.title == 'District'
                                            ? stateID !== -1 && stateID !== 0
                                                ? false
                                                : true
                                            : data?.title == 'Block'
                                                ? districtID !== -1 && districtID !== 0
                                                    ? false
                                                    : true
                                                : false
                                    }
                                    onPress={() => setSelectedTab(data?.title)}
                                >
                                    <Text
                                        style={[
                                            FontStyle.Nunito12,

                                            {
                                                color:
                                                    selectedTab == data?.title
                                                        ? colors.HOVER_ORANGE
                                                        : colors.black,
                                            },
                                        ]}>
                                        {data?.title}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    {selectedTabView()}
                </View>
                <View style={[styles.FilterBottomButtonContainer, {
                    backgroundColor: colors.dropDownSelectBack,
                }]}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={styles.FilterBottomButton}>
                        <Text
                            style={[FontStyle.Nunito16, { color: colors.black2 }]}>
                            {appTranslations.TEXT_CLOSE}
                        </Text>
                    </Pressable>

                    <View style={[styles.VerticalDivider, { borderColor: colors.Grey_2 }]} />
                    <Pressable
                        onPress={async () => {
                            await dispatch(clearFilterDetails());
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
                            navigation.goBack();
                        }}
                        style={styles.FilterBottomButton}>
                        <Text style={[FontStyle.Nunito16, { color: colors.tabInActive }]}>
                            {appTranslations.TEXT_APPLY}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    FilterScreenContainer: {
        flex: 1,
    },

    FilterBottomButtonContainer: {
        flexDirection: 'row',
        elevation: RFValue(16),
    },
    FilterBottomButton: {
        flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: RFValue(12),
        alignItems: 'center',
    },
    VerticalDivider: {
        borderWidth: 1,

    },
    FilterScreenHeader: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: RFValue(16),
        // backgroundColor: 'red',
        borderBottomWidth: 1,

    },
    FilterScreenBody: {
        flex: 1,
        // backgroundColor: 'red',
        flexDirection: 'row',
    },
    FilterScreenLeftTabs: {
        flex: 0.6,
        // backgroundColor: 'blue',
        // width: RFValue(130),
        borderRightWidth: 1,

    },
    filterList: {
        flex: 1,
        paddingTop: RFValue(16),
        paddingRight: RFValue(16),
        marginHorizontal: RFValue(5),
    },
});
