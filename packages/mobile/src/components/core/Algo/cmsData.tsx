import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import table, { IGNORED_TAGS } from '@native-html/table-plugin';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import HTML, { useContentWidth } from 'react-native-render-html';
import { RFValue } from 'react-native-responsive-fontsize';
import WebView from 'react-native-webview';
import {
    baseFontStyle,
    em, iframe, li,
    p,
    span,
    strong,
    tableStyles, ul,
} from '../../../config/styles';
import { appTheme } from '../../../config/theme';
import { themeProps } from '../../../types';
interface CmsDataProps {
    source: any
}
export const CmsData: React.FC<CmsDataProps> = ({
    source,
}) => {
    const { colors } = useTheme() as unknown as themeProps;
    const contentWidth = useContentWidth();
    const renderers = {
        table,
        iframe: IframeRenderer,
    };
    const customHTMLElementModels = {
        iframe: iframeModel,
    };
    const htmlConfig = {
        WebView,
        renderers,
        ignoredTags: IGNORED_TAGS,
        renderersProps: {
            iframe: {
                scalesPageToFit: true,
                autoplay: false,
                webViewProps: {
                    autoplay: false,
                    mediaPlaybackRequiresUserAction: true,
                },
            },
            table: {
                animationType: 'animated',
                tableStyleSpecs: {
                    fitContainerWidth: true,
                    outerBorderWidthPx: 0,
                    rowsBorderWidthPx: 1,
                    columnsBorderWidthPx: 1,
                    fontSizePx: RFValue(16),
                    fontFamily: appTheme.fontFamily.NunitoRegular,
                    cellPaddingEm: 0.625,
                    outerBorderColor: colors.BorderColor,
                    trOddBackground: colors.background,
                    trEvenBackground: colors.background,
                    tdBorderColor: colors.BorderColor,
                    thBorderColor: colors.BorderColor,
                    thOddBackground: colors.headerBackground,
                    thOddColor: colors.headertext,
                    trOddColor: colors.black,
                    trEvenColor: colors.black,
                },
            },
        },
        iframe: {
            scalesPageToFit: true,
            autoplay: false,
            webViewProps: {
                autoplay: false,
                mediaPlaybackRequiresUserAction: true,
            },
        },
        tagsStyles: {
            table: {},
        },
    };
    return (
        <HTML
            customHTMLElementModels={customHTMLElementModels}
            source={{ html: source }}
            contentWidth={contentWidth}
            baseStyle={{ flex: 1 }}
            baseFontStyle={{
                ...baseFontStyle,
                colors: colors.black,
            }}
            {...htmlConfig}
            systemFonts={[appTheme.fontFamily.NunitoRegular]}
            tagsStyles={{
                p: {
                    ...p,
                    color: colors.black2,
                    marginBottom: RFValue(10),
                    textAlign: 'auto',
                },
                span: {
                    ...span,
                    color: colors.black2,
                },
                em: {
                    ...em,
                    padding: 'auto',
                    color: colors.Grey_3,
                },
                ul: {
                    ...ul,
                    padding: 'auto',
                    color: colors.Blue_2,
                    margin: 0,
                },
                ol: {
                    color: colors.Blue_2,
                    padding: 'auto',
                },
                li: {
                    ...li,
                    padding: 'auto',
                    color: colors.black2,
                    alignItems: 'flex-start',
                    marginBottom: RFValue(10),
                },
                strong: {
                    ...strong,
                    color: colors.black2,
                    textAlign: 'auto',
                },
                table: {
                    ...tableStyles,
                    color: colors.black2,
                },
                iframe: {
                    ...iframe,
                    minHeight: RFValue(230),
                    color: colors.black2,
                },
            }}
        />
    );
};

