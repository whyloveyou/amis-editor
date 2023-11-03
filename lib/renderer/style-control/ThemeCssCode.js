/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amisUi = require('amis-ui');
var amisCore = require('amis-core');
var amisPostcss = require('amis-postcss');
var isObject = require('lodash/isObject');
var debounce = require('lodash/debounce');
var isEmpty = require('lodash/isEmpty');
require('../../icons/index.js');
var i18nRuntime = require('i18n-runtime');
var amisEditorCore = require('amis-editor-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isObject__default = /*#__PURE__*/_interopDefaultLegacy(isObject);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var isEmpty__default = /*#__PURE__*/_interopDefaultLegacy(isEmpty);

var editorPlaceholder = i18nRuntime.i18n("0552d08957a270160d5203e0611661b2");
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
  var ref = React.useRef(null);
  var _a = tslib.__read(React.useState(false), 2),
    showEditor = _a[0],
    setShowEditor = _a[1];
  var _b = tslib.__read(React.useState(''), 2),
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
    if (isEmpty__default["default"](data)) {
      return '';
    }
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        if (isObject__default["default"](data[key])) {
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
  React.useEffect(function () {
    setValue(getCssAndSetValue(wrapperCustomStyle, '', 0));
  }, []);
  function handleShowEditor() {
    setShowEditor(true);
  }
  // 递归获取自定义样式
  function getStyle(style) {
    var newStyle = {};
    if (isEmpty__default["default"](style)) {
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
  var editorChange = debounce__default["default"](function (value) {
    try {
      var style = amisPostcss.parse(value);
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
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("div", {
    ref: ref,
    className: "ThemeCssCode"
  }, React__default["default"].createElement("a", {
    onClick: handleShowEditor,
    className: "ThemeCssCode-button ThemeCssCode-icon"
  }, React__default["default"].createElement(amisEditorCore.Icon, {
    icon: "expand-alt",
    className: "icon"
  })), React__default["default"].createElement("div", {
    className: "ThemeCssCode-editor-wrap",
    style: {
      height: '180px'
    }
  }, React__default["default"].createElement(amisUi.Editor, {
    className: "ThemeCssCode-custom-editor",
    value: value,
    placeholder: editorPlaceholder,
    language: "scss",
    onChange: handleChange,
    options: editorOptions
  }))), React__default["default"].createElement(amisUi.Overlay, {
    container: document.body,
    placement: "left",
    target: ref.current,
    show: showEditor,
    rootClose: false
  }, React__default["default"].createElement(amisUi.PopOver, {
    overlay: true,
    onHide: function () {
      return setShowEditor(false);
    }
  }, React__default["default"].createElement("div", {
    className: "ThemeCssCode-editor"
  }, React__default["default"].createElement("div", {
    className: "ThemeCssCode-editor-title"
  }, i18nRuntime.i18n("aaf9656ba493b58fbab398d52efa9f7c")), React__default["default"].createElement("div", {
    className: "ThemeCssCode-editor-close"
  }, React__default["default"].createElement("a", {
    onClick: function () {
      return setShowEditor(false);
    },
    className: "ThemeCssCode-icon"
  }, React__default["default"].createElement(amisEditorCore.Icon, {
    icon: "close",
    className: "icon"
  }))), React__default["default"].createElement("div", {
    className: "ThemeCssCode-editor-content"
  }, React__default["default"].createElement("div", {
    className: "ThemeCssCode-editor-wrap",
    style: {
      height: '460px'
    }
  }, React__default["default"].createElement(amisUi.Editor, {
    value: value,
    placeholder: editorPlaceholder,
    language: "scss",
    onChange: handleChange,
    options: editorOptions
  })))))));
}
/** @class */(function (_super) {
  tslib.__extends(ThemeCssCodeRenderer, _super);
  function ThemeCssCodeRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  ThemeCssCodeRenderer.prototype.render = function () {
    return React__default["default"].createElement(ThemeCssCode, tslib.__assign({}, this.props));
  };
  ThemeCssCodeRenderer = tslib.__decorate([amisCore.FormItem({
    type: 'theme-cssCode',
    strictMode: false
  })], ThemeCssCodeRenderer);
  return ThemeCssCodeRenderer;
})(React__default["default"].Component);
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
