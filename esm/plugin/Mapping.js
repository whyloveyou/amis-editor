/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, defaultValue, JSONPipeOut, diff, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { schemaToArray, schemaArrayFormat } from '../util.js';
import { i18n } from 'i18n-runtime';

var MappingPlugin = /** @class */function (_super) {
  __extends(MappingPlugin, _super);
  function MappingPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'mapping';
    _this.$schema = '/schemas/MappingSchema.json';
    // 组件名称
    _this.name = i18n("9da188491dd34c4382a5b9f006194e41");
    _this.isBaseComponent = true;
    _this.description = i18n("ddeeaa33ae62ead1a77a859fb79b78d7");
    _this.docLink = '/amis/zh-CN/components/mapping';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-exchange';
    _this.pluginIcon = 'mapping-plugin';
    _this.scaffold = {
      type: 'mapping',
      value: 1,
      map: {
        1: i18n("0218cbc88086353118fea07e364334d4"),
        2: i18n("8167b3dd560a83cdc757d1022ff111e2"),
        3: i18n("8fa28f95c03faa7cc87e487a89a35a72"),
        4: i18n("d246bdddaf59436cb2160837f7bef634"),
        '*': i18n("2ab01e418dca1500dcb133d50656deea")
      },
      itemSchema: {
        type: 'tag',
        label: '${item}'
      }
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.panelTitle = i18n("9da188491dd34c4382a5b9f006194e41");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isUnderField = /\/field\/\w+$/.test(context.path);
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [isUnderField ? {
            type: 'tpl',
            inline: false,
            className: 'text-info text-sm',
            tpl: i18n("8e1fee898434093aad55f5888497f970")
          } : null, getSchemaTpl('mapSourceControl'), {
            type: 'ae-switch-more',
            mode: 'normal',
            label: i18n("3585e4dd456b41fb8aec43f927b6a27c"),
            bulk: false,
            name: 'itemSchema',
            formType: 'extend',
            form: {
              body: [{
                type: 'button',
                level: 'primary',
                size: 'sm',
                block: true,
                onClick: _this.editDetail.bind(_this, context.id),
                label: i18n("25e4c39320150bca74b4c05c7740e365")
              }]
            },
            pipeIn: function (value) {
              return value !== undefined;
            },
            pipeOut: function (value, originValue, data) {
              if (value === true) {
                return {
                  type: 'tag',
                  label: "${".concat(_this.getDisplayField(data), " | default: \"-\"}")
                };
              }
              return value ? value : undefined;
            }
          }, getSchemaTpl('valueFormula', {
            pipeOut: function (value) {
              return value == null || value === '' ? undefined : value;
            }
          }), getSchemaTpl('placeholder', {
            pipeIn: defaultValue('-'),
            label: i18n("4c1cff4d8c05daa6ed9352a241ee628c")
          })]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [getSchemaTpl('className', {
            label: i18n("5e5d3f13111593b2710673006d4c8297")
          })]
        }])
      }])];
    };
    return _this;
  }
  MappingPlugin.prototype.getDisplayField = function (data) {
    var _a;
    if (data.source || data.map && Array.isArray(data.map) && data.map[0] && Object.keys(data.map[0]).length > 1) {
      return (_a = data.labelField) !== null && _a !== void 0 ? _a : 'label';
    }
    return 'item';
  };
  MappingPlugin.prototype.filterProps = function (props) {
    // 禁止选中子节点
    props = JSONPipeOut(props);
    return props;
  };
  MappingPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info;
      _a.schema;
    if (info.renderer.name === 'mapping') {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18n("25e4c39320150bca74b4c05c7740e365"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  MappingPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id;
      _a.schema;
      _a.region;
      var info = _a.info,
      selections = _a.selections;
    if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
      return;
    }
    if (info.renderer.name === 'mapping') {
      menus.push('|', {
        label: i18n("25e4c39320150bca74b4c05c7740e365"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  MappingPlugin.prototype.editDetail = function (id) {
    var _a;
    var _b;
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var defaultItemSchema = {
      type: 'tag',
      label: "${".concat(this.getDisplayField(value), "}")
    };
    node && value && this.manager.openSubEditor({
      title: i18n("25e4c39320150bca74b4c05c7740e365"),
      value: schemaToArray((_b = value.itemSchema) !== null && _b !== void 0 ? _b : defaultItemSchema),
      slot: {
        type: 'container',
        body: '$$'
      },
      onChange: function (newValue) {
        newValue = __assign(__assign({}, value), {
          itemSchema: schemaArrayFormat(newValue)
        });
        manager.panelChangeValue(newValue, diff(value, newValue));
      },
      data: (_a = {}, _a[value.labelField || 'label'] = i18n("6cb01692eea2fa7066d20fe2b6ccaea3"), _a[value.valueField || 'value'] = i18n("6cb01692eea2fa7066d20fe2b6ccaea3"), _a.item = i18n("6cb01692eea2fa7066d20fe2b6ccaea3"), _a)
    });
  };
  MappingPlugin.id = 'MappingPlugin';
  MappingPlugin.scene = ['layout'];
  return MappingPlugin;
}(BasePlugin);
registerEditorPlugin(MappingPlugin);

export { MappingPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
