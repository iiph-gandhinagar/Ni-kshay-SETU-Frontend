/** @jsxImportSource theme-ui */
import {
  ClearFutureAssessment, getFutureAssessment, storeAssessmentEnrollnment
} from '@tb-frontend/shared/Store/action/assessmentAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paragraph } from 'theme-ui';
import CustomModal from '../../components/Modals/CustomModal';
import AssessmentListCard from './AssessmentListCard';
const FutureAssessmentTab = (props) => {
  const [model, setModal] = useState(false);
  const { futureAssessments } = useSelector(state => state?.assessment);
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = async () => {
      dispatch(getFutureAssessment());
    }
    if (isMounted) {
      unsubscribe();
    }
    return function cleanup() {
      isMounted = false;
      dispatch(ClearFutureAssessment());
    };
  }, []);
  return (
    <div className="future-assessment-tab" sx={{ mt: 50 }} >
      <div className="row mx-0 g-4 ms-xxl-5">
        {futureAssessments?.map((item, i) => {
          return (
            <AssessmentListCard
              ReleasesDateTime={'Releases  ' + item?.from_date}
              key={item?.assessment_id}
              Quetions={item?.assessment_questions_count}
              min={item?.time_to_complete}
              headerTitle={item?.assessment_title}
              BtnName={item?.response === 'yes' ? 'Enrolled' : 'Enroll'}
              onClick={() => {
                dispatch(storeAssessmentEnrollnment({
                  assessment_id: item?.id,
                  response: 'yes',
                },
                  () => {
                    dispatch(getFutureAssessment());
                    setModal(true);
                  }));
              }}
            />
          );
        })}
      </div>
      <CustomModal
        isOpen={model}
        closeModal={() => {
          setModal(false);
        }} >
        <div className="text-center">
          <img style={{}} src="../../images/military-medal.png" alt="Icon" sx={{ width: 163 }} className="mb-5" />
          <Paragraph variant="Heading4" sx={{ color: "Blue_Theme" }}>You have sussessfully enrolled in the assessment!</Paragraph>
          <Paragraph variant="Heading4" sx={{ color: "Blue_Theme" }}>You will be notified for further actions.</Paragraph>
        </div>
      </CustomModal>
    </div>

  );
}
export default FutureAssessmentTab;