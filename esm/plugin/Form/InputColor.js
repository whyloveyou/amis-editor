/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { getSchemaTpl, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import tinyColor from 'tinycolor2';
import { i18n } from 'i18n-runtime';

function convertColor(value, format) {
  format = format.toLocaleLowerCase();
  function convert(v) {
    var color = tinyColor(v);
    if (!color.isValid()) {
      return '';
    }
    if (format !== 'rgba') {
      color.setAlpha(1);
    }
    switch (format) {
      case 'hex':
        return color.toHexString();
      case 'hsl':
        return color.toHslString();
      case 'rgb':
        return color.toRgbString();
      case 'rgba':
        var _a = color.toRgb(),
          r = _a.r,
          g = _a.g,
          b = _a.b,
          a = _a.a;
        return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      default:
        return color.toString();
    }
  }
  return Array.isArray(value) ? value.map(convert) : convert(value);
}
var presetColors = ['#ffffff', '#000000', '#d0021b', '#f5a623', '#f8e71c', '#7ED321', '#4A90E2', '#9013fe'];
var colorFormat = ['hex', 'rgb', 'rgba', 'hsl'];
var presetColorsByFormat = colorFormat.reduce(function (res, fmt) {
  res[fmt] = convertColor(presetColors, fmt);
  return res;
}, {});
var ColorControlPlugin = /** @class */function (_super) {
  __extends(ColorControlPlugin, _super);
  function ColorControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-color';
    _this.$schema = '/schemas/ColorControlSchema.json';
    // 组件名称
    _this.name = i18n("d1b5ad85ada6350ea1a1432b813700be");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-eyedropper';
    _this.pluginIcon = 'input-color-plugin';
    _this.description = i18n("5a9e72d006165ae3dacdbd96f931f70e");
    _this.docLink = '/amis/zh-CN/components/form/input-color';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-color',
      label: i18n("6b36c6f7ec834692ec6c8e3816349fdd"),
      name: 'color'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("d1b5ad85ada6350ea1a1432b813700be");
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var renderer = context.info.renderer;
      var formatOptions = colorFormat.map(function (value) {
        return {
          label: value.toUpperCase(),
          value: value
        };
      });
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), {
            type: 'select',
            label: i18n("db0258df1ddbd88749b335aecdc8425e"),
            name: 'format',
            value: 'hex',
            options: formatOptions,
            onChange: function (format, oldFormat, model, form) {
              var _a = form.data,
                value = _a.value,
                presetColors = _a.presetColors;
              if (value) {
                form.setValueByName('value', convertColor(value, format));
              }
              if (Array.isArray(presetColors)) {
                form.setValueByName('presetColors', convertColor(presetColors, format));
              }
            }
          }, __spreadArray([], __read(formatOptions.map(function (_a) {
            var value = _a.value;
            return _this.getConditionalColorPanel(value);
          })), false),
          // {
          //   label: '默认值',
          //   name: 'value',
          //   type: 'input-color',
          //   format: '${format}'
          // },
          getSchemaTpl('clearable'), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, {
          title: i18n("a47b08f4c83158a058c06e176cff501a"),
          body: __spreadArray([getSchemaTpl('switch', {
            label: tipedLabel(i18n("1b25b3b1b5076f0c2e6bd12d73c56f79"), i18n("9b161db0e2e749c1106c702c8097d380")),
            name: 'allowCustomColor',
            disabledOn: 'Array.isArray(presetColors) && presetColors.length === 0',
            pipeIn: function (value) {
              return typeof value === 'undefined' ? false : !value;
            },
            pipeOut: function (value) {
              return !value;
            }
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("05a64e0df1490a5db391e7a43eced6e0"), i18n("6cbabc9a4cc07c1e26bb131c02833f8d")),
            name: 'presetColors',
            onText: i18n("f1d4ff50f3828f9b73412e7d94e6dd6e"),
            offText: i18n("18c63459a2c069022c7790430f761214"),
            pipeIn: function (value) {
              return typeof value === 'undefined' ? false : true;
            },
            pipeOut: function (value, originValue, _a) {
              var _b = _a.format,
                format = _b === void 0 ? 'hex' : _b;
              return !value ? undefined : presetColorsByFormat[format];
            },
            onChange: function (colors, oldValue, model, form) {
              if (Array.isArray(colors) && colors.length === 0) {
                form.setValueByName('allowCustomColor', true);
              }
            }
          })], __read(formatOptions.map(function (_a) {
            var value = _a.value;
            return _this.getConditionalColorComb(value);
          })), false)
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.MultiSelect
        })], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
          configTitle: 'props'
        }))
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: renderer
        }), getSchemaTpl('style:classNames', {
          schema: [getSchemaTpl('className', {
            label: i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
            name: 'descriptionClassName',
            visibleOn: 'this.description'
          })]
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
  ColorControlPlugin.prototype.getConditionalColorPanel = function (format) {
    var visibleOnNoFormat = format === 'hex' ? ' || !this.format' : '';
    return {
      label: i18n("225f3ed00750ae78ad1e6ea42c8f5087"),
      name: 'value',
      type: 'input-color',
      format: format,
      clearable: true,
      visibleOn: "this.format===\"".concat(format, "\"").concat(visibleOnNoFormat),
      presetColors: presetColorsByFormat[format]
    };
  };
  ColorControlPlugin.prototype.getConditionalColorComb = function (format) {
    var visibleOnNoFormat = format === 'hex' ? ' || !this.format' : '';
    return getSchemaTpl('combo-container', {
      type: 'combo',
      mode: 'normal',
      name: 'presetColors',
      items: [{
        type: 'input-color',
        format: format,
        name: 'color',
        clearable: false,
        presetColors: presetColorsByFormat[format]
      }],
      draggable: false,
      multiple: true,
      visibleOn: "this.presetColors !== undefined && (this.format === \"".concat(format, "\"").concat(visibleOnNoFormat, ")"),
      onChange: function (colors, oldValue, model, form) {
        if (Array.isArray(colors) && colors.length === 0) {
          form.setValueByName('allowCustomColor', true);
        }
      },
      pipeIn: function (value) {
        return value.map(function (color, index) {
          if (color === void 0) {
            color = '';
          }
          return {
            key: "".concat(color, "-").concat(index),
            color: convertColor(color, format)
          };
        });
      },
      pipeOut: function (value) {
        return value.map(function (_a) {
          var _b = _a.color,
            color = _b === void 0 ? '' : _b;
          return color;
        });
      }
    });
  };
  ColorControlPlugin.id = 'ColorControlPlugin';
  ColorControlPlugin.scene = ['layout'];
  return ColorControlPlugin;
}(BasePlugin);
registerEditorPlugin(ColorControlPlugin);

export { ColorControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
