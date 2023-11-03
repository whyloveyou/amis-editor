/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __assign, __rest, __spreadArray, __read } from 'tslib';
import { setSchemaTpl, getSchemaTpl, defaultValue, tipedLabel, isObject } from 'amis-editor-core';
import flatten from 'lodash/flatten';
import { InputComponentName } from '../component/InputComponentName.js';
import { FormulaDateType } from '../renderer/FormulaControl.js';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import omit from 'lodash/omit';
import keys from 'lodash/keys';
import { i18n } from 'i18n-runtime';

setSchemaTpl('switch', {
  type: 'switch',
  mode: 'horizontal',
  horizontal: {
    justify: true,
    left: 8
  },
  inputClassName: 'is-inline '
});
/**
 * 分割线
 */
setSchemaTpl('divider', {
  type: 'divider',
  className: 'mx-0'
});
/**
 * 带单位的控件
 */
setSchemaTpl('withUnit', function (config) {
  return {
    type: 'input-group',
    name: config.name,
    label: config.label,
    body: [config.control, {
      type: 'tpl',
      addOnclassName: 'border-0 bg-none',
      tpl: config.unit
    }]
  };
});
/**
 * 表单项字段name
 */
setSchemaTpl('formItemName', {
  label: i18n("d314558953b3c76adb7e131aaec8bd86"),
  name: 'name',
  type: 'ae-DataBindingControl',
  onBindingChange: function (field, onBulkChange) {
    var _a;
    onBulkChange(((_a = field.resolveEditSchema) === null || _a === void 0 ? void 0 : _a.call(field)) || {
      label: field.label
    });
  }
  // validations: {
  //     matchRegexp: /^[a-z\$][a-z0-0\-_]*$/i
  // },
  // validationErrors: {
  //     "matchRegexp": "请输入合法的变量名"
  // },
  // validateOnChange: false
});

setSchemaTpl('formItemExtraName', getSchemaTpl('formItemName', {
  required: false,
  label: i18n("3ac7b489ba8cb811386c9f4fbfd1c6cc"),
  name: 'extraName',
  description: i18n("9da561f34a93e0275c56b84717ac9cf0")
}));
setSchemaTpl('formItemMode', function (config) {
  var _a;
  return {
    label: i18n("5aefca559c5a41d10078e21e6d616825"),
    name: 'mode',
    type: 'select',
    pipeIn: defaultValue((_a = config === null || config === void 0 ? void 0 : config.defaultValue) !== null && _a !== void 0 ? _a : ''),
    options: [{
      label: i18n("2dd25b8c21efbfee4a198787810d65d8"),
      value: 'inline'
    }, {
      label: i18n("4cde06e6162ed66720e3133cb83bc059"),
      value: 'horizontal'
    }, {
      label: i18n("75ac842f8e77305846f1d776f97dfaf8"),
      value: 'normal'
    }, (config === null || config === void 0 ? void 0 : config.isForm) ? null : {
      label: i18n("2dde3029c4170a1c8e961a90766e0194"),
      value: ''
    }].filter(function (i) {
      return i;
    }),
    pipeOut: function (v) {
      return v ? v : undefined;
    }
  };
});
setSchemaTpl('formulaControl', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return __assign({
    type: 'ae-formulaControl',
    variableMode: 'tree'
  }, schema);
});
setSchemaTpl('expressionFormulaControl', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return __assign({
    type: 'ae-expressionFormulaControl',
    variableMode: 'tree'
  }, schema);
});
setSchemaTpl('textareaFormulaControl', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return __assign({
    type: 'ae-textareaFormulaControl',
    variableMode: 'tree'
  }, schema);
});
setSchemaTpl('tplFormulaControl', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return __assign({
    type: 'ae-tplFormulaControl',
    variableMode: 'tree'
  }, schema);
});
setSchemaTpl('DataPickerControl', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return __assign({
    type: 'ae-DataPickerControl'
  }, schema);
});
setSchemaTpl('formItemInline', {
  type: 'switch',
  label: i18n("66670400b1f3e4b6c94cff171d441585"),
  name: 'inline',
  visibleOn: 'data.mode != "inline"',
  pipeIn: defaultValue(false)
  // onChange: (value:any, origin:any, item:any, form:any) => form.getValueByName('size') === "full" && form.setValueByName('')
});

setSchemaTpl('formItemSize', {
  name: 'size',
  label: i18n("21a1d138166d5d92276d126cf1d6ecac"),
  type: 'select',
  pipeIn: defaultValue('full'),
  // mode: 'inline',
  // className: 'w-full',
  options: [{
    label: i18n("23ecf42cada8bf2715792d718544d107"),
    value: 'xs'
  }, {
    label: i18n("391b8fa9c747a1799353ab856e666ad5"),
    value: 'sm'
  }, {
    label: i18n("aed1dfbc31703955e64806b799b67645"),
    value: 'md'
  }, {
    label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
    value: 'lg'
  }, {
    label: i18n("4a12e9b9fc5443e5e9999b5a7c56c19a"),
    value: 'full'
  }]
});
setSchemaTpl('minLength', {
  name: 'minLength',
  type: 'input-number',
  label: i18n("e9cbda74a1ffc06228fca68e4d16c4dd")
});
setSchemaTpl('maxLength', {
  name: 'maxLength',
  type: 'input-number',
  label: i18n("3baaa61e619e32fc36eff14839b1a63f")
});
/**
 * 表单项名称label
 */
