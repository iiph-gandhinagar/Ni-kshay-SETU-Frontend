import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../utils/test-utils';
import ForgotPassword from '../screens/Guest/ForgotPassword';


test('renders ForgotPassword component without errors', () => {
    renderWithProviders(<ForgotPassword />);
});

test('allows typing into phone field', () => {
    const { getByPlaceholderText } = renderWithProviders(<ForgotPassword />);
    const phoneInput = getByPlaceholderText('Mobile Number');
    fireEvent.changeText(phoneInput, '1234567890');
    expect(phoneInput.props.value).toBe('1234567890');
});

test('Get OTP button triggers forgot password function', () => {
    const { getByText } = renderWithProviders(<ForgotPassword />);
    const getOtpButton = getByText('Get OTP');
    fireEvent.press(getOtpButton);
});
