import { _ as _inherits, p as _getPrototypeOf, q as _possibleConstructorReturn, r as _classCallCheck, i as init, s as safe_not_equal, t as _assertThisInitialized, d as dispatch_dev, J as _createClass, S as SvelteComponentDev, K as globals, L as onMount, M as afterUpdate, v as validate_slots, w as element, c as claim_element, f as children, g as detach_dev, h as attr_dev, j as add_location, l as insert_dev, o as noop, N as binding_callbacks, O as validate_each_argument, P as validate_store, Q as shouldShowUsernames, R as component_subscribe, x as text, u as space, B as claim_text, A as claim_space, m as append_dev, T as set_data_dev, E as _slicedToArray, U as destroy_each, V as _asyncToGenerator, W as regenerator, X as _toConsumableArray, y as create_component, C as claim_component, D as mount_component, G as transition_in, H as transition_out, I as destroy_component, z as query_selector_all, Y as group_outros, Z as check_outros } from './client.8dd64bd6.js';
import { S as SeedNav, a as SvelteTable, s as seeds } from './seeds.5f02840c.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var console_1 = globals.console;
var file = "src/components/AnimatedPreview.svelte";

function create_fragment(ctx) {
  var canvas_1;
  var block = {
    c: function create() {
      canvas_1 = element("canvas");
      this.h();
    },
    l: function claim(nodes) {
      canvas_1 = claim_element(nodes, "CANVAS", {
        height: true,
        width: true,
        class: true
      });
      children(canvas_1).forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(canvas_1, "height", "400");
      attr_dev(canvas_1, "width", "500");
      attr_dev(canvas_1, "class", "svelte-dxd97");
      add_location(canvas_1, file, 80, 0, 1507);
    },
    m: function mount(target, anchor) {
      insert_dev(target, canvas_1, anchor);
      /*canvas_1_binding*/

      ctx[5](canvas_1);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(canvas_1);
      /*canvas_1_binding*/

      ctx[5](null);
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
  var seed = $$props.seed;
  var modifications = $$props.modifications;
  var canvas;
  var mounted = false;

  var drawCanvas = function drawCanvas() {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 400);
    var frame;
    var currentIndex = 0;

    (function loop() {
      var isAlive = false;
      var isModification = false;

      while (!isAlive && !isModification && currentIndex < 2000) {
        isAlive = seed.cellules_string.charAt(currentIndex) === "1";
        isModification = modifications.find(function (modification) {
          return modification.grid_index === currentIndex;
        });

        if (!isAlive && !isModification) {
          currentIndex += 1;
        }
      }

      if (currentIndex < 2000) {
        frame = requestAnimationFrame(loop);
      } else {
        return;
      }

      if (isModification) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = "black";
      }

      var row = Math.floor(currentIndex / 50);
      var column = currentIndex - row * 50;

      if (row === 0) {
        column = currentIndex;
      }

      console.log({
        column: column,
        row: row,
        currentIndex: currentIndex
      });
      ctx.fillRect(column * 10, row * 10, 10, 10);
      currentIndex++;
    })();

    return function () {
      cancelAnimationFrame(frame);
    };
  };

  onMount(function () {
    mounted = true;
    drawCanvas();
  });
  afterUpdate(function () {
    if (mounted) {
      drawCanvas();
    }
  });
  var writable_props = ["seed", "modifications"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<AnimatedPreview> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("AnimatedPreview", $$slots, []);

  function canvas_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(0, canvas = $$value);
    });
  }

  $$self.$set = function ($$props) {
    if ("seed" in $$props) $$invalidate(1, seed = $$props.seed);
    if ("modifications" in $$props) $$invalidate(2, modifications = $$props.modifications);
  };

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      afterUpdate: afterUpdate,
      seed: seed,
      modifications: modifications,
      canvas: canvas,
      mounted: mounted,
      drawCanvas: drawCanvas
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("seed" in $$props) $$invalidate(1, seed = $$props.seed);
    if ("modifications" in $$props) $$invalidate(2, modifications = $$props.modifications);
    if ("canvas" in $$props) $$invalidate(0, canvas = $$props.canvas);
    if ("mounted" in $$props) mounted = $$props.mounted;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [canvas, seed, modifications, mounted, drawCanvas, canvas_1_binding];
}

