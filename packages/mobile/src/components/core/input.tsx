import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardType,
  KeyboardTypeAndroid,
  KeyboardTypeIOS,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputEndEditingEventData,
  View,
  ViewStyle,
} from 'react-native';
import { Image } from 'react-native-animatable';
import { Dropdown } from 'react-native-element-dropdown';
import MultiSelect from 'react-native-multiple-select';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontStyle } from '../../config/FontStyle';
import { appTheme } from '../../config/theme';
import { themeProps } from '../../types';
interface FormInputProps {
  value: string;
  onChangeText?: (e: string) => void;
  onBlur?: (e: any) => void;
  placeholder: string;
  touched?: boolean | undefined;
  errors?: string | undefined;
  keyboardType?: KeyboardType | KeyboardTypeAndroid | KeyboardTypeIOS;
  header: string;
  MaterialLeftIcon?: string;
  secureTextEntry?: boolean;
  numberOfLines?: number | undefined;
  maxLength?: number | undefined;
  showPasswordBtn?: boolean;
  editable?: boolean;
  HideHeader?: boolean;
  showLeftIcon?: boolean;
  style?: ViewStyle
}

export const FormInput: React.FC<FormInputProps> = ({
  value = '',
  onChangeText = () => null,
  onBlur = () => null,
  placeholder = '',
  touched = undefined,
  errors = undefined,
  keyboardType = 'default',
  header = '',
  MaterialLeftIcon = '',
  secureTextEntry = false,
  numberOfLines = 1,
  maxLength = undefined,
  showPasswordBtn = false,
  editable = true,
  HideHeader = false,
  showLeftIcon = false,
  style,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  const [secureText, setsecureText] = useState(secureTextEntry);
  return (
    <View>
      {!HideHeader ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[FontStyle.Nunito15, { color: colors.Blue_2 }]}>{header}</Text>
        </View>
      ) :
        null}

      <View
        style={[
          styles.inputBox,
          {
            borderColor: colors.BorderColor,
            backgroundColor: editable === false ? colors.Grey_1 : colors.background,
            marginBottom:
              errors && touched ? RFValue(0) : RFValue(24),
          },
          style,
        ]}>
        {showLeftIcon ? (
          <Icon
            name={MaterialLeftIcon}
            size={RFValue(19)}
            color={colors.Blue_2}
          />) : null}

        <TextInput
          editable={editable}
          multiline={numberOfLines > 1 ? true : false}
          numberOfLines={numberOfLines}
          value={value}
          style={[
            FontStyle.Nunito16, styles.txtinput,
          Platform.OS == 'ios' && {
            marginVertical:RFValue(5),
            paddingStart:RFValue(10),
          },
            { color: colors.Grey_3, textAlignVertical: 'top' }]}
          onChangeText={onChangeText}
          onBlur={onBlur}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry ? secureText : false}
          placeholderTextColor={colors.Grey_4}
        />
        {showPasswordBtn && (
          <Pressable
            onPress={() => {
              setsecureText(!secureText);
            }}>
            {secureText ? (
              <Icon name="visibility" size={RFValue(14)} color={colors.black} />
            ) : (
              <Icon name="visibility-off" size={RFValue(14)} color={colors.black} />
            )}
          </Pressable>
        )}
      </View>
      {errors && touched && (
        <Text style={[FontStyle.RalewayText12, { color: colors.Notification_red }, styles.errorText]}>{errors}</Text>
      )}

    </View>
  );
};
interface FormPickerProps {
  value: string;
  onChangeValue?: (e: string) => void;
  errors?: string | undefined;
  header: string;
  options: any[];
  label: string;
  showLeftIcon: string;
  Icon: string;
  MaterialLeftIcon?: string;
  onBlur?: (e: any) => void;
  touched?: boolean | undefined;
  style?: ViewStyle;
  allowEmpty?: boolean;
  ShowHeader?: boolean;

}

