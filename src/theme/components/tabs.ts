import { ComponentStyleConfig } from '@chakra-ui/react';

export const Tabs:ComponentStyleConfig = {
    baseStyle:{
        tab:{
            fontSize:'18px',
            fontWeight:700,
        _selected:{
                 color:'#6863F3',
                
             },
             _hover:{
                color:'#6863F3',
             }
        },
         tablist: {
             borderBottom: '2x solid',
             borderColor: 'inherit',
             paddingLeft:'12px',
             
            },
    },

}

