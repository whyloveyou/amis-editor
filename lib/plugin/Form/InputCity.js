/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var cloneDeep = require('lodash/cloneDeep');
var validator = require('../../validator.js');
var helper = require('../../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

var CityControlPlugin = /** @class */function (_super) {
  tslib.__extends(CityControlPlugin, _super);
  function CityControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-city';
    _this.$schema = '/schemas/CityControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("ba6a6f2cdb46e8f80fbfd4fed20eafac");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-building-o';
    _this.pluginIcon = 'input-city-plugin';
    _this.description = i18nRuntime.i18n("20700607ccdb7b6c83f3b5bc525e6975");
    _this.docLink = '/amis/zh-CN/components/form/input-city';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-city',
      label: i18nRuntime.i18n("ba6a6f2cdb46e8f80fbfd4fed20eafac"),
      name: 'city',
      allowCity: true,
      allowDistrict: true,
      extractValue: true
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("ba6a6f2cdb46e8f80fbfd4fed20eafac");
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
                type: 'string',
                title: i18nRuntime.i18n("b06216eac0df52f6072a8adb095f72b7")
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
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            },
            rendererWrapper: true,
            mode: 'vertical' // 改成上下展示模式
          }), {
            name: 'extractValue',
            label: i18nRuntime.i18n("db0258df1ddbd88749b335aecdc8425e"),
            type: 'button-group-select',
            size: 'sm',
            options: [{
              label: i18nRuntime.i18n("d8848daffd80dbb21ace876ade2ea8a8"),
              value: true
            }, {
              label: i18nRuntime.i18n("977cfa6e8c7f036674afedfcc19ec7a2"),
              value: false
            }]
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'allowCity',
            label: i18nRuntime.i18n("05fcf03ba044a04ce81bdbe6eaf49d17"),
            pipeIn: amisEditorCore.defaultValue(true),
            onChange: function (value, oldValue, item, form) {
              if (!value) {
                var schema = cloneDeep__default["default"](form.data);
                form.setValueByName('allowDistrict', undefined);
                form.setValueByName('value', schema.extractValue ? '' : {});
              }
            }
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'allowDistrict',
            label: i18nRuntime.i18n("1f1ca9df5fa3648c718ad04649888943"),
            visibleOn: 'data.allowCity',
            pipeIn: amisEditorCore.defaultValue(true),
            onChange: function (value, oldValue, item, form) {
              if (!value) {
                var schema = cloneDeep__default["default"](form.data);
                form.setValueByName('value', schema.extractValue ? '' : {});
              }
            }
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'searchable',
            label: i18nRuntime.i18n("af9cbd3988196fc104af4fed9461e152"),
            pipeIn: amisEditorCore.defaultValue(false)
          }), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('description')]
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
  CityControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c, _d, _e, _f;
    var dataSchema = {
      type: 'string',
      title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
      originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
    };

    if (((_d = node.schema) === null || _d === void 0 ? void 0 : _d.extractValue) === false) {
      dataSchema = tslib.__assign(tslib.__assign({}, dataSchema), {
        type: 'object',
        title: ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.label) || ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.name),
        properties: {
          code: {
            type: 'number',
            title: i18nRuntime.i18n("cc6c35a3e0f97fb9747905dc13e9b625")
          },
          provinceCode: {
            type: 'number',
            title: i18nRuntime.i18n("936b62c222fcf6ba10fde069212fcf97")
          },
          province: {
            type: 'string',
            title: i18nRuntime.i18n("d7009d07f04d208f84e6c343fbc80ab7")
          },
          cityCode: {
            type: 'number',
            title: i18nRuntime.i18n("e982852e24060d47f29be600837b675a")
          },
          city: {
            type: 'string',
            title: i18nRuntime.i18n("f7d29dfae05b5d049b64b040b14d9a00")
          },
          districtCode: {
            type: 'number',
            title: i18nRuntime.i18n("0dad46b34f0ddc802bce0351dc4745eb")
          },
          district: {
            type: 'string',
            title: i18nRuntime.i18n("d3ce40d862f1c7e4748e6c28ffb0a007")
          },
          street: {
            type: 'string',
            title: i18nRuntime.i18n("716c3dc1bd990ccebc4fee34eb9171cf")
          }
        }
      });
    }
    return dataSchema;
  };
  CityControlPlugin.id = 'CityControlPlugin';
  CityControlPlugin.scene = ['layout'];
  return CityControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(CityControlPlugin);

exports.CityControlPlugin = CityControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
