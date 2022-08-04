import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base'
import { ChatTeardropText, SignOut } from 'phosphor-react-native'
import { signOut } from 'firebase/auth'

import { firebaseAuth } from './../services/firebase'

import Logo from './../assets/logo_secondary.svg'
import { Filter } from './../components/Filter'
import { Order, OrderProps } from './../components/Order'
import { Button } from '../components/Button'

export const Home = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: 'kdsnafnodsia',
      patrimony: '1234456',
      when: '01/08/20121 ás 14:00',
      status: 'open'
    }
  ])

  const handleOpenDetails = (orderId: string) => {
    navigate('Details', { orderId })
  }

  const handleNewOrder = () => {
    navigate('Register')
  }

  const handleSignOut = async () => {
    await signOut(firebaseAuth)
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        alignItems="center"
        justifyContent="space-between"
        pt={12}
        px={6}
        pb={5}
        w="full"
        bg="gray.600"
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]}/>}
          onPress={handleSignOut}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack alignItems="center" justifyContent="space-between" mt={8} mb={4} w="full">
          <Heading color="gray.100">
            Solicitações
          </Heading>

          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            isActive={statusSelected === 'open'}
            onPress={() => setStatusSelected('open')}
          />
          <Filter
            title="finalizado"
            type="closed"
            isActive={statusSelected === 'closed'}
            onPress={() => setStatusSelected('closed')}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => {
            return (
              <Center>
                <ChatTeardropText size={40} color={colors.gray[400]}/>
                <Text fontSize="xl" color="gray.300" textAlign="center">
                  Você ainda não possui {'\n'}
                  solicitações {statusSelected === 'open' ? ' em aberto' : ' finalizados'}
                </Text>
              </Center>
            )
          }}
          renderItem={({ item }) => {
            return (
              <Order data={item} onPress={() => handleOpenDetails(item.id)}/>
            )
          }}
        />

        <Button title="Nova solicitação" onPress={handleNewOrder}/>

      </VStack>
    </VStack>
  )
}
