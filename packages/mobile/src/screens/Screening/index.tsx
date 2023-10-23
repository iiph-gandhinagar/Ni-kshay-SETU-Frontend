import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { Button, Button1 } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes, themeProps } from '../../types';
export default function Screening(): JSX.Element {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <SafeAreaView style={[styles.Container, { backgroundColor: colors.background, marginHorizontal: 0, marginTop: 0 }]}>
            <Header headerTitle={appTranslations.HEADER_SCREENING_TOOL} />
            <View style={[styles.Container, { backgroundColor: colors.background, justifyContent: 'center' }]}>
                <Image
                    style={styles.image}
                    source={require('../../assets/screening.png')}
                />
                <Text style={[FontStyle.Nunito18Title, styles.text, { color: colors.black }]}>
                    {appTranslations.SUBTITLE_SCREENING}
                </Text>
                <Text style={[FontStyle.Nunito18Title, styles.text, { color: colors.black }]}>
                    {appTranslations.SUBTITLE_SCREENING_TWO}
                </Text>
                <Button
                    testID="Button"
                    style={{ alignSelf: 'center' }}
                    onPress={() => navigation.navigate('ScreeningStepper')}
                    buttonText={appTranslations.BTN_START} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginHorizontal: RFValue(22),
    },
    image: {
        width: RFValue(163),
        height: RFValue(163),
        alignSelf: 'center',
        marginBottom: RFValue(15),
    },
    text: {
        marginBottom: RFValue(20),
        textAlign: 'center',
    },

});
