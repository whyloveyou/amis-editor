/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var util = require('../util.js');
var i18nRuntime = require('i18n-runtime');

var TimelinePlugin = /** @class */function (_super) {
  tslib.__extends(TimelinePlugin, _super);
  function TimelinePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.rendererName = 'timeline';
    _this.$schema = '/schemas/TimelineSchema.json';
    _this.name = i18nRuntime.i18n("7cef725b75da8afecda59900b780be75");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-bars';
    _this.description = i18nRuntime.i18n("8f32bcb8d5baf6cbb410ef3f6dbed8d5");
    _this.docLink = '/amis/zh-CN/components/timeline';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.scaffold = {
      type: 'timeline',
      label: i18nRuntime.i18n("7cef725b75da8afecda59900b780be75"),
      name: 'timeline',
      items: [{
        time: '2012-12-21',
        title: i18nRuntime.i18n("70b8342d743374233bfee0f56c7f0fc7")
      }, {
        time: '2012-12-24',
        title: i18nRuntime.i18n("70b8342d743374233bfee0f56c7f0fc7")
      }, {
        time: '2012-12-27',
        title: i18nRuntime.i18n("70b8342d743374233bfee0f56c7f0fc7")
      }]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.panelTitle = i18nRuntime.i18n("7cef725b75da8afecda59900b780be75");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), {
            label: i18nRuntime.i18n("c360e994dbcffdf31e86d2d8875370e1"),
            name: 'reverse',
            value: false,
            type: 'button-group-select',
            inline: false,
            size: 'sm',
            options: [{
              label: i18nRuntime.i18n("825f53899a11e598fc9f9b43e0814a58"),
              value: false
            }, {
              label: i18nRuntime.i18n("8eb4b7abb66f0922778a39044b42d345"),
              value: true
            }]
          }, {
            label: i18nRuntime.i18n("0da2ab28a6e03922d4a0c78451146b87"),
            name: 'direction',
            value: 'vertical',
            type: 'button-group-select',
            size: 'sm',
            inline: true,
            options: [{
              label: i18nRuntime.i18n("75ac842f8e77305846f1d776f97dfaf8"),
              value: 'vertical'
            }, {
              label: i18nRuntime.i18n("4cde06e6162ed66720e3133cb83bc059"),
              value: 'horizontal'
            }]
          }, {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("d1b490c01d24a1a70e9c83a29ac38fde"), i18nRuntime.i18n("00ff9356c34d05ecbfd6559a46f56e25")),
            name: 'mode',
            value: 'right',
            type: 'button-group-select',
            visibleOn: 'data.direction === "vertical"',
            size: 'sm',
            options: [{
              label: i18nRuntime.i18n("39a2cb79c6d9762783e20522ea86dcff"),
              value: 'right'
            }, {
              label: i18nRuntime.i18n("de2a774bf98944b8f0ec8755d5f59d64"),
              value: 'left'
            }, {
              label: i18nRuntime.i18n("71039986e2386573ab6e5681986c2230"),
              value: 'alternate'
            }]
          }]
        }, {
          title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
          body: [amisEditorCore.getSchemaTpl('timelineItemControl', {
            name: 'items',
            mode: 'normal'
          }), {
            type: 'ae-switch-more',
            mode: 'normal',
            label: i18nRuntime.i18n("3b4bcc788ee92004cae962801b471b8d"),
            bulk: false,
            name: 'itemTitleSchema',
            formType: 'extend',
            form: {
              body: [{
                type: 'button',
                level: 'primary',
                size: 'sm',
                block: true,
                onClick: _this.editDetail.bind(_this, context),
                label: i18nRuntime.i18n("2328f91f1e160de6a06c2004d49ec53b")
              }]
            },
            pipeIn: function (value) {
              if (typeof value === 'undefined') {
                return false;
              }
              return typeof value !== 'string';
            },
            pipeOut: function (value) {
              if (value === true) {
                return {
                  type: 'tpl',
                  tpl: i18nRuntime.i18n("11e6dfd7d3fcb0892c2cecb6d7549102")
                };
              }
              return value ? value : undefined;
            }
          }]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [amisEditorCore.getSchemaTpl('className', {
            name: 'timeClassName',
            label: i18nRuntime.i18n("3d95415ee75837db2660255ea1ca1b9b")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'titleClassName',
            label: i18nRuntime.i18n("030c8cb75e9707285b28c4931bfeddc5")
          }), amisEditorCore.getSchemaTpl('className', {
            name: 'detailClassName',
            label: i18nRuntime.i18n("2fe3c5280ea644639bc6378bcecc8b27")
          })]
        })])
      }]);
    };
    return _this;
  }
  TimelinePlugin.prototype.editDetail = function (context) {
    var _a;
    var id = context.id,
      schema = context.schema;
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    var defaultItemSchema = {
      type: 'tpl',
      tpl: i18nRuntime.i18n("11e6dfd7d3fcb0892c2cecb6d7549102")
    };
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("2328f91f1e160de6a06c2004d49ec53b"),
      value: util.schemaToArray((_a = value.itemTitleSchema) !== null && _a !== void 0 ? _a : defaultItemSchema),
      slot: {
        type: 'container',
        body: '$$'
      },
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          itemTitleSchema: util.schemaArrayFormat(newValue)
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      },
      data: schema
    });
  };
  TimelinePlugin.id = 'TimelinePlugin';
  return TimelinePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TimelinePlugin);

exports.TimelinePlugin = TimelinePlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
