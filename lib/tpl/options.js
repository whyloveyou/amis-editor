/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var assign = require('lodash/assign');
var cloneDeep = require('lodash/cloneDeep');
var omit = require('lodash/omit');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var assign__default = /*#__PURE__*/_interopDefaultLegacy(assign);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);

amisEditorCore.setSchemaTpl('options', function () {
  var i18nEnabled = amisEditorCore.getI18nEnabled();
  return {
    label: i18nRuntime.i18n("25ae4ca8d4b8a67b273066a97a516327"),
    name: 'options',
    type: 'combo',
    multiple: true,
    draggable: true,
    addButtonText: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
    scaffold: {
      label: '',
      value: ''
    },
    items: [{
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      name: 'label',
      placeholder: i18nRuntime.i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
      required: true
    }, {
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
      options: [{
        label: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb"),
        value: 'text'
      }, {
        label: i18nRuntime.i18n("55d4790c5d819cd0462cbe89561b0dd4"),
        value: 'number'
      }, {
        label: i18nRuntime.i18n("97b0b6499334ed889b372513290a2a52"),
        value: 'boolean'
      }]
    }, {
      type: 'input-number',
      name: 'value',
      placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
      visibleOn: 'typeof data.value === "number"',
      unique: true
    }, {
      type: 'switch',
      name: 'value',
      placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
      visibleOn: 'typeof data.value === "boolean"',
      unique: true
    }, {
      type: 'input-text',
      name: 'value',
      placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
      visibleOn: 'typeof data.value === "undefined" || typeof data.value === "string"',
      unique: true
    }]
  };
});
amisEditorCore.setSchemaTpl('tree', {
  label: i18nRuntime.i18n("25ae4ca8d4b8a67b273066a97a516327"),
  name: 'options',
  type: 'combo',
  multiple: true,
  draggable: true,
  addButtonText: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
  description: i18nRuntime.i18n("1f08c91da33fc5f0616e8a85c0456a18"),
  scaffold: {
    label: '',
    value: ''
  },
  items: [amisEditorCore.getSchemaTpl('optionsLabel'), {
    type: 'input-text',
    name: 'value',
    placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
    unique: true
  }]
});
amisEditorCore.setSchemaTpl('multiple', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return tslib.__assign(tslib.__assign({
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'multiple',
    label: i18nRuntime.i18n("e3be7b8a459a08fec8f378a0660b642b"),
    value: false,
    hiddenOnDefault: true,
    clearChildValuesOnOff: false,
    formType: 'extend'
  }, schema.patch || {}), {
    form: {
      body: schema.replace ? schema.body : tslib.__spreadArray([amisEditorCore.getSchemaTpl('joinValues'), amisEditorCore.getSchemaTpl('delimiter'), amisEditorCore.getSchemaTpl('extractValue')], tslib.__read((schema === null || schema === void 0 ? void 0 : schema.body) || []), false)
    }
  });
});
amisEditorCore.setSchemaTpl('strictMode', {
  type: 'switch',
  label: i18nRuntime.i18n("98d52b737d6bc171b6d5bad9a42f6e23"),
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
    content: i18nRuntime.i18n("fa66d1acaef7cd181f21f5fc2895becc")
  }
});
amisEditorCore.setSchemaTpl('checkAllLabel', {
  type: 'input-text',
  name: 'checkAllLabel',
  label: i18nRuntime.i18n("cf763c357566be6fdaee886a40ddcca7"),
  value: i18nRuntime.i18n("66eeacd93a7c1bda93906fe908ad11a0"),
  mode: 'row'
});
amisEditorCore.setSchemaTpl('checkAll', function () {
  return [amisEditorCore.getSchemaTpl('switch', {
    label: i18nRuntime.i18n("9c541222ced2435288c24b34f8ad1fb8"),
    name: 'checkAll',
    value: false,
    visibleOn: 'data.multiple'
  }), {
    type: 'container',
    className: 'ae-ExtendMore mb-2',
    visibleOn: 'data.checkAll && data.multiple',
    body: [amisEditorCore.getSchemaTpl('switch', {
      label: i18nRuntime.i18n("05bef457e8350e1a5d8007cad41b70e5"),
      name: 'defaultCheckAll',
      value: false
    }), amisEditorCore.getSchemaTpl('checkAllLabel')]
  }];
});
amisEditorCore.setSchemaTpl('joinValues', function (schemaPatches) {
  if (schemaPatches === void 0) {
    schemaPatches = {};
  }
  return amisEditorCore.getSchemaTpl('switch', tslib.__assign({
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("bc8d09093edd98769d5cb39e759aa498"), i18nRuntime.i18n("2646ee1ebb6922a5c9359de6cd3b3639")),
    name: 'joinValues',
    visibleOn: 'data.multiple',
    value: true
  }, schemaPatches));
});
amisEditorCore.setSchemaTpl('delimiter', {
  type: 'input-text',
  name: 'delimiter',
  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1ca0b9b486be3b766a92474189f11fc8"), i18nRuntime.i18n("ab8e2e8cd076bd115cdd600d17ca5020")),
  visibleOn: 'data.multiple && data.joinValues',
  pipeIn: amisEditorCore.defaultValue(',')
});
amisEditorCore.setSchemaTpl('extractValue', {
  type: 'switch',
  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6df0630b4f00b6bd05de8af09c2f78ad"), i18nRuntime.i18n("d7d810ec89408c206a220f62edde737f")),
  name: 'extractValue',
  inputClassName: 'is-inline',
  visibleOn: 'data.multiple && data.joinValues === false',
  pipeIn: amisEditorCore.defaultValue(false)
});
amisEditorCore.setSchemaTpl('creatable', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return tslib.__assign({
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("4cff56e2b9703018efc48218b83844b1"), i18nRuntime.i18n("457c4cf8e1e2e0daef8949085555563f")),
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'creatable'
  }, schema);
});
amisEditorCore.setSchemaTpl('addApi', function () {
  return amisEditorCore.getSchemaTpl('apiControl', {
    label: i18nRuntime.i18n("d03c96a2da4905c5f13a87c0d8ddbdb4"),
    name: 'addApi',
    mode: 'row',
    visibleOn: 'data.creatable'
  });
});
amisEditorCore.setSchemaTpl('createBtnLabel', {
  label: i18nRuntime.i18n("9e3790244299ed296601d79e0bf43a5c"),
  name: 'createBtnLabel',
  type: 'input-text',
  placeholder: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca")
});
amisEditorCore.setSchemaTpl('editable', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return tslib.__assign({
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("a32b3bf74850faad3a9ae6a0a5dac781"), i18nRuntime.i18n("457c4cf8e1e2e0daef8949085555563f")),
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'editable'
  }, schema);
});
amisEditorCore.setSchemaTpl('editApi', function () {
  return amisEditorCore.getSchemaTpl('apiControl', {
    label: i18nRuntime.i18n("ea56ca3dac0d39e463a8233fd40a9eb6"),
    name: 'editApi',
    mode: 'row',
    visibleOn: 'data.editable'
  });
});
amisEditorCore.setSchemaTpl('editInitApi', function () {
  return amisEditorCore.getSchemaTpl('apiControl', {
    label: i18nRuntime.i18n("bbbeba31bfc391bd0741ac62ade78c5a"),
    name: 'editInitApi',
    mode: 'row',
    visibleOn: 'data.editable'
  });
});
amisEditorCore.setSchemaTpl('removable', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return tslib.__assign({
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("3c87af7c432e6b1f59e4f415fd5060cf"), i18nRuntime.i18n("457c4cf8e1e2e0daef8949085555563f")),
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'removable'
  }, schema);
});
amisEditorCore.setSchemaTpl('deleteApi', function () {
  return amisEditorCore.getSchemaTpl('apiControl', {
    label: i18nRuntime.i18n("793e260d5b7c67d43b5c6d5e885d2363"),
    name: 'deleteApi',
    mode: 'row',
    visibleOn: 'data.removable'
  });
});
amisEditorCore.setSchemaTpl('ref', function () {
  // {
  //   type: 'input-text',
  //   name: '$ref',
  //   label: '选择定义',
  //   labelRemark: '输入已经在page中设定好的定义'
  // }
  return null;
});
amisEditorCore.setSchemaTpl('selectFirst', {
  type: 'switch',
  label: i18nRuntime.i18n("553333a72dec41b54e8ed18d49453a76"),
  name: 'selectFirst',
  mode: 'horizontal',
  horizontal: {
    justify: true,
    left: 8
  },
  inputClassName: 'is-inline '
});
amisEditorCore.setSchemaTpl('hideNodePathLabel', {
  type: 'switch',
  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("0dd2e4469872c176ab1e85b66d99da98"), i18nRuntime.i18n("b7e26fcff328b28b393ef2e57e96e258")),
  name: 'hideNodePathLabel',
  mode: 'horizontal',
  horizontal: {
    justify: true,
    left: 8
  },
  inputClassName: 'is-inline'
});
amisEditorCore.setSchemaTpl('navControl', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  mode: 'normal',
  name: 'source',
  type: 'ae-navSourceControl',
  closeDefaultCheck: true // 关闭默认值设置
});

