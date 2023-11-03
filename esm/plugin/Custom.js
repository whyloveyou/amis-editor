/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

/**
 * @file 自定义代码
 */
var CustomPlugin = /** @class */function (_super) {
  __extends(CustomPlugin, _super);
  function CustomPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'custom';
    _this.$schema = '/schemas/CustomSchema.json';
    // 组件名称
    _this.name = i18n("473d2078518479669823205110842376");
    _this.isBaseComponent = true;
    _this.description = i18n("8b9c77fa4e646b9cb270f833252e511b");
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-gears';
    _this.pluginIcon = 'custom-plugin';
    _this.docLink = '/amis/zh-CN/components/custom';
    _this.scaffold = {
      type: 'custom',
      html: '<div><h2>hello, world!</h2></div>',
      onMount: i18n("f8c5e0ac29e905e91146e967cfd39dc9")
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("473d2078518479669823205110842376");
    _this.panelBody = [getSchemaTpl('layout:originPosition', {
      value: 'left-top'
    }), getSchemaTpl('fieldSet', {
      title: i18n("0b13dc6251002bf556263fb3e4675b11"),
      body: [{
        label: i18n("0b13dc6251002bf556263fb3e4675b11"),
        name: 'html',
        type: 'editor',
        allowFullscreen: true
      }]
    }), getSchemaTpl('fieldSet', {
      title: 'onMount',
      body: [{
        name: 'onMount',
        type: 'editor',
        allowFullscreen: true,
        size: 'xxl',
        label: i18n("d6b917c76b92aa9b92b6bebdcab993f3"),
        options: {
          lineNumbers: 'off',
          glyphMargin: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0
        }
      }]
    }), getSchemaTpl('fieldSet', {
      title: 'onUpdate',
      body: [{
        name: 'onUpdate',
        type: 'editor',
        allowFullscreen: true,
        size: 'xxl',
        label: i18n("e64739dd24bb0bfcb6f6e1ee2cce5413")
      }]
    }), getSchemaTpl('fieldSet', {
      title: 'onUnmount',
      body: [{
        name: 'onUnmount',
        type: 'editor',
        allowFullscreen: true,
        size: 'xxl',
        label: i18n("0601b7aa5b53cbc3616e24719bcd2aaa")
      }]
    })];
    return _this;
  }
  CustomPlugin.prototype.buildSubRenderers = function (context, renderers) {
    var info = _super.prototype.buildSubRenderers.apply(this, arguments);
    // 只有 form 下才调 onChange
    // if (
    //   context.info.renderer.name === 'form' ||
    //   context.node.childRegions.some(i => i.region === 'body')
    // ) {
    info.scaffold.onMount = i18n("a8065b6d2062bf061762b9200a88251a");
    // }
    return info;
  };
  CustomPlugin.id = 'CustomPlugin';
  return CustomPlugin;
}(BasePlugin);
registerEditorPlugin(CustomPlugin);

export { CustomPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
