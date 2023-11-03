/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

var LinkPlugin = /** @class */function (_super) {
  tslib.__extends(LinkPlugin, _super);
  function LinkPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'link';
    _this.$schema = '/schemas/LinkSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("bfe68d5844f8e54602760e18f45954f7");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("6dfe63d8c039df37787c87afe4c68604");
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-link';
    _this.pluginIcon = 'url-plugin';
    _this.scaffold = {
      type: 'link',
      value: 'http://www.baidu.com/'
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      label: _this.name
    });
    _this.panelTitle = i18nRuntime.i18n("bfe68d5844f8e54602760e18f45954f7");
    _this.panelJustify = true;
    _this.panelBody = [amisEditorCore.getSchemaTpl('tabs', [{
      title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
      body: amisEditorCore.getSchemaTpl('collapseGroup', [{
        title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
        body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), amisEditorCore.getSchemaTpl('valueFormula', {
          name: 'href',
          label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6ab20dc4b64021b85886ad9c12b6e0cc"), i18nRuntime.i18n("78ce29fdc55e6d0980b591a264c537a8")),
          rendererSchema: {
            type: 'input-text'
          }
        }), {
          label: amisEditorCore.tipedLabel(i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"), i18nRuntime.i18n("5d809212900f3bc3ba122fe93638394d")),
          type: 'ae-textareaFormulaControl',
          mode: 'normal',
          pipeIn: function (value, data) {
            return value || data && data.html;
          },
          name: 'body'
        }, amisEditorCore.getSchemaTpl('switch', {
          name: 'blank',
          label: i18nRuntime.i18n("88a5126f6a1463fc9986b590ee4ab99f")
        }), amisEditorCore.getSchemaTpl('iconLink', {
          name: 'icon',
          label: i18nRuntime.i18n("c182ad6b97f0909596a523b1f04c28d2")
        }), amisEditorCore.getSchemaTpl('iconLink', {
          name: 'rightIcon',
          label: i18nRuntime.i18n("ad7e6f016bc1d9a9bbc6e18224d73247")
        })]
      }, amisEditorCore.getSchemaTpl('status', {
        disabled: true
      }), amisEditorCore.getSchemaTpl('collapseGroup', [{
        title: i18nRuntime.i18n("e370757f933a8ecd87bf0255c3ce45d0"),
        body: [{
          name: 'htmlTarget',
          type: 'input-text',
          label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6be15e9949e4be7fc485e1eaae472942"), i18nRuntime.i18n("e35dbea2b0c097d7fb76173da0e0bba1"))
        }]
      }])])
    }, {
      title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:classNames', {
        isFormItem: false,
        schema: [amisEditorCore.getSchemaTpl('className', {
          name: 'iconClassName',
          label: i18nRuntime.i18n("c182ad6b97f0909596a523b1f04c28d2"),
          visibleOn: 'this.icon'
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'rightIconClassName',
          label: i18nRuntime.i18n("ad7e6f016bc1d9a9bbc6e18224d73247"),
          visibleOn: 'this.rightIcon'
        })]
      })])
    }])];
    return _this;
  }
  LinkPlugin.id = 'LinkPlugin';
  LinkPlugin.scene = ['layout'];
  return LinkPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(LinkPlugin);

exports.LinkPlugin = LinkPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
