import { __assign, __extends, __read, __spreadArray } from "tslib";
import { LayoutBasePlugin, registerEditorPlugin, getSchemaTpl, VRenderer } from 'amis-editor-core';
import { RegionWrapper as Region } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control';
import React from 'react';
var SwitchContainerPlugin = /** @class */ (function (_super) {
    __extends(SwitchContainerPlugin, _super);
    function SwitchContainerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'switch-container';
        _this.$schema = '/schemas/SwitchContainerSchema.json';
        // 组件名称
        _this.name = '状态容器';
        _this.isBaseComponent = true;
        _this.description = '根据状态进行组件条件渲染的容器，方便设计多状态组件';
        _this.tags = ['布局容器'];
        _this.order = -2;
        _this.icon = 'fa fa-square-o';
        _this.pluginIcon = 'switch-container-plugin';
        _this.scaffold = {
            type: 'switch-container',
            items: [
                {
                    title: '状态一',
                    body: [
                        {
                            type: 'tpl',
                            tpl: '状态一内容',
                            wrapperComponent: ''
                        }
                    ]
                },
                {
                    title: '状态二',
                    body: [
                        {
                            type: 'tpl',
                            tpl: '状态二内容',
                            wrapperComponent: ''
                        }
                    ]
                }
            ],
            style: {
                position: 'static',
                display: 'block'
            }
        };
        _this.previewSchema = __assign({}, _this.scaffold);
        _this.regions = [
            {
                key: 'body',
                label: '内容区'
            }
        ];
        _this.panelTitle = '状态容器';
        _this.panelJustify = true;
        _this.vRendererConfig = {
            regions: {
                body: {
                    key: 'body',
                    label: '内容区',
                    placeholder: '状态',
                    wrapperResolve: function (dom) { return dom; }
                }
            },
            panelTitle: '状态',
            panelJustify: true,
            panelBodyCreator: function (context) {
                return getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        body: getSchemaTpl('collapseGroup', [
                            {
                                title: '基础',
                                body: [
                                    {
                                        name: 'title',
                                        label: '状态名称',
                                        type: 'input-text',
                                        required: true
                                    },
                                    getSchemaTpl('expressionFormulaControl', {
                                        evalMode: false,
                                        label: '状态条件',
                                        name: 'visibleOn',
                                        placeholder: '\\${xxx}'
                                    })
                                ]
                            }
                        ])
                    }
                ]);
            }
        };
        _this.wrapperProps = {
            unmountOnExit: true,
            mountOnEnter: true
        };
        _this.stateWrapperResolve = function (dom) { return dom; };
        _this.overrides = {
            renderBody: function (item) {
                var _a, _b;
                var dom = this.super(item);
                var info = this.props.$$editor;
                var items = this.props.items || [];
                var index = items.findIndex(function (cur) { return cur.$$id === item.$$id; });
                if (!info || !info.plugin) {
                    return dom;
                }
                var plugin = info.plugin;
                var id = item.$$id;
                var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.body;
                return (React.createElement(VRenderer, { type: info.type, plugin: info.plugin, renderer: info.renderer, multifactor: true, key: id, 
                    //$schema="/schemas/ListBodyField.json"
                    hostId: info.id, memberIndex: index, name: "".concat(item.title || "\u72B6\u6001".concat(index + 1)), id: id, draggable: false, wrapperResolve: plugin.stateWrapperResolve, schemaPath: "".concat(info.schemaPath, "/items/").concat(index), path: "".concat(this.props.$path, "/").concat(index), data: this.props.data }, region ? (React.createElement(Region, { key: region.key, preferTag: region.preferTag, name: region.key, label: region.label, regionConfig: region, placeholder: region.placeholder, editorStore: plugin.manager.store, manager: plugin.manager, children: dom, wrapperResolve: region.wrapperResolve, rendererName: info.renderer.name })) : (dom)));
            }
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
        _this.panelBodyCreator = function (context) {
            var _a, _b;
            var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
            var isFreeContainer = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.isFreeContainer) || false;
            var isFlexItem = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
            var isFlexColumnItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
            var displayTpl = [
                getSchemaTpl('layout:display'),
                getSchemaTpl('layout:flex-setting', {
                    visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")',
                    direction: curRendererSchema.direction,
                    justify: curRendererSchema.justify,
                    alignItems: curRendererSchema.alignItems
                }),
                getSchemaTpl('layout:flex-wrap', {
                    visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")'
                })
            ];
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    type: 'ae-listItemControl',
                                    mode: 'normal',
                                    name: 'items',
                                    label: '状态列表',
                                    addTip: '新增组件状态',
                                    items: [
                                        {
                                            type: 'input-text',
                                            placeholder: '请输入显示文本',
                                            label: '状态名称',
                                            mode: 'horizontal',
                                            name: 'title'
                                        },
                                        getSchemaTpl('expressionFormulaControl', {
                                            name: 'visibleOn',
                                            mode: 'horizontal',
                                            label: '显示条件'
                                        })
                                    ],
                                    scaffold: {
                                        title: '状态',
                                        body: [
                                            {
                                                type: 'tpl',
                                                tpl: '状态内容',
                                                wrapperComponent: '',
                                                inline: false
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        getSchemaTpl('status')
                    ])
                },
                {
                    title: '外观',
                    className: 'p-none',
                    body: getSchemaTpl('collapseGroup', __spreadArray([
                        {
                            title: '布局',
                            body: __spreadArray(__spreadArray(__spreadArray([
                                getSchemaTpl('layout:originPosition'),
                                getSchemaTpl('layout:inset', {
                                    mode: 'vertical'
                                })
                            ], __read((!isFreeContainer ? displayTpl : [])), false), __read((isFlexItem
                                ? [
                                    getSchemaTpl('layout:flex', {
                                        isFlexColumnItem: isFlexColumnItem,
                                        label: isFlexColumnItem ? '高度设置' : '宽度设置',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
                                    }),
                                    getSchemaTpl('layout:flex-grow', {
                                        visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
                                    }),
                                    getSchemaTpl('layout:flex-basis', {
                                        label: isFlexColumnItem ? '弹性高度' : '弹性宽度',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
                                    }),
                                    getSchemaTpl('layout:flex-basis', {
                                        label: isFlexColumnItem ? '固定高度' : '固定宽度',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
                                    })
                                ]
                                : [])), false), [
                                getSchemaTpl('layout:overflow-x', {
                                    visibleOn: "".concat(isFlexItem && !isFlexColumnItem, " && data.style.flex === '0 0 150px'")
                                }),
                                getSchemaTpl('layout:isFixedHeight', {
                                    visibleOn: "".concat(!isFlexItem || !isFlexColumnItem),
                                    onChange: function (value) {
                                        context === null || context === void 0 ? void 0 : context.node.setHeightMutable(value);
                                    }
                                }),
                                getSchemaTpl('layout:height', {
                                    visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                }),
                                getSchemaTpl('layout:max-height', {
                                    visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                }),
                                getSchemaTpl('layout:min-height', {
                                    visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
                                }),
                                getSchemaTpl('layout:overflow-y', {
                                    visibleOn: "".concat(!isFlexItem || !isFlexColumnItem, " && (data.isFixedHeight || data.style && data.style.maxHeight) || (").concat(isFlexItem && isFlexColumnItem, " && data.style.flex === '0 0 150px')")
                                }),
                                getSchemaTpl('layout:isFixedWidth', {
                                    visibleOn: "".concat(!isFlexItem || isFlexColumnItem),
                                    onChange: function (value) {
                                        context === null || context === void 0 ? void 0 : context.node.setWidthMutable(value);
                                    }
                                }),
                                getSchemaTpl('layout:width', {
                                    visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                }),
                                getSchemaTpl('layout:max-width', {
                                    visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                }),
                                getSchemaTpl('layout:min-width', {
                                    visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
                                }),
                                getSchemaTpl('layout:overflow-x', {
                                    visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " && (data.isFixedWidth || data.style && data.style.maxWidth)")
                                }),
                                !isFlexItem ? getSchemaTpl('layout:margin-center') : null,
                                !isFlexItem && !isFreeContainer
                                    ? getSchemaTpl('layout:textAlign', {
                                        name: 'style.textAlign',
                                        label: '内部对齐方式',
                                        visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
                                    })
                                    : null,
                                getSchemaTpl('layout:z-index'),
                                getSchemaTpl('layout:sticky', {
                                    visibleOn: 'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
                                }),
                                getSchemaTpl('layout:stickyPosition')
                            ], false)
                        }
                    ], __read(getSchemaTpl('theme:common', { exclude: ['layout'] })), false))
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
    /**
     * 补充切换的 toolbar
     * @param context
     * @param toolbars
     */
    SwitchContainerPlugin.prototype.buildEditorToolbar = function (context, toolbars) {
        if (context.info.plugin === this &&
            context.info.renderer.name === 'switch-container' &&
            !context.info.hostId) {
            var node_1 = context.node;
            toolbars.unshift({
                icon: 'fa fa-chevron-right',
                tooltip: '下个状态',
                onClick: function () {
                    var control = node_1.getComponent();
                    if (control === null || control === void 0 ? void 0 : control.switchTo) {
                        var index = control.state.activeIndex < 0 ? 0 : control.state.activeIndex;
                        control.switchTo(index + 1);
                    }
                }
            });
            toolbars.unshift({
                icon: 'fa fa-chevron-left',
                tooltip: '上个状态',
                onClick: function () {
                    var control = node_1.getComponent();
                    if (control === null || control === void 0 ? void 0 : control.switchTo) {
                        var index = control.state.activeIndex;
                        control.switchTo(index - 1);
                    }
                }
            });
        }
    };
    SwitchContainerPlugin.id = 'SwitchContainerPlugin';
    SwitchContainerPlugin.scene = ['layout'];
    return SwitchContainerPlugin;
}(LayoutBasePlugin));
export { SwitchContainerPlugin };
registerEditorPlugin(SwitchContainerPlugin);
