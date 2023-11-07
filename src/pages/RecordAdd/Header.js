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
                type !== 'edit' ? <Preview {...props} type={type} /> : <EditView {...props} />
            }
        </BaseHeader>
    )
}

function Preview({
    title,
    goBack,
    type,
    onSave,
    onSetType,
    onDelete,
    onRestore,
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
                    paddingHorizontal:10,
                }
            ]}
        >
            <View
                style={{
                    display:'flex',
                    flexDirection:'row',
                    flexWrap:'nowrap',
                    alignItems:'center',
                    gap:10,
                }}
            >
                <IconButton onPress={goBack} name="arrow-back-outline" size={26} color="#fff"></IconButton>
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
                paddingRight:10,
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
            }}
        >
            <IconButton onPress={() => setVisible(true)} name="ellipsis-vertical" size={20} color="#fff"></IconButton>
        </View>
        <ModalAction transparent visible={visible} onClose={() => setVisible(false)}>
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
                {/* <List.Item title="清除历史记录" /> */}
                <List.Item title="分享" onPress={handleShare} />
                {
                    type === 'readOnly' ? <List.Item title="恢复" onPress={onRestore} /> : <List.Item title="编辑" onPress={handleEdit} />
                }
                 <List.Item title="删除" onPress={()=>{
                    setVisible(false)
                    onDelete()
                }} />
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
                        paddingHorizontal:10,
                    }
                ]}
            >
                <View
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        flexWrap:'nowrap',
                        alignItems:'center',
                        gap:10,
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
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    paddingRight:16,
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