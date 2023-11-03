/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

/**
 * @file 组件选项组件的可视化编辑控件
 */
var PartsSourceEnum = {
  NO_BLOCK: 'NO_BLOCK',
  AVERAGE: 'AVERAGE',
  STEPS: 'STEPS',
  CUSTOM: 'CUSTOM'
};
var MarksSourceEnum = {
  PARKS: 'PARKS',
  CUSTOM: 'CUSTOM'
};
var PartsSourceOptions = [{
  label: i18nRuntime.i18n("5b4ffa2eadaf629b833b37a3e8742b2c"),
  value: PartsSourceEnum.NO_BLOCK
}, {
  label: i18nRuntime.i18n("3569877e498155b59ef5299870c43f80"),
  value: PartsSourceEnum.AVERAGE
}, {
  label: i18nRuntime.i18n("15e1fdd9d5cc4dc595fba0eee0719cba"),
  value: PartsSourceEnum.STEPS
}, {
  label: i18nRuntime.i18n("f1d4ff50f3828f9b73412e7d94e6dd6e"),
  value: PartsSourceEnum.CUSTOM
}];
var MarksSourceOptions = [{
  label: i18nRuntime.i18n("56d37871117270ce5d157a8de90dacd6"),
  value: MarksSourceEnum.PARKS
}, {
  label: i18nRuntime.i18n("f1d4ff50f3828f9b73412e7d94e6dd6e"),
  value: MarksSourceEnum.CUSTOM
}];
// 根据滑块配置获取分块方式
var getPartsSource = function (parts, showSteps) {
  if (Array.isArray(parts)) {
    return PartsSourceEnum.CUSTOM;
  }
  if (parts > 1) {
    return PartsSourceEnum.AVERAGE;
  }
  if (showSteps) {
    return PartsSourceEnum.STEPS;
  }
  return PartsSourceEnum.NO_BLOCK;
};
/**
 * 分块
 */
