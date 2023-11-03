import { __extends } from "tslib";
import { BasePlugin, defaultValue, getI18nEnabled, getSchemaTpl, registerEditorPlugin, tipedLabel } from 'amis-editor-core';
var DividerPlugin = /** @class */ (function (_super) {
    __extends(DividerPlugin, _super);
    function DividerPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'divider';
        _this.$schema = '/schemas/DividerSchema.json';
        // 组件名称
        _this.name = '分隔线';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-minus';
        _this.pluginIcon = 'divider-plugin';
        _this.description = '用来展示一个分割线，可用来做视觉上的隔离。';
        _this.scaffold = {
            type: 'divider'
        };
        _this.previewSchema = {
            type: 'divider',
            className: 'm-t-none m-b-none'
        };
        _this.panelTitle = '分隔线';
        _this.panelJustify = true;
        _this.tags = ['展示'];
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = getI18nEnabled();
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                i18nEnabled
                                    ? {
                                        type: 'input-text-i18n',
                                        name: 'title',
                                        label: '标题',
                                        placeholder: '请输入标题'
                                    }
                                    : getSchemaTpl('valueFormula', {
                                        name: 'title',
                                        label: '标题',
                                        placeholder: '请输入标题',
                                        rendererSchema: {
                                            type: 'input-text'
                                        }
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
                                getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                getSchemaTpl('layout:width:v2', {
                                    visibleOn: 'data.style && data.style.position && (data.style.position === "fixed" || data.style.position === "absolute")'
                                }),
                                {
                                    mode: 'horizontal',
                                    type: 'select',
                                    label: '类型',
                                    name: 'lineStyle',
                                    value: 'solid',
                                    options: [
                                        {
                                            value: 'solid',
                                            label: '实线'
                                        },
                                        {
                                            value: 'dashed',
                                            label: '虚线'
                                        }
                                    ]
                                },
                                {
                                    mode: 'horizontal',
                                    type: 'select',
                                    label: '方向',
                                    name: 'direction',
                                    value: 'horizontal',
                                    options: [
                                        {
                                            value: 'horizontal',
                                            label: '水平'
                                        },
                                        {
                                            value: 'vertical',
                                            label: '垂直'
                                        }
                                    ]
                                },
                                {
                                    mode: 'horizontal',
                                    type: 'input-number',
                                    label: '角度',
                                    name: 'rotate',
                                    value: 0,
                                    min: -360,
                                    max: 360
                                },
                                getSchemaTpl('theme:select', {
                                    mode: 'horizontal',
                                    label: '线长',
                                    name: 'style.width',
                                    placeholder: '100%',
                                    visibleOn: 'data.direction !== "vertical"',
                                    clearValueOnHidden: true
                                }),
                                getSchemaTpl('theme:select', {
                                    mode: 'horizontal',
                                    label: '线长',
                                    name: 'style.height',
                                    placeholder: 'var(--sizes-base-15)',
                                    visibleOn: 'data.direction === "vertical"',
                                    clearValueOnHidden: true
                                }),
                                getSchemaTpl('theme:select', {
                                    mode: 'horizontal',
                                    label: '线宽',
                                    name: 'style.borderWidth',
                                    placeholder: '1px',
                                    visibleOn: '!data.title || data.direction === "vertical"'
                                }),
                                getSchemaTpl('theme:select', {
                                    mode: 'horizontal',
                                    label: '线宽',
                                    name: 'themeCss.titleWrapperControlClassName.border-bottom-width',
                                    placeholder: '1px',
                                    visibleOn: '!!data.title && data.direction !== "vertical"',
                                    clearValueOnHidden: true,
                                    pipeIn: function (value, form) {
                                        var _a, _b;
                                        if (value === undefined &&
                                            ((_b = (_a = form.data) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.borderWidth) !== undefined) {
                                            var bwidth_1 = form.data.style.borderWidth;
                                            setTimeout(function () {
                                                return form.setValueByName('themeCss.titleWrapperControlClassName.border-bottom-width', bwidth_1);
                                            });
                                            return bwidth_1;
                                        }
                                        return value;
                                    }
                                }),
                                getSchemaTpl('theme:colorPicker', {
                                    mode: 'horizontal',
                                    label: '颜色',
                                    name: 'color',
                                    placeholder: 'var(--colors-neutral-line-8)',
                                    labelMode: 'input',
                                    needGradient: true
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'style',
                                    hidePadding: true
                                })
                            ]
                        },
                        {
                            title: '标题样式',
                            visibleOn: '!!data.title && data.direction !== "vertical"',
                            body: [
                                {
                                    type: 'select',
                                    name: 'titlePosition',
                                    label: '位置',
                                    pipeIn: defaultValue('center'),
                                    options: [
                                        {
                                            value: 'left',
                                            label: '居左'
                                        },
                                        {
                                            value: 'center',
                                            label: '居中'
                                        },
                                        {
                                            value: 'right',
                                            label: '居右'
                                        }
                                    ],
                                    clearValueOnHidden: true
                                },
                                getSchemaTpl('theme:select', {
                                    label: tipedLabel('距离', '标题和最近左、右边框之间的距离，默认值5%'),
                                    name: 'themeCss.titleWrapperControlClassName.flex-basis',
                                    placeholder: '5%',
                                    visibleOn: 'data.titlePosition === "left" || data.titlePosition === "right"',
                                    clearValueOnHidden: true
                                }),
                                getSchemaTpl('theme:font', {
                                    title: '文字',
                                    name: 'themeCss.titleControlClassName.font',
                                    textAlign: false,
                                    clearValueOnHidden: true
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    name: 'themeCss.titleControlClassName.padding-and-margin',
                                    hidePadding: true,
                                    clearValueOnHidden: true
                                })
                            ]
                        }
                    ])
                }
            ]);
        };
        return _this;
    }
    DividerPlugin.id = 'DividerPlugin';
    DividerPlugin.scene = ['layout'];
    return DividerPlugin;
}(BasePlugin));
export { DividerPlugin };
registerEditorPlugin(DividerPlugin);
