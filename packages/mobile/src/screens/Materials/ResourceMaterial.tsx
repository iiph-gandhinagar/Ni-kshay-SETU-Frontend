import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';
import { useDispatch, useSelector } from 'react-redux';
import { AlgoLIstCard } from '../../components/core/AlgoLIstCard';
import { Header } from '../../components/core/Header';
import { appConfigTypes, themeProps } from '../../types';
import { getImage } from '../../utils/functions';
import { storeUserActivity } from '@tb-frontend/shared/Store/action/appActions';
export default function ResourceMaterial(): JSX.Element {
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    const { dynamicAlogs } = useSelector(state => state?.app);
    const dispatch = useDispatch();
    const appTranslations: appConfigTypes = useSelector(state => state?.app?.appTranslations,);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header headerTitle={appTranslations.F_RESO_MATERIAL} />
            <FlatGrid
                adjustGridToStyles={true}
                itemDimension={RFValue(140)}
                spacing={RFValue(10)}
                data={dynamicAlogs.find((item) => item.sectionKey == 'RESOURCE_MATERIALS',)?.data || []}
                keyExtractor={(item, index) => item?.type + ' - screen - ' + index}
                renderItem={({ item, index }) => {
                    return (
                        <AlgoLIstCard
                            onPress={() => {
                                dispatch(
                                    storeUserActivity('module_Resource_Materials_' + item.cardTitle),
                                );
                                navigation.navigate('Materials', item);
                            }}
                            title={item.cardTitle}
                            key={item?.type + ' - screen - ' + index}
                            ImgUrl={getImage(item?.type, item?.icon, null)}
                        />
                    );

                }}
            />
        </SafeAreaView>
    );
}
