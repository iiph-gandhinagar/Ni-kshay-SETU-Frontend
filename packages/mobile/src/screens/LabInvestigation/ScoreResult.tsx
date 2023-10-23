import { StackActions, useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { AssesTBResult, AssesTBResultCard } from '../../components/core/AssesTBResult';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
export default function ScoreResult(props): JSX.Element {
    const ResultObj = props?.route?.params?.data;
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    var max = Math.max.apply(
        Math,
        ResultObj?.map(o => o?.score),
    );
    if (max === 1) {
        const lookup = ResultObj.reduce((a, e) => {
            a[e.score] = ++a[e.score] || 0;
            return a;
        }, {});
        if (ResultObj.filter(e => lookup[e.score]).length > 2) {
            max = 2;
        }
    }
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const scoredetails = [
        {
            id: 'GENERAL_CONDITION',

            title: 'GENERAL_CONDITION',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEXT_ICTERUS',

            title: 'TEXT_ICTERUS',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'PEDAL_OEDEMA',

            title: 'PEDAL_OEDEMA',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'PULSE_RATE',

            title: 'PULSE_RATE',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEMPERATURE',

            title: 'TEMPERATURE',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'BLOOD_PRESSURE',

            title: 'BLOOD_PRESSURE',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'RESPIRATORY_RATE',

            title: 'RESPIRATORY_RATE',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'OXYGEN_SATURATION',

            title: 'OXYGEN_SATURATION',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEXT_BMI',

            title: 'TEXT_BMI',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEXT_MUAC',

            title: 'TEXT_MUAC',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEXT_HEMOGLOBIN',

            title: 'TEXT_HEMOGLOBIN',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'COUNT_WBC',

            title: 'COUNT_WBC',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEXT_RBS',

            title: 'TEXT_RBS',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEXT_HIV',

            title: 'TEXT_HIV',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEXT_XRAY',

            title: 'TEXT_XRAY',
            subtitle: 'TEXT_SCORE',
        },
        {
            id: 'TEXT_HEMOPTYSIS',

            title: 'TEXT_HEMOPTYSIS',
            subtitle: 'TEXT_SCORE',
        },
    ];

    const ListHeaderComponent = () => {
        return (
            <React.Fragment>
                <AssesTBResult max={max} />
                <Text style={[FontStyle.Nunito16, { color: colors.black, marginBottom: RFValue(15) }]}>
                    {appTranslations.DETAILED_SCORE}
                </Text>
            </React.Fragment>
        );
    };
    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
            <Header
                headerTitle={appTranslations.Differentiated_Care_Result_Title} />
            <FlatGrid
                style={{ marginHorizontal: RFValue(9) }}
                itemDimension={RFValue(130)}
                spacing={RFValue(10)}
                ListHeaderComponent={ListHeaderComponent}
                data={scoredetails}
                renderItem={({ item, index }) => {
                    return (
                        <AssesTBResultCard
                            title={appTranslations[item.title]}
                            score={ResultObj?.find(e => e?.id == item?.id)?.score}
                            value={ResultObj?.find(e => e?.id == item?.id)?.value}
                            key={item?.title + ' - screen - ' + index}
                        />
                    );
                }}
            />
            <Button
                onPress={function (): void {
                    navigation.dispatch(StackActions.popToTop());
                }}
                style={{ marginVertical: RFValue(5), alignSelf: 'center' }}
                buttonText={appTranslations.TAB_HOME} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
