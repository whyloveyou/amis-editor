import { __assign, __extends, __read, __spreadArray } from "tslib";
import { isObject } from 'amis';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { getSchemaTpl } from 'amis-editor-core';
import { escapeFormula } from '../util';
import { set } from 'lodash';
var EachPlugin = /** @class */ (function (_super) {
    __extends(EachPlugin, _super);
    function EachPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'each';
        _this.$schema = '/schemas/EachSchema.json';
        // 组件名称
        _this.name = '循环 Each';
        _this.isBaseComponent = true;
        _this.isListComponent = true;
        _this.memberImmutable = true;
        _this.description = '功能渲染器，可以基于现有变量循环输出渲染器。';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-repeat';
        _this.pluginIcon = 'each-plugin';
        _this.scaffold = {
            type: 'each',
            name: '',
            items: {
                type: 'container',
                body: [
                    {
                        type: 'container',
                        body: [
                            {
                                type: 'icon',
                                icon: 'fa fa-plane',
                                vendor: '',
                                themeCss: {
                                    className: {
                                        'padding-and-margin:default': {
                                            marginRight: '4px'
                                        },
                                        'font': {
                                            color: '#2856ad',
                                            fontSize: '20px'
                                        }
                                    }
                                }
                            },
                            {
                                type: 'tpl',
                                style: {
                                    fontWeight: 'var(--fonts-weight-3)',
                                    fontSize: '16px',
                                    color: 'var(--colors-brand-6)'
                                },
                                tpl: '回访数量TOP1',
                                inline: true,
                                wrapperComponent: ''
                            }
                        ],
                        style: {
                            position: 'static',
                            display: 'flex',
                            flexWrap: 'nowrap',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: '6px'
                        },
                        wrapperBody: false,
                        isFixedHeight: false,
                        isFixedWidth: false
                    },
                    {
                        type: 'container',
                        body: [
                            {
                                type: 'tpl',
                                tpl: '北京分公司',
                                inline: true,
                                wrapperComponent: '',
                                style: {
                                    'fontSize': 'var(--fonts-size-4)',
                                    'color': 'var(--colors-neutral-text-2)',
                                    'fontWeight': 'var(--fonts-weight-3)',
                                    'font-family': '-apple-system'
                                }
                            }
                        ],
                        style: {
                            position: 'static',
                            display: 'block'
                        },
                        wrapperBody: false
                    }
                ],
                size: 'none',
                style: {
                    position: 'static',
                    display: 'block',
                    flex: '0 0 150px',
                    marginRight: '20px',
                    paddingTop: '20px',
                    paddingRight: '15px',
                    paddingBottom: '20px',
                    paddingLeft: '15px',
                    flexBasis: '250px',
                    overflowX: 'auto',
                    overflowY: 'auto',
                    boxShadow: ' 0px 0px 8px 0px rgba(3, 3, 3, 0.1)',
                    radius: {
                        'top-left-border-radius': 'var(--borders-radius-3)',
                        'top-right-border-radius': 'var(--borders-radius-3)',
                        'bottom-left-border-radius': 'var(--borders-radius-3)',
                        'bottom-right-border-radius': 'var(--borders-radius-3)'
                    }
                },
                wrapperBody: false,
                isFixedHeight: false
            },
            placeholder: '',
            style: {
                position: 'static',
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '10px',
                marginBottom: '10px'
            },
            isFixedHeight: false,
            isFixedWidth: false,
            size: 'none'
        };
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { style: __assign(__assign({}, _this.scaffold.style), { transform: 'scale(0.6)', width: '600px', transformOrigin: 'left top' }), value: ['a', 'b'] });
        _this.panelTitle = '循环';
        _this.panelJustify = true;
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
                                    type: 'input-text',
                                    label: '组件名称',
                                    name: 'editorSetting.displayName'
                                },
                                getSchemaTpl('formItemName', {
                                    label: '绑定字段名',
                                    paramType: 'output'
                                }),
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: {
                                        type: 'input-number',
                                        min: 1
                                    },
                                    name: 'maxLength',
                                    label: '最大显示个数',
                                    valueType: 'number'
                                }),
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: {
                                        type: 'input-text'
                                    },
                                    name: 'placeholder',
                                    label: '空数据提示'
                                })
                            ]
                        },
                        getSchemaTpl('status')
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', __spreadArray([
                        {
                            title: '布局',
                            body: __spreadArray(__spreadArray([
                                getSchemaTpl('layout:originPosition'),
                                getSchemaTpl('layout:inset', {
                                    mode: 'vertical'
                                })
                            ], __read((!isFreeContainer ? displayTpl : [])), false), [
                                isFlexItem
                                    ? getSchemaTpl('layout:flex', {
                                        isFlexColumnItem: isFlexColumnItem,
                                        label: isFlexColumnItem ? '高度设置' : '宽度设置',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
                                    })
                                    : null,
                                isFlexItem
                                    ? getSchemaTpl('layout:flex-grow', {
                                        visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
                                    })
                                    : null,
                                isFlexItem
                                    ? getSchemaTpl('layout:flex-basis', {
                                        label: isFlexColumnItem ? '弹性高度' : '弹性宽度',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
                                    })
                                    : null,
                                isFlexItem
                                    ? getSchemaTpl('layout:flex-basis', {
                                        label: isFlexColumnItem ? '固定高度' : '固定宽度',
                                        visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
                                    })
                                    : null,
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
                }
            ]);
        };
        return _this;
    }
    EachPlugin.prototype.filterProps = function (props) {
        var _a;
        // 列表类型内的文本元素显示{{公式}}或者自定义展位，不显示实际值
        props = escapeFormula(props);
        // 循环编辑态显示2个元素
        props.value = [{}, {}];
        props.className = "".concat(props.className || '', " ae-Editor-list");
        if (props.items && !((_a = props.items.className) === null || _a === void 0 ? void 0 : _a.includes('listItem'))) {
            props.items.className = "".concat(props.items.className || '', " ae-Editor-eachItem");
        }
        return props;
    };
    EachPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var dataSchema = {
            $id: 'each',
            type: 'object',
            title: '当前循环项',
            properties: {}
        };
        var match = node.schema.source && String(node.schema.source).match(/{([\w-_]+)}/);
        var field = node.schema.name || (match === null || match === void 0 ? void 0 : match[1]);
        var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
        var schema = (_a = scope === null || scope === void 0 ? void 0 : scope.parent) === null || _a === void 0 ? void 0 : _a.getSchemaByPath(field);
        if (isObject(schema === null || schema === void 0 ? void 0 : schema.items)) {
            dataSchema = __assign(__assign({}, dataSchema), schema.items);
            // 循环添加索引方便渲染序号
            set(dataSchema, 'properties.index', {
                type: 'number',
                title: '索引'
            });
        }
        return dataSchema;
    };
    EachPlugin.id = 'EachPlugin';
    EachPlugin.scene = ['layout'];
    return EachPlugin;
}(BasePlugin));
export { EachPlugin };
registerEditorPlugin(EachPlugin);
