import React from 'react'
import { Button as ButtonNativeBase, Heading, IButtonProps } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
}

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      fontSize="sm"
      bg="green.700"
      h={14}
      rounded="sm"
      _pressed={{ bg: 'green.500' }}
      { ...rest }
    >
      <Heading
        fontSize="sm"
        color="white"
      >
        {title}
      </Heading>
    </ButtonNativeBase>
  )
}
