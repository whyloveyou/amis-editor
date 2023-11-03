import { __assign, __extends } from "tslib";
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { resolveOptionType } from '../../util';
var RadiosControlPlugin = /** @class */ (function (_super) {
    __extends(RadiosControlPlugin, _super);
    function RadiosControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'radios';
        _this.$schema = '/schemas/RadiosControlSchema.json';
        // 组件名称
        _this.name = '单选框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-dot-circle-o';
        _this.pluginIcon = 'radios-plugin';
        _this.description = '通过 options 配置选项，可通过 source 拉取选项';
        _this.docLink = '/amis/zh-CN/components/form/radios';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'radios',
            label: '单选框',
            name: 'radios',
            options: [
                {
                    label: '选项A',
                    value: 'A'
                },
                {
                    label: '选项B',
                    value: 'B'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                __assign(__assign({}, _this.scaffold), { value: 'A' })
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '单选框';
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
        _this.panelJustify = true;
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
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: function (schema) { return schema; },
                                    useSelectMode: true,
                                    visibleOn: 'this.options && this.options.length > 0'
                                }),
                                // getSchemaTpl('autoFill')
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('autoFillApi', {
                                    trigger: 'change'
                                })
                            ]
                        },
                        {
                            title: '选项',
                            body: [getSchemaTpl('optionControlV2'), getSchemaTpl('selectFirst')]
                        },
                        getSchemaTpl('status', { isFormItem: true }),
                        getSchemaTpl('validation', { tag: ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            getSchemaTpl('style:formItem', {
                                renderer: context.info.renderer,
                                schema: [
                                    getSchemaTpl('switch', {
                                        label: '一行选项显示',
                                        name: 'inline',
                                        hiddenOn: 'data.mode === "inline"',
                                        pipeIn: defaultValue(true)
                                    }),
                                    {
                                        label: '每行选项个数',
                                        name: 'columnsCount',
                                        hiddenOn: 'data.mode === "inline" || data.inline !== false',
                                        type: 'input-range',
                                        min: 1,
                                        max: 6,
                                        pipeIn: defaultValue(1)
                                    }
                                ]
                            }),
                            getSchemaTpl('style:classNames', {
                                schema: [
                                    getSchemaTpl('className', {
                                        label: '单个选项',
                                        name: 'itemClassName'
                                    })
                                ]
                            })
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
    RadiosControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
        return dataSchema;
    };
    RadiosControlPlugin.id = 'RadiosControlPlugin';
    RadiosControlPlugin.scene = ['layout'];
    return RadiosControlPlugin;
}(BasePlugin));
export { RadiosControlPlugin };
registerEditorPlugin(RadiosControlPlugin);
