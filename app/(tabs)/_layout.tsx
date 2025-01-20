import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Image, Platform, Text, View } from "react-native";
// import { useTheme } from '@/hooks/useTheme';

export default function TabLayout() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabBarStyle = Platform.select({
    ios: {
      backgroundColor: "#FFF9FB",
      borderTopWidth: 0,
      paddingBottom: 16,
      height: 70,
      paddingTop: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      backgroundColor: "#FFF9FB",
      borderTopWidth: 0,
      paddingBottom: 16,
      height: 70,
      paddingTop: 16,
      elevation: 8,
    },
  });

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle,
      }}
      screenListeners={{
        tabPress: (e) => {
          const route = e.target?.split("-")[0];
          switch (route) {
            case "index":
              setActiveIndex(0);
              break;
            case "bookmark":
              setActiveIndex(1);
              break;
            case "search":
              setActiveIndex(2);
              break;
            case "quotes":
              setActiveIndex(3);
              break;
          }
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home"
              color={""}
              focused={focused}
              index={0}
              activeIndex={activeIndex}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmarks",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="bookmark"
              color={""}
              focused={focused}
              index={1}
              activeIndex={activeIndex}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="search"
              color={""}
              focused={focused}
              index={2}
              activeIndex={activeIndex}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="quotes"
        options={{
          title: "Quotes",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="star"
              color={""}
              focused={focused}
              index={3}
              activeIndex={activeIndex}
            />
          ),
        }}
      />
    </Tabs>
  );
}
