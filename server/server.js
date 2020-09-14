'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sirv = _interopDefault(require('sirv'));
var polka = _interopDefault(require('polka'));
var compression = _interopDefault(require('compression'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var SvelteTable = _interopDefault(require('svelte-table'));
var Stream = _interopDefault(require('stream'));
var http = _interopDefault(require('http'));
var Url = _interopDefault(require('url'));
var https = _interopDefault(require('https'));
var zlib = _interopDefault(require('zlib'));

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error(`Function called outside component initialization`);
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}

// source: https://html.spec.whatwg.org/multipage/indices.html
const boolean_attributes = new Set([
    'allowfullscreen',
    'allowpaymentrequest',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'selected'
]);

const invalid_attribute_name_character = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter
function spread(args, classes_to_add) {
    const attributes = Object.assign({}, ...args);
    if (classes_to_add) {
        if (attributes.class == null) {
            attributes.class = classes_to_add;
        }
        else {
            attributes.class += ' ' + classes_to_add;
        }
    }
    let str = '';
    Object.keys(attributes).forEach(name => {
        if (invalid_attribute_name_character.test(name))
            return;
        const value = attributes[name];
        if (value === true)
            str += " " + name;
        else if (boolean_attributes.has(name.toLowerCase())) {
            if (value)
                str += " " + name;
        }
        else if (value != null) {
            str += ` ${name}="${String(value).replace(/"/g, '&#34;').replace(/'/g, '&#39;')}"`;
        }
    });
    return str;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* static/settings.svg generated by Svelte v3.23.0 */

const Settings = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<svg${spread([
		{ xmlns: "http://www.w3.org/2000/svg" },
		{ viewBox: "0 0 24 24" },
		{ fill: "black" },
		{ width: "18px" },
		{ height: "18px" },
		$$props
	])}><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"}"></path></svg>`;
});

/* static/award.svg generated by Svelte v3.23.0 */

const Award = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<svg${spread([
		{ xmlns: "http://www.w3.org/2000/svg" },
		{ "enable-background": "new 0 0 24 24" },
		{ viewBox: "0 0 24 24" },
		{ fill: "black" },
		{ width: "18px" },
		{ height: "18px" },
		$$props
	])}><rect fill="${"none"}" height="${"24"}" width="${"24"}"></rect><path d="${"M19,5h-2V3H7v2H5C3.9,5,3,5.9,3,7v1c0,2.55,1.92,4.63,4.39,4.94c0.63,1.5,1.98,2.63,3.61,2.96V19H7v2h10v-2h-4v-3.1 c1.63-0.33,2.98-1.46,3.61-2.96C19.08,12.63,21,10.55,21,8V7C21,5.9,20.1,5,19,5z M5,8V7h2v3.82C5.84,10.4,5,9.3,5,8z M19,8 c0,1.3-0.84,2.4-2,2.82V7h2V8z"}"></path></svg>`;
});

/* static/run.svg generated by Svelte v3.23.0 */

const Run = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<svg${spread([
		{ xmlns: "http://www.w3.org/2000/svg" },
		{ viewBox: "0 0 24 24" },
		{ fill: "black" },
		{ width: "18px" },
		{ height: "18px" },
		$$props
	])}><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"}"></path></svg>`;
});

/* src/routes/index.svelte generated by Svelte v3.23.0 */

const css = {
	code: ".calls-to-action.svelte-15rjq13.svelte-15rjq13{display:flex;justify-content:center}.calls-to-action.svelte-15rjq13 .call-to-action-wrapper.svelte-15rjq13{width:33.3%}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script>\\nimport SettingsSvg from '../../static/settings.svg';\\nimport AwardSvg from '../../static/award.svg';\\nimport RunSvg from '../../static/run.svg';\\n\\nconst svgProps = {\\n\\twidth: '80%',\\n\\theight: 'auto',\\n\\tfill: '#f69d3c',\\n\\tstroke: 'rgba(0,0,0,0.2)',\\n};\\n</script>\\n\\n\\n<style  lang=\\\"scss\\\">.calls-to-action {\\n  display: flex;\\n  justify-content: center; }\\n  .calls-to-action .call-to-action-wrapper {\\n    width: 33.3%; }</style>\\n\\n<svelte:head>\\n\\t<title>Cellulelife - The Gamified Game of Life</title>\\n</svelte:head>\\n\\n<p>Go for high scores or just click around.</p>\\n\\n<h2>The choice is yours.</h2>\\n\\n<div class=\\\"calls-to-action\\\">\\n\\t<a href=\\\"/how-it-works\\\" class=\\\"call-to-action-wrapper\\\">\\n\\t\\t<SettingsSvg {...svgProps} />\\n\\t\\t<h3>See how it works</h3>\\n\\t</a>\\n\\t<a href=\\\"/scores\\\" class=\\\"call-to-action-wrapper\\\">\\n\\t\\t<AwardSvg {...svgProps} />\\n\\t\\t<h3>View the High Scores</h3>\\n\\t</a>\\n\\t<a href=\\\"/game\\\" class=\\\"call-to-action-wrapper\\\">\\n\\t\\t<RunSvg {...svgProps} />\\n\\t\\t<h3>Jump into the game</h3>\\n\\t</a>\\n</div>\"],\"names\":[],\"mappings\":\"AAcoB,gBAAgB,8BAAC,CAAC,AACpC,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,AAAE,CAAC,AAC1B,+BAAgB,CAAC,uBAAuB,eAAC,CAAC,AACxC,KAAK,CAAE,KAAK,AAAE,CAAC\"}"
};

const Routes = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const svgProps = {
		width: "80%",
		height: "auto",
		fill: "#f69d3c",
		stroke: "rgba(0,0,0,0.2)"
	};

	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>Cellulelife - The Gamified Game of Life</title>`, "")}`, "")}

<p>Go for high scores or just click around.</p>

<h2>The choice is yours.</h2>

<div class="${"calls-to-action svelte-15rjq13"}"><a href="${"/how-it-works"}" class="${"call-to-action-wrapper svelte-15rjq13"}">${validate_component(Settings, "SettingsSvg").$$render($$result, Object.assign(svgProps), {}, {})}
		<h3>See how it works</h3></a>
	<a href="${"/scores"}" class="${"call-to-action-wrapper svelte-15rjq13"}">${validate_component(Award, "AwardSvg").$$render($$result, Object.assign(svgProps), {}, {})}
		<h3>View the High Scores</h3></a>
	<a href="${"/game"}" class="${"call-to-action-wrapper svelte-15rjq13"}">${validate_component(Run, "RunSvg").$$render($$result, Object.assign(svgProps), {}, {})}
		<h3>Jump into the game</h3></a></div>`;
});

/* static/score.svg generated by Svelte v3.23.0 */

const Score = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<svg${spread([
		{ xmlns: "http://www.w3.org/2000/svg" },
		{ height: "24" },
		{ viewBox: "0 0 24 24" },
		{ width: "24" },
		$$props
	])}><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 2h1.5v3l2-3h1.7l-2 3 2 3h-1.7l-2-3v3H12V5zM7 7.25h2.5V6.5H7V5h4v3.75H8.5v.75H11V11H7V7.25zM19 13l-6 6-4-4-4 4v-2.5l4-4 4 4 6-6V13z"}"></path></svg>`;
});

/* static/weight.svg generated by Svelte v3.23.0 */

const Weight = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	return `<svg${spread([
		{ xmlns: "http://www.w3.org/2000/svg" },
		{ height: "24" },
		{ viewBox: "0 0 24 24" },
		{ width: "24" },
		$$props
	])}><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"}"></path></svg>`;
});

/* src/routes/how-it-works.svelte generated by Svelte v3.23.0 */

const css$1 = {
	code: ".how-it-works-description.svelte-oe7jt1.svelte-oe7jt1{width:400px;max-width:100%;margin:0 auto;margin-bottom:16px}.how-it-works-list.svelte-oe7jt1.svelte-oe7jt1{margin:0 auto;list-style:none;display:flex;flex-direction:column;width:100%}.how-it-works-list.svelte-oe7jt1 li.svelte-oe7jt1{display:block;width:100%}.how-it-works-list.svelte-oe7jt1 .slide-animation-wrapper.svelte-oe7jt1{max-width:300px;transition:margin-left 300ms;margin-left:0}.how-it-works-list.svelte-oe7jt1 .slide-animation-wrapper.first.done.svelte-oe7jt1{margin-left:calc(33% - 150px)}.how-it-works-list.svelte-oe7jt1 .slide-animation-wrapper.second.done.svelte-oe7jt1{margin-left:calc(50% - 150px)}.how-it-works-list.svelte-oe7jt1 .slide-animation-wrapper.third.done.svelte-oe7jt1{margin-left:calc(66% - 150px)}.descriptions.svelte-oe7jt1.svelte-oe7jt1{display:flex;flex-direction:row;flex-wrap:wrap;margin-top:16px}.game-mode-description.svelte-oe7jt1.svelte-oe7jt1{width:100%}.game-mode-header.svelte-oe7jt1.svelte-oe7jt1{text-align:center}.game-mode-title.svelte-oe7jt1.svelte-oe7jt1{font-size:26px}.game-mode-image.svelte-oe7jt1.svelte-oe7jt1{width:300px;max-width:100%;height:auto;margin:0 auto}@media(min-width: 600px){.game-mode-description.svelte-oe7jt1.svelte-oe7jt1{width:50%}}",
	map: "{\"version\":3,\"file\":\"how-it-works.svelte\",\"sources\":[\"how-it-works.svelte\"],\"sourcesContent\":[\"<script>\\n\\nimport SplitSvg from '../../static/score.svg';\\nimport WeightSvg from '../../static/weight.svg';\\nimport ScoreSvg from '../../static/score.svg';\\n\\nconst svgProps = {\\n\\twidth: '80%',\\n\\theight: 'auto',\\n\\tfill: '#f69d3c',\\n\\t// stroke: 'rgba(0,0,0,0.2)',\\n};\\n\\nlet shouldAnimate = false;\\nsetTimeout(() => {\\n  shouldAnimate = true;\\n}, 1000)\\n\\n</script>\\n<style lang=\\\"scss\\\">.how-it-works-description {\\n  width: 400px;\\n  max-width: 100%;\\n  margin: 0 auto;\\n  margin-bottom: 16px; }\\n\\n.how-it-works-list {\\n  margin: 0 auto;\\n  list-style: none;\\n  display: flex;\\n  flex-direction: column;\\n  width: 100%; }\\n  .how-it-works-list li {\\n    display: block;\\n    width: 100%; }\\n  .how-it-works-list .slide-animation-wrapper {\\n    max-width: 300px;\\n    transition: margin-left 300ms;\\n    margin-left: 0; }\\n    .how-it-works-list .slide-animation-wrapper.first.done {\\n      margin-left: calc(33% - 150px); }\\n    .how-it-works-list .slide-animation-wrapper.second.done {\\n      margin-left: calc(50% - 150px); }\\n    .how-it-works-list .slide-animation-wrapper.third.done {\\n      margin-left: calc(66% - 150px); }\\n\\n.descriptions {\\n  display: flex;\\n  flex-direction: row;\\n  flex-wrap: wrap;\\n  margin-top: 16px; }\\n\\n.game-mode-description {\\n  width: 100%; }\\n\\n.game-mode-header {\\n  text-align: center; }\\n\\n.game-mode-title {\\n  font-size: 26px; }\\n\\n.game-mode-image {\\n  width: 300px;\\n  max-width: 100%;\\n  height: auto;\\n  margin: 0 auto; }\\n\\n@media (min-width: 600px) {\\n  .game-mode-description {\\n    width: 50%; } }\\n\\nsvg {\\n  -webkit-filter: drop-shadow(0, 0, 5px, #000);\\n          filter: drop-shadow(0, 0, 5px, #000); }</style>\\n\\n<svelte:head>\\n\\t<title>How it Works</title>\\n</svelte:head>\\n\\n<h1>Getting Started</h1>\\n<p class=\\\"how-it-works-description\\\">At its heart, this is just a Game of Life sandbox. Relax and just watch it unfold. If you want to try and make it into the High scores, read on.</p>\\n<ul class=\\\"how-it-works-list\\\">\\n  <li>\\n    <div class=\\\"slide-animation-wrapper first {shouldAnimate && 'done'}\\\">\\n      <div><SplitSvg {...svgProps} /></div>\\n      <div>The game consists of 2 main \\\"games\\\", a game of Life and a game of Death</div>\\n    </div>\\n  </li>\\n  <li>\\n    <div class=\\\"slide-animation-wrapper second {shouldAnimate && 'done'}\\\">\\n      <div><WeightSvg {...svgProps} /></div>\\n      <div>They are both played in the same game mode, we just weight various metrics differently.</div>\\n    </div>\\n  </li>\\n  <li>\\n    <div class=\\\"slide-animation-wrapper third {shouldAnimate && 'done'}\\\">\\n      <div><ScoreSvg {...svgProps} /></div>\\n      <div>\\n        At the end, we check to see if you might have made it ontoto the high score list for your seed and edit count.\\n      </div>\\n    </div>\\n  </li>\\n</ul>\\n  <div class=\\\"warning\\\">There will eventually be more game modes with more levels of interaction. Stay Tuned!!!</div>\\n\\n<div class=\\\"descriptions\\\">\\n  <div class=\\\"game-mode-description\\\">\\n    <div class=\\\"game-mode-header\\\">\\n      <h2 class=\\\"game-mode-title\\\">Life Score</h2>\\n      <img class=\\\"game-mode-image\\\"\\n    src=\\\"https://www.fillmurray.com/300/300\\\" alt=\\\"Life Score animation\\\" />\\n    </div>\\n    <p>The main goal is to achieve a high Life Score by making the game live as long as possible. We then compare your results with other results that were created using the same edit counts. An edit is toggling a cell on or off. There is no penalty to a toggle, its just a different high score list.</p>\\n  </div>\\n  <div class=\\\"game-mode-description\\\">\\n    <div class=\\\"game-mode-header\\\">\\n      <h2 class=\\\"game-mode-title\\\">Death Score</h2>\\n      <img class=\\\"game-mode-image\\\" src=\\\"https://www.placecage.com/c/300/300\\\" alt=\\\"Death Score animation\\\" />\\n    </div>\\n    <p>There is also the concept of a Death Score. How empty can you leave the board? The amount of living cells at the end is the primary metric here. In the event of a tie, a shorter lifespan is better.</p>\\n  </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAmBmB,yBAAyB,4BAAC,CAAC,AAC5C,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,aAAa,CAAE,IAAI,AAAE,CAAC,AAExB,kBAAkB,4BAAC,CAAC,AAClB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,KAAK,CAAE,IAAI,AAAE,CAAC,AACd,gCAAkB,CAAC,EAAE,cAAC,CAAC,AACrB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AAAE,CAAC,AAChB,gCAAkB,CAAC,wBAAwB,cAAC,CAAC,AAC3C,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,WAAW,CAAC,KAAK,CAC7B,WAAW,CAAE,CAAC,AAAE,CAAC,AACjB,gCAAkB,CAAC,wBAAwB,MAAM,KAAK,cAAC,CAAC,AACtD,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,AAAE,CAAC,AACnC,gCAAkB,CAAC,wBAAwB,OAAO,KAAK,cAAC,CAAC,AACvD,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,AAAE,CAAC,AACnC,gCAAkB,CAAC,wBAAwB,MAAM,KAAK,cAAC,CAAC,AACtD,WAAW,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,AAAE,CAAC,AAEvC,aAAa,4BAAC,CAAC,AACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,AAAE,CAAC,AAErB,sBAAsB,4BAAC,CAAC,AACtB,KAAK,CAAE,IAAI,AAAE,CAAC,AAEhB,iBAAiB,4BAAC,CAAC,AACjB,UAAU,CAAE,MAAM,AAAE,CAAC,AAEvB,gBAAgB,4BAAC,CAAC,AAChB,SAAS,CAAE,IAAI,AAAE,CAAC,AAEpB,gBAAgB,4BAAC,CAAC,AAChB,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,AAAE,CAAC,AAEnB,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,sBAAsB,4BAAC,CAAC,AACtB,KAAK,CAAE,GAAG,AAAE,CAAC,AAAC,CAAC\"}"
};

const How_it_works = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	const svgProps = {
		width: "80%",
		height: "auto",
		fill: "#f69d3c"
	}; // stroke: 'rgba(0,0,0,0.2)',

	let shouldAnimate = false;

	setTimeout(
		() => {
			shouldAnimate = true;
		},
		1000
	);

	$$result.css.add(css$1);

	return `${($$result.head += `${($$result.title = `<title>How it Works</title>`, "")}`, "")}

