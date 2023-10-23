import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { FontStyle } from '../config/FontStyle';
import { appConfigTypes, themeProps } from '../types';

interface LevelInfoCardProps {
    Level: string;
    TitleLvl: string;
    description: string;
    BronzeImg: string;
    GoldImg: string;
    SilverImg: string;
    TopColor: string;
    colored: String[];
}
export const LevelInfoCard: React.FC<LevelInfoCardProps> = ({
    Level = '',
    TitleLvl = '',
    description = '',
    BronzeImg = '',
    GoldImg = '',
    SilverImg = '',
    TopColor = '',
    colored = ['#80689D', '#80689D', '#1F1E54'],
}) => {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current?.play();
    }, [ref.current]);
    const { colors } = useTheme() as unknown as themeProps;
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,
      );

    return (
        <View
            style={styles.HeaderContainer}>
            <View
                style={[styles.Conatiner, { backgroundColor: TopColor }]}>
                <Text style={[FontStyle.Nunito15, { color: '#FFF' }]}>
                {appTranslations?.LEVEL} {Level}
                </Text>
                <Text style={[FontStyle.Nunito15, { color: '#FFF' }]}>
                    {TitleLvl}
                </Text>
            </View>
            <LinearGradient
                colors={colored}
                style={styles.GradientContainer}>
                <Text
                    style={[FontStyle.Nunito11, styles.DescriptionTxt, { color: '#FFF' }]}>
                    {description}
                </Text>
                <View
                    style={styles.MedalContainer}>
                    <View style={styles.ImageContainer}>
                        <Image
                            source={BronzeImg}
                            style={styles.MedalImg}
                        />
                        <Text style={[styles.MedalTxt, FontStyle.Nunito11, { color: '#FFF' }]}>

                        {appTranslations?.BRONZE}
                        </Text>
                    </View>
                    <View style={[styles.ImageContainer, { marginTop: RFValue(40) }]}>
                        <Image
                            source={GoldImg}
                            style={styles.MedalImg}
                        />
                        <Text style={[styles.MedalTxt, FontStyle.Nunito11, { color: '#FFF' }]}>

                        {appTranslations?.GOLD}
                        </Text>
                    </View>
                    <View style={styles.ImageContainer}>
                        <Image
                            source={SilverImg}
                            style={styles.MedalImg}
                        />
                        <Text style={[styles.MedalTxt, FontStyle.Nunito11, { color: '#FFF' }]}>
                        {appTranslations?.SILVER}
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};
const styles = StyleSheet.create({
    HeaderContainer: {
        borderRadius: RFValue(10),
        marginBottom: RFValue(15),
        marginHorizontal: RFValue(20),
    },
    Conatiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: RFValue(10),
        paddingVertical: RFValue(7),
        borderTopLeftRadius: RFValue(10),
        borderTopRightRadius: RFValue(10),
    },
    DescriptionTxt: {
        padding: RFValue(5),
    },
    MedalTxt: {
        padding: RFValue(5),
    },
    MedalImg: {
        height: RFValue(55),
        width: RFValue(55),
    },
    MedalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: RFValue(5),
        marginHorizontal: RFValue(20),

    },
    GradientContainer: {
        borderBottomLeftRadius: RFValue(10),
        borderBottomRightRadius: RFValue(10),
    },
    ImageContainer: {
        alignItems: 'center',
    },


});