setSchemaTpl('label', {
  label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
  name: 'label',
  type: 'input-text',
  pipeIn: function (v) {
    return v === false ? '' : v;
  }
});
/** 文件上传按钮名称 btnLabel */
setSchemaTpl('btnLabel', {
  type: 'input-text',
  name: 'btnLabel',
  label: i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
  value: i18n("481e034e6026969aae4ce7ce7c8a7b6f")
});
setSchemaTpl('labelHide', function () {
  return getSchemaTpl('switch', {
    name: 'label',
    label: tipedLabel(i18n("4e9ce9dfe13d97031d228fc5ae229f0d"), i18n("e2773277c7765d4590f7128423c58cee")),
    pipeIn: function (value) {
      return value === false;
    },
    pipeOut: function (value) {
      return value === true ? false : '';
    },
    visibleOn: 'this.__props__ && this.__props__.formMode === "horizontal" || data.mode === "horizontal" || data.label === false'
  });
});
setSchemaTpl('placeholder', {
  label: i18n("940b12c19fcf7aced0cdd164edc9acbc"),
  name: 'placeholder',
  type: 'input-text',
  placeholder: i18n("cc572c07586f4ea0c5b9b1060eb777f2")
});
setSchemaTpl('startPlaceholder', {
  type: 'input-text',
  name: 'startPlaceholder',
  label: i18n("2f92fc7bf6ef3dd57c514d0797fe2f1e"),
  pipeIn: defaultValue(i18n("592c59589144ddc68d05d528da17dcdc"))
});
setSchemaTpl('endPlaceholder', {
  type: 'input-text',
  name: 'endPlaceholder',
  label: i18n("a04c4894d83323d187f65cc357fa646e"),
  pipeIn: defaultValue(i18n("f782779e8b5d709462c8e71e0d9019f2"))
});
setSchemaTpl('tabs', function (config) {
  return {
    type: 'tabs',
    tabsMode: 'line',
    className: 'editor-prop-config-tabs',
    linksClassName: 'editor-prop-config-tabs-links aa',
    contentClassName: 'no-border editor-prop-config-tabs-cont hoverShowScrollBar',
    tabs: config.filter(function (item) {
      return item;
    }).map(function (item) {
      var _a;
      var newSchema = __assign(__assign({}, item), {
        body: Array.isArray(item.body) ? flatten(item.body) : [item.body]
      });
      // 新版配置面板空隙在子组件中，兼容一下
      if (((_a = newSchema.body[0]) === null || _a === void 0 ? void 0 : _a.type) === 'collapse-group') {
        newSchema.className = (newSchema.className || '') + ' p-none';
      }
      return newSchema;
    })
  };
});
setSchemaTpl('collapse', function (config) {
  return {
    type: 'wrapper',
    className: 'editor-prop-config-collapse',
    body: config.filter(function (item) {
      return item;
    }).map(function (item) {
      return __assign(__assign({
        type: 'collapse',
        headingClassName: 'editor-prop-config-head',
        bodyClassName: 'editor-prop-config-body'
      }, item), {
        body: flatten(item.body)
      });
    })
  };
});
setSchemaTpl('fieldSet', function (config) {
  return __assign(__assign({
    collapsable: true,
    collapsed: false
  }, config), {
    type: 'fieldset',
    title: config.title,
    body: flatten(config.body.filter(function (item) {
      return item;
    }))
  });
});
setSchemaTpl('collapseGroup', function (config) {
  var collapseGroupBody = config.filter(function (item) {
    return item && Array.isArray(item === null || item === void 0 ? void 0 : item.body) && (item === null || item === void 0 ? void 0 : item.body.length) > 0;
  }).map(function (item) {
    var _a;
    return __assign(__assign({
      type: 'collapse',
      headingClassName: 'ae-formItemControl-header ae-Collapse-header',
      bodyClassName: 'ae-formItemControl-body'
    }, item), {
      collapsed: (_a = item.collapsed) !== null && _a !== void 0 ? _a : false,
      key: item.title,
      body: flatten(item.body)
    });
  });
  return {
    type: 'collapse-group',
    activeKey: collapseGroupBody.filter(function (item) {
      return item && !item.collapsed;
    }).map(function (panel) {
      return panel.title;
    }),
    expandIconPosition: 'right',
    expandIcon: {
      type: 'icon',
      icon: 'chevron-right'
    },
    className: 'ae-formItemControl ae-styleControl',
    body: collapseGroupBody
  };
});
setSchemaTpl('clearable', {
  type: 'switch',
  label: i18n("09bbfb387dce6201df1ccef2aab161a6"),
  name: 'clearable',
  inputClassName: 'is-inline'
});
setSchemaTpl('hint', {
  label: i18n("8528426e54902956723f322bdbbcfafc"),
  type: 'input-text',
  name: 'hint',
  description: i18n("dc5dbe7a1b1ff5cae22ffbb636bc6380")
});
setSchemaTpl('icon', {
  label: i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
  type: 'icon-picker',
  name: 'icon',
  placeholder: i18n("b7dee01f2d085d90c47bcb8b490d9055"),
  clearable: true,
  description: ''
});
setSchemaTpl('valueFormula', function (config) {
  var _a = config || {},
    rendererSchema = _a.rendererSchema,
    useSelectMode = _a.useSelectMode,
    mode = _a.mode,
    visibleOn = _a.visibleOn,
    label = _a.label,
    name = _a.name,
    rendererWrapper = _a.rendererWrapper,
    needDeleteProps = _a.needDeleteProps,
    valueType = _a.valueType,
    header = _a.header,
    placeholder = _a.placeholder,
    DateTimeType = _a.DateTimeType,
    variables = _a.variables,
    requiredDataPropsVariables = _a.requiredDataPropsVariables,
    variableMode = _a.variableMode,
    rest = __rest(_a, ["rendererSchema", "useSelectMode", "mode", "visibleOn", "label", "name", "rendererWrapper", "needDeleteProps", "valueType", "header", "placeholder", "DateTimeType", "variables", "requiredDataPropsVariables", "variableMode"]);
  var curRendererSchema = rendererSchema;
  if (useSelectMode && curRendererSchema) {
    if (typeof curRendererSchema === 'function') {
      curRendererSchema = function (schema) {
        return __assign(__assign({}, rendererSchema(schema)), {
          type: 'select'
        });
      };
    } else if (curRendererSchema.options) {
      curRendererSchema = __assign(__assign({}, curRendererSchema), {
        type: 'select'
      });
    }
  }
  return {
    type: 'group',
    // 默认左右展示
    // 上下展示，可避免 自定义渲染器 出现挤压
    mode: mode === 'vertical' ? 'vertical' : 'horizontal',
    visibleOn: visibleOn,
    className: config === null || config === void 0 ? void 0 : config.className,
    body: [getSchemaTpl('formulaControl', __assign({
      label: label !== null && label !== void 0 ? label : i18n("225f3ed00750ae78ad1e6ea42c8f5087"),
      name: name || 'value',
      rendererWrapper: rendererWrapper,
      needDeleteProps: needDeleteProps,
      valueType: valueType,
      header: header,
      placeholder: placeholder,
      rendererSchema: curRendererSchema,
      variables: variables,
      requiredDataPropsVariables: requiredDataPropsVariables,
      variableMode: variableMode,
      DateTimeType: DateTimeType !== null && DateTimeType !== void 0 ? DateTimeType : FormulaDateType.NotDate
    }, rest))]
  };
});
setSchemaTpl('inputType', {
  label: i18n("b3e55578af5dd473bab62641bb2f5f8e"),
  name: 'type',
  type: 'select',
  creatable: false,
  options: [{
    label: i18n("97d07614380da93d257f9fbf81aa56fb"),
    value: 'input-text'
  }, {
    label: i18n("a8105204604a0b11e916f3879aae3b0b"),
    value: 'input-password'
  }, {
    label: i18n("3bc5e602b2d4c7fffe79258e2ac6952e"),
    value: 'input-email'
  }, {
    label: 'URL',
    value: 'input-url'
  }]
});
setSchemaTpl('selectDateType', {
  label: i18n("16084784a0f126b501e96994c792d411"),
  name: 'type',
  type: 'select',
  creatable: false,
  options: [{
    label: i18n("4ff1e74e43a3586339251494117185ad"),
    value: 'input-date'
  }, {
    label: i18n("0c3bf4fce50589b1073baf15f8a00d36"),
    value: 'input-datetime'
  }, {
    label: i18n("19fcb9eb2594059036dfede5f4ec53e8"),
    value: 'input-time'
  }, {
    label: i18n("8190915888889ed18be44ea0351d0448"),
    value: 'input-month'
  }, {
    label: i18n("a483bccf85587055ab31314ad1d2f82a"),
    value: 'input-quarter'
  }, {
    label: i18n("8f30e9f8678c24496921bebae6ca2ac6"),
    value: 'input-year'
  }]
});
setSchemaTpl('selectDateRangeType', {
  label: i18n("16084784a0f126b501e96994c792d411"),
  name: 'type',
  type: 'select',
  creatable: false,
  options: [{
    label: i18n("4ff1e74e43a3586339251494117185ad"),
    value: 'input-date-range'
  }, {
    label: i18n("0c3bf4fce50589b1073baf15f8a00d36"),
    value: 'input-datetime-range'
  }, {
    label: i18n("19fcb9eb2594059036dfede5f4ec53e8"),
    value: 'input-time-range'
  }, {
    label: i18n("8190915888889ed18be44ea0351d0448"),
    value: 'input-month-range'
  }, {
    label: i18n("a483bccf85587055ab31314ad1d2f82a"),
    value: 'input-quarter-range'
  }, {
    label: i18n("8f30e9f8678c24496921bebae6ca2ac6"),
    value: 'input-year-range'
  }]
});
setSchemaTpl('optionsMenuTpl', function (config) {
  var manager = config.manager,
    rest = __rest(config, ["manager"]);
  // 设置 options 中变量集合
  function getOptionVars(that) {
    var schema = manager.store.valueWithoutHiddenProps;
    var children = [];
    if (schema.labelField) {
      children.push({
        label: i18n("7e9c83e86beb612377a94e6e8d1fc644"),
        value: schema.labelField,
        tag: typeof schema.labelField
      });
    }
    if (schema.valueField) {
      children.push({
        label: i18n("2e01f5f5889e33d003bec7857cd38445"),
        value: schema.valueField,
        tag: typeof schema.valueField
      });
    }
    if (schema.options) {
      var optionItem_1 = reduce(schema.options, function (result, item) {
        return __assign(__assign({}, result), item);
      }, {});
      optionItem_1 === null || optionItem_1 === void 0 ? true : delete optionItem_1.$$id;
      optionItem_1 = omit(optionItem_1, map(children, function (item) {
        return item === null || item === void 0 ? void 0 : item.label;
      }));
      var otherItem = map(keys(optionItem_1), function (item) {
        return {
          label: item === 'label' ? i18n("891ec6336d4243714c25eecb2f8f774a") : item === 'value' ? i18n("684a0d1aeca4e9acff89221b57826d4d") : item,
          value: item,
          tag: typeof optionItem_1[item]
        };
      });
      children.push.apply(children, __spreadArray([], __read(otherItem), false));
    }
    var variablesArr = [{
      label: i18n("fb7ea2b05ca7328ee16a562d90c2eb96"),
      children: children
    }];
    return variablesArr;
  }
  return getSchemaTpl('textareaFormulaControl', __assign({
    mode: 'normal',
    label: tipedLabel(i18n("1ca87f0171481e27d94e81b477150b7d"), i18n("d6ecb32a380c91887a9346653c2427e9")),
    name: 'menuTpl',
    variables: getOptionVars,
    requiredDataPropsVariables: true
  }, rest));
});
/**
 * 数据源绑定
 */
