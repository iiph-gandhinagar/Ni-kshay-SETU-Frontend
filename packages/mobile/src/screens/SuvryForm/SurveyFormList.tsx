import { useNavigation, useTheme } from '@react-navigation/native';
import { getAllSurvey } from '@tb-frontend/shared/Store/action/SurveyActions';
import React, { useEffect } from 'react';
import {
    FlatList, SafeAreaView, StyleSheet,
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/core/Header';
import { NoResultFound } from '../../components/core/NoResultFound';
import { SuRveyListCard } from '../../components/core/SuRveyListCard';
import { appConfigTypes } from '../../types';
import { themeProps } from '../types';
export default function SurveyFormList(): JSX.Element {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const { SurveyList, loader } = useSelector(state => state?.survey);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSurvey());
    }, []);
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: colors.backgroundColor }]} >
            <Header headerTitle={appTranslations.HEADER_SURVEY_FORM} />
            <FlatList
                ListEmptyComponent={loader ? null :
                    SurveyList?.dont_survey_list?.length === 0 ?
                        <NoResultFound
                            source={require('../../assets/contactform.png')}
                            header={appTranslations?.NO_DATA_SURVEY}
                        /> : null
                }
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <React.Fragment>
                        {SurveyList?.dont_survey_list?.map((item) => {
                            return (
                                <SuRveyListCard
                                    key={item?.id}
                                    Title={item?.title}
                                    dis={true}
                                    onPress={() => null}
                                />
                            );

                        })}
                    </React.Fragment>
                }
                data={SurveyList?.survey_list || []}
                style={{
                    marginHorizontal: RFValue(22),
                    marginTop: RFValue(22),
                }}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => {
                    return (
                        <SuRveyListCard
                            Title={item?.title}
                            onPress={() => {
                                navigation.navigate('SurveyQuestions', {
                                    title: item?.title,
                                    id: item?.id,
                                });
                            }}
                        />
                    );
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,

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

