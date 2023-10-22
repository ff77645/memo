import React from "react";
import {
    View,
    Text,
} from 'react-native'
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Record from "../Record";
import DrawerContent from './DrawerContent'
import Icon from 'react-native-vector-icons/Ionicons'
import Empty from "../../components/Empty";

const Drawer = createDrawerNavigator();


const fixedScreens =[
    {
        name:'存档',
        component:Feed,
        options:{
            title:'util',
            drawerLabel:'存档',
            drawerIcon({focused,color,size}){
                return (<Icon name="file-tray-full-outline" color={color} size={size} />)
            },
        },
    },
    {
        name:'回收站',
        component:Feed,
        options:{
            title:'util',
            drawerLabel:'回收站',
            drawerIcon({focused,color,size}){
                return (<Icon name="trash-outline" color={color} size={size} />)
            },
        },
    },
    // {
    //     name:'编辑标签',
    //     component:Redirect,
    //     options:{
    //         title:'system',
    //         drawerLabel:'编辑标签',
    //         drawerIcon({focused,color,size}){
    //             return (<Icon name="create-outline" color={color} size={size} />)
    //         },
    //     },
    // },
    {
        name:'设置',
        component:Article,
        options:{
            title:'system',
            drawerLabel:'设置',
            drawerIcon({focused,color,size}){
                return (<Icon name="settings-outline" color={color} size={size} />)
            },
        },
    },
]

export default function Main({navigation}) {

    const tagCategray = [
        {
            name:'账号',
            key:'acount'
        },
        {
            name:'银行卡',
            key:'bankcard'
        },
    ]

    return (
        <Drawer.Navigator
            defaultStatus="open"
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={DrawerContent}
        >
            <Drawer.Screen
                name="全部"
                initialParams={{
                    type:''
                }}
                component={Record}
                options={{
                    drawerIcon({focused,color,size}){
                        return (<Icon name="bookmarks-outline" color={color} size={size} />)
                    },
                    title:'record',
                    drawerLabel:'全部',
                }}
            />
            {
                tagCategray.map(item=>(
                    <Drawer.Screen
                        key={item.key}
                        name={item.name}
                        initialParams={{
                            type:item.key
                        }}
                        component={Record}
                        options={{
                            drawerIcon({focused,color,size}){
                                return (<Icon name="bookmark-outline" color={color} size={size} />)
                            },
                            title:'record',
                            drawerLabel:item.name,
                        }}
                    />
                ))
            }
            <Drawer.Screen
                name="编辑标签"
                component={Empty}
                options={{
                    title:'system',
                    drawerLabel:'编辑标签',
                    drawerIcon({focused,color,size}){
                        return (<Icon name="create-outline" color={color} size={size} />)
                    },
                }}
                listeners={({navigation:n})=>({
                    drawerItemPress(e){
                        e.preventDefault()
                        n.closeDrawer();
                        navigation.navigate('TagManage')
                    },
                })}
            />
            {
                fixedScreens.map((item,index)=>(
                    <Drawer.Screen
                        key={index}
                        name={item.name}
                        component={item.component}
                        options={item.options}
                    />
                ))
            }
 
            
        </Drawer.Navigator>
    );
}



function Feed() {
    return (
        <View>
            <Text>Feed</Text>
        </View>
    )
}
function Article() {
    return (
        <View>
            <Text>Article</Text>
        </View>
    )
}
function MyHeader({
    title,
    style,
    openDrawer
}) {

    return (
        <View style={[
            style,
            {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'space-between',
            }
        ]}>
            <Button onPress={openDrawer}>打开</Button>
            <Text>{title}</Text>
            <View></View>
        </View>
    )
}

