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

var SwitchControlPlugin = /** @class */function (_super) {
  tslib.__extends(SwitchControlPlugin, _super);
  function SwitchControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'switch';
    _this.$schema = '/schemas/SwitchControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("a6beb974cc0b50eebd18120b8110a88b");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-toggle-on';
    _this.pluginIcon = 'switch-plugin';
    _this.description = i18nRuntime.i18n("d38b7fc2d31e0ae21cb4bc7d7df14e92");
    _this.docLink = '/amis/zh-CN/components/form/switch';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'switch',
      label: i18nRuntime.i18n("a6beb974cc0b50eebd18120b8110a88b"),
      option: i18nRuntime.i18n("f411d0f1f925d9b48d8c1d451bd809b1"),
      name: 'switch',
      falseValue: false,
      trueValue: true
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        label: i18nRuntime.i18n("6e17d8bb70df1c1e379fa86cb235ac82")
      })]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("a6beb974cc0b50eebd18120b8110a88b");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("ddccb436305b0a984c77d4ffa0725375"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("a75c768fda740b2c8f6e2dcc76400f23")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
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
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('switchOption'), {
            type: 'ae-switch-more',
            bulk: true,
            mode: 'normal',
            label: i18nRuntime.i18n("7e1eec8349c4998d142960009305f27a"),
            formType: 'extend',
            form: {
              body: [amisEditorCore.getSchemaTpl('onText'), amisEditorCore.getSchemaTpl('offText')]
            }
          }, {
            type: 'ae-switch-more',
            bulk: true,
            mode: 'normal',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("db0258df1ddbd88749b335aecdc8425e"), i18nRuntime.i18n("48433deca382e67b26af31c6ff967d04")),
            formType: 'extend',
            form: {
              body: [{
                type: 'input-text',
                label: i18nRuntime.i18n("cadd676e2710e50ac149211078f8a306"),
                name: 'trueValue',
                value: true,
                pipeOut: amisEditorCore.valuePipeOut,
                onChange: function (value, oldValue, model, form) {
                  if (oldValue === form.getValueByName('value')) {
                    form.setValueByName('value', value);
                  }
                }
              }, {
                type: 'input-text',
                label: i18nRuntime.i18n("13f19e1d0dd528aafd6263fafdc35e82"),
                name: 'falseValue',
                value: false,
                pipeOut: amisEditorCore.valuePipeOut,
                onChange: function (value, oldValue, model, form) {
                  if (oldValue === form.getValueByName('value')) {
                    form.setValueByName('value', value);
                  }
                }
              }]
            }
          },
          /* 旧版设置默认值
          getSchemaTpl('switch', {
            name: 'value',
            label: '默认开启',
            pipeIn: (value: any, data: any) => {
              const {trueValue = true} = data.data || {};
              return value === trueValue ? true : false;
            },
            pipeOut: (value: any, origin: any, data: any) => {
              return value
                ? data.trueValue || true
                : data.falseValue || false;
            }
          }),
          */
          amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
            needDeleteProps: ['option'],
            rendererWrapper: true,
            // valueType: 'boolean',
            pipeIn: function (value, data) {
              var _a = data.data || {},
                _b = _a.trueValue,
                trueValue = _b === void 0 ? true : _b,
                _c = _a.falseValue,
                falseValue = _c === void 0 ? false : _c;
              return value === trueValue ? true : value === falseValue ? false : value;
            },
            pipeOut: function (value, origin, data) {
              return value && value === (data.trueValue || true) ? data.trueValue || true : value && value !== (data.falseValue || false) ? value : data.falseValue || false;
            }
          }), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('autoFillApi')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.Check
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), {
          title: i18nRuntime.i18n("f411d0f1f925d9b48d8c1d451bd809b1"),
          body: [amisEditorCore.getSchemaTpl('horizontal-align', {
            name: 'optionAtLeft',
            pipeIn: function (v) {
              return v ? 'left' : 'right';
            },
            pipeOut: function (v) {
              return v === 'left' ? true : undefined;
            }
          })]
        }, amisEditorCore.getSchemaTpl('style:classNames')])
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
  SwitchControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c, _d, _e;
    // 默认trueValue和falseValue是同类型
    return {
      type: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.trueValue) ? typeof ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.trueValue) : 'boolean',
      title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
      originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
    };
  };

  SwitchControlPlugin.id = 'SwitchControlPlugin';
  SwitchControlPlugin.scene = ['layout'];
  return SwitchControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(SwitchControlPlugin);

exports.SwitchControlPlugin = SwitchControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
