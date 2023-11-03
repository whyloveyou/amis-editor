/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

amisEditorCore.setSchemaTpl('tpl:content', amisEditorCore.getSchemaTpl('textareaFormulaControl', {
  label: i18nRuntime.i18n("edb5acdc9ee5e75fbc238ab4a0300eaf"),
  mode: 'normal',
  visibleOn: 'data.wrapperComponent !== undefined',
  pipeIn: function (value, data) {
    return value || data && data.html;
  },
  name: 'tpl'
}));
amisEditorCore.setSchemaTpl('tpl:rich-text', {
  label: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
  type: 'input-rich-text',
  mode: 'normal',
  buttons: ['paragraphFormat', 'quote', 'textColor', 'backgroundColor', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'formatOL', 'formatUL', 'align', '|', 'insertLink', 'insertImage', 'insertTable', '|', 'undo', 'redo', 'fullscreen'],
  minRows: 5,
  language: 'html',
  visibleOn: 'data.wrapperComponent === undefined',
  pipeIn: function (value, data) {
    return value || data && data.html;
  },
  name: 'tpl'
});
amisEditorCore.setSchemaTpl('tpl:wrapperComponent', {
  name: 'wrapperComponent',
  type: 'select',
  pipeIn: function (value) {
    return value === undefined ? 'rich-text' : value;
  },
  pipeOut: function (value) {
    return value === 'rich-text' ? undefined : value;
  },
  label: i18nRuntime.i18n("b1f824deef0d11e1fe3b73167a902e31"),
  options: [{
    label: i18nRuntime.i18n("74cfa7e77be335e8e5489a00ef099cb9"),
    value: ''
  }, {
    label: i18nRuntime.i18n("d482086f653d92fa8f1011d39738dba3"),
    value: 'p'
  }, {
    label: i18nRuntime.i18n("ae27115431c46fa374ac28200304f341"),
    value: 'h1'
  }, {
    label: i18nRuntime.i18n("de86106d6632da3fafb946f85ba91324"),
    value: 'h2'
  }, {
    label: i18nRuntime.i18n("27f2c5c60f373a4380ec107ad8895f0e"),
    value: 'h3'
  }, {
    label: i18nRuntime.i18n("c961174771e843ac4046b2b21c49424b"),
    value: 'h4'
  }, {
    label: i18nRuntime.i18n("a791de104833c917f801c1976b9af960"),
    value: 'h5'
  }, {
    label: i18nRuntime.i18n("de2687f9a16fea3654be84c74137b805"),
    value: 'h6'
  }, {
    label: i18nRuntime.i18n("e2591e971f4c28db7c80a5f546084a1d"),
    value: 'rich-text'
  }],
  onChange: function (value, oldValue, model, form) {
    (value === undefined || oldValue === undefined) && form.setValueByName('tpl', '');
  }
});
var TplPlugin = /** @class */function (_super) {
  tslib.__extends(TplPlugin, _super);
  function TplPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'tpl';
    _this.$schema = '/schemas/TplSchema.json';
    _this.order = -200;
    // 组件名称
    _this.name = i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-file-o';
    _this.pluginIcon = 'plain-plugin'; // 使用文字 icon
    _this.description = i18nRuntime.i18n("65862c97143c6c5479e0c623093a25d6");
    _this.docLink = '/amis/zh-CN/components/tpl';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.previewSchema = {
      type: 'tpl',
      tpl: i18nRuntime.i18n("38accbc34901ee6fd7bd7cd9f92f0a2a")
    };
    _this.scaffold = {
      type: 'tpl',
      tpl: i18nRuntime.i18n("590e147e49735ebbfc51ae2175c36eb0"),
      inline: true,
      wrapperComponent: ''
    };
    _this.panelTitle = i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733");
    _this.panelJustify = true;
    // 事件定义
    _this.events = [{
      eventName: 'click',
      eventLabel: i18nRuntime.i18n("4363c17ebb346b646af55bd8c8075915"),
      description: i18nRuntime.i18n("7af5e3ef39ff71d39fe3f645c8079124"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseenter',
      eventLabel: i18nRuntime.i18n("f6d767f39ba3bf955077a3c0ce81e581"),
      description: i18nRuntime.i18n("bcdd89d453da0dc0622a2f3189728357"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'mouseleave',
      eventLabel: i18nRuntime.i18n("e272b0b8c7fedc670a87075514d9b49f"),
      description: i18nRuntime.i18n("727309bc724ff237c5e2cdf7a90cf28e"),
      dataSchema: [{
        type: 'object',
        properties: {
          context: {
            type: 'object',
            title: i18nRuntime.i18n("50f198f07fc820a4911d1c97a0ceb8c2"),
            properties: {
              nativeEvent: {
                type: 'object',
                title: i18nRuntime.i18n("64561733c68085af3d09315c1d4d7ed6")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [];
    _this.panelBodyCreator = function (context) {
      // 在表格/CRUD/模型列表的一列里边
      var isInTable = /\/cell\/field\/tpl$/.test(context.path);
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), !isInTable ? amisEditorCore.getSchemaTpl('tpl:wrapperComponent') : null, amisEditorCore.getSchemaTpl('switch', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("2fb0853874c2cc8cc42f0c7520af662a"), i18nRuntime.i18n("47ae015d04dda362d066e4f9ac09d647")),
            name: 'inline',
            pipeIn: amisEditorCore.defaultValue(true),
            hiddenOn: 'data.wrapperComponent !== ""'
          }), {
            type: 'input-number',
            label: i18nRuntime.i18n("1f9ba0bdeb0cf0d3193cac269dd2f708"),
            name: 'maxLine',
            min: 0
          }, amisEditorCore.getSchemaTpl('tpl:content'), {
            type: 'textarea',
            name: 'editorSetting.mock.tpl',
            mode: 'vertical',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("2043742930f9833b4405aa0314a496b1"), i18nRuntime.i18n("a903e51cb1915b56f94bf54a81816cf5")),
            pipeOut: function (value) {
              return value === '' ? undefined : value;
            }
          }, amisEditorCore.getSchemaTpl('tpl:rich-text')]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout'],
          baseExtra: [amisEditorCore.getSchemaTpl('theme:font', {
            label: i18nRuntime.i18n("ca746b1ff10193a3ce20878dec04a733"),
            name: 'themeCss.baseControlClassName.font'
          })]
        })), false))
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    _this.popOverBody = [amisEditorCore.getSchemaTpl('tpl:content'), amisEditorCore.getSchemaTpl('tpl:rich-text'), amisEditorCore.getSchemaTpl('tpl:wrapperComponent')];
    return _this;
  }
  TplPlugin.id = 'TplPlugin';
  TplPlugin.scene = ['layout'];
  return TplPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TplPlugin);

exports.TplPlugin = TplPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
