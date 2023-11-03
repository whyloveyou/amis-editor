/**
 * @file BaseCRUD
 * @desc CRUD2 配置面板的基类
 */
import { __assign, __awaiter, __decorate, __extends, __generator, __metadata, __read, __spreadArray } from "tslib";
import React from 'react';
import isFunction from 'lodash/isFunction';
import flattenDeep from 'lodash/flattenDeep';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import { toast, autobind, isObject } from 'amis';
import { BasePlugin, defaultValue, getSchemaTpl, tipedLabel } from 'amis-editor-core';
import { DSBuilderManager, DSFeatureEnum, ModelDSBuilderKey, ApiDSBuilderKey } from '../../builder';
import { getEventControlConfig, getArgsWrapper } from '../../renderer/event-control/helper';
import { deepRemove, findSchema } from './utils';
import { ToolsConfig, FiltersConfig, OperatorsConfig } from './constants';
var BaseCRUDPlugin = /** @class */ (function (_super) {
    __extends(BaseCRUDPlugin, _super);
    function BaseCRUDPlugin(manager, events, actions) {
        var _this = _super.call(this, manager) || this;
        _this.rendererName = 'crud2';
        _this.name = '表格2.0';
        _this.panelTitle = '表格2.0';
        _this.subPanelTitle = '表格2.0';
        _this.icon = 'fa fa-table';
        _this.panelIcon = 'fa fa-table';
        _this.subPanelIcon = 'fa fa-table';
        _this.pluginIcon = 'table-plugin';
        _this.panelJustify = true;
        _this.multifactor = true;
        _this.order = -1000;
        _this.$schema = '/schemas/CRUD2Schema.json';
        _this.docLink = '/amis/zh-CN/components/crud2';
        _this.tags = ['数据容器'];
        _this._dynamicControls = {
            /** 列配置 */
            columns: function (context) { return _this.renderColumnsControl(context); },
            /** 工具栏配置 */
            toolbar: function (context) { return _this.renderToolbarCollapse(context); },
            /** 搜索栏 */
            filters: function (context) { return _this.renderFiltersCollapse(context); },
            /** 主键 */
            primaryField: function (context) { return getSchemaTpl('primaryField'); }
        };
        /** CRUD公共配置面板 */
        _this.baseCRUDPanelBody = function (context) {
            return getSchemaTpl('tabs', [
                _this.renderPropsTab(context),
                _this.renderStylesTab(context),
                _this.renderEventTab(context)
            ]);
        };
        /** 重新构建 API */
        _this.panelFormPipeOut = function (schema) { return __awaiter(_this, void 0, void 0, function () {
            var entity, builder, updatedSchema, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        entity = (_a = schema === null || schema === void 0 ? void 0 : schema.api) === null || _a === void 0 ? void 0 : _a.entity;
                        if (!entity || (schema === null || schema === void 0 ? void 0 : schema.dsType) !== ModelDSBuilderKey) {
                            return [2 /*return*/, schema];
                        }
                        builder = this.dsManager.getBuilderBySchema(schema);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, builder.buildApiSchema({
                                schema: schema,
                                renderer: 'crud',
                                sourceKey: 'api'
                            })];
                    case 2:
                        updatedSchema = _b.sent();
                        return [2 /*return*/, updatedSchema];
                    case 3:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, schema];
                }
            });
        }); };
        _this.emptyContainer = function (align, body) {
            if (body === void 0) { body = []; }
            return ({
                type: 'container',
                body: body,
                wrapperBody: false,
                style: __assign({ flexGrow: 1, flex: '1 1 auto', position: 'static', display: 'flex', flexBasis: 'auto', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'stretch' }, (align
                    ? {
                        justifyContent: align === 'left' ? 'flex-start' : 'flex-end'
                    }
                    : {}))
            });
        };
        _this.emptyFlex = function (items) {
            if (items === void 0) { items = []; }
            return ({
                type: 'flex',
                items: items,
                style: {
                    position: 'static'
                },
                direction: 'row',
                justify: 'flex-start',
                alignItems: 'stretch'
            });
        };
        /** 生成预览 Schema */
        _this.generatePreviewSchema = function (mode) {
            var columnSchema = [
                {
                    label: 'Engine',
                    name: 'engine'
                },
                {
                    label: 'Browser',
                    name: 'browser'
                },
                {
                    name: 'version',
                    label: 'Version'
                }
            ];
            var actionSchema = {
                type: 'button',
                level: 'link',
                icon: 'fa fa-eye',
                actionType: 'dialog',
                dialog: {
                    title: '查看详情',
                    body: {
                        type: 'form',
                        body: [
                            {
                                label: 'Engine',
                                name: 'engine',
                                type: 'static'
                            },
                            {
                                name: 'browser',
                                label: 'Browser',
                                type: 'static'
                            },
                            {
                                name: 'version',
                                label: 'Version',
                                type: 'static'
                            }
                        ]
                    }
                }
            };
            var itemSchema = mode === 'cards'
                ? { card: { body: columnSchema, actions: actionSchema } }
                : mode === 'list'
                    ? {
                        listItem: {
                            body: {
                                type: 'hbox',
                                columns: columnSchema
                            }
                        },
                        actions: actionSchema
                    }
                    : {
                        columns: columnSchema.concat([
                            {
                                name: 'operation',
                                title: '操作',
                                buttons: [actionSchema]
                            }
                        ])
                    };
            return __assign({ type: 'crud2', mode: mode, source: '$items', data: {
                    items: [
                        {
                            engine: 'Trident',
                            browser: 'Internet Explorer 4.0',
                            platform: 'Win 95+',
                            version: '4',
                            grade: 'X'
                        }
                    ]
                } }, itemSchema);
        };
        _this.dsManager = new DSBuilderManager(manager);
        _this.events = uniqBy(__spreadArray([], __read((events || [])), false), 'eventName');
        _this.actions = uniqBy(__spreadArray([
            {
                actionType: 'search',
                actionLabel: '数据查询',
                description: '使用指定条件完成列表数据查询',
                descDetail: function (info) {
                    return (React.createElement("div", null,
                        React.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.__rendererLabel),
                        "\u89E6\u53D1\u6570\u636E\u67E5\u8BE2"));
                },
                schema: getArgsWrapper({
                    name: 'query',
                    label: '查询条件',
                    type: 'ae-formulaControl',
                    variables: '${variables}',
                    size: 'md',
                    mode: 'horizontal'
                })
            },
            {
                actionType: 'loadMore',
                actionLabel: '加载更多',
                description: '加载更多条数据到列表容器',
                descDetail: function (info) {
                    return (React.createElement("div", null,
                        React.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.__rendererLabel),
                        "\u52A0\u8F7D\u66F4\u591A\u6570\u636E"));
                }
            },
            {
                actionType: 'startAutoRefresh',
                actionLabel: '启动自动刷新',
                description: '启动自动刷新'
            },
            {
                actionType: 'stopAutoRefresh',
                actionLabel: '停止自动刷新',
                description: '停止自动刷新'
            }
        ], __read((actions || [])), false), 'actionType');
        return _this;
    }
    Object.defineProperty(BaseCRUDPlugin.prototype, "scaffoldForm", {
        get: function () {
            var _this = this;
            return {
                title: "".concat(this.name, "\u521B\u5EFA\u5411\u5BFC"),
                mode: {
                    mode: 'horizontal',
                    horizontal: {
                        leftFixed: 'sm'
                    }
                },
                className: 'ae-Scaffold-Modal ae-Scaffold-Modal--CRUD ae-Scaffold-Modal-content AMISCSSWrapper',
                stepsBody: true,
                canSkip: true,
                canRebuild: true,
                body: [
                    {
                        title: '数据配置',
                        body: __spreadArray(__spreadArray([
                            /** 数据源选择 */
                            this.dsManager.getDSSelectorSchema({
                                onChange: function (value, oldValue, model, form) {
                                    if (value !== oldValue) {
                                        var data = form.data;
                                        Object.keys(data).forEach(function (key) {
                                            var _a, _b;
                                            if (((_a = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _a === void 0 ? void 0 : _a.endsWith('fields')) ||
                                                ((_b = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _b === void 0 ? void 0 : _b.endsWith('api'))) {
                                                form.deleteValueByName(key);
                                            }
                                        });
                                        form.deleteValueByName('__fields');
                                        form.deleteValueByName('__relations');
                                    }
                                    return value;
                                }
                            })
                        ], __read(this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                            return {
                                type: 'container',
                                visibleOn: "!data.dsType || data.dsType === '".concat(builderKey, "'"),
                                body: flattenDeep([
                                    builder.makeSourceSettingForm({
                                        feat: DSFeatureEnum.List,
                                        renderer: 'crud',
                                        inScaffold: true,
                                        sourceSettings: {
                                            userOrders: true
                                        }
                                    }),
                                    builder.makeFieldsSettingForm({
                                        feat: DSFeatureEnum.List,
                                        renderer: 'crud',
                                        inScaffold: true
                                    })
                                ])
                            };
                        })), false), [
                            getSchemaTpl('primaryField', {
                                visibleOn: "!data.dsType || data.dsType !== '".concat(ModelDSBuilderKey, "'")
                            })
                        ], false)
                    },
                    {
                        title: '功能配置',
                        body: __spreadArray(__spreadArray([], __read(this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                            return {
                                type: 'container',
                                visibleOn: "dsType == null || dsType === '".concat(builderKey, "'"),
                                body: [
                                    {
                                        type: 'checkboxes',
                                        label: '工具栏',
                                        name: ToolsConfig.groupName,
                                        joinValues: false,
                                        extractValue: true,
                                        multiple: true,
                                        options: ToolsConfig.options.filter(function (item) {
                                            return builder.filterByFeat(item.value);
                                        })
                                    },
                                    {
                                        type: 'checkboxes',
                                        label: '条件查询',
                                        name: FiltersConfig.groupName,
                                        multiple: true,
                                        joinValues: false,
                                        extractValue: true,
                                        options: FiltersConfig.options.filter(function (item) {
                                            return builder.filterByFeat(item.value);
                                        })
                                    },
                                    {
                                        type: 'checkboxes',
                                        label: '数据操作',
                                        name: OperatorsConfig.groupName,
                                        multiple: true,
                                        joinValues: false,
                                        extractValue: true,
                                        options: OperatorsConfig.options.filter(function (item) {
                                            return builder.filterByFeat(item.value);
                                        })
                                    },
                                    // 占位，最后一个form item没有间距
                                    {
                                        type: 'container'
                                    }
                                ]
                            };
                        })), false), [
                            /** 各场景字段设置 */
                            {
                                type: 'tabs',
                                tabsMode: 'vertical',
                                className: 'ae-Scaffold-Modal-tabs',
                                tabs: this.getScaffoldFeatureTab()
                            }
                        ], false)
                    }
                ],
                /** 用于重新构建的数据回填 */
                pipeIn: function (schema) { return __awaiter(_this, void 0, void 0, function () {
                    var dsType, builder, config;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                dsType = (_a = schema === null || schema === void 0 ? void 0 : schema.dsType) !== null && _a !== void 0 ? _a : this.dsManager.getDefaultBuilderKey();
                                builder = this.dsManager.getBuilderByKey(dsType);
                                if (!builder) {
                                    return [2 /*return*/, { dsType: dsType }];
                                }
                                return [4 /*yield*/, builder.guessCRUDScaffoldConfig({ schema: schema })];
                            case 1:
                                config = _b.sent();
                                return [2 /*return*/, __assign({}, config)];
                        }
                    });
                }); },
                pipeOut: function (config) { return __awaiter(_this, void 0, void 0, function () {
                    var scaffold, builder, schema;
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                scaffold = cloneDeep(this.scaffold);
                                builder = this.dsManager.getBuilderByScaffoldSetting(config);
                                if (!builder) {
                                    return [2 /*return*/, scaffold];
                                }
                                return [4 /*yield*/, builder.buildCRUDSchema({
                                        feats: uniq(__spreadArray(__spreadArray(__spreadArray([
                                            DSFeatureEnum.List
                                        ], __read(((_a = config.tools) !== null && _a !== void 0 ? _a : [])), false), __read(((_b = config.filters) !== null && _b !== void 0 ? _b : [])), false), __read(((_c = config.operators) !== null && _c !== void 0 ? _c : [])), false).filter(Boolean)),
                                        renderer: 'crud',
                                        inScaffold: true,
                                        entitySource: config === null || config === void 0 ? void 0 : config.entitySource,
                                        fallbackSchema: scaffold,
                                        scaffoldConfig: config
                                    })];
                            case 1:
                                schema = _d.sent();
                                /** 脚手架构建的 Schema 加个标识符，避免addChild替换 Schema ID */
                                schema.__origin = 'scaffold';
                                return [2 /*return*/, schema];
                        }
                    });
                }); },
                validate: function (data, form) {
                    var feat = DSFeatureEnum.List;
                    var builder = _this.dsManager.getBuilderByScaffoldSetting(data);
                    var featValue = builder === null || builder === void 0 ? void 0 : builder.getFeatValueByKey(feat);
                    var fieldsKey = "".concat(featValue, "Fields");
                    var errors = {};
                    if ((data === null || data === void 0 ? void 0 : data.dsType) === ModelDSBuilderKey ||
                        (builder === null || builder === void 0 ? void 0 : builder.key) === ModelDSBuilderKey) {
                        return errors;
                    }
                    var fieldErrors = false;
                    // FieldSetting.validator(form.data[fieldsKey]);
                    if (fieldErrors) {
                        errors[fieldsKey] = fieldErrors;
                    }
                    return errors;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    /** 各场景字段设置 Schema */
    BaseCRUDPlugin.prototype.getScaffoldFeatureTab = function () {
        var _this = this;
        var tabs = [];
        [
            {
                groupName: '',
                options: [
                    {
                        label: '列表展示',
                        value: 'List',
                        icon: 'fa fa-list'
                    }
                ]
            },
            ToolsConfig,
            FiltersConfig,
            OperatorsConfig
        ].forEach(function (group) {
            group.options.forEach(function (item, index) {
                _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                    if (!builder.features.includes(item.value)) {
                        return null;
                    }
                    var tabContent = builderKey === ModelDSBuilderKey
                        ? __spreadArray([], __read(builder.makeFieldsSettingForm({
                            feat: item.value,
                            renderer: 'crud',
                            inScaffold: true
                        })), false) : __spreadArray(__spreadArray([], __read((item.value === 'Edit'
                        ? /** CRUD的编辑单条需要初始化接口 */ builder.makeSourceSettingForm({
                            feat: item.value,
                            renderer: 'crud',
                            inScaffold: true,
                            sourceKey: 'initApi'
                        })
                        : !['List', 'SimpleQuery'].includes(item.value)
                            ? builder.makeSourceSettingForm({
                                feat: item.value,
                                renderer: 'crud',
                                inScaffold: true
                            })
                            : [])), false), __read(builder.makeFieldsSettingForm({
                        feat: item.value,
                        renderer: 'crud',
                        inScaffold: true,
                        fieldSettings: {
                            renderLabel: false
                        }
                    })), false);
                    if (!tabContent || tabContent.length === 0) {
                        return null;
                    }
                    var groupName = group.groupName;
                    var extraVisibleOn = groupName
                        ? "data[\"".concat(groupName, "\"] && ~data['").concat(groupName, "'].indexOf('").concat(item.value, "')")
                        : true;
                    tabs.push({
                        title: item.label,
                        icon: item.icon,
                        visibleOn: "(!data.dsType || data.dsType === '".concat(builderKey, "') && ").concat(extraVisibleOn),
                        body: tabContent
                            .filter(Boolean)
                            .map(function (formItem) { return (__assign(__assign({}, formItem), { mode: 'normal' })); })
                    });
                    return;
                });
            });
        });
        return tabs;
    };
    Object.defineProperty(BaseCRUDPlugin.prototype, "dynamicControls", {
        /** 需要动态控制的控件 */
        get: function () {
            return this._dynamicControls;
        },
        set: function (controls) {
            if (!controls || !isObject(controls)) {
                throw new Error('[amis-editor][CRUD2Plugin] dynamicControls的值必须是一个对象');
            }
            this._dynamicControls = __assign(__assign({}, this._dynamicControls), controls);
        },
        enumerable: false,
        configurable: true
    });
    /** 拆解一下 CURD 的基础面板配置，方便不同 mode 下模块化组合 */
    /** 属性面板 */
    BaseCRUDPlugin.prototype.renderPropsTab = function (context) {
        /** 动态加载的配置集合 */
        var dc = this.dynamicControls;
        return {
            title: '属性',
            className: 'p-none',
            body: [
                getSchemaTpl('collapseGroup', [
                    /** 基本配置类别 */
                    this.renderBasicPropsCollapse(context),
                    /** 列设置类别 */
                    isFunction(dc.columns) ? dc.columns(context) : dc.columns,
                    /** 搜索类别 */
                    isFunction(dc.filters) ? dc.filters(context) : dc.filters,
                    /** 工具栏类别 */
                    isFunction(dc.toolbar) ? dc.toolbar(context) : dc.toolbar,
                    /** 分页类别 */
                    this.renderPaginationCollapse(context),
                    /** 其他类别 */
                    this.renderOthersCollapse(context),
                    /** 状态类别 */
                    {
                        title: '状态',
                        body: [getSchemaTpl('hidden'), getSchemaTpl('visible')]
                    }
                ].filter(Boolean))
            ]
        };
    };
    /** 基础配置 */
    BaseCRUDPlugin.prototype.renderBasicPropsCollapse = function (context) {
        var _this = this;
        var _a;
        /** 动态加载的配置集合 */
        var dc = this.dynamicControls;
        /** 数据源控件 */
        var generateDSControls = function () {
            /** 数据源类型 */
            var dsTypeSelector = _this.dsManager.getDSSelectorSchema({
                type: 'select',
                label: '数据源',
                onChange: function (value, oldValue, model, form) {
                    if (value !== oldValue) {
                        var data = form.data;
                        Object.keys(data).forEach(function (key) {
                            var _a, _b;
                            if (((_a = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _a === void 0 ? void 0 : _a.endsWith('fields')) ||
                                ((_b = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _b === void 0 ? void 0 : _b.endsWith('api'))) {
                                form.deleteValueByName(key);
                            }
                        });
                        form.deleteValueByName('__fields');
                        form.deleteValueByName('__relations');
                    }
                    return value;
                }
            }, { schema: context === null || context === void 0 ? void 0 : context.schema, sourceKey: 'api' });
            /** 默认数据源类型 */
            var defaultDsType = dsTypeSelector.value;
            /** 数据源配置 */
            var dsSettings = _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                return {
                    type: 'container',
                    visibleOn: "data.dsType == null ? '".concat(builderKey, "' === '").concat(defaultDsType || ApiDSBuilderKey, "' : data.dsType === '").concat(builderKey, "'"),
                    body: builder.makeSourceSettingForm({
                        feat: 'List',
                        renderer: 'crud',
                        inScaffold: false,
                        sourceSettings: {
                            userOrders: true
                        }
                    }),
                    /** 因为会使用 container 包裹，所以加一个 margin-bottom */
                    className: 'mb-3'
                };
            });
            return __spreadArray([dsTypeSelector], __read(dsSettings), false);
        };
        return {
            title: '基本',
            order: 1,
            body: __spreadArray(__spreadArray([], __read(generateDSControls()), false), [
                /** 主键配置，TODO：支持联合主键 */
                (_a = dc === null || dc === void 0 ? void 0 : dc.primaryField) === null || _a === void 0 ? void 0 : _a.call(dc, context),
                /** 可选择配置，这里的配置会覆盖底层 Table 的 rowSelection 中的配置 */
                getSchemaTpl('switch', {
                    name: 'selectable',
                    label: tipedLabel('可选择', '开启后支持选择表格行数据'),
                    pipeIn: function (value, formStore) {
                        var _a;
                        if (typeof value === 'boolean') {
                            return value;
                        }
                        var rowSelection = (_a = formStore === null || formStore === void 0 ? void 0 : formStore.data) === null || _a === void 0 ? void 0 : _a.rowSelection;
                        return rowSelection && isObject(rowSelection);
                    }
                }),
                {
                    type: 'container',
                    className: 'ae-ExtendMore mb-3',
                    visibleOn: "data.selectable || (data.rowSelection && data.rowSelection?.type !== 'radio')",
                    body: [
                        getSchemaTpl('switch', {
                            name: 'multiple',
                            label: '可多选',
                            pipeIn: function (value, formStore) {
                                var _a;
                                if (typeof value === 'boolean') {
                                    return value;
                                }
                                var rowSelection = (_a = formStore === null || formStore === void 0 ? void 0 : formStore.data) === null || _a === void 0 ? void 0 : _a.rowSelection;
                                return rowSelection && isObject(rowSelection)
                                    ? rowSelection.type !== 'radio'
                                    : false;
                            }
                        })
                    ]
                },
                {
                    name: 'placeholder',
                    pipeIn: defaultValue('暂无数据'),
                    type: 'input-text',
                    label: '占位内容'
                },
                getSchemaTpl('switch', {
                    name: 'syncLocation',
                    label: tipedLabel('同步地址栏', '开启后会把查询条件数据和分页信息同步到地址栏中，页面中出现多个时，建议只保留一个同步地址栏，否则会相互影响。'),
                    pipeIn: defaultValue(true)
                })
            ], false)
        };
    };
    BaseCRUDPlugin.prototype.renderColumnsControl = function (context) {
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
    BaseCRUDPlugin.prototype.renderToolbarCollapse = function (context) {
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
    BaseCRUDPlugin.prototype.renderFiltersCollapse = function (context) {
        var builder = this.dsManager.getBuilderBySchema(context.node.schema);
        var collection = [];
        var order = [
            DSFeatureEnum.SimpleQuery,
            DSFeatureEnum.AdvancedQuery,
            DSFeatureEnum.FuzzyQuery
        ];
        var sortedFeats = sortBy(builder.features, [function (feat) { return order.indexOf(feat); }]);
        sortedFeats.forEach(function (feat) {
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
    /** 分页类别 */
    BaseCRUDPlugin.prototype.renderPaginationCollapse = function (context) {
        var _this = this;
        var isPagination = 'data.loadType === "pagination"';
        var isInfinity = 'data.loadType === "more"';
        return {
            order: 30,
            title: '分页设置',
            body: [
                {
                    label: '分页模式',
                    type: 'select',
                    name: 'loadType',
                    options: [
                        {
                            label: '无',
                            value: ''
                        },
                        {
                            label: '分页',
                            value: 'pagination'
                        },
                        {
                            label: '加载更多',
                            value: 'more'
                        }
                    ],
                    pipeIn: function (data) { return data || ''; },
                    pipeOut: function (data) {
                        return data;
                    },
                    onChange: function (value, oldValue, model, form) {
                        var schema = form.data;
                        if (oldValue) {
                            deepRemove(schema, function (item) {
                                return oldValue === 'more'
                                    ? item.behavior === 'loadMore'
                                    : item.type === 'pagination';
                            });
                        }
                        if (value) {
                            // 新插入的默认放在 footerToolbar 中分栏 的第二栏的最后，没有位置的话向上缺省
                            // oldValue && deepRemove(schema);
                            var newCompSchema = value === 'pagination'
                                ? {
                                    type: 'pagination',
                                    behavior: 'Pagination',
                                    layout: ['total', 'perPage', 'pager'],
                                    perPageAvailable: [10, 20, 50, 100]
                                }
                                : {
                                    type: 'button',
                                    behavior: 'loadMore',
                                    label: '加载更多',
                                    onEvent: {
                                        click: {
                                            actions: [
                                                {
                                                    componentId: schema.id,
                                                    groupType: 'component',
                                                    actionType: 'loadMore'
                                                }
                                            ],
                                            weight: 0
                                        }
                                    }
                                };
                            _this.addFeatToToolbar(schema, newCompSchema, 'footer', 'right');
                        }
                    }
                },
                getSchemaTpl('switch', {
                    name: 'loadDataOnce',
                    label: '前端分页',
                    visibleOn: isPagination
                }),
                getSchemaTpl('switch', {
                    name: 'loadDataOnceFetchOnFilter',
                    label: tipedLabel('过滤时刷新', '在开启前端分页时，表头过滤后是否重新请求初始化 API'),
                    visibleOn: isPagination + ' && data.loadDataOnce'
                }),
                getSchemaTpl('switch', {
                    name: 'keepItemSelectionOnPageChange',
                    label: tipedLabel('保留选择项', '默认切换页面、搜索后，用户选择项会被清空，开启此功能后会保留用户选择，可以实现跨页面批量操作。'),
                    pipeIn: defaultValue(false),
                    visibleOn: isPagination
                }),
                getSchemaTpl('switch', {
                    name: 'autoJumpToTopOnPagerChange',
                    label: tipedLabel('翻页后回到顶部', '当切分页的时候，是否自动跳顶部'),
                    pipeIn: defaultValue(true),
                    visibleOn: isPagination
                }),
                {
                    name: 'perPage',
                    type: 'input-number',
                    label: tipedLabel('每页数量', '无限加载时，根据此项设置其每页加载数量，留空即不限制'),
                    clearValueOnEmpty: true,
                    clearable: true,
                    pipeIn: defaultValue(10),
                    visibleOn: isInfinity
                },
                {
                    type: 'button',
                    label: '点击编辑分页组件',
                    block: true,
                    className: 'mb-1',
                    level: 'enhance',
                    visibleOn: 'data.loadType === "pagination"',
                    onClick: function () {
                        var _a, _b;
                        var findPage = findSchema((_b = (_a = context === null || context === void 0 ? void 0 : context.node) === null || _a === void 0 ? void 0 : _a.schema) !== null && _b !== void 0 ? _b : {}, function (item) {
                            return item.type === 'pagination' || item.behavior === 'Pagination';
                        }, 'headerToolbar', 'footerToolbar');
                        if (!findPage || !findPage.$$id) {
                            toast.error('未找到分页组件');
                            return;
                        }
                        _this.manager.setActiveId(findPage.$$id);
                    }
                }
            ]
        };
    };
    /** 其他类别 */
    BaseCRUDPlugin.prototype.renderOthersCollapse = function (context) {
        return {
            order: 25,
            title: '其他',
            body: [
                {
                    type: 'ae-switch-more',
                    mode: 'normal',
                    formType: 'extend',
                    visibleOn: 'data.api',
                    label: tipedLabel('接口轮询', '开启初始化接口轮询，开启后会按照设定的时间间隔轮询调用接口'),
                    autoFocus: false,
                    form: {
                        body: [
                            {
                                type: 'input-number',
                                name: 'interval',
                                label: tipedLabel('轮询间隔', '定时刷新间隔，单位 ms'),
                                step: 10,
                                min: 1000
                            },
                            getSchemaTpl('tplFormulaControl', {
                                name: 'stopAutoRefreshWhen',
                                label: tipedLabel('停止条件', '定时刷新停止表达式，条件满足后则停止定时刷新，否则会持续轮询调用初始化接口。'),
                                visibleOn: '!!data.interval'
                            }),
                            getSchemaTpl('switch', {
                                name: 'stopAutoRefreshWhenModalIsOpen',
                                label: tipedLabel('模态窗口期间停止', '当页面中存在弹窗时停止接口轮询，避免中断操作')
                            })
                        ]
                    }
                },
                getSchemaTpl('switch', {
                    name: 'silentPolling',
                    label: tipedLabel('静默拉取', '刷新时是否隐藏加载动画'),
                    pipeIn: defaultValue(false)
                })
            ]
        };
    };
    /** 外观面板 */
    BaseCRUDPlugin.prototype.renderStylesTab = function (context) {
        return {
            title: '外观',
            className: 'p-none',
            body: getSchemaTpl('collapseGroup', [
                getSchemaTpl('style:classNames', {
                    isFormItem: false,
                    schema: [
                        getSchemaTpl('className', {
                            name: 'bodyClassName',
                            label: '表格区域'
                        }),
                        getSchemaTpl('className', {
                            name: 'headerToolbarClassName',
                            label: '顶部工具栏'
                        }),
                        getSchemaTpl('className', {
                            name: 'footerToolbarClassName',
                            label: '底部工具栏'
                        })
                    ]
                })
            ])
        };
    };
    /** 事件面板 */
    BaseCRUDPlugin.prototype.renderEventTab = function (context) {
        return {
            title: '事件',
            className: 'p-none',
            body: [
                getSchemaTpl('eventControl', __assign({ name: 'onEvent' }, getEventControlConfig(this.manager, context)))
            ]
        };
    };
    // headerToolbar 和 footerToolbar 布局换成 flex 包裹 container
    BaseCRUDPlugin.prototype.addFeatToToolbar = function (schema, content, position, align) {
        var region = "".concat(position, "Toolbar");
        if (!schema[region] ||
            isEmpty(schema[region]) ||
            !Array.isArray(schema[region])) {
            var isArr = Array.isArray(schema[region]);
            var newSchema = this.emptyFlex([
                this.emptyContainer('left', isArr || !schema[region] ? [] : [schema[region]]),
                this.emptyContainer('right')
            ]);
            (isArr && schema[region].push(newSchema)) ||
                (schema[region] = [newSchema]);
        }
        // 尝试放到左面第一个，否则只能放外头了
        try {
            // 优先判断没有右边列的情况，避免都走到catch里造成嵌套层数过多的问题
            if (align === 'right' && schema[region][0].items.length < 2) {
                schema[region][0].items.push(this.emptyContainer('right'));
            }
            schema[region][0].items[align === 'left' ? 0 : schema[region][0].items.length - 1].body.push(content);
        }
        catch (e) {
            var olds = __spreadArray([], __read(schema[region]), false);
            schema[region].length = 0;
            schema[region].push(this.emptyFlex([
                this.emptyContainer('left', olds),
                this.emptyContainer('right', content)
            ]));
        }
    };
    BaseCRUDPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var child, childDataSchema, items, schema;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        child = node.children.find(function (item) { return !!~['table2', 'cards', 'list'].indexOf(item.type); });
                        if (!((_b = (_a = child === null || child === void 0 ? void 0 : child.info) === null || _a === void 0 ? void 0 : _a.plugin) === null || _b === void 0 ? void 0 : _b.buildDataSchemas)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, child.info.plugin.buildDataSchemas(child, region)];
                    case 1:
                        childDataSchema = _f.sent();
                        items = (_d = (_c = childDataSchema === null || childDataSchema === void 0 ? void 0 : childDataSchema.properties) === null || _c === void 0 ? void 0 : _c.rows) !== null && _d !== void 0 ? _d : (_e = childDataSchema === null || childDataSchema === void 0 ? void 0 : childDataSchema.properties) === null || _e === void 0 ? void 0 : _e.items;
                        schema = {
                            $id: 'crud2',
                            type: 'object',
                            properties: __assign(__assign({}, items === null || items === void 0 ? void 0 : items.properties), { items: __assign(__assign({}, items), { title: '全部数据' }), selectedItems: __assign(__assign({}, items), { title: '选中数据' }), unSelectedItems: __assign(__assign({}, items), { title: '未选中数据' }), page: {
                                    type: 'number',
                                    title: '当前页码'
                                }, total: {
                                    type: 'number',
                                    title: '总数据条数'
                                } })
                        };
                        return [2 /*return*/, schema];
                }
            });
        });
    };
    BaseCRUDPlugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var builder;
            return __generator(this, function (_c) {
                builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
                if (builder && scopeNode.schema.api) {
                    return [2 /*return*/, builder.getAvailableContextFields({
                            schema: scopeNode.schema,
                            sourceKey: 'api',
                            feat: (_b = (_a = scopeNode.schema) === null || _a === void 0 ? void 0 : _a.feat) !== null && _b !== void 0 ? _b : 'List'
                        }, node)];
                }
                return [2 /*return*/];
            });
        });
    };
    BaseCRUDPlugin.prototype.generateScaffold = function (mode) {
        var schema;
        if (mode === 'table2') {
            schema = {
                type: 'crud2',
                mode: 'table2',
                columns: [
                    {
                        name: 'id',
                        title: 'ID',
                        type: 'container',
                        body: [
                            {
                                type: 'text'
                            }
                        ]
                    },
                    {
                        name: 'engine',
                        title: '示例',
                        type: 'container',
                        body: [
                            {
                                type: 'text'
                            }
                        ]
                    }
                ]
            };
        }
        else if (mode === 'cards') {
            schema = {
                type: 'crud2',
                mode: 'cards',
                card: {
                    type: 'card2',
                    body: [
                        {
                            type: 'container',
                            body: [
                                {
                                    type: 'tpl',
                                    tpl: '标题',
                                    inline: false,
                                    style: {
                                        marginTop: '0',
                                        marginBottom: '0',
                                        paddingTop: '',
                                        paddingBottom: ''
                                    },
                                    wrapperComponent: 'h2'
                                },
                                {
                                    type: 'form',
                                    body: [
                                        {
                                            type: 'static-tpl',
                                            label: '字段',
                                            tpl: '内容'
                                        }
                                    ]
                                },
                                {
                                    type: 'divider'
                                },
                                {
                                    type: 'button-group'
                                }
                                // {
                                //   type: 'tpl',
                                //   tpl: '副标题内容',
                                //   inline: false,
                                //   wrapperComponent: '',
                                //   style: {
                                //     color: '#9b9b9b',
                                //     marginTop: '0',
                                //     marginBottom: '0'
                                //   }
                                // }
                            ]
                            // style: {
                            //   borderStyle: 'solid',
                            //   borderColor: '#ebebeb',
                            //   borderWidth: '1px',
                            //   'borderRadius': '5px',
                            //   'paddingTop': '10px',
                            //   'paddingRight': '10px',
                            //   'paddingBottom': '0',
                            //   'paddingLeft': '10px'
                            // }
                        }
                    ]
                }
            };
        }
        else if (mode === 'list') {
            schema = {
                type: 'crud2',
                mode: 'list',
                listItem: {
                    body: [
                        {
                            type: 'container',
                            body: [
                                {
                                    type: 'tpl',
                                    tpl: '标题',
                                    inline: false,
                                    style: {
                                        marginTop: '0',
                                        marginBottom: '0',
                                        paddingTop: '',
                                        paddingBottom: ''
                                    },
                                    wrapperComponent: 'h2'
                                },
                                {
                                    type: 'tpl',
                                    tpl: '副标题内容',
                                    inline: false,
                                    wrapperComponent: '',
                                    style: {
                                        color: '#9b9b9b',
                                        marginTop: '0',
                                        marginBottom: '0'
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
        }
        return schema;
    };
    BaseCRUDPlugin.id = 'CRUD2Plugin';
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BaseCRUDPlugin.prototype, "renderColumnsControl", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BaseCRUDPlugin.prototype, "renderToolbarCollapse", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BaseCRUDPlugin.prototype, "renderFiltersCollapse", null);
    return BaseCRUDPlugin;
}(BasePlugin));
export { BaseCRUDPlugin };
