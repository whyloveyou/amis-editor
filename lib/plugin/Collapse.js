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

var CollapsePlugin = /** @class */function (_super) {
  tslib.__extends(CollapsePlugin, _super);
  function CollapsePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'collapse';
    _this.$schema = '/schemas/CollapseSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("e90e6ff080f179215c3566a61ca62367");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("452b62e9b7e650fa163300da2893654a");
    _this.docLink = '/amis/zh-CN/components/collapse';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-window-minimize';
    _this.pluginIcon = 'collapse-plugin';
    _this.scaffold = {
      type: 'collapse',
      header: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
      body: [{
        type: 'tpl',
        tpl: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
        wrapperComponent: '',
        inline: false
      }]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = i18nRuntime.i18n("e90e6ff080f179215c3566a61ca62367");
    _this.panelJustify = true;
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("8e5ff4f20463c03f7935e0627888c03c"),
      description: i18nRuntime.i18n("bcfcd9d31a7a469fa1f3a2ea9e3e3f89"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              collapsed: {
                type: 'boolean',
                title: i18nRuntime.i18n("0e8638286319f6efb0afe2616714e8c3")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'expand',
      eventLabel: i18nRuntime.i18n("dce3879aaf11920ab97c94781ddaaed5"),
      description: i18nRuntime.i18n("0f680e944e33feb4719bd0dfe618aa50"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              collapsed: {
                type: 'boolean',
                title: i18nRuntime.i18n("0e8638286319f6efb0afe2616714e8c3")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'collapse',
      eventLabel: i18nRuntime.i18n("0469f19533c2fa1d63418b86ec203ab7"),
      description: i18nRuntime.i18n("3ffa0c7285daa4c39f7b7699a845860c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              collapsed: {
                type: 'boolean',
                title: i18nRuntime.i18n("0e8638286319f6efb0afe2616714e8c3")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'expand',
      actionLabel: i18nRuntime.i18n("578125c5d7586aefb797caca9111ed1f"),
      description: i18nRuntime.i18n("ae772db91ee1bd385ffafed3e9b8f4cc")
    }, {
      actionLabel: i18nRuntime.i18n("5882cb6b5133d35488c386965321c60b"),
      actionType: 'collapse',
      description: i18nRuntime.i18n("04e36bd57e0e1623da86ee2c19c2a885")
    }];
    _this.panelBodyCreator = function (context) {
      var _a, _b;
      amisEditorCore.getI18nEnabled();
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('title', {
            name: 'header',
            label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            pipeIn: amisEditorCore.defaultValue(((_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.title) || ((_b = context === null || context === void 0 ? void 0 : context.schema) === null || _b === void 0 ? void 0 : _b.header) || ''),
            onChange: function (value, oldValue, model, form) {
              // 转换一下旧版本的title字段
              form.setValueByName('header', value);
              form.setValueByName('title', undefined);
            }
          }), amisEditorCore.getSchemaTpl('collapseOpenHeader'), {
            name: 'headerPosition',
            label: i18nRuntime.i18n("3a8647306ee6456517b7bf9c8bc7de23"),
            type: 'button-group-select',
            size: 'sm',
            pipeIn: amisEditorCore.defaultValue('top'),
            options: [{
              label: i18nRuntime.i18n("c949729cd1a1e425595c1a297649c7c6"),
              value: 'top',
              icon: 'fa fa-arrow-up'
            }, {
              label: i18nRuntime.i18n("12c4c5e8abda77e1fdc93653d6414187"),
              value: 'bottom',
              icon: 'fa fa-arrow-down'
            }]
          }, {
            name: 'showArrow',
            label: i18nRuntime.i18n("731f9b470e0948cbf56341a53c423213"),
            mode: 'row',
            inputClassName: 'inline-flex justify-between flex-row-reverse',
            type: 'switch',
            pipeIn: amisEditorCore.defaultValue(true)
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'collapsable',
            label: i18nRuntime.i18n("96c0cc844a06e0850c04f7c44b6475fb"),
            pipeIn: amisEditorCore.defaultValue(true)
          })]
        }, amisEditorCore.getSchemaTpl('status', {
          disabled: true
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [amisEditorCore.getSchemaTpl('className', {
            name: 'headingClassName',
            label: i18nRuntime.i18n("63b67eead04256e42ea9f6f7218731ee")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'bodyClassName',
            label: i18nRuntime.i18n("66d88b3e01aff17c7973181e53fc8c0c")
          })]
        })])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
    return _this;
  }
  CollapsePlugin.id = 'CollapsePlugin';
  return CollapsePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(CollapsePlugin);

exports.CollapsePlugin = CollapsePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
