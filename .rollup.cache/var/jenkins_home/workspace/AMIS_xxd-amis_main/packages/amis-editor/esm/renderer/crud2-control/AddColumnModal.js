/**
 * @file AddColumnModal
 * @desc 添加列
 */
import { __assign, __awaiter, __generator, __read, __spreadArray } from "tslib";
import { useEffect, useRef } from 'react';
import omit from 'lodash/omit';
import React, { useState, useCallback } from 'react';
import { Button, Modal, themeable, utils } from 'amis';
import { getSchemaTpl, JSONPipeIn } from 'amis-editor-core';
import { DSFeatureEnum, ModelDSBuilderKey } from '../../builder';
var AddColumnModal = function (props) {
    var cx = props.classnames, render = props.render, visible = props.visible, initData = props.initData, ctx = props.ctx, manager = props.manager, builder = props.builder, onConfirm = props.onConfirm, onClose = props.onClose;
    var componentId = ctx === null || ctx === void 0 ? void 0 : ctx.id;
    var modalRef = useRef(null);
    var formRef = useRef(null);
    var _a = __read(useState(false), 2), loading = _a[0], setLoading = _a[1];
    var handleModalConfirm = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var form, schema, errorStack, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    form = (_b = (_a = formRef === null || formRef === void 0 ? void 0 : formRef.current) === null || _a === void 0 ? void 0 : _a.getWrappedInstance) === null || _b === void 0 ? void 0 : _b.call(_a);
                    setLoading(true);
                    if (!form) return [3 /*break*/, 4];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, ((_c = form.submit) === null || _c === void 0 ? void 0 : _c.call(form, function (values) { return __awaiter(void 0, void 0, void 0, function () {
                            var scaffold, column, fields;
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        if (!(values.colType === 'field')) return [3 /*break*/, 2];
                                        return [4 /*yield*/, ((_a = builder.buildCRUDColumn) === null || _a === void 0 ? void 0 : _a.call(builder, values.__fieldItem
                                                ? __assign(__assign({}, values.__fieldItem), { checked: true }) : __assign(__assign({}, values), { label: values.title, name: values.name, displayType: 'tpl' }), {
                                                renderer: 'crud',
                                                inScaffold: false,
                                                schema: ctx
                                            }, componentId))];
                                    case 1:
                                        column = _d.sent();
                                        scaffold =
                                            column !== false
                                                ? column
                                                : {
                                                    label: values.title,
                                                    name: values.name
                                                };
                                        return [3 /*break*/, 4];
                                    case 2:
                                        if (!(values.colType === 'operation')) return [3 /*break*/, 4];
                                        fields = ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.columns) !== null && _b !== void 0 ? _b : []).map(function (item) {
                                            var _a, _b;
                                            return ({
                                                displayType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text',
                                                inputType: (_b = item.type) !== null && _b !== void 0 ? _b : 'input-text',
                                                name: item.name,
                                                label: item.title
                                            });
                                        });
                                        return [4 /*yield*/, ((_c = builder.buildCRUDOpColumn) === null || _c === void 0 ? void 0 : _c.call(builder, {
                                                renderer: 'crud',
                                                inScaffold: false,
                                                feats: values.feats,
                                                schema: ctx,
                                                scaffoldConfig: {
                                                    viewFields: fields,
                                                    editFields: fields,
                                                    viewApi: values === null || values === void 0 ? void 0 : values.viewApi,
                                                    editApi: values === null || values === void 0 ? void 0 : values.editApi,
                                                    deleteApi: values === null || values === void 0 ? void 0 : values.deleteApi
                                                },
                                                buildSettings: {
                                                    useDefaultFields: true
                                                }
                                            }, componentId))];
                                    case 3:
                                        scaffold = _d.sent();
                                        _d.label = 4;
                                    case 4: return [2 /*return*/, Promise.resolve(JSONPipeIn(omit(scaffold, ['key'])))];
                                }
                            });
                        }); }))];
                case 2:
                    schema = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    errorStack = error_1.stack;
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    if (!errorStack) {
                        onConfirm(schema);
                        onClose === null || onClose === void 0 ? void 0 : onClose();
                    }
                    else {
                        /** 表单校验没通过就不自动关闭Dialog */
                        console.error(errorStack);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [onConfirm]);
    useEffect(function () { }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { ref: modalRef, size: "sm", show: visible, onHide: onClose, closeOnEsc: false, contentClassName: "ae-Scaffold-Modal AMISCSSWrapper" },
            React.createElement(Modal.Header, { showCloseButton: true, onClose: onClose },
                React.createElement(Modal.Title, null, "\u6DFB\u52A0\u5217")),
            React.createElement(Modal.Body, null, render('column-control-modal', {
                type: 'form',
                title: '',
                mode: 'horizontal',
                horizontal: {
                    justify: true,
                    leftFixed: 'sm'
                },
                submitOnChange: true,
                wrapWithPanel: false,
                clearValueOnHidden: true,
                preventEnterSubmit: true,
                actions: [],
                body: __spreadArray(__spreadArray([
                    {
                        type: 'input-tag',
                        name: 'colType',
                        label: '列类型',
                        static: true,
                        className: 'mb-2',
                        options: [
                            { label: '字段列', value: 'field' },
                            { label: '操作列', value: 'operation' }
                        ]
                    }
                ], __read(((initData === null || initData === void 0 ? void 0 : initData.colType) === 'field'
                    ? [
                        getSchemaTpl('formItemName', {
                            name: 'name',
                            label: '列字段',
                            required: true,
                            onBindingChange: function (field, onBulkChange) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
                                        name: field.value,
                                        title: field.label,
                                        __fieldItem: field
                                    }, true);
                                    return [2 /*return*/, false];
                                });
                            }); }
                        }),
                        {
                            name: 'title',
                            label: '列标题',
                            type: 'input-text',
                            required: true
                        }
                    ]
                    : [])), false), __read(((initData === null || initData === void 0 ? void 0 : initData.colType) === 'operation'
                    ? __spreadArray([
                        {
                            type: 'checkboxes',
                            label: '数据操作',
                            name: 'feats',
                            joinValues: false,
                            extractValue: true,
                            multiple: true,
                            inline: false,
                            options: [
                                { label: '查看详情', value: 'View' },
                                { label: '编辑记录', value: 'Edit' },
                                { label: '删除记录', value: 'Delete' }
                            ],
                            value: [
                                DSFeatureEnum.View,
                                DSFeatureEnum.Edit,
                                DSFeatureEnum.Delete
                            ]
                        }
                    ], __read((builder.key !== ModelDSBuilderKey
                        ? __spreadArray(__spreadArray(__spreadArray([], __read(builder.makeSourceSettingForm({
                            feat: 'View',
                            renderer: 'crud',
                            inScaffold: false,
                            sourceSettings: {
                                name: 'viewApi',
                                visibleOn: "data.feats && data.feats.indexOf('View') > -1"
                            }
                        })), false), __read(builder.makeSourceSettingForm({
                            feat: 'Edit',
                            renderer: 'crud',
                            inScaffold: false,
                            sourceSettings: {
                                name: 'editApi',
                                visibleOn: "data.feats && data.feats.indexOf('Edit') > -1"
                            }
                        })), false), __read(builder.makeSourceSettingForm({
                            feat: 'Delete',
                            renderer: 'crud',
                            inScaffold: false,
                            sourceSettings: {
                                name: 'deleteApi',
                                visibleOn: "data.feats && data.feats.indexOf('Delete') > -1"
                            }
                        })), false).filter(Boolean)
                        : [])), false).filter(function (i) { return !!i; })
                    : [])), false)
            }, {
                ref: formRef,
                popOverContainer: modalRef.current,
                disabled: loading,
                data: utils.createObject(ctx, __assign({}, initData))
            })),
            React.createElement(Modal.Footer, null,
                React.createElement(Button, { onClick: onClose }, "\u53D6\u6D88"),
                React.createElement(Button, { loading: loading, loadingClassName: cx('ae-CRUDConfigControl-modal-btn-loading'), level: "primary", onClick: handleModalConfirm }, "\u786E\u5B9A")))));
};
export default themeable(AddColumnModal);