amisEditorCore.setSchemaTpl('optionControl', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  mode: 'normal',
  name: 'options',
  type: 'ae-optionControl'
});
/**
 * 新版选项控件: 不带设置默认值功能
 * 备注: 表单项组件默认值支持公式需要
 */
amisEditorCore.setSchemaTpl('optionControlV2', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  mode: 'normal',
  name: 'options',
  type: 'ae-optionControl',
  closeDefaultCheck: false // 关闭默认值设置
});
/**
 * mapping组件映射源
 */
amisEditorCore.setSchemaTpl('mapSourceControl', {
  type: 'ae-mapSourceControl',
  label: i18nRuntime.i18n("8b139ce9fa196b602bb1ee3bd25b25df"),
  mode: 'normal',
  name: 'source'
});
/**
 * 时间轴组件选项控件
 */
amisEditorCore.setSchemaTpl('timelineItemControl', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  model: 'normal',
  type: 'ae-timelineItemControl'
});
amisEditorCore.setSchemaTpl('treeOptionControl', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  mode: 'normal',
  name: 'options',
  type: 'ae-treeOptionControl'
});
amisEditorCore.setSchemaTpl('dataMap', {
  type: 'container',
  body: [amisEditorCore.getSchemaTpl('switch', {
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("dd10fdec63a2224aa3d28b48d428cb98"), i18nRuntime.i18n("22b47452f52254ce07507287d137d167") + i18nRuntime.i18n("68419387f5bb8487a848b818d78424ae")),
    name: 'dataMapSwitch',
    pipeIn: amisEditorCore.defaultValue(false),
    onChange: function (value, oldValue, model, form) {
      if (value) {
        form.setValues({
          data: {},
          dataMap: {},
          withDefaultData: false
        });
      } else {
        form.deleteValueByName('dataMap');
        form.deleteValueByName('data');
      }
    }
  }), amisEditorCore.getSchemaTpl('combo-container', {
    type: 'container',
    className: 'ae-Combo-items',
    visibleOn: 'this.dataMapSwitch',
    body: [amisEditorCore.getSchemaTpl('switch', {
      label: amisEditorCore.tipedLabel(i18nRuntime.i18n("cb65841ea7dec5ae0af20b3f5e52abfc"), i18nRuntime.i18n("6922790f45faf064e063069816e4d2ec")),
      name: 'withDefaultData',
      className: 'mb-0',
      pipeIn: amisEditorCore.defaultValue(false),
      onChange: function (value, origin, item, form) {
        var _a;
        var data = ((_a = form.data) === null || _a === void 0 ? void 0 : _a.data) || {};
        form.setValues({
          data: value ? tslib.__assign(tslib.__assign({}, data), {
            '&': '$$'
          }) : data && data['&'] === '$$' ? omit__default["default"](data, '&') : data
        });
      }
    }), {
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
        var data = cloneDeep__default["default"]((_a = form.data) === null || _a === void 0 ? void 0 : _a.data);
        return data && data['&'] === '$$' ? omit__default["default"](data, '&') : data;
      },
      onChange: function (value, oldValue, model, form) {
        var newData = form.data.withDefaultData ? assign__default["default"]({
          '&': '$$'
        }, value) : cloneDeep__default["default"](value);
        form.setValues({
          data: newData
        });
        return value;
      }
    }]
  })]
});
/**
 * 选项类组件新增单选项控件
 */
