import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.tomato, flex: 1 }}></View>
      <View style={{ ...styles.teal, flex: 3 }}></View>
      <View style={{ ...styles.orange, flex: 2 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  tomato: { backgroundColor: "tomato" },
  teal: { backgroundColor: "teal" },
  orange: { backgroundColor: "orange" },
});
