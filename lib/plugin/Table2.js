/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');
var amisCore = require('amis-core');
var amisEditorCore = require('amis-editor-core');
var DSBuilderManager = require('../builder/DSBuilderManager.js');
var helper = require('../renderer/event-control/helper.js');
var util = require('../util.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Table2RenderereEvent = [{
  eventName: 'selectedChange',
  eventLabel: i18nRuntime.i18n("257f5a3886d87d2255206f86b880d07e"),
  description: i18nRuntime.i18n("6130b1f75d624b2f73f5d923492e92f7"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          selectedItems: {
            type: 'array',
            title: i18nRuntime.i18n("94935dfa6c9b908515a593956ee7d07c")
          },
          unSelectedItems: {
            type: 'array',
            title: i18nRuntime.i18n("f10b94a4ac77878be53fad599a761928")
          }
        }
      }
    }
  }]
}, {
  eventName: 'columnSort',
  eventLabel: i18nRuntime.i18n("f3d21138c8ecf5683503c4f814cc7199"),
  description: i18nRuntime.i18n("d84464cfb2a5828a200fe9c28a323122"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          orderBy: {
            type: 'string',
            title: i18nRuntime.i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
          },
          orderDir: {
            type: 'string',
            title: i18nRuntime.i18n("c35c1a13309c6f9da9837857517e65fc")
          }
        }
      }
    }
  }]
}, {
  eventName: 'columnFilter',
  eventLabel: i18nRuntime.i18n("3d0b957a99d0c366612c01913e17a0c7"),
  description: i18nRuntime.i18n("b35963687361af98e6acdc004e87fc3c"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          filterName: {
            type: 'string',
            title: i18nRuntime.i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
          },
          filterValue: {
            type: 'string',
            title: i18nRuntime.i18n("e125986c2ba6783c4297ffe5405cc8bc")
          }
        }
      }
    }
  }]
}, {
  eventName: 'columnSearch',
  eventLabel: i18nRuntime.i18n("93a5a0253f11e3a2e58f4e87a52fb094"),
  description: i18nRuntime.i18n("6d4c4990ab2c32efe8a17c5f22e10cb5"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          searchName: {
            type: 'string',
            title: i18nRuntime.i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
          },
          searchValue: {
            type: 'object',
            title: i18nRuntime.i18n("caafbcb52c70ad0bbbbf127ee7b08b89")
          }
        }
      }
    }
  }]
}, {
  eventName: 'orderChange',
  eventLabel: i18nRuntime.i18n("85ddd38957256b6e9026f42ed570bc35"),
  description: i18nRuntime.i18n("d7a66def82af88cd5d408e38feb8a65a"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          movedItems: {
            type: 'array',
            title: i18nRuntime.i18n("64ef585f778c9d1b010e86b032398ab6")
          }
        }
      }
    }
  }]
}, {
  eventName: 'columnToggled',
  eventLabel: i18nRuntime.i18n("ecfebbc91e2c18a512aeb11b7da15193"),
  description: i18nRuntime.i18n("c94f45773a42dc386b9c9dcdc6fa542b"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          columns: {
            type: 'array',
            title: i18nRuntime.i18n("db9df54392e408520ca12c6a56113b5a")
          }
        }
      }
    }
  }]
}, {
  eventName: 'rowClick',
  eventLabel: i18nRuntime.i18n("76e47871d654c3b0b0e301c0a076e55a"),
  description: i18nRuntime.i18n("cc13521eab2c7423b3fb857772405cc3"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          item: {
            type: 'object',
            title: i18nRuntime.i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
          },
          index: {
            type: 'number',
            title: i18nRuntime.i18n("f74fd69ce55e3f96fe9a032c0da42330")
          }
        }
      }
    }
  }]
}, {
  eventName: 'rowMouseEnter',
  eventLabel: i18nRuntime.i18n("5db079b140feffa84c84d1b51d824dea"),
  description: i18nRuntime.i18n("90a5608bcd85a3cfcfbb5263a229915c"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          item: {
            type: 'object',
            title: i18nRuntime.i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
          },
          index: {
            type: 'number',
            title: i18nRuntime.i18n("f74fd69ce55e3f96fe9a032c0da42330")
          }
        }
      }
    }
  }]
}, {
  eventName: 'rowMouseLeave',
  eventLabel: i18nRuntime.i18n("e8bf039de5dc6751c4045f55930e0c83"),
  description: i18nRuntime.i18n("f1ca0d305f3251a81f361a2dc8e11fff"),
  dataSchema: [{
    type: 'object',
    properties: {
      data: {
        type: 'object',
        title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
        properties: {
          item: {
            type: 'object',
            title: i18nRuntime.i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
          },
          index: {
            type: 'number',
            title: i18nRuntime.i18n("f74fd69ce55e3f96fe9a032c0da42330")
          }
        }
      }
    }
  }]
}];
var Table2RendererAction = [{
  actionType: 'select',
  actionLabel: i18nRuntime.i18n("8eb3c8b16106e5487cd1fa3b8a1342ce"),
  description: i18nRuntime.i18n("908cc16fe4f7972450167e26276ac726"),
  schema: helper.getArgsWrapper([amisEditorCore.getSchemaTpl('formulaControl', {
    name: 'selected',
    label: i18nRuntime.i18n("a2b39e5a8b5015234dcd8e07a2e00e3d"),
    variables: '${variables}',
    size: 'lg',
    mode: 'horizontal'
  })])
}, {
  actionType: 'selectAll',
  actionLabel: i18nRuntime.i18n("366a3c07289bd6efb7c2a182f7a12772"),
  description: i18nRuntime.i18n("e97c09cd119b64ae0a8dfd42a1d449cb")
}, {
  actionType: 'clearAll',
  actionLabel: i18nRuntime.i18n("c3e8652924c258e121eed16414d3a9e5"),
  description: i18nRuntime.i18n("7619ec29c0a854dd49e0a7a47bf1a127")
}];
var Table2Plugin = /** @class */function (_super) {
  tslib.__extends(Table2Plugin, _super);
  function Table2Plugin(manager) {
    var _this = _super.call(this, manager) || this;
    _this.disabledRendererPlugin = true;
    _this.name = i18nRuntime.i18n("b339aa87104709397ba68e7ebbc6e5ba");
    _this.panelTitle = i18nRuntime.i18n("b339aa87104709397ba68e7ebbc6e5ba");
    _this.icon = 'fa fa-table';
    _this.panelIcon = 'fa fa-table';
    _this.pluginIcon = 'table-plugin';
    _this.rendererName = 'table2';
    _this.isBaseComponent = true;
    _this.panelJustify = true;
    _this.$schema = '/schemas/TableSchema2.json';
    _this.description = i18nRuntime.i18n("ea2b32f5d78d2305b9b7bc21e056a009");
    _this.docLink = '/amis/zh-CN/components/table2';
    _this.scaffold = {
      type: 'table2',
      columns: [{
        title: i18nRuntime.i18n("20aadc3f9b7edb564dc58898898e0dc8"),
        name: 'a'
      }],
      source: '$item'
    };
    _this.regions = [{
      key: 'columns',
      label: i18nRuntime.i18n("1f9794dd5634220ed0a498c666cf46fe"),
      renderMethod: 'renderTable',
      preferTag: i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7"),
      dndMode: 'position-h'
    }];
    _this.previewSchema = {
      type: 'table2',
      className: 'text-left m-b-none',
      items: [{
        a: 1,
        b: 2,
        c: 9
      }, {
        a: 3,
        b: 4,
        c: 8
      }, {
        a: 5,
        b: 6,
        c: 7
      }],
      columns: [{
        title: 'A',
        name: 'a'
      }, {
        title: 'B',
        name: 'b'
      }]
    };
    _this.scaffoldForm = {
      title: i18nRuntime.i18n("6b93fcfc1a5795189c6072fa6e86d4f6"),
      canRebuild: true,
      body: [{
        name: 'columns',
        type: 'combo',
        multiple: true,
        label: false,
        addButtonText: i18nRuntime.i18n("0c14e431f1b5ecd163f8fa010a0654c7"),
        draggable: true,
        items: [{
          type: 'input-text',
          name: 'title',
          placeholder: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab")
        }, {
          type: 'input-text',
          name: 'name',
          placeholder: i18nRuntime.i18n("41a344642681efaaa418c228ba7fb45c")
        }, {
          type: 'select',
          name: 'type',
          placeholder: i18nRuntime.i18n("226b0912184333c81babf2f1894ec0c1"),
          value: 'text',
          options: [{
            value: 'text',
            label: i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371")
          }, {
            value: 'tpl',
            label: i18nRuntime.i18n("59cf15fe6b8d659c9bd2f86143534a06")
          }, {
            value: 'image',
            label: i18nRuntime.i18n("20def7942674282277c3714ed7ea6ce0")
          }, {
            value: 'date',
            label: i18nRuntime.i18n("4ff1e74e43a3586339251494117185ad")
          }, {
            value: 'progress',
            label: i18nRuntime.i18n("c7bff79d059a0b7ff9b02441959d8be2")
          }, {
            value: 'status',
            label: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b")
          }, {
            value: 'mapping',
            label: i18nRuntime.i18n("9da188491dd34c4382a5b9f006194e41")
          }, {
            value: 'container',
            label: i18nRuntime.i18n("22c799040acdb2601b437ed5449de076")
          }, {
            value: 'operation',
            label: i18nRuntime.i18n("8abc564260a1564521e0c3a1d5419b4a")
          }]
        }]
      }]
    };
    _this.events = Table2RenderereEvent;
    _this.actions = Table2RendererAction;
    _this._dynamicControls = {
      primaryField: function (context) {
        return amisEditorCore.getSchemaTpl('primaryField', {
          /** CRUD下，该项配置提升到CRUD中 */
          hiddenOn: "data.type && (data.type === \"crud\" || data.type === \"crud2\")"
        });
      },
      quickSaveApi: function (context) {
        return amisEditorCore.getSchemaTpl('apiControl', {
          name: 'quickSaveApi',
          renderLabel: false,
          label: {
            type: 'tpl',
            tpl: i18nRuntime.i18n("33eaf97ecb3465754855e847f14d129c"),
            className: 'flex items-end'
          }
        });
      },
      quickSaveItemApi: function (context) {
        return amisEditorCore.getSchemaTpl('apiControl', {
          name: 'quickSaveItemApi',
          renderLabel: false,
          label: {
            type: 'tpl',
            tpl: i18nRuntime.i18n("ce7d31d64f2315e1d4cede288b9dfc60"),
            className: 'flex items-end'
          }
        });
      },
      rowSelectionKeyField: function (context) {
        return {
          type: 'input-text',
          name: 'rowSelection.keyField',
          label: i18nRuntime.i18n("dad6519c7c75a23bee8ccb576e4609a2")
        };
      },
      expandableKeyField: function (context) {
        return {
          type: 'input-text',
          name: 'rowSelection.keyField',
          label: i18nRuntime.i18n("dad6519c7c75a23bee8ccb576e4609a2")
        };
      },
      draggable: function (context) {
        return amisEditorCore.getSchemaTpl('switch', {
          name: 'draggable',
          label: i18nRuntime.i18n("5bdff9fd07d2a2430ac50e1559dbee27")
        });
      },
      itemDraggableOn: function (context) {
        return amisEditorCore.getSchemaTpl('formulaControl', {
          label: i18nRuntime.i18n("cba09997ca646e67544f880c80ab97cb"),
          name: 'itemDraggableOn'
        });
      },
      saveOrderApi: function (context) {
        return amisEditorCore.getSchemaTpl('apiControl', {
          name: 'saveOrderApi',
          renderLabel: false,
          label: {
            type: 'tpl',
            tpl: i18nRuntime.i18n("cbe89f133fda6e0d1bec31eaf6aa7853"),
            className: 'flex items-end'
          }
        });
      },
      columnTogglable: function (context) {
        return false;
      }
    };
    _this.panelBodyCreator = function (context) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      var isCRUDContext = _this.isCRUDContext(context);
      var dc = _this.dynamicControls;
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formulaControl', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c11322c9cc43ce3c004cf03f5ac0acd0"), i18nRuntime.i18n("5b11953888d7c376458b397f222d4533")),
            hidden: isCRUDContext,
            name: 'source',
            pipeIn: amisEditorCore.defaultValue('${items}')
          }), isCRUDContext ? null : (_a = dc === null || dc === void 0 ? void 0 : dc.primaryField) === null || _a === void 0 ? void 0 : _a.call(dc, context), isCRUDContext ? null : (_b = dc === null || dc === void 0 ? void 0 : dc.quickSaveApi) === null || _b === void 0 ? void 0 : _b.call(dc, context), isCRUDContext ? null : (_c = dc === null || dc === void 0 ? void 0 : dc.quickSaveItemApi) === null || _c === void 0 ? void 0 : _c.call(dc, context), amisEditorCore.getSchemaTpl('switch', {
            name: 'title',
            label: i18nRuntime.i18n("bd3e7a1b636e4477a4ea59922ed2cc1e"),
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              if (value) {
                return {
                  type: 'container',
                  body: [{
                    type: 'tpl',
                    wrapperComponent: '',
                    tpl: i18nRuntime.i18n("11d00f37d934b2464f3258952a398626"),
                    inline: false,
                    style: {
                      fontSize: 14
                    }
                  }]
                };
              }
              return null;
            }
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'showHeader',
            label: i18nRuntime.i18n("4e3cd1a7b193e2fd3458278d10c530e2"),
            value: true,
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return !!value;
            }
          }), amisEditorCore.getSchemaTpl('switch', {
            visibleOn: 'this.showHeader !== false',
            name: 'sticky',
            label: i18nRuntime.i18n("023ff3530e48493e653eb48e958a4eb8"),
            pipeIn: amisEditorCore.defaultValue(false)
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'footer',
            label: i18nRuntime.i18n("dd9b85b2cd13ca724afd1f43567abdbf"),
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              if (value) {
                return {
                  type: 'container',
                  body: [{
                    type: 'tpl',
                    tpl: i18nRuntime.i18n("c89b5fd3b706a17feb016d93c80e34b1"),
                    wrapperComponent: '',
                    inline: false,
                    style: {
                      fontSize: 14
                    }
                  }]
                };
              }
              return null;
            }
          }), amisEditorCore.getSchemaTpl('tablePlaceholder', {
            hidden: isCRUDContext
          })
          // TODD: 组件功能没有支持，暂时隐藏
          // {
          //   type: 'input-number',
          //   name: 'combineNum',
          //   label: '合并单元格'
          // }
          ].filter(Boolean)
        }, {
          title: i18nRuntime.i18n("949a8b7bd2c10070a2fae16f9c66afbb"),
          body: [(_d = dc === null || dc === void 0 ? void 0 : dc.columnTogglable) === null || _d === void 0 ? void 0 : _d.call(dc, context), amisEditorCore.getSchemaTpl('switch', {
            name: 'resizable',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("ba4f461832cbdb7fbdb170fc9c1db647"), i18nRuntime.i18n("aa2bd9f54608c0c85d3ceecb707938c9")),
            pipeIn: function (value) {
              return !!value;
            },
            pipeOut: function (value) {
              return value;
            }
          }), isCRUDContext ? null : {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'columnsTogglable',
            hiddenOnDefault: true,
            formType: 'extend',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("2816cea6c4887a53c417831deb5fbe00"), i18nRuntime.i18n("d3c5079f7e26b1a7374ff76341376de4")),
            pipeOut: function (value) {
              if (value && value.columnsTogglable) {
                return {
                  columnsTogglable: {
                    type: 'column-toggler'
                  }
                };
              }
              return value;
            },
            form: {
              body: [{
                mode: 'normal',
                type: 'ae-columnControl'
              }]
            }
          }].filter(Boolean)
        }, {
          title: i18nRuntime.i18n("ed85be57262e5a0c3116293e88278fef"),
          body: [{
            name: 'lineHeight',
            label: i18nRuntime.i18n("5a431ad16d8f7f23fac3be5650e51caa"),
            type: 'select',
            placeholder: i18nRuntime.i18n("3d2ac2fd2c60931fff1db814662334c3"),
            options: [{
              label: i18nRuntime.i18n("85a49c5ed4628647f2ead9206224dba3"),
              value: ''
            }, {
              label: i18nRuntime.i18n("4296d7d293c9ea4a0e52c6415f0b5c96"),
              value: 'large'
            }, {
              label: i18nRuntime.i18n("aed1dfbc31703955e64806b799b67645"),
              value: 'middle'
            }],
            clearable: false,
            value: ''
          }, {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'rowSelection',
            label: i18nRuntime.i18n("240145572215920ae06db1eeb85b29c0"),
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [/** 如果为 CRUD 背景下，主键配置、选择类型在 CRUD 面板中，此处应该隐藏 */
              isCRUDContext ? null : (_e = dc === null || dc === void 0 ? void 0 : dc.rowSelectionKeyField) === null || _e === void 0 ? void 0 : _e.call(dc, context), isCRUDContext ? null : {
                name: 'rowSelection.type',
                label: i18nRuntime.i18n("5e1872b4afc82fc5114b32aaf4477500"),
                type: 'button-group-select',
                options: [{
                  label: i18nRuntime.i18n("443f46c76ebe6ec4eb502f95c451e4b0"),
                  value: 'checkbox'
                }, {
                  label: i18nRuntime.i18n("9fd1b7cb41cfa3b83bdfd2a44381417f"),
                  value: 'radio'
                }],
                pipeIn: function (value, formStore) {
                  if (value != null && typeof value === 'string') {
                    return value;
                  }
                  var schema = formStore === null || formStore === void 0 ? void 0 : formStore.data;
                  return (schema === null || schema === void 0 ? void 0 : schema.selectable) === true ? schema.multiple ? 'checkbox' : 'radio' : 'checkbox';
                }
              }, amisEditorCore.getSchemaTpl('switch', {
                name: 'rowSelection.fixed',
                label: i18nRuntime.i18n("9c5c1f96ba29b9c0a8915be950e91cb3")
              }), {
                type: 'input-number',
                name: 'rowSelection.columnWidth',
                label: i18nRuntime.i18n("5fd9a061aa8d25137801caf78d8d0f42"),
                min: 0,
                pipeOut: function (data) {
                  return data || undefined;
                }
              }, {
                label: i18nRuntime.i18n("1f1ca9df5fa3648c718ad04649888943"),
                name: 'rowSelection.rowClick',
                type: 'button-group-select',
                value: false,
                options: [{
                  label: i18nRuntime.i18n("596171970b639a35dadde2aa930d666a"),
                  value: true
                }, {
                  label: i18nRuntime.i18n("454e60f5759903d7d3dba58e3f9bd590"),
                  value: false
                }]
              }, amisEditorCore.getSchemaTpl('formulaControl', {
                name: 'rowSelection.disableOn',
                label: i18nRuntime.i18n("388855093d17f3df43ff80242d7a1bed")
              }), {
                name: 'rowSelection.selections',
                label: i18nRuntime.i18n("46705a530ba9721527a4202bae7091bd"),
                type: 'checkboxes',
                joinValues: false,
                inline: false,
                itemClassName: 'text-sm',
                options: [{
                  label: i18nRuntime.i18n("107ce5ae5c46f0e63565c593eb09a312"),
                  value: 'all'
                }, {
                  label: i18nRuntime.i18n("f3993a00b12133950b96199dbf08fc43"),
                  value: 'invert'
                }, {
                  label: i18nRuntime.i18n("0cf1882623b2b50f0416030c980c3179"),
                  value: 'none'
                }, {
                  label: i18nRuntime.i18n("b5a34b813ffd5d7d776eb8ca56a1b45d"),
                  value: 'odd'
                }, {
                  label: i18nRuntime.i18n("0c2a525c7e183c05b46caa6b52a21b9f"),
                  value: 'even'
                }],
                pipeIn: function (v) {
                  if (!v) {
                    return;
                  }
                  return v.map(function (item) {
                    return {
                      label: item.text,
                      value: item.key
                    };
                  });
                },
                pipeOut: function (v) {
                  if (!v) {
                    return;
                  }
                  return v.map(function (item) {
                    return {
                      key: item.value,
                      text: item.label
                    };
                  });
                }
              }].filter(Boolean)
            }
          }, amisEditorCore.getSchemaTpl('formulaControl', {
            label: i18nRuntime.i18n("df5a3392ee995cfaa13787b11a1e2652"),
            name: 'itemCheckableOn'
          }), {
            type: 'input-number',
            name: 'maxKeepItemSelectionLength',
            label: i18nRuntime.i18n("76417db4eeb031b0bc15f4cf8178ae46")
          }, {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'expandable',
            label: i18nRuntime.i18n("49b4aa407b91ac997e27314e30c03110"),
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [(_f = dc === null || dc === void 0 ? void 0 : dc.expandableKeyField) === null || _f === void 0 ? void 0 : _f.call(dc, context), {
                type: 'select',
                label: i18nRuntime.i18n("4d250d2754fbdc9cbd131bf48d445894"),
                name: 'expandable.position',
                options: [{
                  label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
                  value: ''
                }, {
                  label: i18nRuntime.i18n("39a2cb79c6d9762783e20522ea86dcff"),
                  value: 'left'
                }, {
                  label: i18nRuntime.i18n("de2a774bf98944b8f0ec8755d5f59d64"),
                  value: 'right'
                }, {
                  label: i18nRuntime.i18n("dce5379cb978a8259ecfca8f08f00817"),
                  value: 'none'
                }]
              }, amisEditorCore.getSchemaTpl('formulaControl', {
                name: 'expandable.expandableOn',
                visibleOn: 'data.expandable',
                label: i18nRuntime.i18n("ea7026a83bf0b63ecc31fd8e215766de")
              }), {
                name: 'expandable',
                asFormItem: true,
                label: false,
                children: function (_a) {
                  var value = _a.value,
                    onBulkChange = _a.onBulkChange;
                    _a.onChange;
                    var name = _a.name;
                    _a.data;
                    _a.form;
                  var newValue = tslib.__assign(tslib.__assign({}, value), value && value.type ? {} : {
                    type: 'container',
                    body: [{
                      type: 'tpl',
                      tpl: i18nRuntime.i18n("1a7bd457c08093cf2cf887403dc249d8"),
                      inline: false
                    }]
                  });
                  return React__default["default"].createElement(amis.Button, {
                    className: "w-full flex flex-col items-center",
                    onClick: function () {
                      _this.manager.openSubEditor({
                        title: i18nRuntime.i18n("9e9b4716c08d4f15d9d52e00281f4265"),
                        value: newValue,
                        onChange: function (value) {
                          var _a;
                          onBulkChange((_a = {}, _a[name] = value, _a));
                        },
                        data: tslib.__assign({}, _this.manager.store.ctx) //默认数据
                      });
                    }
                  }, React__default["default"].createElement("span", {
                    className: "inline-flex items-center"
                  }, React__default["default"].createElement(amis.Icon, {
                    icon: "edit",
                    className: "mr-1 w-3"
                  }), i18nRuntime.i18n("9e9b4716c08d4f15d9d52e00281f4265")));
                }
              }]
            }
          }, {
            type: 'input-text',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("f09e007fa1c2e7eb9ec01f8481104d94"), i18nRuntime.i18n("1b4b8d809a7d253bb650d0f104d24ea2")),
            name: 'childrenColumnName',
            pipeIn: amisEditorCore.defaultValue('children')
          }, (_g = dc === null || dc === void 0 ? void 0 : dc.draggable) === null || _g === void 0 ? void 0 : _g.call(dc, context), (_h = dc === null || dc === void 0 ? void 0 : dc.itemDraggableOn) === null || _h === void 0 ? void 0 : _h.call(dc, context), (_j = dc === null || dc === void 0 ? void 0 : dc.saveOrderApi) === null || _j === void 0 ? void 0 : _j.call(dc, context), {
            name: 'showBadge',
            label: i18nRuntime.i18n("f53160d07e516a3b0d38d61822944b03"),
            type: 'ae-switch-more',
            mode: 'normal',
            formType: 'extend',
            bulk: true,
            defaultData: {
              itemBadge: {
                mode: 'dot'
              }
            },
            isChecked: function (e) {
              var data = e.data,
                name = e.name;
              return data[name];
            },
            form: {
              body: [{
                type: 'ae-badge',
                label: false,
                name: 'itemBadge',
                contentsOnly: true
              }]
            }
          }]
        }, {
          title: i18nRuntime.i18n("e821ce185e41eac2ab846ef5cfde2363"),
          body: [amisEditorCore.getSchemaTpl('switch', {
            name: 'keepItemSelectionOnPageChange',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("099cf136d6a4b6ed4646af4a2ed066b2"), i18nRuntime.i18n("60011314ed92794f3d4f3e874c359279")),
            /** 目前仅支持2种类型，默认是 pagination */
            visibleOn: '!data.loadType || data.loadType !== "more"'
          }), {
            name: 'maxKeepItemSelectionLength',
            type: 'input-number',
            label: i18nRuntime.i18n("76417db4eeb031b0bc15f4cf8178ae46"),
            visibleOn: 'data.keepItemSelectionOnPageChange'
          }]
        }, {
          title: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          body: [amisEditorCore.getSchemaTpl('hidden', {
            label: i18nRuntime.i18n("dce5379cb978a8259ecfca8f08f00817")
          })]
        }])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('switch', {
            name: 'bordered',
            label: i18nRuntime.i18n("961534b4ea37e4e88aada736b299d063"),
            pipeIn: amisEditorCore.defaultValue(false)
          }), {
            name: 'size',
            label: i18nRuntime.i18n("b3b97a293baac13db6367aba5539a09c"),
            type: 'select',
            pipeIn: amisEditorCore.defaultValue('default'),
            options: [{
              label: i18nRuntime.i18n("391b8fa9c747a1799353ab856e666ad5"),
              value: 'small'
            }, {
              label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
              value: 'default'
            }, {
              label: i18nRuntime.i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
              value: 'large'
            }]
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'autoFillHeight',
            label: i18nRuntime.i18n("8952f4e24070a79741a505dc20bad8f0")
          }), {
            name: 'scroll.y',
            label: i18nRuntime.i18n("a5baa4818b14f4680955aa34dd559d02"),
            type: 'button-group-select',
            pipeIn: function (v) {
              return v != null;
            },
            pipeOut: function (v) {
              return v ? '' : null;
            },
            options: [{
              label: i18nRuntime.i18n("4db804afe5c99f7ca4fe988ada35c77f"),
              value: false
            }, {
              label: i18nRuntime.i18n("1ef8fd21130d17cb7c1613eaed6ca1e4"),
              value: true
            }]
          }, {
            type: 'input-group',
            visibleOn: 'data.scroll && data.scroll.y !== null',
            label: i18nRuntime.i18n("ee18dc475df8654cb13ad67dd84eec28"),
            body: [{
              type: 'input-number',
              name: 'scroll.y'
            }, {
              type: 'tpl',
              addOnclassName: 'border-0 bg-none',
              tpl: 'px'
            }]
          }, {
            name: 'scroll.x',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("8bb5781dc5f2745e6356cdc5e6d76b16"), i18nRuntime.i18n("88a364068f684dc77aca5b6c006ef576")),
            type: 'button-group-select',
            pipeIn: function (v) {
              return v != null;
            },
            pipeOut: function (v) {
              return v ? '' : null;
            },
            options: [{
              label: i18nRuntime.i18n("4db804afe5c99f7ca4fe988ada35c77f"),
              value: false
            }, {
              label: i18nRuntime.i18n("1ef8fd21130d17cb7c1613eaed6ca1e4"),
              value: true
            }]
          }, {
            type: 'input-group',
            visibleOn: 'data.scroll && data.scroll.x !== null',
            name: 'scroll.x',
            label: i18nRuntime.i18n("6e3d35b57c29b1b419569cc55b3a5d33"),
            body: [{
              type: 'input-number',
              name: 'scroll.x'
            }, {
              type: 'tpl',
              addOnclassName: 'border-0 bg-none',
              tpl: 'px'
            }]
          }, {
            name: 'indentSize',
            visibleOn: 'data.childrenColumnName',
            type: 'input-number',
            unitOptions: [{
              label: 'px',
              value: 'px'
            }],
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("dd7befc8e7c124f6f4ba9bbf3de9dc53"), i18nRuntime.i18n("eedd7279409d000114e27194f3c8a5ea"))
          }, {
            name: 'rowSelection.columnWidth',
            visibleOn: 'data.rowSelection',
            type: 'input-number',
            label: i18nRuntime.i18n("6bfd4423d8aebbf0cac7ba4d74f245bd"),
            description: i18nRuntime.i18n("21922c6479665dcba83106f8e9ffdf68")
          }, {
            name: 'expandable.columnWidth',
            visibleOn: 'data.expandable',
            type: 'input-number',
            label: i18nRuntime.i18n("31b7c58c2d9a170829b90314ff98b66a"),
            description: i18nRuntime.i18n("81ccf26d9622d139a13ba2a61bd9fea4")
          }]
        }, amisEditorCore.getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("4bf8b7a0b3385fcd34a8e0cd355d7964"),
            name: 'rowClassName'
          }), amisEditorCore.getSchemaTpl('formulaControl', {
            name: 'rowClassNameExpr',
            label: i18nRuntime.i18n("68e9249db7bd12ab17994b1761b049f5")
          }), amisEditorCore.getSchemaTpl('formulaControl', {
            name: 'expandable.expandedRowClassNameExpr',
            visibleOn: 'data.expandable',
            label: i18nRuntime.i18n("ef0c5b6fa16497343eedb76171d61d68")
          })]
        })])]
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    _this.dsManager = new DSBuilderManager.DSBuilderManager(manager);
    return _this;
  }
  // 为了能够自动注入数据。
  Table2Plugin.prototype.getRendererInfo = function (context) {
    var _a, _b, _c, _d, _e;
    var plugin = this;
    var schema = context.schema,
      renderer = context.renderer;
    var isCRUD = ['crud', 'crud2'].includes((_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_e = (_d = (_c = context === null || context === void 0 ? void 0 : context.schema) === null || _c === void 0 ? void 0 : _c.$$editor) === null || _d === void 0 ? void 0 : _d.renderer) === null || _e === void 0 ? void 0 : _e.name);
    if (!schema.$$id && isCRUD && renderer.name === 'table2') {
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
        renderRenderer: plugin.renderRenderer
      });
    }
    return _super.prototype.getRendererInfo.call(this, context);
  };
  Table2Plugin.prototype.filterProps = function (props) {
    var arr = util.resolveArrayDatasource(props);
    if (!Array.isArray(arr) || !arr.length) {
      var mockedData_1 = {};
      if (Array.isArray(props.columns)) {
        props.columns.forEach(function (column) {
          if (column.name) {
            amisCore.setVariable(mockedData_1, column.name, amisEditorCore.mockValue(column));
          }
        });
      }
      props.value = amisEditorCore.repeatArray(mockedData_1, 10).map(function (item, index) {
        return tslib.__assign(tslib.__assign({}, item), {
          id: index + 1
        });
      });
    } else {
      // 只取10条预览，否则太多卡顿
      props.value = arr.slice(0, 10);
    }
    // 如果设置了可展开 默认把第一行展开
    if (props.expandable) {
      if (typeof props.expandable === 'boolean') {
        props.expandable = {};
      }
      if (!props.expandable.type) {
        props.expandable.type = 'container';
        props.expandable.body = [{
          type: 'tpl',
          tpl: i18nRuntime.i18n("1a7bd457c08093cf2cf887403dc249d8"),
          wrapperComponent: '',
          inline: false
        }];
      }
      props.expandable.keyField = 'id';
      props.expandable.expandedRowKeys = [1];
    }
    return props;
  };
  // 自动插入 label
  Table2Plugin.prototype.beforeInsert = function (event) {
    var _a, _b, _c, _d;
    var context = event.context;
    if ((context.info.plugin === this || ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) && context.region === 'columns') {
      context.data = tslib.__assign(tslib.__assign({}, context.data), {
        title: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : i18nRuntime.i18n("bcee820bc20342a4d388a35ed32a35fe")
      });
    }
  };
  Table2Plugin.prototype.buildDataSchemas = function (node, region, trigger) {
    var _a, _b;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var itemsSchema, columns, _c, _d, current, schema, _e, _f, _g, e_1_1, cellProperties, isColumnChild, result;
      var e_1, _h;
      return tslib.__generator(this, function (_j) {
        switch (_j.label) {
          case 0:
            itemsSchema = {
              $id: 'tableRow',
              type: 'object',
              properties: {}
            };
            columns = node.children.find(function (item) {
              return item.isRegion && item.region === 'columns';
            });
            if (!columns) return [3 /*break*/, 10];
            _j.label = 1;
          case 1:
            _j.trys.push([1, 8, 9, 10]);
            _c = tslib.__values(columns.children), _d = _c.next();
            _j.label = 2;
          case 2:
            if (!!_d.done) return [3 /*break*/, 7];
            current = _d.value;
            schema = current.schema;
            if (!(schema === null || schema === void 0 ? void 0 : schema.name)) return [3 /*break*/, 6];
            _e = itemsSchema.properties;
            _f = schema.name;
            if (!((_b = (_a = current.info) === null || _a === void 0 ? void 0 : _a.plugin) === null || _b === void 0 ? void 0 : _b.buildDataSchemas)) return [3 /*break*/, 4];
            return [4 /*yield*/, current.info.plugin.buildDataSchemas(current, region)];
          case 3:
            _g = _j.sent();
            return [3 /*break*/, 5];
          case 4:
            _g = {
              type: 'string',
              title: schema.label || schema.title
            };
            _j.label = 5;
          case 5:
            _e[_f] = _g;
            _j.label = 6;
          case 6:
            _d = _c.next();
            return [3 /*break*/, 2];
          case 7:
            return [3 /*break*/, 10];
          case 8:
            e_1_1 = _j.sent();
            e_1 = {
              error: e_1_1
            };
            return [3 /*break*/, 10];
          case 9:
            try {
              if (_d && !_d.done && (_h = _c.return)) _h.call(_c);
            } finally {
              if (e_1) throw e_1.error;
            }
            return [7 /*endfinally*/];
          case 10:
            cellProperties = {};
            if (trigger) {
              isColumnChild = amisCore.someTree(columns === null || columns === void 0 ? void 0 : columns.children, function (item) {
                return item.id === trigger.id;
              });
              isColumnChild && (cellProperties = itemsSchema.properties);
            }
            result = {
              $id: 'table2',
              type: 'object',
              properties: tslib.__assign(tslib.__assign({}, cellProperties), {
                rows: {
                  type: 'array',
                  title: i18nRuntime.i18n("77fdd35933c099cdcb64b71f3fbe7a6c"),
                  items: itemsSchema
                }
              })
            };
            if ((region === null || region === void 0 ? void 0 : region.region) === 'columns') {
              result.properties = tslib.__assign(tslib.__assign({}, itemsSchema.properties), result.properties);
            }
            return [2 /*return*/, result];
        }
      });
    });
  };
  Table2Plugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return tslib.__awaiter(this, void 0, void 0, function () {
      var builder;
      return tslib.__generator(this, function (_p) {
        if (((_b = (_a = node === null || node === void 0 ? void 0 : node.info) === null || _a === void 0 ? void 0 : _a.renderer) === null || _b === void 0 ? void 0 : _b.name) && ['table-cell', 'cell-field'].includes(node.info.renderer.name)) {
          if (((_c = scopeNode.parent) === null || _c === void 0 ? void 0 : _c.type) === 'crud2' && ((_e = (_d = scopeNode.parent) === null || _d === void 0 ? void 0 : _d.path) === null || _e === void 0 ? void 0 : _e.endsWith('crud2'))) {
            return [2 /*return*/, (_g = (_f = scopeNode.parent.info.plugin).getAvailableContextFields) === null || _g === void 0 ? void 0 : _g.call(_f, scopeNode.parent, node, region)];
          }
          if (((_h = scopeNode.parent) === null || _h === void 0 ? void 0 : _h.type) === 'service' && ((_l = (_k = (_j = scopeNode.parent) === null || _j === void 0 ? void 0 : _j.parent) === null || _k === void 0 ? void 0 : _k.path) === null || _l === void 0 ? void 0 : _l.endsWith('service'))) {
            return [2 /*return*/, (_o = (_m = scopeNode.parent.parent.info.plugin).getAvailableContextFields) === null || _o === void 0 ? void 0 : _o.call(_m, scopeNode.parent.parent, node, region)];
          }
        }
        builder = this.dsManager.getBuilderBySchema(scopeNode.schema);
        if (builder && scopeNode.schema.api) {
          return [2 /*return*/, builder.getAvailableContextFields({
            schema: scopeNode.schema,
            sourceKey: 'api',
            feat: 'List'
          }, node)];
        }
        return [2 /*return*/];
      });
    });
  };

  Object.defineProperty(Table2Plugin.prototype, "dynamicControls", {
    /** 需要动态控制的控件 */
    get: function () {
      return this._dynamicControls;
    },
    set: function (controls) {
      if (!controls || !amisCore.isObject(controls)) {
        throw new Error(i18nRuntime.i18n("413c6b52c23a1bf5cbc9fba1485f88ff"));
      }
      this._dynamicControls = tslib.__assign(tslib.__assign({}, this._dynamicControls), controls);
    },
    enumerable: false,
    configurable: true
  });
  Table2Plugin.prototype.isCRUDContext = function (context) {
    return context.schema.type === 'crud2' || context.schema.type === 'crud';
  };
  Table2Plugin.id = 'Table2Plugin';
  return Table2Plugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(Table2Plugin);

exports.Table2Plugin = Table2Plugin;
exports.Table2RendererAction = Table2RendererAction;
exports.Table2RenderereEvent = Table2RenderereEvent;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
