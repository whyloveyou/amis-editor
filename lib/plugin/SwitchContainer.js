/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
require('../renderer/event-control/index.js');
var React = require('react');
var i18nRuntime = require('i18n-runtime');
var helper = require('../renderer/event-control/helper.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SwitchContainerPlugin = /** @class */function (_super) {
  tslib.__extends(SwitchContainerPlugin, _super);
  function SwitchContainerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'switch-container';
    _this.$schema = '/schemas/SwitchContainerSchema.json';
    // 组件名称
    _this.name = '状态容器';
    _this.isBaseComponent = true;
    _this.description = '根据状态进行组件条件渲染的容器，方便设计多状态组件';
    _this.tags = [i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc")];
    _this.order = -2;
    _this.icon = 'fa fa-square-o';
    _this.pluginIcon = 'switch-container-plugin';
    _this.scaffold = {
      type: 'switch-container',
      items: [{
        title: '状态一',
        body: [{
          type: 'tpl',
          tpl: '状态一内容',
          wrapperComponent: ''
        }]
      }, {
        title: '状态二',
        body: [{
          type: 'tpl',
          tpl: '状态二内容',
          wrapperComponent: ''
        }]
      }],
      style: {
        position: 'static',
        display: 'block'
      }
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
    _this.panelTitle = '状态容器';
    _this.panelJustify = true;
    _this.vRendererConfig = {
      regions: {
        body: {
          key: 'body',
          label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
          placeholder: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          wrapperResolve: function (dom) {
            return dom;
          }
        }
      },
      panelTitle: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
      panelJustify: true,
      panelBodyCreator: function (context) {
        return amisEditorCore.getSchemaTpl('tabs', [{
          title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
          body: amisEditorCore.getSchemaTpl('collapseGroup', [{
            title: i18nRuntime.i18n("0796ba76b4b553687e5ffaeb78512ccb"),
            body: [{
              name: 'title',
              label: '状态名称',
              type: 'input-text',
              required: true
            }, amisEditorCore.getSchemaTpl('expressionFormulaControl', {
              evalMode: false,
              label: '状态条件',
              name: 'visibleOn',
              placeholder: '\\${xxx}'
            })]
          }])
        }]);
      }
    };
    _this.wrapperProps = {
      unmountOnExit: true,
      mountOnEnter: true
    };
    _this.stateWrapperResolve = function (dom) {
      return dom;
    };
    _this.overrides = {
      renderBody: function (item) {
        var _a, _b;
        var dom = this.super(item);
        var info = this.props.$$editor;
        var items = this.props.items || [];
        var index = items.findIndex(function (cur) {
          return cur.$$id === item.$$id;
        });
        if (!info || !info.plugin) {
          return dom;
        }
        var plugin = info.plugin;
        var id = item.$$id;
        var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.body;
        return React__default["default"].createElement(amisEditorCore.VRenderer, {
          type: info.type,
          plugin: info.plugin,
          renderer: info.renderer,
          multifactor: true,
          key: id,
          //$schema="/schemas/ListBodyField.json"
          hostId: info.id,
          memberIndex: index,
          name: "".concat(item.title || i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b").concat(index + 1)),
          id: id,
          draggable: false,
          wrapperResolve: plugin.stateWrapperResolve,
          schemaPath: "".concat(info.schemaPath, "/items/").concat(index),
          path: "".concat(this.props.$path, "/").concat(index),
          data: this.props.data
        }, region ? React__default["default"].createElement(amisEditorCore.RegionWrapper, {
          key: region.key,
          preferTag: region.preferTag,
          name: region.key,
          label: region.label,
          regionConfig: region,
          placeholder: region.placeholder,
          editorStore: plugin.manager.store,
          manager: plugin.manager,
          children: dom,
          wrapperResolve: region.wrapperResolve,
          rendererName: info.renderer.name
        }) : dom);
      }
    };
    // 事件定义
    _this.events = [{
      eventName: 'click',
      eventLabel: i18nRuntime.i18n("4363c17ebb346b646af55bd8c8075915"),
      description: i18nRuntime.i18n("7af5e3ef39ff71d39fe3f645c8079124"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseenter',
      eventLabel: i18nRuntime.i18n("f6d767f39ba3bf955077a3c0ce81e581"),
      description: i18nRuntime.i18n("bcdd89d453da0dc0622a2f3189728357"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseleave',
      eventLabel: i18nRuntime.i18n("e272b0b8c7fedc670a87075514d9b49f"),
      description: i18nRuntime.i18n("727309bc724ff237c5e2cdf7a90cf28e"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }];
    _this.panelBodyCreator = function (context) {
      var _a, _b;
      var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
      var isFreeContainer = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.isFreeContainer) || false;
      var isFlexItem = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
      var isFlexColumnItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
      var displayTpl = [amisEditorCore.getSchemaTpl('layout:display'), amisEditorCore.getSchemaTpl('layout:flex-setting', {
        visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")',
        direction: curRendererSchema.direction,
        justify: curRendererSchema.justify,
        alignItems: curRendererSchema.alignItems
      }), amisEditorCore.getSchemaTpl('layout:flex-wrap', {
        visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")'
      })];
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'ae-listItemControl',
            mode: 'normal',
            name: 'items',
            label: '状态列表',
            addTip: '新增组件状态',
            items: [{
              type: 'input-text',
              placeholder: i18nRuntime.i18n("b4fdf79b8f54856b072ec3874b830d1f"),
              label: '状态名称',
              mode: 'horizontal',
              name: 'title'
            }, amisEditorCore.getSchemaTpl('expressionFormulaControl', {
              name: 'visibleOn',
              mode: 'horizontal',
              label: '显示条件'
            })],
            scaffold: {
              title: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
              body: [{
                type: 'tpl',
                tpl: '状态内容',
                wrapperComponent: '',
                inline: false
              }]
            }
          }]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([{
          title: i18nRuntime.i18n("5aefca559c5a41d10078e21e6d616825"),
          body: tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([amisEditorCore.getSchemaTpl('layout:originPosition'), amisEditorCore.getSchemaTpl('layout:inset', {
            mode: 'vertical'
          })], tslib.__read(!isFreeContainer ? displayTpl : []), false), tslib.__read(isFlexItem ? [amisEditorCore.getSchemaTpl('layout:flex', {
            isFlexColumnItem: isFlexColumnItem,
            label: isFlexColumnItem ? i18nRuntime.i18n("f02f876ee64cc016d97fa4dc498d4857") : i18nRuntime.i18n("a170a375b264f7fe0c02a7ca8c268784"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
          }), amisEditorCore.getSchemaTpl('layout:flex-grow', {
            visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
          }), amisEditorCore.getSchemaTpl('layout:flex-basis', {
            label: isFlexColumnItem ? i18nRuntime.i18n("183f00df0922a6be371fea58cd46a60a") : i18nRuntime.i18n("f92626f9e56b3e2d0c47495a446acf71"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
          }), amisEditorCore.getSchemaTpl('layout:flex-basis', {
            label: isFlexColumnItem ? i18nRuntime.i18n("c19b79073b676b9bade80613aba2dbfa") : i18nRuntime.i18n("b591aed69defa2abf0486da6a58dfb5e"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
          })] : []), false), [amisEditorCore.getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(isFlexItem && !isFlexColumnItem, " && data.style.flex === '0 0 150px'")
          }), amisEditorCore.getSchemaTpl('layout:isFixedHeight', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem),
            onChange: function (value) {
              context === null || context === void 0 ? void 0 : context.node.setHeightMutable(value);
            }
          }), amisEditorCore.getSchemaTpl('layout:height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:max-height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:min-height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:overflow-y', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem, " && (data.isFixedHeight || data.style && data.style.maxHeight) || (").concat(isFlexItem && isFlexColumnItem, " && data.style.flex === '0 0 150px')")
          }), amisEditorCore.getSchemaTpl('layout:isFixedWidth', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem),
            onChange: function (value) {
              context === null || context === void 0 ? void 0 : context.node.setWidthMutable(value);
            }
          }), amisEditorCore.getSchemaTpl('layout:width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:max-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:min-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " && (data.isFixedWidth || data.style && data.style.maxWidth)")
          }), !isFlexItem ? amisEditorCore.getSchemaTpl('layout:margin-center') : null, !isFlexItem && !isFreeContainer ? amisEditorCore.getSchemaTpl('layout:textAlign', {
            name: 'style.textAlign',
            label: i18nRuntime.i18n("a3221d2d224767df4afa7a8653ded8fe"),
            visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
          }) : null, amisEditorCore.getSchemaTpl('layout:z-index'), amisEditorCore.getSchemaTpl('layout:sticky', {
            visibleOn: 'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
          }), amisEditorCore.getSchemaTpl('layout:stickyPosition')], false)
        }], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout']
        })), false))
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
  /**
   * 补充切换的 toolbar
   * @param context
   * @param toolbars
   */
  SwitchContainerPlugin.prototype.buildEditorToolbar = function (context, toolbars) {
    if (context.info.plugin === this && context.info.renderer.name === 'switch-container' && !context.info.hostId) {
      var node_1 = context.node;
      toolbars.unshift({
        icon: 'fa fa-chevron-right',
        tooltip: '下个状态',
        onClick: function () {
          var control = node_1.getComponent();
          if (control === null || control === void 0 ? void 0 : control.switchTo) {
            var index = control.state.activeIndex < 0 ? 0 : control.state.activeIndex;
            control.switchTo(index + 1);
          }
        }
      });
      toolbars.unshift({
        icon: 'fa fa-chevron-left',
        tooltip: '上个状态',
        onClick: function () {
          var control = node_1.getComponent();
          if (control === null || control === void 0 ? void 0 : control.switchTo) {
            var index = control.state.activeIndex;
            control.switchTo(index - 1);
          }
        }
      });
    }
  };
  SwitchContainerPlugin.id = 'SwitchContainerPlugin';
  SwitchContainerPlugin.scene = ['layout'];
  return SwitchContainerPlugin;
}(amisEditorCore.LayoutBasePlugin);
amisEditorCore.registerEditorPlugin(SwitchContainerPlugin);

exports.SwitchContainerPlugin = SwitchContainerPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
