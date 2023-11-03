/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import { FlexPluginBase } from './Layout/FlexPluginBase.js';
import { i18n } from 'i18n-runtime';

var FlexPlugin = /** @class */function (_super) {
  __extends(FlexPlugin, _super);
  function FlexPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.name = i18n("f549581bf93c72ed69c37e906e04191d");
    _this.pluginIcon = 'flex-container-plugin';
    _this.description = i18n("2794fe303cf8ad4395fe93271fae7925");
    return _this;
  }
  FlexPlugin.id = 'FlexPlugin';
  FlexPlugin.scene = ['layout'];
  return FlexPlugin;
}(FlexPluginBase);
registerEditorPlugin(FlexPlugin);

export { FlexPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
