import React from 'react-native';
import BaseHeader from '../../components/BaseHeader';
import IconButton from '../../components/IconButton';
import {View, Text} from 'react-native';

const flexRowAlignCenterBetween = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const fontStyle = {
  color: '#fff',
  fontSize: 18,
};

export default function Header({
    onBack
}) {
  return (
    <BaseHeader>
      <View
        style={[
          flexRowAlignCenterBetween,
          {
            flex: 1,
            paddingHorizontal: 16,
          },
        ]}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'center',
            gap: 16,
          }}>
          <IconButton
            onPress={onBack}
            name="arrow-back-outline"
            size={28}
            color="#fff"></IconButton>
          <Text
            style={[
              fontStyle,
              {
                fontWeight: 500,
              },
            ]}>
            编辑标签
          </Text>
        </View>
      </View>
    </BaseHeader>
  );
}
