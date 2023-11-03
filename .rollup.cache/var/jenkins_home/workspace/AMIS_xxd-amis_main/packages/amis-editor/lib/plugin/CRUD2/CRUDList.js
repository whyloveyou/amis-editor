/**
 * @file CRUDList.tsx
 * @desc 列表模式的 CRUD2
 */
import { __decorate, __extends, __metadata } from "tslib";
import { autobind } from 'amis';
import { BuildPanelEventContext } from 'amis-editor-core';
import { DSBuilderManager, DSFeatureEnum } from '../../builder';
import { Table2RenderereEvent, Table2RendererAction } from '../Table2';
import { BaseCRUDPlugin } from './BaseCRUD';
var CRUDListPlugin = /** @class */ (function (_super) {
    __extends(CRUDListPlugin, _super);
    function CRUDListPlugin(manager) {
        var _this = _super.call(this, manager, Table2RenderereEvent, Table2RendererAction) || this;
        _this.disabledRendererPlugin = true;
        _this.name = '列表';
        _this.icon = 'fa fa-list';
        _this.panelIcon = 'fa fa-list';
        _this.subPanelIcon = 'fa fa-list';
        _this.pluginIcon = 'list-plugin';
        _this.panelJustify = true;
        _this.multifactor = true;
        _this.isBaseComponent = true;
        _this.description = '围绕列表的数据增删改查. 负责数据的拉取，分页，单条操作，批量操作，排序，快速编辑等等功能，集成查询条件。';
        _this.order = -1000;
        _this.$schema = '/schemas/CRUD2ListSchema.json';
        _this.docLink = '/amis/zh-CN/components/crud2';
        _this.previewSchema = _this.generatePreviewSchema('list');
        _this.scaffold = _this.generateScaffold('list');
        /** 非实体数据源走默认构建 */
        _this.panelBodyCreator = function (context) {
            /** 先写入动态控件 */
            _this.dynamicControls = {
                /** 列配置 */
                columns: function (context) { return _this.renderColumnsControl(context); },
                /** 工具栏配置 */
                toolbar: function (context) { return _this.renderToolbarCollapse(context); },
                /** 搜索栏 */
                filters: function (context) { return _this.renderFiltersCollapse(context); }
            };
            return _this.baseCRUDPanelBody(context);
        };
        _this.dsManager = new DSBuilderManager(manager);
        return _this;
    }
    CRUDListPlugin.prototype.renderColumnsControl = function (context) {
        var builder = this.dsManager.getBuilderBySchema(context.node.schema);
        return {
            title: '列设置',
            order: 5,
            body: [
                {
                    type: 'ae-crud-column-control',
                    name: 'columns',
                    nodeId: context.id,
                    builder: builder
                }
            ]
        };
    };
    CRUDListPlugin.prototype.renderToolbarCollapse = function (context) {
        var builder = this.dsManager.getBuilderBySchema(context.node.schema);
        return {
            order: 20,
            title: '工具栏',
            body: [
                {
                    type: 'ae-crud-toolbar-control',
                    name: 'headerToolbar',
                    nodeId: context.id,
                    builder: builder
                }
            ]
        };
    };
    CRUDListPlugin.prototype.renderFiltersCollapse = function (context) {
        var builder = this.dsManager.getBuilderBySchema(context.node.schema);
        var collection = [];
        builder.features.forEach(function (feat) {
            if (/Query$/.test(feat)) {
                collection.push({
                    type: 'ae-crud-filters-control',
                    name: feat === DSFeatureEnum.SimpleQuery ||
                        feat === DSFeatureEnum.AdvancedQuery
                        ? 'filter'
                        : feat === DSFeatureEnum.FuzzyQuery
                            ? 'headerToolbar'
                            : undefined,
                    label: feat === DSFeatureEnum.SimpleQuery
                        ? '简单查询'
                        : feat === DSFeatureEnum.AdvancedQuery
                            ? '高级查询'
                            : '模糊查询',
                    nodeId: context.id,
                    feat: feat,
                    builder: builder
                });
            }
        });
        return collection.length > 0
            ? {
                order: 10,
                title: '搜索设置',
                body: collection
            }
            : undefined;
    };
    var _a, _b, _c;
    CRUDListPlugin.id = 'ListCRUDPlugin';
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_a = typeof BuildPanelEventContext !== "undefined" && BuildPanelEventContext) === "function" ? _a : Object]),
        __metadata("design:returntype", void 0)
    ], CRUDListPlugin.prototype, "renderColumnsControl", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof BuildPanelEventContext !== "undefined" && BuildPanelEventContext) === "function" ? _b : Object]),
        __metadata("design:returntype", void 0)
    ], CRUDListPlugin.prototype, "renderToolbarCollapse", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_c = typeof BuildPanelEventContext !== "undefined" && BuildPanelEventContext) === "function" ? _c : Object]),
        __metadata("design:returntype", void 0)
    ], CRUDListPlugin.prototype, "renderFiltersCollapse", null);
    return CRUDListPlugin;
}(BaseCRUDPlugin));
export { CRUDListPlugin };
// registerEditorPlugin(CRUDListPlugin);
