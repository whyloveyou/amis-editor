import { __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { getSchemaTpl } from 'amis-editor-core';
var IconPlugin = /** @class */ (function (_super) {
    __extends(IconPlugin, _super);
    function IconPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'icon';
        _this.$schema = '/schemas/Icon.json';
        // 组件名称
        _this.name = '图标';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-calendar';
        _this.panelTitle = '图标';
        _this.description = '用来展示一个图标，你可以配置不同的图标样式。';
        _this.docLink = '/amis/zh-CN/components/icon';
        _this.tags = ['展示'];
        _this.pluginIcon = 'button-plugin';
        _this.scaffold = {
            type: 'icon',
            icon: 'fa fa-spotify',
            vendor: ''
        };
        _this.previewSchema = {
            type: 'icon',
            icon: 'fa fa-spotify',
            vendor: ''
        };
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
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        body: getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    getSchemaTpl('icon', {
                                        label: '图标'
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
                                title: '基本样式',
                                body: [
                                    getSchemaTpl('theme:select', {
                                        label: '尺寸',
                                        name: 'themeCss.className.iconSize'
                                    }),
                                    getSchemaTpl('theme:colorPicker', {
                                        label: '颜色',
                                        name: "themeCss.className.font.color",
                                        labelMode: 'input'
                                    }),
                                    getSchemaTpl('theme:paddingAndMargin', {
                                        label: '边距'
                                    })
                                ]
                            }
                        ])
                    }
                    // {
                    //   title: '事件',
                    //   className: 'p-none',
                    //   body: [
                    //     getSchemaTpl('eventControl', {
                    //       name: 'onEvent',
                    //       ...getEventControlConfig(this.manager, context)
                    //     })
                    //   ]
                    // }
                ])
            ];
        };
        return _this;
    }
    IconPlugin.id = 'IconPlugin';
    return IconPlugin;
}(BasePlugin));
export { IconPlugin };
registerEditorPlugin(IconPlugin);
