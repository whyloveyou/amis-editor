/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var amisEditorCore = require('amis-editor-core');
var BaseControl = require('../component/BaseControl.js');
var i18nRuntime = require('i18n-runtime');

amisEditorCore.setSchemaTpl('remark', BaseControl.remarkTpl({
  name: 'remark',
  label: i18nRuntime.i18n("ff255db9b108589abd5c649e2a02e3f1"),
  labelRemark: i18nRuntime.i18n("9e783b34207fe24bc488136faba65442")
}));
amisEditorCore.setSchemaTpl('labelRemark', BaseControl.remarkTpl({
  name: 'labelRemark',
  label: i18nRuntime.i18n("3ba265c6b63bde0319822afd6b9a649d"),
  labelRemark: i18nRuntime.i18n("7ad83bbe4646a0011ece7fd338d1e189")
}));
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
