import { render as rtlRender } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import configureStore from '@tb-frontend/shared/Store/index';
import { View } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-permissions', () =>
    require('react-native-permissions/mock'),
);

jest.mock('@react-native-community/netinfo', () =>
    require('@react-native-community/netinfo/jest/netinfo-mock'),
);

// Access the width of the window
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ hasError: true, error });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <View>***********Something went wrong!**********</View>;
        }
        return this.props.children;
    }
}

export function renderWithProviders(
    ui: ReactNode,
    { ...renderOptions }: Record<string, unknown> = {}
): JSX.Element {
    function Wrapper({ children }: { children: ReactNode }): JSX.Element {
        return (
            <Provider store={configureStore}>
                <NavigationContainer>
                    <ErrorBoundary>{children}</ErrorBoundary>
                </NavigationContainer>
            </Provider>
        );
    }

    // Render the component with the specified providers
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