<h1>Getting Started</h1>
<p class="${"how-it-works-description svelte-oe7jt1"}">At its heart, this is just a Game of Life sandbox. Relax and just watch it unfold. If you want to try and make it into the High scores, read on.</p>
<ul class="${"how-it-works-list svelte-oe7jt1"}"><li class="${"svelte-oe7jt1"}"><div class="${"slide-animation-wrapper first " + escape(shouldAnimate && "done") + " svelte-oe7jt1"}"><div>${validate_component(Score, "SplitSvg").$$render($$result, Object.assign(svgProps), {}, {})}</div>
      <div>The game consists of 2 main &quot;games&quot;, a game of Life and a game of Death</div></div></li>
  <li class="${"svelte-oe7jt1"}"><div class="${"slide-animation-wrapper second " + escape(shouldAnimate && "done") + " svelte-oe7jt1"}"><div>${validate_component(Weight, "WeightSvg").$$render($$result, Object.assign(svgProps), {}, {})}</div>
      <div>They are both played in the same game mode, we just weight various metrics differently.</div></div></li>
  <li class="${"svelte-oe7jt1"}"><div class="${"slide-animation-wrapper third " + escape(shouldAnimate && "done") + " svelte-oe7jt1"}"><div>${validate_component(Score, "ScoreSvg").$$render($$result, Object.assign(svgProps), {}, {})}</div>
      <div>At the end, we check to see if you might have made it ontoto the high score list for your seed and edit count.
      </div></div></li></ul>
  <div class="${"warning"}">There will eventually be more game modes with more levels of interaction. Stay Tuned!!!</div>

<div class="${"descriptions svelte-oe7jt1"}"><div class="${"game-mode-description svelte-oe7jt1"}"><div class="${"game-mode-header svelte-oe7jt1"}"><h2 class="${"game-mode-title svelte-oe7jt1"}">Life Score</h2>
      <img class="${"game-mode-image svelte-oe7jt1"}" src="${"https://www.fillmurray.com/300/300"}" alt="${"Life Score animation"}"></div>
    <p>The main goal is to achieve a high Life Score by making the game live as long as possible. We then compare your results with other results that were created using the same edit counts. An edit is toggling a cell on or off. There is no penalty to a toggle, its just a different high score list.</p></div>
  <div class="${"game-mode-description svelte-oe7jt1"}"><div class="${"game-mode-header svelte-oe7jt1"}"><h2 class="${"game-mode-title svelte-oe7jt1"}">Death Score</h2>
      <img class="${"game-mode-image svelte-oe7jt1"}" src="${"https://www.placecage.com/c/300/300"}" alt="${"Death Score animation"}"></div>
    <p>There is also the concept of a Death Score. How empty can you leave the board? The amount of living cells at the end is the primary metric here. In the event of a tie, a shorter lifespan is better.</p></div></div>`;
});

/* node_modules/svelma/src/components/Icon.svelte generated by Svelte v3.23.0 */

const Icon = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { type = "" } = $$props;
	let { pack = "fas" } = $$props;
	let { icon } = $$props;
	let { size = "" } = $$props;
	let { customClass = "" } = $$props;
	let { customSize = "" } = $$props;
	let { isClickable = false } = $$props;
	let { isLeft = false } = $$props;
	let { isRight = false } = $$props;
	let newCustomSize = "";
	let newType = "";
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	if ($$props.pack === void 0 && $$bindings.pack && pack !== void 0) $$bindings.pack(pack);
	if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.customClass === void 0 && $$bindings.customClass && customClass !== void 0) $$bindings.customClass(customClass);
	if ($$props.customSize === void 0 && $$bindings.customSize && customSize !== void 0) $$bindings.customSize(customSize);
	if ($$props.isClickable === void 0 && $$bindings.isClickable && isClickable !== void 0) $$bindings.isClickable(isClickable);
	if ($$props.isLeft === void 0 && $$bindings.isLeft && isLeft !== void 0) $$bindings.isLeft(isLeft);
	if ($$props.isRight === void 0 && $$bindings.isRight && isRight !== void 0) $$bindings.isRight(isRight);
	let newPack = pack || "fas";

	 {
		{
			if (customSize) newCustomSize = customSize; else {
				switch (size) {
					case "is-small":
						break;
					case "is-medium":
						newCustomSize = "fa-lg";
						break;
					case "is-large":
						newCustomSize = "fa-3x";
						break;
					default:
						newCustomSize = "";
				}
			}
		}
	}

	 {
		{
			if (!type) newType = "";
			let splitType = [];

			if (typeof type === "string") {
				splitType = type.split("-");
			} else {
				for (let key in type) {
					if (type[key]) {
						splitType = key.split("-");
						break;
					}
				}
			}

			if (splitType.length <= 1) newType = ""; else newType = `has-text-${splitType[1]}`;
		}
	}

	return `<span class="${[
		"icon " + escape(size) + " " + escape(newType) + " " + escape(isLeft && "is-left" || "") + " " + escape(isRight && "is-right" || ""),
		isClickable ? "is-clickable" : ""
	].join(" ").trim()}"><i class="${escape(newPack) + " fa-" + escape(icon) + " " + escape(customClass) + " " + escape(newCustomSize)}"></i></span>`;
});

function omit(obj, ...keysToOmit) {
  return Object.keys(obj).reduce((acc, key) => {
    if (keysToOmit.indexOf(key) === -1) acc[key] = obj[key];
    return acc
  }, {})
}

/* node_modules/svelma/src/components/Button.svelte generated by Svelte v3.23.0 */

const Button = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { tag = "button" } = $$props;
	let { type = "" } = $$props;
	let { size = "" } = $$props;
	let { href = "" } = $$props;
	let { nativeType = "button" } = $$props;
	let { loading = false } = $$props;
	let { inverted = false } = $$props;
	let { outlined = false } = $$props;
	let { rounded = false } = $$props;
	let { iconLeft = null } = $$props;
	let { iconRight = null } = $$props;
	let { iconPack = null } = $$props;
	let iconSize = "";

	onMount(() => {
		if (!["button", "a"].includes(tag)) throw new Error(`'${tag}' cannot be used as a tag for a Bulma button`);
	});

	if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0) $$bindings.tag(tag);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
	if ($$props.nativeType === void 0 && $$bindings.nativeType && nativeType !== void 0) $$bindings.nativeType(nativeType);
	if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0) $$bindings.loading(loading);
	if ($$props.inverted === void 0 && $$bindings.inverted && inverted !== void 0) $$bindings.inverted(inverted);
	if ($$props.outlined === void 0 && $$bindings.outlined && outlined !== void 0) $$bindings.outlined(outlined);
	if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0) $$bindings.rounded(rounded);
	if ($$props.iconLeft === void 0 && $$bindings.iconLeft && iconLeft !== void 0) $$bindings.iconLeft(iconLeft);
	if ($$props.iconRight === void 0 && $$bindings.iconRight && iconRight !== void 0) $$bindings.iconRight(iconRight);
	if ($$props.iconPack === void 0 && $$bindings.iconPack && iconPack !== void 0) $$bindings.iconPack(iconPack);

	let props = {
		...omit($$props, "loading", "inverted", "nativeType", "outlined", "rounded", "type"),
		class: `button ${type} ${size} ${$$props.class || ""}`
	};

	 {
		{
			if (!size || size === "is-medium") {
				iconSize = "is-small";
			} else if (size === "is-large") {
				iconSize = "is-medium";
			} else {
				iconSize = size;
			}
		}
	}

	return `${tag === "button"
	? `<button${spread([props, { type: escape(nativeType) }], (inverted ? "is-inverted" : "") + " " + (loading ? "is-loading" : "") + " " + (outlined ? "is-outlined" : "") + " " + (rounded ? "is-rounded" : ""))}>${iconLeft
		? `${validate_component(Icon, "Icon").$$render(
				$$result,
				{
					pack: iconPack,
					icon: iconLeft,
					size: iconSize
				},
				{},
				{}
			)}`
		: ``}
    <span>${$$slots.default ? $$slots.default({}) : ``}</span>
    ${iconRight
		? `${validate_component(Icon, "Icon").$$render(
				$$result,
				{
					pack: iconPack,
					icon: iconRight,
					size: iconSize
				},
				{},
				{}
			)}`
		: ``}</button>`
	: `${tag === "a"
		? `<a${spread([{ href: escape(href) }, props], (inverted ? "is-inverted" : "") + " " + (loading ? "is-loading" : "") + " " + (outlined ? "is-outlined" : "") + " " + (rounded ? "is-rounded" : ""))}>${iconLeft
			? `${validate_component(Icon, "Icon").$$render(
					$$result,
					{
						pack: iconPack,
						icon: iconLeft,
						size: iconSize
					},
					{},
					{}
				)}`
			: ``}
    <span>${$$slots.default ? $$slots.default({}) : ``}</span>
    ${iconRight
			? `${validate_component(Icon, "Icon").$$render(
					$$result,
					{
						pack: iconPack,
						icon: iconRight,
						size: iconSize
					},
					{},
					{}
				)}`
			: ``}</a>`
		: ``}`}`;
});

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

/* node_modules/svelma/src/components/Switch.svelte generated by Svelte v3.23.0 */

