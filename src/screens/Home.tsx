import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base'
import { ChatTeardropText, SignOut } from 'phosphor-react-native'

import { database, firebaseAuth } from './../services/firebase'

import Logo from './../assets/logo_secondary.svg'
import { Filter } from './../components/Filter'
import { Order, OrderProps } from './../components/Order'
import { Button } from '../components/Button'
import { dateFormat } from '../utils/firestoreDateFormat'
import { Loading } from '../components/Loading'

export const Home = () => {
  const { colors } = useTheme()
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([])

  const handleOpenDetails = (orderId: string) => {
    navigate('Details', { orderId })
  }

  const handleNewOrder = () => {
    navigate('Register')
  }

  const handleSignOut = async () => {
    await signOut(firebaseAuth)
  }

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true)
        const docRef = query(
          collection(database, 'orders'),
          where('status', '==', statusSelected)
        )

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          const ordersFormated: OrderProps[] = []
          docSnap.forEach(doc => {
            const { patrimony, description, status, created_at } = doc.data()

            const data = {
              id: doc.id,
              patrimony,
              description,
              status,
              when: dateFormat(created_at)
            }
            ordersFormated.push(data)
          })
          setOrders(ordersFormated)
        })

        return unsubscribe
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [statusSelected])

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

        {
          isLoading
            ? <Loading />
            : <FlatList
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
        }

        <Button title="Nova solicitação" onPress={handleNewOrder}/>

      </VStack>
    </VStack>
  )
}
