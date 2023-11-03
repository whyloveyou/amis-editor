import { __assign, __extends } from "tslib";
import { registerEditorPlugin, BasePlugin } from 'amis-editor-core';
import { getSchemaTpl } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper';
var SearchBoxPlugin = /** @class */ (function (_super) {
    __extends(SearchBoxPlugin, _super);
    function SearchBoxPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'search-box';
        _this.$schema = '/schemas/SearchBoxSchema.json';
        // 组件名称
        _this.name = '搜索框';
        _this.searchKeywords = '搜索框、searchbox';
        _this.isBaseComponent = true;
        _this.description = '用于展示一个简单搜索框，通常需要搭配其他组件使用。比如 page 配置 initApi 后，可以用来实现简单数据过滤查找，name keywords 会作为参数传递给 page 的 initApi。';
        _this.docLink = '/amis/zh-CN/components/search-box';
        _this.icon = 'fa fa-search';
        _this.pluginIcon = 'search-box-plugin';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'search-box',
            name: 'keyword',
            body: {
                type: 'tpl',
                tpl: '搜索框',
                wrapperComponent: '',
                inline: false
            },
            level: 'info'
        };
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { className: 'text-left', showCloseButton: true });
        _this.regions = [{ key: 'body', label: '内容区', placeholder: '搜索框内容' }];
        // 事件定义
        _this.events = [
            {
                eventName: 'search',
                eventLabel: '点击搜索',
                description: '点击搜索图标时触发',
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
                                        title: '搜索值'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '输入框值变化时触发',
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
                                        title: '搜索值'
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
                description: '输入框获取焦点时触发',
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
                                        title: '搜索值'
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
                description: '输入框失去焦点时触发',
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
                                        title: '搜索值'
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
                description: '清空输入框'
            },
            {
                actionType: 'setValue',
                actionLabel: '更新数据',
                description: '更新数据'
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelTitle = '搜索框';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基础',
                            body: [
                                getSchemaTpl('formItemName', {
                                    required: true
                                }),
                                getSchemaTpl('switch', {
                                    label: '可清除',
                                    name: 'clearable'
                                }),
                                getSchemaTpl('switch', {
                                    label: '清除后立即搜索',
                                    name: 'clearAndSubmit'
                                }),
                                getSchemaTpl('switch', {
                                    label: '立即搜索',
                                    name: 'searchImediately'
                                }),
                                getSchemaTpl('switch', {
                                    label: 'mini版本',
                                    name: 'mini'
                                }),
                                getSchemaTpl('switch', {
                                    label: '加强样式',
                                    name: 'enhance',
                                    visibleOn: '!data.mini'
                                }),
                                getSchemaTpl('placeholder')
                            ]
                        },
                        getSchemaTpl('status')
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        getSchemaTpl('style:classNames', { isFormItem: false })
                    ])
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: getSchemaTpl('eventControl', __assign({ name: 'onEvent' }, getEventControlConfig(_this.manager, context)))
                }
            ]);
        };
        return _this;
    }
    SearchBoxPlugin.id = 'SearchBoxPlugin';
    return SearchBoxPlugin;
}(BasePlugin));
export { SearchBoxPlugin };
registerEditorPlugin(SearchBoxPlugin);
