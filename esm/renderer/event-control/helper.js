/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __spreadArray, __assign, __read, __awaiter, __generator } from 'tslib';
import React__default from 'react';
import { getSchemaTpl, JSONGetById, defaultValue, tipedLabel, JsonGenerateID, getFixDialogType } from 'amis-editor-core';
import { findTree, filterTree, normalizeApi, DataSchema, guid } from 'amis-core';
import { Button } from 'amis';
import without from 'lodash/without';
import CmptActionSelect from './comp-action-select.js';
import { i18n } from 'i18n-runtime';

var getArgsWrapper = function (items, multiple, patch) {
  if (multiple === void 0) {
    multiple = false;
  }
  if (patch === void 0) {
    patch = {};
  }
  return __assign(__assign({
    type: 'combo',
    name: 'args',
    // label: '动作参数',
    multiple: multiple,
    strictMode: false
  }, patch), {
    items: Array.isArray(items) ? items : [items]
  });
};
// 数据容器范围
var DATA_CONTAINER = ['form', 'dialog', 'drawer', 'wizard', 'service', 'crud', 'page', 'app', 'chart'];
var MSG_TYPES = {
  info: i18n("02d9819ddaaaeb1b7b22b12608c7e5ca"),
  warning: i18n("900c70fa5f7dbc014e6f762d5e0e885c"),
  success: i18n("330363dfc524cff2488f2ebde0500896"),
  error: i18n("7030ff64701a938becbc5aa67ddb86e8")
};
// 下拉展示可赋值属性范围
var SELECT_PROPS_CONTAINER = ['form'];
// 是否数据容器
"".concat(JSON.stringify(DATA_CONTAINER), ".includes(data.__rendererName)");
// 是否下拉展示可赋值属性
var SHOW_SELECT_PROP = "".concat(JSON.stringify(SELECT_PROPS_CONTAINER), ".includes(data.__rendererName)");
// 表单项组件
var FORMITEM_CMPTS = ['button-group-select', 'button-toolbar', 'chained-select', 'chart-radios', 'checkbox', 'checkboxes', 'combo', 'input-kv', 'condition-builder', 'diff-editor', 'editor', 'formula', 'hidden', 'icon-picker', 'input-array', 'input-city', 'input-color', 'input-date', 'input-date-range', 'input-datetime-range', 'input-time-range', 'input-excel', 'input-file', 'input-formula', 'input-group', 'input-image', 'input-month-range', 'input-number', 'input-quarter-range', 'input-range', 'input-rating', 'input-repeat', 'input-rich-text', 'input-sub-form', 'input-table', 'input-tag', 'input-text', 'input-password', 'input-email', 'input-url', 'native-date', 'native-time', 'native-number', 'input-tree', 'input-year-range', 'list-select', 'location-picker', 'matrix-checkboxes', 'nested-select', 'cascader-select', 'picker', 'radios', 'select', 'multi-select', 'switch', 'tabs-transfer', 'tabs-transfer-picker', 'textarea', 'transfer', 'transfer-picker', 'tree-select', 'uuid'];
var SUPPORT_STATIC_FORMITEM_CMPTS = without.apply(void 0, __spreadArray([FORMITEM_CMPTS], ['button-toolbar', 'condition-builder', 'diff-editor', 'editor', 'formula', 'hidden', 'icon-picker', 'input-excel', 'input-file', 'input-formula', 'input-image', 'input-repeat', 'input-rich-text', 'input-sub-form', 'input-table', 'picker', 'uuid'], false));
var SUPPORT_DISABLED_CMPTS = ['button-group', 'action', 'button', 'submit', 'reset', 'collapse', 'container', 'dropdown-button', 'flex', 'flex-item', 'grid', 'grid-2d', 'link', 'nav', 'wizard'
// 'card2'
];
// 用于变量赋值 页面变量和内存变量的树选择器中，支持展示变量类型
var getCustomNodeTreeSelectSchema = function (opts) {
  return __assign({
    type: 'tree-select',
    name: 'path',
    label: i18n("c6f30c2f084ddeacb7944235348bdaa4"),
    multiple: false,
    mode: 'horizontal',
    required: true,
    placeholder: i18n("844a7a7aacc5be82d0fd6225edc6bf63"),
    showIcon: false,
    size: 'lg',
    hideRoot: false,
    rootLabel: i18n("c6f30c2f084ddeacb7944235348bdaa4"),
    options: [],
    menuTpl: {
      type: 'flex',
      className: 'p-1',
      items: [{
        type: 'container',
        body: [{
          type: 'tpl',
          tpl: '${label}',
          inline: true,
          wrapperComponent: ''
        }],
        style: {
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          position: 'static',
          overflowY: 'auto',
          flex: '0 0 auto'
        },
        wrapperBody: false,
        isFixedHeight: true
      }, {
        type: 'container',
        body: [{
          type: 'tpl',
          tpl: '${type}',
          inline: true,
          wrapperComponent: '',
          style: {
            background: '#f5f5f5',
            paddingLeft: '8px',
            paddingRight: '8px',
            borderRadius: '4px'
          }
        }],
        size: 'xs',
        style: {
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          position: 'static',
          overflowY: 'auto',
          flex: '0 0 auto'
        },
        wrapperBody: false,
        isFixedHeight: true,
        isFixedWidth: false
      }],
      style: {
        position: 'relative',
        inset: 'auto',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '24px',
        overflowY: 'hidden'
      },
      isFixedHeight: true,
      isFixedWidth: false
    }
  }, opts);
};
var ACTION_TYPE_TREE = function (manager) {
  var variableManager = manager === null || manager === void 0 ? void 0 : manager.variableManager;
  /** 变量列表 */
  var variableOptions = (variableManager === null || variableManager === void 0 ? void 0 : variableManager.getVariableOptions()) || [];
  var pageVariableOptions = (variableManager === null || variableManager === void 0 ? void 0 : variableManager.getPageVariablesOptions()) || [];
  return [{
    actionLabel: i18n("59ceff465ad16932d8972191ad815dfb"),
    actionType: 'page',
    children: [{
      actionLabel: i18n("dec2eb7145e149f281cb7e75fbe8972a"),
      actionType: 'url',
      description: i18n("ae10a948eca808b3dd77506b24f3fd0e"),
      innerArgs: ['url', 'params', 'blank'],
      descDetail: function (info) {
        var _a;
        return React__default.createElement("div", null, i18n("c7a34a3465d1beea2f85d53edcff8235"), React__default.createElement("span", {
          className: "variable-left"
        }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.url) || '-'));
      },
      schema: getArgsWrapper([{
        type: 'wrapper',
        className: 'p-none',
        body: [getSchemaTpl('textareaFormulaControl', {
          name: 'url',
          label: i18n("8f1c078c6d42759e6ccb1a9bf35f1629"),
          variables: '${variables}',
          mode: 'horizontal',
          // placeholder: 'http://', 长文本暂不支持
          size: 'lg',
          required: true,
          visibleOn: 'data.actionType === "url"'
        }), {
          type: 'combo',
          name: 'params',
          label: i18n("0b72392143e4038e98128cb0f6f679b3"),
          multiple: true,
          mode: 'horizontal',
          size: 'lg',
          items: [{
            name: 'key',
            placeholder: i18n("c068b579db3bf0a553bd0af4f81cc14f"),
            type: 'input-text'
          }, getSchemaTpl('formulaControl', {
            variables: '${variables}',
            name: 'val',
            placeholder: i18n("bfed4943c5f487de1b63a82f7230cce2")
          })]
        }, {
          type: 'switch',
          name: 'blank',
          label: i18n("56aa76ab3c987377e855ae2c6c612050"),
          onText: i18n("0a60ac8f02ccd2cf723f927284877851"),
          offText: i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
          mode: 'horizontal',
          pipeIn: defaultValue(true)
        }]
      }])
    }, {
      actionLabel: i18n("fd5fb471ecce1eea63a6a95b6707f815"),
      actionType: 'link',
      description: i18n("67e21dd387607ae3fb59846504fa2c4c"),
      innerArgs: ['link', 'params', 'pageName', '__pageInputSchema'],
      descDetail: function (info) {
        var _a;
        return React__default.createElement("div", null, i18n("d7098f5050f017673319c5db1473ada7"), React__default.createElement("span", {
          className: "variable-left variable-right"
        }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.pageName) || '-'), i18n("59ceff465ad16932d8972191ad815dfb"));
      },
      schema: getArgsWrapper([{
        type: 'wrapper',
        className: 'p-none',
        body: [getSchemaTpl('app-page'), getSchemaTpl('app-page-args')]
      }])
    }, {
      actionLabel: i18n("39e107b7c4aa580f913ccbebc00f7534"),
      actionType: 'refresh',
      description: i18n("261242fe62b18b620419802c7dd7da7f")
    }, {
      actionLabel: i18n("ca180138a862543561d3a2c4f08b2e1b"),
      actionType: 'goBack',
      description: i18n("5f6b9e7a050ae3f34b38191435e14b24"),
      descDetail: function (info) {
        return React__default.createElement("div", null, i18n("27e0ca877865238aad6940481b2984d4"));
      }
    }]
  }, {
    actionLabel: i18n("0db9e779f5cd9ad8bd3d16d7e8a16b64"),
    actionType: 'dialogs',
    children: [{
      actionLabel: i18n("0561589c26e732981f29709a9b574234"),
      actionType: 'openDialog',
      description: i18n("4a502e748d1335385c2c05bf30e582e7"),
      actions: [{
        actionType: 'dialog'
      }, {
        actionType: 'drawer'
      }, {
        actionType: 'confirmDialog'
      }],
      schema: [{
        type: 'radios',
        label: i18n("c1b3a483bf057f5afa118f96644dc8a3"),
        name: '__dialogSource',
        required: true,
        mode: 'horizontal',
        inputClassName: 'event-action-radio',
        value: 'new',
        options: [{
          label: i18n("0c5cbc9d345936876230a0b09aece2ff"),
          value: 'current'
        }, {
          label: i18n("a781b5903a4013c147783e1047f42e08"),
          value: 'new'
        }]
      }, {
        name: '__dialogTitle',
        type: 'input-text',
        label: i18n("53bed22bc03c0fd61fe4fb81101f712a"),
        placeholder: i18n("953131d14e66fae5e3611f8b419b7ed5"),
        mode: 'horizontal',
        size: 'lg',
        visibleOn: '__dialogSource === "new"'
      }, {
        name: '__selectDialog',
        type: 'select',
        label: i18n("7cc53692d650e049802d808b81efe7f5"),
        source: '${__dialogActions}',
        mode: 'horizontal',
        size: 'lg',
        visibleOn: '__dialogSource === "current"',
        onChange: function (value, oldValue, model, form) {
          form.setValueByName('args', {
            fromCurrentDialog: true
          });
        }
      }, {
        type: 'radios',
        label: i18n("939402f3ff754d8d815eb7f6cc991bea"),
        name: 'groupType',
        mode: 'horizontal',
        value: 'dialog',
        required: true,
        pipeIn: defaultValue('dialog'),
        inputClassName: 'event-action-radio',
        options: [{
          label: i18n("6cff4b6d794cc17f5d24dbe0d21e5732"),
          value: 'dialog'
        }, {
          label: i18n("2a2924380dfcaea998bd8a49703545a9"),
          value: 'drawer'
        }, {
          label: i18n("fa6b01f51cc2b8e16bfbb914b6c08ace"),
          value: 'confirmDialog'
        }],
        visibleOn: 'data.actionType === "openDialog" && __dialogSource === "new"'
      }]
    }, {
      actionLabel: i18n("3b02248ca3790e356e47b6900c0e3931"),
      actionType: 'closeDialog',
      description: i18n("f33c2c6ff58bcec40d3e74e591bb3df2") // 或者关闭指定弹窗
      // schema: getArgsWrapper({
      //   type: 'wrapper',
      //   className: 'p-none',
      //   body: [
      //     {
      //       type: 'radios',
      //       label: '类型',
      //       name: 'groupType',
      //       mode: 'horizontal',
      //       value: 'closeDialog',
      //       required: true,
      //       pipeIn: defaultValue('closeDialog'),
      //       options: [
      //         {
      //           label: '弹窗',
      //           value: 'closeDialog'
      //         },
      //         {
      //           label: '抽屉',
      //           value: 'closeDrawer'
      //         }
      //       ],
      //       visibleOn: 'data.actionType === "closeDialog"'
      //     }
      //   ]
      // })
    },
    // 暂时下掉，看后面具体设计
    // {
    //   actionLabel: '打开提示对话框',
    //   actionType: 'alert',
    //   description: '弹个提示对话框'
    // },
    // {
    //   actionLabel: '打开确认对话框',
    //   actionType: 'confirm',
    //   description: '弹个确认对话框'
    // },
    {
      actionLabel: i18n("e495f416b83e4c7ff3c66ec3be96a76f"),
      actionType: 'toast',
      description: i18n("61d7aaa88181c527cfb936d4c686d267"),
      innerArgs: ['title', 'msgType', 'msg', 'position', 'timeout', 'closeButton', 'showIcon', 'className'],
      descDetail: function (info) {
        var _a, _b;
        return React__default.createElement("div", null, MSG_TYPES[(_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.msgType] || '', i18n("4e5242a645864528e10f04dc2326a5c4"), React__default.createElement("span", {
          className: "variable-left"
        }, ((_b = info === null || info === void 0 ? void 0 : info.args) === null || _b === void 0 ? void 0 : _b.msg) || '-'));
      },
      schema: getArgsWrapper({
        type: 'wrapper',
        className: 'p-none',
        body: [{
          type: 'button-group-select',
          name: 'msgType',
          label: i18n("6d00710a2528332bfcac14b58e412042"),
          value: 'info',
          required: true,
          mode: 'horizontal',
          options: Object.keys(MSG_TYPES).map(function (key) {
            return {
              label: MSG_TYPES[key],
              value: key,
              level: 'default'
            };
          })
        }, getSchemaTpl('textareaFormulaControl', {
          name: 'msg',
          label: i18n("b87b77561e776367e6756e11ea652217"),
          mode: 'horizontal',
          variables: '${variables}',
          size: 'lg',
          required: true
        }), getSchemaTpl('textareaFormulaControl', {
          name: 'title',
          label: i18n("43ab9af06e1e0f0b2a8767b46cf8b1cf"),
          variables: '${variables}',
          mode: 'horizontal',
          size: 'lg'
        }), getSchemaTpl('formulaControl', {
          name: 'timeout',
          label: i18n("f41a94bb85c5223181c4cdf83ea9021b"),
          rendererSchema: {
            type: 'input-number'
          },
          valueType: 'number',
          variables: '${variables}',
          size: 'lg',
          mode: 'horizontal'
        }), {
          type: 'button-group-select',
          name: 'position',
          value: 'top-right',
          mode: 'horizontal',
          label: i18n("a0a837f2873de80bc9ec353c30e73171"),
          options: [{
            label: i18n("f3296f64a8a1330d7a07f1d269a1db92"),
            value: 'top-left'
          }, {
            label: i18n("b97a5adf068bee6c852db9dcea3a9799"),
            value: 'top-center'
          }, {
            label: i18n("eafeba264b6338939f11f1b1adf40d2b"),
            value: 'top-right'
          }, {
            label: i18n("d429ffb093e9aa3bf80da125f1be318c"),
            value: 'bottom-left'
          }, {
            label: i18n("c241aa8f427118a719b94cbd8f2bb22d"),
            value: 'bottom-center'
          }, {
            label: i18n("9cd707caffdfb314d939298f2f2c267c"),
            value: 'bottom-right'
          }]
        }, {
          type: 'switch',
          name: 'closeButton',
          value: true,
          label: i18n("8c8fbec263e20f087555c9abcb6dd07a"),
          mode: 'horizontal'
        }, {
          type: 'switch',
          name: 'showIcon',
          value: true,
          label: i18n("3f3a016027e540ef10a16dbd49fffde9"),
          mode: 'horizontal'
        }]
      })
    }]
  }, {
    actionLabel: i18n("47d68cd0f4c3e91a86d23afe8afccfb8"),
    actionType: 'service',
    children: [{
      actionLabel: i18n("4f02d2efe05a20232ab9da63c090595c"),
      actionType: 'ajax',
      description: i18n("0cd902f953656adb29985b68e6fc9754"),
      // innerArgs: ['api', 'options'],
      descDetail: function (info) {
        var _a, _b;
        var apiInfo = (_a = info === null || info === void 0 ? void 0 : info.api) !== null && _a !== void 0 ? _a : (_b = info === null || info === void 0 ? void 0 : info.args) === null || _b === void 0 ? void 0 : _b.api;
        if (typeof apiInfo === 'string') {
          apiInfo = normalizeApi(apiInfo);
        }
        return React__default.createElement("div", null, i18n("1535fcfa4cb8e4d467127154977e9788"), React__default.createElement("span", {
          className: "variable-right variable-left"
        }, (apiInfo === null || apiInfo === void 0 ? void 0 : apiInfo.method) || '-'), i18n("c14a21300b61bb83b4420a1586497951"), React__default.createElement("span", {
          className: "variable-left"
        }, (apiInfo === null || apiInfo === void 0 ? void 0 : apiInfo.url) || '-'));
      },
      schema: {
        type: 'wrapper',
        className: 'p-none',
        body: [
        // getArgsWrapper(
        //   [
        //     getSchemaTpl('apiControl', {
        //       name: 'api',
        //       label: '配置请求',
        //       mode: 'horizontal',
        //       size: 'lg',
        //       inputClassName: 'm-b-none',
        //       renderLabel: true,
        //       required: true
        //     }),
        //     {
        //       name: 'options',
        //       type: 'combo',
        //       label: tipedLabel(
        //         '静默请求',
        //         '开启后，服务请求将以静默模式发送，即不会弹出成功或报错提示。'
        //       ),
        //       mode: 'horizontal',
        //       items: [
        //         {
        //           type: 'switch',
        //           name: 'silent',
        //           label: false,
        //           onText: '开启',
        //           offText: '关闭',
        //           mode: 'horizontal',
        //           pipeIn: defaultValue(false)
        //         }
        //       ]
        //     }
        //   ],
        //   false,
        //   {
        //     className: 'action-apiControl'
        //   }
        // ),
        getSchemaTpl('apiControl', {
          name: 'api',
          label: i18n("88bdaf32c27ab169d3d686b86b3fae99"),
          mode: 'horizontal',
          size: 'lg',
          inputClassName: 'm-b-none',
          renderLabel: true,
          required: true
        }), {
          name: 'options',
          type: 'combo',
          label: tipedLabel(i18n("6e6d4269d0dc3324d551062350a2ae9f"), i18n("56e13c39822a814ab39b0d5a0867d7dc")),
          mode: 'horizontal',
          items: [{
            type: 'switch',
            name: 'silent',
            label: false,
            onText: i18n("cc42dd3170fdf36bdc2b0f58ab23eb84"),
            offText: i18n("b15d91274e9fc68608c609999e0413fa"),
            mode: 'horizontal',
            pipeIn: defaultValue(false)
          }]
        }, {
          name: 'outputVar',
          type: 'input-text',
          label: i18n("139c619a4dbfc26fb61d76dc388e3e7d"),
          placeholder: i18n("4dca05af026848011eedee1b53efa61c"),
          description: i18n("4da82260041107e5780bcbb3a14ef791"),
          mode: 'horizontal',
          size: 'lg',
          value: 'responseResult',
          required: true
        }]
      },
      outputVarDataSchema: [{
        type: 'object',
        title: 'responseResult',
        properties: {
          responseData: {
            type: 'object',
            title: i18n("aa6070a7f454f554fc1c7d8b1d2d935f")
          },
          responseStatus: {
            type: 'number',
            title: i18n("3f9e257178738d5d180ddc2996809c10")
          },
          responseMsg: {
            type: 'string',
            title: i18n("99c74120cc62f4bf31d661e3212b7121")
          }
        }
      }]
    }, {
      actionLabel: i18n("5dfd5a78e2ba1bc8afb482a8745454ea"),
      actionType: 'download',
      description: i18n("89049706952412d790b801def284629e"),
      // innerArgs: ['api'],
      schema: {
        type: 'wrapper',
        style: {
          padding: '0'
        },
        body: [
        // getArgsWrapper(
        //   getSchemaTpl('apiControl', {
        //     name: 'api',
        //     label: '配置请求',
        //     mode: 'horizontal',
        //     inputClassName: 'm-b-none',
        //     size: 'lg',
        //     renderLabel: true,
        //     required: true
        //   }),
        //   false,
        //   {
        //     className: 'action-apiControl'
        //   }
        // )
        getSchemaTpl('apiControl', {
          name: 'api',
          label: i18n("88bdaf32c27ab169d3d686b86b3fae99"),
          mode: 'horizontal',
          inputClassName: 'm-b-none',
          size: 'lg',
          renderLabel: true,
          required: true
        })]
      }
    }]
  }, {
    actionLabel: i18n("bb79667f37035e9562ec6bcffd6cf8ef"),
    actionType: 'cmpt',
    children: [{
      actionLabel: i18n("c852fb60f1b8ce921c3def1eba000bc5"),
      actionType: 'visibility',
      description: i18n("1bd4cfded5e11a7a8ea4dcfd2fa17e15"),
      actions: [{
        actionType: 'show',
        descDetail: function (info) {
          return React__default.createElement("div", null, i18n("4d775d4cd79e2ed6a2fc66fd1e7139c8"), React__default.createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("bb79667f37035e9562ec6bcffd6cf8ef"));
        }
      }, {
        actionType: 'hidden',
        descDetail: function (info) {
          return React__default.createElement("div", null, i18n("dce5379cb978a8259ecfca8f08f00817"), React__default.createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("bb79667f37035e9562ec6bcffd6cf8ef"));
        }
      }, {
        actionType: 'visibility',
        descDetail: function (info) {
          return React__default.createElement("div", null, i18n("bb79667f37035e9562ec6bcffd6cf8ef"), React__default.createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("7f019b96ffb7d72ec8d6ce8d76e5362f"));
        }
      }],
      supportComponents: '*',
      schema: __spreadArray(__spreadArray([], __read(renderCmptSelect(i18n("6afde638796d237377b0755506d08ded"), true)), false), [renderCmptIdInput(), {
        type: 'radios',
        label: i18n("69fbb2e5fc9eb3ba06096cbedbf5a622"),
        name: 'groupType',
        mode: 'horizontal',
        value: 'static',
        required: true,
        inputClassName: 'event-action-radio',
        options: [{
          label: i18n("8baf21fa26d6d24b4faa872953275d8d"),
          value: 'static'
        }, {
          label: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
          value: 'visibility'
        }]
      }, {
        type: 'radios',
        label: i18n("edf25860e3d457eb8ca9cb5dca06dfd7"),
        name: '__statusType',
        mode: 'horizontal',
        value: 'show',
        required: true,
        pipeIn: defaultValue('show'),
        inputClassName: 'event-action-radio',
        visibleOn: "this.groupType === 'static'",
        options: [{
          label: i18n("4d775d4cd79e2ed6a2fc66fd1e7139c8"),
          value: 'show'
        }, {
          label: i18n("dce5379cb978a8259ecfca8f08f00817"),
          value: 'hidden'
        }]
      }, getSchemaTpl('expressionFormulaControl', {
        mode: 'horizontal',
        label: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
        required: true,
        size: 'lg',
        variables: '${variables}',
        evalMode: true,
        name: '__actionExpression',
        visibleOn: "this.groupType === 'visibility'"
      })], false)
    }, {
      actionLabel: i18n("12c8d50c55eeec7059ddd5c303e34f77"),
      actionType: 'usability',
      description: i18n("5e75800641ec5c1198092bcf9d34f180"),
      actions: [{
        actionType: 'enabled',
        descDetail: function (info) {
          return React__default.createElement("div", null, i18n("7854b52a889b3ef0590d9f542efeb4c8"), React__default.createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("bb79667f37035e9562ec6bcffd6cf8ef"));
        }
      }, {
        actionType: 'disabled',
        descDetail: function (info) {
          return React__default.createElement("div", null, i18n("710ad08b11419332713360d2750cd707"), React__default.createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("bb79667f37035e9562ec6bcffd6cf8ef"));
        }
      }, {
        actionType: 'usability',
        descDetail: function (info) {
          return React__default.createElement("div", null, i18n("bb79667f37035e9562ec6bcffd6cf8ef"), React__default.createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("7f019b96ffb7d72ec8d6ce8d76e5362f"));
        }
      }],
      supportComponents: __spreadArray(__spreadArray(['form'], __read(FORMITEM_CMPTS), false), __read(SUPPORT_DISABLED_CMPTS), false),
      schema: __spreadArray(__spreadArray([], __read(renderCmptSelect(i18n("6afde638796d237377b0755506d08ded"), true)), false), [renderCmptIdInput(), {
        type: 'radios',
        label: i18n("69fbb2e5fc9eb3ba06096cbedbf5a622"),
        name: 'groupType',
        mode: 'horizontal',
        inputClassName: 'event-action-radio',
        value: 'static',
        required: true,
        options: [{
          label: i18n("8baf21fa26d6d24b4faa872953275d8d"),
          value: 'static'
        }, {
          label: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
          value: 'usability'
        }]
      }, {
        type: 'radios',
        label: i18n("d86d5919f595226b7a1e8264635ca23d"),
        name: '__statusType',
        mode: 'horizontal',
        inputClassName: 'event-action-radio',
        value: 'enabled',
        required: true,
        pipeIn: defaultValue('enabled'),
        visibleOn: "this.groupType === 'static'",
        options: [{
          label: i18n("7854b52a889b3ef0590d9f542efeb4c8"),
          value: 'enabled'
        }, {
          label: i18n("710ad08b11419332713360d2750cd707"),
          value: 'disabled'
        }]
      }, getSchemaTpl('expressionFormulaControl', {
        mode: 'horizontal',
        label: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
        required: true,
        size: 'lg',
        evalMode: true,
        name: '__actionExpression',
        visibleOn: "this.groupType === 'usability'"
      })], false)
    }, {
      actionLabel: i18n("e052287273ad39a1d3fa9fa3decb5fd9"),
      actionType: 'staticStatus',
      description: i18n("506f28f48dbebd5d19e19dfc721e13be"),
      actions: [{
        actionType: 'static',
        descDetail: function (info) {
          return React__default.createElement("div", null, React__default.createElement("span", {
            className: "variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId), i18n("0e35b091e18032508758899735664df7"));
        }
      }, {
        actionType: 'nonstatic',
        descDetail: function (info) {
          return React__default.createElement("div", null, React__default.createElement("span", {
            className: "variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId), i18n("34d361256526b04909e064c29d9a9b76"));
        }
      }],
      supportComponents: __spreadArray(['form'], __read(SUPPORT_STATIC_FORMITEM_CMPTS), false),
      schema: __spreadArray(__spreadArray([], __read(renderCmptSelect(i18n("d80bc0fcbfb250480320b683e48b1467"), true)), false), [renderCmptIdInput(), {
        type: 'radios',
        label: i18n("d2e930293da37452638759e17d771adf"),
        name: 'groupType',
        mode: 'horizontal',
        inputClassName: 'event-action-radio',
        value: 'nonstatic',
        required: true,
        pipeIn: defaultValue('nonstatic'),
        options: [{
          label: i18n("b535bea11c97ec5588b1494799de4d60"),
          value: 'nonstatic'
        }, {
          label: i18n("f7784642f42d33f506ba05f3daefc3c4"),
          value: 'static'
        }]
      }], false)
    }, {
      actionLabel: i18n("0eb4e63db88e158600dab0e723e8a213"),
      actionType: 'reload',
      description: i18n("f16654604d6cb2f62469e5aa9db19871"),
      descDetail: function (info) {
        return React__default.createElement("div", null, i18n("694fc5efa9e1d1c2c5eb6525e1c7fb29"), React__default.createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("bb79667f37035e9562ec6bcffd6cf8ef"));
      },
      supportComponents: 'byComponent',
      schema: [{
        type: 'wrapper',
        size: 'sm',
        visibleOn: 'data.componentId === "customCmptId"',
        body: __spreadArray([], __read(renderCmptSelect(i18n("6afde638796d237377b0755506d08ded"), true, function (value, oldVal, data, form) {
          form.setValueByName('args.resetPage', true);
          form.setValueByName('__addParam', false);
          form.setValueByName('__containerType', 'all');
          form.setValueByName('__reloadParam', []);
        }, true)), false)
      }, {
        type: 'wrapper',
        size: 'sm',
        visibleOn: 'data.componentId !== "customCmptId"',
        body: __spreadArray([], __read(renderCmptSelect(i18n("6afde638796d237377b0755506d08ded"), true, function (value, oldVal, data, form) {
          form.setValueByName('args.resetPage', true);
          form.setValueByName('__addParam', false);
          form.setValueByName('__containerType', 'all');
          form.setValueByName('__reloadParam', []);
        })), false)
      }, renderCmptIdInput(function (value, oldVal, data, form) {
        // 找到组件并设置相关的属性
        var schema = JSONGetById(manager.store.schema, value, 'id');
        if (schema) {
          var __isScopeContainer = !!manager.dataSchema.getScope("".concat(schema.$$id, "-").concat(schema.type));
          var __rendererName = schema.type;
          form.setValues({
            __isScopeContainer: __isScopeContainer,
            __rendererName: __rendererName
          });
        } else {
          form.setValues({
            __isScopeContainer: false,
            __rendererName: ''
          });
        }
      }), {
        type: 'switch',
        name: '__resetPage',
        label: tipedLabel(i18n("697af73997072e0ce9ee65b15a7b3715"), i18n("d7bf42dd6e66f2818f9a232603c4a53b")),
        onText: i18n("0a60ac8f02ccd2cf723f927284877851"),
        offText: i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
        mode: 'horizontal',
        pipeIn: defaultValue(true),
        visibleOn: "data.actionType === \"reload\" && data.__rendererName === \"crud\""
      }, {
        type: 'switch',
        name: '__addParam',
        label: tipedLabel(i18n("8f0064a9cfd7dcbb3c729f1357f11772"), i18n("a0c117d927c6290bab55ae0e848a4d4b")),
        onText: i18n("0a60ac8f02ccd2cf723f927284877851"),
        offText: i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
        mode: 'horizontal',
        pipeIn: defaultValue(false),
        visibleOn: "data.actionType === \"reload\" &&  data.__isScopeContainer",
        onChange: function (value, oldVal, data, form) {
          form.setValueByName('__containerType', 'all');
        }
      }, {
        type: 'radios',
        name: '__containerType',
        mode: 'horizontal',
        label: '',
        pipeIn: defaultValue('all'),
        visibleOn: "data.__addParam && data.actionType === \"reload\" && data.__isScopeContainer",
        options: [{
          label: i18n("77b1081c177fa3334cc93c99f0ecee75"),
          value: 'all'
        }, {
          label: i18n("f5c5e3d69daee06ea1606378ef466765"),
          value: 'appoint'
        }],
        onChange: function (value, oldVal, data, form) {
          form.setValueByName('__reloadParams', []);
          form.setValueByName('__valueInput', undefined);
        }
      }, getSchemaTpl('formulaControl', {
        name: '__valueInput',
        label: '',
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal',
        required: true,
        visibleOn: "data.__addParam && data.__containerType === \"all\" && data.actionType === \"reload\" && data.__isScopeContainer"
      }), {
        type: 'combo',
        name: '__reloadParams',
        label: '',
        multiple: true,
        removable: true,
        addable: true,
        strictMode: false,
        canAccessSuperData: true,
        size: 'lg',
        mode: 'horizontal',
        items: [{
          name: 'key',
          type: 'input-text',
          placeholder: i18n("c068b579db3bf0a553bd0af4f81cc14f"),
          labelField: 'label',
          valueField: 'value',
          required: true
        }, getSchemaTpl('formulaControl', {
          name: 'val',
          variables: '${variables}',
          placeholder: i18n("bfed4943c5f487de1b63a82f7230cce2")
        })],
        visibleOn: "data.__addParam && data.__containerType === \"appoint\" && data.actionType === \"reload\" && data.__isScopeContainer"
      }, {
        type: 'radios',
        name: 'dataMergeMode',
        mode: 'horizontal',
        label: tipedLabel(i18n("eb6cd21b9ed45ded3ecdb12f62b590e1"), i18n("b67b01a3b9170f1daf78082cfd0df793")),
        pipeIn: defaultValue('merge'),
        visibleOn: "data.__addParam && data.actionType === \"reload\" && data.__isScopeContainer",
        options: [{
          label: i18n("bd81577a6fd4956e676cec499bb70d00"),
          value: 'merge'
        }, {
          label: i18n("e09fea40f7e4abd4b2a495b315940688"),
          value: 'override'
        }]
      }]
    }, {
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      actionType: 'setValue',
      description: i18n("2464e9d13bfc84169eb8333b6996203c"),
      innerArgs: ['path', 'value', 'index', 'fromPage', 'fromApp', '__valueInput', '__comboType', '__containerType'],
      descDetail: function (info) {
        var _a;
        return React__default.createElement("div", null, typeof ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.path) === 'string' && !(info === null || info === void 0 ? void 0 : info.componentId) ? React__default.createElement(React__default.Fragment, null, i18n("c85c8d61a67014c4b5d44f25e49e87fc"), React__default.createElement("span", {
          className: "variable-left variable-right"
        }, variableManager.getNameByPath(info.args.path)), i18n("df24d894cd3331f53964bc75f5c192e2")) : React__default.createElement(React__default.Fragment, null, i18n("9e1bafbb00018beacc8f579c8ddfaa36"), React__default.createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("df24d894cd3331f53964bc75f5c192e2")));
      },
      supportComponents: 'byComponent',
      schema: [{
        name: '__actionSubType',
        type: 'radios',
        label: i18n("6c6e12c54723170f214527bedaf81f7d"),
        mode: 'horizontal',
        options: [{
          label: i18n("1b7e6b2dbf3b7f4b1baf2c42e49a995d"),
          value: 'cmpt'
        }, {
          label: i18n("cc6aeb073ebc3cb29734a49164f8964c"),
          value: 'page'
        }, {
          label: i18n("c6f30c2f084ddeacb7944235348bdaa4"),
          value: 'app'
        }],
        value: '${args.fromApp ? "app" : args.fromPage ? "page" : "cmpt"}',
        onChange: function (value, oldVal, data, form) {
          form.setValueByName('__valueInput', undefined);
          form.setValueByName('args.value', undefined);
          form.deleteValueByName('args.path');
          form.deleteValueByName('args.fromApp');
          form.deleteValueByName('args.fromPage');
          if (value === 'page') {
            form.setValueByName('args.fromPage', true);
          } else if (value === 'app') {
            form.setValueByName('args.fromApp', true);
          }
        }
      },
      // 组件变量
      {
        type: 'container',
        visibleOn: '__actionSubType === "cmpt"',
        body: [{
          type: 'wrapper',
          size: 'sm',
          visibleOn: 'data.componentId === "customCmptId"',
          body: __spreadArray([], __read(renderCmptActionSelect(i18n("6afde638796d237377b0755506d08ded"), true, function (value, oldVal, data, form) {
            form.setValueByName('args.__containerType', 'all');
            form.setValueByName('args.__comboType', 'all');
          }, true)), false)
        }, {
          type: 'wrapper',
          visibleOn: 'data.componentId !== "customCmptId"',
          size: 'sm',
          body: __spreadArray([], __read(renderCmptActionSelect(i18n("6afde638796d237377b0755506d08ded"), true, function (value, oldVal, data, form) {
            form.setValueByName('args.__containerType', 'all');
            form.setValueByName('args.__comboType', 'all');
          })), false)
        }, renderCmptIdInput(function (value, oldVal, data, form) {
          // 找到组件并设置相关的属性
          var schema = JSONGetById(manager.store.schema, value, 'id');
          if (schema) {
            var __isScopeContainer = !!manager.dataSchema.getScope("".concat(schema.$$id, "-").concat(schema.type));
            var __rendererName = schema.type;
            form.setValues({
              __isScopeContainer: __isScopeContainer,
              __rendererName: __rendererName
            });
          } else {
            form.setValues({
              __isScopeContainer: false,
              __rendererName: ''
            });
          }
        }), getArgsWrapper({
          type: 'wrapper',
          className: 'p-none',
          body: [{
            type: 'radios',
            name: '__containerType',
            mode: 'horizontal',
            label: i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            pipeIn: defaultValue('all'),
            visibleOn: 'data.__isScopeContainer',
            options: [{
              label: i18n("77b1081c177fa3334cc93c99f0ecee75"),
              value: 'all'
            }, {
              label: i18n("f5c5e3d69daee06ea1606378ef466765"),
              value: 'appoint'
            }],
            onChange: function (value, oldVal, data, form) {
              form.setValueByName('value', []);
              form.setValueByName('__valueInput', undefined);
            }
          }, {
            type: 'radios',
            name: '__comboType',
            inputClassName: 'event-action-radio',
            mode: 'horizontal',
            label: i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            pipeIn: defaultValue('all'),
            visibleOn: "data.__rendererName === 'combo' || data.__rendererName === 'input-table'",
            options: [{
              label: i18n("c60ad696dee4e1eeff6f0f2c2e9b9fc0"),
              value: 'all'
            }, {
              label: i18n("139294edcce271bf483dda437c421c29"),
              value: 'appoint'
            }],
            onChange: function (value, oldVal, data, form) {
              form.setValueByName('index', undefined);
              form.setValueByName('value', []);
              form.setValueByName('__valueInput', undefined);
            }
          }, {
            type: 'input-number',
            required: true,
            name: 'index',
            mode: 'horizontal',
            label: i18n("a7b0b80a7bea1e5e973967c179866ef0"),
            size: 'lg',
            placeholder: i18n("e887792fbbd65d21e43e832a5cd63aac"),
            visibleOn: "(data.__rendererName === 'input-table' || data.__rendererName === 'combo')\n                      && data.__comboType === 'appoint'"
          }, {
            type: 'combo',
            name: 'value',
            label: '',
            multiple: true,
            removable: true,
            required: true,
            addable: true,
            strictMode: false,
            canAccessSuperData: true,
            size: 'lg',
            mode: 'horizontal',
            items: [{
              name: 'key',
              type: 'input-text',
              placeholder: i18n("a25657422b40023f2731619587940bc7"),
              source: '${__setValueDs}',
              labelField: 'label',
              valueField: 'value',
              required: true
            }, getSchemaTpl('formulaControl', {
              name: 'val',
              variables: '${variables}',
              placeholder: i18n("a33903526e8fb3d1ac3066da70e7941e")
            })],
            visibleOn: "data.__isScopeContainer && data.__containerType === 'appoint' || data.__comboType === 'appoint'"
          }, {
            type: 'combo',
            name: 'value',
            label: '',
            multiple: true,
            removable: true,
            required: true,
            addable: true,
            strictMode: false,
            canAccessSuperData: true,
            mode: 'horizontal',
            size: 'lg',
            items: [{
              type: 'combo',
              name: 'item',
              label: false,
              renderLabel: false,
              multiple: true,
              removable: true,
              required: true,
              addable: true,
              strictMode: false,
              canAccessSuperData: true,
              className: 'm-l',
              size: 'lg',
              mode: 'horizontal',
              items: [{
                name: 'key',
                type: 'input-text',
                source: '${__setValueDs}',
                labelField: 'label',
                valueField: 'value',
                required: true,
                visibleOn: "data.__rendererName"
              }, getSchemaTpl('formulaControl', {
                name: 'val',
                variables: '${variables}'
              })]
            }],
            visibleOn: "(data.__rendererName === 'combo' || data.__rendererName === 'input-table')\n                      && data.__comboType === 'all'"
          }, getSchemaTpl('formulaControl', {
            name: '__valueInput',
            label: '',
            variables: '${variables}',
            size: 'lg',
            mode: 'horizontal',
            visibleOn: "(data.__isScopeContainer || ".concat(SHOW_SELECT_PROP, ") && data.__containerType === 'all'"),
            required: true
          }), getSchemaTpl('formulaControl', {
            name: '__valueInput',
            label: i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            variables: '${variables}',
            size: 'lg',
            mode: 'horizontal',
            visibleOn: "data.__rendererName && !data.__isScopeContainer && data.__rendererName !== 'combo' && data.__rendererName !== 'input-table'",
            required: true
          })]
        })]
      },
      // 页面变量
      {
        type: 'container',
        visibleOn: '__actionSubType === "page"',
        body: [getArgsWrapper([{
          type: 'wrapper',
          className: 'p-none',
          body: [getCustomNodeTreeSelectSchema({
            label: i18n("cc6aeb073ebc3cb29734a49164f8964c"),
            rootLabel: i18n("cc6aeb073ebc3cb29734a49164f8964c"),
            options: pageVariableOptions
          }), getSchemaTpl('formulaControl', {
            name: 'value',
            label: i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            variables: '${variables}',
            size: 'lg',
            mode: 'horizontal',
            required: true,
            placeholder: i18n("85451d2eb59327a23e8f745161066d4a")
          })]
        }])]
      },
      // 内存变量
      {
        type: 'container',
        visibleOn: '__actionSubType === "app"',
        body: [getArgsWrapper([{
          type: 'wrapper',
          className: 'p-none',
          body: [getCustomNodeTreeSelectSchema({
            options: variableOptions
          }), getSchemaTpl('formulaControl', {
            name: 'value',
            label: i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            variables: '${variables}',
            size: 'lg',
            mode: 'horizontal',
            required: true,
            placeholder: i18n("85451d2eb59327a23e8f745161066d4a")
          })]
        }])]
      }]
    }, {
      actionLabel: i18n("4e34003861eee3de1e0c9c1222249bbb"),
      actionType: 'submit',
      description: i18n("a360c5d4e723ad78a5e52eb1f5f3f2a2"),
      descDetail: function (info) {
        return React__default.createElement("div", null, i18n("939d5345ad4345dbaabe14798f6ac0f1"), React__default.createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("b91ebe714155c83b6d3bc02b675a31e9"));
      },
      supportComponents: 'form',
      schema: __spreadArray(__spreadArray([], __read(renderCmptSelect(i18n("6afde638796d237377b0755506d08ded"), true)), false), [renderCmptIdInput(), {
        name: 'outputVar',
        type: 'input-text',
        label: i18n("ac24ffeb131a7a9d2465b3ba7b14e10c"),
        placeholder: i18n("0e3517fb21e2c4066bd0ab75c51bc6fb"),
        description: i18n("0e2ba6becfa8760853cfa31c9e15a94b"),
        mode: 'horizontal',
        size: 'lg',
        value: 'submitResult',
        required: true
      }], false),
      outputVarDataSchema: [{
        type: 'object',
        title: 'submitResult',
        properties: {
          error: {
            type: 'string',
            title: i18n("4604d5023479171cb6e901dbeccf62c0")
          },
          errors: {
            type: 'object',
            title: i18n("71f6236494bfc8b023804abb0cca1639")
          },
          payload: {
            type: 'object',
            title: i18n("335d6c56c43204f9efcefe36f097d35a")
          },
          responseData: {
            type: 'object',
            title: i18n("4e6bfc5ad98f719f9bc6b2ad3b6440ee")
          }
        }
      }]
    }, {
      actionLabel: i18n("4a3deab45c0a7218b8ae58a33fd24c28"),
      actionType: 'clear',
      description: i18n("82986a4cab1d0efdbc23b3ac5f0fd509"),
      descDetail: function (info) {
        return React__default.createElement("div", null, i18n("288f0c404c4e546aa3683ff5054e85e2"), React__default.createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("b91ebe714155c83b6d3bc02b675a31e9"));
      },
      supportComponents: 'form',
      schema: __spreadArray(__spreadArray([], __read(renderCmptSelect(i18n("6afde638796d237377b0755506d08ded"), true)), false), [renderCmptIdInput()], false)
    }, {
      actionLabel: i18n("1b6f5cc49e71c90a5b85a796285e3135"),
      actionType: 'reset',
      description: i18n("f457845da8c119a8688e333a3554284f"),
      descDetail: function (info) {
        return React__default.createElement("div", null, i18n("4b9c3271dc2f299dc3aeffb369187513"), React__default.createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("b91ebe714155c83b6d3bc02b675a31e9"));
      },
      supportComponents: 'form',
      schema: __spreadArray(__spreadArray([], __read(renderCmptSelect(i18n("6afde638796d237377b0755506d08ded"), true)), false), [renderCmptIdInput()], false)
    }, {
      actionLabel: i18n("17f2bf425eeb7d20d79c595344e9dc94"),
      actionType: 'validate',
      description: i18n("a84a1311bea7370f1749341ffa6f75e1"),
      descDetail: function (info) {
        return React__default.createElement("div", null, i18n("b7579706a363e5f23b1040fecfbcb677"), React__default.createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || info.componentId || '-'), i18n("b91ebe714155c83b6d3bc02b675a31e9"));
      },
      supportComponents: 'form',
      schema: __spreadArray(__spreadArray([], __read(renderCmptSelect(i18n("6afde638796d237377b0755506d08ded"), true)), false), [renderCmptIdInput(), {
        name: 'outputVar',
        type: 'input-text',
        label: i18n("bf0f829689370b36d01ce871324e0bb6"),
        placeholder: i18n("d23157205c994bde20bb2605c193fd27"),
        description: i18n("a422eb12ebbfdd3347c4deb5ec6b4b54"),
        mode: 'horizontal',
        size: 'lg',
        value: 'validateResult',
        required: true
      }], false),
      outputVarDataSchema: [{
        type: 'object',
        title: 'validateResult',
        properties: {
          error: {
            type: 'string',
            title: i18n("4604d5023479171cb6e901dbeccf62c0")
          },
          errors: {
            type: 'object',
            title: i18n("71f6236494bfc8b023804abb0cca1639")
          },
          payload: {
            type: 'object',
            title: i18n("335d6c56c43204f9efcefe36f097d35a")
          }
        }
      }]
    }, {
      actionLabel: i18n("51325230409d4b7c64aaeb3db9904801"),
      actionType: 'component',
      description: i18n("98d130cb9a360df782f6510abacbc022"),
      supportComponents: '*',
      schema: renderCmptActionSelect(i18n("6afde638796d237377b0755506d08ded"))
    }]
  }, {
    actionLabel: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
    actionType: 'others',
    children: [{
      actionLabel: i18n("6a086902a84969a835423002718e86b4"),
      actionType: 'copy',
      description: i18n("557d01c07aa7c4450a414932e6c1ed2a"),
      innerArgs: ['content', 'copyFormat'],
      descDetail: function (info) {
        var _a;
        return React__default.createElement("div", null, i18n("5aa4369ec61715ddef3641992fad0d4d"), React__default.createElement("span", {
          className: "variable-left"
        }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.content) || '-'));
      },
      schema: getArgsWrapper({
        type: 'wrapper',
        className: 'p-none',
        body: [getSchemaTpl('textareaFormulaControl', {
          name: 'content',
          label: i18n("ac04259507be8ba6b891dc9dc208f491"),
          variables: '${variables}',
          mode: 'horizontal',
          size: 'lg',
          visibleOn: 'data.actionType === "copy"',
          required: true
        }), {
          type: 'select',
          name: 'copyFormat',
          mode: 'horizontal',
          value: 'text/plain',
          size: 'lg',
          options: [{
            label: i18n("ffb01e5bcf4c00447f5150d3cba81371"),
            value: 'text/plain'
          }, {
            label: i18n("e2591e971f4c28db7c80a5f546084a1d"),
            value: 'text/html'
          }],
          label: i18n("c28f4d63beabc4833b17aaa10ca550db")
        }]
      })
    }, {
      actionLabel: i18n("c7f16d729f3bca8f6936416884a74fb8"),
      actionType: 'custom',
      description: i18n("1b5a6299ef404c1f7b4292c290b80f55"),
      schema: {
        type: 'js-editor',
        allowFullscreen: true,
        required: true,
        name: 'script',
        label: i18n("c7f16d729f3bca8f6936416884a74fb8"),
        mode: 'horizontal',
        options: {
          automaticLayout: true,
          lineNumbers: 'off',
          glyphMargin: false,
          tabSize: 2,
          fontSize: '12px',
          wordWrap: 'on',
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          selectOnLineNumbers: true,
          scrollBeyondLastLine: false,
          folding: true
        },
        className: 'ae-event-control-action-js-editor',
        value: i18n("fbaa94ca6b6e6e76a07124e80733f109")
      }
    }
    // {
    //   actionLabel: '广播',
    //   actionType: 'broadcast',
    //   description: '发送广播事件',
    //   schema: {
    //     type: 'wrapper',
    //     className: 'p-none',
    //     body: [
    //       {
    //         type: 'input-text',
    //         name: 'eventName',
    //         label: '广播标识',
    //         mode: 'horizontal',
    //         required: true,
    //         description: '广播事件标识派发出去后，其他组件可以进行监听并作出响应'
    //       },
    //       {
    //         type: 'input-text',
    //         label: '广播名称',
    //         name: 'eventLabel',
    //         mode: 'horizontal',
    //         required: true
    //       },
    //       {
    //         type: 'textarea',
    //         label: '描述',
    //         name: 'description',
    //         mode: 'horizontal',
    //         required: true
    //       }
    //     ]
    //   }
    // }
    ]
  }];
};
// 渲染组件选择配置项
var renderCmptSelect = function (componentLabel, required, onChange, hideAutoFill) {
  if (hideAutoFill) {
    return [{
      type: 'tree-select',
      name: 'componentId',
      label: componentLabel || i18n("d80bc0fcbfb250480320b683e48b1467"),
      showIcon: false,
      searchable: true,
      required: required,
      selfDisabledAffectChildren: false,
      size: 'lg',
      source: '${__cmptTreeSource}',
      mode: 'horizontal',
      onChange: function (value, oldVal, data, form) {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            onChange === null || onChange === void 0 ? void 0 : onChange(value, oldVal, data, form);
            return [2 /*return*/];
          });
        });
      }
    }];
  } else {
    return [{
      type: 'tree-select',
      name: 'componentId',
      label: componentLabel || i18n("d80bc0fcbfb250480320b683e48b1467"),
      showIcon: false,
      searchable: true,
      required: required,
      selfDisabledAffectChildren: false,
      size: 'lg',
      source: '${__cmptTreeSource}',
      mode: 'horizontal',
      autoFill: {
        __rendererLabel: '${label}',
        __rendererName: '${type}',
        __nodeId: '${id}',
        __nodeSchema: '${schema}',
        __isScopeContainer: '${isScopeContainer}'
      },
      onChange: function (value, oldVal, data, form) {
        return __awaiter(void 0, void 0, void 0, function () {
          return __generator(this, function (_a) {
            onChange === null || onChange === void 0 ? void 0 : onChange(value, oldVal, data, form);
            return [2 /*return*/];
          });
        });
      }
    }];
  }
};
// 渲染组件特性动作配置项
var renderCmptActionSelect = function (componentLabel, required, onChange, hideAutoFill, manager) {
  return __spreadArray(__spreadArray([], __read(renderCmptSelect(componentLabel || i18n("d80bc0fcbfb250480320b683e48b1467"), true, function (value, oldVal, data, form) {
    return __awaiter(void 0, void 0, void 0, function () {
      var contextSchema, dataSchema, variables;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!form.data.__nodeId) return [3 /*break*/, 3];
            if (!(form.data.actionType === 'setValue')) return [3 /*break*/, 3];
            // todo:这里会闪一下，需要从amis查下问题
            form.setValueByName('args.value', []);
            form.setValueByName('args.__comboType', undefined);
            form.setValueByName('args.__valueInput', undefined);
            form.setValueByName('args.__containerType', undefined);
            if (!SELECT_PROPS_CONTAINER.includes(form.data.__rendererName)) return [3 /*break*/, 2];
            return [4 /*yield*/, (_b = (_a = form.data).getContextSchemas) === null || _b === void 0 ? void 0 : _b.call(_a, form.data.__nodeId, true)];
          case 1:
            contextSchema = _c.sent();
            dataSchema = new DataSchema(contextSchema || []);
            variables = (dataSchema === null || dataSchema === void 0 ? void 0 : dataSchema.getDataPropsAsOptions()) || [];
            form.setValueByName('__setValueDs', variables.filter(function (item) {
              return item.value !== '$$id';
            }));
            return [3 /*break*/, 3];
          case 2:
            form.setValueByName('__setValueDs', []);
            _c.label = 3;
          case 3:
            form.setValueByName('groupType', '');
            onChange === null || onChange === void 0 ? void 0 : onChange(value, oldVal, data, form);
            return [2 /*return*/];
        }
      });
    });
  }, hideAutoFill)), false), [{
    type: 'input-text',
    name: '__cmptId',
    mode: 'horizontal',
    size: 'lg',
    required: true,
    label: '组件id',
    visibleOn: 'data.componentId === "customCmptId" && data.actionType === "component"',
    onChange: function (value, oldVal, data, form) {
      return __awaiter(void 0, void 0, void 0, function () {
        var schema;
        return __generator(this, function (_a) {
          schema = JSONGetById(manager.store.schema, value, 'id');
          if (schema) {
            form.setValues({
              __rendererName: schema.type
            });
          } else {
            form.setValues({
              __rendererName: ''
            });
          }
          return [2 /*return*/];
        });
      });
    }
  }, {
    asFormItem: true,
    label: i18n("8deee3cdecdf06a05d22fcacc7031492"),
    name: 'groupType',
    mode: 'horizontal',
    required: true,
    visibleOn: 'data.actionType === "component"',
    component: CmptActionSelect,
    description: '${__cmptActionDesc}'
  }], false);
};
var renderCmptIdInput = function (onChange) {
  return {
    type: 'input-text',
    name: '__cmptId',
    mode: 'horizontal',
    size: 'lg',
    required: true,
    label: '组件id',
    visibleOn: 'data.componentId === "customCmptId"',
    onChange: function (value, oldVal, data, form) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          onChange === null || onChange === void 0 ? void 0 : onChange(value, oldVal, data, form);
          return [2 /*return*/];
        });
      });
    }
  };
};
// 动作配置项schema map
var COMMON_ACTION_SCHEMA_MAP = {
  setValue: {
    innerArgs: ['value'],
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("e366ccf1556c0672dcecba135ed5472e"), React__default.createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("b91ebe714155c83b6d3bc02b675a31e9"));
    },
    schema: getArgsWrapper({
      type: 'wrapper',
      className: 'p-none',
      body: [{
        type: 'combo',
        name: 'value',
        label: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
        multiple: true,
        removable: true,
        required: true,
        addable: true,
        strictMode: false,
        canAccessSuperData: true,
        mode: 'horizontal',
        items: [{
          name: 'key',
          type: 'input-text',
          placeholder: i18n("a25657422b40023f2731619587940bc7"),
          source: '${__setValueDs}',
          labelField: 'label',
          valueField: 'value',
          required: true
        }, getSchemaTpl('formulaControl', {
          name: 'val',
          variables: '${variables}',
          placeholder: i18n("9a2ee7044ff04234a8892a13583d14b6")
        })],
        visibleOn: 'data.__isScopeContainer'
      }, {
        type: 'combo',
        name: 'value',
        label: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
        multiple: true,
        removable: true,
        required: true,
        addable: true,
        strictMode: false,
        canAccessSuperData: true,
        mode: 'horizontal',
        items: [{
          type: 'combo',
          name: 'item',
          label: false,
          renderLabel: false,
          multiple: true,
          removable: true,
          required: true,
          addable: true,
          strictMode: false,
          canAccessSuperData: true,
          className: 'm-l',
          mode: 'horizontal',
          items: [{
            name: 'key',
            type: 'input-text',
            required: true
          }, getSchemaTpl('formulaControl', {
            name: 'val',
            variables: '${variables}'
          })]
        }],
        visibleOn: "data.__rendererName === 'combo' || data.__rendererName === 'input-table'"
      }, getSchemaTpl('formulaControl', {
        name: '__valueInput',
        label: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal',
        visibleOn: "!data.__isScopeContainer && data.__rendererName !== 'combo' && data.__rendererName !== 'input-table'",
        required: true
      })]
    })
  },
  reload: {
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("694fc5efa9e1d1c2c5eb6525e1c7fb29"), React__default.createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("bb79667f37035e9562ec6bcffd6cf8ef"));
    }
  },
  clear: {
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("288f0c404c4e546aa3683ff5054e85e2"), React__default.createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("b91ebe714155c83b6d3bc02b675a31e9"));
    }
  },
  reset: {
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("4b9c3271dc2f299dc3aeffb369187513"), React__default.createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("b91ebe714155c83b6d3bc02b675a31e9"));
    }
  },
  submit: {
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("939d5345ad4345dbaabe14798f6ac0f1"), React__default.createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? i18n("fe9e25f4e4b3aeefeb9b7a9c368ede7e") : i18n("0d83078816aa273f2941c9b55ec82bf3"));
    }
  },
  validate: {
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("b7579706a363e5f23b1040fecfbcb677"), React__default.createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("b91ebe714155c83b6d3bc02b675a31e9"));
    }
  },
  prev: {
    descDetail: function (info) {
      return React__default.createElement("div", null, React__default.createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), (info === null || info === void 0 ? void 0 : info.__rendererName) === 'carousel' ? i18n("186c8d63db1c09c38bcfd048fb15846e") : null, (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? i18n("d9b6b8e29d63ac6bb7a0381e994ebcb5") : null);
    }
  },
  next: {
    descDetail: function (info) {
      return React__default.createElement("div", null, React__default.createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), (info === null || info === void 0 ? void 0 : info.__rendererName) === 'carousel' ? i18n("47b9cbf9f3a3f08264b19f4a1228e865") : null, (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? i18n("832efcc5c30746b84b910cde8630d491") : null);
    }
  },
  expand: {
    descDetail: function (info) {
      return React__default.createElement("div", null, React__default.createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("e2edde5adbdf33f6dce59a299cbf5fad"));
    }
  },
  collapse: {
    descDetail: function (info) {
      return React__default.createElement("div", null, React__default.createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("def9e98b60e3bfc493bcd7693e702096"));
    }
  },
  selectAll: {
    descDetail: function (info) {
      return React__default.createElement("div", null, React__default.createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("8b3a9a5c912610c384bc8dc2c8514386"));
    }
  },
  focus: {
    descDetail: function (info) {
      return React__default.createElement("div", null, React__default.createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), i18n("ab0710b367acefa1d6a78e2338291e86"));
    }
  },
  refresh: {
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("39e107b7c4aa580f913ccbebc00f7534"));
    }
  },
  alert: {
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("211ae8c8666f8b803282a74f90fb0dc6"));
    }
  },
  confirm: {
    descDetail: function (info) {
      return React__default.createElement("div", null, i18n("56eafb82d11c72b65efe07b9bedb5c19"));
    }
  }
};
// 获取动作树中指定的动作
var findActionNode = function (actions, actionType) {
  return findTree(actions, function (node) {
    return node.actionType === actionType;
  });
};
// 获取包含指定子动作的动作
var findSubActionNode = function (actions, actionType) {
  return findTree(actions, function (node) {
    var _a;
    return (_a = node.actions) === null || _a === void 0 ? void 0 : _a.find(function (item) {
      return item.actionType === actionType;
    });
  });
};
// 获取真实的动作类型
var getActionType = function (action, hasSubActionNode) {
  return action.groupType === 'component' ? 'component' : hasSubActionNode ? hasSubActionNode.actionType : action.actionType;
};
// 获取事件Label文案
var getEventLabel = function (events, name) {
  var _a;
  return (_a = events.find(function (item) {
    return item.eventName === name;
  })) === null || _a === void 0 ? void 0 : _a.eventLabel;
};
// 获取事件描述文案
var getEventDesc = function (events, name) {
  var _a;
  return (_a = events.find(function (item) {
    return item.eventName === name;
  })) === null || _a === void 0 ? void 0 : _a.description;
};
var getEventStrongDesc = function (events, name) {
  var _a;
  return (_a = events.find(function (item) {
    return item.eventName === name;
  })) === null || _a === void 0 ? void 0 : _a.strongDesc;
};
// 判断插件动作中是否存在指定动作
var hasActionType = function (actionType, actions) {
  if (!Array.isArray(actions)) {
    return false;
  }
  return !!(actions === null || actions === void 0 ? void 0 : actions.find(function (item) {
    return [item.actionType, 'component'].includes(actionType);
  }));
};
// 获取动作配置，主要是为了获取config和desc，schema强制捆绑在动作树节点（动作配置可能在插件动作中 > 树节点 or 子动作）
var getPropOfAcion = function (action, propName, actionTree, pluginActions, commonActions, allComponents) {
  var _a, _b, _c, _d, _e, _f, _g;
  var prop = null;
  if (action.componentId) {
    // 优先从组件特性动作中找
    var node = findTree(allComponents !== null && allComponents !== void 0 ? allComponents : [], function (item) {
      return item.value === action.componentId;
    });
    prop = node && ((_b = (_a = pluginActions[node.type]) === null || _a === void 0 ? void 0 : _a.find(function (item) {
      return item.actionType === action.actionType;
    })) === null || _b === void 0 ? void 0 : _b[propName]);
  }
  if (!prop) {
    prop = (_c = findActionNode(actionTree, action.actionType)) === null || _c === void 0 ? void 0 : _c[propName];
  }
  if (!prop) {
    var commonActionConfig = __assign(__assign({}, COMMON_ACTION_SCHEMA_MAP), commonActions);
    var hasSubActionNode = findSubActionNode(actionTree, action.actionType);
    if (propName === 'actionLabel') {
      prop = hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actionLabel;
    } else {
      prop = (_f = (_e = (_d = hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actions) === null || _d === void 0 ? void 0 : _d.find(function (item) {
        return item.actionType === action.actionType;
      })) === null || _e === void 0 ? void 0 : _e[propName]) !== null && _f !== void 0 ? _f : (_g = commonActionConfig[action.actionType]) === null || _g === void 0 ? void 0 : _g[propName];
    }
  }
  return prop;
};
var getOldActionSchema = function (manager, context) {
  var isInDialog = /(?:\/|^)dialog\/.+$/.test(context.path);
  return {
    type: 'tooltip-wrapper',
    className: 'old-action-tooltip-warpper',
    content: i18n("9654916723a8d1d82f5ab9d2911edf93"),
    inline: true,
    tooltipTheme: 'dark',
    placement: 'bottom',
    body: [{
      type: 'button',
      label: i18n("88f7a3aef4888dd507482aedc02bb808"),
      className: 'block old-action-btn',
      actionType: 'dialog',
      dialog: {
        type: 'dialog',
        title: i18n("c500cfabdec9b2761fe9f1aa543933eb"),
        body: {
          type: 'form',
          body: [{
            label: i18n("88d1257b0cf667319085f3e0033b9607"),
            type: 'select',
            name: 'actionType',
            pipeIn: defaultValue(''),
            options: [{
              label: i18n("18c63459a2c069022c7790430f761214"),
              value: ''
            }, {
              label: i18n("ab3aec075a09d055b2a28c8b61925ee0"),
              value: 'dialog'
            }, {
              label: i18n("f10f0be4aa9684eef9d78234072fe08b"),
              value: 'drawer'
            }, {
              label: i18n("4f02d2efe05a20232ab9da63c090595c"),
              value: 'ajax'
            }, {
              label: i18n("5dfd5a78e2ba1bc8afb482a8745454ea"),
              value: 'download'
            }, {
              label: i18n("4e58f9c94d345e14e2d69cc8496b7b5a"),
              value: 'link'
            }, {
              label: i18n("982db3084a2c470d1a9b34efa024511c"),
              value: 'url'
            }, {
              label: i18n("f20d9579ebdc9dfc30a212ae6cae931f"),
              value: 'reload'
            }, {
              label: i18n("6a086902a84969a835423002718e86b4"),
              value: 'copy'
            }, {
              label: i18n("939d5345ad4345dbaabe14798f6ac0f1"),
              value: 'submit'
            }, {
              label: i18n("4b9c3271dc2f299dc3aeffb369187513"),
              value: 'reset'
            }, {
              label: i18n("fa476b76ccbd4ac9316f0fd80257b77a"),
              value: 'reset-and-submit'
            }, {
              label: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
              value: 'confirm'
            }, {
              label: i18n("625fb26b4b3340f7872b411f401e754c"),
              value: 'cancel'
            }, {
              label: i18n("0fc26855080a4219bbfad638029a795c"),
              value: 'next'
            }, {
              label: i18n("8ba8a1bead7ca55554cff1c85246ae09"),
              value: 'prev'
            }]
          }, {
            type: 'input-text',
            name: 'content',
            visibleOn: 'data.actionType == "copy"',
            label: i18n("deb65aca8dba2ff9d0cfaed0a3441068")
          }, {
            type: 'select',
            name: 'copyFormat',
            options: [{
              label: i18n("ffb01e5bcf4c00447f5150d3cba81371"),
              value: 'text/plain'
            }, {
              label: i18n("e2591e971f4c28db7c80a5f546084a1d"),
              value: 'text/html'
            }],
            visibleOn: 'data.actionType == "copy"',
            label: i18n("c28f4d63beabc4833b17aaa10ca550db")
          }, {
            type: 'input-text',
            name: 'target',
            visibleOn: 'data.actionType == "reload"',
            label: i18n("21fa07f18f80bee50695686831ae1286"),
            required: true
          }, {
            name: 'dialog',
            pipeIn: defaultValue({
              title: i18n("8a089992349df754f182a5d02de8e8e0"),
              body: i18n("1a9aaf05889002e65708c4950012a652"),
              showCloseButton: true,
              showErrorMsg: true,
              showLoading: true
            }),
            asFormItem: true,
            children: function (_a) {
              var value = _a.value,
                onChange = _a.onChange,
                data = _a.data;
              return data.actionType === 'dialog' ? React__default.createElement(Button, {
                size: "sm",
                level: "danger",
                className: "m-b",
                onClick: function () {
                  return manager.openSubEditor({
                    title: i18n("c3c8422fcecd8c1cc922cba15ab5cbc0"),
                    value: __assign({
                      type: 'dialog'
                    }, value),
                    onChange: function (value) {
                      return onChange(value);
                    }
                  });
                },
                block: true
              }, i18n("c3c8422fcecd8c1cc922cba15ab5cbc0")) : null;
            }
          }, {
            visibleOn: 'data.actionType == "drawer"',
            name: 'drawer',
            pipeIn: defaultValue({
              title: i18n("4cb9c4bc5cb960fcd03fceb2d2e62f3a"),
              body: i18n("1a9aaf05889002e65708c4950012a652")
            }),
            asFormItem: true,
            children: function (_a) {
              var value = _a.value,
                onChange = _a.onChange,
                data = _a.data;
              return data.actionType == 'drawer' ? React__default.createElement(Button, {
                size: "sm",
                level: "danger",
                className: "m-b",
                onClick: function () {
                  return manager.openSubEditor({
                    title: i18n("262c7c7b9874ae5607fb51da468d0e8c"),
                    value: __assign({
                      type: 'drawer'
                    }, value),
                    onChange: function (value) {
                      return onChange(value);
                    }
                  });
                },
                block: true
              }, i18n("262c7c7b9874ae5607fb51da468d0e8c")) : null;
            }
          }, getSchemaTpl('api', {
            label: i18n("5eb694a4252528628929ced97ca95823"),
            visibleOn: 'data.actionType == "ajax"'
          }), {
            name: 'feedback',
            pipeIn: defaultValue({
              title: i18n("8a089992349df754f182a5d02de8e8e0"),
              body: i18n("2d711b09bd0db0ad240cc83b30dd8014")
            }),
            asFormItem: true,
            children: function (_a) {
              var onChange = _a.onChange,
                value = _a.value,
                data = _a.data;
              return data.actionType == 'ajax' ? React__default.createElement("div", {
                className: "m-b"
              }, React__default.createElement(Button, {
                size: "sm",
                level: value ? 'danger' : 'info',
                onClick: function () {
                  return manager.openSubEditor({
                    title: i18n("0cc0fff6eb667b140d3fd06e34a8c69f"),
                    value: __assign({
                      type: 'dialog'
                    }, value),
                    onChange: function (value) {
                      return onChange(value);
                    }
                  });
                }
              }, i18n("deb9089ed7ebcacd712117fc4204c65f")), value ? React__default.createElement(Button, {
                size: "sm",
                level: "link",
                className: "m-l",
                onClick: function () {
                  return onChange('');
                }
              }, i18n("215f64480a93893fc56c51aeb5d40f11")) : null) : null;
            }
          }, {
            name: 'feedback.visibleOn',
            label: i18n("7984d95c01b725a2709fb8f5ee330fb4"),
            type: 'input-text',
            visibleOn: 'this.feedback',
            autoComplete: false,
            description: i18n("dfa07586a471e24b23fe68e11f5dc41a")
          }, {
            name: 'feedback.skipRestOnCancel',
            label: i18n("47186f00df86d3edad3b5595ba8c2a0a"),
            type: 'switch',
            mode: 'inline',
            className: 'block',
            visibleOn: 'this.feedback'
          }, {
            name: 'feedback.skipRestOnConfirm',
            label: i18n("4f21e04fe35d39c79e7779cdf2f4e232"),
            type: 'switch',
            mode: 'inline',
            className: 'block',
            visibleOn: 'this.feedback'
          }, {
            type: 'input-text',
            label: i18n("6ab20dc4b64021b85886ad9c12b6e0cc"),
            name: 'link',
            visibleOn: 'data.actionType == "link"'
          }, {
            type: 'input-text',
            label: i18n("6ab20dc4b64021b85886ad9c12b6e0cc"),
            name: 'url',
            visibleOn: 'data.actionType == "url"',
            placeholder: 'http://'
          }, {
            type: 'switch',
            name: 'blank',
            visibleOn: 'data.actionType == "url"',
            mode: 'inline',
            className: 'w-full',
            label: i18n("0bbc3ec26c36a87c9df3183def6ca9e0"),
            pipeIn: defaultValue(true)
          }, isInDialog ? {
            visibleOn: 'data.actionType == "submit" || data.type == "submit"',
            name: 'close',
            type: 'switch',
            mode: 'inline',
            className: 'w-full',
            pipeIn: defaultValue(true),
            label: i18n("d0c3025a64b26e5fbf22005f400c06d7")
          } : {}, {
            name: 'confirmText',
            type: 'textarea',
            label: i18n("0c15a924dc3bedefb79c958972bef2b9"),
            description: i18n("06b13b11740f7663af325bf5426930ba")
          }, {
            type: 'input-text',
            name: 'reload',
            label: i18n("fa9a0a79f29fef72e3060ea1af93c305"),
            visibleOn: 'data.actionType != "link" && data.actionType != "url"',
            description: i18n("437d629f00e62cf99b3ad288f84ade46")
          }, {
            type: 'input-text',
            name: 'target',
            visibleOn: 'data.actionType != "reload"',
            label: i18n("b01f08bf5b9f8e3ef9d49e31d89bf770"),
            description: i18n("f667748a8e9717498da714d4e5087af2")
          }, {
            type: 'js-editor',
            allowFullscreen: true,
            name: 'onClick',
            label: i18n("80ddab8a52f74d707765501b0caae21f"),
            description: i18n("babbd439bc04241ed3536f892668c250")
          }, {
            type: 'input-text',
            name: 'hotKey',
            label: i18n("867ade50f0bbb10bac65a5c3bc7895e9")
          }]
        },
        onConfirm: function (values) {
          manager.panelChangeValue(values[0]);
        }
      }
    }]
  };
};
/**
 * 对象转Combo组件对象数组
 * @param obj
 * @returns
 */
