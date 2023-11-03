/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { tipedLabel, getSchemaTpl } from 'amis-editor-core';
import React__default from 'react';
import ActionConfigPanel from './action-config-panel.js';
import { BASE_ACTION_PROPS } from './comp-action-select.js';
import { findActionNode } from './helper.js';
import { i18n } from 'i18n-runtime';

/**
 * 动作配置面板
 */
var ActionDialog = /** @class */function (_super) {
  __extends(ActionDialog, _super);
  function ActionDialog() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * 获取组件树搜索列表
   * @param tree
   * @param keywords
   * @returns
   */
  ActionDialog.prototype.getTreeSearchList = function (tree, keywords) {
    if (!keywords) {
      return tree;
    }
    var result = [];
    var getSearchList = function (result, array, keywords) {
      array.forEach(function (node) {
        if (node.children) {
          getSearchList(result, node.children, keywords);
        } else if (node.actionLabel.includes(keywords)) {
          result.push(__assign({}, node));
        }
      });
    };
    getSearchList(result, tree, keywords);
    return result;
  };
  /**
   * 获取组件树配置schema
   * @param isSearch 是否是搜索
   * @param actionTree 原数据源
   * @param getComponents
   * @returns
   */
  ActionDialog.prototype.getInputTreeSchema = function (isSearch, actionTree, getComponents) {
    var inputTreeSchema = {
      type: 'input-tree',
      name: 'actionType',
      visibleOn: isSearch ? '__keywords' : '!__keywords',
      disabled: false,
      onlyLeaf: true,
      showIcon: false,
      className: 'action-tree',
      mode: 'normal',
      labelField: 'actionLabel',
      valueField: 'actionType',
      inputClassName: 'no-border action-tree-control',
      placeholder: i18n("db1cac8e2f6206e8f179b1ff47a676df"),
      onChange: function (value, oldVal, data, form) {
        var _a;
        // 因为不知道动作都有哪些字段，这里只保留基础配置
        var removeKeys = {};
        var groupType = '';
        Object.keys(form.data).forEach(function (key) {
          if (!BASE_ACTION_PROPS.includes(key)) {
            removeKeys[key] = undefined;
          }
        });
        if (value === 'openDialog' && !['dialog', 'drawer'].includes(groupType)) {
          groupType = 'dialog';
        }
        if (value === 'closeDialog' && !['closeDialog', 'closeDrawer'].includes(groupType)) {
          groupType = 'closeDialog';
        }
        if (value === 'visibility' && !['show', 'hidden', 'visibility'].includes(groupType)) {
          groupType = 'show';
        }
        if (value === 'usability' && !['enabled', 'disabled', 'usability'].includes(groupType)) {
          groupType = 'enabled';
        }
        var actionNode = findActionNode(actionTree, value);
        form.setValues(__assign(__assign(__assign(__assign({}, removeKeys), {
          __keywords: form.data.__keywords,
          __resultActionTree: form.data.__resultActionTree,
          componentId: form.data.componentId ? '' : undefined
        }), form.data.args ? {
          args: {}
        } : {}), {
          // 切换动作时清空args
          groupType: groupType,
          __actionDesc: actionNode === null || actionNode === void 0 ? void 0 : actionNode.description,
          __actionSchema: actionNode === null || actionNode === void 0 ? void 0 : actionNode.schema,
          __subActions: actionNode === null || actionNode === void 0 ? void 0 : actionNode.actions,
          __cmptTreeSource: (actionNode === null || actionNode === void 0 ? void 0 : actionNode.supportComponents) ? (_a = getComponents === null || getComponents === void 0 ? void 0 : getComponents(actionNode)) !== null && _a !== void 0 ? _a : [] : [],
          ignoreError: false
        }));
      }
    };
    if (isSearch) {
      return __assign(__assign({}, inputTreeSchema), {
        source: '${__resultActionTree}',
        highlightTxt: '${__keywords}'
      });
    } else {
      return __assign(__assign({}, inputTreeSchema), {
        options: actionTree
      });
    }
  };
  ActionDialog.prototype.render = function () {
    var _this = this;
    var _a;
    var _b = this.props,
      data = _b.data,
      show = _b.show,
      type = _b.type,
      actionTree = _b.actionTree,
      pluginActions = _b.pluginActions,
      getComponents = _b.getComponents,
      commonActions = _b.commonActions,
      onClose = _b.onClose,
      render = _b.render;
    return render('inner', {
      type: 'dialog',
      title: i18n("e9908cdf79e965f6907ce9f291cdfcf8"),
      headerClassName: 'font-bold',
      className: 'action-config-dialog',
      bodyClassName: 'action-config-dialog-body',
      closeOnEsc: true,
      closeOnOutside: false,
      show: show,
      showCloseButton: true,
      size: 'md',
      body: [{
        type: 'form',
        title: '',
        mode: 'normal',
        wrapperComponent: 'div',
        submitText: i18n("be5fbbe34ce9979bfb6576d9eddc5612"),
        autoFocus: true,
        data: {
          __keywords: '',
          __resultActionTree: []
        },
        preventEnterSubmit: true,
        // debug: true,
        onSubmit: (_a = this.props.onSubmit) === null || _a === void 0 ? void 0 : _a.bind(this, type),
        body: [{
          type: 'grid',
          className: 'h-full',
          columns: [{
            body: [{
              type: 'tpl',
              tpl: i18n("d1d9049139d870edd490215530d90458"),
              className: 'action-panel-title',
              inline: false
            }, {
              type: 'input-text',
              name: '__keywords',
              className: 'action-tree-search',
              inputClassName: 'action-tree-search-input',
              placeholder: i18n("9eac7e07ca0a3181766e5ecc70d20727"),
              clearable: true,
              onChange: function (value, oldVal, data, form) {
                if (value) {
                  var list = _this.getTreeSearchList(actionTree, value);
                  form.setValueByName('__resultActionTree', list);
                } else {
                  form.setValueByName('__resultActionTree', actionTree);
                }
              }
            },
            // actionTree中包含function及class类型的属性，直接传入form的data中解析会报错
            // 故采用两棵树分别使用静态及动态选项组
            this.getInputTreeSchema(false, actionTree, getComponents), this.getInputTreeSchema(true, actionTree, getComponents)],
            md: 3,
            columnClassName: 'left-panel'
          }, {
            body: [{
              type: 'tpl',
              tpl: i18n("0174bdde9517fa331bf7d716a553e023"),
              className: 'action-panel-title',
              visibleOn: 'data.actionType',
              inline: false
            }, {
              type: 'tpl',
              className: 'action-desc',
              tpl: '${__actionDesc}',
              visibleOn: 'data.actionType'
            }, {
              type: 'tpl',
              tpl: i18n("0aeca07a02601a8e701a46d1a8b5ce43"),
              className: 'action-panel-title',
              visibleOn: 'data.actionType',
              inline: false
            }, {
              type: 'container',
              className: 'right-panel-container',
              body: [{
                asFormItem: true,
                component: ActionConfigPanel,
                pluginActions: pluginActions,
                commonActions: commonActions
              }, {
                type: 'tpl',
                tpl: i18n("e370757f933a8ecd87bf0255c3ce45d0"),
                inline: false,
                className: 'action-panel-title',
                visibleOn: 'data.actionType'
              }, {
                type: 'button-group-select',
                name: 'ignoreError',
                visibleOn: 'data.actionType',
                label: tipedLabel(i18n("0e7bb2c7879f0a34c02f547820b0b0b3"), i18n("5d9fe78268b03e8aa41ac316ef610d9a")),
                mode: 'horizontal',
                pipeIn: function (value, data) {
                  return value === true ? '1' : value === false ? '2' : '3';
                },
                pipeOut: function (value) {
                  return value === '1' ? true : value === '2' ? false : undefined;
                },
                options: [{
                  label: i18n("c0d5d68f5f1cc399311e92905ed2fa80"),
                  value: '1'
                }, {
                  label: i18n("a165be161ac250720f6f25820dd2a5b3"),
                  value: '2'
                }, {
                  label: i18n("9cdfce42ef0fa346511538131e51328f"),
                  value: '3'
                }],
                description: i18n("17817a4d2da41f4261f4155ada59e395")
              }, getSchemaTpl('expressionFormulaControl', {
                name: 'stopPropagation',
                label: tipedLabel(i18n("8c2bb89f516205027b9ed6609fb17726"), i18n("46a3c6ab94da0b16a707bdd3b74c9e09")),
                evalMode: true,
                variables: '${variables}',
                mode: 'horizontal',
                size: 'lg',
                visibleOn: 'data.actionType'
              }), getSchemaTpl('expressionFormulaControl', {
                name: 'expression',
                label: i18n("da1ed600ce65be863766444e60c2da05"),
                evalMode: true,
                variables: '${variables}',
                mode: 'horizontal',
                size: 'lg',
                placeholder: i18n("13b2de1073f76444c49d2c6a21e46e26"),
                visibleOn: 'data.actionType'
              })]
            }],
            columnClassName: 'right-panel'
          }]
        }],
        style: {
          borderStyle: 'solid'
        },
        className: 'action-config-panel AMISCSSWrapper'
      }],
      onClose: onClose
    }, {
      data: data // 必须这样，不然变量会被当作数据映射处理掉
    });
    //   : null;
  };

  return ActionDialog;
}(React__default.Component);

export { ActionDialog as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
