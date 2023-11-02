import React, { useEffect, useState } from "react";
import {
  Text,
  ToastAndroid,
  View,
} from 'react-native'
import {
  TextInput,
  Button,
} from 'react-native-paper'
import BaseHeader from "../../components/BaseHeader";
import { useConfig } from "../../hooks";
import {getItemAsync} from 'expo-secure-store'
import { appConfigKey } from "../../config/config";

export default function Login({ navigation }) {

  const [password, setPassword] = useState('')
  const [config,setConfig] = useConfig()
  const verifIsFirstLogin = async ()=>{
    const config = await getItemAsync(appConfigKey)
    if(config && JSON.parse(config).password) return
    navigation.reset({
      index:0,
      routes:[{name:'LoginFirst'}]
    }) 
  }
  verifIsFirstLogin()

  const login = val => {
    if((val || password) !== config.password) return ToastAndroid.show('密码错误',ToastAndroid.SHORT)
    setConfig({
      ...config,
      loginDate:Date.now(),
    })
    navigation.reset({
      index:0,
      routes:[{name:'Main'}]
    })
  }
  const changePassword = val =>{
    if(val && config.fastLogin){
      if(config.password === val) login(val)
    }
    setPassword(val)
  }
  
  return (
    <View
      style={{
        height: '100%',
        display:'flex',
      }}
    >
      <BaseHeader>
        <View
          style={{
            width:'100%',
            display:'flex',
            flexDirection:'row',
            paddingHorizontal:20,
          }}
        >
          <Text style={{
            fontSize: 24,
            color:'#fff',
          }}>登录</Text>
        </View>
      </BaseHeader>
      <View
        style={{
          paddingHorizontal:20,
          flex:1,
          paddingTop:50,
        }}
      >
          <TextInput
            mode='outlined'
            secureTextEntry={true}
            label='密码'
            value={password}
            onChangeText={changePassword}
          ></TextInput>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop:20,
          }}
          >
            <Button mode="contained" onPress={login}>
              登录
            </Button>
          </View>

      </View>
    </View>
  )
}