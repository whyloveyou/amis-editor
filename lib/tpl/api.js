/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var React = require('react');
var amis = require('amis');
var get = require('lodash/get');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var get__default = /*#__PURE__*/_interopDefaultLegacy(get);

amisEditorCore.setSchemaTpl('api', function (patch) {
  if (patch === void 0) {
    patch = {};
  }
  var name = patch.name,
    label = patch.label,
    value = patch.value,
    description = patch.description,
    sampleBuilder = patch.sampleBuilder;
    patch.apiDesc;
    var rest = tslib.__rest(patch, ["name", "label", "value", "description", "sampleBuilder", "apiDesc"]);
  return tslib.__assign({
    type: 'container',
    body: [{
      type: 'checkbox',
      label: label || 'API',
      labelRemark: sampleBuilder ? {
        label: false,
        title: i18nRuntime.i18n("226c06861b0605a3276311b1369204f2"),
        icon: 'fas fa-code',
        className: 'm-l-xs ae-ApiSample-icon',
        tooltipClassName: 'ae-ApiSample-tooltip',
        children: function (data) {
          return React__default["default"].createElement(amis.Html, {
            className: "ae-ApiSample",
            inline: false,
            html: "\n                  <pre><code>".concat(sampleBuilder(data), "</code></pre>\n                  ")
          });
        },
        trigger: 'click',
        rootClose: true,
        placement: 'left'
      } : undefined,
      option: i18nRuntime.i18n("1f318234cab713b51b5172d91770bc11"),
      name: name || 'api',
      mode: 'inline',
      className: 'w-full m-b-sm',
      inputClassName: 'pull-right text-sm m-t-sm p-t-none',
      onChange: function () {},
      pipeIn: function (value) {
        return value && typeof value !== 'string';
      },
      pipeOut: function (value, originValue) {
        var api = amis.buildApi(originValue);
        return value ? {
          method: api.method,
          url: api.url
        } : api.url ? "".concat(api.method ? "".concat(api.method, ":") : '').concat(api.url) : '';
      }
    }, {
      name: name || 'api',
      type: 'input-text',
      value: value,
      placeholder: 'http://',
      description: description,
      visibleOn: "!this.".concat(name || 'api', " || typeof this.").concat(name || 'api', " === 'string'"),
      className: 'm-b-none',
      labelRemark: {}
      // disabledOn: `data.${name || 'api'} && data.${name || 'api'}.data && Object.keys(data.${name || 'api'}.data).length || data.${name || 'api'} && data.${name || 'api'}.sendOn`,
    }, {
      type: 'combo',
      name: name || 'api',
      description: description,
      syncDefaultValue: false,
      multiLine: true,
      visibleOn: "this.".concat(name || 'api', " && typeof this.").concat(name || 'api', " !== 'string'"),
      className: 'm-b-none',
      messages: {
        validateFailed: i18nRuntime.i18n("a0472043a9598b1b19f1adcec1e1d75d")
      },
      pipeIn: function (value) {
        if (typeof value === 'string') {
          var url = value;
          var method = 'get';
          var m = /^(raw:|external:)?(get|post|put|patch|delete):(.*)$/.exec(url);
          if (m) {
            url = m[1] + m[3];
            method = m[2];
          }
          return {
            method: method,
            url: url
          };
        }
        return value;
      },
      items: [{
        label: i18nRuntime.i18n("6aa351f5dacd13d3d862d9c93e4a0241"),
        name: 'method',
        value: 'get',
        type: 'select',
        mode: 'horizontal',
        horizontal: {
          leftFixed: 'sm'
        },
        options: [{
          value: 'get',
          label: 'GET'
        }, {
          value: 'post',
          label: 'POST'
        }, {
          value: 'put',
          label: 'PUT'
        }, {
          value: 'patch',
          label: 'PATCH'
        }, {
          value: 'delete',
          label: 'DELETE'
        }]
      }, {
        label: i18nRuntime.i18n("85624c8e8b0fc98954eecbe508e8b59d"),
        type: 'input-text',
        name: 'url',
        placeholder: 'http://',
        required: true
      }, {
        type: 'switch',
        label: i18nRuntime.i18n("dd10fdec63a2224aa3d28b48d428cb98"),
        name: 'data',
        className: 'w-full m-b-xs',
        pipeIn: function (value) {
          return !!value;
        },
        pipeOut: function (value) {
          return value ? {
            '&': '$$'
          } : null;
        }
      }, {
        type: 'tpl',
        visibleOn: '!this.data',
        inline: false,
        className: 'text-sm text-muted m-b',
        tpl: i18nRuntime.i18n("0fcbf036057c6dd88b7b809daa0c5eb7")
      }, {
        type: 'ae-DataMappingControl',
        syncDefaultValue: false,
        name: 'data',
        mode: 'normal',
        renderLabel: false,
        visibleOn: 'this.data',
        valueType: 'ae-DataPickerControl',
        descriptionClassName: 'help-block text-xs m-b-none',
        description: i18nRuntime.i18n("5414824fb8efdb7d59beae4bf95fdefd")
      },
      // {
      //   type: 'input-kv',
      //   syncDefaultValue: false,
      //   name: 'data',
      //   visibleOn: 'this.data',
      //   descriptionClassName: 'help-block text-xs m-b-none',
      //   description:
      //     '<p>当没开启数据映射时，发送数据自动切成白名单模式，配置啥发送啥，请绑定数据。如：<code>{"a": "\\${a}", "b": 2}</code></p><p>如果希望在默认的基础上定制，请先添加一个 Key 为 `&` Value 为 `\\$$` 作为第一行。</p><div>当值为 <code>__undefined</code>时，表示删除对应的字段，可以结合<code>{"&": "\\$$"}</code>来达到黑名单效果。</div>'
      // },
      {
        label: i18nRuntime.i18n("8dc91bca9bc83efea73150e3478657fc"),
        type: 'input-text',
        name: 'sendOn',
        placeholder: i18nRuntime.i18n("bf9e242338d2c26b182aa6b9c015d84c"),
        description: i18nRuntime.i18n("91ee84292a5bf5e59d3b6309f948f2f1")
      }, {
        type: 'switch',
        label: i18nRuntime.i18n("6e6d4269d0dc3324d551062350a2ae9f"),
        name: 'silent',
        mode: 'inline',
        description: i18nRuntime.i18n("ddca9c0f0e3d07c3341701b80f139cc0")
      }, {
        type: 'switch',
        label: i18nRuntime.i18n("773a0e8384fd6f784088b829d7cc2f68"),
        name: 'cache',
        className: 'w-full m-b-xs',
        description: i18nRuntime.i18n("2816c3584802b2fc75db5bc3c6aa81e8"),
        pipeIn: function (value) {
          return !!value;
        },
        pipeOut: function (value) {
          return value ? 3000 : undefined;
        }
      }, {
        type: 'input-number',
        name: 'cache',
        mode: 'inline',
        min: 0,
        step: 500,
        visibleOn: 'this.cache',
        pipeIn: function (value) {
          return typeof value === 'number' ? value : 0;
        }
      }, {
        type: 'switch',
        label: i18nRuntime.i18n("a18ea11244325dd3d20c5988bc7f6e39"),
        name: 'responseType',
        pipeIn: function (value) {
          return value === 'blob';
        },
        pipeOut: function (value) {
          return value ? 'blob' : undefined;
        },
        description: i18nRuntime.i18n("6e889f0cc8c1d8f705edfd5d0bbdaaa0")
      }, {
        label: i18nRuntime.i18n("7c6722203327e8173be987f36fadf610"),
        type: 'button-group-select',
        name: 'dataType',
        description: "".concat(i18nRuntime.i18n("55409342e28d37db86fb23efbd84a025"), "\uFF1A<%= data.dataType === \"json\" ? \"application/json\" : (data.dataType === \"form-data\" ? \"multipart/form-data\" : (data.dataType === \"form\" ? \"application/x-www-form-urlencoded\" : \"\")) %>\uFF0C").concat(i18nRuntime.i18n("e06a14abe7ef66a8ead143db4ae9786e")),
        size: 'sm',
        className: 'block',
        mode: 'inline',
        options: [{
          label: 'JSON',
          value: 'json'
        }, {
          label: 'FormData',
          value: 'form-data'
        }, {
          label: 'Form',
          value: 'form'
        }]
      }, {
        type: 'switch',
        label: i18nRuntime.i18n("91831507074270c0da8a31ad9ff87495"),
        name: 'replaceData',
        description: i18nRuntime.i18n("508a38f518821a0f6bb2d15269b31ece")
      }, {
        type: 'switch',
        label: i18nRuntime.i18n("7dd590a9d9e783e980d318bd52891905"),
        name: 'responseData',
        className: 'w-full m-b-xs',
        pipeIn: function (value) {
          return !!value;
        },
        pipeOut: function (value) {
          return value ? {
            '&': '$$'
          } : null;
        }
      }, {
        type: 'tpl',
        visibleOn: '!this.responseData',
        inline: false,
        className: 'text-sm text-muted m-b',
        tpl: i18nRuntime.i18n("7e295b6ff39ec7356e06c4534bfc4fb3")
      }, {
        type: 'input-kv',
        syncDefaultValue: false,
        name: 'responseData',
        visibleOn: 'this.responseData',
        descriptionClassName: 'help-block text-xs m-b-none'
      }, {
        title: i18nRuntime.i18n("5c131eb3bc61f6b0a26e20449ad7ce56"),
        type: 'fieldSet',
        className: 'm-b-none',
        size: 'sm',
        collapsable: false,
        collapsedOn: '!this.requestAdaptor && !this.adaptor',
        body: [{
          name: 'requestAdaptor',
          type: 'js-editor',
          allowFullscreen: true,
          label: i18nRuntime.i18n("417125a06b1d2bfff025e83a4e067bf0"),
          description: i18nRuntime.i18n("62efcb25e5b21da47c09780119da3458")
        }, {
          name: 'adaptor',
          type: 'js-editor',
          allowFullscreen: true,
          label: i18nRuntime.i18n("6eb8944029108ad3b6bb3572a648fafa"),
          description: i18nRuntime.i18n("e83cbec70e17988749c4a02a3b73f55c")
        }]
      }]
    }]
  }, rest);
});
amisEditorCore.setSchemaTpl('source', function (patch) {
  if (patch === void 0) {
    patch = {};
  }
  return amisEditorCore.getSchemaTpl('api', tslib.__assign({
    name: 'source',
    label: i18nRuntime.i18n("1395eba8d9efe27aa1ecd1a45e3e5dcd"),
    description: i18nRuntime.i18n("f514cabe63553a850063834c9d44a5ee"),
    sampleBuilder: function () {
      return JSON.stringify({
        status: 0,
        msg: '',
        data: {
          options: [{
            label: i18nRuntime.i18n("05f87b331e1c97691776d93a6598373f"),
            value: 'a'
          }, {
            label: i18nRuntime.i18n("f38c0a46797523b11051e35ec0f82a42"),
            value: 'b'
          }]
        }
      }, null, 2);
    }
  }, patch));
});
amisEditorCore.setSchemaTpl('apiString', {
  name: 'api',
  type: 'input-text',
  placeholder: 'http://'
});
amisEditorCore.setSchemaTpl('initFetch', function (overrides) {
  if (overrides === void 0) {
    overrides = {};
  }
  var visibleOn = get__default["default"](overrides, 'visibleOn', 'this.initApi');
  var fieldName = get__default["default"](overrides, 'name', 'initFetch');
  var label = get__default["default"](overrides, 'label', i18nRuntime.i18n("47d0a7caaa2baee8d38612a1c57421ef"));
  return {
    type: 'group',
    label: amisEditorCore.tipedLabel(label, i18nRuntime.i18n("866a60d7fbdfeba6ae42c7e9c7b03059")),
    visibleOn: visibleOn,
    direction: 'vertical',
    body: [{
      name: fieldName,
      type: 'radios',
      inline: true,
      value: false,
      // pipeIn: (value:any) => typeof value === 'boolean' ? value : '1'
      options: [{
        label: i18nRuntime.i18n("0a60ac8f02ccd2cf723f927284877851"),
        value: true
      }, {
        label: i18nRuntime.i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
        value: false
      }, {
        label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
        value: ''
      }]
    }, amisEditorCore.getSchemaTpl('valueFormula', {
      label: '',
      name: "".concat(fieldName, "On"),
      autoComplete: false,
      visibleOn: "typeof this.".concat(fieldName, " !== \"boolean\""),
      placeholder: i18nRuntime.i18n("713ec76479b992652ed39364d3d03870"),
      className: 'm-t-n-sm'
    })
    // {
    //   name: `${fieldName}On`,
    //   autoComplete: false,
    //   visibleOn: `typeof this.${fieldName} !== "boolean"`,
    //   type: 'input-text',
    //   placeholder: '如：this.id 表示有 id 值时初始加载',
    //   className: 'm-t-n-sm'
    // }
    ]
  };
});

