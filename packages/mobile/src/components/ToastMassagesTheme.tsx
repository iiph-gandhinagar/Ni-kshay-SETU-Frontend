import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { BaseToast } from 'react-native-toast-message';
import { appTheme } from '../config/theme';

export const toastConfig = {
    error: props => (
        <BaseToast
          {...props}
          style={{borderLeftColor: appTheme.colors.error}}
          contentContainerStyle={{paddingHorizontal: RFValue(15)}}
          text1Style={{
            fontSize: RFValue(15),
            fontWeight: '400',
          }}
        />
      ),
      success: props => (
        <BaseToast
          {...props}
          style={{borderLeftColor: appTheme.colors.primary}}
          contentContainerStyle={{paddingHorizontal:RFValue(15)}}
          text1Style={{
            fontSize: RFValue(15),
            fontWeight: '400',
          }}
        />
      ),
    };
