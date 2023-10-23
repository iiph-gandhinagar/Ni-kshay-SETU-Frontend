import { useNavigation, useTheme } from '@react-navigation/native';
import {
    investgationdetails,
} from '@tb-frontend/shared/globles';
import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { LabInvestigationCard } from '../../components/LabInvestigation/LabInvestigationCard';
import { dBInstance } from '../../SqlStore/Database';
import { appConfigTypes, themeProps } from '../../types';
export default function LabInvestigation(props): JSX.Element {
    const MasterObject = props?.route?.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { colors } = useTheme() as unknown as themeProps;

    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const [ans, setAns] = useState([]);
    const updatedAns = Object.assign([], ans);
    const pushToArray = (value, id, score) => {
        var index = ans.findIndex(e => e.id == id);
        if (index == -1) {
            updatedAns.push({
                id: id,
                value: value,
                score: score,
            });
        } else {
            updatedAns[index] = {
                id: id,
                value: value,
                score: score,
            };
        }
        // console.log("updatedAns", ans);
        setAns(updatedAns);
    };
    const calculateScore = (value, id) => {
        switch (id) {
            case 'PULSE_RATE':
                if (parseFloat(value) < 60 || parseFloat(value) > 100) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value)) {
                    pushToArray(value, id, 0);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'TEMPERATURE':
                if (parseFloat(value) < 35 || parseFloat(value) > 41) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) > 38.6 && parseFloat(value) <= 41) {
                    pushToArray(value, id, 1);
                } else if (value == '') {
                    pushToArray(value, id, '');
                } else if (parseFloat(value)) {
                    pushToArray(value, id, 0);
                }
                break;
            case 'BLOOD_PRESSURE':
                if (value === 'Normal (120/80mmHg)') {
                    pushToArray(value, id, 0);
                } else if (value === 'Higher Normal (< 140/90mmHg)') {
                    pushToArray(value, id, 1);
                } else if (value === 'Hypertension (> 140/90 mmHg)') {
                    pushToArray(value, id, 2);
                } else if (value === 'Hypotension (Diastolic < 60 mmHg)') {
                    pushToArray(value, id, 3);
                } else if (value === 'Hypertension (>200/100 mm Hg)') {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'RESPIRATORY_RATE':
                //12-18 0, <12 2
                if (parseFloat(value) < 12) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) >= 12 && parseFloat(value) <= 18) {
                    pushToArray(value, id, 0);
                } else if (parseFloat(value) <= 24) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) < 30) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) >= 30) {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'OXYGEN_SATURATION':
                //94 < 0
                if (parseFloat(value) >= 94 && parseFloat(value) <= 100) {
                    pushToArray(value, id, 0);
                } else if (parseFloat(value) >= 90) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) >= 85) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) < 85) {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'TEXT_BMI':
                // lessthen14 3, 14to16=2, 16to25=1,25to30=1,30to 33=2,33up=3
                if (parseFloat(value) < 14) {
                    pushToArray(value, id, 3);
                } else if (parseFloat(value) >= 14 && parseFloat(value) < 16) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) >= 16 && parseFloat(value) < 18.5) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) >= 18.5 && parseFloat(value) < 25) {
                    pushToArray(value, id, 0);
                } else if (parseFloat(value) >= 25 && parseFloat(value) < 30) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) >= 30 && parseFloat(value) < 33) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) >= 33) {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'TEXT_MUAC':
                if (parseFloat(value) < 19) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) >= 19) {
                    pushToArray(value, id, 0);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'PEDAL_OEDEMA':
                if (value === 'Yes') {
                    pushToArray(value, id, 1);
                } else if (value == '') {
                    pushToArray(value, id, '');
                } else {
                    pushToArray(value, id, 0);
                }
                break;
            case 'GENERAL_CONDITION':
                //         Conscious and normal = 0
                //Inability walk but conscious and oriented=1
                // Conscious and not oriented= 2
                // Drowsy, Unconscious, Comatose= 3
                if (value === 'Conscious and normal') {
                    pushToArray(value, id, 0);
                } else if (value === 'Inability walk but conscious and oriented') {
                    pushToArray(value, id, 1);
                } else if (value === 'Conscious and not oriented') {
                    pushToArray(value, id, 2);
                } else if (value === 'Drowsy/Unconscious/Comatose') {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'TEXT_ICTERUS':
                if (value === 'Yes') {
                    pushToArray(value, id, 1);
                } else if (value == '') {
                    pushToArray(value, id, '');
                } else {
                    pushToArray(value, id, 0);
                }
                break;
            case 'TEXT_HEMOGLOBIN':
                // <4 ->3  ,4to7 2, 7to10, 1, 10to17 0  ,18 up 2
                if (parseFloat(value) < 4) {
                    pushToArray(value, id, 3);
                } else if (parseFloat(value) >= 4 && parseFloat(value) < 7) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) >= 7 && parseFloat(value) < 10) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) >= 10 && parseFloat(value) <= 18) {
                    pushToArray(value, id, 0);
                } else if (parseFloat(value) > 18) {
                    pushToArray(value, id, 2);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'COUNT_WBC':
                // 4000to3000 =1,3000to2000=2 ,2000todown 3, 11000-14000=1,14000to16000=2, to up 3
                if (parseFloat(value) <= 2000) {
                    pushToArray(value, id, 3);
                } else if (parseFloat(value) > 2000 && parseFloat(value) < 3000) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) >= 3000 && parseFloat(value) < 4000) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) >= 4000 && parseFloat(value) < 11000) {
                    pushToArray(value, id, 0);
                } else if (parseFloat(value) >= 11000 && parseFloat(value) < 14000) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) >= 14000 && parseFloat(value) < 16000) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) >= 16000) {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'TEXT_RBS':
                // 50down 3,70-50=2 ,70-79=1,80-128=0 ,128-140=1,140-250=2,  morethen 250 3 ,
                if (parseFloat(value) < 50) {
                    pushToArray(value, id, 3);
                } else if (parseFloat(value) < 70) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) < 80) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) <= 128) {
                    pushToArray(value, id, 0);
                } else if (parseFloat(value) <= 140) {
                    pushToArray(value, id, 1);
                } else if (parseFloat(value) < 250) {
                    pushToArray(value, id, 2);
                } else if (parseFloat(value) >= 250) {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'TEXT_HIV':
                if (value === '-Ve') {
                    pushToArray(value, id, 0);
                } else if (value === '+Ve and on ART') {
                    pushToArray(value, id, 1);
                } else if (value === '+Ve and not on ART') {
                    pushToArray(value, id, 2);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;
            case 'TEXT_XRAY':
                //No abnormality=0,
                //Consolidation =2
                //Hydro Pneumothorax =3

                if (value === 'No abnormality') {
                    pushToArray(value, id, 0);
                } else if (value === 'Consolidation') {
                    pushToArray(value, id, 2);
                } else if (value === 'Hydro Pneumothorax') {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                }
                break;

            case 'TEXT_HEMOPTYSIS':
                if (value === 'Yes') {
                    pushToArray(value, id, 3);
                } else if (value == '') {
                    pushToArray(value, id, '');
                } else {
                    pushToArray(value, id, 0);
                }
                break;
            default:
                return 0;
        }
    };
    var timeIntervalSubmoduleId;
    var x = 0;
    const moduleUsage = () => {
        timeIntervalSubmoduleId = setInterval(() => {
            x = x + 1;
        }, 1000);
    };
    useEffect(() => {
        moduleUsage();
        return function cleanup() {
            clearInterval(timeIntervalSubmoduleId);
            dBInstance()?.transaction(txn => {
                txn.executeSql(
                    'INSERT INTO app_time(module,activity_type,sub_module_id,time)values(?,?,?,?)',
                    [
                        MasterObject?.type === 'CGC' ? 'NTEP Intervention' : MasterObject?.type,
                        'submodule_usage',
                        MasterObject?.id,
                        x,
                    ],
                );
            }).then(() => {
                x = 0;
            });
        };
    }, []);
    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                style={[styles.Container, { backgroundColor: colors.background }]}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={40}
            >
                <Header
                    headerTitle={appTranslations?.HEADER_LABORATORY_INVESTIGATION} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={investgationdetails}
                    style={{ padding: RFValue(10) }}
                    renderItem={({ item, index }) => {
                        return (
                            <LabInvestigationCard
                                data={item}
                                key={index}
                                Answer={ans?.find(i => i.id === item.id)}
                                onChangeText={(value, id) => {
                                    calculateScore(value, id);
                                }}
                            />);
                    }}
                />
                <Button
                    onPress={() => {
                        navigation.navigate('ScoreResult', {
                            data: ans,
                        });
                    }}
                    disabled={
                        ans.length > 0
                            ? ans.findIndex(e => e.score !== '') != -1
                                ? false
                                : true
                            : true
                    }
                    buttonText={appTranslations?.BTN_CALCULATE_SCORE}
                    style={{ marginVertical: RFValue(5), alignSelf: 'center' }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

});