setSchemaTpl('sourceBindControl', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return __assign({
    type: 'ae-formulaControl',
    name: 'source',
    label: i18n("0d83078816aa273f2941c9b55ec82bf3"),
    variableMode: 'tree',
    inputMode: 'input-group',
    placeholder: i18n("052f7eec7ca35a6b4d72d169ee1de494"),
    requiredDataPropsVariables: true
  }, schema);
});
setSchemaTpl('menuTpl', function () {
  return getSchemaTpl('textareaFormulaControl', {
    mode: 'normal',
    label: tipedLabel(i18n("59cf15fe6b8d659c9bd2f86143534a06"), i18n("d6ecb32a380c91887a9346653c2427e9")),
    name: 'menuTpl'
  });
});
setSchemaTpl('expression', {
  type: 'input-text',
  description: i18n("b18ec08df2e47313bcc93430e7a25fd3")
});
setSchemaTpl('size', {
  label: i18n("b3b97a293baac13db6367aba5539a09c"),
  type: 'button-group-select',
  name: 'size',
  clearable: true,
  options: [{
    label: i18n("23ecf42cada8bf2715792d718544d107"),
    value: 'xs'
  }, {
    label: i18n("391b8fa9c747a1799353ab856e666ad5"),
    value: 'sm'
  }, {
    label: i18n("aed1dfbc31703955e64806b799b67645"),
    value: 'md'
  }, {
    label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
    value: 'lg'
  }]
});
setSchemaTpl('name', {
  label: tipedLabel(i18n("689fad203a167d542c12bdc46f27e921"), i18n("6c1e18fd4cb57288a9f43603d5167292")),
  name: 'name',
  type: 'input-text',
  placeholder: i18n("ae344073ea6ca9ce742899cdf6d3e106")
});
setSchemaTpl('reload', {
  name: 'reload',
  asFormItem: true,
  // type: 'input-text',
  component: InputComponentName,
  label: tipedLabel(i18n("fa9a0a79f29fef72e3060ea1af93c305"), i18n("1a1ff1e1149a0cd1b39c0b231a334d04")),
  placeholder: i18n("4fe2f10c6d5bedac03f40a4362e4f69b"),
  mode: 'horizontal',
  horizontal: {
    left: 4,
    justify: true
  }
});
setSchemaTpl('className', function (schema) {
  return __assign(__assign({
    type: 'ae-classname',
    name: 'className'
  }, schema || {}), {
    label: tipedLabel((schema === null || schema === void 0 ? void 0 : schema.label) || i18n("4434b33a8731a73613ba5fa1eb984efb"), i18n("7080fa6e0ca1d7e24f6f8cac05077a3a"))
  });
});
setSchemaTpl('onlyClassNameTab', function (label) {
  if (label === void 0) {
    label = i18n("5e5d3f13111593b2710673006d4c8297");
  }
  return {
    title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
    body: getSchemaTpl('collapseGroup', [{
      title: i18n("261bba7ad82914e477f4b37f6a83874e"),
      body: [getSchemaTpl('className', {
        label: label
      })]
    }])
  };
});
/**
 * combo 组件样式包装调整
 */
