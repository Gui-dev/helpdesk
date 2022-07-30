import React from 'react'
import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'

type HeaderProps = StyledProps & {
  title: string
}

export const Header = ({ title, ...rest }: HeaderProps) => {
  const { colors } = useTheme()

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      pb={6}
      pt={12}
      w="full"
      bg="gray.600"
      {...rest}
    >
      <IconButton
        icon={<CaretLeft size={24} color={colors.gray[200]}/>}
      />
      <Heading flex={1} fontSize="lg" color="gray.100" textAlign="center" ml={-6}>
        {title}
      </Heading>
    </HStack>
  )
}
