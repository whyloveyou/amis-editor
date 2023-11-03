/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var cx = require('classnames');
var React = require('react');
var camelCase = require('lodash/camelCase');
var mobxReact = require('mobx-react');
var amis = require('amis');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var camelCase__default = /*#__PURE__*/_interopDefaultLegacy(camelCase);

/**
 * @file 边框圆角
 * @description 边框 & 圆角设置
 */
var borderItems = [{
  item: 'left',
  tip: i18nRuntime.i18n("a80a25b59908402cf7ee31a07d0e7739"),
  content: '┣'
}, {
  item: 'top',
  tip: i18nRuntime.i18n("e0dfa25ebceabddb2180720d36d4c3b6"),
  content: '┳'
}, {
  item: 'right',
  tip: i18nRuntime.i18n("57463587977a534f7859eb9d7c536629"),
  content: '┫'
}, {
  item: 'bottom',
  tip: i18nRuntime.i18n("154d5216e42c916884431f0eea951999"),
  content: '┻'
}, {
  item: 'all',
  tip: i18nRuntime.i18n("a8b0c20416853bda54120bf19477ad11"),
  content: '╋'
}];
var radiusItems = [{
  item: 'top-left',
  tip: i18nRuntime.i18n("df68a5dc8f8847179b7afdf943f80796"),
  content: '┏'
}, {
  item: 'top-right',
  tip: i18nRuntime.i18n("e717b4ae480e7c073fd5a44647a7f0da"),
  content: '┓'
}, {
  item: 'bottom-left',
  tip: i18nRuntime.i18n("2a97dfb2d236c87c41fd588f006111dc"),
  content: '┗'
}, {
  item: 'bottom-right',
  tip: i18nRuntime.i18n("1c9bc9dab33944e953412f8b22cb024a"),
  content: '┛'
}, {
  item: 'all',
  tip: i18nRuntime.i18n("a8b0c20416853bda54120bf19477ad11"),
  content: '╋'
}];
function BoxBorder(_a) {
  var _b = _a.disableBorder,
    disableBorder = _b === void 0 ? false : _b,
    _c = _a.disableRadius,
    disableRadius = _c === void 0 ? false : _c,
    onChange = _a.onChange,
    _d = _a.value,
    value = _d === void 0 ? {} : _d,
    render = _a.render;
  var _e = tslib.__read(React.useState('all'), 2),
    borderItem = _e[0],
    setBorderItem = _e[1];
  var _f = tslib.__read(React.useState('all'), 2),
    radiusItem = _f[0],
    setRadiusItem = _f[1];
  function getKey(type, field) {
    var activeItem = field === 'radius' ? radiusItem : borderItem;
    // TODO: 获取全部的时候应该判断是否所有值都相等，不相等的话返回空或者返回组合提示？
    if (activeItem === 'all') {
      return field === 'radius' ? camelCase__default["default"]("".concat(type, "-top-left-").concat(field)) : camelCase__default["default"]("".concat(type, "-left-").concat(field));
    }
    return camelCase__default["default"]("".concat(type, "-").concat(activeItem, "-").concat(field));
  }
  function changeItem(type, key) {
    return function (e) {
      var _a;
      var val = (e === null || e === void 0 ? void 0 : e.value) || e;
      var field = getKey(type, key);
      var isRadius = key === 'radius';
      var activeItem = isRadius ? radiusItem : borderItem;
      if (activeItem === 'all') {
        var newValue_1 = {};
        // 过滤掉all
        var items = (isRadius ? radiusItems : borderItems).filter(function (position) {
          return (position === null || position === void 0 ? void 0 : position.item) !== 'all';
        });
        items.forEach(function (item) {
          var itemKey = camelCase__default["default"]("".concat(type, "-").concat(item.item, "-").concat(key));
          newValue_1[itemKey] = val;
        });
        onChange(tslib.__assign(tslib.__assign({}, value), newValue_1));
      } else {
        onChange(tslib.__assign(tslib.__assign({}, value), (_a = {}, _a[field] = val, _a)));
      }
    };
  }
  function renderRadius() {
    return React__default["default"].createElement("div", {
      className: "ae-border-wrap ae-border-radius flex items-center"
    }, React__default["default"].createElement("div", {
      className: "ae-border-items"
    }, radiusItems.map(function (item) {
      var valueKey = camelCase__default["default"]("border-".concat(item.item));
      return React__default["default"].createElement("div", {
        key: valueKey,
        className: cx__default["default"]("ae-border-item ".concat(item.item), {
          active: radiusItem === item.item
        }),
        onClick: function () {
          return setRadiusItem(item.item);
        }
      }, React__default["default"].createElement("span", {
        "data-tooltip": item.tip,
        "data-position": "top"
      }, item.content));
    })), React__default["default"].createElement("div", {
      className: "ae-border-settings"
    }, React__default["default"].createElement("div", {
      className: "flex items-center"
    }, React__default["default"].createElement("label", null, i18nRuntime.i18n("0103eb2d3dca70270d1a74e9ec987ac9")), React__default["default"].createElement(amis.NumberInput, {
      placeholder: i18nRuntime.i18n("4dbe7c40ee82a56bb7a8152d4bbc07f9"),
      value: value[getKey('border', 'radius')],
      step: 1,
      min: 0,
      onChange: changeItem('border', 'radius')
    }))));
  }
  function renderBorder() {
    return React__default["default"].createElement("div", {
      className: "ae-border-wrap flex flex-top mb-2"
    }, React__default["default"].createElement("div", {
      className: "ae-border-items"
    }, borderItems.map(function (item) {
      var valueKey = camelCase__default["default"]("border-".concat(item.item));
      return React__default["default"].createElement("div", {
        key: valueKey,
        className: cx__default["default"]("ae-border-item ".concat(item.item), {
          active: borderItem === item.item
        }),
        onClick: function () {
          return setBorderItem(item.item);
        }
      }, React__default["default"].createElement("span", {
        "data-tooltip": item.tip,
        "data-position": "top"
      }, item.content));
    })), React__default["default"].createElement("div", {
      className: "ae-border-settings"
    }, React__default["default"].createElement("div", {
      className: "flex items-center"
    }, React__default["default"].createElement("label", null, i18nRuntime.i18n("ce179eca04fab0d584506b0d19736836")), React__default["default"].createElement(amis.Select, {
      className: "ae-border-input",
      placeholder: i18nRuntime.i18n("bb1531cc9643230ba0cbd7465818b52f"),
      onChange: changeItem('border', 'style'),
      value: value[getKey('border', 'style')],
      options: [{
        label: i18nRuntime.i18n("d81bb206a889656035b929cd8bb1ef10"),
        value: 'none'
      }, {
        label: i18nRuntime.i18n("cc4c575642609fbf059a5df81eb86bfc"),
        value: 'solid'
      }, {
        label: i18nRuntime.i18n("b1e0ebac23ed95807ecc566da3ffab48"),
        value: 'dotted'
      }, {
        label: i18nRuntime.i18n("61f6f4fc0b806ac9d41ad0792e6155f6"),
        value: 'dashed'
      }]
    })), React__default["default"].createElement("div", {
      className: "flex items-center"
    }, React__default["default"].createElement("label", null, i18nRuntime.i18n("bade10099f8447210ce7b97fa106b527")), React__default["default"].createElement(amis.NumberInput, {
      placeholder: i18nRuntime.i18n("5babfafd769570de3bba47605753361a"),
      value: value[getKey('border', 'width')],
      step: 1,
      min: 0,
      onChange: changeItem('border', 'width')
    })), React__default["default"].createElement("div", {
      className: "flex items-center"
    }, React__default["default"].createElement("label", null, i18nRuntime.i18n("6b36c6f7ec834692ec6c8e3816349fdd")), render('color', {
      type: 'input-color',
      placeholder: i18nRuntime.i18n("9b4bae5d8251de0b6f00b704936b00d3"),
      clearable: true,
      value: value[getKey('border', 'color')],
      inputClassName: 'ae-border-colorpicker',
      label: false
    }, {
      onChange: changeItem('border', 'color')
    }))));
  }
  return React__default["default"].createElement("div", {
    className: "p-2 ae-border"
  }, !disableBorder && renderBorder(), !disableRadius && renderRadius());
}
mobxReact.observer(BoxBorder);
/** @class */(function (_super) {
  tslib.__extends(BorderRenderer, _super);
  function BorderRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  BorderRenderer.prototype.render = function () {
    return React__default["default"].createElement(BoxBorder, tslib.__assign({}, this.props));
  };
  BorderRenderer = tslib.__decorate([amis.FormItem({
    type: 'style-border',
    renderLabel: false
  })], BorderRenderer);
  return BorderRenderer;
})(React__default["default"].Component);
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
