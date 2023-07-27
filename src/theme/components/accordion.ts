import { ComponentStyleConfig } from '@chakra-ui/react';


export const Accordion:ComponentStyleConfig = {
    baseStyle: {
    container:{
        border:'none',
        borderBottom:'1px solid #6863f34d',
        marginX:'10px'

    },
     button:{
         bg:'transparent',
         fontsize:'18px',
         fontWeight:'700',
         _hover:{
             bg:"transparent"
         }
     }
    },
}