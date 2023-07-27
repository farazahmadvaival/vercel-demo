import { ComponentStyleConfig } from '@chakra-ui/react';


export const Input: ComponentStyleConfig = {
    baseStyle:{
        field: {
            width: '100%',
            minWidth: 0,
            outline: 0,
            position: 'relative',
            appearance: 'none',
            transitionProperty: 'common',
            transitionDuration: 'normal',
            border:'1px solid #B3A9F8',
            _disabled: {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
        },
    },
    variants:{
        custom:{
            field:{
               borderWidth:'1px',
               borderColor:'#B3A9F8',
               border:'1px solid #B3A9F8',
               _placeholder:{
                   color:'#C8BFD6',
               }
            },
             element: {
                 pl:'9px',
                 pt:'9px',
                 pr:'9px',
                 pb:'9px'
             }
        }
    },
    sizes:{
       md:{
           field:{
               fontSize:'14px',
               paddingTop:'16px',
               paddingBottom:'16px'
           }
       },
    }
}