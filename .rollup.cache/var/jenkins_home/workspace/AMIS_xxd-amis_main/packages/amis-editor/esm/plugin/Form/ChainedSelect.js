import { __assign, __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin, tipedLabel, getSchemaTpl, defaultValue } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
var ChainedSelectControlPlugin = /** @class */ (function (_super) {
    __extends(ChainedSelectControlPlugin, _super);
    function ChainedSelectControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'chained-select';
        _this.$schema = '/schemas/ChainedSelectControlSchema.json';
        // 组件名称
        _this.name = '链式下拉框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-th-list';
        _this.pluginIcon = 'chained-select-plugin';
        _this.description = '通过<code>source</code>拉取选项，只要有返回结果，就可以无限级别增加';
        _this.docLink = '/amis/zh-CN/components/form/chain-select';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'chained-select',
            label: '链式下拉',
            name: 'chainedSelect',
            joinValues: true
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: __assign({}, _this.scaffold)
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
        _this.panelTitle = '链式下拉';
        _this.notRenderFormZone = true;
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
                                    mode: 'vertical',
                                    rendererWrapper: true,
                                    label: tipedLabel('默认值', '请填入选项 Options 中 value 值')
                                }),
                                getSchemaTpl('switch', {
                                    label: tipedLabel('拼接值', '开启后将选中的选项 value 的值用连接符拼接起来，作为当前表单项的值'),
                                    name: 'joinValues',
                                    pipeIn: defaultValue(true)
                                }),
                                getSchemaTpl('delimiter', {
                                    visibleOn: 'data.joinValues !== false',
                                    clearValueOnHidden: true
                                }),
                                getSchemaTpl('extractValue', {
                                    visibleOn: 'data.joinValues === false',
                                    clearValueOnHidden: true
                                }),
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
                                getSchemaTpl('apiControl', {
                                    name: 'source',
                                    mode: 'normal',
                                    label: tipedLabel('获取选项接口', "<div>\u53EF\u7528\u53D8\u91CF\u8BF4\u660E</div><ul>\n                      <li><code>value</code>\u5F53\u524D\u503C</li>\n                      <li><code>level</code>\u62C9\u53D6\u7EA7\u522B\uFF0C\u4ECE <code>1</code>\u5F00\u59CB\u3002</li>\n                      <li><code>parentId</code>\u4E0A\u4E00\u5C42\u9009\u4E2D\u7684 <code>value</code> \u503C</li>\n                      <li><code>parent</code>\u4E0A\u4E00\u5C42\u9009\u4E2D\u9009\u9879\uFF0C\u5305\u542B <code>label</code> \u548C <code>value</code> \u7684\u503C\u3002</li>\n                  </ul>", {
                                        maxWidth: 'unset'
                                    })
                                }),
                                getSchemaTpl('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                {
                                    type: 'input-text',
                                    name: 'labelField',
                                    label: tipedLabel('选项标签字段', '默认渲染选项组，会获取每一项中的label变量作为展示文本'),
                                    pipeIn: defaultValue('label')
                                },
                                {
                                    type: 'input-text',
                                    name: 'valueField',
                                    label: tipedLabel('选项值字段', '默认渲染选项组，会获取每一项中的value变量作为表单项值'),
                                    pipeIn: defaultValue('value')
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
                            getSchemaTpl('style:classNames', {
                                schema: [
                                    getSchemaTpl('className', {
                                        name: 'descriptionClassName',
                                        label: '描述'
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
    ChainedSelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        // 默认文本，todo:异步数据case
        var type = 'string';
        var dataSchema = {
            type: type,
            title: ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.label) || ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.name),
            originalValue: (_d = node.schema) === null || _d === void 0 ? void 0 : _d.value // 记录原始值，循环引用检测需要
        };
        if ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.extractValue) {
            dataSchema = {
                type: 'array',
                title: ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.label) || ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.name)
            };
        }
        else if (((_h = node.schema) === null || _h === void 0 ? void 0 : _h.joinValues) === false) {
            dataSchema = {
                type: 'array',
                title: ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.label) || ((_k = node.schema) === null || _k === void 0 ? void 0 : _k.name),
                items: {
                    type: 'object',
                    title: '成员',
                    properties: (_a = {},
                        _a[((_l = node.schema) === null || _l === void 0 ? void 0 : _l.labelField) || 'label'] = {
                            type: 'string',
                            title: '文本'
                        },
                        _a[((_m = node.schema) === null || _m === void 0 ? void 0 : _m.valueField) || 'value'] = {
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
    ChainedSelectControlPlugin.id = 'ChainedSelectControlPlugin';
    return ChainedSelectControlPlugin;
}(BasePlugin));
export { ChainedSelectControlPlugin };
registerEditorPlugin(ChainedSelectControlPlugin);
