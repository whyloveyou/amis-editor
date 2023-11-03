/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __assign, __rest, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import { Icon, Spinner, TooltipWrapper, FormItem } from 'amis';
import { render, autobind } from 'amis-core';
import { FormulaEditor, CodeMirrorEditor } from 'amis-ui';
import { editorFactory, FormulaPlugin } from './plugin.js';
import FormulaPicker from './FormulaPicker.js';
import { reaction } from 'mobx';
import { renderFormulaValue } from '../FormulaControl.js';
import { getVariables } from 'amis-editor-core';
import { findDOMNode } from 'react-dom';
import { i18n } from 'i18n-runtime';

/**
 * @file 长文本公式输入框
 */
var TextareaFormulaControl = /** @class */function (_super) {
  __extends(TextareaFormulaControl, _super);
  function TextareaFormulaControl(props) {
    var _this = _super.call(this, props) || this;
    _this.wrapRef = React__default.createRef();
    _this.tooltipRef = React__default.createRef();
    _this.state = {
      value: '',
      variables: [],
      formulaPickerOpen: false,
      formulaPickerValue: '',
      isFullscreen: false,
      tooltipStyle: {},
      loading: false
    };
    return _this;
  }
  TextareaFormulaControl.prototype.componentDidMount = function () {
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
        return [2 /*return*/];
      });
    });
  };

  TextareaFormulaControl.prototype.componentDidUpdate = function (prevProps) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this.state.value !== this.props.value) {
          this.setState({
            value: this.props.value
          }, this.editorAutoMark);
        }
        return [2 /*return*/];
      });
    });
  };

  TextareaFormulaControl.prototype.componentWillUnmount = function () {
    var _a, _b;
    if (this.tooltipRef.current) {
      this.tooltipRef.current.removeEventListener('mouseleave', this.hiddenToolTip);
    }
    (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.dispose();
    (_b = this.unReaction) === null || _b === void 0 ? void 0 : _b.call(this);
  };
  TextareaFormulaControl.prototype.onExpressionMouseEnter = function (e, expression, brace) {
    var _a;
    var wrapperRect = (_a = this.wrapRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    var expressionRect = e.target.getBoundingClientRect();
    if (!wrapperRect) {
      return;
    }
    var left = expressionRect.left - wrapperRect.left;
    var top = expressionRect.top - wrapperRect.top;
    this.setState({
      tooltipStyle: {
        left: "".concat(left, "px"),
        top: "".concat(top, "px"),
        width: "".concat(expressionRect.width, "px")
      },
      formulaPickerValue: expression,
      expressionBrace: brace
    });
  };
  TextareaFormulaControl.prototype.hiddenToolTip = function () {
    this.setState({
      tooltipStyle: {
        display: 'none'
      }
    });
  };
  TextareaFormulaControl.prototype.closeFormulaPicker = function () {
    this.setState({
      formulaPickerOpen: false
    });
  };
  TextareaFormulaControl.prototype.handleConfirm = function (value) {
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
  TextareaFormulaControl.prototype.handleOnChange = function (value) {
    var _a, _b;
    (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  TextareaFormulaControl.prototype.editorFactory = function (dom, cm) {
    return editorFactory(dom, cm, this.props.value);
  };
  TextareaFormulaControl.prototype.handleEditorMounted = function (cm, editor) {
    var _this = this;
    var variables = this.state.variables || this.props.variables || [];
    this.editorPlugin = new FormulaPlugin(editor, {
      getProps: function () {
        return __assign(__assign({}, _this.props), {
          variables: variables
        });
      },
      onExpressionMouseEnter: this.onExpressionMouseEnter,
      customMarkText: this.props.customMarkText,
      onPluginInit: this.props.onPluginInit,
      showClearIcon: true
    });
  };
  TextareaFormulaControl.prototype.handleFullscreenModeChange = function () {
    if (this.props.onOverallClick) {
      return;
    }
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  };
  TextareaFormulaControl.prototype.handleFormulaEditorOpen = function () {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var _b, node, manager, data, onFormulaEditorOpen, res, variables, error_1;
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
            _c.trys.push([1, 5,, 6]);
            if (!(manager && onFormulaEditorOpen && typeof onFormulaEditorOpen === 'function')) return [3 /*break*/, 4];
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
            return [3 /*break*/, 6];
          case 5:
            error_1 = _c.sent();
            console.error('[amis-editor][TextareaFormulaControl] onFormulaEditorOpen failed: ', error_1 === null || error_1 === void 0 ? void 0 : error_1.stack);
            return [3 /*break*/, 6];
          case 6:
            this.setState({
              loading: false
            });
            return [2 /*return*/];
        }
      });
    });
  };

  TextareaFormulaControl.prototype.handleFormulaClick = function (e, type) {
    return __awaiter(this, void 0, void 0, function () {
      var variablesArr;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.props.onOverallClick) {
              return [2 /*return*/];
            }

            _a.label = 1;
          case 1:
            _a.trys.push([1, 3,, 4]);
            return [4 /*yield*/, this.handleFormulaEditorOpen()];
          case 2:
            _a.sent();
            return [3 /*break*/, 4];
          case 3:
            _a.sent();
            return [3 /*break*/, 4];
          case 4:
            return [4 /*yield*/, getVariables(this)];
          case 5:
            variablesArr = _a.sent();
            this.setState({
              variables: variablesArr,
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

  TextareaFormulaControl.prototype.editorAutoMark = function () {
    var _a;
    (_a = this.editorPlugin) === null || _a === void 0 ? void 0 : _a.autoMark();
  };
  TextareaFormulaControl.prototype.handleAddtionalMenuClick = function (e, item) {
    var _a;
    (_a = item.onClick) === null || _a === void 0 ? void 0 : _a.call(item, e, {
      value: this.props.value || '',
      setValue: this.editorPlugin.setValue,
      insertContent: this.editorPlugin.insertContent
    });
  };
  TextareaFormulaControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      className = _a.className,
      header = _a.header;
      _a.label;
      var placeholder = _a.placeholder,
      height = _a.height,
      additionalMenus = _a.additionalMenus,
      onOverallClick = _a.onOverallClick,
      customFormulaPicker = _a.customFormulaPicker,
      rest = __rest(_a, ["className", "header", "label", "placeholder", "height", "additionalMenus", "onOverallClick", "customFormulaPicker"]);
    var _b = this.state,
      formulaPickerOpen = _b.formulaPickerOpen,
      formulaPickerValue = _b.formulaPickerValue,
      isFullscreen = _b.isFullscreen,
      variables = _b.variables,
      tooltipStyle = _b.tooltipStyle,
      loading = _b.loading;
    var FormulaPickerCmp = customFormulaPicker !== null && customFormulaPicker !== void 0 ? customFormulaPicker : FormulaPicker;
    // 输入框样式
    var resultBoxStyle = {};
    if (height) {
      resultBoxStyle.height = "".concat(height, "px");
    }
    var highlightValue = FormulaEditor.highlightValue(formulaPickerValue, variables) || {
      html: formulaPickerValue
    };
    return React__default.createElement("div", {
      className: cx('ae-TextareaFormulaControl', {
        'is-fullscreen': this.state.isFullscreen
      }, className),
      ref: this.wrapRef
    }, React__default.createElement("div", {
      className: cx('ae-TextareaResultBox'),
      style: resultBoxStyle
    }, React__default.createElement(CodeMirrorEditor, {
      className: "ae-TextareaResultBox-editor",
      value: this.props.value,
      onChange: this.handleOnChange,
      editorFactory: this.editorFactory,
      editorDidMount: this.handleEditorMounted,
      onBlur: this.editorAutoMark
    }), !this.props.value && React__default.createElement("div", {
      className: "ae-TextareaResultBox-placeholder"
    }, placeholder), React__default.createElement("ul", {
      className: "ae-TextareaResultBox-footer"
    }, React__default.createElement("li", {
      className: "ae-TextareaResultBox-footer-fullscreen"
    }, React__default.createElement("a", {
      className: cx('Modal-fullscreen'),
      "data-tooltip": isFullscreen ? i18n("49041f245018a6d799fee3c6f177c782") : i18n("185926bf986c784d03a9a73102da6542"),
      "data-position": "top",
      onClick: this.handleFullscreenModeChange
    }, React__default.createElement(Icon, {
      icon: isFullscreen ? 'compress-alt' : 'expand-alt',
      className: "icon"
    }))), React__default.createElement("li", {
      className: cx('ae-TextareaResultBox-footer-fxIcon', {
        'is-loading': loading
      })
    }, loading ? React__default.createElement(Spinner, {
      show: true,
      icon: "reload",
      size: "sm"
    }) : React__default.createElement("a", {
      "data-tooltip": i18n("a9400c408441f1f7f6d6954deb05ae9a"),
      "data-position": "top",
      onClick: this.handleFormulaClick
    }, React__default.createElement(Icon, {
      icon: "input-add-fx",
      className: "icon"
    }))), Array.isArray(additionalMenus) && additionalMenus.length > 0 && (additionalMenus === null || additionalMenus === void 0 ? void 0 : additionalMenus.map(function (item, i) {
      return React__default.createElement("li", {
        key: i
      }, item.icon ? React__default.createElement("a", {
        "data-tooltip": item.label,
        "data-position": "top",
        onClick: function (e) {
          return _this.handleAddtionalMenuClick(e, item);
        }
      }, render({
        type: 'icon',
        icon: item.icon,
        vendor: '',
        className: item.className
      })) : React__default.createElement("a", {
        onClick: function (e) {
          return _this.handleAddtionalMenuClick(e, item);
        }
      }, item.label));
    })))), !!onOverallClick ? React__default.createElement("div", {
      className: cx('ae-TextareaResultBox-overlay'),
      onClick: onOverallClick
    }) : null, React__default.createElement(TooltipWrapper, {
      container: function () {
        return findDOMNode(_this);
      },
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
      variables: variables,
      header: header,
      variableMode: rest.variableMode,
      evalMode: true,
      onClose: this.closeFormulaPicker,
      onConfirm: this.handleConfirm
    })) : null);
  };
  TextareaFormulaControl.defaultProps = {
    variableMode: 'tree',
    requiredDataPropsVariables: false,
    height: 100,
    placeholder: i18n("02cc4f8f5a9aefbc03c778f7a5c989c7")
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, String, Array]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "onExpressionMouseEnter", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "hiddenToolTip", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "closeFormulaPicker", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleConfirm", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleOnChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [HTMLElement, Object]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "editorFactory", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleEditorMounted", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleFullscreenModeChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", Promise)], TextareaFormulaControl.prototype, "handleFormulaEditorOpen", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, String]), __metadata("design:returntype", Promise)], TextareaFormulaControl.prototype, "handleFormulaClick", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "editorAutoMark", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", void 0)], TextareaFormulaControl.prototype, "handleAddtionalMenuClick", null);
  return TextareaFormulaControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(TextareaFormulaControlRenderer, _super);
  function TextareaFormulaControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TextareaFormulaControlRenderer = __decorate([FormItem({
    type: 'ae-textareaFormulaControl'
  })], TextareaFormulaControlRenderer);
  return TextareaFormulaControlRenderer;
})(TextareaFormulaControl);

export { TextareaFormulaControl };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
