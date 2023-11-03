/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var amis = require('amis');
var React = require('react');
var amisEditorCore = require('amis-editor-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var DataPickerControl = /** @class */ (function (_super) {
    tslib.__extends(DataPickerControl, _super);
    function DataPickerControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataPickerControl.prototype.handleConfirm = function (value) {
        this.props.onChange(value);
    };
    DataPickerControl.prototype.handlePickerOpen = function () {
        var _a;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _b, manager, node, variables;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, manager = _b.manager, node = _b.node;
                        variables = (_a = this.props.variables) !== null && _a !== void 0 ? _a : this.props.data.variables;
                        if (!!variables) return [3 /*break*/, 2];
                        return [4 /*yield*/, manager.getContextSchemas(node.info.id)];
                    case 1:
                        _c.sent();
                        variables = manager.dataSchema.getDataPropsAsOptions();
                        _c.label = 2;
                    case 2: return [2 /*return*/, {
                            variables: variables.map(function (item) { return (tslib.__assign(tslib.__assign({}, item), { selectMode: 'tree' })); }),
                            variableMode: 'tree'
                        }];
                }
            });
        });
    };
    DataPickerControl.prototype.render = function () {
        var _a = this.props; _a.classnames; var value = _a.value, onChange = _a.onChange, disabled = _a.disabled; _a.manager; _a.node;
        return (React__default["default"].createElement(amis.FormulaPicker, tslib.__assign({}, this.props, { onPickerOpen: this.handlePickerOpen, evalMode: false, onConfirm: this.handleConfirm, value: value, onChange: function () { }, header: '' }), function (_a) {
            var onClick = _a.onClick;
            return (React__default["default"].createElement(amis.InputBox, { className: "ae-InputVariable", clearable: false, value: value, onChange: onChange, disabled: disabled },
                React__default["default"].createElement("span", { onClick: onClick },
                    React__default["default"].createElement(amis.Icon, { icon: "info", className: "icon" }))));
        }));
    };
    tslib.__decorate([
        amisEditorCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [String]),
        tslib.__metadata("design:returntype", void 0)
    ], DataPickerControl.prototype, "handleConfirm", null);
    tslib.__decorate([
        amisEditorCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", Promise)
    ], DataPickerControl.prototype, "handlePickerOpen", null);
    return DataPickerControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(DataPickerControlRenderer, _super);
    function DataPickerControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataPickerControlRenderer = tslib.__decorate([
        amis.FormItem({
            type: 'ae-DataPickerControl',
            renderLabel: false
        })
    ], DataPickerControlRenderer);
    return DataPickerControlRenderer;
})(DataPickerControl));
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
