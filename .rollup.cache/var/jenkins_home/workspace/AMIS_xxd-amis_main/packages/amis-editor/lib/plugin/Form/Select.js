import { __assign, __extends } from "tslib";
import { registerEditorPlugin, getSchemaTpl, BasePlugin, tipedLabel } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { resolveOptionType } from '../../util';
var SelectControlPlugin = /** @class */ (function (_super) {
    __extends(SelectControlPlugin, _super);
    function SelectControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '下拉框';
        _this.panelTitle = '下拉框';
        _this.rendererName = 'select';
        _this.icon = 'fa fa-th-list';
        _this.panelIcon = 'fa fa-th-list';
        _this.pluginIcon = 'select-plugin';
        _this.isBaseComponent = true;
        _this.panelJustify = true;
        _this.notRenderFormZone = true;
        _this.$schema = '/schemas/SelectControlSchema.json';
        _this.description = '支持多选，输入提示，可使用 source 获取选项';
        _this.docLink = '/amis/zh-CN/components/form/select';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'select',
            label: '选项',
            name: 'select',
            options: [
                { label: '选项A', value: 'A' },
                { label: '选项B', value: 'B' }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                __assign({}, _this.scaffold)
            ]
        };
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中值变化时触发',
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
                                        title: '选中的值'
                                    },
                                    selectedItems: {
                                        type: 'object',
                                        title: '选中的项'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'focus',
                eventLabel: '获取焦点',
                description: '输入框获取焦点时触发',
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
                                        title: '选中的值'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'blur',
                eventLabel: '失去焦点',
                description: '输入框失去焦点时触发',
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
                                        title: '选中的值'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'add',
                eventLabel: '新增选项',
                description: '新增选项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '新增的选项'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'edit',
                eventLabel: '编辑选项',
                description: '编辑选项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '编辑的选项'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'delete',
                eventLabel: '删除选项',
                description: '删除选项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '删除的选项'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
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
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelBodyCreator = function (context) {
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                getSchemaTpl('formItemName', {
                                    required: true
                                }),
                                getSchemaTpl('label'),
                                getSchemaTpl('clearable'),
                                getSchemaTpl('searchable'),
                                getSchemaTpl('multiple', {
                                    body: [
                                        getSchemaTpl('switch', {
                                            label: '单行显示选中值',
                                            name: 'valuesNoWrap'
                                        }),
                                        {
                                            type: 'input-number',
                                            name: 'maxTagCount',
                                            label: tipedLabel('标签展示数', '标签的最大展示数量，超出数量后以收纳浮层的方式展示，默认全展示')
                                        }
                                    ]
                                }),
                                getSchemaTpl('checkAll'),
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: function (schema) { return schema; }
                                }),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('placeholder'),
                                getSchemaTpl('description')
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                getSchemaTpl('optionControlV2'),
                                getSchemaTpl('selectFirst'),
                                getSchemaTpl('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                // 模板
                                getSchemaTpl('optionsMenuTpl', {
                                    manager: _this.manager,
                                    onChange: function (value) { }
                                }),
                                /** 新增选项 */
                                getSchemaTpl('optionAddControl', {
                                    manager: _this.manager
                                }),
                                /** 编辑选项 */
                                getSchemaTpl('optionEditControl', {
                                    manager: _this.manager
                                }),
                                /** 删除选项 */
                                getSchemaTpl('optionDeleteControl')
                            ]
                        },
                        {
                            title: '高级',
                            body: [
                                getSchemaTpl('switch', {
                                    label: tipedLabel('选项值检查', '开启后，当选项值未匹配到当前options中的选项时，选项文本飘红'),
                                    name: 'showInvalidMatch'
                                }),
                                getSchemaTpl('virtualThreshold'),
                                getSchemaTpl('virtualItemHeight')
                            ]
                        },
                        getSchemaTpl('status', { isFormItem: true }),
                        getSchemaTpl('validation', { tag: ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            getSchemaTpl('style:formItem', { renderer: context.info.renderer }),
                            getSchemaTpl('style:classNames')
                        ])
                    ]
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
        return _this;
    }
    SelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        var type = resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
            originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
        };
        if (((_f = node.schema) === null || _f === void 0 ? void 0 : _f.joinValues) === false) {
            dataSchema = __assign(__assign({}, dataSchema), { type: 'object', title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name), properties: (_a = {},
                    _a[((_j = node.schema) === null || _j === void 0 ? void 0 : _j.labelField) || 'label'] = {
                        type: 'string',
                        title: '文本'
                    },
                    _a[((_k = node.schema) === null || _k === void 0 ? void 0 : _k.valueField) || 'value'] = {
                        type: type,
                        title: '值'
                    },
                    _a) });
        }
        if ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.multiple) {
            if ((_m = node.schema) === null || _m === void 0 ? void 0 : _m.extractValue) {
                dataSchema = {
                    type: 'array',
                    title: ((_o = node.schema) === null || _o === void 0 ? void 0 : _o.label) || ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.name)
                };
            }
            else if (((_q = node.schema) === null || _q === void 0 ? void 0 : _q.joinValues) === false) {
                dataSchema = {
                    type: 'array',
                    title: ((_r = node.schema) === null || _r === void 0 ? void 0 : _r.label) || ((_s = node.schema) === null || _s === void 0 ? void 0 : _s.name),
                    items: {
                        type: 'object',
                        title: '成员',
                        properties: dataSchema.properties
                    },
                    originalValue: dataSchema.originalValue
                };
            }
        }
        return dataSchema;
    };
    SelectControlPlugin.id = 'SelectControlPlugin';
    SelectControlPlugin.scene = ['layout'];
    return SelectControlPlugin;
}(BasePlugin));
export { SelectControlPlugin };
registerEditorPlugin(SelectControlPlugin);
