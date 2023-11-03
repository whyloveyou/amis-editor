/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');

function InputComponentName(props) {
    var value = props.value, onChange = props.onChange, render = props.render, name = props.name, node = props.node, placeholder = props.placeholder;
    var _a = tslib.__read(React.useState([]), 2), options = _a[0], setOptions = _a[1];
    React.useEffect(function () {
        var thisComp = node === null || node === void 0 ? void 0 : node.getComponent();
        var scoped = thisComp === null || thisComp === void 0 ? void 0 : thisComp.context;
        var comps = [];
        while (scoped === null || scoped === void 0 ? void 0 : scoped.getComponents) {
            scoped.getComponents().forEach(function (c) {
                if (c.props.name && c !== thisComp) {
                    // todo 把孩子节点拼装成 xxx.xxx
                    comps.push(c.props.name);
                }
            });
            scoped = scoped.parent;
        }
        setOptions(comps);
    }, [node]);
    function onInnerChange(value) {
        onChange(value);
        return false;
    }
    return render('inner', {
        type: 'input-text',
        name: name,
        placeholder: placeholder
    }, {
        value: value,
        onChange: onInnerChange,
        options: options
    });
}

exports.InputComponentName = InputComponentName;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
