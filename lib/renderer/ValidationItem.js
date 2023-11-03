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
 * @file 校验项
 */
var ValidationItem = /** @class */function (_super) {
  tslib.__extends(ValidationItem, _super);
  function ValidationItem(props) {
    var _this = _super.call(this, props) || this;
    var data = _this.props.data;
    _this.validator = _this.props.validator;
    _this.state = {
      value: data === null || data === void 0 ? void 0 : data.value,
      checked: data.value != null,
      message: (data === null || data === void 0 ? void 0 : data.message) || '',
      isBuiltIn: data === null || data === void 0 ? void 0 : data.isBuiltIn
    };
    return _this;
  }
  ValidationItem.prototype.handleEdit = function (value, action) {
    var _a = this.props,
      onEdit = _a.onEdit,
      data = _a.data;
    if ((action === null || action === void 0 ? void 0 : action.type) === 'submit') {
      onEdit && onEdit(tslib.__assign({
        name: data.name
      }, value));
    }
  };
  ValidationItem.prototype.handleDelete = function () {
    var _a = this.props,
      onDelete = _a.onDelete,
      data = _a.data;
    onDelete && onDelete(data.name);
  };
  ValidationItem.prototype.handleSwitch = function (checked) {
    var _a = this.props,
      onSwitch = _a.onSwitch,
      data = _a.data;
    var _b = this.state,
      value = _b.value;
      _b.message;
    this.setState({
      checked: checked
    });
    if (checked) {
      data.value = this.validator.schema ? value : true;
      data.message = '';
    }
    onSwitch && onSwitch(checked, data);
  };
  ValidationItem.prototype.renderActions = function () {
    var isDefault = this.props.isDefault;
    var actions = [];
    if (!isDefault) {
      actions.push(React__default["default"].createElement(amis.Button, {
        className: "ae-ValidationControl-item-action",
        level: "link",
        size: "md",
        key: "delete",
        onClick: this.handleDelete
      }, React__default["default"].createElement("i", {
        className: "fa fa-trash"
      })));
    }
    return actions.length !== 0 ? React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("div", {
      className: "ae-ValidationControl-item-actions"
    }, actions)) : null;
  };
  ValidationItem.prototype.renderInputControl = function () {
    var _this = this;
    var _a = this.state,
      value = _a.value,
      message = _a.message,
      checked = _a.checked;
    var i18nEnabled = amisEditorCore.getI18nEnabled();
    var control = [];
    if (!checked) {
      return null;
    }
    if (this.validator.schema) {
      control = control.concat(this.validator.schema);
    }
    if (this.validator.message) {
      control.push({
        name: 'message',
        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
        label: amisEditorCore.tipedLabel(i18nRuntime.i18n("d7a169e81b60ee08c82b5d9de473e362"), "\u7CFB\u7EDF\u9ED8\u8BA4\u63D0\u793A\uFF1A".concat(this.validator.message)),
        pipeIn: function (value, data) {
          // value中 $1 会被运算，导致无法正确回显$1。此处从this.props.data中获取该校验项的错误提示
          return _this.props.data.message;
        },
        placeholder: i18nRuntime.i18n("5ef6ce89f52b4331b080a0f3019414f3")
      });
    }
    return control.length !== 0 ? React__default["default"].createElement("section", {
      className: cx__default["default"]('ae-ValidationControl-item-input', 'ae-ExtendMore')
    }, amis.render({
      type: 'form',
      className: 'w-full',
      wrapWithPanel: false,
      panelClassName: 'border-none shadow-none mb-0',
      bodyClassName: 'p-none',
      actionsClassName: 'border-none mt-2.5',
      wrapperComponent: 'div',
      mode: 'horizontal',
      horizontal: {
        justify: true,
        left: 4,
        right: 8
      },
      preventEnterSubmit: true,
      submitOnChange: true,
      body: control,
      data: {
        value: value,
        message: message
      }
    }, {
      onSubmit: this.handleEdit
    })) : null;
  };
  ValidationItem.prototype.render = function () {
    var _a = this.props,
      classPrefix = _a.classPrefix,
      data = _a.data;
      _a.isDefault;
    var _b = this.state,
      checked = _b.checked,
      isBuiltIn = _b.isBuiltIn;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-ValidationControl-item', {
        'is-active': checked
      }),
      key: data.name
    }, React__default["default"].createElement("section", {
      className: cx__default["default"]('ae-ValidationControl-item-control', {
        'is-active': checked && data.name !== 'required'
      })
    }, React__default["default"].createElement("label", {
      className: cx__default["default"]("".concat(classPrefix, "Form-label"))
    }, this.validator.label), React__default["default"].createElement("div", null, this.renderActions(), React__default["default"].createElement(amis.Switch, {
      key: "switch",
      value: checked,
      disabled: isBuiltIn,
      onChange: this.handleSwitch
    }))), this.renderInputControl());
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object, Object]), tslib.__metadata("design:returntype", void 0)], ValidationItem.prototype, "handleEdit", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], ValidationItem.prototype, "handleDelete", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Boolean]), tslib.__metadata("design:returntype", void 0)], ValidationItem.prototype, "handleSwitch", null);
  return ValidationItem;
}(React__default["default"].Component);

exports["default"] = ValidationItem;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
