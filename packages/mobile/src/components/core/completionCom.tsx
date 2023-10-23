import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../config/FontStyle';
import { themeProps } from '../../types';
interface Props {
Total:string;
Complete:string;
}
export const CompletionCom: React.FC<Props> = ({
    Total = '00',
    Complete = '00',
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
<>
 <Text style={[FontStyle.Nunito18Title, { color: colors.Blue_Theme }]}>{Complete}{' '}</Text>
                <Text style={[FontStyle.Nunito12,styles.title, {color: colors.ORANGE }]}>/{Total}</Text>
        </>

    );
};
let styles = StyleSheet.create({
    title: {
        marginTop: RFValue(3),
    },
});
