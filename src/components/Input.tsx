import {
    Input as GluestackInput,
    InputField,
  } from '@gluestack-ui/themed'

import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField>

export function Input({...rest}: Props) {
    return (
        <GluestackInput 
            bg="$gray700" 
            h="$14" 
            px="$4" 
            borderWidth="$0" 
            borderRadius="$md"
            $focus={{
                borderColor: "$green500",
                borderWidth: 1
            }}
        >
            <InputField 
                color='$white'
                fontFamily='$body'
                placeholderTextColor="$gray300"
                {...rest}
            />
        </GluestackInput>
    )
}