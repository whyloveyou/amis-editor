import { __assign, __extends } from "tslib";
import { getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { resolveOptionType } from '../../util';
var CheckboxesControlPlugin = /** @class */ (function (_super) {
    __extends(CheckboxesControlPlugin, _super);
    function CheckboxesControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'checkboxes';
        _this.$schema = '/schemas/CheckboxesControlSchema.json';
        // 组件名称
        _this.name = '复选框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-check-square';
        _this.pluginIcon = 'checkboxes-plugin';
        _this.description = '通过<code>options</code>配置多个勾选框，也可以通过<code>source</code>拉取选项';
        _this.docLink = '/amis/zh-CN/components/form/checkboxes';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'checkboxes',
            label: '复选框',
            name: 'checkboxes',
            multiple: true,
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
                __assign({ value: 'A' }, _this.scaffold)
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '复选框';
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
                                [
                                    getSchemaTpl('switch', {
                                        label: '可全选',
                                        name: 'checkAll',
                                        value: false,
                                        visibleOn: 'data.multiple',
                                        onChange: function (value, origin, item, form) {
                                            if (!value) {
                                                // 可全选关闭时，默认全选也需联动关闭
                                                form.setValueByName('defaultCheckAll', false);
                                                form.setValueByName('checkAllText', undefined);
                                            }
                                        }
                                    }),
                                    {
                                        type: 'container',
                                        className: 'ae-ExtendMore mb-2',
                                        visibleOn: 'data.checkAll',
                                        body: [
                                            getSchemaTpl('switch', {
                                                label: '默认全选',
                                                name: 'defaultCheckAll',
                                                value: false
                                            }),
                                            {
                                                type: 'input-text',
                                                label: '全选文本',
                                                name: 'checkAllText'
                                            }
                                        ]
                                    }
                                ],
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: function (schema) { return schema; },
                                    useSelectMode: true,
                                    visibleOn: 'this.options && this.options.length > 0'
                                }),
                                getSchemaTpl('joinValues', {
                                    visibleOn: true
                                }),
                                getSchemaTpl('delimiter', {
                                    visibleOn: 'data.joinValues === true'
                                }),
                                getSchemaTpl('extractValue'),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('description'),
                                getSchemaTpl('autoFillApi', {
                                    trigger: 'change'
                                })
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                getSchemaTpl('optionControlV2', {
                                    multiple: true
                                }),
                                // 自定义选项模板
                                getSchemaTpl('optionsMenuTpl', {
                                    manager: _this.manager
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
                        getSchemaTpl('status', { isFormItem: true }),
                        getSchemaTpl('validation', { tag: ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            getSchemaTpl('style:formItem', { renderer: renderer }),
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
    CheckboxesControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    CheckboxesControlPlugin.id = 'CheckboxesControlPlugin';
    return CheckboxesControlPlugin;
}(BasePlugin));
export { CheckboxesControlPlugin };
registerEditorPlugin(CheckboxesControlPlugin);
