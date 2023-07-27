import { Box, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

const SocialShare = ({ url, title }: { url: string; title: string; }) => {
  const shareUrl = 'https://ibanera-launchpad.bloxbytes.com/nft/detail/700e272b-6077-4e78-a2c5-9b2a0b0206e4';

  const handleClick = (id:string) => {
    if(id=='facebookButton'){
     document.getElementById('facebookButton')?.click()
    }
    if(id=='twitterButton'){
     document.getElementById('twitterButton')?.click()
    }
    if(id=='whatsappButton'){
     document.getElementById('whatsappButton')?.click()
    }

  }

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          color='#756C99'
          ml={{ base: '0px', sm: '8px' }} mb={{ base: '8px', sm: '0' }}
          variant='outline'
          aria-label='Send'
          fontSize='20px'
          border='1px solid #c4c3f9'
          bg='#fff'
          icon={<i className='icon-share'></i>}>
        </MenuButton>
        <MenuList w='191px' minW='191px' p='8px'>
        <Flex align='center' p='8px' color='#756C99' _hover={{color:'#6863F3'}} onClick={()=>handleClick('facebookButton')} cursor={'pointer'}>
            <Box mr='16px' fontSize='20px'><i className='icon-facebook'></i></Box>
            <FacebookShareButton url={url} quote={title}  id={'facebookButton'}>
              Facebook
            </FacebookShareButton>
          </Flex>
          <Flex align='center' p='8px' color='#756C99' _hover={{color:'#6863F3'}} onClick={()=>handleClick('twitterButton')} cursor={'pointer'}>
            <Box mr='10px' fontSize='16px'><i className='icon-twitter'></i></Box>
            <TwitterShareButton url={url} title={title} id={'twitterButton'}>
              Twitter
            </TwitterShareButton>
          </Flex>
          <Flex align='center' p='8px' color='#756C99' _hover={{color:'#6863F3'}}  onClick={()=>handleClick('whatsappButton')} cursor={'pointer'}>
            <Box mr='12px' fontSize='20px'><i className='icon-whatsapp'></i></Box>
            <WhatsappShareButton url={url} title={title} id={'whatsappButton'}>
              Whatsapp
            </WhatsappShareButton>
          </Flex>
        </MenuList>
      </Menu>
    </>
  );
};

export default SocialShare;
