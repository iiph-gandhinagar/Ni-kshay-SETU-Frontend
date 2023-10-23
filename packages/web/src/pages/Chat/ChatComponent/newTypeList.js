import { getkeywords, getQuestionsBykeyword, loadMore, postQuestionHit, pushLoader, pushToChatFlow } from "@tb-frontend/shared/Store/action/chatActions";
import { useState } from "react";
import { toggleWidget } from "react-chat-widget";
import { toggleMsgLoader } from "react-chat-widget";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Flex } from "theme-ui";
import { ChatAdditionalMaterialSection, ChatModuleSection, ChatOp_AnsCard, ChatQuestionSection, ChatResCard, ChatResourceModuleSection } from "./newChatCard";
import { TabFeedBack } from "./TabFeedBack";

export const QuestionsAnswerType = (
    {
        disabled = false,
        idx,
        item,
        setDisabled = () => null,
        session_token,
    }
) => {
    const dispatch = useDispatch();
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const history = useHistory()
    const { feedBackArray, questionActivityId } = useSelector(state => state?.chat);
    return (
        <Box key={idx}>
            <ChatResCard
                key={'QuestionsAnswerType-CHAT_ANSWERS-' + idx}
                botTitle={true}
                isHeader
                title={appTranslations.CHAT_ANSWERS}
                text={item?.title}
                disabled={disabled}
                onSpeakerPlay={setDisabled}
            />
            <TabFeedBack
                idx={idx}
                id={questionActivityId}
                question_id={item?.question_id}
                tag_id={0}
                feedback={feedBackArray?.find(
                    e => e?.question_id === item?.question_id,
                )}
            />
            {item?.onClick && (
                <ChatResCard
                    key={'Questions-Answer-Type-CHAT_QUESTIONANSWERTYPE_LOAD_SIM_QUES-' + idx}
                    noSpeaker={true}
                    noBottomWidth={true}
                    isLink={true}
                    text={appTranslations?.CHAT_QUESTIONANSWERTYPE_LOAD_SIM_QUES}
                    onClick={async () => {
                        await dispatch(
                            pushToChatFlow({
                                type: 'Answers',
                                data: {
                                    title: appTranslations?.CHAT_QUESTIONANSWERTYPE_LOAD_SIM_QUES,
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
                onClick={async () => {
                    toggleWidget();
                    history.push('/ContactUs');
                }}
            />
            <ChatResCard
                key={'Back_to_main_topics-static-add-' + idx + '-' + item?.question_id}
                isLink={true}
                noBottomWidth={false}
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS}
                onClick={async () => {
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
        </Box>
    );
};
export const KeywordTypeList = (
    {
        idx,
        item,
        session_token,
        show,
    }
) => {
    const dispatch = useDispatch();
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const { currentKeywordObj } = useSelector(state => state?.chat);
    return (
        <Flex
            key={"KeywordTypeList-flex-" + idx}
            sx={{
                flexWrap: 'wrap',
                maxWidth: '90%',
                ml: 4
            }}>
            {/* <div> */}
            {item?.data?.map((data, idx_in) => (
                <ChatOp_AnsCard
                    key={'KeyWords-' + idx + '-' + idx_in}
                    onClick={async () => {
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
                    onClick={async () => {
                        await dispatch(pushLoader());
                        await dispatch(loadMore(item?.next_page_url, 'KeyWords'));
                    }}
                    isKeyWord={true}
                    text={appTranslations?.CHAT_KEYWORDTYPELIST_MORE}
                />
            )}
            {/* </div> */}
        </Flex>
    );
};
export const AnswerType = ({ idx, item }) => {
    // console.log('text', text);
    return (
        <ChatOp_AnsCard
            key={idx}
            userTitle={true}
            text={item?.title}
        />
    );
};
export const StaticTypeList = ({ idx, item }) => {
    return item?.map((data, i) => (
        <ChatResCard
            key={'StaticData-' + idx + '-' + i}
            botTitle={i == 0 ? true : false}
            noTopRadius={i == 0 ? false : true}
            noBottomRadius={
                item?.length > 1 ? (i == 0 ? true : false) : false
            }
            noSpeaker
            text={data?.title}
        />
    ));
};
export const QuestionTypeList = ({
    idx,
    item,
    next,
    session_token,
    disabled = false,
    setDisabled = (value) => null,
}) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const dispatch = useDispatch();
    return item?.map((data, i) => (
        <ChatResCard
            key={'Questions-' + idx + '-' + i + '-' + data?.id}
            botTitle={i == 0 ? true : false}
            noTopRadius={false}
            noBottomWidth={i == item.length - 1 ? false : true}
            title={appTranslations.CHAT_RELATED_OUESTION}
            isHeader={i == 0 ? true : false}
            onClick={async () => {
                dispatch(
                    postQuestionHit({
                        question_id: data?.id,
                        session_token: session_token,
                    }),
                );
                await dispatch(
                    pushToChatFlow({
                        type: 'Answers',
                        data: {
                            title: data.question,
                        },
                        isPop: true,
                    }),
                );
                await dispatch(
                    pushToChatFlow({
                        type: 'QuestionAnswers',
                        data: {
                            title: data.answer,
                            question_id: data?.id,
                            onClick: next,
                        },
                        isPop: true,
                    }),
                );
            }}
            disabled={disabled}
            onSpeakerPlay={setDisabled}
            text={data?.question}
        />
    ));
};
export const ChatLoader = (props) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const { chatloader, chatArray } = useSelector(
        state => state?.chat,
    );
    return chatloader && props?.idx == chatArray?.length - 1 ? (
        <div id="loader" className="">
            <div className="dots container">
                {appTranslations.BOT_NAME + ` Typing`}
                <span style={{ marginLeft: '15px' }}></span>
                <span></span>
                <span></span>
            </div>
        </div>
    ) : null
}
export const TagModuleTypeList = ({
    idx,
    item,
    next,
    session_token,
    disabled = false,
    setDisabled = () => null,
    noFeedback = false,
}) => {
    const dispatch = useDispatch();
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const history = useHistory();
    const feedback = useSelector(state => state?.chat.feedBackArray);
    return (
        <>
            <ChatQuestionSection
                item={item}
                appTranslations={appTranslations}
                idx={idx}
                session_token={session_token}
                disabled={disabled}
                setDisabled={setDisabled}
                next={next}
            />
            <ChatModuleSection
                item={item}
                appTranslations={appTranslations}
                idx={idx}
            />
            <ChatResourceModuleSection
                item={item}
                appTranslations={appTranslations}
                idx={idx}
            />
            <ChatAdditionalMaterialSection
                item={item}
                appTranslations={appTranslations}
                idx={idx}
                session_token={session_token}
                disabled={disabled}
                setDisabled={setDisabled}
            />
            <ChatResCard
                key={'TagModule-Contact-us-static-add-' + idx}
                isLink={true}
                noBottomWidth
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_CONTACT}
                onClick={async () => {
                    toggleWidget();
                    history.push('/ContactUs');
                }}
            />
            <ChatResCard
                key={'TagModule-Back_to_main_topics-static-add-' + idx}
                isLink={true}
                noBottomWidth={false}
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS}
                onClick={async () => {
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
            {noFeedback ? null : <TabFeedBack
                key={'TagModule-feedback-' + idx + '-' + item?.activity_id}
                id={item?.activity_id}
                question_id={0}
                tag_id={item?.id}
                feedback={feedback?.find(e => e?.activity_id === item?.activity_id)}
            />}
        </>
    );
};

export const NTEPAnswersType = (
    {
        disabled = false,
        idx,
        item,
        setDisabled = () => null,
        session_token,
    }
) => {
    const dispatch = useDispatch();
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const history = useHistory()
    return (
        <Box key={idx}>
            <ChatResCard
                key={'NTEPAnswersType-CHAT_ANSWERS-' + idx}
                botTitle={true}
                isHeader
                title={appTranslations.CHAT_NTEP_ANSWERS}
                text={item?.title}
                disabled={disabled}
                onSpeakerPlay={setDisabled}
            />
            <ChatResCard
                key={'Contact-us-static-add-' + idx + '-' + 'NTEPAnswersType-CHAT_ANSWERS'}
                isLink={true}
                noBottomWidth
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_CONTACT}
                onClick={async () => {
                    toggleWidget();
                    history.push('/ContactUs');
                }}
            />
            <ChatResCard
                key={'Back_to_main_topics-static-add-' + idx + '-' + 'NTEPAnswersType-CHAT_ANSWERS'}
                isLink={true}
                noBottomWidth={false}
                noSpeaker
                text={appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS}
                onClick={async () => {
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
        </Box>
    );
};