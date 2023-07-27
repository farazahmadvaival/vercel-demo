import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Form:ComponentStyleConfig={
    parts: ['container', 'requiredIndicator', 'helperText'],
  baseStyle: {
    /// The container styles the FormControl
    container: {
      marginY: '15px',
      label: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom:'10px',
      },
    },
    helperText:{
        fontSize:'16px',
        fontWeight:'normal',
        fontStyle:'normal',
        color:'#393F59'
    }
  },
}