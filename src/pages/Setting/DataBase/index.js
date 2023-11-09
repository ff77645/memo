import React from "react";
import {
  View,
  ToastAndroid,
} from 'react-native'
import {List} from 'react-native-paper';
import Header from "../../TagManage/Header";
import * as Fs from 'expo-file-system'
// import Share from 'react-native-share'
import {shareAsync} from 'expo-sharing'
import {pickDirectory} from 'react-native-document-picker'
import {getDocumentAsync} from 'expo-document-picker'

const lookSqdir = async ()=>{
  const path = Fs.documentDirectory + 'SQLite'
  const sqDir = await Fs.getInfoAsync(path)
  if(sqDir.exists){
      const files = await Fs.readDirectoryAsync(path)
      console.log({files});
      const file = await Fs.getInfoAsync(path + '/db.db')
      console.log({file});
  }else{
      console.log('SQLite 文件不存在');
  }
}

const shareDataBase = async ()=>{
  const url = Fs.documentDirectory + 'SQLite/db.db'
  shareAsync(url,{dialogTitle:'dialogTitle'})
}

/* 
SQLite数据库：application/vnd.sqlite3 或 application/x-sqlite3
MySQL数据库：application/x-mysql
PostgreSQL数据库：application/x-postgresql
*/
const backupDataBase = async ()=>{
  let cancled = false
  const res = await pickDirectory().catch(()=>{
    cancled = true
  })
  console.log({res});
  if(cancled) return
  const uri = await Fs.StorageAccessFramework.createFileAsync(res.uri,'myPassword.db','application/vnd.sqlite3')
  console.log({uri});
  const from = Fs.documentDirectory + 'SQLite/db.db'
  const content = await Fs.readAsStringAsync(from,{
    encoding:Fs.EncodingType.Base64
  })
  await Fs.StorageAccessFramework.writeAsStringAsync(uri,content,{
    encoding:Fs.EncodingType.Base64
  })
  ToastAndroid.show('备份成功',ToastAndroid.SHORT)
}

const restoreDataBase = async ()=>{
  const res = await getDocumentAsync()
  if(res.canceled) return
  const file = res.assets[0]
  console.log({file});
  if(!file.name.endsWith('.db')) return ToastAndroid.show('文件类型错误',ToastAndroid.SHORT)
  await Fs.copyAsync({
    from:file.uri,
    to:Fs.documentDirectory + 'SQLite/db.db'
  })
  ToastAndroid.show('恢复成功',ToastAndroid.SHORT)
}

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
          <List.Item onPress={shareDataBase} title="共享数据库" description="创建并共享一个加密数据库的备份"></List.Item>
          <List.Item onPress={backupDataBase} title="备份数据库" description="创建加密数据库的备份"></List.Item>
          <List.Item onPress={restoreDataBase} title="恢复数据库" description="从加密数据库恢复数据库"></List.Item>
          {/* <List.Item onPress={lookSqdir} title="查看目录"></List.Item> */}
        </View>
      </View>
    </View>
  )
}