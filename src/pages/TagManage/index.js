import React, {useState} from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import BaseHeader from '../../components/BaseHeader';
import Icon from 'react-native-vector-icons/Ionicons';

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

export default function TagManage({navigation}) {

  return (
    <View>
      <BaseHeader>
        {/* <Text>编辑标签</Text> */}
        <View
          style={[
            flexRowAlignCenterBetween,
            {
              flex: 1,
              paddingHorizontal: 20,
            },
          ]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignItems: 'center',
              gap: 20,
            }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Icon name="arrow-back-outline" size={28} color="#fff"></Icon>
            </TouchableOpacity>
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
    </View>
  );
}
