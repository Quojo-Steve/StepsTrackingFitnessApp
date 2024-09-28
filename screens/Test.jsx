import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BarChart } from "react-native-chart-kit";
import { Pedometer } from "expo-sensors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Test = () => {
  const [stepsData, setStepsData] = useState([]);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [todaySteps, setTodaySteps] = useState(0);
  const [todayDistance, setTodayDistance] = useState(0); // Distance in km

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const available = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(available ? "available" : "not available");

    const today = new Date();
    const start = new Date(today);
    start.setHours(0, 0, 0, 0); // Start of the day
    const end = new Date(today);
    end.setHours(23, 59, 59, 999); // End of the day

    // Get steps for today
    const stepCountToday = await Pedometer.getStepCountAsync(start, end);
    setTodaySteps(stepCountToday.steps);

    // Estimate distance based on average stride length (0.762 meters for average adult)
    const strideLengthMeters = 0.762; // Average stride length
    const distanceTodayKm = (stepCountToday.steps * strideLengthMeters) / 1000;
    setTodayDistance(distanceTodayKm.toFixed(2)); // Keep 2 decimal places

    const last7DaysData = [];

    // Loop over the last 7 days and get the steps count for each day
    for (let i = 6; i >= 0; i--) {
      const start = new Date(today);
      start.setDate(today.getDate() - i);
      start.setHours(0, 0, 0, 0);

      const end = new Date(today);
      end.setDate(today.getDate() - i);
      end.setHours(23, 59, 59, 999);

      const stepCount = await Pedometer.getStepCountAsync(start, end);
      last7DaysData.push({
        day: start.toLocaleDateString("en-US", { weekday: "short" }), // Get day name
        steps: stepCount.steps,
      });
    }

    // Update state with step data
    setStepsData(last7DaysData);
  };

  const barData = {
    labels: stepsData.map((data) => data.day), // Display the day names
    datasets: [
      {
        data: stepsData.map((data) => data.steps),
        colors: [
          () => "#4ABFF4", // Color for bar 1
          () => "#36A2EB", // Color for bar 2
          () => "#FFCE56", // Color for bar 3
          () => "#4BC0C0", // Color for bar 4
          () => "#9966FF", // Color for bar 5
          () => "#FF9F40", // Color for bar 6
          () => "#FF6384", // Color for bar 7
        ],
      },
    ],
  };

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
        Total Steps Today
      </Text>
      <Text className="text-left w-full font-bold -mt-1 text-3xl pl-2">
        {todaySteps}
      </Text>

      <Text className="text-left w-full font-light text-base mt-4 pl-2">
        Total Steps (Last 7 Days)
      </Text>

      <BarChart
        data={barData}
        width={Dimensions.get("window").width - 20} // Width of the chart
        height={220}
        yAxisLabel={""}
        chartConfig={{
          backgroundGradientFrom: "#4ABFF4", // Remove gradient background
          backgroundGradientTo: "#4ADDBA", // Remove gradient background
          decimalPlaces: 0, // Show whole numbers only
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Bar colors will be set dynamically
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#4ABFF4",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          padding: 2,
        }}
        flatColor // Ensures the bars are colored without any gradient
      />

      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="run-fast" size={24} color="black" />
          <Text style={{ fontSize: 18, marginLeft: 5 }}>Distance Today</Text>
        </View>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {todayDistance} km
        </Text>
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
