/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var amisUi = require('amis-ui');
var cloneDeep = require('lodash/cloneDeep');
var pick = require('lodash/pick');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);

var StatusPlugin = /** @class */function (_super) {
  tslib.__extends(StatusPlugin, _super);
  function StatusPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'status';
    _this.$schema = '/schemas/StatusSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("44e13bdad8c7eb6391e84d940513b927");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("82a3047196be368be13dcdd2373520ff");
    _this.docLink = '/amis/zh-CN/components/status';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-check-square-o';
    _this.pluginIcon = 'status-plugin';
    _this.scaffold = {
      type: 'status',
      value: 1
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
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
      label: i18nRuntime.i18n("330363dfc524cff2488f2ebde0500896"),
      value: 'success',
      icon: 'success',
      status: 'success'
    }, {
      label: i18nRuntime.i18n("d679aea3aae1201e38c4baaaeef86efe"),
      value: 'pending',
      icon: 'rolling',
      status: 'pending'
    }, {
      label: i18nRuntime.i18n("e5ac1d2029adff17ec123b86ea07ce26"),
      value: 'queue',
      icon: 'warning',
      status: 'queue'
    }, {
      label: i18nRuntime.i18n("f406ef0ea3f09572835a9b1ec61f576a"),
      value: 'schedule',
      icon: 'schedule',
      status: 'schedule'
    }, {
      label: i18nRuntime.i18n("acd5cb847a4aff235c9a01ddeb6f9770"),
      value: 'fail',
      icon: 'fail',
      status: 'fail'
    }];
    _this.panelTitle = i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('combo-container', {
            type: 'combo',
            name: '__source',
            inputClassName: 'ae-Status-control',
            labelClassName: 'ae-Status-label',
            label: [i18nRuntime.i18n("774b2bcaca8a64f46c84b510cec89109"), {
              children: React__default["default"].createElement(amisUi.TooltipWrapper, {
                tooltipClassName: "ae-Status-default-icon-tooltip",
                trigger: "hover",
                rootClose: true,
                placement: "bottom",
                tooltip: {
                  children: function () {
                    return amis.render({
                      type: 'container',
                      body: [{
                        type: 'tpl',
                        tpl: i18nRuntime.i18n("391299a1c1722a777991a182a44bccbf"),
                        wrapperComponent: 'p',
                        className: 'ae-Status-default-icon-tip'
                      }, {
                        type: 'table',
                        data: {
                          items: _this.defaultSource
                        },
                        columns: [{
                          name: 'icon',
                          label: i18nRuntime.i18n("33563f1d3d203bc682069a8c85506b86")
                        }, {
                          name: 'label',
                          label: i18nRuntime.i18n("2cc90d2f2cd9ba213f9aace88c386f3f")
                        }, {
                          name: 'value',
                          label: i18nRuntime.i18n("aad245582dc9f55cf71e3934bb3b1709")
                        }, {
                          name: 'status',
                          label: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
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
              }, React__default["default"].createElement("div", {
                className: "ae-Status-label-tip-icon"
              }, React__default["default"].createElement(amisUi.Icon, {
                icon: "editor-help",
                className: "icon"
              })))
            }],
            mode: 'normal',
            multiple: true,
            items: [amisEditorCore.getSchemaTpl('icon', {
              label: '',
              placeholder: i18nRuntime.i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
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
                isRequired: i18nRuntime.i18n("2634cea5a95ece79e05b5a68c38cbd4d")
              }
            }, amisEditorCore.getSchemaTpl('theme:colorPicker', {
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
                var res_1 = cloneDeep__default["default"](source) || {};
                // 兼容旧版
                map && Object.entries(map).forEach(function (_a) {
                  var _b = tslib.__read(_a, 2),
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
                    res_1[value] = tslib.__assign(tslib.__assign({}, res_1[value]), {
                      icon: icon
                    });
                  }
                });
                labelMap && Object.entries(labelMap).forEach(function (_a) {
                  var _b = tslib.__read(_a, 2),
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
                    res_1[value] = tslib.__assign(tslib.__assign({}, res_1[value]), {
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
                  res[item.value] = pick__default["default"](item, ['label', 'color', 'icon']);
                }
              });
              form.setValues({
                map: undefined,
                labelMap: undefined,
                source: Object.keys(res).length > 0 ? res : undefined
              });
            }
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            pipeOut: function (value) {
              return value == null || value === '' ? undefined : value;
            }
          }), amisEditorCore.getSchemaTpl('placeholder', {
            label: i18nRuntime.i18n("4c1cff4d8c05daa6ed9352a241ee628c"),
            pipeIn: amisEditorCore.defaultValue('-')
          })]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("5e5d3f13111593b2710673006d4c8297")
          })]
        }])
      }])];
    };
    return _this;
  }
  StatusPlugin.id = 'StatusPlugin';
  StatusPlugin.scene = ['layout'];
  return StatusPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(StatusPlugin);

exports.StatusPlugin = StatusPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
