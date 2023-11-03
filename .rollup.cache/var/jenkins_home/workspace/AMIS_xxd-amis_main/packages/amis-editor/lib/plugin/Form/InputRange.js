import { __assign, __extends } from "tslib";
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
var RangeControlPlugin = /** @class */ (function (_super) {
    __extends(RangeControlPlugin, _super);
    function RangeControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-range';
        _this.$schema = '/schemas/RangeControlSchema.json';
        // 组件名称
        _this.name = '滑块';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-sliders';
        _this.pluginIcon = 'input-range-plugin';
        _this.description = '选择某个值或者某个范围';
        _this.docLink = '/amis/zh-CN/components/form/input-range';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-range',
            label: '滑块',
            name: 'range'
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
        _this.notRenderFormZone = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '滑块值变化时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'number',
                                        title: '当前滑块值'
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
                description: '当设置 showInput 为 true 时，输入框获取焦点时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'number',
                                        title: '当前数值'
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
                description: '当设置 showInput 为 true 时，输入框失去焦点时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'number',
                                        title: '当前数值'
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
                description: '清除输入框'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelTitle = '滑块';
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
                                getSchemaTpl('switch', {
                                    label: '双滑块',
                                    name: 'multiple'
                                }),
                                {
                                    type: 'container',
                                    className: 'ae-sub-content',
                                    visibleOn: 'data.multiple',
                                    body: [
                                        getSchemaTpl('joinValues', {
                                            onChange: function (value, oldValue, model, form) {
                                                form.deleteValueByName('value');
                                            }
                                        }),
                                        getSchemaTpl('delimiter', {
                                            onChange: function (value, oldValue, model, form) {
                                                form.deleteValueByName('value');
                                            }
                                        })
                                    ]
                                },
                                {
                                    type: 'ae-input-range-value',
                                    name: 'value',
                                    label: '默认值',
                                    visibleOn: 'data.multiple'
                                },
                                getSchemaTpl('valueFormula', {
                                    name: 'value',
                                    rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'input-number' }),
                                    valueType: 'number',
                                    visibleOn: '!data.multiple',
                                    pipeIn: defaultValue(0)
                                }),
                                getSchemaTpl('valueFormula', {
                                    name: 'min',
                                    rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'input-number' }),
                                    pipeIn: defaultValue(0),
                                    needDeleteProps: ['min'],
                                    label: '最小值',
                                    valueType: 'number'
                                }),
                                getSchemaTpl('valueFormula', {
                                    name: 'max',
                                    rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'input-number' }),
                                    pipeIn: defaultValue(100),
                                    needDeleteProps: ['max'],
                                    label: '最大值',
                                    valueType: 'number'
                                }),
                                {
                                    label: '步长',
                                    name: 'step',
                                    type: 'input-number',
                                    value: 1,
                                    pipeOut: function (value) {
                                        return value || 1;
                                    }
                                },
                                getSchemaTpl('unit'),
                                // tooltipVisible 为true时，会一直显示，为undefined时，才会鼠标移入显示
                                getSchemaTpl('switch', {
                                    name: 'tooltipVisible',
                                    label: '值标签',
                                    value: undefined,
                                    pipeOut: function (value) {
                                        return !!value ? undefined : false;
                                    },
                                    pipeIn: function (value) {
                                        return value === undefined || value === true ? true : false;
                                    }
                                }),
                                {
                                    type: 'container',
                                    className: 'ae-ExtendMore mb-2',
                                    visibleOn: 'data.tooltipVisible === undefined',
                                    body: [
                                        {
                                            type: 'select',
                                            name: 'tooltipPlacement',
                                            label: '方向',
                                            value: 'auto',
                                            options: [
                                                { label: '自动', value: 'auto' },
                                                { label: '上', value: 'top' },
                                                { label: '下', value: 'bottom' },
                                                { label: '左', value: 'left' },
                                                { label: '右', value: 'right' }
                                            ]
                                        }
                                    ]
                                },
                                getSchemaTpl('switch', {
                                    name: 'showInput',
                                    label: '可输入',
                                    value: false
                                }),
                                getSchemaTpl('switch', {
                                    name: 'clearable',
                                    label: '可重置',
                                    value: false,
                                    visibleOn: '!!data.showInput'
                                }),
                                getSchemaTpl('autoFillApi')
                            ]
                        },
                        {
                            title: '轨道',
                            body: [
                                {
                                    type: 'ae-partsControl',
                                    mode: 'normal'
                                },
                                {
                                    type: 'ae-marksControl',
                                    mode: 'normal',
                                    name: 'marks'
                                }
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
    RangeControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f, _g;
        if ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.multiple) {
            return {
                type: 'object',
                title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
                properties: {
                    max: {
                        type: 'number',
                        title: '最大值'
                    },
                    min: {
                        type: 'number',
                        title: '最小值'
                    }
                },
                originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
            };
        }
        return {
            type: 'number',
            title: ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.label) || ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.name),
            originalValue: (_g = node.schema) === null || _g === void 0 ? void 0 : _g.value // 记录原始值，循环引用检测需要
        };
    };
    RangeControlPlugin.id = 'RangeControlPlugin';
    return RangeControlPlugin;
}(BasePlugin));
export { RangeControlPlugin };
registerEditorPlugin(RangeControlPlugin);
