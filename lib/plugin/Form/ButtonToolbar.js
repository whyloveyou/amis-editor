/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var BaseControl = require('../../component/BaseControl.js');
var i18nRuntime = require('i18n-runtime');

var ButtonToolbarControlPlugin = /** @class */function (_super) {
  tslib.__extends(ButtonToolbarControlPlugin, _super);
  function ButtonToolbarControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'button-toolbar';
    _this.$schema = '/schemas/ButtonToolbarControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("f05dd80af77a441216ef940e7887a8db");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-ellipsis-h';
    _this.pluginIcon = 'btn-toolbar-plugin';
    _this.description = i18nRuntime.i18n("433e2e80ec74563daf4368e59b525e34");
    _this.docLink = '/amis/zh-CN/components/form/button-toolbar';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'button-toolbar',
      label: i18nRuntime.i18n("f05dd80af77a441216ef940e7887a8db"),
      buttons: [tslib.__assign({
        type: 'button',
        label: i18nRuntime.i18n("e9d2f66bbd44c96a3e03494bf6b1ebf0")
      }, BaseControl.BUTTON_DEFAULT_ACTION), tslib.__assign({
        type: 'button',
        label: i18nRuntime.i18n("ce35a17d2ba7caac95092a7a66ac9a0d")
      }, BaseControl.BUTTON_DEFAULT_ACTION)]
    };
    _this.previewSchema = {
      type: 'form',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: tslib.__assign({}, _this.scaffold)
    };
    // 容器配置
    _this.regions = [{
      key: 'buttons',
      label: i18nRuntime.i18n("3b49c8cece3f495f0e76b73823c68bfa"),
      preferTag: i18nRuntime.i18n("fa966345577ba81af19408f203db968f"),
      renderMethod: 'renderButtons'
    }];
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("012f602372cd2dbd639cd966c63e1f90");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('combo-container', {
            type: 'combo',
            label: i18nRuntime.i18n("66774850742a81e8b2393195290b7330"),
            name: 'buttons',
            mode: 'normal',
            multiple: true,
            addable: true,
            minLength: 1,
            draggable: true,
            editable: false,
            pipeIn: function (value) {
              return amisEditorCore.translateSchema(value);
            },
            items: [{
              type: 'tpl',
              inline: false,
              className: 'p-t-xs',
              tpl: "<span class=\"label label-default\"><% if (data.type === \"button-group\") { %> ".concat(i18nRuntime.i18n("c8caf94205105bac5833ab31cc2129d7"), " <% } else { %><%= data.label %><% if (data.icon) { %><i class=\"<%= data.icon %>\"/><% }%><% } %></span>")
            }],
            addButtonText: i18nRuntime.i18n("f9f2b9cc91cd332db6b2b732c3869233"),
            scaffold: {
              type: 'button',
              label: i18nRuntime.i18n("fa966345577ba81af19408f203db968f")
            }
          })]
        }, amisEditorCore.getSchemaTpl('status')])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('formItemMode'), amisEditorCore.getSchemaTpl('horizontal', {
            label: '',
            visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
          })]
        }, amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: true,
          unsupportStatic: true,
          schema: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
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
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ButtonToolbarControlPlugin);

exports.ButtonToolbarControlPlugin = ButtonToolbarControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
