import { __assign, __extends, __read, __spreadArray } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { LayoutBasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
var WrapperPlugin = /** @class */ (function (_super) {
    __extends(WrapperPlugin, _super);
    function WrapperPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'wrapper';
        _this.$schema = '/schemas/WrapperSchema.json';
        _this.disabledRendererPlugin = true; // 组件面板不显示
        // 组件名称
        _this.name = '包裹';
        _this.isBaseComponent = true;
        _this.description = '类似于容器，唯一的区别在于会默认会有一层内边距。';
        _this.docLink = '/amis/zh-CN/components/wrapper';
        _this.tags = ['容器'];
        _this.icon = 'fa fa-square-o';
        _this.scaffold = {
            type: 'wrapper',
            body: '内容'
        };
        _this.previewSchema = __assign({}, _this.scaffold);
        _this.regions = [
            {
                key: 'body',
                label: '内容区'
            }
        ];
        _this.panelTitle = '包裹';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var _a, _b;
            var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
            // const isFlexContainer = this.manager?.isFlexContainer(context?.id);
            var isFlexItem = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
            var isFlexColumnItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        className: 'p-none',
                        body: [
                            getSchemaTpl('collapseGroup', [
                                {
                                    title: '布局',
                                    body: __spreadArray(__spreadArray([
                                        getSchemaTpl('layout:position', {
                                            visibleOn: '!data.stickyStatus'
                                        }),
                                        getSchemaTpl('layout:originPosition'),
                                        getSchemaTpl('layout:inset', {
                                            mode: 'vertical'
                                        }),
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
                                    ], __read((isFlexItem
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
                                        !isFlexItem
                                            ? getSchemaTpl('layout:textAlign', {
                                                name: 'style.textAlign',
                                                label: '内部对齐方式',
                                                visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
                                            })
                                            : null,
                                        getSchemaTpl('layout:z-index')
                                    ], false)
                                },
                                {
                                    title: '常用',
                                    body: [getSchemaTpl('layout:padding')]
                                },
                                getSchemaTpl('status')
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        className: 'p-none',
                        body: getSchemaTpl('collapseGroup', __spreadArray(__spreadArray([], __read(getSchemaTpl('style:common', ['layout'])), false), [
                            {
                                title: 'CSS 类名',
                                body: [
                                    getSchemaTpl('className', {
                                        description: '设置样式后，大小设置将无效。',
                                        pipeIn: defaultValue('bg-white')
                                    })
                                ]
                            }
                        ], false))
                    }
                ])
            ];
        };
        return _this;
    }
    WrapperPlugin.id = 'WrapperPlugin';
    WrapperPlugin.scene = ['layout'];
    return WrapperPlugin;
}(LayoutBasePlugin));
export { WrapperPlugin };
registerEditorPlugin(WrapperPlugin);
