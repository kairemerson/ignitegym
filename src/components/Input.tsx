import {
    FormControl,
    FormControlError,
    FormControlErrorText,
    Input as GluestackInput,
    InputField,
  } from '@gluestack-ui/themed'

import { ComponentProps } from 'react'

type Props = ComponentProps<typeof InputField> & {
    errorMessage?: string | null
    isInvalid?: boolean
    isReadOnly?: boolean
}

export function Input({isReadOnly=false, errorMessage=null, isInvalid, ...rest}: Props) {

    const invalid = !!errorMessage || isInvalid

    return (
        <FormControl isInvalid={invalid} w="$full" mb="$3">
            <GluestackInput 
                isInvalid={isInvalid}
                h="$14"
                borderWidth="$0" 
                borderRadius="$md"
                $focus={{
                    borderColor: invalid? "$red500" : "$green500",
                    borderWidth: 1
                }}
                $invalid={{
                    borderColor: "$red500",
                    borderWidth: 1
                }}
                isReadOnly={isReadOnly}
                opacity={isReadOnly ? 0.5 : 1}
                >
                <InputField 
                    bg="$gray700" 
                    px="$4" 
                    color='$white'
                    fontFamily='$body'
                    placeholderTextColor="$gray300"
                    {...rest}
                />
            </GluestackInput>
            
            <FormControlError>
                <FormControlErrorText color="$red500">
                    {errorMessage}
                </FormControlErrorText>

            </FormControlError>

        </FormControl>
    )
}