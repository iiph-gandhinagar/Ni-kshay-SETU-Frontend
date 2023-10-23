import { useTheme } from '@react-navigation/native';
import {
  pushLoader,
  pushToChatFlow,
  searchByKeyword,
} from '@tb-frontend/shared/Store/action/chatActions';
import React, { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { FontStyle } from '../../config/FontStyle';
import { appTheme } from '../../config/theme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { appConfigTypes, themeProps } from '../../types';
interface Props {
  session_token: string;
}

export const ChatSearchText: React.FC<Props> =
  ({
    session_token = '',
  }) => {
    const { colors } = useTheme() as unknown as themeProps;
    const [text, setText] = useState('');
    const [started, setStarted] = useState(false);
    const dispatch = useDispatch();
    const appLange = useSelector(state => state?.app?.appLang);
    const appTranslations: appConfigTypes = useSelector(
      state => state?.app?.appTranslations,
    );
    // useEffect(() => {
    //   function onSpeechPartialResults(e) {
    //     // console.log('onSpeechPartialResults: ', e.value);
    //     setText(e.value[0]);
    //   }
    //   function onSpeechVolumeChanged(e) {
    //     // console.log('onSpeechVolumeChanged: ', e.value);
    //     // setPitch(e.value)
    //   }
    //   async function onSpeechEnd(e) {
    //     await Voice.stop();
    //     setStarted(false);
    //   }
    //   async function onSpeechError(e) {
    //     console.log('onSpeechError: ', e);
    //     // await Voice.stop();
    //     setStarted(false);
    //   }
    //   function onSpeechStart(e) {
    //     // console.log('onSpeechStart: ', e);
    //     setStarted(true);
    //   }
    //   Voice.onSpeechEnd = onSpeechEnd;
    //   Voice.onSpeechError = onSpeechError;
    //   Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    //   Voice.onSpeechPartialResults = onSpeechPartialResults;
    //   Voice.onSpeechStart = onSpeechStart;
    //   return () => {
    //     Voice.destroy().then(Voice.removeAllListeners);
    //     setText('');
    //     setStarted(false);
    //   };
    // }, []);
    return (
      <View style={[styles.container, { borderColor: colors.BorderColor, backgroundColor: colors.background }]}>
        <TextInput
          style={[styles.TextInput, FontStyle.Nunito16, { color: colors.black }]}
          placeholder={
            started
              ? 'Listening...'
              : appTranslations.PLACEHOLDER_CHAT_TYPE_MESSAGE
          }
          placeholderTextColor={colors.BorderColor}
          underlineColorAndroid={'transparent'}
          onChangeText={text => setText(text)}
          value={text}
        />
        <Pressable
          disabled={text.length < 1 ? true : false}
          onPress={async () => {
            Keyboard.dismiss();
            await dispatch(
              pushToChatFlow({
                type: 'Answers',
                data: {
                  title: text,
                },
                isPop: false,
              }),
            );
            await dispatch(pushLoader());
            await dispatch(
              searchByKeyword({
                keyword: text,
                token: session_token,
              }),
            );
            setText('');
          }}
          style={[styles.btnStyle, {
            backgroundColor: text.length < 1 ? colors.BorderColor : colors.Blue_2,
          }]}>
          <Icon
            name="send"
            size={RFValue(20)}
            color={colors.white}
          />
        </Pressable>
      </View>
    );
  };
let styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    flexDirection: 'row',
  },
  TextInput: {
    maxHeight: RFValue(50),
    flex: 1,
    position: 'relative',
  },
  btnStyle: {

    justifyContent: 'center',
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(12),//CHECK ANDROID
  },
});
// {(started ? started : text?.length < 1) ? (
//   <Pressable
//     onPressIn={async () => {
//       // if (started) {
//       //   await Voice.stop();
//       //   setStarted(false);
//       // } else {
//       //   try {
//       //     if (appLange == 'en') {
//       //       await Voice.start('en-US');
//       //     } else {
//       //       await Voice.start('hi-IN');
//       //     }
//       //   } catch (e) {
//       //     console.error(e);
//       //     await Voice.stop();
//       //     setStarted(false);
//       //   }
//       // }
//     }}
//     onPressOut={async () => {
//       try {
//         // console.log('end');
//         // await Voice.stop();
//       } catch (e) {
//         console.error(e);
//       }
//     }}
//     style={[styles.btnStyle, {
//       backgroundColor: colors.Blue_2,
//     }]}>
//     <Fontisto
//       name="mic"
//       size={RFValue(20)}
//       color={colors.white}
//     />

//   </Pressable>
// ) : (
//   <Pressable
//     disabled={text.length < 1 ? true : false}
//     onPress={async () => {
//       Keyboard.dismiss();
//       await dispatch(
//         pushToChatFlow({
//           type: 'Answers',
//           data: {
//             title: text,
//           },
//           isPop: false,
//         }),
//       );
//       await dispatch(pushLoader());
//       await dispatch(
//         searchByKeyword({
//           keyword: text,
//           token: session_token,
//         }),
//       );
//       setText('');
//     }}
//     style={[styles.btnStyle, {
//       backgroundColor: colors.Blue_2,
//     }]}>
//     <Icon
//       name="send"
//       size={RFValue(20)}
//       color={colors.white}
//     />
//   </Pressable>
// )}
