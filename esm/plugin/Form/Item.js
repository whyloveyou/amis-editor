/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read, __assign } from 'tslib';
import { getSchemaTpl, JSONDelete, JSONPipeIn, JSONUpdate, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import find from 'lodash/find';
import { SUPPORT_STATIC_FORMITEM_CMPTS } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var ItemPlugin = /** @class */function (_super) {
  __extends(ItemPlugin, _super);
  function ItemPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // panelTitle = '表单项通配';
    _this.panelTitle = i18n("55b45c73ae417c4dead67905b1550e85");
    _this.order = -990;
    _this.pluginIcon = 'form-plugin';
    _this.panelBodyCreator = function (context) {
      var type = context.schema.type || '';
      var supportStatic = SUPPORT_STATIC_FORMITEM_CMPTS.includes(type);
      var ignoreName = ~['button', 'submit', 'reset'].indexOf(type);
      var notRequiredName = ~['button-toobar', 'container', 'fieldSet', 'group', 'grid', 'hbox', 'input-group', 'panel', 'service', 'tabs', 'table', 'elevator', 'static'].indexOf(type);
      var hasReadOnly = ~['switch', 'wizard', 'diff-editor', 'editor', 'input-rating', 'input-text', 'textarea'].indexOf(type);
      /** 不支持配置校验属性的组件 */
      var ignoreValidator = !!~['input-group'].indexOf(type);
      var renderer = context.info.renderer;
      return [getSchemaTpl('tabs', [{
        title: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), ignoreName ? null : getSchemaTpl('formItemName', {
          required: notRequiredName ? false : true
        }), renderer.renderLabel !== false ? getSchemaTpl('label') : null, hasReadOnly ? getSchemaTpl('switch', {
          name: 'readOnly',
          label: i18n("973b69af999dbdf4fa124df8c928ca6e")
        }) : null, getSchemaTpl('disabled'), ignoreValidator ? null : getSchemaTpl('required'), getSchemaTpl('description'), getSchemaTpl('placeholder'), getSchemaTpl('remark', {
          mode: 'row'
        }), renderer.renderLabel !== false ? getSchemaTpl('labelRemark', {
          mode: 'row'
        }) : null]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: __spreadArray([getSchemaTpl('formItemMode'), getSchemaTpl('horizontalMode'), getSchemaTpl('horizontal', {
          label: '',
          visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
        }), renderer.sizeMutable !== false ? getSchemaTpl('formItemSize', {
          options: [{
            label: i18n("391b8fa9c747a1799353ab856e666ad5"),
            value: 'sm'
          }, {
            label: i18n("aed1dfbc31703955e64806b799b67645"),
            value: 'md'
          }, {
            label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
            value: 'lg'
          }, {
            label: i18n("4a12e9b9fc5443e5e9999b5a7c56c19a"),
            value: 'full'
          }]
        }) : null, getSchemaTpl('formItemInline'), getSchemaTpl('className'), getSchemaTpl('className', {
          label: i18n("6d0034a2419e1f394dedab07994b9665"),
          name: 'labelClassName'
        }), getSchemaTpl('className', {
          label: i18n("2cadb6621afe19333b142faa541b0f91"),
          name: 'inputClassName'
        }), getSchemaTpl('className', {
          label: i18n("0e627e6a0ff773ee76bc4cc0871cb48d"),
          name: 'descriptionClassName',
          visibleOn: 'this.description'
        })], __read(!supportStatic ? [] : [getSchemaTpl('className', {
          label: i18n("3e573fd37473d789211ee44335d82fad"),
          name: 'staticClassName'
        })]), false)
      }, {
        title: i18n("33bf801796fd255b5f6147e33146669b"),
        body: [getSchemaTpl('visible'), supportStatic ? getSchemaTpl('static') : null, getSchemaTpl('switch', {
          name: 'clearValueOnHidden',
          label: i18n("7abf78a41095c6d21a1cc89b4a876233")
        })]
      }, ignoreValidator ? null : {
        title: i18n("cd8992b644e6c18367861a4d913fd116"),
        body: [
        // getSchemaTplByName('ref'),
        getSchemaTpl('validations'), getSchemaTpl('validationErrors'), getSchemaTpl('validateOnChange'), getSchemaTpl('submitOnChange'), getSchemaTpl('api', {
          name: 'validateApi',
          label: i18n("1040279cf7b8dbdb842f597c30095f62"),
          description: i18n("133886b10fd9721e6cf91b76f2df5b6e")
        })]
      }])];
    };
    return _this;
    // beforeInsert(event: PluginEvent<InsertEventContext>) {
    //   const context = event.context;
    //   if (
    //     context.region === 'controls' &&
    //     Array.isArray(context.subRenderer?.tags) &&
    //     !~context.subRenderer!.tags!.indexOf('表单项') &&
    //     ~context.subRenderer!.tags!.indexOf('展示')
    //   ) {
    //     context.data = {
    //       ...context.data,
    //       type: `static-${context.data.type}`,
    //       label: context.data.label || context.subRenderer!.name,
    //       name: context.data.name || 'var1'
    //     };
    //   }
    // }
  }

  ItemPlugin.prototype.buildEditorPanel = function (context, panels) {
    var thisPlugin = this;
    var renderer = context.info.renderer;
    var store = this.manager.store;
    if (context.selections.length) {
      return;
    }
    var plugin = context.info.plugin;
    // 如果是表单项
    if (!context.info.hostId && (renderer === null || renderer === void 0 ? void 0 : renderer.isFormItem) && !(plugin === null || plugin === void 0 ? void 0 : plugin.notRenderFormZone)) {
      panels.push({
        key: 'form-item',
        icon: 'fa fa-desktop',
        pluginIcon: thisPlugin.pluginIcon,
        title: this.panelTitle,
        render: this.manager.makeSchemaFormRender({
          body: this.panelBodyCreator(context),
          panelById: store.activeId,
          formKey: 'form-item'
        }),
        order: -200
      });
    }
  };
  ItemPlugin.prototype.afterUpdate = function (event) {
    var _a, _b;
    var context = event.context;
    if (context.info.renderer.isFormItem && ((_a = context.diff) === null || _a === void 0 ? void 0 : _a.some(function (change) {
      var _a;
      return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'value';
    }))) {
      var change = find(context.diff, function (change) {
        var _a;
        return ((_a = change.path) === null || _a === void 0 ? void 0 : _a.join('.')) === 'value';
      });
      var component = (_b = this.manager.store.getNodeById(context.id)) === null || _b === void 0 ? void 0 : _b.getComponent();
      component === null || component === void 0 ? void 0 : component.props.onChange(change === null || change === void 0 ? void 0 : change.rhs);
    }
  };
  ItemPlugin.prototype.beforeReplace = function (event) {
    var context = event.context;
    if (context.info.renderer.isFormItem && context.data && context.subRenderer && !~context.subRenderer.tags.indexOf(i18n("55b45c73ae417c4dead67905b1550e85")) && ~context.subRenderer.tags.indexOf(i18n("027446c2f9070b0f5b16a18208bf5fc7"))) {
      context.data = __assign(__assign({}, context.data), {
        type: "static-".concat(context.data.type),
        label: context.data.label || context.schema.label,
        name: context.data.name || context.schema.name
      });
    }
    // 替换字段的时候保留 name
    if (context.schema) {
      context.data.name = context.schema.name || context.data.name;
    }
  };
  ItemPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var _this = this;
    _a.id;
      _a.schema;
      _a.region;
      var selections = _a.selections;
    if (!selections.length || selections.length > 3) {
      // 单选或者超过3个选中态时直接返回
      return;
    }
    var arr = selections.concat();
    var first = arr.shift();
    var parent = first.node.parent;
    // 不在一个父节点，或者当前有非表单项，则直接跳过
    if (arr.some(function (elem) {
      var _a;
      return elem.node.parent !== parent || !((_a = elem.info.renderer) === null || _a === void 0 ? void 0 : _a.isFormItem);
    })) {
      // 备注：isFormItem在amis注册渲染器时生成，所有表单类渲染器isFormItem为true
      return;
    }
    menus.unshift({
      label: i18n("b95c6e14a4d8f6a6c6d99d583916f327"),
      icon: 'merge-icon',
      onSelect: function () {
        var store = _this.manager.store;
        var arr = selections.concat();
        var first = arr.shift();
        var schema = store.schema;
        var group = [__assign({}, first.schema)];
        // 让后面的 JSONPipeIn 去变一个 id
        // 因为 update 的时候，group 不会变 id
        // 不能两个 id 一样，这样点选就乱了。
        delete group[0].$$id;
        arr.forEach(function (elem) {
          group.push(elem.node.schema);
          schema = JSONDelete(schema, elem.id);
        });
        var curNewGroup = JSONPipeIn({
          type: 'group',
          body: group
        });
        schema = JSONUpdate(schema, first.id, curNewGroup, true);
        store.traceableSetSchema(schema);
        setTimeout(function () {
          // 合并成一行后自动选中父元素
          store.setActiveId(first.id);
        }, 40);
      }
    }, '|');
  };
  ItemPlugin.id = 'ItemPlugin';
  return ItemPlugin;
}(BasePlugin);
registerEditorPlugin(ItemPlugin);

export { ItemPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
