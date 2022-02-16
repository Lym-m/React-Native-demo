import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Echarts from 'native-echarts';
import Progress from '../../../components/Progress';

const Detail = () => {
  const tabs = [
    {
      title: '周',
    },
    {
      title: '月',
    },
    {
      title: '年',
    },
  ];
  const [selectedTab, setSelectedTab] = useState('周');

  const option = {
    title: {
      text: '销量统计表',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '连衣裙', 'T恤', '牛仔裤'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  const rankData = [
    {
      type: '孩子',
      value: '789',
      rate: '54.9%',
    },
    {
      type: '水果',
      value: '582',
      rate: '40.55',
    },
    {
      type: '居家',
      value: '65',
      rate: '4.5',
    },
    {
      type: '孩子',
      value: '789',
      rate: '54.9%',
    },
    {
      type: '水果',
      value: '582',
      rate: '40.55',
    },
    {
      type: '居家',
      value: '65',
      rate: '4.5',
    },
    {
      type: '孩子',
      value: '789',
      rate: '54.9%',
    },
    {
      type: '水果',
      value: '582',
      rate: '40.55',
    },
    {
      type: '居家',
      value: '65',
      rate: '4.5',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headTab}>
        {tabs.map(item => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                setSelectedTab(item.title);
              }}>
              <View style={styles.tabItem} key={item.title}>
                {item.title === selectedTab && (
                  <Text style={styles.selectTab}>{item.title}</Text>
                )}
                {item.title !== selectedTab && (
                  <Text style={styles.unSelected}>{item.title}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <View style={styles.tabContent}>
        <View>
          <Text style={{fontSize: 12, color: '#696969', marginBottom: 10}}>
            总支出: 1000
          </Text>
          <Text style={{fontSize: 12, color: '#696969'}}>平均: 200</Text>
{/*          <Echarts option={option} height={200} />*/}
        </View>
        <Text>排行榜</Text>
        <ScrollView style={{marginBottom: 20}}>
          {rankData.map(item => {
            return (
              <View style={styles.rank}>
                <Image
                  style={styles.rankLogo}
                  source={require('../../../public/image/mortgage.png')}
                />
                <View style={styles.rankRight}>
                  <View style={styles.rankText}>
                    <Text>
                      {item.type} {item.rate}
                    </Text>
                    <Text>{item.value}</Text>
                  </View>
                  <View>
                    {/*
                    <Progress
                      height={5}
                      row
                      progress={0.8}
                      duration={500}
                      fillColor={'#d7dada'}
                      barColor={'#6285f7'}
                      borderRadius={2}
                    />
                    */}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    top: 0,
    backgroundColor: '#F7F7F6',
    zIndex: 100,
  },
  headTab: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: '#87CEEB',
  },
  tabItem: {
    width: '33%',
    borderWidth: 0.3,
    borderColor: '#DCDCDC',
  },
  unSelected: {
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
  },
  selectTab: {
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
    color: '#87CEEB',
    backgroundColor: '#000000',
  },
  tabContent: {
    height: height - 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  rank: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    lineHeight: 50,
  },
  rankLogo: {
    width: 32,
    height: 32,
  },
  rankRight: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
  },
  rankText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Detail;
