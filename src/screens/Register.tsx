import React from 'react'
import { VStack } from 'native-base'

import { Header } from './../components/Header'
import { Button } from './../components/Button'
import { Input } from './../components/Input'

export const Register = () => {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova Solicitação"/>
      <Input mt={4} placeholder="Número do patrimônio"/>
      <Input flex={1} mt={5} multiline textAlignVertical="top" placeholder="Descrição do problema"/>
      <Button mt={5} title="Cadastrar"/>
    </VStack>
  )
}
