/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var cx = require('classnames');
var amis = require('amis');
var amisUi = require('amis-ui');
var FormulaControl = require('./FormulaControl.js');
var mobx = require('mobx');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

/**
 * @file 表达式输入框组件
 */
var ExpressionFormulaControl = /** @class */function (_super) {
  tslib.__extends(ExpressionFormulaControl, _super);
  function ExpressionFormulaControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      variables: [],
      formulaPickerValue: ''
    };
    return _this;
  }
  ExpressionFormulaControl.prototype.componentDidMount = function () {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var editorStore;
      var _this = this;
      return tslib.__generator(this, function (_a) {
        this.initFormulaPickerValue(this.props.value);
        editorStore = window.editorStore;
        this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
        this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
        this.unReaction = mobx.reaction(function () {
          return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState;
        }, function () {
          return tslib.__awaiter(_this, void 0, void 0, function () {
            return tslib.__generator(this, function (_a) {
              this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
              this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
              return [2 /*return*/];
            });
          });
        });

        return [2 /*return*/];
      });
    });
  };

  ExpressionFormulaControl.prototype.componentDidUpdate = function (prevProps) {
    return tslib.__awaiter(this, void 0, void 0, function () {
      return tslib.__generator(this, function (_a) {
        if (prevProps.value !== this.props.value) {
          this.initFormulaPickerValue(this.props.value);
        }
        return [2 /*return*/];
      });
    });
  };

  ExpressionFormulaControl.prototype.componentWillUnmount = function () {
    var _a;
    this.isUnmount = true;
    (_a = this.unReaction) === null || _a === void 0 ? void 0 : _a.call(this);
  };
  ExpressionFormulaControl.prototype.initFormulaPickerValue = function (value) {
    var formulaPickerValue = (value === null || value === void 0 ? void 0 : value.replace(/^\$\{(.*)\}$/, function (match, p1) {
      return p1;
    })) || '';
    this.setState({
      formulaPickerValue: formulaPickerValue
    });
  };
  ExpressionFormulaControl.prototype.handleConfirm = function (value) {
    var _a, _b;
    if (value === void 0) {
      value = '';
    }
    var expressionReg = /^\$\{(.*)\}$/;
    value = value.replace(/\r\n|\r|\n/g, ' ');
    if (value && !expressionReg.test(value)) {
      value = "${".concat(value, "}");
    }
    (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  ExpressionFormulaControl.prototype.handleClearExpression = function (e) {
    var _a, _b;
    e.stopPropagation();
    e.preventDefault();
    (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, '');
  };
  ExpressionFormulaControl.prototype.handleOnClick = function (e, onClick) {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var variablesArr;
      return tslib.__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, amisEditorCore.getVariables(this)];
          case 1:
            variablesArr = _a.sent();
            this.setState({
              variables: variablesArr
            });
            return [2 /*return*/, onClick === null || onClick === void 0 ? void 0 : onClick(e)];
        }
      });
    });
  };
  ExpressionFormulaControl.prototype.render = function () {
    var _this = this;
    var _a, _b;
    var _c = this.props,
      value = _c.value,
      className = _c.className,
      variableMode = _c.variableMode,
      header = _c.header,
      size = _c.size,
      rest = tslib.__rest(_c, ["value", "className", "variableMode", "header", "size"]);
    var _d = this.state,
      formulaPickerValue = _d.formulaPickerValue,
      variables = _d.variables;
    var highlightValue = amisUi.FormulaEditor.highlightValue(formulaPickerValue, variables) || {
      html: formulaPickerValue
    };
    // 自身字段
    var selfName = (_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.name;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-ExpressionFormulaControl', className)
    }, React__default["default"].createElement(amis.PickerContainer, {
      showTitle: false,
      bodyRender: function (_a) {
        _a.value;
          var onChange = _a.onChange;
        return React__default["default"].createElement(amisUi.FormulaEditor, tslib.__assign({}, rest, {
          evalMode: true,
          variableMode: variableMode,
          variables: variables,
          header: header || i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
          value: formulaPickerValue,
          onChange: onChange,
          selfVariableName: selfName
        }));
      },
      value: formulaPickerValue,
      onConfirm: this.handleConfirm,
      size: size !== null && size !== void 0 ? size : 'lg'
    }, function (_a) {
      var onClick = _a.onClick;
      return formulaPickerValue ? React__default["default"].createElement(amis.Button, {
        className: "btn-configured",
        tooltip: {
          placement: 'top',
          tooltipTheme: 'dark',
          mouseLeaveDelay: 20,
          content: value,
          tooltipClassName: 'btn-configured-tooltip',
          children: function () {
            return FormulaControl.renderFormulaValue(highlightValue);
          }
        },
        onClick: function (e) {
          return _this.handleOnClick(e, onClick);
        }
      }, FormulaControl.renderFormulaValue(highlightValue), React__default["default"].createElement(amis.Icon, {
        icon: "input-clear",
        className: "icon",
        onClick: _this.handleClearExpression
      })) : React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(amis.Button, {
        className: "btn-set-expression",
        onClick: function (e) {
          return _this.handleOnClick(e, onClick);
        }
      }, i18nRuntime.i18n("fbb96f7ea104d34fc4b7bd625d892c45")));
    }));
  };
  ExpressionFormulaControl.defaultProps = {
    variableMode: 'tree',
    requiredDataPropsVariables: false,
    evalMode: true
  };
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], ExpressionFormulaControl.prototype, "initFormulaPickerValue", null);
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], ExpressionFormulaControl.prototype, "handleConfirm", null);
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], ExpressionFormulaControl.prototype, "handleClearExpression", null);
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object, Function]), tslib.__metadata("design:returntype", Promise)], ExpressionFormulaControl.prototype, "handleOnClick", null);
  return ExpressionFormulaControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(ExpressionFormulaControlRenderer, _super);
  function ExpressionFormulaControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ExpressionFormulaControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-expressionFormulaControl'
  })], ExpressionFormulaControlRenderer);
  return ExpressionFormulaControlRenderer;
})(ExpressionFormulaControl);

exports["default"] = ExpressionFormulaControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
