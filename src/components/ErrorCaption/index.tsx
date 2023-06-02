import { View } from 'react-native';

import { Text } from '@ui-kitten/components';

const ErrorCaption = (text: string): React.ReactElement => {
  return (
    <View>
      <Text category="label" status="danger">
        {text}
      </Text>
    </View>
  );
};

export default ErrorCaption;
