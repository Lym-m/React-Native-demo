import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Swipeout from 'react-native-swipeout';

const Detail = () => {
  const [tableData, setTableData] = useState([]);
  const [isEnd, setIsEnd] = useState(true);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = () => {
    setTableData([
      {
        date: '2021-08',
        total: '666',
        data: [
          {
            time: '2021-08-09 13:24',
            value: '125',
            type: 'shopping',
            name: '逛街',
          },
          {
            time: '2021-08-09 16:44',
            value: '12.4',
            type: 'food',
            name: '零食',
          },
          {
            time: '2021-08-09 16:50',
            value: '4',
            type: 'traffic',
            name: '公交车',
          },
          {
            time: '2021-08-09 20:21',
            value: '65',
            type: 'online',
            name: '网上买衣服',
          },
        ],
      },
      {
        date: '2021-07',
        total: '666',
        data: [
          {
            time: '2021-07-31 07:11',
            value: '12',
            type: 'food',
            name: '早餐',
          },
          {
            time: '2021-07-31 10:33',
            value: '6',
            type: 'traffic',
            name: '地铁',
          },
          {
            time: '2021-07-31 12:04',
            value: '24',
            type: 'online',
            name: '网购',
          },
          {
            time: '2021-07-31 17:49',
            value: '15',
            type: 'food',
            name: '晚餐',
          },
        ],
      },
      {
        date: '2021-06',
        total: '666',
        data: [
          {
            time: '2021-06-15 13:24',
            value: '125',
            type: 'food',
            name: '午餐',
          },
          {
            time: '2021-06-15 16:44',
            value: '12.4',
            type: 'shopping',
            name: '逛街',
          },
          {
            time: '2021-06-15 16:50',
            value: '4',
            type: 'traffic',
            name: '公交车',
          },
          {
            time: '2021-06-15 20:21',
            value: '65',
            type: 'online',
            name: '外卖',
          },
        ],
      },
    ]);
  };

  const imgMap = new Map(
    Object.entries({
      food: require('../../../public/icon/food.png'),
      fruit: require('../../../public/icon/fruit.png'),
      movie: require('../../../public/icon/movie.png'),
      online: require('../../../public/icon/online.png'),
      other: require('../../../public/icon/other.png'),
      phone: require('../../../public/icon/phone.png'),
      rent: require('../../../public/icon/rent.png'),
      shopping: require('../../../public/icon/shopping.png'),
      traffic: require('../../../public/icon/traffic.png'),
    }),
  );

  const swipeoutBtn = [
    {
      text: '删除',
      backgroundColor: 'red',
      onPress: () => {
        console.log('删除');
      },
    },
  ];
  const Item = ({items}) => {
    const uri = imgMap.get(items.type);
    return (
      <View>
        <Swipeout right={swipeoutBtn} autoClose={true} close={true}>
          <TouchableWithoutFeedback
            onPress={() => {
              // navigation.navigate('常规数据详情', {detail: items});
            }}>
            <View style={styles.tableBody}>
              <View style={styles.iconCol}>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginLeft: 10,
                  }}
                  source={uri}
                />
              </View>
              <View style={styles.textCol}>
                <View>
                  <View>
                    <Text style={styles.nameFont}>{items.name}</Text>
                  </View>
                  <View>
                    <Text style={styles.smallFont}>{items.time}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.moneyFont}>￥{items.value}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Swipeout>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View />
      <View style={{marginHorizontal: 16}}>
        <SectionList
          stickySectionHeadersEnabled={true}
          progressViewOffset={50}
          sections={tableData}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item items={item} />}
          ListFooterComponent={() =>
            isEnd && (
              <View
                style={{
                  alignItems: 'center',
                  height: 20,
                  padding: 2,
                }}>
                <Text style={{fontSize: 12, color: 'grey'}}>没有更多了</Text>
              </View>
            )
          }
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: 'center',
                height: 25,
                padding: 2,
                marginTop: 20,
              }}>
              <Text style={{fontSize: 18, color: 'grey'}}>暂无数据</Text>
            </View>
          )}
          renderSectionHeader={({section: {date, total}}) => (
            <View style={styles.tableHeader}>
              <Text style={styles.headerDate}>{date}</Text>
              <Text style={styles.headerText}>支出 ￥{total}</Text>
              <Text />
            </View>
          )}
        />
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
    height: height - 80,
    left: 0,
    top: 0,
    backgroundColor: '#F7F7F6',
    zIndex: 100,
  },
  tableHeader: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 5,
    backgroundColor: '#F7F7F6',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDate: {
    width: '75%',
    fontSize: 12,
    color: '#000000',
  },
  headerText: {
    fontSize: 12,
    color: '#FF6347',
  },
  tableBody: {
    width: width,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
  },
  iconCol: {
    width: '12%',
  },
  textCol: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: '#D3D3D3',
    paddingRight: 20,
  },
  smallFont: {
    fontSize: 11,
    marginTop: 10,
    marginBottom: 5,
  },
  nameFont: {
    color: '#1E90FF',
  },
  moneyFont: {
    height: 40,
    lineHeight: 40,
    color: '#191970',
    textAlign: 'left',
  },
});

export default Detail;
