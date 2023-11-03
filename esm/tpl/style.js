/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __spreadArray, __read, __assign } from 'tslib';
import { setSchemaTpl, getSchemaTpl, defaultValue } from 'amis-editor-core';
import kebabCase from 'lodash/kebabCase';
import { i18n } from 'i18n-runtime';

setSchemaTpl('style:formItem', function (_a) {
  var renderer = _a.renderer,
    schema = _a.schema;
  return {
    title: i18n("55b45c73ae417c4dead67905b1550e85"),
    key: 'formItem',
    body: [getSchemaTpl('formItemMode'), getSchemaTpl('labelHide'), getSchemaTpl('horizontal'), (renderer === null || renderer === void 0 ? void 0 : renderer.sizeMutable) !== false ? getSchemaTpl('formItemSize') : null
    // getSchemaTpl('formItemInline')
    ].concat(schema)
  };
});
setSchemaTpl('style:classNames', function (config) {
  var _a = config || {},
    _b = _a.isFormItem,
    isFormItem = _b === void 0 ? true : _b,
    _c = _a.unsupportStatic,
    unsupportStatic = _c === void 0 ? false : _c,
    _d = _a.schema,
    schema = _d === void 0 ? [] : _d;
  return {
    title: i18n("4434b33a8731a73613ba5fa1eb984efb"),
    body: (isFormItem ? __spreadArray([getSchemaTpl('className', {
      label: i18n("55b45c73ae417c4dead67905b1550e85")
    }), getSchemaTpl('className', {
      label: i18n("14d342362f66aa86e2aa1c1e11aa1204"),
      name: 'labelClassName'
    }), getSchemaTpl('className', {
      label: i18n("e1b2f870112bd38f8d7e14a0ad589930"),
      name: 'inputClassName'
    })], __read(unsupportStatic ? [] : [getSchemaTpl('className', {
      label: i18n("04f5f12c49c2a6fdc43da049591328ad"),
      name: 'staticClassName'
    })]), false) : [getSchemaTpl('className', {
      label: i18n("5e5d3f13111593b2710673006d4c8297")
    })]).concat(schema)
  };
});
setSchemaTpl('style:others', function (schemas) {
  if (schemas === void 0) {
    schemas = [];
  }
  return {
    title: i18n("c49fc970bcd168e1c652a8ced5d95d0d"),
    body: __spreadArray([], __read(schemas), false)
  };
});
/**
 * 通用CSS Style控件
 * @param {string | Array<string>} exclude 需要隐藏的配置key
 * @param {string | Array<string>} include 包含的配置key，存在时，优先级高于exclude
 */
