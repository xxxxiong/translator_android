import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLan } from "../redux/slice";

export default function Language() {
  // 获取语言列表
  const lanList = useSelector((state: any) => state.translate.lanList);
  // 获取当前选中的语言
  const curIndex = useSelector((state: any) => state.translate.curIndex);

  const dispatch = useDispatch();
  const pressHandle = (index: number) => {
    // 派发action
    dispatch(changeLan(index));
  };

  return (
    <ScrollView>
      {lanList.map((item: any, index: number) => {
        return (
          <Pressable key={index} onPress={() => pressHandle(index)}>
            {index === curIndex ? (
              <View style={[styles.lanItem, styles.selected]}>
                <Text style={styles.lanTitle}>{item.chs}</Text>
                <Text style={{fontSize: 20, fontWeight: 800, color: '#888',}}>√</Text>
              </View>
            ) : (
              <View style={styles.lanItem}>
                <Text style={styles.lanTitle}>{item.chs}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lanItem: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#aaa",
    paddingLeft: 10,
  },
  selected: {
    paddingRight: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lanTitle: {
    lineHeight: 50,
    color: "#555",
  },
});
