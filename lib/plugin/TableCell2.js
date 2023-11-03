/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var get = require('lodash/get');
var flattenDeep = require('lodash/flattenDeep');
var amis = require('amis');
var amisCore = require('amis-core');
var amisEditorCore = require('amis-editor-core');
var BaseControl = require('../component/BaseControl.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
var flattenDeep__default = /*#__PURE__*/_interopDefaultLegacy(flattenDeep);

var TableCell2Plugin = /** @class */function (_super) {
  tslib.__extends(TableCell2Plugin, _super);
  function TableCell2Plugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.rendererName = 'cell-field';
    _this.panelTitle = i18nRuntime.i18n("dc7558211f2990370954c2e7ca498ee9");
    _this.panelIcon = 'fa fa-columns';
    _this.panelJustify = true;
    _this._dynamicControls = {
      /** 字段配置 */
      name: function () {
        return amisEditorCore.getSchemaTpl('formItemName', {
          name: 'name',
          label: i18nRuntime.i18n("4ca07911d10b74cc7c357b510e7cc948"),
          visibleOn: 'data.name !== undefined || data.key === undefined'
        });
      },
      /** 字段配置，兼容key */
      key: function () {
        return amisEditorCore.getSchemaTpl('formItemName', {
          name: 'key',
          label: i18nRuntime.i18n("4ca07911d10b74cc7c357b510e7cc948"),
          visibleOn: 'data.name === undefined && data.key'
        });
      },
      /** 排序配置 */
      sorter: function () {
        return amisEditorCore.getSchemaTpl('switch', {
          name: 'sorter',
          hidden: _this._isOpColumn,
          label: amisEditorCore.tipedLabel(i18nRuntime.i18n("b4521626a48dcb61001fc563d2433ed3"), i18nRuntime.i18n("ac83dbca40c9d2151b5f7d81795535cc"))
        });
      },
      /** 可搜索 */
      searchable: function () {
        return [amisEditorCore.getSchemaTpl('switch', {
          name: 'searchable',
          label: i18nRuntime.i18n("af9cbd3988196fc104af4fed9461e152"),
          hidden: _this._isOpColumn,
          pipeIn: function (value) {
            return !!value;
          }
        }), {
          name: 'searchable',
          visibleOn: 'data.searchable',
          asFormItem: true,
          label: false,
          children: function (_a) {
            var _b;
            var value = _a.value,
              onChange = _a.onChange,
              data = _a.data;
            if (value === true) {
              value = {};
            } else if (typeof value === 'undefined') {
              value = amisCore.getVariable(data, 'searchable');
            }
            var originMode = value.mode;
            value = tslib.__assign(tslib.__assign({}, value), {
              type: 'form',
              mode: 'normal',
              wrapWithPanel: false,
              body: ((_b = value === null || value === void 0 ? void 0 : value.body) === null || _b === void 0 ? void 0 : _b.length) ? value.body : [{
                type: 'input-text',
                name: data.key
              }]
            });
            delete value.mode;
            // todo 多个快速编辑表单模式看来只能代码模式编辑了。
            return React__default["default"].createElement(amis.Button, {
              className: "w-full flex flex-col items-center",
              onClick: function () {
                _this.manager.openSubEditor({
                  title: i18nRuntime.i18n("34dceb7c51000849ea3596fbaab6f67c"),
                  value: value,
                  onChange: function (value) {
                    return onChange(tslib.__assign(tslib.__assign({}, value), {
                      mode: originMode
                    }), 'searchable');
                  }
                });
              }
            }, React__default["default"].createElement("span", {
              className: "inline-flex items-center"
            }, React__default["default"].createElement(amis.Icon, {
              icon: "edit",
              className: "mr-1 w-3"
            }), i18nRuntime.i18n("34dceb7c51000849ea3596fbaab6f67c")));
          }
        }];
      },
      /** 快速查看 */
      popover: function () {
        return {
          name: 'popOver',
          label: i18nRuntime.i18n("a193a0f0b38ea06f46b1d3051c433cf5"),
          type: 'ae-switch-more',
          hidden: _this._isOpColumn,
          mode: 'normal',
          formType: 'extend',
          bulk: true,
          defaultData: {
            popOver: {
              mode: 'popOver'
            }
          },
          trueValue: {
            mode: 'popOver',
            body: [{
              type: 'tpl',
              tpl: i18nRuntime.i18n("3c87936b95f844aa21605c75d217c8f9")
            }]
          },
          isChecked: function (e) {
            var data = e.data,
              name = e.name;
            return get__default["default"](data, name);
          },
          form: {
            body: [{
              name: 'popOver.mode',
              type: 'button-group-select',
              label: i18nRuntime.i18n("f0789e79d48f135e5d870753f7a85d05"),
              value: 'popOver',
              options: [{
                label: i18nRuntime.i18n("02d9819ddaaaeb1b7b22b12608c7e5ca"),
                value: 'popOver'
              }, {
                label: i18nRuntime.i18n("6cff4b6d794cc17f5d24dbe0d21e5732"),
                value: 'dialog'
              }, {
                label: i18nRuntime.i18n("2a2924380dfcaea998bd8a49703545a9"),
                value: 'drawer'
              }]
            }, amisEditorCore.getSchemaTpl('formItemSize', {
              name: 'popOver.size',
              clearValueOnHidden: true,
              visibleOn: 'popOver.mode !== "popOver"'
            }), {
              type: 'select',
              name: 'popOver.position',
              label: i18nRuntime.i18n("59b9e2022323a63079c6ddab63fec112"),
              visibleOn: 'popOver.mode === "popOver"',
              options: ['center', 'left-top', 'right-top', 'left-bottom', 'right-bottom'],
              clearValueOnHidden: true
            }, {
              name: 'popOver.trigger',
              type: 'button-group-select',
              label: i18nRuntime.i18n("159dbc2fafd57b9d3652f16659b1b519"),
              options: [{
                label: i18nRuntime.i18n("4363c17ebb346b646af55bd8c8075915"),
                value: 'click'
              }, {
                label: i18nRuntime.i18n("f6d767f39ba3bf955077a3c0ce81e581"),
                value: 'hover'
              }],
              pipeIn: amisEditorCore.defaultValue('click')
            }, amisEditorCore.getSchemaTpl('switch', {
              name: 'popOver.showIcon',
              label: i18nRuntime.i18n("731f9b470e0948cbf56341a53c423213"),
              value: true
            }), {
              type: 'input-text',
              name: 'popOver.title',
              label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab")
            }, {
              name: 'popOver.body',
              asFormItem: true,
              label: false,
              children: function (_a) {
                var value = _a.value;
                  _a.onBulkChange;
                  var onChange = _a.onChange;
                  _a.name;
                  _a.data;
                value = {
                  body: value && value.body ? value.body : [{
                    type: 'tpl',
                    tpl: i18nRuntime.i18n("3c87936b95f844aa21605c75d217c8f9")
                  }]
                };
                return React__default["default"].createElement(amis.Button, {
                  className: "w-full flex flex-col items-center",
                  onClick: function () {
                    _this.manager.openSubEditor({
                      title: i18nRuntime.i18n("a0f14a16feaece37026df27feb9070a1"),
                      value: value,
                      onChange: function (value) {
                        onChange(value ? Array.isArray(value) ? value : (value === null || value === void 0 ? void 0 : value.body) ? value.body : [] : []);
                      }
                    });
                  }
                }, React__default["default"].createElement("span", {
                  className: "inline-flex items-center"
                }, React__default["default"].createElement(amis.Icon, {
                  icon: "edit",
                  className: "mr-1 w-3"
                }), i18nRuntime.i18n("a0f14a16feaece37026df27feb9070a1")));
              }
            }]
          }
        };
      },
      /** 快速编辑 */
      quickEdit: function () {
        return {
          name: 'quickEdit',
          label: amisEditorCore.tipedLabel(i18nRuntime.i18n("9a899d9ab83d8ffa6308fb31e93f23a1"), i18nRuntime.i18n("9306b956ca5950203ee49a2680cac63d")),
          type: 'ae-switch-more',
          hidden: _this._isOpColumn,
          mode: 'normal',
          formType: 'extend',
          bulk: true,
          defaultData: {
            quickEdit: {
              mode: 'popOver'
            }
          },
          trueValue: {
            mode: 'popOver'
          },
          isChecked: function (e) {
            var data = e.data,
              name = e.name;
            return get__default["default"](data, name);
          },
          form: {
            body: [{
              name: 'quickEdit.mode',
              type: 'button-group-select',
              label: i18nRuntime.i18n("f0789e79d48f135e5d870753f7a85d05"),
              value: 'popOver',
              options: [{
                label: i18nRuntime.i18n("78f395c15aaf8c92d9223f6ca69b41a4"),
                value: 'popOver'
              }, {
                label: i18nRuntime.i18n("c6e1b91d329a61b691d0d5d2eb343ddd"),
                value: 'inline'
              }]
            }, amisEditorCore.getSchemaTpl('switch', {
              name: 'quickEdit.saveImmediately',
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("4562be5a3f9823a5f61b25f8d14b2b43"), i18nRuntime.i18n("c115f372bcdced1e70824bcbf42b5923")),
              pipeIn: function (value) {
                return !!value;
              }
            }), amisEditorCore.getSchemaTpl('api', {
              label: i18nRuntime.i18n("eccba4475f3144e417e55fd96e831e09"),
              description: i18nRuntime.i18n("c8e5c062d5ad38e54413abd9c7cfb2f4"),
              name: 'quickEdit.saveImmediately.api',
              visibleOn: 'this.quickEdit && this.quickEdit.saveImmediately'
            }), {
              name: 'quickEdit',
              asFormItem: true,
              label: false,
              children: function (_a) {
                var _b;
                var value = _a.value,
                  onBulkChange = _a.onBulkChange,
                  name = _a.name,
                  data = _a.data;
                if (value === true) {
                  value = {};
                } else if (typeof value === 'undefined') {
                  value = amisCore.getVariable(data, 'quickEdit');
                }
                var originMode = (value === null || value === void 0 ? void 0 : value.mode) || 'popOver';
                value = tslib.__assign(tslib.__assign({}, value), {
                  type: 'form',
                  mode: 'normal',
                  wrapWithPanel: false,
                  body: ((_b = value === null || value === void 0 ? void 0 : value.body) === null || _b === void 0 ? void 0 : _b.length) ? value.body : [{
                    type: 'input-text',
                    name: data.key
                  }]
                });
                if (value.mode) {
                  delete value.mode;
                }
                // todo 多个快速编辑表单模式看来只能代码模式编辑了。
                return React__default["default"].createElement(amis.Button, {
                  className: "w-full flex flex-col items-center",
                  onClick: function () {
                    _this.manager.openSubEditor({
                      title: i18nRuntime.i18n("c3ed36e4abb96c18a6c83350994cdea7"),
                      value: value,
                      onChange: function (value) {
                        var _a;
                        return onBulkChange((_a = {}, _a[name] = tslib.__assign(tslib.__assign({}, value), {
                          mode: originMode
                        }), _a));
                      }
                    });
                  }
                }, React__default["default"].createElement("span", {
                  className: "inline-flex items-center"
                }, React__default["default"].createElement(amis.Icon, {
                  icon: "edit",
                  className: "mr-1 w-3"
                }), i18nRuntime.i18n("fba91204d335ae6eda35809023a94f7f")));
              }
            }]
          }
        };
      }
    };
    _this.panelBodyCreator = function (context) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      var manager = _this.manager;
      var dc = _this.dynamicControls;
      _this._isOpColumn = ((_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.type) === 'operation';
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
          hidden: _this._isOpColumn,
          body: flattenDeep__default["default"]([/** 字段配置 */
          (_b = dc === null || dc === void 0 ? void 0 : dc.name) === null || _b === void 0 ? void 0 : _b.call(dc, context), /** 字段配置，兼容key */
          (_c = dc === null || dc === void 0 ? void 0 : dc.key) === null || _c === void 0 ? void 0 : _c.call(dc, context), {
            name: 'title',
            label: i18nRuntime.i18n("eb2719a7e6cebda7ca234560f21fb448"),
            type: 'input-text'
          }, BaseControl.remarkTpl({
            name: 'remark',
            label: i18nRuntime.i18n("3ba265c6b63bde0319822afd6b9a649d"),
            labelRemark: i18nRuntime.i18n("7ad83bbe4646a0011ece7fd338d1e189")
          }), {
            name: 'placeholder',
            type: 'input-text',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("940b12c19fcf7aced0cdd164edc9acbc"), i18nRuntime.i18n("f35c90b504521a2da346960b9db23828")),
            value: '-'
          }]).filter(Boolean)
        }, (_d = dc === null || dc === void 0 ? void 0 : dc.relationBuildSetting) === null || _d === void 0 ? void 0 : _d.call(dc, context), /** 操作列按钮配置 */
        {
          title: i18nRuntime.i18n("f4a3780b66d65a315a762976ab5e781f"),
          hidden: !_this._isOpColumn,
          body: [{
            type: 'ae-feature-control',
            label: false,
            manager: manager,
            addable: true,
            sortable: true,
            removeable: true,
            features: function () {
              var _a, _b;
              var node = manager.store.getNodeById(context.id);
              return ((_b = (_a = node === null || node === void 0 ? void 0 : node.schema) === null || _a === void 0 ? void 0 : _a.buttons) !== null && _b !== void 0 ? _b : []).map(function (item, index) {
                return {
                  label: item.label,
                  value: item.$$id || '',
                  remove: function (schema) {
                    var _a;
                    if ((_a = schema === null || schema === void 0 ? void 0 : schema.buttons) === null || _a === void 0 ? void 0 : _a.length) {
                      schema.buttons.splice(index, 1);
                    }
                  }
                };
              });
            },
            goFeatureComp: function (feat) {
              return feat.value;
            },
            onSort: function (schema, e) {
              var _a;
              if (((_a = schema === null || schema === void 0 ? void 0 : schema.buttons) === null || _a === void 0 ? void 0 : _a.length) > 1) {
                schema.buttons[e.oldIndex] = schema.buttons.splice(e.newIndex, 1, schema.buttons[e.oldIndex])[0];
              }
            },
            customAction: function (props) {
              var onBulkChange = props.onBulkChange,
                schema = props.schema;
              return {
                type: 'button',
                label: i18nRuntime.i18n("f9f2b9cc91cd332db6b2b732c3869233"),
                level: 'enhance',
                className: 'ae-FeatureControl-action',
                onClick: function () {
                  schema.buttons.push({
                    label: i18nRuntime.i18n("f9f2b9cc91cd332db6b2b732c3869233"),
                    level: 'link'
                  }), onBulkChange(schema);
                }
              };
            }
          }]
        }, {
          title: i18nRuntime.i18n("949a8b7bd2c10070a2fae16f9c66afbb"),
          body: flattenDeep__default["default"]([{
            type: 'ae-columnWidthControl',
            name: 'width',
            label: false,
            formLabel: i18nRuntime.i18n("bdd9d38d7e2929024089363dc8f48b7a")
          }, {
            type: 'select',
            name: 'align',
            label: i18nRuntime.i18n("d5bc35360607472de4525358af126de4"),
            hidden: _this._isOpColumn,
            options: [{
              label: i18nRuntime.i18n("413f48cc71f71083ce532a86e3efdc21"),
              value: 'left'
            }, {
              label: i18nRuntime.i18n("56c17ba6a56c01706ae00a31611deb03"),
              value: 'center'
            }, {
              label: i18nRuntime.i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"),
              value: 'right'
            }]
          }, {
            type: 'select',
            name: 'fixed',
            label: i18nRuntime.i18n("a0dbb2b0a000cdb3a265d096d4e5ed8d"),
            hidden: _this._isOpColumn,
            options: [{
              label: i18nRuntime.i18n("9ed8a4c5d1b3726121175dc986268b0c"),
              value: false
            }, {
              label: i18nRuntime.i18n("00ed921de3ababcafcb0594ff0e9a997"),
              value: 'left'
            }, {
              label: i18nRuntime.i18n("a5b48f7807e3c1ddd80fa160f46f9cc9"),
              value: 'right'
            }]
          }, {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'copyable',
            label: i18nRuntime.i18n("f9a9fcc3bf6a3c8ff1e99fa48ed6d03d"),
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [{
                name: 'copyable.content',
                visibleOn: 'data.copyable',
                type: 'ae-formulaControl',
                label: i18nRuntime.i18n("6a086902a84969a835423002718e86b4")
              }]
            }
          }, /** 排序设置 */
          (_e = dc === null || dc === void 0 ? void 0 : dc.sorter) === null || _e === void 0 ? void 0 : _e.call(dc, context), /** 可搜索 */
          (_f = dc === null || dc === void 0 ? void 0 : dc.searchable) === null || _f === void 0 ? void 0 : _f.call(dc, context), /** 快速查看 */
          (_g = dc === null || dc === void 0 ? void 0 : dc.popover) === null || _g === void 0 ? void 0 : _g.call(dc, context), /** 快速编辑 */
          (_h = dc === null || dc === void 0 ? void 0 : dc.quickEdit) === null || _h === void 0 ? void 0 : _h.call(dc, context)]).filter(Boolean)
        }].filter(Boolean))
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('className'), amisEditorCore.getSchemaTpl('className', {
          name: 'innerClassName',
          label: i18nRuntime.i18n("4619988f1c5d9093dc00d1430633b2bd")
        })]
      }]);
    };
    return _this;
  }
  /** NodeStore在构建时需要将一些信息添加进去 */
  TableCell2Plugin.prototype.getRendererInfo = function (context) {
    var renderer = context.renderer,
      schema = context.schema;
    if (this.rendererName === (renderer === null || renderer === void 0 ? void 0 : renderer.name)) {
      return {
        name: schema.title ? "<".concat(schema.title, ">\u5217") : i18nRuntime.i18n("044892c0c637f2d9e78e78956b1ded01"),
        $schema: '/schemas/TableSchema.json',
        multifactor: true,
        wrapperResolve: function (dom) {
          var _a, _b;
          // 固定这种结构 amis里改了 这里也得改
          var parent = (_a = dom.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
          var groupId = parent === null || parent === void 0 ? void 0 : parent.getAttribute('data-group-id');
          var wrapper = (_b = dom.closest('table').parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
          return [].slice.call(wrapper === null || wrapper === void 0 ? void 0 : wrapper.querySelectorAll("th[data-group-id=\"".concat(groupId, "\"],\n              td[data-group-id=\"").concat(groupId, "\"]")));
        }
        // filterProps: (props: any) => {
        //   props = JSONPipeOut(props, true);
        //   return props;
        // }
      };
    }

    return _super.prototype.getRendererInfo.call(this, context);
  };
  /** 更新渲染器前的事件，或者右键粘贴配置 */
  TableCell2Plugin.prototype.beforeReplace = function (event) {
    var context = event.context;
    // 替换字段的时候保留 label 和 name 值。
    if (context.info.plugin === this && context.data) {
      context.data.title = context.data.title || context.schema.title;
      context.data.key = context.data.key || context.schema.key;
    }
  };
  TableCell2Plugin.prototype.afterBuildPanelBody = function (event) {
    var _a, _b;
    var _c = event.context,
      context = _c.context;
      _c.data;
    if (!((_b = (_a = context.node.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.type) || context.node.parent.parent.type !== 'table2') {
      return;
    }
    // @ts-ignore
    [
    // context.node.info.plugin.withDataSource === false
    //   ? false
    //   : {
    //       sameName: context.info.renderer.isFormItem ? 'name' : undefined,
    //       name: 'name',
    //       type: 'ae-DataBindingControl',
    //       label: '列字段',
    //       onBindingChange(
    //         field: DSField,
    //         onBulkChange: (value: any) => void
    //       ) {
    //         const schema = field?.resolveColumnSchema?.('List') || {
    //           title: field.label
    //         };
    //         onBulkChange(schema);
    //       }
    //     },
    {
      sameName: context.info.renderer.isFormItem ? 'name' : undefined,
      name: 'name',
      type: 'ae-DataBindingControl',
      label: i18nRuntime.i18n("4ca07911d10b74cc7c357b510e7cc948"),
      onBindingChange: function (field, onBulkChange) {
        var _a;
        var schema = ((_a = field === null || field === void 0 ? void 0 : field.resolveColumnSchema) === null || _a === void 0 ? void 0 : _a.call(field, 'List')) || {
          title: field.label
        };
        onBulkChange(schema);
      }
    }, {
      sameName: context.info.renderer.isFormItem ? 'label' : undefined,
      name: 'title',
      label: i18nRuntime.i18n("eb2719a7e6cebda7ca234560f21fb448"),
      type: 'input-text'
    }, BaseControl.remarkTpl({
      name: 'remark',
      label: i18nRuntime.i18n("3ba265c6b63bde0319822afd6b9a649d"),
      labelRemark: i18nRuntime.i18n("7ad83bbe4646a0011ece7fd338d1e189")
    }), {
      name: 'placeholder',
      type: 'input-text',
      label: amisEditorCore.tipedLabel(i18nRuntime.i18n("940b12c19fcf7aced0cdd164edc9acbc"), i18nRuntime.i18n("f35c90b504521a2da346960b9db23828")),
      value: '-'
    }].filter(Boolean);
    [amisEditorCore.getSchemaTpl('switch', {
      name: 'sorter',
      label: amisEditorCore.tipedLabel(i18nRuntime.i18n("b4521626a48dcb61001fc563d2433ed3"), i18nRuntime.i18n("ac83dbca40c9d2151b5f7d81795535cc"))
    }), amisEditorCore.getSchemaTpl('switch', {
      name: 'searchable',
      label: i18nRuntime.i18n("af9cbd3988196fc104af4fed9461e152"),
      pipeIn: function (value) {
        return !!value;
      }
    }), {
      visibleOn: 'data.searchable',
      name: 'searchable',
      asFormItem: true,
      label: false,
      children: function (_a) {
        var value = _a.value;
          _a.onChange;
          var data = _a.data;
        if (value === true) {
          value = {};
        } else if (typeof value === 'undefined') {
          value = amisCore.getVariable(data, 'searchable');
        }
      }
    }];
  };
  Object.defineProperty(TableCell2Plugin.prototype, "dynamicControls", {
    /** 需要动态控制的控件 */
    get: function () {
      return this._dynamicControls;
    },
    set: function (controls) {
      if (!controls || !amisCore.isObject(controls)) {
        throw new Error(i18nRuntime.i18n("44c9d7cb031327029dd0b1bc92689542"));
      }
      this._dynamicControls = tslib.__assign(tslib.__assign({}, this._dynamicControls), controls);
    },
    enumerable: false,
    configurable: true
  });
  TableCell2Plugin.id = 'TableCell2Plugin';
  return TableCell2Plugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TableCell2Plugin);

exports.TableCell2Plugin = TableCell2Plugin;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
