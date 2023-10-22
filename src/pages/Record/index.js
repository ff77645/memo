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


export default function Record({navigation,route}){

    const [recordList,setRecordList] = useState([])
    const addRecord = ()=>{
        // console.log('addRecord');
        navigation.navigate('RecordAdd',{
            type:'edit',
            type:route.params.type,
        })
    }
    const getRecords = async ()=>{
        const type = route.params.type
        let records 
        if(type){
            records = await executeSql(db,'select * from records where type = ?',[type])
        }else{
            records = await executeSql(db,'select * from records')
        }
        console.log({records:JSON.stringify(records._array)});
        setRecordList(records._array)
    }

    useFocusEffect(useCallback(()=>{
        console.log('screen focus');
        getRecords()
    },[]))

    const clickRecord = item =>{
        console.log({item});
        navigation.navigate('RecordAdd',{
            type:'preview',
            id:item.id,
            type:route.params.type,
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