/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var validator = require('../../validator.js');
var helper = require('../../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

var DiffEditorControlPlugin = /** @class */function (_super) {
  tslib.__extends(DiffEditorControlPlugin, _super);
  function DiffEditorControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'diff-editor';
    _this.$schema = '/schemas/DiffEditorControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("bac53d3c739f7fb3327704efd5b40eee");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-columns';
    _this.pluginIcon = 'diff-editor-plugin';
    _this.description = "\u5DE6\u53F3\u4E24\u8FB9\u7684\u4EE3\u7801\u505A\u5BF9\u6BD4\uFF0C\u652F\u6301\u7684\u8BED\u8A00\u5305\u62EC\uFF1A".concat(amis.EditorAvailableLanguages.slice(0, 10).join('，'), "\u7B49\u7B49");
    _this.docLink = '/amis/zh-CN/components/form/diff-editor';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'diff-editor',
      label: i18nRuntime.i18n("0517b74cbe247a903faf40991a5a335f"),
      name: 'diff'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: 'Hello World\nLine 1\nNew line\nBla Bla',
        diffValue: 'Hello World\nLine 2'
      })]
    };
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("cadf0e302ddbc6fdbf005aed670b5e3e"),
      description: i18nRuntime.i18n("6006074bdabc639b86f42aa18876e33a"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("ed85c3f659acc9e89bcf6f0dbaa02a62")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18nRuntime.i18n("42f04184315801c372989820106cc4ee"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("ed85c3f659acc9e89bcf6f0dbaa02a62")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18nRuntime.i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18nRuntime.i18n("58ec44a580ba7cdcdf65985f5c44940c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("ed85c3f659acc9e89bcf6f0dbaa02a62")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18nRuntime.i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18nRuntime.i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'focus',
      actionLabel: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18nRuntime.i18n("b42cb49fc7c4ec140697e6d78c39e585")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("bac53d3c739f7fb3327704efd5b40eee");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), {
            label: i18nRuntime.i18n("295bb704f5205801d57d672780b94117"),
            name: 'language',
            type: 'select',
            value: 'javascript',
            searchable: true,
            options: amis.EditorAvailableLanguages.concat()
          }, amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: {
              type: 'textarea',
              value: context === null || context === void 0 ? void 0 : context.schema.diffValue
            },
            label: i18nRuntime.i18n("2a69150aa382f6a309c03a96145d4266"),
            name: 'diffValue',
            mode: 'vertical' // 改成上下展示模式
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: {
              type: 'textarea',
              value: context === null || context === void 0 ? void 0 : context.schema.value
            },
            label: i18nRuntime.i18n("a71e655ab56c9962742f72623f67ca76"),
            mode: 'vertical' // 改成上下展示模式
          }), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('autoFillApi')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true,
          unsupportStatic: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.All
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer,
          schema: [{
            name: 'size',
            type: 'select',
            pipeIn: amisEditorCore.defaultValue(''),
            pipeOut: amisEditorCore.undefinedPipeOut,
            label: i18nRuntime.i18n("b3b97a293baac13db6367aba5539a09c"),
            options: [{
              label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
              value: ''
            }, {
              label: i18nRuntime.i18n("aed1dfbc31703955e64806b799b67645"),
              value: 'md'
            }, {
              label: i18nRuntime.i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
              value: 'lg'
            }, {
              label: i18nRuntime.i18n("3386da5f56fac758ed0f18e024ecb943"),
              value: 'xl'
            }, {
              label: i18nRuntime.i18n("949934d97c42801151673a51d3adc421"),
              value: 'xxl'
            }]
          }]
        }), amisEditorCore.getSchemaTpl('style:classNames', {
          unsupportStatic: true
        })])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  DiffEditorControlPlugin.prototype.filterProps = function (props) {
    props.disabled = true;
    return props;
  };
  DiffEditorControlPlugin.id = 'DiffEditorControlPlugin';
  return DiffEditorControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(DiffEditorControlPlugin);

exports.DiffEditorControlPlugin = DiffEditorControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
