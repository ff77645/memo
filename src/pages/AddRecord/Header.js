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
  const handleBack = () => { }
  const handleConfirm = () => { }


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

      {
        isEdit ? <Text
          style={{
            color: '#000',
            fontSize: 16,
          }}
          onPress={onBack}
        >取消</Text> : <Text
          style={{
            color: '#000',
            fontSize: 16,
          }}
          onPress={onBack}
        >返回</Text>
      }
      {
        isEdit ? <Text
          style={{
            color: '#000',
            fontSize: 16,
          }}
          onPress={handleConfirm}
        >确认</Text> :
          <Text
            style={{
              color: '#000',
              fontSize: 16,
            }}
            onPress={handleConfirm}
          >编辑</Text>
      }
    </View>
  )
}