import { __assign, __extends } from "tslib";
import { getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { ValidatorTag } from '../../validator';
import { tipedLabel } from 'amis-editor-core';
import { resolveOptionType } from '../../util';
var TransferPlugin = /** @class */ (function (_super) {
    __extends(TransferPlugin, _super);
    function TransferPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'transfer';
        _this.$schema = '/schemas/TransferControlSchema.json';
        // 组件名称
        _this.name = '穿梭器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-th-list';
        _this.pluginIcon = 'transfer-plugin';
        _this.description = '穿梭器组件';
        _this.docLink = '/amis/zh-CN/components/form/transfer';
        _this.tags = ['表单项'];
        _this.scaffold = {
            label: '分组',
            type: 'transfer',
            name: 'transfer',
            options: [
                {
                    label: '诸葛亮',
                    value: 'zhugeliang'
                },
                {
                    label: '曹操',
                    value: 'caocao'
                }
            ],
            selectMode: 'list',
            resultListModeFollowSelect: false
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
        _this.panelTitle = '穿梭器';
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
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
                eventName: 'selectAll',
                eventLabel: '全选',
                description: '选中所有选项',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
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
                description: '清空选中内容'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '重置选择的内容'
            },
            {
                actionType: 'selectAll',
                actionLabel: '全选',
                description: '选中所有选项'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新，多值用“,”分隔'
            }
        ];
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
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
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
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: function (schema) { return (__assign(__assign({}, schema), { type: 'select', multiple: true })); },
                                    visibleOn: 'data.options.length > 0'
                                }),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('description'),
                                getSchemaTpl('switch', {
                                    label: '统计数据',
                                    name: 'statistics'
                                })
                            ]
                        },
                        {
                            title: '左侧选项面板',
                            body: [
                                {
                                    label: '展示形式',
                                    name: 'selectMode',
                                    type: 'select',
                                    options: [
                                        {
                                            label: '列表形式',
                                            value: 'list'
                                        },
                                        {
                                            label: '表格形式',
                                            value: 'table'
                                        },
                                        {
                                            label: '树形形式',
                                            value: 'tree'
                                        }
                                    ],
                                    onChange: function (value, origin, item, form) {
                                        form.setValues({
                                            options: undefined,
                                            columns: undefined,
                                            value: '',
                                            valueTpl: ''
                                        });
                                        // 主要解决直接设置value、valueTpl为undefined配置面板不生效问题，所以先设置''，后使用setTimout设置为undefined
                                        setTimeout(function () {
                                            form.setValues({
                                                value: undefined,
                                                valueTpl: undefined
                                            });
                                        }, 100);
                                    }
                                },
                                getSchemaTpl('optionControl', {
                                    visibleOn: 'data.selectMode === "list"',
                                    multiple: true
                                }),
                                getSchemaTpl('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                {
                                    type: 'ae-transferTableControl',
                                    label: '数据',
                                    visibleOn: 'data.selectMode === "table"',
                                    mode: 'normal',
                                    // 自定义change函数
                                    onValueChange: function (type, data, onBulkChange) {
                                        if (type === 'options') {
                                            onBulkChange(data);
                                        }
                                        else if (type === 'columns') {
                                            var columns = data.columns;
                                            if (data.columns.length > 0) {
                                                data.valueTpl = "${".concat(columns[0].name, "}");
                                            }
                                            onBulkChange(data);
                                        }
                                    }
                                },
                                getSchemaTpl('treeOptionControl', {
                                    visibleOn: 'data.selectMode === "tree"'
                                }),
                                getSchemaTpl('switch', {
                                    label: '可检索',
                                    name: 'searchable'
                                }),
                                getSchemaTpl('optionsMenuTpl', {
                                    manager: _this.manager,
                                    onChange: function (value) { },
                                    visibleOn: 'data.selectMode !== "table"'
                                }),
                                {
                                    label: '标题',
                                    name: 'selectTitle',
                                    type: 'input-text',
                                    inputClassName: 'is-inline '
                                }
                            ]
                        },
                        {
                            title: '右侧结果面板',
                            body: [
                                {
                                    type: 'button-group-select',
                                    label: '展示形式',
                                    name: 'resultListModeFollowSelect',
                                    inputClassName: 'items-center',
                                    options: [
                                        { label: '列表形式', value: false },
                                        { label: '跟随左侧', value: true }
                                    ],
                                    onChange: function (value, origin, item, form) {
                                        form.setValueByName('sortable', !value ? true : undefined);
                                    }
                                },
                                getSchemaTpl('switch', {
                                    label: tipedLabel('可检索', '查询功能目前只支持根据名称或值来模糊匹配查询'),
                                    name: 'resultSearchable'
                                }),
                                getSchemaTpl('sortable', {
                                    label: '支持排序',
                                    mode: 'horizontal',
                                    horizontal: {
                                        justify: true,
                                        left: 8
                                    },
                                    inputClassName: 'is-inline',
                                    visibleOn: 'data.selectMode === "list" && !data.resultListModeFollowSelect'
                                }),
                                getSchemaTpl('optionsMenuTpl', {
                                    name: 'valueTpl',
                                    manager: _this.manager,
                                    onChange: function (value) { },
                                    visibleOn: '!(data.selectMode === "table" && data.resultListModeFollowSelect)'
                                }),
                                {
                                    label: '标题',
                                    name: 'resultTitle',
                                    type: 'input-text',
                                    inputClassName: 'is-inline '
                                }
                            ]
                        },
                        {
                            title: '高级',
                            body: [
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
                    body: getSchemaTpl('collapseGroup', [
                        getSchemaTpl('style:formItem', renderer),
                        getSchemaTpl('style:classNames', [
                            getSchemaTpl('className', {
                                label: '描述',
                                name: 'descriptionClassName',
                                visibleOn: 'this.description'
                            }),
                            getSchemaTpl('className', {
                                name: 'addOn.className',
                                label: 'AddOn',
                                visibleOn: 'this.addOn && this.addOn.type === "text"'
                            })
                        ])
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
    TransferPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        var type = resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
            originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
        };
        if ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.extractValue) {
            dataSchema = {
                type: 'array',
                title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name)
            };
        }
        else if (((_j = node.schema) === null || _j === void 0 ? void 0 : _j.joinValues) === false) {
            dataSchema = {
                type: 'array',
                title: ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.label) || ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.name),
                items: {
                    type: 'object',
                    title: '成员',
                    properties: (_a = {},
                        _a[((_m = node.schema) === null || _m === void 0 ? void 0 : _m.labelField) || 'label'] = {
                            type: 'string',
                            title: '文本'
                        },
                        _a[((_o = node.schema) === null || _o === void 0 ? void 0 : _o.valueField) || 'value'] = {
                            type: type,
                            title: '值'
                        },
                        _a)
                },
                originalValue: dataSchema.originalValue
            };
        }
        return dataSchema;
    };
    TransferPlugin.id = 'TransferPlugin';
    return TransferPlugin;
}(BasePlugin));
export { TransferPlugin };
registerEditorPlugin(TransferPlugin);
