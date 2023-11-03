/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var FlexPluginBase = require('./FlexPluginBase.js');
var i18nRuntime = require('i18n-runtime');

var Layout_fixed = /** @class */function (_super) {
  tslib.__extends(Layout_fixed, _super);
  function Layout_fixed() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.name = i18nRuntime.i18n("9bbb7cfaeb34a2b5c095ac253355f028");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'layout-fixed-plugin';
    _this.description = i18nRuntime.i18n("72c32b47c5e4dcd58ddabdb8fde761a0");
    _this.order = 0;
    _this.scaffold = {
      type: 'container',
      size: 'xs',
      body: [],
      style: {
        position: 'fixed',
        inset: 'auto 50px 50px auto',
        zIndex: 10,
        minWidth: '80px',
        minHeight: '80px',
        display: 'block'
      },
      wrapperBody: false,
      originPosition: 'right-bottom'
    };
    _this.panelTitle = i18nRuntime.i18n("9bbb7cfaeb34a2b5c095ac253355f028");
    return _this;
  }
  Layout_fixed.id = 'Layout_fixed';
  Layout_fixed.scene = ['layout'];
  return Layout_fixed;
}(FlexPluginBase.FlexPluginBase);
amisEditorCore.registerEditorPlugin(Layout_fixed);

exports["default"] = Layout_fixed;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
