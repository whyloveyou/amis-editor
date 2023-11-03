/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChartConfigEditor = function (_a) {
  var value = _a.value,
    onChange = _a.onChange;
  return React__default["default"].createElement("div", {
    className: "ae-JsonEditor"
  }, React__default["default"].createElement(amisEditorCore.CodeEditor, {
    value: value,
    onChange: onChange
  }));
};
var DEFAULT_EVENT_PARAMS = [{
  type: 'object',
  properties: {
    data: {
      type: 'object',
      title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
      properties: {
        componentType: {
          type: 'string',
          title: 'componentType'
        },
        seriesType: {
          type: 'string',
          title: 'seriesType'
        },
        seriesIndex: {
          type: 'number',
          title: 'seriesIndex'
        },
        seriesName: {
          type: 'string',
          title: 'seriesName'
        },
        name: {
          type: 'string',
          title: 'name'
        },
        dataIndex: {
          type: 'number',
          title: 'dataIndex'
        },
        data: {
          type: 'object',
          title: 'data'
        },
        dataType: {
          type: 'string',
          title: 'dataType'
        },
        value: {
          type: 'number',
          title: 'value'
        },
        color: {
          type: 'string',
          title: 'color'
        }
      }
    }
  }
}];
var chartDefaultConfig = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line'
  }],
  backgroundColor: 'transparent'
};
var ChartPlugin = /** @class */function (_super) {
  tslib.__extends(ChartPlugin, _super);
  function ChartPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'chart';
    _this.$schema = '/schemas/ChartSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("d09504750ebc1d75c38d86e16060f83d");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("10e14f791d73c7c0f4113787f36f1626");
    _this.docLink = '/amis/zh-CN/components/chart';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-pie-chart';
    _this.pluginIcon = 'chart-plugin';
    _this.scaffold = {
      type: 'chart',
      config: chartDefaultConfig,
      replaceChartOption: true
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    // 事件定义
    _this.events = [{
      eventName: 'init',
      eventLabel: i18nRuntime.i18n("2cb472ff9cad0c89a033c53996b52053"),
      description: i18nRuntime.i18n("76ddcc0ad85aa4be6875b73244a64faf"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            description: i18nRuntime.i18n("85f1708454f409855d552f702ac27b19")
          }
        }
      }]
    }, {
      eventName: 'click',
      eventLabel: i18nRuntime.i18n("2ea6f1f33dec7cb3c23a1bf1f9eab11a"),
      description: i18nRuntime.i18n("fe9228649853d08eebee72ad5521a3dd"),
      dataSchema: DEFAULT_EVENT_PARAMS
    }, {
      eventName: 'mouseover',
      eventLabel: i18nRuntime.i18n("728c7cdfa431821d291b5108394ec65a"),
      description: i18nRuntime.i18n("a643d2fe12d205eb8fb5cffe92f62c35"),
      dataSchema: DEFAULT_EVENT_PARAMS
    }, {
      eventName: 'legendselectchanged',
      eventLabel: i18nRuntime.i18n("764c134791952dd1acb0f23587e75421"),
      description: i18nRuntime.i18n("262cd2f688751332c1907a659e686210"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              name: {
                type: 'string',
                title: 'name'
              },
              selected: {
                type: 'object',
                title: 'selected'
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'reload',
      actionLabel: i18nRuntime.i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18nRuntime.i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }
    // 特性动作太多了，这里先不加了，可以通过写代码配置
    ];

    _this.panelTitle = i18nRuntime.i18n("d09504750ebc1d75c38d86e16060f83d");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('name')]
        }, {
          title: i18nRuntime.i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
          body: [
          /*
          {
            type: 'select',
            name: 'chartDataType',
            label: '数据获取方式',
            value: 'json',
            onChange(value: any, oldValue: any, model: any, form: any) {
              if (value === 'json') {
                form.setValueByName('api', undefined);
                form.setValueByName('config', chartDefaultConfig);
              } else {
                form.setValueByName('config', undefined);
              }
            },
            options: [
              {
                label: '接口数据',
                value: 'dataApi'
              },
              {
                label: '静态JSON数据',
                value: 'json'
              }
            ]
          },
          */
          amisEditorCore.getSchemaTpl('apiControl', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("31f8a7a967286a16eb404e3ba237619e"), i18nRuntime.i18n("eabda74dd2ac5b4e6eab9229e0e63f79")),
            mode: 'normal'
            // visibleOn: 'chartDataType === "dataApi"'
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("1396ebc166bd49c1e3b67549a1b4caa0"),
            name: 'initFetch',
            // visibleOn: 'chartDataType === "dataApi" && data.api',
            visibleOn: 'data.api.url',
            pipeIn: amisEditorCore.defaultValue(true)
          }), {
            name: 'interval',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("2af32ab13a9dece315cec2764d6aa7d4"), i18nRuntime.i18n("bc827aaffaa35a95607346cc104c0785")),
            type: 'input-number',
            step: 500,
            // visibleOn: 'chartDataType === "dataApi" && data.api',
            visibleOn: 'data.api.url',
            unitOptions: ['ms']
          }, amisEditorCore.getSchemaTpl('expressionFormulaControl', {
            evalMode: false,
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("59688d1a484179aef8edc0ccbabb9fc1"), i18nRuntime.i18n("3fd81a573ea309b203ab019c1aa95a2c")),
            name: 'trackExpression',
            placeholder: '\\${xxx}'
          }), {
            name: 'config',
            asFormItem: true,
            // visibleOn: 'chartDataType === "json"',
            component: ChartConfigEditor,
            mode: 'normal',
            // type: 'json-editor',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("57c7d1125d2803b946a5b25c3f80f249"), i18nRuntime.i18n("3d3fa75d8b345b22a5fbd14a65a0af71"))
          }, {
            name: 'dataFilter',
            type: 'ae-functionEditorControl',
            allowFullscreen: true,
            mode: 'normal',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("d0d852432ce09f627e6ae471b3f86b0a"), i18nRuntime.i18n("06e89ed3cb501da6d57e35bc28a37089")),
            renderLabel: true,
            params: [{
              label: 'config',
              tip: i18nRuntime.i18n("f25c9fd2852b85502157decbedd19082")
            }, {
              label: 'echarts',
              tip: i18nRuntime.i18n("2695f318db820c2bfe4c886fed3697f0")
            }, {
              label: 'data',
              tip: i18nRuntime.i18n("b76e25de5689ea51af0688d0ea6d7b39")
            }],
            placeholder: "debugger; // \u53EF\u4EE5\u6D4F\u89C8\u5668\u4E2D\u65AD\u70B9\u8C03\u8BD5\n\n// \u67E5\u770B\u539F\u59CB\u6570\u636E\nconsole.log(config)\n\n// \u8FD4\u56DE\u65B0\u7684\u7ED3\u679C \nreturn {}"
          }, amisEditorCore.getSchemaTpl('switch', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("d98ef182637b4d10e16e8073c1101e51"), i18nRuntime.i18n("e8f96ea47cb322f4f1a4c938c7b155ac")),
            name: 'replaceChartOption'
          })]
        }, {
          title: i18nRuntime.i18n("e732f4c0d8075670b6c75cc52bd1f7d5"),
          body: [{
            name: 'clickAction',
            asFormItem: true,
            label: false,
            children: function (_a) {
              var onChange = _a.onChange,
                value = _a.value;
              return React__default["default"].createElement("div", {
                className: "m-b"
              }, React__default["default"].createElement(amis.Button, {
                size: "sm",
                level: value ? 'danger' : 'info',
                onClick: _this.editDrillDown.bind(_this, context.id)
              }, i18nRuntime.i18n("43ddd80698198791d4a738bb20a2d7f4")), value ? React__default["default"].createElement(amis.Button, {
                size: "sm",
                level: "link",
                className: "m-l",
                onClick: function () {
                  return onChange('');
                }
              }, i18nRuntime.i18n("c8da43fe6ad1c537f86cecb353250145")) : null);
            }
          }]
        }, amisEditorCore.getSchemaTpl('status')])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([{
          title: i18nRuntime.i18n("00958a92c5804d56047c18fc206382e1"),
          body: [amisEditorCore.getSchemaTpl('style:widthHeight', {
            widthSchema: {
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c28479019e24e0e4745f4948e9e97ee7"), i18nRuntime.i18n("51ad722113289f70b6d77c78ddf0c64a")),
              pipeIn: amisEditorCore.defaultValue('100%')
            },
            heightSchema: {
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c1df04eec5fa0857bc0df2d68d8e953c"), i18nRuntime.i18n("b3e991d11b9f0ee04f55627c62d4fcba")),
              pipeIn: amisEditorCore.defaultValue('300px')
            }
          })]
        }], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout']
        })), false))
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }])];
    };
    return _this;
  }
  ChartPlugin.prototype.editDrillDown = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var dialog = value.clickAction && value.clickAction.dialog || {
      title: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
      body: [i18nRuntime.i18n("40128a51e9667fe6a20a0454069368ba")]
    };
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("7e3f6245e2a6adb903cf85c77cb1bbd7"),
      value: tslib.__assign({
        type: 'container'
      }, dialog),
      slot: {
        type: 'container',
        body: '$$'
      },
      typeMutable: false,
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          clickAction: {
            actionType: 'dialog',
            dialog: newValue
          }
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      }
    });
  };
  ChartPlugin.id = 'ChartPlugin';
  return ChartPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ChartPlugin);

exports.ChartPlugin = ChartPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
