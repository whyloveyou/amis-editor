import { __assign, __extends } from "tslib";
import { EditorAvailableLanguages as availableLanguages } from 'amis';
import { defaultValue, getSchemaTpl, undefinedPipeOut } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
var DiffEditorControlPlugin = /** @class */ (function (_super) {
    __extends(DiffEditorControlPlugin, _super);
    function DiffEditorControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'diff-editor';
        _this.$schema = '/schemas/DiffEditorControlSchema.json';
        // 组件名称
        _this.name = 'Diff编辑器';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-columns';
        _this.pluginIcon = 'diff-editor-plugin';
        _this.description = "\u5DE6\u53F3\u4E24\u8FB9\u7684\u4EE3\u7801\u505A\u5BF9\u6BD4\uFF0C\u652F\u6301\u7684\u8BED\u8A00\u5305\u62EC\uFF1A".concat(availableLanguages
            .slice(0, 10)
            .join('，'), "\u7B49\u7B49");
        _this.docLink = '/amis/zh-CN/components/form/diff-editor';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'diff-editor',
            label: 'diff编辑器',
            name: 'diff'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                __assign(__assign({}, _this.scaffold), { value: 'Hello World\nLine 1\nNew line\nBla Bla', diffValue: 'Hello World\nLine 2' })
            ]
        };
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '代码变化',
                description: '代码变化时触发',
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
                                        title: '当前代码内容'
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
                description: '右侧输入框获取焦点时触发',
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
                                        title: '当前代码内容'
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
                description: '右侧输入框失去焦点时触发',
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
                                        title: '当前代码内容'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
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
                actionType: 'focus',
                actionLabel: '获取焦点',
                description: '获取焦点，焦点落在右侧编辑面板'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelTitle = 'Diff编辑器';
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
                                {
                                    label: '语言',
                                    name: 'language',
                                    type: 'select',
                                    value: 'javascript',
                                    searchable: true,
                                    options: availableLanguages.concat()
                                },
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: {
                                        type: 'textarea',
                                        value: context === null || context === void 0 ? void 0 : context.schema.diffValue
                                    },
                                    label: '左侧默认值',
                                    name: 'diffValue',
                                    mode: 'vertical' // 改成上下展示模式
                                }),
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: {
                                        type: 'textarea',
                                        value: context === null || context === void 0 ? void 0 : context.schema.value
                                    },
                                    label: '右侧默认值',
                                    mode: 'vertical' // 改成上下展示模式
                                }),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('description'),
                                getSchemaTpl('autoFillApi')
                            ]
                        },
                        getSchemaTpl('status', {
                            isFormItem: true,
                            unsupportStatic: true
                        }),
                        getSchemaTpl('validation', {
                            tag: ValidatorTag.All
                        })
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        getSchemaTpl('style:formItem', {
                            renderer: context.info.renderer,
                            schema: [
                                {
                                    name: 'size',
                                    type: 'select',
                                    pipeIn: defaultValue(''),
                                    pipeOut: undefinedPipeOut,
                                    label: '控件尺寸',
                                    options: [
                                        {
                                            label: '默认',
                                            value: ''
                                        },
                                        {
                                            label: '中',
                                            value: 'md'
                                        },
                                        {
                                            label: '大',
                                            value: 'lg'
                                        },
                                        {
                                            label: '特大',
                                            value: 'xl'
                                        },
                                        {
                                            label: '超大',
                                            value: 'xxl'
                                        }
                                    ]
                                }
                            ]
                        }),
                        getSchemaTpl('style:classNames', {
                            unsupportStatic: true
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
    DiffEditorControlPlugin.prototype.filterProps = function (props) {
        props.disabled = true;
        return props;
    };
    DiffEditorControlPlugin.id = 'DiffEditorControlPlugin';
    return DiffEditorControlPlugin;
}(BasePlugin));
export { DiffEditorControlPlugin };
registerEditorPlugin(DiffEditorControlPlugin);
