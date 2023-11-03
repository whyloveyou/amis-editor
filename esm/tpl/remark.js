/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { setSchemaTpl } from 'amis-editor-core';
import { remarkTpl } from '../component/BaseControl.js';
import { i18n } from 'i18n-runtime';

setSchemaTpl('remark', remarkTpl({
  name: 'remark',
  label: i18n("ff255db9b108589abd5c649e2a02e3f1"),
  labelRemark: i18n("9e783b34207fe24bc488136faba65442")
}));
setSchemaTpl('labelRemark', remarkTpl({
  name: 'labelRemark',
  label: i18n("3ba265c6b63bde0319822afd6b9a649d"),
  labelRemark: i18n("7ad83bbe4646a0011ece7fd338d1e189")
}));
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
