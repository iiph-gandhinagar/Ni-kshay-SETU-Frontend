import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../../../config/FontStyle';
import { themeProps } from '../../../types';
interface taskCardProps {
    taskPending: String;
    taskCompleted: String;
}
export const TaskCardComponent: React.FC<taskCardProps> = ({
    taskPending = '00',
    taskCompleted = '00',
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={[styles.container, { backgroundColor: colors.green }]}>
            <View
                style={[styles.taskView]}>
                <Image
                    source={require('../../../assets/CompletedTask.png')}
                    style={styles.image}
                />
                <View
                    style={styles.textContainer}>
                    <Text style={[FontStyle.Nunito18Title, { color: colors.cyanBlue }]}>{taskCompleted}</Text>
                    <Text style={[FontStyle.Nunito11, { color: colors.white }]}>
                        Total Completed
                    </Text>
                </View>
            </View>
            <View
                style={[styles.taskView]}>
                <Image
                    source={require('../../../assets/pandingTask.png')}
                    style={styles.image}
                />
                <View
                    style={styles.textContainer}>
                    <Text style={[FontStyle.Nunito18Title, { color: colors.cream }]}>{taskPending}</Text>
                    <Text style={[FontStyle.Nunito11, { color: colors.white }]}>
                        Total Pending
                    </Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        margin: RFValue(10),
        borderRadius: RFValue(5),
        flexDirection: 'row',
        padding: RFValue(10),
        justifyContent: 'space-between',
    },
    taskView: {
        flexDirection: 'row',
        margin: RFValue(5),
        flex: 1,
    },
    image: {
        height: RFValue(45),
        width: RFValue(45),
    },
    textContainer: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: RFValue(15),
    },
});