var PartsControl = /** @class */function (_super) {
  tslib.__extends(PartsControl, _super);
  function PartsControl(props) {
    var _this = _super.call(this, props) || this;
    var _a = props.data,
      _b = _a.parts,
      parts = _b === void 0 ? 1 : _b,
      showSteps = _a.showSteps;
    _this.state = {
      options: _this.transformOptionValue(getPartsSource(parts), parts),
      source: getPartsSource(parts, showSteps),
      parts: parts
    };
    return _this;
  }
  PartsControl.prototype.transformOptionValue = function (source, parts) {
    if (source === PartsSourceEnum.CUSTOM && Array.isArray(parts)) {
      return parts.map(function (value) {
        return {
          number: Number(value)
        };
      });
    }
    return [];
  };
  /**
   * 更新数据
   */
  PartsControl.prototype.onChange = function () {
    var _a = this.state,
      source = _a.source,
      parts = _a.parts,
      options = _a.options;
    var onBulkChange = this.props.onBulkChange;
    var data = {
      parts: parts,
      showSteps: false
    };
    switch (source) {
      case PartsSourceEnum.NO_BLOCK:
        data.parts = 1;
        break;
      case PartsSourceEnum.AVERAGE:
        data.parts = parts;
        break;
      case PartsSourceEnum.STEPS:
        data.parts = 1;
        data.showSteps = true;
        break;
      case PartsSourceEnum.CUSTOM:
        data.parts = [];
        if (options && !!options.length) {
          options.forEach(function (item) {
            data.parts.push(item.number);
          });
        }
    }
    onBulkChange && onBulkChange(data);
  };
  /**
   * 切换选项类型
   */
  PartsControl.prototype.handleSourceChange = function (source) {
    this.setState({
      source: source
    }, this.onChange);
  };
  /**
   * 自定义分块数据更新
   * @param value
   */
  PartsControl.prototype.handleOptionsChange = function (value) {
    if (value === void 0) {
      value = [];
    }
    this.setState({
      options: value
    }, this.onChange);
  };
  PartsControl.prototype.renderHeader = function () {
    var _a;
    var _b = this.props,
      env = _b.env,
      render = _b.render;
    var source = this.state.source;
    var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]("".concat(classPrefix, "Form-item"), "".concat(classPrefix, "Form-item--horizontal"), "".concat(classPrefix, "Form-item--horizontal-justify"))
    }, React__default["default"].createElement("label", {
      className: cx__default["default"]("".concat(classPrefix, "Form-label"), "".concat(classPrefix, "Form-itemColumn--4"))
    }, i18nRuntime.i18n("6903085e7f31286560e4a2e160beac42")), React__default["default"].createElement("div", {
      className: cx__default["default"]("".concat(classPrefix, "Form-value"))
    }, render('header', {
      type: 'select',
      name: 'optionSourceList',
      options: PartsSourceOptions,
      value: source,
      onChange: this.handleSourceChange
    })));
  };
  PartsControl.prototype.renderContent = function (source) {
    var _this = this;
    var _a = this.props,
      classPrefix = _a.classPrefix,
      render = _a.render;
    var _b = this.state,
      parts = _b.parts,
      options = _b.options;
    if (source === PartsSourceEnum.AVERAGE) {
      return React__default["default"].createElement("div", {
        className: cx__default["default"]('ae-ExtendMore', "".concat(classPrefix, "Form-item"), "".concat(classPrefix, "Form-item--horizontal"), "".concat(classPrefix, "Form-item--horizontal-justify"))
      }, React__default["default"].createElement("label", {
        className: cx__default["default"]("".concat(classPrefix, "Form-label"), "".concat(classPrefix, "Form-itemColumn--4"))
      }, i18nRuntime.i18n("7145575ab9e3b4529eea61fe5fe76d0e")), React__default["default"].createElement("div", {
        className: cx__default["default"]("".concat(classPrefix, "Form-value"))
      }, React__default["default"].createElement(amis.NumberInput, {
        value: parts,
        onChange: this.handlePartsChange
      })));
    } else if (source === PartsSourceEnum.CUSTOM) {
      return React__default["default"].createElement("div", {
        className: "ae-OptionControl-wrapper"
      }, render('content', amisEditorCore.getSchemaTpl('combo-container', {
        type: 'combo',
        label: false,
        name: 'texts',
        items: [{
          type: 'input-number',
          name: 'number',
          require: true
        }],
        draggable: false,
        multiple: true,
        value: options,
        onChange: function (value) {
          return _this.setState({
            options: value
          }, _this.onChange);
        },
        addButtonText: i18nRuntime.i18n("1c8737ec7da60e12207c9eb04ccabcd4")
      })));
    }
    return React__default["default"].createElement(React__default["default"].Fragment, null);
  };
  PartsControl.prototype.handlePartsChange = function (value) {
    this.setState({
      parts: value
    }, this.onChange);
  };
  PartsControl.prototype.render = function () {
    var className = this.props.className;
    var source = this.state.source;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-OptionControl', className)
    }, this.renderHeader(), this.renderContent(source));
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String, Object]), tslib.__metadata("design:returntype", void 0)], PartsControl.prototype, "transformOptionValue", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], PartsControl.prototype, "handleSourceChange", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Array]), tslib.__metadata("design:returntype", void 0)], PartsControl.prototype, "handleOptionsChange", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Number]), tslib.__metadata("design:returntype", void 0)], PartsControl.prototype, "handlePartsChange", null);
  return PartsControl;
}(React__default["default"].Component);
/**
 * 下标
 */
