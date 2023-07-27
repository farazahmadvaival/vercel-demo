//Upload img on pinata cloud to get img url
import { ApiUrl } from '../../src/apis/apiUrl'
import { POST } from '../hooks/consts'

export const handleUploadWithIpfs = async (file: File | null) => {
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PINATA_BASE_URL}/${ApiUrl?.PIN_FILE_TO_IPS}`,
      {
        method: POST,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_IPFS_JWT}`,
        },
        body: formData,
      }
    );
    
    if (response.ok) {
      const result = await response.json();
      const ImgUrl = `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${result?.IpfsHash}`;
      return ImgUrl;
    }
  }
};
