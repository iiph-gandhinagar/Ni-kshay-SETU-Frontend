import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderWithProviders } from '../utils/test-utils';
import Login from '../screens/Login';

test('renders Login component without errors', () => {
    renderWithProviders(<Login />);
});

test('renders form input fields', () => {
    const { getByPlaceholderText } = renderWithProviders(<Login />);
    const phoneInput = getByPlaceholderText('Mobile Number');
    const passwordInput = getByPlaceholderText('Password');

    expect(phoneInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
});

test('allows typing into phone and password fields', () => {
    const { getByPlaceholderText } = renderWithProviders(<Login />);
    const phoneInput = getByPlaceholderText('Mobile Number');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(phoneInput, '1234567890');
    fireEvent.changeText(passwordInput, 'myPassword123');

    expect(phoneInput.props.value).toBe('1234567890');
    expect(passwordInput.props.value).toBe('myPassword123');
});

test('login button triggers login function', () => {
    const { getByText } = renderWithProviders(<Login />);
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);
});

test('signin button triggers signin function', () => {
    const { getByText } = renderWithProviders(<Login />);
    const signinButton = getByText('Create an account');
    fireEvent.press(signinButton);
});

test('navigate to Forgot Password screen when link is pressed', () => {
    const { getByText } = renderWithProviders(<Login />);
    const forgotPasswordLink = getByText('Forgot Password?');
    fireEvent.press(forgotPasswordLink);
});
