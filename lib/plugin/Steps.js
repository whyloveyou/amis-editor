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

var StepsPlugin = /** @class */function (_super) {
  tslib.__extends(StepsPlugin, _super);
  function StepsPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'steps';
    _this.$schema = '/schemas/StepsSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("87d88a457161f2a09f95f6aa29b38051");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-forward';
    _this.pluginIcon = 'steps-plugin';
    _this.description = i18nRuntime.i18n("aacb2b36c47395e4b4b409e351eb4279");
    _this.docLink = '/amis/zh-CN/components/steps';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.scaffold = {
      type: 'steps',
      value: 1,
      steps: [{
        title: i18nRuntime.i18n("863a8583132d087e57aebb7d89e18a50"),
        subTitle: i18nRuntime.i18n("72cf373be86a38b29f6d2f15900b0da1"),
        description: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac")
      }, {
        title: i18nRuntime.i18n("9757f2c59c17e9aea46e0c8adb69597e")
      }, {
        title: i18nRuntime.i18n("207e30c0e7318027d521dd7c6fab6a99")
      }]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = 'Steps';
    _this.panelBody = [amisEditorCore.getSchemaTpl('tabs', [{
      title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), amisEditorCore.getSchemaTpl('combo-container', {
        name: 'steps',
        label: i18nRuntime.i18n("b8a2d347bdb22fde367a851df8335771"),
        type: 'combo',
        scaffold: {
          type: 'wrapper',
          body: i18nRuntime.i18n("bc78248b34b7bf18691e6d385e0f544b")
        },
        minLength: 2,
        multiple: true,
        draggable: true,
        items: [amisEditorCore.getSchemaTpl('title', {
          label: false,
          placeholder: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab")
        }), amisEditorCore.getSchemaTpl('stepSubTitle'), amisEditorCore.getSchemaTpl('stepDescription')]
      }), {
        name: 'value',
        type: 'input-text',
        label: i18nRuntime.i18n("59cecbff0cc77511590d2161cc3058e9"),
        description: i18nRuntime.i18n("c207ba29769aca6ffd45db9f80bcb29e")
      }, {
        name: 'status',
        type: 'select',
        label: i18nRuntime.i18n("6bf1f392c0a404d1f7558e6dcdd6c2e6"),
        creatable: true,
        value: 'finish',
        options: [{
          label: i18nRuntime.i18n("fb852fc6cce168301447d1baff276dc5"),
          value: 'process'
        }, {
          label: i18nRuntime.i18n("8797922788916874c39ee1524bbc3638"),
          value: 'wait'
        }, {
          label: i18nRuntime.i18n("769d88e425e03120b83ee4ed6b9d588e"),
          value: 'finish'
        }, {
          label: i18nRuntime.i18n("ad8e01fe719bf1a5af82ee0d100d246b"),
          value: 'error'
        }]
      }, amisEditorCore.getSchemaTpl('api', {
        name: 'source',
        label: i18nRuntime.i18n("d1f03ea8d9d3c3a241e8a340b8a384d3")
      })]
    }, {
      title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [{
        name: 'mode',
        type: 'select',
        label: i18nRuntime.i18n("f0789e79d48f135e5d870753f7a85d05"),
        value: 'horizontal',
        options: [{
          label: i18nRuntime.i18n("4cde06e6162ed66720e3133cb83bc059"),
          value: 'horizontal'
        }, {
          label: i18nRuntime.i18n("2a9a1329b191c2787b1a70c289e3bbe0"),
          value: 'vertical'
        }, {
          label: i18nRuntime.i18n("d517acb68fbed2331b57d1a11ca21dcc"),
          value: 'simple'
        }]
      }, amisEditorCore.getSchemaTpl('className')]
    }, {
      title: i18nRuntime.i18n("33bf801796fd255b5f6147e33146669b"),
      body: [amisEditorCore.getSchemaTpl('visible')]
    }])];
    return _this;
  }
  StepsPlugin.id = 'StepsPlugin';
  return StepsPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(StepsPlugin);

exports.StepsPlugin = StepsPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
