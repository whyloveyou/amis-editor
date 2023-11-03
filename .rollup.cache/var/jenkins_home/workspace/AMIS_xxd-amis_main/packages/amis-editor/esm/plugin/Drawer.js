import { __assign, __awaiter, __extends, __generator, __read, __spreadArray } from "tslib";
import { registerEditorPlugin, BasePlugin, defaultValue, getSchemaTpl, noop, isEmpty, getI18nEnabled } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper';
import { tipedLabel } from 'amis-editor-core';
import omit from 'lodash/omit';
import { InlineModal } from './Dialog';
var DrawerPlugin = /** @class */ (function (_super) {
    __extends(DrawerPlugin, _super);
    function DrawerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'drawer';
        _this.$schema = '/schemas/DrawerSchema.json';
        // 组件名称
        _this.name = '抽屉式弹框';
        _this.isBaseComponent = true;
        _this.wrapperProps = {
            wrapperComponent: InlineModal,
            onClose: noop,
            resizable: false,
            show: true
        };
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                renderMethod: 'renderBody',
                renderMethodOverride: function (regions, insertRegion) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var info = this.props.$$editor;
                        var dom = this.super.apply(this, __spreadArray([], __read(args), false));
                        if (info && args[1] === 'body') {
                            return insertRegion(this, dom, regions, info, info.plugin.manager);
                        }
                        return dom;
                    };
                }
            },
            {
                key: 'actions',
                label: '按钮组',
                renderMethod: 'renderFooter',
                wrapperResolve: function (dom) { return dom; }
            }
        ];
        // 现在没用，后面弹窗优化后有用
        _this.events = [
            {
                eventName: 'confirm',
                eventLabel: '确认',
                description: '点击抽屉确认按钮时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前数据域，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'cancel',
                eventLabel: '取消',
                description: '点击抽屉取消按钮时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前数据域，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            }
        ];
        _this.actions = [
            {
                actionType: 'confirm',
                actionLabel: '确认',
                description: '触发抽屉确认操作'
            },
            {
                actionType: 'cancel',
                actionLabel: '取消',
                description: '触发抽屉取消操作'
            },
            {
                actionType: 'setValue',
                actionLabel: '变量赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelTitle = '弹框';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = getI18nEnabled();
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                {
                                    label: '标题',
                                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                    name: 'title'
                                },
                                getSchemaTpl('switch', {
                                    name: 'overlay',
                                    label: '显示蒙层',
                                    pipeIn: defaultValue(true)
                                }),
                                getSchemaTpl('switch', {
                                    name: 'showCloseButton',
                                    label: '展示关闭按钮',
                                    pipeIn: defaultValue(true)
                                }),
                                getSchemaTpl('switch', {
                                    name: 'closeOnOutside',
                                    label: '点击遮罩关闭'
                                }),
                                getSchemaTpl('switch', {
                                    label: '可按 Esc 关闭',
                                    name: 'closeOnEsc'
                                }),
                                {
                                    type: 'ae-StatusControl',
                                    label: '隐藏按钮区',
                                    mode: 'normal',
                                    name: 'hideActions',
                                    expressionName: 'hideActionsOn'
                                },
                                getSchemaTpl('switch', {
                                    name: 'resizable',
                                    label: '可拖拽抽屉大小',
                                    value: false
                                }),
                                getSchemaTpl('dataMap')
                            ]
                        }
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '样式',
                            body: [
                                {
                                    type: 'button-group-select',
                                    name: 'position',
                                    label: '位置',
                                    mode: 'horizontal',
                                    options: [
                                        {
                                            label: '左',
                                            value: 'left'
                                        },
                                        {
                                            label: '上',
                                            value: 'top'
                                        },
                                        {
                                            label: '右',
                                            value: 'right'
                                        },
                                        {
                                            label: '下',
                                            value: 'bottom'
                                        }
                                    ],
                                    pipeIn: defaultValue('right'),
                                    pipeOut: function (value) { return (value ? value : 'right'); },
                                    onChange: function (value, oldValue, model, form) {
                                        if (value === 'left' || value === 'right') {
                                            form.deleteValueByName('height');
                                        }
                                        else if (value === 'top' || value === 'bottom') {
                                            form.deleteValueByName('width');
                                        }
                                    }
                                },
                                {
                                    type: 'button-group-select',
                                    name: 'size',
                                    label: '尺寸',
                                    size: 'sm',
                                    mode: 'horizontal',
                                    options: [
                                        {
                                            label: '标准',
                                            value: ''
                                        },
                                        {
                                            label: '小',
                                            value: 'sm'
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
                                            label: '超大',
                                            value: 'xl'
                                        }
                                    ],
                                    pipeIn: defaultValue(''),
                                    pipeOut: function (value) { return (value ? value : undefined); }
                                },
                                getSchemaTpl('style:widthHeight', {
                                    widthSchema: {
                                        label: tipedLabel('宽度', '位置为 "左" 或 "右" 时生效。 默认宽度为"尺寸"字段配置的宽度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                        visibleOn: 'this.position === "left" || this.position === "right" || !this.position'
                                    },
                                    heightSchema: {
                                        label: tipedLabel('高度', '位置为 "上" 或 "下" 时生效。 默认宽度为"尺寸"字段配置的高度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                        visibleOn: 'this.position === "top" || this.position === "bottom"'
                                    }
                                }),
                                getSchemaTpl('theme:border', {
                                    name: 'themeCss.drawerClassName.border'
                                }),
                                getSchemaTpl('theme:radius', {
                                    name: 'themeCss.drawerClassName.radius'
                                }),
                                getSchemaTpl('theme:shadow', {
                                    name: 'themeCss.drawerClassName.box-shadow'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.drawerClassName.background',
                                    labelMode: 'input'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '遮罩颜色',
                                    name: 'themeCss.drawerMaskClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '标题区',
                            body: [
                                getSchemaTpl('theme:font', {
                                    label: '文字',
                                    name: 'themeCss.drawerTitleClassName.font'
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'themeCss.drawerHeaderClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.drawerHeaderClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '内容区',
                            body: [
                                getSchemaTpl('theme:border', {
                                    name: 'themeCss.drawerBodyClassName.border'
                                }),
                                getSchemaTpl('theme:radius', {
                                    name: 'themeCss.drawerBodyClassName.radius'
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'themeCss.drawerBodyClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.drawerBodyClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '底部区',
                            body: [
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'themeCss.drawerFooterClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.drawerFooterClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        }
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
    DrawerPlugin.prototype.buildSubRenderers = function () { };
    DrawerPlugin.prototype.buildDataSchemas = function (node, region, trigger) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var renderer, data, dataSchema, key;
            return __generator(this, function (_e) {
                renderer = (_a = this.manager.store.getNodeById(node.id)) === null || _a === void 0 ? void 0 : _a.getComponent();
                data = omit(renderer.props.$schema.data, '$$id');
                dataSchema = {};
                if (renderer.props.$schema.data === undefined || !isEmpty(data)) {
                    // 静态数据
                    for (key in data) {
                        if (!['&'].includes(key)) {
                            dataSchema[key] = {
                                type: (_b = typeof data[key]) !== null && _b !== void 0 ? _b : 'string',
                                title: key
                            };
                        }
                    }
                    // 弹窗改版可能会有多个按钮触发一个弹窗，无法确定按钮的上下文
                    // 数据链
                    // const hostNodeDataSchema =
                    //   await this.manager.config.getHostNodeDataSchema?.();
                    // hostNodeDataSchema
                    //   ?.filter(
                    //     (item: any) => !['system-variable', 'page-global'].includes(item.$id)
                    //   )
                    //   ?.forEach((item: any) => {
                    //     dataSchema = {
                    //       ...dataSchema,
                    //       ...item.properties
                    //     };
                    //   });
                }
                return [2 /*return*/, {
                        $id: 'drawer',
                        type: 'object',
                        title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
                        properties: dataSchema
                    }];
            });
        });
    };
    DrawerPlugin.id = 'DrawerPlugin';
    return DrawerPlugin;
}(BasePlugin));
export { DrawerPlugin };
registerEditorPlugin(DrawerPlugin);
