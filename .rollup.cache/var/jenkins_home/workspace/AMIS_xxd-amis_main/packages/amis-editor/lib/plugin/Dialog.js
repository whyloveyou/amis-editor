import { __assign, __awaiter, __extends, __generator, __read, __spreadArray } from "tslib";
import React from 'react';
import { Button, Drawer, Modal } from 'amis-ui';
import { registerEditorPlugin, BasePlugin, getSchemaTpl, noop, defaultValue, isEmpty, getI18nEnabled } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper';
import omit from 'lodash/omit';
var DialogPlugin = /** @class */ (function (_super) {
    __extends(DialogPlugin, _super);
    function DialogPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'dialog';
        _this.$schema = '/schemas/DialogSchema.json';
        // 组件名称
        _this.name = '弹窗';
        _this.isBaseComponent = true;
        _this.wrapperProps = {
            wrapperComponent: InlineModal,
            onClose: noop,
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
                description: '点击弹窗确认按钮时触发',
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
                description: '点击弹窗取消按钮时触发',
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
                description: '触发弹窗确认操作'
            },
            {
                actionType: 'cancel',
                actionLabel: '取消',
                description: '触发弹窗取消操作'
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
            var _a;
            var i18nEnabled = getI18nEnabled();
            // 确认对话框的配置面板
            if (((_a = context.schema) === null || _a === void 0 ? void 0 : _a.dialogType) === 'confirm') {
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
                                        type: 'input-text',
                                        name: 'title'
                                    },
                                    getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                    {
                                        label: '确认按钮文案',
                                        type: 'input-text',
                                        name: 'confirmText'
                                    },
                                    getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                    {
                                        label: '取消按钮文案',
                                        type: 'input-text',
                                        name: 'cancelText'
                                    },
                                    getSchemaTpl('switch', {
                                        label: '可按 Esc 关闭',
                                        name: 'closeOnEsc',
                                        value: false
                                    })
                                ]
                            }
                        ])
                    },
                    {
                        title: '外观',
                        body: getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    {
                                        label: '尺寸',
                                        type: 'button-group-select',
                                        name: 'size',
                                        size: 'sm',
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
                                    getSchemaTpl('buttonLevel', {
                                        label: '确认按钮样式',
                                        name: 'confirmBtnLevel'
                                    }),
                                    getSchemaTpl('buttonLevel', {
                                        label: '取消按钮样式',
                                        name: 'cancelBtnLevel'
                                    })
                                ]
                            }
                        ])
                    }
                ]);
            }
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
                                    label: '展示关闭按钮',
                                    name: 'showCloseButton',
                                    value: true
                                }),
                                getSchemaTpl('switch', {
                                    label: '点击遮罩关闭',
                                    name: 'closeOnOutside',
                                    value: false
                                }),
                                getSchemaTpl('switch', {
                                    label: '可按 Esc 关闭',
                                    name: 'closeOnEsc',
                                    value: false
                                }),
                                {
                                    type: 'ae-StatusControl',
                                    label: '隐藏按钮区',
                                    mode: 'normal',
                                    name: 'hideActions',
                                    expressionName: 'hideActionsOn'
                                },
                                getSchemaTpl('switch', {
                                    label: '左下角展示报错消息',
                                    name: 'showErrorMsg',
                                    value: true
                                }),
                                getSchemaTpl('switch', {
                                    label: '左下角展示loading动画',
                                    name: 'showLoading',
                                    value: true
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
                                    label: '尺寸',
                                    type: 'button-group-select',
                                    name: 'size',
                                    size: 'xs',
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
                                        },
                                        {
                                            label: '自定义',
                                            value: 'custom'
                                        }
                                    ],
                                    pipeIn: defaultValue(''),
                                    pipeOut: function (value) { return (value ? value : undefined); },
                                    onChange: function (value, oldValue, model, form) {
                                        if (value !== 'custom') {
                                            form.setValueByName('style', undefined);
                                        }
                                    }
                                },
                                {
                                    type: 'input-number',
                                    label: '宽度',
                                    name: 'style.width',
                                    disabled: true,
                                    clearable: true,
                                    unitOptions: ['px', '%', 'em', 'vh', 'vw'],
                                    visibleOn: 'this.size !== "custom"',
                                    pipeIn: function (value, form) {
                                        if (!form.data.size) {
                                            return '500px';
                                        }
                                        else if (form.data.size === 'sm') {
                                            return '350px';
                                        }
                                        else if (form.data.size === 'md') {
                                            return '800px';
                                        }
                                        else if (form.data.size === 'lg') {
                                            return '1100px';
                                        }
                                        else if (form.data.size === 'xl') {
                                            return '90%';
                                        }
                                        return '';
                                    }
                                },
                                {
                                    type: 'input-number',
                                    label: '宽度',
                                    name: 'style.width',
                                    clearable: true,
                                    unitOptions: ['px', '%', 'em', 'vh', 'vw'],
                                    visibleOn: 'this.size === "custom"',
                                    pipeOut: function (value) {
                                        var curValue = parseInt(value);
                                        if (value === 'auto' || curValue || curValue === 0) {
                                            return value;
                                        }
                                        else {
                                            return undefined;
                                        }
                                    }
                                },
                                {
                                    type: 'input-number',
                                    label: '高度',
                                    name: 'style.height',
                                    disabled: true,
                                    visibleOn: 'this.size !== "custom"',
                                    clearable: true,
                                    unitOptions: ['px', '%', 'em', 'vh', 'vw']
                                },
                                {
                                    type: 'input-number',
                                    label: '高度',
                                    name: 'style.height',
                                    visibleOn: 'this.size === "custom"',
                                    clearable: true,
                                    unitOptions: ['px', '%', 'em', 'vh', 'vw'],
                                    pipeOut: function (value) {
                                        var curValue = parseInt(value);
                                        if (value === 'auto' || curValue || curValue === 0) {
                                            return value;
                                        }
                                        else {
                                            return undefined;
                                        }
                                    }
                                },
                                getSchemaTpl('theme:border', {
                                    name: 'themeCss.dialogClassName.border'
                                }),
                                getSchemaTpl('theme:radius', {
                                    name: 'themeCss.dialogClassName.radius'
                                }),
                                getSchemaTpl('theme:shadow', {
                                    name: 'themeCss.dialogClassName.box-shadow'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.dialogClassName.background',
                                    labelMode: 'input'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '遮罩颜色',
                                    name: 'themeCss.dialogMaskClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '标题区',
                            body: [
                                getSchemaTpl('theme:font', {
                                    label: '文字',
                                    name: 'themeCss.dialogTitleClassName.font',
                                    hasVertical: false
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'themeCss.dialogHeaderClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.dialogHeaderClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '内容区',
                            body: [
                                getSchemaTpl('theme:border', {
                                    name: 'themeCss.dialogBodyClassName.border'
                                }),
                                getSchemaTpl('theme:radius', {
                                    name: 'themeCss.dialogBodyClassName.radius'
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'themeCss.dialogBodyClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.dialogBodyClassName.background',
                                    labelMode: 'input'
                                })
                            ]
                        },
                        {
                            title: '底部区',
                            body: [
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'themeCss.dialogFooterClassName.padding-and-margin',
                                    label: '间距'
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    label: '背景',
                                    name: 'themeCss.dialogFooterClassName.background',
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
    DialogPlugin.prototype.buildSubRenderers = function () { };
    DialogPlugin.prototype.buildDataSchemas = function (node, region, trigger) {
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
                    // TODO 数据链
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
                        $id: 'dialog',
                        type: 'object',
                        title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
                        properties: dataSchema
                    }];
            });
        });
    };
    /**
     * 为了让 dialog 的按钮可以点击编辑
     */
    DialogPlugin.prototype.patchSchema = function (schema, info, props) {
        if (Array.isArray(schema.actions)) {
            return;
        }
        return __assign(__assign({}, schema), { actions: [
                {
                    type: 'button',
                    actionType: 'cancel',
                    label: '取消'
                },
                (props === null || props === void 0 ? void 0 : props.confirm)
                    ? {
                        type: 'button',
                        actionType: 'confirm',
                        label: '确定',
                        primary: true
                    }
                    : null
            ].filter(function (item) { return item; }) });
    };
    DialogPlugin.id = 'DialogPlugin';
    return DialogPlugin;
}(BasePlugin));
export { DialogPlugin };
registerEditorPlugin(DialogPlugin);
var InlineModal = /** @class */ (function (_super) {
    __extends(InlineModal, _super);
    function InlineModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineModal.prototype.componentDidMount = function () { };
    InlineModal.prototype.render = function () {
        var _a = this.props, type = _a.type, children = _a.children, dialogType = _a.dialogType, cancelText = _a.cancelText, confirmText = _a.confirmText, cancelBtnLevel = _a.cancelBtnLevel, confirmBtnLevel = _a.confirmBtnLevel, editorDialogMountNode = _a.editorDialogMountNode;
        var Container = type === 'drawer' ? Drawer : Modal;
        if (dialogType === 'confirm') {
            children = children.filter(function (item) { return (item === null || item === void 0 ? void 0 : item.key) !== 'actions'; });
            return (React.createElement(Modal, __assign({}, this.props, { container: editorDialogMountNode }),
                React.createElement("div", { className: "ae-InlineModal" },
                    children,
                    React.createElement("div", { className: "ae-InlineModal-footer" },
                        React.createElement(Button, { className: "ae-InlineModal-footer-btn", level: cancelBtnLevel }, cancelText || '取消'),
                        React.createElement(Button, { className: "ae-InlineModal-footer-btn", level: confirmBtnLevel }, confirmText || '确认')))));
        }
        return (React.createElement(Container, __assign({}, this.props, { container: editorDialogMountNode }), children));
    };
    return InlineModal;
}(React.Component));
export { InlineModal };
