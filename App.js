import type {Node} from 'react';
import React from 'react';
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
              <Tab.Screen name={"Spotlight"} component={SpotlightStack} options={{headerShown: false}}/>
              <Tab.Screen name={"Kategorien"} component={CategoriesStack} options={{headerShown: false}}/>
              <Tab.Screen name={"Warenkorb"} component={Cart}/>
              <Tab.Screen name={"Umgebung"} component={Map}/>
          </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;