amisEditorCore.setSchemaTpl('proxy', {
  type: 'switch',
  label: i18nRuntime.i18n("3f4f3acd6968f38361dddc6612a0c54f"),
  name: 'proxy',
  mode: 'horizontal',
  horizontal: {
    justify: true,
    left: 8
  },
  inputClassName: 'is-inline'
});
amisEditorCore.setSchemaTpl('apiControl', function (patch) {
  if (patch === void 0) {
    patch = {};
  }
  var name = patch.name,
    label = patch.label;
    patch.value;
    var description = patch.description,
    sampleBuilder = patch.sampleBuilder;
    patch.apiDesc;
    var rest = tslib.__rest(patch, ["name", "label", "value", "description", "sampleBuilder", "apiDesc"]);
  return tslib.__assign({
    type: 'ae-apiControl',
    label: label,
    name: name || 'api',
    description: description,
    labelRemark: sampleBuilder ? {
      label: false,
      title: i18nRuntime.i18n("226c06861b0605a3276311b1369204f2"),
      icon: 'fas fa-code',
      className: 'm-l-xs ae-ApiSample-icon',
      tooltipClassName: 'ae-ApiSample-tooltip',
      children: function (data) {
        return React__default["default"].createElement(amis.Html, {
          className: "ae-ApiSample",
          inline: false,
          html: "\n                  <pre><code>".concat(sampleBuilder(data), "</code></pre>\n                  ")
        });
      },
      trigger: 'click',
      rootClose: true,
      placement: 'left'
    } : undefined
  }, rest);
});
amisEditorCore.setSchemaTpl('interval', function (config) {
  return tslib.__assign({
    type: 'ae-switch-more',
    label: i18nRuntime.i18n("e5e3131aaf96b6dd10574bc9beeaf934"),
    name: 'interval',
    formType: 'extend',
    bulk: true,
    mode: 'normal',
    form: {
      body: tslib.__spreadArray([amisEditorCore.getSchemaTpl('withUnit', tslib.__assign({
        label: i18nRuntime.i18n("8df0f3891f8a80a392816f6ca662a33d"),
        name: 'interval',
        control: {
          type: 'input-number',
          name: 'interval',
          value: 1000
        },
        unit: i18nRuntime.i18n("21157cbff85802e353409f647f1f1f91")
      }, config && config.intervalConfig || {}))], tslib.__read(config && config.formItems || []), false)
    }
  }, config && config.switchMoreConfig || {});
});
amisEditorCore.setSchemaTpl('silentPolling', function () {
  return amisEditorCore.getSchemaTpl('switch', {
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("19c5410b23fba4bbfd1a58bbd5268c9b"), i18nRuntime.i18n("04f840b0772f4b5d59954a29a76f4e7b")),
    name: 'silentPolling',
    visibleOn: '!!this.interval'
  });
});
amisEditorCore.setSchemaTpl('stopAutoRefreshWhen', function (extra) {
  if (extra === void 0) {
    extra = {};
  }
  return amisEditorCore.getSchemaTpl('valueFormula', tslib.__assign({
    name: 'stopAutoRefreshWhen',
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("83f16354dd1532422dc8b3581d096e7b"), i18nRuntime.i18n("620f826a77f079c5683a9d3c59461ea1")),
    visibleOn: '!!this.interval'
  }, extra));
});
/**
 * 接口控件
 */
