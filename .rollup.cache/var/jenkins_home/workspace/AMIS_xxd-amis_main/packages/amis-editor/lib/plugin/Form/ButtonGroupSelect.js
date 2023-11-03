import { __assign, __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { tipedLabel } from 'amis-editor-core';
import { getSchemaTpl, defaultValue } from 'amis-editor-core';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { ValidatorTag } from '../../validator';
import { resolveOptionType } from '../../util';
var ButtonGroupControlPlugin = /** @class */ (function (_super) {
    __extends(ButtonGroupControlPlugin, _super);
    function ButtonGroupControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'button-group-select';
        _this.$schema = '/schemas/ButtonGroupControlSchema.json';
        // 组件名称
        _this.name = '按钮点选';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-object-group';
        _this.pluginIcon = 'btn-select-plugin';
        _this.description = '用来展示多个按钮，视觉上会作为一个整体呈现，同时可以作为表单项选项选择器来用。';
        _this.docLink = '/amis/zh-CN/components/button-group';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'button-group-select',
            name: 'buttonGroupSelect',
            label: '按钮点选',
            inline: false,
            options: [
                {
                    label: '选项1',
                    value: 'a'
                },
                {
                    label: '选项2',
                    value: 'b'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: __assign(__assign({}, _this.scaffold), { value: 'a', label: '按钮点选', description: '按钮点选可以当选项用。' })
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '按钮点选';
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
                    body: [
                        getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                    getSchemaTpl('formItemName', {
                                        required: true
                                    }),
                                    getSchemaTpl('label'),
                                    getSchemaTpl('multiple'),
                                    getSchemaTpl('valueFormula', {
                                        rendererSchema: function (schema) { return schema; },
                                        useSelectMode: true,
                                        visibleOn: 'this.options && this.options.length > 0'
                                    }),
                                    getSchemaTpl('description')
                                ]
                            },
                            {
                                title: '按钮管理',
                                body: [getSchemaTpl('nav-badge'), getSchemaTpl('optionControlV2')]
                            },
                            getSchemaTpl('status', {
                                isFormItem: true
                            }),
                            getSchemaTpl('validation', { tag: ValidatorTag.MultiSelect })
                        ])
                    ]
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    getSchemaTpl('formItemMode'),
                                    getSchemaTpl('horizontal', {
                                        label: '',
                                        visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
                                    }),
                                    getSchemaTpl('switch', {
                                        name: 'tiled',
                                        label: tipedLabel('平铺模式', '使按钮宽度占满父容器，各按钮宽度自适应'),
                                        pipeIn: defaultValue(false),
                                        visibleOn: 'data.mode !== "inline"'
                                    }),
                                    getSchemaTpl('size'),
                                    getSchemaTpl('buttonLevel', {
                                        label: '按钮样式',
                                        name: 'btnLevel'
                                    }),
                                    getSchemaTpl('buttonLevel', {
                                        label: '按钮选中样式',
                                        name: 'btnActiveLevel',
                                        pipeIn: defaultValue('primary')
                                    })
                                ]
                            },
                            getSchemaTpl('style:classNames', {
                                isFormItem: true,
                                schema: [
                                    getSchemaTpl('className', {
                                        label: '按钮',
                                        name: 'btnClassName'
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
    ButtonGroupControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    ButtonGroupControlPlugin.id = 'ButtonGroupControlPlugin';
    return ButtonGroupControlPlugin;
}(BasePlugin));
export { ButtonGroupControlPlugin };
registerEditorPlugin(ButtonGroupControlPlugin);
