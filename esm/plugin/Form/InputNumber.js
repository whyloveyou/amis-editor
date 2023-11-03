/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { getI18nEnabled, getSchemaTpl, tipedLabel, isObject, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { inputStateTpl } from '../../renderer/style-control/helper.js';
import { i18n } from 'i18n-runtime';

var NumberControlPlugin = /** @class */function (_super) {
  __extends(NumberControlPlugin, _super);
  function NumberControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-number';
    _this.$schema = '/schemas/NumberControlSchema.json';
    // 组件名称
    _this.name = i18n("1e65b8181e9a40e76b86e2c261cafbe0");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-sort-numeric-asc';
    _this.pluginIcon = 'input-number-plugin';
    _this.description = i18n("c45782c425bfc31824af8129bd6e0282");
    _this.docLink = '/amis/zh-CN/components/form/input-number';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-number',
      label: i18n("55d4790c5d819cd0462cbe89561b0dd4"),
      name: 'number',
      keyboard: true
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign(__assign({}, _this.scaffold), {
        value: 88
      })]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("1e65b8181e9a40e76b86e2c261cafbe0");
    _this.panelJustify = true;
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("b2a5322c8dbc0d8343315cafbd39b7ce"),
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
      eventName: 'focus',
      eventLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("5f914e36c49db618d06981df7b3c4d81"),
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
      description: i18n("efdd0d8923130f281b54506eef2121cf"),
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
      description: i18n("0849471829a565a8af6b70a46346e574")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("770fe9e7899cd310b035ef50a39ab2ae")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = getI18nEnabled();
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), {
            type: 'switch',
            label: tipedLabel(i18n("32f13c9db34f638c2c5cf2bf19326ebf"), i18n("8572d14f815d840bd9e940cd8ee4e380")),
            name: 'keyboard',
            value: true,
            inputClassName: 'is-inline'
          }, getSchemaTpl('kilobitSeparator'), getSchemaTpl('valueFormula', {
            rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
            valueType: 'number' // 期望数值类型
          }), getSchemaTpl('valueFormula', {
            name: 'min',
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              value: context === null || context === void 0 ? void 0 : context.schema.min
            }),
            needDeleteProps: ['min'],
            label: i18n("c322edb884724d04842fc35f4d29a24e"),
            valueType: 'number'
          }), getSchemaTpl('valueFormula', {
            name: 'max',
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              value: context === null || context === void 0 ? void 0 : context.schema.max
            }),
            needDeleteProps: ['max'],
            label: i18n("5da893141114a59da868052b3a17a79a"),
            valueType: 'number'
          }), {
            type: 'input-number',
            name: 'step',
            label: i18n("d26404c10871481ab6bbb4837a34ae95"),
            min: 0,
            value: 1
          }, {
            type: 'input-number',
            name: 'precision',
            label: tipedLabel(i18n("e284e64008fd8b066da04bca335d032a"), i18n("b317cbf67c94f986fc44cf4cbc2280c6")),
            min: 1,
            max: 100
          }, getSchemaTpl('prefix'), getSchemaTpl('suffix'), getSchemaTpl('combo-container', {
            type: 'combo',
            label: i18n("7915dcc78c28ed3cda8fc949a86e4806"),
            mode: 'normal',
            name: 'unitOptions',
            items: [{
              placeholder: 'label',
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              name: 'label'
            }, {
              placeholder: 'value',
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              name: 'value'
            }],
            draggable: false,
            multiple: true,
            pipeIn: function (value) {
              if (!isObject(value)) {
                if (Array.isArray(value)) {
                  return value.every(function (item) {
                    return typeof item === 'string';
                  }) ? value.map(function (item) {
                    return {
                      label: item,
                      value: item
                    };
                  }) : value;
                }
                return [];
              }
              return value.map(function (item) {
                return {
                  label: item.value,
                  value: item.value
                };
              });
            },
            pipeOut: function (value) {
              if (!value.length) {
                return undefined;
              }
              return value;
            }
          }), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.MultiSelect
        })], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'props'
        }))
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: context.info.renderer,
          schema: [{
            label: i18n("8c80ed1f85135cc9153d0b7406ac5b38"),
            name: 'displayMode',
            type: 'select',
            pipeIn: defaultValue('base'),
            options: [{
              label: i18n("0a8c852e27763a18ce5b72a87ba8b5ba"),
              value: 'base'
            }, {
              label: i18n("de93563a076f72b3e919870c9dad9935"),
              value: 'enhance'
            }]
          }]
        }), getSchemaTpl('theme:form-label'), getSchemaTpl('theme:form-description'), {
          title: i18n("bade9c4e0b8a75a251c1a2760571d3c3"),
          body: __spreadArray([], __read(inputStateTpl('themeCss.inputControlClassName', 'inputNumber.base.base')), false)
        }, getSchemaTpl('theme:cssCode', {
          themeClass: [{
            name: i18n("53069052573de671c6e5108de745b036"),
            value: '',
            className: 'inputControlClassName',
            state: ['default', 'hover', 'active']
          }],
          isFormItem: true
        })], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'style'
        }))]
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
  NumberControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c;
    return {
      type: 'number',
      title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
      originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
    };
  };

  NumberControlPlugin.id = 'NumberControlPlugin';
  return NumberControlPlugin;
}(BasePlugin);
registerEditorPlugin(NumberControlPlugin);

export { NumberControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
