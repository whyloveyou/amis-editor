/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __values, __decorate } from 'tslib';
import React__default from 'react';
import { FormItem } from 'amis';
import { tipedLabel } from 'amis-editor-core';
import set from 'lodash/set';
import get from 'lodash/get';
import { i18n } from 'i18n-runtime';

/**
 * @file 角标控件
 */
var NavDefaultActiveControl = /** @class */function (_super) {
  __extends(NavDefaultActiveControl, _super);
  function NavDefaultActiveControl(props) {
    return _super.call(this, props) || this;
  }
  NavDefaultActiveControl.prototype.deleteActive = function (data) {
    var e_1, _a;
    try {
      for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
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
      label: tipedLabel(i18n("515e8b11c3c24c6c3b03c6c76b1da496"), i18n("4f80ea1e761598ba9fe393e7c745468d")),
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
        if (get(links, path + '.label')) {
          set(links, path + '.active', true);
        }
        onBulkChange && onBulkChange({
          links: links
        });
      }
    });
  };
  return NavDefaultActiveControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(NavDefaultActive, _super);
  function NavDefaultActive() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  NavDefaultActive = __decorate([FormItem({
    type: 'ae-nav-default-active',
    renderLabel: false
  })], NavDefaultActive);
  return NavDefaultActive;
})(NavDefaultActiveControl);

export { NavDefaultActiveControl as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
