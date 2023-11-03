/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var BreadcrumbPlugin = /** @class */function (_super) {
  __extends(BreadcrumbPlugin, _super);
  function BreadcrumbPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'breadcrumb';
    _this.$schema = '/schemas/BreadcrumbSchema.json';
    _this.disabledRendererPlugin = true;
    // 组件名称
    _this.name = i18n("169b227aff15b834b64205d0fdcb0f33");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-list';
    _this.pluginIcon = 'breadcrumb-plugin';
    _this.description = i18n("3576258acd7269da9f44859a2edec1aa");
    _this.docLink = '/amis/zh-CN/components/breadcrumb';
    _this.tags = [i18n("0d98c74797e49d00bcc4c17c9d557a2b")];
    _this.scaffold = {
      type: 'breadcrumb',
      items: [{
        label: i18n("db1c89e0f6e62f9642018cbb531bbd4f"),
        href: '/',
        icon: 'fa fa-home'
      }, {
        label: i18n("2e8bf3c87641fba59c2a9cb6636d7e88")
      }, {
        label: i18n("12d358955755488ff3790bbd6d75673a")
      }]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("169b227aff15b834b64205d0fdcb0f33");
    _this.panelBody = [getSchemaTpl('tabs', [{
      title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      body: [getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), {
        label: i18n("894b94fbb15650da7f9290e7106446f3"),
        type: 'input-text',
        name: 'separator'
      }, getSchemaTpl('api', {
        label: i18n("a38100f22f59f7cd89e36139faa6fd4d"),
        name: 'source'
      }), {
        label: i18n("169b227aff15b834b64205d0fdcb0f33"),
        name: 'items',
        type: 'combo',
        multiple: true,
        multiLine: true,
        draggable: true,
        addButtonText: i18n("66ab5e9f24c8f46012a25c89919fb191"),
        items: [{
          type: 'input-text',
          placeholder: i18n("97d07614380da93d257f9fbf81aa56fb"),
          name: 'label'
        }, {
          type: 'input-text',
          name: 'href',
          placeholder: i18n("bfe68d5844f8e54602760e18f45954f7")
        }, getSchemaTpl('icon', {
          name: 'icon',
          label: i18n("5ef69f62dc668c1a3e68b51c50a2530a")
        })]
      }]
    }, {
      title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [getSchemaTpl('className'), getSchemaTpl('className', {
        name: 'itemClassName',
        label: i18n("ba7f916a39c0beb545388ea3b7f6b3b7")
      }),, getSchemaTpl('className', {
        name: 'separatorClassName',
        label: i18n("e3acc9857c852dae27e064ace5e5688e")
      })]
    }, {
      title: i18n("33bf801796fd255b5f6147e33146669b"),
      body: [getSchemaTpl('ref'), getSchemaTpl('visible')]
    }])];
    return _this;
  }
  BreadcrumbPlugin.id = 'BreadcrumbPlugin';
  return BreadcrumbPlugin;
}(BasePlugin);
registerEditorPlugin(BreadcrumbPlugin);

export { BreadcrumbPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
