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
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var PanelPlugin = /** @class */function (_super) {
  tslib.__extends(PanelPlugin, _super);
  function PanelPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'panel';
    _this.$schema = '/schemas/panelSchema.json';
    _this.name = i18nRuntime.i18n("cd6f79e7bff1337c12c86a15ceedd6da");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-window-maximize';
    _this.pluginIcon = 'panel-plugin';
    _this.description = i18nRuntime.i18n("e04a2f1662121e5a3c397d496114185b");
    _this.docLink = '/amis/zh-CN/components/panel';
    _this.tags = [i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc")];
    _this.scaffold = {
      type: 'panel',
      title: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
      body: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014")
    };
    _this.previewSchema = {
      type: 'panel',
      title: i18nRuntime.i18n("4e9bb0326ab4d3a2af94d901c7f1b6a7"),
      body: i18nRuntime.i18n("5bf5f1fd54476671bd6fd9d97e3e6b6b"),
      className: 'Panel--default text-left m-b-none',
      actions: [{
        label: i18nRuntime.i18n("e9d2f66bbd44c96a3e03494bf6b1ebf0"),
        type: 'button'
      }, {
        label: i18nRuntime.i18n("ce35a17d2ba7caac95092a7a66ac9a0d"),
        type: 'button'
      }]
    };
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      // 复写渲染器里面的 renderBody 方法
      renderMethod: 'renderBody',
      // 这个 case 很另类，要自己写。form 里面直接复用了 Panel 来输出内容。
      // 这种 case 应该跳过包裹 Region
      // 只有他自己输出时才包裹，form 调用进来是下发了 children 来完成渲染
      // 自己的话是其他方式。
      renderMethodOverride: function (regions, insertRegion) {
        return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var info = this.props.$$editor;
          var dom = this.super.apply(this, tslib.__spreadArray([], tslib.__read(args), false));
          if (info && !this.props.children) {
            return insertRegion(this, dom, regions, info, info.plugin.manager);
          }
          return dom;
        };
      }
    }, {
      key: 'actions',
      label: i18nRuntime.i18n("c8caf94205105bac5833ab31cc2129d7"),
      renderMethod: 'renderActions',
      preferTag: i18nRuntime.i18n("fa966345577ba81af19408f203db968f")
    }];
    _this.panelTitle = i18nRuntime.i18n("cd6f79e7bff1337c12c86a15ceedd6da");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var _a;
      var isForm = /(?:^|\/)form$/.test(context.path) || ((_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.type) === 'form';
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          className: 'p-none',
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('title'), isForm ? null : {
            children: React__default["default"].createElement(amis.Button, {
              size: "sm",
              level: "info",
              className: "m-b",
              onClick: function () {
                // this.manager.showInsertPanel('body')
                _this.manager.showRendererPanel('');
              },
              block: true
            }, i18nRuntime.i18n("cac3ba71180c97b1b6432833b3417d2c"))
          }]
        }, amisEditorCore.getSchemaTpl('status')])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          className: 'p-none',
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('switch', {
            name: 'affixFooter',
            label: i18nRuntime.i18n("1fae678397df046c1754092f15a71d98"),
            value: false
          }), amisEditorCore.getSchemaTpl('horizontal', {
            visibleOn: '(data.mode || data.$$formMode) == "horizontal" && data.$$mode == "form"'
          })]
        }, {
          className: 'p-none',
          title: i18nRuntime.i18n("68744acedf015b8cfc445af30583815e"),
          body: [amisEditorCore.getSchemaTpl('subFormItemMode', {
            label: i18nRuntime.i18n("5a0fbcaaeb439684bb4ae5be579e4cd4")
          }), amisEditorCore.getSchemaTpl('subFormHorizontalMode', {
            label: i18nRuntime.i18n("f99d7e5f15906ca78c45753ee3b04a8b")
          }), amisEditorCore.getSchemaTpl('subFormHorizontal')]
        }, {
          className: 'p-none',
          title: i18nRuntime.i18n("4434b33a8731a73613ba5fa1eb984efb"),
          body: [{
            name: isForm ? 'panelClassName' : 'className',
            label: i18nRuntime.i18n("9970ad07468267e2f309f1467c75bb80"),
            type: 'select',
            size: 'sm',
            pipeIn: function (value) {
              return typeof value === 'string' && /(?:^|\s)(Panel\-\-(\w+))(?:$|\s)/.test(value) ? RegExp.$1 : 'Panel--default';
            },
            pipeOut: function (value, origin) {
              return origin ? "".concat(origin.replace(/(?:^|\s)(Panel\-\-(\w+))(?=($|\s))/g, ''), " ").concat(value).replace(/\s+/g, ' ').trim() : value;
            },
            options: [{
              label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
              value: 'Panel--default'
            }, {
              label: i18nRuntime.i18n("fbae87bcc352f6933541fb77a07418ed"),
              value: 'Panel--primary'
            }, {
              label: i18nRuntime.i18n("02d9819ddaaaeb1b7b22b12608c7e5ca"),
              value: 'Panel--info'
            }, {
              label: i18nRuntime.i18n("330363dfc524cff2488f2ebde0500896"),
              value: 'Panel--success'
            }, {
              label: i18nRuntime.i18n("900c70fa5f7dbc014e6f762d5e0e885c"),
              value: 'Panel--warning'
            }, {
              label: i18nRuntime.i18n("540f84ddc0883866b229f71c2844199a"),
              value: 'Panel--danger'
            }]
          }, amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("5e5d3f13111593b2710673006d4c8297"),
            name: isForm ? 'panelClassName' : 'className',
            pipeIn: amisEditorCore.defaultValue('Panel--default')
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'headerClassName',
            label: i18nRuntime.i18n("65810a32a98f09be550b0c421df6c540")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'bodyClassName',
            label: i18nRuntime.i18n("33be689a0f0de129ce37f7a96052002e")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'footerClassName',
            label: i18nRuntime.i18n("f3b9889baa6d17ec63f05ea7d326bcfa")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'actionsClassName',
            label: i18nRuntime.i18n("da71dcbb13405815476cef28a8b9c4f6")
          })]
        }])]
      }])];
    };
    return _this;
  }
  PanelPlugin.prototype.buildEditorPanel = function (context, panels) {
    var plugin = this;
    var schema = context.schema;
    var store = this.manager.store;
    if (context.info.renderer.name === 'form' && schema.wrapWithPanel !== false && !context.selections.length && false) {
      /** Panel相关的配置融合到From中了 */
      panels.push({
        key: 'panel',
        icon: 'fa fa-list-alt',
        pluginIcon: plugin.pluginIcon,
        title: this.panelTitle,
        render: this.manager.makeSchemaFormRender({
          body: this.panelBodyCreator(context),
          panelById: store.activeId
        })
      });
    } else {
      _super.prototype.buildEditorPanel.call(this, context, panels);
    }
  };
  PanelPlugin.id = 'PanelPlugin';
  return PanelPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(PanelPlugin);

exports.PanelPlugin = PanelPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