var MarksControl = /** @class */function (_super) {
  tslib.__extends(MarksControl, _super);
  function MarksControl(props) {
    var _this = _super.call(this, props) || this;
    var _a = props.data.marks,
      marks = _a === void 0 ? {} : _a;
    _this.state = {
      options: _this.transformOptionValue(marks),
      source: !Object.keys(marks).length ? MarksSourceEnum.PARKS : MarksSourceEnum.CUSTOM
    };
    return _this;
  }
  MarksControl.prototype.componentDidUpdate = function (prevProps) {
    var _a = prevProps.data,
      parts = _a.parts,
      unit = _a.unit,
      max = _a.max,
      min = _a.min,
      showSteps = _a.showSteps;
    var _b = this.props.data,
      nextParts = _b.parts,
      nextUnit = _b.unit,
      nextMax = _b.max,
      nextMin = _b.min,
      nextShowSteps = _b.showSteps;
    var source = this.state.source;
    if (parts !== nextParts || unit !== nextUnit || max !== nextMax || min !== nextMin || showSteps !== nextShowSteps) {
      // 与分块保持一致，当分块、单位发生变换同步时，同步下标
      source === MarksSourceEnum.PARKS && this.onSynchronismParts();
    }
  };
  /**
   * 配置拿到的marks数据转换为options
   * @param marks
   * @returns
   */
  MarksControl.prototype.transformOptionValue = function (marks) {
    return Object.keys(marks).map(function (number) {
      return {
        number: +number,
        label: marks[number]
      };
    });
  };
  /**
   * 更新数据
   */
  MarksControl.prototype.onChange = function () {
    var options = this.state.options;
    var onChange = this.props.onChange;
    var marks = {};
    if (options && !!options.length) {
      options.forEach(function (item) {
        marks[item.number] = item.label || item.number;
      });
    }
    onChange && onChange(marks);
  };
  /**
   * 不同分块方式 => 不同下标数据
   */
  MarksControl.prototype.onSynchronismParts = function () {
    var _a = this.props.data,
      parts = _a.parts,
      max = _a.max,
      min = _a.min,
      _b = _a.step,
      step = _b === void 0 ? 1 : _b,
      _c = _a.unit,
      unit = _c === void 0 ? '' : _c,
      showSteps = _a.showSteps;
    var options = [];
    var partsSource = getPartsSource(parts, showSteps);
    switch (partsSource) {
      case PartsSourceEnum.AVERAGE:
        var len = (max - min) / parts;
        for (var i = 0; i <= parts; i++) {
          options.push({
            number: i * len + min,
            label: i * len + min + unit
          });
        }
        break;
      case PartsSourceEnum.STEPS:
        var length_1 = (max - min) / step;
        for (var i = 0; i <= length_1; i++) {
          options.push({
            number: i * step + min,
            label: i * step + min + unit
          });
        }
        break;
      case PartsSourceEnum.CUSTOM:
        if (Array.isArray(parts)) {
          parts.forEach(function (number) {
            (!!number || number === 0) && options.push({
              number: number,
              label: number + unit
            });
          });
        }
        break;
    }
    this.setState({
      options: options
    }, this.onChange);
  };
  /**
   * 下标方式变化
   * @param source
   */
  MarksControl.prototype.handleSourceChange = function (source) {
    this.setState({
      source: source
    });
    if (source === MarksSourceEnum.PARKS) {
      this.onSynchronismParts();
    }
  };
  MarksControl.prototype.renderHeader = function () {
    var _a;
    var _b = this.props,
      env = _b.env,
      render = _b.render;
    var source = this.state.source;
    var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]("".concat(classPrefix, "Form-item"), "".concat(classPrefix, "Form-item--horizontal"), "".concat(classPrefix, "Form-item--horizontal-justify"))
    }, React__default["default"].createElement("label", {
      className: cx__default["default"]("".concat(classPrefix, "Form-label"), "".concat(classPrefix, "Form-itemColumn--4"))
    }, i18nRuntime.i18n("dc4c91dfaa3b760147bd92e648560af4")), React__default["default"].createElement("div", {
      className: cx__default["default"]("".concat(classPrefix, "Form-value"))
    }, render('header', {
      type: 'select',
      name: 'optionSourceList',
      options: MarksSourceOptions,
      value: source,
      onChange: this.handleSourceChange
    })));
  };
  MarksControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      className = _a.className,
      render = _a.render;
    var _b = this.state,
      source = _b.source,
      options = _b.options;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-OptionControl', className)
    }, this.renderHeader(), source === MarksSourceEnum.CUSTOM && render('inner', amisEditorCore.getSchemaTpl('combo-container', {
      type: 'combo',
      label: false,
      name: 'texts',
      draggable: false,
      multiple: true,
      items: [{
        type: 'input-number',
        name: 'number',
        required: true
      }, {
        type: 'input-text',
        name: 'label',
        required: true
      }],
      addButtonText: i18nRuntime.i18n("662d8b49913650f543c024d4d02009a2"),
      value: options,
      onChange: function (value) {
        _this.setState({
          options: value
        }, _this.onChange);
      }
    })));
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], MarksControl.prototype, "transformOptionValue", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], MarksControl.prototype, "onChange", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], MarksControl.prototype, "onSynchronismParts", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], MarksControl.prototype, "handleSourceChange", null);
  return MarksControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(PartsControlRenderer, _super);
  function PartsControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  PartsControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-partsControl',
    renderLabel: false
  })], PartsControlRenderer);
  return PartsControlRenderer;
})(PartsControl);
/** @class */(function (_super) {
  tslib.__extends(OptionControlRenderer, _super);
  function OptionControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  OptionControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-marksControl',
    renderLabel: false
  })], OptionControlRenderer);
  return OptionControlRenderer;
})(MarksControl);

exports.MarksControl = MarksControl;
exports.PartsControl = PartsControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
