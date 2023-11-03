import { __assign, __extends } from "tslib";
import React from 'react';
import { getSchemaTpl, tipedLabel } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { resolveOptionType } from '../../util';
var TabsTransferPlugin = /** @class */ (function (_super) {
    __extends(TabsTransferPlugin, _super);
    function TabsTransferPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tabs-transfer';
        _this.$schema = '/schemas/TransferControlSchema.json';
        // 组件名称
        _this.name = '组合穿梭器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-th-list';
        _this.pluginIcon = 'tabs-transfer-plugin';
        _this.description = '组合穿梭器组件';
        _this.docLink = '/amis/zh-CN/components/form/transfer';
        _this.tags = ['表单项'];
        _this.scaffold = {
            label: '组合穿梭器',
            type: 'tabs-transfer',
            name: 'tabsTransfer',
            selectMode: 'tree',
            options: [
                {
                    label: '成员',
                    children: [
                        {
                            label: '法师',
                            value: 'fashi',
                            children: [
                                {
                                    label: '诸葛亮',
                                    value: 'zhugeliang'
                                }
                            ]
                        },
                        {
                            label: '战士',
                            value: 'zhanshi',
                            children: [
                                {
                                    label: '曹操',
                                    value: 'caocao'
                                },
                                {
                                    label: '钟无艳',
                                    value: 'zhongwuyan'
                                }
                            ]
                        },
                        {
                            label: '打野',
                            value: 'daye',
                            children: [
                                {
                                    label: '李白',
                                    value: 'libai'
                                },
                                {
                                    label: '韩信',
                                    value: 'hanxin'
                                },
                                {
                                    label: '云中君',
                                    value: 'yunzhongjun'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '用户',
                    children: [
                        {
                            label: '法师',
                            value: 'fashi2',
                            children: [
                                {
                                    label: '诸葛亮',
                                    value: 'zhugeliang2'
                                }
                            ]
                        },
                        {
                            label: '战士',
                            value: 'zhanshi2',
                            children: [
                                {
                                    label: '曹操',
                                    value: 'caocao2'
                                },
                                {
                                    label: '钟无艳',
                                    value: 'zhongwuyan2'
                                }
                            ]
                        },
                        {
                            label: '打野',
                            value: 'daye2',
                            children: [
                                {
                                    label: '李白',
                                    value: 'libai2'
                                },
                                {
                                    label: '韩信',
                                    value: 'hanxin2'
                                },
                                {
                                    label: '云中君',
                                    value: 'yunzhongjun2'
                                }
                            ]
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
        _this.panelTitle = '组合穿梭器';
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
                eventName: 'tab-change',
                eventLabel: '选项卡切换',
                description: '选项卡切换时触发',
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
                                        title: '激活的索引'
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
                actionType: 'changeTabKey',
                actionLabel: '修改选中tab',
                description: '修改当前选中tab，来选择其他选项',
                descDetail: function (info) {
                    return (React.createElement("div", null,
                        React.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.__rendererLabel),
                        "\u4FEE\u6539\u9009\u4E2Dtab"));
                }
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelDefinitions = {
            options: {
                label: '选项 Options',
                name: 'options',
                type: 'combo',
                multiple: true,
                multiLine: true,
                draggable: true,
                mode: 'normal',
                addButtonText: '新增选项',
                scaffold: {
                    label: '',
                    value: ''
                },
                items: [
                    {
                        type: 'group',
                        body: [
                            getSchemaTpl('label', {
                                label: false,
                                placeholder: '名称',
                                required: true
                            }),
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
        // notRenderFormZone = true;
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
                                {
                                    label: '左侧选项展示',
                                    name: 'selectMode',
                                    type: 'select',
                                    value: 'tree',
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
                                            label: '树形选择形式',
                                            value: 'tree'
                                        },
                                        {
                                            label: '级联选择形式',
                                            value: 'chained'
                                        }
                                    ]
                                },
                                {
                                    label: '右侧结果标题',
                                    name: 'resultTitle',
                                    type: 'input-text',
                                    inputClassName: 'is-inline ',
                                    placeholder: '已选项'
                                },
                                getSchemaTpl('sortable'),
                                getSchemaTpl('searchable', {
                                    onChange: function (value, origin, item, form) {
                                        if (!value) {
                                            form.setValues({
                                                searchApi: undefined
                                            });
                                        }
                                    }
                                }),
                                getSchemaTpl('apiControl', {
                                    label: tipedLabel('检索接口', '可以通过接口获取检索结果，检索值可以通过变量\\${term}获取，如："https://xxx/search?name=\\${term}"'),
                                    mode: 'normal',
                                    name: 'searchApi',
                                    visibleOn: '!!searchable'
                                })
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                {
                                    $ref: 'options',
                                    name: 'options'
                                },
                                getSchemaTpl('apiControl', {
                                    label: tipedLabel('获取选项接口', '可以通过接口获取动态选项，一次拉取全部'),
                                    mode: 'normal',
                                    name: 'source'
                                }),
                                getSchemaTpl('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                getSchemaTpl('joinValues'),
                                getSchemaTpl('delimiter'),
                                getSchemaTpl('extractValue')
                                // getSchemaTpl('autoFillApi', {
                                //   visibleOn:
                                //     '!this.autoFill || this.autoFill.scene && this.autoFill.action'
                                // })
                            ]
                        },
                        {
                            title: '高级',
                            body: [
                                getSchemaTpl('virtualThreshold'),
                                getSchemaTpl('virtualItemHeight')
                            ]
                        },
                        getSchemaTpl('status', { isFormItem: true })
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
    TabsTransferPlugin.prototype.buildDataSchemas = function (node, region) {
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
    TabsTransferPlugin.id = 'TabsTransferPlugin';
    return TabsTransferPlugin;
}(BasePlugin));
export { TabsTransferPlugin };
registerEditorPlugin(TabsTransferPlugin);