const css$2 = {
	code: "@-webkit-keyframes svelte-ejw4cs-spinAround{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes svelte-ejw4cs-spinAround{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.switch.svelte-ejw4cs.svelte-ejw4cs{position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.switch[disabled]{opacity:.5;cursor:not-allowed}.switch.svelte-ejw4cs input.svelte-ejw4cs{position:absolute;opacity:0;left:0;z-index:-1}.switch input+.check.svelte-ejw4cs.svelte-ejw4cs{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-negative:0;flex-shrink:0;width:2.75em;height:1.575em;padding:.2em;border-radius:1em;-webkit-transition:background .15s ease-out;transition:background .15s ease-out}.switch input+.check.svelte-ejw4cs.svelte-ejw4cs::before{content:\"\";display:block;border-radius:1em;width:1.175em;height:1.175em;background:#f5f5f5;-webkit-box-shadow:0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);box-shadow:0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);-webkit-transition:width .15s ease-out,-webkit-transform .15s ease-out;transition:width .15s ease-out,-webkit-transform .15s ease-out;transition:transform .15s ease-out,width .15s ease-out;transition:transform .15s ease-out,width .15s ease-out,-webkit-transform .15s ease-out;will-change:transform}.switch input:not(:checked)+.check.svelte-ejw4cs.svelte-ejw4cs{background-color:#b5b5b5 !important}.switch input:checked+.check.svelte-ejw4cs.svelte-ejw4cs{background-color:unset}.switch input:checked+.check.svelte-ejw4cs.svelte-ejw4cs::before{-webkit-transform:translate3d(100%, 0, 0);transform:translate3d(100%, 0, 0)}.switch.svelte-ejw4cs .control-label.svelte-ejw4cs{padding-left:.5em}.switch.is-small.svelte-ejw4cs.svelte-ejw4cs{border-radius:2px;font-size:0.75rem}.switch.is-medium.svelte-ejw4cs.svelte-ejw4cs{font-size:1.25rem}.switch.is-large.svelte-ejw4cs.svelte-ejw4cs{font-size:1.5rem}",
	map: "{\"version\":3,\"file\":\"Switch.svelte\",\"sources\":[\"Switch.svelte\"],\"sourcesContent\":[\"\\n<script>\\n  /** Binding for whether the switch to \\\"on\\\" or not\\n   * @svelte-prop {Any} [checked=false]\\n   * */\\n  export let checked = false\\n\\n  /** Type (color of control)\\n   * @svelte-prop {String} [type] - Type (color of control)\\n   * @values $$colors$$\\n   * */\\n  export let type = 'is-primary'\\n\\n  /** Size of switch\\n   * @svelte-prop {String} [size]\\n   * @values $$sizes$$\\n   * */\\n  export let size = ''\\n\\n  /** Whether switch is disabled or not\\n   * @svelte-prop {Boolean} [disabled=false]\\n   * */\\n  export let disabled = false\\n\\n  let label\\n  let input\\n\\n  $: newBackground = type && type.replace(/^is-(.*)/, 'has-background-$1') || ''\\n\\n  $: {\\n    if (input) {\\n      if (disabled) {\\n        label.setAttribute('disabled', 'disabled')\\n        input.setAttribute('disabled', 'disabled')\\n      } else {\\n        label.removeAttribute('disabled')\\n        input.removeAttribute('disabled')\\n      }\\n    }\\n  }\\n</script>\\n\\n<style lang=\\\"scss\\\">@-webkit-keyframes spinAround {\\n  from {\\n    -webkit-transform: rotate(0deg);\\n            transform: rotate(0deg); }\\n  to {\\n    -webkit-transform: rotate(359deg);\\n            transform: rotate(359deg); } }\\n\\n@keyframes spinAround {\\n  from {\\n    -webkit-transform: rotate(0deg);\\n            transform: rotate(0deg); }\\n  to {\\n    -webkit-transform: rotate(359deg);\\n            transform: rotate(359deg); } }\\n\\n.switch {\\n  position: relative;\\n  cursor: pointer;\\n  -webkit-user-select: none;\\n     -moz-user-select: none;\\n      -ms-user-select: none;\\n          user-select: none;\\n  display: -webkit-inline-box;\\n  display: -ms-inline-flexbox;\\n  display: inline-flex; }\\n  :global(.switch[disabled]) {\\n    opacity: .5;\\n    cursor: not-allowed; }\\n  .switch input {\\n    position: absolute;\\n    opacity: 0;\\n    left: 0;\\n    z-index: -1; }\\n    .switch input + .check {\\n      display: -webkit-box;\\n      display: -ms-flexbox;\\n      display: flex;\\n      -webkit-box-align: center;\\n          -ms-flex-align: center;\\n              align-items: center;\\n      -ms-flex-negative: 0;\\n          flex-shrink: 0;\\n      width: 2.75em;\\n      height: 1.575em;\\n      padding: .2em;\\n      border-radius: 1em;\\n      -webkit-transition: background .15s ease-out;\\n      transition: background .15s ease-out; }\\n      .switch input + .check::before {\\n        content: \\\"\\\";\\n        display: block;\\n        border-radius: 1em;\\n        width: 1.175em;\\n        height: 1.175em;\\n        background: #f5f5f5;\\n        -webkit-box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);\\n                box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);\\n        -webkit-transition: width .15s ease-out,-webkit-transform .15s ease-out;\\n        transition: width .15s ease-out,-webkit-transform .15s ease-out;\\n        transition: transform .15s ease-out,width .15s ease-out;\\n        transition: transform .15s ease-out,width .15s ease-out,-webkit-transform .15s ease-out;\\n        will-change: transform; }\\n    .switch input:not(:checked) + .check {\\n      background-color: #b5b5b5 !important; }\\n    .switch input:checked + .check {\\n      background-color: unset; }\\n      .switch input:checked + .check::before {\\n        -webkit-transform: translate3d(100%, 0, 0);\\n                transform: translate3d(100%, 0, 0); }\\n  .switch .control-label {\\n    padding-left: .5em; }\\n  .switch.is-small {\\n    border-radius: 2px;\\n    font-size: 0.75rem; }\\n  .switch.is-medium {\\n    font-size: 1.25rem; }\\n  .switch.is-large {\\n    font-size: 1.5rem; }</style>\\n\\n<label ref=\\\"label\\\" class=\\\"switch {size}\\\" bind:this={label}>\\n  <input type=\\\"checkbox\\\" bind:checked bind:this={input} on:input on:click />\\n\\n  <div class=\\\"check {newBackground}\\\"></div>\\n\\n  <span class=\\\"control-label\\\">\\n    <slot/>\\n  </span>\\n</label>\"],\"names\":[],\"mappings\":\"AA0CmB,mBAAmB,wBAAW,CAAC,AAChD,IAAI,AAAC,CAAC,AACJ,iBAAiB,CAAE,OAAO,IAAI,CAAC,CACvB,SAAS,CAAE,OAAO,IAAI,CAAC,AAAE,CAAC,AACpC,EAAE,AAAC,CAAC,AACF,iBAAiB,CAAE,OAAO,MAAM,CAAC,CACzB,SAAS,CAAE,OAAO,MAAM,CAAC,AAAE,CAAC,AAAC,CAAC,AAE1C,WAAW,wBAAW,CAAC,AACrB,IAAI,AAAC,CAAC,AACJ,iBAAiB,CAAE,OAAO,IAAI,CAAC,CACvB,SAAS,CAAE,OAAO,IAAI,CAAC,AAAE,CAAC,AACpC,EAAE,AAAC,CAAC,AACF,iBAAiB,CAAE,OAAO,MAAM,CAAC,CACzB,SAAS,CAAE,OAAO,MAAM,CAAC,AAAE,CAAC,AAAC,CAAC,AAE1C,OAAO,4BAAC,CAAC,AACP,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,OAAO,CACf,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACrB,eAAe,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CACzB,OAAO,CAAE,kBAAkB,CAC3B,OAAO,CAAE,kBAAkB,CAC3B,OAAO,CAAE,WAAW,AAAE,CAAC,AACf,iBAAiB,AAAE,CAAC,AAC1B,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,WAAW,AAAE,CAAC,AACxB,qBAAO,CAAC,KAAK,cAAC,CAAC,AACb,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,EAAE,AAAE,CAAC,AACd,OAAO,CAAC,KAAK,CAAG,MAAM,4BAAC,CAAC,AACtB,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,IAAI,CACb,iBAAiB,CAAE,MAAM,CACrB,cAAc,CAAE,MAAM,CAClB,WAAW,CAAE,MAAM,CAC3B,iBAAiB,CAAE,CAAC,CAChB,WAAW,CAAE,CAAC,CAClB,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,GAAG,CAClB,kBAAkB,CAAE,UAAU,CAAC,IAAI,CAAC,QAAQ,CAC5C,UAAU,CAAE,UAAU,CAAC,IAAI,CAAC,QAAQ,AAAE,CAAC,AACvC,OAAO,CAAC,KAAK,CAAG,kCAAM,QAAQ,AAAC,CAAC,AAC9B,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,OAAO,CACnB,kBAAkB,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC5G,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACpH,kBAAkB,CAAE,KAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,iBAAiB,CAAC,IAAI,CAAC,QAAQ,CACvE,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,iBAAiB,CAAC,IAAI,CAAC,QAAQ,CAC/D,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,QAAQ,CAAC,KAAK,CAAC,IAAI,CAAC,QAAQ,CACvD,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,QAAQ,CAAC,KAAK,CAAC,IAAI,CAAC,QAAQ,CAAC,iBAAiB,CAAC,IAAI,CAAC,QAAQ,CACvF,WAAW,CAAE,SAAS,AAAE,CAAC,AAC7B,OAAO,CAAC,KAAK,KAAK,QAAQ,CAAC,CAAG,MAAM,4BAAC,CAAC,AACpC,gBAAgB,CAAE,OAAO,CAAC,UAAU,AAAE,CAAC,AACzC,OAAO,CAAC,KAAK,QAAQ,CAAG,MAAM,4BAAC,CAAC,AAC9B,gBAAgB,CAAE,KAAK,AAAE,CAAC,AAC1B,OAAO,CAAC,KAAK,QAAQ,CAAG,kCAAM,QAAQ,AAAC,CAAC,AACtC,iBAAiB,CAAE,YAAY,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClC,SAAS,CAAE,YAAY,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AAAE,CAAC,AACnD,qBAAO,CAAC,cAAc,cAAC,CAAC,AACtB,YAAY,CAAE,IAAI,AAAE,CAAC,AACvB,OAAO,SAAS,4BAAC,CAAC,AAChB,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,OAAO,AAAE,CAAC,AACvB,OAAO,UAAU,4BAAC,CAAC,AACjB,SAAS,CAAE,OAAO,AAAE,CAAC,AACvB,OAAO,SAAS,4BAAC,CAAC,AAChB,SAAS,CAAE,MAAM,AAAE,CAAC\"}"
};

const Switch = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { checked = false } = $$props;
	let { type = "is-primary" } = $$props;
	let { size = "" } = $$props;
	let { disabled = false } = $$props;
	let label;
	let input;
	if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
	if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
	if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
	if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
	$$result.css.add(css$2);
	let newBackground = type && type.replace(/^is-(.*)/, "has-background-$1") || "";

	return `<label ref="${"label"}" class="${"switch " + escape(size) + " svelte-ejw4cs"}"${add_attribute("this", label, 1)}><input type="${"checkbox"}" class="${"svelte-ejw4cs"}"${add_attribute("checked", checked, 1)}${add_attribute("this", input, 1)}>

  <div class="${"check " + escape(newBackground) + " svelte-ejw4cs"}"></div>

  <span class="${"control-label svelte-ejw4cs"}">${$$slots.default ? $$slots.default({}) : ``}</span></label>`;
});

const SHOULD_SHOW_USERNAMES_KEY = "shouldShowUsernames";

let _shouldShowUsernames = false;

if (typeof window !== "undefined") {
  const localStorageValue = window.localStorage.getItem(
    SHOULD_SHOW_USERNAMES_KEY
  );
  if (localStorageValue) {
    _shouldShowUsernames = JSON.parse(localStorageValue);
  }
}

const shouldShowUsernames = writable(_shouldShowUsernames);

/* src/components/SeedNav.svelte generated by Svelte v3.23.0 */

const css$3 = {
	code: "nav.svelte-kvt9n{padding:16px}ol.svelte-kvt9n{display:flex;flex-direction:row;align-items:center;list-style:none;justify-content:center}li.svelte-kvt9n{margin-right:24px}li.svelte-kvt9n:last-child{margin:0}",
	map: "{\"version\":3,\"file\":\"SeedNav.svelte\",\"sources\":[\"SeedNav.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { Button } from 'svelma';\\n\\timport { shouldShowUsernames, setShouldShowUsernames } from '../stores/ui';\\n\\n\\texport function isSegmentActive(_segment, thisSegment) {\\n\\t\\tif((!_segment && !thisSegment) || _segment === thisSegment) {\\n\\t\\t\\treturn 'page';\\n\\t\\t}\\n\\t}\\n\\n  export let segment;\\n  export let links = [];\\n  export let slug = '';\\n  export let currentEditCount = '';\\n</script>\\n\\n<style>\\n\\nnav {\\n\\tpadding: 16px;\\n}\\n\\nol {\\n\\tdisplay: flex;\\n\\tflex-direction: row;\\n\\talign-items: center;\\n  list-style: none;\\n  justify-content: center;\\n}\\n\\nli {\\n\\tmargin-right: 24px;\\n}\\n\\nli:last-child {\\n\\tmargin: 0;\\n}\\n\\na[aria-current=\\\"page\\\"] {\\n\\ttext-decoration: underline;\\n}</style>\\n\\n<nav>\\n\\t<ol>\\n\\n    { #each links as link}\\n\\t\\t  <li>\\n        {#if link === currentEditCount}\\n          <Button type=\\\"is-primary\\\" tag=\\\"a\\\" href=\\\"/scores/{slug}/{link}\\\">{link}</Button>\\n        {:else}\\n          <Button tag=\\\"a\\\" href=\\\"/scores/{slug}/{link}\\\">{link}</Button>\\n        {/if}\\n      </li>\\n    { /each }\\n\\n\\t</ol>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"AAkBA,GAAG,aAAC,CAAC,AACJ,OAAO,CAAE,IAAI,AACd,CAAC,AAED,EAAE,aAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CAClB,UAAU,CAAE,IAAI,CAChB,eAAe,CAAE,MAAM,AACzB,CAAC,AAED,EAAE,aAAC,CAAC,AACH,YAAY,CAAE,IAAI,AACnB,CAAC,AAED,eAAE,WAAW,AAAC,CAAC,AACd,MAAM,CAAE,CAAC,AACV,CAAC\"}"
};

