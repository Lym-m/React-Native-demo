import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 30,
  enableCache: true,
});

export default storage;
