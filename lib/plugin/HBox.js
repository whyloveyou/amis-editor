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

var HBoxPlugin = /** @class */function (_super) {
  tslib.__extends(HBoxPlugin, _super);
  function HBoxPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'hbox';
    _this.$schema = '/schemas/HBoxSchema.json';
    _this.disabledRendererPlugin = true; // 组件面板不显示
    // 组件名称
    _this.name = 'HBox';
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-columns';
    _this.description = i18nRuntime.i18n("69a519f6b7fd6d0bebba72e7572ea1d6");
    _this.docLink = '/amis/zh-CN/components/hbox';
    _this.tags = [i18nRuntime.i18n("22c799040acdb2601b437ed5449de076")];
    _this.scaffold = {
      type: 'hbox',
      gap: 'base',
      columns: [{
        body: []
      }, {
        body: []
      }]
    };
    _this.previewSchema = {
      type: 'hbox',
      columns: [{
        type: 'tpl',
        tpl: i18nRuntime.i18n("f9c91bffab8b1202cf32ab508879e805"),
        columnClassName: 'bg-primary w-xs'
      }, {
        type: 'tpl',
        tpl: i18nRuntime.i18n("8c187c1862900db487c8d47e19490fac"),
        columnClassName: 'bg-success'
      }]
    };
    _this.panelTitle = 'HBox';
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), amisEditorCore.getSchemaTpl('fieldSet', {
          title: i18nRuntime.i18n("9bdb07e72d3a9a6084201a7398523f5a"),
          collapsable: false,
          body: [{
            type: 'wrapper',
            size: 'none',
            className: 'grid grid-cols-2 gap-4 mb-4',
            body: [{
              children: React__default["default"].createElement(amis.Button, {
                size: "sm",
                onClick: function () {
                  return _this.insertRowAfter(context.node);
                }
              }, React__default["default"].createElement(amisEditorCore.Icon, {
                className: "icon",
                icon: "arrow-to-bottom"
              }), React__default["default"].createElement("span", null, i18nRuntime.i18n("3c43c5860b4dfaced296d7a63eae1513")))
            }, {
              children: React__default["default"].createElement(amis.Button, {
                size: "sm",
                onClick: function () {
                  return _this.insertRowBefore(context.node);
                }
              }, React__default["default"].createElement(amisEditorCore.Icon, {
                className: "icon",
                icon: "top-arrow-to-top"
              }), React__default["default"].createElement("span", null, i18nRuntime.i18n("decaeded2b6f2c66f191ff34b868b1eb")))
            }]
          }, {
            label: i18nRuntime.i18n("eb22d47f16f92e6f621c2b9d87119303"),
            name: 'columns',
            type: 'select',
            pipeIn: function (value) {
              return Array.isArray(value) ? value.length : undefined;
            },
            pipeOut: function (value, origin) {
              if (Array.isArray(origin)) {
                if (origin.length > value) {
                  origin = origin.concat();
                  origin.splice(value - 1, origin.length - value);
                } else {
                  origin = origin.concat(amisEditorCore.repeatArray({
                    body: []
                  }, value - origin.length));
                }
              }
              return origin;
            },
            options: amisEditorCore.repeatArray(null, 12).map(function (_, index) {
              return {
                label: "".concat(index + 1),
                value: index + 1
              };
            })
          }]
        }), {
          type: 'list-select',
          name: 'gap',
          label: i18nRuntime.i18n("c288b519484207bea1d51884a5e9acaf"),
          size: 'sm',
          clearable: true,
          tiled: true,
          options: [{
            label: i18nRuntime.i18n("23ecf42cada8bf2715792d718544d107"),
            value: 'xs'
          }, {
            label: i18nRuntime.i18n("391b8fa9c747a1799353ab856e666ad5"),
            value: 'sm'
          }, {
            label: i18nRuntime.i18n("fd6e80f1e0199d6ecc3ee81ae04aa9ef"),
            value: 'base'
          }, {
            label: i18nRuntime.i18n("aed1dfbc31703955e64806b799b67645"),
            value: 'md'
          }, {
            label: i18nRuntime.i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
            value: 'lg'
          }]
        }, amisEditorCore.getSchemaTpl('combo-container', {
          name: 'columns',
          label: i18nRuntime.i18n("1f9794dd5634220ed0a498c666cf46fe"),
          type: 'combo',
          scaffold: {
            body: []
          },
          minLength: 1,
          multiple: true,
          // draggable: true,
          draggableTip: '',
          items: [{
            type: 'tpl',
            tpl: "<span class=\"label label-default\">".concat(i18nRuntime.i18n("cb2f68c9c24e85d21e6b090b6e5657d8"), "${index | plus}</span>"),
            columnClassName: 'no-grow v-middle'
          }, amisEditorCore.getSchemaTpl('className', {
            name: 'columnClassName',
            labelRemark: '',
            label: ''
          })]
        }), amisEditorCore.getSchemaTpl('fieldSet', {
          title: i18nRuntime.i18n("98d695d6a6a48cfb4bc2f6396ee64787"),
          collapsable: false,
          body: [{
            type: 'button-group-select',
            name: 'align',
            size: 'sm',
            label: false,
            tiled: true,
            pipeIn: amisEditorCore.defaultValue('left'),
            options: [{
              value: 'left',
              label: i18nRuntime.i18n("413f48cc71f71083ce532a86e3efdc21")
            }, {
              value: 'center',
              label: i18nRuntime.i18n("1cc9a6949b47913462ff832cb684bdde")
            }, {
              value: 'right',
              label: i18nRuntime.i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9")
            }, {
              value: 'between',
              label: i18nRuntime.i18n("da1b972efb29f850b50e219ad4d98ba5")
            }]
          }]
        }), amisEditorCore.getSchemaTpl('fieldSet', {
          title: i18nRuntime.i18n("11b7fc50778c89572391ec4c6c4b55e1"),
          collapsable: false,
          body: [{
            type: 'button-group-select',
            name: 'valign',
            size: 'sm',
            label: false,
            tiled: true,
            pipeIn: amisEditorCore.defaultValue('top'),
            options: [{
              value: 'top',
              label: i18nRuntime.i18n("2a6ad292447e6354ca39ee7f40d2fcc8")
            }, {
              value: 'middle',
              label: i18nRuntime.i18n("1cc9a6949b47913462ff832cb684bdde")
            }, {
              value: 'bottom',
              label: i18nRuntime.i18n("d68c21b6b65e7a2e361762b65b8a5032")
            }, {
              value: 'between',
              label: i18nRuntime.i18n("da1b972efb29f850b50e219ad4d98ba5")
            }]
          }]
        })]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('className'), amisEditorCore.getSchemaTpl('subFormItemMode'), amisEditorCore.getSchemaTpl('subFormHorizontalMode'), amisEditorCore.getSchemaTpl('subFormHorizontal')]
      }, {
        title: i18nRuntime.i18n("33bf801796fd255b5f6147e33146669b"),
        body: [amisEditorCore.getSchemaTpl('visible')]
      }])];
    };
    _this.vRendererConfig = {
      regions: {
        body: {
          key: 'body',
          label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
          placeholder: i18nRuntime.i18n("cb2f68c9c24e85d21e6b090b6e5657d8"),
          wrapperResolve: function (dom) {
            return dom;
          }
        }
      },
      panelTitle: i18nRuntime.i18n("cb2f68c9c24e85d21e6b090b6e5657d8"),
      panelBodyCreator: function (context) {
        return [amisEditorCore.getSchemaTpl('tabs', [{
          title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
          body: [amisEditorCore.getSchemaTpl('fieldSet', {
            title: i18nRuntime.i18n("9bdb07e72d3a9a6084201a7398523f5a"),
            collapsable: false,
            body: [{
              type: 'wrapper',
              size: 'none',
              className: 'grid grid-cols-2 gap-4',
              body: [{
                children: React__default["default"].createElement(amis.Button, {
                  size: "sm",
                  onClick: function () {
                    return _this.insertRowAfter(context.node.host);
                  }
                }, React__default["default"].createElement(amisEditorCore.Icon, {
                  className: "icon",
                  icon: "arrow-to-bottom"
                }), React__default["default"].createElement("span", null, i18nRuntime.i18n("3c43c5860b4dfaced296d7a63eae1513")))
              }, {
                children: React__default["default"].createElement(amis.Button, {
                  size: "sm",
                  onClick: function () {
                    return _this.insertRowBefore(context.node.host);
                  }
                }, React__default["default"].createElement(amisEditorCore.Icon, {
                  className: "icon",
                  icon: "top-arrow-to-top"
                }), React__default["default"].createElement("span", null, i18nRuntime.i18n("decaeded2b6f2c66f191ff34b868b1eb")))
              }, {
                children: React__default["default"].createElement(amis.Button, {
                  size: "sm",
                  onClick: function () {
                    return _this.insertColumnBefore(context);
                  }
                }, React__default["default"].createElement(amisEditorCore.Icon, {
                  className: "icon",
                  icon: "left-arrow-to-left"
                }), React__default["default"].createElement("span", null, i18nRuntime.i18n("0d9eb53682343f1cbd562c9a944ef5bf")))
              }, {
                children: React__default["default"].createElement(amis.Button, {
                  size: "sm",
                  onClick: function () {
                    return _this.insertColumnAfter(context);
                  }
                }, React__default["default"].createElement(amisEditorCore.Icon, {
                  className: "icon",
                  icon: "arrow-to-right"
                }), React__default["default"].createElement("span", null, i18nRuntime.i18n("814276d30e338eccbaee96c3e6bacb61")))
              }]
            }]
          }), amisEditorCore.getSchemaTpl('fieldSet', {
            title: i18nRuntime.i18n("a170a375b264f7fe0c02a7ca8c268784"),
            collapsable: false,
            body: [{
              type: 'button-group-select',
              name: 'width',
              size: 'sm',
              label: false,
              pipeIn: function (value) {
                return value && value !== 'auto' ? 'manual' : value || '';
              },
              pipeOut: function (value) {
                return value === 'manual' ? '20%' : value;
              },
              options: [{
                value: '',
                label: i18nRuntime.i18n("daa0f354e189c0da577ea25be13f874d")
              }, {
                value: 'auto',
                label: i18nRuntime.i18n("4db804afe5c99f7ca4fe988ada35c77f")
              }, {
                value: 'manual',
                label: i18nRuntime.i18n("2a3e7f5c382c56faf261a87573658325")
              }],
              description: "<% if (this.width && this.width !== \"auto\") {%>".concat(i18nRuntime.i18n("92e2c6523449dfad4350f58908260266"), "<%}%>")
            }]
          }), amisEditorCore.getSchemaTpl('fieldSet', {
            title: i18nRuntime.i18n("11b7fc50778c89572391ec4c6c4b55e1"),
            collapsable: false,
            body: [{
              type: 'button-group-select',
              name: 'valign',
              size: 'sm',
              label: false,
              tiled: true,
              clearable: true,
              options: [{
                value: 'top',
                label: i18nRuntime.i18n("2a6ad292447e6354ca39ee7f40d2fcc8")
              }, {
                value: 'middle',
                label: i18nRuntime.i18n("1cc9a6949b47913462ff832cb684bdde")
              }, {
                value: 'bottom',
                label: i18nRuntime.i18n("d68c21b6b65e7a2e361762b65b8a5032")
              }, {
                value: 'between',
                label: i18nRuntime.i18n("da1b972efb29f850b50e219ad4d98ba5")
              }]
            }]
          })]
        }, {
          title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
          body: [amisEditorCore.getSchemaTpl('className', {
            name: 'columnClassName',
            label: i18nRuntime.i18n("129b16a89a82c6d5e03ab075633b3892"),
            description: i18nRuntime.i18n("d34cc10492e80595a901a292d0c16bb8")
          })]
        }])];
      }
    };
    _this.vWrapperResolve = function (dom) {
      return dom;
    };
    _this.overrides = {
      renderColumn: function (node, index) {
        var _a, _b;
        var dom = this.super(node, index);
        var info = this.props.$$editor;
        if (info && node.$$id) {
          var plugin = info.plugin;
          var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.body;
          if (!region) {
            return dom;
          }
          return React__default["default"].createElement(amisEditorCore.VRenderer, {
            key: node.$$id,
            type: info.type,
            plugin: info.plugin,
            renderer: info.renderer,
            "$schema": "" // /schemas/GridColumn.json
            ,
            hostId: info.id,
            memberIndex: index,
            name: "\u7B2C".concat(index + 1, i18nRuntime.i18n("cb2f68c9c24e85d21e6b090b6e5657d8")),
            id: node.$$id,
            draggable: false,
            schemaPath: "".concat(info.schemaPath, "/hbox/").concat(index),
            wrapperResolve: plugin.vWrapperResolve,
            path: "".concat(this.props.$path, "/").concat(index),
            data: this.props.data,
            widthMutable: true
          }, region ? React__default["default"].createElement(amisEditorCore.RegionWrapper, {
            key: region.key,
            preferTag: region.preferTag,
            name: region.key,
            label: region.label,
            regionConfig: region,
            placeholder: region.placeholder,
            editorStore: plugin.manager.store,
            manager: plugin.manager,
            children: dom,
            wrapperResolve: region.wrapperResolve,
            rendererName: info.renderer.name
          }) : dom);
        }
        return dom;
      }
    };
    return _this;
  }
  // buildEditorPanel(context: BaseEventContext, panels: Array<BasicPanelItem>) {
  //   super.buildEditorPanel(context, panels);
  //   const parent = context.node.parent?.host as EditorNodeType;
  //   if (
  //     parent?.info?.plugin === this &&
  //     (this.vRendererConfig.panelControls ||
  //       this.vRendererConfig.panelControlsCreator)
  //   ) {
  //     panels.push({
  //       key: 'grid',
  //       order: 100,
  //       icon: this.vRendererConfig.panelIcon || 'fa fa-tablet',
  //       title: this.vRendererConfig.panelTitle || '格子',
  //       render: this.manager.makeSchemaFormRender({
  //         body: this.vRendererConfig.panelControlsCreator
  //           ? this.vRendererConfig.panelControlsCreator(context)
  //           : this.vRendererConfig.panelControls!
  //       })
  //     });
  //   }
  // }
  HBoxPlugin.prototype.afterResolveJsonSchema = function (event) {
    var _a, _b;
    var context = event.context;
    var parent = (_a = context.node.parent) === null || _a === void 0 ? void 0 : _a.host;
    if (((_b = parent === null || parent === void 0 ? void 0 : parent.info) === null || _b === void 0 ? void 0 : _b.plugin) === this) {
      event.setData('/schemas/HBoxColumn.json');
    }
  };
  HBoxPlugin.prototype.buildEditorContextMenu = function (context, menus) {
    var _this = this;
    var _a;
    if (context.selections.length || ((_a = context.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    if (context.node.isVitualRenderer) {
      menus.push('|');
      menus.push({
        label: i18nRuntime.i18n("4bfd6e7e1ec0fe485aa0e7741d1670db"),
        onSelect: function () {
          return _this.insertColumnBefore(context);
        }
      });
      menus.push({
        label: i18nRuntime.i18n("9d75cc0b193601391a139285d55a3493"),
        onSelect: function () {
          return _this.insertColumnAfter(context);
        }
      });
      menus.push('|');
      menus.push({
        label: i18nRuntime.i18n("57ff158884582ed498a87d03aed46146"),
        onSelect: function () {
          return _this.insertRowBefore(context.node.host);
        }
      });
      menus.push({
        label: i18nRuntime.i18n("bd63eab86ac0e0b35a06d0f24a098096"),
        onSelect: function () {
          return _this.insertRowAfter(context.node.host);
        }
      });
    } else {
      menus.push('|');
      menus.push({
        label: i18nRuntime.i18n("57ff158884582ed498a87d03aed46146"),
        onSelect: function () {
          return _this.insertRowBefore(context.node);
        }
      });
      menus.push({
        label: i18nRuntime.i18n("bd63eab86ac0e0b35a06d0f24a098096"),
        onSelect: function () {
          return _this.insertRowAfter(context.node);
        }
      });
    }
  };
  HBoxPlugin.prototype.onWidthChangeStart = function (event) {
    var _a, _b;
    var context = event.context;
    var node = context.node;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var host = node.host;
    if (!host || ((_b = host.info) === null || _b === void 0 ? void 0 : _b.plugin) !== this) {
      return;
    }
    var dom = context.dom;
    var parent = dom.parentElement;
    if (!parent) {
      return;
    }
    var resizer = context.resizer;
    var frameRect = parent.getBoundingClientRect();
    var columns = host.schema.columns;
    var index = node.index;
    var finalWidth = columns[index].width;
    var rect = dom.getBoundingClientRect();
    event.setData({
      onMove: function (e) {
        var width = e.pageX - rect.left;
        var percent = finalWidth = "".concat(Math.max(1, Math.min(99, Math.round(100 * width / frameRect.width))), "%");
        columns = columns.concat();
        columns[index] = tslib.__assign(tslib.__assign({}, columns[index]), {
          width: percent
        });
        resizer.setAttribute('data-value', percent);
        host.updateState({
          columns: columns
        });
        requestAnimationFrame(function () {
          node.calculateHighlightBox();
        });
      },
      onEnd: function () {
        host.updateState({}, true);
        resizer.removeAttribute('data-value');
        node.updateSchema({
          width: finalWidth
        });
        requestAnimationFrame(function () {
          node.calculateHighlightBox();
        });
      }
    });
  };
  HBoxPlugin.prototype.insertRowAfter = function (node) {
    var _a;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var store = this.manager.store;
    var schema = store.schema;
    var id = node.id;
    store.traceableSetSchema(amisEditorCore.JSONChangeInArray(schema, id, function (arr, node, index) {
      arr.splice(index + 1, 0, amisEditorCore.JSONPipeIn({
        type: 'hbox',
        align: node.align,
        valign: node.valign,
        columns: node.columns.map(function (column) {
          return {
            body: [],
            width: column === null || column === void 0 ? void 0 : column.width
          };
        })
      }));
    }));
  };
  HBoxPlugin.prototype.insertRowBefore = function (node) {
    var _a;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var store = this.manager.store;
    var id = node.id;
    var schema = store.schema;
    store.traceableSetSchema(amisEditorCore.JSONChangeInArray(schema, id, function (arr, node, index) {
      arr.splice(index, 0, amisEditorCore.JSONPipeIn({
        type: 'hbox',
        align: node.align,
        valign: node.valign,
        columns: node.columns.map(function (column) {
          return {
            body: [],
            width: column === null || column === void 0 ? void 0 : column.width
          };
        })
      }));
    }));
  };
  HBoxPlugin.prototype.insertColumnBefore = function (context) {
    var _a;
    var node = context.node;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var store = this.manager.store;
    var schema = store.schema;
    var id = context.id;
    store.traceableSetSchema(amisEditorCore.JSONChangeInArray(schema, id, function (arr, node, index) {
      arr.splice(index, 0, amisEditorCore.JSONPipeIn({
        body: []
      }));
    }));
  };
  HBoxPlugin.prototype.insertColumnAfter = function (context) {
    var _a;
    var node = context.node;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var id = context.id;
    var store = this.manager.store;
    var schema = store.schema;
    store.traceableSetSchema(amisEditorCore.JSONChangeInArray(schema, id, function (arr, node, index) {
      arr.splice(index + 1, 0, amisEditorCore.JSONPipeIn({
        body: []
      }));
    }));
  };
  HBoxPlugin.id = 'HBoxPlugin';
  HBoxPlugin.scene = ['layout'];
  return HBoxPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(HBoxPlugin);

exports.HBoxPlugin = HBoxPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
