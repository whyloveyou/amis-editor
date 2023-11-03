/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import { COMMON_ACTION_SCHEMA_MAP, renderCmptActionSelect } from './helper.js';
import { i18n } from 'i18n-runtime';

/**
 * 动作配置面板
 */
var ActionConfigPanel = /** @class */function (_super) {
  __extends(ActionConfigPanel, _super);
  function ActionConfigPanel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ActionConfigPanel.prototype.render = function () {
    var _a, _b, _c, _d;
    var _e = this.props,
      data = _e.data;
      _e.onBulkChange;
      var render = _e.render,
      pluginActions = _e.pluginActions,
      actionConfigItemsMap = _e.actionConfigItemsMap,
      manager = _e.manager;
    var actionType = data.__subActions ? data.groupType : data.actionType;
    var commonActionConfig = __assign(__assign({}, COMMON_ACTION_SCHEMA_MAP), actionConfigItemsMap);
    var schema = null;
    if (data.actionType === 'component') {
      // 获取组件动作配置
      var subActionSchema = (_c = (_b = (_a = pluginActions === null || pluginActions === void 0 ? void 0 : pluginActions[data.__rendererName]) === null || _a === void 0 ? void 0 : _a.find(function (item) {
        return item.actionType === data.groupType;
      })) === null || _b === void 0 ? void 0 : _b.schema) !== null && _c !== void 0 ? _c : (_d = commonActionConfig[data.groupType]) === null || _d === void 0 ? void 0 : _d.schema;
      var baseSchema = renderCmptActionSelect(i18n("d80bc0fcbfb250480320b683e48b1467"), true, function () {}, data.componentId === 'customCmptId' ? true : false, manager);
      // 追加到基础配置
      schema = __spreadArray(__spreadArray([], __read(Array.isArray(baseSchema) ? baseSchema : [baseSchema]), false), __read(Array.isArray(subActionSchema) ? subActionSchema : [subActionSchema]), false);
    } else {
      schema = data.__actionSchema;
    }
    return schema ? render('inner', schema, {
      data: data
    }) : data.__subActions ? React__default.createElement(React__default.Fragment, null) : React__default.createElement("div", {
      className: cx('ae-event-control-action-placeholder', {
        'no-settings': actionType
      })
    }, React__default.createElement("div", {
      className: "ae-event-control-action-placeholder-img"
    }), React__default.createElement("span", null, actionType ? i18n("07682f1424e400c467accdb556d59e1c") : i18n("2e3ca80a58643bc28e87cc3b17bc9d80")));
  };
  return ActionConfigPanel;
}(React__default.Component);

export { ActionConfigPanel as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
