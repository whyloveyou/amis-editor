/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var Container = require('../Container.js');
var i18nRuntime = require('i18n-runtime');

var Layout_free_container = /** @class */function (_super) {
  tslib.__extends(Layout_free_container, _super);
  function Layout_free_container() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.name = i18nRuntime.i18n("db805d4e361ac2d3fc6047eaea1a7c69");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'layout-free-container';
    _this.description = i18nRuntime.i18n("9ccbfde404798593fa6fdeac9dbef200");
    // order = -1;
    _this.tags = [i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc")];
    _this.scaffold = {
      type: 'container',
      isFreeContainer: true,
      size: 'xs',
      body: [],
      wrapperBody: false,
      style: {
        position: 'relative',
        minHeight: '200px'
      }
    };
    _this.panelTitle = i18nRuntime.i18n("db805d4e361ac2d3fc6047eaea1a7c69");
    return _this;
  }
  Layout_free_container.id = 'Layout_free_container';
  return Layout_free_container;
}(Container.ContainerPlugin);
amisEditorCore.registerEditorPlugin(Layout_free_container);

exports["default"] = Layout_free_container;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
