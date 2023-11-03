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

var VideoPlugin = /** @class */function (_super) {
  tslib.__extends(VideoPlugin, _super);
  function VideoPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'video';
    _this.$schema = '/schemas/VideoSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("7fcf42edf5817042904f4a122ff77582");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("1d5bbe0ab0d90a223c162fb375997a98");
    _this.docLink = '/amis/zh-CN/components/video';
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-video-camera';
    _this.pluginIcon = 'video-plugin';
    _this.scaffold = {
      type: 'video',
      autoPlay: false,
      src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
      poster: amisEditorCore.mockValue({
        type: 'image'
      })
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = i18nRuntime.i18n("7fcf42edf5817042904f4a122ff77582");
    _this.panelBody = [amisEditorCore.getSchemaTpl('tabs', [{
      title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), {
        name: 'src',
        type: 'input-text',
        label: i18nRuntime.i18n("f50bc38cf567e68250a8d15edfd8eb27"),
        description: i18nRuntime.i18n("733dda7842619a437b2486f6f71b0c10")
      }, {
        name: 'poster',
        type: 'input-text',
        label: i18nRuntime.i18n("fb103fc64a0caeec24c707b9e7b50870"),
        description: i18nRuntime.i18n("828f83110677bab8ef940f79f77b9049")
      }, amisEditorCore.getSchemaTpl('switch', {
        name: 'autoPlay',
        label: i18nRuntime.i18n("54c6bb48170611ec995f634319312156")
      }), amisEditorCore.getSchemaTpl('switch', {
        name: 'muted',
        label: i18nRuntime.i18n("351cb1f8ffbcc9d2d4c1f35505e15864")
      }), amisEditorCore.getSchemaTpl('switch', {
        name: 'isLive',
        label: i18nRuntime.i18n("c7638cec349cb86eaeaeb983909fae0e"),
        labelRemark: {
          className: 'm-l-xs',
          trigger: 'click',
          rootClose: true,
          placement: 'left',
          content: i18nRuntime.i18n("82f5f7bf3fb529360947cbb3b988037f")
        }
      })]
    }, {
      title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [{
        name: 'aspectRatio',
        label: i18nRuntime.i18n("df0134afa26415a560ae1320dee10c19"),
        type: 'button-group-select',
        size: 'sm',
        mode: 'inline',
        className: 'block',
        value: 'auto',
        options: [{
          label: i18nRuntime.i18n("3aed2c11e95a9c0ea1d853d4aee72e8c"),
          value: 'auto'
        }, {
          label: '4:3',
          value: '4:3'
        }, {
          label: '16:9',
          value: '16:9'
        }]
      }, amisEditorCore.getSchemaTpl('switch', {
        name: 'splitPoster',
        label: i18nRuntime.i18n("0d682d277649d8c7952d36f836619a44")
      }), amisEditorCore.getSchemaTpl('className')]
    }, {
      title: i18nRuntime.i18n("33bf801796fd255b5f6147e33146669b"),
      body: [amisEditorCore.getSchemaTpl('visible')]
    }, {
      title: i18nRuntime.i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
      body: [amisEditorCore.getSchemaTpl('ref'), {
        type: 'input-text',
        name: 'rates',
        label: i18nRuntime.i18n("ee1600dfbd6f9e86ca8761cf3fcf6a17"),
        multiple: true,
        joinValues: false,
        extractValue: true,
        options: [0.5, 1, 1.25, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(function (item) {
          return {
            label: item,
            value: item
          };
        })
      }, {
        name: 'frames',
        type: 'input-text',
        label: i18nRuntime.i18n("8e7124c3069460d4a8a04c3e3d9ce752"),
        description: i18nRuntime.i18n("1fc7d723b3a82ce32bfbbfa0a1761969")
      }]
    }])];
    return _this;
  }
  VideoPlugin.prototype.filterProps = function (props) {
    props.frames = amisEditorCore.JSONPipeOut(props.frames);
    return props;
  };
  VideoPlugin.id = 'VideoPlugin';
  return VideoPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(VideoPlugin);

exports.VideoPlugin = VideoPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
