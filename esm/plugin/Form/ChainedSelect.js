/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var ChainedSelectControlPlugin = /** @class */function (_super) {
  __extends(ChainedSelectControlPlugin, _super);
  function ChainedSelectControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'chained-select';
    _this.$schema = '/schemas/ChainedSelectControlSchema.json';
    // 组件名称
    _this.name = i18n("b6872877e1eb5ddedd904c170db26024");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-th-list';
    _this.pluginIcon = 'chained-select-plugin';
    _this.description = i18n("fdf1664c0790d25f236bd596aef1acef");
    _this.docLink = '/amis/zh-CN/components/form/chain-select';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'chained-select',
      label: i18n("556988a9dc1816dd979e96eb5cd19a85"),
      name: 'chainedSelect',
      joinValues: true
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: __assign({}, _this.scaffold)
    };
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("2fc76872efce1eabd3b74a3e4fd5b976"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("e48d65cda774019d9a6677354bc781f2")
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
      actionType: 'reload',
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18n("556988a9dc1816dd979e96eb5cd19a85");
    _this.notRenderFormZone = true;
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
          }), getSchemaTpl('label'), getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            },
            mode: 'vertical',
            rendererWrapper: true,
            label: tipedLabel(i18n("225f3ed00750ae78ad1e6ea42c8f5087"), i18n("da3ca8191fb919fb34e8e78fc6f2fc78"))
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("bc8d09093edd98769d5cb39e759aa498"), i18n("2646ee1ebb6922a5c9359de6cd3b3639")),
            name: 'joinValues',
            pipeIn: defaultValue(true)
          }), getSchemaTpl('delimiter', {
            visibleOn: 'data.joinValues !== false',
            clearValueOnHidden: true
          }), getSchemaTpl('extractValue', {
            visibleOn: 'data.joinValues === false',
            clearValueOnHidden: true
          }), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, {
          title: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [getSchemaTpl('apiControl', {
            name: 'source',
            mode: 'normal',
            label: tipedLabel(i18n("1395eba8d9efe27aa1ecd1a45e3e5dcd"), i18n("1495c26f33625552e4845630b6b7b44a"), {
              maxWidth: 'unset'
            })
          }), getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          }), {
            type: 'input-text',
            name: 'labelField',
            label: tipedLabel(i18n("4ea50507bf8b9ceb908677f30fb20e68"), i18n("fe4c9c2eed1ad213040d84036c675454")),
            pipeIn: defaultValue('label')
          }, {
            type: 'input-text',
            name: 'valueField',
            label: tipedLabel(i18n("be43687d4ed1d9e663c729e12618166d"), i18n("f1e6b60c4b6df555a6b03f91033091f4")),
            pipeIn: defaultValue('value')
          }]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.MultiSelect
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), getSchemaTpl('style:classNames', {
          schema: [getSchemaTpl('className', {
            name: 'descriptionClassName',
            label: i18n("3bdd08adab6ea90b9164b20a0e4151ac")
          })]
        })])]
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
  ChainedSelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    // 默认文本，todo:异步数据case
    var type = 'string';
    var dataSchema = {
      type: type,
      title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
      originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
    };

    if ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.extractValue) {
      dataSchema = {
        type: 'array',
        title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name)
      };
    } else if (((_h = node.schema) === null || _h === void 0 ? void 0 : _h.joinValues) === false) {
      dataSchema = {
        type: 'array',
        title: ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.label) || ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.name),
        items: {
          type: 'object',
          title: i18n("ab5dea29793d933fa7b5487a7309df6a"),
          properties: (_a = {}, _a[((_l = node.schema) === null || _l === void 0 ? void 0 : _l.labelField) || 'label'] = {
            type: 'string',
            title: i18n("97d07614380da93d257f9fbf81aa56fb")
          }, _a[((_m = node.schema) === null || _m === void 0 ? void 0 : _m.valueField) || 'value'] = {
            type: type,
            title: i18n("fe7509e0ed085b86f07e3e9975cc5b3d")
          }, _a)
        },
        originalValue: dataSchema.originalValue
      };
    }
    return dataSchema;
  };
  ChainedSelectControlPlugin.id = 'ChainedSelectControlPlugin';
  return ChainedSelectControlPlugin;
}(BasePlugin);
registerEditorPlugin(ChainedSelectControlPlugin);

export { ChainedSelectControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
