import { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  View,
} from 'react-native'
import {TextInput} from 'react-native-paper'
import { useConfig } from '../../hooks';
import {
  authenticateAsync,
} from 'expo-local-authentication'


export default function ModalAuth({onSuccess,onCancle,usePassword,...props}) {

  const [value,setValue] = useState('')
  const [label,setLabel] = useState('')
  const [config] = useConfig()

  const onConfirm = ()=>{
    if(value !== config.password) return setError('密码错误')
    onSuccess()
  }

  const handleAuth = async ()=>{
    const { success } = await authenticateAsync({promptMessage:'验证'})
    if (!success) return
    onSuccess()
  }

  const onShow = ()=>{
    !usePassword && config.biometrics && handleAuth()
  }

  if(!usePassword && config.biometrics){
    return <Modal {...props} onShow={onShow}></Modal>
  }
  
  return (
    <Modal {...props} onShow={onShow}>
      <View
        style={{
          height:'100%',
          display:'flex',
          justifyContent:'center',
          paddingHorizontal:50,
          gap:40,
        }}
      >
        <View>
          <Text
            style={{
              textAlign:'center',
              fontSize:20,
              color:'#333',
            }}
          >输入密码</Text>
        </View>
        <View>
          <TextInput 
            value={value} 
            error={!!label}
            label={label}
            onChangeText={setValue}
            mode="outlined"
          ></TextInput>
        </View>
        <View
          style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:12,
          }}
        >
          <Text
            style={{
              fontSize:16,
              color:'#666',
            }}
            onPress={onCancle}
          >取消</Text>
          <Text
            style={{
              fontSize:16,
              color:'#333',
            }}
            onPress={onConfirm}
          >确认</Text>
        </View>
      </View>
    </Modal>
  );
}