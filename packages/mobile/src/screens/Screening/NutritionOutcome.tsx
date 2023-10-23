import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';
import { useDispatch, useSelector } from 'react-redux';
import { BmiResult } from '../../components/core/BmiResult';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { NutritionCard } from '../../components/NutritionCard';
import { appConfigTypes, themeProps } from '../../types';
export default function NutritionOutcome(props): JSX.Element {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const OutcomeObj = props.route.params;
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    const dispatch = useDispatch();
    const data = [
        {
            // image: require('../../assets/weight-scale.png'),
            cardTitle: 'DESIRABLE_WEIGHT',
            cardSubTitle: `${parseFloat(OutcomeObj?.desirableWeight).toFixed(2)} kg`,
        },
        {
            // image: require('../../assets/weight-scale1.png'),
            cardTitle: 'MINIMUM_ACCEPTABLE_WEIGHT',
            cardSubTitle: `${parseFloat(OutcomeObj?.minimumAcceptableWeight).toFixed(
                2,
            )} kg`,
        },
        {
            // image: require('../../assets/weight-scale2.png'),
            cardTitle: 'DESIRABLE_WEIGHT_GAIN',
            cardSubTitle: `${parseFloat(OutcomeObj?.desirableWeightGain).toFixed(
                2,
            )} kg`,
        },
        {
            // image: require('../../assets/weight-scale3.png'),
            cardTitle: 'MINIMUM_WEIGHT_GAIN_REQUIRED',
            cardSubTitle: `${parseFloat(
                OutcomeObj?.minimumWeightGainRequired,
            ).toFixed(2)} kg`,
        },
        {
            // image: require('../../assets/weight-scale4.png'),
            cardTitle: 'DESIRABLE_DAILY_CALORIC_INTAKE',

            cardSubTitle: `${parseFloat(
                OutcomeObj?.desirableDailyCaloricIntake,
            ).toFixed(2)} Kcal`,
        },
        {
            // image: require('../../assets/weight-scale5.png'),
            cardTitle: 'DESIRABLE_DAILY_PROTEIN_INTAKE_RANGE',
            cardSubTitle: `${parseFloat(
                OutcomeObj?.desirableDailyProteinIntake,
            ).toFixed(2)} g`,
        },
    ];
    return (
        <SafeAreaView style={styles.Container}>
            <Header headerTitle={appTranslations.NUTRITION_OUTCOME} />
            <FlatGrid
                ListHeaderComponent={<BmiResult user_bmi={OutcomeObj?.user_bmi} type={OutcomeObj?.BMI} />}
                ListFooterComponent={
                    <View
                        style={styles.ButtonContainer}>
                        {OutcomeObj?.is_tb === 1 && (
                            <Button
                                //   disabled={btndisable}
                                onPress={() => {
                                    navigation.navigate('NutritionOutcomeDetails', {
                                        title: OutcomeObj?.nutritionTitle,
                                        ResultObj: OutcomeObj,
                                    });
                                }}
                                buttonText={appTranslations.BTN_C_ASMENT_NEXT}
                                style={{ flex: 1, marginBottom: RFValue(20) }}
                            />
                        )}
                        <Button
                            //   disabled={btndisable}
                            onPress={() => {
                                navigation.navigate('AlgorithmDetails', {
                                    name: 'TITLE_TREATMENT_ALGORITHM',
                                    type: 'Treatment Algorithm',
                                    algo_Id: OutcomeObj?.Treatment_id,
                                    id: 2,
                                    bmiID: OutcomeObj?.Treatment_id,
                                });
                            }}
                            buttonText={appTranslations.BTN_Nutrition_Management}
                            style={{ flex: 1 }}
                        />
                    </View>}
                adjustGridToStyles={true}
                itemDimension={RFValue(122)}
                spacing={RFValue(10)}
                // itemContainerStyle={{ backgroundColor: colors.Light_blue, borderRadius: RFValue(5) }}
                data={data}
                keyExtractor={(item, index) => item?.cardTitle + ' - screen - ' + index}
                renderItem={({ item, index }) => {
                    return (
                        <NutritionCard
                            title={appTranslations[item.cardTitle]}
                            value={item.cardSubTitle}
                            key={item?.cardTitle + ' - screen - ' + index}
                        />
                    );

                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ButtonContainer: {
        marginBottom: RFValue(50),
        paddingHorizontal: RFValue(20),
    },
});
