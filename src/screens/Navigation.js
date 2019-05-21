import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';

const LoginNavigation = createStackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen }
},
    {
        initialRouteName: 'Login',
        headerMode: 'none',
    });

const Navigation = createAppContainer(LoginNavigation);

export default Navigation;