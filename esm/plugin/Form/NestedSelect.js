/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { resolveOptionType } from '../../util.js';
import { i18n } from 'i18n-runtime';

var NestedSelectControlPlugin = /** @class */function (_super) {
  __extends(NestedSelectControlPlugin, _super);
  function NestedSelectControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'nested-select';
    _this.$schema = '/schemas/NestedSelectControlSchema.json';
    // 组件名称
    _this.name = i18n("24d9de25721d1fb0ecf89ef81c43d877");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-indent';
    _this.pluginIcon = 'nested-select-plugin';
    _this.description = i18n("c65c9862813c7a66c0df52e301e0e1d1");
    _this.docLink = '/amis/zh-CN/components/form/nestedselect';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'nested-select',
      label: i18n("24d9de25721d1fb0ecf89ef81c43d877"),
      name: 'nestedSelect',
      onlyChildren: true,
      options: [{
        label: i18n("05f87b331e1c97691776d93a6598373f"),
        value: 'A'
      }, {
        label: i18n("f38c0a46797523b11051e35ec0f82a42"),
        value: 'B',
        children: [{
          label: i18n("03cd388fe29a4fc116c0021e496a113a"),
          value: 'b1'
        }, {
          label: i18n("fb00d1c1a65d3739c03a0b2715168327"),
          value: 'b2'
        }]
      }, {
        label: i18n("57a6105deead3fec79028cce7bfa2004"),
        value: 'C',
        children: [{
          label: i18n("353ae08afdb3d0a3587e9b27ca239c33"),
          value: 'c1'
        }, {
          label: i18n("bea7ad76f0f321124ff614a099cb9a85"),
          value: 'c2'
        }]
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("24d9de25721d1fb0ecf89ef81c43d877");
    _this.notRenderFormZone = true;
    _this.panelDefinitions = {
      options: {
        label: i18n("25ae4ca8d4b8a67b273066a97a516327"),
        name: 'options',
        type: 'combo',
        multiple: true,
        multiLine: true,
        draggable: true,
        addButtonText: i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
        scaffold: {
          label: '',
          value: ''
        },
        items: [{
          type: 'group',
          body: [getSchemaTpl('optionsLabel'), {
            type: 'input-text',
            name: 'value',
            placeholder: i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
            unique: true
          }]
        }, {
          $ref: 'options',
          label: i18n("72453d792655604f1fab821146133d7d"),
          name: 'children',
          addButtonText: i18n("210da23d108e85b2f0bbfa85846cb792")
        }]
      }
    };
    _this.panelJustify = true;
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
    }, {
      eventName: 'focus',
      eventLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("4638e799b95e1b71edd55f278a6f707c"),
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
    }, {
      eventName: 'blur',
      eventLabel: i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18n("c776ab86eb24f6b3db35114e43026f75"),
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
    _this.panelBodyCreator = function (context) {
      var renderer = context.info.renderer;
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), getSchemaTpl('clearable'), {
            type: 'ae-Switch-More',
            name: 'searchable',
            label: i18n("dbdae74eb12668e2b9568b013bf27d45"),
            mode: 'normal',
            value: false,
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [{
                type: 'input-text',
                name: 'noResultsText',
                label: tipedLabel(i18n("ae45cdb51c795df3b046f71afe3611bf"), i18n("601bb29fe72e56930dea03ae3e1aa555"))
              }]
            }
          }, getSchemaTpl('onlyLeaf'), [{
            type: 'switch',
            label: i18n("e3be7b8a459a08fec8f378a0660b642b"),
            name: 'multiple',
            value: false,
            inputClassName: 'is-inline'
          }, {
            type: 'container',
            className: 'ae-ExtendMore mb-3',
            visibleOn: 'this.multiple',
            body: [{
              type: 'switch',
              label: tipedLabel(i18n("6a7f7d89c8f1f3e6aab0962ff920b145"), i18n("c23eb92d1f249452c3ff3ee13738b47a")),
              horizontal: {
                left: 6,
                justify: true
              },
              name: 'onlyChildren',
              inputClassName: 'is-inline',
              visibleOn: '!this.onlyLeaf',
              pipeIn: function (value) {
                return !value;
              },
              pipeOut: function (value) {
                return !value;
              },
              onChange: function (value, origin, item, form) {
                if (!value) {
                  // 父级作为返回值
                  form.setValues({
                    cascade: true,
                    withChildren: false,
                    onlyChildren: true
                  });
                } else {
                  form.setValues({
                    withChildren: false,
                    cascade: false,
                    onlyChildren: false
                  });
                }
              }
            }, getSchemaTpl('joinValues'), getSchemaTpl('delimiter', {
              visibleOn: 'this.joinValues'
            }), getSchemaTpl('extractValue', {
              visibleOn: '!this.joinValues'
            })]
          }], getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            }
          }), getSchemaTpl('hideNodePathLabel'), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, {
          title: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [getSchemaTpl('treeOptionControl'), getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          })]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: function (data) {
            return ValidatorTag.MultiSelect;
          }
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: renderer
        }), {
          title: i18n("961534b4ea37e4e88aada736b299d063"),
          key: 'borderMode',
          body: [getSchemaTpl('borderMode')]
        }, getSchemaTpl('style:classNames', {
          schema: [getSchemaTpl('className', {
            label: i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
            name: 'descriptionClassName',
            visibleOn: 'this.description'
          })]
        })])
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
  NestedSelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    var type = resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
    // todo:异步数据case
    var dataSchema = {
      type: type,
      title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
      originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
    };

    if (((_f = node.schema) === null || _f === void 0 ? void 0 : _f.joinValues) === false) {
      dataSchema = __assign(__assign({}, dataSchema), {
        type: 'object',
        title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name),
        properties: (_a = {}, _a[((_j = node.schema) === null || _j === void 0 ? void 0 : _j.labelField) || 'label'] = {
          type: 'string',
          title: i18n("97d07614380da93d257f9fbf81aa56fb")
        }, _a[((_k = node.schema) === null || _k === void 0 ? void 0 : _k.valueField) || 'value'] = {
          type: type,
          title: i18n("fe7509e0ed085b86f07e3e9975cc5b3d")
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
            title: i18n("ab5dea29793d933fa7b5487a7309df6a"),
            properties: dataSchema.properties
          },
          originalValue: dataSchema.originalValue
        };
      }
    }
    return dataSchema;
  };
  NestedSelectControlPlugin.id = 'NestedSelectControlPlugin';
  return NestedSelectControlPlugin;
}(BasePlugin);
registerEditorPlugin(NestedSelectControlPlugin);

export { NestedSelectControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
