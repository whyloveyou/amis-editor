import { __assign, __extends } from "tslib";
import { getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin, tipedLabel } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { resolveOptionType } from '../../util';
var NestedSelectControlPlugin = /** @class */ (function (_super) {
    __extends(NestedSelectControlPlugin, _super);
    function NestedSelectControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'nested-select';
        _this.$schema = '/schemas/NestedSelectControlSchema.json';
        // 组件名称
        _this.name = '级联选择器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-indent';
        _this.pluginIcon = 'nested-select-plugin';
        _this.description = '适用于选项中含有子项，可通过 source 拉取选项，支持多选';
        _this.docLink = '/amis/zh-CN/components/form/nestedselect';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'nested-select',
            label: '级联选择器',
            name: 'nestedSelect',
            onlyChildren: true,
            options: [
                {
                    label: '选项A',
                    value: 'A'
                },
                {
                    label: '选项B',
                    value: 'B',
                    children: [
                        {
                            label: '选项b1',
                            value: 'b1'
                        },
                        {
                            label: '选项b2',
                            value: 'b2'
                        }
                    ]
                },
                {
                    label: '选项C',
                    value: 'C',
                    children: [
                        {
                            label: '选项c1',
                            value: 'c1'
                        },
                        {
                            label: '选项c2',
                            value: 'c2'
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
                __assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = '级联选择器';
        _this.notRenderFormZone = true;
        _this.panelDefinitions = {
            options: {
                label: '选项 Options',
                name: 'options',
                type: 'combo',
                multiple: true,
                multiLine: true,
                draggable: true,
                addButtonText: '新增选项',
                scaffold: {
                    label: '',
                    value: ''
                },
                items: [
                    {
                        type: 'group',
                        body: [
                            getSchemaTpl('optionsLabel'),
                            {
                                type: 'input-text',
                                name: 'value',
                                placeholder: '值',
                                unique: true
                            }
                        ]
                    },
                    {
                        $ref: 'options',
                        label: '子选项',
                        name: 'children',
                        addButtonText: '新增子选项'
                    }
                ]
            }
        };
        _this.panelJustify = true;
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
            var renderer = context.info.renderer;
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
                                {
                                    type: 'ae-Switch-More',
                                    name: 'searchable',
                                    label: '可检索',
                                    mode: 'normal',
                                    value: false,
                                    hiddenOnDefault: true,
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            {
                                                type: 'input-text',
                                                name: 'noResultsText',
                                                label: tipedLabel('空提示', '检索无结果时的文本')
                                            }
                                        ]
                                    }
                                },
                                getSchemaTpl('onlyLeaf'),
                                [
                                    {
                                        type: 'switch',
                                        label: '可多选',
                                        name: 'multiple',
                                        value: false,
                                        inputClassName: 'is-inline'
                                    },
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-3',
                                        visibleOn: 'this.multiple',
                                        body: [
                                            {
                                                type: 'switch',
                                                label: tipedLabel('父级作为返回值', '开启后选中父级，不会全选子级选项，并且父级作为值返回'),
                                                horizontal: {
                                                    left: 6,
                                                    justify: true
                                                },
                                                name: 'onlyChildren',
                                                inputClassName: 'is-inline',
                                                visibleOn: '!this.onlyLeaf',
                                                pipeIn: function (value) { return !value; },
                                                pipeOut: function (value) { return !value; },
                                                onChange: function (value, origin, item, form) {
                                                    if (!value) {
                                                        // 父级作为返回值
                                                        form.setValues({
                                                            cascade: true,
                                                            withChildren: false,
                                                            onlyChildren: true
                                                        });
                                                    }
                                                    else {
                                                        form.setValues({
                                                            withChildren: false,
                                                            cascade: false,
                                                            onlyChildren: false
                                                        });
                                                    }
                                                }
                                            },
                                            getSchemaTpl('joinValues'),
                                            getSchemaTpl('delimiter', {
                                                visibleOn: 'this.joinValues'
                                            }),
                                            getSchemaTpl('extractValue', {
                                                visibleOn: '!this.joinValues'
                                            })
                                        ]
                                    }
                                ],
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: function (schema) { return schema; }
                                }),
                                getSchemaTpl('hideNodePathLabel'),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('placeholder'),
                                getSchemaTpl('description'),
                                getSchemaTpl('autoFillApi')
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                getSchemaTpl('treeOptionControl'),
                                getSchemaTpl('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context })
                            ]
                        },
                        getSchemaTpl('status', { isFormItem: true }),
                        getSchemaTpl('validation', {
                            tag: function (data) {
                                return ValidatorTag.MultiSelect;
                            }
                        })
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        getSchemaTpl('style:formItem', { renderer: renderer }),
                        {
                            title: '边框',
                            key: 'borderMode',
                            body: [getSchemaTpl('borderMode')]
                        },
                        getSchemaTpl('style:classNames', {
                            schema: [
                                getSchemaTpl('className', {
                                    label: '描述',
                                    name: 'descriptionClassName',
                                    visibleOn: 'this.description'
                                })
                            ]
                        })
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
        return _this;
    }
    NestedSelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    NestedSelectControlPlugin.id = 'NestedSelectControlPlugin';
    return NestedSelectControlPlugin;
}(BasePlugin));
export { NestedSelectControlPlugin };
registerEditorPlugin(NestedSelectControlPlugin);
