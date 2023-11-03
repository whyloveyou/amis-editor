/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read, __assign } from 'tslib';
import { Button } from 'amis';
import React__default from 'react';
import { getSchemaTpl, Icon, VRenderer, RegionWrapper, repeatArray, defaultValue, JSONChangeInArray, JSONPipeIn, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var GridPlugin = /** @class */function (_super) {
  __extends(GridPlugin, _super);
  function GridPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'grid';
    _this.$schema = '/schemas/GridSchema.json';
    // 组件名称
    _this.name = i18n("2820712cac089483cf2b4a0c939fc780");
    _this.isBaseComponent = true;
    _this.description = i18n("9e17d57a0ba39254a75c0265aa3063ca");
    _this.docLink = '/amis/zh-CN/components/grid';
    _this.tags = [i18n("b1b98c19058af70d8bd499e1899e93bc")];
    _this.order = -2;
    _this.icon = 'fa fa-th';
    _this.pluginIcon = 'grid-plugin';
    /*
    scaffolds = [
      {
        name: '两栏',
        description: '两栏布局',
        scaffold: {
          type: 'grid',
          columns: [
            {
              body: []
            },
            {
              body: []
            }
          ]
        },
               previewSchema: {
          type: 'grid',
          columns: [
            {
              body: [
                {
                  type: 'tpl',
                  tpl: '栏',
                  inline: false,
                  wrapperComponent: '',
                  className: 'bg-light wrapper'
                }
              ]
            },
            {
              body: [
                {
                  type: 'tpl',
                  tpl: '栏',
                  wrapperComponent: '',
                  className: 'bg-light wrapper',
                  inline: false
                }
              ]
            }
          ]
        }
      },
             {
        name: '三栏',
        description: '三栏布局',
        scaffold: {
          type: 'grid',
          columns: [
            {
              body: []
            },
            {
              body: []
            },
            {
              body: []
            }
          ]
        },
               previewSchema: {
          type: 'grid',
          columns: [
            {
              body: [
                {
                  type: 'tpl',
                  tpl: '栏',
                  inline: false,
                  className: 'bg-light wrapper'
                }
              ]
            },
            {
              body: [
                {
                  type: 'tpl',
                  tpl: '栏',
                  wrapperComponent: '',
                  className: 'bg-light wrapper',
                  inline: false
                }
              ]
            },
            {
              body: [
                {
                  type: 'tpl',
                  tpl: '栏',
                  wrapperComponent: '',
                  className: 'bg-light wrapper',
                  inline: false
                }
              ]
            }
          ]
        }
      }
    ];
    */
    // 仅保留一个分栏布局
    _this.scaffold = {
      type: 'grid',
      columns: [{
        body: []
      }, {
        body: []
      }]
    };
    _this.previewSchema = {
      type: 'grid',
      columns: [{
        body: [{
          type: 'tpl',
          tpl: i18n("e63907bf0db529e84866d1ae737bfc0d"),
          inline: false,
          wrapperComponent: '',
          className: 'bg-light wrapper'
        }]
      }, {
        body: [{
          type: 'tpl',
          tpl: i18n("e63907bf0db529e84866d1ae737bfc0d"),
          wrapperComponent: '',
          className: 'bg-light wrapper',
          inline: false
        }]
      }]
    };
    _this.panelTitle = i18n("9e17d57a0ba39254a75c0265aa3063ca");
    _this.panelWithOutOthers = false;
    _this.vRendererConfig = {
      regions: {
        body: {
          key: 'body',
          label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
          placeholder: i18n("e63907bf0db529e84866d1ae737bfc0d"),
          wrapperResolve: function (dom) {
            return dom;
          }
        }
      },
      panelTitle: i18n("e63907bf0db529e84866d1ae737bfc0d"),
      panelBodyCreator: function (context) {
        var host = context.node.host;
        return [getSchemaTpl('tabs', [{
          title: i18n("24d67862f87f439db7ca957aecb77cce"),
          className: 'p-none',
          body: [getSchemaTpl('collapseGroup', [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            title: i18n("9bdb07e72d3a9a6084201a7398523f5a"),
            body: [{
              type: 'wrapper',
              size: 'none',
              className: 'grid grid-cols-2 gap-4',
              body: [host.isSecondFactor ? null : {
                children: React__default.createElement(Button, {
                  size: "sm",
                  onClick: function () {
                    return _this.insertRowAfter(context.node.host);
                  }
                }, React__default.createElement(Icon, {
                  className: "icon",
                  icon: "arrow-to-bottom"
                }), React__default.createElement("span", null, i18n("3c43c5860b4dfaced296d7a63eae1513")))
              }, host.isSecondFactor ? null : {
                children: React__default.createElement(Button, {
                  size: "sm",
                  onClick: function () {
                    return _this.insertRowBefore(context.node.host);
                  }
                }, React__default.createElement(Icon, {
                  className: "icon",
                  icon: "top-arrow-to-top"
                }), React__default.createElement("span", null, i18n("decaeded2b6f2c66f191ff34b868b1eb")))
              }, {
                children: React__default.createElement(Button, {
                  size: "sm",
                  onClick: function () {
                    return _this.insertColumnBefore(context);
                  }
                }, React__default.createElement(Icon, {
                  className: "icon",
                  icon: "left-arrow-to-left"
                }), React__default.createElement("span", null, i18n("0d9eb53682343f1cbd562c9a944ef5bf")))
              }, {
                children: React__default.createElement(Button, {
                  size: "sm",
                  onClick: function () {
                    return _this.insertColumnAfter(context);
                  }
                }, React__default.createElement(Icon, {
                  className: "icon",
                  icon: "arrow-to-right"
                }), React__default.createElement("span", null, i18n("814276d30e338eccbaee96c3e6bacb61")))
              }].filter(function (item) {
                return item;
              })
            }]
          }, {
            title: i18n("c28479019e24e0e4745f4948e9e97ee7"),
            body: [{
              type: 'button-group-select',
              name: 'md',
              size: 'sm',
              label: false,
              pipeIn: function (value) {
                return typeof value === 'number' ? 'manual' : value || '';
              },
              pipeOut: function (value) {
                return value === 'manual' ? 1 : value;
              },
              tiled: true,
              options: [{
                value: '',
                label: i18n("daa0f354e189c0da577ea25be13f874d")
              }, {
                value: 'auto',
                label: i18n("4db804afe5c99f7ca4fe988ada35c77f")
              }, {
                value: 'manual',
                label: i18n("2a3e7f5c382c56faf261a87573658325")
              }]
            }, {
              visibleOn: 'typeof this.md === "number"',
              label: i18n("d5d885add2551454955bd70411769c88"),
              type: 'input-range',
              name: 'md',
              min: 1,
              max: 12,
              step: 1
            }]
          }, {
            title: i18n("5aefca559c5a41d10078e21e6d616825"),
            body: [{
              type: 'button-group-select',
              name: 'valign',
              size: 'sm',
              label: false,
              tiled: true,
              clearable: true,
              inputClassName: 'flex-nowrap',
              options: [{
                value: 'top',
                label: i18n("2a6ad292447e6354ca39ee7f40d2fcc8")
              }, {
                value: 'middle',
                label: i18n("1cc9a6949b47913462ff832cb684bdde")
              }, {
                value: 'bottom',
                label: i18n("d68c21b6b65e7a2e361762b65b8a5032")
              }, {
                value: 'between',
                label: i18n("da1b972efb29f850b50e219ad4d98ba5")
              }]
            }]
          }])]
        }, {
          title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
          body: [getSchemaTpl('collapseGroup', __spreadArray([], __read(getSchemaTpl('theme:common', {
            exclude: ['layout']
          })), false))]
        }])];
      }
    };
    _this.vWrapperResolve = function (dom) {
      return dom;
    };
    _this.overrides = {
      renderColumn: function (node, index, length) {
        var _a, _b;
        var dom = this.super(node, index, length);
        var info = this.props.$$editor;
        if (info && node.$$id) {
          var plugin = info.plugin;
          var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.body;
          if (!region) {
            return dom;
          }
          return React__default.createElement(VRenderer, {
            key: "".concat(node.$$id, "-").concat(index),
            type: info.type,
            plugin: info.plugin,
            renderer: info.renderer,
            "$schema": "/schemas/GridColumn.json",
            hostId: info.id,
            memberIndex: index,
            name: "\u7B2C".concat(index + 1, i18n("e63907bf0db529e84866d1ae737bfc0d")),
            id: node.$$id,
            draggable: false,
            schemaPath: "".concat(info.schemaPath, "/grid/").concat(index),
            wrapperResolve: plugin.vWrapperResolve,
            path: "".concat(this.props.$path, "/").concat(index),
            data: this.props.data,
            widthMutable: true
          }, region ? React__default.createElement(RegionWrapper, {
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
  GridPlugin.prototype.panelBodyCreator = function (context) {
    var _this = this;
    var asSecondFactor = context.secondFactor;
    return [getSchemaTpl('tabs', [{
      title: i18n("24d67862f87f439db7ca957aecb77cce"),
      className: 'p-none',
      body: [getSchemaTpl('collapseGroup', [{
        title: i18n("9bdb07e72d3a9a6084201a7398523f5a"),
        body: [asSecondFactor ? null : {
          type: 'wrapper',
          size: 'none',
          className: 'grid grid-cols-2 gap-4 mb-4',
          body: [{
            children: React__default.createElement(Button, {
              size: "sm",
              onClick: function () {
                return _this.insertRowAfter(context.node);
              }
            }, React__default.createElement(Icon, {
              className: "icon",
              icon: "arrow-to-bottom"
            }), React__default.createElement("span", null, i18n("3c43c5860b4dfaced296d7a63eae1513")))
          }, {
            children: React__default.createElement(Button, {
              size: "sm",
              onClick: function () {
                return _this.insertRowBefore(context.node);
              }
            }, React__default.createElement(Icon, {
              className: "icon",
              icon: "top-arrow-to-top"
            }), React__default.createElement("span", null, i18n("decaeded2b6f2c66f191ff34b868b1eb")))
          }]
        }].filter(function (item) {
          return item;
        })
      }, {
        title: i18n("5aefca559c5a41d10078e21e6d616825"),
        body: [getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), {
          label: i18n("eb22d47f16f92e6f621c2b9d87119303"),
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
                origin = origin.concat(repeatArray({
                  body: []
                }, value - origin.length));
              }
            }
            return origin;
          },
          options: repeatArray(null, 12).map(function (_, index) {
            return {
              label: "".concat(index + 1),
              value: index + 1
            };
          })
        }, {
          type: 'button-group-select',
          name: 'gap',
          label: i18n("c288b519484207bea1d51884a5e9acaf"),
          size: 'sm',
          clearable: true,
          tiled: true,
          options: [{
            label: i18n("d81bb206a889656035b929cd8bb1ef10"),
            value: 'none'
          }, {
            label: i18n("23ecf42cada8bf2715792d718544d107"),
            value: 'xs'
          }, {
            label: i18n("391b8fa9c747a1799353ab856e666ad5"),
            value: 'sm'
          }, {
            label: i18n("fd6e80f1e0199d6ecc3ee81ae04aa9ef"),
            value: 'base'
          }, {
            label: i18n("aed1dfbc31703955e64806b799b67645"),
            value: 'md'
          }, {
            label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
            value: 'lg'
          }]
        }, {
          type: 'button-group-select',
          name: 'align',
          size: 'sm',
          label: i18n("98d695d6a6a48cfb4bc2f6396ee64787"),
          tiled: true,
          pipeIn: defaultValue('left'),
          inputClassName: 'flex-nowrap',
          options: [{
            value: 'left',
            label: i18n("413f48cc71f71083ce532a86e3efdc21")
          }, {
            value: 'center',
            label: i18n("1cc9a6949b47913462ff832cb684bdde")
          }, {
            value: 'right',
            label: i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9")
          }, {
            value: 'between',
            label: i18n("da1b972efb29f850b50e219ad4d98ba5")
          }]
        }, {
          type: 'button-group-select',
          name: 'valign',
          size: 'sm',
          label: i18n("11b7fc50778c89572391ec4c6c4b55e1"),
          tiled: true,
          pipeIn: defaultValue('top'),
          inputClassName: 'flex-nowrap',
          options: [{
            value: 'top',
            label: i18n("2a6ad292447e6354ca39ee7f40d2fcc8")
          }, {
            value: 'middle',
            label: i18n("1cc9a6949b47913462ff832cb684bdde")
          }, {
            value: 'bottom',
            label: i18n("d68c21b6b65e7a2e361762b65b8a5032")
          }, {
            value: 'between',
            label: i18n("da1b972efb29f850b50e219ad4d98ba5")
          }]
        }]
      }])]
    }, this.panelWithOutOthers ? null : {
      title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: [getSchemaTpl('collapseGroup', __spreadArray([getSchemaTpl('subFormItemMode'), getSchemaTpl('subFormHorizontalMode'), getSchemaTpl('subFormHorizontal')], __read(getSchemaTpl('theme:common', {
        exclude: ['layout']
      })), false))]
    }])];
  };
  GridPlugin.prototype.afterResolveJsonSchema = function (event) {
    var _a, _b;
    var context = event.context;
    var parent = (_a = context.node.parent) === null || _a === void 0 ? void 0 : _a.host;
    if (((_b = parent === null || parent === void 0 ? void 0 : parent.info) === null || _b === void 0 ? void 0 : _b.plugin) === this) {
      event.setData('/schemas/GridColumn.json');
    }
  };
  GridPlugin.prototype.buildEditorContextMenu = function (context, menus) {
    var _this = this;
    var _a;
    if (context.selections.length || ((_a = context.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    if (context.node.isVitualRenderer) {
      menus.push('|');
      menus.push({
        label: i18n("9cc03fc4b3e87e8410e10357a219b44e"),
        onSelect: function () {
          return _this.insertColumnBefore(context);
        }
      });
      menus.push({
        label: i18n("6b12fc99e2a46aed982d46b93ac191a0"),
        onSelect: function () {
          return _this.insertColumnAfter(context);
        }
      });
      menus.push('|');
      menus.push({
        label: i18n("57ff158884582ed498a87d03aed46146"),
        onSelect: function () {
          return _this.insertRowBefore(context.node.host);
        }
      });
      menus.push({
        label: i18n("bd63eab86ac0e0b35a06d0f24a098096"),
        onSelect: function () {
          return _this.insertRowAfter(context.node.host);
        }
      });
    } else {
      menus.push('|');
      menus.push({
        label: i18n("57ff158884582ed498a87d03aed46146"),
        onSelect: function () {
          return _this.insertRowBefore(context.node);
        }
      });
      menus.push({
        label: i18n("bd63eab86ac0e0b35a06d0f24a098096"),
        onSelect: function () {
          return _this.insertRowAfter(context.node);
        }
      });
    }
  };
  GridPlugin.prototype.onWidthChangeStart = function (event) {
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
    var finalMd = columns[index].md;
    var rect = dom.getBoundingClientRect();
    event.setData({
      onMove: function (e) {
        var width = e.pageX - rect.left;
        var md = finalMd = Math.max(1, Math.min(12, Math.round(12 * width / frameRect.width)));
        columns = columns.concat();
        columns[index] = __assign(__assign({}, columns[index]), {
          md: md
        });
        resizer.setAttribute('data-value', "".concat(md));
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
          md: finalMd
        });
        requestAnimationFrame(function () {
          node.calculateHighlightBox();
        });
      }
    });
  };
  GridPlugin.prototype.insertRowAfter = function (node) {
    var _this = this;
    var _a;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var store = this.manager.store;
    var schema = store.schema;
    var id = node.id;
    store.traceableSetSchema(JSONChangeInArray(schema, id, function (arr, node, index) {
      arr.splice(index + 1, 0, JSONPipeIn({
        type: _this.rendererName || 'grid',
        align: node.align,
        valign: node.valign,
        columns: node.columns.map(function (column) {
          return {
            body: [],
            md: column === null || column === void 0 ? void 0 : column.md
          };
        })
      }));
    }));
  };
  GridPlugin.prototype.insertRowBefore = function (node) {
    var _this = this;
    var _a;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var store = this.manager.store;
    var schema = store.schema;
    var id = node.id;
    store.traceableSetSchema(JSONChangeInArray(schema, id, function (arr, node, index) {
      arr.splice(index, 0, JSONPipeIn({
        type: _this.rendererName || 'grid',
        align: node.align,
        valign: node.valign,
        columns: node.columns.map(function (column) {
          return {
            body: [],
            md: column === null || column === void 0 ? void 0 : column.md
          };
        })
      }));
    }));
  };
  GridPlugin.prototype.insertColumnBefore = function (context) {
    var _a;
    var node = context.node;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var store = this.manager.store;
    var id = context.id;
    var schema = store.schema;
    store.traceableSetSchema(JSONChangeInArray(schema, id, function (arr, node, index) {
      arr.splice(index, 0, JSONPipeIn({
        body: []
      }));
    }));
  };
  GridPlugin.prototype.insertColumnAfter = function (context) {
    var _a;
    var node = context.node;
    if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
      return;
    }
    var store = this.manager.store;
    var schema = store.schema;
    var id = context.id;
    store.traceableSetSchema(JSONChangeInArray(schema, id, function (arr, node, index) {
      arr.splice(index + 1, 0, JSONPipeIn({
        body: []
      }));
    }));
  };
  GridPlugin.id = 'GridPlugin';
  GridPlugin.scene = ['layout'];
  return GridPlugin;
}(BasePlugin);
registerEditorPlugin(GridPlugin);

export { GridPlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
