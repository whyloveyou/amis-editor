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
var i18nRuntime = require('i18n-runtime');

var LocationControlPlugin = /** @class */function (_super) {
  tslib.__extends(LocationControlPlugin, _super);
  function LocationControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'location-picker';
    _this.$schema = '/schemas/LocationControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("d1f923b8e23b66b3e48953ba1ce17839");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-location-arrow';
    _this.pluginIcon = 'location-picker-plugin';
    _this.description = i18nRuntime.i18n("d1f923b8e23b66b3e48953ba1ce17839");
    _this.docLink = '/amis/zh-CN/components/form/location-picker';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'location-picker',
      name: 'location',
      label: i18nRuntime.i18n("989ea9acbab9b17d2c15e2946b5365bb")
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18nRuntime.i18n("d1f923b8e23b66b3e48953ba1ce17839");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var renderer = context.info.renderer;
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'),
          /* 备注: 暂时不开放
          getSchemaTpl('valueFormula', {
            rendererSchema: context?.schema,
          }),
          */
          {
            type: 'input-text',
            name: 'ak',
            label: i18nRuntime.i18n("dffd9d86d2003615897b12ce7597d77b"),
            required: true,
            validationErrors: {
              isRequired: i18nRuntime.i18n("f1ee660e12ef0b76c10cccc3d923e605")
            },
            description: i18nRuntime.i18n("4d01bb9f50eb1480e0e9995a2a003181")
          }, {
            type: 'select',
            name: 'coordinatesType',
            label: i18nRuntime.i18n("b472ba224a7d132c487ee6ec4798f835"),
            value: 'bd09',
            options: [{
              label: i18nRuntime.i18n("36443b53c845b197db8d39eeda433ab9"),
              value: 'bd09'
            }, {
              label: i18nRuntime.i18n("f58cb611aec0998a44ef104b5c950b40"),
              value: 'gcj02'
            }]
          }, amisEditorCore.getSchemaTpl('clearable'), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('placeholder'), amisEditorCore.getSchemaTpl('description')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true,
          readonly: false
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.Text
        })])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: renderer
        }), amisEditorCore.getSchemaTpl('theme:classNames', {
          schema: [{
            type: 'theme-classname',
            label: i18nRuntime.i18n("e1b2f870112bd38f8d7e14a0ad589930"),
            name: 'inputClassName'
          }, {
            type: 'theme-classname',
            label: i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85"),
            name: 'className'
          }, {
            type: 'theme-classname',
            label: i18nRuntime.i18n("f1f7a5f821ca0ee4caaa9324eda48d91"),
            name: 'staticClassName'
          }]
        })])]
      }]);
    };
    return _this;
  }
  LocationControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c;
    return {
      type: 'object',
      title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
      properties: {
        city: {
          type: 'string',
          title: i18nRuntime.i18n("f7d29dfae05b5d049b64b040b14d9a00")
        },
        address: {
          type: 'string',
          title: i18nRuntime.i18n("7650487a8758fd50c87d6c9cff0aa5ac")
        },
        lng: {
          type: 'number',
          title: i18nRuntime.i18n("3d18ca01ddd1b95e982ec44ffcda8165")
        },
        lat: {
          type: 'number',
          title: i18nRuntime.i18n("6acaee71fe6a23c17f18625df01bab23")
        },
        vendor: {
          type: 'string',
          title: i18nRuntime.i18n("40d58bb6ac9888b0c672f5bcff74da25")
        }
      },
      originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
    };
  };

  LocationControlPlugin.id = 'LocationControlPlugin';
  return LocationControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(LocationControlPlugin);

exports.LocationControlPlugin = LocationControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
