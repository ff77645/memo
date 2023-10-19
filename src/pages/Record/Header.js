import React from "react";
import { 
    Text, 
    View,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


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
    openDrawer,
    title,
}){

    const handleOption = ()=>{}

    return (
        <View
            style={[
                flexRowAlignCenterBetween,
                {
                    height:50,   
                    backgroundColor:'#0984e3',
                }
            ]}
        >
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
                    <TouchableOpacity onPress={openDrawer}>
                        <Icon name="menu-outline" size={20} color="#fff"></Icon>
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
                <TouchableOpacity onPress={handleOption}>
                    <Icon name="search-outline" size={20} color="#fff"></Icon>
                </TouchableOpacity>
            </View>
            <View
                style={[
                    {
                        width:60,
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'center',
                    }
                ]}
            >
                <TouchableOpacity onPress={handleOption}>
                    <Icon name="ellipsis-vertical" size={20} color="#fff"></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}