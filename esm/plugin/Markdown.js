/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var MarkdownPlugin = /** @class */function (_super) {
  __extends(MarkdownPlugin, _super);
  function MarkdownPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'markdown';
    _this.$schema = '/schemas/MarkdownSchema.json';
    // 组件名称
    _this.name = 'Markdown';
    _this.isBaseComponent = true;
    _this.description = i18n("87cac3a9c9576d9b5bad6639c891112c");
    _this.docLink = '/amis/zh-CN/components/markdown';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-file-text';
    _this.pluginIcon = 'markdown-plugin';
    _this.scaffold = {
      type: 'markdown',
      value: i18n("eb99816b4a216b2eb884cc6194f00ec6")
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = 'MD';
    _this.panelBodyCreator = function (context) {
      /\/field\/\w+$/.test(context.path);
      return [getSchemaTpl('tabs', [{
        title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), getSchemaTpl('markdownBody')]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('className')]
      }, {
        title: i18n("33bf801796fd255b5f6147e33146669b"),
        body: [getSchemaTpl('ref'), getSchemaTpl('visible')]
      }])];
    };
    return _this;
  }
  MarkdownPlugin.id = 'MarkdownPlugin';
  MarkdownPlugin.scene = ['layout'];
  return MarkdownPlugin;
}(BasePlugin);
registerEditorPlugin(MarkdownPlugin);

export { MarkdownPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
