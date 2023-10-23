import { useNavigation, useTheme } from '@react-navigation/native';
import {
    getkeywords, pushLoader,
    pushToChatFlow,
} from '@tb-frontend/shared/Store/action/chatActions';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList, KeyboardAvoidingView,
    Platform, StyleSheet, View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { ChatResCard, QuestionsStaticAdd, TabFeedBack } from '../../components/ChatComponents/ChatCards';
import { ChatHeader } from '../../components/ChatComponents/ChatHeader';
import { ChatSearchText } from '../../components/ChatComponents/searchText';
import { AnswerType, ChatLoader, KeywordTypeList, QuestionsAnswerType, StaticTypeList, TagModuleTypeList } from '../../components/ChatComponents/TypeList';
import { appConfigTypes, themeProps } from '../../types';
export default function ChatTool(): JSX.Element {
    const userDetails = useSelector(state => state?.user?.userData);
    const { feedBackArray, chatArray } = useSelector(state => state?.chat);
    const [disabled, setDisabled] = useState(false);
    const [focus, setScreenFocus] = useState(false);
    const [session_token, setSession_token] = useState(null);
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    const flatlistRef = useRef(null);
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const dispatch = useDispatch();
    const unsubscribe = async () => {
        await dispatch(getkeywords(session_token));
    };
    const ChatItem = (item, idx, disabled, setDisabled) => {
        if (item) {
            switch (item?.type) {
                case 'Loader':
                    return <ChatLoader idx={idx} />;
                case 'KeyWords':
                    const show = chatArray?.[chatArray?.length - 1] || chatArray?.[chatArray.length - 2] || false;
                    return (
                        <KeywordTypeList
                            session_token={session_token}
                            item={item?.data}
                            idx={idx}
                            show={show?.type === 'KeyWords' && (idx == chatArray.length - 1 || idx == chatArray.length - 2)}
                            key={'Keyword-Type-List-' + idx}
                        />
                    );
                case 'Answers':
                    return <AnswerType item={item?.data} idx={idx} />;
                case 'StaticData':
                    return (
                        <StaticTypeList
                            key={'Static-Data-' + idx}
                            idx={idx}
                            item={item?.data}
                        />
                    );
                case 'tag-Modules':
                    return (
                        <TagModuleTypeList
                            disabled={disabled}
                            setDisabled={setDisabled}
                            session_token={session_token}
                            idx={idx}
                            item={item?.data}
                            next={item?.data?.next_page_url}
                        />
                    );
                case 'tag-Modules-static':
                    return (
                        <React.Fragment>
                            {item?.data?.responses && (
                                <ChatResCard
                                    key={'tag-Modules-static-' + idx}
                                    botTitle={true}
                                    text={item?.data?.responses}
                                />
                            )}
                            {item?.data?.error && (
                                <>
                                    <ChatResCard
                                        key={'tag-Modules-static-error-' + idx}
                                        botTitle={true}
                                        noSpeaker
                                        text={appTranslations?.CHAT_QUESTIONSTATICADD_SORRY}
                                        noBottomWidth
                                    />
                                    <ChatResCard
                                        key={'error_Contact_us_topics-static-add-' + idx}
                                        isLink={true}
                                        noBottomWidth
                                        noSpeaker
                                        text={appTranslations.CHAT_QUESTIONSTATICADD_CONTACT}
                                        onPress={async () => {
                                            navigation.navigate('ContactUs');
                                        }}
                                    />

                                    <ChatResCard
                                        key={'Error_Back_to_main_topics-static-add-' + idx}
                                        isLink={true}
                                        noBottomWidth={false}
                                        noSpeaker
                                        text={appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS}
                                        onPress={async () => {
                                            await dispatch(
                                                pushToChatFlow({
                                                    type: 'Answers',
                                                    data: {
                                                        title:
                                                            appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS,
                                                    },
                                                    isPop: true,
                                                }),
                                            );
                                            await dispatch(pushLoader());
                                            await dispatch(getkeywords(session_token));
                                        }}
                                    />
                                </>
                            )}
                            {item?.data?.activity_id ? (
                                <TabFeedBack
                                    key={
                                        'tag-Modules-static-feedback-' +
                                        idx +
                                        '-' +
                                        item?.data?.activity_id
                                    }
                                    id={item?.data?.activity_id}
                                    question_id={0}
                                    tag_id={item?.data?.id}
                                    feedback={feedBackArray?.find(
                                        e => e?.activity_id === item?.data?.activity_id,
                                    )}
                                />
                            ) : null}
                        </React.Fragment>
                    );
                case 'QuestionAnswers':
                    return (
                        <QuestionsAnswerType
                            idx={idx}
                            item={item?.data}
                            disabled={disabled}
                            setDisabled={setDisabled}
                            session_token={session_token}
                        />
                    );
                case 'QuestionsStaticAdd':
                    return (
                        <QuestionsStaticAdd
                            session_token={session_token}
                            idx={idx}
                            length={item?.data?.data?.length}
                            item={item?.data}
                        />
                    );
                case 'Questions':
                    return (
                        <TagModuleTypeList
                            disabled={disabled}
                            setDisabled={setDisabled}
                            session_token={session_token}
                            idx={idx}
                            item={item?.data}
                            next={item?.data?.next_page_url}
                        />
                    );
                // case 'NTEPAnswers':
                //   return (
                //     <NTEPAnswersType
                //       idx={idx}
                //       item={item?.data}
                //       disabled={disabled}
                //       setDisabled={setDisabled}
                //       session_token={session_token}
                //     />
                //   );
                default:
                    return null;
            }
        }
    };
    useEffect(() => {
        if (focus) {
            unsubscribe();
        }
    }, [focus]);
    useEffect(() => {
        const Focus = navigation.addListener('focus', () => {
            if (chatArray.length == 0) {
                setScreenFocus(true);
                setSession_token(`${userDetails?.[0]?.id}-${new Date().toISOString()}`);
            }
        });

        return Focus;
    });
    useEffect(() => {
        const blur = navigation.addListener('blur', () => {
            // dispatch(clearChatFlow());
            setScreenFocus(false);
        });

        return blur;
    });
    useEffect(() => {
        if (chatArray.length > 2 && flatlistRef) {
            flatlistRef?.current?.scrollToIndex({
                animating: true,
                index: chatArray.length - 1,
            });
        }
    }, [chatArray, flatlistRef]);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={RFValue(45)}//CHECK ANDROID
            style={[styles.Container]}>
            <LinearGradient
                colors={colors.Blue_Gradient}
                style={styles.Container}>
                <ChatHeader
                    headerTitle={
                        chatArray?.length < 3
                            ? appTranslations.HEADER_CHAT_TITLE
                            : appTranslations.BOT_SHORT_NAME
                    }
                    isSubHeaderActive={chatArray?.length < 3}
                />
                <View
                    style={[styles.tabContainer, {
                        backgroundColor: colors.background,
                        borderTopLeftRadius: chatArray?.length > 2 ? 0 : RFValue(30),
                        borderTopRightRadius: chatArray?.length > 2 ? 0 : RFValue(30),
                    }]}>
                    <FlatList
                        style={{ marginHorizontal: RFValue(10), flex: 1 }}
                        data={chatArray}
                        keyExtractor={(item, idx) => {
                            return item.type + '-' + idx;
                        }}
                        contentContainerStyle={{ paddingTop: RFValue(10) }}
                        renderItem={({ item, index }) => {
                            return ChatItem(item, index, disabled, x => setDisabled(x));
                        }}
                        showsVerticalScrollIndicator={false}
                        ref={flatlistRef}
                        // // onLayout={() => flatlistRef?.current?.scrollToEnd() }
                        onScrollToIndexFailed={info => {
                            // console.log('onScrollToIndexFailed', info);
                            // flatlistRef?.current?.scrollToIndex({
                            //   animating: true,
                            //   index: info?.highestMeasuredFrameIndex,
                            // });
                            const offset = info.averageItemLength * info.index;
                            flatlistRef?.current?.scrollToOffset({ offset, animating: true });
                            setTimeout(
                                () =>
                                    flatlistRef?.current?.scrollToIndex({
                                        index: info.index,
                                        animating: true,
                                    }),
                                150,
                            );
                        }} />
                    <ChatSearchText session_token={session_token} />
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    tabContainer: {
        flex: 1,
        elevation: RFValue(1),
        overflow: 'hidden',


    },
});
