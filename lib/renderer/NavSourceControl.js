/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var Sortable = require('sortablejs');
var set = require('lodash/set');
var get = require('lodash/get');
var cloneDeep = require('lodash/cloneDeep');
var amisCore = require('amis-core');
var amis = require('amis');
var amisUi = require('amis-ui');
var amisEditor = require('amis-editor');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var Sortable__default = /*#__PURE__*/_interopDefaultLegacy(Sortable);
var set__default = /*#__PURE__*/_interopDefaultLegacy(set);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

/**
 * @file 组件选项组件的可视化编辑控件
 */
var NavSourceControl = /** @class */function (_super) {
  tslib.__extends(NavSourceControl, _super);
  function NavSourceControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      links: _this.transformOptions(props),
      api: props.data.source,
      source: _this.transformSource(props.data.source),
      showDialog: false,
      isEdit: false,
      modalName: '',
      modalParent: '',
      modalIcon: '',
      modalTarget: '_self',
      modalBadge: '',
      modalUrl: '',
      currentIndex: '',
      previousModalParent: ''
    };
    _this.sortables = [];
    return _this;
  }
  NavSourceControl.prototype.transformSource = function (source) {
    if (source) {
      return 'api';
    }
    return 'custom';
  };
  NavSourceControl.prototype.transformOptions = function (props) {
    var data = props.data;
    return Array.isArray(data.links) ? data.links : [];
  };
  /**
   * 更新统一出口
   */
  NavSourceControl.prototype.onChange = function () {
    var onBulkChange = this.props.onBulkChange;
    var source = this.state.source;
    var data = {
      source: undefined,
      links: undefined
    };
    if (source === 'custom') {
      var links = this.state.links;
      this.handleSetNavId(links, '');
      data.links = links;
    } else {
      var api = this.state.api;
      data.source = api;
    }
    onBulkChange && onBulkChange(data);
  };
  /**
   * 切换选项类型
   */
  NavSourceControl.prototype.handleSourceChange = function (source) {
    this.setState({
      api: '',
      source: source
    }, this.onChange);
  };
  NavSourceControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.drag = ref;
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging(true);
    }
  };
  NavSourceControl.prototype.initDragging = function () {
    var _this = this;
    var _a;
    var rootSortable = new Sortable__default["default"](this.drag, {
      group: 'NavSourceControlGroup',
      animation: 150,
      handle: '.nav-links-item-dragBar',
      onEnd: function (e) {
        _this.handleDragging(e);
      }
    });
    this.sortables.push(rootSortable);
    var parents = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.nav-links-children');
    if (!parents) {
      return;
    }
    Array.from(parents).forEach(function (parent) {
      var sortable = new Sortable__default["default"](parent, {
        group: 'NavSourceControlGroup',
        animation: 150,
        handle: '.nav-links-item-dragBar',
        onEnd: function (e) {
          _this.handleDragging(e);
        }
      });
      _this.sortables.push(sortable);
    });
  };
  NavSourceControl.prototype.handleDragging = function (e) {
    var _this = this;
    var oldIndex = e.oldIndex,
      newIndex = e.newIndex,
      from = e.from,
      to = e.to;
    var nodeOldIndex = from.dataset.level ? "".concat(from.dataset.level, "_").concat(oldIndex) : "".concat(oldIndex);
    var nodeNewIndex = to.dataset.level ? "".concat(to.dataset.level, "_").concat(newIndex) : "".concat(newIndex);
    var links = cloneDeep__default["default"](this.state.links);
    if (!nodeOldIndex || !nodeNewIndex) {
      return;
    }
    var _a = this.getNodePath(nodeOldIndex),
      oldPath = _a.path,
      oldParentPath = _a.parentPath;
    var activeDraggingItem = get__default["default"](links, "".concat(oldPath));
    if (oldParentPath) {
      var oldParent = get__default["default"](links, "".concat(oldParentPath, ".children"), []);
      typeof oldIndex === 'number' && oldParent.splice(oldIndex, 1);
      set__default["default"](links, "".concat(oldParentPath, ".children"), oldParent);
    } else {
      typeof oldIndex === 'number' && links.splice(oldIndex, 1);
    }
    var newParentPath = this.getNodePath(nodeNewIndex).parentPath;
    if (newParentPath) {
      var newParent = get__default["default"](links, "".concat(newParentPath, ".children"), []);
      typeof newIndex === 'number' && newParent.splice(newIndex, 0, activeDraggingItem);
      set__default["default"](links, "".concat(newParentPath, ".children"), newParent);
    } else {
      typeof newIndex === 'number' && links.splice(newIndex, 0, activeDraggingItem);
    }
    // 数据diff时会使得dom结构出bug，多个相同节点，先置空再重新赋值
    this.setState({
      source: ''
    }, function () {
      _this.setState({
        links: links,
        source: 'custom'
      }, function () {
        _this.refreshBindDrag();
        _this.onChange();
      });
    });
  };
  NavSourceControl.prototype.getNodePath = function (pathStr) {
    var pathArr = pathStr.split('_');
    if (pathArr.length === 1) {
      return {
        path: pathArr,
        parentPath: ''
      };
    }
    var path = "[".concat(pathArr.join('].children['), "]");
    pathArr = pathArr.slice(0, pathArr.length - 1);
    var parentPath = "[".concat(pathArr.join('].children['), "]");
    return {
      path: path,
      parentPath: parentPath
    };
  };
  NavSourceControl.prototype.refreshBindDrag = function () {
    if (this.drag) {
      this.destroyDragging();
      this.initDragging();
    }
  };
  NavSourceControl.prototype.destroyDragging = function (destroyRoot) {
    this.sortables.forEach(function (sortable) {
      sortable === null || sortable === void 0 ? void 0 : sortable.destroy();
    });
    this.sortables = [];
    destroyRoot && (this.drag = null);
  };
  /**
   * 删除选项
   */
  NavSourceControl.prototype.handleDelete = function (index) {
    var _this = this;
    return new Promise(function (resolve) {
      var links = _this.state.links.concat();
      var pathArr = index.split('_');
      var parentPathArr = pathArr.slice(0, pathArr.length - 1);
      var parentPath = "[".concat(parentPathArr.join('].children['), "]");
      var deleteItemParent = parentPathArr.length > 0 ? get__default["default"](links, "".concat(parentPath, ".children"), []) : links;
      deleteItemParent.splice(parseInt(pathArr[pathArr.length - 1]), 1);
      _this.setState({
        links: links
      }, function () {
        return _this.onChange();
      });
      resolve('');
    });
  };
  NavSourceControl.prototype.handleUpdate = function (index) {
    var links = this.state.links;
    var pathArr = index.split('_');
    var path = "[".concat(pathArr.join('].children['), "]");
    var updateItem = get__default["default"](links, path);
    // find parent id
    var parentPathArr = pathArr.slice(0, pathArr.length - 1);
    var parentPath = "[".concat(parentPathArr.join('].children['), "]");
    if (parentPathArr.length > 0) {
      parentPath += 'id';
    }
    var parentId = parentPathArr.length > 0 ? get__default["default"](links, parentPath) : '';
    this.setState({
      modalName: updateItem.label,
      modalBadge: updateItem.badge,
      modalIcon: updateItem.icon,
      modalParent: parentId,
      previousModalParent: parentId,
      modalTarget: updateItem.target,
      modalUrl: updateItem.to,
      showDialog: true,
      isEdit: true,
      currentIndex: index
    });
  };
  NavSourceControl.prototype.getChildren = function () {
    var _a = this.state,
      currentIndex = _a.currentIndex,
      links = _a.links;
    if (!currentIndex) {
      return [];
    }
    var pathArr = currentIndex.split('_');
    var path = "[".concat(pathArr.join('].children['), "]");
    var item = get__default["default"](links, path);
    if (item && item.children) {
      return item.children;
    } else {
      return [];
    }
  };
  NavSourceControl.prototype.handleSubmit = function () {
    return tslib.__awaiter(this, void 0, void 0, function () {
      var _a, isEdit, modalBadge, modalIcon, modalName, modalParent, modalTarget, modalUrl, currentIndex, previousModalParent, activeLink, links, pathArr, path, links, parentPathArr, parentPath, originChildren;
      var _this = this;
      return tslib.__generator(this, function (_b) {
        _a = this.state, isEdit = _a.isEdit, modalBadge = _a.modalBadge, modalIcon = _a.modalIcon, modalName = _a.modalName, modalParent = _a.modalParent, modalTarget = _a.modalTarget, modalUrl = _a.modalUrl, currentIndex = _a.currentIndex, previousModalParent = _a.previousModalParent;
        if (!modalName) {
          amis.toast.error(i18nRuntime.i18n("404f38ae7ac36860c0b3af6f2f4a13f9"));
          return [2 /*return*/];
        }

        if (isEdit && currentIndex === modalParent) {
          amis.toast.error(i18nRuntime.i18n("822be91778b5ac22d31681f7256b849b"));
          return [2 /*return*/];
        }

        activeLink = {
          label: modalName,
          to: modalUrl,
          icon: modalIcon,
          target: modalTarget,
          badge: modalBadge,
          children: this.getChildren()
        };
        if (isEdit && previousModalParent === modalParent) {
          links = cloneDeep__default["default"](this.state.links);
          pathArr = currentIndex.split('_');
          path = "[".concat(pathArr.join('].children['), "]");
          if (pathArr.length > 0) {
            // 多层级下
            set__default["default"](links, path, activeLink);
          } else {
            // 一级菜单
            links[parseInt(currentIndex)] = activeLink;
          }
          this.setState({
            links: links
          }, function () {
            return _this.onChange();
          });
          this.closeModal();
        } else {
          links = cloneDeep__default["default"](this.state.links);
          if (modalParent) {
            parentPathArr = modalParent.split('_');
            parentPath = "[".concat(parentPathArr.join('].children['), "].children");
            originChildren = get__default["default"](links, parentPath) || [];
            originChildren.push(activeLink);
            set__default["default"](links, parentPath, originChildren);
          } else {
            links.push(activeLink);
          }
          this.setState({
            links: links
          }, function () {
            return tslib.__awaiter(_this, void 0, void 0, function () {
              return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    this.onChange();
                    if (!isEdit) return [3 /*break*/, 2];
                    // 更新完新的数据层级，再删除原来的节点
                    return [4 /*yield*/, this.handleDelete(currentIndex)];
                  case 1:
                    // 更新完新的数据层级，再删除原来的节点
                    _a.sent();
                    _a.label = 2;
                  case 2:
                    return [2 /*return*/];
                }
              });
            });
          });

          this.closeModal();
        }
        return [2 /*return*/];
      });
    });
  };

  NavSourceControl.prototype.handleSetNavId = function (data, index) {
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var newIndex = index ? "".concat(index, "_").concat(i) : "".concat(i);
      item.id = newIndex;
      if (item.children) {
        this.handleSetNavId(item.children, newIndex);
      }
    }
  };
  NavSourceControl.prototype.handleDeleteNavId = function (data) {
    var e_1, _a;
    if (Array.isArray(data)) {
      try {
        for (var data_1 = tslib.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
          var item = data_1_1.value;
          delete item.id;
          if (item.children) {
            this.handleDeleteNavId(item.children);
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    } else {
      delete data.id;
      if (data.children) {
        this.handleDeleteNavId(data.children);
      }
    }
  };
  NavSourceControl.prototype.handleFilterTreeData = function (data) {
    var e_2, _a;
    var currentIndex = this.state.currentIndex;
    try {
      for (var data_2 = tslib.__values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
        var item = data_2_1.value;
        if (item.id === currentIndex) {
          this.handleDeleteNavId(item);
          break;
        } else if (item.children) {
          this.handleFilterTreeData(item.children);
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
      } finally {
        if (e_2) throw e_2.error;
      }
    }
  };
  NavSourceControl.prototype.openModal = function () {
    this.setState({
      showDialog: true
    });
  };
  NavSourceControl.prototype.closeModal = function () {
    this.setState({
      showDialog: false,
      isEdit: false,
      modalParent: '',
      modalName: '',
      modalUrl: '',
      modalIcon: '',
      modalBadge: '',
      modalTarget: '_self',
      currentIndex: ''
    });
  };
  NavSourceControl.prototype.handleChange = function (options) {
    this.setState(options, this.onChange);
  };
  NavSourceControl.prototype.handleAPIChange = function (source) {
    this.setState({
      api: source
    }, this.onChange);
  };
  NavSourceControl.prototype.renderApiPanel = function () {
    var render = this.props.render;
    var _a = this.state,
      source = _a.source,
      api = _a.api;
    if (source === 'api') {
      return render('nav-' + source, amisEditor.getSchemaTpl('apiControl', {
        label: i18nRuntime.i18n("54ea89b497ec3bb319c68844dfa3687f"),
        name: 'source',
        mode: 'normal',
        className: 'ae-ExtendMore',
        value: api,
        onChange: this.handleAPIChange,
        sourceType: source
      }));
    }
    return null;
  };
  NavSourceControl.prototype.renderHeader = function () {
    var _this = this;
    var _a, _b;
    var _c = this.props,
      render = _c.render,
      label = _c.label,
      labelRemark = _c.labelRemark,
      mobileUI = _c.mobileUI,
      env = _c.env,
      popOverContainer = _c.popOverContainer;
    var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
    var source = this.state.source;
    var optionSourceList = [{
      label: i18nRuntime.i18n("088b54ee8f10a43977afa9d16ea5350f"),
      value: 'custom'
    }, {
      label: i18nRuntime.i18n("f99603414a616bdee85de0e6e3938b65"),
      value: 'api'
    }].map(function (item) {
      return tslib.__assign(tslib.__assign({
        key: item.value
      }, item), {
        onClick: function () {
          return _this.handleSourceChange(item.value);
        }
      });
    });
    return React__default["default"].createElement("header", {
      className: "ae-NavControl-header"
    }, React__default["default"].createElement("label", {
      className: cx__default["default"]("".concat(classPrefix, "Form-label"))
    }, label || '', labelRemark ? render('label-remark', {
      type: 'remark',
      icon: labelRemark.icon || 'warning-mark',
      tooltip: labelRemark,
      className: cx__default["default"]("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
      mobileUI: mobileUI,
      container: popOverContainer || env.getModalContainer
    }) : null), React__default["default"].createElement("div", null, render('validation-control-addBtn', {
      type: 'dropdown-button',
      level: 'link',
      size: 'sm',
      label: '${selected}',
      align: 'right',
      closeOnClick: true,
      closeOnOutside: true,
      buttons: optionSourceList
    }, {
      popOverContainer: null,
      data: {
        selected: (_b = optionSourceList.find(function (item) {
          return item.value === source;
        })) === null || _b === void 0 ? void 0 : _b.label
      }
    })));
  };
  NavSourceControl.prototype.renderNav = function (dataSource, index) {
    var _this = this;
    var render = this.props.render;
    return React__default["default"].createElement(React__default["default"].Fragment, null, dataSource.map(function (nav, i) {
      return React__default["default"].createElement("div", {
        className: 'nav-links-parent',
        key: nav.id || index ? "".concat(index, "_").concat(i) : "".concat(i),
        "data-path": index ? "".concat(index, "_").concat(i) : "".concat(i)
      }, React__default["default"].createElement("div", {
        className: "nav-links-item"
      }, React__default["default"].createElement("a", {
        className: "nav-links-item-dragBar"
      }, React__default["default"].createElement(amis.Icon, {
        icon: "drag-bar",
        className: "icon"
      })), nav.icon && render("render-icon-".concat(typeof nav.icon !== 'string' ? nav.icon.id : nav.icon), {
        type: 'icon',
        icon: nav.icon,
        className: 'nav-links-item-icon'
      }), React__default["default"].createElement(amisUi.TooltipWrapper, {
        tooltip: nav.label,
        placement: "left"
      }, React__default["default"].createElement("div", {
        className: "nav-links-item-label"
      }, nav.label)), React__default["default"].createElement("div", {
        className: "nav-links-item-actions"
      }, React__default["default"].createElement(amisUi.TooltipWrapper, {
        tooltip: i18nRuntime.i18n("95b351c86267f3aedf89520959bce689"),
        placement: "left"
      }, React__default["default"].createElement(amis.Icon, {
        icon: "edit",
        className: "icon icon-edit",
        onClick: function () {
          return _this.handleUpdate(index ? "".concat(index, "_").concat(i) : "".concat(i));
        }
      })), React__default["default"].createElement(amisUi.TooltipWrapper, {
        tooltip: i18nRuntime.i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
        placement: "left"
      }, React__default["default"].createElement(amis.Icon, {
        icon: "delete-btn",
        className: "icon icon-delete",
        onClick: function () {
          return _this.handleDelete(index ? "".concat(index, "_").concat(i) : "".concat(i));
        }
      })))), nav.children && nav.children.length > 0 && React__default["default"].createElement("div", {
        className: "nav-links-children",
        "data-level": index ? "".concat(index, "_").concat(i) : "".concat(i)
      }, _this.renderNav(nav.children, index ? "".concat(index, "_").concat(i) : "".concat(i))));
    }));
  };
  NavSourceControl.prototype.renderDialog = function () {
    var _this = this;
    var _a = this.state,
      links = _a.links,
      modalBadge = _a.modalBadge,
      modalIcon = _a.modalIcon,
      modalName = _a.modalName,
      modalParent = _a.modalParent,
      modalUrl = _a.modalUrl,
      modalTarget = _a.modalTarget,
      isEdit = _a.isEdit;
    var treeData = cloneDeep__default["default"](links);
    this.handleFilterTreeData(treeData);
    return amisCore.render({
      type: 'dialog',
      title: isEdit ? i18nRuntime.i18n("cd1e63aed43df0827cc09fb26521936c") : i18nRuntime.i18n("648c5e847b923bdd51bf5c72436169ba"),
      bodyClassName: 'ae-NavControl-dialog',
      body: {
        type: 'form',
        mode: 'horizontal',
        wrapperComponent: 'div',
        actions: [],
        body: [{
          type: 'input-text',
          label: i18nRuntime.i18n("8ee9f276a6356aab65f8178c4f30fabd"),
          name: 'modalName',
          placeholder: i18nRuntime.i18n("4cd5629f32fc9710fbb0291b51adc34b"),
          mode: 'horizontal',
          required: true,
          horizontal: {
            justify: true,
            left: 2
          },
          onChange: function (value) {
            _this.setState({
              modalName: value
            });
          }
        }, {
          type: 'tree-select',
          label: i18nRuntime.i18n("e3cc5bd7fc92d7287a14bf5398c4ecc3"),
          name: 'modalParent',
          initiallyOpen: false,
          placeholder: i18nRuntime.i18n("24ceb2a06b1962b396b75286fc0960d1"),
          searchable: true,
          multiple: false,
          valueField: 'id',
          options: treeData,
          mode: 'horizontal',
          horizontal: {
            justify: true,
            left: 2
          },
          onChange: function (value) {
            _this.setState({
              modalParent: value
            });
          }
        }, amisEditor.getSchemaTpl('icon', {
          name: 'modalIcon',
          label: i18nRuntime.i18n("9483042d09dbad731addc1791b5d207d"),
          mode: 'horizontal',
          horizontal: {
            justify: true,
            left: 2
          },
          onChange: function (value) {
            _this.setState({
              modalIcon: value
            });
          }
        }), {
          type: 'input-text',
          label: i18nRuntime.i18n("7fa141f341e173e2339dcf0ce6869b5c"),
          placeholder: i18nRuntime.i18n("6107b3c4fd8587589210cb9fe2fcdad9"),
          mode: 'horizontal',
          name: 'modalUrl',
          horizontal: {
            justify: true,
            left: 2
          },
          onChange: function (value) {
            _this.setState({
              modalUrl: value
            });
          }
        }, {
          type: 'radios',
          name: 'modalTarget',
          label: i18nRuntime.i18n("76b5162d1b7a16b4b6adf1b79231c96a"),
          inline: true,
          options: [{
            label: i18nRuntime.i18n("b2d1bffc689e4478519d8a010450192c"),
            value: '_self'
          }, {
            label: i18nRuntime.i18n("80fb2db8d3f212b3dd130d24da1c970e"),
            value: '_blank'
          }],
          mode: 'horizontal',
          horizontal: {
            justify: true,
            left: 2
          },
          onChange: function (value) {
            _this.setState({
              modalTarget: value
            });
          }
        }, {
          type: 'input-text',
          label: i18nRuntime.i18n("70b4d0676f9a9640c5a7b1d5f66faa64"),
          placeholder: i18nRuntime.i18n("9f3cdf6aa12759fab68a5a88179462c4"),
          mode: 'horizontal',
          name: 'modalBadge',
          horizontal: {
            justify: true,
            left: 2
          },
          onChange: function (value) {
            _this.setState({
              modalBadge: value
            });
          }
        }]
      }
    }, {
      data: {
        modalBadge: modalBadge,
        modalIcon: modalIcon,
        modalName: modalName,
        modalParent: modalParent,
        modalUrl: modalUrl,
        modalTarget: modalTarget
      },
      onClose: this.closeModal,
      onConfirm: this.handleSubmit
    });
  };
  NavSourceControl.prototype.render = function () {
    var _a = this.state,
      links = _a.links,
      source = _a.source,
      showDialog = _a.showDialog;
    var className = this.props.className;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-NavControl', className)
    }, this.renderHeader(), source === 'custom' ? React__default["default"].createElement("div", {
      className: "ae-NavControl-wrapper"
    }, Array.isArray(links) && links.length ? React__default["default"].createElement("div", {
      className: "ae-NavControl-content",
      ref: this.dragRef
    }, this.renderNav(links)) : React__default["default"].createElement("div", {
      className: "ae-NavControl-placeholder"
    }, i18nRuntime.i18n("a4f1ddbbfc96930d24e4b54cb815b62b")), React__default["default"].createElement("div", {
      className: "ae-NavControl-footer"
    }, React__default["default"].createElement(amis.Button, {
      level: "enhance",
      onClick: this.openModal
    }, i18nRuntime.i18n("14794add5446201274dd148086bc0361")))) : this.renderApiPanel(), showDialog && this.renderDialog());
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleSourceChange", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "dragRef", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleDragging", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "getNodePath", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Boolean]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "destroyDragging", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleDelete", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [String]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleUpdate", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "getChildren", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", Promise)], NavSourceControl.prototype, "handleSubmit", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Array, String]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleSetNavId", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleDeleteNavId", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Array]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleFilterTreeData", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "openModal", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", []), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "closeModal", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleChange", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleAPIChange", null);
  return NavSourceControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(NavSourceControlRenderer, _super);
  function NavSourceControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  NavSourceControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-navSourceControl',
    renderLabel: false
  })], NavSourceControlRenderer);
  return NavSourceControlRenderer;
})(NavSourceControl);

exports.NavSourceControl = NavSourceControl;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
