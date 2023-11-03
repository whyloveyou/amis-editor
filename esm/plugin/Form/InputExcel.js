/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { formItemControl } from '../../component/BaseControl.js';
import { i18n } from 'i18n-runtime';

var ExcelControlPlugin = /** @class */function (_super) {
  __extends(ExcelControlPlugin, _super);
  function ExcelControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-excel';
    _this.$schema = '/schemas/ExcelControlSchema.json';
    // 组件名称
    _this.name = i18n("899339c1133a6100a1b223680d26692c");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-eyedropper';
    _this.pluginIcon = 'input-excel-plugin';
    _this.description = i18n("b0e4a21f29af38986eebbbf867eee31b");
    _this.docLink = '/amis/zh-CN/components/form/input-excel';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-excel',
      label: 'Excel',
      name: 'excel'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("899339c1133a6100a1b223680d26692c");
    _this.notRenderFormZone = true;
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("7caadb59b5892d107a909816b6571c66"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("de3ad0cd57153f799f7538dd1e4fd441")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelBodyCreator = function (context) {
      return formItemControl({
        common: {
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            label: i18n("d9435aa8028acfc660276c4e0af5536a"),
            name: 'parseMode',
            type: 'select',
            options: [{
              label: i18n("b14494137c805dc66bdc9ed88d7fd2de"),
              value: 'object'
            }, {
              label: i18n("0e67d4b0e351b00f4bea9840aa6b99d7"),
              value: 'array'
            }]
          }, getSchemaTpl('switch', {
            name: 'allSheets',
            label: i18n("fe5c59cbac3d45314ec6397d9f75789a")
          }), getSchemaTpl('switch', {
            name: 'plainText',
            label: i18n("50b10b178196378f4359ce11bbc31372"),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('switch', {
            name: 'includeEmpty',
            label: i18n("1647e4bfb548f2e8468d10b4b3bfbe21"),
            visibleOn: 'data.parseMode === "array"'
          })]
        }
      }, context);
    };
    return _this;
  }
  ExcelControlPlugin.id = 'ExcelControlPlugin';
  return ExcelControlPlugin;
}(BasePlugin);
registerEditorPlugin(ExcelControlPlugin);

export { ExcelControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
