import React,{
    useState,
} from "react";
import { 
    Text, 
    View,
} from "react-native";
import BaseHeader from '../../components/BaseHeader'
import ModalAction from '../../components/ModalAction'
import {List} from 'react-native-paper'
import IconButton from "../../components/IconButton";

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
                <IconButton onPress={goBack} name="arrow-back-outline" size={28} color="#fff"></IconButton>
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
            <IconButton onPress={() => setVisible(true)} name="ellipsis-vertical" size={20} color="#fff"></IconButton>
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
                    <IconButton onPress={goBack} name="close-outline" size={28} color="#fff"></IconButton>
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
                <Text
                    onPress={onSave}
                    style={fontStyle}
                >保存</Text>
            </View>
        </>
    )
}