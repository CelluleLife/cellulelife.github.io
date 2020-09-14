import { V as _asyncToGenerator, W as regenerator, _ as _inherits, p as _getPrototypeOf, q as _possibleConstructorReturn, r as _classCallCheck, i as init, s as safe_not_equal, t as _assertThisInitialized, d as dispatch_dev, J as _createClass, S as SvelteComponentDev, v as validate_slots, L as onMount, Q as shouldShowUsernames, K as globals, u as space, w as element, x as text, y as create_component, z as query_selector_all, g as detach_dev, A as claim_space, c as claim_element, f as children, B as claim_text, C as claim_component, j as add_location, h as attr_dev, l as insert_dev, m as append_dev, D as mount_component, E as _slicedToArray, T as set_data_dev, G as transition_in, H as transition_out, I as destroy_component } from './client.8dd64bd6.js';
import { S as SeedNav, a as SvelteTable, s as seeds } from './seeds.5f02840c.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Object_1 = globals.Object,
    console_1 = globals.console;
var file = "src/routes/scores/[slug].svelte";

function create_fragment(ctx) {
  var t0;
  var div4;
  var div3;
  var h20;
  var t1;
  var t2;
  var t3;
  var t4;
  var div0;
  var h21;
  var t5;
  var t6;
  var div2;
  var t7;
  var div1;
  var t8;
  var current;
  var seednav = new SeedNav({
    props: {
      slug:
      /*slug*/
      ctx[0],
      links:
      /*links*/
      ctx[1]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      t0 = space();
      div4 = element("div");
      div3 = element("div");
      h20 = element("h2");
      t1 = text("High Scores: ");
      t2 = text(
      /*slug*/
      ctx[0]);
      t3 = space();
      create_component(seednav.$$.fragment);
      t4 = space();
      div0 = element("div");
      h21 = element("h2");
      t5 = text("Choose an edit count above.");
      t6 = space();
      div2 = element("div");
      t7 = text("Random Scores:\n\t\t\t");
      div1 = element("div");
      t8 = text("TODO");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-k12u4b\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div4 = claim_element(nodes, "DIV", {
        class: true
      });
      var div4_nodes = children(div4);
      div3 = claim_element(div4_nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      h20 = claim_element(div3_nodes, "H2", {});
      var h20_nodes = children(h20);
      t1 = claim_text(h20_nodes, "High Scores: ");
      t2 = claim_text(h20_nodes,
      /*slug*/
      ctx[0]);
      h20_nodes.forEach(detach_dev);
      t3 = claim_space(div3_nodes);
      claim_component(seednav.$$.fragment, div3_nodes);
      t4 = claim_space(div3_nodes);
      div0 = claim_element(div3_nodes, "DIV", {});
      var div0_nodes = children(div0);
      h21 = claim_element(div0_nodes, "H2", {});
      var h21_nodes = children(h21);
      t5 = claim_text(h21_nodes, "Choose an edit count above.");
      h21_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t6 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {});
      var div2_nodes = children(div2);
      t7 = claim_text(div2_nodes, "Random Scores:\n\t\t\t");
      div1 = claim_element(div2_nodes, "DIV", {});
      var div1_nodes = children(div1);
      t8 = claim_text(div1_nodes, "TODO");
      div1_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      div4_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Scores";
      add_location(h20, file, 82, 2, 1672);
      add_location(h21, file, 85, 3, 1760);
      add_location(div0, file, 84, 2, 1751);
      add_location(div1, file, 89, 3, 1835);
      add_location(div2, file, 87, 2, 1808);
      attr_dev(div3, "class", "");
      add_location(div3, file, 81, 1, 1655);
      attr_dev(div4, "class", "");
      add_location(div4, file, 80, 0, 1639);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div4, anchor);
      append_dev(div4, div3);
      append_dev(div3, h20);
      append_dev(h20, t1);
      append_dev(h20, t2);
      append_dev(div3, t3);
      mount_component(seednav, div3, null);
      append_dev(div3, t4);
      append_dev(div3, div0);
      append_dev(div0, h21);
      append_dev(h21, t5);
      append_dev(div3, t6);
      append_dev(div3, div2);
      append_dev(div2, t7);
      append_dev(div2, div1);
      append_dev(div1, t8);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (!current || dirty &
      /*slug*/
      1) set_data_dev(t2,
      /*slug*/
      ctx[0]);
      var seednav_changes = {};
      if (dirty &
      /*slug*/
      1) seednav_changes.slug =
      /*slug*/
      ctx[0];
      if (dirty &
      /*links*/
      2) seednav_changes.links =
      /*links*/
      ctx[1];
      seednav.$set(seednav_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(seednav.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(seednav.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div4);
      destroy_component(seednav);
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

function preload(_x, _x2) {
  return _preload.apply(this, arguments);
}

function _preload() {
  _preload = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(page, session) {
    var result, slug, highScoresBySeed, data, scores, links;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.fetch("http://localhost:3100/prod/get-high-scores");

          case 2:
            result = _context.sent;
            slug = page.params.slug;
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
                  return 0;
                }
              });
            });
            console.log({
              highScoresBySeed: highScoresBySeed
            });
            scores = highScoresBySeed;
            console.log({
              slug: slug
            });
            links = [];

            if (slug) {
              scores = highScoresBySeed[slug];
              links = Object.keys(scores);
            }

            return _context.abrupt("return", {
              scores: scores,
              slug: slug,
              links: links
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _preload.apply(this, arguments);
}

function instance($$self, $$props, $$invalidate) {
  var _$$props$scores = $$props.scores,
      scores = _$$props$scores === void 0 ? {} : _$$props$scores;
  var _$$props$slug = $$props.slug,
      slug = _$$props$slug === void 0 ? "" : _$$props$slug;
  var _$$props$links = $$props.links,
      links = _$$props$links === void 0 ? [] : _$$props$links;
  var writable_props = ["scores", "slug", "links"];
  Object_1.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn("<U5Bslugu5D> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("U5Bslugu5D", $$slots, []);

  $$self.$set = function ($$props) {
    if ("scores" in $$props) $$invalidate(2, scores = $$props.scores);
    if ("slug" in $$props) $$invalidate(0, slug = $$props.slug);
    if ("links" in $$props) $$invalidate(1, links = $$props.links);
  };

  $$self.$capture_state = function () {
    return {
      preload: preload,
      onMount: onMount,
      SvelteTable: SvelteTable,
      SeedNav: SeedNav,
      shouldShowUsernames: shouldShowUsernames,
      seeds: seeds,
      scores: scores,
      slug: slug,
      links: links
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("scores" in $$props) $$invalidate(2, scores = $$props.scores);
    if ("slug" in $$props) $$invalidate(0, slug = $$props.slug);
    if ("links" in $$props) $$invalidate(1, links = $$props.links);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [slug, links, scores];
}

var U5Bslugu5D = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(U5Bslugu5D, _SvelteComponentDev);

  var _super = _createSuper(U5Bslugu5D);

  function U5Bslugu5D(options) {
    var _this;

    _classCallCheck(this, U5Bslugu5D);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      scores: 2,
      slug: 0,
      links: 1
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "U5Bslugu5D",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  _createClass(U5Bslugu5D, [{
    key: "scores",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "slug",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "links",
    get: function get() {
      throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return U5Bslugu5D;
}(SvelteComponentDev);

export default U5Bslugu5D;
export { preload };
