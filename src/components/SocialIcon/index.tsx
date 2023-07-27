import type { NextPage } from 'next'
import { Box, IconButton, HStack} from '@chakra-ui/react'


const SocialIcon: NextPage = () => {


    return (
        <div>
           <HStack float='right' pt='8px'>
                <Box textAlign='center'>
                  <IconButton color=' #756C99'
                    variant='outline'
                    colorScheme='#6863F3'
                    aria-label='Send'
                    fontSize='20px'
                    icon={<i className='icon-internet'></i>}
                  />
                </Box>
                <Box textAlign='center'>
                  <IconButton color=' #756C99'
                    variant='outline'
                    colorScheme='#6863F3'
                    aria-label='Send email'
                    fontSize='20px'
                    icon={<i className=' icon-froggy'></i>}
                  />
                </Box>
                <Box textAlign='center'>
                  <IconButton color=' #756C99'
                    variant='outline'
                    colorScheme='#6863F3'
                    aria-label='Send email'
                    fontSize='20px'
                    icon={<i className='icon-instagram'></i>}
                  />
                </Box>
                <Box textAlign='center'>
                  <IconButton color=' #756C99'
                    variant='outline'
                    colorScheme='#6863F3'
                    aria-label='Send email'
                    fontSize='20px'
                    textAlign='center'
                    display='initial'
                    icon={<i className='icon-twitter'></i>}
                  />
                </Box>
                <Box textAlign='center'>
                  <IconButton color=' #756C99'
                    variant='outline'
                    colorScheme='#6863F3'
                    aria-label='Send email'
                    fontSize='20px'
                    icon={<i className='icon-groupbar'></i>}
                  />
                </Box>
                <Box textAlign='center'>
                  <IconButton color=' #756C99'
                    variant='outline'
                    colorScheme='6863F3'
                    aria-label='Send email'
                    fontSize='20px'
                    icon={<i className='icon-share'></i>}
                  />
                </Box>
                <Box textAlign='center'>
                  <IconButton color=' #756C99'
                    variant='outline'
                    colorScheme='6863F3'
                    aria-label='Send email'
                    fontSize='20px'
                    icon={<i className='icon-telegram'></i>}
                  />
                </Box>
              </HStack>
        </div>
    )
}

export default SocialIcon