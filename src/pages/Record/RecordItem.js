import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import dayjs from 'dayjs';

export default function RecordItem({item,onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={.65}
      onPress={onPress}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          gap: 10,
          borderBottomWidth: 1,
          borderColor: '#DDDDDD',
          borderStyle: 'solid',
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#0984e3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>icon</Text>
        </View>
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>{item.title}</Text>
            <Text>{dayjs(+item.update_date).format('YY-MM-DD HH:mm:ss')}</Text>
          </View>
          <View>
            <Text>{item.acount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
