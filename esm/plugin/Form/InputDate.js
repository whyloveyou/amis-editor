/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __spreadArray, __read, __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { FormulaDateType } from '../../renderer/FormulaControl.js';
import { i18n } from 'i18n-runtime';

var formatX = [{
  label: i18n("79d7c8cd739a1f94c7bb30c74323eaa7"),
  value: 'X'
}, {
  label: i18n("84c7af622906c4e9d62bbf905d6ee517"),
  value: 'x'
}];
var DateType = {
  date: {
    format: 'YYYY-MM-DD',
    placeholder: i18n("aa2fb1b6cffd7c9783c11047adcdbae4"),
    formatOptions: __spreadArray(__spreadArray([], __read(formatX), false), [{
      label: 'YYYY-MM-DD',
      value: 'YYYY-MM-DD'
    }, {
      label: 'YYYY/MM/DD',
      value: 'YYYY/MM/DD'
    }, {
      label: i18n("8935dbb864f032bacc618b0938887ad7"),
      value: i18n("8935dbb864f032bacc618b0938887ad7")
    }], false)
  },
  datetime: {
    format: 'YYYY-MM-DD HH:mm:ss',
    placeholder: i18n("ff91b28a49de6fd998dea31598198a73"),
    formatOptions: __spreadArray(__spreadArray([], __read(formatX), false), [{
      label: 'YYYY-MM-DD HH:mm:ss',
      value: 'YYYY-MM-DD HH:mm:ss'
    }, {
      label: 'YYYY/MM/DD HH:mm:ss',
      value: 'YYYY/MM/DD HH:mm:ss'
    }, {
      label: i18n("3e253325914594e1dc483c0b64ea7643"),
      value: i18n("3e253325914594e1dc483c0b64ea7643")
    }], false)
  },
  time: {
    format: 'HH:mm',
    placeholder: i18n("fbd05a89ca037ca9e5a6af4c2206d488"),
    formatOptions: [{
      label: 'HH:mm',
      value: 'HH:mm'
    }, {
      label: 'HH:mm:ss',
      value: 'HH:mm:ss'
    }, {
      label: i18n("90696835bfa70d38b02ef5533d33c88d"),
      value: i18n("90696835bfa70d38b02ef5533d33c88d")
    }, {
      label: i18n("6154f88c0ac259ace41b0a5be45d753c"),
      value: i18n("6154f88c0ac259ace41b0a5be45d753c")
    }]
  },
  month: {
    format: 'YYYY-MM',
    placeholder: i18n("904393383755b88e61f5c242eafabdda"),
    formatOptions: __spreadArray(__spreadArray([], __read(formatX), false), [{
      label: 'YYYY-MM',
      value: 'YYYY-MM'
    }, {
      label: 'MM',
      value: 'MM'
    }, {
      label: 'M',
      value: 'M'
    }], false)
  },
  quarter: {
    format: 'YYYY [Q]Q',
    placeholder: i18n("55546b74d8819d49cccda6277f3a3282"),
    formatOptions: __spreadArray(__spreadArray([], __read(formatX), false), [{
      label: 'YYYY-[Q]Q',
      value: 'YYYY-[Q]Q'
    }, {
      label: 'Q',
      value: 'Q'
    }], false)
  },
  year: {
    format: 'YYYY',
    placeholder: i18n("13ef7828361c8aebbf6ebe09370f5e41"),
    formatOptions: __spreadArray(__spreadArray([], __read(formatX), false), [{
      label: 'YYYY',
      value: 'YYYY'
    }], false)
  }
};
var dateTooltip = i18n("037becbe8bff2f8838d141cc7b6b2df7");
var DateControlPlugin = /** @class */function (_super) {
  __extends(DateControlPlugin, _super);
  function DateControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-date';
    _this.$schema = '/schemas/DateControlSchema.json';
    // 组件名称
    _this.icon = 'fa fa-calendar';
    _this.pluginIcon = 'input-date-plugin';
    _this.name = i18n("4ff1e74e43a3586339251494117185ad");
    _this.isBaseComponent = true;
    // 添加源对应组件中文名称 & type字段
    _this.searchKeywords = i18n("be28cd64f978dd70c1cd345ebe751bca");
    _this.description = i18n("52ea2070560eb55083b64f5ba748697d");
    _this.docLink = '/amis/zh-CN/components/form/input-date';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-date',
      label: i18n("4ff1e74e43a3586339251494117185ad"),
      name: 'date'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("e54ca3223a36c6489de0fb8a39d4049f");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("96f9d9fc9cef8b18e3cd1cf9077147d1"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("a610ef4a4fbe8f0c8b756162acfb6186")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("f6db3514c72bdc34922f137a8a92b997"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("a610ef4a4fbe8f0c8b756162acfb6186")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18n("0f5fc3b84cf9c24ff3acae45ae22fb57"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("a610ef4a4fbe8f0c8b756162acfb6186")
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
      description: i18n("3086da6514671fb8950171bf3af4ab2d")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("8db57ba01ffb9bf29c1656de5f0208f5")
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
          }), getSchemaTpl('label'), getSchemaTpl('selectDateType', {
            value: _this.scaffold.type,
            onChange: function (value, oldValue, model, form) {
              var _a, _b;
              var type = value.split('-')[1];
              form.setValues({
                placeholder: (_a = DateType[type]) === null || _a === void 0 ? void 0 : _a.placeholder,
                valueFormat: type === 'time' ? 'HH:mm' : 'X',
                displayFormat: (_b = DateType[type]) === null || _b === void 0 ? void 0 : _b.format,
                minDate: '',
                maxDate: '',
                value: ''
              });
            }
          }), {
            type: 'input-text',
            name: 'valueFormat',
            label: tipedLabel(i18n("db0258df1ddbd88749b335aecdc8425e"), i18n("e02d111d524de97e8622121f7ce845cf")),
            pipeIn: defaultValue('YYYY-MM-DD'),
            clearable: true,
            onChange: function (value, oldValue, model, form) {
              var type = form.data.type.split('-')[1];
              model.setOptions(DateType[type].formatOptions);
            },
            options: DateType[_this.scaffold.type.split('-')[1]].formatOptions
          }, {
            type: 'input-text',
            name: 'displayFormat',
            label: tipedLabel(i18n("ecd1a3cadcf1d55250afafbbde767250"), i18n("fcb9b16d5d056bfbf6b6cba9dcf61efa")),
            pipeIn: defaultValue('YYYY-MM-DD'),
            clearable: true,
            onChange: function (value, oldValue, model, form) {
              var type = form.data.type.split('-')[1];
              model.setOptions(DateType[type].formatOptions);
            },
            options: DateType[_this.scaffold.type.split('-')[1]].formatOptions
          }, getSchemaTpl('utc'), getSchemaTpl('clearable', {
            pipeIn: defaultValue(true)
          }), getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            },
            placeholder: i18n("8f7ae284d0039fe05b9f57fd5ae3ede9"),
            header: i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaDateType.IsDate,
            label: tipedLabel(i18n("225f3ed00750ae78ad1e6ea42c8f5087"), dateTooltip)
          }), getSchemaTpl('valueFormula', {
            name: 'minDate',
            header: i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaDateType.IsDate,
            rendererSchema: function () {
              var _a;
              var schema = _this.manager.store.getSchema((_a = context.schema) === null || _a === void 0 ? void 0 : _a.id, 'id');
              return __assign(__assign({}, schema), {
                value: context === null || context === void 0 ? void 0 : context.schema.minDate
              });
            },
            placeholder: i18n("8f7ae284d0039fe05b9f57fd5ae3ede9"),
            needDeleteProps: ['minDate'],
            label: tipedLabel(i18n("c322edb884724d04842fc35f4d29a24e"), dateTooltip)
          }), getSchemaTpl('valueFormula', {
            name: 'maxDate',
            header: i18n("98229308e2e9484583fde4ae363a979f"),
            DateTimeType: FormulaDateType.IsDate,
            rendererSchema: function () {
              var _a;
              var schema = _this.manager.store.getSchema((_a = context.schema) === null || _a === void 0 ? void 0 : _a.id, 'id');
              return __assign(__assign({}, schema), {
                value: context === null || context === void 0 ? void 0 : context.schema.maxDate
              });
            },
            needDeleteProps: ['maxDate'],
            label: tipedLabel(i18n("5da893141114a59da868052b3a17a79a"), dateTooltip)
          }), getSchemaTpl('placeholder', {
            pipeIn: defaultValue(i18n("aa2fb1b6cffd7c9783c11047adcdbae4"))
          }), getSchemaTpl('remark'), getSchemaTpl('labelRemark'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.Date
        })], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'props'
        }))
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', renderer), getSchemaTpl('style:classNames', [getSchemaTpl('className', {
          label: i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
          name: 'descriptionClassName',
          visibleOn: 'this.description'
        }), getSchemaTpl('className', {
          name: 'addOn.className',
          label: 'AddOn',
          visibleOn: 'this.addOn && this.addOn.type === "text"'
        })]), getSchemaTpl('style:others', [{
          name: 'embed',
          type: 'button-group-select',
          size: 'md',
          label: i18n("f0789e79d48f135e5d870753f7a85d05"),
          mode: 'row',
          pipeIn: defaultValue(false),
          options: [{
            label: i18n("a553741d5ebb9c80d7d2a63b202cf4b8"),
            value: false
          }, {
            label: i18n("c6e1b91d329a61b691d0d5d2eb343ddd"),
            value: true
          }]
        }])], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
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
  DateControlPlugin.id = 'DateControlPlugin';
  return DateControlPlugin;
}(BasePlugin);
registerEditorPlugin(DateControlPlugin);

export { DateControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