function isSegmentActive(_segment, thisSegment) {
	if (!_segment && !thisSegment || _segment === thisSegment) {
		return "page";
	}
}

const SeedNav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	let { links = [] } = $$props;
	let { slug = "" } = $$props;
	let { currentEditCount = "" } = $$props;
	if ($$props.isSegmentActive === void 0 && $$bindings.isSegmentActive && isSegmentActive !== void 0) $$bindings.isSegmentActive(isSegmentActive);
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	if ($$props.links === void 0 && $$bindings.links && links !== void 0) $$bindings.links(links);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	if ($$props.currentEditCount === void 0 && $$bindings.currentEditCount && currentEditCount !== void 0) $$bindings.currentEditCount(currentEditCount);
	$$result.css.add(css$3);

	return `<nav class="${"svelte-kvt9n"}"><ol class="${"svelte-kvt9n"}">${each(links, link => `<li class="${"svelte-kvt9n"}">${link === currentEditCount
	? `${validate_component(Button, "Button").$$render(
			$$result,
			{
				type: "is-primary",
				tag: "a",
				href: "/scores/" + slug + "/" + link
			},
			{},
			{ default: () => `${escape(link)}` }
		)}`
	: `${validate_component(Button, "Button").$$render(
			$$result,
			{
				tag: "a",
				href: "/scores/" + slug + "/" + link
			},
			{},
			{ default: () => `${escape(link)}` }
		)}`}
      </li>`)}</ol></nav>`;
});

/* src/components/AnimatedPreview.svelte generated by Svelte v3.23.0 */

const css$4 = {
	code: "canvas.svelte-dxd97{width:100%;height:auto}",
	map: "{\"version\":3,\"file\":\"AnimatedPreview.svelte\",\"sources\":[\"AnimatedPreview.svelte\"],\"sourcesContent\":[\"<script>\\nimport {onMount, afterUpdate} from 'svelte';\\n\\nexport let seed;\\nexport let modifications;\\n\\nlet canvas;\\n\\nlet mounted = false;\\n\\nconst drawCanvas = () => {\\n    const ctx = canvas.getContext('2d');\\n    ctx.clearRect(0,0, 500, 400);\\n    let frame;\\n    let currentIndex = 0;\\n\\n\\t\\t(function loop() {\\n      let isAlive = false;\\n      let isModification = false;\\n\\n      while(!isAlive && !isModification && currentIndex < 2000) {\\n        isAlive = seed.cellules_string.charAt(currentIndex) === \\\"1\\\";\\n        isModification = modifications.find(modification => modification.grid_index === currentIndex);\\n        if(!isAlive && !isModification) {\\n          currentIndex += 1;\\n        }\\n      }\\n      if(currentIndex < 2000) {\\n        frame = requestAnimationFrame(loop);\\n      } else {\\n        return;\\n      }\\n\\n      if(isModification) {\\n        ctx.fillStyle = 'red';\\n        } else {\\n        ctx.fillStyle = 'black';\\n      }\\n\\n      const row = Math.floor(currentIndex / 50);\\n      let column = currentIndex - (row * 50);\\n      if(row === 0) {\\n        column = currentIndex;\\n      }\\n\\n      console.log({\\n        column,\\n        row,\\n        currentIndex\\n      })\\n\\n\\n      ctx.fillRect(column * 10, row * 10, 10, 10);\\n\\n      currentIndex++;\\n\\n\\t\\t}());\\n\\n\\t\\treturn () => {\\n\\t\\t\\tcancelAnimationFrame(frame);\\n\\t\\t};\\n  };\\n\\n  onMount(() => {\\n    mounted = true;\\n    drawCanvas();\\n  });\\n  afterUpdate(() => {\\n    if(mounted) {\\n      drawCanvas()\\n    }\\n  });\\n</script>\\n\\n<style>\\ncanvas {\\n  width: 100%;\\n  height: auto;\\n}</style>\\n\\n<canvas\\n  height=\\\"400\\\"\\n  width=\\\"500\\\"\\n  bind:this={canvas}\\n></canvas>\\n\"],\"names\":[],\"mappings\":\"AA2EA,MAAM,aAAC,CAAC,AACN,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC\"}"
};

const AnimatedPreview = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { seed } = $$props;
	let { modifications } = $$props;
	let canvas;
	let mounted = false;

	const drawCanvas = () => {
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 500, 400);
		let frame;
		let currentIndex = 0;

		(function loop() {
			let isAlive = false;
			let isModification = false;

			while (!isAlive && !isModification && currentIndex < 2000) {
				isAlive = seed.cellules_string.charAt(currentIndex) === "1";
				isModification = modifications.find(modification => modification.grid_index === currentIndex);

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

			const row = Math.floor(currentIndex / 50);
			let column = currentIndex - row * 50;

			if (row === 0) {
				column = currentIndex;
			}

			console.log({ column, row, currentIndex });
			ctx.fillRect(column * 10, row * 10, 10, 10);
			currentIndex++;
		})();

		return () => {
			cancelAnimationFrame(frame);
		};
	};

	onMount(() => {
		mounted = true;
		drawCanvas();
	});

	afterUpdate(() => {
		if (mounted) {
			drawCanvas();
		}
	});

	if ($$props.seed === void 0 && $$bindings.seed && seed !== void 0) $$bindings.seed(seed);
	if ($$props.modifications === void 0 && $$bindings.modifications && modifications !== void 0) $$bindings.modifications(modifications);
	$$result.css.add(css$4);
	return `<canvas height="${"400"}" width="${"500"}" class="${"svelte-dxd97"}"${add_attribute("this", canvas, 1)}></canvas>`;
});

/* src/components/score/LifeScoreDetails.svelte generated by Svelte v3.23.0 */

const css$5 = {
	code: ".metrics.svelte-1rps4h1{margin:0;padding:0}.metric.svelte-1rps4h1{display:flex;flex-direction:row;align-items:center;justify-content:center}.label.svelte-1rps4h1{text-align:right;width:50%;margin-bottom:0;padding-right:12px}.value.svelte-1rps4h1{text-align:center;font-size:32px;font-weight:700;width:50%}",
	map: "{\"version\":3,\"file\":\"LifeScoreDetails.svelte\",\"sources\":[\"LifeScoreDetails.svelte\"],\"sourcesContent\":[\"<script>\\nimport {onMount, afterUpdate} from 'svelte';\\n\\nimport { shouldShowUsernames } from '../../stores/ui';\\nexport let score;\\n\\nlet metrics = [];\\n\\nafterUpdate(() => {\\n  metrics = [\\n    {\\n      label: \\\"Step Count\\\",\\n      value: score.step_count,\\n    },\\n    {\\n      label: \\\"Active Count\\\",\\n      value: score.active_count,\\n    },\\n    {\\n      label: \\\"User Name\\\",\\n      value: score.user_name,\\n      is_username: true\\n    },\\n  ];\\n})\\n\\n</script>\\n\\n<style>\\n\\n.metrics {\\n  margin: 0;\\n  padding: 0;\\n}\\n\\n.metric {\\n  display: flex;\\n  flex-direction: row;\\n  align-items: center;\\n  justify-content: center;\\n}\\n\\n.label {\\n  text-align: right;\\n  width: 50%;\\n  margin-bottom: 0;\\n  padding-right: 12px;\\n}\\n\\n.value {\\n  text-align: center;\\n  font-size: 32px;\\n  font-weight: 700;\\n  width: 50%;\\n}</style>\\n\\n<ul class=\\\"metrics\\\">\\n  {#each metrics as metric}\\n    <li class=\\\"metric\\\">\\n      <div class=\\\"label\\\">{metric.label}</div>\\n      {#if metric.is_username && !$shouldShowUsernames}\\n        <div class=\\\"value\\\">****</div>\\n      {:else}\\n        <div class=\\\"value\\\">{metric.value}</div>\\n      {/if}\\n    </li>\\n  {/each}\\n</ul>\\n\"],\"names\":[],\"mappings\":\"AA8BA,QAAQ,eAAC,CAAC,AACR,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,OAAO,eAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AACzB,CAAC,AAED,MAAM,eAAC,CAAC,AACN,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,GAAG,CACV,aAAa,CAAE,CAAC,CAChB,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,MAAM,eAAC,CAAC,AACN,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,GAAG,AACZ,CAAC\"}"
};

const LifeScoreDetails = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $shouldShowUsernames = get_store_value(shouldShowUsernames);
	let { score } = $$props;
	let metrics = [];

	afterUpdate(() => {
		metrics = [
			{
				label: "Step Count",
				value: score.step_count
			},
			{
				label: "Active Count",
				value: score.active_count
			},
			{
				label: "User Name",
				value: score.user_name,
				is_username: true
			}
		];
	});

	if ($$props.score === void 0 && $$bindings.score && score !== void 0) $$bindings.score(score);
	$$result.css.add(css$5);

	return `<ul class="${"metrics svelte-1rps4h1"}">${each(metrics, metric => `<li class="${"metric svelte-1rps4h1"}"><div class="${"label svelte-1rps4h1"}">${escape(metric.label)}</div>
      ${metric.is_username && !$shouldShowUsernames
	? `<div class="${"value svelte-1rps4h1"}">****</div>`
	: `<div class="${"value svelte-1rps4h1"}">${escape(metric.value)}</div>`}
    </li>`)}</ul>`;
});

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

/* src/routes/scores/[slug]/[editCount].svelte generated by Svelte v3.23.0 */

