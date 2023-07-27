import type { NextPage } from 'next'
import { Heading, Box, Stack, Checkbox,Text} from '@chakra-ui/react'


const ConnectionBar = () => {


    return (
        <div>
            <Box as={'div'} mt={'12px'} minW='220px' height={'450px'} border='1px solid #6f6bf35e' borderRadius='16px' p='16px' pb='24px' justifyContent='space-between'>
              <Heading pb='20px' fontSize='18px'>Stats</Heading>
              <Stack mt={1} spacing={2} >
                <Stack spacing={2} direction={'column'} fontSize={'14px'}>
                  <Checkbox colorScheme='primary' defaultChecked><Text fontSize='14px'>Naruto</Text></Checkbox>
                </Stack>
              </Stack>

            </Box>
        </div>
    )
}

export default ConnectionBar