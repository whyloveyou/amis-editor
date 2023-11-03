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

var ListControlPlugin = /** @class */function (_super) {
  tslib.__extends(ListControlPlugin, _super);
  function ListControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'list-select';
    _this.$schema = '/schemas/ListControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("d22dfe420e4b00e000b93f94db3c856e");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-ellipsis-h';
    _this.pluginIcon = 'list-select-plugin';
    _this.description = i18nRuntime.i18n("2c05e451a6f2b2fe1cf55f7afb8c8423");
    _this.docLink = '/amis/zh-CN/components/form/list-select';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'list-select',
      label: i18nRuntime.i18n("3712972d84adf48acbd6ad24b4d75ad0"),
      name: 'list',
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
    _this.panelTitle = i18nRuntime.i18n("d22dfe420e4b00e000b93f94db3c856e");
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
    _this.subEditorVariable = [{
      label: '当前选项',
      children: [{
        label: i18nRuntime.i18n("f69608e93e9728f4fbef583bfa1326c1"),
        value: 'label'
      }, {
        label: i18nRuntime.i18n("684a0d1aeca4e9acff89221b57826d4d"),
        value: 'value'
      }]
    }];
    _this.panelBodyCreator = function (context) {
      return BaseControl.formItemControl({
        common: {
          replace: true,
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('multiple'), amisEditorCore.getSchemaTpl('extractValue'), amisEditorCore.getSchemaTpl('valueFormula', {
            // 边栏渲染不渲染自定义样式，会干扰css生成
            rendererSchema: function (schema) {
              return tslib.__assign(tslib.__assign({}, schema || {}), {
                itemSchema: null
              });
            },
            mode: 'vertical',
            useSelectMode: true,
            visibleOn: 'this.options && this.options.length > 0'
          })]
        },
        option: {
          body: [amisEditorCore.getSchemaTpl('optionControlV2'), {
            type: 'ae-switch-more',
            mode: 'normal',
            label: i18nRuntime.i18n("3585e4dd456b41fb8aec43f927b6a27c"),
            bulk: false,
            name: 'itemSchema',
            formType: 'extend',
            form: {
              body: [{
                type: 'dropdown-button',
                label: i18nRuntime.i18n("25e4c39320150bca74b4c05c7740e365"),
                level: 'enhance',
                buttons: [{
                  type: 'button',
                  block: true,
                  onClick: _this.editDetail.bind(_this, context.id, 'itemSchema'),
                  label: '配置默认态模板'
                }, {
                  type: 'button',
                  block: true,
                  onClick: _this.editDetail.bind(_this, context.id, 'activeItemSchema'),
                  label: '配置激活态模板'
                }]
              }]
            },
            pipeIn: function (value) {
              return value !== undefined;
            },
            pipeOut: function (value, originValue, data) {
              if (value === true) {
                return {
                  type: 'container',
                  body: [{
                    type: 'tpl',
                    tpl: "${".concat(_this.getDisplayField(value), "}"),
                    wrapperComponent: '',
                    inline: true
                  }]
                };
              }
              return value ? value : undefined;
            }
          }]
        },
        status: {}
      }, context);
    };
    return _this;
  }
  ListControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
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
    if ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.multiple) {
      if ((_m = node.schema) === null || _m === void 0 ? void 0 : _m.extractValue) {
        dataSchema = {
          type: 'array',
          title: ((_o = node.schema) === null || _o === void 0 ? void 0 : _o.label) || ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.name)
        };
      } else if (((_q = node.schema) === null || _q === void 0 ? void 0 : _q.joinValues) === false) {
        dataSchema = {
          type: 'array',
          title: ((_r = node.schema) === null || _r === void 0 ? void 0 : _r.label) || ((_s = node.schema) === null || _s === void 0 ? void 0 : _s.name),
          items: {
            type: 'object',
            title: i18nRuntime.i18n("ab5dea29793d933fa7b5487a7309df6a"),
            properties: dataSchema.properties
          },
          originalValue: dataSchema.originalValue
        };
      }
    }
    return dataSchema;
  };
  ListControlPlugin.prototype.filterProps = function (props) {
    // 禁止选中子节点
    return amisEditorCore.JSONPipeOut(props);
  };
  ListControlPlugin.prototype.getDisplayField = function (data) {
    var _a;
    if (data.source || data.map && Array.isArray(data.map) && data.map[0] && Object.keys(data.map[0]).length > 1) {
      return (_a = data.labelField) !== null && _a !== void 0 ? _a : 'label';
    }
    return 'label';
  };
  ListControlPlugin.prototype.editDetail = function (id, field) {
    var _a;
    var _b;
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var defaultItemSchema = {
      type: 'container',
      body: [{
        type: 'tpl',
        tpl: "${".concat(this.getDisplayField(value), "}"),
        inline: true,
        wrapperComponent: ''
      }]
    };
    // 首次编辑激活态样式时自动复制默认态
    if (field !== 'itemSchema' && (value === null || value === void 0 ? void 0 : value.itemSchema)) {
      defaultItemSchema = amisEditorCore.JSONPipeIn(value.itemSchema, true);
    }
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("25e4c39320150bca74b4c05c7740e365"),
      value: (_b = value[field]) !== null && _b !== void 0 ? _b : defaultItemSchema,
      slot: {
        type: 'container',
        body: '$$'
      },
      onChange: function (newValue) {
        var _a;
        newValue = tslib.__assign(tslib.__assign({}, value), (_a = {}, _a[field] = util.schemaArrayFormat(newValue), _a));
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      },
      data: (_a = {}, _a[value.labelField || 'label'] = '选项名', _a[value.valueField || 'value'] = i18nRuntime.i18n("684a0d1aeca4e9acff89221b57826d4d"), _a.item = i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3"), _a)
    });
  };
  ListControlPlugin.id = 'ListControlPlugin';
  return ListControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ListControlPlugin);

exports.ListControlPlugin = ListControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
