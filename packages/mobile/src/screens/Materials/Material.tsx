import { useNavigation, useTheme } from '@react-navigation/native';
import {
    clearMaterials, getMaterials,
} from '@tb-frontend/shared/Store/action/materialsAction';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Linking,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
// import Orientation from 'react-native-orientation-locker';
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/core/Header';
import { MaterialsCards } from '../../components/MaterialsCards';
import { appConfigTypes, themeProps } from '../../types';
import { getImage, getMaterialsUrl } from '../../utils/functions';
import { storeUserActivity } from '@tb-frontend/shared/Store/action/appActions';
export default function Materials(props): JSX.Element {
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    const [search, setSearch] = useState('');
    const [filterData, setfilterData] = useState([]);
    const [filterName, setFilterName] = useState('name');
    const [masterData, setmasterData] = useState([]);
    const materialsObj = props?.route?.params;
    const dispatch = useDispatch();
    const MaterialsList = useSelector(state => state?.materials?.materialsList);
    const loader = useSelector(state => state?.materials?.loader);
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const prev = usePrevious(filterName);
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    useEffect(() => {
        // Orientation.lockToPortrait();
        if (prev && prev !== filterName && materialsObj.id) {
            var obj = {
                type: materialsObj.id,
                filter: filterName,
            };
            // console.log('MaterialsList useEffect', obj);
            dispatch(getMaterials(obj));
        }
    }, [filterName]);
    useEffect(() => {
        navigation.addListener('focus', () => {
            // Orientation.lockToPortrait();
            if (materialsObj.id) {
                var obj = {
                    type: materialsObj.id,
                    filter: filterName,
                }; dispatch(getMaterials(obj));
            }
        });
    });
    useEffect(() => {
        navigation.addListener('blur', () => {
            dispatch(clearMaterials());
        });
    });
    useEffect(() => {
        if (MaterialsList) {
            // console.log('setfilterData', MaterialsList);
            setfilterData(MaterialsList);
            setmasterData(MaterialsList);
        }
    }, [MaterialsList]);
    const searchFilter = text => {
        if (text) {
            const newData = masterData.filter(item => {
                const itemData = item?.title
                    ? item?.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setfilterData(newData);
            setSearch(text);
        } else {
            setfilterData(masterData);
            setSearch(text);
        }
    };

    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: colors.white }]}>
            <Header headerTitle={materialsObj?.cardTitle || materialsObj?.title} />
            <FlatList
                data={filterData}
                style={{ padding: RFValue(5) }}
                keyExtractor={item => item.type_of_materials + item?.id}
                renderItem={({ item }) => {
                    return (
                        <MaterialsCards
                            title={item.title}
                            onPress={() => {
                                switch (item.type_of_materials) {
                                    case 'folder':
                                        navigation.push('Materials', item);
                                        break;
                                    case 'videos':
                                        {
                                            dispatch(storeUserActivity("Open_Resource_Materials"))
                                            navigation.navigate('VideoView', getMaterialsUrl(item.media));
                                        }
                                        break;
                                    case 'pdfs':
                                        {
                                            dispatch(storeUserActivity("Open_Resource_Materials"))
                                            navigation.navigate('PDFView', {
                                                header: item.title,
                                                url: getMaterialsUrl(item.media),
                                            });
                                        }
                                        break;
                                    case 'pdf_office_orders':
                                        {
                                            dispatch(storeUserActivity("Open_Resource_Materials"))
                                            navigation.navigate('PDFView', {
                                                header: item.title,
                                                url: getMaterialsUrl(item.media),
                                            });
                                        }
                                        break;
                                    case 'ppt':
                                        {
                                            dispatch(storeUserActivity("Open_Resource_Materials"))
                                            Linking.openURL(getMaterialsUrl(item.media));
                                        }
                                        break;
                                    case 'document':
                                        {
                                            dispatch(storeUserActivity("Open_Resource_Materials"))
                                            Linking.openURL(getMaterialsUrl(item.media));
                                        }
                                        break;
                                    case 'images':
                                        {
                                            dispatch(storeUserActivity("Open_Resource_Materials"))
                                            Linking.openURL(getMaterialsUrl(item.media));
                                        }
                                        break;
                                    default:
                                        console.log('', getMaterialsUrl(item.media));

                                        break;
                                }

                            }}
                            source={getImage(item.type_of_materials, null, null)}
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

});
