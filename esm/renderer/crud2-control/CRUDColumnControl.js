/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import { findDOMNode } from 'react-dom';
import Sortable from 'sortablejs';
import { toast, Tag, Button, Icon, Spinner, autobind, FormItem } from 'amis';
import { TooltipWrapper } from 'amis-ui';
import { JSONPipeIn } from 'amis-editor-core';
import AddColumnModal from './AddColumnModal.js';
import { i18n } from 'i18n-runtime';

/**
 * @file CRUDColumnControl
 * @desc 列配置控件
 */
var CRUDColumnControl = /** @class */function (_super) {
  __extends(CRUDColumnControl, _super);
  function CRUDColumnControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      options: [],
      loading: false,
      showAddModal: false
    };
    return _this;
  }
  CRUDColumnControl.prototype.componentDidMount = function () {
    this.dom = findDOMNode(this);
    this.initOptions();
  };
  CRUDColumnControl.prototype.componentDidUpdate = function (prevProps) {
    if (prevProps.value !== this.props.value) {
      this.initOptions();
    }
  };
  CRUDColumnControl.prototype.transformOption = function (option) {
    var _a;
    if (option.name || option.type === 'operation') {
      return {
        label: typeof option.title === 'string' ? option.title : option.type === 'tpl' && typeof option.tpl === 'string' ? option.tpl /** 处理 SchemaObject 的场景 */ : option.name,
        value: (_a = option.name) !== null && _a !== void 0 ? _a : option.key,
        /** 使用$$id用于定位 */
        nodeId: option.$$id,
        hidden: option.type === 'operation',
        pristine: option
      };
    }
    return false;
  };
  CRUDColumnControl.prototype.initOptions = function () {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var _b, manager, nodeId, builder, store, node, options, columns, result_1;
      var _this = this;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = this.props, manager = _b.manager, nodeId = _b.nodeId, builder = _b.builder, _b.data;
            store = manager.store;
            node = store.getNodeById(nodeId);
            this.setState({
              loading: true
            });
            if (!(builder && builder.getCRUDListFields)) return [3 /*break*/, 5];
            _c.label = 1;
          case 1:
            _c.trys.push([1, 3,, 4]);
            return [4 /*yield*/, builder.getCRUDListFields({
              renderer: 'crud',
              schema: node.schema,
              inScaffold: false,
              controlSettings: {
                fieldMapper: this.transformOption.bind(this)
              }
            })];
          case 2:
            options = _c.sent();
            this.setState({
              options: options
            });
            return [3 /*break*/, 4];
          case 3:
            _c.sent();
            return [3 /*break*/, 4];
          case 4:
            return [3 /*break*/, 6];
          case 5:
            columns = (_a = node === null || node === void 0 ? void 0 : node.schema) === null || _a === void 0 ? void 0 : _a.columns;
            result_1 = [];
            columns.forEach(function (col) {
              var option = _this.transformOption(col);
              if (option !== false) {
                result_1.push(option);
              }
            });
            this.setState({
              options: result_1
            });
            _c.label = 6;
          case 6:
            this.setState({
              loading: false
            });
            return [2 /*return*/];
        }
      });
    });
  };

  CRUDColumnControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  CRUDColumnControl.prototype.initDragging = function () {
    var _this = this;
    var cx = this.props.classnames;
    var dom = findDOMNode(this);
    this.sortable = new Sortable(dom.querySelector(".".concat(cx('ae-CRUDConfigControl-list'))), {
      group: 'CRUDColumnControlGroup',
      animation: 150,
      handle: ".".concat(cx('ae-CRUDConfigControl-list-item')),
      ghostClass: ".".concat(cx('ae-CRUDConfigControl-list-item--dragging')),
      onEnd: function (e) {
        if (e.newIndex === e.oldIndex || e.newIndex == null || e.oldIndex == null) {
          return;
        }
        var parent = e.to;
        if (e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
        } else {
          parent.appendChild(e.item);
        }
        var options = _this.state.options.concat();
        options[e.oldIndex] = options.splice(e.newIndex, 1, options[e.oldIndex])[0];
        _this.setState({
          options: options
        }, function () {
          return _this.handleSort();
        });
      }
    });
  };
  CRUDColumnControl.prototype.destroyDragging = function () {
    this.sortable && this.sortable.destroy();
  };
  CRUDColumnControl.prototype.handleSort = function () {
    var onBulkChange = this.props.onBulkChange;
    var options = this.state.options.concat();
    onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
      columns: options.map(function (item) {
        return item.pristine;
      })
    });
  };
  CRUDColumnControl.prototype.handleEdit = function (item) {
    var _a, _b, _c;
    var _d = this.props,
      manager = _d.manager,
      node = _d.node;
    var columns = (_b = (_a = node === null || node === void 0 ? void 0 : node.schema) === null || _a === void 0 ? void 0 : _a.columns) !== null && _b !== void 0 ? _b : [];
    var idx = columns.findIndex(function (c) {
      return c.id === item.pristine.id;
    });
    if (!~idx) {
      toast.warning("\u672A\u627E\u5230\u5BF9\u5E94\u5217\u300C".concat(item.label, "\u300D"));
      return;
    }
    // FIXME: 理论上用item.nodeId就可以，不知道为何会重新构建一次导致store中node.id更新
    manager.setActiveId((_c = columns[idx]) === null || _c === void 0 ? void 0 : _c.$$id);
  };
  /** 添加列 */
  CRUDColumnControl.prototype.handleAddColumn = function (type) {
    var onBulkChange = this.props.onBulkChange;
    var options = this.state.options.concat();
    var scaffold;
    switch (type) {
      case 'field':
        this.setState({
          showAddModal: true,
          addModalData: {
            colTypeLabel: i18n("8eebb8ae809cf1ceaa23cd2fa2c73898"),
            colType: type
          }
        });
        break;
      case 'empty':
        scaffold = {
          title: i18n("f9e759ac21d528e7d1e84b5feae4560a"),
          name: 'empty'
        };
        break;
      case 'container':
        scaffold = {
          title: i18n("22c799040acdb2601b437ed5449de076"),
          name: 'container',
          type: 'container',
          style: {
            position: 'static',
            display: 'block'
          },
          wrapperBody: false,
          body: []
        };
        break;
      case 'operation':
        this.setState({
          showAddModal: true,
          addModalData: {
            colTypeLabel: i18n("39ccc34fa3ee9be12d8bae7e6fecbac2"),
            colType: type
          }
        });
        break;
    }
    if (!scaffold) {
      return;
    }
    var columnSchema = JSONPipeIn(__assign({}, scaffold));
    options.push({
      label: columnSchema.title,
      value: columnSchema.name,
      nodeId: columnSchema.$$id,
      hidden: type === 'operation',
      pristine: columnSchema
    });
    this.setState({
      options: options
    }, function () {
      onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
        columns: options.map(function (item) {
          return item.pristine;
        })
      });
    });
  };
  CRUDColumnControl.prototype.handleAddModalConfirm = function (scaffold) {
    var onBulkChange = this.props.onBulkChange;
    var options = this.state.options.concat();
    options.push({
      label: typeof scaffold.title === 'string' ? scaffold.title : scaffold.name,
      value: scaffold.name,
      nodeId: scaffold.$$id,
      hidden: scaffold.type === 'operation',
      pristine: scaffold
    });
    this.setState({
      options: options
    }, function () {
      onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
        columns: options.map(function (item) {
          return item.pristine;
        })
      });
    });
  };
  CRUDColumnControl.prototype.handleAddModalClose = function () {
    this.setState({
      showAddModal: false,
      addModalData: undefined
    });
  };
  CRUDColumnControl.prototype.handleDelete = function (item, index) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, onBulkChange, env, options, confirmed;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this.props, onBulkChange = _a.onBulkChange, env = _a.env;
            options = this.state.options;
            return [4 /*yield*/, env.confirm("\u786E\u5B9A\u8981\u5220\u9664\u5217\u300C".concat(item.label, "\u300D\u5417\uFF1F"))];
          case 1:
            confirmed = _b.sent();
            if (~index && confirmed) {
              options.splice(index, 1);
              this.setState({
                options: options
              }, function () {
                onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
                  columns: options.map(function (item) {
                    return item.pristine;
                  })
                });
              });
            }
            return [2 /*return*/];
        }
      });
    });
  };

  CRUDColumnControl.prototype.renderOption = function (item, index) {
    var _this = this;
    var _a, _b, _c;
    var _d = this.props,
      cx = _d.classnames;
      _d.data;
      _d.render;
      var popOverContainer = _d.popOverContainer,
      env = _d.env;
    return React__default.createElement("li", {
      key: index,
      className: cx('ae-CRUDConfigControl-list-item', 'is-draggable')
    }, React__default.createElement(TooltipWrapper, {
      tooltip: {
        content: item.label,
        tooltipTheme: 'dark',
        style: {
          fontSize: '12px'
        }
      },
      container: popOverContainer || ((_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)),
      trigger: ['hover'],
      delay: 150
    }, React__default.createElement("div", {
      className: cx('ae-CRUDConfigControl-list-item-info')
    }, React__default.createElement("span", null, item.label))), React__default.createElement("div", {
      className: cx('ae-CRUDConfigControl-list-item-actions')
    }, item.hidden || !((_b = item === null || item === void 0 ? void 0 : item.context) === null || _b === void 0 ? void 0 : _b.isCascadingField) ? null : React__default.createElement(Tag, {
      label: (_c = item === null || item === void 0 ? void 0 : item.context) === null || _c === void 0 ? void 0 : _c.modelLabel,
      displayMode: "normal",
      className: cx('ae-CRUDConfigControl-list-item-tag', 'ae-CRUDConfigControl-list-item-tag--cascading')
    }), React__default.createElement(Button, {
      level: "link",
      size: "sm",
      tooltip: {
        content: i18n("eee03351367bb1907dcc3140ffa3e3b8"),
        tooltipTheme: 'dark',
        style: {
          fontSize: '12px'
        }
      },
      onClick: function () {
        return _this.handleEdit(item);
      }
    }, React__default.createElement(Icon, {
      icon: "column-setting",
      className: "icon"
    })), React__default.createElement(Button, {
      level: "link",
      size: "sm",
      onClick: function () {
        return _this.handleDelete(item, index);
      }
    }, React__default.createElement(Icon, {
      icon: "column-delete",
      className: "icon"
    }))));
  };
  CRUDColumnControl.prototype.renderHeader = function () {
    var _this = this;
    var _a, _b;
    var _c = this.props,
      cx = _c.classnames;
      _c.data;
      var render = _c.render,
      env = _c.env;
    return React__default.createElement("header", {
      className: cx('ae-CRUDConfigControl-header')
    }, React__default.createElement("span", {
      className: cx('Form-label')
    }, i18n("dc7558211f2990370954c2e7ca498ee9")), render('column-control-dropdown', {
      type: 'dropdown-button',
      closeOnClick: true,
      hideCaret: true,
      level: 'link',
      align: 'right',
      trigger: ['click'],
      popOverContainer: (_b = (_a = env.getModalContainer) !== null && _a !== void 0 ? _a : this.dom) !== null && _b !== void 0 ? _b : document.body,
      icon: 'column-add',
      label: i18n("49198f84cea6c212cd5d463037827cd5"),
      className: cx('ae-CRUDConfigControl-dropdown'),
      buttons: [{
        type: 'button',
        label: i18n("8eebb8ae809cf1ceaa23cd2fa2c73898"),
        onClick: function () {
          return _this.handleAddColumn('field');
        }
      }, {
        type: 'button',
        label: i18n("f9e759ac21d528e7d1e84b5feae4560a"),
        onClick: function () {
          return _this.handleAddColumn('empty');
        }
      }, {
        type: 'button',
        label: i18n("7202bba23492811d2964234485a909e5"),
        onClick: function () {
          return _this.handleAddColumn('container');
        }
      }, {
        type: 'button',
        label: i18n("39ccc34fa3ee9be12d8bae7e6fecbac2"),
        onClick: function () {
          return _this.handleAddColumn('operation');
        }
      }]
    }));
  };
  CRUDColumnControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      cx = _a.classnames,
      ctx = _a.data,
      manager = _a.manager,
      builder = _a.builder;
    var _b = this.state,
      options = _b.options,
      loading = _b.loading,
      showAddModal = _b.showAddModal,
      addModalData = _b.addModalData;
    return React__default.createElement("div", {
      className: cx('ae-CRUDConfigControl')
    }, loading ? React__default.createElement(Spinner, {
      show: true,
      tip: i18n("4c2dc6491d29ef77f421daa19541c8ab"),
      tipPlacement: "bottom",
      size: "sm",
      className: cx('flex')
    }) : Array.isArray(options) && options.length > 0 ? React__default.createElement(React__default.Fragment, null, this.renderHeader(), React__default.createElement("ul", {
      className: cx('ae-CRUDConfigControl-list'),
      ref: this.dragRef
    }, options.map(function (item, index) {
      return _this.renderOption(item, index);
    }))) : React__default.createElement("ul", {
      className: cx('ae-CRUDConfigControl-list'),
      ref: this.dragRef
    }, React__default.createElement("p", {
      className: cx("ae-CRUDConfigControl-placeholder")
    }, i18n("21efd88b67a39834582ad99aabb9dc60"))), showAddModal ? React__default.createElement(AddColumnModal, {
      render: this.props.render,
      visible: showAddModal,
      initData: addModalData,
      ctx: ctx,
      manager: manager,
      builder: builder,
      onConfirm: this.handleAddModalConfirm,
      onClose: this.handleAddModalClose
    }) : null);
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], CRUDColumnControl.prototype, "dragRef", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], CRUDColumnControl.prototype, "handleSort", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], CRUDColumnControl.prototype, "handleEdit", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], CRUDColumnControl.prototype, "handleAddColumn", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], CRUDColumnControl.prototype, "handleAddModalConfirm", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], CRUDColumnControl.prototype, "handleAddModalClose", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Number]), __metadata("design:returntype", Promise)], CRUDColumnControl.prototype, "handleDelete", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Number]), __metadata("design:returntype", void 0)], CRUDColumnControl.prototype, "renderOption", null);
  return CRUDColumnControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(CRUDColumnControlRenderer, _super);
  function CRUDColumnControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  CRUDColumnControlRenderer = __decorate([FormItem({
    type: 'ae-crud-column-control',
    renderLabel: false,
    wrap: false
  })], CRUDColumnControlRenderer);
  return CRUDColumnControlRenderer;
})(CRUDColumnControl);

export { CRUDColumnControl };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
