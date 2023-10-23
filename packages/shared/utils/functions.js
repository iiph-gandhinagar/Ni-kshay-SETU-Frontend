import AsyncStorage from '@react-native-async-storage/async-storage';

export function processErrorAndRespond(error) {
  let statusCode = 0;
  let message = 'Server Error';
  console.log(error);
  if (error && error.response) {
    statusCode = error.response.status;
    switch (error.response.status) {
      case 401:
        message = 'You are not authorized to perform this action';
        break;
      case 404:
        message = 'The requested request is unknown to server';
        break;
      default:
        break;
    }
  }
  return [statusCode, message];
}

export const storeDataToAsyncStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    //  console.log('storeDataToAsyncStorage', jsonValue);
  } catch (e) {
    console.log('storeDataToAsyncStorage error', e);
  }
};

export const getDataFromAsyncStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getDataFromAsyncStorage error', e);
  }
};

export const removeItemFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('removeItemFromAsyncStorage error', e);
  }
};

