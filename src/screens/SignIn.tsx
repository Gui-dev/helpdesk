import React, { useState } from 'react'
import { Heading, Icon, VStack, useTheme } from 'native-base'
import { Alert } from 'react-native'
import { Envelope, Key } from 'phosphor-react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import { firebaseAuth } from './../services/firebase'

import Logo from './../assets/logo_primary.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const SignIn = () => {
  const { colors } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      if (!email || !password) {
        return Alert.alert('Entrar', 'Informe e-mail e senha')
      }
      await signInWithEmailAndPassword(firebaseAuth, email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      const error = err as FirebaseError

      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-email'
      ) {
        return Alert.alert('Opssss', 'E-mail ou senha inválidos, tente novamente')
      }

      Alert.alert('Opssss', 'Algo deu errado, tente novamente mais tarde')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack
      flex={1}
      alignItems="center"
      bg="gray.600"
      px={8}
      pt={24}
    >
      <Logo />
      <Heading fontSize="xl" color="gray.100" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Input
        placeholder="E-mail"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        mb={4}
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4}/>}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        mb={4}
        InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Logar"
        w="full"
        isLoading={isLoading}
        onPress={handleSignIn}
      />
    </VStack>
  )
}
