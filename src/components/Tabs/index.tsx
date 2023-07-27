import type { NextPage } from 'next'
import { Box, Tabs as ChakraTabs, TabList, Tab} from '@chakra-ui/react'


const Tabs = () => {


    return (
        <div>
         <Box>
              <ChakraTabs >
                <TabList fontWeight='bold'>
                  <Tab _selected={{ color: '#6863F3', borderBottom: '2px solid #6863F3', fontWeight: 'bold' }}>Collected</Tab>
                  <Tab _selected={{ color: '#6863F3', borderBottom: '2px solid #6863F3', fontWeight: 'bold' }}>Created</Tab>
                  <Tab _selected={{ color: '#6863F3', borderBottom: '2px solid #6863F3', fontWeight: 'bold' }}>Activity</Tab>
                </TabList>
              </ChakraTabs>
            </Box>
        </div>
    )
}

export default Tabs