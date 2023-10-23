import { useNavigation, useTheme } from '@react-navigation/native';
import { AlgorithmFlow } from '@tb-frontend/shared/Store/action/algorithmAction';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
import { DescriptionCMSModal } from './DescriptionComponents';
export const pushToArrayAlgoFlow = (array: [], id: number, PId: number, obj: object) => {
    const index = array.findIndex(e => e?.id === id || e.parent_id === PId);
    if (index === -1) {
        array.push(obj);
    } else {
        array?.splice(index);
        if (array[index]) {
            array[index] = obj;
        } else {
            array.push(obj);
        }
    }
    return array;
};
interface SingleOptionProps {
    title: string;
    isSelected: boolean;
    children: any;
    isOnPress?: boolean;
    onPress?: () => void;
}
export const SingleOption: React.FC<SingleOptionProps> =
    ({ title = '', isSelected = false, children, isOnPress = false, onPress = () => null }) => {
        const { colors } = useTheme() as unknown as themeProps;
        const [selectedalgo, setSelectedAlgo] = useState({});
        const [isVisible, setVisible] = useState(false);
        const navigation = useNavigation();
        const { algorithmFlow } = useSelector(state => state?.algorithm);
        const dispatch = useDispatch();
        const clickOption = (selfobj, dependent) => {
            const selfobjAdd = pushToArrayAlgoFlow(
                algorithmFlow,
                selfobj.id,
                selfobj?.parent_id,
                selfobj,
            );
            const NewArray = pushToArrayAlgoFlow(
                selfobjAdd,
                dependent[0]?.id,
                dependent[0]?.parent_id,
                dependent[0],
            );
            // console.log('NewArray', NewArray);

            dispatch(AlgorithmFlow([...NewArray]));
        };
        return (
            <React.Fragment>
                <Pressable
                    onPress={() => {
                        if (isOnPress) {
                            onPress();
                        } else {
                            if (children?.node_type === 'CMS Node(New Page)') {
                                navigation.navigate('CmsScreen', {
                                    title: children?.title,
                                    description: children?.description,
                                });
                            } else if (
                                children?.node_type === 'CMS Node' &&
                                children?.redirect_algo_type !== null
                            ) {
                                console.log(' children redirect_node_id 1');
                                if (children?.redirect_node_id !== 0) {
                                    console.log(' children redirect_node_id 2');
                                    // setLastModal(true);
                                    // setLastModalclose({
                                    //   isLastModal: false,
                                    //   screenName: 'AlgorithmDetails',
                                    //   name: children?.redirect_algo_type,
                                    //   type: children?.redirect_algo_type,
                                    //   id: children?.redirect_node_id,
                                    // });
                                    navigation.navigate('AlgorithmList', {
                                        name: children?.redirect_algo_type,
                                        type: children?.redirect_algo_type,
                                        algo_Id: children?.redirect_node_id,
                                    });
                                } else {
                                    console.log(' children redirect_node_id 3');
                                    // setLastModal(true);
                                    // setLastModalclose({
                                    //   isLastModal: false,
                                    //   screenName: 'AlgorithmList',
                                    //   name: children?.redirect_algo_type,
                                    //   type: children?.redirect_algo_type,
                                    //   net: true,
                                    // });
                                    navigation.navigate('AlgorithmList', {
                                        name: children?.redirect_algo_type,
                                        type: children?.redirect_algo_type,
                                    });
                                }
                            } else if (
                                children.node_type === 'CMS Node' &&
                                children.description
                            ) {
                                setSelectedAlgo(children);
                                setVisible(true);
                                // navigation.navigate('CmsScreen', {
                                //     title: children?.title,
                                //     description: children?.description,
                                // });
                            } else if (
                                children.is_expandable === 1 ||
                                children.has_options === 1 ||
                                children?.children?.length > 0
                            ) {
                                clickOption(children, children.children);
                            }
                        }
                    }}
                    style={[styles.optionsContainer]}>
                    <BouncyCheckbox
                        isChecked={isSelected}
                        fillColor={isSelected ? colors.HOVER_ORANGE : colors.dropDownSelectBack}
                        textStyle={[{ flex: 0 }]}
                        text={''}
                        disableBuiltInState
                        onPress={() => {
                            console.log('children', isOnPress, children);

                            if (isOnPress) {
                                onPress();
                            } else {
                                if (children?.node_type === 'CMS Node(New Page)') {
                                    navigation.navigate('CmsScreen', {
                                        title: children?.title,
                                        description: children?.description,
                                    });
                                } else if (
                                    children?.node_type === 'CMS Node' &&
                                    children?.redirect_algo_type !== null
                                ) {
                                    console.log(' children redirect_node_id 1');
                                    if (children?.redirect_node_id !== 0) {
                                        console.log(' children redirect_node_id 2');
                                        // setLastModal(true);
                                        // setLastModalclose({
                                        //   isLastModal: false,
                                        //   screenName: 'AlgorithmDetails',
                                        //   name: children?.redirect_algo_type,
                                        //   type: children?.redirect_algo_type,
                                        //   id: children?.redirect_node_id,
                                        // });
                                        navigation.navigate('AlgorithmList', {
                                            name: children?.redirect_algo_type,
                                            type: children?.redirect_algo_type,
                                            algo_Id: children?.redirect_node_id,
                                        });
                                    } else {
                                        console.log(' children redirect_node_id 3');
                                        // setLastModal(true);
                                        // setLastModalclose({
                                        //   isLastModal: false,
                                        //   screenName: 'AlgorithmList',
                                        //   name: children?.redirect_algo_type,
                                        //   type: children?.redirect_algo_type,
                                        //   net: true,
                                        // });
                                        navigation.navigate('AlgorithmList', {
                                            name: children?.redirect_algo_type,
                                            type: children?.redirect_algo_type,
                                        });
                                    }
                                } else if (
                                    children.node_type === 'CMS Node' &&
                                    children.description
                                ) {
                                    setSelectedAlgo(children);
                                    setVisible(true);
                                    // navigation.navigate('CmsScreen', {
                                    //     title: children?.title,
                                    //     description: children?.description,
                                    // });
                                } else if (
                                    children.is_expandable === 1 ||
                                    children.has_options === 1 ||
                                    children?.children?.length > 0
                                ) {
                                    clickOption(children, children.children);
                                } else {
                                    console.log('children.is_expandable', children.is_expandable);
                                    console.log('children.has_options', children.has_options);
                                    console.log('children.children?.children?.length', children.children?.children?.length);
                                    console.log('children.node_type', children.node_type);
                                    console.log('children.redirect_algo_type', children.redirect_algo_type);
                                }
                            }
                        }}
                        style={styles.optionsStyle}
                    />
                    <Text style={[FontStyle.Nunito16, { color: colors.black, textDecorationLine: 'none', flex: 1 }]}>
                        {title}
                    </Text>
                </Pressable>
                <DescriptionCMSModal
                    isVisible={isVisible}
                    selectedalgo={selectedalgo}
                    setVisible={(x) => {
                        setVisible(x);
                        setSelectedAlgo({});
                    }}
                />
            </React.Fragment>
        );
    };
