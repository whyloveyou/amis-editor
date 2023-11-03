/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var React = require('react');
var amisEditorCore = require('amis-editor-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var DataMappingControl = /** @class */ (function (_super) {
    tslib.__extends(DataMappingControl, _super);
    function DataMappingControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataMappingControl.prototype.renderValue = function (value, onChange, schema) {
        var render = this.props.render;
        return render('value', amisEditorCore.getSchemaTpl('DataPickerControl', {
            inputOnly: true,
            name: 'any'
        }), {
            value: value,
            onChange: onChange
        });
    };
    DataMappingControl.prototype.render = function () {
        var _a = this.props, schema = _a.schema, render = _a.render, name = _a.name, description = _a.description, required = _a.required, rest = tslib.__rest(_a, ["schema", "render", "name", "description", "required"]);
        return render('inner', {
            type: 'json-schema',
            schema: schema,
            name: name,
            description: description,
            required: required
        }, tslib.__assign(tslib.__assign({}, rest), { renderValue: this.renderValue }));
        // return (
        //   <InputJSONSchema
        //     {...rest}
        //     schema={this.state.schema}
        //     renderValue={this.renderValue}
        //   />
        // );
    };
    tslib.__decorate([
        amisEditorCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Function, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], DataMappingControl.prototype, "renderValue", null);
    return DataMappingControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(DataMappingControlRenderer, _super);
    function DataMappingControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataMappingControlRenderer = tslib.__decorate([
        amis.Renderer({
            type: 'ae-DataMappingControl'
        })
    ], DataMappingControlRenderer);
    return DataMappingControlRenderer;
})(DataMappingControl));

exports.DataMappingControl = DataMappingControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
