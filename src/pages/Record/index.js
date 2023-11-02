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


const db = openDatabase('db.db')

let dataRaw = []
export default function Record({navigation,route}){
    const [recordList,setRecordList] = useState([])
    const addRecord = ()=>{
        navigation.navigate('RecordAdd',{
            type:'edit',
            tag_id:route.params.tag_id,
        })
    }
    const getRecords = async ()=>{
        const tag_id = route.params.tag_id
        let records 
        if(tag_id){
            records = await executeSql(db,'select * from records where tag_id = ?',[tag_id])
        }else{
            records = await executeSql(db,'select * from records')
        }
        dataRaw = records._array
        setRecordList(dataRaw)
    }

    useFocusEffect(useCallback(()=>{
        getRecords()
    },[]))

    const clickRecord = item =>{
        console.log({item});
        navigation.navigate('RecordAdd',{
            type:'preview',
            id:item.id,
            tag_id:route.params.tag_id,
        })
    }
    const onSearch = val =>{
        console.log('onSearch',val);
        setRecordList(dataRaw.filter(item=>{
            return item.title.includes(val) || item.acount.includes(val)
        }))
    }
    const handleLogout = ()=>{
        navigation.reset({
            index:0,
            routes:[{name:'Login'}]
        })
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
                <RecordAdd onPress={addRecord}></RecordAdd>
            </View>
        </View>
    )
}