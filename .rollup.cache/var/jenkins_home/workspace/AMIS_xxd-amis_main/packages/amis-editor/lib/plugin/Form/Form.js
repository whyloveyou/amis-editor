import { __assign, __awaiter, __extends, __generator, __read, __spreadArray } from "tslib";
import cx from 'classnames';
import flatten from 'lodash/flatten';
import cloneDeep from 'lodash/cloneDeep';
import { isObject } from 'amis-core';
import { BasePlugin, tipedLabel, getI18nEnabled, defaultValue, getSchemaTpl, jsonToJsonSchema, registerEditorPlugin, JSONPipeOut } from 'amis-editor-core';
import { DSBuilderManager, DSFeatureEnum, ModelDSBuilderKey, ApiDSBuilderKey } from '../../builder';
import { FormOperatorMap } from '../../builder/constants';
import { getEventControlConfig } from '../../renderer/event-control/helper';
import { FieldSetting } from '../../renderer/FieldSetting';
var FormPlugin = /** @class */ (function (_super) {
    __extends(FormPlugin, _super);
    function FormPlugin(manager) {
        var _this = _super.call(this, manager) || this;
        _this.name = '表单';
        _this.panelTitle = '表单';
        // 关联渲染器名字
        _this.rendererName = 'form';
        _this.isBaseComponent = true;
        _this.description = '可用于新建、编辑或者展示数据，配置初始化接口可从远端加载数据，配置提交接口可将数据发送远端。另外也可以将数据提交给其他组件，与其他组件通信。';
        _this.docLink = '/amis/zh-CN/components/form/index';
        _this.$schema = '/schemas/FormSchema.json';
        _this.tags = ['数据容器'];
        _this.order = -900;
        _this.icon = 'fa fa-list-alt';
        _this.pluginIcon = 'form-plugin';
        _this.panelIcon = 'form-plugin';
        _this.panelJustify = true;
        _this.scaffold = {
            type: 'form',
            title: '表单',
            body: [
                {
                    label: '文本框',
                    type: 'input-text',
                    name: 'text'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            panelClassName: 'Panel--default text-left m-b-none',
            mode: 'horizontal',
            body: [
                {
                    label: '文本',
                    name: 'a',
                    type: 'input-text'
                }
            ]
        };
        // 容器配置
        _this.regions = [
            {
                key: 'body',
                label: '表单集合',
                matchRegion: function (elem) { return !!(elem === null || elem === void 0 ? void 0 : elem.props.noValidate); },
                renderMethod: 'renderBody',
                preferTag: '表单项'
            },
            {
                label: '操作区',
                key: 'actions',
                preferTag: '按钮'
            }
        ];
        // 事件定义
        _this.events = [
            {
                eventName: 'inited',
                eventLabel: '初始化数据接口请求完成',
                description: '远程初始化数据接口请求完成时触发',
                // 表单数据为表单变量
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    responseData: {
                                        type: 'object',
                                        title: '响应数据'
                                    },
                                    responseStatus: {
                                        type: 'number',
                                        title: '响应状态(0表示成功)'
                                    },
                                    responseMsg: {
                                        type: 'string',
                                        title: '响应消息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'change',
                eventLabel: '数值变化',
                description: '表单值变化时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前表单数据，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'formItemValidateSucc',
                eventLabel: '表单项校验成功',
                description: '表单项校验成功后触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前表单数据，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'formItemValidateError',
                eventLabel: '表单项校验失败',
                description: '表单项校验失败后触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前表单数据，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'validateSucc',
                eventLabel: '表单校验成功',
                description: '表单校验成功后触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前表单数据，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'validateError',
                eventLabel: '表单校验失败',
                description: '表单校验失败后触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前表单数据，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'submit',
                eventLabel: '表单提交',
                strongDesc: '配置该事件后将不会触发表单提交时默认的校验、提交到api或者target等行为，所有行为需要自己配置',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前表单数据，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'submitSucc',
                eventLabel: '提交成功',
                description: '表单提交成功后触发，如果事件源是按钮，且按钮的类型为“提交”，那么即便当前表单没有配置“保存接口”也将触发提交成功事件',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    result: {
                                        type: 'object',
                                        title: '保存接口请求成功后返回的数据'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'submitFail',
                eventLabel: '提交失败',
                description: '表单提交请求失败后触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    error: {
                                        type: 'object',
                                        title: '保存接口请求失败后返回的错误信息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'asyncApiFinished',
                eventLabel: '远程请求轮询结束',
                description: 'asyncApi 远程请求轮询结束后触发',
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
        // 动作定义
        _this.actions = [
            {
                actionLabel: '提交表单',
                actionType: 'submit',
                description: '触发表单提交'
            },
            {
                actionLabel: '重置表单',
                actionType: 'reset',
                description: '触发表单重置'
            },
            {
                actionLabel: '清空表单',
                actionType: 'clear',
                description: '触发表单清空'
            },
            {
                actionLabel: '校验表单',
                actionType: 'validate',
                description: '触发表单校验'
            },
            {
                actionLabel: '重新加载',
                actionType: 'reload',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionLabel: '变量赋值',
                actionType: 'setValue',
                description: '触发组件数据更新'
            }
        ];
        _this.Features = [
            { label: '新增', value: DSFeatureEnum.Insert },
            { label: '编辑', value: DSFeatureEnum.Edit },
            { label: '批量编辑', value: DSFeatureEnum.BulkEdit, disabled: true },
            { label: '查看', value: DSFeatureEnum.View, disabled: true }
        ];
        _this._dynamicControls = {};
        _this.panelBodyCreator = function (context) {
            var _a, _b, _c, _d, _e, _f;
            var dc = _this.dynamicControls;
            var builder = _this.dsManager.getBuilderBySchema(context.schema);
            /** 是否为CRUD的过滤器表单 */
            var isCRUDFilter = /\/crud\/filter\/form$/.test(context.path) ||
                /\/crud2\/filter\/\d\/form$/.test(context.path) ||
                /\/crud2\/filter\/form$/.test(context.path) ||
                /body\/0\/filter$/.test(context.schemaPath);
            /** 表单是否位于Dialog内 */
            var isInDialog = (_b = (_a = context.path) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, 'dialog/');
            /** 是否使用Panel包裹 */
            var isWrapped = 'this.wrapWithPanel !== false';
            var justifyLayout = function (left) {
                if (left === void 0) { left = 2; }
                return ({
                    mode: 'horizontal',
                    horizontal: {
                        left: left,
                        justify: true
                    }
                });
            };
            var i18nEnabled = getI18nEnabled();
            var schema = (_d = (_c = context === null || context === void 0 ? void 0 : context.node) === null || _c === void 0 ? void 0 : _c.schema) !== null && _d !== void 0 ? _d : context === null || context === void 0 ? void 0 : context.schema;
            /** 是否是模型表单 */
            var isModelForm = ((typeof (schema === null || schema === void 0 ? void 0 : schema.api) === 'string'
                ? schema.api
                : typeof ((_e = schema === null || schema === void 0 ? void 0 : schema.api) === null || _e === void 0 ? void 0 : _e.url) === 'string'
                    ? schema.api.url
                    : '').startsWith('model://') ||
                (typeof (schema === null || schema === void 0 ? void 0 : schema.initApi) === 'string'
                    ? schema.initApi
                    : typeof ((_f = schema === null || schema === void 0 ? void 0 : schema.initApi) === null || _f === void 0 ? void 0 : _f.url) === 'string'
                        ? schema.initApi.url
                        : '').startsWith('model://')) &&
                !schema.api.strategy;
            /** 数据源控件 */
            var generateDSControls = function () {
                var dsTypeSelector = _this.dsManager.getDSSelectorSchema({
                    type: 'select',
                    label: '数据源',
                    onChange: function (value, oldValue, model, form) {
                        if (value !== oldValue) {
                            var data = form.data;
                            Object.keys(data).forEach(function (key) {
                                if (/^(insert|edit|bulkEdit)Fields$/i.test(key) ||
                                    /^(insert|edit|bulkEdit)Api$/i.test(key)) {
                                    form.deleteValueByName(key);
                                }
                            });
                            form.deleteValueByName('__fields');
                            form.deleteValueByName('__relations');
                            form.deleteValueByName('initApi');
                            form.deleteValueByName('api');
                        }
                        return value;
                    }
                }, {
                    schema: context === null || context === void 0 ? void 0 : context.schema,
                    sourceKey: 'api',
                    getDefautlValue: function (key, builder) {
                        var schema = context === null || context === void 0 ? void 0 : context.schema;
                        var dsType = schema === null || schema === void 0 ? void 0 : schema.dsType;
                        // TODO: api和initApi可能是混合模式的场景
                        if (builder.match(schema, 'api') ||
                            builder.match(schema, 'initApi')) {
                            dsType = key;
                        }
                        return dsType;
                    }
                });
                /** 默认数据源类型 */
                var defaultDsType = dsTypeSelector.value;
                /** 数据源配置 */
                var dsSettings = flatten(_this.Features.map(function (feat) {
                    return _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey, index) { return ({
                        type: 'container',
                        className: 'form-item-gap',
                        visibleOn: "data.feat === '".concat(feat.value, "' && (data.dsType == null ? '").concat(builderKey, "' === '").concat(defaultDsType || ApiDSBuilderKey, "' : data.dsType === '").concat(builderKey, "')"),
                        body: flatten([
                            builder.makeSourceSettingForm({
                                feat: feat.value,
                                renderer: 'form',
                                inScaffold: false,
                                sourceSettings: {
                                    renderLabel: true,
                                    userOrders: false
                                }
                            })
                        ])
                    }); });
                }));
                return __spreadArray([dsTypeSelector], __read(dsSettings), false);
            };
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        body: getSchemaTpl('collapseGroup', [
                            isCRUDFilter || isModelForm
                                ? null
                                : {
                                    title: '数据源',
                                    body: __spreadArray([
                                        {
                                            type: 'select',
                                            name: 'feat',
                                            label: '使用场景',
                                            options: _this.Features,
                                            pipeIn: function (value, formStore) {
                                                var _a;
                                                var feat = value;
                                                if (!value) {
                                                    feat =
                                                        ((_a = formStore === null || formStore === void 0 ? void 0 : formStore.data) === null || _a === void 0 ? void 0 : _a.initApi) != null
                                                            ? DSFeatureEnum.Edit
                                                            : DSFeatureEnum.Insert;
                                                }
                                                /** 存量数据可能未设置过feat, 需要在数据域中 set 一下 */
                                                formStore.setValueByName('feat', feat);
                                                return feat;
                                            },
                                            onChange: function (value, oldValue, model, form) {
                                                if (value !== oldValue) {
                                                    form.setValues({
                                                        dsType: _this.dsManager.getDefaultBuilderKey(),
                                                        initApi: DSFeatureEnum.Insert === value ||
                                                            DSFeatureEnum.BulkEdit === value
                                                            ? undefined
                                                            : '',
                                                        api: undefined
                                                    });
                                                }
                                            }
                                        }
                                    ], __read(generateDSControls()), false)
                                },
                            {
                                title: '基本',
                                body: [
                                    {
                                        name: 'title',
                                        type: 'input-text',
                                        label: '标题',
                                        visibleOn: isWrapped
                                    },
                                    getSchemaTpl('switch', {
                                        name: 'autoFocus',
                                        label: tipedLabel('自动聚焦', '设置后将让表单的第一个可输入的表单项获得焦点')
                                    }),
                                    {
                                        type: 'ae-switch-more',
                                        mode: 'normal',
                                        name: 'persistData',
                                        label: tipedLabel('本地缓存', '开启后，表单的数据会缓存在浏览器中，切换页面或关闭弹框不会清空当前表单内的数据'),
                                        hiddenOnDefault: true,
                                        formType: 'extend',
                                        form: {
                                            body: [
                                                getSchemaTpl('switch', {
                                                    name: 'clearPersistDataAfterSubmit',
                                                    label: tipedLabel('提交成功后清空缓存', '开启本地缓存并开启本配置项后，表单提交成功后，会自动清除浏览器中当前表单的缓存数据'),
                                                    pipeIn: defaultValue(false),
                                                    visibleOn: 'data.persistData'
                                                })
                                            ]
                                        }
                                    },
                                    getSchemaTpl('switch', {
                                        name: 'canAccessSuperData',
                                        label: tipedLabel('自动填充数据域同名变量', '默认表单是可以获取到完整数据链中的数据的，如果想使表单的数据域独立，请关闭此配置'),
                                        pipeIn: defaultValue(true)
                                    }),
                                    getSchemaTpl('loadingConfig', { label: '加载设置' }, { context: context })
                                ]
                            },
                            {
                                title: '提交设置',
                                body: [
                                    __assign({ name: 'submitText', type: 'input-text', label: tipedLabel('提交按钮名称', '如果底部按钮不是自定义按钮时，可以通过该配置可以快速修改按钮名称，如果设置成空，则可以把默认按钮去掉。'), pipeIn: defaultValue('提交'), visibleOn: "".concat(isWrapped, " && !this.actions && (!Array.isArray(this.body) || !this.body.some(function(item) {return !!~['submit','button','reset','button-group'].indexOf(item.type);}))") }, justifyLayout(4)),
                                    getSchemaTpl('switch', {
                                        name: 'submitOnChange',
                                        label: tipedLabel('修改即提交', '设置后，表单中每次有修改都会触发提交')
                                    }),
                                    getSchemaTpl('switch', {
                                        name: 'resetAfterSubmit',
                                        label: tipedLabel('提交后重置表单', '表单提交后，让所有表单项的值还原成初始值')
                                    }),
                                    getSchemaTpl('switch', {
                                        name: 'preventEnterSubmit',
                                        label: tipedLabel('阻止回车提交', '默认按回车键触发表单提交，开启后将阻止这一行为')
                                    }),
                                    // isCRUDFilter
                                    //   ? null
                                    //   : getSchemaTpl('switch', {
                                    //       name: 'submitOnInit',
                                    //       label: tipedLabel(
                                    //         '初始化后提交一次',
                                    //         '开启后，表单初始完成便会触发一次提交'
                                    //       )
                                    //     }),
                                    isInDialog
                                        ? getSchemaTpl('switch', {
                                            label: '提交后关闭对话框',
                                            name: 'closeDialogOnSubmit',
                                            pipeIn: function (value) { return value !== false; }
                                        })
                                        : null
                                    // isCRUDFilter
                                    //   ? null
                                    //   : {
                                    //       label: tipedLabel(
                                    //         '提交其他组件',
                                    //         '可以通过设置此属性，把当前表单的值提交给目标组件，而不是自己来通过接口保存，请填写目标组件的 <code>name</code> 属性，多个组件请用逗号隔开。当 <code>target</code> 为 <code>window</code> 时，则把表单数据附属到地址栏。'
                                    //       ),
                                    //       name: 'target',
                                    //       type: 'input-text',
                                    //       placeholder: '请输入组件name',
                                    //       ...justifyLayout(4)
                                    //     },
                                    // getSchemaTpl('reload', {
                                    //   test: !isCRUDFilter
                                    // }),
                                    // isCRUDFilter
                                    //   ? null
                                    //   : {
                                    //       type: 'ae-switch-more',
                                    //       mode: 'normal',
                                    //       label: tipedLabel(
                                    //         '提交后跳转',
                                    //         '当设置此值后，表单提交完后跳转到目标地址'
                                    //       ),
                                    //       formType: 'extend',
                                    //       form: {
                                    //         mode: 'horizontal',
                                    //         horizontal: {
                                    //           justify: true,
                                    //           left: 4
                                    //         },
                                    //         body: [
                                    //           {
                                    //             label: '跳转地址',
                                    //             name: 'redirect',
                                    //             type: 'input-text',
                                    //             placeholder: '请输入目标地址'
                                    //           }
                                    //         ]
                                    //       }
                                    //     }
                                ]
                            },
                            {
                                title: '组合校验',
                                body: [
                                    {
                                        name: 'rules',
                                        label: false,
                                        type: 'combo',
                                        multiple: true,
                                        multiLine: true,
                                        subFormMode: 'horizontal',
                                        placeholder: '',
                                        addBtn: {
                                            label: '添加校验规则',
                                            block: true,
                                            icon: 'fa fa-plus',
                                            className: cx('ae-Button--enhance')
                                        },
                                        items: [
                                            __assign({ type: 'ae-formulaControl', name: 'rule', label: '校验规则' }, justifyLayout(4)),
                                            __assign({ name: 'message', label: '报错提示', type: 'input-text' }, justifyLayout(4))
                                        ]
                                    }
                                ]
                            },
                            {
                                title: '状态',
                                body: [
                                    getSchemaTpl('disabled'),
                                    getSchemaTpl('visible'),
                                    getSchemaTpl('static')
                                ]
                            },
                            {
                                title: '高级',
                                body: [
                                    getSchemaTpl('switch', {
                                        name: 'debug',
                                        label: tipedLabel('开启调试', '在表单顶部显示当前表单的数据')
                                    })
                                ]
                            }
                        ])
                    },
                    {
                        title: '外观',
                        body: getSchemaTpl('collapseGroup', [
                            {
                                title: '布局',
                                body: [
                                    getSchemaTpl('formItemMode', {
                                        isForm: true,
                                        /** Form组件默认为normal模式 */
                                        defaultValue: 'normal'
                                    }),
                                    getSchemaTpl('horizontal'),
                                    {
                                        name: 'labelAlign',
                                        label: '标签对齐方式',
                                        type: 'button-group-select',
                                        size: 'sm',
                                        visibleOn: "${mode === 'horizontal'}",
                                        pipeIn: defaultValue('right', false),
                                        options: [
                                            {
                                                label: '左对齐',
                                                value: 'left'
                                            },
                                            {
                                                label: '右对齐',
                                                value: 'right'
                                            }
                                        ]
                                    },
                                    {
                                        label: '列数',
                                        name: 'columnCount',
                                        type: 'input-number',
                                        step: 1,
                                        min: 0,
                                        precision: 0,
                                        resetValue: '',
                                        unitOptions: ['列'],
                                        pipeOut: function (value) {
                                            if (value && typeof value === 'string') {
                                                var count = Number.parseInt(value === null || value === void 0 ? void 0 : value.replace(/\D+/g, ''), 10);
                                                return isNaN(count) ? undefined : count;
                                            }
                                            else if (value && typeof value === 'number') {
                                                return value;
                                            }
                                            else {
                                                return undefined;
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                title: '其他',
                                body: [
                                    getSchemaTpl('switch', {
                                        name: 'wrapWithPanel',
                                        label: tipedLabel('Panel包裹', '关闭后，表单只会展示表单项，标题和操作栏将不会显示。'),
                                        pipeIn: defaultValue(true)
                                    }),
                                    getSchemaTpl('switch', {
                                        name: 'affixFooter',
                                        label: tipedLabel('吸附操作栏', '开启后，滚动表单内容区时使底部操作区悬浮吸附'),
                                        visibleOn: isWrapped
                                    })
                                ]
                            },
                            /** */
                            getSchemaTpl('style:classNames', {
                                isFormItem: false,
                                schema: [
                                    getSchemaTpl('className', {
                                        name: 'panelClassName',
                                        label: 'Panel',
                                        visibleOn: isWrapped
                                    }),
                                    getSchemaTpl('className', {
                                        name: 'headerClassName',
                                        label: '标题区',
                                        visibleOn: isWrapped
                                    }),
                                    getSchemaTpl('className', {
                                        name: 'bodyClassName',
                                        label: '内容区',
                                        visibleOn: isWrapped
                                    }),
                                    getSchemaTpl('className', {
                                        name: 'actionsClassName',
                                        label: '操作区',
                                        visibleOn: isWrapped
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
                ])
            ];
        };
        /** 重新构建 API */
        _this.panelFormPipeOut = function (schema) { return __awaiter(_this, void 0, void 0, function () {
            var entity, builder, updatedSchema, e_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        entity = (_a = schema === null || schema === void 0 ? void 0 : schema.api) === null || _a === void 0 ? void 0 : _a.entity;
                        if (!entity || (schema === null || schema === void 0 ? void 0 : schema.dsType) !== ModelDSBuilderKey) {
                            return [2 /*return*/, schema];
                        }
                        builder = this.dsManager.getBuilderBySchema(schema);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, builder.buildApiSchema({
                                schema: schema,
                                renderer: 'form',
                                sourceKey: 'api',
                                feat: (_b = schema.feat) !== null && _b !== void 0 ? _b : 'Insert'
                            })];
                    case 2:
                        updatedSchema = _c.sent();
                        return [2 /*return*/, updatedSchema];
                    case 3:
                        e_1 = _c.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, schema];
                }
            });
        }); };
        _this.dsManager = new DSBuilderManager(manager);
        return _this;
    }
    Object.defineProperty(FormPlugin.prototype, "scaffoldForm", {
        /** 表单脚手架 */
        get: function () {
            var _this = this;
            var features = this.Features.filter(function (f) { return !f.disabled; });
            return {
                title: '表单创建向导',
                mode: {
                    mode: 'horizontal',
                    horizontal: {
                        leftFixed: 'sm'
                    }
                },
                canRebuild: true,
                className: 'ae-Scaffold-Modal ae-Scaffold-Modal-content AMISCSSWrapper',
                body: __spreadArray(__spreadArray([
                    {
                        type: 'radios',
                        name: 'feat',
                        label: '使用场景',
                        value: DSFeatureEnum.Insert,
                        options: features,
                        onChange: function (value, oldValue, model, form) {
                            if (value !== oldValue) {
                                var data = form.data;
                                Object.keys(data).forEach(function (key) {
                                    if (/^(insert|edit|bulkEdit)Fields$/i.test(key) ||
                                        /^(insert|edit|bulkEdit)Api$/i.test(key)) {
                                        form.deleteValueByName(key);
                                    }
                                });
                                form.deleteValueByName('__fields');
                                form.deleteValueByName('__relations');
                                form.setValues({
                                    dsType: _this.dsManager.getDefaultBuilderKey(),
                                    initApi: DSFeatureEnum.Insert === value ||
                                        DSFeatureEnum.BulkEdit === value
                                        ? undefined
                                        : ''
                                });
                            }
                        }
                    },
                    /** 数据源选择器 */
                    this.dsManager.getDSSelectorSchema({
                        onChange: function (value, oldValue, model, form) {
                            if (value !== oldValue) {
                                var data = form.data;
                                Object.keys(data).forEach(function (key) {
                                    if (/^(insert|edit|bulkEdit)Fields$/i.test(key) ||
                                        /^(insert|edit|bulkEdit)Api$/i.test(key)) {
                                        form.deleteValueByName(key);
                                    }
                                });
                                form.deleteValueByName('__fields');
                                form.deleteValueByName('__relations');
                                form.setValues({
                                    initApi: DSFeatureEnum.Insert === value ||
                                        DSFeatureEnum.BulkEdit === value
                                        ? undefined
                                        : ''
                                });
                            }
                            return value;
                        }
                    })
                ], __read(flatten(features.map(function (feat) {
                    return _this.dsManager.buildCollectionFromBuilders(function (builder, builderKey) {
                        return {
                            type: 'container',
                            className: 'form-item-gap',
                            visibleOn: "data.feat === '".concat(feat.value, "' && (!data.dsType || data.dsType === '").concat(builderKey, "')"),
                            body: flatten([
                                builder.makeSourceSettingForm({
                                    feat: feat.value,
                                    renderer: 'form',
                                    inScaffold: true,
                                    sourceSettings: {
                                        userOrders: false
                                    }
                                }),
                                builder.makeFieldsSettingForm({
                                    feat: feat.value,
                                    renderer: 'form',
                                    inScaffold: true
                                })
                            ])
                        };
                    });
                }))), false), [
                    {
                        name: 'operators',
                        label: '操作',
                        type: 'checkboxes',
                        value: ['submit'],
                        joinValues: false,
                        extractValue: false,
                        options: [
                            FormOperatorMap['reset'],
                            FormOperatorMap['submit'],
                            FormOperatorMap['cancel']
                        ]
                    }
                ], false),
                pipeIn: function (schema) { return __awaiter(_this, void 0, void 0, function () {
                    var dsType, builder, config;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                dsType = (_a = schema === null || schema === void 0 ? void 0 : schema.dsType) !== null && _a !== void 0 ? _a : this.dsManager.getDefaultBuilderKey();
                                builder = this.dsManager.getBuilderByKey(dsType);
                                if (!builder) {
                                    return [2 /*return*/, { dsType: dsType }];
                                }
                                return [4 /*yield*/, builder.guessFormScaffoldConfig({ schema: schema })];
                            case 1:
                                config = _b.sent();
                                return [2 /*return*/, __assign({}, config)];
                        }
                    });
                }); },
                pipeOut: function (config) { return __awaiter(_this, void 0, void 0, function () {
                    var scaffold, builder, schema;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                scaffold = cloneDeep(this.scaffold);
                                builder = this.dsManager.getBuilderByScaffoldSetting(config);
                                if (!builder) {
                                    return [2 /*return*/, scaffold];
                                }
                                return [4 /*yield*/, builder.buildFormSchema({
                                        feat: config.feat,
                                        renderer: 'form',
                                        inScaffold: true,
                                        entitySource: config === null || config === void 0 ? void 0 : config.entitySource,
                                        fallbackSchema: scaffold,
                                        scaffoldConfig: config
                                    })];
                            case 1:
                                schema = _a.sent();
                                /** 脚手架构建的 Schema 加个标识符，避免addChild替换 Schema ID */
                                schema.__origin = 'scaffold';
                                return [2 /*return*/, schema];
                        }
                    });
                }); },
                validate: function (data, form) {
                    var feat = data.feat;
                    var builder = _this.dsManager.getBuilderByScaffoldSetting(data);
                    var featValue = builder === null || builder === void 0 ? void 0 : builder.getFeatValueByKey(feat !== null && feat !== void 0 ? feat : DSFeatureEnum.Insert);
                    var apiKey = "".concat(featValue, "Api");
                    var fieldsKey = "".concat(featValue, "Fields");
                    var errors = {};
                    if ((data === null || data === void 0 ? void 0 : data.dsType) === ModelDSBuilderKey) {
                        return errors;
                    }
                    // if (!form.data[apiKey]) {
                    //   errors[apiKey] = '请输入接口信息';
                    // }
                    // if (feat === 'Edit' && !form.data?.initApi) {
                    //   errors['initApi'] = '请输入初始化接口信息';
                    // }
                    var fieldErrors = FieldSetting.validator(form.data[fieldsKey]);
                    if (fieldErrors) {
                        errors[fieldsKey] = fieldErrors;
                    }
                    return errors;
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormPlugin.prototype, "dynamicControls", {
        get: function () {
            return this._dynamicControls;
        },
        set: function (controls) {
            if (!controls || !isObject(controls)) {
                throw new Error('[amis-editor][FormPlugin] dynamicControls的值必须是一个对象');
            }
            this._dynamicControls = __assign(__assign({}, this._dynamicControls), controls);
        },
        enumerable: false,
        configurable: true
    });
    FormPlugin.prototype.afterUpdate = function (event) {
        var _a;
        var context = event.context;
        if (context.info.renderer.name === 'form' &&
            ((_a = context.diff) === null || _a === void 0 ? void 0 : _a.some(function (change) { var _a; return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'wrapWithPanel'; }))) {
            this.manager.buildPanels();
        }
    };
    FormPlugin.prototype.buildDataSchemas = function (node, region, trigger) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var jsonschema, pool, current, schema, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        jsonschema = __assign({}, jsonToJsonSchema(JSONPipeOut(node.schema.data)));
                        pool = node.children.concat();
                        _f.label = 1;
                    case 1:
                        if (!pool.length) return [3 /*break*/, 5];
                        current = pool.shift();
                        schema = current.schema;
                        if (!(((_a = current.rendererConfig) === null || _a === void 0 ? void 0 : _a.isFormItem) && schema.name)) return [3 /*break*/, 3];
                        _d = jsonschema.properties;
                        _e = schema.name;
                        return [4 /*yield*/, ((_c = (_b = current.info.plugin).buildDataSchemas) === null || _c === void 0 ? void 0 : _c.call(_b, current, region, trigger, node))];
                    case 2:
                        _d[_e] =
                            _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        pool.push.apply(pool, __spreadArray([], __read(current.children), false));
                        _f.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, jsonschema];
                }
            });
        });
    };
    FormPlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
        if (e === 'inited') {
            // 监听 form 的 inited 事件，把数据加入到上下文中
            var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
            var jsonschema = __assign({ $id: 'formInitedData' }, jsonToJsonSchema(data.responseData));
            scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
            scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
        }
    };
    /**
     * 为了让 form 的按钮可以点击编辑
     */
    FormPlugin.prototype.patchSchema = function (schema, info, props) {
        if (Array.isArray(schema.actions) ||
            schema.wrapWithPanel === false ||
            (Array.isArray(schema.body) &&
                schema.body.some(function (item) {
                    var _a, _b, _c;
                    return item &&
                        !!~['submit', 'button', 'button-group', 'reset'].indexOf(((_b = (_a = item === null || item === void 0 ? void 0 : item.body) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) ||
                            ((_c = item === null || item === void 0 ? void 0 : item.body) === null || _c === void 0 ? void 0 : _c.type) ||
                            item.type);
                }))) {
            return;
        }
        return __assign(__assign({}, schema), { actions: [
                {
                    type: 'submit',
                    label: (props === null || props === void 0 ? void 0 : props.translate(props === null || props === void 0 ? void 0 : props.submitText)) || schema.submitText || '提交',
                    primary: true
                }
            ] });
    };
    FormPlugin.prototype.getAvailableContextFields = function (scopeNode, target, region) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var rendererInfo, specialRenderer, parentNode, builder;
            return __generator(this, function (_o) {
                rendererInfo = target.info.renderer;
                specialRenderer = ['user-select', 'department-select'];
                // 只有表单项组件可以使用表单组件的数据域
                if (rendererInfo.isFormItem ||
                    (rendererInfo.type && specialRenderer.includes(rendererInfo.type)) ||
                    ((_a = target.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.renderer.isFormItem)) {
                    parentNode = scopeNode.parent;
                    while (parentNode && (parentNode === null || parentNode === void 0 ? void 0 : parentNode.type) !== 'crud2') {
                        parentNode = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parent;
                    }
                    if ((parentNode === null || parentNode === void 0 ? void 0 : parentNode.type) === 'crud2' &&
                        ((scopeNode === null || scopeNode === void 0 ? void 0 : scopeNode.type) === 'form' ||
                            /^body\/\d+\/filter/.test((_b = scopeNode.schemaPath) !== null && _b !== void 0 ? _b : ''))) {
                        return [2 /*return*/, (_d = (_c = parentNode.info.plugin).getAvailableContextFields) === null || _d === void 0 ? void 0 : _d.call(_c, parentNode, target, region)];
                    }
                    if (((_e = scopeNode.parent) === null || _e === void 0 ? void 0 : _e.type) === 'service' &&
                        ((_h = (_g = (_f = scopeNode.parent) === null || _f === void 0 ? void 0 : _f.parent) === null || _g === void 0 ? void 0 : _g.path) === null || _h === void 0 ? void 0 : _h.endsWith('service'))) {
                        return [2 /*return*/, (_k = (_j = scopeNode.parent.parent.info.plugin).getAvailableContextFields) === null || _k === void 0 ? void 0 : _k.call(_j, scopeNode.parent.parent, target, region)];
                    }
                    builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
                    if (builder && scopeNode.schema.api) {
                        return [2 /*return*/, builder.getAvailableContextFields({
                                schema: scopeNode.schema,
                                sourceKey: 'api',
                                feat: (_m = (_l = scopeNode.schema) === null || _l === void 0 ? void 0 : _l.feat) !== null && _m !== void 0 ? _m : DSFeatureEnum.Insert
                            }, target)];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    FormPlugin.id = 'FormPlugin';
    return FormPlugin;
}(BasePlugin));
export { FormPlugin };
registerEditorPlugin(FormPlugin);
