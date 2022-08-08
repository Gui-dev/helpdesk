import React, { ElementType, ReactNode } from 'react'
import { Box, HStack, Text, useTheme, VStack } from 'native-base'
import { IconProps } from 'phosphor-react-native'

type CardDetailProps = {
  title: string
  description?: string
  footer?: string
  icon: ElementType<IconProps>
  children?: ReactNode
}

export const CardDetail = ({ title, description, footer = null, icon: Icon, children }: CardDetailProps) => {
  const { colors } = useTheme()

  return (
    <VStack mt={5} p={5} bg="gray.600" rounded="sm">
      <HStack alignItems="center" mb={4}>
        <Icon color={colors.primary[700]}/>
        <Text fontSize="sm" color="gray.300" textTransform="uppercase" ml={2}>
          {title}
        </Text>
      </HStack>

      {
        !!description && (
          <Text fontSize="md" color="gray.100">
            {description}
          </Text>
        )
      }

      {children}

      {
        !!footer && (
          <Box mt={3} borderTopWidth={1} borderTopColor="gray.400">
            <Text fontSize="md" color="gray.300" mt={3}>
              {footer}
            </Text>
          </Box>
        )
      }

    </VStack>
  )
}
