import React, {
  useState,
} from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'





export function Select({
  options,
}) {

  const [showOptions, setShowOptions] = useState(false)
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const clickSelect = ({ nativeEvent }) => {
    const x = nativeEvent.pageX - nativeEvent.locationX
    const y = nativeEvent.pageY - nativeEvent.locationY + 50
    setLocation({ ...location, x, y })
    setShowOptions(!showOptions)
  }

  const clickOptions = e =>{
    e.stopPropagation()
    consol.log(e.target)
  }

  const onLayout = ({ nativeEvent }) => {
    const { width, height, x, y } = nativeEvent.layout
    console.log({ width, height, x, y });
    setLocation({
      ...location,
      width,
      height,
    })
  }

  return (
    <>
      <TouchableWithoutFeedback
        onPress={clickSelect}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 6,
            height: 50,
          }}
          onLayout={onLayout}
        >
          <Text
            style={{
              lineHeight: 50,
            }}
          >
            Select Value
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={showOptions}
        transparent
      >
        <TouchableWithoutFeedback
          onPress={() => setShowOptions(false)}
        >
          <View
            style={{
              height: '100%',
              position: 'relative',
            }}
          >
            <TouchableWithoutFeedback
              onPress={clickOptions}
            >
              <View
                style={{
                  position: 'absolute',
                  top: location.y,
                  left: location.x,
                  width: location.width,
                  backgroundColor: '#fff',
                  borderRadius: 6,
                }}
              >
                {
                  options.map(item => (
                    <View
                      style={{
                        paddingVertical: 6,
                      }}
                    >
                      <Text
                        style={{
                          color: '#000',
                        }}
                      >{item.label}</Text>
                    </View>
                  ))
                }
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}
