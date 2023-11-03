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

var SelectControlPlugin = /** @class */function (_super) {
  tslib.__extends(SelectControlPlugin, _super);
  function SelectControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.name = i18nRuntime.i18n("006ded9fa277cf030592021f595a07d5");
    _this.panelTitle = i18nRuntime.i18n("006ded9fa277cf030592021f595a07d5");
    _this.rendererName = 'select';
    _this.icon = 'fa fa-th-list';
    _this.panelIcon = 'fa fa-th-list';
    _this.pluginIcon = 'select-plugin';
    _this.isBaseComponent = true;
    _this.panelJustify = true;
    _this.notRenderFormZone = true;
    _this.$schema = '/schemas/SelectControlSchema.json';
    _this.description = i18nRuntime.i18n("f2fc416c7d95a93a8da621f760be8417");
    _this.docLink = '/amis/zh-CN/components/form/select';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'select',
      label: i18nRuntime.i18n("ea15ae2b7fba76c83eec6d0986d15197"),
      name: 'select',
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
      body: [tslib.__assign({}, _this.scaffold)]
    };
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
                title: i18nRuntime.i18n("e48d65cda774019d9a6677354bc781f2")
              },
              items: {
                type: 'array',
                title: i18nRuntime.i18n("b2a18e08b0b0e0fd7e80554b89244aa0")
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
                title: i18nRuntime.i18n("e48d65cda774019d9a6677354bc781f2")
              },
              items: {
                type: 'array',
                title: i18nRuntime.i18n("b2a18e08b0b0e0fd7e80554b89244aa0")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'add',
      eventLabel: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
      description: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'object',
                title: i18nRuntime.i18n("75cc2a992ea150d3a6c68ac4bc486637")
              },
              items: {
                type: 'array',
                title: i18nRuntime.i18n("b2a18e08b0b0e0fd7e80554b89244aa0")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'edit',
      eventLabel: i18nRuntime.i18n("cd994c38456676f5a55c5593b6a652bf"),
      description: i18nRuntime.i18n("cd994c38456676f5a55c5593b6a652bf"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'object',
                title: i18nRuntime.i18n("a13b85bddbcdab63ef2b2d98dd46afe9")
              },
              items: {
                type: 'array',
                title: i18nRuntime.i18n("b2a18e08b0b0e0fd7e80554b89244aa0")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'delete',
      eventLabel: i18nRuntime.i18n("d015e18748f42f53bb6ab213e9b06187"),
      description: i18nRuntime.i18n("d015e18748f42f53bb6ab213e9b06187"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'object',
                title: i18nRuntime.i18n("8aa4d6aedd7957ebc6b87fec655695ef")
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
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('clearable'), amisEditorCore.getSchemaTpl('searchable'), amisEditorCore.getSchemaTpl('multiple', {
            body: [amisEditorCore.getSchemaTpl('switch', {
              label: i18nRuntime.i18n("e19c0792886a147d74fc662d7af138bb"),
              name: 'valuesNoWrap'
            }), {
              type: 'input-number',
              name: 'maxTagCount',
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("b28aa9c36d0b506a71aa78b628e796c6"), i18nRuntime.i18n("2b23767de575e27fc9e4e0949e885f81"))
            }]
          }), amisEditorCore.getSchemaTpl('checkAll'), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            }
          }), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('placeholder'), amisEditorCore.getSchemaTpl('description')]
        }, {
          title: i18nRuntime.i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [amisEditorCore.getSchemaTpl('optionControlV2'), amisEditorCore.getSchemaTpl('selectFirst'), amisEditorCore.getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          }),
          // 模板
          amisEditorCore.getSchemaTpl('optionsMenuTpl', {
            manager: _this.manager,
            onChange: function (value) {}
          }), /** 新增选项 */
          amisEditorCore.getSchemaTpl('optionAddControl', {
            manager: _this.manager
          }), /** 编辑选项 */
          amisEditorCore.getSchemaTpl('optionEditControl', {
            manager: _this.manager
          }), /** 删除选项 */
          amisEditorCore.getSchemaTpl('optionDeleteControl')]
        }, {
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [amisEditorCore.getSchemaTpl('switch', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("406af2b98e6210cd42d7f824cb6dfd16"), i18nRuntime.i18n("fa8d03e8b5458c1a1d742736bc26e25b")),
            name: 'showInvalidMatch'
          }), amisEditorCore.getSchemaTpl('virtualThreshold'), amisEditorCore.getSchemaTpl('virtualItemHeight')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.MultiSelect
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
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
  SelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
  SelectControlPlugin.id = 'SelectControlPlugin';
  SelectControlPlugin.scene = ['layout'];
  return SelectControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(SelectControlPlugin);

exports.SelectControlPlugin = SelectControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
