import { __assign, __extends } from "tslib";
import { JSONPipeIn, JSONPipeOut, getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin, diff } from 'amis-editor-core';
import { formItemControl } from '../../component/BaseControl';
import { resolveOptionType, schemaArrayFormat } from '../../util';
var ListControlPlugin = /** @class */ (function (_super) {
    __extends(ListControlPlugin, _super);
    function ListControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'list-select';
        _this.$schema = '/schemas/ListControlSchema.json';
        // 组件名称
        _this.name = '列表选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-ellipsis-h';
        _this.pluginIcon = 'list-select-plugin';
        _this.description = '单选或者多选，支持 source 拉取选项，选项可配置图片，也可以自定义 HTML 配置';
        _this.docLink = '/amis/zh-CN/components/form/list-select';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'list-select',
            label: '列表',
            name: 'list',
            options: [
                {
                    label: '选项A',
                    value: 'A'
                },
                {
                    label: '选项B',
                    value: 'B'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                __assign(__assign({}, _this.scaffold), { value: 'A' })
            ]
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '列表选择';
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中值变化时触发',
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
                                        title: '选中的值'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [
            {
                actionType: 'clear',
                actionLabel: '清空',
                description: '清除选中值'
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
        _this.subEditorVariable = [
            {
                label: '当前选项',
                children: [
                    {
                        label: '选项名称',
                        value: 'label'
                    },
                    {
                        label: '选项值',
                        value: 'value'
                    }
                ]
            }
        ];
        _this.panelBodyCreator = function (context) {
            return formItemControl({
                common: {
                    replace: true,
                    body: [
                        getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                        getSchemaTpl('formItemName', {
                            required: true
                        }),
                        getSchemaTpl('label'),
                        getSchemaTpl('multiple'),
                        getSchemaTpl('extractValue'),
                        getSchemaTpl('valueFormula', {
                            // 边栏渲染不渲染自定义样式，会干扰css生成
                            rendererSchema: function (schema) { return (__assign(__assign({}, (schema || {})), { itemSchema: null })); },
                            mode: 'vertical',
                            useSelectMode: true,
                            visibleOn: 'this.options && this.options.length > 0'
                        })
                    ]
                },
                option: {
                    body: [
                        getSchemaTpl('optionControlV2'),
                        {
                            type: 'ae-switch-more',
                            mode: 'normal',
                            label: '自定义显示模板',
                            bulk: false,
                            name: 'itemSchema',
                            formType: 'extend',
                            form: {
                                body: [
                                    {
                                        type: 'dropdown-button',
                                        label: '配置显示模板',
                                        level: 'enhance',
                                        buttons: [
                                            {
                                                type: 'button',
                                                block: true,
                                                onClick: _this.editDetail.bind(_this, context.id, 'itemSchema'),
                                                label: '配置默认态模板'
                                            },
                                            {
                                                type: 'button',
                                                block: true,
                                                onClick: _this.editDetail.bind(_this, context.id, 'activeItemSchema'),
                                                label: '配置激活态模板'
                                            }
                                        ]
                                    }
                                ]
                            },
                            pipeIn: function (value) {
                                return value !== undefined;
                            },
                            pipeOut: function (value, originValue, data) {
                                if (value === true) {
                                    return {
                                        type: 'container',
                                        body: [
                                            {
                                                type: 'tpl',
                                                tpl: "${".concat(_this.getDisplayField(value), "}"),
                                                wrapperComponent: '',
                                                inline: true
                                            }
                                        ]
                                    };
                                }
                                return value ? value : undefined;
                            }
                        }
                    ]
                },
                status: {}
            }, context);
        };
        return _this;
    }
    ListControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        var type = resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
        // todo:异步数据case
        var dataSchema = {
            type: type,
            title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
            originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
        };
        if (((_f = node.schema) === null || _f === void 0 ? void 0 : _f.joinValues) === false) {
            dataSchema = __assign(__assign({}, dataSchema), { type: 'object', title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name), properties: (_a = {},
                    _a[((_j = node.schema) === null || _j === void 0 ? void 0 : _j.labelField) || 'label'] = {
                        type: 'string',
                        title: '文本'
                    },
                    _a[((_k = node.schema) === null || _k === void 0 ? void 0 : _k.valueField) || 'value'] = {
                        type: type,
                        title: '值'
                    },
                    _a) });
        }
        if ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.multiple) {
            if ((_m = node.schema) === null || _m === void 0 ? void 0 : _m.extractValue) {
                dataSchema = {
                    type: 'array',
                    title: ((_o = node.schema) === null || _o === void 0 ? void 0 : _o.label) || ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.name)
                };
            }
            else if (((_q = node.schema) === null || _q === void 0 ? void 0 : _q.joinValues) === false) {
                dataSchema = {
                    type: 'array',
                    title: ((_r = node.schema) === null || _r === void 0 ? void 0 : _r.label) || ((_s = node.schema) === null || _s === void 0 ? void 0 : _s.name),
                    items: {
                        type: 'object',
                        title: '成员',
                        properties: dataSchema.properties
                    },
                    originalValue: dataSchema.originalValue
                };
            }
        }
        return dataSchema;
    };
    ListControlPlugin.prototype.filterProps = function (props) {
        // 禁止选中子节点
        return JSONPipeOut(props);
    };
    ListControlPlugin.prototype.getDisplayField = function (data) {
        var _a;
        if (data.source ||
            (data.map &&
                Array.isArray(data.map) &&
                data.map[0] &&
                Object.keys(data.map[0]).length > 1)) {
            return (_a = data.labelField) !== null && _a !== void 0 ? _a : 'label';
        }
        return 'label';
    };
    ListControlPlugin.prototype.editDetail = function (id, field) {
        var _a;
        var _b;
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        var defaultItemSchema = {
            type: 'container',
            body: [
                {
                    type: 'tpl',
                    tpl: "${".concat(this.getDisplayField(value), "}"),
                    inline: true,
                    wrapperComponent: ''
                }
            ]
        };
        // 首次编辑激活态样式时自动复制默认态
        if (field !== 'itemSchema' && (value === null || value === void 0 ? void 0 : value.itemSchema)) {
            defaultItemSchema = JSONPipeIn(value.itemSchema, true);
        }
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置显示模板',
                value: (_b = value[field]) !== null && _b !== void 0 ? _b : defaultItemSchema,
                slot: {
                    type: 'container',
                    body: '$$'
                },
                onChange: function (newValue) {
                    var _a;
                    newValue = __assign(__assign({}, value), (_a = {}, _a[field] = schemaArrayFormat(newValue), _a));
                    manager.panelChangeValue(newValue, diff(value, newValue));
                },
                data: (_a = {},
                    _a[value.labelField || 'label'] = '选项名',
                    _a[value.valueField || 'value'] = '选项值',
                    _a.item = '假数据',
                    _a)
            });
    };
    ListControlPlugin.id = 'ListControlPlugin';
    return ListControlPlugin;
}(BasePlugin));
export { ListControlPlugin };
registerEditorPlugin(ListControlPlugin);
