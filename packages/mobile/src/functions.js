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

export function getActivityCriteriaFromUrlPath(fullpath) {
  let split_path = '';
  split_path = fullpath.split('/');

  let activity_type = '';
  let media_type = '';
  let category = '';
  let page = 1;
  let criteria = {};

  if (split_path && split_path.length == 2) {
    //first level
    activity_type = split_path[1];
    criteria.activity_type = activity_type;
  } else if (split_path && split_path.length == 3) {
    activity_type = split_path[1];
    criteria.activity_type = activity_type;
    media_type = split_path[2];
    criteria.media_type = media_type;
  } else if (split_path && split_path.length == 4) {
    activity_type = split_path[1];
    criteria.activity_type = activity_type;
    media_type = split_path[2];
    criteria.media_type = media_type;
    category = split_path[3];
    criteria.category = category;
    criteria.page = 1;
  }
  return criteria;
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

export const getDataFromAsyncStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getDataFromAsyncStorage error', e);
  }
};

export const removeItemFromAsyncStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('removeItemFromAsyncStorage error', e);
  }
};
export function razorpayErrors(error) {
  let statusCode = 0;
  let message = '';
  console.log(error);
  if (error && error.error) {
    statusCode = error.error.code;
    switch (error.error.code) {
      case 'BAD_REQUEST_ERROR':
        message = 'Payment processing cancelled by user';
        break;
      default:
        message = error.error.description;
        break;
    }
  } else if (error && error.description) {
    const description = JSON.parse(error.description);
    message = description.description;
  }
  return message;
}

export const getQueryStringFromObject = filterCriteria => {
  let filterQueryString = '';
  if (filterCriteria) {
    filterQueryString = Object.keys(filterCriteria)
      .map(
        k =>
          `${encodeURIComponent(k)}=${encodeURIComponent(filterCriteria[k])}`,
      )
      .join('&');
  }
  return filterQueryString;
};
export function serializeUrl(obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return '?' + str.join('&');
}
