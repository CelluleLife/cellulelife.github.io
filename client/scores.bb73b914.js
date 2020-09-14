import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, I as validate_each_argument, v as validate_slots, F as onMount, E as globals, q as element, p as space, t as text, c as claim_element, f as children, w as claim_space, x as claim_text, g as detach_dev, h as attr_dev, j as add_location, l as insert_dev, m as append_dev, M as set_data_dev, u as query_selector_all, o as noop, N as destroy_each } from './client.d845b9be.js';

var c = "https://www.fillmurray.com/201/201";
var cube = "https://www.fillmurray.com/203/203";
var diamond = "https://www.fillmurray.com/204/204";
var glider = "https://www.fillmurray.com/205/205";
var line = "https://www.fillmurray.com/208/208";
var pentadecathlon = "https://www.fillmurray.com/211/211";
var windmills = "https://www.fillmurray.com/213/213";
var seedImageUrls = {
	c: c,
	cube: cube,
	diamond: diamond,
	glider: glider,
	"forty-two": "https://www.fillmurray.com/207/207",
	line: line,
	"mr-sir": "https://www.fillmurray.com/210/210",
	pentadecathlon: pentadecathlon,
	windmills: windmills
};

function slugify (text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-");
}

/* src/routes/scores.svelte generated by Svelte v3.23.0 */

const { Object: Object_1, console: console_1 } = globals;
const file = "src/routes/scores.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	child_ctx[4] = i;
	return child_ctx;
}

