import { useNavigation, useTheme } from '@react-navigation/native';
import {
    cleanAlgorithmFlow,
} from '@tb-frontend/shared/Store/action/algorithmAction';
import React, { useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Accordian } from '../../components/core/Algo/Accordian';
import { AlgoDivider, DescriptionCMS, LastNode } from '../../components/core/Algo/DescriptionComponents';
import { Header } from '../../components/core/Header';
import { themeProps } from '../../types';

export default function AlgorithmScreen(props): JSX.Element {
    const dispatch = useDispatch();
    const { colors } = useTheme() as unknown as themeProps;
    const navigation = useNavigation();
    const flatlistRef = useRef(null);
    const { algorithmDependentNodes } = useSelector(
        state => state?.algorithm,
    );
    const { algorithmFlow } = useSelector(state => state?.algorithm);
    useEffect(() => {
        return function cleanup() {
            console.log('cleanup AlgorithmScreen');
            dispatch(cleanAlgorithmFlow());
        };
    }, []);
    useEffect(() => {
        if (algorithmFlow.length > 3 && flatlistRef) {
            flatlistRef?.current?.scrollToIndex({
                animating: true,
                index: algorithmFlow.length - 1,
            });
        }
    }, [algorithmFlow.length, flatlistRef]);


    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
            <Header
                headerTitle={
                    algorithmDependentNodes?.title
                        ? algorithmDependentNodes?.title
                        : props?.route?.params?.title
                }
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: RFValue(15), marginTop: RFValue(20) }}
                // refreshControl={<RefreshControl refreshing={loader} />}
                data={algorithmFlow || []}
                ref={flatlistRef}
                onScrollToIndexFailed={info => {
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
                }}
                onContentSizeChange={(w, h) => {
                    if (algorithmFlow.length == 1 && flatlistRef) {
                        flatlistRef?.current?.scrollToIndex({
                            animating: true,
                            index: 0,
                        });
                    }
                }}
                keyExtractor={(item, index) => index + '- algo Details -' + item?.id}
                renderItem={({ item, index }) => {
                    if (item.has_options === 1 || algorithmFlow?.length == index + 1) {
                        if (item?.node_type === 'CMS Node(New Page)') {
                            console.log('CMS Node(New Page)', item);
                        } else if (item?.node_type === 'CMS Node') {
                            if (item?.is_expandable === 1) {
                                return (
                                    <Accordian key={'Details - ' + index} isDefaultOpen={algorithmFlow?.length == index + 1} title={item?.title} list={item?.children} />
                                );
                            } else {
                                if (
                                    item?.node_type === 'CMS Node' &&
                                    item?.description
                                ) {
                                    return (
                                        <DescriptionCMS
                                            key={'Details - ' + index}
                                            selectedalgo={item}
                                        />
                                    );
                                } else if (
                                    item?.node_type === 'CMS Node' &&
                                    item?.redirect_algo_type !== null &&
                                    item?.redirect_node_id !== 0
                                ) {
                                    if (item?.header && item?.sub_header) {
                                        console.log('CMS Node 1');
                                        // setLastModal(true);
                                        // setLastModalclose({
                                        //     isLastModal: false,
                                        //     screenName: 'AlgorithmDetails',
                                        //     name: item?.redirect_algo_type,
                                        //     type: item?.redirect_algo_type,
                                        //     id: item?.redirect_node_id,
                                        // });
                                    } else {
                                        return (
                                            <LastNode
                                                onPress={() => {
                                                    navigation.navigate('AlgorithmDetails', {
                                                        name: item?.redirect_algo_type,
                                                        type: item?.redirect_algo_type,
                                                        id: item?.redirect_node_id,
                                                    });

                                                }}
                                                key={'Details - ' + index}
                                                title={item?.title}
                                            />
                                        );
                                    }
                                } else {
                                    console.log('no action 1');
                                    if (item?.header && item?.sub_header) {
                                        console.log('no action 2');
                                        // setLastModal(true);
                                        // setLastModalclose({ isLastModal: false });
                                    }
                                    else {
                                        return (
                                            <LastNode
                                                key={'Details - ' + index}
                                                title={item?.title}
                                            />
                                        );
                                    }
                                }
                            }
                        } else if (item?.node_type === 'Linking Node Without Options') {
                            console.log('39 Linking Node Without Options');
                            // setLastModal(true);
                            // setLastModalclose({
                            //     isLastModal: false,
                            //     screenName: 'LinkingScreen',
                            //     data: item,
                            // });
                        } else if (item?.is_expandable === 1) {
                            return (
                                <Accordian key={'Details - ' + index} isDefaultOpen={algorithmFlow?.length == index + 1} title={item?.title} list={item?.children} />
                            );
                        } else {
                            return (
                                <LastNode
                                    key={'Details - ' + index}
                                    title={item?.title}
                                />
                            );
                        }
                    } else {
                        return (
                            <AlgoDivider key={'Details - ' + index} title={item.title} />
                        );
                    }
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    desTitle: {
        marginBottom: RFValue(15),
        borderTopWidth: 1,
        paddingTop: RFValue(15),
    },

});
