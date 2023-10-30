import React, { useState } from "react";
import Header from "../../TagManage/Header";
import { View,Text } from "react-native";
import {
  List,
  Switch,
} from 'react-native-paper';



export default function Safe({navigation}){

  const [isFashLogin,setIsFastLogin] = useState(false)
  const [isAutoLoginOut,setIsAutoLoginOut] = useState(false)
  const [isHoldLightUp,setIsHoldLightUp] = useState(false)
  const [isAllowScreenshot,setIsAllowScreenshot] = useState(false)
  const [isBiometrics,setIsBiometrics] = useState(false)

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
      }}
    >
      <Header title="安全" onBack={()=>navigation.goBack()}/>
      <View>
        <View
          style={{
            paddingLeft:50,
            borderBottomWidth:1,
            borderColor:'#AEAEAE',
            borderStyle:'solid',
          }}
        >
          <List.Item title="数据库" titleStyle={{
            color:'#c23616',
          }}></List.Item>
          <List.Item title="更改主密码"></List.Item>
          <List.Item 
            title="快速登陆"
            right={()=><Switch value={isFashLogin} onValueChange={()=>setIsFastLogin(!isFashLogin)} color="#c23616"></Switch>}
          ></List.Item>
          <List.Item 
            title="自动退出" 
            description={()=><Text>当在屏幕关闭或在60秒后进入后台时</Text>}
            right={()=><Switch value={isAutoLoginOut} onValueChange={()=>setIsAutoLoginOut(!isAutoLoginOut)} color="#c23616"></Switch>}
          ></List.Item>
          <List.Item 
            title="保持亮屏" 
            description={()=><Text>当浏览或编辑条目时屏幕不进入休眠状态</Text>}
            right={()=><Switch value={isHoldLightUp} onValueChange={()=>setIsHoldLightUp(!isHoldLightUp)} color="#c23616"></Switch>}
          ></List.Item>
          <List.Item 
            title="允许截图" 
            right={()=><Switch value={isAllowScreenshot} onValueChange={()=>setIsAllowScreenshot(!isAllowScreenshot)} color="#c23616"></Switch>}
          ></List.Item>
        </View>
        <View
          style={{
            paddingLeft:50,
          }}
        >
          <List.Item 
            title="生物认证" 
            right={()=><Switch value={isBiometrics} onValueChange={()=>setIsBiometrics(!isBiometrics)} color="#c23616"></Switch>}
          ></List.Item>
          <List.Item 
            title="清除剪切板" 
            description={()=><Text>从不</Text>}
            ></List.Item>
          <List.Item 
            title="密码尝试次数" 
            description={()=><Text>无限次</Text>}
          ></List.Item>
        </View>
      </View>
    </View>
  )
}