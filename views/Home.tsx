import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import React, { Reducer, useEffect, useState } from "react";
import translateFunc from "../api/translate";
import { useDispatch, useSelector } from "react-redux";
import {getHistoryListAsync, saveHistoryAsync } from "../redux/slice";

export default function Home() {
  // 输入文本
  const [content, setContent] = useState("");
  // 翻译结果文本
  const [result, setResult] = useState("");
  // 获取语言列表
  const lanList = useSelector((state: any) => state.translate.lanList);
  // 获取当前选中的语言
  const curIndex = useSelector((state: any) => state.translate.curIndex);
  // 是否可以翻译
  const [isTranslated, setIsTranslated] = useState(false);

  const dispatch = useDispatch<any>();

  const setCanTranslate = (text: string) => {
    setContent(text);
    setIsTranslated(false)
  };

  useEffect(() => {
    setIsTranslated(false)
  }, [curIndex])

  useEffect(() => {
    dispatch(getHistoryListAsync())
  }, [dispatch])

  const pressHandle = () => {
    if (content && !isTranslated) {
      // 进行翻译
      translateFunc(content, {
        from: "auto",
        to: lanList[curIndex].lang,
      }).then((res) => {
        setResult(res);
        setIsTranslated(true)
        // 写入历史记录
        console.log(11111);
        
        dispatch(
          saveHistoryAsync({
            txt: content,
            res,
          })
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4b3c96"></StatusBar>
      {/* 上面翻译成哪国语言 */}
      <View style={styles.lan}>
        <Text style={styles.lanTxt}>
          翻译为
          <Text style={{ color: "#1c1b21", fontWeight: 900 }}>
            {lanList[curIndex].chs}
          </Text>
        </Text>
      </View>
      {/* 输入要翻译的文本 */}
      <TextInput
        multiline
        numberOfLines={10}
        placeholder="请输入您要翻译的文本"
        placeholderTextColor="#c7c7c7"
        style={styles.txtInput}
        value={content}
        onChangeText={setCanTranslate}
        textAlignVertical="top"
      />
      {/* 显示译文区域 */}
      <Pressable style={styles.resultContainer} onPress={pressHandle}>
        <Text style={{color: '#777'}}>( 点击下面空白处翻译 )</Text>
        <Text style={styles.resultTitle}>译文: </Text>
        
        {
          result ? (
            <Text style={{fontSize: 18, color: '#1c1b21', fontWeight: 600}}>
              {result}
            </Text>
          ) : (
            <Text style={{textAlign: 'center',  fontSize: 18, color: '#1c1b21', fontWeight: 600}}>
              点击此处进行翻译
            </Text>
          )
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lan: {
    width: 100,
    height: 30,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lanTxt: {
    color: "#888",
    fontSize: 14,
  },
  txtInput: {
    borderColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    color: '#666',
    padding: 10,
    paddingTop: 15,
    flex: 0.7,
  },
  resultContainer: {
    flex: 1,
    padding: 10,
  },
  resultTitle: {
    color: '#777',
    fontSize: 18,
    marginBottom: 10,
  },
});
