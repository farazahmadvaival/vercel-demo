import { Button } from '@chakra-ui/button'
import { ChevronLeftIcon } from '@chakra-ui/icons'



export const PrevArrow = ({prev, ...rest}:any)=>{
    return <Button className='slick-arrow-btn' borderRadius='full' p='0' _hover={{bg:'white'}} onClick={()=>prev()} color='purple.500' w={{base:'40px',lg:'56px'}} h={{base:'40px',lg:'56px'}} bg='white' boxShadow= '0px 3px 6px 0px #8E72FF4D'
 {...rest} zIndex='1' top={{base:'40%',md:'45%'}}left={{base:'-3%',sm:'-1%',md:'-0.9%'}} ><ChevronLeftIcon color='purple.500' opacity='0.5' _hover={{ opacity:'1'}} fontSize='38px'/></Button>
}