import React,{
    useCallback,
    useState,
} from "react";
import {
    View,
    Text,
} from 'react-native'
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import Record from "../Record";
import DrawerContent from './DrawerContent'
import Icon from 'react-native-vector-icons/Ionicons'
import Empty from "../../components/Empty";
import {openDatabase} from 'expo-sqlite'
import {executeSql} from '../../utils'
import { dbName } from "../../config/config";
import {useFocusEffect} from '@react-navigation/native'

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
]

const db = openDatabase(dbName)

export default function Main({navigation}) {

    const [tags,setTags] = useState([])
    const getTags = async ()=>{
        const data = await executeSql(db,`select * from tags`)
        setTags(data._array)
    }
    useFocusEffect(useCallback(()=>{
        getTags()
    },[]))

    return (
        <Drawer.Navigator
            defaultStatus="closed"
            screenOptions={{
                headerShown: false,
                drawerType:'back',
                // drawerStyle:{
                //     backgroundColor:'#000',
                // },
            }}
            drawerContent={DrawerContent}
        >
            <Drawer.Screen
                name="全部"
                initialParams={{
                    tag_id:''
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
                tags.map(item=>(
                    <Drawer.Screen
                        key={item.id}
                        name={item.text}
                        initialParams={{
                            tag_id:item.id
                        }}
                        component={Record}
                        options={{
                            drawerIcon({focused,color,size}){
                                return (<Icon name="bookmark-outline" color={color} size={size} />)
                            },
                            title:'record',
                            drawerLabel:item.text,
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
             <Drawer.Screen
                name="回收站"
                initialParams={{
                    tag_id:'1',
                }}
                component={Record}
                options={{
                    drawerIcon({focused,color,size}){
                        return (<Icon name="trash-outline" color={color} size={size} />)
                    },
                    title:'util',
                    drawerLabel:'回收站',
                }}
            />
            <Drawer.Screen
                name="设置"
                component={Empty}
                options={{
                    title:'system',
                    drawerLabel:'设置',
                    drawerIcon({focused,color,size}){
                        return <Icon name="settings-outline" color={color} size={size} />
                    },
                }}
                listeners={({navigation:n})=>({
                    drawerItemPress(e){
                        e.preventDefault()
                        n.closeDrawer();
                        navigation.navigate('Setting')
                    },
                })}
            />
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
