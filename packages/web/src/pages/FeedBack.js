/** @jsxImportSource theme-ui */
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { clearFeedbackDetails, getFeedbackDetails, storeFeedbackDetails } from '@tb-frontend/shared/Store/action/appActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Grid, Heading, Text, Textarea } from 'theme-ui';
import CMSModal from '../components/Modals/CMSModal';
import RatingCard from '../components/RatingCard';
import TitleTag from '../components/TitleTag';

const FeedBack = (props) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState([]);
  const [review, setReview] = useState('');
  const ratingUpdate = Object.assign([], rating);
  const [feedbackSuccessModal, setFeedbackSuccessModal] = useState(false);
  const { feedBackDetails, loader } = useSelector(state => state?.app);
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  useEffect(() => {
    dispatch(getFeedbackDetails({
      ismodal: false,
      val: 0,
    }));
    return function clean() {
      dispatch(clearFeedbackDetails());
    };
  }, []);
  return (
    <>
      <TitleTag title="Feedback" />
      <section sx={{ variant: 'layout.Home' }} className="">
        <Container>
          <Heading variant="Raleway18" sx={{ color: "black2", mt: 43, mb: 24 }}>{appTranslations?.TITLE_RATING}</Heading>
          {loader ? null : feedBackDetails.length > 0 ?
            < div >
              <Heading variant="Raleway18" sx={{ color: "orange", mb: 35 }} className="text-center">{appTranslations?.WE_R_KEEP_IMPROVING_YOUR_IMP_F_US}</Heading>
              <div className="row justify-content-center">
                <div className="col-xl-9">
                  <Grid gap={8} columns={[1,]} sx={{}} className="">
                    {feedBackDetails.map((item) => {
                      return (
                        <RatingCard
                          value={ratingUpdate.find(e => e.id == item?.id)?.rating}
                          onSetRating={(no) => {
                            const findINdex = ratingUpdate.findIndex(e => e.id == item?.id);
                            if (findINdex !== -1) {
                              ratingUpdate[findINdex] = {
                                'id': item?.id,
                                'rating': no,
                                'skip': 0,
                              };
                            } else {
                              ratingUpdate.push({
                                'id': item?.id,
                                'rating': no,
                                'skip': 0,
                              });
                            }
                            setRating(ratingUpdate);
                          }}
                          title={item?.feedback_question}
                          Descriptions={item?.feedback_description}
                          ImgSrc={
                            item?.media?.[0]
                              ? BASE_MEDIA_URL +
                              item?.media?.[0]?.id +
                              '/' +
                              item?.media?.[0]?.file_name
                              :
                              "/images/tblogo.png"} />

                      )
                    })}
                    <Box sx={{}} className="p-1" variant="FeedBackBox">
                      <Heading variant="Heading4" sx={{ color: "Blue_2" }}>{appTranslations?.OTHER_SUGGESTIONS}</Heading>
                      <Textarea
                        value={review}
                        onChange={(e) => {
                          setReview(e.target.value);
                        }}
                        rows={5} sx={{ resize: 'none' }} />
                    </Box>
                  </Grid>
                </div>
                <div className="text-center" sx={{ mt: 7 }}>
                  <Button
                    onClick={() => {
                      dispatch(storeFeedbackDetails({
                        'payload': {
                          'ratings': rating,
                          'review': review,
                        },
                      }, () => {
                        setFeedbackSuccessModal(true);
                        dispatch(getFeedbackDetails({
                          ismodal: false,
                          val: 0,
                        }));
                      }));

                    }}
                    style={{ width: 193, border: "1px solid #DFDEDE" }} ><Text variant="Raleway18">Submit</Text></Button>
                </div>
              </div>
            </div>
            : <div className='text-center'>
              <img className='mb-3' sx={{ width: 100 }} src="images/thumbsUp.png" />
              <Heading variant="Raleway18" sx={{ color: "orange", mb: 35 }} className="text-center">{appTranslations?.U_HAVE_SUBMIT_ALL_FEEDBACK}</Heading>
            </div>
          }
        </Container>
        <CMSModal
          isModalVisible={feedbackSuccessModal}
          closeModal={() => setFeedbackSuccessModal(false)}
          htmlContent={""}
          CMSModalTitle={"We’re so happy to hear from you! Thank you for your valuable feedback."}
        />
      </section>
    </>
  );
}
export default FeedBack;