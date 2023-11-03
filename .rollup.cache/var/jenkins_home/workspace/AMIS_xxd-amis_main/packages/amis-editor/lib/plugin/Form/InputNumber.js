import { __assign, __extends, __read, __spreadArray } from "tslib";
import { getI18nEnabled } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { isObject } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl, tipedLabel } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { inputStateTpl } from '../../renderer/style-control/helper';
var NumberControlPlugin = /** @class */ (function (_super) {
    __extends(NumberControlPlugin, _super);
    function NumberControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-number';
        _this.$schema = '/schemas/NumberControlSchema.json';
        // 组件名称
        _this.name = '数字框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-sort-numeric-asc';
        _this.pluginIcon = 'input-number-plugin';
        _this.description = '支持设定最大值和最小值，以及步长与精度';
        _this.docLink = '/amis/zh-CN/components/form/input-number';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-number',
            label: '数字',
            name: 'number',
            keyboard: true
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                __assign(__assign({}, _this.scaffold), { value: 88 })
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '数字框';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '数值变化',
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
                eventName: 'focus',
                eventLabel: '获取焦点',
                description: '数字框获取焦点',
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
                description: '数字框失去焦点',
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
                description: '清空数字框内容'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '重置为默认值'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = getI18nEnabled();
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
                                    type: 'switch',
                                    label: tipedLabel('键盘事件', '通过键盘上下方向键来加减数据值'),
                                    name: 'keyboard',
                                    value: true,
                                    inputClassName: 'is-inline'
                                },
                                getSchemaTpl('kilobitSeparator'),
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
                                    valueType: 'number' // 期望数值类型
                                }),
                                getSchemaTpl('valueFormula', {
                                    name: 'min',
                                    rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { value: context === null || context === void 0 ? void 0 : context.schema.min }),
                                    needDeleteProps: ['min'],
                                    label: '最小值',
                                    valueType: 'number'
                                }),
                                getSchemaTpl('valueFormula', {
                                    name: 'max',
                                    rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { value: context === null || context === void 0 ? void 0 : context.schema.max }),
                                    needDeleteProps: ['max'],
                                    label: '最大值',
                                    valueType: 'number'
                                }),
                                {
                                    type: 'input-number',
                                    name: 'step',
                                    label: '步长',
                                    min: 0,
                                    value: 1
                                },
                                {
                                    type: 'input-number',
                                    name: 'precision',
                                    label: tipedLabel('小数位数', '根据四舍五入精确保留设置的小数位数'),
                                    min: 1,
                                    max: 100
                                },
                                getSchemaTpl('prefix'),
                                getSchemaTpl('suffix'),
                                getSchemaTpl('combo-container', {
                                    type: 'combo',
                                    label: '单位选项',
                                    mode: 'normal',
                                    name: 'unitOptions',
                                    items: [
                                        {
                                            placeholder: 'label',
                                            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                            name: 'label'
                                        },
                                        {
                                            placeholder: 'value',
                                            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                            name: 'value'
                                        }
                                    ],
                                    draggable: false,
                                    multiple: true,
                                    pipeIn: function (value) {
                                        if (!isObject(value)) {
                                            if (Array.isArray(value)) {
                                                return value.every(function (item) { return typeof item === 'string'; })
                                                    ? value.map(function (item) { return ({
                                                        label: item,
                                                        value: item
                                                    }); })
                                                    : value;
                                            }
                                            return [];
                                        }
                                        return value.map(function (item) { return ({
                                            label: item.value,
                                            value: item.value
                                        }); });
                                    },
                                    pipeOut: function (value) {
                                        if (!value.length) {
                                            return undefined;
                                        }
                                        return value;
                                    }
                                }),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('placeholder'),
                                getSchemaTpl('description'),
                                getSchemaTpl('autoFillApi')
                            ]
                        },
                        getSchemaTpl('status', { isFormItem: true }),
                        getSchemaTpl('validation', { tag: ValidatorTag.MultiSelect })
                    ], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'props' }))
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            getSchemaTpl('style:formItem', {
                                renderer: context.info.renderer,
                                schema: [
                                    {
                                        label: '快捷编辑',
                                        name: 'displayMode',
                                        type: 'select',
                                        pipeIn: defaultValue('base'),
                                        options: [
                                            {
                                                label: '单侧按钮',
                                                value: 'base'
                                            },
                                            {
                                                label: '两侧按钮',
                                                value: 'enhance'
                                            }
                                        ]
                                    }
                                ]
                            }),
                            getSchemaTpl('theme:form-label'),
                            getSchemaTpl('theme:form-description'),
                            {
                                title: '数字输入框样式',
                                body: __spreadArray([], __read(inputStateTpl('themeCss.inputControlClassName', 'inputNumber.base.base')), false)
                            },
                            getSchemaTpl('theme:cssCode', {
                                themeClass: [
                                    {
                                        name: '数字输入框',
                                        value: '',
                                        className: 'inputControlClassName',
                                        state: ['default', 'hover', 'active']
                                    }
                                ],
                                isFormItem: true
                            })
                        ], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'style' }))
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
    NumberControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c;
        return {
            type: 'number',
            title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
            originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
        };
    };
    NumberControlPlugin.id = 'NumberControlPlugin';
    return NumberControlPlugin;
}(BasePlugin));
export { NumberControlPlugin };
registerEditorPlugin(NumberControlPlugin);
