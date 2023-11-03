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
var set = require('lodash/set');
var get = require('lodash/get');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var set__default = /*#__PURE__*/_interopDefaultLegacy(set);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);

/**
 * @file 角标控件
 */
var NavDefaultActiveControl = /** @class */function (_super) {
  tslib.__extends(NavDefaultActiveControl, _super);
  function NavDefaultActiveControl(props) {
    return _super.call(this, props) || this;
  }
  NavDefaultActiveControl.prototype.deleteActive = function (data) {
    var e_1, _a;
    try {
      for (var data_1 = tslib.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
        var item = data_1_1.value;
        if (item.active) {
          delete item.active;
        }
        if (item.children) {
          this.deleteActive(item.children);
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  };
  NavDefaultActiveControl.prototype.findActiveKey = function (data, index) {
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (item.active) {
        this.activeKey = index ? "".concat(index, "_").concat(i) : "".concat(i);
        return;
      }
      if (item.children && item.children.length) {
        this.findActiveKey(item.children, "".concat(i));
      }
    }
  };
  NavDefaultActiveControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      render = _a.render,
      data = _a.data,
      onBulkChange = _a.onBulkChange;
    this.findActiveKey(data.links);
    return render('', {
      type: 'tree-select',
      name: 'treeSelect',
      label: amisEditorCore.tipedLabel(i18nRuntime.i18n("515e8b11c3c24c6c3b03c6c76b1da496"), i18nRuntime.i18n("4f80ea1e761598ba9fe393e7c745468d")),
      valueField: 'id',
      options: data.links,
      mode: 'horizontal',
      value: this.activeKey,
      horizontal: {
        justify: true,
        left: 4
      },
      onChange: function (value) {
        var pathArr = value && value.split('_') || [];
        var links = data.links;
        _this.deleteActive(links);
        var path = "[".concat(pathArr.join('].children['), "]");
        if (get__default["default"](links, path + '.label')) {
          set__default["default"](links, path + '.active', true);
        }
        onBulkChange && onBulkChange({
          links: links
        });
      }
    });
  };
  return NavDefaultActiveControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(NavDefaultActive, _super);
  function NavDefaultActive() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  NavDefaultActive = tslib.__decorate([amis.FormItem({
    type: 'ae-nav-default-active',
    renderLabel: false
  })], NavDefaultActive);
  return NavDefaultActive;
})(NavDefaultActiveControl);

exports["default"] = NavDefaultActiveControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
