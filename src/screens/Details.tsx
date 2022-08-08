import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base'
import { CircleWavyCheck, Clipboard, DesktopTower, Hourglass } from 'phosphor-react-native'

import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Loading } from '../components/Loading'
import { OrderProps } from '../components/Order'
import { OrderPropsDTO } from '../dtos/OrderPropsDTO'
import { dateFormat } from '../utils/firestoreDateFormat'
import { CardDetail } from './../components/CardDetail'

import { database } from './../services/firebase'
import { Alert } from 'react-native'

type RouteParams = {
  orderId: string
}

type OrderDetails = OrderProps & {
  description: string
  solution: string
  closed: string
}

export const Details = () => {
  const route = useRoute()
  const { orderId } = route.params as RouteParams
  const { goBack } = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [solution, setSolution] = useState('')
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)
  const { colors } = useTheme()

  const handleOrderClose = async () => {
    if (!solution) {
      return Alert.alert('Solicitação', 'Informa a solução para encerrar a solicitação')
    }

    try {
      const docRef = doc(database, 'orders', orderId)
      await updateDoc(docRef, {
        status: 'closed',
        solution,
        closed_at: serverTimestamp()
      })

      setSolution('')
      Alert.alert('Solicitação', 'Solicitação encerrada')
      goBack()
    } catch (error) {
      Alert.alert('Error', 'Não foi possível encerrar a solicitação')
      console.log(error)
    }
  }

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const docRef = doc(database, 'orders', orderId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists) {
          const { patrimony, description, status, solution, created_at, closed_at } = docSnap.data() as OrderPropsDTO
          const closed = closed_at ? dateFormat(closed_at) : null

          setOrder({
            id: docSnap.id,
            patrimony,
            description,
            status,
            solution,
            when: dateFormat(created_at),
            closed
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack justifyContent="center" p={4} bg="gray.500">
        {
          order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
        }
        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          textTransform="uppercase"
          ml={2}
        >
          {order.status === 'closed' ? 'finalizado' : 'em aberto'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetail
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDetail
          title="descrição do problema"
          description={order.description}
          icon={Clipboard}
        />

        <CardDetail
          title="solução"
          description={order.solution}
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {
            order.status === 'open' && (
              <Input
                placeholder="Descrição da solução"
                h={24}
                textAlignVertical="top"
                multiline
                value={solution}
                onChangeText={setSolution}
              />
            )
          }
        </CardDetail>

        {
          order.status === 'open' && (
            <Button
              title="Finalizar Solicitação"
              mt={5}
              mb={5}
              onPress={handleOrderClose}
            />
          )
        }
      </ScrollView>
    </VStack>
  )
}
