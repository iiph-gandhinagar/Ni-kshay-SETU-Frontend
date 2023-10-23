import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';
import { ListSB } from './AssessmentList';


interface ResultConatinerProps {
    // onPress?: () => void;
    Marks: string;
    attempted: string;
    skipped: string;
    right_answers: string;
    wrong_answers: string;

}

export const ResultConatiner: React.FC<ResultConatinerProps> = ({
    // onPress = () => null,
    attempted = '',
    skipped = '',
    right_answers = '',
    wrong_answers = '',
    Marks = '',
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,);
    return (

        <View style={[styles.Card, { backgroundColor: colors.white }]}>
            <View style={[styles.headerConatiner, { backgroundColor: colors.tealGreen }]}>
                <Text
                    style={[FontStyle.Raleway18, styles.headerTxt, { color: colors.white }]}>
                    {appTranslations?.RESULT}
                </Text>
            </View>
            <View >
                <ListSB titleFirst={'Attempted'} title={attempted} TextStyle={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Grey_3 }]} />
                <ListSB titleFirst={'Skipped'} title={skipped} TextStyle={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Grey_3 }]} />
                <ListSB titleFirst={'Right Answer'} title={right_answers} TextStyle={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Grey_3 }]} />
                <ListSB titleFirst={'Wrong Answer'} title={wrong_answers} TextStyle={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Grey_3 }]} />
                <View style={{ marginHorizontal: RFValue(12)}}>
                    <Text style={[FontStyle.RalewayTitle, styles.pointFont, { color: colors.Blue_Theme }]}>{appTranslations?.POINTS}</Text>
                    <View style={[styles.BtnContainer, { backgroundColor: colors.tealGreen }]}>
                        <Text style={[FontStyle.Nunito18Title, styles.ResultFont, { color: colors.brightYellow }]}>
                            {Marks}</Text>
                    </View>
                </View>

            </View>
        </View>
    );
};



const styles = StyleSheet.create({

    Card: {
        flex: 1,
        marginTop: RFValue(25),
        borderRadius: RFValue(10),
        elevation: RFValue(2),
        marginHorizontal: RFValue(8),
        maxWidth: RFValue(344),
    },
    headerConatiner: {
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
        alignItems: 'flex-start',
    },
    BtnContainer: {
        marginBottom: RFValue(5),
        borderRadius: RFValue(5),
        paddingVertical: RFValue(8),
    },
    ResultFont: {
        textAlign: 'center',
    },
    pointFont: {
        textAlign: 'center',
        padding: RFValue(12),
    },

    headerTxt: {
        padding: RFValue(3),
        marginStart: RFValue(10),
    },
});