setSchemaTpl('combo-container', function (config) {
  var _a, _b;
  if (isObject(config)) {
    var itemsWrapperClassName = void 0;
    var itemClassName = void 0;
    if (['input-kv', 'combo'].includes(config.type)) {
      itemsWrapperClassName = 'ae-Combo-items ' + ((_a = config.itemsWrapperClassName) !== null && _a !== void 0 ? _a : '');
      itemClassName = 'ae-Combo-item ' + ((_b = config.itemClassName) !== null && _b !== void 0 ? _b : '');
    }
    return __assign(__assign(__assign({}, config), itemsWrapperClassName ? {
      itemsWrapperClassName: itemsWrapperClassName
    } : {}), itemClassName ? {
      itemClassName: itemClassName
    } : {});
  }
  return config;
});
/**
 * 所有组件的状态
 */
setSchemaTpl('status', function (config) {
  return {
    title: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
    body: [getSchemaTpl('newVisible'), getSchemaTpl('hidden'), !(config === null || config === void 0 ? void 0 : config.unsupportStatic) && (config === null || config === void 0 ? void 0 : config.isFormItem) ? getSchemaTpl('static') : null, (config === null || config === void 0 ? void 0 : config.readonly) ? getSchemaTpl('readonly') : null, (config === null || config === void 0 ? void 0 : config.disabled) || (config === null || config === void 0 ? void 0 : config.isFormItem) ? getSchemaTpl('disabled') : null, (config === null || config === void 0 ? void 0 : config.isFormItem) ? getSchemaTpl('clearValueOnHidden') : null].filter(Boolean)
  };
});
setSchemaTpl('autoFill', {
  type: 'input-kv',
  name: 'autoFill',
  label: tipedLabel(i18n("3bce1a6217990c8dc087d254f1fe754a"), i18n("f01553e415ca33cc89d0bca84023f4b5"))
});
setSchemaTpl('autoFillApi', {
  type: 'input-kv',
  name: 'autoFill',
  label: tipedLabel(i18n("89bc2a21c778b36d09c8d795aac8260e"), i18n("666352a09304cba42de24312f509c3b4"))
});
setSchemaTpl('required', {
  type: 'switch',
  name: 'required',
  label: i18n("04d815a5d4b803d6bb956d2da5a82688"),
  mode: 'horizontal',
  horizontal: {
    justify: true,
    left: 8
  },
  inputClassName: 'is-inline '
});
/**
 * 表单项描述description
 */