interface AccordianProps {
    title: string;
    list: any[];
    isDefaultOpen: boolean;
}
export const Accordian: React.FC<AccordianProps> = ({
    list = [],
    title = '',
    isDefaultOpen = false,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    const [open, setOpen] = useState(false);
    const { algorithmFlow } = useSelector(state => state?.algorithm);
    useEffect(() => {
        if (isDefaultOpen) {
            setOpen(isDefaultOpen);
        } else { setOpen(false); }
    }, [algorithmFlow, isDefaultOpen]);


    return (
        <View style={[styles.accordianContainer, { backgroundColor: colors.cardBorder }]}>
            <Pressable
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={() => setOpen(old => !old)}
            >
                <Text style={[FontStyle.Nunito16, { color: colors.black, flex: 1 }]}>
                    {title}
                </Text>
                {open ?
                    <Icon
                        name="up"
                        size={RFValue(11)}
                        color={colors.Blue_2}
                        style={{ padding: RFValue(11) }}
                    /> :
                    <Icon
                        name="down"
                        size={RFValue(11)}
                        color={colors.Blue_2}
                        style={{ padding: RFValue(11) }}
                    />
                }
            </Pressable>
            {open ?
                <View style={[styles.accordianList]}>
                    <Text style={[FontStyle.Nunito12, styles.resultTitle, { color: colors.black, marginBottom: RFValue(10) }]}>
                        Select any one result
                    </Text>
                    {list?.map((item, i) => {
                        return (
                            <SingleOption
                                isSelected={algorithmFlow?.findIndex(e => e?.title == item?.title && e.id === item?.id) !== -1}
                                key={title + i}
                                title={item?.title}
                                children={item}
                            />

                        );
                    })}
                </View> : null}
        </View>
    );
};
let styles = StyleSheet.create({
    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: RFValue(10),
        marginHorizontal: RFValue(12),
    },
    accordianContainer: {
        borderRadius: RFValue(5),
        padding: RFValue(10),
    },
    accordianList: {
    },
    resultTitle: {
        padding: RFValue(5),
        borderBottomWidth: 1,
    },
    optionsStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
