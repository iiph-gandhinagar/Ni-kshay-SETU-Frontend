/** @jsxImportSource theme-ui */
import { clearCurrentAssessments, getAllAssessment, getAssessmentWithQuestions, getUserAssessmentDetails } from '@tb-frontend/shared/Store/action/assessmentAction';
import Cookies from 'js-cookie';
import Lottie from "lottie-react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Box, Button, Heading } from 'theme-ui';
import AssessmentAnimation from "../../assets/Animations/assessmentAnimation.json";
import AlertModal from '../../components/Modals/AlertModal';
import CustomModal from '../../components/Modals/CustomModal';
import AssessmentListCard from './AssessmentListCard';
const CurrentAssessmentTab = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [rulesOfAssessmentsModalVisible, setRulesOfAssessmentsModalVisible] = useState(false);
  const [model, setModal] = useState(false);
  const [noCancle, setNoCancle] = useState(false);
  const [noOk, setNoOk] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const Assessment = useSelector(
    state => state?.assessment?.assessmentQuestions,
  );
  const { allAssessment } = useSelector(state => state?.assessment);
  console.log("allAssessment >>> ", allAssessment);
  console.log("Assessment >>> ", Assessment);
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = async () => {
      dispatch(getAllAssessment());
    }
    if (isMounted) {
      unsubscribe();
    }
    return function cleanup() {
      isMounted = false;
      dispatch(clearCurrentAssessments());
      setRedirect('');
    };
  }, []);

  // const OnCLickStart = async (item) => {
  const CallBack = response => {
    console.log('response', response);
    if (response.code == 200) {
      if (response?.data?.is_assessment_expired === 0) {
        Cookies.set('AssessmentID', Assessment[0]?.id, {
          expires: new Date(Date.parse(new Date()) + (5 * 60 * 1000))
        })
        history.push(`/AssessmentQuestions/${Assessment[0]?.id}`, {
          // name: item.assessment_title,
          answerList: response?.data?.answers,
          time: response?.data?.remaining_time,
        })
      } else {
        console.log("else⌛ Time Up!");
        setTitle('⌛ Time Up!');
        setMessage("Your Assessment Time is over!")
        setNoCancle(true);
        setNoOk(false);
        setModal(true)
        setRedirect(`Assessment?tab=PastAssessments&&id=${Assessment[0]?.id}`);
      }
    } else {
      console.log("Error!");
      setTitle('Errorp!');
      setMessage(response?.response?.data?.data)
      setNoCancle(true);
      setNoOk(false);
      setModal(true)
      setRedirect('');
    }
  };
  //   dispatch(
  //     getUserAssessmentDetails({ assessment_id: item.id }, CallBack),
  //   );
  // }
  return (
    <div className="current-assessment-tab" sx={{ mt: 50 }} >
      <div className="row mx-0 g-4 ms-xxl-5">
        {allAssessment?.map((item, i) => {
          return (
            <AssessmentListCard
              // IsBtnDisable={item?.user_assessment_result?.[0]?.is_calculated === 1
              //   ? true
              //   : false}
              headerTitle={item?.assessment_title}
              key={item?.id}
              Quetions={item?.assessment_questions_count}
              min={item?.time_to_complete}
              BtnName="Start Now"
              onClick={() => {
                setRulesOfAssessmentsModalVisible(true);
                dispatch(getAssessmentWithQuestions(item.id));
              }} />
          );
        })}
      </div>
      <CustomModal
        styles={{ modal: { maxWidth: 570 } }}
        isOpen={rulesOfAssessmentsModalVisible}
        closeModal={() => {
          setRulesOfAssessmentsModalVisible(false);
        }} >
        <div className="rules-of-assessments">
          <Lottie animationData={AssessmentAnimation} loop={true} style={{ width: 132 }} className="mx-auto" />
          <Heading variant="Raleway18" sx={{ color: "Blue_Theme" }} className="mb-2 text-center">Rules of Assessments</Heading>
          <ol >
            <li >Once You start the assessment, the Timer will be started on server</li>
            <li >Once you save the answer,you can’t change it.</li>
            <li >You can skip the quetions if you want.</li>
            <li>Your result will be generated after timer stopes on the server OR on submit button click at the last quetion by you.</li>
          </ol>
          <Box className="text-center pt-3">
            <Button style={{ width: 95 }} mr="12px" backgroundColor="tealGreen" color="white" className="p-2"
              onClick={() => {
                if (Assessment[0]?.assessment_questions?.length > 0) {
                  dispatch(
                    getUserAssessmentDetails(
                      {
                        assessment_id: Assessment?.[0]?.id,
                      },
                      CallBack,
                    ),
                  );
                } else {
                  setRulesOfAssessmentsModalVisible(false);
                }
              }}><Heading variant="Raleway18">Ok</Heading></Button>
            <Button style={{ width: 108 }} variant="white" className="p-2">Cancel</Button>
          </Box>
        </div>
      </CustomModal>
      <AlertModal
        isOpen={model}
        Title={title}
        message={message}
        noCancle={noCancle}
        noOK={noOk}
        closeModal={() => {
          setModal(false);
          setMessage('');
          setTitle('')
        }}
        onCancle={() => {
          setModal(false);
          setMessage('');
          setTitle('')
        }}
        onOk={() => {
          setModal(false);
          setMessage('');
          setTitle('');
          if (redirect !== '') {
            setRedirect('')
            history.push(redirect)
          }
        }} />
    </div>

  );
}
export default CurrentAssessmentTab;