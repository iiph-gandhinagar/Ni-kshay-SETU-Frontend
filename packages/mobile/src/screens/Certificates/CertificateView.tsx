import { useTheme } from '@react-navigation/native';
import { BASE_URL } from '@tb-frontend/shared/globles';
import React from 'react';
import { ActivityIndicator, Alert, PermissionsAndroid, Platform, SafeAreaView, StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Button } from '../../components/core/Button';
import { Header } from '../../components/core/Header';
import { appConfigTypes, themeProps } from '../../types';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
export default function CertificateView(props: any): JSX.Element {
    const appTranslations: appConfigTypes = useSelector(
        state => state?.app?.appTranslations,);
    const { id, title } = props?.route?.params;
    const { colors } = useTheme() as unknown as themeProps;
    const { token } = useSelector(state => state?.auth);
    const onDownload = () => {
        //Function to check the platform
        //If iOS the start downloading
        //If Android then ask for runtime permission
        if (Platform.OS === 'ios') {
            downloadPdf();
        } else {
            try {
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'storage title',
                        message: 'storage_permission',
                    },
                ).then(granted => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //Once user grant the permission start downloading
                        console.log('Storage Permission Granted.');
                        downloadPdf();
                    } else {
                        //If permission denied then show alert 'Storage Permission
                        'Not Granted';
                        Alert.alert('storage_permission');
                    }
                });
            } catch (err) {
                //To handle permission related issue
                console.log('error', err);
            }
        }
    };

    const downloadPdf = async () => {
        const { config, fs } = ReactNativeBlobUtil;
        const dirToSave = Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                //Related to the Android only
                useDownloadManager: true,
                notification: true,
                title: title,
                path: `${dirToSave}/${title}.pdf`,
            },
        };
        config(options)
            .fetch('GET', BASE_URL + 'get-certificate-pdf/' + id, {
                Authorization: 'Bearer ' + token,
            })
            .then((res) => {
                //Showing alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                Toast.show({
                    type: 'success',
                    text1:'Success',
                    text2:'File Downloaded Successfully.',
                  });
            });
    };
    return (
        <React.Fragment>
            <Header
                noBackArrow={props?.navigation.getState()?.routes?.find(e => e.name == 'AssessmentQuestions') ? true : false}
                headerTitle={title} />
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <Pdf
                    trustAllCerts={false}
                    source={{
                        uri: BASE_URL + 'get-certificate-pdf/' + id, headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    }}
                    renderActivityIndicator={progress => (
                        <ActivityIndicator size="large" color={colors.Blue_2} />
                    )}
                    onError={(error) => {
                        console.log('error', error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={[styles.pdf, { backgroundColor: colors.background }]} />
                <Button
                    style={{ alignSelf: 'center' }}
                    //   loader={isSubmitting}
                    onPress={onDownload}
                    buttonText={appTranslations.DOWNLOAD}
                />
            </SafeAreaView>
        </React.Fragment>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: RFValue(10),
    },
    pdf: {
        flex: 1,
    },
});
