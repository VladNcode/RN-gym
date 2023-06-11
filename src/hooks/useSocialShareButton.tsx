import { MutableRefObject, useEffect, useRef } from 'react';
import { ImageProps, StyleProp, ViewStyle } from 'react-native';
import { ShareOptions } from 'react-native-share';

import { Button, Icon } from '@ui-kitten/components';

import shareOnSocialMedia from '../utils/shareOnSocialMedia';

const useSocialShareButton = () => {
  const pulseIconRef = useRef<Icon<Partial<ImageProps>>>();

  useEffect(() => {
    if (pulseIconRef.current) pulseIconRef.current.startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pulseIconRef.current]);

  const SocialShareButton = ({ styles, options }: { styles: StyleProp<ViewStyle>; options: ShareOptions }) => {
    return (
      <Button
        accessoryLeft={props => (
          <Icon
            {...props}
            ref={pulseIconRef as MutableRefObject<Icon<Partial<ImageProps>>>}
            animationConfig={{ cycles: Infinity, useNativeDriver: true }}
            animation="pulse"
            name="share-outline"
          />
        )}
        size="small"
        style={styles}
        onPress={() => {
          shareOnSocialMedia(options);
        }}
        status="info">
        SHARE ON SOCIAL MEDIA
      </Button>
    );
  };

  return SocialShareButton;
};

export default useSocialShareButton;