setSchemaTpl('style:common', function (exclude, include) {
  // key统一转换成Kebab case，eg: boxShadow => bos-shadow
  exclude = (exclude ? Array.isArray(exclude) ? exclude : [exclude] : []).map(function (key) {
    return kebabCase(key);
  });
  include = (include ? Array.isArray(include) ? include : [include] : []).map(function (key) {
    return kebabCase(key);
  });
  return [{
    header: i18n("5aefca559c5a41d10078e21e6d616825"),
    key: 'layout',
    body: [{
      type: 'style-display',
      label: false,
      name: 'style'
    }].filter(function (comp) {
      return !~exclude.indexOf(comp.type.replace(/^style-/i, ''));
    })
  }, {
    header: i18n("ca746b1ff10193a3ce20878dec04a733"),
    key: 'font',
    body: [{
      type: 'style-font',
      label: false,
      name: 'style'
    }]
  }, {
    header: i18n("9a233b241eef54521cfe9365bfaa7b2f"),
    key: 'box-model',
    body: [{
      type: 'style-box-model',
      label: false,
      name: 'style'
    }]
  }, {
    header: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
    key: 'background',
    body: [{
      type: 'style-background',
      label: false,
      name: 'style'
    }]
  }, {
    header: i18n("961534b4ea37e4e88aada736b299d063"),
    key: 'border',
    body: [{
      type: 'style-border',
      label: false,
      name: 'style'
    }]
  }, {
    header: i18n("803205e38834280d9e6a75993ac00764"),
    key: 'box-shadow',
    body: [{
      type: 'style-box-shadow',
      label: false,
      name: 'style.boxShadow'
    }]
  }, {
    header: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
    key: 'other',
    body: [{
      label: i18n("34dac4adbc96afd65f060cc4cfff1feb"),
      name: 'style.opacity',
      min: 0,
      max: 1,
      step: 0.05,
      type: 'input-range',
      pipeIn: defaultValue(1),
      marks: {
        '0%': '0',
        '50%': '0.5',
        '100%': '1'
      }
    }, {
      label: i18n("a45b5d3fcdb8210d249b2c6d545b6691"),
      name: 'style.cursor',
      type: 'select',
      mode: 'row',
      menuTpl: {
        type: 'html',
        html: "<span style='cursor:${value};'>${label}</span><code class='ae-Code'>${value}</code>",
        className: 'ae-selection-code'
      },
      pipIn: defaultValue('default'),
      options: [{
        label: i18n("18c63459a2c069022c7790430f761214"),
        value: 'default'
      }, {
        label: i18n("3aed2c11e95a9c0ea1d853d4aee72e8c"),
        value: 'auto'
      }, {
        label: i18n("2c3888961c01fc9c466d88c88029158f"),
        value: 'none'
      }, {
        label: i18n("062d0b688adb10f3af5ebc2fd2667f1c"),
        value: 'pointer'
      }, {
        label: i18n("92e3a830ae9a1252278da742c0af74c3"),
        value: 'help'
      }, {
        label: i18n("97d07614380da93d257f9fbf81aa56fb"),
        value: 'text'
      }, {
        label: i18n("1ebd0cd417700f3f4a7ee5f64518fcd1"),
        value: 'cell'
      }, {
        label: i18n("87e277f953fd3c867d7fa02897c2c124"),
        value: 'crosshair'
      }, {
        label: i18n("c19639326396d2527268484379a671d8"),
        value: 'move'
      }, {
        label: i18n("710ad08b11419332713360d2750cd707"),
        value: 'not-allowed'
      }, {
        label: i18n("183f48b3c1f0f84e538cd4315e5645e9"),
        value: 'grab'
      }, {
        label: i18n("4f9b192ce84b4df0900510257082ef43"),
        value: 'zoom-in'
      }, {
        label: i18n("b21ac25366449b1720bdd75d39f163d2"),
        value: 'zoom-out'
      }]
    }]
  }].filter(function (item) {
    return include.length ? ~include.indexOf(item.key) : !~exclude.indexOf(item.key);
  });
});
/**
 * 宽高配置控件
 * @param {object | undefined} options witdthSchema(宽度控件配置) heightSchema(高度控件配置)
 */
setSchemaTpl('style:widthHeight', function (option) {
  if (option === void 0) {
    option = {};
  }
  var _a = option.widthSchema,
    widthSchema = _a === void 0 ? {} : _a,
    _b = option.heightSchema,
    heightSchema = _b === void 0 ? {} : _b;
  return {
    type: 'container',
    body: [__assign({
      type: 'input-number',
      name: 'width',
      label: i18n("c28479019e24e0e4745f4948e9e97ee7"),
      unitOptions: ['px', '%', 'rem', 'em', 'vw']
    }, widthSchema), __assign({
      type: 'input-number',
      name: 'height',
      label: i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
      unitOptions: ['px', '%', 'rem', 'em', 'vh']
    }, heightSchema)]
  };
});
/**
 * 样式相关的属性面板，因为预计会比较多所以拆出来
 */
