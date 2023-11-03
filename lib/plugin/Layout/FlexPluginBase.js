/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

var defaultFlexColumnSchema = function (title) {
  return {
    type: 'container',
    body: [],
    size: 'xs',
    style: {
      position: 'static',
      display: 'block',
      flex: '1 1 auto',
      flexGrow: 1,
      flexBasis: 'auto'
    },
    wrapperBody: false,
    isFixedHeight: false,
    isFixedWidth: false
  };
};
// 默认的布局容器Schema
var defaultFlexContainerSchema = {
  type: 'flex',
  className: 'p-1',
  items: [defaultFlexColumnSchema(i18nRuntime.i18n("ef5abdfc944546ddcbe10e9884cf5832")), defaultFlexColumnSchema(i18nRuntime.i18n("874fdb7b3a5730910a4de1c58220c337")), defaultFlexColumnSchema(i18nRuntime.i18n("3a76596e73fa265257ce90b7bed684c7"))],
  style: {
    position: 'relative'
  }
};
var FlexPluginBase = /** @class */function (_super) {
  tslib.__extends(FlexPluginBase, _super);
  function FlexPluginBase() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.rendererName = 'flex';
    _this.$schema = '/schemas/FlexSchema.json';
    _this.disabledRendererPlugin = false;
    _this.name = i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc");
    _this.order = -1200;
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-columns';
    _this.pluginIcon = 'flex-container-plugin';
    _this.description = i18nRuntime.i18n("03097563d201ad3a29c79165226764e5");
    _this.docLink = '/amis/zh-CN/components/flex';
    _this.tags = [i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc")];
    _this.scaffold = defaultFlexContainerSchema;
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = i18nRuntime.i18n("b1b98c19058af70d8bd499e1899e93bc");
    _this.panelJustify = true; // 右侧配置项默认左右展示
    _this.panelBodyCreator = function (context) {
      var _a, _b, _c;
      var curRendererSchema = (context === null || context === void 0 ? void 0 : context.schema) || {};
      (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row' || (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row-reverse';
      (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexContainer(context === null || context === void 0 ? void 0 : context.id);
      var isFlexItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
      var isFlexColumnItem = (_c = _this.manager) === null || _c === void 0 ? void 0 : _c.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
      // 判断是否为吸附容器
      var isSorptionContainer = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.isSorptionContainer) || false;
      var positionTpl = [amisEditorCore.getSchemaTpl('layout:position', {
        visibleOn: '!data.stickyStatus'
      }), amisEditorCore.getSchemaTpl('layout:originPosition'), amisEditorCore.getSchemaTpl('layout:inset', {
        mode: 'vertical'
      })];
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("5aefca559c5a41d10078e21e6d616825"),
          body: tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([isSorptionContainer ? amisEditorCore.getSchemaTpl('layout:sorption') : null], tslib.__read(isSorptionContainer ? [] : positionTpl), false), [amisEditorCore.getSchemaTpl('layout:flex-setting', {
            label: i18nRuntime.i18n("98204720c30a843a9234bdf22dc05d51"),
            direction: curRendererSchema.direction,
            justify: curRendererSchema.justify,
            alignItems: curRendererSchema.alignItems
          }), amisEditorCore.getSchemaTpl('layout:flex-wrap')], false), tslib.__read(isFlexItem ? [amisEditorCore.getSchemaTpl('layout:flex', {
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
          }), !isFlexItem ? amisEditorCore.getSchemaTpl('layout:margin-center') : null, amisEditorCore.getSchemaTpl('layout:z-index'), !isSorptionContainer && amisEditorCore.getSchemaTpl('layout:sticky', {
            visibleOn: 'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
          }), amisEditorCore.getSchemaTpl('layout:stickyPosition')], false)
        }, amisEditorCore.getSchemaTpl('status')])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout']
        })), false))
      }])];
    };
    _this.regions = [{
      key: 'items',
      label: i18nRuntime.i18n("a4611da51ffee9140976d01668e45d45")
    }];
    return _this;
  }
  FlexPluginBase.prototype.buildEditorToolbar = function (_a, toolbars) {
    var _this = this;
    var _b, _c, _d, _e, _f, _g;
    var id = _a.id,
      info = _a.info,
      schema = _a.schema;
    var store = this.manager.store;
    var parent = store.getSchemaParentById(id);
    var draggableContainer = this.manager.draggableContainer(id);
    var isFlexItem = (_b = this.manager) === null || _b === void 0 ? void 0 : _b.isFlexItem(id);
    var isFlexColumnItem = (_c = this.manager) === null || _c === void 0 ? void 0 : _c.isFlexColumnItem(id);
    var newColumnSchema = defaultFlexColumnSchema(i18nRuntime.i18n("e151c86d57096bb74dcd390ade29362b"));
    var canAppendSiblings = (_d = this.manager) === null || _d === void 0 ? void 0 : _d.canAppendSiblings();
    var toolbarsTooltips = {};
    toolbars.forEach(function (toolbar) {
      if (toolbar.tooltip) {
        toolbarsTooltips[toolbar.tooltip] = 1;
      }
    });
    if (parent && (((_e = info.renderer) === null || _e === void 0 ? void 0 : _e.name) === 'flex' || ((_f = info.renderer) === null || _f === void 0 ? void 0 : _f.name) === 'container') && !draggableContainer && !(schema === null || schema === void 0 ? void 0 : schema.isFreeContainer)) {
      // 非特殊布局元素（fixed、absolute）支持前后插入追加布局元素功能icon
      // 备注：如果是列级元素不需要显示
      if (!toolbarsTooltips[i18nRuntime.i18n("dbb93e8f413074ead24b6ed822247d98")] && !isFlexItem && canAppendSiblings) {
        toolbars.push({
          iconSvg: 'add-btn',
          tooltip: i18nRuntime.i18n("dbb93e8f413074ead24b6ed822247d98"),
          level: 'special',
          placement: 'right',
          className: 'ae-InsertBefore is-vertical',
          onClick: function () {
            return _this.manager.appendSiblingSchema(defaultFlexContainerSchema, true, true);
          }
        }, {
          iconSvg: 'add-btn',
          tooltip: i18nRuntime.i18n("5b5765b3fd7e72e04a5cd3e2ef6218a4"),
          level: 'special',
          placement: 'right',
          className: 'ae-InsertAfter is-vertical',
          onClick: function () {
            return _this.manager.appendSiblingSchema(defaultFlexContainerSchema, false, true);
          }
        });
      }
      // 布局容器 右上角插入子元素
      if (((_g = info.renderer) === null || _g === void 0 ? void 0 : _g.name) === 'flex') {
        if (!toolbarsTooltips[i18nRuntime.i18n("31f84d1bc6175fd0828a81b5bfd98736")]) {
          toolbars.push({
            iconSvg: 'add-btn',
            tooltip: i18nRuntime.i18n("31f84d1bc6175fd0828a81b5bfd98736"),
            level: 'special',
            placement: 'bottom',
            className: 'ae-AppendChild',
            onClick: function () {
              return _this.manager.addElem(newColumnSchema);
            }
          });
        }
      }
    }
    if (parent && (parent.type === 'flex' || parent.type === 'container') && isFlexItem && !draggableContainer && canAppendSiblings) {
      if (!toolbarsTooltips["".concat(isFlexColumnItem ? i18nRuntime.i18n("14c495b1248756310c75396cd41f4fe9") : i18nRuntime.i18n("39a2cb79c6d9762783e20522ea86dcff"), "\u63D2\u5165\u5217\u7EA7\u5BB9\u5668")]) {
        // 布局容器的列级元素 增加左右插入icon
        toolbars.push({
          iconSvg: 'add-btn',
          tooltip: "".concat(isFlexColumnItem ? i18nRuntime.i18n("14c495b1248756310c75396cd41f4fe9") : i18nRuntime.i18n("39a2cb79c6d9762783e20522ea86dcff"), "\u63D2\u5165\u5217\u7EA7\u5BB9\u5668"),
          level: 'special',
          placement: 'right',
          className: isFlexColumnItem ? 'ae-InsertBefore is-vertical' : 'ae-InsertBefore',
          onClick: function () {
            return _this.manager.appendSiblingSchema(newColumnSchema, true, true);
          }
        }, {
          iconSvg: 'add-btn',
          tooltip: "".concat(isFlexColumnItem ? i18nRuntime.i18n("e33ac3a4c1a95a02a18f1555038804da") : i18nRuntime.i18n("de2a774bf98944b8f0ec8755d5f59d64"), "\u63D2\u5165\u5217\u7EA7\u5BB9\u5668"),
          level: 'special',
          placement: isFlexColumnItem ? 'right' : 'left',
          className: isFlexColumnItem ? 'ae-InsertAfter is-vertical' : 'ae-InsertAfter',
          onClick: function () {
            return _this.manager.appendSiblingSchema(newColumnSchema, false, true);
          }
        });
      }
    }
  };
  FlexPluginBase.prototype.afterResolveJsonSchema = function (event) {
    var _a, _b;
    var context = event.context;
    var parent = (_a = context.node.parent) === null || _a === void 0 ? void 0 : _a.host;
    if (((_b = parent === null || parent === void 0 ? void 0 : parent.info) === null || _b === void 0 ? void 0 : _b.plugin) === this) {
      event.setData('/schemas/FlexColumn.json');
    }
  };
  FlexPluginBase.id = 'FlexPluginBase';
  return FlexPluginBase;
}(amisEditorCore.LayoutBasePlugin);

exports.FlexPluginBase = FlexPluginBase;
exports.defaultFlexColumnSchema = defaultFlexColumnSchema;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
