/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import React__default from 'react';
import { Button } from 'amis';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { formItemControl } from '../../component/BaseControl.js';
import { i18n } from 'i18n-runtime';

var ControlPlugin = /** @class */function (_super) {
  __extends(ControlPlugin, _super);
  function ControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'control';
    _this.$schema = '/schemas/FormControlSchema.json';
    // 组件名称
    _this.name = i18n("61260d9386fd95a268dfc93d977c2706");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-object-group';
    _this.pluginIcon = 'form-group-plugin';
    _this.description = i18n("61260d9386fd95a268dfc93d977c2706");
    _this.docLink = '/amis/zh-CN/components/form/group';
    _this.tags = [i18n("22c799040acdb2601b437ed5449de076")];
    /**
     * 组件选择面板中隐藏，和Container合并
     */
    _this.disabledRendererPlugin = true;
    _this.scaffold = {
      type: 'control',
      label: i18n("61260d9386fd95a268dfc93d977c2706"),
      body: [{
        type: 'tpl',
        wrapperComponent: '',
        tpl: 'a'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    // 容器配置
    _this.regions = [{
      key: 'body',
      label: i18n("c5739a29e7c403fc212608cefe70cf29"),
      preferTag: i18n("55b45c73ae417c4dead67905b1550e85")
    }];
    _this.panelTitle = i18n("61260d9386fd95a268dfc93d977c2706");
    _this.panelBodyCreator = function (context) {
      return formItemControl({
        common: {
          replace: true,
          body: [{
            children: React__default.createElement(Button, {
              className: "m-b",
              onClick: function () {
                return _this.manager.showRendererPanel(i18n("55b45c73ae417c4dead67905b1550e85"));
              },
              level: "danger",
              tooltip: i18n("a00f44e570f896de5490cba9d2462951"),
              size: "sm",
              block: true
            }, i18n("a9a8efb2541ee6f89ea7b83e610ebf7f"))
          }, getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description')]
        }
      });
    };
    return _this;
  }
  ControlPlugin.id = 'ControlPlugin';
  return ControlPlugin;
}(BasePlugin);
registerEditorPlugin(ControlPlugin);

export { ControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
