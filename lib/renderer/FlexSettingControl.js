/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');
var ButtonGroupControl = require('./ButtonGroupControl.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var directionText = {
  'row': [i18nRuntime.i18n("413f48cc71f71083ce532a86e3efdc21"), i18nRuntime.i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"), i18nRuntime.i18n("2a6ad292447e6354ca39ee7f40d2fcc8"), i18nRuntime.i18n("d68c21b6b65e7a2e361762b65b8a5032")],
  'column': [i18nRuntime.i18n("2a6ad292447e6354ca39ee7f40d2fcc8"), i18nRuntime.i18n("d68c21b6b65e7a2e361762b65b8a5032"), i18nRuntime.i18n("413f48cc71f71083ce532a86e3efdc21"), i18nRuntime.i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9")],
  'row-reverse': [i18nRuntime.i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"), i18nRuntime.i18n("413f48cc71f71083ce532a86e3efdc21"), i18nRuntime.i18n("2a6ad292447e6354ca39ee7f40d2fcc8"), i18nRuntime.i18n("d68c21b6b65e7a2e361762b65b8a5032")],
  'column-reverse': [i18nRuntime.i18n("d68c21b6b65e7a2e361762b65b8a5032"), i18nRuntime.i18n("2a6ad292447e6354ca39ee7f40d2fcc8"), i18nRuntime.i18n("413f48cc71f71083ce532a86e3efdc21"), i18nRuntime.i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9")]
};
var scaleX = {
  'row': '',
  'column': 'scaleX-90',
  'row-reverse': 'scaleX-180',
  'column-reverse': 'scaleX-270'
};
var scaleY = {
  'row': '',
  'column': 'scaleX-270',
  'row-reverse': '',
  'column-reverse': 'scaleX-270'
};
var getFlexItem = function (props) {
  var value = props.value,
    direction = props.direction,
    justify = props.justify,
    alignItems = props.alignItems;
  var curDirection = (value === null || value === void 0 ? void 0 : value.flexDirection) || direction || 'row';
  var isColumn = curDirection === 'column' || curDirection === 'column-reverse';
  // 主轴排列方向
  var directionItemOptions = [{
    label: i18nRuntime.i18n("ed33c46d1d69336bb011813e8352fa01"),
    value: 'row',
    icon: 'drow'
  }, {
    label: i18nRuntime.i18n("963e9ff4252cdef288063c41eb6d4998"),
    value: 'column',
    icon: 'dcolumn'
  }, {
    label: i18nRuntime.i18n("ae07817b441091793c8af39256908373"),
    value: 'row-reverse',
    icon: 'drowReverse',
    iconClassName: 'scaleX-180'
  }, {
    label: i18nRuntime.i18n("618515fd68ecfc4a5b58462f0cb9666b"),
    value: 'column-reverse',
    icon: 'dcolumnReverse',
    iconClassName: 'scaleX-180'
  }];
  // 主轴排列方式
  var justifyItemsOptions = [{
    label: directionText[curDirection][0],
    value: 'flex-start',
    icon: 'jFlexStart',
    iconClassName: scaleX[curDirection]
  }, {
    label: isColumn ? i18nRuntime.i18n("4117e80d2c2e52f795ec64160f399364") : i18nRuntime.i18n("d365d58d281508b9982f6a0370649ae2"),
    value: 'center',
    icon: 'jCenter',
    iconClassName: scaleX[curDirection]
  }, {
    label: directionText[curDirection][1],
    value: 'flex-end',
    icon: 'jFlexEnd',
    iconClassName: scaleX[curDirection]
  }, {
    label: i18nRuntime.i18n("da1b972efb29f850b50e219ad4d98ba5"),
    value: 'space-between',
    icon: 'jSpaceBetween',
    iconClassName: scaleX[curDirection]
  }, {
    label: i18nRuntime.i18n("21af94c1abc5891b2703c9321417a1a9"),
    value: 'space-around',
    icon: 'jSpaceAround',
    iconClassName: scaleX[curDirection]
  }];
  // 交叉轴排列方式
  var alignItemsOptions = [{
    label: directionText[curDirection][2],
    value: 'flex-start',
    icon: 'aFlexStart',
    iconClassName: scaleY[curDirection]
  }, {
    label: isColumn ? i18nRuntime.i18n("d365d58d281508b9982f6a0370649ae2") : i18nRuntime.i18n("4117e80d2c2e52f795ec64160f399364"),
    value: 'center',
    icon: 'aCenter',
    iconClassName: scaleY[curDirection]
  }, {
    label: directionText[curDirection][3],
    value: 'flex-end',
    icon: 'aFlexEnd',
    iconClassName: scaleY[curDirection]
  }, {
    label: i18nRuntime.i18n("ed97c73866617b40a7b1215867e0f489"),
    value: 'baseline',
    icon: 'aBaseline',
    iconClassName: scaleY[curDirection]
  }, {
    label: isColumn ? i18nRuntime.i18n("849b9b944a65eb0685f3e6af60a0c523") : i18nRuntime.i18n("cbac406a3f51abad691702015b0784ba"),
    value: 'stretch',
    icon: 'aStretch',
    iconClassName: isColumn ? 'scaleX-90' : ''
  }];
  var flexItems = [{
    field: 'flexDirection',
    options: directionItemOptions,
    default: direction || 'row'
  }, {
    field: 'justifyContent',
    options: justifyItemsOptions,
    default: justify || 'flex-start'
  }, {
    field: 'alignItems',
    options: alignItemsOptions,
    default: alignItems || 'stretch'
  }];
  return flexItems;
};
var FlexSettingControl = /** @class */function (_super) {
  tslib.__extends(FlexSettingControl, _super);
  function FlexSettingControl(props) {
    return _super.call(this, props) || this;
  }
  FlexSettingControl.prototype.setField = function (field) {
    var _a = this.props,
      value = _a.value,
      onChange = _a.onChange;
    return function (val) {
      var _a;
      onChange(tslib.__assign(tslib.__assign({}, value), (_a = {}, _a[field] = val, _a)));
    };
  };
  FlexSettingControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      value = _a.value,
      label = _a.label,
      rest = tslib.__rest(_a, ["value", "label"]);
    var flexItems = getFlexItem(this.props);
    return React__default["default"].createElement("div", {
      className: "ap-Flex"
    }, !label && React__default["default"].createElement("div", {
      className: "ap-Flex-label"
    }, i18nRuntime.i18n("98204720c30a843a9234bdf22dc05d51")), flexItems.map(function (item) {
      return React__default["default"].createElement("div", {
        className: "ap-Flex-item ap-Flex-".concat(item.field),
        key: item.field
      }, React__default["default"].createElement(ButtonGroupControl["default"], tslib.__assign({}, rest, {
        options: item.options,
        value: (value === null || value === void 0 ? void 0 : value[item.field]) || item.default,
        onChange: _this.setField(item.field)
      })));
    }));
  };
  return FlexSettingControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(FlexSettingControlRenderer, _super);
  function FlexSettingControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  FlexSettingControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'flex-layout-setting'
  })], FlexSettingControlRenderer);
  return FlexSettingControlRenderer;
})(FlexSettingControl);

exports["default"] = FlexSettingControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
