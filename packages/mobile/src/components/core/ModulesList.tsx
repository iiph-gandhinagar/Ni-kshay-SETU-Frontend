import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SectionGrid } from 'react-native-super-grid';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
import { getImage } from '../../utils/functions';
import { storeUserActivity } from '@tb-frontend/shared/Store/action/appActions';
interface ModulesListCardProps {
    title: String;
    ImgSrc?: ImageSourcePropType | undefined;
    onPress?: (e: any) => void;
}
export const ModulesListCard: React.FC<ModulesListCardProps> = ({
    title = '',
    ImgSrc = undefined,
    onPress = () => null,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={[styles.ICBG, { backgroundColor: colors.background }]}>
                <Image source={ImgSrc} style={styles.PhotoProfile} />
            </View>
            <Text style={[FontStyle.Nunito11, styles.text, { color: colors.Grey_3 }]}>{title}</Text>
        </Pressable>
    );
};
interface AllModulesListProps {
}
export const AllModulesList: React.FC<AllModulesListProps> = ({
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    const navigation = useNavigation();
    const { appTranslations }: appConfigTypes = useSelector(
        state => state?.app,
    );
    const dispatch = useDispatch();
    const { dynamicAlogs } = useSelector(state => state?.app);
    return (
        <SectionGrid
            showsVerticalScrollIndicator={false}
            itemDimension={RFValue(95)}
            stickySectionHeadersEnabled={false}
            sections={dynamicAlogs || []}
            keyExtractor={(item, index) => 'MODULE_LIST - ' + item?.cardTitle + ' - ' + index}
            renderItem={({ item, rowIndex }) => {
                return (
                    <ModulesListCard
                        key={item?.cardTitle + ' - ' + rowIndex}
                        title={appTranslations?.[item.cardTitle] || item.cardTitle}
                        onPress={() => {
                            switch (item.link) {
                                case 'Screening':
                                    navigation.navigate('Screening');
                                    break;
                                case 'survey':
                                    navigation.navigate('Survey');
                                    break;
                                case 'rating':
                                    navigation.navigate('FeedBackScreen');
                                    break;
                                case 'certificate':
                                    navigation.navigate('Certificates');
                                    break;
                                case 'ResourceMaterials':
                                    {
                                        dispatch(
                                            storeUserActivity('module_Resource_Materials_' + item.cardTitle),
                                        );
                                        navigation.navigate('Materials', item);
                                    }
                                    break;
                                case 'ReferralHealthFacility':
                                    navigation.navigate('HealthFaci');
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
                                    if (item.type == 'Dynamic') {
                                        navigation.navigate('AlgorithmList', {
                                            name: item.cardTitle,
                                            type: item.type,
                                            algo_Id: item.id,
                                        });
                                    }
                                    else if (item.id) {
                                        navigation.navigate('AlgorithmDetails', {
                                            name: item.cardTitle,
                                            type: item.type,
                                            algo_Id: item.id,
                                            id: item.id,
                                        });
                                    }
                                    else {
                                        navigation.navigate('AlgorithmList', {
                                            name: item.cardTitle,
                                            type: item.type,
                                        });
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }}
                        ImgSrc={getImage(item?.type, item?.icon, item?.imageUrl)}
                    />
                );
            }}
            renderSectionHeader={({ section }) => {
                return (
                    <Pressable style={[styles.HeaderText, { borderColor: colors.dividerColor }]} onPress={() => console.log('SectionHeader')}>
                        <Text style={[
                            FontStyle.Nunito15,
                            { color: colors.titleOrange }]}>
                            {appTranslations?.[section?.sectionTitle] || section?.sectionTitle}
                        </Text>
                    </Pressable>
                );
            }}
        />
    );
};
let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    PhotoProfile: {
        height: RFValue(25),
        width: RFValue(25),
    },
    text: {
        marginTop: RFValue(5),
        textAlign: 'center',
    },
    ICBG: {
        borderRadius: RFValue(50),
        alignItems: 'center',
        padding: RFValue(10),
    },
    HeaderText: {
        marginHorizontal: RFValue(10),
        paddingTop: RFValue(5),
        borderTopWidth: 1,
    },
});
