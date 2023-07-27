import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Table:ComponentStyleConfig = {
    variants:{
        simple:{
            th:{
                color:'rgba(117, 108, 153, 1)',
                fontSize:'14px',
                fontStyle:'normal',
                fontWeight:'500',
                borderBottom:'1px solid',
                borderColor:'rgba(53, 53, 53, 0.2)',
                padding:'17px 12px'
            },
            td:{
                border:'none',
                fontSize:'16px',
                color:'rgba(57, 63, 89, 1)',
                padding:'8px 12px',
            }
            
        },
        bordered:{
            th:{
                py:'12px',
                px:'24px',
                borderBottom:'1px solid',
                borderColor:'rgba(53, 53, 53, 0.2)',
                color:'#756C99'
                
            },
            td:{
                py:'16px',
                borderBottom:'1px solid',
                borderColor:'rgba(53, 53, 53, 0.2)',
            }
        },
        borderLess:{
             th:{
                color:'rgba(117, 108, 153, 1)',
                fontSize:'14px',
                fontStyle:'normal',
                fontWeight:'500',
                border:'none',
                borderColor:'rgba(53, 53, 53, 0.2)',
                padding:'17px 12px'
            },
            td:{
                border:'none',
                fontSize:'16px',
                color:'rgba(57, 63, 89, 1)',
                padding:'8px 12px'
            }
        }
    }

}