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
import { ButtonGroup,CheckBox } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Select,
} from '../../components/Form'

console.log({Select});

export default function AddRecord({navigation}){

    const handleBack =()=>{
        navigation.goBack()
    }
    const [categray,setCategray] = useState('')
    const [acount,setAcount] = useState('')
    const [password,setPassword] = useState('')
    const [level,setLevel] = useState(1)
    const [remark,setRemark] = useState('')

    return (
        <View>
            <Header onBack={handleBack}></Header>
            <ScrollView
                style={{
                    padding:12,
                }}
            >
                <FormSelectItem 
                    label="分类"
                    value={categray}
                    onChange={setCategray}
                ></FormSelectItem>
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
function FormSelectItem(props){

    const [location,setLocation] = useState({
        x:0,
        y:0,
        width:0,
        height:0,    
    })
    const [showOptions,setShowOptions] = useState(false)

    const clickMockInput = ({nativeEvent})=>{
        const x = nativeEvent.pageX - nativeEvent.locationX
        const y = nativeEvent.pageY - nativeEvent.locationY + 50
        setLocation({...location,x,y})
        setShowOptions(!showOptions)
    }

    const onLayout = ({nativeEvent})=>{
        const {width,height,x,y} = nativeEvent.layout
        console.log({width,height,x,y});
        setLocation({
            ...location,
            width,
            height,
        })
    }
    const options = [
        {
            label:'name1',
            value:'1',
        },
        {
            label:'name2',
            value:'2',
        },
        {
            label:'name3',
            value:'3',
        },
    ]

    return (
        <FormItem
            label={props.label}
        >
            <Select options={options}></Select>
        </FormItem>
    )
}

/* 


*/
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
                }}
                value={props.value}
                onChange={({nativeEvent})=>props.onChange(nativeEvent.text)}
            ></TextInput>
        </FormItem>
    )
}
function FormItem(props){
    return (
        <View
            style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                paddingVertical:8,
                paddingHorizontal:20,
            }}
        >
            <View
                style={{
                    width:80,
                }}
            >
                <Text
                    style={{
                        fontSize:18,
                        fontWeight:500,
                        color:'#333',
                    }}
                >{props.label}</Text>
            </View>
            {props.children}
        </View>
    )
}

function Header(props){
    const handleBack =()=>{}
    const handleConfirm =()=>{}


    return (
        <View
            style={{
                display:'flex',
                flexDirection:'row',
                flexWrap:'nowrap',
                alignItems:'center',
                justifyContent:'space-between',
                padding:12,
            }}
        >
            <Text 
                style={{
                    color:'#000',
                    fontSize:16,
                }}
                onPress={props.onBack}
            >返回</Text>
            <Text 
                style={{
                    color:'#000',
                    fontSize:16,
                }}
                onPress={handleConfirm}
            >确认</Text>
        </View>
    )
}