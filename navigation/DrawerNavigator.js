import React, {Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from "firebase";
import CustomSidebarMenu from "../screens/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      light_theme: true
    };
  }
  
  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function(snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === "light" ? true : false });
  }

  render() {
    return (
      <Drawer.Navigator 
        drawerContentOptions={{
          activateTintColor: '#e91e63',
          inactiveTintColor: this.state.light_theme ? "black" :  "white",
          itemStyle: { marginVertical: 5 },
        }} 
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        screenOptions={{ headerShown: false }}>

        <Drawer.Screen
          name="Login"
          component={StackNavigator}
          options={{ unmountOnBlur: true }} //esta linea en si no es necesaria por que unmountONBlur esta true por default
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
