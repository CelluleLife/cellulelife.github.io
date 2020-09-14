import { _ as _inherits, p as _getPrototypeOf, q as _possibleConstructorReturn, r as _classCallCheck, i as init, s as safe_not_equal, t as _assertThisInitialized, d as dispatch_dev, J as _createClass, S as SvelteComponentDev, $ as create_slot, O as validate_each_argument, a0 as createEventDispatcher, v as validate_slots, K as globals, w as element, c as claim_element, f as children, g as detach_dev, h as attr_dev, j as add_location, l as insert_dev, U as destroy_each, u as space, A as claim_space, m as append_dev, a1 as update_slot, G as transition_in, H as transition_out, a2 as null_to_empty, Y as group_outros, Z as check_outros, a3 as select_value, a4 as add_render_callback, a5 as select_option, a6 as listen_dev, x as text, B as claim_text, T as set_data_dev, a7 as prop_dev, a8 as Button, Q as shouldShowUsernames, a9 as setShouldShowUsernames, E as _slicedToArray, y as create_component, C as claim_component, D as mount_component, I as destroy_component } from './client.8dd64bd6.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object;
var file = "node_modules/svelte-table/src/SvelteTable.svelte";

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[34] = list[i];
  return child_ctx;
}

var get_row_slot_changes = function get_row_slot_changes(dirty) {
  return {
    row: dirty[0] &
    /*c_rows*/
    8192
  };
};

var get_row_slot_context = function get_row_slot_context(ctx) {
  return {
    row:
    /*row*/
    ctx[31],
    n:
    /*n*/
    ctx[33]
  };
};

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[31] = list[i];
  child_ctx[33] = i;
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[34] = list[i];
  return child_ctx;
}

var get_header_slot_changes = function get_header_slot_changes(dirty) {
  return {
    sortOrder: dirty[0] &
    /*sortOrder*/
    2,
    sortBy: dirty[0] &
    /*sortBy*/
    1
  };
};

var get_header_slot_context = function get_header_slot_context(ctx) {
  return {
    sortOrder:
    /*sortOrder*/
    ctx[1],
    sortBy:
    /*sortBy*/
    ctx[0]
  };
};

function get_each_context_4(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[41] = list[i];
  return child_ctx;
}

function get_each_context_3(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[34] = list[i];
  return child_ctx;
} // (111:4) {#if showFilterHeader}


function create_if_block_1(ctx) {
  var tr;
  var each_value_3 =
  /*columns*/
  ctx[2];
  validate_each_argument(each_value_3);
  var each_blocks = [];

  for (var i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }

  var block = {
    c: function create() {
      tr = element("tr");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      tr = claim_element(nodes, "TR", {
        class: true
      });
      var tr_nodes = children(tr);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(tr_nodes);
      }

      tr_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(tr, "class", "svelte-ut8djh");
      add_location(tr, file, 111, 6, 2868);
    },
    m: function mount(target, anchor) {
      insert_dev(target, tr, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(tr, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*asStringArray, classNameSelect, filterSettings, columns, filterValues*/
      39172) {
        each_value_3 =
        /*columns*/
        ctx[2];
        validate_each_argument(each_value_3);

        var _i4;

        for (_i4 = 0; _i4 < each_value_3.length; _i4 += 1) {
          var child_ctx = get_each_context_3(ctx, each_value_3, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block_3(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(tr, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value_3.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(tr);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(111:4) {#if showFilterHeader}",
    ctx: ctx
  });
  return block;
} // (115:12) {#if filterValues[col.key] !== undefined}


function create_if_block_2(ctx) {
  var select;
  var option;
  var select_class_value;
  var mounted;
  var dispose;
  var each_value_4 =
  /*filterValues*/
  ctx[11][
  /*col*/
  ctx[34].key];
  validate_each_argument(each_value_4);
  var each_blocks = [];

  for (var i = 0; i < each_value_4.length; i += 1) {
    each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
  }

  function select_change_handler() {
    /*select_change_handler*/
    ctx[27].call(select,
    /*col*/
    ctx[34]);
  }

  var block = {
    c: function create() {
      select = element("select");
      option = element("option");

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      select = claim_element(nodes, "SELECT", {
        class: true
      });
      var select_nodes = children(select);
      option = claim_element(select_nodes, "OPTION", {
        value: true
      });
      children(option).forEach(detach_dev);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        each_blocks[_i6].l(select_nodes);
      }

      select_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      option.__value = undefined;
      option.value = option.__value;
      add_location(option, file, 116, 16, 3088);
      attr_dev(select, "class", select_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameSelect*/
      ctx[8])) + " svelte-ut8djh"));
      if (
      /*filterSettings*/
      ctx[12][
      /*col*/
      ctx[34].key] === void 0) add_render_callback(select_change_handler);
      add_location(select, file, 115, 14, 2987);
    },
    m: function mount(target, anchor) {
      insert_dev(target, select, anchor);
      append_dev(select, option);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(select, null);
      }

      select_option(select,
      /*filterSettings*/
      ctx[12][
      /*col*/
      ctx[34].key]);

      if (!mounted) {
        dispose = listen_dev(select, "change", select_change_handler);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*filterValues, columns*/
      2052) {
        each_value_4 =
        /*filterValues*/
        ctx[11][
        /*col*/
        ctx[34].key];
        validate_each_argument(each_value_4);

        var _i8;

        for (_i8 = 0; _i8 < each_value_4.length; _i8 += 1) {
          var child_ctx = get_each_context_4(ctx, each_value_4, _i8);

          if (each_blocks[_i8]) {
            each_blocks[_i8].p(child_ctx, dirty);
          } else {
            each_blocks[_i8] = create_each_block_4(child_ctx);

            each_blocks[_i8].c();

            each_blocks[_i8].m(select, null);
          }
        }

        for (; _i8 < each_blocks.length; _i8 += 1) {
          each_blocks[_i8].d(1);
        }

        each_blocks.length = each_value_4.length;
      }

      if (dirty[0] &
      /*classNameSelect*/
      256 && select_class_value !== (select_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameSelect*/
      ctx[8])) + " svelte-ut8djh"))) {
        attr_dev(select, "class", select_class_value);
      }

      if (dirty[0] &
      /*filterSettings, columns, filterValues*/
      6148) {
        select_option(select,
        /*filterSettings*/
        ctx[12][
        /*col*/
        ctx[34].key]);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(select);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(115:12) {#if filterValues[col.key] !== undefined}",
    ctx: ctx
  });
  return block;
} // (118:16) {#each filterValues[col.key] as option}


