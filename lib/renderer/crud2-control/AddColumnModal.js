/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var omit = require('lodash/omit');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var constants = require('../../builder/constants.js');
require('lodash/isObjectLike');
require('../../builder/DSBuilder.js');
require('../../builder/DSBuilderManager.js');
require('../../builder/ApiDSBuilder.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);

/**
 * @file AddColumnModal
 * @desc 添加列
 */
var AddColumnModal = function (props) {
  var cx = props.classnames,
    render = props.render,
    visible = props.visible,
    initData = props.initData,
    ctx = props.ctx;
    props.manager;
    var builder = props.builder,
    onConfirm = props.onConfirm,
    onClose = props.onClose;
  var componentId = ctx === null || ctx === void 0 ? void 0 : ctx.id;
  var modalRef = React.useRef(null);
  var formRef = React.useRef(null);
  var _a = tslib.__read(React.useState(false), 2),
    loading = _a[0],
    setLoading = _a[1];
  var handleModalConfirm = React.useCallback(function () {
    return tslib.__awaiter(void 0, void 0, void 0, function () {
      var form, schema, errorStack, error_1;
      var _a, _b, _c;
      return tslib.__generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            form = (_b = (_a = formRef === null || formRef === void 0 ? void 0 : formRef.current) === null || _a === void 0 ? void 0 : _a.getWrappedInstance) === null || _b === void 0 ? void 0 : _b.call(_a);
            setLoading(true);
            if (!form) return [3 /*break*/, 4];
            _d.label = 1;
          case 1:
            _d.trys.push([1, 3,, 4]);
            return [4 /*yield*/, (_c = form.submit) === null || _c === void 0 ? void 0 : _c.call(form, function (values) {
              return tslib.__awaiter(void 0, void 0, void 0, function () {
                var scaffold, column, fields;
                var _a, _b, _c;
                return tslib.__generator(this, function (_d) {
                  switch (_d.label) {
                    case 0:
                      if (!(values.colType === 'field')) return [3 /*break*/, 2];
                      return [4 /*yield*/, (_a = builder.buildCRUDColumn) === null || _a === void 0 ? void 0 : _a.call(builder, values.__fieldItem ? tslib.__assign(tslib.__assign({}, values.__fieldItem), {
                        checked: true
                      }) : tslib.__assign(tslib.__assign({}, values), {
                        label: values.title,
                        name: values.name,
                        displayType: 'tpl'
                      }), {
                        renderer: 'crud',
                        inScaffold: false,
                        schema: ctx
                      }, componentId)];
                    case 1:
                      column = _d.sent();
                      scaffold = column !== false ? column : {
                        label: values.title,
                        name: values.name
                      };
                      return [3 /*break*/, 4];
                    case 2:
                      if (!(values.colType === 'operation')) return [3 /*break*/, 4];
                      fields = ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.columns) !== null && _b !== void 0 ? _b : []).map(function (item) {
                        var _a, _b;
                        return {
                          displayType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text',
                          inputType: (_b = item.type) !== null && _b !== void 0 ? _b : 'input-text',
                          name: item.name,
                          label: item.title
                        };
                      });
                      return [4 /*yield*/, (_c = builder.buildCRUDOpColumn) === null || _c === void 0 ? void 0 : _c.call(builder, {
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
                      }, componentId)];
                    case 3:
                      scaffold = _d.sent();
                      _d.label = 4;
                    case 4:
                      return [2 /*return*/, Promise.resolve(amisEditorCore.JSONPipeIn(omit__default["default"](scaffold, ['key'])))];
                  }
                });
              });
            })];
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
            } else {
              /** 表单校验没通过就不自动关闭Dialog */
              console.error(errorStack);
            }
            return [2 /*return*/];
        }
      });
    });
  }, [onConfirm]);
  React.useEffect(function () {}, []);
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement(amis.Modal, {
    ref: modalRef,
    size: "sm",
    show: visible,
    onHide: onClose,
    closeOnEsc: false,
    contentClassName: "ae-Scaffold-Modal AMISCSSWrapper"
  }, React__default["default"].createElement(amis.Modal.Header, {
    showCloseButton: true,
    onClose: onClose
  }, React__default["default"].createElement(amis.Modal.Title, null, i18nRuntime.i18n("49198f84cea6c212cd5d463037827cd5"))), React__default["default"].createElement(amis.Modal.Body, null, render('column-control-modal', {
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
    body: tslib.__spreadArray(tslib.__spreadArray([{
      type: 'input-tag',
      name: 'colType',
      label: i18nRuntime.i18n("fb4c95bae088e3f216ea9312bcdb26ca"),
      static: true,
      className: 'mb-2',
      options: [{
        label: i18nRuntime.i18n("8eebb8ae809cf1ceaa23cd2fa2c73898"),
        value: 'field'
      }, {
        label: i18nRuntime.i18n("39ccc34fa3ee9be12d8bae7e6fecbac2"),
        value: 'operation'
      }]
    }], tslib.__read((initData === null || initData === void 0 ? void 0 : initData.colType) === 'field' ? [amisEditorCore.getSchemaTpl('formItemName', {
      name: 'name',
      label: i18nRuntime.i18n("4ca07911d10b74cc7c357b510e7cc948"),
      required: true,
      onBindingChange: function (field, onBulkChange) {
        return tslib.__awaiter(void 0, void 0, void 0, function () {
          return tslib.__generator(this, function (_a) {
            onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
              name: field.value,
              title: field.label,
              __fieldItem: field
            }, true);
            return [2 /*return*/, false];
          });
        });
      }
    }), {
      name: 'title',
      label: i18nRuntime.i18n("eb2719a7e6cebda7ca234560f21fb448"),
      type: 'input-text',
      required: true
    }] : []), false), tslib.__read((initData === null || initData === void 0 ? void 0 : initData.colType) === 'operation' ? tslib.__spreadArray([{
      type: 'checkboxes',
      label: i18nRuntime.i18n("5246d2c81fa12b1f4f73635c257e232d"),
      name: 'feats',
      joinValues: false,
      extractValue: true,
      multiple: true,
      inline: false,
      options: [{
        label: i18nRuntime.i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
        value: 'View'
      }, {
        label: i18nRuntime.i18n("e22b59b6bda1cf9a58f8979fd0a0b43c"),
        value: 'Edit'
      }, {
        label: i18nRuntime.i18n("a790208cafd5c95a18dd9a168319ecf8"),
        value: 'Delete'
      }],
      value: [constants.DSFeatureEnum.View, constants.DSFeatureEnum.Edit, constants.DSFeatureEnum.Delete]
    }], tslib.__read(builder.key !== constants.ModelDSBuilderKey ? tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(builder.makeSourceSettingForm({
      feat: 'View',
      renderer: 'crud',
      inScaffold: false,
      sourceSettings: {
        name: 'viewApi',
        visibleOn: "data.feats && data.feats.indexOf('View') > -1"
      }
    })), false), tslib.__read(builder.makeSourceSettingForm({
      feat: 'Edit',
      renderer: 'crud',
      inScaffold: false,
      sourceSettings: {
        name: 'editApi',
        visibleOn: "data.feats && data.feats.indexOf('Edit') > -1"
      }
    })), false), tslib.__read(builder.makeSourceSettingForm({
      feat: 'Delete',
      renderer: 'crud',
      inScaffold: false,
      sourceSettings: {
        name: 'deleteApi',
        visibleOn: "data.feats && data.feats.indexOf('Delete') > -1"
      }
    })), false).filter(Boolean) : []), false).filter(function (i) {
      return !!i;
    }) : []), false)
  }, {
    ref: formRef,
    popOverContainer: modalRef.current,
    disabled: loading,
    data: amis.utils.createObject(ctx, tslib.__assign({}, initData))
  })), React__default["default"].createElement(amis.Modal.Footer, null, React__default["default"].createElement(amis.Button, {
    onClick: onClose
  }, i18nRuntime.i18n("625fb26b4b3340f7872b411f401e754c")), React__default["default"].createElement(amis.Button, {
    loading: loading,
    loadingClassName: cx('ae-CRUDConfigControl-modal-btn-loading'),
    level: "primary",
    onClick: handleModalConfirm
  }, i18nRuntime.i18n("38cf16f2204ffab8a6e0187070558721")))));
};
var AddColumnModal$1 = amis.themeable(AddColumnModal);

exports["default"] = AddColumnModal$1;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
