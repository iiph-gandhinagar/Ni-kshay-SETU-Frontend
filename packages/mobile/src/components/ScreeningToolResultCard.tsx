import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../config/FontStyle';
import { themeProps } from '../types';


interface Props {
    onPress: () => void;
    title: string;
    image: ImageSourcePropType | undefined;
}

export const ScreeningToolResultCard: React.FC<Props> = ({
    onPress = () => null,
    title = '',
    image = undefined,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <Pressable style={[styles.Container, { backgroundColor: colors.Light_blue }]} onPress={onPress}>
            <Image
                style={styles.image}
                source={image}
            />
            <Text style={[FontStyle.Nunito16, styles.Title, { color: colors.Blue_Theme }]}>{title}</Text>
        </Pressable>
    );
};
let styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        flex: 1,
        maxWidth: RFValue(155),
        minHeight: RFValue(155),
        paddingHorizontal: RFValue(11),
        paddingBottom: RFValue(15),
        paddingTop: RFValue(20),
        borderRadius: RFValue(5),
    },
    Title: {
        flex: 1,
        paddingTop: RFValue(10),
        textAlign: 'center',
    },
    image: {
        width: RFValue(55),
        height: RFValue(55),
    },

});
