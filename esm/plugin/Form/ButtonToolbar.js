/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, translateSchema, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { BUTTON_DEFAULT_ACTION } from '../../component/BaseControl.js';
import { i18n } from 'i18n-runtime';

var ButtonToolbarControlPlugin = /** @class */function (_super) {
  __extends(ButtonToolbarControlPlugin, _super);
  function ButtonToolbarControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'button-toolbar';
    _this.$schema = '/schemas/ButtonToolbarControlSchema.json';
    // 组件名称
    _this.name = i18n("f05dd80af77a441216ef940e7887a8db");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-ellipsis-h';
    _this.pluginIcon = 'btn-toolbar-plugin';
    _this.description = i18n("433e2e80ec74563daf4368e59b525e34");
    _this.docLink = '/amis/zh-CN/components/form/button-toolbar';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'button-toolbar',
      label: i18n("f05dd80af77a441216ef940e7887a8db"),
      buttons: [__assign({
        type: 'button',
        label: i18n("e9d2f66bbd44c96a3e03494bf6b1ebf0")
      }, BUTTON_DEFAULT_ACTION), __assign({
        type: 'button',
        label: i18n("ce35a17d2ba7caac95092a7a66ac9a0d")
      }, BUTTON_DEFAULT_ACTION)]
    };
    _this.previewSchema = {
      type: 'form',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: __assign({}, _this.scaffold)
    };
    // 容器配置
    _this.regions = [{
      key: 'buttons',
      label: i18n("3b49c8cece3f495f0e76b73823c68bfa"),
      preferTag: i18n("fa966345577ba81af19408f203db968f"),
      renderMethod: 'renderButtons'
    }];
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("012f602372cd2dbd639cd966c63e1f90");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('label'), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('description'), getSchemaTpl('combo-container', {
            type: 'combo',
            label: i18n("66774850742a81e8b2393195290b7330"),
            name: 'buttons',
            mode: 'normal',
            multiple: true,
            addable: true,
            minLength: 1,
            draggable: true,
            editable: false,
            pipeIn: function (value) {
              return translateSchema(value);
            },
            items: [{
              type: 'tpl',
              inline: false,
              className: 'p-t-xs',
              tpl: "<span class=\"label label-default\"><% if (data.type === \"button-group\") { %> ".concat(i18n("c8caf94205105bac5833ab31cc2129d7"), " <% } else { %><%= data.label %><% if (data.icon) { %><i class=\"<%= data.icon %>\"/><% }%><% } %></span>")
            }],
            addButtonText: i18n("f9f2b9cc91cd332db6b2b732c3869233"),
            scaffold: {
              type: 'button',
              label: i18n("fa966345577ba81af19408f203db968f")
            }
          })]
        }, getSchemaTpl('status')])]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('formItemMode'), getSchemaTpl('horizontal', {
            label: '',
            visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
          })]
        }, getSchemaTpl('style:classNames', {
          isFormItem: true,
          unsupportStatic: true,
          schema: [getSchemaTpl('className', {
            label: i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
            name: 'descriptionClassName',
            visibleOn: 'this.description'
          })]
        })])]
      }]);
    };
    return _this;
  }
  ButtonToolbarControlPlugin.id = 'ButtonToolbarControlPlugin';
  ButtonToolbarControlPlugin.scene = ['layout'];
  return ButtonToolbarControlPlugin;
}(BasePlugin);
registerEditorPlugin(ButtonToolbarControlPlugin);

export { ButtonToolbarControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
