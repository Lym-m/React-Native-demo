import React, {useEffect, useState} from 'react';
import {setTopLevelNavigator} from "./utils/navigationService";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Code from './src/forgetPassword/code';
import Validate from './src/forgetPassword/validate';
import Password from './src/forgetPassword/newPassword'
import Main from './src/main';
import Person from './src/pages/my/person';
import Setting from './src/pages/my/setting';
import SetBudget from './src/pages/my/setBudget';
import BillDetail from './src/pages/home/detail';
import storage from './utils/storage';
import Login from './src/login';
import Loading from './src/loading';
import {Appearance} from 'react-native';
import defaultTheme from './theme/light';
import dark from "./theme/dark";

const Stack = createStackNavigator();
const colorScheme = Appearance.getColorScheme();
const themes = {
  light: defaultTheme,
  dark: dark,
};

const Home = props => {
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    storage
      .load({
        key: 'token',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        if (ret.length) {
          setHasToken(true);
        }
      })
      .catch(error => {
        return false;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLoadData = (data) => {
    setHasToken(data);
  };

  if (hasToken) {
    return <Loading getLoadData={getLoadData}  />;
  } else {
    return <Login />;
  }
};

export const ThemeContext = React.createContext('');

const App = () => {
  const [theme, changeTheme] = useState(themes[colorScheme ? colorScheme : 'light']);

  useEffect(() => {
    changeTheme(themes[colorScheme ? colorScheme : 'light']);
  }, [colorScheme]);
  return (
      <ThemeContext.Provider
          value={{ theme: theme}}>
          <NavigationContainer ref={navigatorRef => {
            setTopLevelNavigator(navigatorRef);
          }}>
            <Stack.Navigator initialRouteName="Home" headerMode="none">
              <Stack.Screen name="登录" component={Home} />
              <Stack.Screen name="获取验证码" component={Code} />
              <Stack.Screen name="验证验证码" component={Validate} />
              <Stack.Screen name="重置密码" component={Password} />
              <Stack.Screen name="主页" component={Main} />
              <Stack.Screen name="个人信息" component={Person} />
              <Stack.Screen name="setting" component={Setting} />
              <Stack.Screen name="setBudget" component={SetBudget} />
              <Stack.Screen name="billDetail" component={BillDetail} />
            </Stack.Navigator>
          </NavigationContainer>
      </ThemeContext.Provider>
  );
};
export default App;
