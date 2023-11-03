/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var TextareaControlPlugin = /** @class */function (_super) {
  __extends(TextareaControlPlugin, _super);
  function TextareaControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'textarea';
    _this.$schema = '/schemas/TextareaControlSchema.json';
    // 组件名称
    _this.name = i18n("c6a16ef980efc2ac48c58727e5bade81");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-paragraph';
    _this.pluginIcon = 'textarea-plugin';
    _this.description = i18n("2af7e3952d7430d1e4c86ea5aca4e4fa");
    _this.docLink = '/amis/zh-CN/components/form/textarea';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'textarea',
      label: i18n("15d169d28cd48c97fe751e4cc92ca926"),
      name: 'textarea'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: __assign({}, _this.scaffold)
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("15d169d28cd48c97fe751e4cc92ca926");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("5bc28acd4afb712dcbc234927357cd87"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("d5c135b5a4aed5dc39ef846a6f502d4f")
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
                title: i18n("d5c135b5a4aed5dc39ef846a6f502d4f")
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
                title: i18n("f7daf85b4501d9d2aa048f85618b3f1f")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("3086da6514671fb8950171bf3af4ab2d")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
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
          }), getSchemaTpl('label'),
          // getSchemaTpl('valueFormula', {
          //   rendererSchema: context?.schema,
          //   mode: 'vertical' // 改成上下展示模式
          // }),
          getSchemaTpl('textareaDefaultValue'), getSchemaTpl('switch', {
            name: 'trimContents',
            pipeIn: defaultValue(true),
            label: tipedLabel(i18n("cd7f479dd052edc1261261c15fb0b50f"), i18n("d3a8fe0d542476cf7989ef9e69cdd6f7"))
          }), getSchemaTpl('showCounter'), {
            name: 'maxLength',
            label: tipedLabel(i18n("0aefac04b467ce313ca6b05e33c6145a"), i18n("188676cb26835b8e4d8ea568467c55cd")),
            type: 'input-number',
            min: 0,
            step: 1
          }, getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, getSchemaTpl('status', {
          isFormItem: true,
          readonly: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.Text
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: context.info.renderer,
          schema: [{
            type: 'input-number',
            name: 'minRows',
            value: 3,
            label: i18n("829d96cf23f19759e4ef988fb5320032")
          }, {
            type: 'input-number',
            name: 'maxRows',
            value: 20,
            label: i18n("c0afd6005e68838e37e26dc7c34cf368")
          }]
        }), getSchemaTpl('style:classNames')])]
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
  TextareaControlPlugin.id = 'TextareaControlPlugin';
  return TextareaControlPlugin;
}(BasePlugin);
registerEditorPlugin(TextareaControlPlugin);

export { TextareaControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
