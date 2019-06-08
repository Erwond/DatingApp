import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';

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