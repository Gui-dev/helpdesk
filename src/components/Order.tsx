import React from 'react'
import { Box, Circle, HStack, IPressableProps, Pressable, Text, useTheme, VStack } from 'native-base'
import { ClockAfternoon, CircleWavyCheck, Hourglass } from 'phosphor-react-native'

export type OrderProps = {
  id: string
  patrimony: string
  when: string
  status: 'open' | 'closed'
}

type Props = IPressableProps & {
  data: OrderProps
}

export const Order = ({ data, ...rest }: Props) => {
  const { colors } = useTheme()
  const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Pressable {...rest}>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        mb={4}
        bg="gray.600"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor}/>

        <VStack flex={1} my={5} ml={5}>
          <Text fontSize="md" color="white">
            Patrimônio {data.patrimony}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]}/>
            <Text fontSize="xs" color="gray.200" ml={1}>{data.when}</Text>
          </HStack>

        </VStack>

        <Circle h={12} w={12} mr={5} bg="gray.500">
          {
            data.status === 'closed'
              ? <CircleWavyCheck size={24} color={statusColor}/>
              : <Hourglass size={24} color={statusColor}/>
          }
        </Circle>
      </HStack>
    </Pressable>
  )
}