amisEditorCore.setSchemaTpl('actionApiControl', function (patch) {
  if (patch === void 0) {
    patch = {};
  }
  var name = patch.name,
    label = patch.label;
    patch.value;
    var description = patch.description,
    sampleBuilder = patch.sampleBuilder,
    rest = tslib.__rest(patch, ["name", "label", "value", "description", "sampleBuilder"]);
  return tslib.__assign({
    type: 'ae-actionApiControl',
    label: label,
    name: name,
    description: description,
    mode: 'normal',
    labelRemark: sampleBuilder ? {
      icon: '',
      label: i18nRuntime.i18n("1a63ac23010e0573f7c0a8cd3314b8c6"),
      title: i18nRuntime.i18n("226c06861b0605a3276311b1369204f2"),
      tooltipClassName: 'ae-ApiSample-tooltip',
      children: function (data) {
        return React__default["default"].createElement(amis.Html, {
          className: "ae-ApiSample",
          inline: false,
          html: "\n                    <pre><code>".concat(sampleBuilder(data), "</code></pre>\n                    ")
        });
      },
      trigger: 'click',
      className: 'm-l-xs',
      rootClose: true,
      placement: 'left'
    } : undefined
  }, rest);
});
amisEditorCore.setSchemaTpl('loadingConfig', function (patch, _a) {
  var context = _a.context;
  var globalSelector = '';
  var parent = context.node.parent;
  while (parent && !globalSelector) {
    var parentNodeType = parent.type;
    if (parentNodeType === 'dialog' || parentNodeType === 'drawer') {
      globalSelector = '[role=dialog-body]';
    } else if (parentNodeType === 'page') {
      globalSelector = '[role=page-body]';
    }
    parent = parent.parent;
  }
  return tslib.__assign(tslib.__assign({
    name: 'loadingConfig',
    type: 'select',
    label: i18nRuntime.i18n("5a4e41af91746f8a3905aa9f66048955"),
    options: [{
      label: i18nRuntime.i18n("6ade3082696deb00357f5c0359093cd4"),
      value: 1 /* LoadingOption.MERGE */
    }, {
      label: i18nRuntime.i18n("b6ac896eff6a6502e4ae7079b3e507a5"),
      value: 0 /* LoadingOption.HIDDEN */
    }, {
      label: i18nRuntime.i18n("0e9ffe1f1cf3f7a620970ea75dba9f39"),
      value: 2 /* LoadingOption.GLOBAL */
    }]
  }, patch), {
    pipeOut: function (value) {
      switch (value) {
        case 0 /* LoadingOption.HIDDEN */:
          return {
            show: false
          };
        case 2 /* LoadingOption.GLOBAL */:
          return {
            show: true,
            root: globalSelector
          };
        case 1 /* LoadingOption.MERGE */:
          return {
            show: true
          };
        default:
          return {};
      }
    },
    pipeIn: function (value) {
      if (value === void 0) {
        value = {};
      }
      if (value.root) {
        return 2 /* LoadingOption.GLOBAL */;
      }

      if (value.show === false) {
        return 0 /* LoadingOption.HIDDEN */;
      }

      return 1 /* LoadingOption.MERGE */;
    }
  });
});
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
