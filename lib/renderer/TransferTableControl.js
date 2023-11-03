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
var amisEditorCore = require('amis-editor-core');
var cx = require('classnames');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

/**
 * @file Transfer的表格对应选项
 */
function BaseOptionControl(Cmpt) {
  return (/** @class */function (_super) {
      tslib.__extends(class_1, _super);
      function class_1(props) {
        var _this = _super.call(this, props) || this;
        _this.internalProps = ['checked', 'editing'];
        _this.state = {
          api: props.data.source,
          labelField: props.data.labelField,
          valueField: props.data.valueField,
          source: props.data.source ? /\$\{(.*?)\}/g.test(props.data.source) ? 'variable' : 'api' : 'custom'
        };
        _this.handleSourceChange = _this.handleSourceChange.bind(_this);
        _this.handleAPIChange = _this.handleAPIChange.bind(_this);
        _this.handleLableFieldChange = _this.handleLableFieldChange.bind(_this);
        _this.handleValueFieldChange = _this.handleValueFieldChange.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
      }
      /**
       * 更新options字段的统一出口
       */
      class_1.prototype.onChange = function () {
        var source = this.state.source;
        var onBulkChange = this.props.onBulkChange;
        var data = {
          source: undefined,
          options: undefined,
          labelField: undefined,
          valueField: undefined
        };
        if (['api', 'variable'].includes(source)) {
          var _a = this.state,
            api = _a.api,
            labelField = _a.labelField,
            valueField = _a.valueField;
          data.source = api;
          data.labelField = labelField || undefined;
          data.valueField = valueField || undefined;
        }
        onBulkChange && onBulkChange(data);
        return;
      };
      /**
       * 切换选项类型
       */
      class_1.prototype.handleSourceChange = function (source) {
        this.setState({
          api: '',
          source: source
        }, this.onChange);
      };
      class_1.prototype.handleAPIChange = function (source) {
        this.setState({
          api: source
        }, this.onChange);
      };
      class_1.prototype.handleLableFieldChange = function (labelField) {
        this.setState({
          labelField: labelField
        }, this.onChange);
      };
      class_1.prototype.handleValueFieldChange = function (valueField) {
        this.setState({
          valueField: valueField
        }, this.onChange);
      };
      class_1.prototype.buildBatchAddSchema = function () {
        return {
          type: 'action',
          actionType: 'dialog',
          label: i18nRuntime.i18n("22de6ef85ed60ec54dbdc1d8583e5104"),
          dialog: {
            title: i18nRuntime.i18n("421252e16c6cb544fe9ce0be94a190e0"),
            headerClassName: 'font-bold',
            closeOnEsc: true,
            closeOnOutside: false,
            showCloseButton: true,
            body: [{
              type: 'alert',
              level: 'warning',
              body: [{
                type: 'tpl',
                tpl: i18nRuntime.i18n("c130bd5b55edefdaf8923269e9a52439")
              }],
              showIcon: true,
              className: 'mb-2.5'
            }, {
              type: 'form',
              wrapWithPanel: false,
              mode: 'normal',
              wrapperComponent: 'div',
              resetAfterSubmit: true,
              autoFocus: true,
              preventEnterSubmit: true,
              horizontal: {
                left: 0,
                right: 12
              },
              body: [{
                name: 'batchOption',
                type: 'textarea',
                label: '',
                placeholder: i18nRuntime.i18n("1e2f96a69fbef8caa8823a3067ebbdc7"),
                trimContents: true,
                minRows: 10,
                maxRows: 50,
                required: true
              }]
            }]
          }
        };
      };
      class_1.prototype.renderHeader = function () {
        var _this = this;
        var _a;
        var _b = this.props,
          render = _b.render,
          label = _b.label,
          labelRemark = _b.labelRemark,
          useMobileUI = _b.useMobileUI,
          env = _b.env,
          popOverContainer = _b.popOverContainer;
        var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
        var source = this.state.source;
        var optionSourceList = [{
          label: i18nRuntime.i18n("01820262aa9ad5b130f8f5b86bfd2968"),
          value: 'custom'
        }, {
          label: i18nRuntime.i18n("c8158b3cad598b0b5939788ca4efb298"),
          value: 'api'
        }, {
          label: i18nRuntime.i18n("50334fc77fc5a2c2636f14f158d3c417"),
          value: 'variable'
        }].map(function (item) {
          return tslib.__assign(tslib.__assign({}, item), {
            onClick: function () {
              return _this.handleSourceChange(item.value);
            }
          });
        });
        return React__default["default"].createElement("header", {
          className: "ae-OptionControl-header"
        }, React__default["default"].createElement("label", {
          className: cx__default["default"]("".concat(classPrefix, "Form-label"))
        }, label || '', labelRemark ? render('label-remark', {
          type: 'remark',
          icon: labelRemark.icon || 'warning-mark',
          tooltip: labelRemark,
          className: cx__default["default"]("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
          useMobileUI: useMobileUI,
          container: popOverContainer || env.getModalContainer
        }) : null), React__default["default"].createElement("div", null, render('validation-control-addBtn', {
          type: 'dropdown-button',
          level: 'link',
          size: 'sm',
          label: '${selected}',
          align: 'right',
          closeOnClick: true,
          closeOnOutside: true,
          buttons: optionSourceList
        }, {
          popOverContainer: null,
          data: {
            selected: optionSourceList.find(function (item) {
              return item.value === source;
            }).label
          }
        })));
      };
      class_1.prototype.renderApiPanel = function () {
        var render = this.props.render;
        var _a = this.state,
          source = _a.source,
          api = _a.api,
          labelField = _a.labelField,
          valueField = _a.valueField;
        if (source !== 'api') {
          return null;
        }
        return render('api', amisEditorCore.getSchemaTpl('apiControl', {
          label: i18nRuntime.i18n("54ea89b497ec3bb319c68844dfa3687f"),
          name: 'source',
          className: 'ae-ExtendMore',
          visibleOn: 'data.autoComplete !== false',
          value: api,
          onChange: this.handleAPIChange,
          footer: [{
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("7e9c83e86beb612377a94e6e8d1fc644"), i18nRuntime.i18n("26ff46d82166741297ce666b2792af85")),
            type: 'input-text',
            name: 'labelField',
            value: labelField,
            placeholder: i18nRuntime.i18n("6d4ce0631f37676a887c9599691fabec"),
            onChange: this.handleLableFieldChange
          }, {
            label: i18nRuntime.i18n("2e01f5f5889e33d003bec7857cd38445"),
            type: 'input-text',
            name: 'valueField',
            value: valueField,
            placeholder: i18nRuntime.i18n("959c27193eb0a41d01f4b53dcc4b9245"),
            onChange: this.handleValueFieldChange
          }]
        }));
      };
      class_1.prototype.render = function () {
        var _a;
        var _b = this.state,
          source = _b.source,
          api = _b.api,
          labelField = _b.labelField,
          valueField = _b.valueField;
        var _c = this.props,
          className = _c.className,
          render = _c.render;
        var cmptProps = tslib.__assign(tslib.__assign({}, this.props), {
          data: tslib.__assign({
            api: api,
            labelField: labelField,
            valueField: valueField
          }, (_a = this.props) === null || _a === void 0 ? void 0 : _a.data)
        });
        return React__default["default"].createElement("div", {
          className: cx__default["default"]('ae-OptionControl', className)
        }, this.renderHeader(), source === 'custom' ? React__default["default"].createElement(Cmpt, tslib.__assign({}, cmptProps)) : null, source === 'api' ? this.renderApiPanel() : null, source === 'variable' ? render('variable', amisEditorCore.getSchemaTpl('sourceBindControl', {
          label: false,
          className: 'ae-ExtendMore'
        }), {
          onChange: this.handleAPIChange
        }) : null);
      };
      return class_1;
    }(React__default["default"].Component)
  );
}
var renderInput = function (name, placeholder, required, unique) {
  if (required === void 0) {
    required = true;
  }
  if (unique === void 0) {
    unique = false;
  }
  return {
    type: 'input-text',
    name: name,
    placeholder: placeholder,
    required: required,
    unique: unique
  };
};
var TransferTableOption = /** @class */function (_super) {
  tslib.__extends(TransferTableOption, _super);
  function TransferTableOption() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TransferTableOption.prototype.addColumns = function () {
    var _this = this;
    var _a = this.props.data.columns,
      columns = _a === void 0 ? [{
        type: 'text'
      }] : _a;
    return {
      type: 'action',
      actionType: 'dialog',
      label: i18nRuntime.i18n("f86418b525af4b573aed36b8e3f9aeb8"),
      level: 'enhance',
      dialog: {
        title: i18nRuntime.i18n("ec159d98c6c25fadd38bcd9362f6a28e"),
        headerClassName: 'font-bold',
        closeOnEsc: true,
        closeOnOutside: false,
        showCloseButton: true,
        onConfirm: function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return _this.handleChange(args[2].columns, 'columns');
        },
        body: [{
          name: 'columns',
          type: 'combo',
          multiple: true,
          label: false,
          strictMode: false,
          addButtonText: i18nRuntime.i18n("0c14e431f1b5ecd163f8fa010a0654c7"),
          draggable: false,
          value: columns,
          items: [{
            type: 'input-text',
            name: 'label',
            placeholder: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab")
          }, {
            type: 'input-text',
            name: 'name',
            placeholder: i18nRuntime.i18n("41a344642681efaaa418c228ba7fb45c")
          }, {
            type: 'select',
            name: 'type',
            placeholder: i18nRuntime.i18n("226b0912184333c81babf2f1894ec0c1"),
            value: 'text',
            options: [{
              value: 'text',
              label: i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371")
            }, {
              value: 'tpl',
              label: i18nRuntime.i18n("59cf15fe6b8d659c9bd2f86143534a06")
            }, {
              value: 'image',
              label: i18nRuntime.i18n("20def7942674282277c3714ed7ea6ce0")
            }, {
              value: 'date',
              label: i18nRuntime.i18n("4ff1e74e43a3586339251494117185ad")
            }, {
              value: 'progress',
              label: i18nRuntime.i18n("c7bff79d059a0b7ff9b02441959d8be2")
            }, {
              value: 'status',
              label: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b")
            }, {
              value: 'mapping',
              label: i18nRuntime.i18n("9da188491dd34c4382a5b9f006194e41")
            }, {
              value: 'operation',
              label: i18nRuntime.i18n("8abc564260a1564521e0c3a1d5419b4a")
            }]
          }]
        }]
      }
    };
  };
  TransferTableOption.prototype.addRows = function () {
    var _this = this;
    var _a = this.props.data,
      _b = _a.columns,
      columns = _b === void 0 ? [] : _b,
      _c = _a.options,
      options = _c === void 0 ? [{}] : _c;
    return {
      type: 'tooltip-wrapper',
      tooltip: i18nRuntime.i18n("f302b37cf6530d3fb39234a220d95437"),
      tooltipTheme: 'dark',
      placement: 'top',
      tooltipStyle: {
        fontSize: '12px'
      },
      className: 'ae-formItemControl-label-tip',
      body: [{
        type: 'action',
        actionType: 'dialog',
        label: i18nRuntime.i18n("6090f7af1ae15892abe97409b9e557b1"),
        level: 'enhance',
        disabled: columns && columns.length === 0,
        block: true,
        dialog: {
          title: i18nRuntime.i18n("e6a10b831ae920bba1bb89a725e0fbe8"),
          headerClassName: 'font-bold',
          closeOnEsc: true,
          closeOnOutside: false,
          showCloseButton: true,
          size: columns.length >= 6 ? 'md' : '',
          onConfirm: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return _this.handleChange(args[2].options, 'options');
          },
          body: [{
            type: 'form',
            wrapWithPanel: false,
            mode: 'normal',
            body: [{
              name: 'options',
              type: 'combo',
              multiple: true,
              draggable: true,
              addButtonText: i18nRuntime.i18n("66ab5e9f24c8f46012a25c89919fb191"),
              value: options,
              items: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(columns.map(function (item) {
                var _a;
                return renderInput(item.name, (_a = item.label) !== null && _a !== void 0 ? _a : '', false);
              })), false), [renderInput('value', i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"), true, true)], false)
            }]
          }]
        }
      }]
    };
  };
  TransferTableOption.prototype.handleChange = function (value, type) {
    var _a;
    var data = this.props.data;
    var _b = this.props,
      onBulkChange = _b.onBulkChange,
      onValueChange = _b.onValueChange;
    data[type] = value;
    if (type === 'columns') {
      var keys_1 = value.map(function (item) {
        return item.name;
      });
      data.options = ((_a = data.options) !== null && _a !== void 0 ? _a : []).map(function (item) {
        return tslib.__assign({}, keys_1.reduce(function (pv, cv) {
          pv[cv] = item[cv];
          return pv;
        }, {
          value: item.value
        }));
      });
    }
    onValueChange && onValueChange(type, data, onBulkChange);
  };
  TransferTableOption.prototype.render = function () {
    return React__default["default"].createElement("div", {
      className: "ae-OptionControl-footer"
    }, amis.render(this.addColumns()), amis.render(this.addRows()));
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Array, String]), tslib.__metadata("design:returntype", void 0)], TransferTableOption.prototype, "handleChange", null);
  return TransferTableOption;
}(React__default["default"].Component);
var TransferTableControl = BaseOptionControl(TransferTableOption);
/** @class */(function (_super) {
  tslib.__extends(TransferTableControlRenderer, _super);
  function TransferTableControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  TransferTableControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-transferTableControl',
    renderLabel: false
  })], TransferTableControlRenderer);
  return TransferTableControlRenderer;
})(TransferTableControl);

exports["default"] = TransferTableOption;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