const css$6 = {
	code: ".featured-scores.svelte-196bron{display:flex;flex-direction:row;flex-wrap:wrap}.featured-score.svelte-196bron{width:100%}.featured-score-type-title.svelte-196bron{text-align:center;margin-bottom:16px}.featured-score-content.svelte-196bron{display:flex;flex-direction:row;flex-wrap:wrap}.featured-score-details.svelte-196bron,.featured-score-image-wrapper.svelte-196bron{width:100%}@media(min-width: 600px){.featured-score.svelte-196bron{width:50%}.featured-score-details.svelte-196bron,.featured-score-image-wrapper.svelte-196bron{width:50%}.featured-life-score.svelte-196bron{padding-right:20px;border-right:thin solid #eee}.featured-death-score.svelte-196bron{padding-left:20px}}",
	map: "{\"version\":3,\"file\":\"[editCount].svelte\",\"sources\":[\"[editCount].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport async function preload(page, session) {\\n\\t\\tconst result = await this.fetch(\\\"http://localhost:3100/prod/get-high-scores\\\");\\n\\n\\t\\tlet { slug, editCount } = page.params;\\n\\n\\t\\tconst highScoresBySeed = {};\\n\\n\\t\\tconst data = await result.json();\\n\\t\\tconsole.log({data});\\n\\n\\t\\t\\tdata.scores.map(score => {\\n\\t\\t\\t\\tconst seedLabel = score.seed_label;\\n\\t\\t\\t\\tconsole.log({seedLabel})\\n\\t\\t\\t\\tconst modificationCount = score.modifications.length;\\n\\n\\t\\t\\t\\tif(!highScoresBySeed[seedLabel]) {\\n\\t\\t\\t\\t\\thighScoresBySeed[seedLabel] = {};\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tif(!highScoresBySeed[seedLabel][modificationCount]) {\\n\\t\\t\\t\\t\\thighScoresBySeed[seedLabel][modificationCount] = [];\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\thighScoresBySeed[seedLabel][modificationCount].push(score);\\n\\n\\t\\t\\t\\thighScoresBySeed[seedLabel][modificationCount].sort((scoreA, scoreB) => {\\n\\t\\t\\t\\t\\tif(scoreA.step_count < scoreB.step_count) {\\n\\t\\t\\t\\t\\t\\treturn 1;\\n\\t\\t\\t\\t\\t} else if(scoreA.step_count > scoreB.step_count) {\\n\\t\\t\\t\\t\\t\\treturn -1;\\n\\t\\t\\t\\t\\t} else {\\n            if(scoreA.active_count < scoreB.active_count) {\\n              return 1;\\n            } else if(scoreA.active_count > scoreB.active_count) {\\n              return -1;\\n            }\\n\\t\\t\\t\\t\\t\\treturn 0;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t});\\n\\t\\t\\t});\\n      console.log({highScoresBySeed});\\n\\n    let scores = highScoresBySeed;\\n    let links = [];\\n    console.log({slug})\\n\\t\\tif(slug) {\\n      scores = highScoresBySeed[slug]\\n      links = Object.keys(scores);\\n    }\\n\\n    if (editCount) {\\n      scores = scores[editCount]\\n    }\\n\\n    const lowScores = [...scores].sort((scoreA, scoreB) => {\\n      if(scoreA.active_count > scoreB.active_count) {\\n        return 1;\\n      } else if(scoreA.active_count < scoreB.active_count) {\\n        return -1;\\n      } else {\\n        if(scoreA.step_count > scoreB.step_count) {\\n          return 1;\\n        } else if(scoreA.step_count < scoreB.step_count) {\\n          return -1;\\n        }\\n        return 0;\\n      }\\n    });\\n\\n\\t\\treturn {\\n      scores,\\n      lowScores,\\n      slug,\\n      editCount,\\n      links\\n\\t\\t};\\n\\n\\t}\\n</script>\\n\\n<script>\\n\\timport { onMount } from 'svelte';\\n  import SvelteTable from 'svelte-table';\\n  import SeedNav from '../../../components/SeedNav.svelte';\\n  import AnimatedPreview from '../../../components/AnimatedPreview.svelte';\\n  import LifeScoreDetails from '../../../components/score/LifeScoreDetails.svelte';\\n\\timport { shouldShowUsernames } from '../../../stores/ui';\\n\\timport seeds from '../../../data/seeds.json';\\n\\n  export let slug = '';\\n  export let editCount = 0;\\n  export let links = [];\\n\\texport let scores = [];\\n  export let lowScores = [];\\n\\nexport const columns = [\\n  {\\n    key: \\\"user_name\\\",\\n    title: \\\"User Name\\\",\\n    value: v => v.user_name,\\n\\t\\tsortable: true,\\n\\t},\\n  {\\n    key: \\\"step_count\\\",\\n    title: \\\"Step Count\\\",\\n    value: v => v.step_count,\\n\\t\\tsortable: true,\\n\\t},\\n  {\\n    key: \\\"active_count\\\",\\n    title: \\\"Active Count\\\",\\n    value: v => v.active_count,\\n\\t\\tsortable: true,\\n\\t},\\n];\\n\\nexport const maskedColumns = [...columns];\\nmaskedColumns[0] = {\\n\\tkey: \\\"user_name\\\",\\n\\ttitle: \\\"User Name\\\",\\n\\tvalue: v => '****',\\n\\tsortable: true,\\n};\\n\\nlet currentSeed;\\n\\nonMount(() => {\\n  console.log({\\n    seeds,\\n    slug,\\n    // currentSeed\\n  })\\n\\n  seeds.forEach(seed => {\\n    if(seed.name === slug) {\\n      currentSeed = seed;\\n    }\\n  })\\n});\\n</script>\\n\\n<style>\\n\\n.featured-scores {\\n  display: flex;\\n  flex-direction: row;\\n  flex-wrap: wrap;\\n}\\n\\n.featured-score {\\n  width: 100%;\\n}\\n\\n.featured-score-type-title {\\n  text-align: center;\\n  margin-bottom: 16px;\\n}\\n\\n.featured-score-content {\\n  display: flex;\\n  flex-direction: row;\\n  flex-wrap: wrap;\\n}\\n\\n.featured-score-details,\\n.featured-score-image-wrapper {\\n  width: 100%;\\n}\\n\\n@media(min-width: 600px) {\\n  .featured-score {\\n    width: 50%;\\n  }\\n\\n  .featured-score-details,\\n  .featured-score-image-wrapper {\\n    width: 50%;\\n  }\\n\\n  .featured-life-score {\\n    padding-right: 20px;\\n    border-right: thin solid #eee;\\n  }\\n\\n  .featured-death-score {\\n    padding-left: 20px;\\n  }\\n}</style>\\n\\n<svelte:head>\\n\\t<title>Scores</title>\\n</svelte:head>\\n\\n<div class=\\\"\\\">\\n\\t<div class=\\\"\\\">\\n    {#if editCount !== '1'}\\n      <h2>High Scores: {slug} ({editCount} edits)</h2>\\n    {:else}\\n\\t\\t  <h2>Scores: {slug} ({editCount} edit)</h2>\\n    {/if}\\n    <SeedNav slug={slug} links={links} currentEditCount={editCount}></SeedNav>\\n    <div class=\\\"featured-scores\\\">\\n      <div class=\\\"featured-score featured-life-score\\\">\\n        <h3 class=\\\"featured-score-type-title\\\">Best Life Score</h3>\\n        <div class=\\\"featured-score-content\\\">\\n          <div class=\\\"featured-score-details\\\">\\n            <LifeScoreDetails\\n              score={scores[0]}\\n            ></LifeScoreDetails>\\n          </div>\\n          <div class=\\\"featured-score-image-wrapper\\\" i18n>\\n            {#if currentSeed}\\n              <AnimatedPreview seed={currentSeed} modifications={scores[0].modifications} />\\n            {/if}\\n          </div>\\n        </div>\\n      </div>\\n\\n      <div class=\\\"featured-score featured-death-score\\\">\\n        <h3 class=\\\"featured-score-type-title\\\">Best Death Score</h3>\\n        <div class=\\\"featured-score-content\\\">\\n          <div class=\\\"featured-score-details\\\">\\n            <LifeScoreDetails\\n              score={lowScores[0]}\\n            ></LifeScoreDetails>\\n          </div>\\n          <div class=\\\"featured-score-image-wrapper\\\">\\n            {#if currentSeed}\\n              <AnimatedPreview seed={currentSeed} modifications={lowScores[0].modifications} />\\n            {/if}\\n          </div>\\n        </div>\\n      </div>\\n    </div>\\n    {#if $shouldShowUsernames}\\n      <SvelteTable  columns=\\\"{columns}\\\" rows=\\\"{scores}\\\"></SvelteTable>\\n    {:else}\\n      <SvelteTable  columns=\\\"{maskedColumns}\\\" rows=\\\"{scores}\\\"></SvelteTable>\\n    {/if}\\n\\t</div>\\n</div>\"],\"names\":[],\"mappings\":\"AAgJA,gBAAgB,eAAC,CAAC,AAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,eAAe,eAAC,CAAC,AACf,KAAK,CAAE,IAAI,AACb,CAAC,AAED,0BAA0B,eAAC,CAAC,AAC1B,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,uBAAuB,eAAC,CAAC,AACvB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,sCAAuB,CACvB,6BAA6B,eAAC,CAAC,AAC7B,KAAK,CAAE,IAAI,AACb,CAAC,AAED,MAAM,YAAY,KAAK,CAAC,AAAC,CAAC,AACxB,eAAe,eAAC,CAAC,AACf,KAAK,CAAE,GAAG,AACZ,CAAC,AAED,sCAAuB,CACvB,6BAA6B,eAAC,CAAC,AAC7B,KAAK,CAAE,GAAG,AACZ,CAAC,AAED,oBAAoB,eAAC,CAAC,AACpB,aAAa,CAAE,IAAI,CACnB,YAAY,CAAE,IAAI,CAAC,KAAK,CAAC,IAAI,AAC/B,CAAC,AAED,qBAAqB,eAAC,CAAC,AACrB,YAAY,CAAE,IAAI,AACpB,CAAC,AACH,CAAC\"}"
};

