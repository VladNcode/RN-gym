import Share, { ShareOptions } from 'react-native-share';

import { fetchToBase64 } from './imageToBase64';

const shareOnSocialMedia = async (options: ShareOptions, image?: string) => {
  const opts = {
    ...options,
  };

  try {
    if (!image) {
      const base64image = await fetchToBase64('https://sportschaplaincy.org.uk/wp-content/uploads/2020/07/gym3.jpg');
      opts.url = base64image;
    }

    await Share.open({ ...opts, failOnCancel: false });
  } catch (error) {
    console.log(error);
  }
};

export default shareOnSocialMedia;
