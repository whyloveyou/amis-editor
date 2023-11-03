/**
 * @file CRUDTable.tsx
 * @desc 表格模式的 CRUD2
 */
import { __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { DSBuilderManager } from '../../builder';
import { Table2RenderereEvent, Table2RendererAction } from '../Table2';
import { BaseCRUDPlugin } from './BaseCRUD';
var CRUDTablePlugin = /** @class */ (function (_super) {
    __extends(CRUDTablePlugin, _super);
    function CRUDTablePlugin(manager) {
        var _this = _super.call(this, manager, Table2RenderereEvent, Table2RendererAction) || this;
        _this.panelJustify = true;
        _this.multifactor = true;
        _this.isBaseComponent = true;
        _this.description = '用来实现对数据的增删改查，用来展示表格数据，可以配置列信息，然后关联数据便能完成展示。支持嵌套、超级表头、列固定、表头固顶、合并单元格等等。';
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
}(BaseCRUDPlugin));
export { CRUDTablePlugin };
registerEditorPlugin(CRUDTablePlugin);
