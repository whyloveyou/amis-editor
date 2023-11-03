/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var PropertyPlugin = /** @class */function (_super) {
  __extends(PropertyPlugin, _super);
  function PropertyPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'property';
    _this.$schema = '/schemas/PropertySchema.json';
    // 组件名称
    _this.name = i18n("23bf030ca760141f317dde1b7f49b11a");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-list';
    _this.pluginIcon = 'property-sheet-plugin';
    _this.description = i18n("23bf030ca760141f317dde1b7f49b11a");
    _this.docLink = '/amis/zh-CN/components/property';
    _this.tags = [i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.scaffold = {
      type: 'property',
      title: i18n("44f2bc36dacb88424dabf9df71da0e77"),
      items: [{
        label: 'cpu',
        content: '1 core'
      }, {
        label: 'memory',
        content: '4G'
      }, {
        label: 'disk',
        content: '80G'
      }, {
        label: 'network',
        content: '4M',
        span: 2
      }, {
        label: 'IDC',
        content: 'beijing'
      }, {
        label: 'Note',
        content: i18n("1cb82ab4f259d5b75da0ae86583b31ff"),
        span: 3
      }]
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("23bf030ca760141f317dde1b7f49b11a");
    _this.panelBody = [getSchemaTpl('tabs', [{
      title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      body: [getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), getSchemaTpl('propertyTitle'), {
        label: i18n("9a4ca43777061ebc91bc64cb994957bc"),
        type: 'input-number',
        value: 3,
        name: 'column'
      }, {
        type: 'radios',
        name: 'mode',
        inline: true,
        value: 'table',
        label: i18n("17fa61e1da428936a31b51c955a99d65"),
        options: ['table', 'simple']
      }, {
        label: i18n("894b94fbb15650da7f9290e7106446f3"),
        type: 'input-text',
        name: 'separator',
        visibleOn: 'data.mode === "simple"'
      }, {
        label: i18n("7fa5c95b26550753b0931fa21cea5d10"),
        type: 'input-text',
        name: 'source'
      }, {
        label: i18n("6940ea5aa4c18e105cbcd32cbe410839"),
        name: 'items',
        type: 'combo',
        multiple: true,
        multiLine: true,
        draggable: true,
        addButtonText: i18n("66ab5e9f24c8f46012a25c89919fb191"),
        scaffold: {
          label: '',
          content: '',
          span: 1
        },
        items: [getSchemaTpl('propertyLabel'), getSchemaTpl('propertyContent'), {
          type: 'input-number',
          mode: 'inline',
          size: 'sm',
          label: i18n("42c3762943823c37b537a10c09765822"),
          value: 1,
          name: 'span'
        }]
      }]
    }, {
      title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [getSchemaTpl('className')]
    }, {
      title: i18n("33bf801796fd255b5f6147e33146669b"),
      body: [getSchemaTpl('ref'), getSchemaTpl('visible')]
    }])];
    return _this;
  }
  PropertyPlugin.id = 'PropertyPlugin';
  return PropertyPlugin;
}(BasePlugin);
registerEditorPlugin(PropertyPlugin);

export { PropertyPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
