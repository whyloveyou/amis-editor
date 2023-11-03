/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var RangeControlPlugin = /** @class */function (_super) {
  __extends(RangeControlPlugin, _super);
  function RangeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-range';
    _this.$schema = '/schemas/RangeControlSchema.json';
    // 组件名称
    _this.name = i18n("6036c91d6b0b6d1a2468684e597d9f70");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-sliders';
    _this.pluginIcon = 'input-range-plugin';
    _this.description = i18n("4c65f10eacbfaf580236b5cbe2de68de");
    _this.docLink = '/amis/zh-CN/components/form/input-range';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-range',
      label: i18n("6036c91d6b0b6d1a2468684e597d9f70"),
      name: 'range'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("0a6a4aee139530801791c556e7177a7f"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'number',
                title: i18n("bc0689a4c353e9c95c5b7fc5aa49b59f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("f34b1a3e26aadb6f60c546dbe9c62232"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'number',
                title: i18n("6d829f061ed82a688f2669c54dd83301")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18n("7c9ec5db3bf23f367c1a905d356aab5c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'number',
                title: i18n("6d829f061ed82a688f2669c54dd83301")
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
      description: i18n("1659f1112dd649ec55390fe7c8e3b1d0")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18n("6036c91d6b0b6d1a2468684e597d9f70");
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
          }), getSchemaTpl('label'), getSchemaTpl('switch', {
            label: i18n("753a8c54d3944e252be1af928b8e7afd"),
            name: 'multiple'
          }), {
            type: 'container',
            className: 'ae-sub-content',
            visibleOn: 'data.multiple',
            body: [getSchemaTpl('joinValues', {
              onChange: function (value, oldValue, model, form) {
                form.deleteValueByName('value');
              }
            }), getSchemaTpl('delimiter', {
              onChange: function (value, oldValue, model, form) {
                form.deleteValueByName('value');
              }
            })]
          }, {
            type: 'ae-input-range-value',
            name: 'value',
            label: i18n("225f3ed00750ae78ad1e6ea42c8f5087"),
            visibleOn: 'data.multiple'
          }, getSchemaTpl('valueFormula', {
            name: 'value',
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'input-number'
            }),
            valueType: 'number',
            visibleOn: '!data.multiple',
            pipeIn: defaultValue(0)
          }), getSchemaTpl('valueFormula', {
            name: 'min',
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'input-number'
            }),
            pipeIn: defaultValue(0),
            needDeleteProps: ['min'],
            label: i18n("c322edb884724d04842fc35f4d29a24e"),
            valueType: 'number'
          }), getSchemaTpl('valueFormula', {
            name: 'max',
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'input-number'
            }),
            pipeIn: defaultValue(100),
            needDeleteProps: ['max'],
            label: i18n("5da893141114a59da868052b3a17a79a"),
            valueType: 'number'
          }), {
            label: i18n("d26404c10871481ab6bbb4837a34ae95"),
            name: 'step',
            type: 'input-number',
            value: 1,
            pipeOut: function (value) {
              return value || 1;
            }
          }, getSchemaTpl('unit'),
          // tooltipVisible 为true时，会一直显示，为undefined时，才会鼠标移入显示
          getSchemaTpl('switch', {
            name: 'tooltipVisible',
            label: i18n("e48d95a94e49b81b12a0113a5c253d8f"),
            value: undefined,
            pipeOut: function (value) {
              return !!value ? undefined : false;
            },
            pipeIn: function (value) {
              return value === undefined || value === true ? true : false;
            }
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-2',
            visibleOn: 'data.tooltipVisible === undefined',
            body: [{
              type: 'select',
              name: 'tooltipPlacement',
              label: i18n("a465db53b8c98f42caa15ca5662f9c90"),
              value: 'auto',
              options: [{
                label: i18n("3aed2c11e95a9c0ea1d853d4aee72e8c"),
                value: 'auto'
              }, {
                label: i18n("af767b7e4ae069d54f9ea839858d4c6d"),
                value: 'top'
              }, {
                label: i18n("3850a186c3235bc646d4c2f79cebac36"),
                value: 'bottom'
              }, {
                label: i18n("d2aff1417831aa621c16cd5b95306b4b"),
                value: 'left'
              }, {
                label: i18n("4d9c32c23df5d234e629c922c58d8e12"),
                value: 'right'
              }]
            }]
          }, getSchemaTpl('switch', {
            name: 'showInput',
            label: i18n("1d1a0bd85740653320d80f0d6e0918e7"),
            value: false
          }), getSchemaTpl('switch', {
            name: 'clearable',
            label: i18n("d22aa5f57ff8679ee7b7d473ef31417d"),
            value: false,
            visibleOn: '!!data.showInput'
          }), getSchemaTpl('autoFillApi')]
        }, {
          title: i18n("15628d1d85aee23c229c528a70419414"),
          body: [{
            type: 'ae-partsControl',
            mode: 'normal'
          }, {
            type: 'ae-marksControl',
            mode: 'normal',
            name: 'marks'
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
  RangeControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c, _d, _e, _f, _g;
    if ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.multiple) {
      return {
        type: 'object',
        title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
        properties: {
          max: {
            type: 'number',
            title: i18n("5da893141114a59da868052b3a17a79a")
          },
          min: {
            type: 'number',
            title: i18n("c322edb884724d04842fc35f4d29a24e")
          }
        },
        originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
      };
    }

    return {
      type: 'number',
      title: ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.label) || ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.name),
      originalValue: (_g = node.schema) === null || _g === void 0 ? void 0 : _g.value // 记录原始值，循环引用检测需要
    };
  };

  RangeControlPlugin.id = 'RangeControlPlugin';
  return RangeControlPlugin;
}(BasePlugin);
registerEditorPlugin(RangeControlPlugin);

export { RangeControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
