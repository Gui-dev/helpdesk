import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged, User } from 'firebase/auth'

import { firebaseAuth } from './../services/firebase'

import { SignIn } from './../screens/SignIn'
import { AppRoutes } from './app.routes'
import { Loading } from '../components/Loading'

export const Routes = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const subscriber = onAuthStateChanged(firebaseAuth, response => {
      setUser(response)
      setLoading(false)
    })

    return subscriber
  }, [])

  if (loading) {
    return <Loading />
  }

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
