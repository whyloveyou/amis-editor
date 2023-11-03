import { __assign, __read, __spreadArray } from "tslib";
import React from 'react';
import { setSchemaTpl, getSchemaTpl, defaultValue, getI18nEnabled, tipedLabel, JSONPipeOut } from 'amis-editor-core';
import { findObjectsWithKey } from 'amis-core';
import { Button } from 'amis-ui';
import assign from 'lodash/assign';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
setSchemaTpl('options', function () {
    var i18nEnabled = getI18nEnabled();
    return {
        label: '选项 Options',
        name: 'options',
        type: 'combo',
        multiple: true,
        draggable: true,
        addButtonText: '新增选项',
        scaffold: {
            label: '',
            value: ''
        },
        items: [
            {
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                name: 'label',
                placeholder: '名称',
                required: true
            },
            {
                type: 'select',
                name: 'value',
                pipeIn: function (value) {
                    if (typeof value === 'string') {
                        return 'text';
                    }
                    if (typeof value === 'boolean') {
                        return 'boolean';
                    }
                    if (typeof value === 'number') {
                        return 'number';
                    }
                    return 'text';
                },
                pipeOut: function (value, oldValue) {
                    if (value === 'text') {
                        return String(oldValue);
                    }
                    if (value === 'number') {
                        var convertTo = Number(oldValue);
                        if (isNaN(convertTo)) {
                            return 0;
                        }
                        return convertTo;
                    }
                    if (value === 'boolean') {
                        return Boolean(oldValue);
                    }
                    return '';
                },
                options: [
                    { label: '文本', value: 'text' },
                    { label: '数字', value: 'number' },
                    { label: '布尔', value: 'boolean' }
                ]
            },
            {
                type: 'input-number',
                name: 'value',
                placeholder: '值',
                visibleOn: 'typeof data.value === "number"',
                unique: true
            },
            {
                type: 'switch',
                name: 'value',
                placeholder: '值',
                visibleOn: 'typeof data.value === "boolean"',
                unique: true
            },
            {
                type: 'input-text',
                name: 'value',
                placeholder: '值',
                visibleOn: 'typeof data.value === "undefined" || typeof data.value === "string"',
                unique: true
            }
        ]
    };
});
setSchemaTpl('tree', {
    label: '选项 Options',
    name: 'options',
    type: 'combo',
    multiple: true,
    draggable: true,
    addButtonText: '新增选项',
    description: '静态数据暂不支持多级，请切换到代码模式，或者采用 source 接口获取。',
    scaffold: {
        label: '',
        value: ''
    },
    items: [
        getSchemaTpl('optionsLabel'),
        {
            type: 'input-text',
            name: 'value',
            placeholder: '值',
            unique: true
        }
    ]
});
setSchemaTpl('multiple', function (schema) {
    if (schema === void 0) { schema = {}; }
    return __assign(__assign({ type: 'ae-switch-more', mode: 'normal', name: 'multiple', label: '可多选', value: false, hiddenOnDefault: true, clearChildValuesOnOff: false, formType: 'extend' }, (schema.patch || {})), { form: {
            body: schema.replace
                ? schema.body
                : __spreadArray([
                    getSchemaTpl('joinValues'),
                    getSchemaTpl('delimiter'),
                    getSchemaTpl('extractValue')
                ], __read(((schema === null || schema === void 0 ? void 0 : schema.body) || [])), false)
        } });
});
setSchemaTpl('strictMode', {
    type: 'switch',
    label: '严格模式',
    name: 'strictMode',
    value: false,
    mode: 'horizontal',
    horizontal: {
        justify: true,
        left: 8
    },
    inputClassName: 'is-inline ',
    labelRemark: {
        trigger: ['hover', 'focus'],
        setting: true,
        title: '',
        content: '启用严格模式将采用值严格相等比较'
    }
});
setSchemaTpl('checkAllLabel', {
    type: 'input-text',
    name: 'checkAllLabel',
    label: '选项文案',
    value: '全选',
    mode: 'row'
});
setSchemaTpl('checkAll', function () {
    return [
        getSchemaTpl('switch', {
            label: '可全选',
            name: 'checkAll',
            value: false,
            visibleOn: 'data.multiple'
        }),
        {
            type: 'container',
            className: 'ae-ExtendMore mb-2',
            visibleOn: 'data.checkAll && data.multiple',
            body: [
                getSchemaTpl('switch', {
                    label: '默认全选',
                    name: 'defaultCheckAll',
                    value: false
                }),
                getSchemaTpl('checkAllLabel')
            ]
        }
    ];
});
setSchemaTpl('joinValues', function (schemaPatches) {
    if (schemaPatches === void 0) { schemaPatches = {}; }
    return getSchemaTpl('switch', __assign({ label: tipedLabel('拼接值', '开启后将选中的选项 value 的值用连接符拼接起来，作为当前表单项的值'), name: 'joinValues', visibleOn: 'data.multiple', value: true }, schemaPatches));
});
setSchemaTpl('delimiter', {
    type: 'input-text',
    name: 'delimiter',
    label: tipedLabel('拼接符', '将多个值拼接成一个字符串的连接符号'),
    visibleOn: 'data.multiple && data.joinValues',
    pipeIn: defaultValue(',')
});
setSchemaTpl('extractValue', {
    type: 'switch',
    label: tipedLabel('仅提取值', '开启后将选中项的 value 封装为数组，关闭后则将整个选项数据封装为数组。'),
    name: 'extractValue',
    inputClassName: 'is-inline',
    visibleOn: 'data.multiple && data.joinValues === false',
    pipeIn: defaultValue(false)
});
setSchemaTpl('creatable', function (schema) {
    if (schema === void 0) { schema = {}; }
    return __assign({ label: tipedLabel('可创建', '配置事件动作可插入或拦截默认交互'), type: 'ae-switch-more', mode: 'normal', name: 'creatable' }, schema);
});
setSchemaTpl('addApi', function () {
    return getSchemaTpl('apiControl', {
        label: '新增接口',
        name: 'addApi',
        mode: 'row',
        visibleOn: 'data.creatable'
    });
});
setSchemaTpl('createBtnLabel', {
    label: '新增按钮名称',
    name: 'createBtnLabel',
    type: 'input-text',
    placeholder: '新增选项'
});
setSchemaTpl('editable', function (schema) {
    if (schema === void 0) { schema = {}; }
    return __assign({ label: tipedLabel('可编辑', '配置事件动作可插入或拦截默认交互'), type: 'ae-switch-more', mode: 'normal', name: 'editable' }, schema);
});
setSchemaTpl('editApi', function () {
    return getSchemaTpl('apiControl', {
        label: '编辑接口',
        name: 'editApi',
        mode: 'row',
        visibleOn: 'data.editable'
    });
});
setSchemaTpl('editInitApi', function () {
    return getSchemaTpl('apiControl', {
        label: '编辑初始化接口',
        name: 'editInitApi',
        mode: 'row',
        visibleOn: 'data.editable'
    });
});
setSchemaTpl('removable', function (schema) {
    if (schema === void 0) { schema = {}; }
    return __assign({ label: tipedLabel('可删除', '配置事件动作可插入或拦截默认交互'), type: 'ae-switch-more', mode: 'normal', name: 'removable' }, schema);
});
setSchemaTpl('deleteApi', function () {
    return getSchemaTpl('apiControl', {
        label: '删除接口',
        name: 'deleteApi',
        mode: 'row',
        visibleOn: 'data.removable'
    });
});
setSchemaTpl('ref', function () {
    // {
    //   type: 'input-text',
    //   name: '$ref',
    //   label: '选择定义',
    //   labelRemark: '输入已经在page中设定好的定义'
    // }
    return null;
});
setSchemaTpl('selectFirst', {
    type: 'switch',
    label: '默认选择第一项',
    name: 'selectFirst',
    mode: 'horizontal',
    horizontal: {
        justify: true,
        left: 8
    },
    inputClassName: 'is-inline '
});
setSchemaTpl('hideNodePathLabel', {
    type: 'switch',
    label: tipedLabel('隐藏路径', '隐藏选中节点的祖先节点文本信息'),
    name: 'hideNodePathLabel',
    mode: 'horizontal',
    horizontal: {
        justify: true,
        left: 8
    },
    inputClassName: 'is-inline'
});
setSchemaTpl('navControl', {
    label: '数据',
    mode: 'normal',
    name: 'source',
    type: 'ae-navSourceControl',
    closeDefaultCheck: true // 关闭默认值设置
});
setSchemaTpl('optionControl', {
    label: '数据',
    mode: 'normal',
    name: 'options',
    type: 'ae-optionControl'
});
/**
 * 新版选项控件: 不带设置默认值功能
 * 备注: 表单项组件默认值支持公式需要
 */
