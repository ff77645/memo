import React from "react";
import { 
    Text, 
    View,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import BaseHeader from '../../components/BaseHeader'


const flexRowAlignCenterBetween = {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
}
const fontStyle = {
    color:'#fff',
    fontSize:18,
}

export default function Header({
    title,
    goBack,
    onSave,
    backgroundColor,
}){

    const handleOption = ()=>{}

    return (
        <BaseHeader backgroundColor={backgroundColor}>
            <View
                style={[
                    flexRowAlignCenterBetween,
                    {
                        flex:1,
                        paddingHorizontal:20,
                    }
                ]}
            >
                <View
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        flexWrap:'nowrap',
                        alignItems:'center',
                        gap:20,
                    }}
                >
                    <TouchableOpacity onPress={goBack}>
                        <Icon name="close-outline" size={28} color="#fff"></Icon>
                    </TouchableOpacity>
                    <Text
                        style={[
                            fontStyle,
                            {
                                fontWeight:500,
                            }
                        ]}
                    >{title}</Text>
                </View>
                {/* <View>
                    <Text style={fontStyle}>存档</Text>
                </View> */}
            </View>
            <View
                style={{
                    width:60,
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                }}
            >
                {/* <TouchableOpacity onPress={handleOption}>
                    <Icon name="ellipsis-vertical" size={20} color="#fff"></Icon>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={onSave}>
                    <Text
                        style={fontStyle}
                    >保存</Text>
                </TouchableOpacity>
            </View>
        </BaseHeader>
    )
}