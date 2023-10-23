import { useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable, StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../../types';
import { Button } from '../Button';
import { RatingCards } from '../Cards/RatingCards';
import { storeFeedbackDetails } from '@tb-frontend/shared/Store/action/appActions';
import { FeedBackThanksModal } from '../PopUp/FeedBackThanksModal';
import { ModalHeader } from './ModalHeader';
interface Props {

}

export const FeedBackModal: React.FC<Props> = ({
}) => {
  const { isFeedbackModal, feedBackDetails } = useSelector(state => state?.app);
  const [rating, setRating] = useState([]);
  const [review, setReview] = useState('');
  const [feedbackSuccessModal, setFeedbackSuccessModal] = useState(false);
  const ratingUpdate = Object.assign([], rating);
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  const { colors } = useTheme() as unknown as themeProps;
  const dispatch = useDispatch();
  function close() {
    dispatch(storeFeedbackDetails({
      'payload': {
        'ratings': rating?.map((item) => {
          return {
            'id': item?.id,
            'rating': 0,
            'skip': 1,
          };
        }),
        'review': '',
      },
    }, () => null));
  }
  return (
    <React.Fragment>
      <Modal
        coverScreen={false}
        onBackButtonPress={close}
        onBackdropPress={close}
        hasBackdrop={true}
        isVisible={isFeedbackModal}>
        <View
          style={[styles.container, { backgroundColor: colors.dropDownBack }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={feedBackDetails}
            style={{
              paddingBottom: RFValue(50),
              paddingTop: RFValue(10),
            }}
            ListHeaderComponent={
              <ModalHeader
                isFeedback={true}
                onClose={close}
                title={appTranslations?.WE_R_KEEP_IMPROVING_YOUR_IMP_F_US}
              />
            }
            renderItem={({ item, index }) => {
              return (
                <RatingCards
                  defaultRating={4}
                  Title={item?.feedback_question}
                  Descriptions={item?.feedback_description}
                  key={item?.feedback_question + index}
                  ImgSrc={
                    item?.media?.[0]
                      ? {
                        uri: BASE_MEDIA_URL +
                          item?.media?.[0]?.id +
                          '/' +
                          item?.media?.[0]?.file_name,
                      }
                      :
                      require('../../../assets/tblogo.png')}
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
                />);
            }}
            ListFooterComponent={
              <React.Fragment>
                <View
                  style={[styles.textSuggesCon, {
                    borderColor: colors.bottomBorder,
                    backgroundColor: colors.certiSubHeaderBack,
                  }]}>
                  <Text
                    style={[FontStyle.Nunito18Title, { color: colors.Blue_2 }]}>
                    Other Suggestions..
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={7}
                    style={[FontStyle.Nunito12, styles.input, { color: colors.Blue_2 }]}
                    onChangeText={setReview}
                    value={review}
                  />
                </View>
                <Button
                  style={styles.btn}
                  onPress={() => {
                    dispatch(storeFeedbackDetails({
                      'payload': {
                        'ratings': rating,
                        'review': review,
                      },
                    }, () => {
                      setTimeout(() => {
                        setFeedbackSuccessModal(true);
                      }, 1000);
                    }));
                  }}
                  buttonText={'Submit'} />
              </React.Fragment>
            }
          />
        </View>
      </Modal>
      <FeedBackThanksModal
        isModalVisible={feedbackSuccessModal}
        close={() => setFeedbackSuccessModal(false)}
      />
    </React.Fragment>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(10),
    height: RFValue(600),
    borderRadius: RFValue(6),
  },
  SubContainer: {
    alignSelf: 'flex-end',
    marginVertical: RFValue(15),
  },
  btn: { alignSelf: 'center', margin: RFValue(20) },
  textSuggesCon: {
    marginTop: RFValue(15),
    padding: RFValue(10),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
  },
  input: {
    textAlignVertical: 'top',
  },
});