setSchemaTpl('description', {
  name: 'description',
  type: 'textarea',
  label: tipedLabel(i18n("3bdd08adab6ea90b9164b20a0e4151ac"), i18n("a1b6281dc554ac84a3e6062f812fe50d")),
  maxRows: 2,
  pipeIn: function (value, data) {
    return value || data.desc || '';
  }
});
setSchemaTpl('disabled', {
  type: 'ae-StatusControl',
  label: i18n("710ad08b11419332713360d2750cd707"),
  mode: 'normal',
  name: 'disabled',
  expressionName: 'disabledOn'
});
setSchemaTpl('readonly', {
  type: 'ae-StatusControl',
  label: i18n("85541bd9f7f39a6e6d9d26cbe09cbdd4"),
  mode: 'normal',
  name: 'readOnly',
  expressionName: 'readOnlyOn'
});
setSchemaTpl('visible', {
  type: 'ae-StatusControl',
  defaultTrue: true,
  label: i18n("4d681c4aa93c8d005ec2ca2370618d6e"),
  mode: 'normal',
  name: 'visible',
  expressionName: 'visibleOn'
});
setSchemaTpl('static', {
  type: 'ae-StatusControl',
  label: i18n("04f5f12c49c2a6fdc43da049591328ad"),
  mode: 'normal',
  name: 'static',
  expressionName: 'staticOn'
});
// 新版配置面板兼容 [可见] 状态
setSchemaTpl('newVisible', {
  type: 'ae-StatusControl',
  label: i18n("4d681c4aa93c8d005ec2ca2370618d6e"),
  mode: 'normal',
  name: 'visible',
  expressionName: 'visibleOn',
  visibleOn: 'data.visible || data.visible === false || data.visibleOn !== undefined'
});
setSchemaTpl('hidden', {
  type: 'ae-StatusControl',
  label: i18n("dce5379cb978a8259ecfca8f08f00817"),
  mode: 'normal',
  name: 'hidden',
  expressionName: 'hiddenOn'
});
setSchemaTpl('maximum', {
  type: 'input-number',
  label: i18n("5da893141114a59da868052b3a17a79a")
});
setSchemaTpl('minimum', {
  type: 'input-number',
  label: i18n("c322edb884724d04842fc35f4d29a24e")
});
setSchemaTpl('switchDefaultValue', {
  type: 'switch',
  label: i18n("5d0595edc3d14aec24efef85534e4314"),
  name: 'value',
  pipeIn: function (value) {
    return typeof value !== 'undefined';
  },
  pipeOut: function (value, origin, data) {
    return value ? '' : undefined;
  },
  labelRemark: {
    trigger: ['hover', 'focus'],
    setting: true,
    title: '',
    content: i18n("495333d64fc1efafd6c40bc9a3929fee")
  }
});
setSchemaTpl('numberSwitchDefaultValue', {
  type: 'switch',
  label: tipedLabel(i18n("5d0595edc3d14aec24efef85534e4314"), i18n("495333d64fc1efafd6c40bc9a3929fee")),
  name: 'value',
  pipeIn: function (value) {
    return typeof value !== 'undefined';
  },
  pipeOut: function (value, origin, data) {
    return value ? '' : undefined;
  }
});
setSchemaTpl('kilobitSeparator', {
  type: 'switch',
  label: i18n("530c4483c7e52dc409509b755eabee11"),
  name: 'kilobitSeparator',
  inputClassName: 'is-inline'
});
setSchemaTpl('imageUrl', {
  type: 'input-text',
  label: i18n("20def7942674282277c3714ed7ea6ce0")
});
setSchemaTpl('backgroundImageUrl', {
  type: 'input-text',
  label: i18n("090dbd614a66a56a5eadec87f59ea15c")
});
setSchemaTpl('audioUrl', {
  type: 'input-text',
  label: i18n("f8f176147db276063e7ec15f076e39e0"),
  name: 'src',
  description: i18n("91d3cd46d6b6919749e56056d5acc9bc")
});
setSchemaTpl('fileUrl', {
  type: 'input-text',
  label: i18n("2a0c4740f156a9536049f4610da25400")
});
setSchemaTpl('markdownBody', {
  name: 'value',
  type: 'editor',
  language: 'markdown',
  size: 'xxl',
  label: i18n("4fa2ae7d726dc395cfea70ff3d7256d2"),
  options: {
    lineNumbers: 'off'
  }
});
setSchemaTpl('richText', {
  label: i18n("e2591e971f4c28db7c80a5f546084a1d"),
  type: 'input-rich-text',
  buttons: ['paragraphFormat', 'quote', 'textColor', 'backgroundColor', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'formatOL', 'formatUL', 'align', '|', 'insertLink', 'insertImage', 'insertTable', '|', 'undo', 'redo', 'fullscreen'],
  name: 'html',
  description: i18n("0861915dbac25ccb573b3bb72ffeebd7"),
  size: 'lg'
});
setSchemaTpl('showCounter', {
  type: 'switch',
  label: i18n("52f43ce846b2bf73f86195cf196fe578"),
  name: 'showCounter',
  inputClassName: 'is-inline'
});
setSchemaTpl('borderMode', {
  name: 'borderMode',
  label: i18n("961534b4ea37e4e88aada736b299d063"),
  type: 'button-group-select',
  inputClassName: 'is-inline',
  horizontal: {
    left: 2,
    justify: true
  },
  options: [{
    label: i18n("b9245d69d2d82b0081ced47a18c27f41"),
    value: 'full'
  }, {
    label: i18n("8f9b1b7e38cd2ed16f22807417ab3573"),
    value: 'half'
  }, {
    label: i18n("7fc7940b4f7f58b49c71bf9e237b633e"),
    value: 'none'
  }],
  pipeIn: defaultValue('full')
});
setSchemaTpl('searchable', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return getSchemaTpl('switch', __assign({
    label: i18n("dbdae74eb12668e2b9568b013bf27d45"),
    name: 'searchable'
  }, schema));
});
setSchemaTpl('sortable', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return getSchemaTpl('switch', __assign({
    label: i18n("b4521626a48dcb61001fc563d2433ed3"),
    name: 'sortable'
  }, schema));
});
setSchemaTpl('onlyLeaf', {
  type: 'switch',
  label: tipedLabel(i18n("6fdccea6068e0698c565acd92052a86e"), i18n("a80c61384a8459ef7bfb5082a2b54b5f")),
  horizontal: {
    left: 5,
    justify: true
  },
  name: 'onlyLeaf',
  value: false,
  inputClassName: 'is-inline'
});
setSchemaTpl('clearValueOnHidden', function () {
  return getSchemaTpl('switch', {
    type: 'switch',
    horizontal: {
      left: 8,
      justify: true
    },
    label: tipedLabel(i18n("71758057056e7f31d73e3f3ac8860b4f"), i18n("ce641d8297471a5d65c46cdfb023097c")),
    name: 'clearValueOnHidden'
  });
});
setSchemaTpl('utc', {
  type: 'switch',
  label: tipedLabel(i18n("3e719b87b9ee71d4613caefbf2fd1074"), i18n("d52e57147787797ae0153d43bf8be298")),
  name: 'utc',
  inputClassName: 'is-inline'
});
setSchemaTpl('embed', {
  type: 'switch',
  label: i18n("339b9ebd91070de050b4bfe483aa4474"),
  name: 'embed'
});
setSchemaTpl('buttonLevel', {
  label: i18n("ac3880323853de9adc4f66bc06d438ff"),
  type: 'select',
  name: 'level',
  menuTpl: {
    type: 'container',
    bodyClassName: 'ae-ButtonLevel-MenuTpl',
    body: {
      type: 'button',
      label: '${label}',
      size: 'sm',
      level: '${value}'
    }
  },
  options: [{
    label: i18n("18c63459a2c069022c7790430f761214"),
    value: 'default',
    level: 'default'
  }, {
    label: i18n("bfe68d5844f8e54602760e18f45954f7"),
    value: 'link',
    level: 'link'
  }, {
    label: i18n("fbae87bcc352f6933541fb77a07418ed"),
    value: 'primary',
    level: 'primary'
  }, {
    label: i18n("49a79f4047b81186c069ed1c9c151c66"),
    value: 'light',
    level: 'light'
  }, {
    label: i18n("41e8e8b9935c9ee4e88b06643a2d5b81"),
    value: 'dark',
    level: 'dark'
  }, {
    label: i18n("02d9819ddaaaeb1b7b22b12608c7e5ca"),
    value: 'info',
    level: 'info'
  }, {
    label: i18n("330363dfc524cff2488f2ebde0500896"),
    value: 'success',
    level: 'success'
  }, {
    label: i18n("900c70fa5f7dbc014e6f762d5e0e885c"),
    value: 'warning',
    level: 'warning'
  }, {
    label: i18n("e2e27a87257599f83c817c43e724b6aa"),
    value: 'danger',
    level: 'danger'
  }, {
    label: i18n("bde770827b9137ddb3eb676878af9709"),
    value: 'secondary',
    level: 'secondary'
  }, {
    label: i18n("3d7443aeba7c8eaf1cbb42ad5232fa10"),
    value: 'enhance',
    level: 'enhance'
  }],
  pipeIn: defaultValue('default')
});
setSchemaTpl('uploadType', {
  label: i18n("b1ea078db7298ea7872d894283378507"),
  name: 'uploadType',
  type: 'select',
  value: 'fileReceptor',
  options: [{
    label: i18n("1e4dc4d5f4a3a95ddc349147d4d8cd39"),
    value: 'fileReceptor'
  }, {
    label: i18n("74cef1162781310e1503d2dc463a76fc"),
    value: 'bos'
  }]
});
setSchemaTpl('bos', {
  label: i18n("38fbc7fb70b4399d7e4050d3cbcdf229"),
  type: 'select',
  name: 'bos',
  value: 'default',
  options: [{
    label: i18n("e5d59ccec2caa64ca83b7cc740645928"),
    value: 'default'
  }]
});
setSchemaTpl('badge', {
  label: i18n("b8c467fce096a649583c0bc9d9281a5c"),
  name: 'badge',
  type: 'ae-badge'
});
setSchemaTpl('nav-badge', {
  label: i18n("b8c467fce096a649583c0bc9d9281a5c"),
  name: 'badge',
  type: 'ae-nav-badge'
});
setSchemaTpl('nav-default-active', {
  type: 'ae-nav-default-active'
});
/**
 * 日期范围快捷键组件
 */
