import React from 'react';
import { renderWithProviders } from '../utils/test-utils';
import Assessment from '../screens/Assessment/Assessment';
import { fireEvent } from '@testing-library/react-native';



describe('Assessment Screen Test', () => {
    it('should render without errors', () => {
        renderWithProviders(<Assessment />);
    });

    // it('should have tabs for Performance, Current Assessment, Past Assessment, and Future Assessment', () => {
    //     const { getByTestId } = renderWithProviders(<Assessment />);
    //     const performanceTab = getByTestId('Navigator_Conatiner');
    //     console.log(performanceTab, 'getByTestId');
    // });
});
