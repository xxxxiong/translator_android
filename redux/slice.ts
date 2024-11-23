import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import defaultState from './state';
import {getHistory, setHistory} from './storage';
import type {Data} from './state';

// 获取本地历史记录
export const getHistoryListAsync = createAsyncThunk(
  'translate/getHistoryListAsync',
  async () => {
    const history = await getHistory();
    return history;
  },
);

// 删除本地历史记录
export const deleteHistoryAsync = createAsyncThunk(
  'translate/deleteHistoryAsync',
  async () => {
    await setHistory([]);
  },
);

// 保存历史记录
export const saveHistoryAsync = createAsyncThunk(
  'translate/saveHistoryAsync',
  async (payload: Data, thunkAPI: any) => {
    let arr: Data[] = [...thunkAPI.getState().translate.history];
    arr.unshift(payload);
    await setHistory(arr);
    return arr;
  },
);

const translateSlice: any = createSlice({
  name: 'translate',
  initialState: defaultState,
  reducers: {
    // 选语言
    changeLan: (state, {payload}) => {
      state.curIndex = payload;
    },
  },
  extraReducers: builder => {
    // 获取历史记录
    builder.addCase(getHistoryListAsync.fulfilled, (state, {payload}) => {
      state.history = payload as Data[];
    });
    // 添加历史记录
    builder.addCase(saveHistoryAsync.fulfilled, (state, {payload}) => {
      state.history = payload as Data[];
    });
    // 删除历史记录
    builder.addCase(deleteHistoryAsync.fulfilled, state => {
      state.history = [];
    });
  },
});

export default translateSlice.reducer;

export const {changeLan, addHistory, clearHistory} = translateSlice.actions;
