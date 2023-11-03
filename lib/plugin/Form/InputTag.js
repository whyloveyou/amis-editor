/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var BaseControl = require('../../component/BaseControl.js');
var util = require('../../util.js');
var i18nRuntime = require('i18n-runtime');

var TagControlPlugin = /** @class */function (_super) {
  tslib.__extends(TagControlPlugin, _super);
  function TagControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-tag';
    _this.$schema = '/schemas/TagControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("fb7b49ff7f85f6e3f995b5eaae42d084");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-tag';
    _this.pluginIcon = 'input-tag-plugin';
    _this.description = i18nRuntime.i18n("74104c62ed33836f0bc74297539dd7c9");
    _this.docLink = '/amis/zh-CN/components/form/input-tag';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-tag',
      label: i18nRuntime.i18n("14d342362f66aa86e2aa1c1e11aa1204"),
      name: 'tag',
      options: [{
        label: i18nRuntime.i18n("52636511861a0e08cbe6a0eb1c27d816"),
        value: 'red'
      }, {
        label: i18nRuntime.i18n("b2c712c788d3a143206eee22fe24d9f1"),
        value: 'green'
      }, {
        label: i18nRuntime.i18n("9c9aabab3f7627ff4bb224b2738b26ea"),
        value: 'blue'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: 'red'
      })
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("14d342362f66aa86e2aa1c1e11aa1204");
    _this.panelJustify = true;
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("ee167d4c74e600248aefe9d0ba474705"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'array',
                title: i18nRuntime.i18n("9d776ddd9dd2d8d85ea225df9c27e929")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("9d776ddd9dd2d8d85ea225df9c27e929")
              },
              selectedItems: {
                type: 'array',
                title: i18nRuntime.i18n("4ed30a5be1b6680e6cc9fec0965d0f4f")
              },
              items: {
                type: 'array',
                title: i18nRuntime.i18n("e01315f74dee36831d93a117cbc47c8f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18nRuntime.i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18nRuntime.i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("9d776ddd9dd2d8d85ea225df9c27e929")
              },
              selectedItems: {
                type: 'array',
                title: i18nRuntime.i18n("4ed30a5be1b6680e6cc9fec0965d0f4f")
              },
              items: {
                type: 'array',
                title: i18nRuntime.i18n("e01315f74dee36831d93a117cbc47c8f")
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
      description: i18nRuntime.i18n("770fe9e7899cd310b035ef50a39ab2ae")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelBodyCreator = function (context) {
      return BaseControl.formItemControl({
        common: {
          replace: true,
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('clearable'), amisEditorCore.getSchemaTpl('optionsTip'), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            },
            mode: 'vertical' // 改成上下展示模式
          }), amisEditorCore.getSchemaTpl('joinValues'), amisEditorCore.getSchemaTpl('delimiter'), amisEditorCore.getSchemaTpl('extractValue'), amisEditorCore.getSchemaTpl('autoFillApi', {
            visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
          }), amisEditorCore.getSchemaTpl('autoFill', {
            visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
          })]
        },
        option: {
          body: [amisEditorCore.getSchemaTpl('optionControlV2', {
            description: i18nRuntime.i18n("6f6fa31a91b516b28ebee7a86a9b13e2")
          })]
        },
        status: {}
      }, context);
    };
    return _this;
  }
  TagControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var type = util.resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
    // todo:异步数据case
    var dataSchema = {
      type: type,
      title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
      originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
    };

    if ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.extractValue) {
      dataSchema = {
        type: 'array',
        title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name)
      };
    } else if (((_j = node.schema) === null || _j === void 0 ? void 0 : _j.joinValues) === false) {
      dataSchema = {
        type: 'array',
        title: ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.label) || ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.name),
        items: {
          type: 'object',
          title: i18nRuntime.i18n("ab5dea29793d933fa7b5487a7309df6a"),
          properties: (_a = {}, _a[((_m = node.schema) === null || _m === void 0 ? void 0 : _m.labelField) || 'label'] = {
            type: 'string',
            title: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb")
          }, _a[((_o = node.schema) === null || _o === void 0 ? void 0 : _o.valueField) || 'value'] = {
            type: type,
            title: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d")
          }, _a)
        },
        originalValue: dataSchema.originalValue
      };
    }
    return dataSchema;
  };
  TagControlPlugin.id = 'TagControlPlugin';
  TagControlPlugin.scene = ['layout'];
  return TagControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TagControlPlugin);

exports.TagControlPlugin = TagControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
