import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native'
import Header from "./Header";
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { openDatabase } from 'expo-sqlite'
import { executeSql } from '../../utils'
import IconButton from "../../components/IconButton";
import { setStringAsync } from 'expo-clipboard'
import { randomUUID } from 'expo-crypto'
import { generateRandomPassword, encryptPassword, decryptPassword } from '../../utils'
import { useConfig } from "../../hooks";
import ModalAuth from "../../components/ModalAuth";
import Share from 'react-native-share'
// import {shareAsync} from 'expo-sharing'
// import * as FileSystem from 'expo-file-system'

const formDataRaw = {
  title: '',
  acount: '',
  userName: '',
  password: '',
  url: '',
  desc: '',
}

const formCheckStateRaw = {
  title: false,
}

const db = openDatabase('db.db')
const generatePassword = {
  length: 8,
  hasSpecial: false,
  times: 0,
}

export default function RecordAdd({ navigation, route }) {
  const [formData, setFormData] = useState(formDataRaw)
  const [formCheckState, setFormCheckState] = useState(formCheckStateRaw)
  const [isDisable, setIsDisable] = useState(() => {
    if (!route.params || !route.params.id) return false
    return true
  })
  const [opreationType, setOpreationType] = useState(()=>{
    if(route.params.tag_id === '1') return 'readOnly'
    return isDisable ? 'preview' : 'edit'
  })
  const [config] = useConfig()
  const isVerified = useRef(false)

  const goBack = () => {
    navigation.goBack()
  }

  const getData = async (id) => {
    console.log('getData', id);
    const data = await executeSql(db, `select * from records where id = ?`, [id])
    const res = data._array[0]
    console.log({ res });
    res.password = decryptPassword(res.password,config.password)
    setFormData(res)
  }

  const onChangeFormData = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const inputProps = {
    mode: 'outlined',
    editable: !isDisable,
  }

  const passwordRefresh = async () => {
    const password = generateRandomPassword(generatePassword.length, generatePassword.hasSpecial)
    console.log({ password });
    if (generatePassword.times++ >= 1) {
      generatePassword.length = generatePassword.length === 8 ? 12 : 8
      generatePassword.times = 0
    }
    generatePassword.hasSpecial = !generatePassword.hasSpecial
    onChangeFormData('password', password)
  }

  // 字段检查
  const checkField = () => {
    if (!formData.title) {
      setFormCheckState({
        ...formCheckState,
        title: true,
      })
      return false
    } else if (formCheckState.title) {
      setFormCheckState({
        ...formCheckState,
        title: false,
      })
    }
    return true
  }

  const handleSave = async () => {
    if (!checkField()) return
    const date = Date.now() + ''
    const { title, acount, userName, password, url, desc } = formData
    const encryptedPsd = encryptPassword(password, config.password)
    // 有id修改 无id添加
    if (route.params && route.params.id) {
      await executeSql(db,
        `update records set title=?,acount=?,userName=?,password=?,url=?,desc=?,update_date=? where id = ?`,
        [title, acount, userName, encryptedPsd, url, desc, date, route.params.id]
      )
      ToastAndroid.showWithGravity('修改成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
    } else {
      const id = randomUUID()
      await executeSql(db,
        `insert into records (id,tag_id,title,acount,userName,password,url,desc,create_date,update_date,is_delete) values (?,?,?,?,?,?,?,?,?,?,?)`,
        [id, route.params.tag_id, title, acount, userName, encryptedPsd, url, desc, date, date,0]
      )
      ToastAndroid.showWithGravity('添加成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
    navigation.goBack()
  }

  const handleDeleteRecord = async () => {
    if(opreationType === 'preview'){
      await executeSql(db,
        `update records set is_delete=? where id = ?`,
        [1,route.params.id]
      )
    }else{
      await executeSql(db,
        `delete from records where id = ?`,
        [route.params.id]
      )
    }
    ToastAndroid.showWithGravity('删除成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
    navigation.goBack()
  }

  const onRestore = async ()=>{
    await executeSql(db,
      `update records set is_delete=? where id = ?`,
      [0,route.params.id]
    )
    ToastAndroid.showWithGravity('恢复成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
    navigation.goBack()
  }

  const deletePrompt = ()=>{
    Alert.alert(
      "删除记录",
      `确认${opreationType === 'readOnly' ? '永久' : ''}删除当前记录吗?`,
      [
        {
          text:'取消',
          style:'cancel',
        },
        {
          text:'确认',
          onPress:handleDeleteRecord
        }
      ]
    )
  }


  

  const deleteField = field => {
    onChangeFormData(field, undefined)
  }

  useEffect(() => {
    route.params && route.params.id && getData(route.params.id)
  }, [])

  const [showPassword, setShowpassword] = useState(false)
  const [showModalAuth,setShowModalAuth] = useState(false)
  const [authAction,setAuthAction] = useState('')
  const onToggleVisible = async () => {
    if (isVerified.current || showPassword) return setShowpassword(!showPassword)
    setShowModalAuth(true)
    setAuthAction('showPassword')
  }
  const handleCopy = async () => {
    if(isDisable && !isVerified.current){
      setShowModalAuth(true)
      setAuthAction('copyPassword')
      return
    }
    await setStringAsync(formData.password)
    ToastAndroid.show('复制成功', ToastAndroid.SHORT)
  }

  const onEdit = () => {
    if(isVerified.current){
      setIsDisable(false)
      setOpreationType('edit')
    }else{
      setAuthAction('edit')
      setShowModalAuth(true)
    }
  }

  const onAuthSuccess = async ()=>{
    isVerified.current = true
    setShowModalAuth(false)
    if(authAction === 'showPassword'){
      setShowpassword(!showPassword)
    }else if(authAction === 'copyPassword'){
      await setStringAsync(formData.password)
      ToastAndroid.show('复制成功', ToastAndroid.SHORT)
    }else if(authAction === 'edit'){
      setIsDisable(false)
      setOpreationType('edit')
    }
  }

  const onShare =  ()=>{
    let str = ``
    str += `标题:${formData.title} \n\t`
    str += `账户:${formData.acount} \n\t`
    str += `用户名:${formData.userName} \n\t`
    str += `密码:${formData.password} \n\t`
    str += `网址:${formData.url} \n\t`
    str += `描述:${formData.desc} \n\t`
    Share.open({
      url:str,
    })
    .then(res=>{
      console.log({res});
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <View>
      <ModalAuth 
        visible={showModalAuth} 
        onCancle={()=>setShowModalAuth(false)}
        onSuccess={onAuthSuccess}
      ></ModalAuth>
      <Header
        goBack={goBack}
        title={formData.title}
        onSave={handleSave}
        type={opreationType}
        onEdit={onEdit}
        onDelete={deletePrompt}
        onRestore={onRestore}
        onShare={onShare}
      ></Header>
      {/* <InputItem onDelete={()=>deleteField('title')} field={formData.title} disable={isDisable}> */}
      <InputItem field={'true'} disable={true}>
        <TextInput
          {...inputProps}
          label="标题"
          error={formCheckState.title}
          value={formData.title}
          onChangeText={val => onChangeFormData('title', val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={() => deleteField('acount')} field={formData.acount} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="账户"
          value={formData.acount}
          onChangeText={val => onChangeFormData('acount', val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={() => deleteField('userName')} field={formData.userName} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="用户名"
          value={formData.userName}
          onChangeText={val => onChangeFormData('userName', val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={() => deleteField('password')} field={formData.password} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="密码"
          keyboardType={isDisable ? 'default' : 'visible-password'}
          secureTextEntry={isDisable && !showPassword}
          value={showPassword || !isDisable ? formData.password : '000000'}
          right={<TextInput.Icon 
            rippleColor="transparent" 
            style={{
              width: 90,
              paddingRight: 25,
            }} 
            icon={() =>(
                <PasswordRight 
                  visible={showPassword} 
                  isEdit={!isDisable} 
                  onCopye={handleCopy} 
                  onRefresh={passwordRefresh} 
                  onToggleVisible={onToggleVisible} 
                />
            )}/>
          }
          onChangeText={val => onChangeFormData('password', val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={() => deleteField('url')} field={formData.url} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="网址"
          value={formData.url}
          onChangeText={val => onChangeFormData('url', val)}
        ></TextInput>
      </InputItem>
      <InputItem onDelete={() => deleteField('desc')} field={formData.desc} disable={isDisable}>
        <TextInput
          {...inputProps}
          label="描述"
          value={formData.desc}
          onChangeText={val => onChangeFormData('desc', val)}
        ></TextInput>
      </InputItem>
    </View>
  )
}

function PasswordRight({
  onCopye,
  visible,
  isEdit,
  onRefresh,
  onToggleVisible,
}) {

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {
        isEdit ? <IconButton onPress={onRefresh} name="sync-outline" size={20} />
          : <IconButton onPress={onToggleVisible} name={visible ? 'eye-off-outline' : 'eye-outline'} size={20}></IconButton>
      }
      <IconButton onPress={onCopye} name="copy-outline" size={20}></IconButton>
    </View>
  )
}

function InputItem({
  disable,
  field,
  children,
  onDelete,
}) {
  // 预览模式: 字段为falsy 则不显示
  // 编辑模式: 字段为undefined 则不显示
  if (disable ? !field : field === undefined) return (<View></View>)
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 20,
      }}
    >
      <View style={{ flex: 1 }}>
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