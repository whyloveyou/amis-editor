import { __assign, __read } from "tslib";
import React, { useEffect } from 'react';
import { Modal, Button } from 'amis';
import cx from 'classnames';
import FormulaEditor from 'amis-ui/lib/components/formula/Editor';
var FormulaPicker = function (props) {
    var variables = props.variables, variableMode = props.variableMode, _a = props.evalMode, evalMode = _a === void 0 ? true : _a;
    var _b = __read(React.useState(undefined), 2), formula = _b[0], setFormula = _b[1];
    useEffect(function () {
        var initable = props.initable, value = props.value;
        if (initable) {
            setFormula(value);
        }
    }, [props.value]);
    var handleChange = function (data) {
        setFormula(data);
    };
    var handleClose = function () {
        props.onClose && props.onClose();
    };
    var handleConfirm = function () {
        props.onConfirm && props.onConfirm(formula);
    };
    return (React.createElement(Modal, { className: cx('FormulaPicker-Modal'), size: "lg", show: true, onHide: handleClose, closeOnEsc: true },
        React.createElement(Modal.Body, null,
            React.createElement(FormulaEditor, __assign({}, props, { header: props.header || '表达式', variables: variables, variableMode: variableMode, value: formula, evalMode: evalMode, onChange: handleChange }))),
        React.createElement(Modal.Footer, null,
            React.createElement(Button, { onClick: handleClose }, "\u53D6\u6D88"),
            React.createElement(Button, { onClick: handleConfirm, level: "primary" }, "\u786E\u8BA4"))));
};
export default FormulaPicker;
