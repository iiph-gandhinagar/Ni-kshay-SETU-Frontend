import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { AlgoLIstCard } from '../../components/core/AlgoLIstCard';
import { Header } from '../../components/core/Header';
import { appConfigTypes, themeProps } from '../../types';
import { getImage } from '../../utils/functions';
export default function Algorithms(props): JSX.Element {
  const navigation = useNavigation();
  const { colors } = useTheme() as unknown as themeProps;
  const AlgorithmObj = props?.route?.params;
  const { dynamicAlogs, loader } = useSelector(state => state?.app);
  const appTranslations: appConfigTypes = useSelector(
    state => state?.app?.appTranslations,
  );
  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: colors.background }]}>
      <Header
        headerTitle={AlgorithmObj?.name} />
      <FlatGrid
        adjustGridToStyles={true}
        style={{ marginHorizontal: RFValue(5) }}
        data={loader ? [] : dynamicAlogs?.find((item) => item?.sectionKey == AlgorithmObj?.sectionKey)?.data || []}
        renderItem={({ item }) => (
          <AlgoLIstCard
            title={appTranslations[item.cardTitle] || item.cardTitle}
            onPress={() => {
              if (item.type == 'Screening') {
                navigation.navigate('Screening');
              } else if (item.type == 'Dynamic') {
                navigation.navigate('AlgorithmList', {
                  name: item.cardTitle,
                  type: item.type,
                  algo_Id: item.id,
                });
              }
              else if (item.id) {
                navigation.navigate('AlgorithmDetails', {
                  name: item.cardTitle,
                  type: item.type,
                  algo_Id: item.id,
                  id: item.id,
                });
              }
              else {
                navigation.navigate('AlgorithmList', {
                  name: item.cardTitle,
                  type: item.type,
                });
              }
            }}
            ImgUrl={getImage(item?.type, item?.icon, item?.imageUrl)}
          />
        )}
      // ListFooterComponent={
      //   <React.Fragment>
      //     <Text style={[FontStyle.Nunito18Title,
      //     {
      //       color: colors.Blue_Theme,
      //       textAlign: 'center',
      //       marginBottom: RFValue(18),
      //     }]}>
      //       Other Modules
      //     </Text>
      //     <AllModulesList />
      //   </React.Fragment>
      // }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ScrollView: {
    paddingTop: RFValue(16),
    paddingHorizontal: RFValue(24),
  },
  HeaderText: {
    marginHorizontal: RFValue(15),
    marginTop: RFValue(15),
  },
});
