import { useNavigation } from '@react-navigation/native';
import {
    getkeywords,
    getQuestionsBykeyword,
    loadMore,
    postQuestionHit,
    pushLoader,
    pushToChatFlow,
} from '@tb-frontend/shared/Store/action/chatActions';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react-native';
import {
    ChatAdditionalMaterialSection,
    ChatModuleSection,
    ChatQuestionSection,
    ChatResourceModuleSection,
} from './ChatSections';
import { appConfigTypes, themeProps } from '../../types';
import { ChatOp_AnsCard, ChatResCard, TabFeedBack } from './ChatCards';


interface KeywordTypeListProps {
    item: any;
    idx: any;
    session_token: string;
    show: boolean;
}
export const KeywordTypeList: React.FC<KeywordTypeListProps> = ({
    idx,
    item,
    session_token,
    show,
}) => {
    const dispatch = useDispatch();
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const { currentKeywordObj } = useSelector(state => state?.chat);
    return (
        <View style={styles.KeywordContainer}>
            {item?.data?.map((data, idx_in) => (
                <ChatOp_AnsCard
                    key={'KeyWords-' + idx + '-' + idx_in}
                    onPress={async () => {
                        await dispatch(
                            pushToChatFlow({
                                type: 'Answers',
                                data: {
                                    title: data.title,
                                },
                                isPop: true,
                            }),
                        );
                        await dispatch(pushLoader());
                        await dispatch(
                            getQuestionsBykeyword({
                                id: data?.id,
                                page: 1,
                                token: session_token,
                            }),
                        );
                    }}
                    isKeyWord={true}
                    text={data?.title}
                />
            ))}
            {item?.current_page && currentKeywordObj?.current_page && show && (
                <ChatOp_AnsCard
                    key={'KeyWords-' + idx + '-' + 'static'}
                    onPress={async () => {
                        await dispatch(pushLoader());
                        await dispatch(loadMore(item?.next_page_url, 'KeyWords'));
                    }}
                    isKeyWord={true}
                    text={appTranslations.CHAT_KEYWORDTYPELIST_MORE}
                />
            )}
        </View>
    );
};
interface StaticTypeListtProps {
    item: [];
    idx: number;
}
export const StaticTypeList: React.FC<StaticTypeListtProps> = ({ idx, item }) => {
    return item?.map((data: any, i) => (
        <ChatResCard
            key={'StaticData-' + idx + '-' + i}
            botTitle={i == 0 ? true : false}
            text={data?.title}
            noSpeaker
        />
    ));
};

interface AnswerTypeProps {
    item: any;
    idx: number;
}
export const AnswerType: React.FC<AnswerTypeProps> = ({ idx, item }) => {
    // console.log('text', props.text);
    return <ChatOp_AnsCard key={idx} userTitle={true} text={item?.title} />;
};

interface QuestionTypeListProps {
    item: [];
    idx: number;
    next: string;
    session_token: string;
    disabled: boolean;
    setDisabled: (value: boolean) => null;
    noFeedBack: boolean | undefined;
}

export const TagModuleTypeList: React.FC<QuestionTypeListProps> = ({
    idx,
    item,
    next,
    session_token,
    disabled = false,
    setDisabled = () => null,
    noFeedBack = false,
}) => {
    const dispatch = useDispatch();
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const navigation = useNavigation();
    const feedback = useSelector(state => state?.chat.feedBackArray);
    return (
        <React.Fragment key={idx}>
            <ChatQuestionSection
                disabled={disabled}
                idx={idx}
                item={item}
                next={next}
                session_token={session_token}
                setDisabled={setDisabled}
            />
            <ChatModuleSection idx={idx} item={item} />
            <ChatResourceModuleSection idx={idx} item={item} />
            <ChatAdditionalMaterialSection
                disabled={disabled}
                idx={idx}
                item={item}
                session_token={session_token}
                setDisabled={setDisabled}
            />
            <ChatResCard
                key={'TagModule-Contact-us-static-add-' + idx}
                isLink={true}
                noBottomWidth
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_CONTACT}
                onPress={async () => {
                    navigation.navigate('ContactUs');
                }}
            />
            <ChatResCard
                key={'TagModule-Back_to_main_topics-static-add-' + idx}
                isLink={true}
                noBottomWidth={false}
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS}
                onPress={async () => {
                    await dispatch(
                        pushToChatFlow({
                            type: 'Answers',
                            data: {
                                title: appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS,
                            },
                            isPop: true,
                        }),
                    );
                    await dispatch(pushLoader());
                    await dispatch(getkeywords(session_token));
                }}
            />
            {noFeedBack ? null : (
                <TabFeedBack
                    key={'TagModule-feedback-' + idx + '-' + item?.activity_id}
                    id={item?.activity_id}
                    question_id={0}
                    tag_id={item?.id}
                    feedback={feedback?.find(e => e?.activity_id === item?.activity_id)}
                />
            )}
        </React.Fragment>
    );
};

