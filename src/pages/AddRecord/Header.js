import React from "react"
import {
  View,
  Text,
} from 'react-native'

export default function Header({
  isEdit,
  onBack,
  onCancle,
  onConfirm,
  onEdit,
}) {

  const handleLeft = ()=>{
    isEdit ? onCancle() : onBack()
  }

  const handleRight = ()=>{
    console.log({isEdit});
    isEdit ? onConfirm() : onEdit()
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
      }}
    >
      <Text
        style={{
          color: '#000',
          fontSize: 16,
        }}
        onPress={handleLeft}
      >{isEdit ? "取消" : "返回"}</Text>
      <Text
        style={{
          color: '#000',
          fontSize: 16,
        }}
        onPress={handleRight}
      >{isEdit ? "确认" : "编辑"}</Text>
    </View>
  )
}