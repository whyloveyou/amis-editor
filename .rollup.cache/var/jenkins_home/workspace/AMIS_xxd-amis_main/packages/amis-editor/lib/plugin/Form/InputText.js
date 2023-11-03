import { __assign, __extends, __read, __spreadArray } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl, tipedLabel } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { inputStateTpl } from '../../renderer/style-control/helper';
import { resolveOptionType } from '../../util';
var isText = 'data.type === "input-text"';
var isPassword = 'data.type === "input-password"';
var isEmail = 'data.type === "input-email"';
var isUrl = 'data.type === "input-url"';
function isTextShow(value, name) {
    return ['input-text'].includes(value) ? !!name : false;
}
var TextControlPlugin = /** @class */ (function (_super) {
    __extends(TextControlPlugin, _super);
    function TextControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-text';
        _this.$schema = '/schemas/TextControlSchema.json';
        _this.order = -600;
        // 添加源对应组件中文名称 & type字段
        _this.searchKeywords = '文本框、邮箱框、input-email、URL框、input-url、密码框、input-password';
        // 组件名称
        _this.name = '文本框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-terminal';
        _this.pluginIcon = 'input-text-plugin';
        _this.description = '文本输入框，支持普通文本、密码、URL、邮箱等多种内容输入';
        _this.docLink = '/amis/zh-CN/components/form/text';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-text',
            label: '文本',
            name: 'text'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: [
                __assign({}, _this.scaffold)
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '文本框';
        _this.events = [
            // {
            //   eventName: 'click',
            //   eventLabel: '点击',
            //   description: '点击事件'
            // },
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '输入框内容变化',
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
                                        title: '当前文本内容'
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
                description: '输入框获取焦点',
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
                                        title: '当前文本内容'
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
                description: '输入框失去焦点',
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
                                        title: '当前文本内容'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
            // 貌似无效，先下掉
            // {
            //   eventName: 'enter',
            //   eventLabel: '回车',
            //   description: '按键回车'
            // }
        ];
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清空输入框内容'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '将值重置为resetValue，若没有配置resetValue，则清空'
            },
            {
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var renderer = context.info.renderer;
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                getSchemaTpl('formItemName', {
                                    required: true
                                }),
                                getSchemaTpl('label'),
                                getSchemaTpl('inputType', {
                                    value: _this.scaffold.type,
                                    onChange: function (value, oldValue, model, form) {
                                        var _a = form.data, showCounter = _a.showCounter, validations = _a.validations, _b = _a.validationErrors, validationErrors = _b === void 0 ? {} : _b, autoComplete = _a.autoComplete;
                                        var is_old_email = oldValue === 'input-email';
                                        var is_old_url = oldValue === 'input-url';
                                        if (is_old_email) {
                                            validations && delete validations.isEmail;
                                            validationErrors && delete validationErrors.isEmail;
                                        }
                                        if (is_old_url) {
                                            validations && delete validations.isUrl;
                                            validationErrors && delete validationErrors.isUrl;
                                        }
                                        form.setValues({
                                            type: value,
                                            showCounter: ['input-url', 'input-email'].includes(value)
                                                ? undefined
                                                : !!showCounter,
                                            autoComplete: ['input-text'].includes(value)
                                                ? autoComplete
                                                : undefined
                                        });
                                        form.changeValue('validations', __assign({}, validations));
                                        form.changeValue('validationErrors', __assign({}, validationErrors));
                                    }
                                }),
                                getSchemaTpl('tplFormulaControl', {
                                    name: 'value',
                                    label: '默认值'
                                }),
                                getSchemaTpl('clearable'),
                                getSchemaTpl('showCounter', {
                                    visibleOn: "".concat(isText, " || ").concat(isPassword)
                                }),
                                {
                                    name: 'maxLength',
                                    label: tipedLabel('最大字数', '限制输入最多文字数量'),
                                    type: 'input-number',
                                    min: 0,
                                    step: 1
                                },
                                {
                                    name: 'addOn',
                                    label: tipedLabel('AddOn', '输入框左侧或右侧的附加挂件'),
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    formType: 'extend',
                                    title: 'AddOn',
                                    bulk: false,
                                    defaultData: {
                                        label: '按钮',
                                        type: 'button'
                                    },
                                    form: {
                                        body: [
                                            {
                                                name: 'type',
                                                label: '类型',
                                                type: 'button-group-select',
                                                inputClassName: 'items-center',
                                                pipeIn: defaultValue('button'),
                                                options: [
                                                    {
                                                        label: '文本',
                                                        value: 'text'
                                                    },
                                                    {
                                                        label: '按钮',
                                                        value: 'button'
                                                    },
                                                    {
                                                        label: '提交',
                                                        value: 'submit'
                                                    }
                                                ]
                                            },
                                            getSchemaTpl('horizontal-align', {
                                                name: 'position',
                                                pipeIn: defaultValue('right')
                                            }),
                                            getSchemaTpl('addOnLabel'),
                                            getSchemaTpl('icon')
                                        ]
                                    }
                                },
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('placeholder'),
                                getSchemaTpl('description'),
                                getSchemaTpl('autoFillApi')
                            ]
                        },
                        {
                            title: '选项',
                            visibleOn: "".concat(isText, " && (data.options  || data.autoComplete || data.source)"),
                            body: [
                                getSchemaTpl('optionControlV2'),
                                getSchemaTpl('multiple', {
                                    visibleOn: "".concat(isText, " || ").concat(isUrl)
                                }),
                                {
                                    type: 'ae-Switch-More',
                                    mode: 'normal',
                                    label: tipedLabel('自动补全', '根据输入内容，调用接口提供选项。当前输入值可用${term}变量'),
                                    visibleOn: isText,
                                    formType: 'extend',
                                    defaultData: {
                                        autoComplete: {
                                            method: 'get',
                                            url: ''
                                        }
                                    },
                                    form: {
                                        body: [
                                            getSchemaTpl('apiControl', {
                                                name: 'autoComplete',
                                                label: '接口',
                                                description: '',
                                                visibleOn: 'data.autoComplete !== false'
                                            }),
                                            {
                                                label: tipedLabel('显示字段', '选项文本对应的数据字段，多字段合并请通过模板配置'),
                                                type: 'input-text',
                                                name: 'labelField',
                                                placeholder: '选项文本对应的字段'
                                            },
                                            {
                                                label: '值字段',
                                                type: 'input-text',
                                                name: 'valueField',
                                                placeholder: '值对应的字段'
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        getSchemaTpl('status', {
                            isFormItem: true,
                            readonly: true
                        }),
                        getSchemaTpl('validation', {
                            tag: function (data) {
                                switch (data.type) {
                                    case 'input-password':
                                        return ValidatorTag.Password;
                                    case 'input-email':
                                        return ValidatorTag.Email;
                                    case 'input-url':
                                        return ValidatorTag.URL;
                                    default:
                                        return ValidatorTag.Text;
                                }
                            }
                        })
                        // {
                        //   title: '高级',
                        //   body: [
                        //     getSchemaTpl('autoFill')
                        //   ]
                        // }
                    ], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'props' }))
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        getSchemaTpl('style:formItem', { renderer: renderer }),
                        getSchemaTpl('theme:form-label'),
                        getSchemaTpl('theme:form-description'),
                        {
                            title: '输入框样式',
                            body: __spreadArray([], __read(inputStateTpl('themeCss.inputControlClassName', 'input.base.default')), false)
                        },
                        {
                            title: 'AddOn样式',
                            visibleOn: 'this.addOn && this.addOn.type === "text"',
                            body: [
                                getSchemaTpl('theme:font', {
                                    label: '文字',
                                    name: 'themeCss.addOnClassName.font:default'
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'themeCss.addOnClassName.padding-and-margin:default'
                                })
                            ]
                        },
                        getSchemaTpl('theme:cssCode', {
                            themeClass: [
                                {
                                    name: '输入框',
                                    value: '',
                                    className: 'inputControlClassName',
                                    state: ['default', 'hover', 'active']
                                },
                                {
                                    name: 'addOn',
                                    value: 'addOn',
                                    className: 'addOnClassName'
                                }
                            ],
                            isFormItem: true
                        })
                    ], __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { configTitle: 'style' }))
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
    TextControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        var type = resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
            originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
        };
        // 选择器模式
        if ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.options) {
            if (((_g = node.schema) === null || _g === void 0 ? void 0 : _g.joinValues) === false) {
                dataSchema = __assign(__assign({}, dataSchema), { type: 'object', title: ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.label) || ((_j = node.schema) === null || _j === void 0 ? void 0 : _j.name), properties: (_a = {},
                        _a[((_k = node.schema) === null || _k === void 0 ? void 0 : _k.labelField) || 'label'] = {
                            type: 'string',
                            title: '文本'
                        },
                        _a[((_l = node.schema) === null || _l === void 0 ? void 0 : _l.valueField) || 'value'] = {
                            type: type,
                            title: '值'
                        },
                        _a) });
            }
            if ((_m = node.schema) === null || _m === void 0 ? void 0 : _m.multiple) {
                if ((_o = node.schema) === null || _o === void 0 ? void 0 : _o.extractValue) {
                    dataSchema = {
                        type: 'array',
                        title: ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.label) || ((_q = node.schema) === null || _q === void 0 ? void 0 : _q.name)
                    };
                }
                else if (((_r = node.schema) === null || _r === void 0 ? void 0 : _r.joinValues) === false) {
                    dataSchema = {
                        type: 'array',
                        title: ((_s = node.schema) === null || _s === void 0 ? void 0 : _s.label) || ((_t = node.schema) === null || _t === void 0 ? void 0 : _t.name),
                        items: {
                            type: 'object',
                            title: '成员',
                            properties: dataSchema.properties
                        },
                        originalValue: dataSchema.originalValue
                    };
                }
            }
        }
        return dataSchema;
    };
    TextControlPlugin.id = 'TextControlPlugin';
    TextControlPlugin.scene = ['layout'];
    return TextControlPlugin;
}(BasePlugin));
export { TextControlPlugin };
registerEditorPlugin(TextControlPlugin);
