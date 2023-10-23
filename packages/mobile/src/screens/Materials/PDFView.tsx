import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { Header } from '../../components/core/Header';
import { themeProps } from '../../types';

export default function PDFView(props): JSX.Element {
  const materialsObj = props?.route?.params.url;
  const heading = props?.route?.params.header;
  const { colors } = useTheme() as unknown as themeProps;
  const source = {
    uri: materialsObj,
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Header headerTitle={heading} />
      <Pdf
        trustAllCerts={false}
        source={source}
        onLoadComplete={(numberOfPages, filePath) => { }}
        onPageChanged={(page, numberOfPages) => { }}
        renderActivityIndicator={progress => (
          <ActivityIndicator size="large" color={colors.Blue_2} />
        )}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => { }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
