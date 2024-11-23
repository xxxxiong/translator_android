import AsyncStorage from '@react-native-async-storage/async-storage';

export const getHistory = async () => {
  const history = await AsyncStorage.getItem('history');
  if (history) {
    return JSON.parse(history);
  } else {
    return [];
  }
};

export const setHistory = async (history: any) => {
  await AsyncStorage.setItem('history', JSON.stringify(history));
};
