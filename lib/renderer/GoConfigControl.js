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
var amisCore = require('amis-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

/**
 * @file 进行详细配置
 */
var GoConfigControl = /** @class */function (_super) {
  tslib.__extends(GoConfigControl, _super);
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
      amis.toast.error(i18nRuntime.i18n("b51796f5778fdc31bac73769a85f89c7"));
      return;
    }
    manager.setActiveId(id);
  };
  GoConfigControl.prototype.render = function () {
    var _a = this.props,
      className = _a.className,
      label = _a.label;
      _a.data;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-GoConfig', className),
      onClick: this.onClick
    }, label, React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-GoConfig-trigger')
    }, i18nRuntime.i18n("eee03351367bb1907dcc3140ffa3e3b8")));
  };
  tslib.__decorate([amisCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], GoConfigControl.prototype, "onClick", null);
  return GoConfigControl;
}(React__default["default"].PureComponent);
/** @class */(function (_super) {
  tslib.__extends(GoConfigControlRenderer, _super);
  function GoConfigControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  GoConfigControlRenderer = tslib.__decorate([amis.Renderer({
    type: 'ae-go-config'
  })], GoConfigControlRenderer);
  return GoConfigControlRenderer;
})(GoConfigControl);

exports.GoConfigControl = GoConfigControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
