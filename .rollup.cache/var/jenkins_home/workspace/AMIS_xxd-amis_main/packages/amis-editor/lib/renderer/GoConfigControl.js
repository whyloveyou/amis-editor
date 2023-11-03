/**
 * @file 进行详细配置
 */
import { __decorate, __extends, __metadata } from "tslib";
import React from 'react';
import cx from 'classnames';
import { Renderer, toast } from 'amis';
import { autobind } from 'amis-core';
var GoConfigControl = /** @class */ (function (_super) {
    __extends(GoConfigControl, _super);
    function GoConfigControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoConfigControl.prototype.onClick = function () {
        var _a = this.props, _b = _a.data, ctx = _b === void 0 ? {} : _b, compId = _a.compId, manager = _a.manager;
        var id = typeof compId === 'string' ? compId : compId(ctx);
        if (!id) {
            toast.error('未找到对应组件');
            return;
        }
        manager.setActiveId(id);
    };
    GoConfigControl.prototype.render = function () {
        var _a = this.props, className = _a.className, label = _a.label, _b = _a.data, ctx = _b === void 0 ? {} : _b;
        return (React.createElement("div", { className: cx('ae-GoConfig', className), onClick: this.onClick },
            label,
            React.createElement("div", { className: cx('ae-GoConfig-trigger') }, "\u53BB\u7F16\u8F91")));
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], GoConfigControl.prototype, "onClick", null);
    return GoConfigControl;
}(React.PureComponent));
export { GoConfigControl };
var GoConfigControlRenderer = /** @class */ (function (_super) {
    __extends(GoConfigControlRenderer, _super);
    function GoConfigControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoConfigControlRenderer = __decorate([
        Renderer({
            type: 'ae-go-config'
        })
    ], GoConfigControlRenderer);
    return GoConfigControlRenderer;
}(GoConfigControl));
export { GoConfigControlRenderer };
