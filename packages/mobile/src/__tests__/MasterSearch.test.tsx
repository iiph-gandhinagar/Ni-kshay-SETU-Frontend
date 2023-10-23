import React from 'react';
import { renderWithProviders } from '../utils/test-utils';
import MasterSearch from '../screens/MasterSearch';

test('renders MasterSearch component without errors', () => {
    renderWithProviders(<MasterSearch />);
});
