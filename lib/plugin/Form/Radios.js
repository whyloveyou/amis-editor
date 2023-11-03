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
var util = require('../../util.js');
var i18nRuntime = require('i18n-runtime');

var RadiosControlPlugin = /** @class */function (_super) {
  tslib.__extends(RadiosControlPlugin, _super);
  function RadiosControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'radios';
    _this.$schema = '/schemas/RadiosControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("9913107b19cb6012250134ff91377430");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-dot-circle-o';
    _this.pluginIcon = 'radios-plugin';
    _this.description = i18nRuntime.i18n("b7a4abc1e4e975c9df5bb9d9cf4823ba");
    _this.docLink = '/amis/zh-CN/components/form/radios';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'radios',
      label: i18nRuntime.i18n("9913107b19cb6012250134ff91377430"),
      name: 'radios',
      options: [{
        label: i18nRuntime.i18n("05f87b331e1c97691776d93a6598373f"),
        value: 'A'
      }, {
        label: i18nRuntime.i18n("f38c0a46797523b11051e35ec0f82a42"),
        value: 'B'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: 'A'
      })]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("9913107b19cb6012250134ff91377430");
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("2fc76872efce1eabd3b74a3e4fd5b976"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("e48d65cda774019d9a6677354bc781f2")
              },
              selectedItems: {
                type: 'object',
                title: i18nRuntime.i18n("029e280e119b028bffc51424d909c07d")
              },
              items: {
                type: 'array',
                title: i18nRuntime.i18n("b2a18e08b0b0e0fd7e80554b89244aa0")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18nRuntime.i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18nRuntime.i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'reload',
      actionLabel: i18nRuntime.i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18nRuntime.i18n("9ef5597ac0b4da662bcd967da37eceb4")
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
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            },
            useSelectMode: true,
            visibleOn: 'this.options && this.options.length > 0'
          }),
          // getSchemaTpl('autoFill')
          amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('autoFillApi', {
            trigger: 'change'
          })]
        }, {
          title: i18nRuntime.i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [amisEditorCore.getSchemaTpl('optionControlV2'), amisEditorCore.getSchemaTpl('selectFirst')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.MultiSelect
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer,
          schema: [amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("46110787e4774b81418b274e9b06127e"),
            name: 'inline',
            hiddenOn: 'data.mode === "inline"',
            pipeIn: amisEditorCore.defaultValue(true)
          }), {
            label: i18nRuntime.i18n("83a00680e0872e2a35496be7e12c1309"),
            name: 'columnsCount',
            hiddenOn: 'data.mode === "inline" || data.inline !== false',
            type: 'input-range',
            min: 1,
            max: 6,
            pipeIn: amisEditorCore.defaultValue(1)
          }]
        }), amisEditorCore.getSchemaTpl('style:classNames', {
          schema: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("c30264927c3c170efd2e7763becf12fc"),
            name: 'itemClassName'
          })]
        })])]
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
  RadiosControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var type = util.resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
    // todo:异步数据case
    var dataSchema = {
      type: type,
      title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
      originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
    };

    if (((_f = node.schema) === null || _f === void 0 ? void 0 : _f.joinValues) === false) {
      dataSchema = tslib.__assign(tslib.__assign({}, dataSchema), {
        type: 'object',
        title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name),
        properties: (_a = {}, _a[((_j = node.schema) === null || _j === void 0 ? void 0 : _j.labelField) || 'label'] = {
          type: 'string',
          title: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb")
        }, _a[((_k = node.schema) === null || _k === void 0 ? void 0 : _k.valueField) || 'value'] = {
          type: type,
          title: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d")
        }, _a)
      });
    }
    return dataSchema;
  };
  RadiosControlPlugin.id = 'RadiosControlPlugin';
  RadiosControlPlugin.scene = ['layout'];
  return RadiosControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(RadiosControlPlugin);

exports.RadiosControlPlugin = RadiosControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