async function preload(page, session) {
	const result = await this.fetch("http://localhost:3100/prod/get-high-scores");
	let { slug, editCount } = page.params;
	const highScoresBySeed = {};
	const data = await result.json();
	console.log({ data });

	data.scores.map(score => {
		const seedLabel = score.seed_label;
		console.log({ seedLabel });
		const modificationCount = score.modifications.length;

		if (!highScoresBySeed[seedLabel]) {
			highScoresBySeed[seedLabel] = {};
		}

		if (!highScoresBySeed[seedLabel][modificationCount]) {
			highScoresBySeed[seedLabel][modificationCount] = [];
		}

		highScoresBySeed[seedLabel][modificationCount].push(score);

		highScoresBySeed[seedLabel][modificationCount].sort((scoreA, scoreB) => {
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

	console.log({ highScoresBySeed });
	let scores = highScoresBySeed;
	let links = [];
	console.log({ slug });

	if (slug) {
		scores = highScoresBySeed[slug];
		links = Object.keys(scores);
	}

	if (editCount) {
		scores = scores[editCount];
	}

	const lowScores = [...scores].sort((scoreA, scoreB) => {
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

	return {
		scores,
		lowScores,
		slug,
		editCount,
		links
	};
}

const U5BeditCountu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $shouldShowUsernames = get_store_value(shouldShowUsernames);
	let { slug = "" } = $$props;
	let { editCount = 0 } = $$props;
	let { links = [] } = $$props;
	let { scores = [] } = $$props;
	let { lowScores = [] } = $$props;

	const columns = [
		{
			key: "user_name",
			title: "User Name",
			value: v => v.user_name,
			sortable: true
		},
		{
			key: "step_count",
			title: "Step Count",
			value: v => v.step_count,
			sortable: true
		},
		{
			key: "active_count",
			title: "Active Count",
			value: v => v.active_count,
			sortable: true
		}
	];

	const maskedColumns = [...columns];

	maskedColumns[0] = {
		key: "user_name",
		title: "User Name",
		value: v => "****",
		sortable: true
	};

	let currentSeed;

	onMount(() => {
		console.log({ seeds, slug }); // currentSeed

		seeds.forEach(seed => {
			if (seed.name === slug) {
				currentSeed = seed;
			}
		});
	});

	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	if ($$props.editCount === void 0 && $$bindings.editCount && editCount !== void 0) $$bindings.editCount(editCount);
	if ($$props.links === void 0 && $$bindings.links && links !== void 0) $$bindings.links(links);
	if ($$props.scores === void 0 && $$bindings.scores && scores !== void 0) $$bindings.scores(scores);
	if ($$props.lowScores === void 0 && $$bindings.lowScores && lowScores !== void 0) $$bindings.lowScores(lowScores);
	if ($$props.columns === void 0 && $$bindings.columns && columns !== void 0) $$bindings.columns(columns);
	if ($$props.maskedColumns === void 0 && $$bindings.maskedColumns && maskedColumns !== void 0) $$bindings.maskedColumns(maskedColumns);
	$$result.css.add(css$6);

	return `${($$result.head += `${($$result.title = `<title>Scores</title>`, "")}`, "")}

<div class="${""}"><div class="${""}">${editCount !== "1"
	? `<h2>High Scores: ${escape(slug)} (${escape(editCount)} edits)</h2>`
	: `<h2>Scores: ${escape(slug)} (${escape(editCount)} edit)</h2>`}
    ${validate_component(SeedNav, "SeedNav").$$render($$result, { slug, links, currentEditCount: editCount }, {}, {})}
    <div class="${"featured-scores svelte-196bron"}"><div class="${"featured-score featured-life-score svelte-196bron"}"><h3 class="${"featured-score-type-title svelte-196bron"}">Best Life Score</h3>
        <div class="${"featured-score-content svelte-196bron"}"><div class="${"featured-score-details svelte-196bron"}">${validate_component(LifeScoreDetails, "LifeScoreDetails").$$render($$result, { score: scores[0] }, {}, {})}</div>
          <div class="${"featured-score-image-wrapper svelte-196bron"}" i18n>${currentSeed
	? `${validate_component(AnimatedPreview, "AnimatedPreview").$$render(
			$$result,
			{
				seed: currentSeed,
				modifications: scores[0].modifications
			},
			{},
			{}
		)}`
	: ``}</div></div></div>

      <div class="${"featured-score featured-death-score svelte-196bron"}"><h3 class="${"featured-score-type-title svelte-196bron"}">Best Death Score</h3>
        <div class="${"featured-score-content svelte-196bron"}"><div class="${"featured-score-details svelte-196bron"}">${validate_component(LifeScoreDetails, "LifeScoreDetails").$$render($$result, { score: lowScores[0] }, {}, {})}</div>
          <div class="${"featured-score-image-wrapper svelte-196bron"}">${currentSeed
	? `${validate_component(AnimatedPreview, "AnimatedPreview").$$render(
			$$result,
			{
				seed: currentSeed,
				modifications: lowScores[0].modifications
			},
			{},
			{}
		)}`
	: ``}</div></div></div></div>
    ${$shouldShowUsernames
	? `${validate_component(SvelteTable, "SvelteTable").$$render($$result, { columns, rows: scores }, {}, {})}`
	: `${validate_component(SvelteTable, "SvelteTable").$$render($$result, { columns: maskedColumns, rows: scores }, {}, {})}`}</div></div>`;
});

/* src/routes/scores/[slug].svelte generated by Svelte v3.23.0 */

async function preload$1(page, session) {
	const result = await this.fetch("http://localhost:3100/prod/get-high-scores");
	let slug = page.params.slug;
	const highScoresBySeed = {};
	const data = await result.json();
	console.log({ data });

	data.scores.map(score => {
		const seedLabel = score.seed_label;
		console.log({ seedLabel });
		const modificationCount = score.modifications.length;

		if (!highScoresBySeed[seedLabel]) {
			highScoresBySeed[seedLabel] = {};
		}

		if (!highScoresBySeed[seedLabel][modificationCount]) {
			highScoresBySeed[seedLabel][modificationCount] = [];
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
	let scores = highScoresBySeed;
	console.log({ slug });
	let links = [];

	if (slug) {
		scores = highScoresBySeed[slug];
		links = Object.keys(scores);
	}

	return { scores, slug, links };
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { scores = {} } = $$props;
	let { slug = "" } = $$props;
	let { links = [] } = $$props;
	if ($$props.scores === void 0 && $$bindings.scores && scores !== void 0) $$bindings.scores(scores);
	if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0) $$bindings.slug(slug);
	if ($$props.links === void 0 && $$bindings.links && links !== void 0) $$bindings.links(links);

	return `${($$result.head += `${($$result.title = `<title>Scores</title>`, "")}`, "")}

<div class="${""}"><div class="${""}"><h2>High Scores: ${escape(slug)}</h2>
		${validate_component(SeedNav, "SeedNav").$$render($$result, { slug, links }, {}, {})}
		<div><h2>Choose an edit count above.</h2></div>
		<div>Random Scores:
			<div>TODO
			</div></div></div></div>`;
});

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

const css$7 = {
	code: ".tiles-container.svelte-hetykt{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:space-around}.tile-wrapper.svelte-hetykt{width:200px}img.svelte-hetykt{height:auto;width:100%}",
	map: "{\"version\":3,\"file\":\"scores.svelte\",\"sources\":[\"scores.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport async function preload() {\\n\\t\\tconst ignoredSeeds = [\\n\\t\\t\\t'Bim',\\n\\t\\t\\t'Coles',\\n\\t\\t\\t'Wall',\\n\\t\\t\\t'hmm',\\n\\t\\t\\t'Ligma',\\n\\t\\t];\\n\\t\\tconst result = await this.fetch(\\\"http://localhost:3100/prod/get-high-scores\\\");\\n\\n\\t\\tconst highScoresBySeed = {};\\n\\n\\t\\tconst data = await result.json();\\n\\t\\tconsole.log({data});\\n\\n\\t\\t\\tdata.scores.map(score => {\\n\\t\\t\\t\\tconst seedLabel = score.seed_label;\\n\\t\\t\\t\\tconsole.log({seedLabel})\\n\\n\\t\\t\\t\\tif(ignoredSeeds.indexOf(seedLabel) > -1) {\\n\\t\\t\\t\\t\\treturn;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tconst modificationCount = score.modifications.length;\\n\\n\\t\\t\\t\\tif(!highScoresBySeed[seedLabel]) {\\n\\t\\t\\t\\t\\thighScoresBySeed[seedLabel] = {\\n\\t\\t\\t\\t\\t\\tcount: 0,\\n\\t\\t\\t\\t\\t\\thighestSteps: 0,\\n\\t\\t\\t\\t\\t};\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\tif(!highScoresBySeed[seedLabel][modificationCount]) {\\n\\t\\t\\t\\t\\thighScoresBySeed[seedLabel][modificationCount] = [];\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\thighScoresBySeed[seedLabel].count += 1;\\n\\t\\t\\t\\tif(score.step_count > highScoresBySeed[seedLabel].highestSteps) {\\n\\t\\t\\t\\t\\thighScoresBySeed[seedLabel].highestSteps = score.step_count;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\thighScoresBySeed[seedLabel][modificationCount].push(score);\\n\\n\\t\\t\\t\\thighScoresBySeed[seedLabel][modificationCount].sort((scoreA, scoreB) => {\\n\\t\\t\\t\\t\\tif(scoreA.step_count < scoreB.step_count) {\\n\\t\\t\\t\\t\\t\\treturn 1;\\n\\t\\t\\t\\t\\t} else if(scoreA.step_count > scoreB.step_count) {\\n\\t\\t\\t\\t\\t\\treturn -1;\\n\\t\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\t\\treturn 0;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t});\\n\\n\\n\\t\\t\\t});\\n\\t\\t\\t\\tconsole.log({highScoresBySeed});\\n\\n\\t\\treturn {\\n\\t\\t\\tscores: highScoresBySeed\\n\\t\\t};\\n\\n\\t\\t// TODO: Optimize sorting by extracting to separate step;\\n\\t}\\n</script>\\n\\n<script>\\n\\timport seedImageUrls from '../data/seed-image-urls.json';\\n\\timport slugify from '../util/slugify';\\n\\n\\tfunction getSeedImageUrl(seedName) {\\n\\t\\treturn `/seed-images/${slugify(seedName)}.png`;\\n\\t}\\n\\n\\timport { onMount } from 'svelte';\\n\\texport let scores = {};\\n</script>\\n\\n<style>\\n.tiles-container {\\n\\tdisplay: flex;\\n\\tflex-wrap: wrap;\\n\\tflex-direction: row;\\n\\tjustify-content: space-around;\\n}\\n\\n.tile-wrapper {\\n\\twidth: 200px;\\n}\\n\\nimg {\\n\\theight: auto;\\n\\twidth: 100%;\\n}</style>\\n\\n<svelte:head>\\n\\t<title>Scores</title>\\n</svelte:head>\\n\\n<div class=\\\"tiles-container\\\">\\n{#each Object.keys(scores) as seed, seedIndex}\\n\\t<div class=\\\"tile-wrapper\\\">\\n\\t\\t<a href=\\\"/scores/{seed}\\\">\\n\\t\\t\\t<img\\n\\t\\t\\t\\tsrc=\\\"{getSeedImageUrl(seed)}\\\"\\n\\t\\t\\t\\talt=\\\"Starting Seed Map: {seed}\\\"\\n\\t\\t\\t/>\\n\\t\\t\\t<h3>{seed}</h3>\\n\\t\\t\\t<div>High Score: {scores[seed].highestSteps}</div>\\n\\t\\t\\t<div>Count: {scores[seed].count}</div>\\n\\t\\t</a>\\n\\t</div>\\n{/each}\\n</div>\"],\"names\":[],\"mappings\":\"AA+EA,gBAAgB,cAAC,CAAC,AACjB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,YAAY,AAC9B,CAAC,AAED,aAAa,cAAC,CAAC,AACd,KAAK,CAAE,KAAK,AACb,CAAC,AAED,GAAG,cAAC,CAAC,AACJ,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACZ,CAAC\"}"
};

async function preload$2() {
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

const Scores = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	function getSeedImageUrl(seedName) {
		return `/seed-images/${slugify(seedName)}.png`;
	}

	let { scores = {} } = $$props;
	if ($$props.scores === void 0 && $$bindings.scores && scores !== void 0) $$bindings.scores(scores);
	$$result.css.add(css$7);

	return `${($$result.head += `${($$result.title = `<title>Scores</title>`, "")}`, "")}

<div class="${"tiles-container svelte-hetykt"}">${each(Object.keys(scores), (seed, seedIndex) => `<div class="${"tile-wrapper svelte-hetykt"}"><a href="${"/scores/" + escape(seed)}"><img${add_attribute("src", getSeedImageUrl(seed), 0)} alt="${"Starting Seed Map: " + escape(seed)}" class="${"svelte-hetykt"}">
			<h3>${escape(seed)}</h3>
			<div>High Score: ${escape(scores[seed].highestSteps)}</div>
			<div>Count: ${escape(scores[seed].count)}</div></a>
	</div>`)}</div>`;
});

/* src/components/Nav.svelte generated by Svelte v3.23.0 */

const css$8 = {
	code: "nav.svelte-qj39fg.svelte-qj39fg{padding:16px;background:#f69d3c;color:#000}nav.svelte-qj39fg a.svelte-qj39fg,nav.svelte-qj39fg a.nav-title-link.svelte-qj39fg{color:#000;text-decoration:none}ul.svelte-qj39fg.svelte-qj39fg{display:flex;flex-direction:row;align-items:center}li.svelte-qj39fg.svelte-qj39fg{margin-right:24px}li.svelte-qj39fg.svelte-qj39fg:last-child{margin:0}a[aria-current=\"page\"].svelte-qj39fg.svelte-qj39fg{text-decoration:underline}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { Button } from 'svelma';\\n\\n\\texport function isSegmentActive(_segment, thisSegment) {\\n\\t\\tif((!_segment && !thisSegment) || _segment === thisSegment) {\\n\\t\\t\\treturn 'page';\\n\\t\\t}\\n\\t}\\n\\n\\texport let segment;\\n</script>\\n\\n<style lang=\\\"scss\\\">nav {\\n  padding: 16px;\\n  background: #f69d3c;\\n  color: #000; }\\n  nav a, nav a.nav-title-link {\\n    color: #000;\\n    text-decoration: none; }\\n\\nul {\\n  display: flex;\\n  flex-direction: row;\\n  align-items: center; }\\n\\nli {\\n  margin-right: 24px; }\\n\\nli:last-child {\\n  margin: 0; }\\n\\na[aria-current=\\\"page\\\"] {\\n  text-decoration: underline; }</style>\\n\\n<nav>\\n\\t<ul>\\n\\t\\t<li><a class=\\\"nav-title-link\\\" aria-current=\\\"{isSegmentActive(segment)}\\\" href=\\\".\\\">\\n\\t\\t\\t<h1>Cellule Life</h1>\\n\\t\\t</a></li>\\n\\n\\t\\t<li class=\\\"spacer\\\"></li>\\n\\n\\t\\t<li><a aria-current=\\\"{isSegmentActive(segment, 'how-it-works')}\\\" href=\\\"how-it-works\\\">How it Works</a></li>\\n\\n\\t\\t<li><a aria-current=\\\"{isSegmentActive(segment, 'scores')}\\\" href=\\\"scores\\\">High Scores</a></li>\\n\\n\\t\\t<li class=\\\"spacer\\\"></li>\\n\\n\\t\\t<li><Button tag=\\\"a\\\" href=\\\"game\\\">Play the Game!</Button></li>\\n\\n\\t</ul>\\n</nav>\\n\"],\"names\":[],\"mappings\":\"AAYmB,GAAG,4BAAC,CAAC,AACtB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,OAAO,CACnB,KAAK,CAAE,IAAI,AAAE,CAAC,AACd,iBAAG,CAAC,eAAC,CAAE,iBAAG,CAAC,CAAC,eAAe,cAAC,CAAC,AAC3B,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,IAAI,AAAE,CAAC,AAE5B,EAAE,4BAAC,CAAC,AACF,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,AAAE,CAAC,AAExB,EAAE,4BAAC,CAAC,AACF,YAAY,CAAE,IAAI,AAAE,CAAC,AAEvB,8BAAE,WAAW,AAAC,CAAC,AACb,MAAM,CAAE,CAAC,AAAE,CAAC,AAEd,CAAC,CAAC,YAAY,CAAC,MAAM,CAAC,4BAAC,CAAC,AACtB,eAAe,CAAE,SAAS,AAAE,CAAC\"}"
};

function isSegmentActive$1(_segment, thisSegment) {
	if (!_segment && !thisSegment || _segment === thisSegment) {
		return "page";
	}
}

const Nav = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.isSegmentActive === void 0 && $$bindings.isSegmentActive && isSegmentActive$1 !== void 0) $$bindings.isSegmentActive(isSegmentActive$1);
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$8);

	return `<nav class="${"svelte-qj39fg"}"><ul class="${"svelte-qj39fg"}"><li class="${"svelte-qj39fg"}"><a class="${"nav-title-link svelte-qj39fg"}"${add_attribute("aria-current", isSegmentActive$1(segment), 0)} href="${"."}"><h1>Cellule Life</h1></a></li>

		<li class="${"spacer svelte-qj39fg"}"></li>

		<li class="${"svelte-qj39fg"}"><a${add_attribute("aria-current", isSegmentActive$1(segment, "how-it-works"), 0)} href="${"how-it-works"}" class="${"svelte-qj39fg"}">How it Works</a></li>

		<li class="${"svelte-qj39fg"}"><a${add_attribute("aria-current", isSegmentActive$1(segment, "scores"), 0)} href="${"scores"}" class="${"svelte-qj39fg"}">High Scores</a></li>

		<li class="${"spacer svelte-qj39fg"}"></li>

		<li class="${"svelte-qj39fg"}">${validate_component(Button, "Button").$$render($$result, { tag: "a", href: "game" }, {}, { default: () => `Play the Game!` })}</li></ul></nav>`;
});

/* src/components/ProfanityFilter.svelte generated by Svelte v3.23.0 */

const css$9 = {
	code: ".filter-wrapper.svelte-1pt8hu{position:fixed;bottom:0;left:0}.filter-wrapper.svelte-1pt8hu .button{border-bottom-right-radius:0;border-top-left-radius:0;border-bottom-left-radius:0;border-bottom:0;border-left:0;padding:40px 34px 34px}.filter-wrapper.svelte-1pt8hu .switch{pointer-events:none}",
	map: "{\"version\":3,\"file\":\"ProfanityFilter.svelte\",\"sources\":[\"ProfanityFilter.svelte\"],\"sourcesContent\":[\"<script>\\n  import { onMount } from 'svelte';\\n  import { Button, Switch } from 'svelma';\\n\\timport { shouldShowUsernames, setShouldShowUsernames } from '../stores/ui';\\n\\n  export let container;\\n\\n  onMount(() => {\\n    document.body.appendChild(container);\\n  });\\n</script>\\n\\n<style>\\n\\n.filter-wrapper {\\n  position: fixed;\\n  bottom: 0;\\n  left: 0;\\n}\\n\\n.filter-wrapper :global(.button) {\\n  border-bottom-right-radius: 0;\\n  border-top-left-radius: 0;\\n  border-bottom-left-radius: 0;\\n  border-bottom: 0;\\n  border-left: 0;\\n  padding: 40px 34px 34px;\\n}\\n\\n.filter-wrapper :global(.switch) {\\n  pointer-events: none;\\n}</style>\\n\\n<div\\n    bind:this={container}\\n    class=\\\"filter-wrapper\\\"\\n    tabindex=\\\"-1\\\"\\n>\\n  <Button\\n    on:click={setShouldShowUsernames(!$shouldShowUsernames)}\\n    size=\\\"is-large\\\"\\n  >\\n    <Switch\\n      class=\\\"switch\\\"\\n      bind:checked={$shouldShowUsernames}\\n      type=\\\"is-danger\\\"\\n    >\\n      Show Usernames\\n    </Switch>\\n  </Button>\\n</div>\"],\"names\":[],\"mappings\":\"AAcA,eAAe,cAAC,CAAC,AACf,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,AACT,CAAC,AAED,6BAAe,CAAC,AAAQ,OAAO,AAAE,CAAC,AAChC,0BAA0B,CAAE,CAAC,CAC7B,sBAAsB,CAAE,CAAC,CACzB,yBAAyB,CAAE,CAAC,CAC5B,aAAa,CAAE,CAAC,CAChB,WAAW,CAAE,CAAC,CACd,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,AACzB,CAAC,AAED,6BAAe,CAAC,AAAQ,OAAO,AAAE,CAAC,AAChC,cAAc,CAAE,IAAI,AACtB,CAAC\"}"
};

