import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHistoryAsync } from "../redux/slice";

export default function History() {
  // 获取历史记录
  const history = useSelector((state: any) => state.translate.history);
  const dispatch = useDispatch<any>();
  const pressHandle = () => {
    Alert.alert("通知", "是否要清除所有的历史记录？", [
      {
        text: "取消",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "确认",
        onPress: () => dispatch(deleteHistoryAsync()),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.font16, {fontWeight: 600}]}>翻译历史</Text>
        <Pressable onPress={pressHandle} style={styles.clearBtn}>
          <Text style={{color: '#777'}}>清除历史记录</Text>
          <Text style={{color: 'gray', fontSize: 20}}>×</Text>
        </Pressable>
      </View>
      {/* 下方为翻译记录 */}
      <ScrollView>
        {history.map((item: any, index: number) => (
          <View style={styles.item} key={index}>
            <View>
              <Text style={[styles.txt, styles.font16]}>{item.txt}</Text>
            </View>
            <View>
              <Text style={{color: '#666'}}>{item.res}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
  },
  item: {
    marginTop: 15,
  },
  txt: {
    color: "#888",
    marginBottom: 5,
  },
  font16: {
    color: '#888',
    fontSize: 16,
  },
});
