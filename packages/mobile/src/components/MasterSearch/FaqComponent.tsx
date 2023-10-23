import { useNavigation, useTheme } from '@react-navigation/native';
import {
    pushToChatFlow,
} from '@tb-frontend/shared/Store/action/chatActions';
import { getFaqMasterSearch } from '@tb-frontend/shared/Store/action/masterSearchAction';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet, View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { themeProps } from '../../types';
import { getImage } from '../../utils/functions';
import { MasterSearchSkeleton } from '../core/Loaders/Skeletons';
import { NoResultFound } from '../core/NoResultFound';
import { MasterListCard } from './ListCard';
export const FaqComponent = ({ search }) => {
    const { faqData, faqLoader } = useSelector(state => state?.masterSearch);
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    const dispatch = useDispatch();
    const [isFocus, setFocus] = useState(false);
    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            setFocus(true);
        });
        return focus;
    });
    useEffect(() => {
        const blur = navigation.addListener('blur', () => {
            setFocus(false);
        });
        return blur;
    });
    useEffect(() => {
        if (isFocus && search !== '') { dispatch(getFaqMasterSearch(search)); }
    }, [search, isFocus]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            {faqLoader ? <MasterSearchSkeleton /> : <FlatList
                contentContainerStyle={{
                    paddingBottom: RFValue(20),
                    marginHorizontal: RFValue(10),
                }}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={faqLoader ?
                    <MasterSearchSkeleton />
                    : search !== '' ?
                        <NoResultFound /> : null}
                showsVerticalScrollIndicator={false}
                data={faqData || []}
                keyExtractor={(item, idx) => 'chat List -' + idx}
                renderItem={({ item, index }) => {
                    return (
                        <MasterListCard
                            onPress={() => {
                                dispatch(
                                    pushToChatFlow({
                                        type: 'Answers',
                                        data: {
                                            title: item.question,
                                        },
                                        isPop: true,
                                    }),
                                );
                                dispatch(
                                    pushToChatFlow({
                                        type: 'QuestionAnswers',
                                        data: {
                                            title: item.answer,
                                            question_id: item?.id,
                                            onClick: null,
                                        },
                                        isPop: true,
                                    }),
                                );
                                navigation.navigate('Chat');
                            }}
                            source={getImage(item?.type, item?.icon, item?.imageUrl)}
                            title={item.question} />

                    );
                }}
                ItemSeparatorComponent={props => {
                    return (
                        <View style={[styles.Divider, { borderColor: colors.Grey_2, marginHorizontal: 0 }]} />
                    );
                }}
            />}

        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    Divider: {
        borderTopWidth: 1,
        marginHorizontal: RFValue(24),
    },
});
