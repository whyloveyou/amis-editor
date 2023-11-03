/**
 * @file 角标控件
 */
import { __decorate, __extends, __values } from "tslib";
import React from 'react';
import { FormItem } from 'amis';
import { tipedLabel } from 'amis-editor-core';
import set from 'lodash/set';
import get from 'lodash/get';
var NavDefaultActiveControl = /** @class */ (function (_super) {
    __extends(NavDefaultActiveControl, _super);
    function NavDefaultActiveControl(props) {
        return _super.call(this, props) || this;
    }
    NavDefaultActiveControl.prototype.deleteActive = function (data) {
        var e_1, _a;
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var item = data_1_1.value;
                if (item.active) {
                    delete item.active;
                }
                if (item.children) {
                    this.deleteActive(item.children);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    NavDefaultActiveControl.prototype.findActiveKey = function (data, index) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.active) {
                this.activeKey = index ? "".concat(index, "_").concat(i) : "".concat(i);
                return;
            }
            if (item.children && item.children.length) {
                this.findActiveKey(item.children, "".concat(i));
            }
        }
    };
    NavDefaultActiveControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, render = _a.render, data = _a.data, onBulkChange = _a.onBulkChange;
        this.findActiveKey(data.links);
        return render('', {
            type: 'tree-select',
            name: 'treeSelect',
            label: tipedLabel('默认选中菜单', '优先根据当前浏览器地址栏URL进行匹配，未命中时将选中您配置的菜单项'),
            valueField: 'id',
            options: data.links,
            mode: 'horizontal',
            value: this.activeKey,
            horizontal: {
                justify: true,
                left: 4
            },
            onChange: function (value) {
                var pathArr = (value && value.split('_')) || [];
                var links = data.links;
                _this.deleteActive(links);
                var path = "[".concat(pathArr.join('].children['), "]");
                if (get(links, path + '.label')) {
                    set(links, path + '.active', true);
                }
                onBulkChange && onBulkChange({ links: links });
            }
        });
    };
    return NavDefaultActiveControl;
}(React.Component));
export default NavDefaultActiveControl;
var NavDefaultActive = /** @class */ (function (_super) {
    __extends(NavDefaultActive, _super);
    function NavDefaultActive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavDefaultActive = __decorate([
        FormItem({ type: 'ae-nav-default-active', renderLabel: false })
    ], NavDefaultActive);
    return NavDefaultActive;
}(NavDefaultActiveControl));
export { NavDefaultActive };
