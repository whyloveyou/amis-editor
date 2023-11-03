/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

var PlainPlugin = /** @class */function (_super) {
  tslib.__extends(PlainPlugin, _super);
  function PlainPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'plain';
    _this.$schema = '/schemas/PlainSchema.json';
    _this.disabledRendererPlugin = true; // 组件面板不显示
    // 组件名称
    _this.name = i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-file-text-o';
    _this.pluginIcon = 'plain-plugin';
    _this.description = i18nRuntime.i18n("6c5b1f0e8e361a801fa75da070d1cba5");
    _this.docLink = '/amis/zh-CN/components/plain';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.previewSchema = {
      type: 'plain',
      text: i18nRuntime.i18n("67e77a196826a8880e47ad949ce08ac0"),
      className: 'text-center',
      inline: false
    };
    _this.scaffold = {
      type: 'plain',
      tpl: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
      inline: false
    };
    _this.panelTitle = i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371");
    _this.panelJustify = true;
    // 事件定义
    _this.events = [{
      eventName: 'click',
      eventLabel: i18nRuntime.i18n("4363c17ebb346b646af55bd8c8075915"),
      description: i18nRuntime.i18n("7af5e3ef39ff71d39fe3f645c8079124"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseenter',
      eventLabel: i18nRuntime.i18n("f6d767f39ba3bf955077a3c0ce81e581"),
      description: i18nRuntime.i18n("bcdd89d453da0dc0622a2f3189728357"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseleave',
      eventLabel: i18nRuntime.i18n("e272b0b8c7fedc670a87075514d9b49f"),
      description: i18nRuntime.i18n("727309bc724ff237c5e2cdf7a90cf28e"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [];
    _this.panelBodyCreator = function (context) {
      var isTableCell = context.info.renderer.name === 'table-cell';
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('textareaFormulaControl', {
            name: 'tpl',
            label: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
            mode: 'normal',
            pipeIn: function (value, data) {
              return value || data && data.text;
            },
            description: i18nRuntime.i18n("f8fc21a9fd40881e8fd3d7f15919465c")
          }), amisEditorCore.getSchemaTpl('placeholder', {
            pipeIn: amisEditorCore.defaultValue('-'),
            label: i18nRuntime.i18n("4c1cff4d8c05daa6ed9352a241ee628c")
          })]
        }, isTableCell ? null : amisEditorCore.getSchemaTpl('status')])
      }, isTableCell ? null : {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('switch', {
            name: 'inline',
            label: i18nRuntime.i18n("2fb0853874c2cc8cc42f0c7520af662a"),
            value: true
          })]
        }, amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }])];
    };
    return _this;
  }
  PlainPlugin.id = 'PlainPlugin';
  return PlainPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(PlainPlugin);

exports.PlainPlugin = PlainPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
