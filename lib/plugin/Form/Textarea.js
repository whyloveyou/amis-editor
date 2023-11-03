/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var validator = require('../../validator.js');
var helper = require('../../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

var TextareaControlPlugin = /** @class */function (_super) {
  tslib.__extends(TextareaControlPlugin, _super);
  function TextareaControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'textarea';
    _this.$schema = '/schemas/TextareaControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("c6a16ef980efc2ac48c58727e5bade81");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-paragraph';
    _this.pluginIcon = 'textarea-plugin';
    _this.description = i18nRuntime.i18n("2af7e3952d7430d1e4c86ea5aca4e4fa");
    _this.docLink = '/amis/zh-CN/components/form/textarea';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'textarea',
      label: i18nRuntime.i18n("15d169d28cd48c97fe751e4cc92ca926"),
      name: 'textarea'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: tslib.__assign({}, _this.scaffold)
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("15d169d28cd48c97fe751e4cc92ca926");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("5bc28acd4afb712dcbc234927357cd87"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("d5c135b5a4aed5dc39ef846a6f502d4f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18nRuntime.i18n("4638e799b95e1b71edd55f278a6f707c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("d5c135b5a4aed5dc39ef846a6f502d4f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18nRuntime.i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18nRuntime.i18n("c776ab86eb24f6b3db35114e43026f75"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("f7daf85b4501d9d2aa048f85618b3f1f")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18nRuntime.i18n("3086da6514671fb8950171bf3af4ab2d")
    }, {
      actionType: 'reset',
      actionLabel: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18nRuntime.i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
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
          }), amisEditorCore.getSchemaTpl('label'),
          // getSchemaTpl('valueFormula', {
          //   rendererSchema: context?.schema,
          //   mode: 'vertical' // 改成上下展示模式
          // }),
          amisEditorCore.getSchemaTpl('textareaDefaultValue'), amisEditorCore.getSchemaTpl('switch', {
            name: 'trimContents',
            pipeIn: amisEditorCore.defaultValue(true),
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("cd7f479dd052edc1261261c15fb0b50f"), i18nRuntime.i18n("d3a8fe0d542476cf7989ef9e69cdd6f7"))
          }), amisEditorCore.getSchemaTpl('showCounter'), {
            name: 'maxLength',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("0aefac04b467ce313ca6b05e33c6145a"), i18nRuntime.i18n("188676cb26835b8e4d8ea568467c55cd")),
            type: 'input-number',
            min: 0,
            step: 1
          }, amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('placeholder'), amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('autoFillApi')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true,
          readonly: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.Text
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer,
          schema: [{
            type: 'input-number',
            name: 'minRows',
            value: 3,
            label: i18nRuntime.i18n("829d96cf23f19759e4ef988fb5320032")
          }, {
            type: 'input-number',
            name: 'maxRows',
            value: 20,
            label: i18nRuntime.i18n("c0afd6005e68838e37e26dc7c34cf368")
          }]
        }), amisEditorCore.getSchemaTpl('style:classNames')])]
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
  TextareaControlPlugin.id = 'TextareaControlPlugin';
  return TextareaControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TextareaControlPlugin);

exports.TextareaControlPlugin = TextareaControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
