/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var pick = require('lodash/pick');
var mapValues = require('lodash/mapValues');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var mapValues__default = /*#__PURE__*/_interopDefaultLegacy(mapValues);

/**
 * @file Display
 * @description 布局展示相关控件
 */
var Display = function (props) {
  var onChange = props.onChange,
    value = props.value,
    render = props.render;
  // 下拉菜单通用渲染
  var menuTpl = {
    type: 'html',
    html: "<span>${label}</span><code class='ae-Code'>${value}</code>",
    className: 'ae-selection-code'
  };
  var displayContext = pick__default["default"](amisEditorCore.isObject(value) ? value : {}, ['display', 'flexWrap', 'flexDirection', 'justifyContent', 'alignItems']);
  if (!displayContext.display) {
    displayContext.display = 'default';
  }
  var handleSubmit = function (form, action) {
    var displayValue = form.display === 'flex' ? form : mapValues__default["default"](displayContext, function (value, key) {
      // 非flex布局/默认布局需要把不相关的参数干掉
      return key !== 'display' || key === 'display' && form[key] === 'default' ? undefined : form[key];
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(tslib.__assign(tslib.__assign({}, value), displayValue));
  };
  return React__default["default"].createElement(React__default["default"].Fragment, null, render('inner', {
    type: 'form',
    wrapWithPanel: false,
    panelClassName: 'border-none shadow-none mb-0',
    bodyClassName: 'p-none',
    actionsClassName: 'border-none mt-2.5',
    wrapperComponent: 'div',
    formLazyChange: true,
    preventEnterSubmit: true,
    submitOnChange: true,
    body: [{
      label: i18nRuntime.i18n("a5d833839a610994dc4752e2d91f4192"),
      name: 'display',
      type: 'select',
      mode: 'row',
      menuTpl: menuTpl,
      options: [{
        label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
        value: 'default'
      }, {
        label: i18nRuntime.i18n("2c86d897c71cc9c2e648222a200d5bbb"),
        icon: 'display-block',
        value: 'block'
      }, {
        label: i18nRuntime.i18n("0b0052c532b457b2d032c9f56af9e4e5"),
        icon: 'display-inline-block',
        value: 'inline-block'
      }, {
        label: i18nRuntime.i18n("70d457cd36de1acefe7d9587f3f862c9"),
        icon: 'display-inline',
        value: 'inline'
      }, {
        label: i18nRuntime.i18n("b5f55e5c7101d9be5218d63850e1ad8b"),
        icon: 'display-flex',
        value: 'flex'
      }]
    }, {
      type: 'wrapper',
      visibleOn: "this.display === 'flex'",
      className: 'ae-Display-group',
      body: [{
        type: 'tpl',
        tpl: i18nRuntime.i18n("a648bd0b9eb3c86e39cabeac484917a5"),
        className: 'text-base font-bold mb-1'
      }, {
        label: i18nRuntime.i18n("452dba7c65211630f8066b070fdf157f"),
        name: 'flexWrap',
        type: 'switch',
        trueValue: 'wrap',
        falseValue: 'nowrap',
        mode: 'row',
        inputClassName: 'inline-flex justify-between flex-row-reverse',
        clearValueOnHidden: true
      }, {
        label: i18nRuntime.i18n("098d946b6f0cc85110c54cfac8691cc3"),
        name: 'flexDirection',
        type: 'select',
        clearValueOnHidden: true,
        menuTpl: menuTpl,
        options: [{
          label: i18nRuntime.i18n("aee1aeb8d65547f8a368bd7364cacf12"),
          value: 'row',
          icon: 'drow'
        }, {
          label: i18nRuntime.i18n("4c38eb0fea71a9506fd434a7ac5cb1c2"),
          value: 'column',
          icon: 'dcolumn'
        }, {
          label: i18nRuntime.i18n("ae07817b441091793c8af39256908373"),
          value: 'row-reverse',
          icon: 'drowReverse'
        }, {
          label: i18nRuntime.i18n("618515fd68ecfc4a5b58462f0cb9666b"),
          value: 'column-reverse',
          icon: 'dcolumnReverse'
        }]
      }, {
        label: i18nRuntime.i18n("58554717be87c1f8a6d6c769f74f0679"),
        type: 'select',
        name: 'justifyContent',
        clearValueOnHidden: true,
        menuTpl: menuTpl,
        options: [{
          label: i18nRuntime.i18n("4ba6c2256050d805ae5cd1e0e84737cf"),
          value: 'flex-start'
        }, {
          label: i18nRuntime.i18n("56c17ba6a56c01706ae00a31611deb03"),
          value: 'center'
        }, {
          label: i18nRuntime.i18n("abeb360ab1e66534a041fb8b44e1a00e"),
          value: 'flex-end'
        }, {
          label: i18nRuntime.i18n("dfc71567fb75f5c73da377013a223168"),
          value: 'space-around'
        }, {
          label: i18nRuntime.i18n("eb5ec10ef70689996dd5cd66e17a64aa"),
          value: 'space-between'
        }, {
          label: i18nRuntime.i18n("ba3a7db7cc1ac5a908358f62fdbb21de"),
          value: 'space-evenly'
        }, {
          label: i18nRuntime.i18n("7ac1519928de413cfe36f5d2e0610430"),
          value: 'stretch'
        }]
      }, {
        label: i18nRuntime.i18n("f6cbf29fdb5e94052a22986533c7267f"),
        type: 'select',
        name: 'alignItems',
        clearValueOnHidden: true,
        menuTpl: menuTpl,
        options: [{
          label: i18nRuntime.i18n("4ba6c2256050d805ae5cd1e0e84737cf"),
          value: 'flex-start'
        }, {
          label: i18nRuntime.i18n("56c17ba6a56c01706ae00a31611deb03"),
          value: 'center'
        }, {
          label: i18nRuntime.i18n("abeb360ab1e66534a041fb8b44e1a00e"),
          value: 'flex-end'
        }, {
          label: i18nRuntime.i18n("ed97c73866617b40a7b1215867e0f489"),
          value: 'baseline'
        }, {
          label: i18nRuntime.i18n("7ac1519928de413cfe36f5d2e0610430"),
          value: 'stretch'
        }]
      }]
    }]
  }, {
    data: displayContext,
    onSubmit: handleSubmit
  }));
};
/** @class */(function (_super) {
  tslib.__extends(DisplayRenderer, _super);
  function DisplayRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  DisplayRenderer.prototype.render = function () {
    return React__default["default"].createElement(Display, tslib.__assign({}, this.props));
  };
  DisplayRenderer = tslib.__decorate([amis.FormItem({
    type: 'style-display'
  })], DisplayRenderer);
  return DisplayRenderer;
})(React__default["default"].Component);
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
