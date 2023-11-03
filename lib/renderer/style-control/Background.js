/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
require('axios');
var cx = require('classnames');
var pick = require('lodash/pick');
var omit = require('lodash/omit');
var React = require('react');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * @file Background.ts
 * @description 背景设置
 */
var Background = function (props) {
  var _a;
  var _b = tslib.__read(React.useState(0), 2),
    tabIndex = _b[0],
    setTabIndex = _b[1];
  var noImage = props.noImage,
    render = props.render;
  var tabList = noImage ? ['pure', 'gradient', 'noset'] : ['pure', 'gradient', 'image', 'noset'];
  function onChange(key) {
    return function (e) {
      var _a;
      var _b, _c, _d;
      var eventValue = e !== null && typeof e === 'object' ? typeof e.target === 'object' ? e.target.value : e.value : e;
      var value = props.value,
        onChange = props.onChange;
      var result = tslib.__assign(tslib.__assign({}, value), (_a = {}, _a[key] = eventValue, _a));
      // 透明度
      if (key === 'alpha') {
        result.backgroundColor = (_b = result.backgroundColor) === null || _b === void 0 ? void 0 : _b.replace(/,\s(1|0){1}.?[0-9]*\)$/g, ", ".concat(e / 100, ")"));
      }
      // 位置
      if (key === 'backgroundPosition') {
        result.backgroundPosition = e.target.getAttribute('data-pos');
      }
      // 背景大小级平铺模式
      if (key === 'backgroundSize') {
        var bsValue = eventValue !== null && eventValue !== void 0 ? eventValue : '';
        var bsArr = bsValue.split(' ');
        // 0位size 1位平铺方式
        if (bsArr.length > 1) {
          result.backgroundSize = bsArr[0];
          result.backgroundRepeat = bsArr[1];
        } else {
          result.backgroundSize = bsValue;
          result.backgroundRepeat = 'no-repeat';
        }
      }
      // 渐变色角度
      if (key === 'angle') {
        var backgroundImage = (_c = result.backgroundImage) !== null && _c !== void 0 ? _c : '';
        var lineraGradient = backgroundImage.indexOf('linear-gradient') !== -1 ? backgroundImage : 'linear-gradient(180deg, transparent, transparent)';
        result.backgroundImage = lineraGradient.replace(/linear-gradient\(\d{1,3}/g, "linear-gradient(".concat(eventValue));
      }
      // 渐变色
      if (key === 'gradientPrev' || key === 'gradientNext') {
        var backgroundImage = (_d = result.backgroundImage) !== null && _d !== void 0 ? _d : '';
        var lineraGradient = backgroundImage.indexOf('linear-gradient') !== -1 ? backgroundImage : 'linear-gradient(180deg, transparent, transparent)';
        var tempArr = lineraGradient.split(', ');
        var len = tempArr.length;
        // 前景色
        if (key === 'gradientPrev') {
          if (len === 3) {
            tempArr[1] = eventValue;
          } else if (len === 5 || len === 6) {
            var startPos = 0;
            var endPos = 0;
            for (var i = 0; i < len; i++) {
              if (tempArr[i].indexOf('rgb') !== -1) {
                startPos = i;
              }
              if (tempArr[i].indexOf(')') !== -1 && endPos === 0) {
                endPos = i;
              }
            }
            // 后景色是rgb或rgba
            if (endPos === len - 1) {
              tempArr.splice(1, 1, eventValue);
            } else {
              tempArr.splice(startPos, endPos + 1, eventValue);
            }
          } else if (len >= 7) {
            // 前景色和后景色都是rgb
            for (var i = 0; i < len; i++) {
              var pos = tempArr[i].indexOf(')');
              if (pos !== -1) {
                tempArr.splice(1, i, eventValue);
                break;
              }
            }
          }
        }
        // 后景色
        if (key === 'gradientNext') {
          if (len === 3) {
            tempArr[2] = eventValue + ')';
          } else if (len === 5 || len === 6) {
            var startPos = 0;
            var endPos = 0;
            for (var i = 0; i < len; i++) {
              if (tempArr[i].indexOf('rgb') !== -1) {
                startPos = i;
              }
              if (tempArr[i].indexOf(')') !== -1 && endPos === 0) {
                endPos = i;
              }
            }
            // 后景色是rgb或rgba
            if (endPos === len - 1) {
              tempArr.splice(startPos, endPos + 1, eventValue + ')');
            } else {
              tempArr.splice(-1, 1, eventValue + ')');
            }
          } else if (len >= 7) {
            // 前景色和后景色都是rgb
            var flag = 0;
            for (var i = 0; i < len; i++) {
              var pos = tempArr[i].indexOf('rgb');
              if (pos !== -1) {
                flag++;
                if (flag === 2) {
                  tempArr.splice(i, len - i + 1, eventValue);
                  break;
                }
              }
            }
          }
        }
        result.backgroundImage = tempArr.join(', ');
        result = pick__default["default"](result, 'backgroundImage');
      }
      // 删除无用属性
      if (key === 'alpha' || key === 'backgroundColor') {
        result = pick__default["default"](result, 'backgroundColor');
      }
      if (key === 'backgroundImage' || key === 'backgroundPosition' || key === 'backgroundSize') {
        if (/linear-gradient/g.test(result === null || result === void 0 ? void 0 : result.backgroundImage)) {
          result = pick__default["default"](result, 'backgroundPosition', 'backgroundSize', 'backgroundRepeat');
        } else {
          result = pick__default["default"](result, 'backgroundImage', 'backgroundPosition', 'backgroundSize', 'backgroundRepeat');
        }
      }
      onChange(tslib.__assign(tslib.__assign({}, omit__default["default"](value, ['backgroundColor', 'backgroundImage', 'backgroundPosition', 'backgroundSize', 'backgroundRepeat', 'angle', 'gradientNext', 'gradientPrev'])), result));
    };
  }
  // 获取渐变颜色
  function getGradient(type) {
    var _a;
    var linearGradient = (_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundImage;
    var prevColor = '';
    var nextColor = '';
    if (/linear-gradient/g.test(linearGradient)) {
      var tempArr = linearGradient.split(', ');
      var len = tempArr.length;
      if (len === 3) {
        // 非rgb颜色
        prevColor = tempArr[1];
        nextColor = tempArr[2].slice(0, -1);
      } else if (len === 5 || len === 6) {
        // rgb或rgba颜色
        var startPos = 0;
        var endPos = 0;
        for (var i = 0; i < len; i++) {
          if (tempArr[i].indexOf('rgb') !== -1) {
            startPos = i;
          }
          if (tempArr[i].indexOf(')') !== -1 && endPos === 0) {
            endPos = i;
            if (i !== len - 1) {
              prevColor = tempArr.slice(startPos, i + 1).join(', ');
              nextColor = tempArr.slice(i + 1).join('').slice(0, -1);
            } else {
              prevColor = tempArr.slice(1, startPos).join('');
              nextColor = tempArr.slice(startPos, len - 1).join(', ');
            }
          }
        }
      } else if (len >= 7) {
        // 前景色和后景色都是rgb或rgba
        var prevStartPos = 0;
        var prevEndPos = 0;
        var nextStartPos = 0;
        var nextEndPos = 0;
        for (var i = 0; i < len; i++) {
          if (tempArr[i].indexOf('rgb') !== -1) {
            if (prevStartPos === 0) {
              prevStartPos = i;
            } else if (nextStartPos === 0) {
              nextStartPos = i;
            }
          }
          if (tempArr[i].indexOf(')') !== -1) {
            if (prevEndPos === 0) {
              prevEndPos = i;
            } else if (nextEndPos === 0) {
              nextEndPos = i;
            }
          }
        }
        prevColor = tempArr.slice(prevStartPos, prevEndPos + 1).join(', ');
        nextColor = tempArr.slice(nextStartPos, nextEndPos).join(', ');
      }
      linearGradient.split('');
    }
    var returnColor = type === 'prev' ? prevColor : nextColor;
    if (returnColor === 'transparent') {
      return '';
    }
    return returnColor;
  }
  // 获取渐变角度
  function getGradientAngle() {
    var _a;
    var linearGradient = (_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundImage;
    var angle = 180;
    var match = /linear-gradient\((\d{1,3})/.exec(String(linearGradient || ''));
    if (match) {
      angle = +match[1];
    }
    return +angle;
  }
  // 获取激活的tab
  function setActiveTab() {
    var value = props.value;
    if ((value === null || value === void 0 ? void 0 : value.backgroundColor) || (value === null || value === void 0 ? void 0 : value.alpha)) {
      // 背景色
      setTabIndex(0);
    } else if (value === null || value === void 0 ? void 0 : value.backgroundImage) {
      if (/linear-gradient/g.test(value.backgroundImage)) {
        // 渐变色
        setTabIndex(1);
      } else {
        // 图片
        setTabIndex(2);
      }
    } else if ((value === null || value === void 0 ? void 0 : value.backgroundPosition) || (value === null || value === void 0 ? void 0 : value.backgroundSize)) {
      // 图片
      setTabIndex(2);
    } else {
      // 无背景
      setTabIndex(tabList.length - 1);
    }
  }
  // 背景图尺寸设置
  function getbsValue() {
    var _a, _b;
    var backgroundSize = ((_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundSize) || 'auto';
    var backgroundRepeat = (_b = props.value) === null || _b === void 0 ? void 0 : _b.backgroundRepeat;
    var returnVal = backgroundSize || '';
    if (backgroundSize === 'auto' && backgroundRepeat) {
      returnVal = backgroundSize + ' ' + backgroundRepeat;
    }
    return returnVal;
  }
  // 背景图路径设置
  function getbgValue() {
    var _a, _b;
    var backgroundImage = (_b = (_a = props.data) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.backgroundImage;
    return /linear-gradient/g.test(backgroundImage) ? '' : backgroundImage;
  }
  // 清空背景颜色、渐变色、背景图
  function clearValues() {
    var value = props.value,
      onChange = props.onChange;
    var result = tslib.__assign(tslib.__assign({}, value), {
      backgroundSize: '',
      backgroundPosition: '',
      backgroundColor: '',
      backgroundImage: ''
    });
    onChange(result);
  }
  function tabChange(index, item) {
    if (item === 'noset') {
      clearValues();
    }
    setTabIndex(index);
  }
  function handleChange(key, keyValue) {
    var _a, _b;
    var value = props.value,
      onChange = props.onChange;
    var result = {};
    if (key === 'backgroundColor') {
      result = tslib.__assign(tslib.__assign({}, omit__default["default"](value, ['backgroundImage', 'backgroundPosition', 'backgroundSize', 'backgroundRepeat', 'angle'])), (_a = {}, _a[key] = keyValue, _a));
    } else if (key === 'angle') {
      keyValue = keyValue || 0;
      var linearGradient = value === null || value === void 0 ? void 0 : value.backgroundImage;
      var backgroundImage = linearGradient === null || linearGradient === void 0 ? void 0 : linearGradient.replace(/(\d{1,})?deg/, "".concat(keyValue, "deg"));
      result = tslib.__assign(tslib.__assign({}, value), {
        backgroundImage: backgroundImage
      });
    } else {
      result = tslib.__assign(tslib.__assign({}, value), (_b = {}, _b[key] = keyValue, _b));
    }
    onChange(result);
  }
  var currentItem = tabList[tabIndex];
  React.useEffect(function () {
    setActiveTab();
  }, []);
  return React__default["default"].createElement("div", {
    className: "ae-Background"
  }, React__default["default"].createElement("div", {
    className: "ae-Background_tabs"
  }, React__default["default"].createElement("ul", {
    className: "ae-Background_tabs-nav"
  }, tabList.map(function (item, index) {
    return React__default["default"].createElement("li", {
      key: index,
      className: cx__default["default"](item, {
        active: tabIndex === index
      }),
      onClick: function () {
        return tabChange(index, item);
      }
    });
  })), React__default["default"].createElement("div", {
    className: "ae-Background_tabs-content"
  }, currentItem === 'pure' && React__default["default"].createElement("div", {
    className: "ae-Background_setting"
  }, render('backgroundColor', {
    type: 'input-color',
    label: i18nRuntime.i18n("2f97db95d75280bfedc5afa72d2c717d"),
    format: 'rgba',
    mode: 'normal',
    value: (_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundColor
  }, {
    onChange: function (value) {
      return handleChange('backgroundColor', value);
    }
  })), currentItem === 'gradient' && React__default["default"].createElement("div", {
    className: "ae-Background_setting"
  }, React__default["default"].createElement("div", {
    className: "ae-Background_setting-item"
  }, React__default["default"].createElement("div", {
    className: "ae-Background_setting-item_color"
  }, render('prev', {
    type: 'input-color',
    label: i18nRuntime.i18n("7241f67ee4fa8e0adb5d602b5f9516df"),
    clearable: false,
    placeholder: i18nRuntime.i18n("9f1b854df133912bb46203e84f0594ee"),
    inputClassName: 'ae-Background-colorpicker',
    value: getGradient('prev')
  }, {
    onChange: onChange('gradientPrev')
  })), React__default["default"].createElement("div", {
    className: "ae-Background_setting-item_pic"
  }), React__default["default"].createElement("div", {
    className: "ae-Background_setting-item_color"
  }, render('next', {
    type: 'input-color',
    label: i18nRuntime.i18n("8ea65e3d4e52c871d1c58b1926380ab0"),
    clearable: false,
    placeholder: i18nRuntime.i18n("0c46a7f77a7247a9cc6d6e995c0ea8cb"),
    inputClassName: 'ae-Background-colorpicker',
    value: getGradient('next')
  }, {
    onChange: onChange('gradientNext')
  }))), React__default["default"].createElement("div", {
    className: "ae-Background_setting-item"
  }, render('gradient', {
    type: 'input-number',
    label: i18nRuntime.i18n("c7706039e8ad85969df13ce3458d199a"),
    mode: 'row',
    step: 10,
    min: 0,
    max: 360,
    value: getGradientAngle(),
    description: i18nRuntime.i18n("f4882cbf65b232af449d7289354b9a16")
  }, {
    onChange: function (value) {
      return handleChange('angle', value);
    }
  }))), currentItem === 'image' && React__default["default"].createElement("div", {
    className: "ae-Background_setting"
  }, render('image', {
    type: 'group',
    mode: 'horizontal',
    body: [amisEditorCore.getSchemaTpl('backgroundImageUrl', {
      name: 'backgroundImage',
      placeholder: i18nRuntime.i18n("5b9ea77bb6ce2d6c82e97b120d757201"),
      fixedSize: true,
      value: getbgValue(),
      onChange: onChange('backgroundImage'),
      fixedSizeClassName: 'ae-Background-upload',
      accept: '.jpg,.png,.svg,.gif',
      crop: true,
      columnRatio: 6,
      horizontal: {
        left: 4,
        right: 8
      }
    }), {
      type: '',
      label: i18nRuntime.i18n("61a87a021904dc65995e99d4c476cb21"),
      name: 'backgroundPosition',
      asFormItem: true,
      columnRatio: 6,
      horizontal: {
        left: 4,
        right: 8
      },
      children: function () {
        return React__default["default"].createElement("ul", {
          className: "ae-Background_setting\u2014pos"
        }, ['0 0', '50% 0', '100% 0', '0 50%', '50% 50%', '100% 50%', '0 100%', '50% 100%', '100% 100%'].map(function (item) {
          var _a;
          return React__default["default"].createElement("li", {
            key: item,
            "data-pos": item,
            className: cx__default["default"]('ae-Background_setting—pos_item', {
              active: item === ((_a = props.value) === null || _a === void 0 ? void 0 : _a.backgroundPosition)
            }),
            onClick: onChange('backgroundPosition')
          });
        }));
      }
    }]
  }), render('size', {
    type: 'select',
    label: i18nRuntime.i18n("737391648d1216a1f84ac9ff52da5aa2"),
    name: 'backgroundSize',
    mode: 'horizontal',
    placeholder: i18nRuntime.i18n("737391648d1216a1f84ac9ff52da5aa2"),
    value: getbsValue(),
    options: [{
      label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
      value: 'auto'
    }, {
      label: i18nRuntime.i18n("0f1fd39145bad43e18f81337e0144c8c"),
      value: 'cover'
    }, {
      label: i18nRuntime.i18n("e0d76824dfe5e09c7068b44f605266d2"),
      value: 'contain'
    }, {
      label: i18nRuntime.i18n("e39d3b7a3600d9327221a637f910fc0b"),
      value: '100%'
    }, {
      label: i18nRuntime.i18n("e1ff2c83c09f2dc6cc74ae02ab6b8222"),
      value: 'auto repeat'
    }, {
      label: i18nRuntime.i18n("7ddd9dbf373f760acfd63778469b5c4b"),
      value: 'auto repeat-x'
    }, {
      label: i18nRuntime.i18n("4ab931e0f709f9b493e660156925a113"),
      value: 'auto repeat-y'
    }, {
      label: i18nRuntime.i18n("21f3929a4484e6e992af64ec1dd3a576"),
      value: 'auto no-repeat'
    }]
  }, {
    onChange: function (value) {
      return handleChange('backgroundSize', value);
    }
  })), currentItem === 'noset' && React__default["default"].createElement("div", {
    className: "ae-Background_setting noset"
  }))));
};
/** @class */(function (_super) {
  tslib.__extends(BackgroundRenderer, _super);
  function BackgroundRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  BackgroundRenderer.prototype.render = function () {
    return React__default["default"].createElement(Background, tslib.__assign({}, this.props));
  };
  BackgroundRenderer = tslib.__decorate([amis.FormItem({
    type: 'style-background'
  })], BackgroundRenderer);
  return BackgroundRenderer;
})(React__default["default"].Component);

exports["default"] = Background;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