const ProfanityFilter = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let $shouldShowUsernames = get_store_value(shouldShowUsernames);
	let { container } = $$props;

	onMount(() => {
		document.body.appendChild(container);
	});

	if ($$props.container === void 0 && $$bindings.container && container !== void 0) $$bindings.container(container);
	$$result.css.add(css$9);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `<div class="${"filter-wrapper svelte-1pt8hu"}" tabindex="${"-1"}"${add_attribute("this", container, 1)}>${validate_component(Button, "Button").$$render($$result, { size: "is-large" }, {}, {
			default: () => `${validate_component(Switch, "Switch").$$render(
				$$result,
				{
					class: "switch",
					type: "is-danger",
					checked: $shouldShowUsernames
				},
				{
					checked: $$value => {
						$shouldShowUsernames = $$value;
						$$settled = false;
					}
				},
				{
					default: () => `Show Usernames
    `
				}
			)}`
		})}</div>`;
	} while (!$$settled);

	return $$rendered;
});

/* src/routes/_layout.svelte generated by Svelte v3.23.0 */

const css$a = {
	code: "main.page.svelte-1yzl5q2.svelte-1yzl5q2{position:relative;max-width:56em;background-color:white;padding:2em;margin:0 auto;box-sizing:border-box;border:thin solid #dbdbdb;border-radius:4px}.hero-wrapper.svelte-1yzl5q2.svelte-1yzl5q2{display:flex;flex-direction:column;height:400px;width:100vw;transition:height 0.5s;position:relative}.video-background-wrapper.svelte-1yzl5q2.svelte-1yzl5q2{position:fixed;top:-20px;bottom:calc(100vh - 400px);left:-20px;right:-20px;z-index:-100;overflow:hidden;transition:bottom 300ms}video.background.svelte-1yzl5q2.svelte-1yzl5q2{height:calc(100% + 20px);width:100%;-o-object-fit:cover;object-fit:cover;-webkit-filter:blur(10px);filter:blur(10px);z-index:-100;display:block;overflow:hidden}.title-wrapper.svelte-1yzl5q2.svelte-1yzl5q2{height:100px;transition:height 300ms;font-size:40px;display:flex;flex-direction:column;justify-content:center;align-items:center;margin-bottom:42px;text-align:center}.page-title.svelte-1yzl5q2.svelte-1yzl5q2{align-self:center;justify-self:center;font-size:42px;transition:font-size 300ms}.hero-wrapper.home.svelte-1yzl5q2.svelte-1yzl5q2{height:100vh;overflow-x:hidden}.hero-wrapper.home.svelte-1yzl5q2 .hero-inner-wrapper.svelte-1yzl5q2{overflow:scroll-y}.hero-wrapper.home.svelte-1yzl5q2 .video-background-wrapper.svelte-1yzl5q2{bottom:-20px}.hero-wrapper.home.svelte-1yzl5q2 .title-wrapper.svelte-1yzl5q2{height:calc(100vh - 80px)}.hero-wrapper.home.svelte-1yzl5q2 .page-title.svelte-1yzl5q2{font-size:80px}.home-page-route-wrapper.svelte-1yzl5q2.svelte-1yzl5q2{width:100%}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Nav from '../components/Nav.svelte';\\n\\timport ProfanityFilter from '../components/ProfanityFilter.svelte';\\n  import 'bulma/css/bulma.css';\\n\\texport let segment;\\n</script>\\n\\n<style lang=\\\"scss\\\">main.page {\\n  position: relative;\\n  max-width: 56em;\\n  background-color: white;\\n  padding: 2em;\\n  margin: 0 auto;\\n  box-sizing: border-box;\\n  border: thin solid #dbdbdb;\\n  border-radius: 4px; }\\n\\n.hero-wrapper {\\n  display: flex;\\n  flex-direction: column;\\n  height: 400px;\\n  width: 100vw;\\n  transition: height 0.5s;\\n  position: relative; }\\n\\n.video-background-wrapper {\\n  position: fixed;\\n  top: -20px;\\n  bottom: calc(100vh - 400px);\\n  left: -20px;\\n  right: -20px;\\n  z-index: -100;\\n  overflow: hidden;\\n  transition: bottom 300ms; }\\n\\nvideo.background {\\n  /* position: absolute;\\n\\ttop: 0;\\n\\tleft: 0; */\\n  height: calc(100% + 20px);\\n  width: 100%;\\n  -o-object-fit: cover;\\n     object-fit: cover;\\n  -webkit-filter: blur(10px);\\n          filter: blur(10px);\\n  z-index: -100;\\n  display: block;\\n  overflow: hidden; }\\n\\n.title-wrapper {\\n  height: 100px;\\n  transition: height 300ms;\\n  font-size: 40px;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  margin-bottom: 42px;\\n  text-align: center; }\\n\\n.page-title {\\n  align-self: center;\\n  justify-self: center;\\n  font-size: 42px;\\n  transition: font-size 300ms; }\\n\\n.hero-wrapper.home {\\n  height: 100vh;\\n  overflow-x: hidden; }\\n  .hero-wrapper.home .hero-inner-wrapper {\\n    overflow: scroll-y; }\\n  .hero-wrapper.home .video-background-wrapper {\\n    bottom: -20px; }\\n  .hero-wrapper.home .title-wrapper {\\n    height: calc(100vh - 80px); }\\n  .hero-wrapper.home .page-title {\\n    font-size: 80px; }\\n\\n.home-page-route-wrapper {\\n  width: 100%; }</style>\\n\\n<div class=\\\"hero-wrapper {!segment && 'home' }\\\">\\n\\t<div class=\\\"hero-inner-wrapper\\\">\\n\\t\\t<div class=\\\"video-background-wrapper\\\">\\n\\t\\t\\t<video loop muted autoplay class=\\\"background\\\" src=\\\"/cellulelife-2.mp4\\\"></video>\\n\\t\\t</div>\\n\\t\\t<Nav class=\\\"main-nav\\\" {segment}/>\\n\\n\\t\\t<div class=\\\"title-wrapper\\\">\\n\\t\\t\\t<h1 class=\\\"page-title\\\">\\n\\t\\t\\t\\t{#if !segment }\\n\\t\\t\\t\\t\\tCellule Life\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t{segment}\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</h1>\\n\\t\\t\\t<div class=\\\"home-page-route-wrapper\\\">\\n\\t\\t\\t\\t{#if !segment }\\n\\t\\t\\t\\t\\t<slot></slot>\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\n\\t\\t{#if segment }\\n\\t\\t\\t<main class=\\\"page\\\">\\n\\t\\t\\t\\t<slot></slot>\\n\\t\\t\\t</main>\\n\\t\\t\\t<ProfanityFilter></ProfanityFilter>\\n\\t\\t{/if}\\n\\t</div>\\n</div>\"],\"names\":[],\"mappings\":\"AAOmB,IAAI,KAAK,8BAAC,CAAC,AAC5B,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,KAAK,CACvB,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,IAAI,CAAC,KAAK,CAAC,OAAO,CAC1B,aAAa,CAAE,GAAG,AAAE,CAAC,AAEvB,aAAa,8BAAC,CAAC,AACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,CAAC,IAAI,CACvB,QAAQ,CAAE,QAAQ,AAAE,CAAC,AAEvB,yBAAyB,8BAAC,CAAC,AACzB,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,KAAK,CACV,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAC3B,IAAI,CAAE,KAAK,CACX,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,MAAM,CAAC,KAAK,AAAE,CAAC,AAE7B,KAAK,WAAW,8BAAC,CAAC,AAIhB,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACzB,KAAK,CAAE,IAAI,CACX,aAAa,CAAE,KAAK,CACjB,UAAU,CAAE,KAAK,CACpB,cAAc,CAAE,KAAK,IAAI,CAAC,CAClB,MAAM,CAAE,KAAK,IAAI,CAAC,CAC1B,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,MAAM,AAAE,CAAC,AAErB,cAAc,8BAAC,CAAC,AACd,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,MAAM,CAAC,KAAK,CACxB,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,MAAM,AAAE,CAAC,AAEvB,WAAW,8BAAC,CAAC,AACX,UAAU,CAAE,MAAM,CAClB,YAAY,CAAE,MAAM,CACpB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,SAAS,CAAC,KAAK,AAAE,CAAC,AAEhC,aAAa,KAAK,8BAAC,CAAC,AAClB,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,MAAM,AAAE,CAAC,AACrB,aAAa,oBAAK,CAAC,mBAAmB,eAAC,CAAC,AACtC,QAAQ,CAAE,QAAQ,AAAE,CAAC,AACvB,aAAa,oBAAK,CAAC,yBAAyB,eAAC,CAAC,AAC5C,MAAM,CAAE,KAAK,AAAE,CAAC,AAClB,aAAa,oBAAK,CAAC,cAAc,eAAC,CAAC,AACjC,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,AAAE,CAAC,AAC/B,aAAa,oBAAK,CAAC,WAAW,eAAC,CAAC,AAC9B,SAAS,CAAE,IAAI,AAAE,CAAC,AAEtB,wBAAwB,8BAAC,CAAC,AACxB,KAAK,CAAE,IAAI,AAAE,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$a);

	return `<div class="${"hero-wrapper " + escape(!segment && "home") + " svelte-1yzl5q2"}"><div class="${"hero-inner-wrapper svelte-1yzl5q2"}"><div class="${"video-background-wrapper svelte-1yzl5q2"}"><video loop muted autoplay class="${"background svelte-1yzl5q2"}" src="${"/cellulelife-2.mp4"}"></video></div>
		${validate_component(Nav, "Nav").$$render($$result, { class: "main-nav", segment }, {}, {})}

		<div class="${"title-wrapper svelte-1yzl5q2"}"><h1 class="${"page-title svelte-1yzl5q2"}">${!segment ? `Cellule Life` : `${escape(segment)}`}</h1>
			<div class="${"home-page-route-wrapper svelte-1yzl5q2"}">${!segment
	? `${$$slots.default ? $$slots.default({}) : ``}`
	: ``}</div></div>

		${segment
	? `<main class="${"page svelte-1yzl5q2"}">${$$slots.default ? $$slots.default({}) : ``}</main>
			${validate_component(ProfanityFilter, "ProfanityFilter").$$render($$result, {}, {}, {})}`
	: ``}</div></div>`;
});

/* src/routes/_error.svelte generated by Svelte v3.23.0 */

const css$b = {
	code: "h1.svelte-ibl7am,p.svelte-ibl7am{margin:0 auto}h1.svelte-ibl7am{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-ibl7am{margin:1em auto}@media(min-width: 480px){h1.svelte-ibl7am{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = \\\"development\\\" === 'development';\\n</script>\\n\\n<style>\\nh1, p {\\n\\tmargin: 0 auto;\\n}\\n\\nh1 {\\n\\tfont-size: 2.8em;\\n\\tfont-weight: 700;\\n\\tmargin: 0 0 0.5em 0;\\n}\\n\\np {\\n\\tmargin: 1em auto;\\n}\\n\\n@media (min-width: 480px) {\\n\\th1 {\\n\\t\\tfont-size: 4em;\\n\\t}\\n}</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQA,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$b);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-ibl7am"}">${escape(status)}</h1>

<p class="${"svelte-ibl7am"}">${escape(error.message)}</p>