export const FormPicker: React.FC<FormPickerProps> = ({
  value = -1,
  onChangeValue = () => null,
  errors = undefined,
  header = '',
  options = [],
  label = '',
  MaterialLeftIcon = '',
  showLeftIcon = false,
  onBlur = () => null,
  touched = undefined,
  style = {},
  allowEmpty = false,
  ShowHeader = true,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View
      style={[
        { marginBottom: errors && touched ? 0 : RFValue(24) },
        style,
      ]}>
      {ShowHeader ? (
        <Text style={[FontStyle.Nunito16, styles.header, { color: colors.Blue_2 }]}>{header}</Text>) : null}

      <View
        style={[styles.dropDownBox, { borderColor: colors.BorderColor, backgroundColor: colors.background }]}>
        {showLeftIcon ? (
          <Icon
            name={MaterialLeftIcon}
            size={RFValue(19)}
            color={colors.Blue_2}
          />
        ) : null}
        <View
          style={[styles.dropDSubCon, { backgroundColor: colors.background }]}>
          <Dropdown
            value={value}
            showsVerticalScrollIndicator={true}
            placeholder={label}
            autoScroll={false}
            dropdownPosition={'auto'}
            onBlur={onBlur}
            search={false}
            data={options}
            labelField="name"
            valueField="value"
            placeholderStyle={[
              FontStyle.Nunito16, {
                color: colors.Grey_3,
              }]}
            style={[styles.dropdown]}
            itemContainerStyle={{
              backgroundColor: colors.background,
            }}
            activeColor={colors.Grey_1}
            itemTextStyle={{ color: colors.Grey_3 }}
            selectedTextStyle={[
              FontStyle.Nunito16, {
                color: colors.Blue_2,
              }]}
            onChange={item => {
              if (allowEmpty && item == -1) {
                onChangeValue('');
              } else if (item !== -1) {
                onChangeValue(item.value);
              }
            }}
          />
        </View>
      </View>
      {
        errors && touched && (
          <Text style={[FontStyle.RalewayText12, { color: colors.Notification_red }, styles.errorText]}>{errors}</Text>
        )
      }
    </View >
  );
};
interface FormMultiselectProps {
  value: string[];
  onChangeValue?: (e: string[]) => void;
  errors?: string | undefined;
  header: string;
  options: { id: any, name: string }[];
  touched?: boolean | undefined;
  style?: ViewStyle;


}
export const FormMultiselect: React.FC<FormMultiselectProps> = ({
  value = [],
  onChangeValue = () => null,
  errors = undefined,
  header = '',
  options = [],
  touched = undefined,
  style = {},

}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View
      style={[
        { marginBottom: errors && touched ? 0 : RFValue(24) },
        style,
      ]}>
      <Text style={[FontStyle.Nunito16, styles.header, { color: colors.Blue_2 }]}>{header}</Text>
      <MultiSelect
        flatListProps={{ scrollEnabled: false, disableScrollViewPanResponder: true, disableVirtualization: true }}
        items={options}
        uniqueKey="id"
        displayKey="name"
        onSelectedItemsChange={onChangeValue}
        selectedItems={value}
        selectText="Pick Items"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        altFontFamily={appTheme.fontFamily.NunitoMedium}
        styleListContainer={[{ backgroundColor: colors.dropDownBack }]}
        tagRemoveIconColor={colors.dropDownSelectBack}
        tagBorderColor={colors.dropDownSelectBack}
        tagTextColor={colors.Blue_2}
        styleTextDropdownSelected={[{ backgroundColor: colors.background, color: colors.Grey_4 }]}
        styleInputGroup={[{ backgroundColor: colors.dropDownBack }]}
        selectedItemTextColor={colors.Blue_2}
        selectedItemIconColor={colors.Blue_2}
        itemTextColor={colors.dropDownText}
        styleDropdownMenuSubsection={[styles.dropDownBox, { borderColor: colors.BorderColor, paddingLeft: RFValue(15), backgroundColor: colors.background }]}
        searchInputStyle={[FontStyle.Nunito16, { color: colors.dropDownText }]}
        submitButtonColor={colors.Blue_Theme}
        textColor={colors.dropDownSelectBack}
        submitButtonText="Submit"
      />
      {
        errors && touched && (
          <Text style={[FontStyle.RalewayText12, { color: colors.Notification_red }, styles.errorText]}>{errors}</Text>
        )
      }
    </View >
  );
};
interface SearchBarProps {
  onChangeText?: (val: string) => void | undefined;
  onEndEditing?: (val: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  onClear: () => void;
  placeholder?: string;
  value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onChangeText = () => null,
  onEndEditing = () => null,
  onClear = () => null,
  placeholder = '',
  value,
}) => {
  const { colors } = useTheme() as unknown as themeProps;
  return (
    <View style={[styles.SearchBarContainer]}>
      <TextInput
        style={[FontStyle.Nunito18Title, styles.SearchBar, { color: colors.Grey_3 }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoFocus={true}
        onEndEditing={onEndEditing}
        placeholderTextColor={colors.Grey_3}
      />
      {value?.length > 0 && (
        <Text onPress={onClear} style={[FontStyle.Nunito16, { color: colors.Blue_2 }]}>
          Cancel
        </Text>
      )}
    </View>
  );
};
let styles = StyleSheet.create({
  dropDownBox: {
    position: 'relative',
    width: '100%',
    height: RFValue(40),
    borderRadius: RFValue(6),
    overflow: 'hidden',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RFValue(6),
    flexDirection: 'row',

  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: RFValue(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFValue(6),
  },

  errorText: {
    marginBottom: RFValue(6),
  },
  header: {
    marginBottom: RFValue(3),
  },
  SearchBar: {
    flex: 1,
  },
  SearchBarContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: RFValue(12),
  },
  txtinput: {
    flex: 1,
    marginStart: RFValue(5),
    // marginVertical: RFValue(4),
  },
  dropDSubCon: {
    flex: 1,
    width: '100%',
  },
  dropdown: {
    width: '100%',
    flex: 1,
    paddingLeft: RFValue(15),
  },
});
