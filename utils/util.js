import {imgMap} from './common';

const checkTail = value => {
  if (!value.includes('.')) {
    return true;
  }
  const arr = value.split('.');
  if (arr.length > 2) {
    return false;
  }
  if (arr.length === 2 && arr[1].length > 2) {
    return false;
  }
  return true;
};

const checkHead = value => {
  if (!value.includes('.')) {
    if (value.length > 8) {
      return false;
    }
    return true;
  }
  const arr = value.split('.');
  if (arr.length > 2) {
    return false;
  }
  if (arr.length === 2 && arr[0].length > 8) {
    return false;
  }
  return true;
};

const checkNumber = value => {
  return /^\d+(\.\d+)?$/.exec(value);
};

const checkDensity = (value, callback) => {
  setTimeout(() => {
    if (!value) {
      callback();
    } else if (!checkNumber(Number(value))) {
      callback('只能输入数字');
    } else if (Number(value) > 10 || Number(value) < 0) {
      callback('数值不能大于10且不能小于0');
    } else if (!checkTail(value)) {
      callback('只能输入两位小数');
    } else {
      callback();
    }
  }, 500);
};

const checkViscosity = (value, callback) => {
  setTimeout(() => {
    if (!value) {
      callback();
    } else if (!checkNumber(Number(value))) {
      callback('只能输入数字');
    } else if (Number(value) > 100 || Number(value) < 0) {
      callback('数值不能大于100且不能小于0');
    } else if (!checkTail(value)) {
      callback('只能输入两位小数');
    } else {
      callback();
    }
  }, 500);
};

const checkAngle = (value, callback) => {
  setTimeout(() => {
    if (!value) {
      callback();
    } else if (!checkNumber(Number(value))) {
      callback('只能输入数字');
    } else if (Number(value) > 360 || Number(value) < 0) {
      callback('数值不能大于360且不能小于0');
    } else if (!checkTail(value)) {
      callback('只能输入两位小数');
    } else {
      callback();
    }
  }, 500);
};

const checkCommon = (value, callback) => {
  setTimeout(() => {
    if (!value) {
      callback();
    } else if (!checkNumber(Number(value))) {
      callback('只能输入数字');
    } else if (!checkHead(value)) {
      callback('整数部分最多输入8位！');
    } else if (!checkTail(value)) {
      callback('只能输入两位小数');
    } else {
      callback();
    }
  }, 500);
};

const geyCurrentMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  month = month.padStart(2, '0');
  return year + '-' + month;
};

const getAllMonth = () => {
  let result = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  for (let i = 2000; i <= year; i++) {
    let month = [];
    for (let j = 1; j < 13; j++) {
      month.push(j + '月');
    }
    let _year = {};
    _year[i + '年'] = month;
    result.push(_year);
  }
  return result;
};

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  month = month.padStart(2, '0');
  let day = date.getDate().toString();
  day = day.padStart(2, '0');
  return year + '-' + month + '-' + day;
};

const getAllDate = () => {
  let result = [];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  for (let i = 2000; i <= year; i++) {
    let month = [];
    for (let j = 1; j < 13; j++) {
      let day = [];
      if (j === 2) {
        for (let k = 1; k < 29; k++) {
          day.push(k + '日');
        }
        if (i % 4 === 0) {
          day.push(29 + '日');
        }
      } else if ([1, 3, 5, 7, 8, 10, 12].includes(j)) {
        for (let k = 1; k < 32; k++) {
          day.push(k + '日');
        }
      } else {
        for (let k = 1; k < 31; k++) {
          day.push(k + '日');
        }
      }
      let _month = {};
      _month[j + '月'] = day;
      month.push(_month);
    }
    let _year = {};
    _year[i + '年'] = month;
    result.push(_year);
  }
  return result;
};

const groupBy = (array, f) => {
  const groups = {};
  array.forEach(function (o) {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  });
};

const arrayGroupBy = (list, groupId) => {
  const sorted = groupBy(list, function (item) {
    return [item[groupId]];
  });
  return sorted;
};

const changeList = list => {
  const tableList = [];
  list.forEach(item => {
    if (item) {
      item.uri = imgMap.get(item.typeName);
      tableList.push(item);
    }
  });
  const groupData = arrayGroupBy(tableList, 'date');
  const result = [];
  groupData.forEach(item => {
    let [income, spend] = [0, 0];
    item.forEach(it => {
      if (it.type !== 0) {
        income = income + Number(it.value);
      } else {
        spend = spend + Number(it.value);
      }
    });
    const obj = {
      date: item[0].date,
      income,
      spend,
      data: item,
    };
    result.push(obj);
  });
  result.sort((a, b) => {
    return a.date < b.date;
  });
  return result;
};
export {
  checkAngle,
  checkCommon,
  checkDensity,
  checkViscosity,
  getAllDate,
  getCurrentDate,
  changeList,
  getAllMonth,
  geyCurrentMonth,
};
