/**
 * 动作配置面板
 */
import { __assign, __extends, __read, __spreadArray } from "tslib";
import React from 'react';
import cx from 'classnames';
import { COMMON_ACTION_SCHEMA_MAP, renderCmptActionSelect } from './helper';
var ActionConfigPanel = /** @class */ (function (_super) {
    __extends(ActionConfigPanel, _super);
    function ActionConfigPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionConfigPanel.prototype.render = function () {
        var _a, _b, _c, _d;
        var _e = this.props, data = _e.data, onBulkChange = _e.onBulkChange, render = _e.render, pluginActions = _e.pluginActions, actionConfigItemsMap = _e.actionConfigItemsMap, manager = _e.manager;
        var actionType = data.__subActions ? data.groupType : data.actionType;
        var commonActionConfig = __assign(__assign({}, COMMON_ACTION_SCHEMA_MAP), actionConfigItemsMap);
        var schema = null;
        if (data.actionType === 'component') {
            // 获取组件动作配置
            var subActionSchema = (_c = (_b = (_a = pluginActions === null || pluginActions === void 0 ? void 0 : pluginActions[data.__rendererName]) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.actionType === data.groupType; })) === null || _b === void 0 ? void 0 : _b.schema) !== null && _c !== void 0 ? _c : (_d = commonActionConfig[data.groupType]) === null || _d === void 0 ? void 0 : _d.schema;
            var baseSchema = renderCmptActionSelect('选择组件', true, function () { }, data.componentId === 'customCmptId' ? true : false, manager);
            // 追加到基础配置
            schema = __spreadArray(__spreadArray([], __read((Array.isArray(baseSchema) ? baseSchema : [baseSchema])), false), __read((Array.isArray(subActionSchema)
                ? subActionSchema
                : [subActionSchema])), false);
        }
        else {
            schema = data.__actionSchema;
        }
        return schema ? (render('inner', schema, {
            data: data
        })) : data.__subActions ? (React.createElement(React.Fragment, null)) : (React.createElement("div", { className: cx('ae-event-control-action-placeholder', {
                'no-settings': actionType
            }) },
            React.createElement("div", { className: "ae-event-control-action-placeholder-img" }),
            React.createElement("span", null, actionType ? '无配置内容' : '请选择执行动作')));
    };
    return ActionConfigPanel;
}(React.Component));
export default ActionConfigPanel;