interface QuestionsAnswerTypeProps {
    item: any;
    idx: number;
    disabled: boolean;
    setDisabled: (value: boolean) => void;
    session_token: string;
}
export const QuestionsAnswerType: React.FC<QuestionsAnswerTypeProps> = ({
    disabled = false,
    idx,
    item,
    setDisabled = () => null,
    session_token,
}) => {
    const dispatch = useDispatch();
    const { feedBackArray, questionActivityId } = useSelector(state => state?.chat);
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const navigation = useNavigation();
    return (
        <View key={'QuestionsAnswerType' + idx + '-' + item?.question_id}>
            <ChatResCard
                botTitle={true}
                isHeader
                title={appTranslations.CHAT_ANSWERS}
                text={item?.title}
                disabled={disabled}
                onSpeakerPlay={setDisabled}
            />
            <TabFeedBack
                id={questionActivityId}
                question_id={item?.question_id}
                tag_id={0}
                feedback={feedBackArray?.find(
                    e => e?.activity_id === questionActivityId,
                )}
            />
            {item?.onClick && (
                <ChatResCard
                    isLink={true}
                    noSpeaker
                    noBottomWidth
                    text={appTranslations.CHAT_QUESTIONANSWERTYPE_LOAD_SIM_QUES}
                    onPress={async () => {
                        await dispatch(
                            pushToChatFlow({
                                type: 'Answers',
                                data: {
                                    title: appTranslations.CHAT_QUESTIONANSWERTYPE_LOAD_SIM_QUES,
                                },
                                isPop: true,
                            }),
                        );
                        await dispatch(pushLoader());
                        await dispatch(loadMore(item?.onClick, 'Questions'));
                    }}
                />
            )}
            <ChatResCard
                key={'Contact-us-static-add-' + idx + '-' + item?.question_id}
                isLink={true}
                noBottomWidth
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_CONTACT}
                onPress={async () => {
                    navigation.navigate('ContactUs',);
                }}
            />
            <ChatResCard
                key={'Back_to_main_topics-static-add-' + idx + '-' + item?.question_id}
                isLink={true}
                noBottomWidth={false}
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS}
                onPress={async () => {
                    await dispatch(
                        pushToChatFlow({
                            type: 'Answers',
                            data: {
                                title: appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS,
                            },
                            isPop: true,
                        }),
                    );
                    await dispatch(pushLoader());
                    await dispatch(getkeywords(session_token));
                }}
            />
        </View>
    );
};
interface chatLoaderProps {
    idx: any;
}
export const ChatLoader: React.FC<chatLoaderProps> = ({
    idx,
}) => {
    const { chatloader, chatArray } = useSelector(
        state => state?.chat,
    );
    return chatloader && idx == chatArray?.length - 1 ? (
        <Lottie
            loop={true}
            autoPlay
            autoSize
            source={require('../../assets/Animations/chatLoader.json')
            }
            style={{ height: RFValue(80) }}
        />
    ) : null;
};
const styles = StyleSheet.create({
    KeywordContainer: {
        marginLeft: RFValue(24),
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '90%',
    },
});
