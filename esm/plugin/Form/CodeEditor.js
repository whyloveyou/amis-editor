/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { EditorAvailableLanguages } from 'amis';
import { getSchemaTpl, defaultValue, undefinedPipeOut, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var CodeEditorControlPlugin = /** @class */function (_super) {
  __extends(CodeEditorControlPlugin, _super);
  function CodeEditorControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'editor';
    _this.$schema = '/schemas/EditorControlSchema.json';
    // 组件名称
    _this.name = i18n("84f31b24ffc8ea2b81d61a6f054b5bb6");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-code';
    _this.pluginIcon = 'editor-plugin';
    _this.description = "\u4EE3\u7801\u7F16\u8F91\u5668\uFF0C\u91C7\u7528 monaco-editor \u652F\u6301\uFF1A".concat(EditorAvailableLanguages.slice(0, 10).join('，'), "\u7B49\u7B49");
    _this.docLink = '/amis/zh-CN/components/form/editor';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'editor',
      label: i18n("84f31b24ffc8ea2b81d61a6f054b5bb6"),
      name: 'editor'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign(__assign({}, _this.scaffold), {
        value: 'console.log("Hello world.");'
      })]
    };
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("cadf0e302ddbc6fdbf005aed670b5e3e"),
      description: i18n("6006074bdabc639b86f42aa18876e33a"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("ed85c3f659acc9e89bcf6f0dbaa02a62")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("4638e799b95e1b71edd55f278a6f707c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("ed85c3f659acc9e89bcf6f0dbaa02a62")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18n("c776ab86eb24f6b3db35114e43026f75"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("ed85c3f659acc9e89bcf6f0dbaa02a62")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'focus',
      actionLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("829c57d7064cad467ec466ae26244ebb")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.notRenderFormZone = true;
    _this.panelTitle = 'Editor';
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), {
            label: i18n("295bb704f5205801d57d672780b94117"),
            name: 'language',
            type: 'select',
            value: 'javascript',
            searchable: true,
            options: EditorAvailableLanguages.concat()
          }, getSchemaTpl('valueFormula', {
            rendererSchema: {
              type: 'textarea'
            },
            mode: 'vertical' // 改成上下展示模式
          }), getSchemaTpl('switch', {
            label: i18n("44fe0e1bcabcea83d6a30e6af0fd42af"),
            name: 'allowFullscreen',
            pipeIn: defaultValue(true)
          }), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, getSchemaTpl('status', {
          isFormItem: true,
          unsupportStatic: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.Code
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: context.info.renderer,
          schema: [{
            name: 'size',
            type: 'select',
            pipeIn: defaultValue(''),
            pipeOut: undefinedPipeOut,
            label: i18n("b3b97a293baac13db6367aba5539a09c"),
            options: [{
              label: i18n("18c63459a2c069022c7790430f761214"),
              value: ''
            }, {
              label: i18n("aed1dfbc31703955e64806b799b67645"),
              value: 'md'
            }, {
              label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
              value: 'lg'
            }, {
              label: i18n("3386da5f56fac758ed0f18e024ecb943"),
              value: 'xl'
            }, {
              label: i18n("949934d97c42801151673a51d3adc421"),
              value: 'xxl'
            }]
          }]
        }), getSchemaTpl('style:classNames', {
          unsupportStatic: true
        })])
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  CodeEditorControlPlugin.prototype.filterProps = function (props) {
    props.disabled = true;
    return props;
  };
  CodeEditorControlPlugin.id = 'CodeEditorControlPlugin';
  return CodeEditorControlPlugin;
}(BasePlugin);
registerEditorPlugin(CodeEditorControlPlugin);

export { CodeEditorControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