${ error.stack
	? `<pre>${escape(error.stack)}</pre>`
	: ``}`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: Routes }
			]
		},

		{
			// how-it-works.svelte
			pattern: /^\/how-it-works\/?$/,
			parts: [
				{ name: "how$45it$45works", file: "how-it-works.svelte", component: How_it_works }
			]
		},

		{
			// scores/[slug]/[editCount].svelte
			pattern: /^\/scores\/([^\/]+?)\/([^\/]+?)\/?$/,
			parts: [
				null,
				null,
				{ name: "scores_$slug$93_$91editCount", file: "scores/[slug]/[editCount].svelte", component: U5BeditCountu5D, preload: preload, params: match => ({ slug: d(match[1]), editCount: d(match[2]) }) }
			]
		},

		{
			// scores/[slug].svelte
			pattern: /^\/scores\/([^\/]+?)\/?$/,
			parts: [
				null,
				{ name: "scores_$slug", file: "scores/[slug].svelte", component: U5Bslugu5D, preload: preload$1, params: match => ({ slug: d(match[1]) }) }
			]
		},

		{
			// scores.svelte
			pattern: /^\/scores\/?$/,
			parts: [
				{ name: "scores", file: "scores.svelte", component: Scores, preload: preload$2 }
			]
		}
	],

	root: Layout,
	root_preload: () => {},
	error: Error$1
};

const build_dir = "__sapper__/build";

const CONTEXT_KEY = {};

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.23.0 */

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

function get_server_route_handler(routes) {
	async function handle_route(route, req, res, next) {
		req.params = route.params(route.pattern.exec(req.path));

		const method = req.method.toLowerCase();
		// 'delete' cannot be exported from a module because it is a keyword,
		// so check for 'del' instead
		const method_export = method === 'delete' ? 'del' : method;
		const handle_method = route.handlers[method_export];
		if (handle_method) {
			if (process.env.SAPPER_EXPORT) {
				const { write, end, setHeader } = res;
				const chunks = [];
				const headers = {};

				// intercept data so that it can be exported
				res.write = function(chunk) {
					chunks.push(Buffer.from(chunk));
					write.apply(res, arguments);
				};

				res.setHeader = function(name, value) {
					headers[name.toLowerCase()] = value;
					setHeader.apply(res, arguments);
				};

				res.end = function(chunk) {
					if (chunk) chunks.push(Buffer.from(chunk));
					end.apply(res, arguments);

					process.send({
						__sapper__: true,
						event: 'file',
						url: req.url,
						method: req.method,
						status: res.statusCode,
						type: headers['content-type'],
						body: Buffer.concat(chunks).toString()
					});
				};
			}

			const handle_next = (err) => {
				if (err) {
					res.statusCode = 500;
					res.end(err.message);
				} else {
					process.nextTick(next);
				}
			};

			try {
				await handle_method(req, res, handle_next);
			} catch (err) {
				console.error(err);
				handle_next(err);
			}
		} else {
			// no matching handler for method
			process.nextTick(next);
		}
	}

	return function find_route(req, res, next) {
		for (const route of routes) {
			if (route.pattern.test(req.path)) {
				handle_route(route, req, res, next);
				return;
			}
		}

		next();
	};
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;
var serialize_1 = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var cookie = {
	parse: parse_1,
	serialize: serialize_1
};

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return thing.toString();
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

function get_page_handler(
	manifest,
	session_getter
) {
	const get_build_info =  (assets => () => assets)(JSON.parse(fs.readFileSync(path.join(build_dir, 'build.json'), 'utf-8')));

	const template =  (str => () => str)(read_template(build_dir));

	const has_service_worker = fs.existsSync(path.join(build_dir, 'service-worker.js'));

	const { server_routes, pages } = manifest;
	const error_route = manifest.error;

	function bail(req, res, err) {
		console.error(err);

		const message =  'Internal server error';

		res.statusCode = 500;
		res.end(`<pre>${message}</pre>`);
	}

	function handle_error(req, res, statusCode, error) {
		handle_page({
			pattern: null,
			parts: [
				{ name: null, component: error_route }
			]
		}, req, res, statusCode, error || new Error('Unknown error in preload function'));
	}

	async function handle_page(page, req, res, status = 200, error = null) {
		const is_service_worker_index = req.path === '/service-worker-index.html';
		const build_info




 = get_build_info();

		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Cache-Control',  'max-age=600');

		// preload main.js and current route
		// TODO detect other stuff we can preload? images, CSS, fonts?
		let preloaded_chunks = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
		if (!error && !is_service_worker_index) {
			page.parts.forEach(part => {
				if (!part) return;

				// using concat because it could be a string or an array. thanks webpack!
				preloaded_chunks = preloaded_chunks.concat(build_info.assets[part.name]);
			});
		}

		if (build_info.bundler === 'rollup') {
			// TODO add dependencies and CSS
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map(file => `<${req.baseUrl}/client/${file}>;rel="modulepreload"`)
				.join(', ');

			res.setHeader('Link', link);
		} else {
			const link = preloaded_chunks
				.filter(file => file && !file.match(/\.map$/))
				.map((file) => {
					const as = /\.css$/.test(file) ? 'style' : 'script';
					return `<${req.baseUrl}/client/${file}>;rel="preload";as="${as}"`;
				})
				.join(', ');

			res.setHeader('Link', link);
		}

		const session = session_getter(req, res);

		let redirect;
		let preload_error;

		const preload_context = {
			redirect: (statusCode, location) => {
				if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
					throw new Error(`Conflicting redirects`);
				}
				location = location.replace(/^\//g, ''); // leading slash (only)
				redirect = { statusCode, location };
			},
			error: (statusCode, message) => {
				preload_error = { statusCode, message };
			},
			fetch: (url, opts) => {
				const parsed = new Url.URL(url, `http://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' :''}`);

				if (opts) {
					opts = Object.assign({}, opts);

					const include_cookies = (
						opts.credentials === 'include' ||
						opts.credentials === 'same-origin' && parsed.origin === `http://127.0.0.1:${process.env.PORT}`
					);

					if (include_cookies) {
						opts.headers = Object.assign({}, opts.headers);

						const cookies = Object.assign(
							{},
							cookie.parse(req.headers.cookie || ''),
							cookie.parse(opts.headers.cookie || '')
						);

						const set_cookie = res.getHeader('Set-Cookie');
						(Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach(str => {
							const match = /([^=]+)=([^;]+)/.exec(str);
							if (match) cookies[match[1]] = match[2];
						});

						const str = Object.keys(cookies)
							.map(key => `${key}=${cookies[key]}`)
							.join('; ');

						opts.headers.cookie = str;
					}
				}

				return fetch(parsed.href, opts);
			}
		};

		let preloaded;
		let match;
		let params;

		try {
			const root_preloaded = manifest.root_preload
				? manifest.root_preload.call(preload_context, {
					host: req.headers.host,
					path: req.path,
					query: req.query,
					params: {}
				}, session)
				: {};

			match = error ? null : page.pattern.exec(req.path);


			let toPreload = [root_preloaded];
			if (!is_service_worker_index) {
				toPreload = toPreload.concat(page.parts.map(part => {
					if (!part) return null;

					// the deepest level is used below, to initialise the store
					params = part.params ? part.params(match) : {};

					return part.preload
						? part.preload.call(preload_context, {
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}, session)
						: {};
				}));
			}

			preloaded = await Promise.all(toPreload);
		} catch (err) {
			if (error) {
				return bail(req, res, err)
			}

			preload_error = { statusCode: 500, message: err };
			preloaded = []; // appease TypeScript
		}

		try {
			if (redirect) {
				const location = Url.resolve((req.baseUrl || '') + '/', redirect.location);

				res.statusCode = redirect.statusCode;
				res.setHeader('Location', location);
				res.end();

				return;
			}

			if (preload_error) {
				handle_error(req, res, preload_error.statusCode, preload_error.message);
				return;
			}

			const segments = req.path.split('/').filter(Boolean);

			// TODO make this less confusing
			const layout_segments = [segments[0]];
			let l = 1;

			page.parts.forEach((part, i) => {
				layout_segments[l] = segments[i + 1];
				if (!part) return null;
				l++;
			});

			const props = {
				stores: {
					page: {
						subscribe: writable({
							host: req.headers.host,
							path: req.path,
							query: req.query,
							params
						}).subscribe
					},
					preloading: {
						subscribe: writable(null).subscribe
					},
					session: writable(session)
				},
				segments: layout_segments,
				status: error ? status : 200,
				error: error ? error instanceof Error ? error : { message: error } : null,
				level0: {
					props: preloaded[0]
				},
				level1: {
					segment: segments[0],
					props: {}
				}
			};

			if (!is_service_worker_index) {
				let l = 1;
				for (let i = 0; i < page.parts.length; i += 1) {
					const part = page.parts[i];
					if (!part) continue;

					props[`level${l++}`] = {
						component: part.component,
						props: preloaded[i + 1] || {},
						segment: segments[i]
					};
				}
			}

			const { html, head, css } = App.render(props);

			const serialized = {
				preloaded: `[${preloaded.map(data => try_serialize(data)).join(',')}]`,
				session: session && try_serialize(session, err => {
					throw new Error(`Failed to serialize session data: ${err.message}`);
				}),
				error: error && try_serialize(props.error)
			};

			let script = `__SAPPER__={${[
				error && `error:${serialized.error},status:${status}`,
				`baseUrl:"${req.baseUrl}"`,
				serialized.preloaded && `preloaded:${serialized.preloaded}`,
				serialized.session && `session:${serialized.session}`
			].filter(Boolean).join(',')}};`;

			if (has_service_worker) {
				script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
			}

			const file = [].concat(build_info.assets.main).filter(file => file && /\.js$/.test(file))[0];
			const main = `${req.baseUrl}/client/${file}`;

			if (build_info.bundler === 'rollup') {
				if (build_info.legacy_assets) {
					const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
					script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
				} else {
					script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
				}
			} else {
				script += `</script><script src="${main}">`;
			}

			let styles;

			// TODO make this consistent across apps
			// TODO embed build_info in placeholder.ts
			if (build_info.css && build_info.css.main) {
				const css_chunks = new Set();
				if (build_info.css.main) css_chunks.add(build_info.css.main);
				page.parts.forEach(part => {
					if (!part) return;
					const css_chunks_for_part = build_info.css.chunks[part.file];

					if (css_chunks_for_part) {
						css_chunks_for_part.forEach(file => {
							css_chunks.add(file);
						});
					}
				});

				styles = Array.from(css_chunks)
					.map(href => `<link rel="stylesheet" href="client/${href}">`)
					.join('');
			} else {
				styles = (css && css.code ? `<style>${css.code}</style>` : '');
			}

			// users can set a CSP nonce using res.locals.nonce
			const nonce_attr = (res.locals && res.locals.nonce) ? ` nonce="${res.locals.nonce}"` : '';

			const body = template()
				.replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
				.replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
				.replace('%sapper.html%', () => html)
				.replace('%sapper.head%', () => `<noscript id='sapper-head-start'></noscript>${head}<noscript id='sapper-head-end'></noscript>`)
				.replace('%sapper.styles%', () => styles);

			res.statusCode = status;
			res.end(body);
		} catch(err) {
			if (error) {
				bail(req, res, err);
			} else {
				handle_error(req, res, 500, err);
			}
		}
	}

	return function find_route(req, res, next) {
		if (req.path === '/service-worker-index.html') {
			const homePage = pages.find(page => page.pattern.test('/'));
			handle_page(homePage, req, res);
			return;
		}

		for (const page of pages) {
			if (page.pattern.test(req.path)) {
				handle_page(page, req, res);
				return;
			}
		}

		handle_error(req, res, 404, 'Not found');
	};
}

function read_template(dir = build_dir) {
	return fs.readFileSync(`${dir}/template.html`, 'utf-8');
}

function try_serialize(data, fail) {
	try {
		return devalue(data);
	} catch (err) {
		if (fail) fail(err);
		return null;
	}
}

function middleware(opts


 = {}) {
	const { session, ignore } = opts;

	let emitted_basepath = false;

	return compose_handlers(ignore, [
		(req, res, next) => {
			if (req.baseUrl === undefined) {
				let { originalUrl } = req;
				if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
					originalUrl += '/';
				}

				req.baseUrl = originalUrl
					? originalUrl.slice(0, -req.url.length)
					: '';
			}

			if (!emitted_basepath && process.send) {
				process.send({
					__sapper__: true,
					event: 'basepath',
					basepath: req.baseUrl
				});

				emitted_basepath = true;
			}

			if (req.path === undefined) {
				req.path = req.url.replace(/\?.*/, '');
			}

			next();
		},

		fs.existsSync(path.join(build_dir, 'service-worker.js')) && serve({
			pathname: '/service-worker.js',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		fs.existsSync(path.join(build_dir, 'service-worker.js.map')) && serve({
			pathname: '/service-worker.js.map',
			cache_control: 'no-cache, no-store, must-revalidate'
		}),

		serve({
			prefix: '/client/',
			cache_control:  'max-age=31536000, immutable'
		}),

		get_server_route_handler(manifest.server_routes),

		get_page_handler(manifest, session || noop$1)
	].filter(Boolean));
}

function compose_handlers(ignore, handlers) {
	const total = handlers.length;

	function nth_handler(n, req, res, next) {
		if (n >= total) {
			return next();
		}

		handlers[n](req, res, () => nth_handler(n+1, req, res, next));
	}

	return !ignore
		? (req, res, next) => nth_handler(0, req, res, next)
		: (req, res, next) => {
			if (should_ignore(req.path, ignore)) {
				next();
			} else {
				nth_handler(0, req, res, next);
			}
		};
}

function should_ignore(uri, val) {
	if (Array.isArray(val)) return val.some(x => should_ignore(uri, x));
	if (val instanceof RegExp) return val.test(uri);
	if (typeof val === 'function') return val(uri);
	return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}

function serve({ prefix, pathname, cache_control }



) {
	const filter = pathname
		? (req) => req.path === pathname
		: (req) => req.path.startsWith(prefix);

	const cache = new Map();

	const read =  (file) => (cache.has(file) ? cache : cache.set(file, fs.readFileSync(path.join(build_dir, file)))).get(file);

	return (req, res, next) => {
		if (filter(req)) {
			const type = lite.getType(req.path);

			try {
				const file = path.posix.normalize(decodeURIComponent(req.path));
				const data = read(file);

				res.setHeader('Content-Type', type);
				res.setHeader('Cache-Control', cache_control);
				res.end(data);
			} catch (err) {
				res.statusCode = 404;
				res.end('not found');
			}
		} else {
			next();
		}
	};
}

function noop$1(){}

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
