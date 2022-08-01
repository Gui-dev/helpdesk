import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { SignIn } from './../screens/SignIn'
import { AppRoutes } from './app.routes'

export const Routes = () => {
  const user = true

  return (
    <NavigationContainer>

      {
        user
          ? <AppRoutes />
          : <SignIn />
      }

    </NavigationContainer>
  )
}
