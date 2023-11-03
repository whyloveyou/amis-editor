/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { ContainerPlugin } from '../Container.js';
import { i18n } from 'i18n-runtime';

var Layout_free_container = /** @class */function (_super) {
  __extends(Layout_free_container, _super);
  function Layout_free_container() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.name = i18n("db805d4e361ac2d3fc6047eaea1a7c69");
    _this.isBaseComponent = true;
    _this.pluginIcon = 'layout-free-container';
    _this.description = i18n("9ccbfde404798593fa6fdeac9dbef200");
    // order = -1;
    _this.tags = [i18n("b1b98c19058af70d8bd499e1899e93bc")];
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
    _this.panelTitle = i18n("db805d4e361ac2d3fc6047eaea1a7c69");
    return _this;
  }
  Layout_free_container.id = 'Layout_free_container';
  return Layout_free_container;
}(ContainerPlugin);
registerEditorPlugin(Layout_free_container);

export { Layout_free_container as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
