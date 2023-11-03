/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { Button } from 'amis';
import React__default from 'react';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var OperationPlugin = /** @class */function (_super) {
  __extends(OperationPlugin, _super);
  function OperationPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'operation';
    _this.$schema = '/schemas/OperationSchema.json';
    // 组件名称
    _this.name = i18n("8abc564260a1564521e0c3a1d5419b4a");
    _this.isBaseComponent = true;
    _this.description = i18n("8d79a8cbe0ed37accbe0739024d5d896");
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = '';
    _this.scaffold = {
      type: 'operation',
      label: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
      buttons: [{
        label: i18n("fa966345577ba81af19408f203db968f"),
        type: 'button'
      }]
    };
    _this.previewSchema = {
      type: 'tpl',
      tpl: i18n("8abc564260a1564521e0c3a1d5419b4a")
    };
    _this.regions = [{
      key: 'buttons',
      label: i18n("6c0fe599b36c2a55efd8705681783ee5"),
      renderMethod: 'render',
      insertPosition: 'inner',
      preferTag: i18n("fa966345577ba81af19408f203db968f")
    }];
    _this.panelTitle = i18n("8abc564260a1564521e0c3a1d5419b4a");
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('className', {
        name: 'innerClassName'
      }), {
        children: React__default.createElement(Button, {
          block: true,
          className: "m-b-sm ae-Button--enhance",
          onClick: function () {
            // this.manager.showInsertPanel('buttons', context.id, '按钮');
            _this.manager.showRendererPanel(i18n("fa966345577ba81af19408f203db968f"), i18n("975903dc39691813530e108986e49ac1"));
          }
        }, i18n("c641fe0ae06e6c0547d89fefa91e7f75"))
      }];
    };
    return _this;
  }
  OperationPlugin.prototype.buildSubRenderers = function (context, renderers) {
    if (context && context.info && context.info.renderer && (context.info.renderer.name === 'table' || context.info.renderer.name === 'crud')) {
      return _super.prototype.buildSubRenderers.apply(this, arguments);
    }
  };
  OperationPlugin.id = 'OperationPlugin';
  return OperationPlugin;
}(BasePlugin);
registerEditorPlugin(OperationPlugin);

export { OperationPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
