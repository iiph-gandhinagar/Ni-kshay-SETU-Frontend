import { useNavigation, useTheme } from '@react-navigation/native';
import { ClearAllQuestions, getAllQuestion, storeSurveyQuestion } from '@tb-frontend/shared/Store/action/SurveyActions';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet, View,
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import StepIndicator from 'react-native-step-indicator';
import { useDispatch, useSelector } from 'react-redux';
import { SurveyQuestionCard } from '../../components/core/Cards/SurveyQuestionCard';
import { Header } from '../../components/core/Header';
import { AppLoader } from '../../components/core/Loaders/Loader';
import { SurveyThanksModal } from '../../components/core/PopUp/SurveyThanksModal';
import { appConfigTypes } from '../../types';
import { themeProps } from '../types';
export default function SurveyQuestions(props): JSX.Element {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,);
    const navigation = useNavigation();
    const [current, setCurrent] = useState(0);
    const [isModal, setModal] = useState(false);
    const [answer, setanswer] = useState([]);
    const aswerObj = Object.assign([], answer);
    const { colors } = useTheme() as unknown as themeProps;
    const { QuestionList, loader } = useSelector(state => state?.survey);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllQuestion((props?.route?.params?.id)));
    }, []);

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

    const pushToArray = (arr: any[], survey_id: number, id: number, val: string) => {
        const index = arr?.findIndex(e => e?.survey_question_id == id);
        if (index === -1) {
            arr.push({
                'survey_id': survey_id,
                'survey_question_id': id,
                'answer': val,
            });
        } else {
            arr[index] = {
                'survey_id': survey_id,
                'survey_question_id': id,
                'answer': val,
            };
        }
        return arr;
    };
    return (
        <View style={styles.Container} >
            {loader && <AppLoader />}
            <Header headerTitle={props?.route?.params?.title} />

            {QuestionList.length > 0 &&
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ marginTop: RFValue(15) }}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={current}
                            stepCount={QuestionList.length || 0}
                        />
                    </View>
                    <SurveyQuestionCard
                        questionText={QuestionList?.[current]?.question}
                        type={QuestionList?.[current]?.type}
                        onPress={() => {
                            if (current + 1 === QuestionList.length) {
                                dispatch(storeSurveyQuestion(answer, (res) => {
                                    if (res?.code == 200) {
                                        setModal(true);
                                    }

                                }));
                            } else {
                                setCurrent(current + 1);
                            }
                        }}
                        onselectAnswer={(value) => {
                            let updatedAnswers = pushToArray(aswerObj, QuestionList?.[current]?.survey_master_id, QuestionList?.[current]?.id, value);
                            setanswer(updatedAnswers);
                        }}
                        answer={answer?.[current]?.answer || ''}
                        option1={QuestionList?.[current]?.option1}
                        option2={QuestionList?.[current]?.option2}
                        option3={QuestionList?.[current]?.option3}
                        option4={QuestionList?.[current]?.option4} />
                </ScrollView>}
            <SurveyThanksModal
                close={() => {

                    dispatch(ClearAllQuestions());
                    navigation.goBack();
                    setModal(false);
                }}
                isModalVisible={isModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        // marginHorizontal: RFValue(22),
        // marginTop: RFValue(22),
    },
    image: {
        width: RFValue(163),
        height: RFValue(163),
        alignSelf: 'center',
        marginBottom: RFValue(35),
    },
    text: {
        marginBottom: RFValue(40),
        textAlign: 'center',
    },

});
