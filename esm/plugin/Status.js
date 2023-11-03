/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __read } from 'tslib';
import React__default from 'react';
import { render } from 'amis';
import { getI18nEnabled, getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { TooltipWrapper, Icon } from 'amis-ui';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import { i18n } from 'i18n-runtime';

var StatusPlugin = /** @class */function (_super) {
  __extends(StatusPlugin, _super);
  function StatusPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'status';
    _this.$schema = '/schemas/StatusSchema.json';
    // 组件名称
    _this.name = i18n("44e13bdad8c7eb6391e84d940513b927");
    _this.isBaseComponent = true;
    _this.description = i18n("82a3047196be368be13dcdd2373520ff");
    _this.docLink = '/amis/zh-CN/components/status';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-check-square-o';
    _this.pluginIcon = 'status-plugin';
    _this.scaffold = {
      type: 'status',
      value: 1
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.defaultSource = [{
      label: '-',
      value: '0',
      icon: 'fail',
      status: 0
    }, {
      label: '-',
      value: '1',
      icon: 'success',
      status: 1
    }, {
      label: i18n("330363dfc524cff2488f2ebde0500896"),
      value: 'success',
      icon: 'success',
      status: 'success'
    }, {
      label: i18n("d679aea3aae1201e38c4baaaeef86efe"),
      value: 'pending',
      icon: 'rolling',
      status: 'pending'
    }, {
      label: i18n("e5ac1d2029adff17ec123b86ea07ce26"),
      value: 'queue',
      icon: 'warning',
      status: 'queue'
    }, {
      label: i18n("f406ef0ea3f09572835a9b1ec61f576a"),
      value: 'schedule',
      icon: 'schedule',
      status: 'schedule'
    }, {
      label: i18n("acd5cb847a4aff235c9a01ddeb6f9770"),
      value: 'fail',
      icon: 'fail',
      status: 'fail'
    }];
    _this.panelTitle = i18n("3fea7ca76cdece641436d7ab0d02ab1b");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = getI18nEnabled();
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('combo-container', {
            type: 'combo',
            name: '__source',
            inputClassName: 'ae-Status-control',
            labelClassName: 'ae-Status-label',
            label: [i18n("774b2bcaca8a64f46c84b510cec89109"), {
              children: React__default.createElement(TooltipWrapper, {
                tooltipClassName: "ae-Status-default-icon-tooltip",
                trigger: "hover",
                rootClose: true,
                placement: "bottom",
                tooltip: {
                  children: function () {
                    return render({
                      type: 'container',
                      body: [{
                        type: 'tpl',
                        tpl: i18n("391299a1c1722a777991a182a44bccbf"),
                        wrapperComponent: 'p',
                        className: 'ae-Status-default-icon-tip'
                      }, {
                        type: 'table',
                        data: {
                          items: _this.defaultSource
                        },
                        columns: [{
                          name: 'icon',
                          label: i18n("33563f1d3d203bc682069a8c85506b86")
                        }, {
                          name: 'label',
                          label: i18n("2cc90d2f2cd9ba213f9aace88c386f3f")
                        }, {
                          name: 'value',
                          label: i18n("aad245582dc9f55cf71e3934bb3b1709")
                        }, {
                          name: 'status',
                          label: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
                          type: 'mapping',
                          map: {
                            '*': {
                              type: 'status'
                            }
                          }
                        }]
                      }]
                    });
                  }
                }
              }, React__default.createElement("div", {
                className: "ae-Status-label-tip-icon"
              }, React__default.createElement(Icon, {
                icon: "editor-help",
                className: "icon"
              })))
            }],
            mode: 'normal',
            multiple: true,
            items: [getSchemaTpl('icon', {
              label: '',
              placeholder: i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
              onChange: function (value, oldValue, model, form) {
                // 选择图标时自动填充label
                if (value && value.name) {
                  form.setValues({
                    label: value.name
                  });
                }
              }
            }), {
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              name: 'label',
              placeholder: 'label'
            }, {
              type: 'input-text',
              name: 'value',
              placeholder: 'value',
              unique: true,
              required: true,
              validationErrors: {
                isRequired: i18n("2634cea5a95ece79e05b5a68c38cbd4d")
              }
            }, getSchemaTpl('theme:colorPicker', {
              label: '',
              name: 'color'
            })],
            pipeIn: function (value, _a) {
              var data = _a.data;
              // 首次进入，将schema 转换为 combo的数据
              if (value === undefined) {
                var map = data.map,
                  labelMap = data.labelMap,
                  source = data.source;
                var res_1 = cloneDeep(source) || {};
                // 兼容旧版
                map && Object.entries(map).forEach(function (_a) {
                  var _b = __read(_a, 2),
                    value = _b[0],
                    icon = _b[1];
                  if (value === '' || value == null || value === '$$id') {
                    return;
                  }
                  if (!res_1[value]) {
                    res_1[value] = {
                      icon: icon
                    };
                  } else {
                    res_1[value] = __assign(__assign({}, res_1[value]), {
                      icon: icon
                    });
                  }
                });
                labelMap && Object.entries(labelMap).forEach(function (_a) {
                  var _b = __read(_a, 2),
                    value = _b[0],
                    label = _b[1];
                  if (value === '' || value == null) {
                    return;
                  }
                  if (!res_1[value]) {
                    res_1[value] = {
                      label: label
                    };
                  } else {
                    res_1[value] = __assign(__assign({}, res_1[value]), {
                      label: label
                    });
                  }
                });
                Object.keys(res_1).forEach(function (key, index) {
                  var item = res_1[key];
                  if (!('key' in item)) {
                    item.key = key;
                  }
                  if (!('value' in item)) {
                    item.value = key;
                  }
                });
                return Object.values(res_1);
              } else {
                // 后续可以直接使用value
                return value;
              }
            },
            onChange: function (value, oldValue, model, form) {
              var res = {};
              value.forEach(function (item) {
                if (item.value !== '' && item.value != null) {
                  res[item.value] = pick(item, ['label', 'color', 'icon']);
                }
              });
              form.setValues({
                map: undefined,
                labelMap: undefined,
                source: Object.keys(res).length > 0 ? res : undefined
              });
            }
          }), getSchemaTpl('valueFormula', {
            pipeOut: function (value) {
              return value == null || value === '' ? undefined : value;
            }
          }), getSchemaTpl('placeholder', {
            label: i18n("4c1cff4d8c05daa6ed9352a241ee628c"),
            pipeIn: defaultValue('-')
          })]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [getSchemaTpl('className', {
            label: i18n("5e5d3f13111593b2710673006d4c8297")
          })]
        }])
      }])];
    };
    return _this;
  }
  StatusPlugin.id = 'StatusPlugin';
  StatusPlugin.scene = ['layout'];
  return StatusPlugin;
}(BasePlugin);
registerEditorPlugin(StatusPlugin);

export { StatusPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
