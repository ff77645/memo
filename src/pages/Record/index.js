import React,{
    useCallback, useState,
} from "react";
import { ScrollView, View } from "react-native";
import Header from "./Header";
import RecordItem from "./RecordItem";
import RecordAdd from './RecordAdd'
import {openDatabase} from 'expo-sqlite'
import {executeSql} from '../../utils'
import {useFocusEffect} from '@react-navigation/native'
import {ExitApp} from '../../NativeMoudles'

const db = openDatabase('db.db')

let dataRaw = []
export default function Record({navigation,route}){
    const [recordList,setRecordList] = useState([])
    const addRecord = ()=>{
        navigation.navigate('RecordAdd',{
            tag_id:route.params.tag_id,
        })
    }
    const getRecords = async ()=>{
        const tag_id = route.params.tag_id
        let records 
        if(tag_id === '1'){
            records = await executeSql(db,'select * from records where is_delete = 1')
        }else if(tag_id){
            records = await executeSql(db,'select * from records where tag_id = ? and is_delete = 0',[tag_id])
        }else{
            records = await executeSql(db,'select * from records where is_delete = 0')
        }
        dataRaw = records._array
        setRecordList(dataRaw)
    }

    useFocusEffect(useCallback(()=>{
        getRecords()
    },[]))

    const clickRecord = item =>{
        navigation.navigate('RecordAdd',{
            id:item.id,
            tag_id:route.params.tag_id,
        })
    }
    const onSearch = val =>{
        setRecordList(dataRaw.filter(item=>{
            return item.title.includes(val) || item.acount.includes(val)
        }))
    }
    const handleLogout = ()=>{
        // navigation.reset({
        //     index:0,
        //     routes:[{name:'Login'}]
        // })
        ExitApp.exitApp()
    }

    return (
        <View
            style={{
                height:'100%',
                display:'flex',
            }}
        >
            <Header
                title={route.name}
                openDrawer={navigation.openDrawer}
                onSearch={onSearch}
                onLogout={handleLogout}
            ></Header>
            <View
                style={{
                    flex:1,
                    position:'relative',
                }}
            >
                <ScrollView>
                    {
                        recordList.map((item,index)=>(
                            <RecordItem onPress={()=>clickRecord(item)} item={item} key={index} />
                        ))
                    }
                </ScrollView>
                {route.params.tag_id !== '1' && <RecordAdd onPress={addRecord}></RecordAdd>}
            </View>
        </View>
    )
}