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
  const Tab = createBottomTabNavigator();

  return (
      <NavigationContainer style={{flex: 1}}>
          <Tab.Navigator style={{flex: 1}}>
              <Tab.Screen name={"Spotlight"} component={SpotlightStack} options={{
                  headerShown: false,
                  tabBarIcon: (focused, color, size) => {
                      return <Ionicons name={"star"} size={size} color={color}/>
                  }
              }}/>
              <Tab.Screen name={"Kategorien"} component={CategoriesStack} options={{
                  headerShown: false,
                  tabBarIcon: (focused, color, size) => {
                      return <Ionicons name={"list-outline"} size={size} color={color}/>
                  }
              }}/>
              <Tab.Screen name={"Warenkorb"} component={Cart} options={{
                  tabBarIcon: (focused, color, size) => {
                      return <Ionicons name={"cart-outline"} size={size} color={color}/>
                  }
              }}/>
              <Tab.Screen name={"Umgebung"} component={Map} options={{
                  tabBarIcon: (focused, color, size) => {
                      return <Ionicons name={"map-outline"} size={size} color={color}/>
                  }
              }}/>
          </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;
