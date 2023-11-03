/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { inputStateTpl } from '../../renderer/style-control/helper.js';
import { resolveOptionType } from '../../util.js';
import { i18n } from 'i18n-runtime';

var isText = 'data.type === "input-text"';
var isPassword = 'data.type === "input-password"';
var isUrl = 'data.type === "input-url"';
var TextControlPlugin = /** @class */function (_super) {
  __extends(TextControlPlugin, _super);
  function TextControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-text';
    _this.$schema = '/schemas/TextControlSchema.json';
    _this.order = -600;
    // 添加源对应组件中文名称 & type字段
    _this.searchKeywords = i18n("379b5486e7860a9f38f37dddabbb094c");
    // 组件名称
    _this.name = i18n("5ac57ce6df8c2a19668b7429aebd9f33");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-terminal';
    _this.pluginIcon = 'input-text-plugin';
    _this.description = i18n("f222f5413d3854897741e0ec4b0d2c7b");
    _this.docLink = '/amis/zh-CN/components/form/text';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-text',
      label: i18n("97d07614380da93d257f9fbf81aa56fb"),
      name: 'text'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: [__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("5ac57ce6df8c2a19668b7429aebd9f33");
    _this.events = [
    // {
    //   eventName: 'click',
    //   eventLabel: '点击',
    //   description: '点击事件'
    // },
    {
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("277daf93adca7889605057f566b584bf"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("d5c135b5a4aed5dc39ef846a6f502d4f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("829c57d7064cad467ec466ae26244ebb"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("d5c135b5a4aed5dc39ef846a6f502d4f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18n("40fa260f07ed5a14f9516c0c37fbfd4e"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("d5c135b5a4aed5dc39ef846a6f502d4f")
              }
            }
          }
        }
      }]
    }
    // 貌似无效，先下掉
    // {
    //   eventName: 'enter',
    //   eventLabel: '回车',
    //   description: '按键回车'
    // }
    ];

    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("3086da6514671fb8950171bf3af4ab2d")
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
    _this.panelJustify = true;
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
          }), getSchemaTpl('label'), getSchemaTpl('inputType', {
            value: _this.scaffold.type,
            onChange: function (value, oldValue, model, form) {
              var _a = form.data,
                showCounter = _a.showCounter,
                validations = _a.validations,
                _b = _a.validationErrors,
                validationErrors = _b === void 0 ? {} : _b,
                autoComplete = _a.autoComplete;
              var is_old_email = oldValue === 'input-email';
              var is_old_url = oldValue === 'input-url';
              if (is_old_email) {
                validations && delete validations.isEmail;
                validationErrors && delete validationErrors.isEmail;
              }
              if (is_old_url) {
                validations && delete validations.isUrl;
                validationErrors && delete validationErrors.isUrl;
              }
              form.setValues({
                type: value,
                showCounter: ['input-url', 'input-email'].includes(value) ? undefined : !!showCounter,
                autoComplete: ['input-text'].includes(value) ? autoComplete : undefined
              });
              form.changeValue('validations', __assign({}, validations));
              form.changeValue('validationErrors', __assign({}, validationErrors));
            }
          }), getSchemaTpl('tplFormulaControl', {
            name: 'value',
            label: i18n("225f3ed00750ae78ad1e6ea42c8f5087")
          }), getSchemaTpl('clearable'), getSchemaTpl('showCounter', {
            visibleOn: "".concat(isText, " || ").concat(isPassword)
          }), {
            name: 'maxLength',
            label: tipedLabel(i18n("0aefac04b467ce313ca6b05e33c6145a"), i18n("188676cb26835b8e4d8ea568467c55cd")),
            type: 'input-number',
            min: 0,
            step: 1
          }, {
            name: 'addOn',
            label: tipedLabel('AddOn', i18n("9306b956ca5950203ee49a2680cac63d")),
            type: 'ae-switch-more',
            mode: 'normal',
            formType: 'extend',
            title: 'AddOn',
            bulk: false,
            defaultData: {
              label: i18n("fa966345577ba81af19408f203db968f"),
              type: 'button'
            },
            form: {
              body: [{
                name: 'type',
                label: i18n("226b0912184333c81babf2f1894ec0c1"),
                type: 'button-group-select',
                inputClassName: 'items-center',
                pipeIn: defaultValue('button'),
                options: [{
                  label: i18n("97d07614380da93d257f9fbf81aa56fb"),
                  value: 'text'
                }, {
                  label: i18n("fa966345577ba81af19408f203db968f"),
                  value: 'button'
                }, {
                  label: i18n("939d5345ad4345dbaabe14798f6ac0f1"),
                  value: 'submit'
                }]
              }, getSchemaTpl('horizontal-align', {
                name: 'position',
                pipeIn: defaultValue('right')
              }), getSchemaTpl('addOnLabel'), getSchemaTpl('icon')]
            }
          }, getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, {
          title: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          visibleOn: "".concat(isText, " && (data.options  || data.autoComplete || data.source)"),
          body: [getSchemaTpl('optionControlV2'), getSchemaTpl('multiple', {
            visibleOn: "".concat(isText, " || ").concat(isUrl)
          }), {
            type: 'ae-Switch-More',
            mode: 'normal',
            label: tipedLabel(i18n("d548d3e938088d5d469a28c20e939750"), i18n("424cd425082360322678a5c8d6910b80")),
            visibleOn: isText,
            formType: 'extend',
            defaultData: {
              autoComplete: {
                method: 'get',
                url: ''
              }
            },
            form: {
              body: [getSchemaTpl('apiControl', {
                name: 'autoComplete',
                label: i18n("54ea89b497ec3bb319c68844dfa3687f"),
                description: '',
                visibleOn: 'data.autoComplete !== false'
              }), {
                label: tipedLabel(i18n("7e9c83e86beb612377a94e6e8d1fc644"), i18n("26ff46d82166741297ce666b2792af85")),
                type: 'input-text',
                name: 'labelField',
                placeholder: i18n("6d4ce0631f37676a887c9599691fabec")
              }, {
                label: i18n("2e01f5f5889e33d003bec7857cd38445"),
                type: 'input-text',
                name: 'valueField',
                placeholder: i18n("959c27193eb0a41d01f4b53dcc4b9245")
              }]
            }
          }]
        }, getSchemaTpl('status', {
          isFormItem: true,
          readonly: true
        }), getSchemaTpl('validation', {
          tag: function (data) {
            switch (data.type) {
              case 'input-password':
                return ValidatorTag.Password;
              case 'input-email':
                return ValidatorTag.Email;
              case 'input-url':
                return ValidatorTag.URL;
              default:
                return ValidatorTag.Text;
            }
          }
        })
        // {
        //   title: '高级',
        //   body: [
        //     getSchemaTpl('autoFill')
        //   ]
        // }
        ], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'props'
        }))
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: renderer
        }), getSchemaTpl('theme:form-label'), getSchemaTpl('theme:form-description'), {
          title: i18n("f7e3d7e3146bb53b5e6f09f7c90dea3a"),
          body: __spreadArray([], __read(inputStateTpl('themeCss.inputControlClassName', 'input.base.default')), false)
        }, {
          title: i18n("a39a2916d17f2b9ba11853066b4225f3"),
          visibleOn: 'this.addOn && this.addOn.type === "text"',
          body: [getSchemaTpl('theme:font', {
            label: i18n("ca746b1ff10193a3ce20878dec04a733"),
            name: 'themeCss.addOnClassName.font:default'
          }), getSchemaTpl('theme:paddingAndMargin', {
            name: 'themeCss.addOnClassName.padding-and-margin:default'
          })]
        }, getSchemaTpl('theme:cssCode', {
          themeClass: [{
            name: i18n("9b6425cd2d496c9cb5a6c6b8ff125d1b"),
            value: '',
            className: 'inputControlClassName',
            state: ['default', 'hover', 'active']
          }, {
            name: 'addOn',
            value: 'addOn',
            className: 'addOnClassName'
          }],
          isFormItem: true
        })], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'style'
        }))
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
  TextControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    var type = resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
    // todo:异步数据case
    var dataSchema = {
      type: type,
      title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
      originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
    };
    // 选择器模式
    if ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.options) {
      if (((_g = node.schema) === null || _g === void 0 ? void 0 : _g.joinValues) === false) {
        dataSchema = __assign(__assign({}, dataSchema), {
          type: 'object',
          title: ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.label) || ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.name),
          properties: (_a = {}, _a[((_k = node.schema) === null || _k === void 0 ? void 0 : _k.labelField) || 'label'] = {
            type: 'string',
            title: i18n("97d07614380da93d257f9fbf81aa56fb")
          }, _a[((_l = node.schema) === null || _l === void 0 ? void 0 : _l.valueField) || 'value'] = {
            type: type,
            title: i18n("fe7509e0ed085b86f07e3e9975cc5b3d")
          }, _a)
        });
      }
      if ((_m = node.schema) === null || _m === void 0 ? void 0 : _m.multiple) {
        if ((_o = node.schema) === null || _o === void 0 ? void 0 : _o.extractValue) {
          dataSchema = {
            type: 'array',
            title: ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.label) || ((_q = node.schema) === null || _q === void 0 ? void 0 : _q.name)
          };
        } else if (((_r = node.schema) === null || _r === void 0 ? void 0 : _r.joinValues) === false) {
          dataSchema = {
            type: 'array',
            title: ((_s = node.schema) === null || _s === void 0 ? void 0 : _s.label) || ((_t = node.schema) === null || _t === void 0 ? void 0 : _t.name),
            items: {
              type: 'object',
              title: i18n("ab5dea29793d933fa7b5487a7309df6a"),
              properties: dataSchema.properties
            },
            originalValue: dataSchema.originalValue
          };
        }
      }
    }
    return dataSchema;
  };
  TextControlPlugin.id = 'TextControlPlugin';
  TextControlPlugin.scene = ['layout'];
  return TextControlPlugin;
}(BasePlugin);
registerEditorPlugin(TextControlPlugin);

export { TextControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
