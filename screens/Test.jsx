import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import { BarChart } from "react-native-gifted-charts";

const Test = () => {
  const barData = [
    { value: 230, label: "Jan", frontColor: "#4ABFF4" },
    { value: 180, label: "Feb", frontColor: "#79C3DB" },
    { value: 195, label: "Mar", frontColor: "#28B2B3" },
    { value: 250, label: "Apr", frontColor: "#4ADDBA" },
    { value: 320, label: "May", frontColor: "#91E3E3" },
  ];
  return (
    <View className="flex items-center justify-center mt-4 p-2">
      <StatusBar barStyle="dark-content" />
      <View className="flex items-center flex-row w-full justify-between">
        <View className="flex flex-row p-2 items-center">
          <Image
            source={require("../assets/photo.jpeg")}
            className="h-14 w-14 rounded-full border border-gray-500"
          />
          <View className="ml-4">
            <Text className="font-light">Good Morning! 👋🏿</Text>
            <Text className="font-bold text-lg">John Doe</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome6 name="bell" size={24} color="black" />
        </View>
      </View>

      <Text className="text-left w-full font-bold text-3xl mt-2 pl-2">
        My Activity
      </Text>
      <Text className="text-left w-full font-light text-base mt-4 pl-2">
        Total Steps
      </Text>
      <Text className="text-left w-full font-bold -mt-1 text-3xl pl-2">
        12,212
      </Text>

      {/* <View>
        <BarChart
          showFractionalValue
          showYAxisIndices
          noOfSections={4}
          maxValue={400}
          data={barData}
          isAnimated
        />
      </View> */}

      <View>
        <View>
          <Text>Steps</Text>
        </View>
      </View>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center", // Centers the icon within the View
    alignItems: "center", // Centers the icon horizontally within the View
    width: 50, // Width of the round container
    height: 50, // Height of the round container
    borderRadius: 25, // Half of the width/height to make it a circle
    borderWidth: 1, // Thickness of the border
    borderColor: "grey", // Color of the border
  },
});
