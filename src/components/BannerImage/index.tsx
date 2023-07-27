import type { NextPage } from 'next'
import { Image, Box} from '@chakra-ui/react'


const BannerImage: NextPage = () => {


    return (
        <div>
          <Box position='relative' maxW='100%' height='415px' maxH='600px' >
              <Image src='/assets/images/Maskgroup.png' alt='Maskgroup' w='100%' h='100%' objectFit='cover'
                borderRadius='2xl' />

              <Box position='absolute' bottom='-48px' left='48px' border='1px solid #fff' borderRadius='xl' w={220} h={220} >
                <Image
                  src='/assets/images/RectangleCardImg.png' alt='Maskgroup'
                  w='100%' h='100%' objectFit='cover' borderRadius='2xl' />
              </Box>
            </Box>
        </div>
    )
}

export default BannerImage