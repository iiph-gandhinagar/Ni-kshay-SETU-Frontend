import { useNavigation, useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import {
    getAllSymptoms,
    storeUserScreening
} from '@tb-frontend/shared/Store/action/screeningAction';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import StepIndicator from 'react-native-step-indicator';
import { useDispatch, useSelector } from 'react-redux';
import { SymptomsCard } from '../../components/core/AlgoLIstCard';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { ScreeningSlider } from '../../components/ScreeningSlider';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
export default function ScreeningStepper(): JSX.Element {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const [current, setCurrent] = useState(0);
    const [checkBox, setCheckBox] = useState([]);
    const CheckBoxUpdate = Object.assign([], checkBox);
    const [ageValue, setAgeValue] = useState(10);
    const [ageValue2, setAgeValue2] = useState(10);
    const [weightValue, setWeightValue] = useState(10);
    const [weightValue2, setWeightValue2] = useState(10);
    const [heightValue, setHeightValue] = useState(10);
    const [heightValue2, setHeightValue2] = useState(10);
    const Symptoms = useSelector(state => state?.screening?.symptomsList);
    const { colors } = useTheme() as unknown as themeProps;
    const labels = [appTranslations.SCREENING_STEPER_LABEL_BASIC_INFO, appTranslations.SCREENING_STEPER_LABEL_SYMPTOMS];
    const onStepPress = position => {
        setCurrent(position);
    };
    const customStyles = {
        stepIndicatorSize: RFValue(25),
        currentStepIndicatorSize: RFValue(30),
        separatorStrokeWidth: RFValue(1),
        currentStepStrokeWidth: RFValue(1),
        stepStrokeCurrentColor: colors.Light_blue,
        stepStrokeWidth: RFValue(3),
        stepStrokeFinishedColor: colors.Blue_2,
        stepStrokeUnFinishedColor: colors.Light_blue,
        separatorFinishedColor: colors.Blue_2,
        separatorUnFinishedColor: colors.Light_blue,
        stepIndicatorFinishedColor: colors.Blue_2,
        stepIndicatorUnFinishedColor: colors.white,
        stepIndicatorCurrentColor: colors.Light_blue,
        stepIndicatorLabelFontSize: RFValue(13),
        currentStepIndicatorLabelFontSize: RFValue(13),
        stepIndicatorLabelCurrentColor: colors.Blue_2,
        stepIndicatorLabelUnFinishedColor: colors.Grey_4,
        stepIndicatorLabelFinishedColor: colors.white,
        labelColor: colors.Blue_2,
        labelSize: RFValue(13),
        currentStepLabelColor: colors.Blue_2,
    };
    const filter = name => {
        console.log('filter', name);
        const index = CheckBoxUpdate.findIndex(e => e === name);
        if (index == -1) {
            CheckBoxUpdate.push(name);
        } else {
            CheckBoxUpdate.splice(index, 1);
        }
        setCheckBox(CheckBoxUpdate);
    };
    const callBack = res => {
        if (res?.code === 200 && res?.status) {
            navigation.navigate('Result', res?.data);
        }
    };
    const submitResult = () => {
        const submitObj = {
            age: ageValue,
            weight: weightValue,
            height: heightValue,
            symptoms_selected: checkBox.join(),
        };
        console.log('submitObj', submitObj);

        dispatch(storeUserScreening(submitObj, callBack));
    };
    useEffect(() => {
        let isMounted = true;
        const unsubscribe = async () => {
            if (isMounted) {
                dispatch(getAllSymptoms());
            }
        };

        if (isMounted) {
            unsubscribe();
        }
        return function cleanup() {
            isMounted = false;
            setCheckBox([]);
        };
    }, []);

    return (
        <SafeAreaView style={[styles.SafeAreaView, { backgroundColor: colors.background }]}>
            <Header headerTitle={appTranslations.HEADER_SCREENING_TOOL} />
            <View style={styles.Container} >
                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={current}
                    labels={labels}
                    stepCount={2}
                    onPress={onStepPress}
                />
                <View style={{ flex: 1 }} >
                    {current === 0 ?
                        <>
                            <Text style={[FontStyle.RalewayTitle, styles.titleText, { color: colors.Blue_Theme }]}>
                                {appTranslations.SELECT_AGE_WEIGHT_AND_HEIGHT}
                            </Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={[styles.subContainer, { backgroundColor: colors.purple_light }]}>
                                    <ScreeningSlider
                                        Header={appTranslations.SCREENING_HEADER_AGE_Y}
                                        num={ageValue2}
                                        style={styles.slider}
                                        onChangeValue={(v) => {
                                            if (v > 100) {
                                                setAgeValue(100);
                                            } else {
                                                setAgeValue(v || 1);
                                            }

                                            setAgeValue2(v);
                                        }
                                        }
                                        onValueChange={(v) => setAgeValue2(v)}
                                        value={ageValue}
                                        minimumValue={1}
                                        maximumValue={100} />
                                    <ScreeningSlider
                                        Header={appTranslations.SCREENING_HEADER_WEIGHT_KG}
                                        num={weightValue2}
                                        style={styles.slider}
                                        onChangeValue={(v) => {
                                            if (v > 200) {
                                                setWeightValue(200);
                                            } else {
                                                setWeightValue(v || 1);
                                            }
                                            setWeightValue2(v);
                                        }
                                        }
                                        onValueChange={(v) => setWeightValue2(v)}
                                        value={weightValue}
                                        minimumValue={1}
                                        maximumValue={200}
                                    />
                                    <ScreeningSlider
                                        Header={appTranslations.SCREENING_HEADER_HEIGHT_CM}
                                        num={heightValue2}
                                        style={styles.slider}
                                        onChangeValue={(v) => {
                                            if (v > 245) {
                                                setHeightValue(245);
                                            } else {
                                                setHeightValue(v || 10);
                                            }
                                            setHeightValue2(v);
                                        }
                                        }
                                        onValueChange={(v) => setHeightValue2(v)}
                                        value={heightValue}
                                        minimumValue={10}
                                        maximumValue={245} />
                                    <Button onPress={() => onStepPress(current + 1)}
                                        buttonText={appTranslations.NEXT_BTN}
                                        style={{ alignSelf: 'center', paddingHorizontal: RFValue(70) }}
                                    />
                                </View>
                            </ScrollView>
                        </> :

                        <><Text style={[FontStyle.RalewayTitle, styles.titleText, { color: colors.Blue_Theme }]}>
                            {appTranslations.QUES_ARE_U_EXPERIENCING_ANY_SYMPTOMS}?
                        </Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={[styles.subContainer, { backgroundColor: colors.purple_light }]}>{
                                    Symptoms.length > 0 &&
                                    Symptoms?.map((data, i) => {
                                        const url = BASE_MEDIA_URL + data?.media?.[0]?.id + '/' + data?.media?.[0]?.file_name;
                                        return (
                                            <SymptomsCard
                                                ImgUrl={{ uri: url }}
                                                title={data.symptoms_title}
                                                key={'symptoms' + data.id}
                                                isSelect={checkBox.find(e => e === data.id) ? true : false}
                                                onPress={() => {
                                                    filter(data.id);
                                                }} />);
                                    })}
                                </View>
                            </ScrollView>
                            <Button
                                disabled={checkBox?.length < 2 ? true : false}
                                onPress={() => {
                                    submitResult();
                                }} buttonText={appTranslations.BTN_SUBMIT} style={styles.btn} />
                        </>
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        flex: 1,
    },
    Container: {
        flex: 1,
        marginHorizontal: RFValue(20),
        marginTop: RFValue(22),
    },
    titleText: {
        marginVertical: RFValue(35),
    },
    slider: {
        marginBottom: RFValue(50),
    }, btn: {
        alignSelf: 'center',
        paddingHorizontal: RFValue(70),
        marginVertical: RFValue(7),
    }, subContainer: {
        borderRadius: RFValue(5),
        paddingVertical: RFValue(12),
        paddingHorizontal: RFValue(5),
    },
});
