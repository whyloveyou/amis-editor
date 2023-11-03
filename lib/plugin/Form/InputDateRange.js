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
var FormulaControl = require('../../renderer/FormulaControl.js');
var amisCore = require('amis-core');
var omit = require('lodash/omit');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);

var formatX = [{
  label: i18nRuntime.i18n("79d7c8cd739a1f94c7bb30c74323eaa7"),
  value: 'X'
}, {
  label: i18nRuntime.i18n("84c7af622906c4e9d62bbf905d6ee517"),
  value: 'x'
}];
var DateType = {
  date: tslib.__assign(tslib.__assign({}, amisCore.getRendererByName('input-date-range')), {
    format: 'YYYY-MM-DD',
    placeholder: i18nRuntime.i18n("a2847d82fc998cbe25447b14d113234b"),
    shortcuts: ['yesterday', '7daysago', 'prevweek', 'thismonth', 'prevmonth', 'prevquarter'],
    formatOptions: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(formatX), false), [{
      label: 'YYYY-MM-DD',
      value: 'YYYY-MM-DD'
    }, {
      label: 'YYYY/MM/DD',
      value: 'YYYY/MM/DD'
    }, {
      label: i18nRuntime.i18n("8935dbb864f032bacc618b0938887ad7"),
      value: i18nRuntime.i18n("8935dbb864f032bacc618b0938887ad7")
    }], false)
  }),
  datetime: tslib.__assign(tslib.__assign({}, amisCore.getRendererByName('input-datetime-range')), {
    format: 'YYYY-MM-DD HH:mm:ss',
    timeFormat: 'HH:mm:ss',
    placeholder: i18nRuntime.i18n("3f9c3a9eb55b7116bcaa6b614ecb38be"),
    shortcuts: ['yesterday', '7daysago', 'prevweek', 'thismonth', 'prevmonth', 'prevquarter'],
    formatOptions: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(formatX), false), [{
      label: 'YYYY-MM-DD HH:mm:ss',
      value: 'YYYY-MM-DD HH:mm:ss'
    }, {
      label: 'YYYY/MM/DD HH:mm:ss',
      value: 'YYYY/MM/DD HH:mm:ss'
    }, {
      label: i18nRuntime.i18n("3e253325914594e1dc483c0b64ea7643"),
      value: i18nRuntime.i18n("3e253325914594e1dc483c0b64ea7643")
    }], false)
  }),
  time: tslib.__assign(tslib.__assign({}, amisCore.getRendererByName('input-time-range')), {
    format: 'HH:mm',
    timeFormat: 'HH:mm:ss',
    placeholder: i18nRuntime.i18n("ddc4a982defd88cd164c61da914819e1"),
    shortcuts: [],
    formatOptions: [{
      label: 'HH:mm',
      value: 'HH:mm',
      timeFormat: 'HH:mm'
    }, {
      label: 'HH:mm:ss',
      value: 'HH:mm:ss',
      timeFormat: 'HH:mm:ss'
    }, {
      label: i18nRuntime.i18n("90696835bfa70d38b02ef5533d33c88d"),
      value: i18nRuntime.i18n("90696835bfa70d38b02ef5533d33c88d"),
      timeFormat: 'HH:mm'
    }, {
      label: i18nRuntime.i18n("6154f88c0ac259ace41b0a5be45d753c"),
      value: i18nRuntime.i18n("6154f88c0ac259ace41b0a5be45d753c"),
      timeFormat: 'HH:mm:ss'
    }]
  }),
  month: tslib.__assign(tslib.__assign({}, amisCore.getRendererByName('input-month-range')), {
    format: 'YYYY-MM',
    placeholder: i18nRuntime.i18n("c899221db27c8b3606ce7c807f0765f2"),
    shortcuts: [],
    formatOptions: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(formatX), false), [{
      label: 'YYYY-MM',
      value: 'YYYY-MM'
    }, {
      label: 'MM',
      value: 'MM'
    }, {
      label: 'M',
      value: 'M'
    }], false)
  }),
  quarter: tslib.__assign(tslib.__assign({}, amisCore.getRendererByName('input-quarter-range')), {
    format: 'YYYY [Q]Q',
    placeholder: i18nRuntime.i18n("c09ddfc72d3c34ae6aa76d5a457cb403"),
    shortcuts: ['thisquarter', 'prevquarter'],
    formatOptions: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(formatX), false), [{
      label: 'YYYY-[Q]Q',
      value: 'YYYY-[Q]Q'
    }, {
      label: 'Q',
      value: 'Q'
    }], false)
  }),
  year: tslib.__assign(tslib.__assign({}, amisCore.getRendererByName('input-year-range')), {
    format: 'YYYY',
    placeholder: i18nRuntime.i18n("cb6deedf9cd4a0b65abd70798cfed85e"),
    shortcuts: ['thisyear', 'lastYear'],
    formatOptions: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(formatX), false), [{
      label: 'YYYY',
      value: 'YYYY'
    }], false)
  })
};
var dateTooltip = i18nRuntime.i18n("6b3c2a07db1bb3c229bbc5df48068792");
var rangTooltip = i18nRuntime.i18n("dcc94ea1715bd502c709c5d5092e9c82");
var sizeImmutableComponents = Object.values(DateType).map(function (item) {
  return (item === null || item === void 0 ? void 0 : item.sizeMutable) === false ? item.type : null;
}).filter(function (a) {
  return a;
});
var DateRangeControlPlugin = /** @class */function (_super) {
  tslib.__extends(DateRangeControlPlugin, _super);
  function DateRangeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-date-range';
    _this.$schema = '/schemas/DateRangeControlSchema.json';
    // 组件名称
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-date-range-plugin';
    _this.name = i18nRuntime.i18n("7866226eb814f681dcc4037e7489aab8");
    _this.isBaseComponent = true;
    // 添加源对应组件中文名称 & type字段
    _this.searchKeywords = i18nRuntime.i18n("28de3d73d839b616bd617b3636669780");
    _this.description = i18nRuntime.i18n("9024ff398faf8340b92bf0208431973b");
    _this.docLink = '/amis/zh-CN/components/form/input-date-range';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-date-range',
      label: i18nRuntime.i18n("7866226eb814f681dcc4037e7489aab8"),
      name: 'date-range'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("7866226eb814f681dcc4037e7489aab8");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("96f9d9fc9cef8b18e3cd1cf9077147d1"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("05606badb4b14ffd3c38c278fb0f3c9f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18nRuntime.i18n("f6db3514c72bdc34922f137a8a92b997"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("05606badb4b14ffd3c38c278fb0f3c9f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18nRuntime.i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18nRuntime.i18n("0f5fc3b84cf9c24ff3acae45ae22fb57"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("05606badb4b14ffd3c38c278fb0f3c9f")
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
      description: i18nRuntime.i18n("3086da6514671fb8950171bf3af4ab2d")
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
      var renderer = context.info.renderer;
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('formItemExtraName'), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('selectDateRangeType', {
            value: _this.scaffold.type,
            onChange: function (value, oldValue, model, form) {
              var _a, _b, _c, _d;
              var type = value.split('-')[1];
              form.setValues({
                displayFormat: (_a = DateType[type]) === null || _a === void 0 ? void 0 : _a.format,
                placeholder: (_b = DateType[type]) === null || _b === void 0 ? void 0 : _b.placeholder,
                valueFormat: type === 'time' ? 'HH:mm' : 'X',
                minDate: '',
                maxDate: '',
                value: '',
                shortcuts: (_c = DateType[type]) === null || _c === void 0 ? void 0 : _c.shortcuts,
                /** amis 3.1.0之后ranges属性废弃 */
                ranges: undefined,
                // size immutable 组件去除 size 字段
                size: sizeImmutableComponents.includes(value) ? undefined : (_d = form.data) === null || _d === void 0 ? void 0 : _d.size
              });
            }
          }), {
            type: 'input-text',
            name: 'valueFormat',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("db0258df1ddbd88749b335aecdc8425e"), i18nRuntime.i18n("e02d111d524de97e8622121f7ce845cf")),
            pipeIn: amisEditorCore.defaultValue('X'),
            clearable: true,
            onChange: function (value, oldValue, model, form) {
              model.setOptions(DateType[form.data.type.split('-')[1]].formatOptions);
            },
            options: DateType[_this.scaffold.type.split('-')[1]].formatOptions
          }, {
            type: 'input-text',
            name: 'displayFormat',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("ecd1a3cadcf1d55250afafbbde767250"), i18nRuntime.i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            pipeIn: amisEditorCore.defaultValue('YYYY-MM-DD'),
            clearable: true,
            onChange: function (value, oldValue, model, form) {
              model.setOptions(DateType[form.data.type.split('-')[1]].formatOptions);
            },
            options: DateType[_this.scaffold.type.split('-')[1]].formatOptions
          }, amisEditorCore.getSchemaTpl('utc'), amisEditorCore.getSchemaTpl('clearable', {
            pipeIn: amisEditorCore.defaultValue(true)
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return tslib.__assign(tslib.__assign({}, schema), {
                size: 'full',
                mode: 'inline'
              });
            },
            mode: 'vertical',
            header: i18nRuntime.i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaControl.FormulaDateType.IsRange,
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("225f3ed00750ae78ad1e6ea42c8f5087"), dateTooltip)
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            name: 'minDate',
            header: i18nRuntime.i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaControl.FormulaDateType.IsDate,
            rendererSchema: function (schema) {
              return tslib.__assign(tslib.__assign({}, omit__default["default"](schema, ['shortcuts'])), {
                value: schema === null || schema === void 0 ? void 0 : schema.minDate,
                type: 'input-date'
              });
            },
            placeholder: i18nRuntime.i18n("8f7ae284d0039fe05b9f57fd5ae3ede9"),
            needDeleteProps: ['minDate', 'ranges', 'shortcuts'],
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c322edb884724d04842fc35f4d29a24e"), dateTooltip)
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            name: 'maxDate',
            header: i18nRuntime.i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaControl.FormulaDateType.IsDate,
            rendererSchema: function (schema) {
              return tslib.__assign(tslib.__assign({}, omit__default["default"](schema, ['shortcuts'])), {
                value: schema === null || schema === void 0 ? void 0 : schema.maxDate,
                type: 'input-date'
              });
            },
            placeholder: i18nRuntime.i18n("8f7ae284d0039fe05b9f57fd5ae3ede9"),
            needDeleteProps: ['maxDate', 'ranges', 'shortcuts'],
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("5da893141114a59da868052b3a17a79a"), dateTooltip)
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            name: 'minDuration',
            header: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
            DateTimeType: FormulaControl.FormulaDateType.NotDate,
            rendererSchema: function (schema) {
              return tslib.__assign(tslib.__assign({}, schema), {
                value: schema === null || schema === void 0 ? void 0 : schema.minDuration,
                type: 'input-text'
              });
            },
            placeholder: i18nRuntime.i18n("13ce82d026daa5a30e50105bd2a204a6"),
            needDeleteProps: ['minDuration'],
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("e7271563debf3c7bcb85e23816c35acb"), rangTooltip)
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            name: 'maxDuration',
            header: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
            DateTimeType: FormulaControl.FormulaDateType.NotDate,
            rendererSchema: function (schema) {
              return tslib.__assign(tslib.__assign({}, schema), {
                value: schema === null || schema === void 0 ? void 0 : schema.maxDuration,
                type: 'input-text'
              });
            },
            placeholder: i18nRuntime.i18n("13ce82d026daa5a30e50105bd2a204a6"),
            needDeleteProps: ['maxDuration'],
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6da95498bea887b2ea7c6c2bb4b2fdc3"), rangTooltip)
          }), amisEditorCore.getSchemaTpl('dateShortCutControl', {
            name: 'shortcuts',
            mode: 'normal',
            certainOptions: ['today', 'yesterday', 'thisweek', 'prevweek', 'thismonth', 'prevmonth', 'thisquarter', 'prevquarter', 'thisyear'],
            modifyOptions: ['$daysago', '$dayslater', '$weeksago', '$weekslater', '$monthsago', '$monthslater', '$quartersago', '$quarterslater', '$yearsago', '$yearslater']
          }), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('startPlaceholder'), amisEditorCore.getSchemaTpl('endPlaceholder'), amisEditorCore.getSchemaTpl('autoFillApi')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.Date
        })], tslib.__assign(tslib.__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'props'
        }))
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: tslib.__assign(tslib.__assign({}, renderer), {
            sizeMutable: false
          }),
          schema: [
          // 需要作为一个字符串表达式传入，因为切换 type 后 panelBodyCreator 不会重新执行
          amisEditorCore.getSchemaTpl('formItemSize', {
            hiddenOn: "[\"".concat(sizeImmutableComponents.join('","'), "\"].includes(this.type)")
          })]
        }), amisEditorCore.getSchemaTpl('style:classNames', [amisEditorCore.getSchemaTpl('className', {
          label: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
          name: 'descriptionClassName',
          visibleOn: 'this.description'
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'addOn.className',
          label: 'AddOn',
          visibleOn: 'this.addOn && this.addOn.type === "text"'
        })]), amisEditorCore.getSchemaTpl('style:others', [{
          name: 'embed',
          type: 'button-group-select',
          size: 'md',
          label: i18nRuntime.i18n("f0789e79d48f135e5d870753f7a85d05"),
          mode: 'row',
          pipeIn: amisEditorCore.defaultValue(false),
          options: [{
            label: i18nRuntime.i18n("a553741d5ebb9c80d7d2a63b202cf4b8"),
            value: false
          }, {
            label: i18nRuntime.i18n("c6e1b91d329a61b691d0d5d2eb343ddd"),
            value: true
          }]
        }])], tslib.__assign(tslib.__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'style'
        }))
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
  DateRangeControlPlugin.id = 'DateRangeControlPlugin';
  return DateRangeControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(DateRangeControlPlugin);

exports.DateRangeControlPlugin = DateRangeControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
