import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { themeProps } from '../../../types';
const Loader = ({ isLoading = false }) => {
  const loader = useSelector(state => state?.assessment?.loader);
  const apploader = useSelector(state => state?.app?.loader);
  const appStatusloader = useSelector(state => state?.app?.appStatusloader);
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      coverScreen={false}
      supportedOrientations={['portrait']}
      style={{ flex: 1 }}
      isVisible={loader || apploader || appStatusloader || isLoading}
      hasBackdrop={true}
      backdropOpacity={0.7}
      backdropColor={colors.black2}
    >
      <View style={[styles.container]}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={colors?.Blue_2} />
        </View>
      </View>
    </Modal>
  );
};
export const AppLoader = () => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <Modal
      animationIn={'fadeIn'}
      coverScreen={false}
      animationOut={'fadeOut'}
      supportedOrientations={['portrait']}
      isVisible={true}
      hasBackdrop={true}
      backdropOpacity={0.7}
      backdropColor={colors.black2}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={colors?.Blue_2} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 15,
    backgroundColor: 'white',
    // width: 150,
    // height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
  },
});
export default Loader;
