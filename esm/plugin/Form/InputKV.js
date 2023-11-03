/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var KVControlPlugin = /** @class */function (_super) {
  __extends(KVControlPlugin, _super);
  function KVControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-kv';
    _this.$schema = '/schemas/KVControlSchema.json';
    // 组件名称
    _this.name = i18n("ed55564c631322fa3042c77286d6562c");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-eyedropper';
    _this.pluginIcon = 'input-kv-plugin';
    _this.description = i18n("746dd83e6891ccc9a19804c23c2c4443");
    _this.docLink = '/amis/zh-CN/components/form/input-kv';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-kv',
      label: 'KV',
      name: 'kv'
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    // 事件定义
    _this.events = [{
      eventName: 'add',
      eventLabel: i18n("b58c7549c0246c55b9cac96383200338"),
      description: i18n("8575b828c7320de82b9f99058aa1f55f"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("e26f6832d586f9e73d2361573bf5273f")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'delete',
      eventLabel: i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
      description: i18n("4933bd64bb23de03ca8ed246fa5509c5"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              key: {
                type: 'string',
                title: i18n("91190195405845950230616929d852cf")
              },
              value: {
                type: 'string',
                title: i18n("e26f6832d586f9e73d2361573bf5273f")
              },
              item: {
                type: 'object',
                title: i18n("28e5fd494ea37a09fd2ad36d0f98bacc")
              }
            }
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18n("ed55564c631322fa3042c77286d6562c");
    _this.panelBody = [getSchemaTpl('layout:originPosition', {
      value: 'left-top'
    }), {
      type: 'input-text',
      name: 'valueType',
      label: i18n("654ad5670efdd25f1417958a7026a355"),
      pipeIn: defaultValue('input-text')
    }, {
      type: 'input-text',
      name: 'keyPlaceholder',
      label: i18n("9648d874d516a87965066342394e86e6")
    }, {
      type: 'input-text',
      name: 'valuePlaceholder',
      label: i18n("4dae7425b21494a318cd4a69ce24608f")
    }, {
      type: 'switch',
      name: 'draggable',
      label: i18n("233662283039ded8c29f070d1a807029"),
      pipeIn: defaultValue(true)
    }];
    return _this;
  }
  KVControlPlugin.id = 'KVControlPlugin';
  KVControlPlugin.scene = ['layout'];
  return KVControlPlugin;
}(BasePlugin);
registerEditorPlugin(KVControlPlugin);

export { KVControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
