import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
import { Button1 } from '../Button';
import Lottie from 'lottie-react-native';



interface Props { }
export const UpdateVersionModal = () => {
    const navigation = useNavigation();

    const [isModalVisible, setModal] = useState(false);
    const [data, setData] = useState({});
    useEffect(() => {
        setModal(true);
        return function Cleanup() {
            // setData({});
            setModal(false);
        };
    }, []);
    const { colors } = useTheme() as unknown as themeProps;
    const ingredients = [
        'Once You start the assessment, the Timer will be started on server',
        'Once you save the answer,you can’t change it.',
        'You can skip the quetions if you want.',
        'Your result will be generated after timer stopes on the server OR on submit button click at the last quetion by you.',
    ];
    return (
        <Modal coverScreen={false} isVisible={isModalVisible}>
            <View style={[styles.item, { backgroundColor: colors.cardBackground }]}>
                <Text style={[FontStyle.RalewayTitle, styles.headerText, { color: colors.Blue_Theme }]}>Rules of Assessments</Text>

                {ingredients.map((ingredient, index) => (
                    <Text style={[FontStyle.Nunito12, { color: colors.black }]} key={index}>
                        {index + 1}: {ingredient}
                    </Text>
                ))}
                <View style={styles.BottomContainer}>
                    <Button1 onPress={() => navigation.navigate('AssessmentQuestions')} buttonText={'Ok'} style={{ paddingHorizontal: 60 }} />
                    <Pressable onPress={''}>
                        <View style={[styles.BtnContainer, { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.Grey_1 }]}>
                            <Text style={[FontStyle.RalewayText12, { color: colors.Grey_3, marginBottom: RFValue(3) }]}>Cancel</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};
interface Props {
    isModalVisible: boolean;
    closeModal: () => void;
    onPress: any;
}
export const RulesOfAssessmentsModal: React.FC<Props> = ({
    isModalVisible = false,
    closeModal = () => null,
    onPress = () => null,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    const ingredients = [
        'Once you start the assessment, the timer on the server will start.',
        "You can't change your answer once you've saved it.",
        'If you prefer, you may skip the questions.',
        "Your result will be generated when the server's timer stops OR when you click the submit button on the last question asked.",
    ];
    return (
        <Modal coverScreen={false} isVisible={isModalVisible}>
            <View style={[styles.item, { backgroundColor: colors.cardBackground }]}>
                <View style={{ alignSelf: 'center' }}>
                    <Lottie
                        autoPlay
                        source={require('../../../assets/Animations/assessmentAnimation.json')}
                        style={{
                            // overflow:'hidden',
                            height: RFValue(120),
                            // alignSelf:'center',
                        }}

                    //loop={false}
                    />
                </View>
                <Text style={[FontStyle.RalewayTitle, styles.headerText, { color: colors.Blue_Theme }]}>Rules of Assessments</Text>

                {ingredients.map((ingredient, index) => (
                    <Text style={[FontStyle.Nunito12, { color: colors.black }]} key={index}>
                        {index + 1}: {ingredient}
                    </Text>
                ))}
                <View style={styles.BottomContainer}>
                    <Button1 onPress={onPress} buttonText={'Ok'} style={{ paddingHorizontal: 60 }} />
                    <Pressable onPress={closeModal}>
                        <View style={[styles.BtnContainer, { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.Grey_1 }]}>
                            <Text style={[FontStyle.RalewayText12, { color: colors.Grey_3, marginBottom: RFValue(3) }]}>Cancel</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    item: {
        borderRadius: RFValue(6),
        padding: RFValue(15),
        justifyContent: 'center',
        // alignItems: 'center',
    },
    BtnContainer: {
        alignSelf: 'flex-end',
        padding: RFValue(5),
        paddingHorizontal: RFValue(20),
        borderRadius: RFValue(5),
        alignItems: 'center',
        marginStart: RFValue(20),
    },
    BottomContainer: {
        flexDirection: 'row', alignSelf: 'flex-end', marginTop: RFValue(20),
    },
    headerText: {
        alignSelf: 'center', marginVertical: RFValue(20),
    },
});
