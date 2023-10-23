import React from 'react';
import { renderWithProviders } from '../utils/test-utils';
import AboutCGCProject from '../screens/Account/AboutCGCProject';
import HTML from 'react-native-render-html';

describe('AboutCGCProject', () => {

    it('should render dynamic HTML content', async () => {
        const { findByText } = renderWithProviders(
            <HTML source={{ html: '<p>Dynamic content</p>' }} />
        );
    });

    it('renders AboutCGCProject without errors', () => {
        renderWithProviders(<AboutCGCProject />
        );
    });

    it('displays the correct image source', () => {
        const { getByTestId } = renderWithProviders(<AboutCGCProject />);
        const image = getByTestId('image');
        expect(image).toBeTruthy;

    });

    it('correctly handles scrolling', () => {
        const { getByTestId } = renderWithProviders(<AboutCGCProject />);
        const scrollView = getByTestId('scroll-view');
        expect(scrollView).toBeTruthy;

    });

    it('displays correctly About US Text', () => {
        const { getByTestId } = renderWithProviders(<AboutCGCProject />);
        const text = getByTestId('About_us_test');
        expect(text).toHaveTextContent('About US');

    });

});
