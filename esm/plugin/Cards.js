/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { isObject } from 'amis';
import { getSchemaTpl, repeatArray, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import set from 'lodash/set';
import { escapeFormula } from '../util.js';
import { i18n } from 'i18n-runtime';

var CardsPlugin = /** @class */function (_super) {
  __extends(CardsPlugin, _super);
  function CardsPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'cards';
    _this.$schema = '/schemas/CardsSchema.json';
    // 组件名称
    _this.name = i18n("093c340f7e1fbde1928ca56b5c7f9cc4");
    _this.isBaseComponent = true;
    _this.isListComponent = true;
    _this.memberImmutable = true;
    _this.description = i18n("85c17b016309a3f867a1803049b3bcd8");
    _this.docLink = '/amis/zh-CN/components/cards';
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-window-maximize';
    _this.pluginIcon = 'cards-plugin';
    _this.scaffold = {
      type: 'cards',
      columnsCount: 4,
      card: {
        type: 'container',
        body: [{
          type: 'container',
          body: [{
            type: 'icon',
            icon: 'fa fa-check',
            vendor: '',
            themeCss: {
              className: {
                'font': {
                  color: 'var(--colors-brand-6)',
                  fontSize: '20px'
                },
                'padding-and-margin:default': {
                  marginRight: '10px'
                }
              }
            }
          }, {
            type: 'tpl',
            tpl: i18n("b58da2d7e87937280042e1deca1153fa"),
            inline: true,
            wrapperComponent: '',
            editorSetting: {
              mock: {}
            },
            style: {
              fontSize: 'var(--fonts-size-6)',
              color: 'var(--colors-neutral-text-2)',
              fontWeight: 'var(--fonts-weight-3)'
            }
          }],
          style: {
            position: 'static',
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            marginBottom: '15px'
          },
          wrapperBody: false,
          isFixedHeight: false,
          isFixedWidth: false,
          size: 'none'
        }, {
          type: 'flex',
          className: 'p-1',
          items: [{
            type: 'container',
            body: [{
              type: 'container',
              body: [{
                type: 'tpl',
                tpl: '12/',
                inline: true,
                wrapperComponent: '',
                style: {
                  fontSize: 'var(--fonts-size-6)',
                  color: 'var(--colors-neutral-text-2)',
                  fontWeight: 'var(--fonts-weight-3)'
                }
              }, {
                type: 'tpl',
                tpl: '19',
                inline: true,
                wrapperComponent: '',
                style: {
                  color: 'var(--colors-neutral-text-6)',
                  fontSize: 'var(--fonts-size-6)'
                }
              }],
              style: {
                position: 'static',
                display: 'block',
                flex: '0 0 auto',
                marginTop: 'var(--sizes-size-0)',
                marginRight: 'var(--sizes-size-0)',
                marginBottom: 'var(--sizes-size-0)',
                marginLeft: 'var(--sizes-size-0)'
              },
              wrapperBody: false,
              isFixedWidth: false,
              size: 'none'
            }, {
              type: 'container',
              body: [{
                type: 'tpl',
                tpl: i18n("93b824b57d4c22085c1035f7254619db"),
                inline: true,
                wrapperComponent: '',
                style: {
                  color: 'var(--colors-neutral-text-5)'
                }
              }],
              style: {
                position: 'static',
                display: 'flex',
                flexWrap: 'nowrap',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: '0 0 auto'
              },
              wrapperBody: false,
              isFixedHeight: false,
              isFixedWidth: false,
              size: 'none'
            }],
            size: 'xs',
            style: {
              position: 'static',
              display: 'flex',
              flex: '1 1 auto',
              flexGrow: 1,
              flexBasis: 'auto',
              flexWrap: 'nowrap',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            },
            wrapperBody: false,
            isFixedHeight: false,
            isFixedWidth: false
          }, {
            type: 'container',
            body: [{
              type: 'tpl',
              tpl: '100%',
              inline: true,
              wrapperComponent: '',
              style: {
                fontSize: 'var(--fonts-size-6)',
                color: 'var(--colors-neutral-text-2)',
                fontWeight: 'var(--fonts-weight-3)'
              }
            }, {
              type: 'tpl',
              tpl: i18n("2a8249ce9e52240855dfabc0efc83a3a"),
              inline: true,
              wrapperComponent: '',
              style: {
                color: 'var(--colors-neutral-text-5)'
              }
            }],
            size: 'xs',
            style: {
              position: 'static',
              display: 'flex',
              flex: '1 1 auto',
              flexGrow: 1,
              flexBasis: 'auto',
              flexWrap: 'nowrap',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center'
            },
            wrapperBody: false,
            isFixedHeight: false,
            isFixedWidth: false
          }, {
            type: 'container',
            body: [{
              type: 'tpl',
              tpl: '99.9%',
              inline: true,
              wrapperComponent: '',
              style: {
                fontSize: 'var(--fonts-size-6)',
                color: 'var(--colors-neutral-text-2)',
                fontWeight: 'var(--fonts-weight-3)'
              }
            }, {
              type: 'tpl',
              tpl: i18n("09eb6d258fd00deaf350c2d1a0fd6f46"),
              inline: true,
              wrapperComponent: '',
              style: {
                color: 'var(--colors-neutral-text-5)'
              }
            }],
            size: 'xs',
            style: {
              position: 'static',
              display: 'flex',
              flex: '1 1 auto',
              flexGrow: 1,
              flexBasis: 'auto',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            },
            wrapperBody: false,
            isFixedHeight: false,
            isFixedWidth: false
          }],
          style: {
            position: 'relative'
          }
        }, {
          type: 'container',
          body: [{
            type: 'tpl',
            tpl: i18n("a5cd4ea1820d5c17c35e86885b1ef10d"),
            inline: true,
            wrapperComponent: '',
            style: {
              fontSize: '14px',
              color: 'var(--colors-neutral-text-5)'
            }
          }, {
            type: 'tpl',
            tpl: '2023-01-01 12:00',
            inline: true,
            wrapperComponent: '',
            style: {
              fontSize: '12px',
              color: 'var(--colors-neutral-text-6)'
            }
          }],
          style: {
            position: 'static',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            marginTop: '20px'
          },
          wrapperBody: false,
          isFixedHeight: false,
          isFixedWidth: false
        }],
        size: 'none',
        style: {
          'position': 'static',
          'display': 'block',
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
          'top-border-width': 'var(--borders-width-4)',
          'left-border-width': 'var(--borders-width-2)',
          'right-border-width': 'var(--borders-width-2)',
          'bottom-border-width': 'var(--borders-width-2)',
          'top-border-style': 'var(--borders-style-2)',
          'left-border-style': 'var(--borders-style-2)',
          'right-border-style': 'var(--borders-style-2)',
          'bottom-border-style': 'var(--borders-style-2)',
          'top-border-color': 'var(--colors-brand-6)',
          'left-border-color': 'var(--colors-brand-10)',
          'right-border-color': 'var(--colors-brand-10)',
          'bottom-border-color': 'var(--colors-brand-10)',
          'flex': '0 0 150px',
          'marginRight': '15px',
          'flexBasis': '100%'
        },
        wrapperBody: false,
        isFixedHeight: false,
        isFixedWidth: true,
        onEvent: {
          click: {
            weight: 0,
            actions: []
          }
        }
      },
      placeholder: '',
      name: '',
      style: {
        gutterX: 15,
        gutterY: 15
      }
    };
    _this.previewSchema = __assign(__assign({}, _this.scaffold), {
      className: 'text-left',
      name: 'items',
      columnsCount: 2,
      style: __assign(__assign({}, _this.scaffold.style), {
        transform: 'scale(0.5)',
        width: '600px',
        transformOrigin: 'left top'
      }),
      items: [{}, {}, {}, {}]
    });
    _this.panelTitle = i18n("6223c41373004e3111e768225450b4e8");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var _a, _b;
      var isCRUDBody = context.schema.type === 'crud';
      var curPosition = (_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.position;
      var isAbsolute = curPosition === 'fixed' || curPosition === 'absolute';
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'input-text',
            label: i18n("3791ba5c2962a42a251489872342b7d6"),
            name: 'editorSetting.displayName'
          }, isCRUDBody ? null : getSchemaTpl('formItemName', {
            label: i18n("41a344642681efaaa418c228ba7fb45c")
          }), getSchemaTpl('cardsPlaceholder')]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', __spreadArray([{
          title: i18n("bb79667f37035e9562ec6bcffd6cf8ef"),
          body: [{
            name: 'columnsCount',
            type: 'input-range',
            visibleOn: '!this.leftFixed',
            min: 0,
            max: 12,
            step: 1,
            label: i18n("fcd70206ed8109b7ed361c7bce0922c4"),
            description: i18n("3cf0da9fe51f92842e0a6d375fa5c605")
          }, {
            type: 'input-number',
            label: i18n("3ccfcb4c0daac7bb3ef1399b4389e3e5"),
            name: 'style.gutterX'
          }, {
            type: 'input-number',
            label: i18n("ab57255c391c3732b4b38ae78f55e058"),
            name: 'style.gutterY'
          }, getSchemaTpl('switch', {
            name: 'masonryLayout',
            label: i18n("953e91f3df59837ac2965cc04dec4b0d")
          }), getSchemaTpl('layout:originPosition', {
            visibleOn: isAbsolute ? isAbsolute : undefined,
            value: 'left-top'
          })]
        }], __read(getSchemaTpl('theme:common', {
          exclude: ['layout']
        })), false))
      }])];
    };
    return _this;
  }
  CardsPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a;
    var dataSchema = {
      $id: 'cards',
      type: 'object',
      title: i18n("390d9ad686ba5622d49443d1e3659d51"),
      properties: {}
    };
    var match = node.schema.source && String(node.schema.source).match(/{([\w-_]+)}/);
    var field = node.schema.name || (match === null || match === void 0 ? void 0 : match[1]);
    var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
    var schema = (_a = scope === null || scope === void 0 ? void 0 : scope.parent) === null || _a === void 0 ? void 0 : _a.getSchemaByPath(field);
    if (isObject(schema === null || schema === void 0 ? void 0 : schema.items)) {
      dataSchema = __assign(__assign({}, dataSchema), schema.items);
      // 列表添加序号方便处理
      set(dataSchema, 'properties.index', {
        type: 'number',
        title: i18n("b271e427962758c71e342a2c06df493a")
      });
    }
    return dataSchema;
  };
  CardsPlugin.prototype.filterProps = function (props) {
    var _a;
    // 编辑时显示两行假数据
    var count = (props.columnsCount || 3) * 2;
    props.value = repeatArray({}, count).map(function (item, index) {
      return __assign(__assign({}, item), {
        id: index + 1
      });
    });
    props.className = "".concat(props.className || '', " ae-Editor-list");
    props.itemsClassName = "".concat(props.itemsClassName || '', " cards-items");
    if (props.card && !((_a = props.card.className) === null || _a === void 0 ? void 0 : _a.includes('listItem'))) {
      props.card.className = "".concat(props.card.className || '', " ae-Editor-listItem");
    }
    // 列表类型内的文本元素显示原始公式
    props = escapeFormula(props);
    return props;
  };
  CardsPlugin.prototype.getRendererInfo = function (context) {
    var _a;
    var plugin = this;
    var renderer = context.renderer,
      schema = context.schema;
    if (!schema.$$id && ((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) === 'crud' && renderer.name === 'cards') {
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
  CardsPlugin.id = 'CardsPlugin';
  CardsPlugin.scene = ['layout'];
  return CardsPlugin;
}(BasePlugin);
registerEditorPlugin(CardsPlugin);

export { CardsPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
