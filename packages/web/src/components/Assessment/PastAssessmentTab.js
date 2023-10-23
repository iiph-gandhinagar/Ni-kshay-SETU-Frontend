/** @jsxImportSource theme-ui */
import { ClearPastAssessment, getUserAssessment } from '@tb-frontend/shared/Store/action/assessmentAction';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AssessmentDetails from './AssessmentDetails';
import AssessmentListCard from './AssessmentListCard';
const PastAssessmentTab = () => {
  const [showAssessmentDetails, setShowAssessmentDetails] = useState(false);
  const [assessmentId, setAssessmentId] = useState("");
  const { userPastAssessments } = useSelector(state => state?.assessment);
  const dispatch = useDispatch();
  const history = useHistory()
  const queryObj = queryString?.parse(history.location.search)
  useEffect(() => {
    let isMounted = true;
    const unsubscribe = async () => {
      dispatch(getUserAssessment());
    }
    if (isMounted) {
      unsubscribe();
    }
    return function cleanup() {
      isMounted = false;
      dispatch(ClearPastAssessment());
    };
  }, []);
  return (
    <div className="current-assessment-tab" sx={{ py: 30 }} >
      {!queryObj?.id ?
        <div className="row mx-0 g-4 ms-xxl-5">
          {userPastAssessments?.map((item, i) => {
            return (
              <AssessmentListCard
                key={item?.assessment_id}
                Quetions={item?.assessment_questions_count}
                min={item?.assessment_with_trashed?.time_to_complete}
                headerTitle={item?.assessment_with_trashed?.assessment_title}
                BtnName="View"
                onClick={() => {
                  history.push("Assessment?tab=PastAssessments&&id=" + item?.assessment_id)
                }}
              />
            );
          })}
        </div>
        :
        <AssessmentDetails assessmentID={queryObj?.id} />}
    </div>

  );
}
export default PastAssessmentTab;