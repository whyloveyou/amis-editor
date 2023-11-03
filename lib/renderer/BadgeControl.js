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
 * @file 角标控件
 */
var BadgeControl = /** @class */function (_super) {
  tslib.__extends(BadgeControl, _super);
  function BadgeControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      checked: !!amisEditorCore.isObject(props === null || props === void 0 ? void 0 : props.value)
    };
    return _this;
  }
  BadgeControl.prototype.componentDidUpdate = function (prevProps) {
    var _a, _b;
    var props = this.props;
    if (amisEditorCore.anyChanged(['mode', 'text', 'size', 'offset', 'position', 'overflowCount', 'visibleOn', 'animation', 'style', 'level'], (_a = prevProps === null || prevProps === void 0 ? void 0 : prevProps.value) !== null && _a !== void 0 ? _a : {}, (_b = props === null || props === void 0 ? void 0 : props.value) !== null && _b !== void 0 ? _b : {})) {
      this.setState({
        checked: !!amisEditorCore.isObject(props === null || props === void 0 ? void 0 : props.value)
      });
    }
  };
  BadgeControl.prototype.transformBadgeValue = function () {
    var _a, _b, _c, _d;
    var _e = this.props,
      ctx = _e.data,
      node = _e.node;
    var badge = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.badge) !== null && _a !== void 0 ? _a : {};
    // 避免获取到上层的size
    var size = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.badge) === null || _b === void 0 ? void 0 : _b.size;
    if (node.type === 'button-group-select') {
      badge = (_d = (_c = ctx === null || ctx === void 0 ? void 0 : ctx.option) === null || _c === void 0 ? void 0 : _c.badge) !== null && _d !== void 0 ? _d : {};
      size = badge === null || badge === void 0 ? void 0 : badge.size;
    }
    var offset = [0, 0];
    // 转换成combo可以识别的格式
    if (Array.isArray(badge === null || badge === void 0 ? void 0 : badge.offset) && (badge === null || badge === void 0 ? void 0 : badge.offset.length) >= 2) {
      offset[0] = badge.offset[0];
      offset[1] = badge.offset[1];
    }
    return tslib.__assign(tslib.__assign({}, badge), {
      size: size,
      offset: offset
    });
  };
  BadgeControl.prototype.normalizeBadgeValue = function (form) {
    var _a, _b;
    var offset = amisEditorCore.isObject(form === null || form === void 0 ? void 0 : form.offset) && ((_a = form === null || form === void 0 ? void 0 : form.offset) === null || _a === void 0 ? void 0 : _a[0]) && ((_b = form === null || form === void 0 ? void 0 : form.offset) === null || _b === void 0 ? void 0 : _b[1]) ? {
      offset: [form.offset[0], form.offset[1]]
    } : {};
    return tslib.__assign(tslib.__assign({}, form), offset);
  };
  BadgeControl.prototype.handleSwitchChange = function (checked) {
    var _a = this.props,
      onChange = _a.onChange,
      disabled = _a.disabled;
    if (disabled) {
      return;
    }
    this.setState({
      checked: checked
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(checked ? {
      mode: 'dot'
    } : undefined);
  };
  BadgeControl.prototype.handleSubmit = function (form, action) {
    var onBulkChange = this.props.onBulkChange;
    if ((action === null || action === void 0 ? void 0 : action.type) === 'submit') {
      onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
        badge: this.normalizeBadgeValue(form)
      });
    }
  };
  BadgeControl.prototype.renderBody = function () {
    var render = this.props.render;
    var data = this.transformBadgeValue();
    var i18nEnabled = amisEditorCore.getI18nEnabled();
    return render('badge-form', {
      type: 'form',
      className: 'ae-BadgeControl-form w-full',
      wrapWithPanel: false,
      panelClassName: 'border-none shadow-none mb-0',
      bodyClassName: 'p-none',
      actionsClassName: 'border-none mt-2.5',
      wrapperComponent: 'div',
      preventEnterSubmit: true,
      submitOnChange: true,
      body: [{
        label: i18nRuntime.i18n("226b0912184333c81babf2f1894ec0c1"),
        name: 'mode',
        type: 'button-group-select',
        size: 'sm',
        mode: 'row',
        tiled: true,
        className: 'ae-BadgeControl-buttonGroup',
        inputClassName: 'flex-nowrap',
        options: [{
          label: i18nRuntime.i18n("be604f8b7ec5e80288b091ee12bbab7f"),
          value: 'dot',
          icon: 'fa fa-circle'
        }, {
          label: i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733"),
          value: 'text',
          icon: 'fa fa-font'
        }, {
          label: i18nRuntime.i18n("9adcfe38533f68035b2bf7831d310381"),
          value: 'ribbon',
          icon: 'fa fa-ribbon'
        }],
        pipeIn: amisEditorCore.defaultValue('dot')
      }, {
        label: i18nRuntime.i18n("cbc608353218e1d63e6f47c9db1eae64"),
        name: 'text',
        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
        mode: 'row',
        visibleOn: "data.mode !== 'dot'",
        pipeOut: function (value) {
          return Number.isNaN(Number(value)) || value === '' ? value : Number(value);
        }
      }, {
        label: i18nRuntime.i18n("9970ad07468267e2f309f1467c75bb80"),
        name: 'level',
        type: 'button-group-select',
        size: 'sm',
        mode: 'row',
        tiled: true,
        className: 'ae-BadgeControl-buttonGroup',
        inputClassName: 'flex-nowrap',
        options: [{
          label: i18nRuntime.i18n("330363dfc524cff2488f2ebde0500896"),
          value: 'success'
        }, {
          label: i18nRuntime.i18n("900c70fa5f7dbc014e6f762d5e0e885c"),
          value: 'warning'
        }, {
          label: i18nRuntime.i18n("540f84ddc0883866b229f71c2844199a"),
          value: 'danger'
        }, {
          label: i18nRuntime.i18n("d8c7e04c8e2be23dd3b81a31db6e04f1"),
          value: 'info'
        }],
        pipeIn: amisEditorCore.defaultValue('danger')
      }, {
        label: i18nRuntime.i18n("d4d2a66820d30e07b44c850eb3f116c0"),
        name: 'position',
        type: 'button-group-select',
        size: 'sm',
        mode: 'row',
        tiled: true,
        className: 'ae-BadgeControl-buttonGroup',
        inputClassName: 'flex-nowrap',
        options: [{
          label: '',
          value: 'top-left',
          icon: 'fa fa-long-arrow-alt-up',
          className: 'ae-BadgeControl-position--antiClockwise'
        }, {
          label: '',
          value: 'top-right',
          icon: 'fa fa-long-arrow-alt-up',
          className: 'ae-BadgeControl-position--clockwise'
        }, {
          label: '',
          value: 'bottom-left',
          icon: 'fa fa-long-arrow-alt-down',
          className: 'ae-BadgeControl-position--clockwise'
        }, {
          label: '',
          value: 'bottom-right',
          icon: 'fa fa-long-arrow-alt-down',
          className: 'ae-BadgeControl-position--antiClockwise'
        }],
        pipeIn: amisEditorCore.defaultValue('top-right')
      }, {
        type: 'input-group',
        mode: 'row',
        inputClassName: 'inline-flex justify-right flex-row-reverse',
        label: amisEditorCore.tipedLabel(i18nRuntime.i18n("ebc556841a9264ebaab728efad7af777"), i18nRuntime.i18n("81cdf47e8d8adfc70faac2cbc55e4067")),
        body: [{
          type: 'input-number',
          name: 'offset',
          suffix: 'px',
          pipeIn: function (value) {
            return Array.isArray(value) ? value[0] || 0 : 0;
          },
          pipeOut: function (value, oldValue, data) {
            return [value, data.offset[1]];
          }
        }, {
          type: 'input-number',
          name: 'offset',
          suffix: 'px',
          pipeIn: function (value) {
            return Array.isArray(value) ? value[1] || 0 : 0;
          },
          pipeOut: function (value, oldValue, data) {
            return [data.offset[0], value];
          }
        }]
      }, {
        label: i18nRuntime.i18n("7ba3812c61e01b3049404a46fac8deda"),
        name: 'size',
        type: 'switch',
        mode: 'row',
        inputClassName: 'inline-flex justify-between flex-row-reverse',
        pipeIn: function (value) {
          return !!value;
        },
        pipeOut: function (value, oldValue, data) {
          return value ? (data === null || data === void 0 ? void 0 : data.mode) === 'dot' ? 6 : (data === null || data === void 0 ? void 0 : data.mode) === 'ribbon' ? 12 : 16 : undefined;
        }
      }, {
        label: '',
        name: 'size',
        type: 'input-number',
        size: 'sm',
        mode: 'row',
        min: 1,
        max: 100,
        suffix: 'px',
        visibleOn: 'this.size',
        pipeIn: function (value) {
          return typeof value === 'number' ? value : 0;
        }
      }, {
        label: amisEditorCore.tipedLabel(i18nRuntime.i18n("29e13ada94b145a1359291d5e1564655"), i18nRuntime.i18n("42becf09dfd209746b66726e7d21d014")),
        name: 'overflowCount',
        type: 'input-number',
        size: 'sm',
        mode: 'row',
        visibleOn: "data.mode === 'text'"
      }, {
        label: i18nRuntime.i18n("b599979e9a40823363451aeaadc0723f"),
        name: 'animation',
        type: 'switch',
        mode: 'row',
        inputClassName: 'inline-flex justify-between flex-row-reverse'
      }]
    }, {
      data: data,
      onSubmit: this.handleSubmit.bind(this)
    });
  };
  BadgeControl.prototype.render = function () {
    var _a = this.props,
      classPrefix = _a.classPrefix,
      className = _a.className,
      labelClassName = _a.labelClassName,
      label = _a.label,
      disabled = _a.disabled;
    var checked = this.state.checked;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-BadgeControl', className)
    }, React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-BadgeControl-switch')
    }, React__default["default"].createElement("label", {
      className: cx__default["default"]("".concat(classPrefix, "Form-label"), labelClassName)
    }, label || i18nRuntime.i18n("b8c467fce096a649583c0bc9d9281a5c")), React__default["default"].createElement(amis.Switch, {
      value: checked,
      onChange: this.handleSwitchChange,
      disabled: disabled
    })), checked ? this.renderBody() : null);
  };
  BadgeControl.defaultProps = {
    mode: 'dot',
    overflowCount: 99,
    position: 'top-right',
    level: 'danger',
    animation: false
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Boolean]), tslib.__metadata("design:returntype", void 0)], BadgeControl.prototype, "handleSwitchChange", null);
  return BadgeControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(BadgeControlRenderer, _super);
  function BadgeControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  BadgeControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-badge',
    renderLabel: false
  })], BadgeControlRenderer);
  return BadgeControlRenderer;
})(BadgeControl);

exports["default"] = BadgeControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
