/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __assign, __rest, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import { reaction } from 'mobx';
import { FormulaEditor, CodeMirrorEditor } from 'amis-ui';
import { Icon, Button, TooltipWrapper, FormItem } from 'amis';
import { autobind } from 'amis-core';
import { editorFactory, FormulaPlugin } from './textarea-formula/plugin.js';
import { renderFormulaValue } from './FormulaControl.js';
import FormulaPicker from './textarea-formula/FormulaPicker.js';
import { getVariables } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

/**
 * @file 长文本公式输入框
 */
var preInputLocation = {
  start: 0,
  end: 0
};
var TplFormulaControl = /** @class */function (_super) {
  __extends(TplFormulaControl, _super);
  function TplFormulaControl(props) {
    var _this = _super.call(this, props) || this;
    _this.wrapRef = React__default.createRef();
    _this.tooltipRef = React__default.createRef();
    _this.state = {
      value: '',
      variables: [],
      formulaPickerOpen: false,
      formulaPickerValue: '',
      tooltipStyle: {
        display: 'none'
      },
      loading: false
    };
    return _this;
  }
  TplFormulaControl.prototype.componentDidMount = function () {
    return __awaiter(this, void 0, void 0, function () {
      var editorStore;
      var _this = this;
      return __generator(this, function (_a) {
        editorStore = window.editorStore;
        this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
        this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
        this.unReaction = reaction(function () {
          return editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocaleState;
        }, function () {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              this.appLocale = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appLocale;
              this.appCorpusData = editorStore === null || editorStore === void 0 ? void 0 : editorStore.appCorpusData;
              return [2 /*return*/];
            });
          });
        });

        if (this.tooltipRef.current) {
          this.tooltipRef.current.addEventListener('mouseleave', this.hiddenToolTip);
        }
        if (this.wrapRef.current) {
          this.wrapRef.current.addEventListener('keydown', this.handleKeyDown, true);
        }
        return [2 /*return*/];
      });
    });
  };

  TplFormulaControl.prototype.componentWillUnmount = function () {
    var _a, _b;
    if (this.tooltipRef.current) {
      this.tooltipRef.current.removeEventListener('mouseleave', this.hiddenToolTip);
    }
    if (this.wrapRef.current) {
      this.wrapRef.current.removeEventListener('keydown', this.handleKeyDown);
    }
    (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.dispose();
    (_b = this.unReaction) === null || _b === void 0 ? void 0 : _b.call(this);
  };
  TplFormulaControl.prototype.onExpressionMouseEnter = function (e, expression, brace) {
    var _a;
    var wrapperRect = (_a = this.wrapRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    var expressionRect = e.target.getBoundingClientRect();
    if (!wrapperRect) {
      return;
    }
    var left = expressionRect.left - wrapperRect.left;
    this.setState({
      tooltipStyle: {
        left: "".concat(left, "px"),
        width: "".concat(expressionRect.width, "px")
      },
      formulaPickerValue: expression,
      expressionBrace: brace
    });
  };
  TplFormulaControl.prototype.hiddenToolTip = function () {
    this.setState({
      tooltipStyle: {
        display: 'none'
      }
    });
  };
  TplFormulaControl.prototype.handleKeyDown = function (e) {
    // 组件禁止回车折行，否则会导致内容超过一行
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
    }
  };
  TplFormulaControl.prototype.closeFormulaPicker = function () {
    this.setState({
      formulaPickerOpen: false
    });
  };
  TplFormulaControl.prototype.handleConfirm = function (value) {
    var _a;
    var expressionBrace = this.state.expressionBrace;
    // 去除可能包裹的最外层的${}
    value = value.replace(/^\$\{(.*)\}$/, function (match, p1) {
      return p1;
    });
    value = value ? "${".concat(value, "}") : value;
    value = value.replace(/\r\n|\r|\n/g, ' ');
    (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.insertContent(value, 'expression', expressionBrace);
    this.setState({
      formulaPickerOpen: false,
      expressionBrace: undefined
    });
  };
  TplFormulaControl.prototype.handleOnChange = function (value) {
    var _a, _b;
    this.checkOpenFormulaPicker(value);
    (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  // 检测用户输入'${}'自动打开表达式弹窗
  TplFormulaControl.prototype.checkOpenFormulaPicker = function (value) {
    var _a;
    var preLength = ((_a = this.props.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
    // 删除了文本，无需检测
    if (value.length < preLength || value === this.props.value) {
      return;
    }
    var left = 0;
    var right = 0;
    var length = value.length;
    while (left < preLength && value.charAt(left) === this.props.value.charAt(left)) {
      left++;
    }
    while (right < preLength && value.charAt(length - 1 - right) === this.props.value.charAt(preLength - 1 - right)) {
      right++;
    }
    if ((preInputLocation === null || preInputLocation === void 0 ? void 0 : preInputLocation.end) !== left) {
      preInputLocation = null;
    }
    var start = preInputLocation ? preInputLocation.start : left;
    var end = left === length - right ? left + 1 : length - right;
    var inputText = value.substring(start, end);
    if (/\$|\{|\}$/.test(inputText)) {
      if (/\$\{\}/.test(inputText)) {
        var newValue = value.slice(0, start) + inputText.replace('${}', '') + value.slice(end);
        this.props.onChange(newValue);
        var corsur = this.editorPlugin.getCorsur();
        this.setState({
          formulaPickerOpen: true,
          formulaPickerValue: '',
          expressionBrace: [{
            line: corsur === null || corsur === void 0 ? void 0 : corsur.line,
            ch: end - 3
          }, {
            line: corsur === null || corsur === void 0 ? void 0 : corsur.line,
            ch: end
          }]
        });
        preInputLocation = null;
      } else {
        preInputLocation = __assign(__assign({
          start: left
        }, preInputLocation), {
          end: end
        });
      }
    } else {
      preInputLocation = null;
    }
  };
  TplFormulaControl.prototype.handleClear = function () {
    var _a;
    (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.setValue('');
  };
  /**
   * 公式编辑器打开完成一些异步任务的加载
   */
  TplFormulaControl.prototype.beforeFormulaEditorOpen = function () {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var _b, node, manager, data, onFormulaEditorOpen, res, variables, variables, error_1;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = this.props, node = _b.node, manager = _b.manager, data = _b.data;
            onFormulaEditorOpen = (_a = manager === null || manager === void 0 ? void 0 : manager.config) === null || _a === void 0 ? void 0 : _a.onFormulaEditorOpen;
            this.setState({
              loading: true
            });
            _c.label = 1;
          case 1:
            _c.trys.push([1, 8,, 9]);
            if (!(manager && onFormulaEditorOpen && typeof onFormulaEditorOpen === 'function')) return [3 /*break*/, 5];
            return [4 /*yield*/, onFormulaEditorOpen(node, manager, data)];
          case 2:
            res = _c.sent();
            if (!(res !== false)) return [3 /*break*/, 4];
            return [4 /*yield*/, getVariables(this)];
          case 3:
            variables = _c.sent();
            this.setState({
              variables: variables
            });
            _c.label = 4;
          case 4:
            return [3 /*break*/, 7];
          case 5:
            return [4 /*yield*/, getVariables(this)];
          case 6:
            variables = _c.sent();
            this.setState({
              variables: variables
            });
            _c.label = 7;
          case 7:
            return [3 /*break*/, 9];
          case 8:
            error_1 = _c.sent();
            console.error('[amis-editor] onFormulaEditorOpen failed: ', error_1 === null || error_1 === void 0 ? void 0 : error_1.stack);
            return [3 /*break*/, 9];
          case 9:
            this.setState({
              loading: false
            });
            return [2 /*return*/];
        }
      });
    });
  };

  TplFormulaControl.prototype.handleFormulaClick = function (e, type) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);
            return [4 /*yield*/, this.beforeFormulaEditorOpen()];
          case 1:
            _a.sent();
            return [3 /*break*/, 3];
          case 2:
            _a.sent();
            return [3 /*break*/, 3];
          case 3:
            this.setState({
              formulaPickerOpen: true
            });
            if (type !== 'update') {
              this.setState({
                formulaPickerValue: '',
                expressionBrace: undefined
              });
            }
            return [2 /*return*/];
        }
      });
    });
  };

  TplFormulaControl.prototype.editorFactory = function (dom, cm) {
    return editorFactory(dom, cm, this.props.value, {
      lineWrapping: false,
      cursorHeight: 0.85
    });
  };
  TplFormulaControl.prototype.handleEditorMounted = function (cm, editor) {
    var _this = this;
    var variables = this.props.variables || this.state.variables;
    this.editorPlugin = new FormulaPlugin(editor, {
      getProps: function () {
        return __assign(__assign({}, _this.props), {
          variables: variables
        });
      },
      onExpressionMouseEnter: this.onExpressionMouseEnter,
      showPopover: false,
      showClearIcon: true
    });
  };
  TplFormulaControl.prototype.editorAutoMark = function () {
    var _a;
    (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.autoMark();
  };
  TplFormulaControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      className = _a.className,
      header = _a.header;
      _a.label;
      var placeholder = _a.placeholder,
      customFormulaPicker = _a.customFormulaPicker,
      clearable = _a.clearable,
      rest = __rest(_a, ["className", "header", "label", "placeholder", "customFormulaPicker", "clearable"]);
    var _b = this.state,
      formulaPickerOpen = _b.formulaPickerOpen,
      formulaPickerValue = _b.formulaPickerValue,
      variables = _b.variables,
      tooltipStyle = _b.tooltipStyle,
      loading = _b.loading;
    var FormulaPickerCmp = customFormulaPicker !== null && customFormulaPicker !== void 0 ? customFormulaPicker : FormulaPicker;
    var highlightValue = FormulaEditor.highlightValue(formulaPickerValue, variables) || {
      html: formulaPickerValue
    };
    return React__default.createElement("div", {
      className: cx('ae-TplFormulaControl', className, {
        clearable: clearable
      }),
      ref: this.wrapRef
    }, React__default.createElement("div", {
      className: cx('ae-TplResultBox')
    }, React__default.createElement(CodeMirrorEditor, {
      className: "ae-TplResultBox-editor",
      value: this.props.value,
      onChange: this.handleOnChange,
      editorFactory: this.editorFactory,
      editorDidMount: this.handleEditorMounted,
      onBlur: this.editorAutoMark
    }), !this.props.value && React__default.createElement("div", {
      className: "ae-TplFormulaControl-placeholder"
    }, placeholder), clearable && this.props.value && React__default.createElement(Icon, {
      icon: "input-clear",
      className: "input-clear-icon",
      iconContent: "InputText-clear",
      onClick: this.handleClear
    })), React__default.createElement(Button, {
      className: "ae-TplFormulaControl-button",
      size: "sm",
      tooltip: {
        enterable: false,
        content: i18n("303efd5ba79e639001b4328cd266dddc"),
        tooltipTheme: 'dark',
        placement: 'left',
        mouseLeaveDelay: 0
      },
      onClick: this.handleFormulaClick,
      loading: loading
    }, React__default.createElement(Icon, {
      icon: "input-add-fx",
      className: cx('ae-TplFormulaControl-icon', 'icon')
    })), React__default.createElement(TooltipWrapper, {
      trigger: "hover",
      placement: "top",
      style: {
        fontSize: '12px'
      },
      tooltip: {
        tooltipTheme: 'dark',
        children: function () {
          return renderFormulaValue(highlightValue);
        }
      }
    }, React__default.createElement("div", {
      className: "ae-TplFormulaControl-tooltip",
      style: tooltipStyle,
      ref: this.tooltipRef,
      onClick: function (e) {
        return _this.handleFormulaClick(e, 'update');
      }
    })), formulaPickerOpen ? React__default.createElement(FormulaPickerCmp, __assign({}, this.props, {
      value: formulaPickerValue,
      initable: true,
      header: header,
      variables: variables,
      variableMode: rest.variableMode,
      evalMode: true,
      onClose: this.closeFormulaPicker,
      onConfirm: this.handleConfirm
    })) : null);
  };
  TplFormulaControl.defaultProps = {
    variableMode: 'tree',
    requiredDataPropsVariables: false,
    placeholder: i18n("02cc4f8f5a9aefbc03c778f7a5c989c7")
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent, String, Array]), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "onExpressionMouseEnter", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "hiddenToolTip", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "handleKeyDown", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "closeFormulaPicker", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "handleConfirm", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "handleOnChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "handleClear", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", Promise)], TplFormulaControl.prototype, "beforeFormulaEditorOpen", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, String]), __metadata("design:returntype", Promise)], TplFormulaControl.prototype, "handleFormulaClick", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [HTMLElement, Object]), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "editorFactory", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "handleEditorMounted", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TplFormulaControl.prototype, "editorAutoMark", null);
  return TplFormulaControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(TplFormulaControlRenderer, _super);
  function TplFormulaControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TplFormulaControlRenderer = __decorate([FormItem({
    type: 'ae-tplFormulaControl'
  })], TplFormulaControlRenderer);
  return TplFormulaControlRenderer;
})(TplFormulaControl);

export { TplFormulaControl };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
