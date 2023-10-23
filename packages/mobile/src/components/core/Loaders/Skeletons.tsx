import React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  Shine, Placeholder, PlaceholderLine, PlaceholderMedia,
} from 'rn-placeholder';

interface Props {
}
export const TopModulesSkeleton: React.FC<Props> = ({
}) => {
  const arr = [0, 1, 2, 3, 4];
  return arr.map((data, i) => {
    return (
      <View key={'TopModulesSkeleton - ' + i} style={{ paddingHorizontal: RFValue(16), flex: 1 }}>
        <Placeholder
          Animation={Shine}
        >
          <PlaceholderMedia style={{ marginBottom: RFValue(16), alignSelf: 'center' }} />
          <PlaceholderLine style={{}} />
        </Placeholder>
      </View>
    );
  });
};

interface Props {
}
export const NewsFeedSkeleton: React.FC<Props> = ({
}) => {
  return (
    <Placeholder
      Animation={Shine}
    >
      <PlaceholderMedia size={RFValue(100)} style={{ width: '100%', marginVertical: RFValue(16) }} />
      <PlaceholderLine width={RFValue(60)} style={{ alignSelf: 'center' }} />
    </Placeholder>
  );
};

interface Props {
}
export const SimilarAppsSkeleton: React.FC<Props> = ({
}) => {
  const arr = [0, 1, 2];
  return arr.map((data, i) => {
    return (
      <View key={'SimilarAppsSkeleton - ' + i} style={{ paddingHorizontal: RFValue(16), flex: 1 }}>
        <Placeholder
          Animation={Shine}
        >
          <PlaceholderMedia size={RFValue(50)} style={{ marginVertical: RFValue(16), alignSelf: 'center' }} />
          <PlaceholderLine style={{}} />
        </Placeholder>
      </View>
    );
  });
};

interface Props {
}
export const RecentlyAddedSkeleton: React.FC<Props> = ({
}) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return arr.map((data, i) => {
    return (
      <View key={'RecentlyAddedSkeleton - ' + i} >
        <Placeholder
          Left={PlaceholderMedia}
          // Right={PlaceholderMedia}
          Animation={Shine} style={{ marginTop: RFValue(16) }}>
          <PlaceholderLine />
          <PlaceholderLine width={RFValue(70)} />
        </Placeholder>
      </View>
    );
  });
};
export const MasterSearchSkeleton: React.FC<Props> = ({
}) => {
  const arr = [0, 1, 2, 3, 4, 5, 6];
  return arr.map((data, i) => {
    return (
      <Placeholder
        key={'MasterSearchSkeleton - ' + i}
        Left={PlaceholderMedia}
        Animation={Shine} style={{ paddingTop: RFValue(16), paddingHorizontal: RFValue(10) }}>
        <PlaceholderLine style={{ flex: 1, alignSelf: 'center', marginTop: RFValue(8) }} />
      </Placeholder>
    );
  });
};
export const FeatureSkeleton: React.FC<Props> = ({
}) => {
  return (
    <Placeholder
      Animation={Shine}
    >
      <PlaceholderMedia style={{ width: '100%', height: RFValue(90), borderRadius: RFValue(6) }} />
    </Placeholder>
  );
};
