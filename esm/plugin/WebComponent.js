/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import { i18n } from 'i18n-runtime';

var WebComponentDemo = /** @class */function (_super) {
  __extends(WebComponentDemo, _super);
  function WebComponentDemo() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  WebComponentDemo.prototype.connectedCallback = function () {
    var shadow = this.attachShadow({
      mode: 'open'
    });
    shadow.textContent = 'web-component-demo';
  };
  return WebComponentDemo;
}(HTMLElement);
try {
  customElements.define('web-component-demo', WebComponentDemo);
} catch (error) {
  console.log('[amis-editor]', error);
}
var WebComponentPlugin = /** @class */function (_super) {
  __extends(WebComponentPlugin, _super);
  function WebComponentPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'web-component';
    _this.$schema = '/schemas/WebComponentSchema.json';
    // 组件名称
    _this.name = 'Web Component';
    _this.isBaseComponent = true;
    _this.description = i18n("1fa035e78c5408c9079c20637acdb2bb");
    _this.docLink = '/amis/zh-CN/components/web-component';
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-square-o';
    _this.pluginIcon = 'web-component-plugin';
    _this.scaffold = {
      type: 'web-component',
      tag: 'web-component-demo'
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("8df7c8a1f9f579f0ddc35bb4ee50f166");
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [getSchemaTpl('collapseGroup', [{
          className: 'p-none',
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            type: 'input-text',
            label: i18n("14d342362f66aa86e2aa1c1e11aa1204"),
            name: 'tag'
          }, getSchemaTpl('combo-container', {
            type: 'input-kv',
            mode: 'normal',
            name: 'props',
            label: i18n("24d67862f87f439db7ca957aecb77cce")
          })]
        }])]
      }]);
    };
    return _this;
  }
  WebComponentPlugin.id = 'WebComponentPlugin';
  return WebComponentPlugin;
}(BasePlugin);
registerEditorPlugin(WebComponentPlugin);

export { WebComponentPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
