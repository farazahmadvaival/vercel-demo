import { ComponentStyleConfig } from '@chakra-ui/react';

export const Modal: ComponentStyleConfig = {
    baseStyle: {
        header: {
            fontWeight: '700',
            fontSize: '24px',
            color: ' #0D0D0D',
            paddingBottom:'0'
        },
        overlay: {
            backdropFilter: 'blur(30px)',
            background: 'rgba(255, 255, 255, 0.6)',
            
        },
        dialogContainer: {
            alignItems:'center'
        },
        dialog: {
            maxW: ' 708px',
            background: '#fff',
            border: '1px solid rgba(111, 107, 243, 0.4)',
            boxShadow: '2px 2px 8px rgba(13, 13, 13, 0.1)',
            borderRadius: '16px',
        },
        closeButton: {},
        body: {
            paddingTop:'0',
            
        },
        footer: {},

    }
}