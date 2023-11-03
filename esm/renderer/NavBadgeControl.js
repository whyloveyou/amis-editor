/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import { FormItem } from 'amis';
import { isObject, getI18nEnabled, defaultValue, tipedLabel, getSchemaTpl, autobind } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

/**
 * @file 角标控件
 */
var BadgeControl = /** @class */function (_super) {
  __extends(BadgeControl, _super);
  function BadgeControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      checked: !!isObject(props === null || props === void 0 ? void 0 : props.value)
    };
    return _this;
  }
  BadgeControl.prototype.transformBadgeValue = function () {
    var _a, _b;
    var ctx = this.props.data;
    var badge = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.badge) !== null && _a !== void 0 ? _a : {};
    // 避免获取到上层的size
    var size = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.badge) === null || _b === void 0 ? void 0 : _b.size;
    var offset = [0, 0];
    // 转换成combo可以识别的格式
    if (Array.isArray(badge === null || badge === void 0 ? void 0 : badge.offset) && (badge === null || badge === void 0 ? void 0 : badge.offset.length) >= 2) {
      offset[0] = badge.offset[0];
      offset[1] = badge.offset[1];
    }
    return __assign(__assign({}, badge), {
      size: size,
      offset: offset
    });
  };
  BadgeControl.prototype.normalizeBadgeValue = function (form) {
    var _a, _b;
    var offset = isObject(form === null || form === void 0 ? void 0 : form.offset) && ((_a = form === null || form === void 0 ? void 0 : form.offset) === null || _a === void 0 ? void 0 : _a[0]) && ((_b = form === null || form === void 0 ? void 0 : form.offset) === null || _b === void 0 ? void 0 : _b[1]) ? {
      offset: [form.offset[0], form.offset[1]]
    } : {};
    return __assign(__assign({}, form), offset);
  };
  BadgeControl.prototype.handleSwitchChange = function (checked) {
    var _a = this.props,
      onBulkChange = _a.onBulkChange,
      data = _a.data;
    this.setState({
      checked: checked
    });
    if (checked) {
      if (data.badge) {
        onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
          badge: data.badge
        });
      } else {
        onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
          badge: {
            mode: 'dot'
          }
        });
      }
    } else {
      onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
        badge: undefined
      });
    }
  };
  BadgeControl.prototype.handleSubmit = function (form, action) {
    form.visibleOn = '${badge}';
    if (form.mode === 'dot') {
      form.text = undefined;
    } else {
      form.text = '${badge}';
    }
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
    getI18nEnabled();
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
        label: i18n("a7999d1390b7dc775e4287511c395d6c"),
        name: 'mode',
        type: 'button-group-select',
        size: 'sm',
        tiled: true,
        className: 'ae-BadgeControl-buttonGroup',
        options: [{
          label: i18n("be604f8b7ec5e80288b091ee12bbab7f"),
          value: 'dot'
        }, {
          label: i18n("ca746b1ff10193a3ce20878dec04a733"),
          value: 'text'
        }, {
          label: i18n("9adcfe38533f68035b2bf7831d310381"),
          value: 'ribbon'
        }],
        mode: 'horizontal',
        horizontal: {
          justify: true,
          left: 4
        },
        pipeIn: defaultValue('dot')
      }, {
        label: tipedLabel(i18n("29e13ada94b145a1359291d5e1564655"), i18n("31175366279c15232e27b6736ccb2fd4")),
        name: 'overflowCount',
        type: 'input-number',
        size: 'sm',
        visibleOn: "data.mode === 'text'",
        mode: 'horizontal',
        horizontal: {
          justify: true,
          left: 4
        }
      }, {
        label: i18n("58f966670529f4753fb3c5a0647606be"),
        name: 'size',
        type: 'input-number',
        size: 'sm',
        suffix: 'px',
        mode: 'horizontal',
        horizontal: {
          justify: true,
          left: 4
        }
      }, {
        label: i18n("9970ad07468267e2f309f1467c75bb80"),
        name: 'level',
        type: 'select',
        size: 'sm',
        mode: 'horizontal',
        horizontal: {
          justify: true,
          left: 4
        },
        tiled: true,
        className: 'input-select',
        options: [{
          label: i18n("330363dfc524cff2488f2ebde0500896"),
          value: 'success'
        }, {
          label: i18n("900c70fa5f7dbc014e6f762d5e0e885c"),
          value: 'warning'
        }, {
          label: i18n("540f84ddc0883866b229f71c2844199a"),
          value: 'danger'
        }, {
          label: i18n("d8c7e04c8e2be23dd3b81a31db6e04f1"),
          value: 'info'
        }],
        pipeIn: defaultValue('danger')
      }, {
        label: i18n("d4d2a66820d30e07b44c850eb3f116c0"),
        name: 'position',
        type: 'select',
        size: 'sm',
        mode: 'horizontal',
        horizontal: {
          justify: true,
          left: 4
        },
        tiled: true,
        className: 'input-select',
        options: [{
          label: i18n("df68a5dc8f8847179b7afdf943f80796"),
          value: 'top-left'
        }, {
          label: i18n("e717b4ae480e7c073fd5a44647a7f0da"),
          value: 'top-right'
        }, {
          label: i18n("2a97dfb2d236c87c41fd588f006111dc"),
          value: 'bottom-left'
        }, {
          label: i18n("1c9bc9dab33944e953412f8b22cb024a"),
          value: 'bottom-right'
        }],
        pipeIn: defaultValue('top-right')
      }, {
        type: 'group',
        mode: 'horizontal',
        horizontal: {
          justify: true,
          left: 4
        },
        label: tipedLabel(i18n("ebc556841a9264ebaab728efad7af777"), i18n("81cdf47e8d8adfc70faac2cbc55e4067")),
        body: [{
          type: 'input-text',
          name: 'offset[0]',
          label: false,
          addOn: {
            label: 'X',
            type: 'text',
            position: 'left'
          },
          validateOnChange: true,
          validations: {
            isNumeric: true
          }
        }, {
          type: 'input-text',
          label: false,
          name: 'offset[1]',
          addOn: {
            label: 'Y',
            type: 'text',
            position: 'left'
          },
          validateOnChange: true,
          validations: {
            isNumeric: true
          }
        }]
      }]
    }, {
      data: data,
      onSubmit: this.handleSubmit.bind(this)
    });
  };
  BadgeControl.prototype.render = function () {
    var _this = this;
    var _a = this.props;
      _a.classPrefix;
      var className = _a.className;
      _a.labelClassName;
      _a.label;
      _a.disabled;
      var render = _a.render;
    var checked = this.state.checked;
    return React__default.createElement("div", {
      className: cx('ae-BadgeControl', className)
    }, render('', getSchemaTpl('switch', {
      label: tipedLabel(i18n("b8c467fce096a649583c0bc9d9281a5c"), i18n("b3c1b71ed42c7f2fe55f3c64346f1ae6")),
      name: 'checked',
      mode: 'horizontal',
      value: checked,
      onChange: function (checked) {
        return _this.handleSwitchChange(checked);
      }
    })), checked ? this.renderBody() : null);
  };
  BadgeControl.defaultProps = {
    mode: 'dot',
    overflowCount: 99,
    position: 'top-right',
    level: 'danger'
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Boolean]), __metadata("design:returntype", void 0)], BadgeControl.prototype, "handleSwitchChange", null);
  return BadgeControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(BadgeControlRenderer, _super);
  function BadgeControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  BadgeControlRenderer = __decorate([FormItem({
    type: 'ae-nav-badge',
    renderLabel: false
  })], BadgeControlRenderer);
  return BadgeControlRenderer;
})(BadgeControl);

export { BadgeControl as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
