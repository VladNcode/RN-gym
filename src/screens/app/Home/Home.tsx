// import { Button, Text, TextField, View } from 'react-native-ui-lib';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Activity } from '@tamagui/lucide-icons';
import { Button } from 'tamagui';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  return (
    <SafeAreaView style={style.container}>
      <Button width="50%" theme="green" iconAfter={Activity} size="$4">
        iconAfter
      </Button>
    </SafeAreaView>
  );
};

export default Home;
