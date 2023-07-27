import { ComponentStyleConfig } from '@chakra-ui/react';

export const Stat: ComponentStyleConfig = {
    baseStyle: {
        container: {
            boxShadow: '2px 2px 8px 0px #0D0D0D1A',
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(111, 107, 243, 0.4)',
            backdropFilter: 'blur(30px)',
            borderRadius: '16px',
            padding: '16px'

        },
        label: {
            color: '#756C99',
            fontsize: '14px',
            fontWeight: 400,
        },
        helpText:{
            color: '#756C99',
            fontsize: '14px',
            fontWeight: 400,
            marginBottom:0
        },
        number: {
            fontSize: '18px',
            color: '#0D0D0D',
            fontWeight: '700',
            margin:'8px 0 0 0',
        },
        

    }
}