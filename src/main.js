import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './pages/home/home';
import Report from './pages/report/report';
import Add from './pages/add/add';
import Detail from './pages/detail/detail';
import My from './pages/my/my';
import React from 'react';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name !== ' ') {
            let iconName;
            if (route.name === '总览') {
              iconName = focused
                ? require('../public/image/home.png')
                : require('../public/image/home_selected.png');
            } else if (route.name === '报表') {
              iconName = focused
                ? require('../public/image/chart.png')
                : require('../public/image/chart_selected.png');
            } else if (route.name === '明细') {
              iconName = focused
                ? require('../public/image/detail.png')
                : require('../public/image/detail_selected.png');
            } else {
              iconName = focused
                ? require('../public/image/my.png')
                : require('../public/image/my_selected.png');
            }
            return <Image source={iconName} style={{width: 16, height: 16}} />;
          } else {
            return (
              <Image
                source={require('../public/image/add.png')}
                style={{width: 32, height: 32, marginTop: 15}}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="总览" component={Home} />
      <Tab.Screen name="报表" component={Report} />
      <Tab.Screen name=" " component={Add} />
      <Tab.Screen name="明细" component={Detail} />
      <Tab.Screen name="个人中心" component={My} />
    </Tab.Navigator>
  );
}

export default MyTabs;
