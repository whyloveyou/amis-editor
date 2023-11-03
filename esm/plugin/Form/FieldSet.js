/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { Button } from 'amis';
import React__default from 'react';
import { getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var FieldSetControlPlugin = /** @class */function (_super) {
  __extends(FieldSetControlPlugin, _super);
  function FieldSetControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'fieldset';
    _this.$schema = '/schemas/FieldSetControlSchema.json';
    // 组件名称
    _this.name = i18n("460bc46ffeb31b737669e2312c5bae72");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-toggle-down';
    _this.description = i18n("a89cd8150a1dbc60ac7063580e0852e2");
    _this.docLink = '/amis/zh-CN/components/form/fieldset';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'fieldset',
      title: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
      collapsable: true,
      body: [{
        type: 'input-text',
        label: i18n("a13a2fa224ca5b6f44d5aee33ec29d58"),
        name: 'text'
      }, {
        type: 'input-text',
        label: i18n("37dd6f28ffb87d8907a286e0ef4dc7fe"),
        name: 'text'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.regions = [{
      key: 'body',
      label: i18n("d6c40a2ee219c010edbcdaa2eeb94ddd"),
      renderMethod: 'renderBody',
      insertPosition: 'inner',
      preferTag: i18n("55b45c73ae417c4dead67905b1550e85")
    }];
    _this.panelTitle = i18n("460bc46ffeb31b737669e2312c5bae72");
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), getSchemaTpl('title'), getSchemaTpl('switch', {
        name: 'collapsable',
        label: i18n("ec2a8ec81d1d2588db8c7827ba99e7d3"),
        pipeIn: defaultValue(false)
      }), getSchemaTpl('switch', {
        name: 'collapsed',
        label: i18n("f315bd4984fd09c30581674d28287f12"),
        visibleOn: 'this.collapsable'
      }), {
        name: 'className',
        type: 'button-group-select',
        clearable: true,
        size: 'sm',
        label: i18n("ab2d2b13794ae1e2d7bf3bcd5af55dce"),
        className: 'w-full',
        pipeIn: defaultValue(''),
        options: [{
          label: i18n("18c63459a2c069022c7790430f761214"),
          value: ''
        }, {
          value: 'Collapse--xs',
          label: i18n("23ecf42cada8bf2715792d718544d107")
        }, {
          value: 'Collapse--sm',
          label: i18n("391b8fa9c747a1799353ab856e666ad5")
        }, {
          value: 'Collapse--base',
          label: i18n("fd6e80f1e0199d6ecc3ee81ae04aa9ef")
        }, {
          value: 'Collapse--md',
          label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4")
        }, {
          value: 'Collapse--lg',
          label: i18n("949934d97c42801151673a51d3adc421")
        }]
      }, getSchemaTpl('className', {
        name: 'headingClassName',
        label: i18n("620868e5e60e5c22249c3277c971bb13")
      }), getSchemaTpl('className', {
        name: 'bodyClassName',
        label: i18n("e5a226534fb99ab260865b936d3c85ba")
      }), {
        children: React__default.createElement(Button, {
          level: "info",
          size: "sm",
          className: "m-b-sm",
          block: true,
          onClick: function () {
            // this.manager.showInsertPanel('body', context.id);
            _this.manager.showRendererPanel(i18n("55b45c73ae417c4dead67905b1550e85"), i18n("12b54e3fdccdbb5588785fce5534edbd"));
          }
        }, i18n("1297c46c0ea697a0041c3899b15d69c6"))
      }, getSchemaTpl('subFormItemMode'), getSchemaTpl('subFormHorizontalMode'), getSchemaTpl('subFormHorizontal')];
    };
    return _this;
  }
  FieldSetControlPlugin.prototype.filterProps = function (props) {
    props.collapsed = false;
    return props;
  };
  FieldSetControlPlugin.id = 'FieldSetControlPlugin';
  return FieldSetControlPlugin;
}(BasePlugin);
registerEditorPlugin(FieldSetControlPlugin);

export { FieldSetControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
