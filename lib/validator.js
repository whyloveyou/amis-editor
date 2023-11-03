/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var i18nRuntime = require('i18n-runtime');

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
var Validators = [];
/**
 * 校验规则类名
 */
exports.ValidationGroup = void 0;
(function (ValidationGroup) {
  ValidationGroup["Pattern"] = i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb");
  ValidationGroup["Number"] = i18nRuntime.i18n("55d4790c5d819cd0462cbe89561b0dd4");
  ValidationGroup["Regex"] = i18nRuntime.i18n("ed3dd0bfa89500c5feb306cd4d9db56c");
  ValidationGroup["Others"] = i18nRuntime.i18n("0d98c74797e49d00bcc4c17c9d557a2b");
})(exports.ValidationGroup || (exports.ValidationGroup = {}));
var ValidTagMatchType;
(function (ValidTagMatchType) {
  ValidTagMatchType[ValidTagMatchType["isDefault"] = 1] = "isDefault";
  ValidTagMatchType[ValidTagMatchType["isMore"] = 2] = "isMore";
  ValidTagMatchType[ValidTagMatchType["isBuiltIn"] = 3] = "isBuiltIn"; // 默认内置校验， 默认开启，不可操作开关关闭
})(ValidTagMatchType || (ValidTagMatchType = {}));
var registerValidator = function () {
  var config = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    config[_i] = arguments[_i];
  }
  Validators.push.apply(Validators, tslib.__spreadArray([], tslib.__read(config), false));
};
var getValidatorsByTag = function (tag) {
  var defaultValidators = {};
  var moreValidators = {};
  var builtInValidators = {};
  Validators.forEach(function (valid) {
    var tagMatch = valid.tag[tag];
    if (tagMatch != null) {
      if (tagMatch === ValidTagMatchType.isDefault) {
        defaultValidators[valid.name] = valid;
      } else if (tagMatch === ValidTagMatchType.isMore) {
        moreValidators[valid.name] = valid;
      } else if (tagMatch === ValidTagMatchType.isBuiltIn) {
        builtInValidators[valid.name] = valid;
      }
      return;
    }
    tagMatch = valid.tag[exports.ValidatorTag.All];
    if (tagMatch != null) {
      if (tagMatch === ValidTagMatchType.isDefault) {
        defaultValidators[valid.name] = valid;
      } else if (tagMatch === ValidTagMatchType.isMore) {
        moreValidators[valid.name] = valid;
      } else if (tagMatch === ValidTagMatchType.isBuiltIn) {
        builtInValidators[valid.name] = valid;
      }
    }
  });
  return {
    defaultValidators: defaultValidators,
    moreValidators: moreValidators,
    builtInValidators: builtInValidators
  };
};
var getValidator = function (name) {
  return Validators.find(function (item) {
    return item.name === name;
  });
};
exports.ValidatorTag = void 0;
(function (ValidatorTag) {
  ValidatorTag["All"] = "0";
  ValidatorTag["Text"] = "1";
  ValidatorTag["MultiSelect"] = "2";
  ValidatorTag["Check"] = "3";
  ValidatorTag["Email"] = "4";
  ValidatorTag["Password"] = "5";
  ValidatorTag["URL"] = "6";
  ValidatorTag["Number"] = "7";
  ValidatorTag["File"] = "8";
  ValidatorTag["Date"] = "9";
  ValidatorTag["Code"] = "10";
  ValidatorTag["Tree"] = "11";
})(exports.ValidatorTag || (exports.ValidatorTag = {}));
registerValidator.apply(void 0, tslib.__spreadArray([{
  label: i18nRuntime.i18n("537b39a8b56fdc27a5fdd70aa032d3bc"),
  name: 'required',
  tag: (_a = {}, _a[exports.ValidatorTag.Text] = ValidTagMatchType.isDefault, _a[exports.ValidatorTag.File] = ValidTagMatchType.isDefault, _a[exports.ValidatorTag.MultiSelect] = ValidTagMatchType.isDefault, _a[exports.ValidatorTag.Date] = ValidTagMatchType.isDefault, _a[exports.ValidatorTag.Code] = ValidTagMatchType.isDefault, _a[exports.ValidatorTag.Email] = ValidTagMatchType.isDefault, _a[exports.ValidatorTag.Password] = ValidTagMatchType.isDefault, _a[exports.ValidatorTag.URL] = ValidTagMatchType.isDefault, _a[exports.ValidatorTag.Tree] = ValidTagMatchType.isDefault, _a)
}, {
  label: i18nRuntime.i18n("cff1ec632eaf35f64791615e15ce6d76"),
  name: 'isEmail',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("1b7e06ef04d7167e174eb6929421592f"),
  tag: (_b = {}, _b[exports.ValidatorTag.Email] = ValidTagMatchType.isBuiltIn, _b[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _b)
}, {
  label: i18nRuntime.i18n("fab6f9029822dea7838bf9908d7f5c09"),
  name: 'isUrl',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("87c91ce706ab845b55ce95372265b92e"),
  tag: (_c = {}, _c[exports.ValidatorTag.URL] = ValidTagMatchType.isBuiltIn, _c[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _c)
}, {
  label: i18nRuntime.i18n("1111c44adfa40fe9cb22797d2c1e37e8"),
  name: 'isAlpha',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("48e2aca8e6347b008b6fbdb48fc4b597"),
  tag: (_d = {}, _d[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _d)
}, {
  label: i18nRuntime.i18n("55d4790c5d819cd0462cbe89561b0dd4"),
  name: 'isNumeric',
  group: exports.ValidationGroup.Number,
  message: i18nRuntime.i18n("de66a286057d4e3f1ee2d9bccbd48ce5"),
  tag: (_e = {}, _e[exports.ValidatorTag.Number] = ValidTagMatchType.isDefault, _e[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _e)
}, {
  label: i18nRuntime.i18n("725bf3485a0456cf7f65a507ce67254b"),
  name: 'isAlphanumeric',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("ae344073ea6ca9ce742899cdf6d3e106"),
  tag: (_f = {}, _f[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _f)
}, {
  label: i18nRuntime.i18n("96c4ea83892a3227a2aa5b8f3759bca4"),
  name: 'isInt',
  group: exports.ValidationGroup.Number,
  message: i18nRuntime.i18n("2b702fb5b95d47944246f79ae4032281"),
  tag: (_g = {}, _g[exports.ValidatorTag.Number] = ValidTagMatchType.isDefault, _g[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _g)
}, {
  label: i18nRuntime.i18n("35962d17a3fba5f4802d7845695a3e72"),
  name: 'isFloat',
  group: exports.ValidationGroup.Number,
  message: i18nRuntime.i18n("84f46c9b82c3c8fe276dfa65173c59bb"),
  tag: (_h = {}, _h[exports.ValidatorTag.Number] = ValidTagMatchType.isDefault, _h[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _h)
}, {
  label: i18nRuntime.i18n("28e8e048490110c8dd8e2ad6af324980"),
  name: 'isLength',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("a718dcd3a16bee2a4086244ef1eb0ab4"),
  tag: (_j = {}, _j[exports.ValidatorTag.Number] = ValidTagMatchType.isDefault, _j[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _j),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18nRuntime.i18n("ab90c616dd114af087b31b90d3cb4063"),
    placeholder: i18nRuntime.i18n("41e82a5a0e53ba94d1160ee855c72a7a")
  }]
}, {
  label: i18nRuntime.i18n("8c4ee6022f1525097a1141acad094d4e"),
  name: 'maxLength',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("c323e3527a805cfdd264700fdf013daf"),
  tag: (_k = {}, _k[exports.ValidatorTag.Text] = ValidTagMatchType.isDefault, _k),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18nRuntime.i18n("ab90c616dd114af087b31b90d3cb4063")
    // placeholder: '请输入字符个数'
  }]
},
// {
//   label: '最大个数',
//   name: 'maxLength',
//   group: ValidationGroup.Pattern,
//   message: '文件个数不可超过 \\$1 个',
//   tag: {
//     [ValidatorTag.File]: true
//   },
//   schema: [
//     {
//       type: 'input-number',
//       name: 'value',
//       label: '文件数'
//     }
//   ]
// },
// {
//   label: '最小个数',
//   name: 'minLength',
//   group: ValidationGroup.Pattern,
//   message: '文件个数不可少于 \\$1 个',
//   tag: {
//     [ValidatorTag.File]: true
//   },
//   schema: [
//     {
//       type: 'input-number',
//       name: 'value',
//       label: '文件数'
//     }
//   ]
// },
// {
//   label: '最大体积',
//   group: ValidationGroup.Pattern,
//   name: 'maxSize',
//   message: '文件体积不可超过 \\$1 Byte',
//   tag: {
//     [ValidatorTag.File]: true
//   },
//   schema: [
//     {
//       type: 'input-number',
//       label: '体积(Byte)'
//     }
//   ]
// },
{
  label: i18nRuntime.i18n("17971609e210034c0d6a25b0186e2b7b"),
  name: 'minLength',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("c762cefa0ff423010af0a943c04d603b"),
  tag: (_l = {}, _l[exports.ValidatorTag.Text] = ValidTagMatchType.isDefault, _l),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18nRuntime.i18n("ab90c616dd114af087b31b90d3cb4063")
    // placeholder: '请输入字符个数'
  }]
}, {
  label: i18nRuntime.i18n("5da893141114a59da868052b3a17a79a"),
  name: 'maximum',
  group: exports.ValidationGroup.Number,
  message: i18nRuntime.i18n("b95aed5c6f2c8e49e23b382ac3d593ba"),
  tag: (_m = {}, _m[exports.ValidatorTag.Number] = ValidTagMatchType.isDefault, _m[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _m),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18nRuntime.i18n("5da893141114a59da868052b3a17a79a")
    // placeholder: '请输入最大值'
  }]
}, {
  label: i18nRuntime.i18n("c322edb884724d04842fc35f4d29a24e"),
  name: 'minimum',
  group: exports.ValidationGroup.Number,
  message: i18nRuntime.i18n("fd11733fbabaf2ae3cf1fcd3fe385cc5"),
  tag: (_o = {}, _o[exports.ValidatorTag.Number] = ValidTagMatchType.isDefault, _o[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _o),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18nRuntime.i18n("c322edb884724d04842fc35f4d29a24e")
    // placeholder: '请输入最小值'
  }]
}, {
  label: i18nRuntime.i18n("92448a35f41de3a1fa69135acfed5ce9"),
  name: 'isPhoneNumber',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("161278fb2c71e5a8aa8aac50f230233d"),
  tag: (_p = {}, _p[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _p)
}, {
  label: i18nRuntime.i18n("193a8c42c1c373f385a4c7b33ffc381e"),
  name: 'isTelNumber',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("ba42949accfe87c20e6c2486cd065dd2"),
  tag: (_q = {}, _q[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _q)
}, {
  label: i18nRuntime.i18n("6102d474314f27577d89e85b4c6cc4a5"),
  name: 'isZipcode',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("1d2c5048143328e21cb9c2dd84b696fb"),
  tag: (_r = {}, _r[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _r)
}, {
  label: i18nRuntime.i18n("84e0cb5d57ed995b0cc04b4ab9a7997b"),
  name: 'isId',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("038b3ed111e87b56572f3945a1b0e02c"),
  tag: (_s = {}, _s[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _s)
}, {
  label: i18nRuntime.i18n("8dbec4f0c05be45a8acf6a5ae9d1f880"),
  name: 'isJson',
  group: exports.ValidationGroup.Pattern,
  message: i18nRuntime.i18n("e93275245d529c486018e47136bfae2e"),
  tag: (_t = {}, _t[exports.ValidatorTag.Text] = ValidTagMatchType.isMore, _t)
}, {
  label: i18nRuntime.i18n("eb242bc7524c797fb1aee2344dec92da"),
  name: 'equals',
  group: exports.ValidationGroup.Others,
  message: i18nRuntime.i18n("acf719549561f28f38bf750a64cda508"),
  tag: (_u = {}, _u[exports.ValidatorTag.All] = ValidTagMatchType.isMore, _u[exports.ValidatorTag.Password] = ValidTagMatchType.isDefault, _u),
  schema: [{
    type: 'input-text',
    name: 'value',
    label: i18nRuntime.i18n("2c8c25bb51dfd9ddfc74fd75a8a380a1")
  }]
}, {
  label: i18nRuntime.i18n("c17d9577233793976d3902c117eed82b"),
  name: 'equalsField',
  group: exports.ValidationGroup.Others,
  message: i18nRuntime.i18n("e027500d91d46a962036f63c09492c6c"),
  tag: (_v = {}, _v[exports.ValidatorTag.All] = ValidTagMatchType.isMore, _v[exports.ValidatorTag.Password] = ValidTagMatchType.isDefault, _v),
  schema: [{
    type: 'input-text',
    name: 'value',
    label: i18nRuntime.i18n("d314558953b3c76adb7e131aaec8bd86")
  }]
}], tslib.__read(Array(5).fill(null).map(function (v, index) {
  var _a;
  var num = index === 0 ? '' : index;
  return {
    label: i18nRuntime.i18n("b457177c184722b655954a08cf3f71ca") + num,
    name: 'matchRegexp' + num,
    group: exports.ValidationGroup.Regex,
    message: i18nRuntime.i18n("d01886eeef1de19f2e99617017f4def8"),
    tag: (_a = {}, _a[exports.ValidatorTag.All] = ValidTagMatchType.isMore, _a),
    schema: [{
      type: 'input-text',
      name: 'value',
      label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
      placeholder: i18nRuntime.i18n("859102d8ced9928cc71bb225961171bf"),
      prefix: '/',
      suffix: '/'
    }]
  };
})), false));

exports.getValidator = getValidator;
exports.getValidatorsByTag = getValidatorsByTag;
exports.registerValidator = registerValidator;
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
