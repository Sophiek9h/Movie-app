import { Stack } from "expo-router";
import "./globals.css";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>

      {/* hide the status bar */}
      <StatusBar hidden ={true} />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />

        <Stack.Screen
          name="(tabs)/search"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="(tabs)/saved"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="(tabs)/profile"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />

        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
      </Stack>
    </>
  );
}