function create_each_block_4(ctx) {
  var option;
  var t_value =
  /*option*/
  ctx[41].name + "";
  var t;
  var option_value_value;
  var block = {
    c: function create() {
      option = element("option");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      option = claim_element(nodes, "OPTION", {
        value: true
      });
      var option_nodes = children(option);
      t = claim_text(option_nodes, t_value);
      option_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      option.__value = option_value_value =
      /*option*/
      ctx[41].value;
      option.value = option.__value;
      add_location(option, file, 118, 18, 3198);
    },
    m: function mount(target, anchor) {
      insert_dev(target, option, anchor);
      append_dev(option, t);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*filterValues, columns*/
      2052 && t_value !== (t_value =
      /*option*/
      ctx[41].name + "")) set_data_dev(t, t_value);

      if (dirty[0] &
      /*filterValues, columns*/
      2052 && option_value_value !== (option_value_value =
      /*option*/
      ctx[41].value)) {
        prop_dev(option, "__value", option_value_value);
      }

      option.value = option.__value;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(option);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_4.name,
    type: "each",
    source: "(118:16) {#each filterValues[col.key] as option}",
    ctx: ctx
  });
  return block;
} // (113:8) {#each columns as col}


function create_each_block_3(ctx) {
  var th;
  var t;
  var if_block =
  /*filterValues*/
  ctx[11][
  /*col*/
  ctx[34].key] !== undefined && create_if_block_2(ctx);
  var block = {
    c: function create() {
      th = element("th");
      if (if_block) if_block.c();
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      th = claim_element(nodes, "TH", {});
      var th_nodes = children(th);
      if (if_block) if_block.l(th_nodes);
      t = claim_space(th_nodes);
      th_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(th, file, 113, 10, 2914);
    },
    m: function mount(target, anchor) {
      insert_dev(target, th, anchor);
      if (if_block) if_block.m(th, null);
      append_dev(th, t);
    },
    p: function update(ctx, dirty) {
      if (
      /*filterValues*/
      ctx[11][
      /*col*/
      ctx[34].key] !== undefined) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block_2(ctx);
          if_block.c();
          if_block.m(th, t);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(th);
      if (if_block) if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_3.name,
    type: "each",
    source: "(113:8) {#each columns as col}",
    ctx: ctx
  });
  return block;
} // (135:14) {#if sortBy === col.key}


function create_if_block(ctx) {
  var t_value = (
  /*sortOrder*/
  ctx[1] === 1 ?
  /*iconAsc*/
  ctx[3] :
  /*iconDesc*/
  ctx[4]) + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*sortOrder, iconAsc, iconDesc*/
      26 && t_value !== (t_value = (
      /*sortOrder*/
      ctx[1] === 1 ?
      /*iconAsc*/
      ctx[3] :
      /*iconDesc*/
      ctx[4]) + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(135:14) {#if sortBy === col.key}",
    ctx: ctx
  });
  return block;
} // (129:10) {#each columns as col}


function create_each_block_2(ctx) {
  var th;
  var t0_value =
  /*col*/
  ctx[34].title + "";
  var t0;
  var t1;
  var t2;
  var th_class_value;
  var mounted;
  var dispose;
  var if_block =
  /*sortBy*/
  ctx[0] ===
  /*col*/
  ctx[34].key && create_if_block(ctx);

  function click_handler() {
    var _ctx;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*click_handler*/
      (_ctx = ctx)[28].apply(_ctx, [
      /*col*/
      ctx[34]].concat(args))
    );
  }

  var block = {
    c: function create() {
      th = element("th");
      t0 = text(t0_value);
      t1 = space();
      if (if_block) if_block.c();
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      th = claim_element(nodes, "TH", {
        class: true
      });
      var th_nodes = children(th);
      t0 = claim_text(th_nodes, t0_value);
      t1 = claim_space(th_nodes);
      if (if_block) if_block.l(th_nodes);
      t2 = claim_space(th_nodes);
      th_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(th, "class", th_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15]([
      /*col*/
      ctx[34].sortable ? "isSortable" : null,
      /*col*/
      ctx[34].headerClass])) + " svelte-ut8djh"));
      add_location(th, file, 129, 12, 3493);
    },
    m: function mount(target, anchor) {
      insert_dev(target, th, anchor);
      append_dev(th, t0);
      append_dev(th, t1);
      if (if_block) if_block.m(th, null);
      append_dev(th, t2);

      if (!mounted) {
        dispose = listen_dev(th, "click", click_handler, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] &
      /*columns*/
      4 && t0_value !== (t0_value =
      /*col*/
      ctx[34].title + "")) set_data_dev(t0, t0_value);

      if (
      /*sortBy*/
      ctx[0] ===
      /*col*/
      ctx[34].key) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(th, t2);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty[0] &
      /*columns*/
      4 && th_class_value !== (th_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15]([
      /*col*/
      ctx[34].sortable ? "isSortable" : null,
      /*col*/
      ctx[34].headerClass])) + " svelte-ut8djh"))) {
        attr_dev(th, "class", th_class_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(th);
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_2.name,
    type: "each",
    source: "(129:10) {#each columns as col}",
    ctx: ctx
  });
  return block;
} // (127:64)          


