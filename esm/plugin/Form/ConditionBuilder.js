/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends } from 'tslib';
import { getSchemaTpl, getI18nEnabled, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import defaultConfig, { OperationMap } from 'amis-ui/lib/components/condition-builder/config';
import { i18n } from 'i18n-runtime';

var ConditionBilderPlugin = /** @class */function (_super) {
  __extends(ConditionBilderPlugin, _super);
  function ConditionBilderPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'condition-builder';
    _this.$schema = '/schemas/ConditionBuilderControlSchema.json';
    // 组件名称
    _this.name = i18n("6e87bfe16db746db13966f0d7552b052");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-group';
    _this.pluginIcon = 'condition-builder-plugin';
    _this.description = i18n("ab7f2096d3ea8aa85f453b204bfbc493");
    _this.docLink = '/amis/zh-CN/components/form/condition-builder';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'condition-builder',
      label: i18n("6e87bfe16db746db13966f0d7552b052"),
      name: 'conditions',
      description: i18n("ae5e21c7b57aaaff2071b757f35dbb3e"),
      fields: [{
        label: i18n("97d07614380da93d257f9fbf81aa56fb"),
        type: 'text',
        name: 'text'
      }, {
        label: i18n("55d4790c5d819cd0462cbe89561b0dd4"),
        type: 'number',
        name: 'number'
      }, {
        label: i18n("97b0b6499334ed889b372513290a2a52"),
        type: 'boolean',
        name: 'boolean'
      }, {
        label: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
        type: 'select',
        name: 'select',
        options: [{
          label: 'A',
          value: 'a'
        }, {
          label: 'B',
          value: 'b'
        }, {
          label: 'C',
          value: 'c'
        }, {
          label: 'D',
          value: 'd'
        }, {
          label: 'E',
          value: 'e'
        }]
      }, {
        label: i18n("4ff1e74e43a3586339251494117185ad"),
        type: 'date',
        name: 'date'
      }, {
        label: i18n("19fcb9eb2594059036dfede5f4ec53e8"),
        type: 'time',
        name: 'time'
      }, {
        label: i18n("0c3bf4fce50589b1073baf15f8a00d36"),
        type: 'datetime',
        name: 'datetime'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [_this.scaffold]
    };
    _this.panelTitle = i18n("6e87bfe16db746db13966f0d7552b052");
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), getSchemaTpl('source')];
    };
    return _this;
  }
  Object.defineProperty(ConditionBilderPlugin.prototype, "scaffoldForm", {
    get: function () {
      var i18nEnabled = getI18nEnabled();
      return {
        title: i18n("6d6b4f2bbd2fd0b5faee33673d7f06ae"),
        body: [{
          type: 'combo',
          name: 'fields',
          multiple: true,
          draggable: true,
          multiLine: true,
          items: [{
            type: 'group',
            body: [{
              type: 'select',
              name: 'type',
              placeholder: i18n("22ed9ec0e00b5deab2c335ad1fd2e343"),
              options: [{
                label: i18n("97d07614380da93d257f9fbf81aa56fb"),
                value: 'text'
              }, {
                label: i18n("55d4790c5d819cd0462cbe89561b0dd4"),
                value: 'number'
              }, {
                label: i18n("97b0b6499334ed889b372513290a2a52"),
                value: 'boolean'
              }, {
                label: i18n("4ff1e74e43a3586339251494117185ad"),
                value: 'date'
              }, {
                label: i18n("0c3bf4fce50589b1073baf15f8a00d36"),
                value: 'datetime'
              }, {
                label: i18n("19fcb9eb2594059036dfede5f4ec53e8"),
                value: 'time'
              }, {
                label: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
                value: 'select'
              }]
            }, {
              type: 'input-text',
              name: 'name',
              placeholder: i18n("d314558953b3c76adb7e131aaec8bd86")
            }, {
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              placeholder: i18n("e996419dedc2f1ffd96e7a0e808127d0"),
              name: 'label'
            }]
          }, {
            type: 'group',
            visibleOn: 'data.type === "number"',
            body: [{
              type: 'input-number',
              name: 'minimum',
              placeholder: i18n("c322edb884724d04842fc35f4d29a24e")
            }, {
              type: 'input-number',
              name: 'maximum',
              placeholder: i18n("5da893141114a59da868052b3a17a79a")
            }, {
              type: 'input-number',
              name: 'step',
              min: 0,
              placeholder: i18n("d26404c10871481ab6bbb4837a34ae95")
            }]
          }, {
            type: 'group',
            visibleOn: '!!~["date", "datetime", "time"].indexOf(data.type)',
            body: [{
              type: 'input-text',
              name: 'format',
              placeholder: i18n("db0258df1ddbd88749b335aecdc8425e")
            }, {
              type: 'input-text',
              name: 'inputFormat',
              placeholder: i18n("dbd5b99c34260412f10835d82b59919c")
            }, {
              type: 'input-text',
              name: 'timeFormat',
              placeholder: i18n("94575fbef23460cb02524d20d152d728"),
              visibleOn: 'data.type === "datetime"'
            }]
          }, {
            type: 'group',
            visibleOn: 'data.type === "select"',
            body: [{
              type: 'input-text',
              name: 'source',
              placeholder: i18n("f20a86701d87369e5166c28a71b8b8cd")
            }]
          }, {
            type: 'group',
            body: [{
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              placeholder: i18n("4c1cff4d8c05daa6ed9352a241ee628c"),
              name: 'placeholder'
            }, {
              name: 'operators',
              placeholder: i18n("ed4ad0f9e6374d6915ce3d2c0dec7c2c"),
              asFormItem: true,
              children: function (_a) {
                var _b, _c;
                var data = _a.data,
                  render = _a.render,
                  onChange = _a.onChange;
                return render('operations', {
                  type: 'select',
                  name: 'operators',
                  multiple: true,
                  value: data.value || ((_b = defaultConfig.types[data.type]) === null || _b === void 0 ? void 0 : _b.operators) || [],
                  joinValues: false,
                  extractValue: true,
                  options: (_c = defaultConfig.types[data.type]) === null || _c === void 0 ? void 0 : _c.operators.map(function (item) {
                    if (isObject(item) && item.label && item.value) {
                      return {
                        label: item.label,
                        value: item.value
                      } || [];
                    } else if (isString(item)) {
                      return {
                        label: OperationMap[item],
                        value: item
                      } || [];
                    } else {
                      return [];
                    }
                  })
                }, {
                  onChange: function (value) {
                    return onChange(value);
                  }
                });
              }
            }]
          }]
        }],
        canRebuild: true
      };
    },
    enumerable: false,
    configurable: true
  });
  ConditionBilderPlugin.prototype.buildSubRenderers = function (context, renderers) {
    var plugin = this;
    // return super.buildSubRenderers.apply(this, arguments);
    if (plugin.name && plugin.description) {
      return {
        name: plugin.name,
        icon: plugin.icon,
        pluginIcon: plugin.pluginIcon,
        description: plugin.description,
        previewSchema: plugin.previewSchema,
        tags: plugin.tags,
        docLink: plugin.docLink,
        type: plugin.type,
        scaffold: plugin.scaffold,
        scaffoldForm: this.scaffoldForm,
        disabledRendererPlugin: plugin.disabledRendererPlugin,
        isBaseComponent: plugin.isBaseComponent,
        rendererName: plugin.rendererName
      };
    }
  };
  ConditionBilderPlugin.id = 'ConditionBilderPlugin';
  return ConditionBilderPlugin;
}(BasePlugin);
registerEditorPlugin(ConditionBilderPlugin);

export { ConditionBilderPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