var objectToComboArray = function (obj) {
  return Object.entries(obj).map(function (_a) {
    var _b = __read(_a, 2),
      key = _b[0],
      val = _b[1];
    return {
      key: key,
      val: val
    };
  });
};
/**
 * Combo组件对象数组转对象
 * @param arr
 * @returns
 */
var comboArrayToObject = function (arr) {
  var obj = {};
  arr === null || arr === void 0 ? void 0 : arr.forEach(function (item) {
    obj[item.key] = item.val;
  });
  return obj;
};
/**
 * 获取事件动作面板所需属性配置
 */
var getEventControlConfig = function (manager, context) {
  var _a, _b, _c, _d, _e;
  var isSubEditor = manager.store.isSubEditor;
  // 通用动作配置
  var commonActions = (_b = (_a = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _a === void 0 ? void 0 : _a.customActionGetter) === null || _b === void 0 ? void 0 : _b.call(_a, manager);
  // 动作树
  var actionTree = ((_c = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _c === void 0 ? void 0 : _c.actionTreeGetter) ? (_d = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _d === void 0 ? void 0 : _d.actionTreeGetter(ACTION_TYPE_TREE(manager)) : ACTION_TYPE_TREE(manager);
  var allComponents = (_e = manager === null || manager === void 0 ? void 0 : manager.store) === null || _e === void 0 ? void 0 : _e.getComponentTreeSource();
  var checkComponent = function (node, action) {
    var _a;
    var actionType = action === null || action === void 0 ? void 0 : action.actionType;
    var actions = manager === null || manager === void 0 ? void 0 : manager.pluginActions[node.type];
    var haveChild = !!((_a = node.children) === null || _a === void 0 ? void 0 : _a.length);
    var isSupport = false;
    if (typeof action.supportComponents === 'string') {
      isSupport = action.supportComponents === '*' || action.supportComponents === node.type;
      // 内置逻辑
      if (action.supportComponents === 'byComponent' && actionType) {
        isSupport = hasActionType(actionType, actions);
        node.scoped = isSupport;
      }
    } else if (Array.isArray(action.supportComponents)) {
      isSupport = action.supportComponents.includes(node.type);
    }
    node.isScopeContainer = !!manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
    if (actionType === 'component' && !(actions === null || actions === void 0 ? void 0 : actions.length)) {
      node.disabled = true;
    }
    if (isSupport) {
      return true;
    } else if (haveChild) {
      return true;
    }
    return false;
  };
  return {
    showOldEntry: !!context.schema.actionType || ['submit', 'reset'].includes(context.schema.type),
    actions: manager === null || manager === void 0 ? void 0 : manager.pluginActions,
    events: manager === null || manager === void 0 ? void 0 : manager.pluginEvents,
    actionTree: actionTree,
    commonActions: commonActions,
    owner: '',
    addBroadcast: manager === null || manager === void 0 ? void 0 : manager.addBroadcast,
    removeBroadcast: manager === null || manager === void 0 ? void 0 : manager.removeBroadcast,
    allComponents: allComponents,
    getContextSchemas: function (id, withoutSuper) {
      return __awaiter(void 0, void 0, void 0, function () {
        var dataSchema;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, manager.getContextSchemas(id !== null && id !== void 0 ? id : context.id, withoutSuper)];
            case 1:
              dataSchema = _a.sent();
              // 存在指定id时，只需要当前层上下文
              if (id) {
                return [2 /*return*/, dataSchema];
              }
              return [2 /*return*/, manager.dataSchema];
          }
        });
      });
    },
    getComponents: function (action) {
      var _a;
      if (!action) {
        return [];
      }
      var components = (_a = manager === null || manager === void 0 ? void 0 : manager.store) === null || _a === void 0 ? void 0 : _a.getComponentTreeSource();
      var finalCmpts = [];
      if (isSubEditor) {
        var editorData = manager.store.getSuperEditorData;
        while (components) {
          if (editorData === null || editorData === void 0 ? void 0 : editorData.__curCmptTreeWrap) {
            components = [__assign(__assign({}, editorData.__curCmptTreeWrap), {
              children: components
            })];
          }
          finalCmpts = __spreadArray(__spreadArray([], __read(finalCmpts), false), __read(components), false);
          components = editorData === null || editorData === void 0 ? void 0 : editorData.__superCmptTreeSource;
          editorData = editorData === null || editorData === void 0 ? void 0 : editorData.__super;
        }
      } else {
        finalCmpts = components;
      }
      var result = filterTree(finalCmpts, function (node) {
        return checkComponent(node, action);
      }, 1, true);
      result.unshift({
        label: '输入组件id',
        value: 'customCmptId'
      });
      return result;
    },
    actionConfigInitFormatter: function (action) {
      return __awaiter(void 0, void 0, void 0, function () {
        var config, innerArgs, node, schema, __isScopeContainer, comboArray, tmpArgs_1, hasSubActionNode;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        return __generator(this, function (_w) {
          config = __assign({}, action);
          config.args = __assign({}, action.args);
          if (['link', 'url'].includes(action.actionType) && ((_a = action.args) === null || _a === void 0 ? void 0 : _a.params)) {
            config.args = __assign(__assign({}, config.args), {
              params: objectToComboArray((_b = action.args) === null || _b === void 0 ? void 0 : _b.params)
            });
          }
          if (['setValue'].includes(action.actionType) && ((_c = action.args) === null || _c === void 0 ? void 0 : _c.value)) {
            !config.args && (config.args = {});
            if (Array.isArray((_d = action.args) === null || _d === void 0 ? void 0 : _d.value)) {
              config.args.value = (_e = action.args) === null || _e === void 0 ? void 0 : _e.value.reduce(function (arr, valueItem, index) {
                if (!arr[index]) {
                  arr[index] = {};
                }
                arr[index].item = objectToComboArray(valueItem);
                return arr;
              }, []);
              // 目前只有给combo赋值会是数组，所以认为是全量的赋值方式
              config.args['__comboType'] = 'all';
            } else if (typeof ((_f = action.args) === null || _f === void 0 ? void 0 : _f.value) === 'object') {
              config.args.value = objectToComboArray((_g = action.args) === null || _g === void 0 ? void 0 : _g.value);
              config.args['__containerType'] = 'appoint';
              // 如果有index，认为是给指定序号的combo赋值，所以认为是指定序号的赋值方式
              if (action.args.index !== undefined) {
                config.args['__comboType'] = 'appoint';
              }
            } else if (action.actionType === 'setValue' && typeof ((_h = action.args) === null || _h === void 0 ? void 0 : _h.path) === 'string' && typeof ((_j = action.args) === null || _j === void 0 ? void 0 : _j.value) === 'string') {
              /** 应用变量赋值 */
              config.args['__containerType'] = 'all';
            } else if (action.actionType === 'setValue' && typeof ((_k = action.args) === null || _k === void 0 ? void 0 : _k.value) === 'string') {
              config.args['__containerType'] = 'all';
              config.args['__valueInput'] = config.args['value'];
              (_l = config.args) === null || _l === void 0 ? true : delete _l.value;
            }
          }
          if (['show', 'hidden', 'enabled', 'disabled'].includes(action.actionType)) {
            // 兼容老逻辑，初始化actionType
            config.__statusType = action.actionType;
            config.__actionType = 'static';
          }
          if (['usability', 'visibility'].includes(action.actionType)) {
            // 初始化条件参数
            config.__actionExpression = (_m = action.args) === null || _m === void 0 ? void 0 : _m.value;
          }
          if (['ajax', 'download'].includes(action.actionType)) {
            config.api = (_o = action.api) !== null && _o !== void 0 ? _o : (_p = action === null || action === void 0 ? void 0 : action.args) === null || _p === void 0 ? void 0 : _p.api;
            config.options = (_q = action.options) !== null && _q !== void 0 ? _q : (_r = action === null || action === void 0 ? void 0 : action.args) === null || _r === void 0 ? void 0 : _r.options;
            if (typeof (action === null || action === void 0 ? void 0 : action.api) === 'string') {
              config.api = normalizeApi(action === null || action === void 0 ? void 0 : action.api);
            }
            delete config.args;
          }
          innerArgs = getPropOfAcion(action, 'innerArgs', actionTree, manager.pluginActions, commonActions);
          // 处理刷新组件动作的追加参数
          if (config.actionType === 'reload') {
            config.__resetPage = (_s = config.args) === null || _s === void 0 ? void 0 : _s.resetPage;
            config.__addParam = !!config.data;
            if (config.data && typeof config.data === 'object' || config.args && !Object.keys(config.args).length && config.data === undefined) {
              config.__addParam = true;
              config.__containerType = 'appoint';
              config.dataMergeMode = 'override';
            }
            if (config.__addParam && config.data) {
              if (typeof config.data === 'string') {
                config.__containerType = 'all';
                config.__valueInput = config.data;
              } else {
                config.__containerType = 'appoint';
                config.__reloadParams = objectToComboArray(config.data);
              }
            } else if (config.args && !Object.keys(config.args).length && config.data === undefined) {
              config.__reloadParams = objectToComboArray(config.args);
            }
          }
          // 如果不在可以选择的组件范围，设置一下自定义输入组件数据
          if (['setValue', 'static', 'nonstatic', 'show', 'visibility', 'hidden', 'enabled', 'disabled', 'usability', 'reload', 'submit', 'clear', 'reset', 'validate'].includes(action.actionType)) {
            node = findTree(allComponents !== null && allComponents !== void 0 ? allComponents : [], function (item) {
              return item.value === config.componentId;
            });
            if (!node) {
              config.__cmptId = config.componentId;
              config.componentId = 'customCmptId';
            }
            if (['setValue'].includes(action.actionType)) {
              schema = JSONGetById(manager.store.schema, config.__cmptId, 'id');
              if (schema) {
                __isScopeContainer = !!manager.dataSchema.getScope("".concat(schema.$$id, "-").concat(schema.type));
                config.__isScopeContainer = __isScopeContainer;
                config.__rendererName = schema.type;
              }
            }
          }
          delete config.data;
          // 处理下 addItem 的初始化
          if (action.actionType === 'addItem') {
            if (Array.isArray((_t = action.args) === null || _t === void 0 ? void 0 : _t.item)) {
              comboArray = (((_u = action.args) === null || _u === void 0 ? void 0 : _u.item) || []).map(function (raw) {
                return objectToComboArray(raw);
              });
              config.args = __assign(__assign({}, config.args), {
                value: comboArray.map(function (combo) {
                  return {
                    item: combo
                  };
                })
              });
            } else {
              config.args = __assign(__assign({}, config.args), {
                item: objectToComboArray((_v = action.args) === null || _v === void 0 ? void 0 : _v.item)
              });
            }
          }
          // 还原args为可视化配置结构(args + addOnArgs)
          if (config.args) {
            if (innerArgs) {
              tmpArgs_1 = {};
              config.addOnArgs = [];
              Object.keys(config.args).forEach(function (key) {
                var _a;
                var _b, _c;
                // 筛选出附加配置参数
                if (!innerArgs.includes(key)) {
                  config.addOnArgs = __spreadArray(__spreadArray([], __read(config.addOnArgs), false), [{
                    key: key,
                    val: (_b = config.args) === null || _b === void 0 ? void 0 : _b[key]
                  }], false);
                } else {
                  tmpArgs_1 = __assign(__assign({}, tmpArgs_1), (_a = {}, _a[key] = (_c = config.args) === null || _c === void 0 ? void 0 : _c[key], _a));
                }
              });
              config.args = tmpArgs_1;
            }
          }
          hasSubActionNode = findSubActionNode(actionTree, action.actionType);
          return [2 /*return*/, __assign(__assign({}, config), {
            actionType: getActionType(action, hasSubActionNode),
            args: config.args
          })];
        });
      });
    },
    actionConfigSubmitFormatter: function (config, type, actionData, shcema) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
      var action = __assign(__assign({}, config), {
        groupType: undefined
      });
      action.__title = (_a = findActionNode(actionTree, config.actionType)) === null || _a === void 0 ? void 0 : _a.actionLabel;
      // 修正动作名称
      if (config.actionType === 'component') {
        action.actionType = config.groupType;
        // 标记一下组件特性动作
        action.groupType = config.actionType;
      }
      var hasSubActionNode = findSubActionNode(actionTree, config.groupType);
      if (hasSubActionNode) {
        // 修正动作
        action.actionType = config.groupType;
      }
      // 合并附加的动作参数
      if (config.addOnArgs) {
        config.addOnArgs.forEach(function (args) {
          var _a;
          var _b;
          action.args = (_b = action.args) !== null && _b !== void 0 ? _b : {};
          action.args = __assign(__assign({}, action.args), (_a = {}, _a[args.key] = args.val, _a));
        });
        delete action.addOnArgs;
      }
      if (config.actionType === 'openDialog') {
        // 初始化弹窗schema
        var dialogInitSchema_1 = {
          type: 'dialog',
          title: action.__dialogTitle,
          body: [{
            type: 'tpl',
            tpl: i18n("1a9aaf05889002e65708c4950012a652"),
            wrapperComponent: '',
            inline: false
          }],
          showCloseButton: true,
          showErrorMsg: true,
          showLoading: true,
          className: 'app-popover',
          actions: [{
            type: 'button',
            actionType: 'cancel',
            label: i18n("625fb26b4b3340f7872b411f401e754c")
          }, {
            type: 'button',
            actionType: 'confirm',
            label: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
            primary: true
          }]
        };
        var drawerInitSchema_1 = {
          type: 'drawer',
          title: action.__dialogTitle,
          body: [{
            type: 'tpl',
            tpl: i18n("1a9aaf05889002e65708c4950012a652"),
            wrapperComponent: '',
            inline: false
          }],
          className: 'app-popover',
          actions: [{
            type: 'button',
            actionType: 'cancel',
            label: i18n("625fb26b4b3340f7872b411f401e754c")
          }, {
            type: 'button',
            actionType: 'confirm',
            label: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
            primary: true
          }]
        };
        var confirmDialogInitSchema_1 = {
          type: 'dialog',
          title: action.__dialogTitle,
          body: [{
            type: 'tpl',
            tpl: i18n("1a9aaf05889002e65708c4950012a652"),
            wrapperComponent: '',
            inline: false
          }],
          dialogType: 'confirm',
          confirmText: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
          cancelText: i18n("625fb26b4b3340f7872b411f401e754c"),
          confirmBtnLevel: 'primary'
        };
        var setInitSchema = function (groupType, action) {
          if (groupType === 'dialog') {
            JsonGenerateID(dialogInitSchema_1);
            action.dialog = dialogInitSchema_1;
          } else if (groupType === 'drawer') {
            JsonGenerateID(drawerInitSchema_1);
            action.drawer = drawerInitSchema_1;
          } else if (groupType === 'confirmDialog') {
            JsonGenerateID(confirmDialogInitSchema_1);
            action.dialog = confirmDialogInitSchema_1;
          }
        };
        var chooseCurrentDialog = function (action, schema) {
          var selectDialog = action.__selectDialog;
          var dialogType = getFixDialogType(schema, selectDialog);
          // 选择现有弹窗后为了使之前的弹窗和现有弹窗$$id唯一，这里重新生成一下
          var newDialogId = guid();
          action.actionType = dialogType;
          action.dialog = {
            $$id: newDialogId,
            type: dialogType
          };
          // 在这里记录一下新生成的弹窗id
          action.__relatedDialogId = newDialogId;
        };
        if (type === 'add') {
          if (config.__dialogSource === 'new') {
            setInitSchema(config.groupType, action);
          } else if (config.__dialogSource === 'current') {
            chooseCurrentDialog(action, shcema);
          }
        }
        // 编辑
        else if (type === 'update') {
          if (config.__dialogSource === 'new') {
            // 如果切换了弹窗类型或切换了弹窗来源，则初始化schema
            if (config.groupType !== (actionData === null || actionData === void 0 ? void 0 : actionData.groupType) || config.__dialogSource === 'new' && (actionData === null || actionData === void 0 ? void 0 : actionData.__dialogSource) === 'current') {
              setInitSchema(config.groupType, action);
            } else {
              action[config.groupType] = __assign(__assign({}, actionData[config.groupType]), {
                title: config.__dialogTitle
              });
            }
          } else if (config.__dialogSource === 'current') {
            chooseCurrentDialog(action, shcema);
          }
        }
      }
      // 刷新组件时，处理是否追加事件变量
      if (config.actionType === 'reload') {
        action.data = undefined;
        action.dataMergeMode = undefined;
        action.args = action.__rendererName === 'crud' ? __assign(__assign({}, action.args), {
          resetPage: (_b = config.__resetPage) !== null && _b !== void 0 ? _b : true
        }) : undefined;
        action.data = undefined;
        if (config.__addParam) {
          action.dataMergeMode = config.dataMergeMode || 'merge';
          action.data = config.__containerType === 'all' ? config.__valueInput : comboArrayToObject(config.__reloadParams || []);
        }
      }
      // 转换下格式
      if (['link', 'url'].includes(action.actionType)) {
        var params = (_c = config.args) === null || _c === void 0 ? void 0 : _c.params;
        if (params && params.length) {
          action.args = __assign(__assign({}, action.args), {
            params: comboArrayToObject(params)
          });
        }
      }
      if (action.actionType === 'toast') {
        // 配置一个toast组件默认class
        action.args = __assign(__assign({}, action.args), {
          className: 'theme-toast-action-scope'
        });
      }
      // 转换下格式
      if (action.actionType === 'setValue') {
        if ((_d = config.args) === null || _d === void 0 ? void 0 : _d.hasOwnProperty('path')) {
          /** 应用变量赋值 */
          action.args = {
            path: config.args.path,
            value: (_f = (_e = config.args) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '',
            fromPage: (_g = action.args) === null || _g === void 0 ? void 0 : _g.fromPage,
            fromApp: (_h = action.args) === null || _h === void 0 ? void 0 : _h.fromApp
          };
          action.hasOwnProperty('componentId') && delete action.componentId;
          return action;
        } else {
          ((_j = action === null || action === void 0 ? void 0 : action.args) === null || _j === void 0 ? void 0 : _j.hasOwnProperty('path')) && delete action.args.path;
          if (((_k = config.args) === null || _k === void 0 ? void 0 : _k.__valueInput) !== undefined) {
            action.args = {
              value: (_l = config.args) === null || _l === void 0 ? void 0 : _l.__valueInput
            };
          } else if (Array.isArray((_m = config.args) === null || _m === void 0 ? void 0 : _m.value)) {
            action.args = (_o = action.args) !== null && _o !== void 0 ? _o : {};
            if ((action.__rendererName === 'combo' || action.__rendererName === 'input-table') && ((_p = action.args) === null || _p === void 0 ? void 0 : _p.index) === undefined) {
              // combo、input-table特殊处理
              var tempArr_1 = [];
              (_q = config.args) === null || _q === void 0 ? void 0 : _q.value.forEach(function (valueItem, index) {
                valueItem.item.forEach(function (item) {
                  if (!tempArr_1[index]) {
                    tempArr_1[index] = {};
                  }
                  tempArr_1[index][item.key] = item.val;
                });
              });
              action.args = __assign(__assign({}, action.args), {
                value: tempArr_1
              });
            } else {
              action.args = __assign(__assign({}, action.args), {
                value: comboArrayToObject((_r = config.args) === null || _r === void 0 ? void 0 : _r.value)
              });
            }
          }
        }
      }
      if (['setValue', 'static', 'nonstatic', 'show', 'visibility', 'hidden', 'enabled', 'disabled', 'usability', 'reload', 'submit', 'clear', 'reset', 'validate'].includes(action.actionType)) {
        // 处理一下自行输入组件id的转换
        if (action.componentId === 'customCmptId') {
          action.componentId = action.__cmptId;
        }
      }
      if (action.actionType === 'addItem' && action.__rendererName === 'combo') {
        action.args = __assign(__assign({}, action.args), {
          item: comboArrayToObject((_s = config.args) === null || _s === void 0 ? void 0 : _s.item)
        });
      }
      if (action.actionType === 'addItem' && action.__rendererName === 'input-table') {
        var comboArray = (((_t = config.args) === null || _t === void 0 ? void 0 : _t.value) || []).map(function (combo) {
          return combo.item || {};
        });
        action.args = __assign(__assign({}, action.args), {
          item: comboArray.map(function (raw) {
            return comboArrayToObject(raw);
          })
        });
        (_u = action.args) === null || _u === void 0 ? true : delete _u.value;
      }
      // 转换下格式
      if (['visibility', 'usability'].includes(config.actionType)) {
        action.args = action.actionType !== 'static' ? {
          value: action.__actionExpression
        } : undefined;
        action.actionType === 'static' && (action.actionType = config.__statusType);
        delete action.__actionExpression;
        delete action.__statusType;
      }
      delete action.config;
      delete action.__keywords;
      delete action.__resultActionTree;
      return action;
    }
  };
};

export { ACTION_TYPE_TREE, COMMON_ACTION_SCHEMA_MAP, DATA_CONTAINER, FORMITEM_CMPTS, SELECT_PROPS_CONTAINER, SHOW_SELECT_PROP, SUPPORT_DISABLED_CMPTS, SUPPORT_STATIC_FORMITEM_CMPTS, findActionNode, findSubActionNode, getActionType, getArgsWrapper, getEventControlConfig, getEventDesc, getEventLabel, getEventStrongDesc, getOldActionSchema, getPropOfAcion, hasActionType, renderCmptActionSelect, renderCmptIdInput, renderCmptSelect };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
