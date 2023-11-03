/**
 * @file 表格自定义列可视化编辑控件
 */
import { __assign, __decorate, __extends } from "tslib";
import React from 'react';
import cx from 'classnames';
import findIndex from 'lodash/findIndex';
import { FormItem, TreeSelection } from 'amis';
var ColumnControl = /** @class */ (function (_super) {
    __extends(ColumnControl, _super);
    function ColumnControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            columns: _this.transformColumns(props)
        };
        return _this;
    }
    ColumnControl.prototype.transformColumns = function (props) {
        var data = props.data;
        return data.columns;
    };
    ColumnControl.prototype.onChange = function (value) {
        var onBulkChange = this.props.onBulkChange;
        var columns = this.state.columns.map(function (c) { return (__assign(__assign({}, c), { toggled: findIndex(value, function (v) { return v.value === c.key; }) > -1 })); });
        this.setState({ columns: columns });
        onBulkChange && onBulkChange({ columns: columns });
    };
    ColumnControl.prototype.render = function () {
        var _this = this;
        var columns = this.state.columns;
        var options = columns
            ? columns.map(function (c) { return ({ value: c.key, label: c.title }); })
            : [];
        var value = columns
            ? columns
                .filter(function (c) { return c.toggled !== false; })
                .map(function (c) { return ({ value: c.key, label: c.title }); })
            : [];
        return (React.createElement("div", { className: cx('ae-ColumnControl') },
            React.createElement(TreeSelection, { options: options, value: value, onChange: function (v) { return _this.onChange(v); } })));
    };
    return ColumnControl;
}(React.Component));
export default ColumnControl;
var ColumnControlRenderer = /** @class */ (function (_super) {
    __extends(ColumnControlRenderer, _super);
    function ColumnControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnControlRenderer = __decorate([
        FormItem({
            type: 'ae-columnControl',
            renderLabel: false
        })
    ], ColumnControlRenderer);
    return ColumnControlRenderer;
}(ColumnControl));
export { ColumnControlRenderer };