var AnimatedPreview = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(AnimatedPreview, _SvelteComponentDev);

  var _super = _createSuper(AnimatedPreview);

  function AnimatedPreview(options) {
    var _this;

    _classCallCheck(this, AnimatedPreview);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      seed: 1,
      modifications: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "AnimatedPreview",
      options: options,
      id: create_fragment.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*seed*/
    ctx[1] === undefined && !("seed" in props)) {
      console_1.warn("<AnimatedPreview> was created without expected prop 'seed'");
    }

    if (
    /*modifications*/
    ctx[2] === undefined && !("modifications" in props)) {
      console_1.warn("<AnimatedPreview> was created without expected prop 'modifications'");
    }

    return _this;
  }

  _createClass(AnimatedPreview, [{
    key: "seed",
    get: function get() {
      throw new Error("<AnimatedPreview>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<AnimatedPreview>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "modifications",
    get: function get() {
      throw new Error("<AnimatedPreview>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<AnimatedPreview>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return AnimatedPreview;
}(SvelteComponentDev);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "src/components/score/LifeScoreDetails.svelte";

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  return child_ctx;
} // (63:6) {:else}


function create_else_block(ctx) {
  var div;
  var t_value =
  /*metric*/
  ctx[3].value + "";
  var t;
  var block = {
    c: function create() {
      div = element("div");
      t = text(t_value);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      t = claim_text(div_nodes, t_value);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "value svelte-1rps4h1");
      add_location(div, file$1, 63, 8, 1014);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, t);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*metrics*/
      1 && t_value !== (t_value =
      /*metric*/
      ctx[3].value + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block.name,
    type: "else",
    source: "(63:6) {:else}",
    ctx: ctx
  });
  return block;
} // (61:6) {#if metric.is_username && !$shouldShowUsernames}


function create_if_block(ctx) {
  var div;
  var t;
  var block = {
    c: function create() {
      div = element("div");
      t = text("****");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "****");
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "value svelte-1rps4h1");
      add_location(div, file$1, 61, 8, 962);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, t);
    },
    p: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block.name,
    type: "if",
    source: "(61:6) {#if metric.is_username && !$shouldShowUsernames}",
    ctx: ctx
  });
  return block;
} // (58:2) {#each metrics as metric}


function create_each_block(ctx) {
  var li;
  var div;
  var t0_value =
  /*metric*/
  ctx[3].label + "";
  var t0;
  var t1;
  var t2;

  function select_block_type(ctx, dirty) {
    if (
    /*metric*/
    ctx[3].is_username && !
    /*$shouldShowUsernames*/
    ctx[1]) return create_if_block;
    return create_else_block;
  }

  var current_block_type = select_block_type(ctx);
  var if_block = current_block_type(ctx);
  var block = {
    c: function create() {
      li = element("li");
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      if_block.c();
      t2 = space();
      this.h();
    },
    l: function claim(nodes) {
      li = claim_element(nodes, "LI", {
        class: true
      });
      var li_nodes = children(li);
      div = claim_element(li_nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, t0_value);
      div_nodes.forEach(detach_dev);
      t1 = claim_space(li_nodes);
      if_block.l(li_nodes);
      t2 = claim_space(li_nodes);
      li_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "label svelte-1rps4h1");
      add_location(div, file$1, 59, 6, 858);
      attr_dev(li, "class", "metric svelte-1rps4h1");
      add_location(li, file$1, 58, 4, 832);
    },
    m: function mount(target, anchor) {
      insert_dev(target, li, anchor);
      append_dev(li, div);
      append_dev(div, t0);
      append_dev(li, t1);
      if_block.m(li, null);
      append_dev(li, t2);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*metrics*/
      1 && t0_value !== (t0_value =
      /*metric*/
      ctx[3].label + "")) set_data_dev(t0, t0_value);

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(li, t2);
        }
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(li);
      if_block.d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(58:2) {#each metrics as metric}",
    ctx: ctx
  });
  return block;
}

