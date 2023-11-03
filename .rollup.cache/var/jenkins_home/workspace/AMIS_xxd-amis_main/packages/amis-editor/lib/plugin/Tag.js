import { __assign, __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { undefinedPipeOut, getSchemaTpl } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper';
var presetColors = [
    '#2468f2',
    '#b8babf',
    '#528eff',
    '#30bf13',
    '#f33e3e',
    '#ff9326',
    '#fff',
    '#000'
];
var TagPlugin = /** @class */ (function (_super) {
    __extends(TagPlugin, _super);
    function TagPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tag';
        _this.$schema = '/schemas/TagSchema.json';
        // 组件名称
        _this.name = '标签';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-tag';
        _this.pluginIcon = 'tag-plugin';
        _this.description = '用于标记和选择的标签';
        _this.docLink = '/amis/zh-CN/components/tag';
        _this.tags = ['展示'];
        _this.previewSchema = {
            type: 'tag',
            label: '普通标签',
            color: 'processing'
        };
        _this.scaffold = {
            type: 'tag',
            label: '普通标签',
            color: 'processing'
        };
        _this.panelTitle = '标签';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'click',
                eventLabel: '点击',
                description: '点击时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            },
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    label: {
                                        type: 'object',
                                        title: '标签名称'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'mouseenter',
                eventLabel: '鼠标移入',
                description: '鼠标移入时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            },
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    label: {
                                        type: 'object',
                                        title: '标签名称'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'mouseleave',
                eventLabel: '鼠标移出',
                description: '鼠标移出时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            },
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    label: {
                                        type: 'object',
                                        title: '标签名称'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'close',
                eventLabel: '点击关闭',
                description: '点击关闭时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            },
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    label: {
                                        type: 'object',
                                        title: '标签名称'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [];
        _this.panelBodyCreator = function (context) {
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                getSchemaTpl('valueFormula', {
                                    name: 'label',
                                    label: '标签内容',
                                    rendererSchema: {
                                        type: 'input-text'
                                    }
                                }),
                                {
                                    type: 'button-group-select',
                                    label: '模式',
                                    name: 'displayMode',
                                    value: 'normal',
                                    options: [
                                        {
                                            label: '普通',
                                            value: 'normal'
                                        },
                                        {
                                            label: '圆角',
                                            value: 'rounded'
                                        },
                                        {
                                            label: '状态',
                                            value: 'status'
                                        }
                                    ],
                                    onChange: function (value, origin, item, form) {
                                        if (value !== 'status') {
                                            form.setValues({
                                                icon: undefined
                                            });
                                        }
                                    }
                                },
                                getSchemaTpl('icon', {
                                    visibleOn: 'data.displayMode === "status"',
                                    label: '前置图标'
                                }),
                                getSchemaTpl('switch', {
                                    label: '可关闭',
                                    name: 'closable'
                                })
                            ]
                        },
                        getSchemaTpl('status')
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '颜色',
                            body: [
                                {
                                    type: 'input-color',
                                    label: '主题',
                                    name: 'color',
                                    presetColors: presetColors,
                                    pipeOut: undefinedPipeOut
                                },
                                {
                                    type: 'input-color',
                                    label: '背景色',
                                    name: 'style.backgroundColor',
                                    presetColors: presetColors,
                                    pipeOut: undefinedPipeOut
                                },
                                {
                                    type: 'input-color',
                                    label: '边框',
                                    name: 'style.borderColor',
                                    presetColors: presetColors,
                                    pipeOut: undefinedPipeOut
                                },
                                {
                                    type: 'input-color',
                                    label: '文字',
                                    name: 'style.color',
                                    presetColors: presetColors,
                                    pipeOut: undefinedPipeOut
                                }
                            ]
                        },
                        getSchemaTpl('style:classNames', {
                            isFormItem: false
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
    TagPlugin.id = 'TagPlugin';
    return TagPlugin;
}(BasePlugin));
export { TagPlugin };
registerEditorPlugin(TagPlugin);
