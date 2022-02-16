import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ScrollTab from 'react-native-scroll-tab-page';
import {spendDataList, incomeDataList} from '../../../utils/common';
import Popup from '../../../components/Popup';

const {width, height} = Dimensions.get('window');
const Detail = props => {
  const tabs = [
    {title: '支出', index: 0},
    {title: '收入', index: 1},
  ];
  const [showTypePop, setShowTypePop] = useState(false);
  const [spendData, setData] = useState(spendDataList);
  const [incomeData, setIncomeData] = useState(incomeDataList);
  const [selected, setSelected] = useState('');
  const [currentTabId, setCurrentTabId] = useState(0);
  const [detailData, setDetailData] = useState({});

  const changeSelected = name => {
    setSelected(name);
    setShowTypePop(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollTab
          tabs={tabs}
          tabBarTextStyle={{color: '#000000'}}
          tabBarActiveTextStyle={{color: '#000000'}}
          onChange={tab => {
            setCurrentTabId(tab.index);
          }}
          tabBarUnderlineStyle={{backgroundColor: '#000000', height: 1}}
          style={{height: height - 77}}>
          <ScrollView>
            <View style={styles.itemList}>
              {spendData.map(item => {
                return (
                  <View style={styles.item} key={item.uri}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        changeSelected(item.name);
                      }}>
                      <View style={styles.itemWrap}>
                        {item.name === selected && (
                          <View style={styles.selectWrap}>
                            <Image style={styles.logo} source={item.uri} />
                          </View>
                        )}
                        {item.name !== selected && (
                          <View style={styles.logoWrap}>
                            <Image style={styles.logo} source={item.uri} />
                          </View>
                        )}
                        <Text style={styles.labelName}>{item.name}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <ScrollView>
            <View style={styles.itemList}>
              {incomeData.map(item => {
                return (
                  <View style={styles.item} key={item.uri}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        changeSelected(item.name);
                      }}>
                      <View style={styles.itemWrap}>
                        {item.name === selected && (
                          <View style={styles.selectWrap}>
                            <Image style={styles.logo} source={item.uri} />
                          </View>
                        )}
                        {item.name !== selected && (
                          <View style={styles.logoWrap}>
                            <Image style={styles.logo} source={item.uri} />
                          </View>
                        )}
                        <Text style={styles.labelName}>{item.name}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </ScrollTab>
      </View>
      <Popup
        type={currentTabId}
        typeName={selected}
        show={showTypePop}
        closeModal={show => {
          setShowTypePop(show);
        }}
      />
    </SafeAreaView>
  );
};

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
  itemList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  item: {
    width: '24%',
    height: 80,
    marginVertical: 10,
  },
  itemWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: 'rgba(244,234, 42, 1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  logoWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: 'rgba(220,220,220, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 25,
    height: 25,
  },
  labelName: {
    fontSize: 12,
  },
});

export default Detail;
