/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var util = require('../util.js');
var lodash = require('lodash');
var i18nRuntime = require('i18n-runtime');

var EachPlugin = /** @class */function (_super) {
  tslib.__extends(EachPlugin, _super);
  function EachPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'each';
    _this.$schema = '/schemas/EachSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("ff9f6c2d74c413daa3cd6fb12f8dfd3e");
    _this.isBaseComponent = true;
    _this.isListComponent = true;
    _this.memberImmutable = true;
    _this.description = i18nRuntime.i18n("f34111ff3694a6c6de6e31bef8ebadcb");
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-repeat';
    _this.pluginIcon = 'each-plugin';
    _this.scaffold = {
      type: 'each',
      name: '',
      items: {
        type: 'container',
        body: [{
          type: 'container',
          body: [{
            type: 'icon',
            icon: 'fa fa-plane',
            vendor: '',
            themeCss: {
              className: {
                'padding-and-margin:default': {
                  marginRight: '4px'
                },
                'font': {
                  color: '#2856ad',
                  fontSize: '20px'
                }
              }
            }
          }, {
            type: 'tpl',
            style: {
              fontWeight: 'var(--fonts-weight-3)',
              fontSize: '16px',
              color: 'var(--colors-brand-6)'
            },
            tpl: i18nRuntime.i18n("5d606821df2528b127c07333f5f403cd"),
            inline: true,
            wrapperComponent: ''
          }],
          style: {
            position: 'static',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '6px'
          },
          wrapperBody: false,
          isFixedHeight: false,
          isFixedWidth: false
        }, {
          type: 'container',
          body: [{
            type: 'tpl',
            tpl: i18nRuntime.i18n("796011a5b11f78292d93a73ff284de50"),
            inline: true,
            wrapperComponent: '',
            style: {
              'fontSize': 'var(--fonts-size-4)',
              'color': 'var(--colors-neutral-text-2)',
              'fontWeight': 'var(--fonts-weight-3)',
              'font-family': '-apple-system'
            }
          }],
          style: {
            position: 'static',
            display: 'block'
          },
          wrapperBody: false
        }],
        size: 'none',
        style: {
          position: 'static',
          display: 'block',
          flex: '0 0 150px',
          marginRight: '20px',
          paddingTop: '20px',
          paddingRight: '15px',
          paddingBottom: '20px',
          paddingLeft: '15px',
          flexBasis: '250px',
          overflowX: 'auto',
          overflowY: 'auto',
          boxShadow: ' 0px 0px 8px 0px rgba(3, 3, 3, 0.1)',
          radius: {
            'top-left-border-radius': 'var(--borders-radius-3)',
            'top-right-border-radius': 'var(--borders-radius-3)',
            'bottom-left-border-radius': 'var(--borders-radius-3)',
            'bottom-right-border-radius': 'var(--borders-radius-3)'
          }
        },
        wrapperBody: false,
        isFixedHeight: false
      },
      placeholder: '',
      style: {
        position: 'static',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10px',
        marginBottom: '10px'
      },
      isFixedHeight: false,
      isFixedWidth: false,
      size: 'none'
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      style: tslib.__assign(tslib.__assign({}, _this.scaffold.style), {
        transform: 'scale(0.6)',
        width: '600px',
        transformOrigin: 'left top'
      }),
      value: ['a', 'b']
    });
    _this.panelTitle = i18nRuntime.i18n("69bdc66bb88ac5b63053e2bb7db41801");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var _a, _b;
      var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
      var isFreeContainer = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.isFreeContainer) || false;
      var isFlexItem = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
      var isFlexColumnItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
      var displayTpl = [amisEditorCore.getSchemaTpl('layout:display'), amisEditorCore.getSchemaTpl('layout:flex-setting', {
        visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")',
        direction: curRendererSchema.direction,
        justify: curRendererSchema.justify,
        alignItems: curRendererSchema.alignItems
      }), amisEditorCore.getSchemaTpl('layout:flex-wrap', {
        visibleOn: 'data.style && (data.style.display === "flex" || data.style.display === "inline-flex")'
      })];
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-text',
            label: i18nRuntime.i18n("3791ba5c2962a42a251489872342b7d6"),
            name: 'editorSetting.displayName'
          }, amisEditorCore.getSchemaTpl('formItemName', {
            label: i18nRuntime.i18n("41a344642681efaaa418c228ba7fb45c"),
            paramType: 'output'
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: {
              type: 'input-number',
              min: 1
            },
            name: 'maxLength',
            label: i18nRuntime.i18n("7232042d4e1b0c8c7172d68048358619"),
            valueType: 'number'
          }), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: {
              type: 'input-text'
            },
            name: 'placeholder',
            label: i18nRuntime.i18n("ffa655818f7dd46fb2a767c51618741b")
          })]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([{
          title: i18nRuntime.i18n("5aefca559c5a41d10078e21e6d616825"),
          body: tslib.__spreadArray(tslib.__spreadArray([amisEditorCore.getSchemaTpl('layout:originPosition'), amisEditorCore.getSchemaTpl('layout:inset', {
            mode: 'vertical'
          })], tslib.__read(!isFreeContainer ? displayTpl : []), false), [isFlexItem ? amisEditorCore.getSchemaTpl('layout:flex', {
            isFlexColumnItem: isFlexColumnItem,
            label: isFlexColumnItem ? i18nRuntime.i18n("f02f876ee64cc016d97fa4dc498d4857") : i18nRuntime.i18n("a170a375b264f7fe0c02a7ca8c268784"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
          }) : null, isFlexItem ? amisEditorCore.getSchemaTpl('layout:flex-grow', {
            visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
          }) : null, isFlexItem ? amisEditorCore.getSchemaTpl('layout:flex-basis', {
            label: isFlexColumnItem ? i18nRuntime.i18n("183f00df0922a6be371fea58cd46a60a") : i18nRuntime.i18n("f92626f9e56b3e2d0c47495a446acf71"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
          }) : null, isFlexItem ? amisEditorCore.getSchemaTpl('layout:flex-basis', {
            label: isFlexColumnItem ? i18nRuntime.i18n("c19b79073b676b9bade80613aba2dbfa") : i18nRuntime.i18n("b591aed69defa2abf0486da6a58dfb5e"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
          }) : null, amisEditorCore.getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(isFlexItem && !isFlexColumnItem, " && data.style.flex === '0 0 150px'")
          }), amisEditorCore.getSchemaTpl('layout:isFixedHeight', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem),
            onChange: function (value) {
              context === null || context === void 0 ? void 0 : context.node.setHeightMutable(value);
            }
          }), amisEditorCore.getSchemaTpl('layout:height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:max-height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:min-height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:overflow-y', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem, " && (data.isFixedHeight || data.style && data.style.maxHeight) || (").concat(isFlexItem && isFlexColumnItem, " && data.style.flex === '0 0 150px')")
          }), amisEditorCore.getSchemaTpl('layout:isFixedWidth', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem),
            onChange: function (value) {
              context === null || context === void 0 ? void 0 : context.node.setWidthMutable(value);
            }
          }), amisEditorCore.getSchemaTpl('layout:width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:max-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:min-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), amisEditorCore.getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " && (data.isFixedWidth || data.style && data.style.maxWidth)")
          }), !isFlexItem ? amisEditorCore.getSchemaTpl('layout:margin-center') : null, !isFlexItem && !isFreeContainer ? amisEditorCore.getSchemaTpl('layout:textAlign', {
            name: 'style.textAlign',
            label: i18nRuntime.i18n("a3221d2d224767df4afa7a8653ded8fe"),
            visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
          }) : null, amisEditorCore.getSchemaTpl('layout:z-index'), amisEditorCore.getSchemaTpl('layout:sticky', {
            visibleOn: 'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
          }), amisEditorCore.getSchemaTpl('layout:stickyPosition')], false)
        }], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout']
        })), false))
      }]);
    };
    return _this;
  }
  EachPlugin.prototype.filterProps = function (props) {
    var _a;
    // 列表类型内的文本元素显示{{公式}}或者自定义展位，不显示实际值
    props = util.escapeFormula(props);
    // 循环编辑态显示2个元素
    props.value = [{}, {}];
    props.className = "".concat(props.className || '', " ae-Editor-list");
    if (props.items && !((_a = props.items.className) === null || _a === void 0 ? void 0 : _a.includes('listItem'))) {
      props.items.className = "".concat(props.items.className || '', " ae-Editor-eachItem");
    }
    return props;
  };
  EachPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var dataSchema = {
      $id: 'each',
      type: 'object',
      title: i18nRuntime.i18n("64095ae27232995731f776f12bf66d8d"),
      properties: {}
    };
    var match = node.schema.source && String(node.schema.source).match(/{([\w-_]+)}/);
    var field = node.schema.name || (match === null || match === void 0 ? void 0 : match[1]);
    var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
    var schema = (_a = scope === null || scope === void 0 ? void 0 : scope.parent) === null || _a === void 0 ? void 0 : _a.getSchemaByPath(field);
    if (amis.isObject(schema === null || schema === void 0 ? void 0 : schema.items)) {
      dataSchema = tslib.__assign(tslib.__assign({}, dataSchema), schema.items);
      // 循环添加索引方便渲染序号
      lodash.set(dataSchema, 'properties.index', {
        type: 'number',
        title: i18nRuntime.i18n("b271e427962758c71e342a2c06df493a")
      });
    }
    return dataSchema;
  };
  EachPlugin.id = 'EachPlugin';
  EachPlugin.scene = ['layout'];
  return EachPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(EachPlugin);

exports.EachPlugin = EachPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
