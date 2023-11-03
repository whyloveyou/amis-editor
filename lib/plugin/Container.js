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
var i18nRuntime = require('i18n-runtime');
var helper = require('../renderer/event-control/helper.js');

var ContainerPlugin = /** @class */function (_super) {
  tslib.__extends(ContainerPlugin, _super);
  function ContainerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'container';
    _this.$schema = '/schemas/ContainerSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("22c799040acdb2601b437ed5449de076");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("ded228f9173b241dd8df2a4811ea0e98");
    _this.tags = [i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc")];
    _this.order = -2;
    _this.icon = 'fa fa-square-o';
    _this.pluginIcon = 'container-plugin';
    _this.scaffold = {
      type: 'container',
      body: [],
      style: {
        position: 'static',
        display: 'block'
      },
      size: 'none',
      wrapperBody: false
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
    _this.panelTitle = i18nRuntime.i18n("22c799040acdb2601b437ed5449de076");
    _this.panelJustify = true;
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
      (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row' || (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row-reverse';
      // const isFlexContainer = this.manager?.isFlexContainer(context?.id);
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
            name: 'wrapperComponent',
            label: i18nRuntime.i18n("a823cfa70cfa46c788e1eedae043f6e5"),
            type: 'select',
            searchable: true,
            options: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'article', 'aside', 'code', 'footer', 'header', 'section'],
            pipeIn: amisEditorCore.defaultValue('div'),
            validations: {
              isAlphanumeric: true,
              matchRegexp: '/^(?!.*script).*$/' // 禁用一下script标签
            },

            validationErrors: {
              isAlpha: i18nRuntime.i18n("f7d64e5e79994c3c8853f2608d7b2d25"),
              matchRegexp: i18nRuntime.i18n("f7d64e5e79994c3c8853f2608d7b2d25")
            },
            validateOnChange: false
          }, amisEditorCore.getSchemaTpl('layout:padding')]
        }, {
          title: i18nRuntime.i18n("5aefca559c5a41d10078e21e6d616825"),
          body: tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([amisEditorCore.getSchemaTpl('layout:position', {
            visibleOn: '!data.stickyStatus'
          }), amisEditorCore.getSchemaTpl('layout:originPosition'), amisEditorCore.getSchemaTpl('layout:inset', {
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
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " || ").concat(isFlexItem, " && data.style.flex !== '0 0 150px'")
          }), amisEditorCore.getSchemaTpl('layout:min-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " || ").concat(isFlexItem, " && data.style.flex !== '0 0 150px'")
          }), amisEditorCore.getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " && (data.isFixedWidth || data.style && data.style.maxWidth)")
          }), !isFlexItem ? amisEditorCore.getSchemaTpl('layout:margin-center') : null, !isFlexItem && !isFreeContainer ? amisEditorCore.getSchemaTpl('layout:textAlign', {
            name: 'style.textAlign',
            label: i18nRuntime.i18n("a3221d2d224767df4afa7a8653ded8fe"),
            visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
          }) : null, amisEditorCore.getSchemaTpl('layout:z-index'), amisEditorCore.getSchemaTpl('layout:sticky', {
            visibleOn: 'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
          }), amisEditorCore.getSchemaTpl('layout:stickyPosition')], false)
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
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
  ContainerPlugin.id = 'ContainerPlugin';
  ContainerPlugin.scene = ['layout'];
  return ContainerPlugin;
}(amisEditorCore.LayoutBasePlugin);
amisEditorCore.registerEditorPlugin(ContainerPlugin);

exports.ContainerPlugin = ContainerPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
