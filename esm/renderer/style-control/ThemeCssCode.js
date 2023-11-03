/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __decorate, __read } from 'tslib';
import React__default, { useRef, useState, useEffect } from 'react';
import { Editor, Overlay, PopOver } from 'amis-ui';
import { FormItem } from 'amis-core';
import { parse } from 'amis-postcss';
import isObject from 'lodash/isObject';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import '../../icons/index.js';
import { i18n } from 'i18n-runtime';
import { Icon } from 'amis-editor-core';

var editorPlaceholder = i18n("0552d08957a270160d5203e0611661b2");
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
  var data = props.data,
    onBulkChange = props.onBulkChange;
  var wrapperCustomStyle = data.wrapperCustomStyle;
  var ref = useRef(null);
  var _a = __read(useState(false), 2),
    showEditor = _a[0],
    setShowEditor = _a[1];
  var _b = __read(useState(''), 2),
    value = _b[0],
    setValue = _b[1];
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
        } else {
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
      var prop = node.prop,
        value = node.value,
        selector = node.selector;
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
      var style = parse(value);
      var newStyle = getStyle(style);
      onBulkChange && onBulkChange({
        wrapperCustomStyle: newStyle
      });
    } catch (error) {}
  });
  function handleChange(value) {
    editorChange(value);
    setValue(value);
  }
  return React__default.createElement(React__default.Fragment, null, React__default.createElement("div", {
    ref: ref,
    className: "ThemeCssCode"
  }, React__default.createElement("a", {
    onClick: handleShowEditor,
    className: "ThemeCssCode-button ThemeCssCode-icon"
  }, React__default.createElement(Icon, {
    icon: "expand-alt",
    className: "icon"
  })), React__default.createElement("div", {
    className: "ThemeCssCode-editor-wrap",
    style: {
      height: '180px'
    }
  }, React__default.createElement(Editor, {
    className: "ThemeCssCode-custom-editor",
    value: value,
    placeholder: editorPlaceholder,
    language: "scss",
    onChange: handleChange,
    options: editorOptions
  }))), React__default.createElement(Overlay, {
    container: document.body,
    placement: "left",
    target: ref.current,
    show: showEditor,
    rootClose: false
  }, React__default.createElement(PopOver, {
    overlay: true,
    onHide: function () {
      return setShowEditor(false);
    }
  }, React__default.createElement("div", {
    className: "ThemeCssCode-editor"
  }, React__default.createElement("div", {
    className: "ThemeCssCode-editor-title"
  }, i18n("aaf9656ba493b58fbab398d52efa9f7c")), React__default.createElement("div", {
    className: "ThemeCssCode-editor-close"
  }, React__default.createElement("a", {
    onClick: function () {
      return setShowEditor(false);
    },
    className: "ThemeCssCode-icon"
  }, React__default.createElement(Icon, {
    icon: "close",
    className: "icon"
  }))), React__default.createElement("div", {
    className: "ThemeCssCode-editor-content"
  }, React__default.createElement("div", {
    className: "ThemeCssCode-editor-wrap",
    style: {
      height: '460px'
    }
  }, React__default.createElement(Editor, {
    value: value,
    placeholder: editorPlaceholder,
    language: "scss",
    onChange: handleChange,
    options: editorOptions
  })))))));
}
/** @class */(function (_super) {
  __extends(ThemeCssCodeRenderer, _super);
  function ThemeCssCodeRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ThemeCssCodeRenderer.prototype.render = function () {
    return React__default.createElement(ThemeCssCode, __assign({}, this.props));
  };
  ThemeCssCodeRenderer = __decorate([FormItem({
    type: 'theme-cssCode',
    strictMode: false
  })], ThemeCssCodeRenderer);
  return ThemeCssCodeRenderer;
})(React__default.Component);
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