function fallback_block_1(ctx) {
  var tr;
  var each_value_2 =
  /*columns*/
  ctx[2];
  validate_each_argument(each_value_2);
  var each_blocks = [];

  for (var i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  var block = {
    c: function create() {
      tr = element("tr");

      for (var _i9 = 0; _i9 < each_blocks.length; _i9 += 1) {
        each_blocks[_i9].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      tr = claim_element(nodes, "TR", {});
      var tr_nodes = children(tr);

      for (var _i10 = 0; _i10 < each_blocks.length; _i10 += 1) {
        each_blocks[_i10].l(tr_nodes);
      }

      tr_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(tr, file, 127, 8, 3443);
    },
    m: function mount(target, anchor) {
      insert_dev(target, tr, anchor);

      for (var _i11 = 0; _i11 < each_blocks.length; _i11 += 1) {
        each_blocks[_i11].m(tr, null);
      }
    },
    p: function update(ctx, dirty) {
      if (dirty[0] &
      /*asStringArray, columns, handleClickCol, sortOrder, iconAsc, iconDesc, sortBy*/
      98335) {
        each_value_2 =
        /*columns*/
        ctx[2];
        validate_each_argument(each_value_2);

        var _i12;

        for (_i12 = 0; _i12 < each_value_2.length; _i12 += 1) {
          var child_ctx = get_each_context_2(ctx, each_value_2, _i12);

          if (each_blocks[_i12]) {
            each_blocks[_i12].p(child_ctx, dirty);
          } else {
            each_blocks[_i12] = create_each_block_2(child_ctx);

            each_blocks[_i12].c();

            each_blocks[_i12].m(tr, null);
          }
        }

        for (; _i12 < each_blocks.length; _i12 += 1) {
          each_blocks[_i12].d(1);
        }

        each_blocks.length = each_value_2.length;
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(tr);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: fallback_block_1.name,
    type: "fallback",
    source: "(127:64)          ",
    ctx: ctx
  });
  return block;
} // (147:10) {#each columns as col}


function create_each_block_1(ctx) {
  var td;
  var raw_value = (
  /*col*/
  ctx[34].renderValue ?
  /*col*/
  ctx[34].renderValue(
  /*row*/
  ctx[31]) :
  /*col*/
  ctx[34].value(
  /*row*/
  ctx[31])) + "";
  var td_class_value;
  var mounted;
  var dispose;

  function click_handler_1() {
    var _ctx2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (
      /*click_handler_1*/
      (_ctx2 = ctx)[29].apply(_ctx2, [
      /*row*/
      ctx[31],
      /*col*/
      ctx[34]].concat(args))
    );
  }

  var block = {
    c: function create() {
      td = element("td");
      this.h();
    },
    l: function claim(nodes) {
      td = claim_element(nodes, "TD", {
        class: true
      });
      var td_nodes = children(td);
      td_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(td, "class", td_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15]([
      /*col*/
      ctx[34].class,
      /*classNameCell*/
      ctx[10]])) + " svelte-ut8djh"));
      add_location(td, file, 147, 12, 4126);
    },
    m: function mount(target, anchor) {
      insert_dev(target, td, anchor);
      td.innerHTML = raw_value;

      if (!mounted) {
        dispose = listen_dev(td, "click", click_handler_1, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty[0] &
      /*columns, c_rows*/
      8196 && raw_value !== (raw_value = (
      /*col*/
      ctx[34].renderValue ?
      /*col*/
      ctx[34].renderValue(
      /*row*/
      ctx[31]) :
      /*col*/
      ctx[34].value(
      /*row*/
      ctx[31])) + "")) td.innerHTML = raw_value;

      if (dirty[0] &
      /*columns, classNameCell*/
      1028 && td_class_value !== (td_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15]([
      /*col*/
      ctx[34].class,
      /*classNameCell*/
      ctx[10]])) + " svelte-ut8djh"))) {
        attr_dev(td, "class", td_class_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(td);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(147:10) {#each columns as col}",
    ctx: ctx
  });
  return block;
} // (145:40)          


function fallback_block(ctx) {
  var tr;
  var tr_class_value;
  var t;
  var mounted;
  var dispose;
  var each_value_1 =
  /*columns*/
  ctx[2];
  validate_each_argument(each_value_1);
  var each_blocks = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  function click_handler_2() {
    var _ctx3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (
      /*click_handler_2*/
      (_ctx3 = ctx)[30].apply(_ctx3, [
      /*row*/
      ctx[31]].concat(args))
    );
  }

  var block = {
    c: function create() {
      tr = element("tr");

      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        each_blocks[_i13].c();
      }

      t = space();
      this.h();
    },
    l: function claim(nodes) {
      tr = claim_element(nodes, "TR", {
        class: true
      });
      var tr_nodes = children(tr);

      for (var _i14 = 0; _i14 < each_blocks.length; _i14 += 1) {
        each_blocks[_i14].l(tr_nodes);
      }

      tr_nodes.forEach(detach_dev);
      t = claim_space(nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(tr, "class", tr_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameRow*/
      ctx[9])) + " svelte-ut8djh"));
      add_location(tr, file, 145, 8, 3999);
    },
    m: function mount(target, anchor) {
      insert_dev(target, tr, anchor);

      for (var _i15 = 0; _i15 < each_blocks.length; _i15 += 1) {
        each_blocks[_i15].m(tr, null);
      }

      insert_dev(target, t, anchor);

      if (!mounted) {
        dispose = listen_dev(tr, "click", click_handler_2, false, false, false);
        mounted = true;
      }
    },
    p: function update(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty[0] &
      /*asStringArray, columns, classNameCell, handleClickCell, c_rows*/
      304132) {
        each_value_1 =
        /*columns*/
        ctx[2];
        validate_each_argument(each_value_1);

        var _i16;

        for (_i16 = 0; _i16 < each_value_1.length; _i16 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i16);

          if (each_blocks[_i16]) {
            each_blocks[_i16].p(child_ctx, dirty);
          } else {
            each_blocks[_i16] = create_each_block_1(child_ctx);

            each_blocks[_i16].c();

            each_blocks[_i16].m(tr, null);
          }
        }

        for (; _i16 < each_blocks.length; _i16 += 1) {
          each_blocks[_i16].d(1);
        }

        each_blocks.length = each_value_1.length;
      }

      if (dirty[0] &
      /*classNameRow*/
      512 && tr_class_value !== (tr_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameRow*/
      ctx[9])) + " svelte-ut8djh"))) {
        attr_dev(tr, "class", tr_class_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(tr);
      destroy_each(each_blocks, detaching);
      if (detaching) detach_dev(t);
      mounted = false;
      dispose();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: fallback_block.name,
    type: "fallback",
    source: "(145:40)          ",
    ctx: ctx
  });
  return block;
} // (144:4) {#each c_rows as row, n}