({
  name: 'style',
  type: 'combo',
  label: '',
  noBorder: true,
  multiLine: true,
  items: [{
    type: 'fieldSet',
    title: i18n("ca746b1ff10193a3ce20878dec04a733"),
    body: [{
      type: 'group',
      body: [{
        label: i18n("93ab99d761c9ca97dc926e6db10469a3"),
        type: 'input-text',
        name: 'fontSize'
      }, {
        label: i18n("86cdd659decaa1b959795eff92a0c2d6"),
        name: 'fontWeight',
        type: 'select',
        options: ['normal', 'bold', 'lighter', 'bolder']
      }]
    }, {
      type: 'group',
      body: [{
        label: i18n("7ec907e7059b758ace2f3adb9bb803ff"),
        type: 'input-color',
        name: 'color'
      }, {
        label: i18n("d5bc35360607472de4525358af126de4"),
        name: 'textAlign',
        type: 'select',
        options: ['left', 'right', 'center', 'justify', 'justify-all', 'start', 'end', 'match-parent']
      }]
    }]
  }, {
    type: 'fieldSet',
    title: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
    body: [{
      label: i18n("6b36c6f7ec834692ec6c8e3816349fdd"),
      name: 'backgroundColor',
      type: 'input-color'
    }, getSchemaTpl('imageUrl', {
      name: 'backgroundImage'
    })]
  }, {
    type: 'fieldSet',
    title: i18n("e8ed49e9fde0bb778e2185876c2d2697"),
    body: [{
      type: 'group',
      label: i18n("4e7f76261f8c4c6d78998f85fc1f4c6e"),
      body: [{
        label: i18n("af767b7e4ae069d54f9ea839858d4c6d"),
        name: 'marginTop',
        type: 'input-text'
      }, {
        label: i18n("4d9c32c23df5d234e629c922c58d8e12"),
        name: 'marginRight',
        type: 'input-text'
      }, {
        label: i18n("3850a186c3235bc646d4c2f79cebac36"),
        name: 'marginBottom',
        type: 'input-text'
      }, {
        label: i18n("d2aff1417831aa621c16cd5b95306b4b"),
        name: 'marginLeft',
        type: 'input-text'
      }]
    }, {
      type: 'group',
      label: i18n("841d77223f0ec8cd0b530ed8e0775b20"),
      body: [{
        label: i18n("af767b7e4ae069d54f9ea839858d4c6d"),
        name: 'paddingTop',
        type: 'input-text'
      }, {
        label: i18n("4d9c32c23df5d234e629c922c58d8e12"),
        name: 'paddingRight',
        type: 'input-text'
      }, {
        label: i18n("3850a186c3235bc646d4c2f79cebac36"),
        name: 'paddingBottom',
        type: 'input-text'
      }, {
        label: i18n("d2aff1417831aa621c16cd5b95306b4b"),
        name: 'paddingLeft',
        type: 'input-text'
      }]
    }]
  }, {
    type: 'fieldSet',
    title: i18n("961534b4ea37e4e88aada736b299d063"),
    body: [{
      type: 'group',
      body: [{
        label: i18n("39003734d1d700d5bd97bf1e7a2fcf73"),
        name: 'borderStyle',
        type: 'select',
        options: ['none', 'solid', 'dotted', 'dashed']
      }, {
        label: i18n("6b36c6f7ec834692ec6c8e3816349fdd"),
        name: 'borderColor',
        type: 'input-color'
      }]
    }, {
      type: 'group',
      body: [{
        label: i18n("c28479019e24e0e4745f4948e9e97ee7"),
        name: 'borderWidth',
        type: 'input-text'
      }, {
        label: i18n("b5bd9a6703f5433ff34aa0af9049740c"),
        name: 'borderRadius',
        type: 'input-text'
      }]
    }]
  }, {
    type: 'fieldSet',
    title: i18n("14eb3a698316caf3fbe9b2ab9c3d9527"),
    body: [{
      label: i18n("34dac4adbc96afd65f060cc4cfff1feb"),
      name: 'opacity',
      min: 0,
      max: 1,
      step: 0.05,
      type: 'input-range',
      pipeIn: defaultValue(1)
    }, {
      label: i18n("803205e38834280d9e6a75993ac00764"),
      name: 'boxShadow',
      type: 'input-text'
    }]
  }]
});
/**
 * 新版主题
 */
