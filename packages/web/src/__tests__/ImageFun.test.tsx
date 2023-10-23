
import { BASE_MEDIA_URL } from "@tb-frontend/shared/globles";
import { getImage } from "../utils/functions";

describe('getImage function', () => {
    it('should return the correct image URL for Screening type', () => {
        const result = getImage('Screening', 'iconName', 'imageUrl');
        expect(result).toBe('images/Tools/ScreeningTool.png');
    });

    it('should return the correct image URL for Case Definition type', () => {
        const result = getImage('Case Definition', 'iconName', 'imageUrl');
        expect(result).toBe('images/Tools/CaseDe.png');
    });

    it('should return the correct image URL for an unknown type with an icon', () => {
        const result = getImage('unknownType', 'survey', 'imageUrl');
        expect(result).toBe('images/Tools/survey.png');
    });

    it('should return the correct image URL when imageUrl is provided', () => {
        const imageUrl = '/example/image/url.png';
        const result = getImage('CustomType', 'CustomIcon', imageUrl);
        expect(result).toBe(BASE_MEDIA_URL + imageUrl); // Assuming BASE_MEDIA_URL is defined
    });
});