// (101:0) {#each Object.keys(scores) as seed, seedIndex}
function create_each_block(ctx) {
	let div2;
	let a;
	let img;
	let img_src_value;
	let img_alt_value;
	let t0;
	let h3;
	let t1_value = /*seed*/ ctx[2] + "";
	let t1;
	let t2;
	let div0;
	let t3;
	let t4_value = /*scores*/ ctx[0][/*seed*/ ctx[2]].highestSteps + "";
	let t4;
	let t5;
	let div1;
	let t6;
	let t7_value = /*scores*/ ctx[0][/*seed*/ ctx[2]].count + "";
	let t7;
	let a_href_value;
	let t8;

	const block = {
		c: function create() {
			div2 = element("div");
			a = element("a");
			img = element("img");
			t0 = space();
			h3 = element("h3");
			t1 = text(t1_value);
			t2 = space();
			div0 = element("div");
			t3 = text("High Score: ");
			t4 = text(t4_value);
			t5 = space();
			div1 = element("div");
			t6 = text("Count: ");
			t7 = text(t7_value);
			t8 = space();
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			a = claim_element(div2_nodes, "A", { href: true });
			var a_nodes = children(a);
			img = claim_element(a_nodes, "IMG", { src: true, alt: true, class: true });
			t0 = claim_space(a_nodes);
			h3 = claim_element(a_nodes, "H3", {});
			var h3_nodes = children(h3);
			t1 = claim_text(h3_nodes, t1_value);
			h3_nodes.forEach(detach_dev);
			t2 = claim_space(a_nodes);
			div0 = claim_element(a_nodes, "DIV", {});
			var div0_nodes = children(div0);
			t3 = claim_text(div0_nodes, "High Score: ");
			t4 = claim_text(div0_nodes, t4_value);
			div0_nodes.forEach(detach_dev);
			t5 = claim_space(a_nodes);
			div1 = claim_element(a_nodes, "DIV", {});
			var div1_nodes = children(div1);
			t6 = claim_text(div1_nodes, "Count: ");
			t7 = claim_text(div1_nodes, t7_value);
			div1_nodes.forEach(detach_dev);
			a_nodes.forEach(detach_dev);
			t8 = claim_space(div2_nodes);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			if (img.src !== (img_src_value = /*getSeedImageUrl*/ ctx[1](/*seed*/ ctx[2]))) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", img_alt_value = "Starting Seed Map: " + /*seed*/ ctx[2]);
			attr_dev(img, "class", "svelte-hetykt");
			add_location(img, file, 103, 3, 2137);
			add_location(h3, file, 107, 3, 2221);
			add_location(div0, file, 108, 3, 2240);
			add_location(div1, file, 109, 3, 2294);
			attr_dev(a, "href", a_href_value = "/scores/" + /*seed*/ ctx[2]);
			add_location(a, file, 102, 2, 2108);
			attr_dev(div2, "class", "tile-wrapper svelte-hetykt");
			add_location(div2, file, 101, 1, 2079);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, a);
			append_dev(a, img);
			append_dev(a, t0);
			append_dev(a, h3);
			append_dev(h3, t1);
			append_dev(a, t2);
			append_dev(a, div0);
			append_dev(div0, t3);
			append_dev(div0, t4);
			append_dev(a, t5);
			append_dev(a, div1);
			append_dev(div1, t6);
			append_dev(div1, t7);
			append_dev(div2, t8);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*scores*/ 1 && img.src !== (img_src_value = /*getSeedImageUrl*/ ctx[1](/*seed*/ ctx[2]))) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*scores*/ 1 && img_alt_value !== (img_alt_value = "Starting Seed Map: " + /*seed*/ ctx[2])) {
				attr_dev(img, "alt", img_alt_value);
			}

			if (dirty & /*scores*/ 1 && t1_value !== (t1_value = /*seed*/ ctx[2] + "")) set_data_dev(t1, t1_value);
			if (dirty & /*scores*/ 1 && t4_value !== (t4_value = /*scores*/ ctx[0][/*seed*/ ctx[2]].highestSteps + "")) set_data_dev(t4, t4_value);
			if (dirty & /*scores*/ 1 && t7_value !== (t7_value = /*scores*/ ctx[0][/*seed*/ ctx[2]].count + "")) set_data_dev(t7, t7_value);

			if (dirty & /*scores*/ 1 && a_href_value !== (a_href_value = "/scores/" + /*seed*/ ctx[2])) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(101:0) {#each Object.keys(scores) as seed, seedIndex}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let div;
	let each_value = Object.keys(/*scores*/ ctx[0]);
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			t = space();
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-k12u4b\"]", document.head);
			head_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Scores";
			attr_dev(div, "class", "tiles-container svelte-hetykt");
			add_location(div, file, 99, 0, 2001);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*Object, scores, getSeedImageUrl*/ 3) {
				each_value = Object.keys(/*scores*/ ctx[0]);
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function preload() {
	const ignoredSeeds = ["Bim", "Coles", "Wall", "hmm", "Ligma"];
	const result = await this.fetch("http://localhost:3100/prod/get-high-scores");
	const highScoresBySeed = {};
	const data = await result.json();
	console.log({ data });

	data.scores.map(score => {
		const seedLabel = score.seed_label;
		console.log({ seedLabel });

		if (ignoredSeeds.indexOf(seedLabel) > -1) {
			return;
		}

		const modificationCount = score.modifications.length;

		if (!highScoresBySeed[seedLabel]) {
			highScoresBySeed[seedLabel] = { count: 0, highestSteps: 0 };
		}

		if (!highScoresBySeed[seedLabel][modificationCount]) {
			highScoresBySeed[seedLabel][modificationCount] = [];
		}

		highScoresBySeed[seedLabel].count += 1;

		if (score.step_count > highScoresBySeed[seedLabel].highestSteps) {
			highScoresBySeed[seedLabel].highestSteps = score.step_count;
		}

		highScoresBySeed[seedLabel][modificationCount].push(score);

		highScoresBySeed[seedLabel][modificationCount].sort((scoreA, scoreB) => {
			if (scoreA.step_count < scoreB.step_count) {
				return 1;
			} else if (scoreA.step_count > scoreB.step_count) {
				return -1;
			} else {
				return 0;
			}
		});
	});

	console.log({ highScoresBySeed });
	return { scores: highScoresBySeed };
} // TODO: Optimize sorting by extracting to separate step;

function instance($$self, $$props, $$invalidate) {
	function getSeedImageUrl(seedName) {
		return `/seed-images/${slugify(seedName)}.png`;
	}

	let { scores = {} } = $$props;
	const writable_props = ["scores"];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Scores> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Scores", $$slots, []);

	$$self.$set = $$props => {
		if ("scores" in $$props) $$invalidate(0, scores = $$props.scores);
	};

	$$self.$capture_state = () => ({
		preload,
		seedImageUrls,
		slugify,
		getSeedImageUrl,
		onMount,
		scores
	});

	$$self.$inject_state = $$props => {
		if ("scores" in $$props) $$invalidate(0, scores = $$props.scores);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [scores, getSeedImageUrl];
}

class Scores extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { scores: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Scores",
			options,
			id: create_fragment.name
		});
	}

	get scores() {
		throw new Error("<Scores>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scores(value) {
		throw new Error("<Scores>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Scores;
export { preload };
