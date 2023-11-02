import React, { useState } from "react";
import {
  Text,
  View,
  ToastAndroid,
} from 'react-native'
import {
  TextInput,
  Button,
} from 'react-native-paper'
import BaseHeader from "../../components/BaseHeader";
import { useConfig } from "../../hooks";





export default function LoginFirst({ navigation }) {

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [config,setConfig] = useConfig()
  const onConfirm = () => {
    if(!password) return
    if(password !== passwordConfirm) return ToastAndroid.show('两次密码不一致',ToastAndroid.SHORT)
    setConfig({
      ...config,
      loginDate:Date.now(),
      password
    })
    navigation.reset({
      index:0,
      routes:[{name:'Main'}]
    })
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
          }}>设置主密码</Text>
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
            label='主密码'
            value={password}
            onChangeText={setPassword}
          ></TextInput>
          <TextInput
            style={{
              marginTop:10,
            }}
            mode='outlined'
            secureTextEntry={true}
            label='确认主密码'
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
          ></TextInput>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop:20,
          }}
          >
            <Button mode="contained" onPress={onConfirm}>
              确认
            </Button>
          </View>
      </View>
    </View>
  )
}