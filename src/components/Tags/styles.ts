import { Dimensions, StyleSheet } from 'react-native';

import { COLOR_SCHEME } from '../../constants';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: -(width * 0.06),
  },
  tag: {
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: COLOR_SCHEME.blue,
    marginRight: 10,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLOR_SCHEME.blue,
  },
  selected: {
    backgroundColor: COLOR_SCHEME.lightGray,
    borderColor: COLOR_SCHEME.lightGray,
  },
  firstTag: {
    marginLeft: width * 0.06,
  },
});
