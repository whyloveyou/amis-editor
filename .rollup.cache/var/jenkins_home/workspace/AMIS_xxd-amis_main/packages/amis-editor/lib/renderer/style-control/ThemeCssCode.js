import { __assign, __decorate, __extends, __read } from "tslib";
/**
 * 类名输入框 + 自定义样式源码编辑器
 */
import React, { useEffect, useRef, useState } from 'react';
import { Editor, Overlay, PopOver } from 'amis-ui';
import { FormItem } from 'amis-core';
// @ts-ignore
import { parse as cssParse } from 'amis-postcss';
import isObject from 'lodash/isObject';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Icon } from '../../icons/index';
var editorPlaceholder = "\u81EA\u5B9A\u4E49\u6837\u5F0F\u4EC5\u5BF9\u5F53\u524D\u7EC4\u4EF6\u751F\u6548\u3002\u793A\u4F8B\uFF1A\n// \u5F53\u524D\u5C42\u7EA7\nroot {\n  color: #000;\n}\n// \u5B50\u5C42\u7EA7\n.text-color: {\n  color: #fff;\n}\n";
var editorOptions = {
    autoIndent: true,
    formatOnType: true,
    formatOnPaste: true,
    selectOnLineNumbers: true,
    scrollBeyondLastLine: false,
    folding: true,
    minimap: {
        enabled: false
    },
    scrollbar: {
        alwaysConsumeMouseWheel: false
    },
    bracketPairColorization: {
        enabled: true
    },
    automaticLayout: true,
    lineNumbers: 'off',
    glyphMargin: false,
    wordWrap: 'on',
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    overviewRulerBorder: false
};
function ThemeCssCode(props) {
    var data = props.data, onBulkChange = props.onBulkChange;
    var wrapperCustomStyle = data.wrapperCustomStyle;
    var ref = useRef(null);
    var _a = __read(useState(false), 2), showEditor = _a[0], setShowEditor = _a[1];
    var _b = __read(useState(''), 2), value = _b[0], setValue = _b[1];
    // 前面加上空格
    function getSpaceByDep(dep) {
        var spaces = '';
        for (var i = 0; i < dep; i++) {
            spaces += '  ';
        }
        return spaces;
    }
    function getCssAndSetValue(data, str, dep) {
        if (isEmpty(data)) {
            return '';
        }
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (isObject(data[key])) {
                    str += getSpaceByDep(dep) + "".concat(key, " {\n");
                    str += getCssAndSetValue(data[key], '', dep + 1);
                    str += getSpaceByDep(dep) + "}\n";
                    if (dep === 0) {
                        str += '\n';
                    }
                }
                else {
                    str += getSpaceByDep(dep) + "".concat(key, ": ").concat(data[key], ";\n");
                }
            }
        }
        return str;
    }
    useEffect(function () {
        setValue(getCssAndSetValue(wrapperCustomStyle, '', 0));
    }, []);
    function handleShowEditor() {
        setShowEditor(true);
    }
    // 递归获取自定义样式
    function getStyle(style) {
        var newStyle = {};
        if (isEmpty(style)) {
            return newStyle;
        }
        style.nodes.forEach(function (node) {
            var prop = node.prop, value = node.value, selector = node.selector;
            if (value) {
                newStyle[prop] = value;
                if (node.important) {
                    newStyle[prop] += ' !important';
                }
            }
            if (node.nodes) {
                newStyle[selector] = getStyle(node);
            }
        });
        return newStyle;
    }
    var editorChange = debounce(function (value) {
        try {
            var style = cssParse(value);
            var newStyle = getStyle(style);
            onBulkChange &&
                onBulkChange({
                    wrapperCustomStyle: newStyle
                });
        }
        catch (error) { }
    });
    function handleChange(value) {
        editorChange(value);
        setValue(value);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: ref, className: "ThemeCssCode" },
            React.createElement("a", { onClick: handleShowEditor, className: "ThemeCssCode-button ThemeCssCode-icon" },
                React.createElement(Icon, { icon: "expand-alt", className: "icon" })),
            React.createElement("div", { className: "ThemeCssCode-editor-wrap", style: { height: '180px' } },
                React.createElement(Editor, { className: "ThemeCssCode-custom-editor", value: value, placeholder: editorPlaceholder, language: "scss", onChange: handleChange, options: editorOptions }))),
        React.createElement(Overlay, { container: document.body, placement: "left", target: ref.current, show: showEditor, rootClose: false },
            React.createElement(PopOver, { overlay: true, onHide: function () { return setShowEditor(false); } },
                React.createElement("div", { className: "ThemeCssCode-editor" },
                    React.createElement("div", { className: "ThemeCssCode-editor-title" }, "\u7F16\u8F91\u6837\u5F0F"),
                    React.createElement("div", { className: "ThemeCssCode-editor-close" },
                        React.createElement("a", { onClick: function () { return setShowEditor(false); }, className: "ThemeCssCode-icon" },
                            React.createElement(Icon, { icon: "close", className: "icon" }))),
                    React.createElement("div", { className: "ThemeCssCode-editor-content" },
                        React.createElement("div", { className: "ThemeCssCode-editor-wrap", style: { height: '460px' } },
                            React.createElement(Editor, { value: value, placeholder: editorPlaceholder, language: "scss", onChange: handleChange, options: editorOptions }))))))));
}
var ThemeCssCodeRenderer = /** @class */ (function (_super) {
    __extends(ThemeCssCodeRenderer, _super);
    function ThemeCssCodeRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThemeCssCodeRenderer.prototype.render = function () {
        return React.createElement(ThemeCssCode, __assign({}, this.props));
    };
    ThemeCssCodeRenderer = __decorate([
        FormItem({
            type: 'theme-cssCode',
            strictMode: false
        })
    ], ThemeCssCodeRenderer);
    return ThemeCssCodeRenderer;
}(React.Component));
export { ThemeCssCodeRenderer };
