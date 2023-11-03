/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import { toast, Renderer } from 'amis';
import { autobind } from 'amis-core';
import { i18n } from 'i18n-runtime';

/**
 * @file 进行详细配置
 */
var GoConfigControl = /** @class */function (_super) {
  __extends(GoConfigControl, _super);
  function GoConfigControl() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  GoConfigControl.prototype.onClick = function () {
    var _a = this.props,
      _b = _a.data,
      ctx = _b === void 0 ? {} : _b,
      compId = _a.compId,
      manager = _a.manager;
    var id = typeof compId === 'string' ? compId : compId(ctx);
    if (!id) {
      toast.error(i18n("b51796f5778fdc31bac73769a85f89c7"));
      return;
    }
    manager.setActiveId(id);
  };
  GoConfigControl.prototype.render = function () {
    var _a = this.props,
      className = _a.className,
      label = _a.label;
      _a.data;
    return React__default.createElement("div", {
      className: cx('ae-GoConfig', className),
      onClick: this.onClick
    }, label, React__default.createElement("div", {
      className: cx('ae-GoConfig-trigger')
    }, i18n("eee03351367bb1907dcc3140ffa3e3b8")));
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], GoConfigControl.prototype, "onClick", null);
  return GoConfigControl;
}(React__default.PureComponent);
/** @class */(function (_super) {
  __extends(GoConfigControlRenderer, _super);
  function GoConfigControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  GoConfigControlRenderer = __decorate([Renderer({
    type: 'ae-go-config'
  })], GoConfigControlRenderer);
  return GoConfigControlRenderer;
})(GoConfigControl);

export { GoConfigControl };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
