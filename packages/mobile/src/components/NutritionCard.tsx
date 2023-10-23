import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Props } from 'react-native-tab-view/lib/typescript/TabBarItem';
import { FontStyle } from '../config/FontStyle';
import { themeProps } from '../types';


interface Props {
    title: string;
    value: string;
}

export const NutritionCard: React.FC<Props> = ({
    title = '',
    value = '',
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={[styles.Container, { backgroundColor: colors.white }]}>
            <Text style={[FontStyle.RalewayTitle, styles.Title, { color: colors.Card_Gradian }]}>{title}</Text>
            <Text style={[FontStyle.RalewayTitle, styles.value, { color: colors.Blue_Theme }]}>{value}</Text>
        </View>
    );
};
let styles = StyleSheet.create({
    Container: {
        height: RFValue(139),
        padding: RFValue(12),
        elevation: RFValue(8),
        borderRadius: RFValue(5),
        marginBottom: RFValue(25),
    },
    Title: {
        flex: 1,
        paddingHorizontal: RFValue(3),
        textAlign: 'center',
    },
    value: {
        textAlign: 'center',
    },

});
