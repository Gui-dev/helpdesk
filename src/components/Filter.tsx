import React from 'react'
import { Button, IButtonProps, Text, useTheme } from 'native-base'

type FilterProps = IButtonProps & {
  title: string
  isActive?: boolean
  type: 'open' | 'closed'
}

export const Filter = ({ title, isActive = false, type, ...rest }: FilterProps) => {
  const { colors } = useTheme()
  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Button
      flex={1}
      bgColor="gray.600"
      size="sm"
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      variant="outline"
      {...rest}
    >
      <Text
        fontSize="xs"
        color={isActive ? colorType : colors.gray[300]}
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Button>
  )
}
