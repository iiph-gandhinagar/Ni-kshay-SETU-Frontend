import { useNavigation, useTheme } from '@react-navigation/native';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { clearFeedbackDetails, getFeedbackDetails, storeFeedbackDetails } from '@tb-frontend/shared/Store/action/appActions';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Text, View } from 'react-native-animatable';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/core/Button';
import { RatingCards } from '../components/core/Cards/RatingCards';
import { Header } from '../components/core/Header';
import { NoResultFound } from '../components/core/NoResultFound';
import { FeedBackThanksModal } from '../components/core/PopUp/FeedBackThanksModal';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';
export default function FeedBackScreen(): JSX.Element {
  const [feedbackSuccessModal, setFeedbackSuccessModal] = useState(false);
  const dispatch = useDispatch();
  const { colors } = useTheme() as unknown as themeProps;
  const { feedBackDetails, loader } = useSelector(state => state?.app);
  const [rating, setRating] = useState([]);
  const [review, setReview] = useState('');
  const ratingUpdate = Object.assign([], rating);
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getFeedbackDetails({
      ismodal: false,
      val: 0,
    }));
    return function clean() {
      dispatch(clearFeedbackDetails());
    };
  }, []);
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header headerTitle={appTranslations.FEEDBACK} />
      <FlatList
        data={feedBackDetails}
        style={{
          padding: RFValue(10),
          paddingBottom: RFValue(50),
        }}
        ListHeaderComponent={
          <React.Fragment>
            {feedBackDetails?.length > 0 && <Text
              style={[FontStyle.RalewayTitle, { color: colors.ORANGE }]}>
             {appTranslations?.WE_R_KEEP_IMPROVING_YOUR_IMP_F_US}
            </Text>}
          </React.Fragment>
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
                  require('../assets/tblogo.png')}
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
        ListEmptyComponent={
          <React.Fragment>
            {!loader && <NoResultFound source={require('../assets/thumbsUp.png')} header={appTranslations?.U_HAVE_SUBMIT_ALL_FEEDBACK} />}
          </React.Fragment>
        }
        ListFooterComponent={
          <React.Fragment>
            {feedBackDetails?.length > 0 &&
              <React.Fragment>
                <View
                  style={[style.textSuggesCon, {
                    borderColor: colors.bottomBorder,
                    backgroundColor: colors.certiSubHeaderBack,
                  }]}>
                  <Text
                    style={[FontStyle.Nunito18Title, { color: colors.Blue_2 }]}>
                    {appTranslations?.OTHER_SUGGESTIONS}..
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={10}
                    style={[FontStyle.Nunito12, style.input, { color: colors.Blue_2 }]}
                    onChangeText={setReview}
                    value={review}
                  />
                </View>
                <Button
                  style={style.btn}
                  onPress={() => {
                    dispatch(storeFeedbackDetails({
                      'payload': {
                        'ratings': rating,
                        'review': review,
                      },
                    }, () => {
                      setFeedbackSuccessModal(true);
                    }));
                  }}
                  buttonText={appTranslations?.SUBMIT} />
              </React.Fragment>
            }
          </React.Fragment>
        }
      />
      <FeedBackThanksModal
        isModalVisible={feedbackSuccessModal}
        close={() => {
          setFeedbackSuccessModal(false);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  btn: { alignSelf: 'center', margin: RFValue(20) },
  textSuggesCon: {
    marginTop: RFValue(15),
    padding: RFValue(10),
    borderWidth: RFValue(1), borderRadius: RFValue(5),
  },
  input: {
    textAlignVertical: 'top',
  },
});
