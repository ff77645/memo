import React from "react";
import {
  View,
} from 'react-native'
import {List} from 'react-native-paper';
import Header from "../../TagManage/Header";



export default function DataBase({navigation}){


  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
      }}
    >
      <Header title="数据库" onBack={()=>navigation.goBack()}/>
      <View>
        <View
          style={{
            paddingLeft:50,
          }}
        >
          <List.Item title="数据库" titleStyle={{
            color:'#c23616',
          }}></List.Item>
          <List.Item title="共享数据库" description="创建并共享一个加密数据库的备份"></List.Item>
          <List.Item title="备份数据库" description="创建加密数据库的备份"></List.Item>
          <List.Item title="恢复数据库" description="从加密数据库恢复数据库"></List.Item>
        </View>
      </View>
    </View>
  )
}