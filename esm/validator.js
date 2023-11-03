/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __spreadArray, __read } from 'tslib';
import { i18n } from 'i18n-runtime';

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
var Validators = [];
/**
 * 校验规则类名
 */
var ValidationGroup;
(function (ValidationGroup) {
  ValidationGroup["Pattern"] = i18n("97d07614380da93d257f9fbf81aa56fb");
  ValidationGroup["Number"] = i18n("55d4790c5d819cd0462cbe89561b0dd4");
  ValidationGroup["Regex"] = i18n("ed3dd0bfa89500c5feb306cd4d9db56c");
  ValidationGroup["Others"] = i18n("0d98c74797e49d00bcc4c17c9d557a2b");
})(ValidationGroup || (ValidationGroup = {}));
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
  Validators.push.apply(Validators, __spreadArray([], __read(config), false));
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
    tagMatch = valid.tag[ValidatorTag.All];
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
var ValidatorTag;
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
})(ValidatorTag || (ValidatorTag = {}));
registerValidator.apply(void 0, __spreadArray([{
  label: i18n("537b39a8b56fdc27a5fdd70aa032d3bc"),
  name: 'required',
  tag: (_a = {}, _a[ValidatorTag.Text] = ValidTagMatchType.isDefault, _a[ValidatorTag.File] = ValidTagMatchType.isDefault, _a[ValidatorTag.MultiSelect] = ValidTagMatchType.isDefault, _a[ValidatorTag.Date] = ValidTagMatchType.isDefault, _a[ValidatorTag.Code] = ValidTagMatchType.isDefault, _a[ValidatorTag.Email] = ValidTagMatchType.isDefault, _a[ValidatorTag.Password] = ValidTagMatchType.isDefault, _a[ValidatorTag.URL] = ValidTagMatchType.isDefault, _a[ValidatorTag.Tree] = ValidTagMatchType.isDefault, _a)
}, {
  label: i18n("cff1ec632eaf35f64791615e15ce6d76"),
  name: 'isEmail',
  group: ValidationGroup.Pattern,
  message: i18n("1b7e06ef04d7167e174eb6929421592f"),
  tag: (_b = {}, _b[ValidatorTag.Email] = ValidTagMatchType.isBuiltIn, _b[ValidatorTag.Text] = ValidTagMatchType.isMore, _b)
}, {
  label: i18n("fab6f9029822dea7838bf9908d7f5c09"),
  name: 'isUrl',
  group: ValidationGroup.Pattern,
  message: i18n("87c91ce706ab845b55ce95372265b92e"),
  tag: (_c = {}, _c[ValidatorTag.URL] = ValidTagMatchType.isBuiltIn, _c[ValidatorTag.Text] = ValidTagMatchType.isMore, _c)
}, {
  label: i18n("1111c44adfa40fe9cb22797d2c1e37e8"),
  name: 'isAlpha',
  group: ValidationGroup.Pattern,
  message: i18n("48e2aca8e6347b008b6fbdb48fc4b597"),
  tag: (_d = {}, _d[ValidatorTag.Text] = ValidTagMatchType.isMore, _d)
}, {
  label: i18n("55d4790c5d819cd0462cbe89561b0dd4"),
  name: 'isNumeric',
  group: ValidationGroup.Number,
  message: i18n("de66a286057d4e3f1ee2d9bccbd48ce5"),
  tag: (_e = {}, _e[ValidatorTag.Number] = ValidTagMatchType.isDefault, _e[ValidatorTag.Text] = ValidTagMatchType.isMore, _e)
}, {
  label: i18n("725bf3485a0456cf7f65a507ce67254b"),
  name: 'isAlphanumeric',
  group: ValidationGroup.Pattern,
  message: i18n("ae344073ea6ca9ce742899cdf6d3e106"),
  tag: (_f = {}, _f[ValidatorTag.Text] = ValidTagMatchType.isMore, _f)
}, {
  label: i18n("96c4ea83892a3227a2aa5b8f3759bca4"),
  name: 'isInt',
  group: ValidationGroup.Number,
  message: i18n("2b702fb5b95d47944246f79ae4032281"),
  tag: (_g = {}, _g[ValidatorTag.Number] = ValidTagMatchType.isDefault, _g[ValidatorTag.Text] = ValidTagMatchType.isMore, _g)
}, {
  label: i18n("35962d17a3fba5f4802d7845695a3e72"),
  name: 'isFloat',
  group: ValidationGroup.Number,
  message: i18n("84f46c9b82c3c8fe276dfa65173c59bb"),
  tag: (_h = {}, _h[ValidatorTag.Number] = ValidTagMatchType.isDefault, _h[ValidatorTag.Text] = ValidTagMatchType.isMore, _h)
}, {
  label: i18n("28e8e048490110c8dd8e2ad6af324980"),
  name: 'isLength',
  group: ValidationGroup.Pattern,
  message: i18n("a718dcd3a16bee2a4086244ef1eb0ab4"),
  tag: (_j = {}, _j[ValidatorTag.Number] = ValidTagMatchType.isDefault, _j[ValidatorTag.Text] = ValidTagMatchType.isMore, _j),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18n("ab90c616dd114af087b31b90d3cb4063"),
    placeholder: i18n("41e82a5a0e53ba94d1160ee855c72a7a")
  }]
}, {
  label: i18n("8c4ee6022f1525097a1141acad094d4e"),
  name: 'maxLength',
  group: ValidationGroup.Pattern,
  message: i18n("c323e3527a805cfdd264700fdf013daf"),
  tag: (_k = {}, _k[ValidatorTag.Text] = ValidTagMatchType.isDefault, _k),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18n("ab90c616dd114af087b31b90d3cb4063")
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
  label: i18n("17971609e210034c0d6a25b0186e2b7b"),
  name: 'minLength',
  group: ValidationGroup.Pattern,
  message: i18n("c762cefa0ff423010af0a943c04d603b"),
  tag: (_l = {}, _l[ValidatorTag.Text] = ValidTagMatchType.isDefault, _l),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18n("ab90c616dd114af087b31b90d3cb4063")
    // placeholder: '请输入字符个数'
  }]
}, {
  label: i18n("5da893141114a59da868052b3a17a79a"),
  name: 'maximum',
  group: ValidationGroup.Number,
  message: i18n("b95aed5c6f2c8e49e23b382ac3d593ba"),
  tag: (_m = {}, _m[ValidatorTag.Number] = ValidTagMatchType.isDefault, _m[ValidatorTag.Text] = ValidTagMatchType.isMore, _m),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18n("5da893141114a59da868052b3a17a79a")
    // placeholder: '请输入最大值'
  }]
}, {
  label: i18n("c322edb884724d04842fc35f4d29a24e"),
  name: 'minimum',
  group: ValidationGroup.Number,
  message: i18n("fd11733fbabaf2ae3cf1fcd3fe385cc5"),
  tag: (_o = {}, _o[ValidatorTag.Number] = ValidTagMatchType.isDefault, _o[ValidatorTag.Text] = ValidTagMatchType.isMore, _o),
  schema: [{
    type: 'input-number',
    name: 'value',
    label: i18n("c322edb884724d04842fc35f4d29a24e")
    // placeholder: '请输入最小值'
  }]
}, {
  label: i18n("92448a35f41de3a1fa69135acfed5ce9"),
  name: 'isPhoneNumber',
  group: ValidationGroup.Pattern,
  message: i18n("161278fb2c71e5a8aa8aac50f230233d"),
  tag: (_p = {}, _p[ValidatorTag.Text] = ValidTagMatchType.isMore, _p)
}, {
  label: i18n("193a8c42c1c373f385a4c7b33ffc381e"),
  name: 'isTelNumber',
  group: ValidationGroup.Pattern,
  message: i18n("ba42949accfe87c20e6c2486cd065dd2"),
  tag: (_q = {}, _q[ValidatorTag.Text] = ValidTagMatchType.isMore, _q)
}, {
  label: i18n("6102d474314f27577d89e85b4c6cc4a5"),
  name: 'isZipcode',
  group: ValidationGroup.Pattern,
  message: i18n("1d2c5048143328e21cb9c2dd84b696fb"),
  tag: (_r = {}, _r[ValidatorTag.Text] = ValidTagMatchType.isMore, _r)
}, {
  label: i18n("84e0cb5d57ed995b0cc04b4ab9a7997b"),
  name: 'isId',
  group: ValidationGroup.Pattern,
  message: i18n("038b3ed111e87b56572f3945a1b0e02c"),
  tag: (_s = {}, _s[ValidatorTag.Text] = ValidTagMatchType.isMore, _s)
}, {
  label: i18n("8dbec4f0c05be45a8acf6a5ae9d1f880"),
  name: 'isJson',
  group: ValidationGroup.Pattern,
  message: i18n("e93275245d529c486018e47136bfae2e"),
  tag: (_t = {}, _t[ValidatorTag.Text] = ValidTagMatchType.isMore, _t)
}, {
  label: i18n("eb242bc7524c797fb1aee2344dec92da"),
  name: 'equals',
  group: ValidationGroup.Others,
  message: i18n("acf719549561f28f38bf750a64cda508"),
  tag: (_u = {}, _u[ValidatorTag.All] = ValidTagMatchType.isMore, _u[ValidatorTag.Password] = ValidTagMatchType.isDefault, _u),
  schema: [{
    type: 'input-text',
    name: 'value',
    label: i18n("2c8c25bb51dfd9ddfc74fd75a8a380a1")
  }]
}, {
  label: i18n("c17d9577233793976d3902c117eed82b"),
  name: 'equalsField',
  group: ValidationGroup.Others,
  message: i18n("e027500d91d46a962036f63c09492c6c"),
  tag: (_v = {}, _v[ValidatorTag.All] = ValidTagMatchType.isMore, _v[ValidatorTag.Password] = ValidTagMatchType.isDefault, _v),
  schema: [{
    type: 'input-text',
    name: 'value',
    label: i18n("d314558953b3c76adb7e131aaec8bd86")
  }]
}], __read(Array(5).fill(null).map(function (v, index) {
  var _a;
  var num = index === 0 ? '' : index;
  return {
    label: i18n("b457177c184722b655954a08cf3f71ca") + num,
    name: 'matchRegexp' + num,
    group: ValidationGroup.Regex,
    message: i18n("d01886eeef1de19f2e99617017f4def8"),
    tag: (_a = {}, _a[ValidatorTag.All] = ValidTagMatchType.isMore, _a),
    schema: [{
      type: 'input-text',
      name: 'value',
      label: i18n("a9400c408441f1f7f6d6954deb05ae9a"),
      placeholder: i18n("859102d8ced9928cc71bb225961171bf"),
      prefix: '/',
      suffix: '/'
    }]
  };
})), false));

export { ValidationGroup, ValidatorTag, getValidator, getValidatorsByTag, registerValidator };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
