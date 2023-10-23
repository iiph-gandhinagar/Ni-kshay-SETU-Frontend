import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
import { ModalHeader } from '../Modals/ModalHeader';
import { CmsData } from './cmsData';
interface DescriptionCMSprops {
    selectedalgo: any
}
export const DescriptionCMS: React.FC<DescriptionCMSprops> = ({ selectedalgo }) => {
    const { colors } = useTheme() as unknown as themeProps;
    const [isOpen, setOpen] = useState(false);
    return (
        <React.Fragment>
            <Pressable
                onPress={() => setOpen(true)}
                style={[styles.SubModuleCardContainer, {
                    backgroundColor: colors.cardBorder,
                    borderColor: colors.Blue_Theme,
                }]}>
                <Text
                    style={[FontStyle.RalewayTitle, styles.titleText, { color: colors.black2 }]}>
                    {selectedalgo?.title}
                </Text>
                {/* <View style={{ margin: RFValue(12) }}>
                <CmsData source={selectedalgo?.description} />
            </View> */}
            </Pressable>
            <DescriptionCMSModal
                selectedalgo={selectedalgo}
                isVisible={isOpen}
                setVisible={val => {
                    setOpen(val);
                }}
            />
        </React.Fragment>
    );
};
interface DescriptionModalprops {
    selectedalgo: any;
    isVisible: boolean;
    setVisible: (value: Boolean) => void
}
export const DescriptionCMSModal: React.FC<DescriptionModalprops> = ({ selectedalgo, isVisible = false, setVisible }) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <Modal
            onBackdropPress={() => setVisible(false)}
            onBackButtonPress={() => setVisible(false)}
            animationIn="slideInDown"
            animationOut="slideOutDown"
            isVisible={isVisible}>

            <View style={[styles.container, { backgroundColor: colors.white, maxHeight: '90%', width: '100%', padding: RFValue(10) }]}>
                <ModalHeader
                    onClose={() => setVisible(false)}
                    title={selectedalgo?.title}
                />
                <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
                    <View style={{ marginVertical: RFValue(10) }}>
                        <CmsData source={selectedalgo?.description} />
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};
interface AlgoDividerProps {
    title: string;
}
export const AlgoDivider: React.FC<AlgoDividerProps> = ({ title = '' }) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={[styles.dividerContainer]}>
            <Icon
                name="south"
                size={RFValue(10)}
                color={colors.Blue_Theme}
            />
            <Text style={[FontStyle.RalewayText12, styles.dividertext, { color: colors.Blue_Theme }]} >
                {title}
            </Text>
            <Icon
                name="south"
                size={RFValue(10)}
                color={colors.Blue_Theme}
            />
        </View>
    );
};
interface LastNodeProps {
    title: string;
    onPress?: () => void;
}
export const LastNode: React.FC<LastNodeProps> = ({
    title = '',
    onPress = () => null,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <Pressable onPress={onPress} style={{
            backgroundColor: colors.Card_4,
            padding: RFValue(12),
            borderRadius: RFValue(5),
            marginBottom: RFValue(20),
        }}>
            <Text style={[FontStyle.Nunito16, { color: colors.black, flex: 1, textAlign: 'center' }]}>
                {title}
            </Text>
        </Pressable>
    );
};
let styles = StyleSheet.create({
    container: {
        borderRadius: RFValue(6),
    },
    SubModuleCardContainer: {
        borderRadius: RFValue(5),
        overflow: 'hidden',
        padding: RFValue(8),
    },
    titleText: {
        textAlign: 'center',
    },
    dividerContainer: { justifyContent: 'center', marginVertical: RFValue(10), alignItems: 'center' },
    dividertext: { textAlign: 'center', marginVertical: RFValue(5) },
    divider: { borderStartWidth: 1, height: RFValue(10) },
});
