import React from "react";
import {
  View,
} from 'react-native'
import {List} from 'react-native-paper';
import Header from "../../TagManage/Header";
import * as Fs from 'expo-file-system'
import Share from 'react-native-share'
import {shareAsync} from 'expo-sharing'
import {pickDirectory} from 'react-native-document-picker'
import {getDocumentAsync} from 'expo-document-picker'

export default function DataBase({navigation}){
  
  const lookSqdir = async ()=>{
    const path = Fs.documentDirectory + 'SQLite'
    const sqDir = await Fs.getInfoAsync(path)
    if(sqDir.exists){
        const files = await Fs.readDirectoryAsync(path)
        console.log({files});
    }else{
        console.log('SQLite 文件不存在');
    }
  }
  const shareDataBase = async ()=>{
    const url = Fs.documentDirectory + 'SQLite/db.db'
    const file = await Fs.getInfoAsync(url)
    console.log({file});
    // shareAsync(url,{dialogTitle:'dialogTitle'})
  }
  /* 
  
  SQLite数据库：application/vnd.sqlite3 或 application/x-sqlite3
MySQL数据库：application/x-mysql
PostgreSQL数据库：application/x-postgresql
  */

  const backupDataBase = async ()=>{
    const res = await pickDirectory()
    console.log({res});
    
    // await Fs.StorageAccessFramework.createFileAsync(res.uri,'db',)
    // const res2 = await Fs.StorageAccessFramework.requestDirectoryPermissionsAsync()
    // console.log({res2});
    // const url = await Fs.getContentUriAsync(res.uri)
    // console.log({url});
    const from = Fs.documentDirectory + 'SQLite/db.db'
    const to = res.uri + '/db.db'
    // await Fs.StorageAccessFramework.copyAsync({
    //   from,
    //   to,
    // })
    // const content = await Fs.readAsStringAsync(from)
    // await Fs.StorageAccessFramework.writeAsStringAsync(to,content)
    // console.log('ok');
    const uri = await Fs.StorageAccessFramework.createFileAsync(res.uri,'db','application/x-sqlite3')
    console.log({uri});
  }

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
          <List.Item onPress={shareDataBase} title="共享数据库" description="创建并共享一个加密数据库的备份"></List.Item>
          <List.Item onPress={backupDataBase} title="备份数据库" description="创建加密数据库的备份"></List.Item>
          <List.Item title="恢复数据库" description="从加密数据库恢复数据库"></List.Item>
        </View>
      </View>
    </View>
  )
}