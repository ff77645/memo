import React from "react";
import { ScrollView, View } from "react-native";
import Header from "./Header";
import RecordItem from "./RecordItem";
import RecordAdd from './RecordAdd'


export default function Record({navigation,route}){

    const recordList = Array.from({length:20})
    const addRecord = ()=>{
        // console.log('addRecord');
        navigation.navigate('RecordAdd')
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
                        recordList.map((_,index)=>(
                            <RecordItem key={index} />
                        ))
                    }
                </ScrollView>
                <RecordAdd onPress={addRecord}></RecordAdd>
            </View>
        </View>
    )
}