import { setBehaviorAsync, setVisibilityAsync } from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  setVisibilityAsync("hidden");
  setBehaviorAsync("overlay-swipe");

  return (
    <View style={styles.rootView}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.weather}
        horizontal
        pagingEnabled
        // showsHorizontalScrollIndicator={false}
      >
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootView: { flex: 1, backgroundColor: "tomato" },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  // no flex to container style!
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temperature: { fontSize: 178 },
  description: { fontSize: 60 },
});
