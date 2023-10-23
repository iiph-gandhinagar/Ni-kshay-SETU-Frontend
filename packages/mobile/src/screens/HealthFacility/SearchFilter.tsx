import { useNavigation } from '@react-navigation/core';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { appConfigTypes, themeProps } from '../../types';

import {
    clearFilterDetails, getFilterDetails,
    setFilterPage,
    setSearchTerm,
} from '@tb-frontend/shared/Store/action/healthFacilityAction';
import {
    default as Icons,
} from 'react-native-vector-icons/Fontisto';
import { FontStyle } from '../../config/FontStyle';
export default function SearchFilter(props): JSX.Element {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { colors } = useTheme() as unknown as themeProps;
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,);
    const { stateID, districtID, sortBy, blockID, facility, searchTerm, filterDetails, filterObj, loader } = useSelector(state => state?.health);
    return (
        <React.Fragment>
            <Pressable style={[styles.Subcontainer, { borderColor: colors.Grey_4 }]}>
                <Icons
                    name="zoom"
                    size={RFValue(20)}
                    color={colors.Blue_2}
                />
                <TextInput
                    style={[styles.txtInput, FontStyle.Nunito18Title, { color: colors.Blue_2 }]}
                    placeholderTextColor={colors.Blue_2}
                    placeholder={appTranslations.PLACEHOLDER_SEARCH}
                    onChangeText={val => dispatch(setSearchTerm(val))}
                    onEndEditing={e => {
                        dispatch(clearFilterDetails());
                        dispatch(setFilterPage(2)); ///check for next page
                        dispatch(
                            getFilterDetails({
                                page: 1,
                                HF: facility,
                                ST: e.nativeEvent.text,
                                stateID: stateID,
                                districtID: districtID,
                                blockID: blockID,
                                sort: sortBy,
                            }),
                        );
                        navigation.goBack();
                    }}
                    defaultValue={searchTerm}
                />
            </Pressable >
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    txtInput: {
        flex: 1,
        paddingHorizontal: RFValue(20),
    },
    Subcontainer: {
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: RFValue(35),
        paddingHorizontal: RFValue(10),
        margin: RFValue(15),
    },
});
