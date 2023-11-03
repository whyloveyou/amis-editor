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
var set = require('lodash/set');
var util = require('../util.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var set__default = /*#__PURE__*/_interopDefaultLegacy(set);

var List2Plugin = /** @class */function (_super) {
  tslib.__extends(List2Plugin, _super);
  function List2Plugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'cards';
    _this.$schema = '/schemas/CardsSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("3712972d84adf48acbd6ad24b4d75ad0");
    _this.isBaseComponent = true;
    _this.isListComponent = true;
    _this.memberImmutable = true;
    _this.description = i18nRuntime.i18n("85c17b016309a3f867a1803049b3bcd8");
    _this.docLink = '/amis/zh-CN/components/cards';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-window-maximize';
    _this.pluginIcon = 'cards-plugin';
    _this.scaffold = {
      type: 'cards',
      columnsCount: 1,
      card: {
        type: 'container',
        body: [{
          type: 'container',
          body: [{
            type: 'tpl',
            tpl: '01',
            inline: true,
            wrapperComponent: '',
            style: {
              color: 'var(--colors-neutral-text-2)',
              fontSize: 'var(--fonts-size-3)',
              fontWeight: 'var(--fonts-weight-5)',
              marginRight: '10px'
            }
          }, {
            type: 'tpl',
            tpl: '/',
            inline: true,
            wrapperComponent: '',
            style: {
              marginRight: '10px',
              fontSize: 'var(--fonts-size-3)',
              color: '#cccccc'
            },
            id: 'u:95d2a3ac3e70'
          }, {
            type: 'container',
            body: [{
              type: 'tpl',
              tpl: i18nRuntime.i18n("c4767bc3ad5c6812a8ea302e6126d988"),
              inline: true,
              wrapperComponent: '',
              style: {
                fontSize: 'var(--fonts-size-6)'
              }
            }, {
              type: 'tpl',
              tpl: '2023',
              inline: true,
              wrapperComponent: '',
              style: {
                fontSize: 'var(--fonts-size-6)'
              }
            }],
            style: {
              position: 'static',
              display: 'flex',
              flexWrap: 'nowrap',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            },
            wrapperBody: false,
            isFixedHeight: false,
            isFixedWidth: false
          }],
          size: 'none',
          style: {
            'position': 'static',
            'display': 'flex',
            'flex': '1 1 auto',
            'flexGrow': 0,
            'flexBasis': 'auto',
            'flexWrap': 'nowrap',
            'justifyContent': 'flex-start',
            'alignItems': 'center',
            'paddingLeft': '20px',
            'paddingRight': '40px',
            'right-border-width': 'var(--borders-width-2)',
            'right-border-style': 'var(--borders-style-2)',
            'right-border-color': '#ececec',
            'marginRight': '40px'
          },
          wrapperBody: false,
          isFixedHeight: false,
          isFixedWidth: false
        }, {
          type: 'container',
          body: [{
            type: 'tpl',
            tpl: i18nRuntime.i18n("499d02b4034d1234b407042ccce614a8"),
            inline: true,
            wrapperComponent: '',
            style: {
              fontSize: 'var(--fonts-size-5)',
              color: 'var(--colors-neutral-text-4)',
              fontWeight: 'var(--fonts-weight-4)',
              marginBottom: '10px'
            },
            maxLine: 1,
            id: 'u:105ca9cda3ef'
          }, {
            type: 'tpl',
            tpl: i18nRuntime.i18n("a302da1d8160ed0c72719c13346042a9"),
            inline: true,
            wrapperComponent: '',
            maxLine: 1,
            style: {
              fontSize: '13px',
              color: 'var(--colors-neutral-text-5)'
            }
          }],
          size: 'none',
          style: {
            position: 'static',
            display: 'flex',
            flex: '1 1 auto',
            flexGrow: 1,
            flexBasis: 'auto',
            flexWrap: 'nowrap',
            flexDirection: 'column',
            alignItems: 'flex-start'
          },
          wrapperBody: false,
          isFixedHeight: false,
          isFixedWidth: false
        }, {
          type: 'container',
          body: [{
            type: 'button',
            label: i18nRuntime.i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
            onEvent: {
              click: {
                actions: []
              }
            },
            level: 'default',
            size: 'default',
            editorState: 'default',
            themeCss: {
              className: {
                'border:default': {
                  'top-border-width': 'var(--borders-width-2)',
                  'left-border-width': 'var(--borders-width-2)',
                  'right-border-width': 'var(--borders-width-2)',
                  'bottom-border-width': 'var(--borders-width-2)',
                  'top-border-style': 'var(--borders-style-2)',
                  'left-border-style': 'var(--borders-style-2)',
                  'right-border-style': 'var(--borders-style-2)',
                  'bottom-border-style': 'var(--borders-style-2)',
                  'top-border-color': 'var(--colors-brand-6)',
                  'left-border-color': 'var(--colors-brand-6)',
                  'right-border-color': 'var(--colors-brand-6)',
                  'bottom-border-color': 'var(--colors-brand-6)'
                },
                'padding-and-margin:default': {
                  paddingLeft: '20px',
                  paddingRight: '20px'
                },
                'radius:default': {
                  'top-left-border-radius': '20px',
                  'top-right-border-radius': '20px',
                  'bottom-left-border-radius': '20px',
                  'bottom-right-border-radius': '20px'
                },
                'font:default': {
                  color: 'var(--colors-brand-6)'
                }
              }
            }
          }],
          size: 'xs',
          style: {
            position: 'static',
            display: 'flex',
            flex: '1 1 auto',
            flexGrow: 0,
            flexBasis: 'auto',
            flexWrap: 'nowrap',
            flexDirection: 'column',
            justifyContent: 'center'
          },
          wrapperBody: false,
          isFixedHeight: false,
          isFixedWidth: false,
          id: 'u:77cb3edb2288'
        }],
        wrapperBody: false,
        style: {
          'position': 'relative',
          'display': 'flex',
          'width': '100%',
          'paddingTop': '10px',
          'paddingRight': '10px',
          'paddingBottom': '10px',
          'paddingLeft': '10px',
          'radius': {
            'top-left-border-radius': '6px',
            'top-right-border-radius': '6px',
            'bottom-left-border-radius': '6px',
            'bottom-right-border-radius': '6px'
          },
          'top-border-width': 'var(--borders-width-1)',
          'left-border-width': 'var(--borders-width-1)',
          'right-border-width': 'var(--borders-width-1)',
          'bottom-border-width': 'var(--borders-width-1)',
          'top-border-style': 'var(--borders-style-1)',
          'left-border-style': 'var(--borders-style-1)',
          'right-border-style': 'var(--borders-style-1)',
          'bottom-border-style': 'var(--borders-style-1)',
          'top-border-color': '#3be157',
          'left-border-color': '#3be157',
          'right-border-color': '#3be157',
          'bottom-border-color': '#3be157',
          'boxShadow': ' 0px 0px 10px 0px var(--colors-neutral-line-8)'
        }
      },
      placeholder: '',
      // name: 'items',
      style: {
        gutterY: 10
      }
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      className: 'text-left ',
      items: [{}, {}, {}],
      style: {
        gutterY: 10,
        transform: 'scale(0.7)',
        width: '1200px',
        transformOrigin: 'left top'
      },
      name: 'items'
    });
    _this.panelTitle = i18nRuntime.i18n("3712972d84adf48acbd6ad24b4d75ad0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var _a, _b;
      var isCRUDBody = context.schema.type === 'crud';
      var curPosition = (_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.position;
      var isAbsolute = curPosition === 'fixed' || curPosition === 'absolute';
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-text',
            label: i18nRuntime.i18n("3791ba5c2962a42a251489872342b7d6"),
            name: 'editorSetting.displayName'
          }, isCRUDBody ? null : amisEditorCore.getSchemaTpl('formItemName', {
            label: i18nRuntime.i18n("41a344642681efaaa418c228ba7fb45c")
          }), amisEditorCore.getSchemaTpl('cardsPlaceholder')]
        }, amisEditorCore.getSchemaTpl('status')])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([{
          title: i18nRuntime.i18n("bb79667f37035e9562ec6bcffd6cf8ef"),
          body: [{
            name: 'columnsCount',
            type: 'input-range',
            visibleOn: '!this.leftFixed',
            min: 1,
            max: 12,
            step: 1,
            label: i18nRuntime.i18n("fcd70206ed8109b7ed361c7bce0922c4")
          }, {
            type: 'input-number',
            label: i18nRuntime.i18n("3ccfcb4c0daac7bb3ef1399b4389e3e5"),
            name: 'style.gutterX',
            visibleOn: 'this.columnsCount > 1'
          }, {
            type: 'input-number',
            label: i18nRuntime.i18n("ab57255c391c3732b4b38ae78f55e058"),
            name: 'style.gutterY'
          }, amisEditorCore.getSchemaTpl('layout:originPosition', {
            visibleOn: isAbsolute ? isAbsolute : undefined,
            value: 'left-top'
          })]
        }], tslib.__read(amisEditorCore.getSchemaTpl('theme:common', {
          exclude: ['layout']
        })), false))
      }])];
    };
    return _this;
  }
  List2Plugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var dataSchema = {
      $id: 'cards',
      type: 'object',
      title: i18nRuntime.i18n("390d9ad686ba5622d49443d1e3659d51"),
      properties: {}
    };
    var match = node.schema.source && String(node.schema.source).match(/{([\w-_]+)}/);
    var field = node.schema.name || (match === null || match === void 0 ? void 0 : match[1]);
    var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
    var schema = (_a = scope === null || scope === void 0 ? void 0 : scope.parent) === null || _a === void 0 ? void 0 : _a.getSchemaByPath(field);
    if (amis.isObject(schema === null || schema === void 0 ? void 0 : schema.items)) {
      dataSchema = tslib.__assign(tslib.__assign({}, dataSchema), schema.items);
      // 列表添加序号方便处理
      set__default["default"](dataSchema, 'properties.index', {
        type: 'number',
        title: i18nRuntime.i18n("b271e427962758c71e342a2c06df493a")
      });
    }
    return dataSchema;
  };
  List2Plugin.prototype.filterProps = function (props) {
    var _a;
    // 编辑时显示两行假数据
    var count = (props.columnsCount || 3) * 2;
    props.value = amisEditorCore.repeatArray({}, count).map(function (item, index) {
      return tslib.__assign(tslib.__assign({}, item), {
        id: index + 1
      });
    });
    props.className = "".concat(props.className || '', " ae-Editor-list");
    props.itemsClassName = "".concat(props.itemsClassName || '', " cards-items");
    if (props.card && !((_a = props.card.className) === null || _a === void 0 ? void 0 : _a.includes('listItem'))) {
      props.card.className = "".concat(props.card.className || '', " ae-Editor-listItem");
    }
    // 列表类型内的文本元素显示原始公式
    props = util.escapeFormula(props);
    return props;
  };
  List2Plugin.prototype.getRendererInfo = function (context) {
    var _a;
    var plugin = this;
    var renderer = context.renderer,
      schema = context.schema;
    if (!schema.$$id && ((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) === 'crud' && renderer.name === 'cards') {
      return tslib.__assign(tslib.__assign({}, {
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
  List2Plugin.id = 'List2Plugin';
  List2Plugin.scene = ['layout'];
  return List2Plugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(List2Plugin);

exports.List2Plugin = List2Plugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
