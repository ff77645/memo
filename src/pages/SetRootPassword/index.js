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
import IconButton from "../../components/IconButton";


export default function SetRootPassword({ navigation,route }) {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [config,setConfig] = useConfig()
  const {action} = route.params
  const isReset = action === 'resetPassword'

  const handleSet = ()=>{
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

  const handleReset = ()=>{

  }

  const onConfirm = () => {
    if(!password) return
    if(password !== passwordConfirm) return ToastAndroid.show('两次密码不一致',ToastAndroid.SHORT)
    isReset ? handleReset() : handleSet()
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
            gap:10,
          }}
        >
          {
            isReset && <IconButton onPress={()=>navigation.goBack()} name="arrow-back-outline" size={26} color="#fff"></IconButton>
          }
          <Text style={{
            fontSize: 24,
            color:'#fff',
          }}>{isReset ? "修改" : "设置"}主密码</Text>
        </View>
      </BaseHeader>
      <View
        style={{
          paddingHorizontal:20,
          flex:1,
          paddingTop:50,
        }}
      >   
          {
            isReset && <TextInput
                style={{
                  marginBottom:10,
                }}
                mode='outlined'
                secureTextEntry
                label='原密码'
                value={oldPassword}
                onChangeText={setOldPassword}
              ></TextInput>
          }
          <TextInput
            style={{
              marginBottom:10,
            }}
            mode='outlined'
            secureTextEntry
            label={isReset ? '新密码' : '主密码'}
            value={password}
            onChangeText={setPassword}
          ></TextInput>
          <TextInput
            style={{
              marginBottom:10,
            }}
            mode='outlined'
            secureTextEntry
            label={isReset ? '确认新密码' : '确认主密码'}
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