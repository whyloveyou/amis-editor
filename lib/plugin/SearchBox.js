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

var SearchBoxPlugin = /** @class */function (_super) {
  tslib.__extends(SearchBoxPlugin, _super);
  function SearchBoxPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'search-box';
    _this.$schema = '/schemas/SearchBoxSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("c3e817974de836e80c95cc6ce5718eff");
    _this.searchKeywords = i18nRuntime.i18n("88f8919dd239f2018d267f79d71a672b");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("83fe6a5db780fcfa68f3336c7d86f25b");
    _this.docLink = '/amis/zh-CN/components/search-box';
    _this.icon = 'fa fa-search';
    _this.pluginIcon = 'search-box-plugin';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'search-box',
      name: 'keyword',
      body: {
        type: 'tpl',
        tpl: i18nRuntime.i18n("c3e817974de836e80c95cc6ce5718eff"),
        wrapperComponent: '',
        inline: false
      },
      level: 'info'
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      className: 'text-left',
      showCloseButton: true
    });
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      placeholder: i18nRuntime.i18n("bb50b53491c2c43845c58b16e48c27f3")
    }];
    // 事件定义
    _this.events = [{
      eventName: 'search',
      eventLabel: i18nRuntime.i18n("68a896ef9627fea8cd84f3fa4f7269aa"),
      description: i18nRuntime.i18n("a7be3c702997f49cf9429240fbbc5e36"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("caafbcb52c70ad0bbbbf127ee7b08b89")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("5bc28acd4afb712dcbc234927357cd87"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("caafbcb52c70ad0bbbbf127ee7b08b89")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18nRuntime.i18n("4638e799b95e1b71edd55f278a6f707c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("caafbcb52c70ad0bbbbf127ee7b08b89")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18nRuntime.i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18nRuntime.i18n("c776ab86eb24f6b3db35114e43026f75"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18nRuntime.i18n("caafbcb52c70ad0bbbbf127ee7b08b89")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18nRuntime.i18n("6fe93193cbd9f0eb9315a4ae83343786")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("67b6bec14c39be3f2602271e2fe3bcde"),
      description: i18nRuntime.i18n("67b6bec14c39be3f2602271e2fe3bcde")
    }];
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("c3e817974de836e80c95cc6ce5718eff");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("0796ba76b4b553687e5ffaeb78512ccb"),
          body: [amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("09bbfb387dce6201df1ccef2aab161a6"),
            name: 'clearable'
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("218bcea849478df7335ac31072860e8e"),
            name: 'clearAndSubmit'
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("a48b511d5da79faf6f7f58c5470738f0"),
            name: 'searchImediately'
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("71c198baa12405e56705a3c68f66e3ef"),
            name: 'mini'
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("b814fb5782f733a22ee561397ad376fc"),
            name: 'enhance',
            visibleOn: '!data.mini'
          }), amisEditorCore.getSchemaTpl('placeholder')]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false
        })])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))
      }]);
    };
    return _this;
  }
  SearchBoxPlugin.id = 'SearchBoxPlugin';
  return SearchBoxPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(SearchBoxPlugin);

exports.SearchBoxPlugin = SearchBoxPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
