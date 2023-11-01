import React from 'react';
import {View,Text} from 'react-native';
import {List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../TagManage/Header';
import { useConfig } from "../../hooks";



export default function SettingEntry({navigation}){
  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
      }}
    >
      <Header onBack={() => navigation.goBack()} title="编辑标签"></Header>
      <List.Item
        title="数据库"
        onPress={()=>navigation.navigate('DataBase')}
        left={props => <Icon {...props} name="server-outline" size={20} />}
      />
      <List.Item
        title="安全"
        onPress={()=>navigation.navigate('Safe')}
        left={props => <Icon {...props} name="shield-checkmark-outline" size={20} />}
      />
    </View>
  )
}