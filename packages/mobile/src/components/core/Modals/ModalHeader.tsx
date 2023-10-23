import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
interface ModalHeaderProps {
    title: string;
    onClose: () => void;
    isFeedback?: boolean
}
export const ModalHeader: React.FC<ModalHeaderProps> = ({
    title = '',
    onClose = () => null,
    isFeedback = false,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text
                style={[isFeedback ? FontStyle.RalewayTitle : FontStyle.Raleway18
                    , styles.titleText, { color: isFeedback ? colors.ORANGE : colors.Blue_2, flex: 1 }]}>
                {title}
            </Text>
            <Icon
                onPress={onClose}
                name="cancel"
                size={RFValue(20)}
                color={colors.Blue_Theme}
                style={{ margin: RFValue(10) }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
    },
});