function create_each_block(ctx) {
  var current;
  var row_slot_template =
  /*$$slots*/
  ctx[26].row;
  var row_slot = create_slot(row_slot_template, ctx,
  /*$$scope*/
  ctx[25], get_row_slot_context);
  var row_slot_or_fallback = row_slot || fallback_block(ctx);
  var block = {
    c: function create() {
      if (row_slot_or_fallback) row_slot_or_fallback.c();
    },
    l: function claim(nodes) {
      if (row_slot_or_fallback) row_slot_or_fallback.l(nodes);
    },
    m: function mount(target, anchor) {
      if (row_slot_or_fallback) {
        row_slot_or_fallback.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (row_slot) {
        if (row_slot.p && dirty[0] &
        /*$$scope, c_rows*/
        33562624) {
          update_slot(row_slot, row_slot_template, ctx,
          /*$$scope*/
          ctx[25], dirty, get_row_slot_changes, get_row_slot_context);
        }
      } else {
        if (row_slot_or_fallback && row_slot_or_fallback.p && dirty[0] &
        /*classNameRow, c_rows, columns, classNameCell*/
        9732) {
          row_slot_or_fallback.p(ctx, dirty);
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(row_slot_or_fallback, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(row_slot_or_fallback, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (row_slot_or_fallback) row_slot_or_fallback.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(144:4) {#each c_rows as row, n}",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var table;
  var thead;
  var t0;
  var thead_class_value;
  var t1;
  var tbody;
  var tbody_class_value;
  var table_class_value;
  var current;
  var if_block =
  /*showFilterHeader*/
  ctx[14] && create_if_block_1(ctx);
  var header_slot_template =
  /*$$slots*/
  ctx[26].header;
  var header_slot = create_slot(header_slot_template, ctx,
  /*$$scope*/
  ctx[25], get_header_slot_context);
  var header_slot_or_fallback = header_slot || fallback_block_1(ctx);
  var each_value =
  /*c_rows*/
  ctx[13];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      table = element("table");
      thead = element("thead");
      if (if_block) if_block.c();
      t0 = space();
      if (header_slot_or_fallback) header_slot_or_fallback.c();
      t1 = space();
      tbody = element("tbody");

      for (var _i17 = 0; _i17 < each_blocks.length; _i17 += 1) {
        each_blocks[_i17].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      table = claim_element(nodes, "TABLE", {
        class: true
      });
      var table_nodes = children(table);
      thead = claim_element(table_nodes, "THEAD", {
        class: true
      });
      var thead_nodes = children(thead);
      if (if_block) if_block.l(thead_nodes);
      t0 = claim_space(thead_nodes);
      if (header_slot_or_fallback) header_slot_or_fallback.l(thead_nodes);
      thead_nodes.forEach(detach_dev);
      t1 = claim_space(table_nodes);
      tbody = claim_element(table_nodes, "TBODY", {
        class: true
      });
      var tbody_nodes = children(tbody);

      for (var _i18 = 0; _i18 < each_blocks.length; _i18 += 1) {
        each_blocks[_i18].l(tbody_nodes);
      }

      tbody_nodes.forEach(detach_dev);
      table_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(thead, "class", thead_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameThead*/
      ctx[6])) + " svelte-ut8djh"));
      add_location(thead, file, 109, 2, 2789);
      attr_dev(tbody, "class", tbody_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameTbody*/
      ctx[7])) + " svelte-ut8djh"));
      add_location(tbody, file, 142, 2, 3875);
      attr_dev(table, "class", table_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameTable*/
      ctx[5])) + " svelte-ut8djh"));
      add_location(table, file, 108, 0, 2741);
    },
    m: function mount(target, anchor) {
      insert_dev(target, table, anchor);
      append_dev(table, thead);
      if (if_block) if_block.m(thead, null);
      append_dev(thead, t0);

      if (header_slot_or_fallback) {
        header_slot_or_fallback.m(thead, null);
      }

      append_dev(table, t1);
      append_dev(table, tbody);

      for (var _i19 = 0; _i19 < each_blocks.length; _i19 += 1) {
        each_blocks[_i19].m(tbody, null);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (
      /*showFilterHeader*/
      ctx[14]) if_block.p(ctx, dirty);

      if (header_slot) {
        if (header_slot.p && dirty[0] &
        /*$$scope, sortOrder, sortBy*/
        33554435) {
          update_slot(header_slot, header_slot_template, ctx,
          /*$$scope*/
          ctx[25], dirty, get_header_slot_changes, get_header_slot_context);
        }
      } else {
        if (header_slot_or_fallback && header_slot_or_fallback.p && dirty[0] &
        /*columns, sortOrder, iconAsc, iconDesc, sortBy*/
        31) {
          header_slot_or_fallback.p(ctx, dirty);
        }
      }

      if (!current || dirty[0] &
      /*classNameThead*/
      64 && thead_class_value !== (thead_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameThead*/
      ctx[6])) + " svelte-ut8djh"))) {
        attr_dev(thead, "class", thead_class_value);
      }

      if (dirty[0] &
      /*asStringArray, classNameRow, handleClickRow, c_rows, columns, classNameCell, handleClickCell, $$scope*/
      33990148) {
        each_value =
        /*c_rows*/
        ctx[13];
        validate_each_argument(each_value);

        var _i20;

        for (_i20 = 0; _i20 < each_value.length; _i20 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i20);

          if (each_blocks[_i20]) {
            each_blocks[_i20].p(child_ctx, dirty);

            transition_in(each_blocks[_i20], 1);
          } else {
            each_blocks[_i20] = create_each_block(child_ctx);

            each_blocks[_i20].c();

            transition_in(each_blocks[_i20], 1);

            each_blocks[_i20].m(tbody, null);
          }
        }

        group_outros();

        for (_i20 = each_value.length; _i20 < each_blocks.length; _i20 += 1) {
          out(_i20);
        }

        check_outros();
      }

      if (!current || dirty[0] &
      /*classNameTbody*/
      128 && tbody_class_value !== (tbody_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameTbody*/
      ctx[7])) + " svelte-ut8djh"))) {
        attr_dev(tbody, "class", tbody_class_value);
      }

      if (!current || dirty[0] &
      /*classNameTable*/
      32 && table_class_value !== (table_class_value = "" + (null_to_empty(
      /*asStringArray*/
      ctx[15](
      /*classNameTable*/
      ctx[5])) + " svelte-ut8djh"))) {
        attr_dev(table, "class", table_class_value);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(header_slot_or_fallback, local);

      for (var _i21 = 0; _i21 < each_value.length; _i21 += 1) {
        transition_in(each_blocks[_i21]);
      }

      current = true;
    },
    o: function outro(local) {
      transition_out(header_slot_or_fallback, local);
      each_blocks = each_blocks.filter(Boolean);

      for (var _i22 = 0; _i22 < each_blocks.length; _i22 += 1) {
        transition_out(each_blocks[_i22]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(table);
      if (if_block) if_block.d();
      if (header_slot_or_fallback) header_slot_or_fallback.d(detaching);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var dispatch = createEventDispatcher();
  var columns = $$props.columns;
  var rows = $$props.rows;
  var _$$props$sortBy = $$props.sortBy,
      sortBy = _$$props$sortBy === void 0 ? "" : _$$props$sortBy;
  var _$$props$sortOrder = $$props.sortOrder,
      sortOrder = _$$props$sortOrder === void 0 ? 1 : _$$props$sortOrder;
  var _$$props$iconAsc = $$props.iconAsc,
      iconAsc = _$$props$iconAsc === void 0 ? "▲" : _$$props$iconAsc;
  var _$$props$iconDesc = $$props.iconDesc,
      iconDesc = _$$props$iconDesc === void 0 ? "▼" : _$$props$iconDesc;
  var _$$props$classNameTab = $$props.classNameTable,
      classNameTable = _$$props$classNameTab === void 0 ? "" : _$$props$classNameTab;
  var _$$props$classNameThe = $$props.classNameThead,
      classNameThead = _$$props$classNameThe === void 0 ? "" : _$$props$classNameThe;
  var _$$props$classNameTbo = $$props.classNameTbody,
      classNameTbody = _$$props$classNameTbo === void 0 ? "" : _$$props$classNameTbo;
  var _$$props$classNameSel = $$props.classNameSelect,
      classNameSelect = _$$props$classNameSel === void 0 ? "" : _$$props$classNameSel;
  var _$$props$classNameRow = $$props.classNameRow,
      classNameRow = _$$props$classNameRow === void 0 ? "" : _$$props$classNameRow;
  var _$$props$classNameCel = $$props.classNameCell,
      classNameCell = _$$props$classNameCel === void 0 ? "" : _$$props$classNameCel;

  var sortFunction = function sortFunction() {
    return "";
  };

  var showFilterHeader = columns.some(function (c) {
    return c.filterOptions !== undefined;
  });
  var filterValues = {};
  var filterSettings = {};
  var columnByKey = {};
  columns.forEach(function (col) {
    $$invalidate(21, columnByKey[col.key] = col, columnByKey);
  });

  var asStringArray = function asStringArray(v) {
    return [].concat(v).filter(function (v) {
      return typeof v === "string" && v !== "";
    }).join(" ");
  };

  var calculateFilterValues = function calculateFilterValues() {
    $$invalidate(11, filterValues = {});
    columns.forEach(function (c) {
      if (typeof c.filterOptions === "function") {
        $$invalidate(11, filterValues[c.key] = c.filterOptions(rows), filterValues);
      } else if (Array.isArray(c.filterOptions)) {
        // if array of strings is provided, use it for name and value
        $$invalidate(11, filterValues[c.key] = c.filterOptions.map(function (val) {
          return {
            name: val,
            value: val
          };
        }), filterValues);
      }
    });
  };

  var updateSortOrder = function updateSortOrder(colKey) {
    if (colKey === sortBy) {
      $$invalidate(1, sortOrder = sortOrder === 1 ? -1 : 1);
    } else {
      $$invalidate(1, sortOrder = 1);
    }
  };

  var handleClickCol = function handleClickCol(event, col) {
    updateSortOrder(col.key);
    $$invalidate(0, sortBy = col.key);
    dispatch("clickCol", {
      event: event,
      col: col,
      key: col.key
    });
  };

  var handleClickRow = function handleClickRow(event, row) {
    dispatch("clickRow", {
      event: event,
      row: row
    });
  };

  var handleClickCell = function handleClickCell(event, row, key) {
    dispatch("clickCell", {
      event: event,
      row: row,
      key: key
    });
  };

  if (showFilterHeader) {
    calculateFilterValues();
  }

  var writable_props = ["columns", "rows", "sortBy", "sortOrder", "iconAsc", "iconDesc", "classNameTable", "classNameThead", "classNameTbody", "classNameSelect", "classNameRow", "classNameCell"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<SvelteTable> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("SvelteTable", $$slots, ['header', 'row']);

  function select_change_handler(col) {
    filterSettings[col.key] = select_value(this);
    $$invalidate(12, filterSettings);
    $$invalidate(2, columns);
    $$invalidate(11, filterValues);
  }

  var click_handler = function click_handler(col, e) {
    return handleClickCol(e, col);
  };

  var click_handler_1 = function click_handler_1(row, col, e) {
    handleClickCell(e, row, col.key);
  };

  var click_handler_2 = function click_handler_2(row, e) {
    handleClickRow(e, row);
  };

  $$self.$set = function ($$props) {
    if ("columns" in $$props) $$invalidate(2, columns = $$props.columns);
    if ("rows" in $$props) $$invalidate(19, rows = $$props.rows);
    if ("sortBy" in $$props) $$invalidate(0, sortBy = $$props.sortBy);
    if ("sortOrder" in $$props) $$invalidate(1, sortOrder = $$props.sortOrder);
    if ("iconAsc" in $$props) $$invalidate(3, iconAsc = $$props.iconAsc);
    if ("iconDesc" in $$props) $$invalidate(4, iconDesc = $$props.iconDesc);
    if ("classNameTable" in $$props) $$invalidate(5, classNameTable = $$props.classNameTable);
    if ("classNameThead" in $$props) $$invalidate(6, classNameThead = $$props.classNameThead);
    if ("classNameTbody" in $$props) $$invalidate(7, classNameTbody = $$props.classNameTbody);
    if ("classNameSelect" in $$props) $$invalidate(8, classNameSelect = $$props.classNameSelect);
    if ("classNameRow" in $$props) $$invalidate(9, classNameRow = $$props.classNameRow);
    if ("classNameCell" in $$props) $$invalidate(10, classNameCell = $$props.classNameCell);
    if ("$$scope" in $$props) $$invalidate(25, $$scope = $$props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      createEventDispatcher: createEventDispatcher,
      dispatch: dispatch,
      columns: columns,
      rows: rows,
      sortBy: sortBy,
      sortOrder: sortOrder,
      iconAsc: iconAsc,
      iconDesc: iconDesc,
      classNameTable: classNameTable,
      classNameThead: classNameThead,
      classNameTbody: classNameTbody,
      classNameSelect: classNameSelect,
      classNameRow: classNameRow,
      classNameCell: classNameCell,
      sortFunction: sortFunction,
      showFilterHeader: showFilterHeader,
      filterValues: filterValues,
      filterSettings: filterSettings,
      columnByKey: columnByKey,
      asStringArray: asStringArray,
      calculateFilterValues: calculateFilterValues,
      updateSortOrder: updateSortOrder,
      handleClickCol: handleClickCol,
      handleClickRow: handleClickRow,
      handleClickCell: handleClickCell,
      c_rows: c_rows
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("columns" in $$props) $$invalidate(2, columns = $$props.columns);
    if ("rows" in $$props) $$invalidate(19, rows = $$props.rows);
    if ("sortBy" in $$props) $$invalidate(0, sortBy = $$props.sortBy);
    if ("sortOrder" in $$props) $$invalidate(1, sortOrder = $$props.sortOrder);
    if ("iconAsc" in $$props) $$invalidate(3, iconAsc = $$props.iconAsc);
    if ("iconDesc" in $$props) $$invalidate(4, iconDesc = $$props.iconDesc);
    if ("classNameTable" in $$props) $$invalidate(5, classNameTable = $$props.classNameTable);
    if ("classNameThead" in $$props) $$invalidate(6, classNameThead = $$props.classNameThead);
    if ("classNameTbody" in $$props) $$invalidate(7, classNameTbody = $$props.classNameTbody);
    if ("classNameSelect" in $$props) $$invalidate(8, classNameSelect = $$props.classNameSelect);
    if ("classNameRow" in $$props) $$invalidate(9, classNameRow = $$props.classNameRow);
    if ("classNameCell" in $$props) $$invalidate(10, classNameCell = $$props.classNameCell);
    if ("sortFunction" in $$props) $$invalidate(20, sortFunction = $$props.sortFunction);
    if ("showFilterHeader" in $$props) $$invalidate(14, showFilterHeader = $$props.showFilterHeader);
    if ("filterValues" in $$props) $$invalidate(11, filterValues = $$props.filterValues);
    if ("filterSettings" in $$props) $$invalidate(12, filterSettings = $$props.filterSettings);
    if ("columnByKey" in $$props) $$invalidate(21, columnByKey = $$props.columnByKey);
    if ("c_rows" in $$props) $$invalidate(13, c_rows = $$props.c_rows);
  };

  var c_rows;

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty[0] &
    /*columnByKey, sortBy*/
    2097153) {
       {
        var col = columnByKey[sortBy];

        if (col !== undefined && col.sortable === true && typeof col.value === "function") {
          $$invalidate(20, sortFunction = function sortFunction(r) {
            return col.value(r);
          });
        }
      }
    }

    if ($$self.$$.dirty[0] &
    /*rows, filterSettings, columnByKey, sortFunction, sortOrder*/
    3674114) {
       $$invalidate(13, c_rows = rows.filter(function (r) {
        return Object.keys(filterSettings).every(function (f) {
          var ret = filterSettings[f] === undefined || // default to value() if filterValue() not provided in col
          filterSettings[f] === (typeof columnByKey[f].filterValue === "function" ? columnByKey[f].filterValue(r) : columnByKey[f].value(r));
          return ret;
        });
      }).map(function (r) {
        return Object.assign({}, r, {
          $sortOn: sortFunction(r)
        });
      }).sort(function (a, b) {
        if (a.$sortOn > b.$sortOn) return sortOrder;else if (a.$sortOn < b.$sortOn) return -sortOrder;
        return 0;
      }));
    }
  };

  return [sortBy, sortOrder, columns, iconAsc, iconDesc, classNameTable, classNameThead, classNameTbody, classNameSelect, classNameRow, classNameCell, filterValues, filterSettings, c_rows, showFilterHeader, asStringArray, handleClickCol, handleClickRow, handleClickCell, rows, sortFunction, columnByKey, dispatch, calculateFilterValues, updateSortOrder, $$scope, $$slots, select_change_handler, click_handler, click_handler_1, click_handler_2];
}

var SvelteTable = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(SvelteTable, _SvelteComponentDev);

  var _super = _createSuper(SvelteTable);

  function SvelteTable(options) {
    var _this;

    _classCallCheck(this, SvelteTable);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      columns: 2,
      rows: 19,
      sortBy: 0,
      sortOrder: 1,
      iconAsc: 3,
      iconDesc: 4,
      classNameTable: 5,
      classNameThead: 6,
      classNameTbody: 7,
      classNameSelect: 8,
      classNameRow: 9,
      classNameCell: 10
    }, [-1, -1]);
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "SvelteTable",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*columns*/
    ctx[2] === undefined && !("columns" in props)) {
      console.warn("<SvelteTable> was created without expected prop 'columns'");
    }

    if (
    /*rows*/
    ctx[19] === undefined && !("rows" in props)) {
      console.warn("<SvelteTable> was created without expected prop 'rows'");
    }

    return _this;
  }

  _createClass(SvelteTable, [{
    key: "columns",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "rows",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "sortBy",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "sortOrder",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "iconAsc",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "iconDesc",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "classNameTable",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "classNameThead",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "classNameTbody",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "classNameSelect",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "classNameRow",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "classNameCell",
    get: function get() {
      throw new Error("<SvelteTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SvelteTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return SvelteTable;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "src/components/SeedNav.svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
} // (50:8) {:else}


function create_else_block(ctx) {
  var current;
  var button = new Button({
    props: {
      tag: "a",
      href: "/scores/" +
      /*slug*/
      ctx[1] + "/" +
      /*link*/
      ctx[5],
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(button.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(button.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var button_changes = {};
      if (dirty &
      /*slug, links*/
      3) button_changes.href = "/scores/" +
      /*slug*/
      ctx[1] + "/" +
      /*link*/
      ctx[5];

      if (dirty &
      /*$$scope, links*/
      257) {
        button_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button.$set(button_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(button, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(50:8) {:else}",
    ctx: ctx
  });
  return block;
} // (48:8) {#if link === currentEditCount}


function create_if_block$1(ctx) {
  var current;
  var button = new Button({
    props: {
      type: "is-primary",
      tag: "a",
      href: "/scores/" +
      /*slug*/
      ctx[1] + "/" +
      /*link*/
      ctx[5],
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(button.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(button.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var button_changes = {};
      if (dirty &
      /*slug, links*/
      3) button_changes.href = "/scores/" +
      /*slug*/
      ctx[1] + "/" +
      /*link*/
      ctx[5];

      if (dirty &
      /*$$scope, links*/
      257) {
        button_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button.$set(button_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(button, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(48:8) {#if link === currentEditCount}",
    ctx: ctx
  });
  return block;
} // (51:10) <Button tag="a" href="/scores/{slug}/{link}">


function create_default_slot_1(ctx) {
  var t_value =
  /*link*/
  ctx[5] + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*links*/
      1 && t_value !== (t_value =
      /*link*/
      ctx[5] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(51:10) <Button tag=\\\"a\\\" href=\\\"/scores/{slug}/{link}\\\">",
    ctx: ctx
  });
  return block;
} // (49:10) <Button type="is-primary" tag="a" href="/scores/{slug}/{link}">


function create_default_slot(ctx) {
  var t_value =
  /*link*/
  ctx[5] + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*links*/
      1 && t_value !== (t_value =
      /*link*/
      ctx[5] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(49:10) <Button type=\\\"is-primary\\\" tag=\\\"a\\\" href=\\\"/scores/{slug}/{link}\\\">",
    ctx: ctx
  });
  return block;
} // (46:4) { #each links as link}


function create_each_block$1(ctx) {
  var li;
  var current_block_type_index;
  var if_block;
  var t;
  var current;
  var if_block_creators = [create_if_block$1, create_else_block];
  var if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*link*/
    ctx[5] ===
    /*currentEditCount*/
    ctx[2]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      li = element("li");
      if_block.c();
      t = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      if_block.l(li_nodes);
      t = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(li, "class", "svelte-kvt9n");
      add_location(li, file$1, 46, 4, 705);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      if_blocks[current_block_type_index].m(li, null);
      append_dev(li, t);
      current = true;
    },
    p: function update(ctx, dirty) {
      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(li, t);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o: function outro(local) {
      transition_out(if_block);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(46:4) { #each links as link}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var nav;
  var ol;
  var current;
  var each_value =
  /*links*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      nav = element("nav");
      ol = element("ol");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      nav = claim_element(nodes, "NAV", {
        class: true
      });
      var nav_nodes = children(nav);
      ol = claim_element(nav_nodes, "OL", {
        class: true
      });
      var ol_nodes = children(ol);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ol_nodes);
      }

      ol_nodes.forEach(detach_dev);
      nav_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ol, "class", "svelte-kvt9n");
      add_location(ol, file$1, 43, 1, 668);
      attr_dev(nav, "class", "svelte-kvt9n");
      add_location(nav, file$1, 42, 0, 661);
    },
    m: function mount(target, anchor) {
      insert_dev(target, nav, anchor);
      append_dev(nav, ol);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ol, null);
      }

      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*slug, links, currentEditCount*/
      7) {
        each_value =
        /*links*/
        ctx[0];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context$1(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);

            transition_in(each_blocks[_i4], 1);
          } else {
            each_blocks[_i4] = create_each_block$1(child_ctx);

            each_blocks[_i4].c();

            transition_in(each_blocks[_i4], 1);

            each_blocks[_i4].m(ol, null);
          }
        }

        group_outros();

        for (_i4 = each_value.length; _i4 < each_blocks.length; _i4 += 1) {
          out(_i4);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(nav);
      destroy_each(each_blocks, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function isSegmentActive(_segment, thisSegment) {
  if (!_segment && !thisSegment || _segment === thisSegment) {
    return "page";
  }
}

function instance$1($$self, $$props, $$invalidate) {
  var segment = $$props.segment;
  var _$$props$links = $$props.links,
      links = _$$props$links === void 0 ? [] : _$$props$links;
  var _$$props$slug = $$props.slug,
      slug = _$$props$slug === void 0 ? "" : _$$props$slug;
  var _$$props$currentEditC = $$props.currentEditCount,
      currentEditCount = _$$props$currentEditC === void 0 ? "" : _$$props$currentEditC;
  var writable_props = ["segment", "links", "slug", "currentEditCount"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<SeedNav> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("SeedNav", $$slots, []);

  $$self.$set = function ($$props) {
    if ("segment" in $$props) $$invalidate(4, segment = $$props.segment);
    if ("links" in $$props) $$invalidate(0, links = $$props.links);
    if ("slug" in $$props) $$invalidate(1, slug = $$props.slug);
    if ("currentEditCount" in $$props) $$invalidate(2, currentEditCount = $$props.currentEditCount);
  };

  $$self.$capture_state = function () {
    return {
      Button: Button,
      shouldShowUsernames: shouldShowUsernames,
      setShouldShowUsernames: setShouldShowUsernames,
      isSegmentActive: isSegmentActive,
      segment: segment,
      links: links,
      slug: slug,
      currentEditCount: currentEditCount
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("segment" in $$props) $$invalidate(4, segment = $$props.segment);
    if ("links" in $$props) $$invalidate(0, links = $$props.links);
    if ("slug" in $$props) $$invalidate(1, slug = $$props.slug);
    if ("currentEditCount" in $$props) $$invalidate(2, currentEditCount = $$props.currentEditCount);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [links, slug, currentEditCount, isSegmentActive, segment];
}

var SeedNav = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(SeedNav, _SvelteComponentDev);

  var _super = _createSuper$1(SeedNav);

  function SeedNav(options) {
    var _this;

    _classCallCheck(this, SeedNav);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      isSegmentActive: 3,
      segment: 4,
      links: 0,
      slug: 1,
      currentEditCount: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "SeedNav",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*segment*/
    ctx[4] === undefined && !("segment" in props)) {
      console.warn("<SeedNav> was created without expected prop 'segment'");
    }

    return _this;
  }

  _createClass(SeedNav, [{
    key: "isSegmentActive",
    get: function get() {
      return isSegmentActive;
    },
    set: function set(value) {
      throw new Error("<SeedNav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "segment",
    get: function get() {
      throw new Error("<SeedNav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SeedNav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "links",
    get: function get() {
      throw new Error("<SeedNav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SeedNav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "slug",
    get: function get() {
      throw new Error("<SeedNav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SeedNav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "currentEditCount",
    get: function get() {
      throw new Error("<SeedNav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<SeedNav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return SeedNav;
}(SvelteComponentDev);

var seeds = [
	{
		cellules_string: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111111000000000000000000000000000000000000000000011111110000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000011000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000001111111000000000000000000000000000000000000000000011111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "C",
		slug: "c"
	},
	{
		cellules_string: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111111111110000000000000000000000000000000000000100000000001100000000000000000000000000000000000010000000000101000000000000000000000000000000000001000000000010010000000000000000000000000000000000100000000001000100000000000000000000000000000000010000000000100001000000000000000000000000000000001000000000010000010000000000000000000000000000000111111111111000000100000000000000000000000000000001000000000010000001000000000000000000000000000000010000000000100000010000000000000000000000000000000100000000001000000100000000000000000000000000000001000000000010000001000000000000000000000000000000010000000000100000010000000000000000000000000000000100000000001000001000000000000000000000000000000001000000000010000100000000000000000000000000000000010000000000100010000000000000000000000000000000000100000000001001000000000000000000000000000000000001000000000010100000000000000000000000000000000000011111111111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "Cube",
		slug: "cube"
	},
	{
		cellules_string: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001100000000000000000000000000000000000000000000000011000000000000000000000000000000000000000000000001111000000000000000000000000000000000000000000000010010000000000000000000000000000000000000000000001100110000000000000000000000000000000000000000000010000100000000000000000000000000000000000000000001100001100000000000000000000000000000000000000000010000001000000000000000000000000000000000000000001100000011000000000000000000000000000000000000000010001100010000000000000000000000000000000000000001101111110110000000000000000000000000000000000000011111111111100000000000000000000000000000000000001111111111111100000000000000000000000000000000000001111111111110000000000000000000000000000000000000000111111100000000000000000000000000000000000000000000111110000000000000000000000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "Diamond",
		slug: "diamond"
	},
	{
		cellules_string: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011111111000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000001111111100000000000000000000000000000000000000000011111111000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000001111111100000000000000000000000000000000000000000011111111000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000000000000011111111000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000001111111100000000000000000000000000000000000000000011111111000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000001111111100000000000000000000000000000000000000000011111111000000000000000000000000000000000000000000111111110000000000000000000000000011111111111111111111111100000000000000000000000000111111111111111111111111000000000000000000000000001111111111111111111111110000000000000000000000000011111111111111111111111100000000000000000000000000111111111111111111111111000000000000000000000000001111111111111111111111110000000000000000000000000011111111111111111111111100000000000000000000000000111111111111111111111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "Glider",
		slug: "glider"
	},
	{
		cellules_string: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000011100000000000000000000000000000000000000000110001000100000000000000000000000000000000000000010100010000100000000000000000000000000000000000001001000000010000000000000000000000000000000000000100010000001000000000000000000000000000000000000011111110000100000000000000000000000000000000000000000001000010000000000000000000000000000000000000000000010001111110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "Forty Two",
		slug: "forty-two"
	},
	{
		cellules_string: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111111111100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "Line",
		slug: "line"
	},
	{
		cellules_string: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000010001111111110000000000000111000000000001100000001100011111111110000000000001110000000000011100000111000110000000110000000000011100000000000111100011110001100000000110000000000111000000000001101101101100011000000011000000000001110000000000011001110011000111111111100000000000011100000000000110000000110001111111111000000000000111000000000001100000001100011000000110000000000001110000000000011000000011000110000000110000000000011100000000000110000000110001100000000110000000000111000000000001100000001100011000000000110000000001110000000000000000000000000000000000000000000000011100000000000000000000000000000000000000000000000111000000000000000000000000000000000000000000000001110000000000000011111111000110000111111111000000011100000000000001111111110001100001111111111000000111000000000000110000000000011000011000000011000001110000000000011000000000000110000110000000011000011100000000000011111110000001100001100000001100000111000000000000011111110000011000011111111110000001110000000000000000000110000110000111111111100000011100000000000000000000110001100001100000011000000000000000000000000000001100011000011000000011000000000000000000011111111111000110000110000000011000011100000000000111111111100001100001100000000011000111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "Mr Sir",
		slug: "mr-sir"
	},
	{
		cellules_string: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000001011110100000000000000000000000000000000000000000011111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "Pentadecathlon",
		slug: "pentadecathlon"
	},
	{
		cellules_string: "00000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011101110111011101110111011101110111011101110111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
		name: "Windmills",
		slug: "windmills"
	}
];

export { SeedNav as S, SvelteTable as a, seeds as s };
