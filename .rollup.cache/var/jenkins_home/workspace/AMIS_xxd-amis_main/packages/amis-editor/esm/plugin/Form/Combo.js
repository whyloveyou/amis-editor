import { __assign, __awaiter, __extends, __generator } from "tslib";
import { setVariable, someTree } from 'amis-core';
import { BasePlugin, registerEditorPlugin, defaultValue, getSchemaTpl, tipedLabel, mockValue, getI18nEnabled } from 'amis-editor-core';
import { DSBuilderManager } from '../../builder/DSBuilderManager';
import { ValidatorTag } from '../../validator';
import { getArgsWrapper, getEventControlConfig } from '../../renderer/event-control/helper';
var ComboControlPlugin = /** @class */ (function (_super) {
    __extends(ComboControlPlugin, _super);
    function ComboControlPlugin(manager) {
        var _this = _super.call(this, manager) || this;
        // 关联渲染器名字
        _this.rendererName = 'combo';
        _this.$schema = '/schemas/ComboControlSchema.json';
        // 组件名称
        _this.name = '组合输入';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-group';
        _this.pluginIcon = 'combo-plugin';
        _this.description = '多个表单项的组合，可配置是否增加和删除初始设定的模板';
        _this.docLink = '/amis/zh-CN/components/form/combo';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'combo',
            label: '组合输入',
            name: 'combo',
            multiple: true,
            addable: true,
            removable: true,
            removableMode: 'icon',
            addBtn: {
                label: '新增',
                icon: 'fa fa-plus',
                level: 'primary',
                size: 'sm'
            },
            items: [
                {
                    type: 'input-text',
                    name: 'input-text',
                    placeholder: '文本'
                },
                {
                    type: 'select',
                    name: 'select',
                    placeholder: '选项',
                    options: [
                        {
                            label: 'A',
                            value: 'a'
                        },
                        {
                            label: 'B',
                            value: 'b'
                        }
                    ]
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                __assign(__assign({}, _this.scaffold), { value: [{ text: 'Row 1', select: 'a' }, {}] })
            ]
        };
        // 容器配置
        _this.regions = [
            {
                key: 'items',
                label: '内容区',
                preferTag: '内容区',
                renderMethod: 'renderItems'
            }
        ];
        // 事件定义
        _this.events = [
            {
                eventName: 'add',
                eventLabel: '添加',
                description: '添加组合项时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'string',
                                        title: '组合项的值'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'delete',
                eventLabel: '删除',
                description: '删除组合项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    key: {
                                        type: 'string',
                                        title: '被删除的索引'
                                    },
                                    value: {
                                        type: 'string',
                                        title: '组合项的值'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '被删除的项'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'tabsChange',
                eventLabel: '切换tab',
                description: '当设置 tabsMode 为 true 时，切换选项卡时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    key: {
                                        type: 'string',
                                        title: '选项卡索引'
                                    },
                                    value: {
                                        type: 'string',
                                        title: '组合项的值'
                                    },
                                    item: {
                                        type: 'object',
                                        title: '被激活的项'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清除选中值'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'addItem',
                actionLabel: '添加项',
                description: '添加新的项',
                innerArgs: ['item'],
                schema: getArgsWrapper({
                    type: 'combo',
                    label: '添加项',
                    name: 'item',
                    draggable: false,
                    multiple: true,
                    removable: true,
                    required: true,
                    addable: true,
                    strictMode: false,
                    canAccessSuperData: true,
                    mode: 'horizontal',
                    items: [
                        {
                            name: 'key',
                            type: 'input-text',
                            required: true,
                            placeholder: '变量名',
                            source: '${__setValueDs}'
                        },
                        getSchemaTpl('formulaControl', {
                            name: 'val',
                            variables: '${variables}',
                            inputMode: 'input-group'
                        })
                    ]
                })
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelTitle = '组合输入';
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = getI18nEnabled();
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            {
                                className: 'p-none',
                                title: '常用',
                                body: [
                                    getSchemaTpl('formItemName', {
                                        required: true
                                    }),
                                    getSchemaTpl('label'),
                                    getSchemaTpl('valueFormula', {
                                        rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'textarea' }),
                                        label: tipedLabel('默认值', '支持 <code>now、+1day、-2weeks、+1hours、+2years</code>等这种相对值用法'),
                                        pipeOut: function (value) {
                                            try {
                                                return typeof JSON.parse(value) === 'number'
                                                    ? value
                                                    : JSON.parse(value);
                                            }
                                            catch (err) {
                                                return value;
                                            }
                                        }
                                    }),
                                    // 多选模式和条数绑定了，所以设定了多选，条数开启
                                    getSchemaTpl('switch', {
                                        name: 'multiple',
                                        label: '可多选',
                                        pipeIn: defaultValue(true),
                                        onChange: function (value, oldValue, model, form) {
                                            form.setValueByName('addable', value);
                                            form.setValueByName('removable', value);
                                            !value && form.setValueByName('draggable', false);
                                            form.setValueByName('flat', false);
                                        }
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'data.multiple',
                                        body: [
                                            {
                                                label: '最多条数',
                                                name: 'maxLength',
                                                type: 'input-number'
                                            },
                                            {
                                                label: '最少条数',
                                                name: 'minLength',
                                                type: 'input-number'
                                            }
                                        ]
                                    },
                                    getSchemaTpl('switch', {
                                        name: 'flat',
                                        label: tipedLabel('打平值', '默认数组内的数据结构为对象，如果只有一个表单项，可以配置将值打平，那么数组内放置的就是那个表单项的值'),
                                        visibleOn: 'Array.isArray(data.items) && data.items.length === 1 && data.multiple'
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'data.multiple && data.flat',
                                        body: [getSchemaTpl('joinValues'), getSchemaTpl('delimiter')]
                                    },
                                    // 可排序，排序和新增无关，和多选模式有关
                                    getSchemaTpl('switch', {
                                        name: 'draggable',
                                        label: '可排序',
                                        pipeIn: defaultValue(false),
                                        visibleOn: 'data.multiple'
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'data.draggable',
                                        body: [getSchemaTpl('draggableTip')]
                                    },
                                    // 可新增
                                    getSchemaTpl('switch', {
                                        name: 'addable',
                                        label: tipedLabel('可新增', '如需要拓展自定义的新增功能，可通过配置组件-新增项来拓展'),
                                        visibleOn: 'data.multiple',
                                        pipeIn: defaultValue(false),
                                        onChange: function (value, oldValue, model, form) {
                                            if (value) {
                                                form.setValueByName('addBtn', {
                                                    label: '新增',
                                                    icon: 'fa fa-plus',
                                                    level: 'primary',
                                                    size: 'sm'
                                                });
                                            }
                                        }
                                    }),
                                    // 可删除
                                    getSchemaTpl('switch', {
                                        name: 'removable',
                                        label: '可删除',
                                        pipeIn: defaultValue(false),
                                        visibleOn: 'data.multiple',
                                        onChange: function (value, oldValue, model, form) {
                                            if (value) {
                                                form.setValueByName('removableMode', 'icon');
                                                form.setValueByName('deleteIcon', undefined);
                                                form.setValueByName('deleteBtn', undefined);
                                            }
                                        }
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'data.removable',
                                        body: [
                                            // 自定义删除按钮开关
                                            {
                                                type: 'button-group-select',
                                                name: 'removableMode',
                                                label: '按钮模式',
                                                options: [
                                                    {
                                                        label: '图标',
                                                        value: 'icon'
                                                    },
                                                    {
                                                        label: '按钮',
                                                        value: 'button'
                                                    }
                                                ],
                                                onChange: function (value, oldValue, model, form) {
                                                    if (value === 'icon') {
                                                        form.setValueByName('deleteBtn', undefined);
                                                    }
                                                    else if (value === 'button') {
                                                        form.setValueByName('deleteBtn', {
                                                            label: '删除',
                                                            level: 'default'
                                                        });
                                                    }
                                                }
                                            },
                                            // getSchemaTpl('icon', {
                                            //   name: 'deleteIcon',
                                            //   label: '图标',
                                            //   visibleOn: 'data.removableMode === "icon"'
                                            // }),
                                            {
                                                label: '文案',
                                                name: 'deleteBtn.label',
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                                visibleOn: 'data.removableMode === "button"'
                                            },
                                            getSchemaTpl('buttonLevel', {
                                                label: '样式',
                                                name: 'deleteBtn.level',
                                                visibleOn: 'data.removableMode === "button"'
                                            }),
                                            getSchemaTpl('apiControl', {
                                                name: 'deleteApi',
                                                label: '删除',
                                                renderLabel: false,
                                                mode: 'normal'
                                            }),
                                            getSchemaTpl('deleteConfirmText')
                                        ]
                                    },
                                    getSchemaTpl('labelRemark'),
                                    getSchemaTpl('remark'),
                                    getSchemaTpl('placeholder'),
                                    getSchemaTpl('description')
                                ]
                            },
                            getSchemaTpl('status', {
                                isFormItem: true,
                                readonly: true
                            }),
                            getSchemaTpl('validation', { tag: ValidatorTag.MultiSelect }),
                            getSchemaTpl('collapseGroup', [
                                {
                                    className: 'p-none',
                                    title: '高级',
                                    body: [
                                        getSchemaTpl('switch', {
                                            name: 'canAccessSuperData',
                                            label: '自动填充父级变量',
                                            pipeIn: defaultValue(false)
                                        }),
                                        getSchemaTpl('switch', {
                                            name: 'strictMode',
                                            label: tipedLabel('严格模式', '如果你希望环境变量的值实时透传到 Combo 中，请关闭此选项。'),
                                            value: true
                                        }),
                                        getSchemaTpl('combo-container', {
                                            name: 'syncFields',
                                            visibleOn: '!data.strictMode',
                                            label: tipedLabel('同步字段', '如果 Combo 层级比较深，底层的获取外层的数据可能不同步。但是给 combo 配置这个属性就能同步下来。'),
                                            type: 'combo',
                                            mode: 'normal',
                                            multiple: true,
                                            canAccessSuperData: true,
                                            items: [
                                                {
                                                    name: 'field',
                                                    type: 'input-text'
                                                }
                                            ],
                                            value: [],
                                            pipeIn: function (value) {
                                                return (value !== null && value !== void 0 ? value : []).map(function (item) { return ({ field: item }); });
                                            },
                                            pipeOut: function (value) {
                                                return (value !== null && value !== void 0 ? value : []).map(function (item) {
                                                    var keys = Object.keys(item);
                                                    return keys.length > 0 ? item.field : '';
                                                });
                                            }
                                        }),
                                        getSchemaTpl('switch', {
                                            name: 'lazyLoad',
                                            label: tipedLabel('懒加载', '如果数据比较多，比较卡顿时，可开启此配置项'),
                                            pipeIn: defaultValue(false),
                                            visibleOn: 'data.multiple && !data.tabsMode'
                                        })
                                    ]
                                }
                            ])
                        ])
                    ]
                },
                {
                    title: '外观',
                    className: 'p-none',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            visibleOn: 'data.multiple',
                            body: [
                                {
                                    name: 'tabsMode',
                                    label: '展示形式',
                                    type: 'button-group-select',
                                    inputClassName: 'items-center',
                                    size: 'sm',
                                    options: [
                                        { label: '表单', value: false },
                                        { label: '选项卡', value: true }
                                    ],
                                    pipeIn: defaultValue(false),
                                    onChange: function (value, oldValue, model, form) {
                                        if (value) {
                                            form.setValueByName('lazyLoad', undefined);
                                        }
                                    }
                                },
                                {
                                    type: 'container',
                                    className: 'ae-ExtendMore mb-3',
                                    visibleOn: 'data.tabsMode',
                                    body: [
                                        {
                                            type: 'select',
                                            name: 'tabsStyle',
                                            label: '样式',
                                            pipeIn: defaultValue(''),
                                            options: [
                                                {
                                                    label: '默认',
                                                    value: ''
                                                },
                                                {
                                                    label: '线型',
                                                    value: 'line'
                                                },
                                                {
                                                    label: '卡片',
                                                    value: 'card'
                                                },
                                                {
                                                    label: '选择器',
                                                    value: 'radio'
                                                }
                                            ]
                                        },
                                        getSchemaTpl('formulaControl', {
                                            label: '标题模版',
                                            name: 'tabsLabelTpl'
                                        })
                                    ]
                                },
                                // 表单多行展示
                                getSchemaTpl('switch', {
                                    name: 'multiLine',
                                    label: '多行展示',
                                    pipeIn: defaultValue(false),
                                    visibleOn: '!data.tabsMode',
                                    onChange: function (value, oldValue, model, form) {
                                        if (!value) {
                                            form.setValueByName('subFormMode', undefined);
                                            form.setValueByName('noBorder', undefined);
                                        }
                                    }
                                }),
                                getSchemaTpl('switch', {
                                    visibleOn: '!data.tabsMode && data.multiLine',
                                    name: 'noBorder',
                                    label: '去掉边框',
                                    pipeIn: defaultValue(false)
                                })
                            ]
                        },
                        getSchemaTpl('style:formItem', {
                            renderer: context.info.renderer,
                            schema: [
                                getSchemaTpl('subFormItemMode', {
                                    visibleOn: 'data.multiLine',
                                    type: 'select',
                                    label: '子表单'
                                })
                            ]
                        }),
                        getSchemaTpl('style:classNames')
                    ])
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
        _this.dsManager = new DSBuilderManager(manager);
        return _this;
    }
    ComboControlPlugin.prototype.filterProps = function (props) {
        // 至少显示一个成员，否则啥都不显示。
        if (props.multiple && !props.value && !props.$schema.value && !props.$ref) {
            var mockedData_1 = {};
            if (Array.isArray(props.items) && props.items.length === 0) {
                props.items.forEach(function (control) {
                    control.name &&
                        setVariable(mockedData_1, control.name, mockValue(control));
                });
            }
            props.value = [mockedData_1];
            return props;
        }
        return props;
    };
    ComboControlPlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var itemsSchema, items, parentScopeId, isColumnChild, scopeId, pool, current, schema, _k, _l, scopeId, scope;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0:
                        itemsSchema = {
                            $id: "".concat(node.id, "-").concat(node.type, "-tableRows"),
                            type: 'object',
                            properties: {}
                        };
                        items = (_a = node.children) === null || _a === void 0 ? void 0 : _a.find(function (child) { return child.isRegion && child.region === 'items'; });
                        parentScopeId = "".concat(parent === null || parent === void 0 ? void 0 : parent.id, "-").concat(parent === null || parent === void 0 ? void 0 : parent.type).concat(((_b = node.parent) === null || _b === void 0 ? void 0 : _b.type) === 'cell' ? '-currentRow' : '');
                        isColumnChild = false;
                        if (trigger) {
                            isColumnChild = someTree(items.children, function (item) { return item.id === (trigger === null || trigger === void 0 ? void 0 : trigger.id); });
                            if (isColumnChild) {
                                scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                                if (this.manager.dataSchema.getScope(scopeId)) {
                                    this.manager.dataSchema.removeScope(scopeId);
                                }
                                if (this.manager.dataSchema.getScope(parentScopeId)) {
                                    this.manager.dataSchema.switchTo(parentScopeId);
                                }
                                this.manager.dataSchema.addScope([], scopeId);
                                this.manager.dataSchema.current.tag = '当前行记录';
                                this.manager.dataSchema.current.group = '组件上下文';
                            }
                        }
                        pool = items.children.concat();
                        _m.label = 1;
                    case 1:
                        if (!pool.length) return [3 /*break*/, 4];
                        current = pool.shift();
                        schema = current.schema;
                        if (!schema.name) return [3 /*break*/, 3];
                        _k = itemsSchema.properties;
                        _l = schema.name;
                        return [4 /*yield*/, ((_d = (_c = current.info.plugin).buildDataSchemas) === null || _d === void 0 ? void 0 : _d.call(_c, current, region, trigger, node))];
                    case 2:
                        _k[_l] =
                            _m.sent();
                        _m.label = 3;
                    case 3: return [3 /*break*/, 1];
                    case 4:
                        if (isColumnChild) {
                            scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                            scope = this.manager.dataSchema.getScope(scopeId);
                            scope === null || scope === void 0 ? void 0 : scope.addSchema(itemsSchema);
                        }
                        if ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.multiple) {
                            return [2 /*return*/, {
                                    $id: 'combo',
                                    type: 'array',
                                    title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name),
                                    items: itemsSchema
                                }];
                        }
                        return [2 /*return*/, __assign(__assign({}, itemsSchema), { title: ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.label) || ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.name) })];
                }
            });
        });
    };
    ComboControlPlugin.prototype.getAvailableContextFields = function (scopeNode, target, region) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var scope, builder;
            return __generator(this, function (_c) {
                if (target.type === scopeNode.type ||
                    (target.parent.isRegion && target.parent.region === 'items')) {
                    scope = scopeNode.parent.parent;
                    builder = this.dsManager.getBuilderBySchema(scope.schema);
                }
                if (builder && scope.schema.api) {
                    return [2 /*return*/, builder.getAvailableContextFields({
                            schema: scope.schema,
                            sourceKey: 'api',
                            feat: (_b = (_a = scope.schema) === null || _a === void 0 ? void 0 : _a.feat) !== null && _b !== void 0 ? _b : 'List',
                            scopeNode: scopeNode
                        }, 
                        /** ID相同为本体，否则为子项 */
                        (target === null || target === void 0 ? void 0 : target.id) === (scopeNode === null || scopeNode === void 0 ? void 0 : scopeNode.id) ? scopeNode : target)];
                }
                return [2 /*return*/];
            });
        });
    };
    ComboControlPlugin.id = 'ComboControlPlugin';
    return ComboControlPlugin;
}(BasePlugin));
export { ComboControlPlugin };
registerEditorPlugin(ComboControlPlugin);
