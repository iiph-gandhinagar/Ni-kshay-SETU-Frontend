import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';
import { DirectionButton } from './core/Button';


interface Props {
    Hospital: string;
    State: string;
    City: string;
    Area: string;
    data: any;
    facilityName: any
}

export const HealthFaciListContainer: React.FC<Props> = ({
    Hospital = '',
    State = '',
    City = '',
    Area = '',
    data = {},
    facilityName = {},
}) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${data?.latitude},${data?.longitude}`;
    // const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}@${latLng}`,
        android: `${scheme}${latLng}`,
    });
    const healthFacilitiesList = item => {
        const keys = Object.keys(item).filter(
            v => item[v] === 1 && facilityName?.[v],
        );
        return keys;
    };
    const { colors } = useTheme() as unknown as themeProps;
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
      );
    return (
        <View style={[styles.Conatiner, { backgroundColor: colors.white, borderColor: colors.Blue_2 }]} >
            <Text style={[FontStyle.RalewayTitle, { color: colors.Blue_Theme }]}>{Hospital}</Text>

            <View style={styles.RowItem}>
                <Text style={[FontStyle.RalewayText12, { color: colors.Blue_2 }]}>{State}</Text>
                <Text style={[styles.Divider, { color: colors.HOVER_ORANGE }]}>|</Text>
                <Text style={[FontStyle.RalewayText12, { color: colors.Blue_2 }]}>{City}</Text>
                <Text style={[styles.Divider, { color: colors.HOVER_ORANGE }]}>|</Text>
                <Text style={[FontStyle.RalewayText12, { color: colors.Blue_2 }]}>{Area}</Text>
            </View>
            <Text style={[FontStyle.RalewayText12, { color: colors.ORANGE, marginVertical: RFValue(5) }]}>{appTranslations?.AVAIL_FACILITIES} </Text>

            <View style={styles.RowItem}>
                {healthFacilitiesList(data).map((Facilities, i) => {
                    return (
                        <React.Fragment key={data?.id + Facilities}>
                            <Text style={[FontStyle.RalewayTitle, styles.NameF, { color: colors.Blue_2 }]}>{Facilities}</Text>
                            {healthFacilitiesList(data).length - 1 !== i && (
                                <Text style={[styles.Divider, { color: colors.HOVER_ORANGE }]}>|</Text>
                            )}
                        </React.Fragment>

                    );
                })}
            </View>
            <DirectionButton style={{ alignSelf: 'flex-end' }} onPress={() => Linking.openURL(url)} />
        </View>

    );
};
let styles = StyleSheet.create({
    Conatiner: {
        borderWidth: 1,
        marginBottom: RFValue(20),
        borderRadius: RFValue(10),
        padding: RFValue(10),
        // marginHorizontal:RFValue(10),
        elevation: RFValue(7),
    }, NameF: {
        fontSize: RFValue(12),
        marginHorizontal: RFValue(5),
    }, Name: {
        fontSize: RFValue(12),
    }, RowItem: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: RFValue(10),
    },
    Divider: {
        fontSize: RFValue(30),
        marginHorizontal: RFValue(3),
    },
});
