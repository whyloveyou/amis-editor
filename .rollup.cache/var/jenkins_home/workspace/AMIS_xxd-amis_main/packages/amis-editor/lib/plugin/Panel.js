import { __extends, __read, __spreadArray } from "tslib";
import { Button } from 'amis';
import React from 'react';
import { BasePlugin, defaultValue, getSchemaTpl, registerEditorPlugin } from 'amis-editor-core';
var PanelPlugin = /** @class */ (function (_super) {
    __extends(PanelPlugin, _super);
    function PanelPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'panel';
        _this.$schema = '/schemas/panelSchema.json';
        _this.name = '面板';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-window-maximize';
        _this.pluginIcon = 'panel-plugin';
        _this.description = '展示一个面板，可以配置标题，内容区。';
        _this.docLink = '/amis/zh-CN/components/panel';
        _this.tags = ['布局容器'];
        _this.scaffold = {
            type: 'panel',
            title: '标题',
            body: '内容'
        };
        _this.previewSchema = {
            type: 'panel',
            title: '这是一个面板',
            body: '这是内容区',
            className: 'Panel--default text-left m-b-none',
            actions: [
                {
                    label: '按钮1',
                    type: 'button'
                },
                {
                    label: '按钮2',
                    type: 'button'
                }
            ]
        };
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                // 复写渲染器里面的 renderBody 方法
                renderMethod: 'renderBody',
                // 这个 case 很另类，要自己写。form 里面直接复用了 Panel 来输出内容。
                // 这种 case 应该跳过包裹 Region
                // 只有他自己输出时才包裹，form 调用进来是下发了 children 来完成渲染
                // 自己的话是其他方式。
                renderMethodOverride: function (regions, insertRegion) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var info = this.props.$$editor;
                        var dom = this.super.apply(this, __spreadArray([], __read(args), false));
                        if (info && !this.props.children) {
                            return insertRegion(this, dom, regions, info, info.plugin.manager);
                        }
                        return dom;
                    };
                }
            },
            {
                key: 'actions',
                label: '按钮组',
                renderMethod: 'renderActions',
                preferTag: '按钮'
            }
        ];
        _this.panelTitle = '面板';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var _a;
            var isForm = /(?:^|\/)form$/.test(context.path) || ((_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.type) === 'form';
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        body: [
                            getSchemaTpl('collapseGroup', [
                                {
                                    className: 'p-none',
                                    title: '基本',
                                    body: [
                                        getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                        getSchemaTpl('title'),
                                        isForm
                                            ? null
                                            : {
                                                children: (React.createElement(Button, { size: "sm", level: "info", className: "m-b", onClick: function () {
                                                        // this.manager.showInsertPanel('body')
                                                        _this.manager.showRendererPanel('');
                                                    }, block: true }, "\u5185\u5BB9\u533A\u65B0\u589E\u5185\u5BB9"))
                                            }
                                    ]
                                },
                                getSchemaTpl('status')
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        body: [
                            getSchemaTpl('collapseGroup', [
                                {
                                    className: 'p-none',
                                    title: '基本',
                                    body: [
                                        getSchemaTpl('switch', {
                                            name: 'affixFooter',
                                            label: '固定底部',
                                            value: false
                                        }),
                                        getSchemaTpl('horizontal', {
                                            visibleOn: '(data.mode || data.$$formMode) == "horizontal" && data.$$mode == "form"'
                                        })
                                    ]
                                },
                                {
                                    className: 'p-none',
                                    title: '内容区域展示',
                                    body: [
                                        getSchemaTpl('subFormItemMode', { label: '表单展示模式' }),
                                        getSchemaTpl('subFormHorizontalMode', {
                                            label: '表单水平占比'
                                        }),
                                        getSchemaTpl('subFormHorizontal')
                                    ]
                                },
                                {
                                    className: 'p-none',
                                    title: 'CSS 类名',
                                    body: [
                                        {
                                            name: isForm ? 'panelClassName' : 'className',
                                            label: '主题',
                                            type: 'select',
                                            size: 'sm',
                                            pipeIn: function (value) {
                                                return typeof value === 'string' &&
                                                    /(?:^|\s)(Panel\-\-(\w+))(?:$|\s)/.test(value)
                                                    ? RegExp.$1
                                                    : 'Panel--default';
                                            },
                                            pipeOut: function (value, origin) {
                                                return origin
                                                    ? "".concat(origin.replace(/(?:^|\s)(Panel\-\-(\w+))(?=($|\s))/g, ''), " ").concat(value)
                                                        .replace(/\s+/g, ' ')
                                                        .trim()
                                                    : value;
                                            },
                                            options: [
                                                {
                                                    label: '默认',
                                                    value: 'Panel--default'
                                                },
                                                {
                                                    label: '主色',
                                                    value: 'Panel--primary'
                                                },
                                                {
                                                    label: '提示',
                                                    value: 'Panel--info'
                                                },
                                                {
                                                    label: '成功',
                                                    value: 'Panel--success'
                                                },
                                                {
                                                    label: '警告',
                                                    value: 'Panel--warning'
                                                },
                                                {
                                                    label: '危险',
                                                    value: 'Panel--danger'
                                                }
                                            ]
                                        },
                                        getSchemaTpl('className', {
                                            label: '外层',
                                            name: isForm ? 'panelClassName' : 'className',
                                            pipeIn: defaultValue('Panel--default')
                                        }),
                                        getSchemaTpl('className', {
                                            name: 'headerClassName',
                                            label: '头部区域'
                                        }),
                                        getSchemaTpl('className', {
                                            name: 'bodyClassName',
                                            label: '内容区域'
                                        }),
                                        getSchemaTpl('className', {
                                            name: 'footerClassName',
                                            label: '底部区域'
                                        }),
                                        getSchemaTpl('className', {
                                            name: 'actionsClassName',
                                            label: '按钮外层'
                                        })
                                    ]
                                }
                            ])
                        ]
                    }
                ])
            ];
        };
        return _this;
    }
    PanelPlugin.prototype.buildEditorPanel = function (context, panels) {
        var plugin = this;
        var schema = context.schema;
        var store = this.manager.store;
        if (context.info.renderer.name === 'form' &&
            schema.wrapWithPanel !== false &&
            !context.selections.length &&
            false) {
            /** Panel相关的配置融合到From中了 */
            panels.push({
                key: 'panel',
                icon: 'fa fa-list-alt',
                pluginIcon: plugin.pluginIcon,
                title: this.panelTitle,
                render: this.manager.makeSchemaFormRender({
                    body: this.panelBodyCreator(context),
                    panelById: store.activeId
                })
            });
        }
        else {
            _super.prototype.buildEditorPanel.call(this, context, panels);
        }
    };
    PanelPlugin.id = 'PanelPlugin';
    return PanelPlugin;
}(BasePlugin));
export { PanelPlugin };
registerEditorPlugin(PanelPlugin);
