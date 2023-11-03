import { __assign, __extends } from "tslib";
import { getI18nEnabled } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import cloneDeep from 'lodash/cloneDeep';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { ValidatorTag } from '../../validator';
import { tipedLabel } from 'amis-editor-core';
import { resolveOptionType } from '../../util';
var TreeSelectControlPlugin = /** @class */ (function (_super) {
    __extends(TreeSelectControlPlugin, _super);
    function TreeSelectControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tree-select';
        _this.$schema = '/schemas/TreeSelectControlSchema.json';
        // 组件名称
        _this.name = '树选择框';
        _this.isBaseComponent = true;
        _this.disabledRendererPlugin = true;
        _this.icon = 'fa fa-list-alt';
        _this.pluginIcon = 'tree-select-plugin';
        _this.description = '树型结构选择，支持 [内嵌模式] 与 [浮层模式] 的外观切换';
        _this.docLink = '/amis/zh-CN/components/form/treeselect';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'tree-select',
            label: '树下拉框',
            name: 'tree',
            clearable: false,
            options: [
                {
                    label: '选项A',
                    value: 'A',
                    children: [
                        {
                            label: '选项C',
                            value: 'C'
                        },
                        {
                            label: '选项D',
                            value: 'D'
                        }
                    ]
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
            body: __assign({}, _this.scaffold)
        };
        _this.notRenderFormZone = true;
        _this.panelTitle = '树选择';
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
                                        title: '选中的节点值'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'add',
                eventLabel: '新增选项',
                description: '新增选项提交时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '新增的选项'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'edit',
                eventLabel: '编辑选项',
                description: '编辑选项提交时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '编辑的选项'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'delete',
                eventLabel: '删除节点',
                description: '删除选项提交时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    value: {
                                        type: 'object',
                                        title: '删除的选项'
                                    },
                                    items: {
                                        type: 'array',
                                        title: '选项列表'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'loadFinished',
                eventLabel: '懒加载完成',
                description: '懒加载接口远程请求成功时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            'event.data.value': {
                                type: 'string',
                                title: 'deferApi 懒加载远程请求成功后返回的数据'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'focus',
                eventLabel: '获取焦点',
                description: '输入框获取焦点时触发',
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
                                        title: '当前选中的值'
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
                description: '输入框失去焦点时触发',
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
                                        title: '当前选中的值'
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
                description: '清除数据'
            },
            {
                actionType: 'reset',
                actionLabel: '重置',
                description: '重置数据'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelDefinitions = {
            options: {
                label: '选项 Options',
                name: 'options',
                type: 'combo',
                multiple: true,
                multiLine: true,
                draggable: true,
                addButtonText: '新增选项',
                scaffold: {
                    label: '',
                    value: ''
                },
                items: [
                    {
                        type: 'group',
                        body: [
                            getSchemaTpl('optionsLabel'),
                            {
                                type: 'input-text',
                                name: 'value',
                                placeholder: '值',
                                unique: true
                            }
                        ]
                    },
                    {
                        $ref: 'options',
                        label: '子选项',
                        name: 'children',
                        addButtonText: '新增子选项'
                    }
                ]
            }
        };
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var renderer = context.info.renderer;
            var i18nEnabled = getI18nEnabled();
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
                                {
                                    type: 'button-group-select',
                                    name: 'type',
                                    label: '模式',
                                    pipeIn: defaultValue('tree-select'),
                                    onChange: function (value, oldValue, model, form) {
                                        var activeEvent = cloneDeep(form.getValueByName('onEvent') || {});
                                        var eventList = _this.events;
                                        if (value === 'input-tree') {
                                            var inputTreePlugin = _this.manager.plugins.find(function (item) { return item.rendererName === 'input-tree'; });
                                            eventList = (inputTreePlugin === null || inputTreePlugin === void 0 ? void 0 : inputTreePlugin.events) || [];
                                        }
                                        var _loop_1 = function (key) {
                                            var hasEventKey = eventList.find(function (event) { return event.eventName === key; });
                                            if (!hasEventKey) {
                                                delete activeEvent[key];
                                            }
                                        };
                                        for (var key in activeEvent) {
                                            _loop_1(key);
                                        }
                                        form.setValueByName('onEvent', activeEvent);
                                    },
                                    options: [
                                        {
                                            label: '内嵌',
                                            value: 'input-tree'
                                        },
                                        {
                                            label: '浮层',
                                            value: 'tree-select'
                                        }
                                    ]
                                },
                                getSchemaTpl('clearable', {
                                    mode: 'horizontal',
                                    horizontal: {
                                        justify: true,
                                        left: 8
                                    },
                                    inputClassName: 'is-inline ',
                                    visibleOn: 'data.type === "tree-select"'
                                }),
                                getSchemaTpl('switch', {
                                    label: '可检索',
                                    name: 'searchable',
                                    visibleOn: 'data.type === "tree-select"'
                                }),
                                getSchemaTpl('multiple', {
                                    body: [
                                        {
                                            type: 'input-number',
                                            label: tipedLabel('节点最小数', '表单校验最少选中的节点数'),
                                            name: 'minLength'
                                        },
                                        {
                                            type: 'input-number',
                                            label: tipedLabel('节点最大数', '表单校验最多选中的节点数'),
                                            name: 'maxLength'
                                        }
                                    ]
                                }),
                                getSchemaTpl('switch', {
                                    label: tipedLabel('子节点自动选', '当选中父节点时级联选择子节点'),
                                    name: 'autoCheckChildren',
                                    hiddenOn: '!data.multiple',
                                    value: true
                                }),
                                getSchemaTpl('switch', {
                                    label: tipedLabel('子节点可反选', '子节点可反选，值包含父子节点'),
                                    name: 'cascade',
                                    hiddenOn: '!data.multiple || !data.autoCheckChildren'
                                }),
                                getSchemaTpl('switch', {
                                    label: tipedLabel('值包含父节点', '选中父节点时，值里面将包含父子节点的值，否则只会保留父节点的值'),
                                    name: 'withChildren',
                                    hiddenOn: '!data.multiple || !data.autoCheckChildren && data.cascade'
                                }),
                                getSchemaTpl('switch', {
                                    label: tipedLabel('值只含子节点', 'ui 行为级联选中子节点，子节点可反选，值只包含子节点的值'),
                                    name: 'onlyChildren',
                                    hiddenOn: '!data.multiple  || !data.autoCheckChildren'
                                }),
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), { type: 'tree-select' }),
                                    visibleOn: 'this.options && this.options.length > 0'
                                }),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('placeholder'),
                                getSchemaTpl('description')
                            ]
                        },
                        {
                            title: '选项',
                            body: [
                                getSchemaTpl('treeOptionControl', {
                                    label: '数据',
                                    showIconField: true
                                }),
                                // 自定义选项模板
                                getSchemaTpl('optionsMenuTpl', {
                                    manager: _this.manager
                                }),
                                getSchemaTpl('loadingConfig', {
                                    visibleOn: 'this.source || !this.options'
                                }, { context: context }),
                                getSchemaTpl('switch', {
                                    label: '只可选择叶子节点',
                                    name: 'onlyLeaf'
                                }),
                                /** 新增选项 */
                                getSchemaTpl('optionAddControl', {
                                    manager: _this.manager,
                                    collections: [
                                        getSchemaTpl('switch', {
                                            label: '顶层可新增',
                                            value: true,
                                            name: 'rootCreatable'
                                        }),
                                        {
                                            type: 'input-text',
                                            label: '根节点文案',
                                            value: '添加一级节点',
                                            name: 'rootCreateTip',
                                            hiddenOn: '!data.rootCreatable'
                                        },
                                        {
                                            type: 'input-text',
                                            label: '新增文案提示',
                                            value: '添加子节点',
                                            name: 'createTip'
                                        }
                                    ]
                                }),
                                /** 编辑选项 */
                                getSchemaTpl('optionEditControl', {
                                    manager: _this.manager,
                                    collections: [
                                        {
                                            type: 'input-text',
                                            label: '编辑文案提示',
                                            value: '编辑该节点',
                                            name: 'editTip'
                                        }
                                    ]
                                }),
                                /** 删除选项 */
                                getSchemaTpl('optionDeleteControl', {
                                    manager: _this.manager,
                                    collections: [
                                        {
                                            type: 'input-text',
                                            label: '删除文案提示',
                                            value: '移除该节点',
                                            name: 'removeTip'
                                        }
                                    ]
                                })
                            ]
                        },
                        {
                            title: '高级',
                            body: [
                                getSchemaTpl('valueFormula', {
                                    name: 'highlightTxt',
                                    label: '高亮节点字符',
                                    type: 'input-text',
                                    visibleOn: 'data.type === "input-tree"'
                                }),
                                {
                                    type: 'ae-Switch-More',
                                    mode: 'normal',
                                    name: 'enableNodePath',
                                    label: tipedLabel('选项值包含父节点', '开启后对应节点值会包含父节点'),
                                    value: false,
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            {
                                                type: 'input-text',
                                                label: '路径分隔符',
                                                value: '/',
                                                name: 'pathSeparator'
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'ae-Switch-More',
                                    mode: 'normal',
                                    name: 'hideRoot',
                                    label: '显示顶级节点',
                                    value: true,
                                    trueValue: false,
                                    falseValue: true,
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            {
                                                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                                label: '节点文案',
                                                value: '顶级',
                                                name: 'rootLabel'
                                            }
                                        ]
                                    },
                                    visibleOn: 'data.type === "input-tree"'
                                },
                                getSchemaTpl('switch', {
                                    label: tipedLabel('选项文本仅显示选中节点', '隐藏选择框中已选中节点的祖先节点的文本信息'),
                                    name: 'hideNodePathLabel',
                                    visibleOn: 'data.type==="tree-select"'
                                }),
                                getSchemaTpl('switch', {
                                    label: '显示节点图标',
                                    name: 'showIcon',
                                    value: true
                                }),
                                getSchemaTpl('switch', {
                                    label: tipedLabel('显示节点勾选框', '单选情况下，也可显示树节点勾选框'),
                                    name: 'showRadio',
                                    hiddenOn: 'data.multiple'
                                }),
                                getSchemaTpl('switch', {
                                    label: tipedLabel('显示层级展开线', '显示树层级展开线'),
                                    name: 'showOutline'
                                }),
                                getSchemaTpl('switch', {
                                    name: 'withChildren',
                                    label: '数值是否携带子节点',
                                    visibleOn: 'data.cascade !== true && data.multiple',
                                    disabledOn: 'data.onlyChildren'
                                }),
                                getSchemaTpl('switch', {
                                    name: 'onlyChildren',
                                    label: '数值是否只包含子节点',
                                    visibleOn: 'data.cascade !== true && data.multiple',
                                    disabledOn: 'data.withChildren'
                                }),
                                {
                                    type: 'ae-Switch-More',
                                    mode: 'normal',
                                    name: 'initiallyOpen',
                                    label: tipedLabel('自定义展开层级', '默认展开所有节点层级，开启后可自定义展开层级数'),
                                    value: true,
                                    trueValue: false,
                                    falseValue: true,
                                    formType: 'extend',
                                    form: {
                                        body: [
                                            {
                                                type: 'input-number',
                                                label: '设置层级',
                                                name: 'unfoldedLevel',
                                                value: 1,
                                                hiddenOn: 'data.initiallyOpen'
                                            }
                                        ]
                                    }
                                },
                                getSchemaTpl('virtualThreshold'),
                                getSchemaTpl('virtualItemHeight')
                            ]
                        },
                        getSchemaTpl('status', {
                            isFormItem: true,
                            readonly: true
                        }),
                        getSchemaTpl('validation', { tag: ValidatorTag.Tree })
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        getSchemaTpl('style:formItem', { renderer: renderer }),
                        getSchemaTpl('style:classNames', {
                            schema: [
                                getSchemaTpl('className', {
                                    label: '外层容器',
                                    name: 'treeContainerClassName'
                                })
                            ]
                        })
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
    TreeSelectControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
    TreeSelectControlPlugin.id = 'TreeSelectControlPlugin';
    return TreeSelectControlPlugin;
}(BasePlugin));
export { TreeSelectControlPlugin };
registerEditorPlugin(TreeSelectControlPlugin);
