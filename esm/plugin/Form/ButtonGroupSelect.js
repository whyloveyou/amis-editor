/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { ValidatorTag } from '../../validator.js';
import { resolveOptionType } from '../../util.js';
import { i18n } from 'i18n-runtime';

var ButtonGroupControlPlugin = /** @class */function (_super) {
  __extends(ButtonGroupControlPlugin, _super);
  function ButtonGroupControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'button-group-select';
    _this.$schema = '/schemas/ButtonGroupControlSchema.json';
    // 组件名称
    _this.name = i18n("729a4cca5ed3504793c1f3a87d2b48b9");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-object-group';
    _this.pluginIcon = 'btn-select-plugin';
    _this.description = i18n("29513434492e5d19a9660e0a918befd1");
    _this.docLink = '/amis/zh-CN/components/button-group';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'button-group-select',
      name: 'buttonGroupSelect',
      label: i18n("729a4cca5ed3504793c1f3a87d2b48b9"),
      inline: false,
      options: [{
        label: i18n("6edda84461bf13d38328cb401c8c23db"),
        value: 'a'
      }, {
        label: i18n("39692081e75ef73c6479fc25f8f10dfc"),
        value: 'b'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: __assign(__assign({}, _this.scaffold), {
        value: 'a',
        label: i18n("729a4cca5ed3504793c1f3a87d2b48b9"),
        description: i18n("a457872a51628ccadfb9bcfa23428a98")
      })
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("729a4cca5ed3504793c1f3a87d2b48b9");
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("2fc76872efce1eabd3b74a3e4fd5b976"),
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
      actionType: 'reload',
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), getSchemaTpl('multiple'), getSchemaTpl('valueFormula', {
            rendererSchema: function (schema) {
              return schema;
            },
            useSelectMode: true,
            visibleOn: 'this.options && this.options.length > 0'
          }), getSchemaTpl('description')]
        }, {
          title: i18n("66774850742a81e8b2393195290b7330"),
          body: [getSchemaTpl('nav-badge'), getSchemaTpl('optionControlV2')]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.MultiSelect
        })])]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('formItemMode'), getSchemaTpl('horizontal', {
            label: '',
            visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
          }), getSchemaTpl('switch', {
            name: 'tiled',
            label: tipedLabel(i18n("8eb18b36f5a27fa8e6d32bc66546ce05"), i18n("944908c981a86bfa0cfab9360ab38184")),
            pipeIn: defaultValue(false),
            visibleOn: 'data.mode !== "inline"'
          }), getSchemaTpl('size'), getSchemaTpl('buttonLevel', {
            label: i18n("ac3880323853de9adc4f66bc06d438ff"),
            name: 'btnLevel'
          }), getSchemaTpl('buttonLevel', {
            label: i18n("0b98b0bea3db6ae5b67a09c7bb2d032b"),
            name: 'btnActiveLevel',
            pipeIn: defaultValue('primary')
          })]
        }, getSchemaTpl('style:classNames', {
          isFormItem: true,
          schema: [getSchemaTpl('className', {
            label: i18n("fa966345577ba81af19408f203db968f"),
            name: 'btnClassName'
          })]
        })])]
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
  ButtonGroupControlPlugin.prototype.buildDataSchemas = function (node, region) {
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
  ButtonGroupControlPlugin.id = 'ButtonGroupControlPlugin';
  return ButtonGroupControlPlugin;
}(BasePlugin);
registerEditorPlugin(ButtonGroupControlPlugin);

export { ButtonGroupControlPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
