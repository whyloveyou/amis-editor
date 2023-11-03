import { __assign, __extends } from "tslib";
import { getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { formItemControl } from '../../component/BaseControl';
import { resolveOptionType } from '../../util';
var TagControlPlugin = /** @class */ (function (_super) {
    __extends(TagControlPlugin, _super);
    function TagControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-tag';
        _this.$schema = '/schemas/TagControlSchema.json';
        // 组件名称
        _this.name = '标签选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-tag';
        _this.pluginIcon = 'input-tag-plugin';
        _this.description = '配置 options 可以实现选择选项';
        _this.docLink = '/amis/zh-CN/components/form/input-tag';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-tag',
            label: '标签',
            name: 'tag',
            options: [
                { label: '红色', value: 'red' },
                { label: '绿色', value: 'green' },
                { label: '蓝色', value: 'blue' }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: __assign(__assign({}, _this.scaffold), { value: 'red' })
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '标签';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中值变化',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'array',
                                        title: '当前标签值'
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
                description: '获取焦点',
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
                                        title: '当前标签值'
                                    },
                                    selectedItems: {
                                        type: 'array',
                                        title: '选中的标签'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '标签列表'
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
                description: '失去焦点',
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
                                        title: '当前标签值'
                                    },
                                    selectedItems: {
                                        type: 'array',
                                        title: '选中的标签'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '标签列表'
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
                description: '重置为默认值'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelBodyCreator = function (context) {
            return formItemControl({
                common: {
                    replace: true,
                    body: [
                        getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                        getSchemaTpl('formItemName', {
                            required: true
                        }),
                        getSchemaTpl('label'),
                        getSchemaTpl('clearable'),
                        getSchemaTpl('optionsTip'),
                        getSchemaTpl('valueFormula', {
                            rendererSchema: function (schema) { return schema; },
                            mode: 'vertical' // 改成上下展示模式
                        }),
                        getSchemaTpl('joinValues'),
                        getSchemaTpl('delimiter'),
                        getSchemaTpl('extractValue'),
                        getSchemaTpl('autoFillApi', {
                            visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
                        }),
                        getSchemaTpl('autoFill', {
                            visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
                        })
                    ]
                },
                option: {
                    body: [
                        getSchemaTpl('optionControlV2', {
                            description: '设置选项后，输入时会下拉这些选项供用户参考。'
                        })
                    ]
                },
                status: {}
            }, context);
        };
        return _this;
    }
    TagControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    TagControlPlugin.id = 'TagControlPlugin';
    TagControlPlugin.scene = ['layout'];
    return TagControlPlugin;
}(BasePlugin));
export { TagControlPlugin };
registerEditorPlugin(TagControlPlugin);
