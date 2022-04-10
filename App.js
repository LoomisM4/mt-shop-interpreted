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
                  tabBarShowLabel: false,
                  tabBarIcon: (focused, color, size) => {
                      return <Ionicons name={"star-outline"} size={30} color={color}/>
                  }
              }}/>
              <Tab.Screen name={"Kategorien"} component={CategoriesStack} options={{
                  headerShown: false,
                  tabBarShowLabel: false,
                  tabBarIcon: (focused, color, size) => {
                      return <Ionicons name={"list-outline"} size={30} color={color}/>
                  }
              }}/>
              <Tab.Screen name={"Warenkorb"} component={Cart} options={{
                  tabBarShowLabel: false,
                  tabBarIcon: (focused, color, size) => {
                      return <Ionicons name={"cart-outline"} size={30} color={color}/>
                  }
              }}/>
              <Tab.Screen name={"Umgebung"} component={Map} options={{
                  tabBarShowLabel: false,
                  tabBarIcon: (focused, color, size) => {
                      return <Ionicons name={"map-outline"} size={30} color={color}/>
                  }
              }}/>
          </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;
