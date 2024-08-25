import React, { useEffect, useState } from 'react';
import { Spinner, Image } from '@chakra-ui/react';
import { getImageStorage } from '../../firebase/storage';

const CustomImage = ({ ...props }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    /* const fetchImage = async (path) => {
      const fullPath =
        'https://us-central1-costofinal-b391b.cloudfunctions.net/images/api/images';

      const fetchResponse = await fetch(fullPath, {
        method: 'POST',
        body: path,
      });

      const fetchData = await fetchResponse.json(); */
    getImageStorage(props.src).then((url) => setUrl(url));

    /* getImageStorage(props.src).then((url) => setUrl(url)); */
  }, [setUrl, url]);

  return url ? (
    <Image {...props} src={url} />
  ) : props.spinner ? (
    <Spinner />
  ) : null;
};

export default CustomImage;
