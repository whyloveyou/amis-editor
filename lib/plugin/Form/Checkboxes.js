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

var CheckboxesControlPlugin = /** @class */function (_super) {
  tslib.__extends(CheckboxesControlPlugin, _super);
  function CheckboxesControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'checkboxes';
    _this.$schema = '/schemas/CheckboxesControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("db98f889ce6bc235e66bd4b2a788d137");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-check-square';
    _this.pluginIcon = 'checkboxes-plugin';
    _this.description = i18nRuntime.i18n("6d1383a2806f0516aac2c115f96799eb");
    _this.docLink = '/amis/zh-CN/components/form/checkboxes';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'checkboxes',
      label: i18nRuntime.i18n("db98f889ce6bc235e66bd4b2a788d137"),
      name: 'checkboxes',
      multiple: true,
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
      body: [tslib.__assign({
        value: 'A'
      }, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("db98f889ce6bc235e66bd4b2a788d137");
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
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var renderer = context.info.renderer;
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), [amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("9c541222ced2435288c24b34f8ad1fb8"),
            name: 'checkAll',
            value: false,
            visibleOn: 'data.multiple',
            onChange: function (value, origin, item, form) {
              if (!value) {
                // 可全选关闭时，默认全选也需联动关闭
                form.setValueByName('defaultCheckAll', false);
                form.setValueByName('checkAllText', undefined);
              }
            }
          }), {
            type: 'container',
            className: 'ae-ExtendMore mb-2',
            visibleOn: 'data.checkAll',
            body: [amisEditorCore.getSchemaTpl('switch', {
              label: i18nRuntime.i18n("05bef457e8350e1a5d8007cad41b70e5"),
              name: 'defaultCheckAll',
              value: false
            }), {
              type: 'input-text',
              label: i18nRuntime.i18n("23b3169341314eda02d860be90ebf487"),
              name: 'checkAllText'
            }]
          }], amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            },
            useSelectMode: true,
            visibleOn: 'this.options && this.options.length > 0'
          }), amisEditorCore.getSchemaTpl('joinValues', {
            visibleOn: true
          }), amisEditorCore.getSchemaTpl('delimiter', {
            visibleOn: 'data.joinValues === true'
          }), amisEditorCore.getSchemaTpl('extractValue'), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('autoFillApi', {
            trigger: 'change'
          })]
        }, {
          title: i18nRuntime.i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [amisEditorCore.getSchemaTpl('optionControlV2', {
            multiple: true
          }),
          // 自定义选项模板
          amisEditorCore.getSchemaTpl('optionsMenuTpl', {
            manager: _this.manager
          }), /** 新增选项 */
          amisEditorCore.getSchemaTpl('optionAddControl', {
            manager: _this.manager
          }), /** 编辑选项 */
          amisEditorCore.getSchemaTpl('optionEditControl', {
            manager: _this.manager
          }), /** 删除选项 */
          amisEditorCore.getSchemaTpl('optionDeleteControl')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.MultiSelect
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: renderer
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
  CheckboxesControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
  CheckboxesControlPlugin.id = 'CheckboxesControlPlugin';
  return CheckboxesControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(CheckboxesControlPlugin);

exports.CheckboxesControlPlugin = CheckboxesControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
