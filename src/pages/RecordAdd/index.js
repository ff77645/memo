import React,{
  useState,
} from "react";
import {
  View,
  TouchableOpacity,
} from 'react-native'
import Header from "./Header";
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';


const formDataRaw = {
  title:'',
  acount:'',
  userName:'',
  password:'',
  url:'',
  desc:'',
}

export default function RecordAdd({ navigation }) {
  const [formData,setFormData] = useState(formDataRaw)
  const [isDisable,setIsDisable] = useState(true)
  const goBack = () => {
    navigation.goBack()
  }
  
  const onChangeFormData = (field,value) =>{
    setFormData({
      ...formData,
      [field]:value
    })
  }

  const inputProps = {
    mode:'outlined'
  }

  const passwordRefresh = ()=>{
    // const val = Math.floor(Math.random() * 10000000 + Math.random() * 1000) + ''
    // onChangeFormData('password',val)
  }


  const handleSave = ()=>{
    console.log('handleSave');
  }

  return (
    <View>
      <Header goBack={goBack} onSave={handleSave} ></Header>
      <InputItem disable={isDisable}>
        <TextInput
          {...inputProps}
          label="标题"
          value={formData.title}
          onChangeText={val=>onChangeFormData('title',val)}
        ></TextInput>
      </InputItem>
      <InputItem disable={isDisable}>
        <TextInput
          {...inputProps}
          label="账户"
          value={formData.acount}
          onChangeText={val=>onChangeFormData('acount',val)}
        ></TextInput>
      </InputItem>
      <InputItem disable={isDisable}>
        <TextInput
          {...inputProps}
          label="用户名"
          value={formData.userName}
          onChangeText={val=>onChangeFormData('userName',val)}
        ></TextInput>
      </InputItem>
      <InputItem disable={isDisable}>
        <TextInput
          {...inputProps}
          label="密码"
          secureTextEntry={false}
          value={formData.password}
          right={<TextInput.Icon onPress={passwordRefresh} icon={isDisable ? 'eye' : ()=>(<Icon name="sync-outline" size={20}/>)}/>}
          onChangeText={val=>onChangeFormData('password',val)}
        ></TextInput>
      </InputItem>
      <InputItem disable={isDisable}>
        <TextInput
          {...inputProps}
          label="网址"
          value={formData.url}
          onChangeText={val=>onChangeFormData('url',val)}
        ></TextInput>
      </InputItem>
      <InputItem disable={isDisable}>
        <TextInput
          {...inputProps}
          label="描述"
          value={formData.desc}
          onChangeText={val=>onChangeFormData('desc',val)}
        ></TextInput>
      </InputItem>
    </View>
  )
}

function InputItem({
  disable,
  children,
}){
  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        gap:20,
      }}      
    >
      <View style={{flex:1}}>
        {children}
      </View>
      {
        !disable && <TouchableOpacity>
          <Icon name="close-circle-outline" size={26}></Icon>
        </TouchableOpacity>
      }
    </View>
  )
}