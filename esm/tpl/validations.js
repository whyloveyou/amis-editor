/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __assign, __spreadArray, __read } from 'tslib';
import { setSchemaTpl, isObject, getI18nEnabled, defaultValue, getSchemaTpl } from 'amis-editor-core';
import { str2rules } from 'amis';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import { i18n } from 'i18n-runtime';

setSchemaTpl('validations', function () {
  var options = [
  // {
  //     label: '必填',
  //     value: 'isRequired'
  // },
  {
    label: i18n("cff1ec632eaf35f64791615e15ce6d76"),
    value: 'isEmail'
  }, {
    label: i18n("fab6f9029822dea7838bf9908d7f5c09"),
    value: 'isUrl'
  }, {
    label: i18n("55d4790c5d819cd0462cbe89561b0dd4"),
    value: 'isNumeric'
  }, {
    label: i18n("1111c44adfa40fe9cb22797d2c1e37e8"),
    value: 'isAlpha'
  }, {
    label: i18n("725bf3485a0456cf7f65a507ce67254b"),
    value: 'isAlphanumeric'
  }, {
    label: i18n("96c4ea83892a3227a2aa5b8f3759bca4"),
    value: 'isInt'
  }, {
    label: i18n("35962d17a3fba5f4802d7845695a3e72"),
    value: 'isFloat'
  }, {
    label: i18n("28e8e048490110c8dd8e2ad6af324980"),
    value: 'isLength'
  }, {
    label: i18n("8c4ee6022f1525097a1141acad094d4e"),
    value: 'maxLength'
  }, {
    label: i18n("17971609e210034c0d6a25b0186e2b7b"),
    value: 'minLength'
  }, {
    label: i18n("5da893141114a59da868052b3a17a79a"),
    value: 'maximum'
  }, {
    label: i18n("c322edb884724d04842fc35f4d29a24e"),
    value: 'minimum'
  }, {
    label: i18n("92448a35f41de3a1fa69135acfed5ce9"),
    value: 'isPhoneNumber'
  }, {
    label: i18n("193a8c42c1c373f385a4c7b33ffc381e"),
    value: 'isTelNumber'
  }, {
    label: i18n("6102d474314f27577d89e85b4c6cc4a5"),
    value: 'isZipcode'
  }, {
    label: i18n("84e0cb5d57ed995b0cc04b4ab9a7997b"),
    value: 'isId'
  }, {
    label: i18n("8dbec4f0c05be45a8acf6a5ae9d1f880"),
    value: 'isJson'
  }, {
    label: i18n("eb242bc7524c797fb1aee2344dec92da"),
    value: 'equals'
  }, {
    label: i18n("c17d9577233793976d3902c117eed82b"),
    value: 'equalsField'
  }, {
    label: i18n("b457177c184722b655954a08cf3f71ca"),
    value: 'matchRegexp'
  }, {
    label: i18n("d3927ffde0fdefc47f910e70226d6a4e"),
    value: 'matchRegexp1'
  }, {
    label: i18n("0ebee58f4f2a0f807f08a6427dc58497"),
    value: 'matchRegexp2'
  }, {
    label: i18n("15f52cddb226421e68c70488fff3db5b"),
    value: 'matchRegexp3'
  }, {
    label: i18n("271b01959e09c0771760f59964baed56"),
    value: 'matchRegexp4'
  }];
  var trueProps = ['isEmail', 'isUrl', 'isNumeric', 'isAlpha', 'isAlphanumeric', 'isInt', 'isFloat', 'isJson', 'isPhoneNumber', 'isTelNumber', 'isZipcode', 'isId'];
  function firstValue(arr, iterator) {
    var theone = find(arr, iterator);
    return theone ? theone.value : '';
  }
  return {
    type: 'combo',
    syncDefaultValue: false,
    name: 'validations',
    label: i18n("4eddee6a20aceddd6bcdf7e0736887ee"),
    addButtonText: i18n("ba3c802f3ce1641eb6f8986e8d19e672"),
    multiple: true,
    pipeIn: function (value) {
      if (typeof value === 'string' && value) {
        value = str2rules(value);
      }
      if (!isObject(value)) {
        return value;
      }
      var arr = [];
      Object.keys(value).forEach(function (key) {
        var _a;
        if (/^\$\$/.test(key)) {
          return;
        }
        arr.push((_a = {
          type: key
        }, _a[key] = Array.isArray(value[key]) ? value[key][0] : value[key], _a));
      });
      return arr;
    },
    pipeOut: function (value) {
      if (!Array.isArray(value)) {
        return value;
      }
      var obj = {};
      value.forEach(function (item) {
        var key = item.type || firstValue(options, function (item) {
          return !obj[item.value];
        }) || options[0].value;
        obj[key] = item[key] || (~trueProps.indexOf(key) ? true : '');
      });
      return obj;
    },
    items: [{
      type: 'select',
      unique: true,
      name: 'type',
      options: options,
      columnClassName: 'w-sm'
    }, {
      type: 'input-number',
      name: 'isLength',
      visibleOn: 'data.type == "isLength"',
      placeholder: i18n("7be30fe376e9bfd8895ee50e6f4216f3"),
      value: '1'
    }, {
      type: 'input-number',
      name: 'maximum',
      visibleOn: 'data.type == "maximum"',
      placeholder: i18n("d00f99fd76e86ba4dab6f70858010ca0")
    }, {
      type: 'input-number',
      name: 'minimum',
      visibleOn: 'data.type == "minimum"',
      placeholder: i18n("e993ecfbb3f934481257f1bb57056bfe")
    }, {
      type: 'input-number',
      name: 'maxLength',
      visibleOn: 'data.type == "maxLength"',
      placeholder: i18n("99f5d503544334c670cbe1f400aea9e1")
    }, {
      type: 'input-number',
      name: 'minLength',
      visibleOn: 'data.type == "minLength"',
      placeholder: i18n("91bdac623455c91b7400328a5600cec0")
    }, {
      type: 'input-text',
      name: 'equals',
      visibleOn: 'data.type == "equals"',
      placeholder: i18n("7002c4a1b7cb5bc32ffd52e1f2d74c70"),
      value: ''
    }, {
      type: 'input-text',
      name: 'equalsField',
      visibleOn: 'data.type == "equalsField"',
      placeholder: i18n("aa9cfa5321e589494841ddd90a10c467"),
      value: ''
    }, {
      type: 'input-text',
      name: 'matchRegexp',
      visibleOn: 'data.type == "matchRegexp"',
      placeholder: i18n("d22b6fb1c857777ba21467835efc65d6")
    }, {
      type: 'input-text',
      name: 'matchRegexp1',
      visibleOn: 'data.type == "matchRegexp1"',
      placeholder: i18n("d22b6fb1c857777ba21467835efc65d6")
    }, {
      type: 'input-text',
      name: 'matchRegexp2',
      visibleOn: 'data.type == "matchRegexp2"',
      placeholder: i18n("d22b6fb1c857777ba21467835efc65d6")
    }, {
      type: 'input-text',
      name: 'matchRegexp3',
      visibleOn: 'data.type == "matchRegexp3"',
      placeholder: i18n("d22b6fb1c857777ba21467835efc65d6")
    }, {
      type: 'input-text',
      name: 'matchRegexp4',
      visibleOn: 'data.type == "matchRegexp4"',
      placeholder: i18n("d22b6fb1c857777ba21467835efc65d6")
    }]
  };
});
setSchemaTpl('validationErrors', function () {
  var i18nEnabled = getI18nEnabled();
  var options = [
  // {
  //     label: '必填',
  //     value: 'isRequired'
  // },
  {
    label: i18n("cff1ec632eaf35f64791615e15ce6d76"),
    value: 'isEmail'
  }, {
    label: i18n("fab6f9029822dea7838bf9908d7f5c09"),
    value: 'isUrl'
  }, {
    label: i18n("55d4790c5d819cd0462cbe89561b0dd4"),
    value: 'isNumeric'
  }, {
    label: i18n("1111c44adfa40fe9cb22797d2c1e37e8"),
    value: 'isAlpha'
  }, {
    label: i18n("725bf3485a0456cf7f65a507ce67254b"),
    value: 'isAlphanumeric'
  }, {
    label: i18n("96c4ea83892a3227a2aa5b8f3759bca4"),
    value: 'isInt'
  }, {
    label: i18n("35962d17a3fba5f4802d7845695a3e72"),
    value: 'isFloat'
  }, {
    label: i18n("28e8e048490110c8dd8e2ad6af324980"),
    value: 'isLength'
  }, {
    label: i18n("8c4ee6022f1525097a1141acad094d4e"),
    value: 'maxLength'
  }, {
    label: i18n("17971609e210034c0d6a25b0186e2b7b"),
    value: 'minLength'
  }, {
    label: i18n("5da893141114a59da868052b3a17a79a"),
    value: 'maximum'
  }, {
    label: i18n("c322edb884724d04842fc35f4d29a24e"),
    value: 'minimum'
  }, {
    label: i18n("8dbec4f0c05be45a8acf6a5ae9d1f880"),
    value: 'isJson'
  }, {
    label: i18n("92448a35f41de3a1fa69135acfed5ce9"),
    value: 'isPhoneNumber'
  }, {
    label: i18n("193a8c42c1c373f385a4c7b33ffc381e"),
    value: 'isTelNumber'
  }, {
    label: i18n("6102d474314f27577d89e85b4c6cc4a5"),
    value: 'isZipcode'
  }, {
    label: i18n("84e0cb5d57ed995b0cc04b4ab9a7997b"),
    value: 'isId'
  }, {
    label: i18n("eb242bc7524c797fb1aee2344dec92da"),
    value: 'equals'
  }, {
    label: i18n("c17d9577233793976d3902c117eed82b"),
    value: 'equalsField'
  }, {
    label: i18n("b457177c184722b655954a08cf3f71ca"),
    value: 'matchRegexp'
  }, {
    label: i18n("d3927ffde0fdefc47f910e70226d6a4e"),
    value: 'matchRegexp1'
  }, {
    label: i18n("0ebee58f4f2a0f807f08a6427dc58497"),
    value: 'matchRegexp2'
  }, {
    label: i18n("15f52cddb226421e68c70488fff3db5b"),
    value: 'matchRegexp3'
  }, {
    label: i18n("271b01959e09c0771760f59964baed56"),
    value: 'matchRegexp4'
  }];
  var defaultMessages = {
    isEmail: i18n("1b7e06ef04d7167e174eb6929421592f"),
    isRequired: i18n("2d163645de4d4b4760e9fbdb535a1a88"),
    isUrl: i18n("87c91ce706ab845b55ce95372265b92e"),
    isInt: i18n("2b702fb5b95d47944246f79ae4032281"),
    isAlpha: i18n("48e2aca8e6347b008b6fbdb48fc4b597"),
    isNumeric: i18n("de66a286057d4e3f1ee2d9bccbd48ce5"),
    isAlphanumeric: i18n("ae344073ea6ca9ce742899cdf6d3e106"),
    isFloat: i18n("84f46c9b82c3c8fe276dfa65173c59bb"),
    isWords: i18n("48e2aca8e6347b008b6fbdb48fc4b597"),
    isUrlPath: i18n("fb73d98245f558dbb2d6a0c8d2699780"),
    matchRegexp: i18n("923a91fdc2c777f8443c85278060195a"),
    minLength: i18n("d87b1a3d180a1cc56bbd174d2860ca4c"),
    maxLength: i18n("9b8d6abb2f03fbcbdb0e4d2b1970a751"),
    maximum: i18n("2a5d0be4d5cd088f0371ba6f8656fe7a"),
    minimum: i18n("8256618e16217325e6a1d880f8eb7adb"),
    isJson: i18n("f58829312013d929923b0c2a1fbacf19"),
    isPhoneNumber: i18n("161278fb2c71e5a8aa8aac50f230233d"),
    isTelNumber: i18n("ba42949accfe87c20e6c2486cd065dd2"),
    isZipcode: i18n("1d2c5048143328e21cb9c2dd84b696fb"),
    isId: i18n("038b3ed111e87b56572f3945a1b0e02c"),
    isLength: i18n("335e2618dda48c05f4f833ebb1e299df"),
    notEmptyString: i18n("bce45e909d6d14a126554c8cf6f65a13"),
    equalsField: i18n("17bb8e76f78bd16a1841e36ab8462e53"),
    equals: i18n("ab534c35774dccc322331a079ae6e7df")
  };
  function firstValue(arr, iterator) {
    var theone = find(arr, iterator);
    return theone ? theone.value : '';
  }
  return {
    type: 'combo',
    syncDefaultValue: false,
    name: 'validationErrors',
    label: i18n("ebd0dc3ebde6182caa3b66e0faf658b6"),
    description: i18n("d7772d568894afbb1c924bed7f7ddb32"),
    addButtonText: i18n("58c9592f818d706420236c6f9f595517"),
    multiple: true,
    pipeIn: function (value) {
      if (!isObject(value)) {
        return value;
      }
      var arr = [];
      Object.keys(value).forEach(function (key) {
        if (/^\$\$/.test(key)) {
          return;
        }
        arr.push({
          type: key,
          msg: value[key]
        });
      });
      return arr;
    },
    pipeOut: function (value) {
      if (!Array.isArray(value)) {
        return value;
      }
      var obj = {};
      value.forEach(function (item) {
        var key = item.type || firstValue(options, function (item) {
          return !obj[item.value];
        }) || options[0].value;
        obj[key] = item.msg || defaultMessages[key] || '';
      });
      return obj;
    },
    items: [{
      type: 'select',
      unique: true,
      name: 'type',
      options: options,
      columnClassName: 'w-sm'
    }, {
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      name: 'msg',
      placeholder: i18n("99c74120cc62f4bf31d661e3212b7121")
    }, {
      type: 'formula',
      name: 'msg',
      initSet: false,
      formula: "({\n          isEmail: 'Email \u683C\u5F0F\u4E0D\u6B63\u786E',\n          isRequired: '\u8FD9\u662F\u5FC5\u586B\u9879',\n          isUrl: 'Url \u683C\u5F0F\u4E0D\u6B63\u786E',\n          isInt: '\u8BF7\u8F93\u5165\u6574\u5F62\u6570\u5B57',\n          isAlpha: '\u8BF7\u8F93\u5165\u5B57\u6BCD',\n          isNumeric: '\u8BF7\u8F93\u5165\u6570\u5B57',\n          isAlphanumeric: '\u8BF7\u8F93\u5165\u5B57\u6BCD\u6216\u8005\u6570\u5B57',\n          isFloat: '\u8BF7\u8F93\u5165\u6D6E\u70B9\u578B\u6570\u503C',\n          isWords: '\u8BF7\u8F93\u5165\u5B57\u6BCD',\n          isUrlPath: '\u53EA\u80FD\u8F93\u5165\u5B57\u6BCD\u3001\u6570\u5B57\u3001`-` \u548C `_`.',\n          matchRegexp: '\u683C\u5F0F\u4E0D\u6B63\u786E, \u8BF7\u8F93\u5165\u7B26\u5408\u89C4\u5219\u4E3A `$1` \u7684\u5185\u5BB9\u3002',\n          minLength: '\u8BF7\u8F93\u5165\u66F4\u591A\u7684\u5185\u5BB9\uFF0C\u81F3\u5C11\u8F93\u5165 $1 \u4E2A\u5B57\u7B26\u3002',\n          maxLength: '\u8BF7\u63A7\u5236\u5185\u5BB9\u957F\u5EA6, \u8BF7\u4E0D\u8981\u8F93\u5165 $1 \u4E2A\u5B57\u7B26\u4EE5\u4E0A',\n          maximum: '\u5F53\u524D\u8F93\u5165\u503C\u8D85\u51FA\u6700\u5927\u503C $1\uFF0C\u8BF7\u68C0\u67E5',\n          minimum: '\u5F53\u524D\u8F93\u5165\u503C\u4F4E\u4E8E\u6700\u5C0F\u503C $1\uFF0C\u8BF7\u68C0\u67E5',\n          isJson: '\u8BF7\u68C0\u67E5 Json \u683C\u5F0F\u3002',\n          isLength: '\u8BF7\u8F93\u5165\u957F\u5EA6\u4E3A $1 \u7684\u5185\u5BB9',\n          notEmptyString: '\u8BF7\u4E0D\u8981\u5168\u8F93\u5165\u7A7A\u767D\u5B57\u7B26',\n          equalsField: '\u8F93\u5165\u7684\u6570\u636E\u4E0E $1 \u503C\u4E0D\u4E00\u81F4',\n          equals: '\u8F93\u5165\u7684\u6570\u636E\u4E0E $1 \u4E0D\u4E00\u81F4',\n          isPhoneNumber: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u624B\u673A\u53F7\u7801',\n          isTelNumber: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u7535\u8BDD\u53F7\u7801',\n          isZipcode: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u90AE\u7F16\u5730\u5740',\n          isId: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684\u8EAB\u4EFD\u8BC1\u53F7',\n      })[data.type] || ''"
    }]
  };
});
setSchemaTpl('submitOnChange', {
  type: 'switch',
  label: i18n("171f7b825707ddd79175fed3f8def6cd"),
  name: 'submitOnChange',
  mode: 'horizontal',
  horizontal: {
    justify: true,
    left: 8
  },
  inputClassName: 'is-inline ',
  labelRemark: {
    trigger: 'click',
    className: 'm-l-xs',
    rootClose: true,
    content: i18n("6ccb7091c39a5229f7e77eff4dd44a0e"),
    placement: 'left'
  }
});
setSchemaTpl('validateOnChange', {
  type: 'select',
  name: 'validateOnChange',
  overlayPlacement: 'top',
  label: i18n("1a006028adf7167ae28cdf532bb75ef4"),
  options: [{
    label: i18n("8d877748c3bc71b517e2d46344916b3f"),
    value: ''
  }, {
    label: i18n("2c60032f2a57717e4f7c16ee185795d6"),
    value: true
  }, {
    label: i18n("5ed62f810226722d7c910c2d8dc4a0e8"),
    value: false
  }],
  pipeIn: defaultValue(''),
  pipeOut: function (value) {
    return value === '' ? undefined : !!value;
  }
});
setSchemaTpl('validation', function (config) {
  var a = {
    title: i18n("b7579706a363e5f23b1040fecfbcb677"),
    body: [__assign({
      type: 'ae-validationControl',
      mode: 'normal'
    }, config
    // pipeIn: (value: any, data: any) => {
    //   // return reduce(value, (arr: any, item) => {
    //   //   if (typeof item === 'string') {
    //   //     arr.push(item);
    //   //   }
    //   //   else {
    //   //     let isAdd = false;
    //   //     // 优先判断是否具备可展示条件
    //   //     forEach(item?.isShow, (val, key) => {
    //   //       if ([...val].includes(data?.data[key])) {
    //   //         isAdd = true;
    //   //         return false;
    //   //       }
    //   //     })
    //   //     !isAdd  && forEach(item?.isHidden, (val, key) => {
    //   //       const hasExist = [...val].includes(data?.data[key]);
    //   //         isAdd = hasExist ? false : true;
    //   //         if (hasExist) {
    //   //           return false;
    //   //         }
    //   //     })
    //   //     isAdd && arr.push(item.option);
    //   //   }
    //   //   return arr;
    //   // }, []);
    // },
    ), getSchemaTpl('validateOnChange')]
  };
  return a;
});
setSchemaTpl('validationControl', function (value) {
  if (value === void 0) {
    value = [];
  }
  return {
    type: 'ae-validationControl',
    label: i18n("8101a0aec7eba32e633e3cc29f4b7ede"),
    mode: 'normal',
    pipeIn: function (value, data) {
      return reduce(value, function (arr, item) {
        if (typeof item === 'string') {
          arr.push(item);
        } else {
          var isAdd_1 = false;
          // 优先判断是否具备可展示条件
          forEach(item === null || item === void 0 ? void 0 : item.isShow, function (val, key) {
            if (__spreadArray([], __read(val), false).includes(data === null || data === void 0 ? void 0 : data.data[key])) {
              isAdd_1 = true;
              return false;
            }
            return true;
          });
          !isAdd_1 && forEach(item === null || item === void 0 ? void 0 : item.isHidden, function (val, key) {
            var hasExist = __spreadArray([], __read(val), false).includes(data === null || data === void 0 ? void 0 : data.data[key]);
            isAdd_1 = hasExist ? false : true;
            if (hasExist) {
              return false;
            }
            return true;
          });
          isAdd_1 && arr.push(item.option);
        }
        return arr;
      }, []);
    },
    value: value
  };
});
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
