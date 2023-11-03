/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __awaiter, __generator } from 'tslib';
import React__default from 'react';
import { Button } from 'amis';
import { getSchemaTpl, getI18nEnabled, tipedLabel, defaultValue, mockValue, repeatArray, diff, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { setVariable, someTree } from 'amis-core';
import { DSBuilderManager } from '../builder/DSBuilderManager.js';
import { getArgsWrapper, getEventControlConfig } from '../renderer/event-control/helper.js';
import { resolveArrayDatasource, schemaToArray, schemaArrayFormat } from '../util.js';
import { reaction } from 'mobx';
import { i18n } from 'i18n-runtime';

var TablePlugin = /** @class */function (_super) {
  __extends(TablePlugin, _super);
  function TablePlugin(manager) {
    var _this = _super.call(this, manager) || this;
    // 关联渲染器名字
    _this.rendererName = 'table';
    _this.$schema = '/schemas/TableSchema.json';
    // 组件名称
    _this.name = i18n("642d94fa418e15a3997bcf7488315e4d");
    _this.tags = [i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.isBaseComponent = true;
    _this.description = i18n("ea2b32f5d78d2305b9b7bc21e056a009");
    _this.docLink = '/amis/zh-CN/components/table';
    _this.icon = 'fa fa-table';
    _this.pluginIcon = 'table-plugin';
    _this.scaffold = {
      type: 'table',
      columns: [{
        label: i18n("20aadc3f9b7edb564dc58898898e0dc8"),
        name: 'a'
      }]
    };
    _this.regions = [{
      key: 'columns',
      label: i18n("1f9794dd5634220ed0a498c666cf46fe"),
      renderMethod: 'renderTableContent',
      preferTag: i18n("027446c2f9070b0f5b16a18208bf5fc7"),
      dndMode: 'position-h'
    }];
    //renderTableContent
    _this.previewSchema = {
      type: 'table',
      className: 'text-left m-b-none',
      affixHeader: false,
      items: [{
        a: 1,
        b: 2
      }, {
        a: 3,
        b: 4
      }, {
        a: 5,
        b: 6
      }],
      columns: [{
        label: 'A',
        name: 'a'
      }, {
        label: 'B',
        name: 'b'
      }]
    };
    _this.panelTitle = i18n("b339aa87104709397ba68e7ebbc6e5ba");
    _this.events = [{
      eventName: 'selectedChange',
      eventLabel: i18n("257f5a3886d87d2255206f86b880d07e"),
      description: i18n("6130b1f75d624b2f73f5d923492e92f7"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              selectedItems: {
                type: 'array',
                title: i18n("94935dfa6c9b908515a593956ee7d07c")
              },
              unSelectedItems: {
                type: 'array',
                title: i18n("f10b94a4ac77878be53fad599a761928")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'columnSort',
      eventLabel: i18n("f3d21138c8ecf5683503c4f814cc7199"),
      description: i18n("d84464cfb2a5828a200fe9c28a323122"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              orderBy: {
                type: 'string',
                title: i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
              },
              orderDir: {
                type: 'string',
                title: i18n("c35c1a13309c6f9da9837857517e65fc")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'columnFilter',
      eventLabel: i18n("3d0b957a99d0c366612c01913e17a0c7"),
      description: i18n("b35963687361af98e6acdc004e87fc3c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              filterName: {
                type: 'string',
                title: i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
              },
              filterValue: {
                type: 'string',
                title: i18n("e125986c2ba6783c4297ffe5405cc8bc")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'columnSearch',
      eventLabel: i18n("93a5a0253f11e3a2e58f4e87a52fb094"),
      description: i18n("6d4c4990ab2c32efe8a17c5f22e10cb5"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              searchName: {
                type: 'string',
                title: i18n("8f98291c9fa89c0bfce463c0a2eaf97c")
              },
              searchValue: {
                type: 'object',
                title: i18n("caafbcb52c70ad0bbbbf127ee7b08b89")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'orderChange',
      eventLabel: i18n("85ddd38957256b6e9026f42ed570bc35"),
      description: i18n("d7a66def82af88cd5d408e38feb8a65a"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              movedItems: {
                type: 'array',
                title: i18n("64ef585f778c9d1b010e86b032398ab6")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'columnToggled',
      eventLabel: i18n("ecfebbc91e2c18a512aeb11b7da15193"),
      description: i18n("c94f45773a42dc386b9c9dcdc6fa542b"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              columns: {
                type: 'array',
                title: i18n("db9df54392e408520ca12c6a56113b5a")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'rowClick',
      eventLabel: i18n("76e47871d654c3b0b0e301c0a076e55a"),
      description: i18n("cc13521eab2c7423b3fb857772405cc3"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
              },
              index: {
                type: 'number',
                title: i18n("f74fd69ce55e3f96fe9a032c0da42330")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'rowMouseEnter',
      eventLabel: i18n("5db079b140feffa84c84d1b51d824dea"),
      description: i18n("90a5608bcd85a3cfcfbb5263a229915c"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
              },
              index: {
                type: 'number',
                title: i18n("f74fd69ce55e3f96fe9a032c0da42330")
              }
            }
          }
        }
      }]
    }, {
      eventName: 'rowMouseLeave',
      eventLabel: i18n("e8bf039de5dc6751c4045f55930e0c83"),
      description: i18n("f1ca0d305f3251a81f361a2dc8e11fff"),
      dataSchema: [{
        type: 'object',
        properties: {
          data: {
            type: 'object',
            title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            properties: {
              item: {
                type: 'object',
                title: i18n("bf2a4fd8ecd654982e2d466f10f54d3f")
              },
              index: {
                type: 'number',
                title: i18n("f74fd69ce55e3f96fe9a032c0da42330")
              }
            }
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'select',
      actionLabel: i18n("8eb3c8b16106e5487cd1fa3b8a1342ce"),
      description: i18n("908cc16fe4f7972450167e26276ac726"),
      innerArgs: ['selected'],
      schema: getArgsWrapper([getSchemaTpl('formulaControl', {
        name: 'selected',
        label: i18n("a2b39e5a8b5015234dcd8e07a2e00e3d"),
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal'
      })])
    }, {
      actionType: 'selectAll',
      actionLabel: i18n("366a3c07289bd6efb7c2a182f7a12772"),
      description: i18n("e97c09cd119b64ae0a8dfd42a1d449cb")
    }, {
      actionType: 'clearAll',
      actionLabel: i18n("c3e8652924c258e121eed16414d3a9e5"),
      description: i18n("7619ec29c0a854dd49e0a7a47bf1a127")
    }, {
      actionType: 'initDrag',
      actionLabel: i18n("b94bd878cae4ddc567b00a2dc4f21d74"),
      description: i18n("5dc3017c21ae2e31ab127dbde8ec80e9")
    }];
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var isCRUDBody = context.schema.type === 'crud';
      var i18nEnabled = getI18nEnabled();
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            name: 'title',
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            label: i18n("32c65d8d7431e76029678ec7bb73a5ab")
          }, isCRUDBody ? null : getSchemaTpl('sourceBindControl', {
            label: i18n("c11322c9cc43ce3c004cf03f5ac0acd0")
          }), {
            name: 'combineNum',
            label: tipedLabel(i18n("25915fb58615ba9a5e145efa252fec30"), i18n("80174cabf025dfe269aee5390b813708")),
            type: 'input-number',
            labelAlign: 'left',
            horizontal: {
              left: 5,
              right: 7
            },
            placeholder: i18n("d7d0936858fcdf4ffdb2899451ec74fc")
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
          }
          // {
          //   children: (
          //     <div>
          //       <Button
          //         level="info"
          //         size="sm"
          //         className="m-b-sm"
          //         block
          //         onClick={this.handleAdd}
          //       >
          //         新增一列
          //       </Button>
          //     </div>
          //   )
          // },
          // {
          //   children: (
          //     <div>
          //       <Button
          //         level="success"
          //         size="sm"
          //         block
          //         onClick={this.handleColumnsQuickEdit.bind(this)}
          //       >
          //         快速编辑列信息
          //       </Button>
          //     </div>
          //   )
          // }
          ]
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            name: 'columnsTogglable',
            label: tipedLabel('列显示开关', '是否展示表格列的显隐控件，“自动”即列数量大于5时自动开启'),
            type: 'button-group-select',
            pipeIn: defaultValue('auto'),
            size: 'sm',
            labelAlign: 'left',
            options: [{
              label: i18n("3aed2c11e95a9c0ea1d853d4aee72e8c"),
              value: 'auto'
            }, {
              label: i18n("cc42dd3170fdf36bdc2b0f58ab23eb84"),
              value: true
            }, {
              label: i18n("b15d91274e9fc68608c609999e0413fa"),
              value: false
            }]
          }, getSchemaTpl('switch', {
            name: 'affixHeader',
            label: i18n("e8bb313fb86cf474c0e264794bc85896"),
            pipeIn: defaultValue(true)
          }), getSchemaTpl('switch', {
            name: 'footable',
            label: tipedLabel(i18n("5006fdc5659989e42c3855c17c57f878"), i18n("9db359f376a1a588ef7dcbef53cc114a")),
            pipeIn: function (value) {
              return !!value;
            }
          }), {
            name: 'footable.expand',
            type: 'button-group-select',
            size: 'sm',
            visibleOn: 'data.footable',
            label: i18n("df74194830e695efbfce16c0c64223cf"),
            pipeIn: defaultValue('none'),
            options: [{
              label: i18n("94be543c4fd399f0839211464c8583ce"),
              value: 'first'
            }, {
              label: i18n("9a7b52fc8659f1786907fe93efa85bf7"),
              value: 'all'
            }, {
              label: i18n("b07deca9076bd3354b1b2709d58d725a"),
              value: 'none'
            }]
          }, {
            name: 'placeholder',
            pipeIn: defaultValue(i18n("21efd88b67a39834582ad99aabb9dc60")),
            type: 'input-text',
            label: i18n("35ba83e053cef95e55dfffde279822b5")
          }, {
            name: 'rowClassNameExpr',
            type: 'input-text',
            label: i18n("76b3250fb1e8593fac075b64029300fa"),
            placeholder: i18n("1fe38acb67e766f7767d9f8e88bfe990")
          }]
        }, {
          title: i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [getSchemaTpl('className', {
            label: i18n("5e5d3f13111593b2710673006d4c8297")
          }), getSchemaTpl('className', {
            name: 'tableClassName',
            label: i18n("b339aa87104709397ba68e7ebbc6e5ba")
          }), getSchemaTpl('className', {
            name: 'headerClassName',
            label: i18n("9e25d776a57c610940bcc1c19847b97d")
          }), getSchemaTpl('className', {
            name: 'footerClassName',
            label: i18n("2ec1b0bb189b486945e79c167a4a024d")
          }), getSchemaTpl('className', {
            name: 'toolbarClassName',
            label: i18n("012f602372cd2dbd639cd966c63e1f90")
          })]
        }])
      }, isCRUDBody ? null : {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }]);
    };
    _this.unWatchWidthChange = {};
    _this.dsManager = new DSBuilderManager(manager);
    return _this;
  }
  Object.defineProperty(TablePlugin.prototype, "scaffoldForm", {
    get: function () {
      var i18nEnabled = getI18nEnabled();
      return {
        title: i18n("6b93fcfc1a5795189c6072fa6e86d4f6"),
        body: [{
          name: 'columns',
          type: 'combo',
          multiple: true,
          label: false,
          addButtonText: i18n("0c14e431f1b5ecd163f8fa010a0654c7"),
          draggable: true,
          items: [{
            type: i18nEnabled ? 'input-text-i18n' : 'input-text',
            name: 'label',
            placeholder: i18n("32c65d8d7431e76029678ec7bb73a5ab")
          }, {
            type: 'input-text',
            name: 'name',
            placeholder: i18n("41a344642681efaaa418c228ba7fb45c")
          }, {
            type: 'select',
            name: 'type',
            placeholder: i18n("226b0912184333c81babf2f1894ec0c1"),
            value: 'text',
            options: [{
              value: 'text',
              label: i18n("ffb01e5bcf4c00447f5150d3cba81371")
            }, {
              value: 'tpl',
              label: i18n("59cf15fe6b8d659c9bd2f86143534a06")
            }, {
              value: 'image',
              label: i18n("20def7942674282277c3714ed7ea6ce0")
            }, {
              value: 'date',
              label: i18n("4ff1e74e43a3586339251494117185ad")
            },
            // {
            //     value: 'datetime',
            //     label: '日期时间'
            // },
            // {
            //     value: 'time',
            //     label: '时间'
            // },
            {
              value: 'progress',
              label: i18n("c7bff79d059a0b7ff9b02441959d8be2")
            }, {
              value: 'status',
              label: i18n("3fea7ca76cdece641436d7ab0d02ab1b")
            }, {
              value: 'mapping',
              label: i18n("9da188491dd34c4382a5b9f006194e41")
            }, {
              value: 'operation',
              label: i18n("8abc564260a1564521e0c3a1d5419b4a")
            }]
          }]
        }],
        canRebuild: true
      };
    },
    enumerable: false,
    configurable: true
  });
  TablePlugin.prototype.filterProps = function (props) {
    var arr = resolveArrayDatasource(props);
    if (!Array.isArray(arr) || !arr.length) {
      var mockedData_1 = {};
      if (Array.isArray(props.columns)) {
        props.columns.forEach(function (column) {
          if (column.name) {
            setVariable(mockedData_1, column.name, mockValue(column));
          }
        });
      }
      props.value = repeatArray(mockedData_1, 1).map(function (item, index) {
        return __assign(__assign({}, item), {
          id: index + 1
        });
      });
    } else {
      // 只取10条预览，否则太多卡顿
      props.value = arr.slice(0, 10);
    }
    // 编辑模式，不允许表格调整宽度
    props.resizable = false;
    return props;
  };
  // 为了能够自动注入数据。
  TablePlugin.prototype.getRendererInfo = function (context) {
    var _a;
    var plugin = this;
    var schema = context.schema,
      renderer = context.renderer;
    if (!schema.$$id && ((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) === 'crud' && renderer.name === 'table') {
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
        renderRenderer: plugin.renderRenderer
      });
    }
    return _super.prototype.getRendererInfo.call(this, context);
  };
  // 自动插入 label
  TablePlugin.prototype.beforeInsert = function (event) {
    var _a, _b, _c, _d;
    var context = event.context;
    if ((context.info.plugin === this || ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) && context.region === 'columns') {
      context.data = __assign(__assign({}, context.data), {
        label: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : i18n("bcee820bc20342a4d388a35ed32a35fe")
      });
    }
  };
  TablePlugin.prototype.buildDataSchemas = function (node, region, trigger, parent) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
      var itemsSchema, columns, parentScopeId, isColumnChild, scopeId, index, cells, cell, items, current, schema, _g, _h, sourceMatch1, sourceMatch2, source_1, scope, rowMembers, scopeId, scope;
      return __generator(this, function (_j) {
        switch (_j.label) {
          case 0:
            itemsSchema = {
              $id: "".concat(node.id, "-").concat(node.type, "-tableRows"),
              type: 'object',
              properties: {}
            };
            columns = node.children.find(function (item) {
              return item.isRegion && item.region === 'columns';
            });
            parentScopeId = "".concat(parent === null || parent === void 0 ? void 0 : parent.id, "-").concat(parent === null || parent === void 0 ? void 0 : parent.type).concat(((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) === 'cell' ? '-currentRow' : '');
            isColumnChild = false;
            // 追加当前行scope
            if (trigger) {
              isColumnChild = someTree(columns === null || columns === void 0 ? void 0 : columns.children, function (item) {
                return item.id === trigger.id;
              });
              if (isColumnChild) {
                scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
                if (this.manager.dataSchema.getScope(scopeId)) {
                  this.manager.dataSchema.removeScope(scopeId);
                }
                if (this.manager.dataSchema.getScope(parentScopeId)) {
                  this.manager.dataSchema.switchTo(parentScopeId);
                }
                this.manager.dataSchema.addScope([], scopeId);
                this.manager.dataSchema.current.tag = i18n("bf2a4fd8ecd654982e2d466f10f54d3f");
                this.manager.dataSchema.current.group = i18n("813a5158d9f7171d20e7df340c5b48f9");
              }
            }
            index = 0;
            cells = columns.children.concat();
            _j.label = 1;
          case 1:
            if (!(cells.length > 0 && index < node.schema.columns.length)) return [3 /*break*/, 6];
            cell = cells.shift();
            items = cell.children.concat();
            _j.label = 2;
          case 2:
            if (!items.length) return [3 /*break*/, 5];
            current = items.shift();
            schema = current.schema;
            if (!schema.name) return [3 /*break*/, 4];
            _g = itemsSchema.properties;
            _h = schema.name;
            return [4 /*yield*/, (_c = (_b = current.info.plugin).buildDataSchemas) === null || _c === void 0 ? void 0 : _c.call(_b, current, region, trigger, node)];
          case 3:
            _g[_h] = _j.sent();
            _j.label = 4;
          case 4:
            return [3 /*break*/, 2];
          case 5:
            index++;
            return [3 /*break*/, 1];
          case 6:
            // 收集source绑定的列表成员
            if (node.schema.source) {
              sourceMatch1 = node.schema.source.match(/\$\{(.*?)\}/);
              sourceMatch2 = node.schema.source.match(/\$(\w+$)/);
              source_1 = sourceMatch1 ? sourceMatch1[1] : sourceMatch2 ? sourceMatch2[1] : '';
              scope = this.manager.dataSchema.getScope("".concat(node.info.id, "-").concat(node.info.type));
              while (scope) {
                rowMembers = scope.schemas.find(function (item) {
                  var _a;
                  return (_a = item.properties) === null || _a === void 0 ? void 0 : _a[source_1];
                });
                if (rowMembers) {
                  itemsSchema = __assign(__assign({}, itemsSchema), {
                    properties: __assign(__assign({}, itemsSchema.properties), (_f = (_e = (_d = rowMembers.properties) === null || _d === void 0 ? void 0 : _d[source_1]) === null || _e === void 0 ? void 0 : _e.items) === null || _f === void 0 ? void 0 : _f.properties)
                  });
                }
                scope = rowMembers ? undefined : scope.parent;
              }
            }
            if ((region === null || region === void 0 ? void 0 : region.region) === 'columns') {
              return [2 /*return*/, itemsSchema];
            }
            // 追加当前行数据
            if (isColumnChild) {
              scopeId = "".concat(node.id, "-").concat(node.type, "-currentRow");
              scope = this.manager.dataSchema.getScope(scopeId);
              scope === null || scope === void 0 ? void 0 : scope.addSchema(itemsSchema);
            }
            return [2 /*return*/, {
              $id: "".concat(node.id, "-").concat(node.type),
              type: 'object',
              properties: {
                rows: {
                  type: 'array',
                  title: i18n("77fdd35933c099cdcb64b71f3fbe7a6c"),
                  items: itemsSchema
                },
                selectedItems: {
                  type: 'array',
                  title: i18n("41c5c859a80b635c23b3b4d1d8b44efb"),
                  items: itemsSchema
                },
                unSelectedItems: {
                  type: 'array',
                  title: i18n("f87912f19be48f36e4e261e585764d6e"),
                  items: itemsSchema
                }
              }
            }];
        }
      });
    });
  };
  TablePlugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function () {
      var builder;
      return __generator(this, function (_j) {
        if (((_b = (_a = node === null || node === void 0 ? void 0 : node.info) === null || _a === void 0 ? void 0 : _a.renderer) === null || _b === void 0 ? void 0 : _b.name) === 'table-cell') {
          if (((_c = scopeNode.parent) === null || _c === void 0 ? void 0 : _c.type) === 'service' && ((_f = (_e = (_d = scopeNode.parent) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.path) === null || _f === void 0 ? void 0 : _f.endsWith('service'))) {
            return [2 /*return*/, (_h = (_g = scopeNode.parent.parent.info.plugin).getAvailableContextFields) === null || _h === void 0 ? void 0 : _h.call(_g, scopeNode.parent.parent, node, region)];
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

  TablePlugin.prototype.editHeaderDetail = function (id) {
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
  TablePlugin.prototype.editFooterDetail = function (id) {
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
  TablePlugin.prototype.componentRef = function (node, ref) {
    var _this = this;
    var _a, _b;
    if (ref) {
      var store_1 = ref.props.store;
      this.unWatchWidthChange[node.id] = reaction(function () {
        return store_1.columns.map(function (column) {
          return column.pristine.width;
        }).join(',');
      }, function () {
        ref.updateTableInfoLazy(function () {
          _this.manager.store.highlightNodes.forEach(function (node) {
            return node.calculateHighlightBox();
          });
        });
      });
    } else {
      (_b = (_a = this.unWatchWidthChange)[node.id]) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
  };
  TablePlugin.id = 'TablePlugin';
  return TablePlugin;
}(BasePlugin);
registerEditorPlugin(TablePlugin);

export { TablePlugin };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
