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
import ModalAuth from "../../components/ModalAuth";

export default function Login({ navigation }) {

  const [password, setPassword] = useState('')
  const [config,setConfig] = useConfig()
  const [showModalAuth,setShowModalAuth] = useState(false)
  const verifIsFirstLogin = async ()=>{
    const configJson = await getItemAsync(appConfigKey)
    const config = configJson && JSON.parse(configJson)
    if(!config || !config.password) return navigation.reset({
      index:0,
      routes:[{name:'SetRootPassword',params:{action:'setPassword'}}]
    })
    if(config.biometrics){
      setShowModalAuth(true)
    }
  }
  verifIsFirstLogin()

  const loginSuccess = ()=>{
    setConfig({
      ...config,
      loginDate:Date.now(),
    })
    navigation.reset({
      index:0,
      routes:[{name:'Main'}]
    })
  }

  const onConfirm = val => {
    if((val || password) !== config.password) return ToastAndroid.show('密码错误',ToastAndroid.SHORT)
    loginSuccess()
  }

  const changePassword = val =>{
    if(val && config.fastLogin && config.password === val) onConfirm(val)
    setPassword(val)
  }

  return (
    <View
      style={{
        height: '100%',
        display:'flex',
      }}
    > 
      <ModalAuth 
        visible={showModalAuth} 
        onCancle={()=>setShowModalAuth(false)}
        onSuccess={loginSuccess}
      ></ModalAuth>
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
            <Button mode="contained" onPress={onConfirm}>
              登录
            </Button>
          </View>
      </View>
    </View>
  )
}