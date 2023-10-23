import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { appConfigTypes, themeProps } from '../types';
import { FontStyle } from '../config/FontStyle';
import { AllModulesList } from './core/ModulesList';
import { useSelector } from 'react-redux';
interface FooterModulestProps {
}
export const FooterModules: React.FC<FooterModulestProps> = ({
}) => {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,);
    const { colors } = useTheme() as unknown as themeProps;
    return (
        <React.Fragment>
            <Text style={[FontStyle.Nunito18Title,
            {
                color: colors.Blue_2,
                textAlign: 'center',
                marginBottom: RFValue(18),
            }]}>
                {appTranslations?.OTHER_MODULES}
            </Text>
            <AllModulesList />
        </React.Fragment>
    );
};

