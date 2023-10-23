
import { useTheme } from '@react-navigation/native';
import {
    clearChatFlow, getkeywords, loadMore, pushLoader, pushToChatFlow, sendFeedback,
} from '@tb-frontend/shared/Store/action/chatActions';
import React from 'react';
import {
    Image,
    Pressable, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import HTML from 'react-native-render-html';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { em, iframe, li, p, span, strong, tableStyles, ul } from '../../config/styles';
import { appConfigTypes, themeProps } from '../../types';
import { SpeakerBtn } from './SpeakerBtn';
interface ChatResCardProps {
    onPress: () => void;
    noTopRadius: boolean;
    noBottomWidth: boolean;
    isLink?: boolean;
    botTitle?: boolean;
    text: string;
    title?: string;
    isHeader?: boolean;
    isIcon: boolean;
    noSpeaker: boolean;
    disabled: boolean;
    onSpeakerPlay: (play: boolean) => void;
}
export const ChatResCard: React.FC<ChatResCardProps> = ({
    botTitle = false,
    title = '',
    isHeader = false,
    isLink = false,
    noBottomWidth,
    noTopRadius,
    onPress = () => null,
    text = '',
    noSpeaker = false,
    disabled = false,
    onSpeakerPlay = () => null,
}) => {
    const contentWidth = useWindowDimensions().width;
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={{ flexDirection: 'row' }} >
            {botTitle && (
                <Image
                    style={{ height: RFValue(20), width: RFValue(20), marginRight: RFValue(5) }}
                    source={require('../../assets/chatbotface.png')}
                />
            )}
            <View style={{ flex: 1 }}>
                {isHeader && (
                    <View style={[styles.componentHeader, {
                        backgroundColor: colors.Light_blue,
                        borderColor: colors.BorderColor,
                    }]}>
                        <Text style={[FontStyle.Nunito16, { color: colors.Blue_2 }]}>{title}</Text>
                    </View>
                )}
                <View
                    style={{
                        ...styles.resCradContainer,
                        marginLeft: botTitle ? 0 : RFValue(25),
                        backgroundColor: colors.background,
                        borderColor: colors.BorderColor,
                        borderTopWidth: isHeader ? 0 : noTopRadius ? 0 : 1,
                        borderWidth: noTopRadius ? 0 : 0,
                        borderBottomWidth: noBottomWidth ? 0 : 1,
                        marginBottom: noBottomWidth ? 0 : RFValue(8),
                    }}>
                    <Pressable onPress={onPress} style={[styles.cardData]}>
                        {text && text?.startsWith('<') ? (
                            <HTML
                                source={{ html: text }}
                                contentWidth={contentWidth}
                                tagsStyles={{
                                    p: {
                                        ...p,
                                        color: colors.black2,
                                        marginBottom: RFValue(10),
                                        textAlign: 'auto',
                                    },
                                    span: {
                                        ...span,
                                        color: colors.black2,
                                    },
                                    em: {
                                        ...em,
                                        padding: 'auto',
                                        color: colors.Grey_3,
                                    },
                                    ul: {
                                        ...ul,
                                        padding: 'auto',
                                        color: colors.Blue_2,
                                        margin: 0,
                                    },
                                    ol: {
                                        color: colors.Blue_2,
                                        padding: 'auto',
                                    },
                                    li: {
                                        ...li,
                                        padding: 'auto',
                                        color: colors.black2,
                                        alignItems: 'flex-start',
                                        marginBottom: RFValue(10),
                                    },
                                    strong: {
                                        ...strong,
                                        color: colors.black2,
                                        textAlign: 'auto',
                                    },
                                    table: {
                                        ...tableStyles,
                                        color: colors.black2,
                                    },
                                    iframe: {
                                        ...iframe,
                                        minHeight: RFValue(230),
                                        color: colors.black2,
                                    },
                                }}
                            />
                        ) : (
                            <Text
                                style={[isLink ? FontStyle.Nunito12 : FontStyle.Nunito16, {
                                    color: isLink
                                        ? colors.Blue_2
                                        : colors.black2,
                                    textAlign: isLink ? 'center' : 'auto',
                                }]}>
                                {text}
                            </Text>
                        )}
                    </Pressable>
                    {noSpeaker ? null : (
                        <SpeakerBtn
                            disabled={disabled}
                            text={text}
                            onSpeakerPlay={onSpeakerPlay}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};
interface ChatOp_AnsCardProps {
    isKeyWord: boolean;
    userTitle?: boolean;
    onPress: () => void;
    text: string;
}
export const ChatOp_AnsCard: React.FC<ChatOp_AnsCardProps> = ({
    isKeyWord,
    onPress = () => null,
    text,
    userTitle = false,
}) => {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View>
            {userTitle && (
                <Text style={[FontStyle.RalewayTitle, styles.userHeader, { color: colors.Blue_2 }]}>
                    {appTranslations.CHAT_USERSIDE_YOU}
                </Text>
            )}
            <Pressable
                onPress={
                    isKeyWord && onPress
                        ? onPress
                        : undefined
                }
                style={
                    isKeyWord
                        ? [styles.keyContainer, { borderColor: colors.Blue_2 }]
                        : [styles.chatContainer, { backgroundColor: colors.Blue_2 }]
                }>
                <Text
                    style={[
                        isKeyWord ? FontStyle.RalewayTitle : FontStyle.Nunito16,
                        {
                            textAlign: isKeyWord ? 'center' : 'auto',
                            color: isKeyWord
                                ? colors.Blue_2
                                : colors.white,
                        },
                    ]}>
                    {text}
                </Text>
            </Pressable>
        </View>
    );
};
export const ChatModuleCard: React.FC<ChatResCardProps> = ({
    botTitle,
    title,
    isHeader,
    isLink,
    noBottomWidth,
    noTopRadius,
    onPress = () => null,
    isIcon = false,
    text = '',
    image,
}) => {
    const contentWidth = useWindowDimensions().width;
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View>
            {botTitle && (
                <Image
                    style={{ height: RFValue(20), width: RFValue(20), marginRight: RFValue(5) }}
                    source={require('../../assets/chatbotface.png')}
                />
            )}
            {isHeader && (
                <View style={[styles.componentHeader, {
                    backgroundColor: colors.Light_blue,
                    borderColor: colors.BorderColor,
                    marginLeft: botTitle ? 0 : RFValue(25),
                    borderTopStartRadius: noBottomWidth ? 0 : RFValue(5),
                    borderTopEndRadius: noBottomWidth ? 0 : RFValue(5),
                }]}>
                    <Text style={[FontStyle.Nunito16, { color: colors.Blue_2 }]}>{title}</Text>
                </View>
            )}

            <View
                style={{
                    ...styles.resCradContainer,
                    marginLeft: botTitle ? 0 : RFValue(25),
                    backgroundColor: colors.background,
                    borderColor: colors.BorderColor,
                    borderTopWidth: isHeader ? 0 : noTopRadius ? 0 : 1,
                    borderWidth: noTopRadius ? 0 : 0,
                    borderBottomWidth: noBottomWidth ? 0 : 1,
                    marginBottom: noBottomWidth ? 0 : RFValue(8),
                }}>
                <Pressable
                    onPress={onPress}
                    style={[styles.imageCardData, styles.cardData]}>
                    {isIcon && image}
                    {text && text?.startsWith('<') ? (
                        <HTML
                            source={{ html: text }}
                            contentWidth={contentWidth}
                            tagsStyles={{
                                p: {
                                    ...p,
                                    color: colors.black2,
                                    marginBottom: RFValue(10),
                                    textAlign: 'auto',
                                },
                                span: {
                                    ...span,
                                    color: colors.black2,
                                },
                                em: {
                                    ...em,
                                    padding: 'auto',
                                    color: colors.Grey_3,
                                },
                                ul: {
                                    ...ul,
                                    padding: 'auto',
                                    color: colors.Blue_2,
                                    margin: 0,
                                },
                                ol: {
                                    color: colors.Blue_2,
                                    padding: 'auto',
                                },
                                li: {
                                    ...li,
                                    padding: 'auto',
                                    color: colors.black2,
                                    alignItems: 'flex-start',
                                    marginBottom: RFValue(10),
                                },
                                strong: {
                                    ...strong,
                                    color: colors.black2,
                                    textAlign: 'auto',
                                },
                                table: {
                                    ...tableStyles,
                                    color: colors.black2,
                                },
                                iframe: {
                                    ...iframe,
                                    minHeight: RFValue(230),
                                    color: colors.black2,
                                },
                            }}
                        />
                    ) : (
                        <Text
                            style={[isLink ? FontStyle.Nunito12 : FontStyle.Nunito16, {
                                flex: 1,
                                color: isLink
                                    ? colors.Blue_2
                                    : colors.black2,
                                textAlign: isLink ? 'center' : 'auto',
                            }]}>
                            {text}
                        </Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
};
interface TabFeedBackProps {
    id: string;
    feedback: any;
    question_id: number;
    tag_id: number;
}
export const TabFeedBack: React.FC<TabFeedBackProps> = ({
    id = '',
    feedback = {},
    question_id = 0,
    tag_id = 0,
}) => {
    const dispatch = useDispatch();
    const onClick = async (activity_id, question_id, tag_id, like, dislike) => {
        dispatch(
            sendFeedback({
                activity_id: activity_id,
                question_id: question_id,
                tag_id: tag_id,
                like: like,
                dislike: dislike,
            }),
        );
    };
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={styles.feedBackComponent}>
            <Pressable
                disabled={feedback?.activity_id !== undefined}
                onPress={() => {
                    onClick(id, question_id, tag_id, 1, 0);
                }}
                style={[
                    styles.feedBackBtn,
                    {
                        borderColor: colors.success,
                        opacity: feedback?.activity_id !== undefined ? 0.4 : 1,
                    },
                ]}>
                {feedback?.like === 1 ?
                    <Icon
                        name="thumb-up"
                        size={RFValue(20)}
                        color={colors.success}
                    />
                    : <Icon
                        name="thumb-up-off-alt"
                        size={RFValue(20)}
                        color={colors.success}
                    />}
            </Pressable>

            <Pressable
                disabled={feedback?.activity_id !== undefined}
                onPress={() => {
                    onClick(id, question_id, tag_id, 0, 1);
                }}
                style={[
                    styles.feedBackBtn,
                    {
                        borderColor: colors.error,
                        opacity: feedback?.activity_id !== undefined ? 0.4 : 1,
                    },
                ]}>
                {feedback?.dislike === 1 ?
                    <Icon
                        name="thumb-down"
                        size={RFValue(20)}
                        color={colors.error}
                    />
                    : <Icon
                        name="thumb-down-off-alt"
                        size={RFValue(20)}
                        color={colors.error}
                    />}
            </Pressable>
        </View>
    );
};

interface QuestionsStaticAddProps {
    item: any;
    length: number;
    idx: number;
    session_token: string;
}
export const QuestionsStaticAdd: React.FC<QuestionsStaticAddProps> =
    ({
        item,
        length,
        idx,
        session_token,
    }) => {
        const dispatch = useDispatch();
        const navigation = useNavigation();
        const appTranslations: appConfigTypes = useSelector(
            state => state?.app?.appTranslations,
        );
        const data = [
            {
                id: 'questionStatic2',
                title: appTranslations.CHAT_QUESTIONSTATICADD_LOAD_MORE,
            },
            {
                id: 'questionStatic3',
                title: appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS,
            },
            {
                id: 'questionStatic1',
                title: appTranslations.CHAT_QUESTIONSTATICADD_MESSAGE,
            },
        ];
        const nullobj = [
            {
                id: 'nullquestionStatic1',
                title: appTranslations.CHAT_QUESTIONSTATICADD_SORRY,
            },
            {
                id: 'nullquestionStatic2',
                title: appTranslations.CHAT_QUESTIONSTATICADD_CONTACT,
            },
            {
                id: 'nullquestionStatic3',
                title: appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS,
            },
        ];
        return (
            <View>
                {length === 0
                    ? nullobj?.map((nullItem: any, i) => {
                        return (
                            <ChatResCard
                                key={'QuestionsStaticAdd-' + idx + '-' + i}
                                isLink={i != 0 ? true : false}
                                noBottomRadius={i + 1 == data?.length ? false : true}
                                noTopRadius={i == 0 ? false : true}
                                text={nullItem?.title}
                                onPress={
                                    nullItem?.title ===
                                        appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS
                                        ? async () => {
                                            await dispatch(
                                                pushToChatFlow({
                                                    type: 'Answers',
                                                    data: {
                                                        title: nullItem?.title,
                                                    },
                                                    isPop: true,
                                                }),
                                            );
                                            await dispatch(pushLoader());
                                            await dispatch(getkeywords(session_token));
                                        }
                                        : nullItem?.title ===
                                            appTranslations.CHAT_QUESTIONSTATICADD_CONTACT
                                            ? async () => {
                                                await dispatch(clearChatFlow());
                                                navigation.navigate('ContactUs');
                                            }
                                            : () => null
                                }
                            />
                        );
                    })
                    : data?.map((dataItem: any, i) => {
                        if (
                            dataItem?.title !== appTranslations.CHAT_QUESTIONSTATICADD_LOAD_MORE
                        ) {
                            return (
                                <ChatResCard
                                    key={'QuestionsStaticAdd-' + idx + '-' + i}
                                    isLink={i !== 2 ? true : false}
                                    noBottomRadius={i + 1 == data?.length ? false : true}
                                    // noTopRadius={
                                    //     i == 1
                                    //         ? item?.next_page_url == null
                                    //             ? false
                                    //             : true
                                    //         : true
                                    // }
                                    text={dataItem?.title}
                                    onPress={
                                        dataItem?.title ===
                                            appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS
                                            ? async () => {
                                                await dispatch(
                                                    pushToChatFlow({
                                                        type: 'Answers',
                                                        data: {
                                                            title: dataItem?.title,
                                                        },
                                                        isPop: true,
                                                    }),
                                                );
                                                await dispatch(pushLoader());
                                                await dispatch(getkeywords(session_token));
                                            }
                                            : dataItem?.title ===
                                                appTranslations.CHAT_QUESTIONSTATICADD_LOAD_MORE
                                                ? async () => {
                                                    await dispatch(
                                                        pushToChatFlow({
                                                            type: 'Answers',
                                                            data: {
                                                                title: dataItem?.title,
                                                            },
                                                            isPop: true,
                                                        }),
                                                    );
                                                    await dispatch(pushLoader());
                                                    await dispatch(
                                                        loadMore(item?.next_page_url, 'Questions'),
                                                    );
                                                }
                                                : () => null
                                    }
                                />
                            );
                        } else if (item?.next_page_url) {
                            return (
                                <ChatResCard
                                    noBottomRadius={true}
                                    // noTopRadius={true}
                                    key={i + dataItem.id}
                                    isLink={true}
                                    onPress={
                                        dataItem?.title ===
                                            appTranslations.CHAT_QUESTIONSTATICADD_LOAD_MORE
                                            ? async () => {
                                                await dispatch(
                                                    pushToChatFlow({
                                                        type: 'Answers',
                                                        data: {
                                                            title: dataItem?.title,
                                                        },
                                                        isPop: true,
                                                    }),
                                                );
                                                await dispatch(pushLoader());
                                                await dispatch(
                                                    loadMore(item?.next_page_url, 'Questions'),
                                                );
                                            }
                                            : dataItem?.title ===
                                                appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS
                                                ? async () => {
                                                    await dispatch(
                                                        pushToChatFlow({
                                                            type: 'Answers',
                                                            data: {
                                                                title: dataItem?.title,
                                                            },
                                                            isPop: true,
                                                        }),
                                                    );
                                                    await dispatch(pushLoader());
                                                    await dispatch(getkeywords(session_token));
                                                }
                                                : () => null
                                    }
                                    text={dataItem?.title}
                                />
                            );
                        }
                    })}
            </View>
        );
    };
const styles = StyleSheet.create({
    userHeader: {
        marginBottom: RFValue(10),
        alignSelf: 'flex-end',
        alignItems: 'flex-start',
    },
    keyContainer: {
        borderWidth: 1,
        borderRadius: RFValue(5),
        paddingVertical: RFValue(5),
        paddingHorizontal: RFValue(10),
        marginRight: RFValue(10),
        marginBottom: RFValue(10),
    },
    chatContainer: {
        borderRadius: RFValue(8),
        paddingVertical: RFValue(5),
        paddingHorizontal: RFValue(10),
        alignSelf: 'flex-end',
        alignItems: 'flex-start',
        marginBottom: RFValue(10),
        marginRight: RFValue(10),
    },
    componentHeader: {
        borderWidth: 1,
        flex: 1,
        flexDirection: 'row',

        borderTopStartRadius: RFValue(5),
        borderTopEndRadius: RFValue(5),
        padding: RFValue(5),
    },
    resCradContainer: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        flex: 1,
        flexDirection: 'row',
        padding: RFValue(5),
    },
    cardData: {
        flex: 1,
        marginRight: RFValue(5),
    },
    imageCardData: {
        flexDirection: 'row',
        flex: 1,
    },
    feedBackComponent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        marginLeft: RFValue(24),
        marginBottom: RFValue(18),
    },
    feedBackBtn: {
        paddingHorizontal: RFValue(8),
        paddingVertical: RFValue(3),
        borderWidth: 1,
        borderRadius: RFValue(5),
        marginRight: RFValue(7),
    },
});
