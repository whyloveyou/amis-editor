/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var sortBy = require('lodash/sortBy');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sortBy__default = /*#__PURE__*/_interopDefaultLegacy(sortBy);

var PaginationPlugin = /** @class */function (_super) {
  tslib.__extends(PaginationPlugin, _super);
  function PaginationPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'pagination';
    _this.$schema = '/schemas/PaginationSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("f59b11ff84daeb60b027dc02490b627a");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("7cfb5e222a5954e891fba6e3802c7ea6");
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-window-minimize';
    _this.lastLayoutSetting = ['pager'];
    _this.layoutOptions = [{
      text: i18nRuntime.i18n("9ed7d3adc032f6b78808e7f3786ec9cc"),
      value: 'total',
      checked: false
    }, {
      text: i18nRuntime.i18n("8e60090c332693095d5852d92ee149ee"),
      value: 'perPage',
      checked: false
    }, {
      text: i18nRuntime.i18n("3862626c138ce5945e0e273a1bdfbad0"),
      value: 'pager',
      checked: true
    }, {
      text: i18nRuntime.i18n("0059d50e3f7b2fe7f1822ccc218fed66"),
      value: 'go',
      checked: false
    }];
    _this.scaffold = {
      type: 'pagination',
      mode: 'normal',
      layout: ['pager'],
      activePage: 1,
      lastPage: 1,
      total: 1,
      hasNext: false,
      disabled: false,
      perPageAvailable: [10, 20, 50, 100],
      perPage: 10,
      maxButtons: 7
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = i18nRuntime.i18n("47c62ec10a240c35b8446cc923c5e8ef");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            name: 'mode',
            label: i18nRuntime.i18n("f0789e79d48f135e5d870753f7a85d05"),
            type: 'button-group-select',
            size: 'sm',
            pipeIn: amisEditorCore.defaultValue('normal'),
            options: [{
              label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
              value: 'normal'
            }, {
              label: i18nRuntime.i18n("b30f254eccefa14c9980235bcbec74f9"),
              value: 'simple'
            }]
          },
          // {
          //   name: 'hasNext',
          //   label: '是否有下一页',
          //   mode: 'row',
          //   inputClassName: 'inline-flex justify-between flex-row-reverse',
          //   type: 'switch',
          //   visibleOn: 'data.mode === "simple"'
          // },
          // {
          //   name: 'activePage',
          //   label: tipedLabel('当前页', '支持使用 \\${xxx} 来获取变量'),
          //   type: 'input-text'
          // },
          // {
          //   name: 'lastPage',
          //   label: tipedLabel('最后页码', '支持使用 \\${xxx} 来获取变量'),
          //   type: 'input-text',
          //   visibleOn: 'data.mode === "normal"'
          // },
          // {
          //   name: 'total',
          //   label: tipedLabel('总条数', '支持使用 \\${xxx} 来获取变量'),
          //   type: 'input-text',
          //   visibleOn: 'data.mode === "normal"'
          // },
          amisEditorCore.getSchemaTpl('combo-container', {
            name: 'layout',
            type: 'combo',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("07b59fd09f6007bac246d9a73b793a49"), i18nRuntime.i18n("41ed1e238b846005dfb0f087cbec644b")),
            visibleOn: '!data.mode || data.mode === "normal"',
            mode: 'normal',
            multiple: true,
            multiLine: false,
            addable: false,
            removable: false,
            draggable: true,
            editable: false,
            minLength: 1,
            tabsStyle: 'inline',
            formClassName: 'ae-pagination-layout-item',
            items: [{
              type: 'checkbox',
              name: 'checked',
              inputClassName: 'p-t-none mt-1.5'
            }, {
              type: 'tpl',
              name: 'text',
              className: 'inline-block pt-1.5'
            }],
            pipeIn: function (value) {
              if (typeof value === 'string') {
                value = value.split(',');
              } else if (!value || !Array.isArray(value)) {
                value = _this.lastLayoutSetting;
              }
              return sortBy__default["default"](_this.layoutOptions.map(function (op) {
                return tslib.__assign(tslib.__assign({}, op), {
                  checked: value.includes(op.value)
                });
              }), [function (item) {
                var idx = value.findIndex(function (v) {
                  return v === item.value;
                });
                return ~idx ? idx : Infinity;
              }]);
              // return this.layoutOptions.map(v => ({
              //   ...v,
              //   checked: value.includes(v.value)
              // }));
            },

            pipeOut: function (value) {
              _this.lastLayoutSetting = value.filter(function (v) {
                return v.checked;
              }).map(function (v) {
                return v.value;
              });
              return _this.lastLayoutSetting.concat();
            }
          }),
          // {
          //   name: 'showPerPage',
          //   label: '显示每页条数',
          //   mode: 'row',
          //   inputClassName: 'inline-flex justify-between flex-row-reverse',
          //   type: 'switch',
          //   visibleOn: 'data.mode === "normal"'
          // },
          amisEditorCore.getSchemaTpl('combo-container', {
            name: 'perPageAvailable',
            type: 'combo',
            label: i18nRuntime.i18n("71fa2ba926cd032c0ebe0bcdd5d3eb10"),
            visibleOn: '(!data.mode || data.mode === "normal") && data.layout && data.layout.includes("perPage")',
            mode: 'normal',
            multiple: true,
            multiLine: false,
            addable: true,
            removable: true,
            draggable: true,
            editable: true,
            minLength: 1,
            tabsStyle: 'inline',
            addButtonClassName: 'm-b-sm',
            items: [{
              type: 'input-number',
              name: 'value',
              min: 1
            }],
            pipeIn: function (value) {
              return (value === null || value === void 0 ? void 0 : value.map(function (v) {
                return {
                  value: v
                };
              })) || [10];
            },
            pipeOut: function (value) {
              var pages = value.map(function (v) {
                return v.value;
              });
              return pages.map(function (page) {
                return page || Math.max.apply(Math, tslib.__spreadArray([], tslib.__read(pages.filter(Boolean)), false)) + 5;
              });
            }
          }), {
            name: 'perPage',
            type: 'input-number',
            label: i18nRuntime.i18n("04519bf3bf428bb1a75938ac65dba040"),
            visibleOn: '(!data.mode || data.mode === "normal") && data.layout?.includes("perPage")'
          }, {
            name: 'maxButtons',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("040f05137eb37e880873a763ff653fe9"), i18nRuntime.i18n("2ee8eb6b1a80a4b025f97fca6afb800d")),
            type: 'input-number',
            min: 5,
            max: 20,
            pipeOut: function (value) {
              return value || 5;
            },
            visibleOn: '!data.mode || data.mode === "normal"'
          }]
        }, {
          title: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          body: [amisEditorCore.getSchemaTpl('disabled'), amisEditorCore.getSchemaTpl('hidden'), amisEditorCore.getSchemaTpl('visible')]
        }])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
    return _this;
  }
  PaginationPlugin.id = 'PaginationPlugin';
  return PaginationPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(PaginationPlugin);

exports.PaginationPlugin = PaginationPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
