import { __assign, __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper';
var PlainPlugin = /** @class */ (function (_super) {
    __extends(PlainPlugin, _super);
    function PlainPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'plain';
        _this.$schema = '/schemas/PlainSchema.json';
        _this.disabledRendererPlugin = true; // 组件面板不显示
        // 组件名称
        _this.name = '纯文本';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-file-text-o';
        _this.pluginIcon = 'plain-plugin';
        _this.description = '用来展示纯文字，html 标签会被转义。';
        _this.docLink = '/amis/zh-CN/components/plain';
        _this.tags = ['展示'];
        _this.previewSchema = {
            type: 'plain',
            text: '这是纯文本',
            className: 'text-center',
            inline: false
        };
        _this.scaffold = {
            type: 'plain',
            tpl: '内容',
            inline: false
        };
        _this.panelTitle = '纯文本';
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
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [];
        _this.panelBodyCreator = function (context) {
            var isTableCell = context.info.renderer.name === 'table-cell';
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        body: getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    getSchemaTpl('textareaFormulaControl', {
                                        name: 'tpl',
                                        label: '内容',
                                        mode: 'normal',
                                        pipeIn: function (value, data) {
                                            return value || (data && data.text);
                                        },
                                        description: '如果当前字段有值，请不要设置，否则覆盖。支持使用 <code>\\${xxx}</code> 来获取变量，或者用 lodash.template 语法来写模板逻辑。<a target="_blank" href="/amis/zh-CN/docs/concepts/template">详情</a>'
                                    }),
                                    getSchemaTpl('placeholder', {
                                        pipeIn: defaultValue('-'),
                                        label: '占位符'
                                    })
                                ]
                            },
                            isTableCell ? null : getSchemaTpl('status')
                        ])
                    },
                    isTableCell
                        ? null
                        : {
                            title: '外观',
                            body: getSchemaTpl('collapseGroup', [
                                {
                                    title: '基本',
                                    body: [
                                        getSchemaTpl('switch', {
                                            name: 'inline',
                                            label: '内联模式',
                                            value: true
                                        })
                                    ]
                                },
                                getSchemaTpl('style:classNames', { isFormItem: false })
                            ])
                        },
                    {
                        title: '事件',
                        className: 'p-none',
                        body: [
                            getSchemaTpl('eventControl', __assign({ name: 'onEvent' }, getEventControlConfig(_this.manager, context)))
                        ]
                    }
                ])
            ];
        };
        return _this;
    }
    PlainPlugin.id = 'PlainPlugin';
    return PlainPlugin;
}(BasePlugin));
export { PlainPlugin };
registerEditorPlugin(PlainPlugin);
