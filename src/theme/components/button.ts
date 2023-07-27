import { ComponentStyleConfig } from '@chakra-ui/react';


export const Button:ComponentStyleConfig = {
    baseStyle: {
        fontWeight: '600px',
        borderRadius: '8px',
        lineHeight:'0px',
        fontStyle:'normal',
    },
    sizes:{
        xs:{
            padding:'12px 16px',
            fontSize:'14px'
        },
        sm:{
             padding:'16px 24px',
             fontSize:'14px'
        },
        md:{
             padding:'20px 32px',
            fontSize:'14px'
        },
        lg:{
            padding:'23px 32px',
            fontSize:'16px'
        }
    },
    variants:{
        primary:{
            bg:'purple.500',
            color:'white',
            border:'1px solid #6863F3',

            _hover: {
                bg: 'white',
                color:'purple.500',
                border:'1px solid #6863F3',
                transform: 'translateY(-3px) scale(1.01) translateZ(0px)',
                transition:'all .3s ease',

            },
        }, 
        secondary:{
            bg:'white',
            color:'purple.500',
            border: '1px solid',
            borderColor:'purple.500',
            _hover: {
                bg: 'purple.500',
                color:'white',
                border:'1px solid #6863F3',
                transform: 'translateY(-3px) scale(1.01) translateZ(0px)',
                transition:'all .3s ease',


            },
        }
    }
}