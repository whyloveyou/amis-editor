/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var amis = require('amis');
var validator = require('../../validator.js');
var helper = require('../../renderer/event-control/helper.js');
var omit = require('lodash/omit');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);

amisEditorCore.setSchemaTpl('option', {
  name: 'option',
  type: 'input-text',
  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("f411d0f1f925d9b48d8c1d451bd809b1"), i18nRuntime.i18n("2ef0fb6299da5954f5ea84a088684ee5"))
});
var CheckboxControlPlugin = /** @class */function (_super) {
  tslib.__extends(CheckboxControlPlugin, _super);
  function CheckboxControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'checkbox';
    _this.$schema = '/schemas/CheckboxControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("454e60f5759903d7d3dba58e3f9bd590");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-check-square-o';
    _this.pluginIcon = 'checkbox-plugin';
    _this.description = i18nRuntime.i18n("454e60f5759903d7d3dba58e3f9bd590");
    _this.docLink = '/amis/zh-CN/components/form/checkbox';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'checkbox',
      option: i18nRuntime.i18n("454e60f5759903d7d3dba58e3f9bd590"),
      name: 'checkbox'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: [tslib.__assign(tslib.__assign({
        value: true
      }, _this.scaffold), {
        label: i18nRuntime.i18n("81c8c07d13f425215010783bbf3bf06e")
      })]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("454e60f5759903d7d3dba58e3f9bd590");
    _this.panelJustify = true;
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("c75fde0e2d329ce62f55cb1a207181ae"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("10d23d1f68ee1facb03b1f86678aa2ba")
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
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('option'), {
            type: 'ae-switch-more',
            hiddenOnDefault: false,
            mode: 'normal',
            label: i18nRuntime.i18n("db0258df1ddbd88749b335aecdc8425e"),
            formType: 'extend',
            form: {
              body: [{
                type: 'input-text',
                label: i18nRuntime.i18n("53235c46364db079356d57da5870f967"),
                name: 'trueValue',
                pipeIn: amisEditorCore.defaultValue(true),
                pipeOut: amisEditorCore.valuePipeOut,
                onChange: function (value, oldValue, model, form) {
                  var _a;
                  var defaultValue = (_a = form === null || form === void 0 ? void 0 : form.data) === null || _a === void 0 ? void 0 : _a.value;
                  if (amis.isPureVariable(defaultValue)) {
                    return;
                  }
                  if (oldValue === defaultValue) {
                    form.setValues({
                      value: value
                    });
                  }
                }
              }, {
                type: 'input-text',
                label: i18nRuntime.i18n("56f3150f1713a5e5c6e7c55fb0b79b75"),
                name: 'falseValue',
                pipeIn: amisEditorCore.defaultValue(false),
                pipeOut: amisEditorCore.valuePipeOut,
                onChange: function (value, oldValue, model, form) {
                  var _a = (form === null || form === void 0 ? void 0 : form.data) || {},
                    defaultValue = _a.value,
                    trueValue = _a.trueValue;
                  if (amis.isPureVariable(defaultValue)) {
                    return;
                  }
                  if (trueValue !== defaultValue) {
                    form.setValues({
                      value: value
                    });
                  }
                }
              }]
            }
          }, amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: tslib.__assign(tslib.__assign({}, omit__default["default"](context === null || context === void 0 ? void 0 : context.schema, ['trueValue', 'falseValue'])), {
              type: 'switch'
            }),
            needDeleteProps: ['option'],
            label: i18nRuntime.i18n("7c7a88eb1bb4b40206c6c680bd8995a8"),
            rendererWrapper: true,
            valueType: 'boolean',
            pipeIn: function (value, data) {
              var _a, _b;
              if (amis.isPureVariable(value)) {
                return value;
              }
              return value === ((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.trueValue) !== null && _b !== void 0 ? _b : true);
            },
            pipeOut: function (value, origin, data) {
              if (amis.isPureVariable(value)) {
                return value;
              }
              var _a = data.trueValue,
                trueValue = _a === void 0 ? true : _a,
                _b = data.falseValue,
                falseValue = _b === void 0 ? false : _b;
              return value ? trueValue : falseValue;
            }
          }), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('autoFillApi', {
            trigger: 'change'
          })]
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
  CheckboxControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c, _d, _e;
    // 默认trueValue和falseValue是同类型
    return {
      type: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.trueValue) ? typeof ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.trueValue) : 'boolean',
      title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
      originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
    };
  };

  CheckboxControlPlugin.id = 'CheckboxControlPlugin';
  CheckboxControlPlugin.scene = ['layout'];
  return CheckboxControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(CheckboxControlPlugin);

exports.CheckboxControlPlugin = CheckboxControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
