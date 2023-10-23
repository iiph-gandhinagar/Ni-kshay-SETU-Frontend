import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView, StatusBar, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from 'react-native-video-controls';

export default function VideoView(props): JSX.Element {
  const materialsObj = props?.route?.params;
  const navigation = useNavigation();
  useEffect(() => {
    const Focus = navigation.addListener('focus', () => {
      StatusBar.setHidden(true);
      Orientation.unlockAllOrientations()
    });
    return Focus;
  });
  useEffect(() => {
    const Blur = navigation.addListener('blur', () => {
      StatusBar.setHidden(false)
      Orientation.lockToPortrait();
    });
    return Blur;
  });
  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false)
      Orientation.lockToPortrait()
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VideoPlayer
        disableVolume
        toggleResizeModeOnFullscreen
        source={{ uri: materialsObj }}
        onEnterFullscreen={() => {
          StatusBar.setHidden(true);
          Orientation.lockToLandscape();
        }}
        onExitFullscreen={() => {
          StatusBar.setHidden(false);
          Orientation.lockToPortrait();
        }}
        onEnd={() => { Orientation.lockToPortrait(); }}
        onBack={() => {
          StatusBar.setHidden(false);
          Orientation.lockToPortrait();
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}
