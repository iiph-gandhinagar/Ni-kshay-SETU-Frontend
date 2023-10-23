import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
    Pressable, SafeAreaView, ScrollView, StyleSheet,
    Text, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { Header } from '../../components/core/Header';
import { ScreeningToolResultCard } from '../../components/ScreeningToolResultCard';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
import Lottie from 'lottie-react-native';

export default function Result(props): JSX.Element {
    const ResultObj = props.route.params;
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
            <Header headerTitle={appTranslations.HEADER_SCREENING_TOOL} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollView}>
                {/* <Image
                style={styles.image}
                source={require('../../assets/screening.png')}
            /> */}
                <View style={{
                    height: RFValue(110),
                    // position: 'absolute',
                    marginBottom: RFValue(22),
                }}>
                    <Lottie
                        loop={false}
                        autoPlay
                        source={require('../../assets/Animations/right.json')}
                    /></View>
                <Text style={[FontStyle.Nunito18Title, styles.text, { color: colors.Blue_Theme }]}>{appTranslations.THANK_U_FOR_THE_INPUTS}
                </Text>

                <Text style={[FontStyle.Nunito16, styles.text, { color: colors.Grey_4 }]}>
                    {ResultObj?.is_tb === 0
                        ? appTranslations.RESULT_NOTTB_TEXT
                        : appTranslations.RESULT_TB_TEXT}
                </Text>

                {ResultObj?.is_tb == 1 && (
                    <Pressable
                        onPress={() => {
                            if (ResultObj?.tbId) {
                                navigation.navigate('AlgorithmDetails', {
                                    name: 'Diagnosis',
                                    type: 'Diagnosis Algorithm',
                                    id: ResultObj?.tbId,
                                });
                            }
                        }}>
                        <Text style={[FontStyle.Nunito18Title, styles.text, { color: colors.tealGreen }]}>
                            {ResultObj?.detected_tb}
                        </Text>
                    </Pressable>
                )}
                <View style={[styles.ResultCards]}>
                    <ScreeningToolResultCard
                        title={appTranslations.NUTRITION_OUTCOME}
                        image={require('../../assets/nutritional.png')}
                        onPress={() => {
                            navigation.navigate('NutritionOutcome', ResultObj);
                        }} />
                    {ResultObj?.is_tb == 1 && (
                        <React.Fragment>
                            <View style={{ flex: 0.2 }} />
                            <ScreeningToolResultCard
                                title={appTranslations.NUTRITION_OUTCOME_DETAILS}
                                image={require('../../assets/NutritionOutcome.png')}
                                onPress={() => {
                                    navigation.navigate('NutritionOutcomeDetails', {
                                        title: ResultObj?.nutritionTitle,
                                        ResultObj: ResultObj,
                                    });
                                }} />
                        </React.Fragment>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ScrollView: {
        marginHorizontal: RFValue(22),
        marginTop: RFValue(22),
    },
    image: {
        width: RFValue(163),
        height: RFValue(163),
        alignSelf: 'center',
        marginBottom: RFValue(35),
    },
    text: {
        marginBottom: RFValue(10),
        textAlign: 'center',
    },
    ResultCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: RFValue(60),
    },

});
