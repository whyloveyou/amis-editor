/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __decorate, __spreadArray, __read } from 'tslib';
import React__default from 'react';
import mapValues from 'lodash/mapValues';
import { FormItem } from 'amis';
import { parseBoxShadow, normalizeBoxShadow } from './transformation.js';
import { i18n } from 'i18n-runtime';

/**
 * @file 阴影
 * @description 阴影配置
 * @grammar
 * x偏移量 | y偏移量 | 阴影颜色
 * x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色
 * 插页(阴影向内) | x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色
 */
function BoxShadow(_a) {
  var _b = _a.value,
    value = _b === void 0 ? '' : _b,
    onChange = _a.onChange,
    render = _a.render;
  var boxShadowContext = mapValues(parseBoxShadow(typeof value !== 'string' ? '' : value), function (value, key, collection) {
    return key === 'color' || key === 'inset' ? value : {
      length: value,
      unit: 'px'
    };
  });
  // style-box-shadow组件name需要具体指定，比如style.boxShadow，否则取不到值
  var handleSubmit = function (formValue, action) {
    onChange === null || onChange === void 0 ? void 0 : onChange(normalizeBoxShadow(formValue).boxShadow);
  };
  return React__default.createElement(React__default.Fragment, null, render('inner', {
    type: 'form',
    wrapWithPanel: false,
    panelClassName: 'border-none shadow-none mb-0',
    bodyClassName: 'p-none',
    actionsClassName: 'border-none mt-2.5',
    wrapperComponent: 'div',
    formLazyChange: true,
    preventEnterSubmit: true,
    submitOnChange: true,
    body: __spreadArray(__spreadArray([], __read([{
      name: i18n("af208c560d926f0daf4b2ce2d396505d"),
      field: 'x'
    }, {
      name: i18n("b6b46126bfb0851ca10e74541c5d7be1"),
      field: 'y'
    }, {
      name: i18n("4a32b29da68a6ee204b3743e0fab8bb3"),
      field: 'blur'
    }, {
      name: i18n("22d460dcddb7fda718bc62034c459158"),
      field: 'spread'
    }].map(function (item) {
      return {
        type: 'combo',
        name: item.field,
        label: item.name,
        formClassName: 'ae-BoxShadow-group',
        items: [{
          type: 'input-range',
          label: false,
          name: 'length',
          max: 120,
          min: 0,
          step: 1
        }, {
          type: 'select',
          label: false,
          name: 'unit',
          columnClassName: 'ae-BoxShadow-unit',
          size: 'xs',
          options: ['px']
          // TODO: 暂时先支持px
          // options: ['px', 'em', 'rem', 'vw', 'vh']
        }]
      };
    })), false), [{
      type: 'switch',
      name: 'inset',
      label: i18n("b24a723b73f96ab3340fe9502370ee13"),
      mode: 'row',
      inputClassName: 'inline-flex justify-between flex-row-reverse'
    }, {
      type: 'input-color',
      name: 'color',
      label: i18n("1cbac849ccc41edb12271d9fe9b65b5f"),
      placeholder: i18n("e94d6fc08a97892ff9d8c8d9a8d9e0ab"),
      mode: 'row'
    }], false)
  }, {
    data: boxShadowContext,
    onSubmit: handleSubmit
  }));
}
/** @class */(function (_super) {
  __extends(BoxShadowRenderer, _super);
  function BoxShadowRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  BoxShadowRenderer.prototype.render = function () {
    return React__default.createElement(BoxShadow, __assign({}, this.props));
  };
  BoxShadowRenderer = __decorate([FormItem({
    type: 'style-box-shadow'
  })], BoxShadowRenderer);
  return BoxShadowRenderer;
})(React__default.Component);

export { BoxShadow as default };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