setSchemaTpl('dateShortCutControl', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return __assign({
    type: 'ae-DateShortCutControl',
    name: 'shortcuts'
  }, schema);
});
setSchemaTpl('eventControl', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return __assign({
    type: 'ae-eventControl',
    mode: 'normal'
  }, schema);
});
setSchemaTpl('data', {
  type: 'input-kv',
  name: 'data',
  label: i18n("c70638412c6cffd150117ae403dea939")
});
setSchemaTpl('app-page', {
  type: 'nested-select',
  label: i18n("a4895ee2e87d1c47b734dbcf1a535aeb"),
  name: 'link',
  mode: 'horizontal',
  size: 'lg',
  required: true,
  options: []
});
setSchemaTpl('app-page-args', {
  type: 'combo',
  name: 'params',
  label: i18n("0b72392143e4038e98128cb0f6f679b3"),
  multiple: true,
  removable: true,
  addable: true,
  strictMode: false,
  canAccessSuperData: true,
  size: 'lg',
  mode: 'horizontal',
  items: [{
    name: 'key',
    type: 'input-text',
    placeholder: i18n("c068b579db3bf0a553bd0af4f81cc14f"),
    source: '${__pageInputSchema}',
    labelField: 'label',
    valueField: 'value',
    required: true
  }, getSchemaTpl('formulaControl', {
    name: 'val',
    variables: '${variables}',
    placeholder: i18n("bfed4943c5f487de1b63a82f7230cce2")
  })]
});
setSchemaTpl('iconLink', function (schema) {
  var name = schema.name,
    visibleOn = schema.visibleOn,
    label = schema.label;
  return getSchemaTpl('icon', {
    name: name,
    visibleOn: visibleOn,
    label: label !== null && label !== void 0 ? label : i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
    placeholder: i18n("b7dee01f2d085d90c47bcb8b490d9055"),
    clearable: true,
    description: ''
  });
});
setSchemaTpl('virtualThreshold', {
  name: 'virtualThreshold',
  type: 'input-number',
  min: 1,
  step: 1,
  precision: 0,
  label: tipedLabel(i18n("03bfb834c8a5fef58d885e448a4e13b4"), i18n("50437e080edc71ab624c93d419472919")),
  pipeOut: function (value) {
    return value || undefined;
  }
});
setSchemaTpl('virtualItemHeight', {
  name: 'itemHeight',
  type: 'input-number',
  min: 1,
  step: 1,
  precision: 0,
  label: tipedLabel(i18n("02b9880e1d2df8a07e90e9878080c739"), i18n("a3f66655c3d2bcfecc6afba0e4424460")),
  pipeOut: function (value) {
    return value || undefined;
  }
});
setSchemaTpl('pageTitle', {
  label: i18n("8d6b5924f187048cfa28d6c21fa6d2d6"),
  name: 'title',
  type: 'input-text'
});
setSchemaTpl('pageSubTitle', {
  label: i18n("72cf373be86a38b29f6d2f15900b0da1"),
  name: 'subTitle',
  type: 'textarea'
});
setSchemaTpl('textareaDefaultValue', function () {
  return getSchemaTpl('textareaFormulaControl', {
    label: i18n("225f3ed00750ae78ad1e6ea42c8f5087"),
    name: 'value',
    mode: 'normal'
  });
});
setSchemaTpl('prefix', {
  type: 'input-text',
  name: 'prefix',
  label: tipedLabel(i18n("4c9bb42608b11278a5d9a2471b74eb40"), i18n("925d31bb30d63576600299475a910c33"))
});
setSchemaTpl('suffix', {
  type: 'input-text',
  name: 'suffix',
  label: tipedLabel(i18n("242d641eab57223af01fb29940a096ed"), i18n("42677544e2cbee28f7e7df216e685543"))
});
setSchemaTpl('unit', {
  type: 'input-text',
  name: 'unit',
  label: i18n("f2996845b6bf0a07fe26f74f35e42ebe"),
  value: ''
});
setSchemaTpl('optionsTip', {
  type: 'input-text',
  name: 'optionsTip',
  label: i18n("9888468550779b1777260b8fafe6abc2"),
  value: i18n("a2cbb42e488dffe644bdb87c26afbc07")
});
setSchemaTpl('tableCellRemark', {
  name: 'remark',
  label: i18n("02d9819ddaaaeb1b7b22b12608c7e5ca"),
  type: 'input-text',
  description: i18n("45882ddedb42c1a38462949750bc8a84")
});
setSchemaTpl('tableCellPlaceholder', {
  name: 'placeholder',
  type: 'input-text',
  label: i18n("4c1cff4d8c05daa6ed9352a241ee628c"),
  value: '-',
  description: i18n("ff88d5db9d61f14bce6e3397fd4652a5")
});
setSchemaTpl('title', {
  type: 'input-text',
  name: 'title',
  label: i18n("32c65d8d7431e76029678ec7bb73a5ab")
});
setSchemaTpl('caption', {
  type: 'input-text',
  name: 'caption',
  label: i18n("32c65d8d7431e76029678ec7bb73a5ab")
});
setSchemaTpl('imageCaption', {
  type: 'input-text',
  name: 'imageCaption',
  label: i18n("098c3d959911b48b4d912cb85ccc4942")
});
setSchemaTpl('inputBody', {
  type: 'input-text',
  name: 'body',
  label: tipedLabel(i18n("2d711b09bd0db0ad240cc83b30dd8014"), i18n("5d809212900f3bc3ba122fe93638394d"))
});
setSchemaTpl('stepSubTitle', {
  type: 'input-text',
  name: 'subTitle',
  label: false,
  placeholder: i18n("72cf373be86a38b29f6d2f15900b0da1")
});
setSchemaTpl('stepDescription', {
  type: 'input-text',
  name: 'description',
  label: false,
  placeholder: i18n("3bdd08adab6ea90b9164b20a0e4151ac")
});
setSchemaTpl('taskNameLabel', {
  type: 'input-text',
  name: 'taskNameLabel',
  pipeIn: defaultValue(i18n("78caf7115c5140f8913c581920239f22")),
  label: i18n("24e3562a3262e80c3119f22b8f447f64")
});
setSchemaTpl('operationLabel', {
  type: 'input-text',
  name: 'operationLabel',
  pipeIn: defaultValue(i18n("2b6bc0f293f5ca01b006206c2535ccbc")),
  label: i18n("cb8e07cea4df337bb6dcb8362b5f7e02")
});
setSchemaTpl('statusLabel', {
  type: 'input-text',
  name: 'statusLabel',
  pipeIn: defaultValue(i18n("3fea7ca76cdece641436d7ab0d02ab1b")),
  label: i18n("f2acd3adcc0a0d73b318c83a29a4d2a9")
});
setSchemaTpl('remarkLabel', {
  type: 'input-text',
  name: 'remarkLabel',
  pipeIn: defaultValue(i18n("8a4cf07caf84c91a87e8ff3c48a944b9")),
  label: i18n("0cbbb89050458c2bcf0ca98c19dc8864")
});
setSchemaTpl('inputArrayItem', {
  type: 'input-text',
  placeholder: i18n("d7ec2d3fea4756bc1642e0f10c180cf5")
});
setSchemaTpl('actionPrevLabel', {
  type: 'input-text',
  name: 'actionPrevLabel',
  label: i18n("0f04a65952b58cbbc5ca6cba868c3bec"),
  pipeIn: defaultValue(i18n("eeb6908870e058bc23d52c1e405a054e"))
});
setSchemaTpl('actionNextLabel', {
  type: 'input-text',
  name: 'actionNextLabel',
  label: i18n("e54827ae56fcb690d879b9cdd29f0ac7"),
  pipeIn: defaultValue(i18n("38ce27d84639f3a6e07c00b3b4995c0e"))
});
setSchemaTpl('actionNextSaveLabel', {
  type: 'input-text',
  name: 'actionNextSaveLabel',
  label: i18n("abb7ba84b95c6c90341ac9c883fbc85b"),
  pipeIn: defaultValue(i18n("bed196af058f458def957031f88abd09"))
});
setSchemaTpl('actionFinishLabel', {
  type: 'input-text',
  name: 'actionFinishLabel',
  label: i18n("81b522590d543401ad15ae8a9155361d"),
  pipeIn: defaultValue(i18n("769d88e425e03120b83ee4ed6b9d588e"))
});
setSchemaTpl('imgCaption', {
  type: 'textarea',
  name: 'caption',
  label: i18n("098c3d959911b48b4d912cb85ccc4942")
});
setSchemaTpl('taskRemark', {
  type: 'textarea',
  name: 'remark',
  label: i18n("1d35dcbf191e36dcc6c15f71277d72ed")
});
setSchemaTpl('tooltip', {
  type: 'textarea',
  name: 'tooltip',
  label: i18n("6f2b01db04cbf7e460b5c6f4e37a5e76")
});
setSchemaTpl('anchorTitle', {
  type: 'input-text',
  name: 'title',
  required: true,
  placeholder: i18n("8cfd149e7d73ebae6a797d21728292ff")
});
setSchemaTpl('avatarText', {
  label: i18n("ca746b1ff10193a3ce20878dec04a733"),
  name: 'text',
  type: 'input-text',
  pipeOut: function (value) {
    return value === '' ? undefined : value;
  },
  visibleOn: 'data.showtype === "text"'
});
setSchemaTpl('cardTitle', {
  name: 'header.title',
  type: 'input-text',
  label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
  description: i18n("00a1f644f34b9ee43adf82cb3449158c")
});
setSchemaTpl('cardSubTitle', {
  name: 'header.subTitle',
  type: 'input-text',
  label: i18n("72cf373be86a38b29f6d2f15900b0da1"),
  description: i18n("00a1f644f34b9ee43adf82cb3449158c")
});
setSchemaTpl('cardsPlaceholder', {
  name: 'placeholder',
  value: i18n("21efd88b67a39834582ad99aabb9dc60"),
  type: 'input-text',
  label: i18n("35ba83e053cef95e55dfffde279822b5")
});
setSchemaTpl('cardDesc', {
  name: 'header.desc',
  type: 'textarea',
  label: i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
  description: i18n("00a1f644f34b9ee43adf82cb3449158c")
});
setSchemaTpl('imageTitle', {
  type: 'input-text',
  label: i18n("c6c7456d446d62a906c2809b6ba19ce1"),
  name: 'title',
  visibleOn: 'this.type == "image"'
});
setSchemaTpl('imageDesc', {
  type: 'textarea',
  label: i18n("098c3d959911b48b4d912cb85ccc4942"),
  name: 'description',
  visibleOn: 'this.type == "image"'
});
setSchemaTpl('fetchSuccess', {
  label: i18n("fb24383a41f23196349548b5d0cb98ce"),
  type: 'input-text',
  name: 'fetchSuccess'
});
setSchemaTpl('fetchFailed', {
  label: i18n("62e3e15c8fb9038f2780329bc26e8bab"),
  type: 'input-text',
  name: 'fetchFailed'
});
setSchemaTpl('saveOrderSuccess', {
  label: i18n("c62a1b7f314be10aead10475e7543f6a"),
  type: 'input-text',
  name: 'saveOrderSuccess'
});
setSchemaTpl('saveOrderFailed', {
  label: i18n("c8035507b7a576d43e9f227c91c7a7b5"),
  type: 'input-text',
  name: 'saveOrderFailed'
});
setSchemaTpl('quickSaveSuccess', {
  label: i18n("7cb0932b806559be232d2a69453224e7"),
  type: 'input-text',
  name: 'quickSaveSuccess'
});
setSchemaTpl('quickSaveFailed', {
  label: i18n("fd79a193a487b8c9d5a302d0d88c1c2c"),
  type: 'input-text',
  name: 'quickSaveFailed'
});
setSchemaTpl('saveSuccess', {
  label: i18n("b66ef8966dad62d377bc5310d8b88e7f"),
  name: 'saveSuccess',
  type: 'input-text'
});
setSchemaTpl('saveFailed', {
  label: i18n("cf538bbe1fb431f9e2668da4d84cfadf"),
  name: 'saveFailed',
  type: 'input-text'
});
setSchemaTpl('validateFailed', {
  label: i18n("6509e435d66db2a105b2444b1d3d0db1"),
  name: 'validateFailed',
  type: 'input-text'
});
setSchemaTpl('tablePlaceholder', {
  name: 'placeholder',
  pipeIn: defaultValue(i18n("21efd88b67a39834582ad99aabb9dc60")),
  type: 'input-text',
  label: i18n("35ba83e053cef95e55dfffde279822b5")
});
setSchemaTpl('collapseOpenHeader', {
  name: 'collapseHeader',
  label: tipedLabel(i18n("81d2b9f20fb2083c75a5b052b84e897a"), i18n("7349194c139069b32889101768aa7428")),
  type: 'input-text'
});
setSchemaTpl('matrixColumnLabel', {
  type: 'input-text',
  name: 'label',
  placeholder: i18n("39886861ea5d8b526e0ac5ecc78d110c")
});
setSchemaTpl('matrixRowLabel', {
  type: 'input-text',
  name: 'label',
  placeholder: i18n("854af3c2cd9c275ac70fc5121ea4fb2e")
});
setSchemaTpl('matrixRowTitle', {
  name: 'rowLabel',
  label: i18n("34ad26bd1fb448c7f2384252d856c02b"),
  type: 'input-text'
});
setSchemaTpl('submitText', {
  name: 'submitText',
  label: i18n("60ad7d0d170b973ab9cdb0b23e636704"),
  type: 'input-text'
});
setSchemaTpl('tpl:btnLabel', {
  type: 'tpl',
  tpl: '<span class="label label-success">${label}</span>',
  columnClassName: 'p-t-xs'
});
setSchemaTpl('switchOption', {
  type: 'input-text',
  name: 'option',
  label: i18n("f411d0f1f925d9b48d8c1d451bd809b1")
});
setSchemaTpl('addOnLabel', {
  name: 'label',
  label: i18n("ca746b1ff10193a3ce20878dec04a733"),
  type: 'input-text'
});
setSchemaTpl('onText', {
  name: 'onText',
  type: 'input-text',
  label: i18n("c580bacf343343f04a1b551e46d02c4f")
});
setSchemaTpl('offText', {
  name: 'offText',
  type: 'input-text',
  label: i18n("9ff352ae39cdaeaa4fc54f83575eedc9")
});
setSchemaTpl('propertyTitle', {
  label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
  type: 'input-text',
  name: 'title'
});
setSchemaTpl('propertyLabel', {
  type: 'input-text',
  mode: 'inline',
  size: 'sm',
  label: i18n("ae41a992ccceb36f83024f72531186ec"),
  name: 'label'
});
setSchemaTpl('propertyContent', {
  type: 'input-text',
  mode: 'inline',
  size: 'sm',
  label: i18n("52dff5b153bb5eaca33a008458ce0209"),
  name: 'content'
});
setSchemaTpl('draggableTip', {
  type: 'input-text',
  name: 'draggableTip',
  label: tipedLabel(i18n("9b14c9051067bef2dd9a15683201dd18"), i18n("f41a714bc8b26dc27a93a07c44e329a8"))
});
setSchemaTpl('deleteConfirmText', {
  label: tipedLabel(i18n("0c15a924dc3bedefb79c958972bef2b9"), i18n("178bf4dd4b8d56370e2fc8275f9dc9e4")),
  name: 'deleteConfirmText',
  type: 'input-text',
  pipeIn: defaultValue(i18n("cb8f7758eb03574f9b8402659c0f02b2"))
});
setSchemaTpl('optionsLabel', {
  type: 'input-text',
  name: 'label',
  placeholder: i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
  required: true
});
setSchemaTpl('anchorNavTitle', {
  name: 'title',
  label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
  type: 'input-text',
  required: true
});
/** 给 CRUD2 使用 */
setSchemaTpl('primaryField', {
  type: 'input-text',
  name: 'primaryField',
  label: tipedLabel(i18n("475cdfcaf614f2b69d88e1e34ba76079"), i18n("c28f86f11fc814ea5696af5aa9464cbe")),
  pipeIn: function (value, formStore) {
    var _a;
    var rowSelection = (_a = formStore === null || formStore === void 0 ? void 0 : formStore.data) === null || _a === void 0 ? void 0 : _a.rowSelection;
    if (value == null || typeof value !== 'string') {
      return rowSelection && (rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.keyField) && typeof rowSelection.keyField === 'string' ? rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.keyField : 'id';
    }
    return value;
  }
});
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
