import { BASE_MEDIA_URL } from "@tb-frontend/shared/globles";
import { clearChatFlow, getkeywords, loadMore, postQuestionHit, pushLoader, pushToChatFlow } from "@tb-frontend/shared/Store/action/chatActions";
import { useState } from "react";
import { toggleWidget } from "react-chat-widget";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Flex, Heading, Text } from "theme-ui";
import { getImage } from "../../../utils/functions";
import { SpeakerBtn } from "./SpeakerBtn";

export const ChatOp_AnsCard = ({ isKeyWord,
    onClick = () => null,
    text,
    userTitle
}) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <div>
            <Flex sx={{ alignItems: 'center', flexDirection: "column" }}>
                {userTitle &&
                    <Text sx={{

                        marginBottom: "10px",
                        alignSelf: 'flex-end',
                        alignItems: 'flex-start',
                        fontFamily: "body",
                        fontSize: "12px",
                        lineHeight: "16px",
                        fontWeight: '700',
                        color: "#000"
                    }}>{appTranslations?.CHAT_USERSIDE_YOU}
                    </Text>
                }

                <Box
                    onClick={
                        isKeyWord && onClick
                            ? onClick
                            : null
                    }
                    sx={{ variant: isKeyWord ? "keyContainer" : "chatContainer", cursor: isKeyWord ? 'pointer' : '' }}
                >
                    <Text
                        sx={{
                            fontFamily: "body",
                            fontSize: "14px",
                            lineHeight: "19px",
                            fontWeight: 'body',
                            color: isKeyWord ? "white" : 'black',
                            textAlign: isKeyWord ? 'center' : 'auto'

                        }}>
                        {text}
                    </Text>
                </Box>
            </Flex>
        </div>
    );
};
export const ChatResCard = ({
    botTitle,
    title,
    isHeader,
    isLink,
    noBottomWidth,
    noTopRadius,
    onClick = () => null,
    text = '',
    noSpeaker = false,
    disabled = false,
    onSpeakerPlay = () => null
}) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <div>
            {botTitle && (
                <Flex sx={{ alignItems: 'center', }}>
                    <img src={"images/bot.svg"} alt="bot" sx={{ marginRight: 2, }} />
                    <Text sx={{ fontFamily: "body", fontSize: 0, color: "colorDark3", fontWeight: "heading" }}>{appTranslations?.HEADER_CHAT_TITLE}</Text>
                </Flex>
            )}
            {isHeader && (
                <Flex sx={{
                    maxWidth: '90%',
                    borderColor: "border",
                    borderStyle: "solid",
                    borderWidth: 1,
                    flex: 1,
                    flexDirection: 'row',
                    ml: "24px",
                    backgroundColor: "foreground",
                    px: "12px",
                    py: 1,
                }}>
                    <Text sx={{
                        fontFamily: "body",
                        textAlign: 'auto',
                        fontSize: 0,
                        fontStyle: 'italic',
                        color: "primary", fontWeight: "heading", lineHeight: 'body'
                    }}>{title}</Text>
                </Flex>
            )}
            <Flex sx={{
                py: 3,
                px: "12px",
                alignItems: 'center',
                ml: "24px",
                marginBottom: noBottomWidth ? 0 : "8px",
                borderColor: "border",
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: noBottomWidth ? 0 : 1,
                maxWidth: '90%',
                borderStyle: "solid",
                backgroundColor: "foreground",
                borderTopWidth: isHeader ? 0 : noTopRadius ? 0 : 1,
            }}>
                <Box sx={{
                    flex: 1,
                    cursor: (isLink || onClick) ? "pointer" : ''
                }}
                    onClick={
                        onClick
                            ? onClick
                            : () => null
                    }>
                    {text && text.startsWith('<') ?
                        <div
                            dangerouslySetInnerHTML={{
                                __html: text
                            }}
                            className=""
                            sx={{
                                textAlign: "justify",
                                fontSize: 1,
                                lineHeight: "19px",
                            }}
                        /> :
                        <Heading variant="Nunito18title" style={{
                            margin: '0px',
                            color: isLink ? '#30AAB9' : '#392a25',
                            textAlign: isLink ? "center" : 'start',
                        }} sx={{
                            verticalAlign: 'middle',
                        }}>{text}</Heading>}
                </Box>
                {noSpeaker ? null : (
                    <SpeakerBtn
                        disabled={disabled}
                        text={text}
                        onSpeakerPlay={onSpeakerPlay}
                    />
                )}
            </Flex>
        </div>
    );
};
export const QuestionsStaticAdd = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    const data = [
        {
            id: 'questionStatic2',
            title: appTranslations?.CHAT_QUESTIONSTATICADD_LOAD_MORE,
        },
        {
            id: 'questionStatic3',
            title: appTranslations?.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS,
        },
        {
            id: 'questionStatic1',
            title: appTranslations?.CHAT_QUESTIONSTATICADD_MESSAGE,
        },
    ];
    const nullobj = [
        {
            id: 'nullquestionStatic1',
            title:
                appTranslations?.CHAT_QUESTIONSTATICADD_SORRY,
        },
        {
            id: 'nullquestionStatic2',
            title: appTranslations?.CHAT_QUESTIONSTATICADD_CONTACT,
        },
        {
            id: 'nullquestionStatic3',
            title: appTranslations?.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS,
        },
    ];
    return (
        <>
            {props?.length === 0
                ? nullobj?.map((item, i) => {
                    return (
                        <ChatResCard
                            key={'QuestionsStaticAdd-' + props?.idx + '-' + i}
                            isLink={i != 0 ? true : false}
                            noSpeaker
                            noBottomWidth={i + 1 == data?.length ? false : true}
                            noTopRadius={i == 0 ? false : true}
                            text={item?.title}
                            onClick={
                                item?.title === appTranslations?.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS
                                    ? async () => {
                                        await dispatch(
                                            pushToChatFlow({
                                                type: 'Answers',
                                                data: {
                                                    title: item?.title,
                                                },
                                                isPop: true,
                                            }),
                                        );
                                        await dispatch(pushLoader());
                                        await dispatch(getkeywords(props.session_token));
                                    }
                                    : item?.title === appTranslations?.CHAT_QUESTIONSTATICADD_CONTACT
                                        ? async () => {
                                            await dispatch(clearChatFlow());
                                            toggleWidget();
                                            history.push('/ContactUs');
                                        }
                                        : null
                            }
                        />
                    );
                })
                : data?.map((item, i) => {
                    if (item?.title !== appTranslations?.CHAT_QUESTIONSTATICADD_LOAD_MORE) {
                        return (
                            <ChatResCard
                                key={'QuestionsStaticAdd-' + props?.idx + '-' + i}
                                isLink={i !== 2 ? true : false}
                                noBottomWidth={i + 1 === data.length ? false : true}
                                noSpeaker
                                text={item?.title}
                                onClick={
                                    item?.title === appTranslations?.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS
                                        ? async () => {
                                            await dispatch(
                                                pushToChatFlow({
                                                    type: 'Answers',
                                                    data: {
                                                        title: item?.title,
                                                    },
                                                    isPop: true,
                                                }),
                                            );
                                            await dispatch(pushLoader());
                                            await dispatch(getkeywords(props.session_token));
                                        }
                                        : item?.title === appTranslations?.CHAT_QUESTIONSTATICADD_LOAD_MORE
                                            ? async () => {
                                                await dispatch(
                                                    pushToChatFlow({
                                                        type: 'Answers',
                                                        data: {
                                                            title: item?.title,
                                                        },
                                                        isPop: true,
                                                    }),
                                                );
                                                await dispatch(pushLoader());
                                                await dispatch(
                                                    loadMore(props?.item?.next_page_url, 'Questions'),
                                                );
                                            }
                                            : null
                                }
                            />
                        );
                    } else if (props?.item?.next_page_url) {
                        return (
                            <ChatResCard
                                key={'QuestionsStaticAdd-' + props?.idx + '-' + i}
                                noBottomWidth={true}
                                // noTopRadius={true}
                                noSpeaker
                                isLink={true}
                                onClick={
                                    item?.title === appTranslations?.CHAT_QUESTIONSTATICADD_LOAD_MORE
                                        ? async () => {
                                            await dispatch(
                                                pushToChatFlow({
                                                    type: 'Answers',
                                                    data: {
                                                        title: item?.title,
                                                    },
                                                    isPop: true,
                                                }),
                                            );
                                            await dispatch(pushLoader());
                                            await dispatch(
                                                loadMore(props?.item?.next_page_url, 'Questions'),
                                            );
                                        }
                                        : item?.title === appTranslations?.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS
                                            ? async () => {
                                                await dispatch(
                                                    pushToChatFlow({
                                                        type: 'Answers',
                                                        data: {
                                                            title: item?.title,
                                                        },
                                                        isPop: true,
                                                    }),
                                                );
                                                await dispatch(pushLoader());
                                                await dispatch(getkeywords(props.session_token));
                                            }
                                            : null
                                }
                                text={item?.title}
                            />
                        );
                    }
                })}
        </>
    );
};
export const ChatModuleCard = ({
    isIcon = false,
    image,
    botTitle,
    title,
    isHeader,
    isLink,
    noBottomWidth,
    noTopRadius,
    onClick = () => null,
    text = '',
}) => {
    const appTranslations = useSelector(
        state => state?.app?.appTranslations,
    );
    return (
        <div>
            {botTitle && (
                <Flex sx={{ alignItems: 'center', }}>
                    <img src={"images/bot.svg"} alt="bot" sx={{ marginRight: 2, }} />
                    <Text sx={{ fontFamily: "body", fontSize: 0, color: "colorDark3", fontWeight: "heading" }}>{appTranslations?.HEADER_CHAT_TITLE}</Text>
                </Flex>
            )}
            {isHeader && (
                <Flex sx={{
                    maxWidth: '90%',
                    borderColor: "border",
                    borderStyle: "solid",
                    borderWidth: 1,
                    flex: 1,
                    flexDirection: 'row',
                    ml: "24px",
                    backgroundColor: "foreground",
                    px: "12px",
                    py: 1,
                }}>
                    <Text sx={{
                        fontFamily: "body",
                        textAlign: 'auto',
                        fontSize: 0,
                        fontStyle: 'italic',
                        color: "primary", fontWeight: "heading", lineHeight: 'body'
                    }}>{title}</Text>
                </Flex>
            )}
            <Flex sx={{
                py: 3,
                px: "12px",
                alignItems: 'center',
                ml: "24px",
                marginBottom: noBottomWidth ? 0 : "8px",
                borderColor: "border",
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: noBottomWidth ? 0 : 1,
                maxWidth: '90%',
                borderStyle: "solid",
                backgroundColor: "foreground",
                borderTopWidth: isHeader ? 0 : noTopRadius ? 0 : 1,
            }}>

                <Box sx={{
                    flex: 1,
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: (isLink || onClick) ? "pointer" : ''
                }}
                    onClick={
                        onClick
                            ? onClick
                            : () => null
                    }>
                    {isIcon && image}
                    {text && text.startsWith('<') ?
                        <div
                            dangerouslySetInnerHTML={{
                                __html: text
                            }}
                            className=""
                            sx={{ textAlign: "justify", flex: 1 }}
                        /> :
                        <h6 style={{
                            flex: 1,
                            margin: '0px',
                            color: isLink ? '#30AAB9' : '#392a25',
                            textAlign: isLink ? "center" : 'start',
                        }} sx={{
                            verticalAlign: 'middle',

                            fontSize: 1,
                            lineHeight: "19px",
                        }}>{text}</h6>}
                </Box>
            </Flex>
        </div>
    );
};
export const ChatQuestionSection = ({
    item,
    appTranslations,
    idx,
    session_token,
    disabled,
    setDisabled,
    next
}) => {
    const dispatch = useDispatch()
    const count = item?.questions?.length;
    const [rowsPerPage, setRowsPerPage] = useState(5)
    return (
        <div id={'ChatQuestionSection' + idx}>
            {item?.questions?.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage).map((data, i) => (
                <ChatResCard
                    key={'TagModule-Questions-' + idx + '-' + i + '-' + data?.id}
                    botTitle={i == 0 ? true : false}
                    isHeader={i == 0 ? true : false}
                    title={appTranslations.CHAT_RELATED_OUESTION}
                    noTopRadius={false}
                    noBottomWidth={true}
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
            ))}
            {count > 5 && count > rowsPerPage && (
                <ChatResCard
                    key={'QuestionsStaticAdd-' + idx}
                    isLink={true}
                    noBottomWidth={true}
                    text={'Load more'}
                    onClick={() => setRowsPerPage(rowsPerPage + 5)
                    }
                    noSpeaker
                />
            )}
        </div>
    );
};
export const ChatModuleSection = ({
    item,
    appTranslations,
    idx
}) => {
    const history = useHistory()
    const count = item?.modules?.length;
    const [rowsPerPage, setRowsPerPage] = useState(3)
    const { dynamicAlogs } = useSelector(state => state?.app);
    return (
        <div id={'ChatModuleSection' + idx}>
            {item?.modules?.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage).map((data, i) => {
                const findValue = dynamicAlogs?.find(e => e?.data.find(j => j.cardTitle === data?.name))?.data.find(j => j.cardTitle === data?.name)
                return (
                    <ChatModuleCard
                        key={'TagModule-Module_Suggestions-' + idx + '-' + i}
                        botTitle={false}
                        isHeader={i == 0 ? true : false}
                        title={appTranslations.CHAT_MODULE_SUGGESTIONS}
                        noTopRadius={false}
                        noBottomWidth={true}
                        isIcon={findValue?.icon}
                        image={
                            <Flex sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '12px',
                            }}>
                                <img
                                    src={getImage(findValue?.type, findValue?.icon, findValue?.imageUrl)} alt="logo"
                                    style={{
                                        height: '20px',
                                        width: '20px'
                                    }}
                                />
                            </Flex>

                        }
                        onClick={async () => {
                            if (findValue) {
                                switch (findValue.link) {
                                    case 'Screening':
                                        history.push("/Screening")
                                        break;
                                    case 'AlgorithmList':
                                        if (findValue.type == 'Dynamic') {
                                            history.push(`/AlgorithmList?name=${findValue?.cardTitle}${findValue.type ? '&&type=' + findValue.type : ''}&&link=${findValue?.link}${findValue.id ? '&&algo_Id=' + findValue.id : ''}`)
                                        } else if (findValue.id) {
                                            history.push(`/AlgorithmList/AlgorithmDetails?name=${findValue?.cardTitle}${findValue.type ? '&&type=' + findValue.type : ''}&&link=${findValue?.link}${findValue.id ? '&&id=' + findValue.id : ''}`)
                                        } else {
                                            history.push(`/AlgorithmList?name=${findValue?.cardTitle}${findValue.type ? '&&type=' + findValue.type : ''}&&link=${findValue?.link}${findValue.id ? '&&algo_Id=' + findValue.id : ''}`)
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                toggleWidget()
                            }
                        }}
                        text={appTranslations?.[data?.name] || data?.name}
                    />
                );
            })}
            {count > 5 && count > rowsPerPage && (
                <ChatResCard
                    key={'Module_Suggestions-static-add' + idx}
                    isLink={true}
                    noSpeaker
                    noBottomWidth={true}
                    text={'Load more'}
                    onClick={() => setRowsPerPage(rowsPerPage + 5)}
                />
            )}
        </div>
    );
};
export const ChatResourceModuleSection = ({
    item,
    appTranslations,
    idx
}) => {
    const count = item?.resource_material?.length;
    const [rowsPerPage, setRowsPerPage] = useState(3)
    return (
        <div id={'ChatModuleSection' + idx}>
            {item?.resource_material?.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage).map((data, i) => {

                return (
                    <ChatModuleCard
                        key={'TagModule-Resource_Material -' + idx + '-' + i}
                        botTitle={false}
                        isHeader={i == 0 ? true : false}
                        title={appTranslations.TITLE_RESOURCE_MATERIALS}
                        noTopRadius={false}
                        noBottomWidth={true}
                        isIcon
                        image={
                            <Flex sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '12px',
                            }}>
                                <img
                                    src={getImage(data.type_of_materials)} alt="logo"
                                    style={{
                                        height: '20px',
                                        width: '20px'
                                    }}
                                //  sx={{height: 48 }}
                                />
                            </Flex>
                        }
                        onClick={async () => {
                            if (data?.media?.[0]?.id) {
                                window.open(BASE_MEDIA_URL +
                                    data?.media?.[0]?.id +
                                    '/' +
                                    data?.media?.[0]?.file_name, "_blank")


                            } else {
                                return null;
                            }
                        }}
                        text={data?.title}
                    />
                );
            })}
            {count > 5 && count > rowsPerPage && (
                <ChatResCard
                    key={'Resource_Material-static-add-' + idx}
                    isLink={true}
                    noSpeaker
                    noBottomWidth={true}
                    text={'Load more'}
                    onClick={() => setRowsPerPage(rowsPerPage + 5)}
                />
            )}
        </div>
    );
};
export const ChatAdditionalMaterialSection = ({
    item,
    appTranslations,
    idx,
}) => {
    const dispatch = useDispatch()
    const count = item?.external_idefeat?.length;
    const [rowsPerPage, setRowsPerPage] = useState(3)
    return (
        <div id={'ChatAdditionalMaterialSection' + idx}>
            {item?.external_idefeat?.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)?.map((data, i) => (
                <ChatModuleCard
                    key={'TagModule-Questions-' + idx + '-' + i + '-' + data?.nid}
                    botTitle={false}
                    isHeader={i == 0 ? true : false}
                    title={appTranslations.CHAT_ADDITIONAL_MATERIAL}
                    noTopRadius={false}
                    isIcon={true}
                    image={
                        <Flex sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: '12px',
                        }}>
                            <img
                                src={'../file.svg'} alt="logo"
                                style={{
                                    height: '20px',
                                    width: '20px'
                                }}
                            />
                        </Flex>

                    }
                    noBottomWidth={true}
                    onClick={async () => {
                        await dispatch(
                            pushToChatFlow({
                                type: 'Answers',
                                data: {
                                    title: data.title?.replace(/<\/?[^>]+(>|$)/g, ""),
                                },
                                isPop: true,
                            }),
                        );
                        await dispatch(
                            pushToChatFlow({
                                type: 'NTEPAnswers',
                                data: {
                                    title: data.body
                                },
                                isPop: true,
                            }),
                        );
                    }}
                    noSpeaker
                    text={data?.title?.replace(/<\/?[^>]+(>|$)/g, "")}
                />
            ))}
            {count > 5 && count > rowsPerPage && (
                <ChatResCard
                    key={'QuestionsStaticAdd-' + idx}
                    isLink={true}
                    noBottomWidth={true}
                    text={'Load more'}
                    onClick={() => setRowsPerPage(rowsPerPage + 5)
                    }
                    noSpeaker
                />
            )}
        </div>
    );
};