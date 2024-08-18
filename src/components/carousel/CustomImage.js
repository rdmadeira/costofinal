import React, { useEffect, useState } from 'react';
import { Spinner, Image } from '@chakra-ui/react';

const CustomImage = ({ ...props }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchImage = async (path) => {
      const fullPath =
        /* 'http://127.0.0.1:5001/costofinal-b391b/us-central1/images/api/images'; */
        'https://us-central1-costofinal-b391b.cloudfunctions.net/images/api/images';

      const fetchResponse = await fetch(fullPath, {
        method: 'POST',
        body: path,
      });

      const fetchData = await fetchResponse.json();

      console.log('fetchData', fetchData);

      return fetchData.url;
    };

    fetchImage(props.src).then((url) => setUrl(url));
  }, [setUrl, url]);

  return url ? <Image {...props} src={url} /> : <Spinner />;
};

export default CustomImage;