function create_fragment$1(ctx) {
  var ul;
  var each_value =
  /*metrics*/
  ctx[0];
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  var block = {
    c: function create() {
      ul = element("ul");

      for (var _i = 0; _i < each_blocks.length; _i += 1) {
        each_blocks[_i].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      ul = claim_element(nodes, "UL", {
        class: true
      });
      var ul_nodes = children(ul);

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].l(ul_nodes);
      }

      ul_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(ul, "class", "metrics svelte-1rps4h1");
      add_location(ul, file$1, 56, 0, 779);
    },
    m: function mount(target, anchor) {
      insert_dev(target, ul, anchor);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].m(ul, null);
      }
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*metrics, $shouldShowUsernames*/
      3) {
        each_value =
        /*metrics*/
        ctx[0];
        validate_each_argument(each_value);

        var _i4;

        for (_i4 = 0; _i4 < each_value.length; _i4 += 1) {
          var child_ctx = get_each_context(ctx, each_value, _i4);

          if (each_blocks[_i4]) {
            each_blocks[_i4].p(child_ctx, dirty);
          } else {
            each_blocks[_i4] = create_each_block(child_ctx);

            each_blocks[_i4].c();

            each_blocks[_i4].m(ul, null);
          }
        }

        for (; _i4 < each_blocks.length; _i4 += 1) {
          each_blocks[_i4].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(ul);
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

function instance$1($$self, $$props, $$invalidate) {
  var $shouldShowUsernames;
  validate_store(shouldShowUsernames, "shouldShowUsernames");
  component_subscribe($$self, shouldShowUsernames, function ($$value) {
    return $$invalidate(1, $shouldShowUsernames = $$value);
  });
  var score = $$props.score;
  var metrics = [];
  afterUpdate(function () {
    $$invalidate(0, metrics = [{
      label: "Step Count",
      value: score.step_count
    }, {
      label: "Active Count",
      value: score.active_count
    }, {
      label: "User Name",
      value: score.user_name,
      is_username: true
    }]);
  });
  var writable_props = ["score"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<LifeScoreDetails> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("LifeScoreDetails", $$slots, []);

  $$self.$set = function ($$props) {
    if ("score" in $$props) $$invalidate(2, score = $$props.score);
  };

  $$self.$capture_state = function () {
    return {
      onMount: onMount,
      afterUpdate: afterUpdate,
      shouldShowUsernames: shouldShowUsernames,
      score: score,
      metrics: metrics,
      $shouldShowUsernames: $shouldShowUsernames
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("score" in $$props) $$invalidate(2, score = $$props.score);
    if ("metrics" in $$props) $$invalidate(0, metrics = $$props.metrics);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [metrics, $shouldShowUsernames, score];
}

var LifeScoreDetails = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(LifeScoreDetails, _SvelteComponentDev);

  var _super = _createSuper$1(LifeScoreDetails);

  function LifeScoreDetails(options) {
    var _this;

    _classCallCheck(this, LifeScoreDetails);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      score: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "LifeScoreDetails",
      options: options,
      id: create_fragment$1.name
    });
    var ctx = _this.$$.ctx;
    var props = options.props || {};

    if (
    /*score*/
    ctx[2] === undefined && !("score" in props)) {
      console.warn("<LifeScoreDetails> was created without expected prop 'score'");
    }

    return _this;
  }

  _createClass(LifeScoreDetails, [{
    key: "score",
    get: function get() {
      throw new Error("<LifeScoreDetails>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<LifeScoreDetails>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return LifeScoreDetails;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object,
    console_1$1 = globals.console;
var file$2 = "src/routes/scores/[slug]/[editCount].svelte"; // (199:4) {:else}

function create_else_block_1(ctx) {
  var h2;
  var t0;
  var t1;
  var t2;
  var t3;
  var t4;
  var block = {
    c: function create() {
      h2 = element("h2");
      t0 = text("Scores: ");
      t1 = text(
      /*slug*/
      ctx[1]);
      t2 = text(" (");
      t3 = text(
      /*editCount*/
      ctx[2]);
      t4 = text(" edit)");
      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {});
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Scores: ");
      t1 = claim_text(h2_nodes,
      /*slug*/
      ctx[1]);
      t2 = claim_text(h2_nodes, " (");
      t3 = claim_text(h2_nodes,
      /*editCount*/
      ctx[2]);
      t4 = claim_text(h2_nodes, " edit)");
      h2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h2, file$2, 199, 4, 4072);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t0);
      append_dev(h2, t1);
      append_dev(h2, t2);
      append_dev(h2, t3);
      append_dev(h2, t4);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*slug*/
      2) set_data_dev(t1,
      /*slug*/
      ctx[1]);
      if (dirty &
      /*editCount*/
      4) set_data_dev(t3,
      /*editCount*/
      ctx[2]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block_1.name,
    type: "else",
    source: "(199:4) {:else}",
    ctx: ctx
  });
  return block;
} // (197:4) {#if editCount !== '1'}


function create_if_block_3(ctx) {
  var h2;
  var t0;
  var t1;
  var t2;
  var t3;
  var t4;
  var block = {
    c: function create() {
      h2 = element("h2");
      t0 = text("High Scores: ");
      t1 = text(
      /*slug*/
      ctx[1]);
      t2 = text(" (");
      t3 = text(
      /*editCount*/
      ctx[2]);
      t4 = text(" edits)");
      this.h();
    },
    l: function claim(nodes) {
      h2 = claim_element(nodes, "H2", {});
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "High Scores: ");
      t1 = claim_text(h2_nodes,
      /*slug*/
      ctx[1]);
      t2 = claim_text(h2_nodes, " (");
      t3 = claim_text(h2_nodes,
      /*editCount*/
      ctx[2]);
      t4 = claim_text(h2_nodes, " edits)");
      h2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h2, file$2, 197, 6, 4007);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h2, anchor);
      append_dev(h2, t0);
      append_dev(h2, t1);
      append_dev(h2, t2);
      append_dev(h2, t3);
      append_dev(h2, t4);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*slug*/
      2) set_data_dev(t1,
      /*slug*/
      ctx[1]);
      if (dirty &
      /*editCount*/
      4) set_data_dev(t3,
      /*editCount*/
      ctx[2]);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h2);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_3.name,
    type: "if",
    source: "(197:4) {#if editCount !== '1'}",
    ctx: ctx
  });
  return block;
} // (213:12) {#if currentSeed}


