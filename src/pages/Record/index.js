import React from "react";
import { Text, View } from "react-native";
import Header from "./Header";



export default function Record({navigation,route}){



    return (
        <View>
            <Header
                title={route.name}
                openDrawer={navigation.openDrawer}
            ></Header>
            <View>
                <Text>
                    Record
                </Text>
            </View>
        </View>
    )
}