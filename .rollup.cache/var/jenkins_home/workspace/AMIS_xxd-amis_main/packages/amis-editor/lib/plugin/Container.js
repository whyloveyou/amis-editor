import { __assign, __extends, __read, __spreadArray } from "tslib";
import { LayoutBasePlugin, registerEditorPlugin, defaultValue, getSchemaTpl } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control';
var ContainerPlugin = /** @class */ (function (_super) {
    __extends(ContainerPlugin, _super);
    function ContainerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'container';
        _this.$schema = '/schemas/ContainerSchema.json';
        // 组件名称
        _this.name = '容器';
        _this.isBaseComponent = true;
        _this.description = '一个简单的容器，可以将多个渲染器放置在一起。';
        _this.tags = ['布局容器'];
        _this.order = -2;
        _this.icon = 'fa fa-square-o';
        _this.pluginIcon = 'container-plugin';
        _this.scaffold = {
            type: 'container',
            body: [],
            style: {
                position: 'static',
                display: 'block'
            },
            size: 'none',
            wrapperBody: false
        };
        _this.previewSchema = __assign({}, _this.scaffold);
        _this.regions = [
            {
                key: 'body',
                label: '内容区'
            }
        ];
        _this.panelTitle = '容器';
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
        _this.panelBodyCreator = function (context) {
            var _a, _b;
            var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
            var isRowContent = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row' ||
                (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row-reverse';
            // const isFlexContainer = this.manager?.isFlexContainer(context?.id);
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
                                    name: 'wrapperComponent',
                                    label: '容器标签',
                                    type: 'select',
                                    searchable: true,
                                    options: [
                                        'div',
                                        'p',
                                        'h1',
                                        'h2',
                                        'h3',
                                        'h4',
                                        'h5',
                                        'h6',
                                        'article',
                                        'aside',
                                        'code',
                                        'footer',
                                        'header',
                                        'section'
                                    ],
                                    pipeIn: defaultValue('div'),
                                    validations: {
                                        isAlphanumeric: true,
                                        matchRegexp: '/^(?!.*script).*$/' // 禁用一下script标签
                                    },
                                    validationErrors: {
                                        isAlpha: 'HTML标签不合法，请重新输入',
                                        matchRegexp: 'HTML标签不合法，请重新输入'
                                    },
                                    validateOnChange: false
                                },
                                getSchemaTpl('layout:padding')
                            ]
                        },
                        {
                            title: '布局',
                            body: __spreadArray(__spreadArray(__spreadArray([
                                getSchemaTpl('layout:position', {
                                    visibleOn: '!data.stickyStatus'
                                }),
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
                                    visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " || ").concat(isFlexItem, " && data.style.flex !== '0 0 150px'")
                                }),
                                getSchemaTpl('layout:min-width', {
                                    visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " || ").concat(isFlexItem, " && data.style.flex !== '0 0 150px'")
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
                        },
                        getSchemaTpl('status')
                    ])
                },
                {
                    title: '外观',
                    className: 'p-none',
                    body: getSchemaTpl('collapseGroup', __spreadArray([], __read(getSchemaTpl('theme:common', { exclude: ['layout'] })), false))
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
    ContainerPlugin.id = 'ContainerPlugin';
    ContainerPlugin.scene = ['layout'];
    return ContainerPlugin;
}(LayoutBasePlugin));
export { ContainerPlugin };
registerEditorPlugin(ContainerPlugin);
