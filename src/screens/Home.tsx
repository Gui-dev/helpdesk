import React, { useState } from 'react'
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base'
import { ChatTeardropText, SignOut } from 'phosphor-react-native'

import Logo from './../assets/logo_secondary.svg'
import { Filter } from './../components/Filter'
import { Order, OrderProps } from './../components/Order'
import { Button } from '../components/Button'

export const Home = () => {
  const { colors } = useTheme()
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([])

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
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack alignItems="center" justifyContent="space-between" mt={8} mb={4} w="full">
          <Heading color="gray.100">
            Meus chamados
          </Heading>

          <Text color="gray.200">
            3
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
              <Order data={item}/>
            )
          }}
        />

        <Button title="Nova solicitação"/>

      </VStack>
    </VStack>
  )
}
