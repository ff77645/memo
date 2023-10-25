import React,{
  useState,
  useEffect,
} from "react";
import {
  View,
  TouchableOpacity,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native'
import Header from "./Header";
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {openDatabase} from 'expo-sqlite'
import {executeSql} from '../../utils'
import IconButton from "../../components/IconButton";
import {setStringAsync} from 'expo-clipboard'
import {
  authenticateAsync,
  getEnrolledLevelAsync,
  hasHardwareAsync,
} from 'expo-local-authentication'

const formDataRaw = {
  title:'',
  acount:'',
  userName:'',
  password:'',
  url:'',
  desc:'',
}

const formCheckStateRaw = {
  title:false,
}

const db = openDatabase('db.db')


export default function RecordAdd({ navigation,route }) {
  const [formData,setFormData] = useState(formDataRaw)
  const [formCheckState,setFormCheckState] = useState(formCheckStateRaw)
  const [isDisable,setIsDisable] = useState(()=>{
    if(!route.params || !route.params.id) return false
    return true
  })
  const [opreationType,setOpreationType] = useState(isDisable ? 'preview' : 'edit')

  const goBack = () => {
    navigation.goBack()
  }

  const getData = async (id)=>{
    console.log('getData',id);
    const data = await executeSql(db,`select * from records where id = ?`,[id])
    const res = data._array[0]
    console.log({res});
    setFormData(res)
  }
  
  const onChangeFormData = (field,value) =>{
    setFormData({
      ...formData,
      [field]:value
    })
  }

  const inputProps = {
    mode:'outlined',
    editable:!isDisable,
  }

  const passwordRefresh = ()=>{
    // const val = Math.floor(Math.random() * 10000000 + Math.random() * 1000) + ''
    // onChangeFormData('password',val)
  }

  // 字段检查
  const checkField = ()=>{
    if(!formData.title){
      setFormCheckState({
        ...formCheckState,
        title:true,
      })
      return false
    }else if(formCheckState.title){
      setFormCheckState({
        ...formCheckState,
        title:false,
      })
    }
    return true
  }

  const handleSave = async ()=>{
    if(!checkField()) return
    const date = Date.now() + ''
    const {title,acount,userName,password,url,desc} = formData
    console.log('route.params.type',route.params.type);
    // 有id修改 无id添加
    if(route.params && route.params.id){
      await executeSql(db,
        `update records set title=?,acount=?,userName=?,password=?,url=?,desc=?,update_date=? where id = ?`,
        [title,acount,userName,password,url,desc,date,route.params.id]
      )
      ToastAndroid.showWithGravity('修改成功',ToastAndroid.SHORT,ToastAndroid.CENTER)
    }else{
      await executeSql(db,
        `insert into records (type,title,acount,userName,password,url,desc,create_date,update_date) values (?,?,?,?,?,?,?,?,?)`,
        [route.params.type,title,acount,userName,password,url,desc,date,date]
      )
      ToastAndroid.showWithGravity('添加成功',ToastAndroid.SHORT,ToastAndroid.CENTER)
    }
    navigation.goBack()
  }

  const handleDeleteRecord =async ()=>{
    await executeSql(db,
      `delete from records where id = ?`,
        [route.params.id]
    )
    ToastAndroid.showWithGravity('删除成功',ToastAndroid.SHORT,ToastAndroid.CENTER)
    navigation.goBack()
  }
  
  
  const changeType= type =>{
    setIsDisable(type === 'preview')
    setOpreationType(type)
  }

  const deleteField = field=>{
    onChangeFormData(field,undefined)
  }

  useEffect(()=>{
    route.params && route.params.id && getData(route.params.id)
  },[])
  const [showPassword,setShowpassword] = useState(false)
  const handleRefreshPassword = ()=>{

  }
  const onToggleVisible = async ()=>{
    setShowpassword(!showPassword)
    const auth = await hasHardwareAsync()
    console.log({auth});
  }
  const handleCopy = async ()=>{
    await setStringAsync(formData.password)
    ToastAndroid.show('复制成功',ToastAndroid.SHORT)
  }
  const passwordRight = ()=>{
    if(isDisable) return <PasswordRightOnDisable visible={showPassword} onCopye={handleCopy} onToggleVisible={onToggleVisible}/>
    return (<IconButton style={{marginRight:-30}} onPress={handleRefreshPassword} name="sync-outline" size={20}/>)
  }

  return (
    <View>
      <Header 
        goBack={goBack} 
        title={formData.title} 
        onSave={handleSave} 
        type={opreationType}
        onSetType={changeType}
        onDelete={handleDeleteRecord}
      ></Header>
      {/* <InputItem onDelete={()=>deleteField('title')} field={formData.title} disable={isDisable}> */}
      <InputItem field={'true'} disable={true}>
        <TextInput
          {...inputProps}
          label="标题"
          error={formCheckState.title}
          value={formData.title}
          onChangeText={val=>onChangeFormData('title',val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={()=>deleteField('acount')} field={formData.acount} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="账户"
          value={formData.acount}
          onChangeText={val=>onChangeFormData('acount',val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={()=>deleteField('userName')} field={formData.userName} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="用户名"
          value={formData.userName}
          onChangeText={val=>onChangeFormData('userName',val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={()=>deleteField('password')} field={formData.password} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="密码"
          secureTextEntry={!showPassword}
          value={formData.password}
          right={<TextInput.Icon rippleColor="transparent" style={{
            width:90,
            paddingRight:25,
          }} icon={passwordRight}/>}
          onChangeText={val=>onChangeFormData('password',val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={()=>deleteField('url')} field={formData.url} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="网址"
          value={formData.url}
          onChangeText={val=>onChangeFormData('url',val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={()=>deleteField('desc')} field={formData.desc} disable={isDisable}>
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

function PasswordRightOnDisable({
  onCopye,
  visible,
  onToggleVisible,
}){

  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        alignItems:'center',
        gap:10,
      }}
    >
      <IconButton onPress={onToggleVisible} name={visible ? 'eye-off-outline' : 'eye-outline'} size={20}></IconButton>
      <IconButton  onPress={onCopye} name="copy-outline" size={20}></IconButton>
    </View>
  )
}

function InputItem({
  disable,
  field,
  children,
  onDelete,
}){
  // 预览模式: 字段为falsy 则不显示
  // 编辑模式: 字段为undefined 则不显示
  if(disable ? !field : field === undefined ) return (<View></View>)
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
        !disable && <TouchableOpacity onPress={onDelete}>
          <Icon name="close-circle-outline" size={26}></Icon>
        </TouchableOpacity>
      }
    </View>
  )
}