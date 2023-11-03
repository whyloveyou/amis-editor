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

var RateControlPlugin = /** @class */function (_super) {
  tslib.__extends(RateControlPlugin, _super);
  function RateControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-rating';
    _this.$schema = '/schemas/RatingControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("108db12ed4454cf1ab4242ca98442b7a");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-star-o';
    _this.pluginIcon = 'input-rating-plugin';
    _this.description = i18nRuntime.i18n("f11a0f49123c2099ca6c6162ca37f0ec");
    _this.docLink = '/amis/zh-CN/components/form/input-rating';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-rating',
      label: i18nRuntime.i18n("108db12ed4454cf1ab4242ca98442b7a"),
      name: 'rating'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: 3
      })]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("108db12ed4454cf1ab4242ca98442b7a");
    _this.count = 5;
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("ce9201dd7d5816945fbedae79927518f"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'number',
                title: i18nRuntime.i18n("9b0c6dee9b5f48734c37901d4a430b71")
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
      description: i18nRuntime.i18n("e2c6470c3f2e76cb98ba951a64e41c3d")
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
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label', {
            label: 'Label'
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: tslib.__assign(tslib.__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'input-number'
            }),
            valueType: 'number',
            visibleOn: '!data.multiple'
          }),
          // 评分组件没有 min、max 属性，有 count 属性
          amisEditorCore.getSchemaTpl('valueFormula', {
            name: 'count',
            rendererSchema: tslib.__assign(tslib.__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'input-number',
              max: 10,
              min: 1,
              step: 1,
              precision: 0
            }),
            needDeleteProps: ['count'],
            label: i18nRuntime.i18n("5da893141114a59da868052b3a17a79a"),
            valueType: 'number'
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'allowClear',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("09bbfb387dce6201df1ccef2aab161a6"), i18nRuntime.i18n("5ea244a79d480632f635a254c95c38df")),
            value: false
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'half',
            label: i18nRuntime.i18n("fa6f66437097fe23c948f4f9b78ecec0"),
            value: false
          }), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('combo-container', {
            type: 'combo',
            label: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
            mode: 'normal',
            name: 'texts',
            items: [{
              placeholder: 'Key',
              type: 'input-number',
              unique: true,
              name: 'key',
              columnClassName: 'w-xs flex-none',
              min: 0,
              step: 1,
              max: 10,
              precision: 0
            }, {
              placeholder: i18nRuntime.i18n("1a10cd6599219eafb615b34234cfc0b5"),
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              name: 'value'
            }],
            draggable: false,
            multiple: true,
            pipeIn: function (value) {
              if (!amisEditorCore.isObject(value)) {
                return Array.isArray(value) ? value : [];
              }
              var res = Object.keys(value).map(function (item) {
                return {
                  key: item || 0,
                  value: value[item] || ''
                };
              }); //.filter((item: any) => item.key <= this.count);
              return res;
            },
            pipeOut: function (value) {
              if (!value.length) {
                return undefined;
              }
              var res = {};
              var findMinCanUsedKey = function (keys, max) {
                for (var i = 1; i <= max; i++) {
                  if (!keys.includes(String(i))) {
                    return i;
                  }
                }
              };
              value.forEach(function (item) {
                var key = item.key !== undefined ? Number(item.key) : findMinCanUsedKey(Object.keys(res), _this.count);
                // && key <= this.count
                if (key) {
                  res[key] = (item === null || item === void 0 ? void 0 : item.value) || '';
                }
              });
              return res;
            }
          }), amisEditorCore.getSchemaTpl('autoFillApi')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true,
          readonly: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.Check
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), {
          title: i18nRuntime.i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
          body: [{
            type: 'ae-switch-more',
            label: i18nRuntime.i18n("f1d4ff50f3828f9b73412e7d94e6dd6e"),
            bulk: true,
            mode: 'normal',
            value: false,
            formType: 'extend',
            form: {
              body: [{
                type: 'input-text',
                label: i18nRuntime.i18n("9c07532d0c9acfecfc4ec2eb265c3e03"),
                name: 'char'
              }]
            },
            pipeIn: function (value) {
              if (typeof value === 'string' && value.length) {
                return {
                  character: value
                };
              }
              return undefined;
            },
            pipeOut: function (value) {
              if (!amisEditorCore.isObject(value)) {
                return undefined;
              }
              return typeof value.character === 'string' ? value.character : undefined;
            }
          }, {
            type: 'input-color',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("2a3d1f6d5b0afdbf04033e2f2c1fa11e"), i18nRuntime.i18n("497562b3159756834c7adfe9525bd7b5")),
            name: 'inactiveColor',
            pipeIn: amisEditorCore.defaultValue('#e7e7e8'),
            pipeOut: amisEditorCore.undefinedPipeOut
          }, amisEditorCore.getSchemaTpl('combo-container', {
            type: 'combo',
            label: i18nRuntime.i18n("4dd547945b10f672a7e48d7ffc42496e"),
            mode: 'normal',
            name: 'colors',
            items: [{
              placeholder: 'Key',
              type: 'input-number',
              unique: true,
              name: 'key',
              columnClassName: 'w-xs flex-none',
              min: 0,
              max: 10,
              step: 1,
              precision: 0
            }, {
              placeholder: 'Value',
              type: 'input-color',
              name: 'value'
            }],
            value: {
              2: '#abadb1',
              3: '#787b81',
              5: '#ffa900'
            },
            draggable: false,
            multiple: true,
            pipeIn: function (value) {
              if (!amisEditorCore.isObject(value)) {
                return Array.isArray(value) ? value : [];
              }
              var res = Object.keys(value).map(function (item) {
                return {
                  key: item,
                  value: value[item] || ''
                };
              }); //.filter((item: any) => item.key <= this.count);
              return res;
            },
            pipeOut: function (value) {
              if (!value.length) {
                return undefined;
              }
              var res = {};
              var findMinCanUsedKey = function (keys, max) {
                for (var i = 1; i <= max; i++) {
                  if (!keys.includes(String(i))) {
                    return i;
                  }
                }
              };
              value.forEach(function (item) {
                var key = item.key !== undefined ? Number(item.key) : findMinCanUsedKey(Object.keys(res), _this.count);
                if (key) {
                  res[key] = (item === null || item === void 0 ? void 0 : item.value) || '';
                }
              });
              return res;
            }
          })]
        }, {
          title: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
          body: [amisEditorCore.getSchemaTpl('horizontal-align', {
            name: 'textPosition',
            pipeIn: amisEditorCore.defaultValue('right')
          })]
        }, amisEditorCore.getSchemaTpl('style:classNames', {
          schema: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
            name: 'charClassName'
          }), amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("f186d55a48868a88b026d48efc1cf36f"),
            name: 'textClassName'
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
  RateControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c;
    return {
      type: 'number',
      title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
      originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
    };
  };

  RateControlPlugin.id = 'RateControlPlugin';
  return RateControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(RateControlPlugin);

exports.RateControlPlugin = RateControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