amisEditorCore.setSchemaTpl('optionAddControl', function (params) {
  var _a = params || {},
    manager = _a.manager,
    _b = _a.controlSchema,
    controlSchema = _b === void 0 ? {} : _b,
    _c = _a.collections,
    collections = _c === void 0 ? [] : _c,
    replace = _a.replace;
  var customFormItems = Array.isArray(collections) ? collections : [collections];
  return amisEditorCore.getSchemaTpl('creatable', tslib.__assign(tslib.__assign({
    formType: 'extend',
    autoFocus: false,
    hiddenOnDefault: false
  }, controlSchema), {
    form: {
      body: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(replace ? customFormItems : tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(customFormItems), false), [amisEditorCore.getSchemaTpl('createBtnLabel')], false)), false), [amisEditorCore.getSchemaTpl('addApi'), /** 用于关闭开关后清空相关配置 */
      {
        type: 'hidden',
        name: 'addDialog'
      }, {
        name: 'addControls',
        asFormItem: true,
        label: false,
        children: function (props) {
          var _a = props || {},
            value = _a.value,
            ctx = _a.data,
            onBulkChange = _a.onBulkChange;
          var _b = ctx || {},
            addApi = _b.addApi,
            createBtnLabel = _b.createBtnLabel,
            addDialog = _b.addDialog,
            optionLabel = _b.optionLabel;
          /** 新增表单弹窗 */
          var scaffold = tslib.__assign(tslib.__assign({
            type: 'dialog',
            title: createBtnLabel || i18nRuntime.i18n("66ab5e9f24c8f46012a25c89919fb191").concat(optionLabel || i18nRuntime.i18n("ea15ae2b7fba76c83eec6d0986d15197"))
          }, addDialog), {
            body: {
              /** 标识符，用于 SubEditor 确认后找到对应的 Schema */
              'amis-select-addControls': true,
              'type': 'form',
              'api': addApi,
              /** 这里是为了兼容旧版，比如type: text类型的组件会被渲染为input-text */
              'controls': tslib.__spreadArray([], tslib.__read(value ? Array.isArray(value) ? value : [value] : [/** FIXME: 这里是没做任何配置时的默认 scaffold */
              {
                type: 'input-text',
                name: 'label',
                label: false,
                required: true,
                placeholder: i18nRuntime.i18n("06e2f88f428b7e26f7da3cd4d40ec2ed")
              }]), false)
            }
          });
          return React__default["default"].createElement(amisUi.Button, {
            className: "w-full flex flex-col items-center",
            level: "enhance",
            size: "sm",
            onClick: function () {
              manager.openSubEditor({
                title: i18nRuntime.i18n("c630aa278a251b72bebf09284095112a"),
                value: scaffold,
                onChange: function (value, diff) {
                  var _a, _b, _c, _d;
                  var pureSchema = amisEditorCore.JSONPipeOut(value, function (key, propValue) {
                    return key.substring(0, 2) === '__' || key === 'id';
                  });
                  var addDialog = omit__default["default"](pureSchema, ['type', 'body', 'id']);
                  var targetForm = amisCore.findObjectsWithKey(pureSchema, 'amis-select-addControls');
                  var addApi = (_a = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _a === void 0 ? void 0 : _a.api;
                  var addControls = (_c = (_b = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _b === void 0 ? void 0 : _b.controls) !== null && _c !== void 0 ? _c : (_d = targetForm === null || targetForm === void 0 ? void 0 : targetForm[0]) === null || _d === void 0 ? void 0 : _d.body;
                  onBulkChange({
                    addApi: addApi,
                    addDialog: addDialog,
                    addControls: addControls
                  });
                }
              });
            }
          }, i18nRuntime.i18n("c630aa278a251b72bebf09284095112a"));
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
    }
  }));
});
/**
 * 选项类组件编辑单选项控件
 */
amisEditorCore.setSchemaTpl('optionEditControl', function (params) {
  var _a = params || {},
    manager = _a.manager,
    _b = _a.controlSchema,
    controlSchema = _b === void 0 ? {} : _b,
    _c = _a.collections,
    collections = _c === void 0 ? [] : _c,
    replace = _a.replace;
  var customFormItems = Array.isArray(collections) ? collections : [collections];
  return amisEditorCore.getSchemaTpl('editable', tslib.__assign(tslib.__assign({
    formType: 'extend',
    autoFocus: false,
    hiddenOnDefault: false
  }, controlSchema), {
    form: {
      body: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(replace ? customFormItems : tslib.__spreadArray([], tslib.__read(customFormItems), false)), false), [amisEditorCore.getSchemaTpl('editInitApi'), amisEditorCore.getSchemaTpl('editApi'), /** 用于关闭开关后清空相关配置 */
      {
        type: 'hidden',
        name: 'editDialog'
      }, {
        name: 'editControls',
        asFormItem: true,
        label: false,
        children: function (props) {
          var _a = props || {},
            value = _a.value,
            ctx = _a.data,
            onBulkChange = _a.onBulkChange;
          var _b = ctx || {},
            editApi = _b.editApi,
            editInitApi = _b.editInitApi,
            editDialog = _b.editDialog;
            _b.optionLabel;
          /** 新增表单弹窗 */
          var scaffold = tslib.__assign(tslib.__assign({
            type: 'dialog',
            title: i18nRuntime.i18n("cd994c38456676f5a55c5593b6a652bf")
          }, editDialog), {
            body: {
              /** 标识符，用于 SubEditor 确认后找到对应的 Schema */
              'amis-select-editControls': true,
              'type': 'form',
              'api': editApi,
              'initApi': editInitApi,
              /** 这里是为了兼容旧版，比如type: text类型的组件会被渲染为input-text */
              'controls': tslib.__spreadArray([], tslib.__read(value ? Array.isArray(value) ? value : [value] : [/** FIXME: 这里是没做任何配置时的默认 scaffold */
              {
                type: 'input-text',
                name: 'label',
                label: false,
                required: true,
                placeholder: i18nRuntime.i18n("06e2f88f428b7e26f7da3cd4d40ec2ed")
              }]), false)
            }
          });
          return React__default["default"].createElement(amisUi.Button, {
            className: "w-full flex flex-col items-center",
            level: "enhance",
            size: "sm",
            onClick: function () {
              manager.openSubEditor({
                title: i18nRuntime.i18n("fba91204d335ae6eda35809023a94f7f"),
                value: scaffold,
                onChange: function (value, diff) {
                  var _a, _b, _c, _d, _e;
                  var pureSchema = amisEditorCore.JSONPipeOut(value, function (key, propValue) {
                    return key.substring(0, 2) === '__' || key === 'id';
                  });
                  var editDialog = omit__default["default"](pureSchema, ['type', 'body', 'id']);
                  var targetForm = amisCore.findObjectsWithKey(pureSchema, 'amis-select-editControls');
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
            }
          }, i18nRuntime.i18n("fba91204d335ae6eda35809023a94f7f"));
        }
      }], false)
    }
  }));
});
/**
 * 选项类组件删除单选项控件
 */
amisEditorCore.setSchemaTpl('optionDeleteControl', function (params) {
  var _a = params || {};
    _a.manager;
    var _b = _a.controlSchema,
    controlSchema = _b === void 0 ? {} : _b,
    _c = _a.collections,
    collections = _c === void 0 ? [] : _c,
    replace = _a.replace;
  var customFormItems = Array.isArray(collections) ? collections : [collections];
  return amisEditorCore.getSchemaTpl('removable', tslib.__assign(tslib.__assign({
    formType: 'extend',
    autoFocus: false,
    hiddenOnDefault: false
  }, controlSchema), {
    form: {
      body: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(replace ? customFormItems : tslib.__spreadArray([], tslib.__read(customFormItems), false)), false), [amisEditorCore.getSchemaTpl('deleteApi')], false)
    }
  }));
});
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
