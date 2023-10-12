import React, { useState } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
} from 'react-native'


export default function AddRecord(){




    return (
        <View>
            <Header></Header>
            <View
                style={{
                    padding:12,
                }}
            >
                <FormItem></FormItem>
                <FormItem></FormItem>
            </View>
        </View>
    )
}

function FormItem(){
    const [service,setService] = useState('')

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
                >分类分类</Text>
            </View>
            <TextInput
                style={{
                    backgroundColor:'#fff',
                    borderRadius:6,
                    flex:1,
                }}
            ></TextInput>
        </View>
    )
}

function Header(){

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
                onPress={handleBack}
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