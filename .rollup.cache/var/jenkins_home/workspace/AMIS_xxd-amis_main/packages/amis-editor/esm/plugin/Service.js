import { __assign, __awaiter, __extends, __generator, __read, __spreadArray } from "tslib";
import { render as amisRender } from 'amis';
import flattenDeep from 'lodash/flattenDeep';
import { JSONPipeOut, jsonToJsonSchema, registerEditorPlugin, BasePlugin, getSchemaTpl, tipedLabel } from 'amis-editor-core';
import { DSBuilderManager } from '../builder/DSBuilderManager';
import { DSFeatureEnum, ModelDSBuilderKey, ApiDSBuilderKey } from '../builder';
import { getEventControlConfig } from '../renderer/event-control/helper';
var ServicePlugin = /** @class */ (function (_super) {
    __extends(ServicePlugin, _super);
    function ServicePlugin(manager) {
        var _this = _super.call(this, manager) || this;
        // 关联渲染器名字
        _this.rendererName = 'service';
        _this.name = '服务Service';
        _this.panelTitle = '服务Service';
        _this.icon = 'fa fa-server';
        _this.pluginIcon = 'service-plugin';
        _this.panelIcon = 'service-plugin';
        _this.$schema = '/schemas/ServiceSchema.json';
        _this.isBaseComponent = true;
        _this.order = -850;
        _this.description = '功能性容器，可以用来加载数据或者加载渲染器配置。加载到的数据在容器可以使用。';
        _this.docLink = '/amis/zh-CN/components/service';
        _this.tags = ['数据容器'];
        _this.scaffold = {
            type: 'service',
            /** region 区域的 placeholder 会撑开内容区 */
            body: []
        };
        _this.previewSchema = {
            type: 'service',
            body: [
                {
                    type: 'tpl',
                    tpl: '内容区域',
                    inline: false,
                    className: 'bg-light wrapper'
                }
            ]
        };
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                placeholder: amisRender({
                    type: 'wrapper',
                    size: 'lg',
                    body: { type: 'tpl', tpl: '内容区域' }
                })
            }
        ];
        _this.events = [
            {
                eventName: 'init',
                eventLabel: '初始化',
                description: '组件实例被创建并插入 DOM 中时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前数据域，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'fetchInited',
                eventLabel: '初始化数据接口请求完成',
                description: '远程初始化数据接口请求完成时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    responseData: {
                                        type: 'object',
                                        title: '响应数据'
                                    },
                                    responseStatus: {
                                        type: 'number',
                                        title: '响应状态(0表示成功)'
                                    },
                                    responseMsg: {
                                        type: 'string',
                                        title: '响应消息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'fetchSchemaInited',
                eventLabel: '初始化Schema接口请求完成',
                description: '远程初始化Schema接口请求完成时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    responseData: {
                                        type: 'object',
                                        title: '响应数据'
                                    },
                                    responseStatus: {
                                        type: 'number',
                                        title: '响应状态(0表示成功)'
                                    },
                                    responseMsg: {
                                        type: 'string',
                                        title: '响应消息'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        _this.actions = [
            {
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionType: 'rebuild',
                actionLabel: '重新构建',
                description: '触发schemaApi刷新，重新构建Schema'
            },
            {
                actionType: 'setValue',
                actionLabel: '变量赋值',
                description: '更新数据域数据'
            }
        ];
        _this.panelBodyCreator = function (context) {
            var dsManager = _this.dsManager;
            /** 数据源控件 */
            var generateDSControls = function () {
                var dsTypeSelector = dsManager.getDSSelectorSchema({
                    type: 'select',
                    mode: 'horizontal',
                    horizontal: {
                        justify: true,
                        left: 'col-sm-4'
                    },
                    onChange: function (value, oldValue, model, form) {
                        if (value !== oldValue) {
                            var data = form.data;
                            Object.keys(data).forEach(function (key) {
                                var _a;
                                if (((_a = key === null || key === void 0 ? void 0 : key.toLowerCase()) === null || _a === void 0 ? void 0 : _a.endsWith('fields')) ||
                                    (key === null || key === void 0 ? void 0 : key.toLowerCase().endsWith('api'))) {
                                    form.deleteValueByName(key);
                                }
                            });
                            form.deleteValueByName('__fields');
                            form.deleteValueByName('__relations');
                            form.setValueByName('api', undefined);
                        }
                        return value;
                    }
                }, { schema: context === null || context === void 0 ? void 0 : context.schema, sourceKey: 'api' });
                /** 默认数据源类型 */
                var defaultDsType = dsTypeSelector.value;
                var dsSettings = dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                    return {
                        type: 'container',
                        visibleOn: "data.dsType == null ? '".concat(builderKey, "' === '").concat(defaultDsType || ApiDSBuilderKey, "' : data.dsType === '").concat(builderKey, "'"),
                        body: flattenDeep([
                            builder.makeSourceSettingForm({
                                feat: 'View',
                                renderer: 'service',
                                inScaffold: false,
                                sourceSettings: __assign(__assign({ name: 'api', label: '接口配置', mode: 'horizontal' }, (builderKey === 'api' || builderKey === 'apicenter'
                                    ? {
                                        horizontalConfig: {
                                            labelAlign: 'left',
                                            horizontal: {
                                                justify: true,
                                                left: 4
                                            }
                                        }
                                    }
                                    : {})), { useFieldManager: builderKey === ModelDSBuilderKey })
                            })
                        ])
                    };
                });
                return __spreadArray([dsTypeSelector], __read(dsSettings), false);
            };
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    className: 'p-none',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: __spreadArray([
                                    getSchemaTpl('layout:originPosition', { value: 'left-top' })
                                ], __read(generateDSControls()), false)
                            },
                            {
                                title: '状态',
                                body: [getSchemaTpl('hidden')]
                            },
                            {
                                title: '高级',
                                body: [
                                    getSchemaTpl('combo-container', {
                                        type: 'input-kv',
                                        mode: 'normal',
                                        name: 'data',
                                        label: '初始化静态数据'
                                    }),
                                    getSchemaTpl('apiControl', {
                                        name: 'schemaApi',
                                        label: tipedLabel('Schema数据源', '配置schemaApi后，可以实现动态渲染页面内容')
                                    }),
                                    getSchemaTpl('initFetch', {
                                        name: 'initFetchSchema',
                                        label: '是否Schema初始加载',
                                        visibleOn: 'typeof this.schemaApi === "string" ? this.schemaApi : this.schemaApi && this.schemaApi.url'
                                    }),
                                    {
                                        name: 'ws',
                                        type: 'input-text',
                                        label: tipedLabel('WebSocket接口', 'Service 支持通过WebSocket(ws)获取数据，用于获取实时更新的数据。')
                                    },
                                    {
                                        type: 'js-editor',
                                        allowFullscreen: true,
                                        name: 'dataProvider',
                                        label: tipedLabel('自定义函数获取数据', '对于复杂的数据获取情况，可以使用外部函数获取数据'),
                                        placeholder: '/**\n * @param data 上下文数据\n * @param setData 更新数据的函数\n * @param env 环境变量\n */\ninterface DataProvider {\n   (data: any, setData: (data: any) => void, env: any): void;\n}\n'
                                    }
                                ]
                            }
                        ])
                    ]
                },
                {
                    title: '外观',
                    body: [getSchemaTpl('className')]
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        getSchemaTpl('eventControl', __assign({ name: 'onEvent' }, getEventControlConfig(_this.manager, context)))
                    ]
                }
            ]);
        };
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
                                renderer: 'service',
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
        _this.dsManager = new DSBuilderManager(manager);
        return _this;
    }
    ServicePlugin.prototype.buildDataSchemas = function (node, region, trigger) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var jsonschema, pool, current, schema, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        jsonschema = __assign({}, jsonToJsonSchema(JSONPipeOut((_a = node.schema.data) !== null && _a !== void 0 ? _a : {})));
                        pool = node.children.concat();
                        _h.label = 1;
                    case 1:
                        if (!pool.length) return [3 /*break*/, 5];
                        current = pool.shift();
                        schema = current.schema;
                        if (!(((_b = current.rendererConfig) === null || _b === void 0 ? void 0 : _b.isFormItem) && (schema === null || schema === void 0 ? void 0 : schema.name))) return [3 /*break*/, 3];
                        _f = jsonschema.properties;
                        _g = schema.name;
                        return [4 /*yield*/, ((_d = (_c = current.info.plugin).buildDataSchemas) === null || _d === void 0 ? void 0 : _d.call(_c, current, undefined, trigger, node))];
                    case 2:
                        _f[_g] =
                            _h.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (!((_e = current.rendererConfig) === null || _e === void 0 ? void 0 : _e.storeType)) {
                            pool.push.apply(pool, __spreadArray([], __read(current.children), false));
                        }
                        _h.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, jsonschema];
                }
            });
        });
    };
    ServicePlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
        if (e === 'fetchInited') {
            var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
            var jsonschema = __assign({ $id: 'serviceFetchInitedData' }, jsonToJsonSchema(data.responseData));
            scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
            scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
        }
    };
    ServicePlugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
        return __awaiter(this, void 0, void 0, function () {
            var builder;
            return __generator(this, function (_a) {
                builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
                if (builder && scopeNode.schema.api) {
                    return [2 /*return*/, builder.getAvailableContextFields({
                            schema: scopeNode.schema,
                            sourceKey: 'api',
                            feat: DSFeatureEnum.List
                        }, node)];
                }
                return [2 /*return*/];
            });
        });
    };
    ServicePlugin.id = 'ServicePlugin';
    return ServicePlugin;
}(BasePlugin));
export { ServicePlugin };
registerEditorPlugin(ServicePlugin);
