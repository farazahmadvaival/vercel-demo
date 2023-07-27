import { Container } from "@chakra-ui/layout"
import CollectionCard from "../components/Cards/CollectionCard"
import CustomSlider from "../components/Slider"
import Link from 'next/link'
import { collectionSliderProp } from "../types/collection"


export const FeatureSlider = ({data}:collectionSliderProp) =>{

    return (
      <Container maxW={{ sm: 'xl', md: '3xl', lg: '5xl', xl: '8xl' }} mt={{ base: '40px', lg: '80px' }}>
        <CustomSlider name="Featured Collections">
            {data?.map((item, index)=>{
                return <Link href={`collection/${item?.id}`} key={index}><CollectionCard type='withoutBody' featureImage={item?.bannerImageUrl}  isShowFeatureImage={true} isShowLogoImage={false} name={item?.name} /></Link>
            })}
          
        </CustomSlider>
      </Container>
    )
}