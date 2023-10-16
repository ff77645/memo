import React, { useState } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native'
import { CheckBox } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Select,
    FormItem,
} from '../../components/Form'
import Header from "./Header";


export default function AddRecord({navigation}){
    const [isEdit,setIsEdit] = useState(false)
    const handleBack =()=>{
        navigation.goBack()
    }
    const [categray,setCategray] = useState('')
    const [acount,setAcount] = useState('')
    const [password,setPassword] = useState('')
    const [level,setLevel] = useState(1)
    const [remark,setRemark] = useState('')
    const categrayOptions = [
        {
            label:'类别一',
            value:'1',
        },
        {
            label:'类别二',
            value:'2',
        },
    ]
    return (
        <View>
            <Header isEdit={isEdit} onBack={handleBack}></Header>
            <ScrollView
                style={{
                    padding:12,
                }}
            >
                <FormItem
                    label="分类"
                >
                    <Select
                        options={categrayOptions}
                        onChange={setCategray}
                        value={categray}
                    ></Select>
                </FormItem>
                <FormInputItem 
                    label="账号"
                    value={acount}
                    onChange={setAcount}
                ></FormInputItem>
                <FormInputItem 
                    label="密码"
                    value={password}
                    onChange={setPassword}
                ></FormInputItem>
                <FormButtonGrounpItem 
                    label="等级"
                    value={level}
                    onChange={setLevel}
                ></FormButtonGrounpItem>
                <FormInputItem 
                    label="备注"
                    value={remark}
                    onChange={setRemark}
                ></FormInputItem>
            </ScrollView>
        </View>
    )
}


function FormButtonGrounpItem(props){
    const box = [
        {
            value:0,
            title:'低',
            color:'#00ff00',
        },
        {
            value:1,
            title:'中',
            color:'#ffff00',
        },
        {
            value:2,
            title:'高',
            color:'#ff0000',
        },
    ]
    const containerStyle = {
        backgroundColor:'transparent'
    }
    return (
        <FormItem
            label={props.label}
        >
            {
                box.map(item=>(
                    <CheckBox
                        key={item.value}
                        checked={props.value === item.value}
                        onPress={() => props.onChange(item.value)}
                        containerStyle={containerStyle}
                        title={item.title}
                        checkedIcon={
                            <Icon name="radio-button-on-outline" size={16} color={item.color} />
                        }
                        uncheckedIcon={
                            <Icon name="radio-button-off-outline" size={16}  />
                        }
                    />
                ))
            }
        </FormItem>
    )
}


function FormInputItem(props){
    return (
        <FormItem
            label={props.label}
        >
            <TextInput
                style={{
                    backgroundColor:'#fff',
                    borderRadius:6,
                    flex:1,
                    paddingHorizontal:10,
                }}
                value={props.value}
                onChange={({nativeEvent})=>props.onChange(nativeEvent.text)}
            ></TextInput>
        </FormItem>
    )
}

