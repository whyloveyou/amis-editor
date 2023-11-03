import { __assign, __read, __spreadArray } from "tslib";
import { setSchemaTpl, getSchemaTpl, defaultValue } from 'amis-editor-core';
import kebabCase from 'lodash/kebabCase';
setSchemaTpl('style:formItem', function (_a) {
    var renderer = _a.renderer, schema = _a.schema;
    return {
        title: '表单项',
        key: 'formItem',
        body: [
            getSchemaTpl('formItemMode'),
            getSchemaTpl('labelHide'),
            getSchemaTpl('horizontal'),
            (renderer === null || renderer === void 0 ? void 0 : renderer.sizeMutable) !== false ? getSchemaTpl('formItemSize') : null
            // getSchemaTpl('formItemInline')
        ].concat(schema)
    };
});
setSchemaTpl('style:classNames', function (config) {
    var _a = config || {}, _b = _a.isFormItem, isFormItem = _b === void 0 ? true : _b, _c = _a.unsupportStatic, unsupportStatic = _c === void 0 ? false : _c, _d = _a.schema, schema = _d === void 0 ? [] : _d;
    return {
        title: 'CSS 类名',
        body: (isFormItem
            ? __spreadArray([
                getSchemaTpl('className', {
                    label: '表单项'
                }),
                getSchemaTpl('className', {
                    label: '标签',
                    name: 'labelClassName'
                }),
                getSchemaTpl('className', {
                    label: '控件',
                    name: 'inputClassName'
                })
            ], __read((unsupportStatic
                ? []
                : [
                    getSchemaTpl('className', {
                        label: '静态展示',
                        name: 'staticClassName'
                    })
                ])), false) : [
            getSchemaTpl('className', {
                label: '外层'
            })
        ]).concat(schema)
    };
});
setSchemaTpl('style:others', function (schemas) {
    if (schemas === void 0) { schemas = []; }
    return ({
        title: '其他项',
        body: __spreadArray([], __read(schemas), false)
    });
});
/**
 * 通用CSS Style控件
 * @param {string | Array<string>} exclude 需要隐藏的配置key
 * @param {string | Array<string>} include 包含的配置key，存在时，优先级高于exclude
 */
