import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { themeProps } from '../../../types';
interface Props {
    isModalVisible: boolean;
    children: any;
}
export const CustomModal: React.FC<Props> = ({
    isModalVisible = false,
    children,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <Modal coverScreen={false} isVisible={isModalVisible}>
            <View style={styles.item}>{children}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    item: {
        borderRadius: RFValue(6),
        padding: RFValue(15),
        justifyContent: 'center',
        backgroundColor: '#fff',
        // alignItems: 'center',
    },
});
