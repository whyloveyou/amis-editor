import { __assign, __extends } from "tslib";
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import cloneDeep from 'lodash/cloneDeep';
import { ValidatorTag } from '../../validator';
import { getEventControlConfig } from '../../renderer/event-control/helper';
var CityControlPlugin = /** @class */ (function (_super) {
    __extends(CityControlPlugin, _super);
    function CityControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-city';
        _this.$schema = '/schemas/CityControlSchema.json';
        // 组件名称
        _this.name = '城市选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-building-o';
        _this.pluginIcon = 'input-city-plugin';
        _this.description = '可配置是否选择区域或者城市';
        _this.docLink = '/amis/zh-CN/components/form/input-city';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-city',
            label: '城市选择',
            name: 'city',
            allowCity: true,
            allowDistrict: true,
            extractValue: true
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
        _this.panelTitle = '城市选择';
        // 事件定义
        _this.events = [
            {
                eventName: 'change',
                eventLabel: '值变化',
                description: '选中值变化',
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
                                        title: '当前城市'
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
                description: '重置为默认值'
            },
            {
                actionType: 'setValue',
                actionLabel: '赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
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
                                getSchemaTpl('valueFormula', {
                                    rendererSchema: function (schema) { return schema; },
                                    rendererWrapper: true,
                                    mode: 'vertical' // 改成上下展示模式
                                }),
                                {
                                    name: 'extractValue',
                                    label: '值格式',
                                    type: 'button-group-select',
                                    size: 'sm',
                                    options: [
                                        { label: '行政编码', value: true },
                                        { label: '对象结构', value: false }
                                    ]
                                },
                                getSchemaTpl('switch', {
                                    name: 'allowCity',
                                    label: '可选城市',
                                    pipeIn: defaultValue(true),
                                    onChange: function (value, oldValue, item, form) {
                                        if (!value) {
                                            var schema = cloneDeep(form.data);
                                            form.setValueByName('allowDistrict', undefined);
                                            form.setValueByName('value', schema.extractValue ? '' : {});
                                        }
                                    }
                                }),
                                getSchemaTpl('switch', {
                                    name: 'allowDistrict',
                                    label: '可选区域',
                                    visibleOn: 'data.allowCity',
                                    pipeIn: defaultValue(true),
                                    onChange: function (value, oldValue, item, form) {
                                        if (!value) {
                                            var schema = cloneDeep(form.data);
                                            form.setValueByName('value', schema.extractValue ? '' : {});
                                        }
                                    }
                                }),
                                getSchemaTpl('switch', {
                                    name: 'searchable',
                                    label: '可搜索',
                                    pipeIn: defaultValue(false)
                                }),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('description')
                            ]
                        },
                        getSchemaTpl('status', { isFormItem: true }),
                        getSchemaTpl('validation', { tag: ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            getSchemaTpl('style:formItem', { renderer: context.info.renderer }),
                            getSchemaTpl('style:classNames')
                        ])
                    ]
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
    CityControlPlugin.prototype.buildDataSchemas = function (node, region) {
        var _a, _b, _c, _d, _e, _f;
        var dataSchema = {
            type: 'string',
            title: ((_a = node.schema) === null || _a === void 0 ? void 0 : _a.label) || ((_b = node.schema) === null || _b === void 0 ? void 0 : _b.name),
            originalValue: (_c = node.schema) === null || _c === void 0 ? void 0 : _c.value // 记录原始值，循环引用检测需要
        };
        if (((_d = node.schema) === null || _d === void 0 ? void 0 : _d.extractValue) === false) {
            dataSchema = __assign(__assign({}, dataSchema), { type: 'object', title: ((_e = node.schema) === null || _e === void 0 ? void 0 : _e.label) || ((_f = node.schema) === null || _f === void 0 ? void 0 : _f.name), properties: {
                    code: {
                        type: 'number',
                        title: '编码'
                    },
                    provinceCode: {
                        type: 'number',
                        title: '省份编码'
                    },
                    province: {
                        type: 'string',
                        title: '省份'
                    },
                    cityCode: {
                        type: 'number',
                        title: '城市编码'
                    },
                    city: {
                        type: 'string',
                        title: '城市'
                    },
                    districtCode: {
                        type: 'number',
                        title: '区域编码'
                    },
                    district: {
                        type: 'string',
                        title: '区域'
                    },
                    street: {
                        type: 'string',
                        title: '街道'
                    }
                } });
        }
        return dataSchema;
    };
    CityControlPlugin.id = 'CityControlPlugin';
    CityControlPlugin.scene = ['layout'];
    return CityControlPlugin;
}(BasePlugin));
export { CityControlPlugin };
registerEditorPlugin(CityControlPlugin);