function create_if_block_2(ctx) {
  var current;
  var animatedpreview = new AnimatedPreview({
    props: {
      seed:
      /*currentSeed*/
      ctx[7],
      modifications:
      /*scores*/
      ctx[4][0].modifications
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(animatedpreview.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(animatedpreview.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(animatedpreview, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var animatedpreview_changes = {};
      if (dirty &
      /*currentSeed*/
      128) animatedpreview_changes.seed =
      /*currentSeed*/
      ctx[7];
      if (dirty &
      /*scores*/
      16) animatedpreview_changes.modifications =
      /*scores*/
      ctx[4][0].modifications;
      animatedpreview.$set(animatedpreview_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(animatedpreview.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(animatedpreview.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(animatedpreview, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_2.name,
    type: "if",
    source: "(213:12) {#if currentSeed}",
    ctx: ctx
  });
  return block;
} // (229:12) {#if currentSeed}


function create_if_block_1(ctx) {
  var current;
  var animatedpreview = new AnimatedPreview({
    props: {
      seed:
      /*currentSeed*/
      ctx[7],
      modifications:
      /*lowScores*/
      ctx[5][0].modifications
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(animatedpreview.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(animatedpreview.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(animatedpreview, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var animatedpreview_changes = {};
      if (dirty &
      /*currentSeed*/
      128) animatedpreview_changes.seed =
      /*currentSeed*/
      ctx[7];
      if (dirty &
      /*lowScores*/
      32) animatedpreview_changes.modifications =
      /*lowScores*/
      ctx[5][0].modifications;
      animatedpreview.$set(animatedpreview_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(animatedpreview.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(animatedpreview.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(animatedpreview, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block_1.name,
    type: "if",
    source: "(229:12) {#if currentSeed}",
    ctx: ctx
  });
  return block;
} // (238:4) {:else}


function create_else_block$1(ctx) {
  var current;
  var sveltetable = new SvelteTable({
    props: {
      columns:
      /*maskedColumns*/
      ctx[0],
      rows:
      /*scores*/
      ctx[4]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(sveltetable.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(sveltetable.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(sveltetable, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var sveltetable_changes = {};
      if (dirty &
      /*maskedColumns*/
      1) sveltetable_changes.columns =
      /*maskedColumns*/
      ctx[0];
      if (dirty &
      /*scores*/
      16) sveltetable_changes.rows =
      /*scores*/
      ctx[4];
      sveltetable.$set(sveltetable_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(sveltetable.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(sveltetable.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(sveltetable, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_else_block$1.name,
    type: "else",
    source: "(238:4) {:else}",
    ctx: ctx
  });
  return block;
} // (236:4) {#if $shouldShowUsernames}


function create_if_block$1(ctx) {
  var current;
  var sveltetable = new SvelteTable({
    props: {
      columns:
      /*columns*/
      ctx[6],
      rows:
      /*scores*/
      ctx[4]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(sveltetable.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(sveltetable.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(sveltetable, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var sveltetable_changes = {};
      if (dirty &
      /*scores*/
      16) sveltetable_changes.rows =
      /*scores*/
      ctx[4];
      sveltetable.$set(sveltetable_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(sveltetable.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(sveltetable.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(sveltetable, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_if_block$1.name,
    type: "if",
    source: "(236:4) {#if $shouldShowUsernames}",
    ctx: ctx
  });
  return block;
}

function create_fragment$2(ctx) {
  var t0;
  var div10;
  var div9;
  var t1;
  var t2;
  var div8;
  var div3;
  var h30;
  var t3;
  var t4;
  var div2;
  var div0;
  var t5;
  var div1;
  var t6;
  var div7;
  var h31;
  var t7;
  var t8;
  var div6;
  var div4;
  var t9;
  var div5;
  var t10;
  var current_block_type_index;
  var if_block3;
  var current;

  function select_block_type(ctx, dirty) {
    if (
    /*editCount*/
    ctx[2] !== "1") return create_if_block_3;
    return create_else_block_1;
  }

  var current_block_type = select_block_type(ctx);
  var if_block0 = current_block_type(ctx);
  var seednav = new SeedNav({
    props: {
      slug:
      /*slug*/
      ctx[1],
      links:
      /*links*/
      ctx[3],
      currentEditCount:
      /*editCount*/
      ctx[2]
    },
    $$inline: true
  });
  var lifescoredetails0 = new LifeScoreDetails({
    props: {
      score:
      /*scores*/
      ctx[4][0]
    },
    $$inline: true
  });
  var if_block1 =
  /*currentSeed*/
  ctx[7] && create_if_block_2(ctx);
  var lifescoredetails1 = new LifeScoreDetails({
    props: {
      score:
      /*lowScores*/
      ctx[5][0]
    },
    $$inline: true
  });
  var if_block2 =
  /*currentSeed*/
  ctx[7] && create_if_block_1(ctx);
  var if_block_creators = [create_if_block$1, create_else_block$1];
  var if_blocks = [];

  function select_block_type_1(ctx, dirty) {
    if (
    /*$shouldShowUsernames*/
    ctx[8]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type_1(ctx);
  if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  var block = {
    c: function create() {
      t0 = space();
      div10 = element("div");
      div9 = element("div");
      if_block0.c();
      t1 = space();
      create_component(seednav.$$.fragment);
      t2 = space();
      div8 = element("div");
      div3 = element("div");
      h30 = element("h3");
      t3 = text("Best Life Score");
      t4 = space();
      div2 = element("div");
      div0 = element("div");
      create_component(lifescoredetails0.$$.fragment);
      t5 = space();
      div1 = element("div");
      if (if_block1) if_block1.c();
      t6 = space();
      div7 = element("div");
      h31 = element("h3");
      t7 = text("Best Death Score");
      t8 = space();
      div6 = element("div");
      div4 = element("div");
      create_component(lifescoredetails1.$$.fragment);
      t9 = space();
      div5 = element("div");
      if (if_block2) if_block2.c();
      t10 = space();
      if_block3.c();
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-k12u4b\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div10 = claim_element(nodes, "DIV", {
        class: true
      });
      var div10_nodes = children(div10);
      div9 = claim_element(div10_nodes, "DIV", {
        class: true
      });
      var div9_nodes = children(div9);
      if_block0.l(div9_nodes);
      t1 = claim_space(div9_nodes);
      claim_component(seednav.$$.fragment, div9_nodes);
      t2 = claim_space(div9_nodes);
      div8 = claim_element(div9_nodes, "DIV", {
        class: true
      });
      var div8_nodes = children(div8);
      div3 = claim_element(div8_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      h30 = claim_element(div3_nodes, "H3", {
        class: true
      });
      var h30_nodes = children(h30);
      t3 = claim_text(h30_nodes, "Best Life Score");
      h30_nodes.forEach(detach_dev);
      t4 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      claim_component(lifescoredetails0.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach_dev);
      t5 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true,
        i18n: true
      });
      var div1_nodes = children(div1);
      if (if_block1) if_block1.l(div1_nodes);
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      t6 = claim_space(div8_nodes);
      div7 = claim_element(div8_nodes, "DIV", {
        class: true
      });
      var div7_nodes = children(div7);
      h31 = claim_element(div7_nodes, "H3", {
        class: true
      });
      var h31_nodes = children(h31);
      t7 = claim_text(h31_nodes, "Best Death Score");
      h31_nodes.forEach(detach_dev);
      t8 = claim_space(div7_nodes);
      div6 = claim_element(div7_nodes, "DIV", {
        class: true
      });
      var div6_nodes = children(div6);
      div4 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      claim_component(lifescoredetails1.$$.fragment, div4_nodes);
      div4_nodes.forEach(detach_dev);
      t9 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {
        class: true
      });
      var div5_nodes = children(div5);
      if (if_block2) if_block2.l(div5_nodes);
      div5_nodes.forEach(detach_dev);
      div6_nodes.forEach(detach_dev);
      div7_nodes.forEach(detach_dev);
      div8_nodes.forEach(detach_dev);
      t10 = claim_space(div9_nodes);
      if_block3.l(div9_nodes);
      div9_nodes.forEach(detach_dev);
      div10_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Scores";
      attr_dev(h30, "class", "featured-score-type-title svelte-196bron");
      add_location(h30, file$2, 204, 8, 4301);
      attr_dev(div0, "class", "featured-score-details svelte-196bron");
      add_location(div0, file$2, 206, 10, 4415);
      attr_dev(div1, "class", "featured-score-image-wrapper svelte-196bron");
      attr_dev(div1, "i18n", "");
      add_location(div1, file$2, 211, 10, 4574);
      attr_dev(div2, "class", "featured-score-content svelte-196bron");
      add_location(div2, file$2, 205, 8, 4368);
      attr_dev(div3, "class", "featured-score featured-life-score svelte-196bron");
      add_location(div3, file$2, 203, 6, 4244);
      attr_dev(h31, "class", "featured-score-type-title svelte-196bron");
      add_location(h31, file$2, 220, 8, 4873);
      attr_dev(div4, "class", "featured-score-details svelte-196bron");
      add_location(div4, file$2, 222, 10, 4988);
      attr_dev(div5, "class", "featured-score-image-wrapper svelte-196bron");
      add_location(div5, file$2, 227, 10, 5150);
      attr_dev(div6, "class", "featured-score-content svelte-196bron");
      add_location(div6, file$2, 221, 8, 4941);
      attr_dev(div7, "class", "featured-score featured-death-score svelte-196bron");
      add_location(div7, file$2, 219, 6, 4815);
      attr_dev(div8, "class", "featured-scores svelte-196bron");
      add_location(div8, file$2, 202, 4, 4208);
      attr_dev(div9, "class", "");
      add_location(div9, file$2, 195, 1, 3958);
      attr_dev(div10, "class", "");
      add_location(div10, file$2, 194, 0, 3942);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div10, anchor);
      append_dev(div10, div9);
      if_block0.m(div9, null);
      append_dev(div9, t1);
      mount_component(seednav, div9, null);
      append_dev(div9, t2);
      append_dev(div9, div8);
      append_dev(div8, div3);
      append_dev(div3, h30);
      append_dev(h30, t3);
      append_dev(div3, t4);
      append_dev(div3, div2);
      append_dev(div2, div0);
      mount_component(lifescoredetails0, div0, null);
      append_dev(div2, t5);
      append_dev(div2, div1);
      if (if_block1) if_block1.m(div1, null);
      append_dev(div8, t6);
      append_dev(div8, div7);
      append_dev(div7, h31);
      append_dev(h31, t7);
      append_dev(div7, t8);
      append_dev(div7, div6);
      append_dev(div6, div4);
      mount_component(lifescoredetails1, div4, null);
      append_dev(div6, t9);
      append_dev(div6, div5);
      if (if_block2) if_block2.m(div5, null);
      append_dev(div9, t10);
      if_blocks[current_block_type_index].m(div9, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);

        if (if_block0) {
          if_block0.c();
          if_block0.m(div9, t1);
        }
      }

      var seednav_changes = {};
      if (dirty &
      /*slug*/
      2) seednav_changes.slug =
      /*slug*/
      ctx[1];
      if (dirty &
      /*links*/
      8) seednav_changes.links =
      /*links*/
      ctx[3];
      if (dirty &
      /*editCount*/
      4) seednav_changes.currentEditCount =
      /*editCount*/
      ctx[2];
      seednav.$set(seednav_changes);
      var lifescoredetails0_changes = {};
      if (dirty &
      /*scores*/
      16) lifescoredetails0_changes.score =
      /*scores*/
      ctx[4][0];
      lifescoredetails0.$set(lifescoredetails0_changes);

      if (
      /*currentSeed*/
      ctx[7]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*currentSeed*/
          128) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, function () {
          if_block1 = null;
        });
        check_outros();
      }

      var lifescoredetails1_changes = {};
      if (dirty &
      /*lowScores*/
      32) lifescoredetails1_changes.score =
      /*lowScores*/
      ctx[5][0];
      lifescoredetails1.$set(lifescoredetails1_changes);

      if (
      /*currentSeed*/
      ctx[7]) {
        if (if_block2) {
          if_block2.p(ctx, dirty);

          if (dirty &
          /*currentSeed*/
          128) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div5, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, function () {
          if_block2 = null;
        });
        check_outros();
      }

      var previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, function () {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block3 = if_blocks[current_block_type_index];

        if (!if_block3) {
          if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block3.c();
        }

        transition_in(if_block3, 1);
        if_block3.m(div9, null);
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(seednav.$$.fragment, local);
      transition_in(lifescoredetails0.$$.fragment, local);
      transition_in(if_block1);
      transition_in(lifescoredetails1.$$.fragment, local);
      transition_in(if_block2);
      transition_in(if_block3);
      current = true;
    },
    o: function outro(local) {
      transition_out(seednav.$$.fragment, local);
      transition_out(lifescoredetails0.$$.fragment, local);
      transition_out(if_block1);
      transition_out(lifescoredetails1.$$.fragment, local);
      transition_out(if_block2);
      transition_out(if_block3);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div10);
      if_block0.d();
      destroy_component(seednav);
      destroy_component(lifescoredetails0);
      if (if_block1) if_block1.d();
      destroy_component(lifescoredetails1);
      if (if_block2) if_block2.d();
      if_blocks[current_block_type_index].d();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function preload(_x, _x2) {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(page, session) {
    var result, _page$params, slug, editCount, highScoresBySeed, data, scores, links, lowScores;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.fetch("http://localhost:3100/prod/get-high-scores");

          case 2:
            result = _context.sent;
            _page$params = page.params, slug = _page$params.slug, editCount = _page$params.editCount;
            highScoresBySeed = {};
            _context.next = 7;
            return result.json();

          case 7:
            data = _context.sent;
            console.log({
              data: data
            });
            data.scores.map(function (score) {
              var seedLabel = score.seed_label;
              console.log({
                seedLabel: seedLabel
              });
              var modificationCount = score.modifications.length;

              if (!highScoresBySeed[seedLabel]) {
                highScoresBySeed[seedLabel] = {};
              }

              if (!highScoresBySeed[seedLabel][modificationCount]) {
                highScoresBySeed[seedLabel][modificationCount] = [];
              }

              highScoresBySeed[seedLabel][modificationCount].push(score);
              highScoresBySeed[seedLabel][modificationCount].sort(function (scoreA, scoreB) {
                if (scoreA.step_count < scoreB.step_count) {
                  return 1;
                } else if (scoreA.step_count > scoreB.step_count) {
                  return -1;
                } else {
                  if (scoreA.active_count < scoreB.active_count) {
                    return 1;
                  } else if (scoreA.active_count > scoreB.active_count) {
                    return -1;
                  }

                  return 0;
                }
              });
            });
            console.log({
              highScoresBySeed: highScoresBySeed
            });
            scores = highScoresBySeed;
            links = [];
            console.log({
              slug: slug
            });

            if (slug) {
              scores = highScoresBySeed[slug];
              links = Object.keys(scores);
            }

            if (editCount) {
              scores = scores[editCount];
            }

            lowScores = _toConsumableArray(scores).sort(function (scoreA, scoreB) {
              if (scoreA.active_count > scoreB.active_count) {
                return 1;
              } else if (scoreA.active_count < scoreB.active_count) {
                return -1;
              } else {
                if (scoreA.step_count > scoreB.step_count) {
                  return 1;
                } else if (scoreA.step_count < scoreB.step_count) {
                  return -1;
                }

                return 0;
              }
            });
            return _context.abrupt("return", {
              scores: scores,
              lowScores: lowScores,
              slug: slug,
              editCount: editCount,
              links: links
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _preload.apply(this, arguments);
}

function instance$2($$self, $$props, $$invalidate) {
  var $shouldShowUsernames;
  validate_store(shouldShowUsernames, "shouldShowUsernames");
  component_subscribe($$self, shouldShowUsernames, function ($$value) {
    return $$invalidate(8, $shouldShowUsernames = $$value);
  });
  var _$$props$slug = $$props.slug,
      slug = _$$props$slug === void 0 ? "" : _$$props$slug;
  var _$$props$editCount = $$props.editCount,
      editCount = _$$props$editCount === void 0 ? 0 : _$$props$editCount;
  var _$$props$links = $$props.links,
      links = _$$props$links === void 0 ? [] : _$$props$links;
  var _$$props$scores = $$props.scores,
      scores = _$$props$scores === void 0 ? [] : _$$props$scores;
  var _$$props$lowScores = $$props.lowScores,
      lowScores = _$$props$lowScores === void 0 ? [] : _$$props$lowScores;
  var columns = [{
    key: "user_name",
    title: "User Name",
    value: function value(v) {
      return v.user_name;
    },
    sortable: true
  }, {
    key: "step_count",
    title: "Step Count",
    value: function value(v) {
      return v.step_count;
    },
    sortable: true
  }, {
    key: "active_count",
    title: "Active Count",
    value: function value(v) {
      return v.active_count;
    },
    sortable: true
  }];
  var maskedColumns = [].concat(columns);
  maskedColumns[0] = {
    key: "user_name",
    title: "User Name",
    value: function value(v) {
      return "****";
    },
    sortable: true
  };
  var currentSeed;
  onMount(function () {
    console.log({
      seeds: seeds,
      slug: slug
    }); // currentSeed

    seeds.forEach(function (seed) {
      if (seed.name === slug) {
        $$invalidate(7, currentSeed = seed);
      }
    });
  });
  var writable_props = ["slug", "editCount", "links", "scores", "lowScores"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn("<U5BeditCountu5D> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5BeditCountu5D", $$slots, []);

  $$self.$set = function ($$props) {
    if ("slug" in $$props) $$invalidate(1, slug = $$props.slug);
    if ("editCount" in $$props) $$invalidate(2, editCount = $$props.editCount);
    if ("links" in $$props) $$invalidate(3, links = $$props.links);
    if ("scores" in $$props) $$invalidate(4, scores = $$props.scores);
    if ("lowScores" in $$props) $$invalidate(5, lowScores = $$props.lowScores);
  };

  $$self.$capture_state = function () {
    return {
      preload: preload,
      onMount: onMount,
      SvelteTable: SvelteTable,
      SeedNav: SeedNav,
      AnimatedPreview: AnimatedPreview,
      LifeScoreDetails: LifeScoreDetails,
      shouldShowUsernames: shouldShowUsernames,
      seeds: seeds,
      slug: slug,
      editCount: editCount,
      links: links,
      scores: scores,
      lowScores: lowScores,
      columns: columns,
      maskedColumns: maskedColumns,
      currentSeed: currentSeed,
      $shouldShowUsernames: $shouldShowUsernames
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("slug" in $$props) $$invalidate(1, slug = $$props.slug);
    if ("editCount" in $$props) $$invalidate(2, editCount = $$props.editCount);
    if ("links" in $$props) $$invalidate(3, links = $$props.links);
    if ("scores" in $$props) $$invalidate(4, scores = $$props.scores);
    if ("lowScores" in $$props) $$invalidate(5, lowScores = $$props.lowScores);
    if ("currentSeed" in $$props) $$invalidate(7, currentSeed = $$props.currentSeed);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [maskedColumns, slug, editCount, links, scores, lowScores, columns, currentSeed, $shouldShowUsernames];
}

var U5BeditCountu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5BeditCountu5D, _SvelteComponentDev);

  var _super = _createSuper$2(U5BeditCountu5D);

  function U5BeditCountu5D(options) {
    var _this;

    _classCallCheck(this, U5BeditCountu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      slug: 1,
      editCount: 2,
      links: 3,
      scores: 4,
      lowScores: 5,
      columns: 6,
      maskedColumns: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5BeditCountu5D",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }

  _createClass(U5BeditCountu5D, [{
    key: "slug",
    get: function get() {
      throw new Error("<U5BeditCountu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5BeditCountu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "editCount",
    get: function get() {
      throw new Error("<U5BeditCountu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5BeditCountu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "links",
    get: function get() {
      throw new Error("<U5BeditCountu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5BeditCountu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "scores",
    get: function get() {
      throw new Error("<U5BeditCountu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5BeditCountu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "lowScores",
    get: function get() {
      throw new Error("<U5BeditCountu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5BeditCountu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "columns",
    get: function get() {
      return this.$$.ctx[6];
    },
    set: function set(value) {
      throw new Error("<U5BeditCountu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "maskedColumns",
    get: function get() {
      return this.$$.ctx[0];
    },
    set: function set(value) {
      throw new Error("<U5BeditCountu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5BeditCountu5D;
}(SvelteComponentDev);

export default U5BeditCountu5D;
export { preload };
