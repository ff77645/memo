import React,{useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


const Styles = StyleSheet.create({
    headerInner:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:12,
        paddingVertical:6,
    },
    classifyWrap:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        alignItems:'center',
        gap:5,
    },
})

export default function Header({
    categray,
    onSetShowCategray,
    showCategray,
}){
    const handleOption = ()=>{
        console.log(123)
    }
    const clickCategray = ()=>{
        onSetShowCategray(!showCategray)
    }

    return (
        <View>
            <View style={Styles.headerInner}>
                <View style={Styles.headerInnerLeft}>
                    <TouchableWithoutFeedback onPress={clickCategray}>
                        <View style={Styles.classifyWrap}>
                            <Text style={{
                                fontSize:26,
                                fontWeight:'bold',
                                color:'#000',
                            }}>{categray.name}</Text>
                            {
                                showCategray ? 
                                <Icon name="caret-up" size={18} color="#000"></Icon> :
                                <Icon name="caret-down" size={18} color="#000"></Icon>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={{color:"#333"}}>{categray.amount}条记录</Text>
                </View>
                <View style={Styles.headerInnerRight}>
                    <TouchableOpacity onPress={handleOption}>
                        {!showCategray && <Icon name="ellipsis-vertical" size={20} color="#000"></Icon>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
