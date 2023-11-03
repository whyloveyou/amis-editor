/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var GroupControlPlugin = /** @class */function (_super) {
  tslib.__extends(GroupControlPlugin, _super);
  function GroupControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'group';
    _this.$schema = '/schemas/GroupControlSchema.json';
    _this.disabledRendererPlugin = true; // 组件面板不显示
    // 组件名称
    _this.name = i18nRuntime.i18n("bb09a378529edac439abc2edf05c10d7");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-id-card-o';
    _this.pluginIcon = 'form-group-plugin';
    _this.description = i18nRuntime.i18n("39d36f049a794eb8df305b5ca7710c36");
    _this.docLink = '/amis/zh-CN/components/form/group';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'group',
      body: [{
        type: 'input-text',
        label: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb"),
        name: 'var1'
      }, {
        type: 'input-text',
        label: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb"),
        name: 'var2'
      }],
      label: false
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        mode: 'normal'
      })]
    };
    // 容器配置
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("32f6f7f8164c7f78e4b46eb50c158ab9"),
      renderMethod: 'renderInput',
      preferTag: i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85"),
      wrapperResolve: function (dom) {
        return dom;
      }
    }];
    _this.panelTitle = i18nRuntime.i18n("bb09a378529edac439abc2edf05c10d7");
    _this.panelBody = [amisEditorCore.getSchemaTpl('tabs', [{
      title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('description', {
        visible: 'this.label'
      }), {
        children: React__default["default"].createElement(amis.Button, {
          className: "m-b",
          onClick: function () {
            // this.manager.showInsertPanel('body')
            _this.manager.showRendererPanel(i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85"), i18nRuntime.i18n("400fbff5e744d3b7317dd130eaad723e"));
          },
          level: "danger",
          tooltip: i18nRuntime.i18n("a00f44e570f896de5490cba9d2462951"),
          size: "sm",
          block: true
        }, i18nRuntime.i18n("a9a8efb2541ee6f89ea7b83e610ebf7f"))
      }, amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('labelRemark')]
    }, {
      title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [amisEditorCore.getSchemaTpl('formItemMode'), amisEditorCore.getSchemaTpl('horizontalMode'), amisEditorCore.getSchemaTpl('horizontal', {
        visibleOn: '(data.$$formMode == "horizontal" || data.mode == "horizontal") && data.label !== false && data.horizontal',
        pipeIn: function (value, data) {
          value = value || data.formHorizontal && amisEditorCore.makeHorizontalDeeper(data.formHorizontal, data.body.length);
          return {
            leftRate: value && typeof value.left === 'number' ? value.left : value && /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(value.left) ? parseInt(RegExp.$1, 10) : 2,
            leftFixed: value && value.leftFixed || ''
          };
        }
      }), amisEditorCore.getSchemaTpl('subFormItemMode'), amisEditorCore.getSchemaTpl('subFormHorizontalMode'), amisEditorCore.getSchemaTpl('subFormHorizontal'), {
        name: 'body',
        type: 'combo',
        label: i18nRuntime.i18n("bd1aded1c983ab7fcf3990f0dc31047c"),
        multiple: true,
        removable: false,
        addable: false,
        multiLine: true,
        visibleOn: 'data.$$formMode != "inline"',
        items: [{
          type: 'button-group-select',
          name: 'columnRatio',
          label: i18nRuntime.i18n("a170a375b264f7fe0c02a7ca8c268784"),
          tiled: true,
          pipeIn: function (value, data) {
            if (typeof value === 'number') {
              return 'custom';
            } else if (data.columnClassName && /\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(data.columnClassName)) {
              return 'custom';
            }
            return value || '';
          },
          pipeOut: function (value) {
            return value === 'custom' ? 2 : value;
          },
          options: [{
            value: '',
            label: i18nRuntime.i18n("daa0f354e189c0da577ea25be13f874d")
          }, {
            value: 'auto',
            label: i18nRuntime.i18n("4db804afe5c99f7ca4fe988ada35c77f")
          }, {
            value: 'custom',
            label: i18nRuntime.i18n("f1d4ff50f3828f9b73412e7d94e6dd6e")
          }]
        }, {
          label: i18nRuntime.i18n("d5d885add2551454955bd70411769c88"),
          type: 'input-range',
          name: 'columnRatio',
          visibleOn: 'typeof this.columnRatio === "number" || this.columnClassName && /\\bcol\\-(?:xs|sm|md|lg)\\-(\\d+)\\b/.test(this.columnClassName)',
          pipeIn: function (value, data) {
            if (typeof value === 'number') {
              return value;
            }
            if (!data.columnClassName || !/\bcol\-(?:xs|sm|md|lg)\-(\d+)\b/.test(data.columnClassName)) {
              return 2;
            }
            return parseInt(RegExp.$1, 10) || 2;
          },
          min: 1,
          max: 12,
          step: 1
        }]
      }, {
        type: 'button-group-select',
        name: 'gap',
        label: i18nRuntime.i18n("ff7e66f1feaaed3260b6e8ef432efc79"),
        pipeIn: amisEditorCore.defaultValue(''),
        size: 'sm',
        tiled: true,
        clearable: true,
        options: [{
          value: 'xs',
          label: i18nRuntime.i18n("23ecf42cada8bf2715792d718544d107")
        }, {
          value: 'sm',
          label: i18nRuntime.i18n("391b8fa9c747a1799353ab856e666ad5")
        }, {
          value: 'md',
          label: i18nRuntime.i18n("aed1dfbc31703955e64806b799b67645")
        }, {
          value: 'lg',
          label: i18nRuntime.i18n("ab18e30c0dc4093ceeda8961fac3d1f4")
        }]
      }, amisEditorCore.getSchemaTpl('className'), {
        name: 'body',
        type: 'combo',
        label: i18nRuntime.i18n("1b3408880b73544a3fad501dafbb71e6"),
        multiple: true,
        removable: false,
        addable: false,
        items: [{
          type: 'input-text',
          name: 'columnClassName'
        }]
      }]
    }, {
      title: i18nRuntime.i18n("33bf801796fd255b5f6147e33146669b"),
      body: [amisEditorCore.getSchemaTpl('ref'), amisEditorCore.getSchemaTpl('visible')]
    }])];
    return _this;
  }
  GroupControlPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var _this = this;
    var id = _a.id,
      schema = _a.schema;
      _a.region;
      var selections = _a.selections,
      info = _a.info;
    if (selections.length || info.plugin !== this || !Array.isArray(schema.body) || schema.body.length < 2) {
      return;
    }
    menus.push({
      label: i18nRuntime.i18n("551481accddd97e18d7152f511fb8987"),
      onSelect: function () {
        var store = _this.manager.store;
        var rootSchema = store.schema;
        rootSchema = amisEditorCore.JSONUpdate(rootSchema, id, amisEditorCore.JSONPipeIn(schema.body), true);
        store.traceableSetSchema(rootSchema);
      }
    });
  };
  GroupControlPlugin.id = 'GroupControlPlugin';
  return GroupControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(GroupControlPlugin);

exports.GroupControlPlugin = GroupControlPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
