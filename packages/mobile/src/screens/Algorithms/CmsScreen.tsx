import { useTheme } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CmsData } from '../../components/core/Algo/cmsData';
import { Header } from '../../components/core/Header';
import { dBInstance } from '../../SqlStore/Database';
import { themeProps } from '../../types';

export default function CmsScreen(props): JSX.Element {
    const CmsObj = props?.route?.params;
    const { colors } = useTheme() as unknown as themeProps;
    var timeIntervalSubmoduleId;
    var x = 0;
    const moduleUsage = () => {
        timeIntervalSubmoduleId = setInterval(() => {
            x = x + 1;
        }, 1000);
    };
    useEffect(() => {
        if (CmsObj?.istime) {
            moduleUsage();
            return function cleanup() {
                clearInterval(timeIntervalSubmoduleId);
                dBInstance()?.transaction(txn => {
                    txn.executeSql(
                        'INSERT INTO app_time(module,activity_type,sub_module_id,time)values(?,?,?,?)',
                        [
                            CmsObj?.type === 'CGC' ? 'NTEP Intervention' : CmsObj?.type,
                            'submodule_usage',
                            CmsObj?.id,
                            x,
                        ],
                    );
                }).then(() => {
                    x = 0;
                });
            };
        }
    }, [CmsObj]);
    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
            <Header
                headerTitle={CmsObj?.title}
            />
            <ScrollView overScrollMode="never" contentContainerStyle={{ paddingVertical: RFValue(25), marginHorizontal: RFValue(20) }} showsVerticalScrollIndicator={false} >
                <CmsData
                    source={CmsObj?.description}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
});
