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

var Layout_fixed_top = /** @class */function (_super) {
  tslib.__extends(Layout_fixed_top, _super);
  function Layout_fixed_top() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.name = i18nRuntime.i18n("969e9e56b3812abffa3994f35ea31835");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'layout-fixed-top';
    _this.description = i18nRuntime.i18n("bb0e1fea25aafbe731886295fcef9a2e");
    _this.order = -1;
    _this.scaffold = {
      type: 'flex',
      isSorptionContainer: true,
      sorptionPosition: 'top',
      className: 'p-1',
      items: [FlexPluginBase.defaultFlexColumnSchema(), FlexPluginBase.defaultFlexColumnSchema(), FlexPluginBase.defaultFlexColumnSchema(), FlexPluginBase.defaultFlexColumnSchema()],
      style: {
        position: 'fixed',
        inset: '0 auto auto 0',
        zIndex: 10,
        width: '100%',
        overflowX: 'auto',
        margin: '0',
        overflowY: 'auto'
      },
      isFixedWidth: true,
      isFixedHeight: false,
      originPosition: 'right-bottom'
    };
    _this.panelTitle = i18nRuntime.i18n("969e9e56b3812abffa3994f35ea31835");
    return _this;
  }
  Layout_fixed_top.id = 'Layout_fixed_top';
  Layout_fixed_top.scene = ['layout'];
  return Layout_fixed_top;
}(FlexPluginBase.FlexPluginBase);
amisEditorCore.registerEditorPlugin(Layout_fixed_top);

exports["default"] = Layout_fixed_top;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
