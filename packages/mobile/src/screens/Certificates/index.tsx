import { useNavigation, useTheme } from '@react-navigation/native';
import { getAllCertificates } from '@tb-frontend/shared/Store/action/leaderBoardAction';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { CertificateComponent } from '../../components/CertificateComponent';
import { Header } from '../../components/core/Header';
import { NoResultFound } from '../../components/core/NoResultFound';
import { themeProps } from '../../types';

export default function Certificates(props: any): JSX.Element {
    const { colors } = useTheme() as unknown as themeProps;
    const { allCertificates, loader } = useSelector(state => state?.leaderBoard);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCertificates());
    }, []);
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <Header headerTitle="Assessment Certificates" />
            <FlatList
                contentContainerStyle={{
                    padding: RFValue(16),
                }}
                ListEmptyComponent={loader ?
                    null
                    : allCertificates?.length == 0 ? <NoResultFound /> : null}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={allCertificates}
                keyExtractor={(item, idx) => 'Assessment List -' + idx}
                renderItem={({ item, index }) => {
                    return (
                        <CertificateComponent
                            key={'Assessment List -' + item?.assessment_id}
                            onPress={() => {
                                navigation.navigate('CertificateView', {
                                    title: item?.assessment_with_trashed?.assessment_title,
                                    id: item?.assessment_id,
                                });
                            }}
                            title={item?.assessment_with_trashed?.assessment_title} />
                    );
                }} />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
