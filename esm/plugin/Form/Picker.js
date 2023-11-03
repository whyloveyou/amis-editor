/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import React__default from 'react';
import { Button } from 'amis';
import { getSchemaTpl, diff, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { resolveOptionType } from '../../util.js';
import { i18n } from 'i18n-runtime';

var PickerControlPlugin = /** @class */function (_super) {
  __extends(PickerControlPlugin, _super);
  function PickerControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'picker';
    _this.$schema = '/schemas/PickerControlSchema.json';
    // 组件名称
    _this.name = i18n("8fcbfdc1a9403f6339d81911473806da");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-window-restore';
    _this.pluginIcon = 'picker-plugin';
    _this.description = i18n("8f650b58c8421edecfb380d6f60ef40e");
    _this.docLink = '/amis/zh-CN/components/form/picker';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'picker',
      label: i18n("8fcbfdc1a9403f6339d81911473806da"),
      name: 'picker',
      options: [{
        label: i18n("05f87b331e1c97691776d93a6598373f"),
        value: 'A'
      }, {
        label: i18n("f38c0a46797523b11051e35ec0f82a42"),
        value: 'B'
      }],
      modalClassName: 'app-popover'
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
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("c75fde0e2d329ce62f55cb1a207181ae"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              value: {
                type: 'string',
                title: i18n("e48d65cda774019d9a6677354bc781f2")
              },
              selectedItems: {
                type: 'string',
                title: i18n("b4e54cb84d448952a4aa1a17ceaa6ad3")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'itemClick',
      eventLabel: i18n("4ea280a2e54969de1d1b9bbd5b708e63"),
      description: i18n("f05520432bb87ced419a1da818c6cc9d"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("91f7b7fdf9b91073ca3519260f7a62d7")
              }
            }
          }
        }
      }]
    }];
    _this.panelTitle = i18n("8fcbfdc1a9403f6339d81911473806da");
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), getSchemaTpl('switch', {
          name: 'embed',
          label: i18n("dc0c50a5c9832b393df34835111c34a3")
        }), getSchemaTpl('switchDefaultValue'), {
          type: 'input-text',
          name: 'value',
          label: i18n("225f3ed00750ae78ad1e6ea42c8f5087"),
          visibleOn: 'typeof this.value !== "undefined"'
        }, getSchemaTpl('fieldSet', {
          title: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [getSchemaTpl('options'), getSchemaTpl('api', {
            name: 'source',
            label: i18n("1395eba8d9efe27aa1ecd1a45e3e5dcd")
          }), {
            children: React__default.createElement(Button, {
              size: "sm",
              level: "danger",
              className: "m-b",
              onClick: _this.editDetail.bind(_this, context.id),
              block: true
            }, i18n("1ac065ed64b81380384a0b371d5b404f"))
          }, {
            label: 'labelTpl',
            type: 'textarea',
            name: 'labelTpl',
            labelRemark: i18n("d64b585847f015eaa1443a3a03562350"),
            description: i18n("0861915dbac25ccb573b3bb72ffeebd7")
          }, {
            type: 'button-group-select',
            name: 'modalMode',
            label: i18n("c2c23b4fc7f695c58e947ad413f2c5d8"),
            value: 'dialog',
            size: 'xs',
            options: [{
              label: i18n("ab3aec075a09d055b2a28c8b61925ee0"),
              value: 'dialog'
            }, {
              label: i18n("33e6c41fed95c25e3b426d596d504579"),
              value: 'drawer'
            }]
          }, getSchemaTpl('strictMode'), getSchemaTpl('multiple'), getSchemaTpl('autoFillApi', {
            visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
          }), getSchemaTpl('autoFill', {
            visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
          })]
        })]
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  PickerControlPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info;
    if (info.renderer.name === this.rendererName) {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18n("1ac065ed64b81380384a0b371d5b404f"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  PickerControlPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id;
      _a.schema;
      _a.region;
      var info = _a.info;
    if (info.renderer.name === this.rendererName) {
      menus.push('|', {
        label: i18n("1ac065ed64b81380384a0b371d5b404f"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  PickerControlPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    if (!node || !value) {
      return;
    }
    var component = node.getComponent();
    var schema = __assign(__assign({
      type: 'crud',
      mode: 'list'
    }, value.pickerSchema || {
      listItem: {
        title: '${label}'
      }
    }), {
      api: value.source,
      pickerMode: true,
      multiple: value.multiple
    });
    this.manager.openSubEditor({
      title: i18n("1ac065ed64b81380384a0b371d5b404f"),
      value: schema,
      data: {
        options: component.props.options
      },
      onChange: function (newValue) {
        newValue = __assign(__assign({}, value), {
          pickerSchema: __assign({}, newValue),
          source: newValue.api
        });
        delete newValue.pickerSchema.api;
        delete newValue.pickerSchema.type;
        delete newValue.pickerSchema.pickerMode;
        delete newValue.pickerSchema.multiple;
        manager.panelChangeValue(newValue, diff(value, newValue));
      }
    });
  };
  PickerControlPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    var type = resolveOptionType((_b = node.schema) === null || _b === void 0 ? void 0 : _b.options);
    // todo:异步数据case
    var dataSchema = {
      type: type,
      title: ((_c = node.schema) === null || _c === void 0 ? void 0 : _c.label) || ((_d = node.schema) === null || _d === void 0 ? void 0 : _d.name),
      originalValue: (_e = node.schema) === null || _e === void 0 ? void 0 : _e.value // 记录原始值，循环引用检测需要
    };

    if (((_f = node.schema) === null || _f === void 0 ? void 0 : _f.joinValues) === false) {
      dataSchema = __assign(__assign({}, dataSchema), {
        type: 'object',
        title: ((_g = node.schema) === null || _g === void 0 ? void 0 : _g.label) || ((_h = node.schema) === null || _h === void 0 ? void 0 : _h.name),
        properties: (_a = {}, _a[((_j = node.schema) === null || _j === void 0 ? void 0 : _j.labelField) || 'label'] = {
          type: 'string',
          title: i18n("97d07614380da93d257f9fbf81aa56fb")
        }, _a[((_k = node.schema) === null || _k === void 0 ? void 0 : _k.valueField) || 'value'] = {
          type: type,
          title: i18n("fe7509e0ed085b86f07e3e9975cc5b3d")
        }, _a)
      });
    }
    if ((_l = node.schema) === null || _l === void 0 ? void 0 : _l.multiple) {
      if ((_m = node.schema) === null || _m === void 0 ? void 0 : _m.extractValue) {
        dataSchema = {
          type: 'array',
          title: ((_o = node.schema) === null || _o === void 0 ? void 0 : _o.label) || ((_p = node.schema) === null || _p === void 0 ? void 0 : _p.name)
        };
      } else if (((_q = node.schema) === null || _q === void 0 ? void 0 : _q.joinValues) === false) {
        dataSchema = {
          type: 'array',
          title: ((_r = node.schema) === null || _r === void 0 ? void 0 : _r.label) || ((_s = node.schema) === null || _s === void 0 ? void 0 : _s.name),
          items: {
            type: 'object',
            title: i18n("ab5dea29793d933fa7b5487a7309df6a"),
            properties: dataSchema.properties
          },
          originalValue: dataSchema.originalValue
        };
      }
    }
    return dataSchema;
  };
  PickerControlPlugin.id = 'PickerControlPlugin';
  return PickerControlPlugin;
}(BasePlugin);
registerEditorPlugin(PickerControlPlugin);

export { PickerControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
