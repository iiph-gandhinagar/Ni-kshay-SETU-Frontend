import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TooltipProps } from 'rn-tourguide';
import { FontStyle } from '../config/FontStyle';
import { appTheme } from '../config/theme';
import { themeProps } from '../types';

export const TooltipComponent: React.ComponentType<TooltipProps> = ({ isFirstStep,
    isLastStep,
    handleNext,
    handlePrev,
    handleStop,
    currentStep }) => {
    const colorScheme = Appearance.getColorScheme();
    const colors = colorScheme === 'dark' ?
        appTheme.darkcolors?.colors : appTheme.lightcolors.colors;
    console.log('currentStep');

    return (
        <View style={{ backgroundColor: colors.black, flex: 1, padding: RFValue(20), borderRadius: RFValue(6) }}>
            <Text
                style={[
                    FontStyle.Nunito16,
                    { color: colors.Blue_2 },
                ]}>{currentStep?.text}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
});
