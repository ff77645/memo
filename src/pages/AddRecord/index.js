import React, { useState } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    ToastAndroid,
} from 'react-native'
import {
    Select,
    FormItem,
    CheckBoxGrounp
} from '../../components/Form'
import Header from "./Header";
import {openDatabase} from 'expo-sqlite'
import {executeSql} from '../../utils'

import {safeLevel,categrayOptions} from './mock'

const db = openDatabase('db.db')

export default function AddRecord({navigation,route}){
    console.log('route.params',route.params)
    const [isEdit,setIsEdit] = useState(false)
    
    const [categray,setCategray] = useState('')
    const [acount,setAcount] = useState('')
    const [password,setPassword] = useState('')
    const [level,setLevel] = useState(1)
    const [remark,setRemark] = useState('')
    console.log('isEdit',isEdit)

    const handleBack =()=>{
        navigation.goBack()
    }
    const handleEdit = ()=>{
        setIsEdit(true)
    }
    const handleCancleEdit = ()=>{
        setIsEdit(false)
    }
    const handleConfirm = async ()=>{
        const date = Date.now() + ''
        await executeSql(db,
            `insert into memo_list (type,acount,password,level,remark,create_date,update_date) values (?, ?, ?, ?, ?, ?, ?)`,
            ['noclassify',acount,password,level,remark,date,date]
        ).catch(err=>{
            console.log({err});
        })
        ToastAndroid.showWithGravity('添加成功',ToastAndroid.SHORT,ToastAndroid.CENTER)
        setIsEdit(false)
        navigation.goBack()
    }
    return (
        <View>
            <Header 
                isEdit={isEdit} 
                onBack={handleBack}
                onCancle={handleCancleEdit}
                onConfirm={handleConfirm}
                onEdit={handleEdit}
            ></Header>
            <ScrollView
                style={{
                    padding:12,
                }}
            >
                <FormItem
                    label="分类"
                >
                    <Select
                        disable={!isEdit}
                        options={categrayOptions}
                        onChange={setCategray}
                        value={categray}
                    ></Select>
                </FormItem>
                <FormInputItem 
                    disable={!isEdit}
                    label="账号"
                    value={acount}
                    onChange={setAcount}
                ></FormInputItem>
                <FormInputItem 
                    disable={!isEdit}
                    label="密码"
                    value={password}
                    onChange={setPassword}
                ></FormInputItem>
                <FormButtonGrounpItem 
                    label="等级"
                    value={level}
                    data={safeLevel}
                    disable={!isEdit}
                    onChange={setLevel}
                ></FormButtonGrounpItem>
                <FormInputItem
                    disable={!isEdit}
                    label="备注"
                    value={remark}
                    onChange={setRemark}
                ></FormInputItem>
            </ScrollView>
        </View>
    )
}


function FormButtonGrounpItem({
    value,
    onChange,
    label,
    disable,
    data,
}){
    return (
        <FormItem
            label={label}
        >
            <CheckBoxGrounp
                data={data}
                disable={disable}
                value={value}
                onChange={onChange}
            ></CheckBoxGrounp>
        </FormItem>
    )
}


function FormInputItem({
    label,
    onChange,
    value,
    disable,
}){
    return (
        <FormItem
            label={label}
        >
            <TextInput
                editable={!disable}
                style={{
                    backgroundColor:'#fff',
                    borderRadius:6,
                    flex:1,
                    paddingHorizontal:10,
                }}
                value={value}
                onChange={({nativeEvent})=>onChange(nativeEvent.text)}
            ></TextInput>
        </FormItem>
    )
}