setSchemaTpl('optionControlV2', {
    label: '数据',
    mode: 'normal',
    name: 'options',
    type: 'ae-optionControl',
    closeDefaultCheck: false // 关闭默认值设置
});
/**
 * mapping组件映射源
 */
setSchemaTpl('mapSourceControl', {
    type: 'ae-mapSourceControl',
    label: '映射表',
    mode: 'normal',
    name: 'source'
});
/**
 * 时间轴组件选项控件
 */
setSchemaTpl('timelineItemControl', {
    label: '数据',
    model: 'normal',
    type: 'ae-timelineItemControl'
});
setSchemaTpl('treeOptionControl', {
    label: '数据',
    mode: 'normal',
    name: 'options',
    type: 'ae-treeOptionControl'
});
setSchemaTpl('dataMap', {
    type: 'container',
    body: [
        getSchemaTpl('switch', {
            label: tipedLabel('数据映射', '<div> 当开启数据映射时，弹框中的数据只会包含设置的部分，请绑定数据。如：{"a": "\\${a}", "b": 2}。</div>' +
                '<div>当值为 __undefined时，表示删除对应的字段，可以结合{"&": "\\$$"}来达到黑名单效果。</div>'),
            name: 'dataMapSwitch',
            pipeIn: defaultValue(false),
            onChange: function (value, oldValue, model, form) {
                if (value) {
                    form.setValues({
                        data: {},
                        dataMap: {},
                        withDefaultData: false
                    });
                }
                else {
                    form.deleteValueByName('dataMap');
                    form.deleteValueByName('data');
                }
            }
        }),
        getSchemaTpl('combo-container', {
            type: 'container',
            className: 'ae-Combo-items',
            visibleOn: 'this.dataMapSwitch',
            body: [
                getSchemaTpl('switch', {
                    label: tipedLabel('原始数据打平', '开启后，会将所有原始数据打平设置到 data 中，并在此基础上定制'),
                    name: 'withDefaultData',
                    className: 'mb-0',
                    pipeIn: defaultValue(false),
                    onChange: function (value, origin, item, form) {
                        var _a;
                        var data = ((_a = form.data) === null || _a === void 0 ? void 0 : _a.data) || {};
                        form.setValues({
                            data: value
                                ? __assign(__assign({}, data), { '&': '$$' }) : data && data['&'] === '$$'
                                ? omit(data, '&')
                                : data
                        });
                    }
                }),
                {
                    type: 'input-kv',
                    syncDefaultValue: false,
                    name: 'dataMap',
                    className: 'block -mt-5',
                    deleteBtn: {
                        icon: 'fa fa-trash'
                    },
                    updatePristineAfterStoreDataReInit: true,
                    itemsWrapperClassName: 'ae-Combo-items',
                    pipeIn: function (e, form) {
                        var _a;
                        var data = cloneDeep((_a = form.data) === null || _a === void 0 ? void 0 : _a.data);
                        return data && data['&'] === '$$' ? omit(data, '&') : data;
                    },
                    onChange: function (value, oldValue, model, form) {
                        var newData = form.data.withDefaultData
                            ? assign({ '&': '$$' }, value)
                            : cloneDeep(value);
                        form.setValues({
                            data: newData
                        });
                        return value;
                    }
                }
            ]
        })
    ]
});
/**
 * 选项类组件新增单选项控件
 */
