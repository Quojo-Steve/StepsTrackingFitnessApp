import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native"; // Import the navigation hook

const FirstScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    // Set a timeout for 3 seconds to navigate to another page
    const timer = setTimeout(() => {
      navigation.navigate("test");
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/loading.gif")} // Replace with your GIF URL or path
        style={styles.gif}
      />
      <Text style={styles.title}>
        Walk<Text style={styles.highlight}>A</Text>thon
      </Text>
      <Text>Fitness app</Text>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  highlight: {
    color: "blue",
  },
});
