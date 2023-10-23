import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import WebView from 'react-native-webview';
import { Header } from '../components/core/Header';
import Loader from '../components/core/Loaders/Loader';
import { themeProps } from '../types';
export default function WebViewScreen(props: any): JSX.Element {
    const { url, title } = props?.route?.params;
    const { colors } = useTheme() as unknown as themeProps;
    const [isLoading, setLoading] = useState(false);
    const webView = useRef();
    const navigation = useNavigation();
    const checkLoadRequest = (navigator) => {
        if (url.match('showfile')?.length > 0) {
            setTimeout(() => {
                if (navigation.canGoBack()) { navigation.goBack(); }
            }, 1000);
            return false;
        }
        return false;
    };
    if (Platform.OS == 'ios'){
        return (
            <React.Fragment>
            <Header headerTitle={title} />
                <WebView source={{ uri: url }}
                    startInLoadingState
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
        </React.Fragment>
        );
    }
    else {
        return (
            <React.Fragment>
                <Header headerTitle={title} />
                <SafeAreaView style={[styles.container, { backgroundColor: colors.white }]}>
                    <Loader isLoading={isLoading} />
                    <WebView source={{ uri: url }}
                        ref={webView}
                        onFileDownload={() => {
                            console.log('onFileDownload');

                        }}
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                        onMessage={() => {
                            console.log('onMessage');
                        }}

                        allowsFullscreenVideo={true}
                        allowFileAccessFromFileURLs={true}
                        mediaPlaybackRequiresUserAction={true}
                        onShouldStartLoadWithRequest={checkLoadRequest}
                        onNavigationStateChange={checkLoadRequest}
                    />
                </SafeAreaView>
            </React.Fragment>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: RFValue(10),
    },
    pdf: {
        flex: 1,
    },
});
