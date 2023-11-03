/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import isArray from 'lodash/isArray';
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
    _this.name = i18n("b82231f254baf9a28bf752683d31b169");
    _this.isBaseComponent = true;
    _this.disabledRendererPlugin = true; // 待完善，暂时隐藏
    _this.description = i18n("e5b5798a8bab7dc8a578431991731040");
    _this.docLink = '/amis/zh-CN/components/custom';
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0"), i18n("22c799040acdb2601b437ed5449de076")];
    _this.icon = 'fa fa-gears';
    _this.scaffold = {
      type: 'custom',
      html: i18n("73ac822ddf4685dbfec661dec41a96b7"),
      onMount: "this.renderChild('body', props.body, document.getElementById('customBox'));",
      body: [{
        type: 'tpl',
        wrapperComponent: '',
        tpl: i18n("5323ab3e5c12066101244f0577c30e22")
      }]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
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
  /**
   * 备注: 根据当前custom组件的schema中是否有body元素来启动容器模式，用于实现custom组件实现自定义容器类型
   */
  CustomPlugin.prototype.getRendererInfo = function (context) {
    var plugin = this;
    var renderer = context.renderer,
      schema = context.schema;
    if (schema.$$id && plugin.name && plugin.rendererName && plugin.rendererName === renderer.name) {
      var regions = plugin.regions;
      if (!regions && schema && schema.body && isArray(schema.body)) {
        regions = [{
          key: 'body',
          label: i18n("749f710d280419b1da031c9bc79b3b07")
        }];
      }
      return {
        name: plugin.name,
        regions: regions,
        patchContainers: plugin.patchContainers,
        // wrapper: plugin.wrapper,
        vRendererConfig: plugin.vRendererConfig,
        wrapperProps: plugin.wrapperProps,
        wrapperResolve: plugin.wrapperResolve,
        filterProps: plugin.filterProps,
        $schema: plugin.$schema,
        renderRenderer: plugin.renderRenderer,
        multifactor: plugin.multifactor,
        scaffoldForm: plugin.scaffoldForm,
        disabledRendererPlugin: plugin.disabledRendererPlugin,
        isBaseComponent: plugin.isBaseComponent,
        rendererName: plugin.rendererName,
        memberImmutable: plugin.memberImmutable
      };
    }
  };
  CustomPlugin.id = 'CustomRegionPlugin';
  return CustomPlugin;
}(BasePlugin);
registerEditorPlugin(CustomPlugin);

export { CustomPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
