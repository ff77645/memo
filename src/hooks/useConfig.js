import {atom,useAtom} from 'jotai'
import {useEffect, useState} from 'react'
import {getItemAsync,setItemAsync,deleteItemAsync} from 'expo-secure-store'
import {appConfigKey,appConfigValueDefault} from '../config/config'

const appConfigValue = atom(appConfigValueDefault)

appConfigValue.onMount = setAtom =>{
  getItemAsync(appConfigKey).then(value=>{
    if(value){
      const config = JSON.parse(value)
      const data = Object.assign({},appConfigValueDefault,config)
      setAtom(data)
    }
  })
  console.log('onMount');
  return ()=>{
    console.log('onUnMount');
  }
}

const configAtom = atom(
  get=>get(appConfigValue),
  async (get,set,value)=>{
    await setItemAsync(appConfigKey,JSON.stringify(value))
    set(appConfigValue,value)
  }
)

export const useConfig = ()=>{
  return useAtom(configAtom)
}