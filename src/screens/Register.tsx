import React, { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { VStack } from 'native-base'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { database } from './../services/firebase'

import { Header } from './../components/Header'
import { Button } from './../components/Button'
import { Input } from './../components/Input'

export const Register = () => {
  const { goBack } = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const handleNewOrderRegister = async () => {
    try {
      setIsLoading(true)
      if (!patrimony || !description) {
        return Alert.alert('Registrar', 'Preencha todos os campos')
      }

      await addDoc(collection(database, 'orders'), {
        patrimony,
        description,
        status: 'open',
        created_at: serverTimestamp()
      })
      Alert.alert('Sucesso', 'Solicitação registrada com sucesso!')

      goBack()
    } catch (error) {
      Alert.alert('Error', 'Não foi possivel registar o pedido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Solicitação" />
      <Input
        mt={4}
        placeholder="Número do patrimônio"
        value={patrimony}
        onChangeText={setPatrimony}
      />
      <Input
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        placeholder="Descrição do problema"
        value={description}
        onChangeText={setDescription}
      />
      <Button
        mt={5}
        title="Cadastrar"
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  )
}
