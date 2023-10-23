import Slider from '@react-native-community/slider';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontStyle } from '../config/FontStyle';
import { themeProps } from '../types';


interface Props {
    value: string | number;
    Header: string;
    num: string | number;
    style: any;
    onChangeValue?: (value: any) => void;
    minimumValue: number;
    maximumValue: number;
    onValueChange?: (value: any) => void;
}

export const ScreeningSlider: React.FC<Props> = ({
    value = 0,
    num = 0,
    Header = '',
    style = {},
    onChangeValue = () => null,
    onValueChange = () => null,
    minimumValue,
    maximumValue,

}) => {
    // const [value, setValue] = useState(0);
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <View style={[styles.container, style]}>
            <View style={[{ flex: 1 }]}>
                <Text style={[FontStyle.Nunito16, style.HText, { color: colors.Blue_2 }]}>
                    {Header}
                </Text>
                <Slider
                    style={styles.slider}
                    minimumValue={minimumValue}
                    maximumValue={maximumValue}
                    value={value}
                    step={1}
                    onValueChange={onValueChange}
                    onSlidingComplete={onChangeValue}
                    minimumTrackTintColor={colors.Blue_2}
                    maximumTrackTintColor={colors.lightBlue3}
                    thumbTintColor={colors.Blue_2}
                />
            </View>
            <View style={[styles.txtConatiner, {
                backgroundColor: colors.white,
                borderColor: colors.Grey_1,
            }]}>
                <TextInput
                    onChangeText={x => {
                        if (parseInt(x)) {
                            onChangeValue(parseInt(x));
                        }
                        else {
                            onChangeValue('');
                        }
                    }}
                    keyboardType="number-pad"
                    value={typeof (num) === 'number' ? num.toString() : num}
                    style={[FontStyle.Nunito12, { color: colors.Blue_2 }]} />

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtConatiner: {
        height: RFValue(40),
        width: RFValue(40),
        borderRadius: RFValue(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    slider: {
        marginEnd: RFValue(10),
    },
    HText: {
        marginBottom: RFValue(5),
    },
});