setSchemaTpl('style:common', function (exclude, include) {
    // key统一转换成Kebab case，eg: boxShadow => bos-shadow
    exclude = (exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : []).map(function (key) { return kebabCase(key); });
    include = (include ? (Array.isArray(include) ? include : [include]) : []).map(function (key) { return kebabCase(key); });
    return [
        {
            header: '布局',
            key: 'layout',
            body: [
                {
                    type: 'style-display',
                    label: false,
                    name: 'style'
                }
            ].filter(function (comp) { return !~exclude.indexOf(comp.type.replace(/^style-/i, '')); })
        },
        {
            header: '文字',
            key: 'font',
            body: [
                {
                    type: 'style-font',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '内外边距',
            key: 'box-model',
            body: [
                {
                    type: 'style-box-model',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '背景',
            key: 'background',
            body: [
                {
                    type: 'style-background',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '边框',
            key: 'border',
            body: [
                {
                    type: 'style-border',
                    label: false,
                    name: 'style'
                }
            ]
        },
        {
            header: '阴影',
            key: 'box-shadow',
            body: [
                {
                    type: 'style-box-shadow',
                    label: false,
                    name: 'style.boxShadow'
                }
            ]
        },
        {
            header: '其他',
            key: 'other',
            body: [
                {
                    label: '透明度',
                    name: 'style.opacity',
                    min: 0,
                    max: 1,
                    step: 0.05,
                    type: 'input-range',
                    pipeIn: defaultValue(1),
                    marks: {
                        '0%': '0',
                        '50%': '0.5',
                        '100%': '1'
                    }
                },
                {
                    label: '光标类型',
                    name: 'style.cursor',
                    type: 'select',
                    mode: 'row',
                    menuTpl: {
                        type: 'html',
                        html: "<span style='cursor:${value};'>${label}</span><code class='ae-Code'>${value}</code>",
                        className: 'ae-selection-code'
                    },
                    pipIn: defaultValue('default'),
                    options: [
                        { label: '默认', value: 'default' },
                        { label: '自动', value: 'auto' },
                        { label: '无指针', value: 'none' },
                        { label: '悬浮', value: 'pointer' },
                        { label: '帮助', value: 'help' },
                        { label: '文本', value: 'text' },
                        { label: '单元格', value: 'cell' },
                        { label: '交叉指针', value: 'crosshair' },
                        { label: '可移动', value: 'move' },
                        { label: '禁用', value: 'not-allowed' },
                        { label: '可抓取', value: 'grab' },
                        { label: '放大', value: 'zoom-in' },
                        { label: '缩小', value: 'zoom-out' }
                    ]
                }
            ]
        }
    ].filter(function (item) {
        return include.length ? ~include.indexOf(item.key) : !~exclude.indexOf(item.key);
    });
});
/**
 * 宽高配置控件
 * @param {object | undefined} options witdthSchema(宽度控件配置) heightSchema(高度控件配置)
 */
setSchemaTpl('style:widthHeight', function (option) {
    if (option === void 0) { option = {}; }
    var _a = option.widthSchema, widthSchema = _a === void 0 ? {} : _a, _b = option.heightSchema, heightSchema = _b === void 0 ? {} : _b;
    return {
        type: 'container',
        body: [
            __assign({ type: 'input-number', name: 'width', label: '宽度', unitOptions: ['px', '%', 'rem', 'em', 'vw'] }, widthSchema),
            __assign({ type: 'input-number', name: 'height', label: '高度', unitOptions: ['px', '%', 'rem', 'em', 'vh'] }, heightSchema)
        ]
    };
});
/**
 * 样式相关的属性面板，因为预计会比较多所以拆出来
 */
export var styleTpl = {
    name: 'style',
    type: 'combo',
    label: '',
    noBorder: true,
    multiLine: true,
    items: [
        {
            type: 'fieldSet',
            title: '文字',
            body: [
                {
                    type: 'group',
                    body: [
                        {
                            label: '文字大小',
                            type: 'input-text',
                            name: 'fontSize'
                        },
                        {
                            label: '文字粗细',
                            name: 'fontWeight',
                            type: 'select',
                            options: ['normal', 'bold', 'lighter', 'bolder']
                        }
                    ]
                },
                {
                    type: 'group',
                    body: [
                        {
                            label: '文字颜色',
                            type: 'input-color',
                            name: 'color'
                        },
                        {
                            label: '对齐方式',
                            name: 'textAlign',
                            type: 'select',
                            options: [
                                'left',
                                'right',
                                'center',
                                'justify',
                                'justify-all',
                                'start',
                                'end',
                                'match-parent'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '背景',
            body: [
                {
                    label: '颜色',
                    name: 'backgroundColor',
                    type: 'input-color'
                },
                getSchemaTpl('imageUrl', {
                    name: 'backgroundImage'
                })
            ]
        },
        {
            type: 'fieldSet',
            title: '边距',
            body: [
                {
                    type: 'group',
                    label: '外边距',
                    body: [
                        {
                            label: '上',
                            name: 'marginTop',
                            type: 'input-text'
                        },
                        {
                            label: '右',
                            name: 'marginRight',
                            type: 'input-text'
                        },
                        {
                            label: '下',
                            name: 'marginBottom',
                            type: 'input-text'
                        },
                        {
                            label: '左',
                            name: 'marginLeft',
                            type: 'input-text'
                        }
                    ]
                },
                {
                    type: 'group',
                    label: '内边距',
                    body: [
                        {
                            label: '上',
                            name: 'paddingTop',
                            type: 'input-text'
                        },
                        {
                            label: '右',
                            name: 'paddingRight',
                            type: 'input-text'
                        },
                        {
                            label: '下',
                            name: 'paddingBottom',
                            type: 'input-text'
                        },
                        {
                            label: '左',
                            name: 'paddingLeft',
                            type: 'input-text'
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '边框',
            body: [
                {
                    type: 'group',
                    body: [
                        {
                            label: '样式',
                            name: 'borderStyle',
                            type: 'select',
                            options: ['none', 'solid', 'dotted', 'dashed']
                        },
                        {
                            label: '颜色',
                            name: 'borderColor',
                            type: 'input-color'
                        }
                    ]
                },
                {
                    type: 'group',
                    body: [
                        {
                            label: '宽度',
                            name: 'borderWidth',
                            type: 'input-text'
                        },
                        {
                            label: '圆角宽度',
                            name: 'borderRadius',
                            type: 'input-text'
                        }
                    ]
                }
            ]
        },
        {
            type: 'fieldSet',
            title: '特效',
            body: [
                {
                    label: '透明度',
                    name: 'opacity',
                    min: 0,
                    max: 1,
                    step: 0.05,
                    type: 'input-range',
                    pipeIn: defaultValue(1)
                },
                {
                    label: '阴影',
                    name: 'boxShadow',
                    type: 'input-text'
                }
            ]
        }
    ]
};
/**
 * 新版主题
 */
// css类名
setSchemaTpl('theme:cssCode', function () {
    return {
        title: '自定义样式',
        body: [
            {
                type: 'theme-cssCode',
                label: false
            }
        ]
    };
});
// form label
setSchemaTpl('theme:form-label', function () {
    return {
        title: 'Label样式',
        body: [
            getSchemaTpl('theme:select', {
                label: '宽度',
                name: 'labelWidth'
            }),
            getSchemaTpl('theme:font', {
                label: '文字',
                name: 'themeCss.labelClassName.font:default',
                editorThemePath: 'form.item.default.label.body.font'
            }),
            getSchemaTpl('theme:paddingAndMargin', {
                name: 'themeCss.labelClassName.padding-and-margin:default'
            })
        ]
    };
});
// form description
setSchemaTpl('theme:form-description', function () {
    return {
        title: '描述样式',
        visibleOn: 'this.description',
        body: [
            getSchemaTpl('theme:font', {
                label: '文字',
                name: 'themeCss.descriptionClassName.font:default',
                editorThemePath: 'form.item.default.description.body.font'
            }),
            getSchemaTpl('theme:paddingAndMargin', {
                name: 'themeCss.descriptionClassName.padding-and-margin:default'
            })
        ]
    };
});
// 带提示的值输入框
setSchemaTpl('theme:select', function (option) {
    if (option === void 0) { option = {}; }
    return __assign({ mode: 'horizontal', type: 'amis-theme-select', label: '大小', name: "themeCss.className.select:default", options: '${sizesOptions}' }, option);
});
// 文字编辑器
setSchemaTpl('theme:font', function (option) {
    if (option === void 0) { option = {}; }
    return __assign({ mode: 'default', type: 'amis-theme-font-editor', label: '文字', name: "themeCss.className.font:default", needColorCustom: true }, option);
});
// 颜色选择器
setSchemaTpl('theme:colorPicker', function (option) {
    if (option === void 0) { option = {}; }
    return __assign({ mode: 'default', type: 'amis-theme-color-picker', label: '颜色', name: "themeCss.className.color:default", needCustom: true }, option);
});
// 边框选择器
setSchemaTpl('theme:border', function (option) {
    if (option === void 0) { option = {}; }
    return __assign({ mode: 'default', type: 'amis-theme-border', label: '边框', name: "themeCss.className.border:default", needColorCustom: true }, option);
});
// 边距选择器
setSchemaTpl('theme:paddingAndMargin', function (option) {
    if (option === void 0) { option = {}; }
    return __assign({ mode: 'default', type: 'amis-theme-padding-and-margin', label: '边距', name: "themeCss.className.padding-and-margin:default" }, option);
});
// 圆角选择器
setSchemaTpl('theme:radius', function (option) {
    if (option === void 0) { option = {}; }
    return __assign({ mode: 'default', type: 'amis-theme-radius', label: '圆角', name: "themeCss.className.radius:default" }, option);
});
// 阴影选择器
setSchemaTpl('theme:shadow', function (option) {
    if (option === void 0) { option = {}; }
    return __assign({ type: 'amis-theme-shadow-editor', label: false, name: "themeCss.className.boxShadow:default", hasSenior: true }, option);
});
// 尺寸选择器
setSchemaTpl('theme:size', function (option) {
    if (option === void 0) { option = {}; }
    return __assign({ mode: 'default', type: 'amis-theme-size-editor', label: false, name: "themeCss.className.size:default", options: '${sizesOptions}', hideMinWidth: true }, option);
});
setSchemaTpl('theme:base', function (option) {
    var _a = option.collapsed, collapsed = _a === void 0 ? false : _a, _b = option.extra, extra = _b === void 0 ? [] : _b, _c = option.classname, classname = _c === void 0 ? 'baseControlClassName' : _c, _d = option.title, title = _d === void 0 ? '基本样式' : _d, hiddenOn = option.hiddenOn, hidePaddingAndMargin = option.hidePaddingAndMargin;
    var curHidePaddingAndMargin = hidePaddingAndMargin !== null && hidePaddingAndMargin !== void 0 ? hidePaddingAndMargin : false;
    var styleStateFunc = function (visibleOn, state) {
        return [
            getSchemaTpl('theme:border', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".border:").concat(state)
            }),
            getSchemaTpl('theme:radius', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".radius:").concat(state)
            }),
            !curHidePaddingAndMargin
                ? getSchemaTpl('theme:paddingAndMargin', {
                    visibleOn: visibleOn,
                    name: "themeCss.".concat(classname, ".padding-and-margin:").concat(state)
                })
                : null,
            getSchemaTpl('theme:colorPicker', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".background:").concat(state),
                label: '背景',
                needCustom: true,
                needGradient: true,
                needImage: true,
                labelMode: 'input'
            }),
            getSchemaTpl('theme:shadow', {
                visibleOn: visibleOn,
                name: "themeCss.".concat(classname, ".boxShadow:").concat(state)
            })
        ]
            .filter(function (item) { return item; })
            .concat(extra.map(function (item) {
            return __assign(__assign({}, item), { visibleOn: visibleOn, name: "".concat(item.name, ":").concat(state) });
        }));
    };
    var styles = __spreadArray(__spreadArray(__spreadArray([
        {
            type: 'select',
            name: 'editorState',
            label: '状态',
            selectFirst: true,
            options: [
                {
                    label: '常规',
                    value: 'default'
                },
                {
                    label: '悬浮',
                    value: 'hover'
                },
                {
                    label: '点击',
                    value: 'active'
                }
            ]
        }
    ], __read(styleStateFunc("${editorState == 'default' || !editorState}", 'default')), false), __read(styleStateFunc("${editorState == 'hover'}", 'hover')), false), __read(styleStateFunc("${editorState == 'active'}", 'active')), false);
    return {
        title: title,
        collapsed: collapsed,
        body: styles,
        hiddenOn: hiddenOn
    };
});
setSchemaTpl('theme:common', function (option) {
    var _a = option || {}, exclude = _a.exclude, collapsed = _a.collapsed, _b = _a.extra, extra = _b === void 0 ? [] : _b, baseExtra = _a.baseExtra, layoutExtra = _a.layoutExtra, classname = _a.classname, baseTitle = _a.baseTitle, hidePaddingAndMargin = _a.hidePaddingAndMargin;
    var curCollapsed = collapsed !== null && collapsed !== void 0 ? collapsed : false; // 默认都展开
    // key统一转换成Kebab case，eg: boxShadow => bos-shadow
    exclude = (exclude ? (Array.isArray(exclude) ? exclude : [exclude]) : []).map(function (key) { return kebabCase(key); });
    return __spreadArray(__spreadArray([
        {
            header: '布局',
            key: 'layout',
            collapsed: curCollapsed,
            body: [
                {
                    type: 'style-display',
                    label: false,
                    name: 'style'
                }
            ]
                .filter(function (comp) { return !~exclude.indexOf(comp.type.replace(/^style-/i, '')); })
                .concat(layoutExtra || [])
        },
        getSchemaTpl('theme:base', {
            collapsed: curCollapsed,
            extra: baseExtra,
            classname: classname,
            title: baseTitle,
            hidePaddingAndMargin: hidePaddingAndMargin
        })
    ], __read(extra), false), [
        {
            title: '自定义样式',
            collapsed: curCollapsed,
            body: [
                {
                    type: 'theme-cssCode',
                    label: false
                }
            ]
        }
    ], false).filter(function (item) { return !~exclude.indexOf(item.key || ''); });
});
