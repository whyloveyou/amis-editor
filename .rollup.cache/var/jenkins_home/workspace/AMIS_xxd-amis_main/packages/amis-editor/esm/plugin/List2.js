import { __assign, __extends, __read, __spreadArray } from "tslib";
import { isObject } from 'amis';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { getSchemaTpl } from 'amis-editor-core';
import { repeatArray } from 'amis-editor-core';
import set from 'lodash/set';
import { escapeFormula } from '../util';
var List2Plugin = /** @class */ (function (_super) {
    __extends(List2Plugin, _super);
    function List2Plugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'cards';
        _this.$schema = '/schemas/CardsSchema.json';
        // 组件名称
        _this.name = '列表';
        _this.isBaseComponent = true;
        _this.isListComponent = true;
        _this.memberImmutable = true;
        _this.description = '功能类似于表格，但是用一个个小卡片来展示数据。当前组件需要配置数据源，不自带数据拉取，请优先使用 「CRUD」 组件。';
        _this.docLink = '/amis/zh-CN/components/cards';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-window-maximize';
        _this.pluginIcon = 'cards-plugin';
        _this.scaffold = {
            type: 'cards',
            columnsCount: 1,
            card: {
                type: 'container',
                body: [
                    {
                        type: 'container',
                        body: [
                            {
                                type: 'tpl',
                                tpl: '01',
                                inline: true,
                                wrapperComponent: '',
                                style: {
                                    color: 'var(--colors-neutral-text-2)',
                                    fontSize: 'var(--fonts-size-3)',
                                    fontWeight: 'var(--fonts-weight-5)',
                                    marginRight: '10px'
                                }
                            },
                            {
                                type: 'tpl',
                                tpl: '/',
                                inline: true,
                                wrapperComponent: '',
                                style: {
                                    marginRight: '10px',
                                    fontSize: 'var(--fonts-size-3)',
                                    color: '#cccccc'
                                },
                                id: 'u:95d2a3ac3e70'
                            },
                            {
                                type: 'container',
                                body: [
                                    {
                                        type: 'tpl',
                                        tpl: '3月',
                                        inline: true,
                                        wrapperComponent: '',
                                        style: {
                                            fontSize: 'var(--fonts-size-6)'
                                        }
                                    },
                                    {
                                        type: 'tpl',
                                        tpl: '2023',
                                        inline: true,
                                        wrapperComponent: '',
                                        style: {
                                            fontSize: 'var(--fonts-size-6)'
                                        }
                                    }
                                ],
                                style: {
                                    position: 'static',
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                wrapperBody: false,
                                isFixedHeight: false,
                                isFixedWidth: false
                            }
                        ],
                        size: 'none',
                        style: {
                            'position': 'static',
                            'display': 'flex',
                            'flex': '1 1 auto',
                            'flexGrow': 0,
                            'flexBasis': 'auto',
                            'flexWrap': 'nowrap',
                            'justifyContent': 'flex-start',
                            'alignItems': 'center',
                            'paddingLeft': '20px',
                            'paddingRight': '40px',
                            'right-border-width': 'var(--borders-width-2)',
                            'right-border-style': 'var(--borders-style-2)',
                            'right-border-color': '#ececec',
                            'marginRight': '40px'
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
                                tpl: '列表标题',
                                inline: true,
                                wrapperComponent: '',
                                style: {
                                    fontSize: 'var(--fonts-size-5)',
                                    color: 'var(--colors-neutral-text-4)',
                                    fontWeight: 'var(--fonts-weight-4)',
                                    marginBottom: '10px'
                                },
                                maxLine: 1,
                                id: 'u:105ca9cda3ef'
                            },
                            {
                                type: 'tpl',
                                tpl: '这是内容简介，可以设置显示行数',
                                inline: true,
                                wrapperComponent: '',
                                maxLine: 1,
                                style: {
                                    fontSize: '13px',
                                    color: 'var(--colors-neutral-text-5)'
                                }
                            }
                        ],
                        size: 'none',
                        style: {
                            position: 'static',
                            display: 'flex',
                            flex: '1 1 auto',
                            flexGrow: 1,
                            flexBasis: 'auto',
                            flexWrap: 'nowrap',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        },
                        wrapperBody: false,
                        isFixedHeight: false,
                        isFixedWidth: false
                    },
                    {
                        type: 'container',
                        body: [
                            {
                                type: 'button',
                                label: '查看详情',
                                onEvent: {
                                    click: {
                                        actions: []
                                    }
                                },
                                level: 'default',
                                size: 'default',
                                editorState: 'default',
                                themeCss: {
                                    className: {
                                        'border:default': {
                                            'top-border-width': 'var(--borders-width-2)',
                                            'left-border-width': 'var(--borders-width-2)',
                                            'right-border-width': 'var(--borders-width-2)',
                                            'bottom-border-width': 'var(--borders-width-2)',
                                            'top-border-style': 'var(--borders-style-2)',
                                            'left-border-style': 'var(--borders-style-2)',
                                            'right-border-style': 'var(--borders-style-2)',
                                            'bottom-border-style': 'var(--borders-style-2)',
                                            'top-border-color': 'var(--colors-brand-6)',
                                            'left-border-color': 'var(--colors-brand-6)',
                                            'right-border-color': 'var(--colors-brand-6)',
                                            'bottom-border-color': 'var(--colors-brand-6)'
                                        },
                                        'padding-and-margin:default': {
                                            paddingLeft: '20px',
                                            paddingRight: '20px'
                                        },
                                        'radius:default': {
                                            'top-left-border-radius': '20px',
                                            'top-right-border-radius': '20px',
                                            'bottom-left-border-radius': '20px',
                                            'bottom-right-border-radius': '20px'
                                        },
                                        'font:default': {
                                            color: 'var(--colors-brand-6)'
                                        }
                                    }
                                }
                            }
                        ],
                        size: 'xs',
                        style: {
                            position: 'static',
                            display: 'flex',
                            flex: '1 1 auto',
                            flexGrow: 0,
                            flexBasis: 'auto',
                            flexWrap: 'nowrap',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        },
                        wrapperBody: false,
                        isFixedHeight: false,
                        isFixedWidth: false,
                        id: 'u:77cb3edb2288'
                    }
                ],
                wrapperBody: false,
                style: {
                    'position': 'relative',
                    'display': 'flex',
                    'width': '100%',
                    'paddingTop': '10px',
                    'paddingRight': '10px',
                    'paddingBottom': '10px',
                    'paddingLeft': '10px',
                    'radius': {
                        'top-left-border-radius': '6px',
                        'top-right-border-radius': '6px',
                        'bottom-left-border-radius': '6px',
                        'bottom-right-border-radius': '6px'
                    },
                    'top-border-width': 'var(--borders-width-1)',
                    'left-border-width': 'var(--borders-width-1)',
                    'right-border-width': 'var(--borders-width-1)',
                    'bottom-border-width': 'var(--borders-width-1)',
                    'top-border-style': 'var(--borders-style-1)',
                    'left-border-style': 'var(--borders-style-1)',
                    'right-border-style': 'var(--borders-style-1)',
                    'bottom-border-style': 'var(--borders-style-1)',
                    'top-border-color': '#3be157',
                    'left-border-color': '#3be157',
                    'right-border-color': '#3be157',
                    'bottom-border-color': '#3be157',
                    'boxShadow': ' 0px 0px 10px 0px var(--colors-neutral-line-8)'
                }
            },
            placeholder: '',
            // name: 'items',
            style: {
                gutterY: 10
            }
        };
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { className: 'text-left ', items: [{}, {}, {}], style: {
                gutterY: 10,
                transform: 'scale(0.7)',
                width: '1200px',
                transformOrigin: 'left top'
            }, name: 'items' });
        _this.panelTitle = '列表';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var _a, _b;
            var isCRUDBody = context.schema.type === 'crud';
            var curPosition = (_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.position;
            var isAbsolute = curPosition === 'fixed' || curPosition === 'absolute';
            return [
                getSchemaTpl('tabs', [
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
                                    isCRUDBody
                                        ? null
                                        : getSchemaTpl('formItemName', {
                                            label: '绑定字段名'
                                        }),
                                    getSchemaTpl('cardsPlaceholder')
                                ]
                            },
                            getSchemaTpl('status')
                        ])
                    },
                    {
                        title: '外观',
                        body: getSchemaTpl('collapseGroup', __spreadArray([
                            {
                                title: '组件',
                                body: [
                                    {
                                        name: 'columnsCount',
                                        type: 'input-range',
                                        visibleOn: '!this.leftFixed',
                                        min: 1,
                                        max: 12,
                                        step: 1,
                                        label: '每行个数'
                                    },
                                    {
                                        type: 'input-number',
                                        label: '左右间距',
                                        name: 'style.gutterX',
                                        visibleOn: 'this.columnsCount > 1'
                                    },
                                    {
                                        type: 'input-number',
                                        label: '上下间距',
                                        name: 'style.gutterY'
                                    },
                                    getSchemaTpl('layout:originPosition', {
                                        visibleOn: isAbsolute ? isAbsolute : undefined,
                                        value: 'left-top'
                                    })
                                ]
                            }
                        ], __read(getSchemaTpl('theme:common', { exclude: ['layout'] })), false))
                    }
                ])
            ];
        };
        return _this;
    }
    List2Plugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var dataSchema = {
            $id: 'cards',
            type: 'object',
            title: '当前列表项',
            properties: {}
        };
        var match = node.schema.source && String(node.schema.source).match(/{([\w-_]+)}/);
        var field = node.schema.name || (match === null || match === void 0 ? void 0 : match[1]);
        var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
        var schema = (_a = scope === null || scope === void 0 ? void 0 : scope.parent) === null || _a === void 0 ? void 0 : _a.getSchemaByPath(field);
        if (isObject(schema === null || schema === void 0 ? void 0 : schema.items)) {
            dataSchema = __assign(__assign({}, dataSchema), schema.items);
            // 列表添加序号方便处理
            set(dataSchema, 'properties.index', {
                type: 'number',
                title: '索引'
            });
        }
        return dataSchema;
    };
    List2Plugin.prototype.filterProps = function (props) {
        var _a;
        // 编辑时显示两行假数据
        var count = (props.columnsCount || 3) * 2;
        props.value = repeatArray({}, count).map(function (item, index) {
            return __assign(__assign({}, item), { id: index + 1 });
        });
        props.className = "".concat(props.className || '', " ae-Editor-list");
        props.itemsClassName = "".concat(props.itemsClassName || '', " cards-items");
        if (props.card && !((_a = props.card.className) === null || _a === void 0 ? void 0 : _a.includes('listItem'))) {
            props.card.className = "".concat(props.card.className || '', " ae-Editor-listItem");
        }
        // 列表类型内的文本元素显示原始公式
        props = escapeFormula(props);
        return props;
    };
    List2Plugin.prototype.getRendererInfo = function (context) {
        var _a;
        var plugin = this;
        var renderer = context.renderer, schema = context.schema;
        if (!schema.$$id &&
            ((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) === 'crud' &&
            renderer.name === 'cards') {
            return __assign(__assign({}, { id: schema.$$editor.id }), { name: plugin.name, regions: plugin.regions, patchContainers: plugin.patchContainers, vRendererConfig: plugin.vRendererConfig, wrapperProps: plugin.wrapperProps, wrapperResolve: plugin.wrapperResolve, filterProps: plugin.filterProps, $schema: plugin.$schema, renderRenderer: plugin.renderRenderer, memberImmutable: plugin.memberImmutable });
        }
        return _super.prototype.getRendererInfo.call(this, context);
    };
    List2Plugin.id = 'List2Plugin';
    List2Plugin.scene = ['layout'];
    return List2Plugin;
}(BasePlugin));
export { List2Plugin };
registerEditorPlugin(List2Plugin);
