/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { getSchemaTpl, defaultValue, LayoutBasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var WrapperPlugin = /** @class */function (_super) {
  __extends(WrapperPlugin, _super);
  function WrapperPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'wrapper';
    _this.$schema = '/schemas/WrapperSchema.json';
    _this.disabledRendererPlugin = true; // 组件面板不显示
    // 组件名称
    _this.name = i18n("8df7c8a1f9f579f0ddc35bb4ee50f166");
    _this.isBaseComponent = true;
    _this.description = i18n("de5e232d10e2fa6218259289d4de4835");
    _this.docLink = '/amis/zh-CN/components/wrapper';
    _this.tags = [i18n("22c799040acdb2601b437ed5449de076")];
    _this.icon = 'fa fa-square-o';
    _this.scaffold = {
      type: 'wrapper',
      body: i18n("2d711b09bd0db0ad240cc83b30dd8014")
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
    _this.panelTitle = i18n("8df7c8a1f9f579f0ddc35bb4ee50f166");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var _a, _b;
      var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
      // const isFlexContainer = this.manager?.isFlexContainer(context?.id);
      var isFlexItem = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
      var isFlexColumnItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        className: 'p-none',
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("5aefca559c5a41d10078e21e6d616825"),
          body: __spreadArray(__spreadArray([getSchemaTpl('layout:position', {
            visibleOn: '!data.stickyStatus'
          }), getSchemaTpl('layout:originPosition'), getSchemaTpl('layout:inset', {
            mode: 'vertical'
          }), getSchemaTpl('layout:display'), getSchemaTpl('layout:flex-setting', {
            visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")',
            direction: curRendererSchema.direction,
            justify: curRendererSchema.justify,
            alignItems: curRendererSchema.alignItems
          }), getSchemaTpl('layout:flex-wrap', {
            visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")'
          })], __read(isFlexItem ? [getSchemaTpl('layout:flex', {
            isFlexColumnItem: isFlexColumnItem,
            label: isFlexColumnItem ? i18n("f02f876ee64cc016d97fa4dc498d4857") : i18n("a170a375b264f7fe0c02a7ca8c268784"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
          }), getSchemaTpl('layout:flex-grow', {
            visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
          }), getSchemaTpl('layout:flex-basis', {
            label: isFlexColumnItem ? i18n("183f00df0922a6be371fea58cd46a60a") : i18n("f92626f9e56b3e2d0c47495a446acf71"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
          }), getSchemaTpl('layout:flex-basis', {
            label: isFlexColumnItem ? i18n("c19b79073b676b9bade80613aba2dbfa") : i18n("b591aed69defa2abf0486da6a58dfb5e"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
          })] : []), false), [getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(isFlexItem && !isFlexColumnItem, " && data.style.flex === '0 0 150px'")
          }), getSchemaTpl('layout:isFixedHeight', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem),
            onChange: function (value) {
              context === null || context === void 0 ? void 0 : context.node.setHeightMutable(value);
            }
          }), getSchemaTpl('layout:height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), getSchemaTpl('layout:max-height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), getSchemaTpl('layout:min-height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), getSchemaTpl('layout:overflow-y', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem, " && (data.isFixedHeight || data.style && data.style.maxHeight) || (").concat(isFlexItem && isFlexColumnItem, " && data.style.flex === '0 0 150px')")
          }), getSchemaTpl('layout:isFixedWidth', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem),
            onChange: function (value) {
              context === null || context === void 0 ? void 0 : context.node.setWidthMutable(value);
            }
          }), getSchemaTpl('layout:width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), getSchemaTpl('layout:max-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), getSchemaTpl('layout:min-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " && (data.isFixedWidth || data.style && data.style.maxWidth)")
          }), !isFlexItem ? getSchemaTpl('layout:margin-center') : null, !isFlexItem ? getSchemaTpl('layout:textAlign', {
            name: 'style.textAlign',
            label: i18n("a3221d2d224767df4afa7a8653ded8fe"),
            visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
          }) : null, getSchemaTpl('layout:z-index')], false)
        }, {
          title: i18n("f7e68bde2caa2cb5696d6a37fe4a23a4"),
          body: [getSchemaTpl('layout:padding')]
        }, getSchemaTpl('status')])]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: getSchemaTpl('collapseGroup', __spreadArray(__spreadArray([], __read(getSchemaTpl('style:common', ['layout'])), false), [{
          title: i18n("4434b33a8731a73613ba5fa1eb984efb"),
          body: [getSchemaTpl('className', {
            description: i18n("5db7ca044a5179bf05428b283ac0452c"),
            pipeIn: defaultValue('bg-white')
          })]
        }], false))
      }])];
    };
    return _this;
  }
  WrapperPlugin.id = 'WrapperPlugin';
  WrapperPlugin.scene = ['layout'];
  return WrapperPlugin;
}(LayoutBasePlugin);
registerEditorPlugin(WrapperPlugin);

export { WrapperPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
