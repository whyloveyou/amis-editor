/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
require('../../builder/constants.js');
require('lodash/isObjectLike');
require('../../builder/DSBuilder.js');
var DSBuilderManager = require('../../builder/DSBuilderManager.js');
require('../../builder/ApiDSBuilder.js');
var Table2 = require('../Table2.js');
var BaseCRUD = require('./BaseCRUD.js');
var i18nRuntime = require('i18n-runtime');

/**
 * @file CRUDTable.tsx
 * @desc 表格模式的 CRUD2
 */
var CRUDTablePlugin = /** @class */function (_super) {
  tslib.__extends(CRUDTablePlugin, _super);
  function CRUDTablePlugin(manager) {
    var _this = _super.call(this, manager, Table2.Table2RenderereEvent, Table2.Table2RendererAction) || this;
    _this.panelJustify = true;
    _this.multifactor = true;
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("cc6a173a3601403f2d96cae2180539b3");
    _this.order = -950;
    _this.$schema = '/schemas/CRUD2TableSchema.json';
    _this.docLink = '/amis/zh-CN/components/crud2';
    _this.previewSchema = _this.generatePreviewSchema('table2');
    _this.scaffold = _this.generateScaffold('table2');
    /** 非实体数据源走默认构建 */
    _this.panelBodyCreator = function (context) {
      return _this.baseCRUDPanelBody(context);
    };
    _this.dsManager = new DSBuilderManager.DSBuilderManager(manager);
    return _this;
  }
  CRUDTablePlugin.id = 'TableCRUDPlugin';
  return CRUDTablePlugin;
}(BaseCRUD.BaseCRUDPlugin);
amisEditorCore.registerEditorPlugin(CRUDTablePlugin);

exports.CRUDTablePlugin = CRUDTablePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
