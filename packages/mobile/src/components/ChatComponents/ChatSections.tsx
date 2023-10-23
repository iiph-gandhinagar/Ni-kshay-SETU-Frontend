import { useNavigation } from '@react-navigation/native';
import {
    postQuestionHit,
    pushToChatFlow,
} from '@tb-frontend/shared/Store/action/chatActions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appConfigTypes } from '../../types';
import { ChatModuleCard, ChatResCard } from './ChatCards';
import { ModuleNavigation } from '@tb-frontend/shared/utils/moduleConfig';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { getImage, getMaterialsUrl } from '../../utils/functions';
import { RFValue } from 'react-native-responsive-fontsize';
interface ChatQuestionSectionProps {
    item: {
        questions?: any[];
        modules?: any[];
        resource_material?: any[];
        external_idefeat?: any[];
    };
    idx: number;
    next: string;
    session_token: string;
    disabled: boolean;
    setDisabled: (value: boolean) => null;
}
export const ChatQuestionSection: React.FC<ChatQuestionSectionProps> = ({
    idx,
    item,
    next,
    session_token,
    disabled = false,
    setDisabled = () => null,
}) => {
    const dispatch = useDispatch();
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const count = item?.questions?.length || 0;
    const [rowsPerPage, setRowsPerPage] = useState(5);
    return (
        <>
            {item?.questions
                ?.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
                ?.map((data, i) => (
                    <ChatResCard
                        key={'TagModule-Questions-' + idx + '-' + i + '-' + data?.id}
                        botTitle={i == 0 ? true : false}
                        isHeader={i == 0 ? true : false}
                        title={appTranslations.CHAT_RELATED_OUESTION}
                        noTopRadius={false}
                        noBottomWidth={true}
                        onPress={async () => {
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
                    noSpeaker
                    text={'Load more'}
                    onPress={() => setRowsPerPage(rowsPerPage + 5)}
                />
            )}
        </>
    );
};
interface ChatModuleSectionProps {
    item: {
        questions?: any[];
        modules?: any[];
        resource_material?: any[];
        external_idefeat?: any[];
    };
    idx: number;
}
export const ChatModuleSection: React.FC<ChatModuleSectionProps> = ({
    item,
    idx,
}) => {
    const dispatch = useDispatch();
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const count = item?.modules?.length || 0;
    const navigation = useNavigation();
    const [rowsPerPage, setRowsPerPage] = useState(3);
    return (
        <>
            {item?.modules
                ?.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
                ?.map((data, i) => {
                    const findValue = ModuleNavigation?.find(
                        e => e?.cardTitle == data?.name,
                    );
                    return (
                        <ChatModuleCard
                            key={'TagModule-Module_Suggestions-' + idx + '-' + i}
                            botTitle={false}
                            isHeader={i == 0 ? true : false}
                            title={appTranslations.CHAT_MODULE_SUGGESTIONS}
                            noTopRadius={false}
                            noBottomWidth={true}
                            isIcon={getImage(findValue?.type, findValue?.icon, findValue?.imageUrl)}
                            image={
                                <View style={styles.imageContainer}>
                                    <Image source={getImage(findValue?.type, findValue?.icon, findValue?.imageUrl)} style={styles.PhotoProfile} />
                                </View>
                            }
                            onPress={async () => {
                                if (findValue) {
                                    switch (findValue.link) {
                                        case 'Screening':
                                            navigation.navigate('Screening');
                                            break;
                                        case 'rating':
                                            navigation.navigate('FeedBackScreen');
                                            break;
                                        case 'certificate':
                                            navigation.navigate('Certificates');
                                            break;
                                        case 'ResourceMaterials':
                                            navigation.navigate('Materials', findValue);
                                            break;
                                        case 'CurrentAssessments':
                                            navigation.navigate('Assessment', {
                                                screen: 'CurrentAssessment',
                                            });
                                            break;
                                        case 'PastAssessments':
                                            navigation.navigate('Assessment', {
                                                screen: 'PastAssessment',
                                            });
                                            break;
                                        case 'AlgorithmList':
                                            if (findValue.type == 'Dynamic') {
                                                navigation.navigate('AlgorithmList', {
                                                    name: findValue.cardTitle,
                                                    type: findValue.type,
                                                    algo_Id: findValue.id,
                                                });
                                            }
                                            else if (findValue.id) {
                                                navigation.navigate('AlgorithmDetails', {
                                                    name: findValue.cardTitle,
                                                    type: findValue.type,
                                                    algo_Id: findValue.id,
                                                    id: findValue.id,
                                                });
                                            }
                                            else {
                                                navigation.navigate('AlgorithmList', {
                                                    name: findValue.cardTitle,
                                                    type: findValue.type,
                                                });
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }}
                            text={findValue ? appTranslations?.[data?.name] : data?.name}
                        />
                    );
                })}
            {count > 5 && count > rowsPerPage && (
                <ChatResCard
                    key={'Module_Suggestions-static-add' + idx}
                    isLink={true}
                    noBottomWidth={true}
                    noSpeaker
                    text={'Load more'}
                    onPress={() => setRowsPerPage(rowsPerPage + 5)}
                />
            )}
        </>
    );
};
export const ChatResourceModuleSection: React.FC<ChatModuleSectionProps> = ({
    item,
    idx,
}) => {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const count = item?.resource_material?.length || 0;
    const navigation = useNavigation();
    const [rowsPerPage, setRowsPerPage] = useState(3);
    return (
        <>
            {item?.resource_material
                ?.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
                ?.map((data, i) => {
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
                                <View style={styles.imageContainer}>
                                    <Image source={getImage(data?.type_of_materials, null, null)} style={styles.PhotoProfile} />
                                </View>
                            }
                            onPress={async () => {
                                switch (data?.type_of_materials) {
                                    case 'folder':
                                        navigation.push('Materials', data);
                                        break;
                                    case 'videos':
                                        navigation.navigate('VideoView', getMaterialsUrl(data.media));
                                        break;
                                    case 'pdfs':
                                        navigation.navigate('PDFView', {
                                            header: data.title,
                                            url: getMaterialsUrl(data.media),
                                        });
                                        break;
                                    case 'pdf_office_orders':
                                        navigation.navigate('PDFView', {
                                            header: data.title,
                                            url: getMaterialsUrl(data.media),
                                        });
                                        break;
                                    case 'ppt':
                                        Linking.openURL(getMaterialsUrl(data.media));
                                        break;
                                    case 'document':
                                        Linking.openURL(getMaterialsUrl(data.media));
                                        break;
                                    case 'images':
                                        Linking.openURL(getMaterialsUrl(data.media));
                                        break;
                                    default:
                                        console.log('', getMaterialsUrl(data.media));

                                        break;
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
                    noBottomWidth={true}
                    noSpeaker
                    text={'Load more'}
                    onPress={() => setRowsPerPage(rowsPerPage + 5)}
                />
            )}
        </>
    );
};
export const ChatAdditionalMaterialSection: React.FC<ChatModuleSectionProps> =
    ({ idx, item }) => {
        const dispatch = useDispatch();
        const appTranslations: appConfigTypes = useSelector(
            state => state?.app?.appTranslations,
        );
        const count = item?.external_idefeat?.length || 0;
        const [rowsPerPage, setRowsPerPage] = useState(3);
        return (
            <>
                {item?.external_idefeat
                    ?.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
                    ?.map((data, i) => (
                        <ChatModuleCard
                            key={'TagModule-AdditionalModule_Suggestions-' + idx + '-' + i}
                            botTitle={false}
                            isHeader={i == 0 ? true : false}
                            title={appTranslations.CHAT_ADDITIONAL_MATERIAL}
                            noTopRadius={false}
                            noBottomWidth={true}
                            noSpeaker
                            isIcon={true}
                            image={
                                <View style={styles.imageContainer}>
                                    <Image source={getImage(data?.type_of_materials, null, null)} style={styles.PhotoProfile} />
                                </View>
                            }
                            onPress={async () => {
                                await dispatch(
                                    pushToChatFlow({
                                        type: 'Answers',
                                        data: {
                                            title: data.title?.replace(/<\/?[^>]+(>|$)/g, ''),
                                        },
                                        isPop: true,
                                    }),
                                );
                                await dispatch(
                                    pushToChatFlow({
                                        type: 'NTEPAnswers',
                                        data: {
                                            title: data?.body,
                                        },
                                        isPop: true,
                                    }),
                                );
                            }}
                            text={data?.title?.replace(/<\/?[^>]+(>|$)/g, '')}
                        />
                    ))}
                {count > 5 && count > rowsPerPage && (
                    <ChatResCard
                        key={'QuestionsStaticAdd-' + idx}
                        isLink={true}
                        noBottomWidth={true}
                        noSpeaker
                        text={'Load more'}
                        onPress={() => setRowsPerPage(rowsPerPage + 5)}
                    />
                )}
            </>
        );
    };
const styles = StyleSheet.create({
    PhotoProfile: {
        height: RFValue(20),
        width: RFValue(20),
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: RFValue(12),
    },
});
