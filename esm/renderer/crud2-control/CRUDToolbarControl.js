/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __decorate, __metadata, __assign } from 'tslib';
import React__default from 'react';
import { findDOMNode } from 'react-dom';
import cloneDeep from 'lodash/cloneDeep';
import { toast, Button, Icon, Spinner, autobind, FormItem } from 'amis';
import { TooltipWrapper } from 'amis-ui';
import { findTreeAll } from 'amis-core';
import { JSONPipeIn } from 'amis-editor-core';
import { DSFeatureEnum, DSFeature } from '../../builder/constants.js';
import 'lodash/isObjectLike';
import '../../builder/DSBuilder.js';
import '../../builder/DSBuilderManager.js';
import '../../builder/ApiDSBuilder.js';
import { deepRemove } from '../../plugin/CRUD2/utils.js';
import { i18n } from 'i18n-runtime';

/**
 * @file CRUDToolbarControl
 * @desc 顶部工具栏控件
 */
var CRUDToolbarControl = /** @class */function (_super) {
  __extends(CRUDToolbarControl, _super);
  function CRUDToolbarControl(props) {
    var _this = _super.call(this, props) || this;
    /** 可供使用的功能集合 */
    _this.collection = [DSFeatureEnum.Insert, DSFeatureEnum.BulkEdit, DSFeatureEnum.BulkDelete];
    _this.state = {
      options: [],
      loading: false
    };
    return _this;
  }
  CRUDToolbarControl.prototype.componentDidMount = function () {
    this.dom = findDOMNode(this);
    var actions = this.getActions(this.props);
    this.initOptions(actions);
  };
  CRUDToolbarControl.prototype.componentDidUpdate = function (prevProps) {
    if (prevProps.data.headerToolbar !== this.props.data.headerToolbar) {
      var actions = this.getActions(this.props);
      this.initOptions(actions);
    }
  };
  CRUDToolbarControl.prototype.getActions = function (props) {
    var manager = props.manager,
      nodeId = props.nodeId;
    var store = manager.store;
    var node = store.getNodeById(nodeId);
    var actions = findTreeAll(node.children, function (item) {
      return [DSFeatureEnum.Insert, DSFeatureEnum.BulkEdit, DSFeatureEnum.BulkDelete, 'custom'].includes(item.schema.behavior);
    });
    return actions;
  };
  CRUDToolbarControl.prototype.initOptions = function (actions) {
    var _this = this;
    if (!actions || !actions.length) {
      this.setState({
        options: []
      });
      return;
    }
    var options = actions.map(function (node) {
      var schema = node.schema;
      var behavior = schema.behavior;
      return {
        label: _this.getOptionLabel(schema, behavior),
        value: behavior,
        nodeId: schema.$$id,
        node: node,
        pristine: node.schema
      };
    });
    this.setState({
      options: options
    });
  };
  CRUDToolbarControl.prototype.getOptionLabel = function (schema, behavior) {
    return behavior === 'custom' ? schema.label : DSFeature[behavior].label;
  };
  CRUDToolbarControl.prototype.handleEdit = function (item) {
    var manager = this.props.manager;
    if (!item.nodeId) {
      toast.warning("\u672A\u627E\u5230\u5DE5\u5177\u680F\u4E2D\u5BF9\u5E94\u64CD\u4F5C\u300C".concat(item.label, "\u300D"));
      return;
    }
    manager.setActiveId(item.nodeId);
  };
  /** 添加列 */
  CRUDToolbarControl.prototype.handleAddAction = function (type) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
      var _d, onBulkChange, ctx, nodeId, manager, builder, options, node, CRUDSchemaID, scaffold, _e, headerToolbarSchema, actionSchema;
      return __generator(this, function (_f) {
        switch (_f.label) {
          case 0:
            this.setState({
              loading: true
            });
            _d = this.props, onBulkChange = _d.onBulkChange, ctx = _d.data, nodeId = _d.nodeId, manager = _d.manager, builder = _d.builder;
            options = this.state.options.concat();
            node = manager.store.getNodeById(nodeId);
            CRUDSchemaID = (_a = node === null || node === void 0 ? void 0 : node.schema) === null || _a === void 0 ? void 0 : _a.id;
            _e = type;
            switch (_e) {
              case 'Insert':
                return [3 /*break*/, 1];
              case 'BulkEdit':
                return [3 /*break*/, 3];
              case 'BulkDelete':
                return [3 /*break*/, 5];
            }
            return [3 /*break*/, 7];
          case 1:
            return [4 /*yield*/, builder.buildInsertSchema({
              feat: DSFeatureEnum.Insert,
              renderer: 'crud',
              inScaffold: false,
              schema: ctx,
              scaffoldConfig: {
                insertFields: ((_b = ctx === null || ctx === void 0 ? void 0 : ctx.columns) !== null && _b !== void 0 ? _b : []).filter(function (item) {
                  return item.type !== 'operation';
                }).map(function (item) {
                  var _a;
                  return {
                    inputType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text',
                    name: item.name,
                    label: item.title
                  };
                }),
                insertApi: ''
              }
            }, CRUDSchemaID)];
          case 2:
            scaffold = _f.sent();
            return [3 /*break*/, 8];
          case 3:
            return [4 /*yield*/, builder.buildBulkEditSchema({
              feat: DSFeatureEnum.BulkEdit,
              renderer: 'crud',
              inScaffold: false,
              schema: ctx,
              scaffoldConfig: {
                bulkEditFields: ((_c = ctx === null || ctx === void 0 ? void 0 : ctx.columns) !== null && _c !== void 0 ? _c : []).filter(function (item) {
                  return item.type !== 'operation';
                }).map(function (item) {
                  var _a;
                  return {
                    inputType: (_a = item.type) !== null && _a !== void 0 ? _a : 'input-text',
                    name: item.name,
                    label: item.title
                  };
                }),
                bulkEdit: ''
              }
            }, CRUDSchemaID)];
          case 4:
            scaffold = _f.sent();
            return [3 /*break*/, 8];
          case 5:
            return [4 /*yield*/, builder.buildCRUDBulkDeleteSchema({
              feat: DSFeatureEnum.BulkDelete,
              renderer: 'crud',
              inScaffold: false,
              schema: ctx,
              scaffoldConfig: {
                bulkDeleteApi: ''
              }
            }, CRUDSchemaID)];
          case 6:
            scaffold = _f.sent();
            return [3 /*break*/, 8];
          case 7:
            scaffold = {
              type: 'button',
              label: i18n("fa966345577ba81af19408f203db968f"),
              behavior: 'custom',
              className: 'm-r-xs',
              onEvent: {
                click: {
                  actions: []
                }
              }
            };
            _f.label = 8;
          case 8:
            if (!scaffold) {
              this.setState({
                loading: false
              });
              return [2 /*return*/];
            }

            headerToolbarSchema = cloneDeep(ctx.headerToolbar);
            actionSchema = JSONPipeIn(__assign({}, scaffold));
            options.push({
              label: this.getOptionLabel(actionSchema, type),
              value: type,
              nodeId: actionSchema.$$id,
              pristine: actionSchema
            });
            this.setState({
              options: options,
              loading: false
            }, function () {
              var _a, _b, _c;
              var target = (_c = (_b = (_a = headerToolbarSchema === null || headerToolbarSchema === void 0 ? void 0 : headerToolbarSchema[0]) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.body;
              if (target && Array.isArray(target)) {
                target.push(actionSchema);
              } else {
                headerToolbarSchema.unshift(actionSchema);
              }
              onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
                headerToolbar: headerToolbarSchema
              });
            });
            return [2 /*return*/];
        }
      });
    });
  };

  CRUDToolbarControl.prototype.handleDelete = function (option, index) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, env, ctx, onBulkChange, options, confirmed, headerToolbarSchema, marked;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this.props, env = _a.env, ctx = _a.data, onBulkChange = _a.onBulkChange;
            options = this.state.options.concat();
            return [4 /*yield*/, env.confirm("\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u680F\u4E2D\u300C".concat(option.label, "\u300D\u5417\uFF1F"))];
          case 1:
            confirmed = _b.sent();
            headerToolbarSchema = cloneDeep(ctx.headerToolbar);
            if (confirmed) {
              marked = deepRemove(headerToolbarSchema, function (item) {
                return item.behavior === option.value;
              });
              if (marked) {
                options.splice(index, 1);
                this.setState({
                  options: options
                }, function () {
                  onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange({
                    headerToolbar: headerToolbarSchema
                  });
                });
              }
            }
            return [2 /*return*/];
        }
      });
    });
  };

  CRUDToolbarControl.prototype.renderOption = function (item, index) {
    var _this = this;
    var _a;
    var _b = this.props,
      cx = _b.classnames,
      popOverContainer = _b.popOverContainer,
      env = _b.env;
    return React__default.createElement("li", {
      key: index,
      className: cx('ae-CRUDConfigControl-list-item')
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
    }, React__default.createElement(Button, {
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
  CRUDToolbarControl.prototype.renderHeader = function () {
    var _this = this;
    var _a, _b;
    var _c = this.props,
      cx = _c.classnames,
      render = _c.render,
      env = _c.env;
    var options = this.state.options;
    var actions = this.collection.concat();
    // options.forEach(item => {
    //   if (actions.includes(item.value)) {
    //     const idx = actions.indexOf(item.value);
    //     if (~idx) {
    //       actions.splice(idx, 1);
    //     }
    //   }
    // });
    var optionValues = options.map(function (item) {
      return item.value;
    });
    return React__default.createElement("header", {
      className: cx('ae-CRUDConfigControl-header')
    }, React__default.createElement("span", {
      className: cx('Form-label')
    }, i18n("012f602372cd2dbd639cd966c63e1f90")), render('crud-toolbar-control-dropdown', {
      type: 'dropdown-button',
      closeOnClick: true,
      hideCaret: true,
      level: 'link',
      align: 'right',
      trigger: ['click'],
      popOverContainer: (_b = (_a = env.getModalContainer) !== null && _a !== void 0 ? _a : this.dom) !== null && _b !== void 0 ? _b : document.body,
      icon: 'column-add',
      label: i18n("84a2f40385427bbf2edc79e3368e4e0f"),
      className: cx('ae-CRUDConfigControl-dropdown'),
      disabledTip: {
        content: i18n("dc858fed3c66a1194d5f9aec81faee3d"),
        tooltipTheme: 'dark'
      },
      buttons: actions.map(function (item) {
        return {
          type: 'button',
          label: DSFeature[item].label,
          disabled: !!~optionValues.findIndex(function (op) {
            return op === item;
          }),
          onClick: function () {
            return _this.handleAddAction(item);
          }
        };
      }).concat({
        type: 'button',
        label: i18n("fb3304d27d85c79d89ce6cac22a174b8"),
        disabled: false,
        onClick: function () {
          return _this.handleAddAction('custom');
        }
      })
    }));
  };
  CRUDToolbarControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      cx = _a.classnames;
      _a.data;
    var _b = this.state,
      options = _b.options,
      loading = _b.loading;
    return React__default.createElement("div", {
      className: cx('ae-CRUDConfigControl')
    }, loading ? React__default.createElement(Spinner, {
      show: true,
      tip: i18n("e40c411876b4a57e24fbc6b4b4fd5027"),
      tipPlacement: "bottom",
      size: "sm",
      className: cx('flex')
    }) : React__default.createElement(React__default.Fragment, null, this.renderHeader(), React__default.createElement("ul", {
      className: cx('ae-CRUDConfigControl-list')
    }, Array.isArray(options) && options.length > 0 ? options.map(function (item, index) {
      return _this.renderOption(item, index);
    }) : React__default.createElement("p", {
      className: cx("ae-CRUDConfigControl-placeholder")
    }, i18n("21efd88b67a39834582ad99aabb9dc60")))));
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], CRUDToolbarControl.prototype, "handleEdit", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", Promise)], CRUDToolbarControl.prototype, "handleAddAction", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Number]), __metadata("design:returntype", Promise)], CRUDToolbarControl.prototype, "handleDelete", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Number]), __metadata("design:returntype", void 0)], CRUDToolbarControl.prototype, "renderOption", null);
  return CRUDToolbarControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(CRUDToolbarControlRenderer, _super);
  function CRUDToolbarControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  CRUDToolbarControlRenderer = __decorate([FormItem({
    type: 'ae-crud-toolbar-control',
    renderLabel: false,
    wrap: false
  })], CRUDToolbarControlRenderer);
  return CRUDToolbarControlRenderer;
})(CRUDToolbarControl);

export { CRUDToolbarControl };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
