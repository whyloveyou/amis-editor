/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __assign } from 'tslib';
import { setSchemaTpl, tipedLabel, defaultValue } from 'amis-editor-core';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import compact from 'lodash/compact';
import { i18n } from 'i18n-runtime';

var LayoutUnitOptions = ['px', '%', 'em', 'vh', 'vw'];
// 定位模式
setSchemaTpl('layout:position', function (config) {
  var configSchema = {
    type: 'select',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("b19b454fe603e03e98ad9772615c7c32"), i18n("8444f01399c0003fbb68eeff1310566c")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.position',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'static',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    onChange: function (value, oldValue, model, form) {
      if (value === 'static') {
        form.setValueByName('style.inset', undefined);
        form.setValueByName('style.zIndex', undefined);
        form.setValueByName('originPosition', undefined);
      } else if (value === 'fixed' || value === 'absolute') {
        // 默认使用右下角进行相对定位
        form.setValueByName('style.inset', 'auto 50px 50px auto');
        form.setValueByName('originPosition', 'right-bottom');
      } else if (value === 'relative') {
        form.setValueByName('style.inset', 'auto');
        form.setValueByName('originPosition', undefined);
      }
      if (value !== 'sticky') {
        // 非滚动吸附定位
        form.setValueByName('stickyStatus', undefined);
      }
    },
    options: [{
      label: i18n("aae5ccb98564e19c48f19c740c3c10b7"),
      value: 'static'
    }, {
      label: i18n("5d721446605f21bddb3b8e2ab2a3841c"),
      value: 'relative'
    }, {
      label: i18n("b55b525d56fd0d4d3dcb9291e59e3433"),
      value: 'fixed'
    }, {
      label: i18n("25ece43050dda20ad4d8dd058dd590d1"),
      value: 'absolute'
    }]
  };
  if ((config === null || config === void 0 ? void 0 : config.mode) === 'vertical') {
    // 上下展示，可避免 自定义渲染器 出现挤压
    return {
      type: 'group',
      mode: 'vertical',
      visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
      body: [__assign({}, configSchema)]
    };
  } else {
    // 默认左右展示
    return configSchema;
  }
});
// inset 配置:
setSchemaTpl('layout:inset', function (config) {
  var _a;
  var configSchema = {
    type: 'inset-box-model',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("86a6b5a0a45bba5b6187cc2277e3375e"), i18n("6e72759ed1cbf9f9e8523197dd93888f")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.inset',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'auto',
    visibleOn: (_a = config === null || config === void 0 ? void 0 : config.visibleOn) !== null && _a !== void 0 ? _a : 'data.style && data.style.position && data.style.position !== "static"',
    pipeIn: function (value) {
      var curValue = value || 'auto';
      if (isNumber(curValue)) {
        curValue = curValue.toString();
      }
      if (!isString(curValue)) {
        curValue = '0';
      }
      var inset = curValue.split(' ');
      return {
        insetTop: inset[0] || 'auto',
        insetRight: inset[1] || 'auto',
        insetBottom: inset[2] || inset[0] || 'auto',
        insetLeft: inset[3] || inset[1] || 'auto'
      };
    },
    pipeOut: function (value) {
      var _a, _b, _c, _d;
      return "".concat((_a = value.insetTop) !== null && _a !== void 0 ? _a : 'auto', " ").concat((_b = value.insetRight) !== null && _b !== void 0 ? _b : 'auto', " ").concat((_c = value.insetBottom) !== null && _c !== void 0 ? _c : 'auto', " ").concat((_d = value.insetLeft) !== null && _d !== void 0 ? _d : 'auto');
    }
  };
  if ((config === null || config === void 0 ? void 0 : config.mode) === 'vertical') {
    // 上下展示，可避免 自定义渲染器 出现挤压
    return {
      type: 'group',
      mode: 'vertical',
      visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
      body: [__assign({}, configSchema)]
    };
  } else {
    // 默认左右展示
    return configSchema;
  }
});
// z-index 配置:
setSchemaTpl('layout:z-index', function (config) {
  var _a;
  var configSchema = {
    type: 'input-number',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("8e903bee4578f72bbecf9eb62d7b875c"), i18n("6f649980c839dffca1506f20d534fe3d")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.zIndex',
    value: config === null || config === void 0 ? void 0 : config.value,
    visibleOn: (_a = config === null || config === void 0 ? void 0 : config.visibleOn) !== null && _a !== void 0 ? _a : 'data.style && data.style.position && data.style.position !== "static"',
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut
  };
  if ((config === null || config === void 0 ? void 0 : config.mode) === 'vertical') {
    // 上下展示，可避免 自定义渲染器 出现挤压
    return {
      type: 'group',
      mode: 'vertical',
      visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
      body: [__assign({}, configSchema)]
    };
  } else {
    // 默认左右展示
    return configSchema;
  }
});
// 显示类型
setSchemaTpl('layout:display', function (config) {
  var configOptions = compact([{
    label: i18n("10710f1c01d960a3ffde384115296026"),
    icon: 'block-display',
    value: 'block'
  }, {
    label: i18n("26b10072a4e0c8c9a3a1142db3d7b3b4"),
    icon: 'inline-block-display',
    value: 'inline-block'
  }, {
    label: i18n("2c7fe494c99c94ba5965f963fd7d3a4c"),
    icon: 'inline-display',
    value: 'inline'
  }, !(config === null || config === void 0 ? void 0 : config.flexHide) && {
    label: i18n("39353c2b258e4bc73d8dd6a46f0a7955"),
    icon: 'flex-display',
    value: 'flex'
  }]);
  var configSchema = {
    type: 'icon-button-group',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("a5d833839a610994dc4752e2d91f4192"), i18n("a8489cf57d7f44e889aff79434776f47")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.display',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'block',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    options: configOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    onChange: function (value, oldValue, model, form) {
      if (value !== 'flex' && value !== 'inline-flex') {
        form.setValueByName('style.flexDirection', undefined);
        form.setValueByName('style.justifyContent', undefined);
        form.setValueByName('style.alignItems', undefined);
        form.setValueByName('style.flexWrap', undefined);
      }
    }
  };
  if ((config === null || config === void 0 ? void 0 : config.mode) === 'vertical') {
    // 上下展示，可避免 自定义渲染器 出现挤压
    return {
      type: 'group',
      mode: 'vertical',
      visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
      body: [__assign({}, configSchema)]
    };
  } else {
    // 默认左右展示
    return configSchema;
  }
});
// 主轴排列方向
setSchemaTpl('layout:justifyContent', function (config) {
  var defaultOptions = [{
    label: i18n("4ba6c2256050d805ae5cd1e0e84737cf"),
    value: 'flex-start'
  }, {
    label: i18n("56c17ba6a56c01706ae00a31611deb03"),
    value: 'center'
  }, {
    label: i18n("abeb360ab1e66534a041fb8b44e1a00e"),
    value: 'flex-end'
  }, {
    label: i18n("d5a3cb1cc31a0469b011abdbd3e947f7"),
    value: 'space-around'
  }, {
    label: i18n("85530444a72a840ee657e2df99970136"),
    value: 'space-between'
  }, {
    label: i18n("9aad08fbd356fb4279f0efa81b3d016e"),
    value: 'space-evenly'
  }, {
    label: i18n("ae558cbf4c35d381b6542f517f2e8dff"),
    value: 'stretch'
  }];
  var configSchema = {
    type: 'select',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("dde193342b8c350ae29795117c0c5b9a"), i18n("0a0574baedb8eb2abf7daf25159d8bb1")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.justifyContent',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'flex-start',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    options: (config === null || config === void 0 ? void 0 : config.options) || defaultOptions
  };
  if ((config === null || config === void 0 ? void 0 : config.mode) === 'vertical') {
    // 上下展示，可避免 自定义渲染器 出现挤压
    return {
      type: 'group',
      mode: 'vertical',
      visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
      body: [__assign({}, configSchema)]
    };
  } else {
    // 默认左右展示
    return configSchema;
  }
});
// 交叉轴排列方向
setSchemaTpl('layout:alignItems', function (config) {
  var defaultOptions = [{
    label: i18n("4ba6c2256050d805ae5cd1e0e84737cf"),
    value: 'flex-start'
  }, {
    label: i18n("56c17ba6a56c01706ae00a31611deb03"),
    value: 'center'
  }, {
    label: i18n("abeb360ab1e66534a041fb8b44e1a00e"),
    value: 'flex-end'
  }, {
    label: i18n("ed97c73866617b40a7b1215867e0f489"),
    value: 'baseline'
  }, {
    label: i18n("7ac1519928de413cfe36f5d2e0610430"),
    value: 'stretch'
  }];
  var configSchema = {
    type: 'select',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("5b15af1f73b4f2d5bb152410863602f4"), i18n("5ccc4c05cd41195f202f550a4c307a64")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.alignItems',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'stretch',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    options: (config === null || config === void 0 ? void 0 : config.options) || defaultOptions
  };
  if ((config === null || config === void 0 ? void 0 : config.mode) === 'vertical') {
    return {
      type: 'group',
      mode: 'vertical',
      visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
      body: [__assign({}, configSchema)]
    };
  } else {
    return configSchema;
  }
});
// 排列方向
setSchemaTpl('layout:flexDirection', function (config) {
  var configSchema = {
    type: 'select',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("78d32d2bd35c0262fe77b517c5a4fb62"), i18n("3fa460b81736c0360f6f7571801935b1")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.flexDirection',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'row',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    options: [{
      label: i18n("4cde06e6162ed66720e3133cb83bc059"),
      value: 'row'
    }, {
      label: i18n("fa228d6bec96d052de0ad369407f5241"),
      value: 'row-reverse'
    }, {
      label: i18n("75ac842f8e77305846f1d776f97dfaf8"),
      value: 'column'
    }, {
      label: i18n("2df3bc66ab3fcb0de1caf11831eff595"),
      value: 'column-reverse'
    }]
  };
  if ((config === null || config === void 0 ? void 0 : config.mode) === 'vertical') {
    // 上下展示，可避免 自定义渲染器 出现挤压
    return {
      type: 'group',
      mode: 'vertical',
      visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
      body: [__assign({}, configSchema)]
    };
  } else {
    // 默认左右展示
    return configSchema;
  }
});
// 如何换行
setSchemaTpl('layout:flex-wrap', function (config) {
  return {
    type: 'select',
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("98b2fea2d8f3ceb81e9ce32d66383f05"),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.flexWrap',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'nowrap',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    options: [{
      label: i18n("3b6e8d54b7b2ae890d5357b7eaaeaaf2"),
      value: 'nowrap'
    }, {
      label: i18n("452dba7c65211630f8066b070fdf157f"),
      value: 'wrap'
    }, {
      label: i18n("d4054144c4341872496e3550fdb1b826"),
      value: 'wrap-reverse'
    }]
  };
});
// 弹性模式
setSchemaTpl('layout:flex', function (config) {
  return {
    type: 'button-group-select',
    size: 'xs',
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.flex',
    options: [{
      label: i18n("091885db07e43ff7cbe60c3b664b0b50"),
      value: '1 1 auto'
    }, {
      label: i18n("1ef8fd21130d17cb7c1613eaed6ca1e4"),
      value: '0 0 150px'
    }, {
      label: i18n("363165ccee78341a65f1d42174e8b08f"),
      value: '0 0 auto'
    }],
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("eb44269adb6ba70569cd62ea88cb2750"),
    value: (config === null || config === void 0 ? void 0 : config.value) || '0 0 auto',
    inputClassName: 'inline-flex justify-between',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    onChange: function (value, oldValue, model, form) {
      if (value === '1 1 auto') {
        // 弹性
        if (config === null || config === void 0 ? void 0 : config.isFlexColumnItem) {
          // form.setValueByName('style.overflowY', 'auto');
          form.setValueByName('style.height', undefined);
        } else {
          // form.setValueByName('style.overflowX', 'auto');
          form.setValueByName('style.width', undefined);
        }
      } else if (value === '0 0 150px') {
        // 固定
        form.setValueByName('style.flexGrow', undefined);
        form.setValueByName('style.flexBasis', '150px');
        if (config === null || config === void 0 ? void 0 : config.isFlexColumnItem) {
          form.setValueByName('style.height', undefined);
        } else {
          form.setValueByName('style.width', undefined);
        }
      } else if (value === '0 0 auto') {
        // 适配
        form.setValueByName('style.flexGrow', undefined);
        form.setValueByName('style.flexBasis', undefined);
        form.setValueByName('style.overflowX', undefined);
        form.setValueByName('style.overflowY', undefined);
        form.setValueByName('style.overflow', undefined);
        if (config === null || config === void 0 ? void 0 : config.isFlexColumnItem) {
          form.setValueByName('style.height', undefined);
        } else {
          form.setValueByName('style.width', undefined);
        }
      }
    }
  };
});
// flex-basis设置
setSchemaTpl('layout:flex-basis', function (config) {
  var _a;
  return {
    type: 'input-number',
    label: tipedLabel((config === null || config === void 0 ? void 0 : config.label) || i18n("cf8852316501c22ea19c4e432c59e7d7"), i18n("abbd790f85282349e2004df9fd494e31")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.flexBasis',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'auto',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    clearable: true,
    unitOptions: (_a = config === null || config === void 0 ? void 0 : config.unitOptions) !== null && _a !== void 0 ? _a : LayoutUnitOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    // pipeOut: config?.pipeOut,
    pipeOut: function (value) {
      var curValue = parseInt(value);
      if (value === 'auto' || curValue || curValue === 0) {
        return value;
      } else {
        return undefined;
      }
    }
  };
});
// flex-grow 弹性比例
setSchemaTpl('layout:flex-grow', function (config) {
  return {
    type: 'input-range',
    max: 12,
    step: 1,
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("9e7c8d1554f6449121a83f951cf21ca1"), i18n("eb7366583485f478e3d8c2b105ea51ff")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.flexGrow',
    value: (config === null || config === void 0 ? void 0 : config.value) || 1,
    visibleOn: (config === null || config === void 0 ? void 0 : config.visibleOn) || 'data.style && data.style.flex !== "0 0 auto"',
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut
  };
});
// 是否固定宽度: isFixedWidth 配置:
setSchemaTpl('layout:isFixedWidth', function (config) {
  var _a;
  return {
    type: 'button-group-select',
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("a170a375b264f7fe0c02a7ca8c268784"),
    size: 'xs',
    name: (config === null || config === void 0 ? void 0 : config.name) || 'isFixedWidth',
    options: [{
      label: i18n("1ef8fd21130d17cb7c1613eaed6ca1e4"),
      value: true
    }, {
      label: i18n("363165ccee78341a65f1d42174e8b08f"),
      value: false
    }],
    value: (_a = config === null || config === void 0 ? void 0 : config.value) !== null && _a !== void 0 ? _a : false,
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    inputClassName: 'inline-flex justify-between',
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    onChange: function (value, oldValue, model, form) {
      if (value) {
        // 固定宽度时，剔除最大宽度、最小宽度
        form.setValueByName('style.maxWidth', undefined);
        form.setValueByName('style.minWidth', undefined);
      } else {
        // 非固定宽度时，剔除宽度数值
        form.setValueByName('style.width', undefined);
      }
      if (config === null || config === void 0 ? void 0 : config.onChange) {
        config.onChange(value);
      }
    }
  };
});
// 宽度设置
setSchemaTpl('layout:width', function (config) {
  var _a;
  return {
    type: 'input-number',
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("c28479019e24e0e4745f4948e9e97ee7"),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.width',
    value: (config === null || config === void 0 ? void 0 : config.value) || '300px',
    visibleOn: (config === null || config === void 0 ? void 0 : config.visibleOn) ? "".concat(config === null || config === void 0 ? void 0 : config.visibleOn, " && data.isFixedWidth") : 'data.isFixedWidth',
    clearable: true,
    unitOptions: (_a = config === null || config === void 0 ? void 0 : config.unitOptions) !== null && _a !== void 0 ? _a : LayoutUnitOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    // pipeOut: config?.pipeOut,
    pipeOut: function (value) {
      var curValue = parseInt(value);
      if (value === 'auto' || curValue || curValue === 0) {
        return value;
      } else {
        return undefined;
      }
    }
  };
});
// 宽度设置(不关联固定宽度配置项)
setSchemaTpl('layout:width:v2', function (config) {
  var _a;
  return {
    type: 'input-number',
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("c28479019e24e0e4745f4948e9e97ee7"),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.width',
    value: (config === null || config === void 0 ? void 0 : config.value) || '300px',
    visibleOn: (config === null || config === void 0 ? void 0 : config.visibleOn) || true,
    clearable: true,
    unitOptions: (_a = config === null || config === void 0 ? void 0 : config.unitOptions) !== null && _a !== void 0 ? _a : LayoutUnitOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    // pipeOut: config?.pipeOut,
    pipeOut: function (value) {
      var curValue = parseInt(value);
      if (value === 'auto' || curValue || curValue === 0) {
        return value;
      } else {
        return undefined;
      }
    }
  };
});
// 最大宽度设置
setSchemaTpl('layout:max-width', function (config) {
  var _a;
  return {
    type: 'input-number',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("99b57d8c9244ff9a695fcd519b4e2e57"), i18n("d1b91a1a24f0d4935c2dd13e6a22b6d4")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.maxWidth',
    value: config === null || config === void 0 ? void 0 : config.value,
    min: '${style.minWidth | toInt}',
    visibleOn: (config === null || config === void 0 ? void 0 : config.visibleOn) ? "".concat(config === null || config === void 0 ? void 0 : config.visibleOn, " && !data.isFixedWidth") : '!data.isFixedWidth',
    clearable: true,
    unitOptions: (_a = config === null || config === void 0 ? void 0 : config.unitOptions) !== null && _a !== void 0 ? _a : LayoutUnitOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    // pipeOut: config?.pipeOut
    pipeOut: function (value) {
      var curValue = parseInt(value);
      if (value === 'auto' || curValue || curValue === 0) {
        return value;
      } else {
        return undefined;
      }
    }
  };
});
// 最小宽度设置
setSchemaTpl('layout:min-width', function (config) {
  var _a;
  return {
    type: 'input-number',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("a2b62974f4d7564bb68b570116f25a10"), i18n("ede82efb4a69c35743185c6c73ab771e")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.minWidth',
    value: config === null || config === void 0 ? void 0 : config.value,
    max: '${style.maxWidth | toInt}',
    visibleOn: (config === null || config === void 0 ? void 0 : config.visibleOn) ? "".concat(config === null || config === void 0 ? void 0 : config.visibleOn, " && !data.isFixedWidth") : '!data.isFixedWidth',
    clearable: true,
    unitOptions: (_a = config === null || config === void 0 ? void 0 : config.unitOptions) !== null && _a !== void 0 ? _a : LayoutUnitOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    // pipeOut: config?.pipeOut
    pipeOut: function (value) {
      var curValue = parseInt(value);
      if (value === 'auto' || curValue || curValue === 0) {
        return value;
      } else {
        return undefined;
      }
    }
  };
});
// x轴（水平轴）滚动模式
setSchemaTpl('layout:overflow-x', function (config) {
  return {
    type: 'select',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("c18457fe4f249f06b48297ccfe6224e8"), i18n("c2ed47a1f0f45cf7e2d22bddffc8a732")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.overflowX',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'visible',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    options: [{
      label: i18n("cbc7af1d6422e88f4b87ade748e0f07d"),
      value: 'visible'
    }, {
      label: i18n("b48a90c77b5e792260d830c2d68c527e"),
      value: 'hidden'
    }, {
      label: i18n("ddea62517e2bd1007712689746ebfe00"),
      value: 'scroll'
    }, {
      label: i18n("55becc96b40692cc9cf898b331d16976"),
      value: 'auto'
    }]
  };
});
// 是否固定高度: isFixedHeight 配置:
setSchemaTpl('layout:isFixedHeight', function (config) {
  var _a;
  return {
    type: 'button-group-select',
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("f02f876ee64cc016d97fa4dc498d4857"),
    size: 'xs',
    name: (config === null || config === void 0 ? void 0 : config.name) || 'isFixedHeight',
    options: [{
      label: i18n("1ef8fd21130d17cb7c1613eaed6ca1e4"),
      value: true
    }, {
      label: i18n("363165ccee78341a65f1d42174e8b08f"),
      value: false
    }],
    value: (_a = config === null || config === void 0 ? void 0 : config.value) !== null && _a !== void 0 ? _a : false,
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    inputClassName: 'inline-flex justify-between',
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    onChange: function (value, oldValue, model, form) {
      if (value) {
        // 固定高度时，剔除最大高度、最小高度
        form.setValueByName('style.maxHeight', undefined);
        form.setValueByName('style.minHeight', undefined);
      } else {
        // 非固定高度时，剔除高度数值
        form.setValueByName('style.height', undefined);
      }
      if (config === null || config === void 0 ? void 0 : config.onChange) {
        config.onChange(value);
      }
    }
  };
});
// 高度设置
setSchemaTpl('layout:height', function (config) {
  var _a;
  return {
    type: 'input-number',
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("c1df04eec5fa0857bc0df2d68d8e953c"),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.height',
    value: (config === null || config === void 0 ? void 0 : config.value) || '300px',
    visibleOn: (config === null || config === void 0 ? void 0 : config.visibleOn) ? "".concat(config === null || config === void 0 ? void 0 : config.visibleOn, " && data.isFixedHeight") : 'data.isFixedHeight',
    clearable: true,
    unitOptions: (_a = config === null || config === void 0 ? void 0 : config.unitOptions) !== null && _a !== void 0 ? _a : LayoutUnitOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    // pipeOut: config?.pipeOut
    pipeOut: function (value) {
      var curValue = parseInt(value);
      if (value === 'auto' || curValue || curValue === 0) {
        return value;
      } else {
        return undefined;
      }
    }
  };
});
// 最大高度设置
setSchemaTpl('layout:max-height', function (config) {
  var _a;
  return {
    type: 'input-number',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("fc2bc4193eea63128961d09497e07dc8"), i18n("6f420734edfaff00a8210a4c762a9207")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.maxHeight',
    value: config === null || config === void 0 ? void 0 : config.value,
    min: '${style.minHeight | toInt}',
    visibleOn: (config === null || config === void 0 ? void 0 : config.visibleOn) ? "".concat(config === null || config === void 0 ? void 0 : config.visibleOn, " && !data.isFixedHeight") : '!data.isFixedHeight',
    clearable: true,
    unitOptions: (_a = config === null || config === void 0 ? void 0 : config.unitOptions) !== null && _a !== void 0 ? _a : LayoutUnitOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    // pipeOut: config?.pipeOut
    pipeOut: function (value) {
      var curValue = parseInt(value);
      if (value === 'auto' || curValue || curValue === 0) {
        return value;
      } else {
        return undefined;
      }
    }
  };
});
// 最小高度设置
setSchemaTpl('layout:min-height', function (config) {
  var _a;
  return {
    type: 'input-number',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("2bd921d0ea7a73b77ee0fcddb1afcc84"), i18n("0611733b53e0098e6fd880bd44b2806f")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.minHeight',
    value: config === null || config === void 0 ? void 0 : config.value,
    max: '${style.maxHeight | toInt}',
    visibleOn: (config === null || config === void 0 ? void 0 : config.visibleOn) ? "".concat(config === null || config === void 0 ? void 0 : config.visibleOn, " && !data.isFixedHeight") : '!data.isFixedHeight',
    clearable: true,
    unitOptions: (_a = config === null || config === void 0 ? void 0 : config.unitOptions) !== null && _a !== void 0 ? _a : LayoutUnitOptions,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    // pipeOut: config?.pipeOut
    pipeOut: function (value) {
      var curValue = parseInt(value);
      if (value === 'auto' || curValue || curValue === 0) {
        return value;
      } else {
        return undefined;
      }
    }
  };
});
// y轴（交叉轴）滚动模式
setSchemaTpl('layout:overflow-y', function (config) {
  return {
    type: 'select',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("ff9e9329fe186be342ef59ee711b9371"), i18n("b31c6aaa78f8e24df665ce80ab5301e2")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.overflowY',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'visible',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    options: [{
      label: i18n("cbc7af1d6422e88f4b87ade748e0f07d"),
      value: 'visible'
    }, {
      label: i18n("b48a90c77b5e792260d830c2d68c527e"),
      value: 'hidden'
    }, {
      label: i18n("ddea62517e2bd1007712689746ebfe00"),
      value: 'scroll'
    }, {
      label: i18n("55becc96b40692cc9cf898b331d16976"),
      value: 'auto'
    }]
  };
});
// 居中显示
setSchemaTpl('layout:margin-center', function (config) {
  var _a;
  return {
    type: 'button-group-select',
    size: 'xs',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("d5bc35360607472de4525358af126de4"), i18n("052f93928af33d4d7035e7c8e8a73f17")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style.margin',
    value: (config === null || config === void 0 ? void 0 : config.value) || '0',
    inputClassName: 'inline-flex justify-between',
    visibleOn: (_a = config === null || config === void 0 ? void 0 : config.visibleOn) !== null && _a !== void 0 ? _a : 'data.isFixedWidth || data.style && data.style.maxWidth',
    options: [{
      label: i18n("a738a8594bd2b71002d09277b84d86dd"),
      value: 'auto auto auto 0px'
    }, {
      label: i18n("0bbc2ea4e1d1f23feb576de5dca1ce3b"),
      value: '0px auto'
    }, {
      label: i18n("fc0f19e9e47e352d36d36cf6eb653210"),
      value: 'auto 0px auto auto'
    }],
    onChange: function (value, oldValue, model, form) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
      if (((_b = (_a = form === null || form === void 0 ? void 0 : form.data) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.position) === 'fixed' || ((_d = (_c = form === null || form === void 0 ? void 0 : form.data) === null || _c === void 0 ? void 0 : _c.style) === null || _d === void 0 ? void 0 : _d.position) === 'absolute') {
        // 吸附容器
        if (value === '0px auto') {
          // 居中
          if (((_e = form.data) === null || _e === void 0 ? void 0 : _e.sorptionPosition) === 'top') {
            // 吸顶
            form.setValueByName('style.inset', '0px auto auto 50%');
          } else if (((_f = form.data) === null || _f === void 0 ? void 0 : _f.sorptionPosition) === 'bottom') {
            // 吸底
            form.setValueByName('style.inset', 'auto auto 0px 50%');
          } else {
            form.setValueByName('style.inset', 'auto auto auto 50%');
          }
          form.setValueByName('style.transform', 'translateX(-50%)');
        } else if (value === 'auto 0px auto auto') {
          // 靠右
          if (((_g = form.data) === null || _g === void 0 ? void 0 : _g.sorptionPosition) === 'top') {
            // 吸顶
            form.setValueByName('style.inset', '0px 0px auto auto');
          } else if (((_h = form.data) === null || _h === void 0 ? void 0 : _h.sorptionPosition) === 'bottom') {
            // 吸底
            form.setValueByName('style.inset', 'auto 0px 0px auto');
          } else {
            form.setValueByName('style.inset', 'auto 0px auto auto');
          }
          form.setValueByName('style.transform', undefined);
        } else {
          // 靠左
          if (((_j = form.data) === null || _j === void 0 ? void 0 : _j.sorptionPosition) === 'top') {
            // 吸顶
            form.setValueByName('style.inset', '0px auto auto 0px');
          } else if (((_k = form.data) === null || _k === void 0 ? void 0 : _k.sorptionPosition) === 'bottom') {
            // 吸底
            form.setValueByName('style.inset', 'auto auto 0px 0px');
          } else {
            form.setValueByName('style.inset', 'auto auto auto 0px');
          }
          form.setValueByName('style.transform', undefined);
        }
      } else {
        // 靠左
        form.setValueByName('style.transform', undefined);
      }
    }
  };
});
//「参考位置」可设置为左上角、右上角、右下角、左下角，默认为“右下角”。
setSchemaTpl('layout:originPosition', function (config) {
  var _a;
  var configSchema = {
    type: 'select',
    label: (config === null || config === void 0 ? void 0 : config.label) || tipedLabel(i18n("7d1313925f158b747c094a7f2480e535"), i18n("41a7494315a528f0f9618646f7e0dddf")),
    name: (config === null || config === void 0 ? void 0 : config.name) || 'originPosition',
    value: (config === null || config === void 0 ? void 0 : config.value) || 'right-bottom',
    visibleOn: (_a = config === null || config === void 0 ? void 0 : config.visibleOn) !== null && _a !== void 0 ? _a : 'data.style && data.style.position && (data.style.position === "fixed" || data.style.position === "absolute")',
    pipeIn: config === null || config === void 0 ? void 0 : config.pipeIn,
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    options: [{
      label: i18n("df68a5dc8f8847179b7afdf943f80796"),
      value: 'left-top'
    }, {
      label: i18n("e717b4ae480e7c073fd5a44647a7f0da"),
      value: 'right-top'
    }, {
      label: i18n("845c61ac8f51c6702dd22e5657c07e8d"),
      value: 'right-bottom'
    }, {
      label: i18n("2a97dfb2d236c87c41fd588f006111dc"),
      value: 'left-bottom'
    }],
    onChange: function (value, oldValue, model, form) {
      if (value === 'right-bottom') {
        // 右下角
        form.setValueByName('style.inset', 'auto 50px 50px auto');
      } else if (value === 'left-top') {
        // 左上角
        form.setValueByName('style.inset', '50px auto auto 50px');
      } else if (value === 'right-top') {
        // 右上角
        form.setValueByName('style.inset', '50px 50px auto auto');
      } else if (value === 'left-bottom') {
        // 左下角
        form.setValueByName('style.inset', 'auto auto 50px 50px');
      }
    }
  };
  if ((config === null || config === void 0 ? void 0 : config.mode) === 'vertical') {
    return {
      type: 'group',
      mode: 'vertical',
      visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
      body: [__assign({}, configSchema)]
    };
  } else {
    return configSchema;
  }
});
// 吸附位置配置项
setSchemaTpl('layout:sorption', {
  type: 'button-group-select',
  label: i18n("7d30297d4e1f310c73b27be88c748026"),
  size: 'xs',
  name: 'sorptionPosition',
  options: [{
    label: i18n("2ea76e2ffc1b92911d6f7decfa993360"),
    value: 'top'
  }, {
    label: i18n("8cfc818a76662085cb64752d6d592fbe"),
    value: 'bottom'
  }],
  onChange: function (value, oldValue, model, form) {
    if (value === 'top') {
      form.setValueByName('style.inset', '0 auto auto 0');
    } else if (value === 'bottom') {
      form.setValueByName('style.inset', 'auto auto 0 0');
    }
  }
});
// 滚动吸附配置项
setSchemaTpl('layout:sticky', {
  type: 'switch',
  label: tipedLabel(i18n("e2f6535e21570a0703c7c65f41b30eaa"), i18n("1c5ea0ffb2b15713cb22c41a02576924")),
  name: 'stickyStatus',
  inputClassName: 'inline-flex justify-between',
  onChange: function (value, oldValue, model, form) {
    if (value) {
      form.setValueByName('style.position', 'sticky');
      form.setValueByName('style.inset', '0px auto auto auto');
      form.setValueByName('style.zIndex', 10);
    } else {
      form.setValueByName('style.position', 'static');
      form.setValueByName('style.inset', undefined);
      form.setValueByName('style.zIndex', undefined);
    }
  }
});
// 滚动吸附位置配置项
setSchemaTpl('layout:stickyPosition', {
  type: 'button-group-select',
  size: 'xs',
  label: tipedLabel(i18n("7d30297d4e1f310c73b27be88c748026"), i18n("5f9be0002394f0b58952969d5952e24c")),
  name: 'stickyPosition',
  visibleOn: 'data.stickyStatus',
  options: [{
    label: i18n("2ea76e2ffc1b92911d6f7decfa993360"),
    value: 'top'
  }, {
    label: i18n("8cfc818a76662085cb64752d6d592fbe"),
    value: 'bottom'
  }, {
    label: i18n("3aed2c11e95a9c0ea1d853d4aee72e8c"),
    value: 'auto'
  }],
  onChange: function (value, oldValue, model, form) {
    if (value === 'top') {
      form.setValueByName('style.inset', '0px auto auto auto');
    } else if (value === 'bottom') {
      form.setValueByName('style.inset', 'auto auto 0px auto');
    } else if (value === 'auto') {
      form.setValueByName('style.inset', '0px auto 0px auto');
    }
  }
});
// 默认内边距配置项
setSchemaTpl('layout:padding', function (config) {
  return {
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("c17fef27ea1d970fc66f4c4c3d442129"),
    type: 'button-group-select',
    name: (config === null || config === void 0 ? void 0 : config.name) || 'size',
    size: 'xs',
    mode: (config === null || config === void 0 ? void 0 : config.mode) || 'horizontal',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: (config === null || config === void 0 ? void 0 : config.pipeIn) || defaultValue(''),
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
    options: [{
      label: i18n("18c63459a2c069022c7790430f761214"),
      value: ''
    }, {
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
      label: i18n("d81bb206a889656035b929cd8bb1ef10"),
      value: 'none'
    }]
  };
});
// 内部水平对齐方式
setSchemaTpl('layout:textAlign', function (config) {
  return {
    label: (config === null || config === void 0 ? void 0 : config.label) || i18n("d5bc35360607472de4525358af126de4"),
    type: 'button-group-select',
    name: (config === null || config === void 0 ? void 0 : config.name) || 'textAlign',
    // size: 'xs',
    mode: (config === null || config === void 0 ? void 0 : config.mode) || 'horizontal',
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    pipeIn: (config === null || config === void 0 ? void 0 : config.pipeIn) || defaultValue(''),
    pipeOut: config === null || config === void 0 ? void 0 : config.pipeOut,
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
  };
});
// flex相关配置项（整合版）
setSchemaTpl('layout:flex-setting', function (config) {
  var _a;
  return {
    type: 'flex-layout-setting',
    name: (config === null || config === void 0 ? void 0 : config.name) || 'style',
    mode: 'vertical',
    label: (_a = config === null || config === void 0 ? void 0 : config.label) !== null && _a !== void 0 ? _a : false,
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn,
    direction: config === null || config === void 0 ? void 0 : config.direction,
    justify: config === null || config === void 0 ? void 0 : config.justify,
    alignItems: config === null || config === void 0 ? void 0 : config.alignItems
  };
});
// 子配置项包裹容器
setSchemaTpl('layout:wrapper-contanier', function (config) {
  return {
    type: 'container',
    className: "config-wrapper-contanier ".concat(config.className || ''),
    body: config.body,
    visibleOn: config === null || config === void 0 ? void 0 : config.visibleOn
  };
});
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