setSchemaTpl('optionAddControl', function (params) {
    var _a = params || {}, manager = _a.manager, _b = _a.controlSchema, controlSchema = _b === void 0 ? {} : _b, _c = _a.collections, collections = _c === void 0 ? [] : _c, replace = _a.replace;
    var customFormItems = Array.isArray(collections)
        ? collections
        : [collections];
    return getSchemaTpl('creatable', __assign(__assign({ formType: 'extend', autoFocus: false, hiddenOnDefault: false }, controlSchema), { form: {
            body: __spreadArray(__spreadArray([], __read((replace
                ? customFormItems
                : __spreadArray(__spreadArray([], __read(customFormItems), false), [getSchemaTpl('createBtnLabel')], false))), false), [
                getSchemaTpl('addApi'),
                /** 用于关闭开关后清空相关配置 */
                {
                    type: 'hidden',
                    name: 'addDialog'
                },
                {
                    name: 'addControls',
                    asFormItem: true,
                    label: false,
                    children: function (props) {
                        var _a = props || {}, value = _a.value, ctx = _a.data, onBulkChange = _a.onBulkChange;
                        var _b = ctx || {}, addApi = _b.addApi, createBtnLabel = _b.createBtnLabel, addDialog = _b.addDialog, optionLabel = _b.optionLabel;
                        /** 新增表单弹窗 */
                        var scaffold = __assign(__assign({ type: 'dialog', title: createBtnLabel || "\u65B0\u589E".concat(optionLabel || '选项') }, addDialog), { body: {
                                /** 标识符，用于 SubEditor 确认后找到对应的 Schema */
                                'amis-select-addControls': true,
                                'type': 'form',
                                'api': addApi,
                                /** 这里是为了兼容旧版，比如type: text类型的组件会被渲染为input-text */
                                'controls': __spreadArray([], __read((value
                                    ? Array.isArray(value)
                                        ? value
                                        : [value]
                                    : [
                                        /** FIXME: 这里是没做任何配置时的默认 scaffold */
                                        {
                                            type: 'input-text',
                                            name: 'label',
                                            label: false,
                                            required: true,
                                            placeholder: '请输入名称'
                                        }
                                    ])), false)
                            } });
                        return (React.createElement(Button, { className: "w-full flex flex-col items-center", level: "enhance", size: "sm", onClick: function () {
                                manager.openSubEditor({
                                    title: '配置新增表单',
                                    value: scaffold,
                                    onChange: function (value, diff) {
                                        var _a, _b, _c, _d;
                                        var pureSchema = JSONPipeOut(value, function (key, propValue) {
                                            return key.substring(0, 2) === '__' || key === 'id';
                                        });
                                        var addDialog = omit(pureSchema, [
                                            'type',
                                            'body',
                                            'id'
                                        ]);
                                        var targetForm = findObjectsWithKey(pureSchema, 'amis-select-addControls');
                                        var addApi = (_a = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _a === void 0 ? void 0 : _a.api;
                                        var addControls = (_c = (_b = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _b === void 0 ? void 0 : _b.controls) !== null && _c !== void 0 ? _c : (_d = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _d === void 0 ? void 0 : _d.body;
                                        onBulkChange({ addApi: addApi, addDialog: addDialog, addControls: addControls });
                                    }
                                });
                            } }, "\u914D\u7F6E\u65B0\u589E\u8868\u5355"));
                    }
                }
                // {
                //   label: '按钮位置',
                //   name: 'valueType',
                //   type: 'button-group-select',
                //   size: 'sm',
                //   tiled: true,
                //   value: 'asUpload',
                //   mode: 'row',
                //   options: [
                //     {
                //       label: '顶部',
                //       value: ''
                //     },
                //     {
                //       label: '底部',
                //       value: ''
                //     },
                //   ],
                // }
            ], false)
        } }));
});
/**
 * 选项类组件编辑单选项控件
 */
setSchemaTpl('optionEditControl', function (params) {
    var _a = params || {}, manager = _a.manager, _b = _a.controlSchema, controlSchema = _b === void 0 ? {} : _b, _c = _a.collections, collections = _c === void 0 ? [] : _c, replace = _a.replace;
    var customFormItems = Array.isArray(collections)
        ? collections
        : [collections];
    return getSchemaTpl('editable', __assign(__assign({ formType: 'extend', autoFocus: false, hiddenOnDefault: false }, controlSchema), { form: {
            body: __spreadArray(__spreadArray([], __read((replace ? customFormItems : __spreadArray([], __read(customFormItems), false))), false), [
                getSchemaTpl('editInitApi'),
                getSchemaTpl('editApi'),
                /** 用于关闭开关后清空相关配置 */
                {
                    type: 'hidden',
                    name: 'editDialog'
                },
                {
                    name: 'editControls',
                    asFormItem: true,
                    label: false,
                    children: function (props) {
                        var _a = props || {}, value = _a.value, ctx = _a.data, onBulkChange = _a.onBulkChange;
                        var _b = ctx || {}, editApi = _b.editApi, editInitApi = _b.editInitApi, editDialog = _b.editDialog, optionLabel = _b.optionLabel;
                        /** 新增表单弹窗 */
                        var scaffold = __assign(__assign({ type: 'dialog', title: '编辑选项' }, editDialog), { body: {
                                /** 标识符，用于 SubEditor 确认后找到对应的 Schema */
                                'amis-select-editControls': true,
                                'type': 'form',
                                'api': editApi,
                                'initApi': editInitApi,
                                /** 这里是为了兼容旧版，比如type: text类型的组件会被渲染为input-text */
                                'controls': __spreadArray([], __read((value
                                    ? Array.isArray(value)
                                        ? value
                                        : [value]
                                    : [
                                        /** FIXME: 这里是没做任何配置时的默认 scaffold */
                                        {
                                            type: 'input-text',
                                            name: 'label',
                                            label: false,
                                            required: true,
                                            placeholder: '请输入名称'
                                        }
                                    ])), false)
                            } });
                        return (React.createElement(Button, { className: "w-full flex flex-col items-center", level: "enhance", size: "sm", onClick: function () {
                                manager.openSubEditor({
                                    title: '配置编辑表单',
                                    value: scaffold,
                                    onChange: function (value, diff) {
                                        var _a, _b, _c, _d, _e;
                                        var pureSchema = JSONPipeOut(value, function (key, propValue) {
                                            return key.substring(0, 2) === '__' || key === 'id';
                                        });
                                        var editDialog = omit(pureSchema, [
                                            'type',
                                            'body',
                                            'id'
                                        ]);
                                        var targetForm = findObjectsWithKey(pureSchema, 'amis-select-editControls');
                                        var editApi = (_a = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _a === void 0 ? void 0 : _a.api;
                                        var editInitApi = (_b = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _b === void 0 ? void 0 : _b.initApi;
                                        var editControls = (_d = (_c = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _c === void 0 ? void 0 : _c.controls) !== null && _d !== void 0 ? _d : (_e = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _e === void 0 ? void 0 : _e.body;
                                        onBulkChange({
                                            editApi: editApi,
                                            editInitApi: editInitApi,
                                            editDialog: editDialog,
                                            editControls: editControls
                                        });
                                    }
                                });
                            } }, "\u914D\u7F6E\u7F16\u8F91\u8868\u5355"));
                    }
                }
            ], false)
        } }));
});
/**
 * 选项类组件删除单选项控件
 */
setSchemaTpl('optionDeleteControl', function (params) {
    var _a = params || {}, manager = _a.manager, _b = _a.controlSchema, controlSchema = _b === void 0 ? {} : _b, _c = _a.collections, collections = _c === void 0 ? [] : _c, replace = _a.replace;
    var customFormItems = Array.isArray(collections)
        ? collections
        : [collections];
    return getSchemaTpl('removable', __assign(__assign({ formType: 'extend', autoFocus: false, hiddenOnDefault: false }, controlSchema), { form: {
            body: __spreadArray(__spreadArray([], __read((replace ? customFormItems : __spreadArray([], __read(customFormItems), false))), false), [
                getSchemaTpl('deleteApi')
            ], false)
        } }));
});