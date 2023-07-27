import { Container, Flex, Heading } from "@chakra-ui/layout"
import CollectionCard from "../components/Cards/CollectionCard"
import CustomSlider from "../components/Slider"
import Link from 'next/link'
import { collectionSliderProp } from "../types/collection"
import { Button } from "@chakra-ui/button"
import { SlickSlider } from "../components/ReactSlick"

export const TrendingCollectionInArtSlider = ({data}:collectionSliderProp) =>{

    return (
            <Container maxW={{ sm: 'xl', md: '3xl', lg: '5xl', xl: '8xl' }} mt={{ base: '40px', lg: '80px' }}>
            <Flex justifyContent='space-between' alignItems='center' mb={{ base: '20px', lg: '40px' }} px={{ base: '0', sm: '17px' }}>
          <Heading fontSize={{ base: '24px', md: '36px', xl: '48px' }}>Trending in Art</Heading>
          <Button p={{ base: '15px', md: '20px 32px' }} variant='primary'>View All</Button>
        </Flex>
        <SlickSlider>
            {data?.map((item, index)=>{
                return <Link href="collection?id=1323232323" key={index}><CollectionCard type='withBody' featureImage={item.bannerImageUrl} isShowFeatureImage={true} isShowLogoImage={false} name={item.name} /></Link>
            })}
          
        </SlickSlider>
      </Container>
    )
}