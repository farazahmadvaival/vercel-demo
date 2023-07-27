import { ComponentStyleConfig } from '@chakra-ui/react';

export const Menu: ComponentStyleConfig = {
    baseStyle:{
        item:{
            bg:'transparent',
            color:'black',
            _hover:{
                color:'purple.600'
            }
        }
    },
    variants:{
        button:{
            button: {
                borderLeftRadius: 'full',
                pl: '6',
                bg:'red'
            },
}
    }
}