// css类名
setSchemaTpl('theme:cssCode', function () {
  return {
    title: i18n("f01c3cd99ecb0c534cc47081d3433c9f"),
    body: [{
      type: 'theme-cssCode',
      label: false
    }]
  };
});
// form label
setSchemaTpl('theme:form-label', function () {
  return {
    title: i18n("7e8eb474f73b6fd60c9aa5082f75e008"),
    body: [getSchemaTpl('theme:select', {
      label: i18n("c28479019e24e0e4745f4948e9e97ee7"),
      name: 'labelWidth'
    }), getSchemaTpl('theme:font', {
      label: i18n("ca746b1ff10193a3ce20878dec04a733"),
      name: 'themeCss.labelClassName.font:default',
      editorThemePath: 'form.item.default.label.body.font'
    }), getSchemaTpl('theme:paddingAndMargin', {
      name: 'themeCss.labelClassName.padding-and-margin:default'
    })]
  };
});
// form description
setSchemaTpl('theme:form-description', function () {
  return {
    title: i18n("ef55ff12fb0d3efa3491236fee4dabc2"),
    visibleOn: 'this.description',
    body: [getSchemaTpl('theme:font', {
      label: i18n("ca746b1ff10193a3ce20878dec04a733"),
      name: 'themeCss.descriptionClassName.font:default',
      editorThemePath: 'form.item.default.description.body.font'
    }), getSchemaTpl('theme:paddingAndMargin', {
      name: 'themeCss.descriptionClassName.padding-and-margin:default'
    })]
  };
});
// 带提示的值输入框
setSchemaTpl('theme:select', function (option) {
  if (option === void 0) {
    option = {};
  }
  return __assign({
    mode: 'horizontal',
    type: 'amis-theme-select',
    label: i18n("58f966670529f4753fb3c5a0647606be"),
    name: "themeCss.className.select:default",
    options: '${sizesOptions}'
  }, option);
});
// 文字编辑器
setSchemaTpl('theme:font', function (option) {
  if (option === void 0) {
    option = {};
  }
  return __assign({
    mode: 'default',
    type: 'amis-theme-font-editor',
    label: i18n("ca746b1ff10193a3ce20878dec04a733"),
    name: "themeCss.className.font:default",
    needColorCustom: true
  }, option);
});
// 颜色选择器
setSchemaTpl('theme:colorPicker', function (option) {
  if (option === void 0) {
    option = {};
  }
  return __assign({
    mode: 'default',
    type: 'amis-theme-color-picker',
    label: i18n("6b36c6f7ec834692ec6c8e3816349fdd"),
    name: "themeCss.className.color:default",
    needCustom: true
  }, option);
});
// 边框选择器
setSchemaTpl('theme:border', function (option) {
  if (option === void 0) {
    option = {};
  }
  return __assign({
    mode: 'default',
    type: 'amis-theme-border',
    label: i18n("961534b4ea37e4e88aada736b299d063"),
    name: "themeCss.className.border:default",
    needColorCustom: true
  }, option);
});
// 边距选择器
setSchemaTpl('theme:paddingAndMargin', function (option) {
  if (option === void 0) {
    option = {};
  }
  return __assign({
    mode: 'default',
    type: 'amis-theme-padding-and-margin',
    label: i18n("e8ed49e9fde0bb778e2185876c2d2697"),
    name: "themeCss.className.padding-and-margin:default"
  }, option);
});
// 圆角选择器
setSchemaTpl('theme:radius', function (option) {
  if (option === void 0) {
    option = {};
  }
  return __assign({
    mode: 'default',
    type: 'amis-theme-radius',
    label: i18n("0103eb2d3dca70270d1a74e9ec987ac9"),
    name: "themeCss.className.radius:default"
  }, option);
});
// 阴影选择器
setSchemaTpl('theme:shadow', function (option) {
  if (option === void 0) {
    option = {};
  }
  return __assign({
    type: 'amis-theme-shadow-editor',
    label: false,
    name: "themeCss.className.boxShadow:default",
    hasSenior: true
  }, option);
});
// 尺寸选择器
setSchemaTpl('theme:size', function (option) {
  if (option === void 0) {
    option = {};
  }
  return __assign({
    mode: 'default',
    type: 'amis-theme-size-editor',
    label: false,
    name: "themeCss.className.size:default",
    options: '${sizesOptions}',
    hideMinWidth: true
  }, option);
});
setSchemaTpl('theme:base', function (option) {
  var _a = option.collapsed,
    collapsed = _a === void 0 ? false : _a,
    _b = option.extra,
    extra = _b === void 0 ? [] : _b,
    _c = option.classname,
    classname = _c === void 0 ? 'baseControlClassName' : _c,
    _d = option.title,
    title = _d === void 0 ? i18n("6f99b6eed37795cb97d5f6370c32113b") : _d,
    hiddenOn = option.hiddenOn,
    hidePaddingAndMargin = option.hidePaddingAndMargin;
  var curHidePaddingAndMargin = hidePaddingAndMargin !== null && hidePaddingAndMargin !== void 0 ? hidePaddingAndMargin : false;
  var styleStateFunc = function (visibleOn, state) {
    return [getSchemaTpl('theme:border', {
      visibleOn: visibleOn,
      name: "themeCss.".concat(classname, ".border:").concat(state)
    }), getSchemaTpl('theme:radius', {
      visibleOn: visibleOn,
      name: "themeCss.".concat(classname, ".radius:").concat(state)
    }), !curHidePaddingAndMargin ? getSchemaTpl('theme:paddingAndMargin', {
      visibleOn: visibleOn,
      name: "themeCss.".concat(classname, ".padding-and-margin:").concat(state)
    }) : null, getSchemaTpl('theme:colorPicker', {
      visibleOn: visibleOn,
      name: "themeCss.".concat(classname, ".background:").concat(state),
      label: i18n("8e1b944f4389bdaab6f11d5bc83190c8"),
      needCustom: true,
      needGradient: true,
      needImage: true,
      labelMode: 'input'
    }), getSchemaTpl('theme:shadow', {
      visibleOn: visibleOn,
      name: "themeCss.".concat(classname, ".boxShadow:").concat(state)
    })].filter(function (item) {
      return item;
    }).concat(extra.map(function (item) {
      return __assign(__assign({}, item), {
        visibleOn: visibleOn,
        name: "".concat(item.name, ":").concat(state)
      });
    }));
  };
  var styles = __spreadArray(__spreadArray(__spreadArray([{
    type: 'select',
    name: 'editorState',
    label: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
    selectFirst: true,
    options: [{
      label: i18n("22b777e6fcb613b8ba83ced9594cd07e"),
      value: 'default'
    }, {
      label: i18n("062d0b688adb10f3af5ebc2fd2667f1c"),
      value: 'hover'
    }, {
      label: i18n("4363c17ebb346b646af55bd8c8075915"),
      value: 'active'
    }]
  }], __read(styleStateFunc("${editorState == 'default' || !editorState}", 'default')), false), __read(styleStateFunc("${editorState == 'hover'}", 'hover')), false), __read(styleStateFunc("${editorState == 'active'}", 'active')), false);
  return {
    title: title,
    collapsed: collapsed,
    body: styles,
    hiddenOn: hiddenOn
  };
});
setSchemaTpl('theme:common', function (option) {
  var _a = option || {},
    exclude = _a.exclude,
    collapsed = _a.collapsed,
    _b = _a.extra,
    extra = _b === void 0 ? [] : _b,
    baseExtra = _a.baseExtra,
    layoutExtra = _a.layoutExtra,
    classname = _a.classname,
    baseTitle = _a.baseTitle,
    hidePaddingAndMargin = _a.hidePaddingAndMargin;
  var curCollapsed = collapsed !== null && collapsed !== void 0 ? collapsed : false; // 默认都展开
  // key统一转换成Kebab case，eg: boxShadow => bos-shadow
  exclude = (exclude ? Array.isArray(exclude) ? exclude : [exclude] : []).map(function (key) {
    return kebabCase(key);
  });
  return __spreadArray(__spreadArray([{
    header: i18n("5aefca559c5a41d10078e21e6d616825"),
    key: 'layout',
    collapsed: curCollapsed,
    body: [{
      type: 'style-display',
      label: false,
      name: 'style'
    }].filter(function (comp) {
      return !~exclude.indexOf(comp.type.replace(/^style-/i, ''));
    }).concat(layoutExtra || [])
  }, getSchemaTpl('theme:base', {
    collapsed: curCollapsed,
    extra: baseExtra,
    classname: classname,
    title: baseTitle,
    hidePaddingAndMargin: hidePaddingAndMargin
  })], __read(extra), false), [{
    title: i18n("f01c3cd99ecb0c534cc47081d3433c9f"),
    collapsed: curCollapsed,
    body: [{
      type: 'theme-cssCode',
      label: false
    }]
  }], false).filter(function (item) {
    return !~exclude.indexOf(item.key || '');
  });
});
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
