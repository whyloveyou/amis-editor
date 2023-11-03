/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var TableViewEditor = require('../component/TableViewEditor.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * @file table view 组件的可视化编辑
 */
var TD_TEMPLATE = {
  body: {
    type: 'tpl',
    wrapperComponent: '',
    tpl: '---'
  }
};
/**
 * 遍历表格，算出每个单元格在最终渲染时的实际行和列，后续许多操作都需要以这个作为依据
 * 比如插入列的时候，不能根据单元格在数组的位置，而是要根据单元格实际渲染时所属列
 */
function getCellRealPosition(table) {
  var e_1, _a, e_2, _b;
  if (!table) {
    return {
      trs: []
    };
  }
  // 记录有哪些行列被合并了，这样后续计算的时候就要跳过这些行列
  var spannedCell = [];
  var trs = table.trs || [];
  var currentRow = 0; // 当前渲染的实际行
  try {
    for (var trs_1 = tslib.__values(trs), trs_1_1 = trs_1.next(); !trs_1_1.done; trs_1_1 = trs_1.next()) {
      var tr = trs_1_1.value;
      var tds = tr.tds || [];
      var currentCol = 0; // 当前渲染的实际列
      try {
        for (var tds_1 = (e_2 = void 0, tslib.__values(tds)), tds_1_1 = tds_1.next(); !tds_1_1.done; tds_1_1 = tds_1.next()) {
          var td = tds_1_1.value;
          // 跳过被合并的行
          while (spannedCell[currentRow] && spannedCell[currentRow][currentCol]) {
            currentCol = currentCol + 1;
          }
          var rowspan = td.rowspan || 1;
          var colspan = td.colspan || 1;
          // 标记后续行合并情况
          if (rowspan > 1 || colspan > 1) {
            for (var i = 0; i < rowspan; i++) {
              var spanRow = currentRow + i;
              if (!spannedCell[spanRow]) {
                spannedCell[spanRow] = [];
              }
              for (var j = 0; j < colspan; j++) {
                var spanCol = currentCol + j;
                spannedCell[spanRow][spanCol] = true;
              }
            }
          }
          td.$$row = currentRow;
          td.$$col = currentCol;
          currentCol = currentCol + 1;
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (tds_1_1 && !tds_1_1.done && (_b = tds_1.return)) _b.call(tds_1);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      currentRow = currentRow + 1;
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (trs_1_1 && !trs_1_1.done && (_a = trs_1.return)) _a.call(trs_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return table;
}
var TableViewPlugin = /** @class */function (_super) {
  tslib.__extends(TableViewPlugin, _super);
  function TableViewPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'table-view';
    _this.$schema = '/schemas/TableViewSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("175e01917d9d4891a40eab43f4487030");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-columns';
    _this.pluginIcon = 'table-view-plugin';
    _this.description = i18nRuntime.i18n("9fe8304dade75a37bc04f45515688325");
    _this.docLink = '/amis/zh-CN/components/table-view';
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.scaffold = {
      type: 'table-view',
      trs: [{
        background: '#F7F7F7',
        tds: [{
          body: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: i18nRuntime.i18n("2560b304e691da78ee2e02f5af9b494d")
          }
        }, {
          body: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: i18nRuntime.i18n("f7d29dfae05b5d049b64b040b14d9a00")
          }
        }, {
          body: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: i18nRuntime.i18n("44e7ebb4007104495dcb7afbbb6778fb")
          }
        }]
      }, {
        tds: [{
          rowspan: 2,
          body: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: i18nRuntime.i18n("3f0cb8b8c238c3b4e08898ce6d449c8d")
          }
        }, {
          body: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: i18nRuntime.i18n("692e92669c0ca340eff4fdcef32896ee")
          }
        }, {
          body: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: '${beijing}'
          }
        }]
      }, {
        tds: [{
          body: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: i18nRuntime.i18n("b8b75a5f9109919ff3f67b336b62afe9")
          }
        }, {
          body: {
            type: 'tpl',
            wrapperComponent: '',
            tpl: '${tianjing}'
          }
        }]
      }]
    };
    _this.previewSchema = tslib.__assign({}, _this.scaffold);
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'renderTdBody',
      preferTag: i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")
    }];
    _this.panelTitle = i18nRuntime.i18n("175e01917d9d4891a40eab43f4487030");
    _this.panelBody = [amisEditorCore.getSchemaTpl('tabs', [{
      title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
      className: 'p-none',
      body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
        title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
        body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
          value: 'left-top'
        }), amisEditorCore.getSchemaTpl('caption'), {
          label: i18nRuntime.i18n("3a8647306ee6456517b7bf9c8bc7de23"),
          name: 'captionSide',
          type: 'button-group-select',
          size: 'sm',
          mode: 'row',
          className: 'ae-buttonGroupSelect--justify',
          visibleOn: 'this.caption',
          options: [{
            label: i18nRuntime.i18n("c949729cd1a1e425595c1a297649c7c6"),
            value: 'top'
          }, {
            label: i18nRuntime.i18n("12c4c5e8abda77e1fdc93653d6414187"),
            value: 'bottom'
          }]
        }, {
          type: 'input-text',
          label: i18nRuntime.i18n("d1c2b2d68063b4a57af61e3027861cd8"),
          name: 'width',
          clearable: true
        }, {
          type: 'input-text',
          label: i18nRuntime.i18n("b32ec25f2bdf7b2eed5e947cf82a4fde"),
          name: 'padding',
          clearable: true
        }, {
          label: i18nRuntime.i18n("8a42ded5c9d58f3dd9e3a8968ec04b34"),
          name: 'border',
          type: 'switch',
          mode: 'row',
          inputClassName: 'inline-flex justify-between flex-row-reverse'
        }, {
          label: i18nRuntime.i18n("9b4bae5d8251de0b6f00b704936b00d3"),
          type: 'input-color',
          name: 'borderColor',
          visibleOn: 'this.border',
          pipeIn: amisEditorCore.defaultValue('#eceff8')
        }]
      }])]
    }, {
      title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      className: 'p-none',
      body: amisEditorCore.getSchemaTpl('collapseGroup', tslib.__spreadArray([], tslib.__read(amisEditorCore.getSchemaTpl('theme:common')), false))
    }, {
      title: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
      body: [amisEditorCore.getSchemaTpl('visible')]
    }])];
    _this.fieldWrapperResolve = function (dom) {
      return dom;
    };
    _this.overrides = {
      renderTd: function (td, colIndex, rowIndex) {
        var dom = this.super(td, colIndex, rowIndex);
        var info = this.props.$$editor;
        if (!info || !td.$$id) {
          return dom;
        }
        var plugin = info.plugin;
        var id = td.$$id;
        return React__default["default"].createElement(amisEditorCore.VRenderer, {
          type: info.type,
          plugin: info.plugin,
          renderer: info.renderer,
          key: id,
          "$schema": "/schemas/TdObject.json",
          hostId: info.id,
          memberIndex: colIndex,
          name: "".concat("\u5355\u5143\u683C ".concat(rowIndex + 1, ",").concat(colIndex + 1)),
          id: id,
          draggable: false,
          wrapperResolve: plugin.fieldWrapperResolve,
          schemaPath: "".concat(info.schemaPath, "/td"),
          path: "".concat(this.props.$path, "/tr/").concat(rowIndex, "/td/").concat(colIndex),
          data: this.props.data,
          children: dom
        });
      },
      renderTr: function (tr, rowIndex) {
        var dom = this.super(tr, rowIndex);
        var info = this.props.$$editor;
        if (!info || !tr.$$id) {
          return dom;
        }
        var plugin = info.plugin;
        var id = tr.$$id;
        return React__default["default"].createElement(amisEditorCore.VRenderer, {
          type: info.type,
          plugin: info.plugin,
          renderer: info.renderer,
          key: id,
          "$schema": "/schemas/TrObject.json",
          hostId: info.id,
          memberIndex: rowIndex,
          name: "".concat("\u884C ".concat(rowIndex + 1)),
          id: id,
          draggable: false,
          wrapperResolve: plugin.fieldWrapperResolve,
          schemaPath: "".concat(info.schemaPath, "/tr"),
          path: "".concat(this.props.$path, "/tr/").concat(rowIndex),
          data: this.props.data,
          children: dom
        });
      }
    };
    _this.tdVRendererConfig = {
      panelTitle: i18nRuntime.i18n("1ebd0cd417700f3f4a7ee5f64518fcd1"),
      panelBodyCreator: function (context) {
        return [amisEditorCore.getSchemaTpl('tabs', [{
          title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
          className: 'p-none',
          body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
            title: i18nRuntime.i18n("4d775d4cd79e2ed6a2fc66fd1e7139c8"),
            body: [{
              label: i18nRuntime.i18n("2f97db95d75280bfedc5afa72d2c717d"),
              type: 'input-color',
              name: 'background'
            }, {
              label: i18nRuntime.i18n("7ec907e7059b758ace2f3adb9bb803ff"),
              type: 'input-color',
              name: 'color'
            }, {
              label: i18nRuntime.i18n("104711e38d3cd9335dbd1f4301178edb"),
              name: 'bold',
              type: 'switch',
              mode: 'row',
              inputClassName: 'inline-flex justify-between flex-row-reverse'
            }]
          }, {
            title: i18nRuntime.i18n("5aefca559c5a41d10078e21e6d616825"),
            body: [{
              type: 'input-text',
              label: i18nRuntime.i18n("65194da33aa3aa1d0fd08b5690af6f26"),
              name: 'width',
              clearable: true
            }, {
              type: 'input-number',
              name: 'padding',
              label: i18nRuntime.i18n("fbd9998b10e690230b0f2fa9b24087ac")
            }, {
              label: i18nRuntime.i18n("98d695d6a6a48cfb4bc2f6396ee64787"),
              name: 'align',
              type: 'button-group-select',
              size: 'sm',
              mode: 'row',
              className: 'ae-buttonGroupSelect--justify',
              options: [{
                label: '',
                value: 'left',
                icon: 'fa fa-align-left'
              }, {
                label: '',
                value: 'center',
                icon: 'fa fa-align-center'
              }, {
                label: '',
                value: 'right',
                icon: 'fa fa-align-right'
              }, {
                label: '',
                value: 'justify',
                icon: 'fa fa-align-justify'
              }]
            }, {
              label: i18nRuntime.i18n("11b7fc50778c89572391ec4c6c4b55e1"),
              name: 'valign',
              type: 'button-group-select',
              size: 'sm',
              mode: 'row',
              className: 'ae-buttonGroupSelect--justify',
              options: [{
                label: i18nRuntime.i18n("c949729cd1a1e425595c1a297649c7c6"),
                value: 'top'
              }, {
                label: i18nRuntime.i18n("0bbc2ea4e1d1f23feb576de5dca1ce3b"),
                value: 'middle'
              }, {
                label: i18nRuntime.i18n("12c4c5e8abda77e1fdc93653d6414187"),
                value: 'bottom'
              }, {
                label: i18nRuntime.i18n("ed97c73866617b40a7b1215867e0f489"),
                value: 'baseline'
              }]
            }, {
              type: 'input-number',
              name: 'colspan',
              label: i18nRuntime.i18n("4745afe0f89f665e41adf819da5df1b6")
            }, {
              type: 'input-number',
              name: 'rowspan',
              label: i18nRuntime.i18n("7c2e1f863e86715e892f61a54e558b20")
            }]
          }])]
        }, {
          title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
          className: 'p-none',
          body: amisEditorCore.getSchemaTpl('collapseGroup', amisEditorCore.getSchemaTpl('theme:common'))
        }])];
      }
    };
    _this.trVRendererConfig = {
      panelTitle: i18nRuntime.i18n("d17020cd3e6564f5154cf2251cd30f52"),
      panelBodyCreator: function (context) {
        return [amisEditorCore.getSchemaTpl('tabs', [{
          title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
          body: [{
            label: i18nRuntime.i18n("5a431ad16d8f7f23fac3be5650e51caa"),
            type: 'input-number',
            name: 'height'
          }, {
            label: i18nRuntime.i18n("db439b129f3143e14a7024f08ea3732d"),
            type: 'input-color',
            name: 'background'
          }]
        }, {
          title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
          className: 'p-none',
          body: amisEditorCore.getSchemaTpl('collapseGroup', amisEditorCore.getSchemaTpl('theme:common'))
        }])];
      }
    };
    return _this;
  }
  TableViewPlugin.prototype.renderRenderer = function (props) {
    var $$editor = props.$$editor;
    var renderer = $$editor.renderer;
    var schema = props.$schema;
    getCellRealPosition(schema);
    return React__default["default"].createElement(TableViewEditor.TableViewEditor, {
      schema: schema,
      manager: this.manager
    }, React__default["default"].createElement(renderer.component, tslib.__assign({}, props)));
  };
  // 根据路径判断是选中单元格还是行
  TableViewPlugin.prototype.buildEditorPanel = function (context, panels) {
    _super.prototype.buildEditorPanel.call(this, context, panels);
    var plugin = this;
    var store = this.manager.store;
    if (context.info.schemaPath.endsWith('/td')) {
      panels.push({
        key: 'td',
        order: 100,
        icon: this.tdVRendererConfig.panelIcon || 'fa fa-tablet',
        pluginIcon: plugin.pluginIcon,
        title: this.tdVRendererConfig.panelTitle || i18nRuntime.i18n("30d6ed36667cb98165f07c59702754ea"),
        render: this.manager.makeSchemaFormRender({
          controls: this.tdVRendererConfig.panelControlsCreator ? this.tdVRendererConfig.panelControlsCreator(context) : this.tdVRendererConfig.panelControls,
          body: this.tdVRendererConfig.panelBodyCreator ? this.tdVRendererConfig.panelBodyCreator(context) : this.tdVRendererConfig.panelBody,
          panelById: store.activeId
        })
      });
    } else if (context.info.schemaPath.endsWith('/tr')) {
      panels.push({
        key: 'tr',
        order: 100,
        icon: this.trVRendererConfig.panelIcon || 'fa fa-tablet',
        title: this.trVRendererConfig.panelTitle || i18nRuntime.i18n("30d6ed36667cb98165f07c59702754ea"),
        render: this.manager.makeSchemaFormRender({
          controls: this.trVRendererConfig.panelControlsCreator ? this.trVRendererConfig.panelControlsCreator(context) : this.trVRendererConfig.panelControls,
          body: this.trVRendererConfig.panelBodyCreator ? this.trVRendererConfig.panelBodyCreator(context) : this.trVRendererConfig.panelBody,
          panelById: store.activeId
        })
      });
    }
  };
  /**
   * 插入行，需要处理前面有 rowspan 的情况
   *
   *   +---+---+---+
   *   | a | b | c |
   *   +   +---+---+
   *   |   | d | e |
   *   +   +---+---+
   *   |   | f | g |
   *   +---+---+---+
   *
   * 比如在 d 位置的前面插入行，需要将 a 的 rowspan 加一，然后再插入两个单元格
   */
  TableViewPlugin.prototype.insertRow = function (tdId, position) {
    var e_3, _a;
    var store = this.manager.store;
    var paths = store.getNodePathById(tdId);
    var tableId = paths[paths.length - 3].id;
    var table = store.getSchema(tableId);
    getCellRealPosition(table);
    var td = amisEditorCore.JSONGetById(table, tdId);
    if (!td) {
      console.warn(i18nRuntime.i18n("49d45317662097180e27fa53235d9b13"));
      return;
    }
    var insertRow = td.$$row;
    if (position === 'below') {
      insertRow = insertRow + 1;
    }
    // 通过第一行来确认表格一共多少列
    var firstRow = table.trs[0];
    var firstRowLastTd = firstRow.tds[firstRow.tds.length - 1];
    if (!firstRowLastTd) {
      console.warn(i18nRuntime.i18n("013326241579b9b2735756f2204bf8bc"));
      return;
    }
    var colSize = firstRowLastTd.$$col + (firstRowLastTd.colspan || 1);
    var insertIndex = table.trs.length;
    for (var trIndex = 0; trIndex < table.trs.length; trIndex++) {
      try {
        for (var _b = (e_3 = void 0, tslib.__values(table.trs[trIndex].tds || [])), _c = _b.next(); !_c.done; _c = _b.next()) {
          var td_1 = _c.value;
          var tdRow = td_1.$$row;
          var rowspan = td_1.rowspan || 1;
          var colspan = td_1.colspan || 1;
          // 如果覆盖到要插入的行，则增加 rowspan，并在这个插入的行中减去对应
          if (rowspan > 1) {
            var isOverlapping = tdRow + rowspan > insertRow;
            if (isOverlapping) {
              td_1.rowspan = rowspan + 1;
              colSize = colSize - colspan;
            }
          }
          if (tdRow === insertRow) {
            insertIndex = trIndex;
            break;
          }
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
    }
    var insertTds = [];
    for (var i = 0; i < colSize; i++) {
      insertTds.push(TD_TEMPLATE);
    }
    table.trs.splice(insertIndex, 0, {
      tds: insertTds
    });
    this.manager.store.changeValueById(tableId, table);
  };
  /**
   * 插入列
   *
   *		+---+---+---+
   *		| a     | b |
   *		+       +---+
   *		|       | c |
   *		+---+---+---+
   *		| d | e | f |
   *		+---+---+---+
   *
   * 比如在 c 位置左侧插入列，应该将 a 的 colspan 加一，然后在最后一行增加一个单元格
   */
  TableViewPlugin.prototype.insertCol = function (tdId, position) {
    var e_4, _a;
    var store = this.manager.store;
    var paths = store.getNodePathById(tdId);
    var tableId = paths[paths.length - 3].id;
    var table = store.getSchema(tableId);
    getCellRealPosition(table);
    var td = amisEditorCore.JSONGetById(table, tdId);
    if (!td) {
      console.warn(i18nRuntime.i18n("49d45317662097180e27fa53235d9b13"));
      return;
    }
    var insertCol = td.$$col;
    if (position === 'right') {
      insertCol = insertCol + 1;
    }
    try {
      for (var _b = tslib.__values(table.trs || []), _c = _b.next(); !_c.done; _c = _b.next()) {
        var tr = _c.value;
        var tds = tr.tds || [];
        var isInserted = false;
        for (var tdIndex = 0; tdIndex < tds.length; tdIndex++) {
          var td_2 = tds[tdIndex];
          var tdColspan = td_2.colspan || 1;
          var tdCol = td_2.$$col;
          // 如果要插入的行被覆盖了，则对节点加一并跳过插入
          if (tdColspan > 1) {
            var isOverlapping = tdCol + tdColspan > insertCol;
            if (isOverlapping) {
              td_2.colspan = tdColspan + 1;
              isInserted = true;
              break;
            }
          }
          if (insertCol <= tdCol) {
            tds.splice(tdIndex, 0, TD_TEMPLATE);
            isInserted = true;
            break;
          }
        }
        // 如果没找到对应的节点，那可能是插入到最后一条或者这一列节点数量不够，此时就要插入到最后
        if (!isInserted) {
          tds.push(TD_TEMPLATE);
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_4) throw e_4.error;
      }
    }
    this.manager.store.changeValueById(tableId, table);
  };
  /**
   * 拆分有跨行或跨列的单元格
   *
   *		+---+---+---+
   *		| a     | b |
   *		+       +---+
   *		|       | c |
   *		+---+---+---+
   *		| d | e | f |
   *		+---+---+---+
   *
   * 比如拆分 a，最后要变成
   *
   *		+---+---+---+
   *		| a | g | b |
   *		+---+---+---+
   *		| h | i | c |
   *		+---+---+---+
   *		| d | e | f |
   *		+---+---+---+
   *
   * 因此要新增 g、h、i 三个单元格
   */
  TableViewPlugin.prototype.splitCell = function (tdId) {
    var e_5, _a;
    var store = this.manager.store;
    var paths = store.getNodePathById(tdId);
    var tableId = paths[paths.length - 3].id;
    var table = store.getSchema(tableId);
    getCellRealPosition(table);
    var td = amisEditorCore.JSONGetById(table, tdId);
    if (!td) {
      console.warn(i18nRuntime.i18n("49d45317662097180e27fa53235d9b13"));
      return;
    }
    var rowspan = td.rowspan || 1;
    var colspan = td.colspan || 1;
    // 将这个单元格的跨行和跨列都设置为 1
    td.colspan = 1;
    td.rowspan = 1;
    // 算出需要补充哪些单元格及位置
    var tdRow = td.$$row;
    var tdCol = td.$$col;
    var insertTds = [];
    for (var i = 0; i < rowspan; i++) {
      for (var j = 0; j < colspan; j++) {
        // 跳过第一个，也就是这个单元格自己的位置
        if (i === 0 && j === 0) {
          continue;
        }
        insertTds.push({
          row: tdRow + i,
          col: tdCol + j
        });
      }
    }
    // 需要将列大的放前面，主要是因为后面需要反向遍历才能动态删数据
    insertTds.sort(function (a, b) {
      return b.col - a.col;
    });
    try {
      for (var _b = tslib.__values(table.trs), _c = _b.next(); !_c.done; _c = _b.next()) {
        var tr = _c.value;
        for (var tdIndex = 0; tdIndex < tr.tds.length; tdIndex++) {
          var td_3 = tr.tds[tdIndex];
          var currentRow = td_3.$$row;
          var currentCol = td_3.$$col;
          var insertIndex = insertTds.length;
          while (insertIndex--) {
            var insertTd = insertTds[insertIndex];
            if (currentRow === insertTd.row) {
              if (insertTd.col <= currentCol) {
                tr.tds.splice(tdIndex, 0, TD_TEMPLATE);
              } else {
                tr.tds.push(TD_TEMPLATE);
              }
              insertTds.splice(insertIndex, 1);
            }
          }
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_5) throw e_5.error;
      }
    }
    // 如果前面有单元格找不到位置，那意味着是下面这种情况，这个单元格跨两行且是最后一行
    // 这时 table.tr 其实只有一行数据，需要在添加一行数据
    // 	+---+---+
    // 	| a     |
    // 	+       +
    // 	|       |
    // 	+---+---+
    if (insertTds.length) {
      var newTds = [];
      for (var i = 0; i < insertTds.length; i++) {
        newTds.push(TD_TEMPLATE);
      }
      table.trs.push({
        tds: newTds
      });
    }
    this.manager.store.changeValueById(tableId, table);
  };
  TableViewPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var _this = this;
    var schema = _a.schema,
      info = _a.info;
    if (info.schemaPath.endsWith('/td')) {
      var tdId_1 = schema.$$id;
      toolbars.push({
        icon: 'fa fa-chevron-left',
        order: 100,
        tooltip: i18nRuntime.i18n("a896691b72032fe21a00b6487381a529"),
        onClick: function () {
          _this.insertCol(tdId_1, 'left');
        }
      });
      toolbars.push({
        icon: 'fa fa-chevron-down',
        order: 100,
        tooltip: i18nRuntime.i18n("24e4bbbf29a8d31e711c8d9366bf1a6f"),
        onClick: function () {
          _this.insertRow(tdId_1, 'below');
        }
      });
      toolbars.push({
        icon: 'fa fa-chevron-up',
        order: 100,
        tooltip: i18nRuntime.i18n("aea2dd682bc9dc2974dd971581148459"),
        onClick: function () {
          _this.insertRow(tdId_1, 'above');
        }
      });
      toolbars.push({
        icon: 'fa fa-chevron-right',
        order: 100,
        tooltip: i18nRuntime.i18n("bac058b86f8fd4e8f5e2ef3807799aea"),
        onClick: function () {
          _this.insertCol(tdId_1, 'right');
        }
      });
      var colspan = schema.colspan || 1;
      var rowspan = schema.rowspan || 1;
      if (colspan > 1 || rowspan > 1) {
        toolbars.push({
          icon: 'fa fa-columns',
          order: 100,
          tooltip: i18nRuntime.i18n("488d0742c010851e9c6ce3264df9542b"),
          onClick: function () {
            _this.splitCell(tdId_1);
          }
        });
      }
    }
  };
  TableViewPlugin.id = 'TableViewPlugin';
  return TableViewPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TableViewPlugin);

exports.TableViewPlugin = TableViewPlugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
