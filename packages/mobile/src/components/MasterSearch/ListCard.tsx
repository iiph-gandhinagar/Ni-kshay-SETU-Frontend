import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
    FlatList, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';
interface listCardProps {
    title: string;
    source: ImageSourcePropType | undefined;
    onPress: () => void
}
export const MasterListCard: React.FC<listCardProps> = ({
    title = '',
    source = undefined,
    onPress = () => null,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <Pressable onPress={onPress} style={[styles.container]}>
            {source && <Image
                source={source}
                style={{
                    height: RFValue(30),
                    width: RFValue(30),
                }}
            />}
            <Text style={[FontStyle.RalewayTitle, styles.text,
            { color: colors.Blue_2 }]}>
                {title}
            </Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: RFValue(16),
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        paddingStart: RFValue(15),
    },
});
