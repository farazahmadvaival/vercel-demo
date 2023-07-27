import { Container, Flex, Heading, Button } from "@chakra-ui/react"
import { SlickSlider } from "../components/ReactSlick"
import CollectionCard from "../components/Cards/CollectionCard"
import Link from 'next/link'
import { collectionSliderProp } from "../types/collection"
import CustomSlider from "../components/Slider"

export const RecentSlider = ({data}:collectionSliderProp) =>{

    return (
          <Container maxW={{ sm: 'xl', md: '3xl', lg: '5xl', xl: '8xl' }} mt={{ base: '40px', lg: '80px' }}>
        <CustomSlider name="Recent Collection">
            {data?.map((item, index)=>{
                return <Link href="collection?id=1323232323"  key={index}><CollectionCard type='withBody' featureImage={item.bannerImageUrl} isShowFeatureImage={true} isShowLogoImage={false} name={item.name} /></Link>
            })}
          
        </CustomSlider>
      </Container>
    )
}