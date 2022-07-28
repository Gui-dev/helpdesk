import React from 'react'
import { Input as NativeBaseInpur, IInputProps } from 'native-base'

export const Input = ({ ...rest }: IInputProps) => {
  return (
    <NativeBaseInpur
      fontSize="md"
      fontFamily="body"
      color="white"
      h={14}
      bg="gray.700"
      borderWidth={0}
      size="md"
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      { ...rest }
    />
  )
}
