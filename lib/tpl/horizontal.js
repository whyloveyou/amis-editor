/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var isObject = require('lodash/isObject');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isObject__default = /*#__PURE__*/_interopDefaultLegacy(isObject);

amisEditorCore.setSchemaTpl('horizontal-align', {
  type: 'button-group-select',
  label: i18nRuntime.i18n("d4d2a66820d30e07b44c850eb3f116c0"),
  options: [{
    label: i18nRuntime.i18n("a7eaff29603a9c40927f726013d2c016"),
    value: 'left',
    icon: 'fa fa-align-left'
  }, {
    label: i18nRuntime.i18n("128d58f066a18ddb2ddb701921d5c77c"),
    value: 'right',
    icon: 'fa fa-align-right'
  }]
});
amisEditorCore.setSchemaTpl('leftFixed', {
  name: 'horizontal.leftFixed',
  type: 'button-group-select',
  visibleOn: 'data.horizontal && data.horizontal.leftFixed',
  label: i18nRuntime.i18n("c28479019e24e0e4745f4948e9e97ee7"),
  size: 'xs',
  options: [{
    label: i18nRuntime.i18n("391b8fa9c747a1799353ab856e666ad5"),
    value: 'sm'
  }, {
    label: i18nRuntime.i18n("aed1dfbc31703955e64806b799b67645"),
    value: 'normal'
  }, {
    label: i18nRuntime.i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
    value: 'lg'
  }]
});
amisEditorCore.setSchemaTpl('leftRate', {
  name: 'horizontal',
  type: 'input-range',
  visibleOn: 'data.horizontal && !data.horizontal.leftFixed',
  min: 1,
  max: 11,
  step: 1,
  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("150075376834f1879d6ceb7c2d10ec67"), i18nRuntime.i18n("34598b2c71a8affb13da84ba39e905d5")),
  pipeIn: function (v) {
    return v.left || 3;
  },
  pipeOut: function (v) {
    return {
      left: v,
      right: 12 - v
    };
  }
});
amisEditorCore.setSchemaTpl('labelAlign', {
  name: 'labelAlign',
  type: 'button-group-select',
  visibleOn: 'data.horizontal && data.horizontal.leftFixed',
  label: i18nRuntime.i18n("5e3406cb54f255dc1be5edbaa6f87389"),
  size: 'xs',
  options: [{
    label: i18nRuntime.i18n("413f48cc71f71083ce532a86e3efdc21"),
    value: 'left'
  }, {
    label: i18nRuntime.i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"),
    value: 'right'
  }]
});
amisEditorCore.setSchemaTpl('horizontal', function (config) {
  return [tslib.__assign({
    type: 'select',
    label: i18nRuntime.i18n("60e237a1b5e9a4cc3633898d527d5a38"),
    name: 'horizontal',
    options: [{
      label: i18nRuntime.i18n("2dde3029c4170a1c8e961a90766e0194"),
      value: 'formHorizontal'
    }, {
      label: i18nRuntime.i18n("ae6fa9e75d38b9db24f78496b72bcc75"),
      value: 'leftFixed'
    }, {
      label: i18nRuntime.i18n("150075376834f1879d6ceb7c2d10ec67"),
      value: 'leftRate'
    }],
    pipeIn: function (v) {
      if (!v) {
        return 'formHorizontal';
      }
      if (v.leftFixed) {
        return 'leftFixed';
      }
      return 'leftRate';
    },
    pipeOut: function (v) {
      var defaultData = {
        formHorizontal: undefined,
        leftFixed: {
          leftFixed: 'normal'
        },
        leftRate: {
          left: 3,
          right: 9
        }
      };
      // @ts-ignore
      return defaultData[v];
    },
    visibleOn: 'this.mode == "horizontal" && this.label !== false'
  }, isObject__default["default"](config) ? config : {}), amisEditorCore.getSchemaTpl('layout:wrapper-contanier', {
    visibleOn: 'this.mode == "horizontal" && this.horizontal && this.label !== false',
    body: [amisEditorCore.getSchemaTpl('leftFixed'), amisEditorCore.getSchemaTpl('leftRate'), amisEditorCore.getSchemaTpl('labelAlign')]
  })];
});
amisEditorCore.setSchemaTpl('subFormItemMode', {
  label: i18nRuntime.i18n("424f04d454332ddaff4daa0a365e9335"),
  name: 'subFormMode',
  type: 'button-group-select',
  size: 'sm',
  option: i18nRuntime.i18n("2dde3029c4170a1c8e961a90766e0194"),
  // mode: 'inline',
  // className: 'w-full',
  pipeIn: amisEditorCore.defaultValue(''),
  options: [{
    label: i18nRuntime.i18n("2dde3029c4170a1c8e961a90766e0194"),
    value: ''
  }, {
    label: i18nRuntime.i18n("fd6e80f1e0199d6ecc3ee81ae04aa9ef"),
    value: 'normal'
  }, {
    label: i18nRuntime.i18n("2dd25b8c21efbfee4a198787810d65d8"),
    value: 'inline'
  }, {
    label: i18nRuntime.i18n("4cde06e6162ed66720e3133cb83bc059"),
    value: 'horizontal'
  }]
});
amisEditorCore.setSchemaTpl('subFormHorizontalMode', {
  type: 'switch',
  label: i18nRuntime.i18n("b17754a193ac835bcae0bf960f3a3772"),
  name: 'subFormHorizontal',
  onText: i18nRuntime.i18n("2dde3029c4170a1c8e961a90766e0194"),
  offText: i18nRuntime.i18n("f1d4ff50f3828f9b73412e7d94e6dd6e"),
  inputClassName: 'text-sm',
  visibleOn: 'this.subFormMode == "horizontal"',
  pipeIn: function (value) {
    return !value;
  },
  pipeOut: function (value, originValue, data) {
    return value ? null : data.formHorizontal || {
      leftFixed: 'normal'
    };
  }
});
amisEditorCore.setSchemaTpl('subFormItemMode', {
  label: i18nRuntime.i18n("424f04d454332ddaff4daa0a365e9335"),
  name: 'subFormMode',
  type: 'button-group-select',
  size: 'sm',
  option: i18nRuntime.i18n("2dde3029c4170a1c8e961a90766e0194"),
  // mode: 'inline',
  // className: 'w-full',
  pipeIn: amisEditorCore.defaultValue(''),
  options: [{
    label: i18nRuntime.i18n("2dde3029c4170a1c8e961a90766e0194"),
    value: ''
  }, {
    label: i18nRuntime.i18n("fd6e80f1e0199d6ecc3ee81ae04aa9ef"),
    value: 'normal'
  }, {
    label: i18nRuntime.i18n("2dd25b8c21efbfee4a198787810d65d8"),
    value: 'inline'
  }, {
    label: i18nRuntime.i18n("4cde06e6162ed66720e3133cb83bc059"),
    value: 'horizontal'
  }]
});
amisEditorCore.setSchemaTpl('subFormHorizontalMode', {
  type: 'switch',
  label: i18nRuntime.i18n("b17754a193ac835bcae0bf960f3a3772"),
  name: 'subFormHorizontal',
  onText: i18nRuntime.i18n("2dde3029c4170a1c8e961a90766e0194"),
  offText: i18nRuntime.i18n("f1d4ff50f3828f9b73412e7d94e6dd6e"),
  inputClassName: 'text-sm',
  visibleOn: 'this.subFormMode == "horizontal"',
  pipeIn: function (value) {
    return !value;
  },
  pipeOut: function (value, originValue, data) {
    return value ? null : data.formHorizontal || {
      leftFixed: 'normal'
    };
  }
});
amisEditorCore.setSchemaTpl('subFormHorizontal', {
  type: 'combo',
  syncDefaultValue: false,
  visibleOn: 'data.subFormMode == "horizontal" && data.subFormHorizontal',
  name: 'subFormHorizontal',
  multiLine: true,
  pipeIn: function (value) {
    return {
      leftRate: value && typeof value.left === 'number' ? value.left : value && /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(value.left) ? parseInt(RegExp.$1, 10) : 2,
      leftFixed: value && value.leftFixed || ''
    };
  },
  pipeOut: function (value) {
    var left = Math.min(11, Math.max(1, value.leftRate || 2));
    return {
      leftFixed: value.leftFixed || '',
      left: left,
      right: 12 - left
    };
  },
  inputClassName: 'no-padder',
  items: [{
    name: 'leftFixed',
    type: 'button-group-select',
    label: i18nRuntime.i18n("2e282fb6405a60830112991f88e95753"),
    size: 'xs',
    options: [{
      label: i18nRuntime.i18n("c41b3271487a3cc63e79feeb11b11de0"),
      value: ''
    }, {
      label: i18nRuntime.i18n("0fcf69b5d0b44955fcbec9702f90b556"),
      value: 'sm',
      visibleOn: 'this.leftFixed'
    }, {
      label: i18nRuntime.i18n("b591aed69defa2abf0486da6a58dfb5e"),
      value: 'normal'
    }, {
      label: i18nRuntime.i18n("0fa590019ace86acee8d7655e5fb11b7"),
      value: 'lg',
      visibleOn: 'this.leftFixed'
    }]
  }, {
    name: 'leftRate',
    type: 'input-range',
    visibleOn: '!this.leftFixed',
    min: 1,
    max: 11,
    step: 1,
    label: i18nRuntime.i18n("51c1e80408011ba118cdcc696f28283d"),
    labelRemark: {
      trigger: 'click',
      className: 'm-l-xs',
      rootClose: true,
      content: i18nRuntime.i18n("aa0ff71cb10c3e54d68874dc2b17acaf"),
      placement: 'left'
    }
  }]
});
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
