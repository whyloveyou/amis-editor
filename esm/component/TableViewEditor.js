/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __values, __assign, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import isEqual from 'lodash/isEqual';
import { toast } from 'amis';
import { JSONGetById, autobind } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

/**
 * @file tableview 相关的可视化编辑，拖动行高等
 */
var ROW_HEIGHT = 42;
// 找到 td 最多的那一行，将这一行作为列线
function findMaxTrChildren(trs) {
  var maxSize = 0;
  var maxIndex = 0;
  for (var trIndex = 0; trIndex < trs.length; trIndex++) {
    var childSize = (trs[trIndex].tds || []).length;
    if (childSize > maxSize) {
      maxIndex = trIndex;
      maxSize = childSize;
    }
  }
  return maxIndex;
}
var TableViewEditor = /** @class */function (_super) {
  __extends(TableViewEditor, _super);
  function TableViewEditor(props) {
    var _this = _super.call(this, props) || this;
    _this.preventTableClick = false;
    _this.tableViewWrapperRef = React__default.createRef();
    _this.store = _this.props.manager.store;
    var trs = _this.props.schema.trs || [];
    if (trs.length) {
      var trsIds = trs.map(function (tr) {
        return tr.$$id;
      });
      var maxChildTrIndex = findMaxTrChildren(trs);
      _this.maxChildTrIndex = maxChildTrIndex;
      var tds = trs[maxChildTrIndex].tds || [];
      var tdsIds = tds.map(function (td) {
        return td.$$id;
      });
      _this.state = {
        trIds: trsIds,
        tdIds: tdsIds,
        displayMergeCell: false
      };
    } else {
      _this.state = {
        trIds: [],
        tdIds: [],
        displayMergeCell: false
      };
    }
    _this.listenTdSelection();
    return _this;
  }
  TableViewEditor.prototype.componentDidMount = function () {
    this.syncLinePos();
    this.listenTdSelection();
  };
  TableViewEditor.prototype.componentWillUnmount = function () {
    this.removeListenTdSelection();
  };
  // 同步线数量，主要用于新增行或列
  TableViewEditor.prototype.syncLineState = function () {
    var _this = this;
    var trs = this.props.schema.trs || [];
    if (!trs.length) {
      return;
    }
    var trsIds = trs.map(function (tr) {
      return tr.$$id;
    });
    var maxChildTrIndex = findMaxTrChildren(trs);
    this.maxChildTrIndex = maxChildTrIndex;
    var tds = trs[maxChildTrIndex].tds || [];
    var tdsIds = tds.map(function (td) {
      return td.$$id;
    });
    this.setState({
      trIds: trsIds,
      tdIds: tdsIds
    }, function () {
      _this.syncLinePos();
    });
  };
  TableViewEditor.prototype.removeListenTdSelection = function () {
    var dom = this.tableViewWrapperRef.current;
    if (dom) {
      var tbody = dom.querySelector('tbody');
      tbody.removeEventListener('mousedown', this.handleCellMouseDown);
      tbody.removeEventListener('mousemove', this.handleCellMouseMove);
      tbody.removeEventListener('mouseup', this.handleCellMouseUp);
      tbody.removeEventListener('click', this.handleCellMouseClick);
    }
  };
  // 监听 td 的拖拽事件，用于实现单元格合并
  TableViewEditor.prototype.listenTdSelection = function () {
    var dom = this.tableViewWrapperRef.current;
    if (dom) {
      var tbody = dom.querySelector('tbody');
      tbody.addEventListener('mousedown', this.handleCellMouseDown);
      tbody.addEventListener('mousemove', this.handleCellMouseMove);
      tbody.addEventListener('mouseup', this.handleCellMouseUp);
      tbody.addEventListener('click', this.handleCellMouseClick);
    }
  };
  // 用于单元格合并的点击
  TableViewEditor.prototype.handleCellMouseDown = function (e) {
    var _a;
    var td = e.target;
    if (td && td.tagName !== 'TD') {
      return;
    }
    this.removeAllSelectionMark();
    this.setState({
      displayMergeCell: false
    });
    var tdId = td.getAttribute('data-editor-id');
    this.isSelectionCell = true;
    this.selectedCell = (_a = {}, _a[tdId] = JSONGetById(this.props.schema, tdId), _a);
  };
  // 用于单元格合并的移动
  TableViewEditor.prototype.handleCellMouseMove = function (e) {
    if (this.isSelectionCell) {
      this.preventTableClick = true; //如果有移动就禁止一次表格 click 事件
      var td = e.target;
      if (td && td.tagName !== 'TD') {
        return;
      }
      var tdId = td.getAttribute('data-editor-id');
      if (!(tdId in this.selectedCell)) {
        this.selectedCell[tdId] = JSONGetById(this.props.schema, tdId);
        this.markSelectingCell();
        this.setState({
          displayMergeCell: true
        });
      }
    }
  };
  // 查找最大和最小行列位置，考虑跨行的情况，用于单元格合并
  TableViewEditor.prototype.findFirstAndLastCell = function () {
    var e_1, _a;
    var tds = [];
    for (var tdId in this.selectedCell) {
      tds.push(this.selectedCell[tdId]);
    }
    if (!tds.length) {
      console.warn(i18n("9efb0ce5a4510ef29345b6edb3e58bc2"));
    }
    var minCol = tds[0].$$col;
    var minRow = tds[0].$$row;
    var maxCol = 0;
    var maxRow = 0;
    var firstCell = null;
    var lastCell = null;
    try {
      for (var tds_1 = __values(tds), tds_1_1 = tds_1.next(); !tds_1_1.done; tds_1_1 = tds_1.next()) {
        var td = tds_1_1.value;
        var col = td.$$col + (td.colspan || 1) - 1; // 这里直接减一不然后面还得弄
        var row = td.$$row + (td.rowspan || 1) - 1;
        if (col >= maxCol) {
          maxCol = col;
        }
        if (row >= maxRow) {
          maxRow = row;
        }
        if (td.$$col <= minCol) {
          minCol = td.$$col;
        }
        if (td.$$row <= minRow) {
          minRow = td.$$row;
        }
        if (td.$$col === minCol && td.$$row === minRow) {
          firstCell = td;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (tds_1_1 && !tds_1_1.done && (_a = tds_1.return)) _a.call(tds_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return {
      minRow: minRow,
      minCol: minCol,
      maxRow: maxRow,
      maxCol: maxCol,
      firstCell: firstCell,
      lastCell: lastCell
    };
  };
  /**
   * 选择 td 主要是为了单元格合并，它要求是必须是矩形，比如下面的例子
   *		┌───┬───┬───┬───┐
   *		│ a │ b │ c │ d │
   *		├───┴───┼───┤   │
   *		│ e     │ f │   │
   *		│       ├───┼───┤
   *		│       │ g │ h │
   *		└───────┴───┴───┘
   * 直接选 a 和 c 是不行的，无法进行单元格合并，所以需要补上 b
   * 如果选择了 e 和 f，需要自动选择 g 来让整体变成矩形
   * 这个函数的主要作用就是将矩形补充完整
   */
  TableViewEditor.prototype.markSelectingCell = function () {
    var e_2, _a, e_3, _b;
    var _this = this;
    // 首先，查找最小和最大的行和列
    var _c = this.findFirstAndLastCell(),
      minRow = _c.minRow,
      minCol = _c.minCol,
      maxRow = _c.maxRow,
      maxCol = _c.maxCol;
    try {
      // 变量一遍找出所有在这个范围内的节点，如果不在就添加
      for (var _d = __values(this.props.schema.trs), _e = _d.next(); !_e.done; _e = _d.next()) {
        var tr = _e.value;
        try {
          for (var _f = (e_3 = void 0, __values(tr.tds)), _g = _f.next(); !_g.done; _g = _f.next()) {
            var td = _g.value;
            var internalTd = td;
            if (internalTd.$$col >= minCol && internalTd.$$col <= maxCol && internalTd.$$row >= minRow && internalTd.$$row <= maxRow) {
              if (!(internalTd.$$id in this.selectedCell)) {
                this.selectedCell[internalTd.$$id] = td;
              }
            }
          }
        } catch (e_3_1) {
          e_3 = {
            error: e_3_1
          };
        } finally {
          try {
            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
    var dom = this.tableViewWrapperRef.current;
    if (dom) {
      var tds = dom.querySelectorAll('td');
      tds.forEach(function (td) {
        var tdId = td.getAttribute('data-editor-id');
        if (tdId in _this.selectedCell) {
          td.setAttribute('data-selected', '1');
        }
      });
    }
  };
  // 清除之前的单元格选择
  TableViewEditor.prototype.removeAllSelectionMark = function () {
    var dom = this.tableViewWrapperRef.current;
    if (dom) {
      var tds = dom.querySelectorAll('td');
      tds.forEach(function (td) {
        td.removeAttribute('data-selected');
      });
    }
  };
  TableViewEditor.prototype.handleCellMouseUp = function (e) {
    this.isSelectionCell = false;
  };
  // 如果有拖拽的时候就避免选中表格导致状态切换
  TableViewEditor.prototype.handleCellMouseClick = function (e) {
    if (this.preventTableClick) {
      e.stopPropagation();
      e.preventDefault();
      this.preventTableClick = false;
    }
  };
  // 合并单元格操作
  TableViewEditor.prototype.handleMergeCell = function () {
    var _a = this.findFirstAndLastCell(),
      firstCell = _a.firstCell,
      minRow = _a.minRow,
      minCol = _a.minCol,
      maxRow = _a.maxRow,
      maxCol = _a.maxCol;
    if (!firstCell) {
      console.warn(i18n("3ce57bd19e37d2b27145dc6fcfff3520"));
      return;
    }
    var firstCellId = firstCell.$$id;
    var colspan = maxCol - minCol + 1;
    var rowspan = maxRow - minRow + 1;
    firstCell.colspan = colspan;
    firstCell.rowspan = rowspan;
    var tds = [];
    for (var tdId in this.selectedCell) {
      tds.push(this.selectedCell[tdId]);
    }
    // 其它单元格，这些单元格会被删掉
    var otherCellIds = tds.filter(function (td) {
      return td.$$id !== firstCellId;
    }).map(function (td) {
      return td.$$id;
    });
    var trs = this.props.schema.trs;
    var trIndex = trs.length;
    while (trIndex--) {
      var tr = trs[trIndex];
      tr.tds = tr.tds.filter(function (td) {
        return !otherCellIds.includes(td.$$id);
      });
      if (!tr.tds.length) {
        trs.splice(trIndex, 1);
      }
    }
    var tableId = this.props.schema.$$id;
    this.store.changeValueById(tableId, this.props.schema);
    this.setState({
      displayMergeCell: false
    });
  };
  // 同步线的位置
  TableViewEditor.prototype.syncLinePos = function () {
    var dom = this.tableViewWrapperRef.current;
    if (dom) {
      var table = dom.querySelector('table');
      var tableRect = table.getBoundingClientRect();
      var trs = dom.querySelectorAll('tr');
      if (!trs.length || typeof this.maxChildTrIndex === 'undefined') {
        return;
      }
      var rowLines = Array.from(dom.querySelectorAll('.ae-TableViewEditor-rowLine'));
      for (var trIndex = 0; trIndex < trs.length; trIndex++) {
        if (!trs[trIndex]) {
          continue;
        }
        var trRect = trs[trIndex].getBoundingClientRect();
        if (rowLines[trIndex]) {
          // 线的宽度是 7，所以要减去 3.5
          rowLines[trIndex].style.top = trRect.top + trRect.height - tableRect.top - 3.5 + 'px';
        } else {
          console.warn(i18n("f7d205072a2ceb63b4f48a8b6f32fd25"));
        }
      }
      var tds = trs[this.maxChildTrIndex].querySelectorAll('td');
      var colLines = Array.from(dom.querySelectorAll('.ae-TableViewEditor-colLine'));
      for (var tdIndex = 0; tdIndex < tds.length; tdIndex++) {
        var td = tds[tdIndex];
        if (!td) {
          continue;
        }
        var tdRect = td.getBoundingClientRect();
        if (colLines[tdIndex]) {
          colLines[tdIndex].style.left = tdRect.left + tdRect.width - tableRect.left - 3.5 + 'px';
        } else {
          console.warn(i18n("852228c640b1daefe6b0853390e66791"));
        }
      }
    }
  };
  TableViewEditor.prototype.componentDidUpdate = function (prevProps) {
    var prevSchema = prevProps.schema;
    var thisSchema = this.props.schema;
    if (!isEqual(prevSchema, thisSchema)) {
      this.syncLineState();
    }
  };
  // 水平或垂直线在鼠标按下去时的通用处理
  TableViewEditor.prototype.lineMouseDownCommon = function (e) {
    this.startY = e.clientY;
    this.startX = e.clientX;
    var currentTarget = e.currentTarget;
    this.draggingElement = currentTarget;
    this.draggingElementTop = parseInt(this.draggingElement.style.top, 10);
    this.draggingElementLeft = parseInt(this.draggingElement.style.left, 10);
    currentTarget.style.background = '#4285f4';
    this.draggingId = currentTarget.getAttribute('data-id');
    currentTarget.addEventListener('click', this.handleLineClick, {
      once: true
    });
  };
  // 水平线的拖拽
  TableViewEditor.prototype.handleRowMouseDown = function (e) {
    this.lineMouseDownCommon(e);
    document.addEventListener('mousemove', this.handleRowMouseMove);
    document.addEventListener('mouseup', this.handleRowMouseUp);
  };
  // 水平线移动
  TableViewEditor.prototype.handleRowMouseMove = function (e) {
    var moveY = e.clientY - this.startY;
    this.draggingElement.style.top = this.draggingElementTop + moveY + 'px';
  };
  // 水平线结束
  TableViewEditor.prototype.handleRowMouseUp = function (e) {
    document.removeEventListener('mousemove', this.handleRowMouseMove);
    document.removeEventListener('mouseup', this.handleRowMouseUp);
    var moveY = e.clientY - this.startY;
    var store = this.store;
    var draggingId = this.draggingId;
    var value = store.getValueOf(draggingId);
    var rowElement = this.tableViewWrapperRef.current.querySelector("tr[data-editor-id=\"".concat(draggingId, "\"]"));
    this.draggingElement.style.background = 'none';
    if (!value || !rowElement) {
      console.warn(i18n("26526c3354307798dfa84f17decf5140"), draggingId);
    } else {
      var height = rowElement.getBoundingClientRect().height;
      var targetHeight = height + moveY;
      store.changeValueById(draggingId, __assign(__assign({}, value), {
        height: targetHeight
      }));
      if (ROW_HEIGHT - targetHeight > 20) {
        toast.warning(i18n("38d2ccdde0ae0c2329defd3c75c59d8b"));
      }
    }
  };
  // 垂直线的拖拽
  TableViewEditor.prototype.handleColMouseDown = function (e) {
    this.lineMouseDownCommon(e);
    document.addEventListener('mousemove', this.handleColMouseMove);
    document.addEventListener('mouseup', this.handleColMouseUp);
  };
  // 垂直线移动
  TableViewEditor.prototype.handleColMouseMove = function (e) {
    var moveX = e.clientX - this.startX;
    this.draggingElement.style.left = this.draggingElementLeft + moveX + 'px';
  };
  // 垂直线结束
  TableViewEditor.prototype.handleColMouseUp = function (e) {
    document.removeEventListener('mousemove', this.handleColMouseMove);
    document.removeEventListener('mouseup', this.handleColMouseUp);
    var moveX = e.clientX - this.startX;
    var store = this.store;
    var draggingId = this.draggingId;
    var value = store.getValueOf(draggingId);
    var tdElement = this.tableViewWrapperRef.current.querySelector("td[data-editor-id=\"".concat(draggingId, "\"]"));
    this.draggingElement.style.background = 'none';
    if (!value || !tdElement) {
      console.warn(i18n("26526c3354307798dfa84f17decf5140"), draggingId);
    } else {
      var width = tdElement.getBoundingClientRect().width;
      var targetWidth = width + moveX;
      store.changeValueById(draggingId, __assign(__assign({}, value), {
        width: targetWidth
      }));
    }
  };
  // 阻止冒泡防止切换到表格选中
  TableViewEditor.prototype.handleLineClick = function (e) {
    e.stopPropagation();
    e.preventDefault();
  };
  // 单元格合并的按钮
  TableViewEditor.prototype.renderMergeIcon = function () {
    if (this.state.displayMergeCell) {
      return React__default.createElement("div", {
        className: "ae-TableViewEditor-mergeIcon",
        onMouseDown: this.handleMergeCell
      }, i18n("d59379f4227af3b2c60214e2f4f903ba"));
    }
    return null;
  };
  TableViewEditor.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      children = _a.children,
      schema = _a.schema;
    var rowLines = this.state.trIds.map(function (id) {
      return React__default.createElement("div", {
        className: "ae-TableViewEditor-rowLine",
        key: "row-".concat(id),
        "data-id": id,
        onMouseDown: _this.handleRowMouseDown
      });
    });
    var colLines = this.state.tdIds.map(function (id) {
      return React__default.createElement("div", {
        className: "ae-TableViewEditor-colLine",
        key: "row-".concat(id),
        "data-id": id,
        onMouseDown: _this.handleColMouseDown
      });
    });
    return React__default.createElement("div", {
      className: "ae-TableViewEditor",
      ref: this.tableViewWrapperRef,
      style: schema === null || schema === void 0 ? void 0 : schema.style
    }, children, this.renderMergeIcon(), rowLines, colLines);
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "removeListenTdSelection", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "listenTdSelection", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleCellMouseDown", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleCellMouseMove", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleCellMouseUp", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleCellMouseClick", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleMergeCell", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleRowMouseDown", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleRowMouseMove", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleRowMouseUp", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleColMouseDown", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleColMouseMove", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleColMouseUp", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TableViewEditor.prototype, "handleLineClick", null);
  return TableViewEditor;
}(React__default.Component);

export { TableViewEditor };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
