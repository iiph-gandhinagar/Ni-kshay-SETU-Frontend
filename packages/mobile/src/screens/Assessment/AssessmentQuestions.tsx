import { useNavigation, useTheme } from '@react-navigation/native';
import { storeAssessmentresult } from '@tb-frontend/shared/Store/action/assessmentAction';
import Lottie from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert, BackHandler, Image, Pressable, SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import { Button, Button1 } from '../../components/core/Button';
import { CustomModal } from '../../components/core/Modals/CustomModal';
import { Queston } from '../../components/core/Questionlist';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
function padLeadingZeros(num, size) {
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
}

export default function AssessmentQuestions(props): JSX.Element {
  const QuestionList = props?.route?.params?.questionList;
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(
    new Date().setSeconds(
      new Date().getSeconds() + parseInt(props?.route?.params?.time),
    ),
  );
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const { colors } = useTheme() as unknown as themeProps;

  const [isModalVisible, setModal] = useState(false);
  const [answers, setAnswers] = useState(props?.route?.params?.answerList);
  const answerToUpdate = Object.assign([], answers);
  const current = QuestionList?.assessment_questions[index];
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const MyTimer = ({ expiryTimestamp }) => {
    const { seconds, minutes, hours } = useTimer({
      expiryTimestamp,
      onExpire: () => {
        navigation.navigate('PastAssessmentView', {
          id: QuestionList?.id,
        });
      },
    });
    return (
      <Text
        style={[FontStyle.Heading4, {
          textAlign: 'right',
          color:
            minutes == '00'
              ? colors.error
              : colors.tealGreen,
        }]}>
        {padLeadingZeros(hours, 2)}:{padLeadingZeros(minutes, 2)}:
        {padLeadingZeros(seconds, 2)}
      </Text>
    );
  };
  const CallBack = response => {
    console.log('response', response);
    if (response.code == 200) {
      // navigation.navigate("PastAssessmentView", {
      //   id: QuestionList?.assessment_questions[0]?.assessment_id,
      // });
    } else {
      Alert.alert('Error!', response?.response?.data?.data);
    }
  };

  const submitAnswerTOServer = async (currentAnswer: object) => {
    const submitObj = {
      assessment_id: QuestionList?.id,
      answers: [currentAnswer],
    };
    console.log('submitObj', submitObj);

    dispatch(storeAssessmentresult(submitObj, CallBack));
  };

  const pushToArray = (arr, questionId, answer) => {
    const index = arr?.findIndex(e => e?.question_id == questionId);
    if (index === -1) {
      answerToUpdate.push({
        question_id: questionId,
        answer: answer,
        is_submit: 0,
      });
    } else {
      answerToUpdate[index] = {
        question_id: questionId,
        answer: answer,
        is_submit: 0,
      };
    }
    return arr;
  };
  const SubmitAnswer = (arr: [], questionId: string) => {
    const index = arr?.findIndex(e => e?.question_id == questionId);
    console.log('answerToUpdate[index]', answerToUpdate[index]);
    if (index === -1) {
    } else {
      answerToUpdate[index] = {
        question_id: questionId,
        answer: answerToUpdate[index]?.answer,
        is_submit: 1,
      };
    }
    return arr;
  };
  const onAnswer = (questionId, answer) => {
    let updatedAnswers = pushToArray(answerToUpdate, questionId, answer);

    setAnswers(updatedAnswers);
  };
  const onAnswerSubmit = questionId => {
    let updatedAnswers = SubmitAnswer(answerToUpdate, questionId);
    const CurrentObj = updatedAnswers.find(c => c.question_id === current.id);
    if (CurrentObj.is_submit === 1) {
      submitAnswerTOServer(CurrentObj);
    }
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        '⚠️ Confirm Exit ?',
        'Do you really want to quit the Assessment?',
        [
          {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              navigation.goBack();
              // navigation.navigate("PastAssessmentView", {
              //   id: QuestionList?.assessment_questions[0]?.assessment_id,
              // });
            },
          },
        ],
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <View style={styles.AssessmentContainer}>
        <View style={{}}>
          <Text style={[FontStyle.Raleway18, { color: colors.Blue_Theme, textAlign: 'center', paddingBottom: RFValue(20) }]}>{QuestionList.assessment_title}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../assets/icons_questions.png')} style={styles.IMG} />
              <Text style={[FontStyle.RalewayTitle, { color: colors.Grey_4, paddingBottom: RFValue(2) }]}>
                {appTranslations.TITLE_KNOWLEDGEASSESSMENT_QUESTION}</Text>
            </View>
            <Text style={[FontStyle.Heading4, { color: colors.tealGreen }]}>
              {index + 1}/{QuestionList?.assessment_questions?.length}
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../assets/RemainingTime.png')} style={styles.IMG} />
              <Text style={[FontStyle.RalewayTitle, { color: colors.Grey_4, paddingBottom: RFValue(2) }]}>
                {appTranslations.TITLE_KNOWLEDGEASSESSMENT_REMAINING_TIME}
              </Text>
            </View>
            <MyTimer expiryTimestamp={time} />
          </View>
        </View>
        <ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: RFValue(35) }} showsVerticalScrollIndicator={false}>
          <Queston
            onselectAnswer={(questionId, answer) => {
              onAnswer(questionId, answer);
            }}
            question={current}
            answer={answers?.find(i => i.question_id === current.id)?.answer}
            isSubmited={
              answers?.find(i => i.question_id === current.id)?.is_submit ===
                1
                ? true
                : false || false
            }
          />

          <View style={{ marginBottom: RFValue(24) }}>
            <Button style={{ alignSelf: 'center', backgroundColor: colors.tealGreen }} textStyle={{ color: colors.white }}
              disabled={
                answers?.find(i => i.question_id === current.id)
                  ?.is_submit === 1
                  ? false
                  : answers?.find(i => i.question_id === current.id)?.answer
                    ? false
                    : true
              }
              onPress={() => {
                if (
                  answers?.find(i => i.question_id === current.id)
                    ?.is_submit === 1
                ) {
                  if (
                    QuestionList?.assessment_questions?.length !==
                    index + 1
                  ) {
                    setIndex(index + 1);
                  } else {
                    setModal(true);
                  }
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
                  });
                } else {
                  if (
                    QuestionList?.assessment_questions?.length ===
                    index + 1 &&
                    answers?.find(i => i.question_id === current.id)
                      ?.answer === 'null'
                  ) {
                    setModal(true);
                    // Alert.alert(
                    //   'Confirm Submit',
                    //   `You have
                    //     \n👍 Attempted    :${answers.filter(a => a.is_submit === 1)?.length
                    //   } Question(s)
                    //     \n❗ Skipped         :${answers.filter(a => a.answer === 'null')?.length
                    //   } Question(s)
                    //     \n💯 Out Of Total  :${QuestionList?.assessment_questions?.length
                    //   } Question(s)`,
                    //   [
                    //     {
                    //       text: 'Cancel',
                    //       style: 'cancel',
                    //       onPress: () => {
                    //         null;
                    //       },
                    //     },
                    //     {
                    //       text: 'Submit',
                    //       onPress: () => {
                    //         navigation.navigate("PastAssessmentView", {
                    //           id: QuestionList?.assessment_questions[0]
                    //             ?.assessment_id,
                    //         });
                    //       },
                    //     },
                    //   ],
                    // );
                  } else {
                    onAnswerSubmit(current?.id);
                  }
                }
              }}
              buttonText={
                answers?.find(i => i.question_id === current.id)
                  ?.is_submit === 1
                  ? QuestionList?.assessment_questions?.length !== index + 1
                    ? appTranslations.BTN_C_ASMENT_NEXT
                    : appTranslations.BTN_C_ASMENT_SUBMIT
                  : QuestionList?.assessment_questions?.length ===
                    index + 1 &&
                    answers?.find(i => i.question_id === current.id)
                      ?.answer === 'null'
                    ? appTranslations.BTN_C_ASMENT_SUBMIT
                    : answers?.find(i => i.question_id === current.id)
                      ?.answer === 'null'
                      ? appTranslations.BTN_C_ASMENT_S_AND_S_ANS
                      : appTranslations.BTN_C_ASMENT_SAVE
              }
            />
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              disabled={index == 0 ? true : false}
              onPress={() => {
                setIndex(index - 1);
              }}
              buttonText={appTranslations.BTN_C_ASMENT_PREVIOUS}
              leftIcon
              style={{ paddingHorizontal: RFValue(16) }}
            />

            <Button
              disabled={
                answers?.find(i => i.question_id === current.id)
                  ?.is_submit === 1
                  ? true
                  : QuestionList?.assessment_questions?.length === index + 1
                    ? answers?.find(i => i.question_id === current.id)
                      ?.answer === 'null'
                      ? true
                      : false
                    : false
              }
              onPress={() => {
                onAnswer(current.id, 'null');
                if (
                  QuestionList?.assessment_questions?.length !==
                  index + 1
                ) {
                  setIndex(index + 1);
                }
              }}
              buttonText={appTranslations.BTN_C_ASMENT_SKIP}
              rightIcon
              style={{ paddingHorizontal: RFValue(16) }}
            />
          </View>
        </ScrollView>
      </View>
      <CustomModal
        isModalVisible={isModalVisible}
      ><Lottie
          autoPlay
          source={require('../../assets/Animations/submit.json')}
          style={{
            // overflow:'hidden',
            height: RFValue(111),
            // alignSelf:'center',
          }}

        // loop={false}
        />
        <Text style={[FontStyle.RalewayTitle, styles.headerText, { color: colors.Blue_Theme }]}>{appTranslations.CONFIRM_SUBMIT}</Text>
        <View style={[styles.Card, { backgroundColor: colors.Grey_2 }]}>
          <View style={{ marginHorizontal: RFValue(12) }}>
            <View style={styles.listStyle}>
              <Text style={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Grey_3 }]}>{appTranslations.ATTEMPTED}</Text>
              <Text style={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Blue_2 }]}>{
                answers.filter(a => a.is_submit === 1)?.length
              } Question(s)</Text>
            </View>
            <View style={styles.listStyle}>
              <Text style={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Grey_3 }]}>{appTranslations.SKIPPED}</Text>
              <Text style={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Blue_2 }]}>{
                answers.filter(a => a.answer === 'null')?.length
              } Question(s)</Text>
            </View>
            <View style={styles.listStyle}>
              <Text style={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Grey_3 }]}>{appTranslations.OUT_OF_TOTAL}</Text>
              <Text style={[FontStyle.Nunito16, styles.ResultFont, { color: colors.Blue_2 }]}>{
                QuestionList?.assessment_questions?.length
              } Question(s)</Text>
            </View>

          </View>
        </View>
        <View style={styles.BottomContainer}>
          <Button1 onPress={() => {
            navigation.navigate('PastAssessmentView', {
              id: QuestionList?.assessment_questions[0]
                ?.assessment_id,
            });
            setModal(false);
          }} buttonText={appTranslations.BTN_SUBMIT} style={{ paddingHorizontal: 60 }} />
          <Pressable onPress={() => setModal(false)}>
            <View style={[styles.BtnContainer, { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.Grey_1 }]}>
              <Text style={[FontStyle.RalewayText12, { color: colors.Grey_3, marginBottom: RFValue(3) }]}>{appTranslations.BTN_CANCEL}</Text>
            </View>
          </Pressable>
        </View>
      </CustomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingBottom: 0,
    padding: RFValue(15),
  },
  AssessmentContainer: {
    flex: 1,
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
  },
  BtnContainer: {
    alignSelf: 'flex-end',
    padding: RFValue(5),
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(5),
    alignItems: 'center',
    marginStart: RFValue(20),
  },
  BottomContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: RFValue(20),
  },
  headerText: {
    alignSelf: 'center',
  },
  Card: {
    // flex: 1,
    marginTop: RFValue(15),
    borderRadius: RFValue(10),
    elevation: RFValue(2),
    marginHorizontal: RFValue(8),
    // maxWidth: RFValue(344),
  },
  listStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: RFValue(5),
  },
  ResultFont: {
    textAlign: 'center',
  },
  IMG: {
    height: RFValue(25),
    width: RFValue(25),
  },
});
