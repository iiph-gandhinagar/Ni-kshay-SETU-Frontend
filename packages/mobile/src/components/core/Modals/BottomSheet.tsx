import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    default as MaterialIcon,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { FontStyle } from '../../../config/FontStyle';
import { appTheme } from '../../../config/theme';
import { appConfigTypes, themeProps } from '../../../types';

interface Props {
    isOpen: boolean;
    children: any;
    onClose: () => Void;
}

const BottomSheetModal: React.FC<Props> = ({
    isOpen = false,
    children,
    onClose = () => null,
}) => {
    const [SortBy, setSortBy] = useState(false);
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations);
    const { colors } = useTheme() as unknown as themeProps;
    const refRBSheet = useRef(null);
    useEffect(() => {
        if (isOpen) {
            refRBSheet?.current?.open();
        } else {
            console.log('isOpen', isOpen);
            refRBSheet?.current?.close();
            onClose();
        }
    }, [isOpen]);
    return (
        <RBSheet
            ref={refRBSheet}
            animationType="slide"
            closeOnDragDown={false}
            closeOnPressMask={false}
            onClose={onClose}
            dragFromTopOnly={true}
            customStyles={{
                wrapper: {
                    // backgroundColor: colors.headerBackground,
                    flex: 1,
                },
                container: {
                    backgroundColor: colors.background,
                    // // flex: 1,
                    height: RFValue(185),
                    borderTopLeftRadius: RFValue(5),
                    borderTopRightRadius: RFValue(5),
                },
                draggableIcon: {
                    backgroundColor: colors.headerBackground,
                },
            }}
        >
            {children}
        </RBSheet>
    );
};

export default BottomSheetModal;



const styles = StyleSheet.create({

    item: {
        padding: RFValue(24),
        justifyContent: 'center',
    },
    FilterModalText: {
        fontSize: RFValue(14),
        flex: 1,
        color: appTheme.colors.black,
    },
    FilterModalTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: RFValue(24),
    },
    FilterBottomButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },


});
