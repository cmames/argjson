// argjson by C. Mames is licensed under the GNU General Public License v3.0 
// https://github.com/cmames/argjson

var ajs = {
  help: {
    short: "h",
    value: false,
    desc: "Display this help",
    type: "boolean"
  }
};

exports.add = function (base) {
  if (!base.arg) throw new TypeError("arg is required");
  ajs[base.arg] = {};
  ajs[base.arg].value = base.default || false;
  ajs[base.arg].type = typeof base.default;
  ajs[base.arg].desc = base.description;
  if (base.short && base.short.length > 1) throw new TypeError(" '" + base.short + "' short argument must be just one char");
  ajs[base.arg].short = base.short;
  return this;
}

function display(ret) {
  console.log("USAGE :");
  let max = 0;
  let c80 = "                                                                                ";
  Object.keys(ajs).forEach(function (k) {
    let o = "";
    if (k.length > 1) {
      o = "--" + k;
      if (ajs[k].short) o = o + " , -" + ajs[k].short
    }
    else {
      o = "-" + k;
    }
    if (max < o.length + 3) max = o.length + 3;
    ajs[k].ht = o;
  });
  max = 80 - max;
  Object.keys(ajs).forEach(function (k) {
    let o = (ajs[k].ht + c80).slice(0, 77 - max) + " : ";
    let t = ajs[k].desc + (ajs[k].value ? "\nDefault : " + JSON.stringify(ajs[k].value) : "");
    let first = true;
    do {
      let tt = t;
      if (t.indexOf("\n") !== -1) tt = tt.slice(0, t.indexOf("\n"));
      if (tt.length > max) tt = t.slice(0, t.slice(0, max).lastIndexOf(" "));
      if (first) tt = o + tt;
      else tt = c80.slice(0, o.length) + tt
      console.log(tt);
      first = false;
      let i = tt.length - o.length + 1;
      if (i < 0) i = 0;
      t = t.slice(i);
    }
    while (t.length !== 0)
  });
  process.exit(ret);
}

exports.parse = function () {
  let a = process.argv.slice(2);
  let jr={};
  Object.keys(ajs).forEach(function (k) {
    jr[k]=ajs[k].value;
  });
  while (a.length > 0) {
    let key = "";
    let e = a.shift();
    if (e.charAt(0) !== "-") {
      console.error("unknown argument " + e);
      display(1);
    }
    e = e.slice(1);
    if (e.charAt(0) === "-") {
      e = e.slice(1);
      key = e;
      if (!ajs[key]) {
        console.error("unknown argument --" + key);
        display(1);
      }
    }
    else {
      while (e.length > 1) {
        a.push("-" + e.charAt(0));
        e = e.slice(1);
      }
      Object.keys(ajs).forEach(function (k) {
        if (ajs[k].short === e) key = k;
      });
      if (!ajs[key]) {
        console.error("unknown argument -" + e);
        display(1);
      }
    }

    switch (ajs[key].type) {
      case "boolean": jr[key] = true; break;
      case "number":
      case "bigint": jr[key] = parseFloat(a.shift()); break;
      case "object": jr[key] = JSON.parse(a.shift()); break;
      case "undefined":
      case "function":
      case "symbol": jr[key] = null;
      default: jr[key] = a.shift();
    }
  }

  if (jr["help"]) display(0);
  return jr;
}
