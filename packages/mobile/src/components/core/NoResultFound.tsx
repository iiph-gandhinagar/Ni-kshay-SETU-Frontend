import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';

interface Props {
    header?: string;
    viewStyle?: StyleProp<ViewStyle>
    source?: ImageSourcePropType | undefined
}
export const NoResultFound: React.FC<Props> = ({
    header = 'No Result Found',
    viewStyle = undefined,
    source = undefined,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={[styles.Continer, viewStyle]}>
            <Image
                resizeMode="center"
                style={{ width: RFValue(100), height: RFValue(100), marginBottom: RFValue(10) }}
                source={source || require('../../assets/noData.png')}
            />
            <Text style={[FontStyle.Heading4, { color: colors.black }, styles.Txt]}>{header}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    Continer: {
        alignItems: 'center',
        flex: 1,
        marginTop: RFValue(200),
    },
    Txt: {
        textAlign: 'center',
    },
});
