/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __rest } from 'tslib';
import { Button, isObject } from 'amis';
import React__default from 'react';
import { getI18nEnabled, getSchemaTpl, defaultValue, repeatArray, diff, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import set from 'lodash/set';
import { resolveArrayDatasource, schemaToArray, schemaArrayFormat } from '../util.js';
import { i18n } from 'i18n-runtime';

var ListPlugin = /** @class */function (_super) {
  __extends(ListPlugin, _super);
  function ListPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'list';
    _this.$schema = '/schemas/ListSchema.json';
    // 组件名称
    _this.name = i18n("3712972d84adf48acbd6ad24b4d75ad0");
    _this.isBaseComponent = true;
    _this.isListComponent = true;
    _this.disabledRendererPlugin = true;
    _this.memberImmutable = true;
    _this.description = i18n("9f556fb46ecef854282d17e631578b1c");
    _this.docLink = '/amis/zh-CN/components/list';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-list';
    _this.pluginIcon = 'list-plugin';
    _this.scaffold = {
      type: 'list',
      listItem: {
        body: [{
          type: 'tpl',
          tpl: i18n("3bb4d608c6bee2b7b6d788417cde04e3"),
          wrapperComponent: ''
        }],
        actions: [{
          icon: 'fa fa-eye',
          type: 'button'
        }]
      }
    };
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      items: [{
        a: 1,
        b: 2
      }, {
        a: 3,
        b: 4
      }, {
        a: 5,
        b: 6
      }]
    });
    _this.panelTitle = i18n("3712972d84adf48acbd6ad24b4d75ad0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isCRUDBody = ['crud', 'crud2'].includes(context.schema.type);
      var i18nEnabled = getI18nEnabled();
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [
          // {
          //   children: (
          //     <Button
          //       level="primary"
          //       size="sm"
          //       block
          //       onClick={this.editDetail.bind(this, context.id)}
          //     >
          //       配置成员详情
          //     </Button>
          //   )
          // },
          // {
          //   type: 'divider'
          // },
          {
            name: 'title',
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18n("32c65d8d7431e76029678ec7bb73a5ab")
          }, isCRUDBody ? null : getSchemaTpl('formItemName', {
            label: i18n("41a344642681efaaa418c228ba7fb45c")
          }), {
            name: 'placeholder',
            pipeIn: defaultValue(i18n("1ac0e1626be43287983fe3e5559320eb")),
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18n("35ba83e053cef95e55dfffde279822b5")
          }, {
            type: 'ae-switch-more',
            mode: 'normal',
            formType: 'extend',
            label: i18n("86aafaa75b388deb4a4cbdab2293c099"),
            name: 'showHeader',
            form: {
              body: [{
                children: React__default.createElement(Button, {
                  level: "primary",
                  size: "sm",
                  block: true,
                  onClick: _this.editHeaderDetail.bind(_this, context.id)
                }, i18n("e6aa1b827415217c524ae9d9b665cca5"))
              }]
            }
          }, {
            type: 'ae-switch-more',
            mode: 'normal',
            formType: 'extend',
            label: i18n("12c4c5e8abda77e1fdc93653d6414187"),
            name: 'showFooter',
            form: {
              body: [{
                children: React__default.createElement(Button, {
                  level: "primary",
                  size: "sm",
                  block: true,
                  onClick: _this.editFooterDetail.bind(_this, context.id)
                }, i18n("a2ecfd5a0db9c855f59eea75083678e6"))
              }]
            }
          }]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [getSchemaTpl('className', {
            label: i18n("5e5d3f13111593b2710673006d4c8297")
          }), getSchemaTpl('className', {
            name: 'itemClassName',
            label: 'ListItem'
          }), getSchemaTpl('className', {
            name: 'headerClassName',
            label: i18n("86aafaa75b388deb4a4cbdab2293c099")
          }), getSchemaTpl('className', {
            name: 'footerClassName',
            label: i18n("12c4c5e8abda77e1fdc93653d6414187")
          })]
        }])
      }]);
    };
    return _this;
  }
  ListPlugin.prototype.filterProps = function (props) {
    if (props.isSlot) {
      props.value = [props.data];
      return props;
    }
    var data = __assign(__assign({}, props.defaultData), props.data);
    var arr = resolveArrayDatasource({
      value: props.value,
      data: data,
      source: props.source
    });
    if (!Array.isArray(arr) || !arr.length) {
      var mockedData = this.buildMockData();
      props.value = repeatArray(mockedData, 1).map(function (item, index) {
        return __assign(__assign({}, item), {
          id: index + 1
        });
      });
    }
    var $schema = props.$schema,
      rest = __rest(props, ["$schema"]);
    return __assign(__assign({}, rest), {
      $schema: $schema
    });
  };
  ListPlugin.prototype.buildMockData = function () {
    return {
      id: 666,
      title: i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
      description: i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
      a: i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
      b: i18n("6cb01692eea2fa7066d20fe2b6ccaea3")
    };
  };
  ListPlugin.prototype.editHeaderDetail = function (id) {
    var _a;
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var defaultHeader = {
      type: 'tpl',
      tpl: i18n("86aafaa75b388deb4a4cbdab2293c099"),
      wrapperComponent: ''
    };
    node && value && this.manager.openSubEditor({
      title: i18n("e6aa1b827415217c524ae9d9b665cca5"),
      value: schemaToArray((_a = value.header) !== null && _a !== void 0 ? _a : defaultHeader),
      slot: {
        type: 'container',
        body: '$$'
      },
      onChange: function (newValue) {
        newValue = __assign(__assign({}, value), {
          header: schemaArrayFormat(newValue)
        });
        manager.panelChangeValue(newValue, diff(value, newValue));
      }
    });
  };
  ListPlugin.prototype.editFooterDetail = function (id) {
    var _a;
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var defaultFooter = {
      type: 'tpl',
      tpl: i18n("12c4c5e8abda77e1fdc93653d6414187"),
      wrapperComponent: ''
    };
    node && value && this.manager.openSubEditor({
      title: i18n("a2ecfd5a0db9c855f59eea75083678e6"),
      value: schemaToArray((_a = value.footer) !== null && _a !== void 0 ? _a : defaultFooter),
      slot: {
        type: 'container',
        body: '$$'
      },
      onChange: function (newValue) {
        newValue = __assign(__assign({}, value), {
          footer: schemaArrayFormat(newValue)
        });
        manager.panelChangeValue(newValue, diff(value, newValue));
      }
    });
  };
  ListPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    node && value && this.manager.openSubEditor({
      title: i18n("39a6853b109ae98f1aabca90283d7edc"),
      value: __assign({}, value.listItem),
      slot: {
        type: 'list',
        listItem: '$$'
      },
      onChange: function (newValue) {
        newValue = __assign(__assign({}, value), {
          listItem: newValue
        });
        manager.panelChangeValue(newValue, diff(value, newValue));
      },
      data: {
        // TODO  默认数据不对
        items: [this.buildMockData()]
      }
    });
  };
  ListPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info,
      schema = _a.schema;
    if (info.renderer.name === 'list' || info.renderer.name === 'crud' && schema.mode === 'list') {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18n("39a6853b109ae98f1aabca90283d7edc"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  ListPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var dataSchema = {
      $id: 'each',
      type: 'object',
      title: i18n("64095ae27232995731f776f12bf66d8d"),
      properties: {}
    };
    var match = node.schema.source && String(node.schema.source).match(/{([\w-_]+)}/);
    var field = node.schema.name || (match === null || match === void 0 ? void 0 : match[1]);
    var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
    var schema = (_a = scope === null || scope === void 0 ? void 0 : scope.parent) === null || _a === void 0 ? void 0 : _a.getSchemaByPath(field);
    if (isObject(schema === null || schema === void 0 ? void 0 : schema.items)) {
      dataSchema = __assign(__assign({}, dataSchema), schema.items);
      // 循环添加序号方便处理
      set(dataSchema, 'properties.index', {
        type: 'number',
        title: i18n("faaadc447b1c2b1adc920d9c9aedcc25")
      });
    }
    return dataSchema;
  };
  ListPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id,
      schema = _a.schema;
      _a.region;
      var info = _a.info,
      selections = _a.selections;
    if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
      return;
    }
    if (info.renderer.name === 'list' || info.renderer.name === 'crud' && schema.mode === 'list') {
      menus.push('|', {
        label: i18n("39a6853b109ae98f1aabca90283d7edc"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  // 为了能够自动注入数据。
  ListPlugin.prototype.getRendererInfo = function (context) {
    var _a;
    var plugin = this;
    var renderer = context.renderer,
      schema = context.schema;
    if (!schema.$$id && ['crud', 'crud2'].includes((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) && renderer.name === 'list') {
      return __assign(__assign({}, {
        id: schema.$$editor.id
      }), {
        name: plugin.name,
        regions: plugin.regions,
        patchContainers: plugin.patchContainers,
        vRendererConfig: plugin.vRendererConfig,
        wrapperProps: plugin.wrapperProps,
        wrapperResolve: plugin.wrapperResolve,
        filterProps: plugin.filterProps,
        $schema: plugin.$schema,
        renderRenderer: plugin.renderRenderer,
        memberImmutable: plugin.memberImmutable
      });
    }
    return _super.prototype.getRendererInfo.call(this, context);
  };
  ListPlugin.id = 'ListPlugin';
  return ListPlugin;
}(BasePlugin);
registerEditorPlugin(ListPlugin);

export { ListPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
