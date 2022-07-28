import React, { useState } from 'react'
import { Heading, Icon, VStack, useTheme } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'

import Logo from './../assets/logo_primary.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export const SignIn = () => {
  const { colors } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = () => {
    console.log(email, password)
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
        onPress={handleSignIn}
      />
    </VStack>
  )
}
