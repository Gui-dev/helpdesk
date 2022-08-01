import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { THEME } from './src/styles/theme'
import { Routes } from './src/routes'
import { Loading } from './src/components/Loading'

export default function App () {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return (
      <NativeBaseProvider theme={THEME}>
        <Loading />
      </NativeBaseProvider>
    )
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar style="light" backgroundColor="transparent" translucent/>
      <Routes />
    </NativeBaseProvider>
  )
}
