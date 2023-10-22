import React,{
    useState,
} from "react";
import { 
    Text, 
    View,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import BaseHeader from '../../components/BaseHeader'
import ModalAction from '../../components/ModalAction'
import {List} from 'react-native-paper'

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
    backgroundColor,
    type,
    ...props
}){


    return (
        <BaseHeader backgroundColor={backgroundColor}>
            {
                type === 'preview' ? <Preview {...props} /> : <EditView {...props} />
            }
        </BaseHeader>
    )
}

function Preview({
    title,
    goBack,
    onSave,
    onSetType,
    onDelete,
}){
    const [visible, setVisible] = useState(false);

    const handleEdit = ()=>{
        onSetType('edit')
    }
    const handleShare = ()=>{}
    return (
        <>
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
                    <Icon name="arrow-back-outline" size={28} color="#fff"></Icon>
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
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon name="ellipsis-vertical" size={20} color="#fff"></Icon>
            </TouchableOpacity>
        </View>
        <ModalAction visible={visible} onClose={() => setVisible(false)}>
            <View
                style={{
                    position:'absolute',
                    right:0,
                    top:0,
                    padding:10,
                    backgroundColor:'#fff',
                    borderRadius:6,
                }}
            >
                <List.Item title="清除历史记录" />
                <List.Item title="删除" onPress={onDelete} />
                <List.Item title="编辑" onPress={handleEdit} />
                <List.Item title="分享" onPress={handleShare} />
            </View>
        </ModalAction>
    </>
    )
}

function EditView({
    title,
    goBack,
    onSave,
}){
    return (
        <>
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
        </>
    )
}