import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    SafeAreaView, StyleSheet,
    Text,
    View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { FontStyle } from '../../config/FontStyle';
import { appConfigTypes } from '../../types';
import { themeProps } from '../types';
export default function Survey(): JSX.Element {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
    );
    const navigation = useNavigation();
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <SafeAreaView style={[{ backgroundColor: colors.backgroundColor, flex: 1 }]}>
            <Header headerTitle={appTranslations.HEADER_SURVEY_FORM} />
            <View style={styles.Container}>

                <Image
                    style={styles.image}
                    source={require('../../assets/contactform.png')}
                />
                <Text style={[FontStyle.Nunito18Title, styles.text,
                { color: colors.black }]}>{appTranslations.SURVEY_FORM_DESCRIPTION_TOP}</Text>
                <Text style={[FontStyle.Nunito18Title, styles.text, {
                    color: colors.black,
                }]}>
                    {appTranslations.SURVEY_FORM_DESCRIPTION_BOTTOM}</Text>
                <Button
                    style={{ alignSelf: 'center' }}
                    onPress={() => navigation.navigate('SurveyFormList')}
                    buttonText={appTranslations.BTN_START} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginHorizontal: RFValue(22),
        justifyContent: 'center',
    },
    image: {
        width: RFValue(150),
        height: RFValue(150),
        alignSelf: 'center',
        marginBottom: RFValue(15),
    },
    text: {
        marginBottom: RFValue(25),
        textAlign: 'center',
    },

});
