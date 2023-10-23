import React from 'react';
import { renderWithProviders } from '../utils/test-utils';
import { fireEvent } from '@testing-library/react-native';
import Screening from '../screens/Screening';


describe('Screening Screen', () => {
    it('should render without errors', () => {
        renderWithProviders(<Screening />);
    });

    it('text renders correctly', () => {
        const { getByText } = renderWithProviders(<Screening />);
        expect(getByText('Screening Tool')).toBeTruthy();
        expect(getByText('Screening tool is designed to assess if the presenting symptoms require a person to be tested for Tuberculosis (TB).')).toBeTruthy();
        expect(getByText('It will take you to some basic questions and will determine the result based on inputs.')).toBeTruthy();
        expect(getByText('Start')).toBeTruthy();
    });

    it('Start button is pressed and render correctly', () => {
        const { getByTestId } = renderWithProviders(<Screening />);
        const startButton = getByTestId('Button');
        fireEvent.press(startButton);
    });
});
