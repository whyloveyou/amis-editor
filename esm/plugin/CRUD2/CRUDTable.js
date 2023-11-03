/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { registerEditorPlugin } from 'amis-editor-core';
import '../../builder/constants.js';
import 'lodash/isObjectLike';
import '../../builder/DSBuilder.js';
import { DSBuilderManager } from '../../builder/DSBuilderManager.js';
import '../../builder/ApiDSBuilder.js';
import { Table2RenderereEvent, Table2RendererAction } from '../Table2.js';
import { BaseCRUDPlugin } from './BaseCRUD.js';
import { i18n } from 'i18n-runtime';

/**
 * @file CRUDTable.tsx
 * @desc 表格模式的 CRUD2
 */
var CRUDTablePlugin = /** @class */function (_super) {
  __extends(CRUDTablePlugin, _super);
  function CRUDTablePlugin(manager) {
    var _this = _super.call(this, manager, Table2RenderereEvent, Table2RendererAction) || this;
    _this.panelJustify = true;
    _this.multifactor = true;
    _this.isBaseComponent = true;
    _this.description = i18n("cc6a173a3601403f2d96cae2180539b3");
    _this.order = -950;
    _this.$schema = '/schemas/CRUD2TableSchema.json';
    _this.docLink = '/amis/zh-CN/components/crud2';
    _this.previewSchema = _this.generatePreviewSchema('table2');
    _this.scaffold = _this.generateScaffold('table2');
    /** 非实体数据源走默认构建 */
    _this.panelBodyCreator = function (context) {
      return _this.baseCRUDPanelBody(context);
    };
    _this.dsManager = new DSBuilderManager(manager);
    return _this;
  }
  CRUDTablePlugin.id = 'TableCRUDPlugin';
  return CRUDTablePlugin;
}(BaseCRUDPlugin);
registerEditorPlugin(CRUDTablePlugin);

export { CRUDTablePlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
