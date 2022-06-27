import type {Node} from 'react';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from "./components/Cart";
import Map from "./components/Map"
import CategoriesStack from "./components/Categories";
import SpotlightStack from "./components/Spotlight";

const App: () => Node = () => {
  const Tab = createBottomTabNavigator(); // 2

  return ( // 1
      <NavigationContainer style={{flex: 1}}> <!-- 3 -->
          <Tab.Navigator style={{flex: 1}}> <!-- 3 -->
              <Tab.Screen name={"Spotlight"} component={SpotlightStack} options={{
                  headerShown: false, // 1
                  tabBarShowLabel: false, // 1
                  tabBarIcon: (focused, color, size) => { // 1
                      return <Ionicons name={"star-outline"} size={30} color={color}/> // 5
                  }
              }}/> <!-- 4 -->
              <Tab.Screen name={"Kategorien"} component={CategoriesStack} options={{
                  headerShown: false, // 1
                  tabBarShowLabel: false, // 1
                  tabBarIcon: (focused, color, size) => { // 1
                      return <Ionicons name={"list-outline"} size={30} color={color}/> // 5
                  }
              }}/> <!-- 4 -->
              <Tab.Screen name={"Warenkorb"} component={Cart} options={{
                  tabBarShowLabel: false, // 1
                  tabBarIcon: (focused, color, size) => { // 1
                      return <Ionicons name={"cart-outline"} size={30} color={color}/> // 5
                  }
              }}/> <!-- 4 -->
              <Tab.Screen name={"Umgebung"} component={Map} options={{
                  tabBarShowLabel: false, // 1
                  tabBarIcon: (focused, color, size) => { // 1
                      return <Ionicons name={"map-outline"} size={30} color={color}/> // 5
                  }
              }}/> <!-- 4 -->
          </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;

// 55
