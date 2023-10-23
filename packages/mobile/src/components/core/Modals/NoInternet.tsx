import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { themeProps } from '../../../types';
interface Props {
}
const NoInterner: React.FC<Props> = () => {
    const { colors } = useTheme() as unknown as themeProps;
    const netInfo = useNetInfo();
    return (
        <Modal
            coverScreen={false}
            animationIn={'bounceInLeft'}
            animationOut={'bounceOutRight'}
            isVisible={netInfo.isInternetReachable === false}>
            <View
                style={[styles.Container, { backgroundColor: "#FFF" }]}>
                <Lottie
                    loop={true}
                    autoPlay
                    style={{ height: RFValue(260) }}
                    source={require('../../../assets/Animations/nointernet.json')}
                />
            </View>
        </Modal>
    );
};
export default NoInterner;
const styles = StyleSheet.create({
    Container: {
        padding: RFValue(10),
        borderRadius: RFValue(6),
        alignItems: 'center',
    },
});
