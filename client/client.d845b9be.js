function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_svg_attributes(node, attributes) {
    for (const key in attributes) {
        attr(node, key, attributes[key]);
    }
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_element(nodes, name, attributes, svg) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
            let j = 0;
            while (j < node.attributes.length) {
                const attribute = node.attributes[j];
                if (attributes[attribute.name]) {
                    j++;
                }
                else {
                    node.removeAttribute(attribute.name);
                }
            }
            return nodes.splice(i, 1)[0];
        }
    }
    return svg ? svg_element(name) : element(name);
}
function claim_text(nodes, data) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
            node.data = '' + data;
            return nodes.splice(i, 1)[0];
        }
    }
    return text(data);
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function select_option(select, value) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked') || select.options[0];
    return selected_option && selected_option.__value;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
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
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if ($$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set() {
        // overridden by instance, if it has props
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.23.0' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev("SvelteDOMInsert", { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev("SvelteDOMInsert", { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev("SvelteDOMRemove", { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
    else
        dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev("SvelteDOMSetProperty", { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data)
        return;
    dispatch_dev("SvelteDOMSetData", { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error(`'target' is a required option`);
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn(`Component was already destroyed`); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

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

const CONTEXT_KEY = {};

const preload = () => ({});

/* node_modules/svelma/src/components/Icon.svelte generated by Svelte v3.23.0 */

const file = "node_modules/svelma/src/components/Icon.svelte";

function create_fragment(ctx) {
	let span;
	let i;
	let i_class_value;
	let span_class_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = element("span");
			i = element("i");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			i = claim_element(span_nodes, "I", { class: true });
			children(i).forEach(detach_dev);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(i, "class", i_class_value = "" + (/*newPack*/ ctx[8] + " fa-" + /*icon*/ ctx[0] + " " + /*customClass*/ ctx[2] + " " + /*newCustomSize*/ ctx[6]));
			add_location(i, file, 53, 2, 1189);
			attr_dev(span, "class", span_class_value = "icon " + /*size*/ ctx[1] + " " + /*newType*/ ctx[7] + " " + (/*isLeft*/ ctx[4] && "is-left" || "") + " " + (/*isRight*/ ctx[5] && "is-right" || ""));
			toggle_class(span, "is-clickable", /*isClickable*/ ctx[3]);
			add_location(span, file, 52, 0, 1046);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, i);

			if (!mounted) {
				dispose = listen_dev(span, "click", /*click_handler*/ ctx[12], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*newPack, icon, customClass, newCustomSize*/ 325 && i_class_value !== (i_class_value = "" + (/*newPack*/ ctx[8] + " fa-" + /*icon*/ ctx[0] + " " + /*customClass*/ ctx[2] + " " + /*newCustomSize*/ ctx[6]))) {
				attr_dev(i, "class", i_class_value);
			}

			if (dirty & /*size, newType, isLeft, isRight*/ 178 && span_class_value !== (span_class_value = "icon " + /*size*/ ctx[1] + " " + /*newType*/ ctx[7] + " " + (/*isLeft*/ ctx[4] && "is-left" || "") + " " + (/*isRight*/ ctx[5] && "is-right" || ""))) {
				attr_dev(span, "class", span_class_value);
			}

			if (dirty & /*size, newType, isLeft, isRight, isClickable*/ 186) {
				toggle_class(span, "is-clickable", /*isClickable*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
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

function instance($$self, $$props, $$invalidate) {
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

	const writable_props = [
		"type",
		"pack",
		"icon",
		"size",
		"customClass",
		"customSize",
		"isClickable",
		"isLeft",
		"isRight"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Icon> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Icon", $$slots, []);

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$set = $$props => {
		if ("type" in $$props) $$invalidate(9, type = $$props.type);
		if ("pack" in $$props) $$invalidate(10, pack = $$props.pack);
		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
		if ("size" in $$props) $$invalidate(1, size = $$props.size);
		if ("customClass" in $$props) $$invalidate(2, customClass = $$props.customClass);
		if ("customSize" in $$props) $$invalidate(11, customSize = $$props.customSize);
		if ("isClickable" in $$props) $$invalidate(3, isClickable = $$props.isClickable);
		if ("isLeft" in $$props) $$invalidate(4, isLeft = $$props.isLeft);
		if ("isRight" in $$props) $$invalidate(5, isRight = $$props.isRight);
	};

	$$self.$capture_state = () => ({
		type,
		pack,
		icon,
		size,
		customClass,
		customSize,
		isClickable,
		isLeft,
		isRight,
		newCustomSize,
		newType,
		newPack
	});

	$$self.$inject_state = $$props => {
		if ("type" in $$props) $$invalidate(9, type = $$props.type);
		if ("pack" in $$props) $$invalidate(10, pack = $$props.pack);
		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
		if ("size" in $$props) $$invalidate(1, size = $$props.size);
		if ("customClass" in $$props) $$invalidate(2, customClass = $$props.customClass);
		if ("customSize" in $$props) $$invalidate(11, customSize = $$props.customSize);
		if ("isClickable" in $$props) $$invalidate(3, isClickable = $$props.isClickable);
		if ("isLeft" in $$props) $$invalidate(4, isLeft = $$props.isLeft);
		if ("isRight" in $$props) $$invalidate(5, isRight = $$props.isRight);
		if ("newCustomSize" in $$props) $$invalidate(6, newCustomSize = $$props.newCustomSize);
		if ("newType" in $$props) $$invalidate(7, newType = $$props.newType);
		if ("newPack" in $$props) $$invalidate(8, newPack = $$props.newPack);
	};

	let newPack;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*pack*/ 1024) {
			 $$invalidate(8, newPack = pack || "fas");
		}

		if ($$self.$$.dirty & /*customSize, size*/ 2050) {
			 {
				if (customSize) $$invalidate(6, newCustomSize = customSize); else {
					switch (size) {
						case "is-small":
							break;
						case "is-medium":
							$$invalidate(6, newCustomSize = "fa-lg");
							break;
						case "is-large":
							$$invalidate(6, newCustomSize = "fa-3x");
							break;
						default:
							$$invalidate(6, newCustomSize = "");
					}
				}
			}
		}

		if ($$self.$$.dirty & /*type*/ 512) {
			 {
				if (!type) $$invalidate(7, newType = "");
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

				if (splitType.length <= 1) $$invalidate(7, newType = ""); else $$invalidate(7, newType = `has-text-${splitType[1]}`);
			}
		}
	};

	return [
		icon,
		size,
		customClass,
		isClickable,
		isLeft,
		isRight,
		newCustomSize,
		newType,
		newPack,
		type,
		pack,
		customSize,
		click_handler
	];
}

class Icon extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			type: 9,
			pack: 10,
			icon: 0,
			size: 1,
			customClass: 2,
			customSize: 11,
			isClickable: 3,
			isLeft: 4,
			isRight: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*icon*/ ctx[0] === undefined && !("icon" in props)) {
			console.warn("<Icon> was created without expected prop 'icon'");
		}
	}

	get type() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get pack() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set pack(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get icon() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set icon(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get customClass() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set customClass(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get customSize() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set customSize(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isClickable() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isClickable(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isLeft() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isLeft(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isRight() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isRight(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function omit(obj, ...keysToOmit) {
  return Object.keys(obj).reduce((acc, key) => {
    if (keysToOmit.indexOf(key) === -1) acc[key] = obj[key];
    return acc
  }, {})
}

/* node_modules/svelma/src/components/Button.svelte generated by Svelte v3.23.0 */

const { Error: Error_1 } = globals;
const file$1 = "node_modules/svelma/src/components/Button.svelte";

// (85:22) 
function create_if_block_3(ctx) {
	let a;
	let t0;
	let span;
	let t1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*iconLeft*/ ctx[7] && create_if_block_5(ctx);
	const default_slot_template = /*$$slots*/ ctx[16].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);
	let if_block1 = /*iconRight*/ ctx[8] && create_if_block_4(ctx);
	let a_levels = [{ href: /*href*/ ctx[1] }, /*props*/ ctx[11]];
	let a_data = {};

	for (let i = 0; i < a_levels.length; i += 1) {
		a_data = assign(a_data, a_levels[i]);
	}

	const block = {
		c: function create() {
			a = element("a");
			if (if_block0) if_block0.c();
			t0 = space();
			span = element("span");
			if (default_slot) default_slot.c();
			t1 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { href: true });
			var a_nodes = children(a);
			if (if_block0) if_block0.l(a_nodes);
			t0 = claim_space(a_nodes);
			span = claim_element(a_nodes, "SPAN", {});
			var span_nodes = children(span);
			if (default_slot) default_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			t1 = claim_space(a_nodes);
			if (if_block1) if_block1.l(a_nodes);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$1, 96, 4, 2314);
			set_attributes(a, a_data);
			toggle_class(a, "is-inverted", /*inverted*/ ctx[4]);
			toggle_class(a, "is-loading", /*loading*/ ctx[3]);
			toggle_class(a, "is-outlined", /*outlined*/ ctx[5]);
			toggle_class(a, "is-rounded", /*rounded*/ ctx[6]);
			add_location(a, file$1, 85, 2, 2047);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			if (if_block0) if_block0.m(a, null);
			append_dev(a, t0);
			append_dev(a, span);

			if (default_slot) {
				default_slot.m(span, null);
			}

			append_dev(a, t1);
			if (if_block1) if_block1.m(a, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(a, "click", /*click_handler_1*/ ctx[18], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*iconLeft*/ ctx[7]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*iconLeft*/ 128) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(a, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 32768) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[15], dirty, null, null);
				}
			}

			if (/*iconRight*/ ctx[8]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*iconRight*/ 256) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_4(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(a, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			set_attributes(a, a_data = get_spread_update(a_levels, [
				dirty & /*href*/ 2 && { href: /*href*/ ctx[1] },
				dirty & /*props*/ 2048 && /*props*/ ctx[11]
			]));

			toggle_class(a, "is-inverted", /*inverted*/ ctx[4]);
			toggle_class(a, "is-loading", /*loading*/ ctx[3]);
			toggle_class(a, "is-outlined", /*outlined*/ ctx[5]);
			toggle_class(a, "is-rounded", /*rounded*/ ctx[6]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(default_slot, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(default_slot, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
			if (if_block0) if_block0.d();
			if (default_slot) default_slot.d(detaching);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(85:22) ",
		ctx
	});

	return block;
}

// (66:0) {#if tag === 'button'}
function create_if_block(ctx) {
	let button;
	let t0;
	let span;
	let t1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*iconLeft*/ ctx[7] && create_if_block_2(ctx);
	const default_slot_template = /*$$slots*/ ctx[16].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);
	let if_block1 = /*iconRight*/ ctx[8] && create_if_block_1(ctx);
	let button_levels = [/*props*/ ctx[11], { type: /*nativeType*/ ctx[2] }];
	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	const block = {
		c: function create() {
			button = element("button");
			if (if_block0) if_block0.c();
			t0 = space();
			span = element("span");
			if (default_slot) default_slot.c();
			t1 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			button = claim_element(nodes, "BUTTON", { type: true });
			var button_nodes = children(button);
			if (if_block0) if_block0.l(button_nodes);
			t0 = claim_space(button_nodes);
			span = claim_element(button_nodes, "SPAN", {});
			var span_nodes = children(span);
			if (default_slot) default_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			t1 = claim_space(button_nodes);
			if (if_block1) if_block1.l(button_nodes);
			button_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$1, 77, 4, 1882);
			set_attributes(button, button_data);
			toggle_class(button, "is-inverted", /*inverted*/ ctx[4]);
			toggle_class(button, "is-loading", /*loading*/ ctx[3]);
			toggle_class(button, "is-outlined", /*outlined*/ ctx[5]);
			toggle_class(button, "is-rounded", /*rounded*/ ctx[6]);
			add_location(button, file$1, 66, 2, 1599);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			if (if_block0) if_block0.m(button, null);
			append_dev(button, t0);
			append_dev(button, span);

			if (default_slot) {
				default_slot.m(span, null);
			}

			append_dev(button, t1);
			if (if_block1) if_block1.m(button, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler*/ ctx[17], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*iconLeft*/ ctx[7]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*iconLeft*/ 128) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(button, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 32768) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[15], dirty, null, null);
				}
			}

			if (/*iconRight*/ ctx[8]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*iconRight*/ 256) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(button, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				dirty & /*props*/ 2048 && /*props*/ ctx[11],
				dirty & /*nativeType*/ 4 && { type: /*nativeType*/ ctx[2] }
			]));

			toggle_class(button, "is-inverted", /*inverted*/ ctx[4]);
			toggle_class(button, "is-loading", /*loading*/ ctx[3]);
			toggle_class(button, "is-outlined", /*outlined*/ ctx[5]);
			toggle_class(button, "is-rounded", /*rounded*/ ctx[6]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(default_slot, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(default_slot, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			if (if_block0) if_block0.d();
			if (default_slot) default_slot.d(detaching);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(66:0) {#if tag === 'button'}",
		ctx
	});

	return block;
}

// (94:4) {#if iconLeft}
function create_if_block_5(ctx) {
	let current;

	const icon = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				icon: /*iconLeft*/ ctx[7],
				size: /*iconSize*/ ctx[10]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconPack*/ 512) icon_changes.pack = /*iconPack*/ ctx[9];
			if (dirty & /*iconLeft*/ 128) icon_changes.icon = /*iconLeft*/ ctx[7];
			if (dirty & /*iconSize*/ 1024) icon_changes.size = /*iconSize*/ ctx[10];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(94:4) {#if iconLeft}",
		ctx
	});

	return block;
}

// (100:4) {#if iconRight}
function create_if_block_4(ctx) {
	let current;

	const icon = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				icon: /*iconRight*/ ctx[8],
				size: /*iconSize*/ ctx[10]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconPack*/ 512) icon_changes.pack = /*iconPack*/ ctx[9];
			if (dirty & /*iconRight*/ 256) icon_changes.icon = /*iconRight*/ ctx[8];
			if (dirty & /*iconSize*/ 1024) icon_changes.size = /*iconSize*/ ctx[10];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(100:4) {#if iconRight}",
		ctx
	});

	return block;
}

// (75:4) {#if iconLeft}
function create_if_block_2(ctx) {
	let current;

	const icon = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				icon: /*iconLeft*/ ctx[7],
				size: /*iconSize*/ ctx[10]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconPack*/ 512) icon_changes.pack = /*iconPack*/ ctx[9];
			if (dirty & /*iconLeft*/ 128) icon_changes.icon = /*iconLeft*/ ctx[7];
			if (dirty & /*iconSize*/ 1024) icon_changes.size = /*iconSize*/ ctx[10];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(75:4) {#if iconLeft}",
		ctx
	});

	return block;
}

// (81:4) {#if iconRight}
function create_if_block_1(ctx) {
	let current;

	const icon = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				icon: /*iconRight*/ ctx[8],
				size: /*iconSize*/ ctx[10]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconPack*/ 512) icon_changes.pack = /*iconPack*/ ctx[9];
			if (dirty & /*iconRight*/ 256) icon_changes.icon = /*iconRight*/ ctx[8];
			if (dirty & /*iconSize*/ 1024) icon_changes.size = /*iconSize*/ ctx[10];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(81:4) {#if iconRight}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_if_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*tag*/ ctx[0] === "button") return 0;
		if (/*tag*/ ctx[0] === "a") return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
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
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
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

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Button", $$slots, ['default']);

	function click_handler(event) {
		bubble($$self, event);
	}

	function click_handler_1(event) {
		bubble($$self, event);
	}

	$$self.$set = $$new_props => {
		$$invalidate(14, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ("tag" in $$new_props) $$invalidate(0, tag = $$new_props.tag);
		if ("type" in $$new_props) $$invalidate(12, type = $$new_props.type);
		if ("size" in $$new_props) $$invalidate(13, size = $$new_props.size);
		if ("href" in $$new_props) $$invalidate(1, href = $$new_props.href);
		if ("nativeType" in $$new_props) $$invalidate(2, nativeType = $$new_props.nativeType);
		if ("loading" in $$new_props) $$invalidate(3, loading = $$new_props.loading);
		if ("inverted" in $$new_props) $$invalidate(4, inverted = $$new_props.inverted);
		if ("outlined" in $$new_props) $$invalidate(5, outlined = $$new_props.outlined);
		if ("rounded" in $$new_props) $$invalidate(6, rounded = $$new_props.rounded);
		if ("iconLeft" in $$new_props) $$invalidate(7, iconLeft = $$new_props.iconLeft);
		if ("iconRight" in $$new_props) $$invalidate(8, iconRight = $$new_props.iconRight);
		if ("iconPack" in $$new_props) $$invalidate(9, iconPack = $$new_props.iconPack);
		if ("$$scope" in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		onMount,
		Icon,
		omit,
		tag,
		type,
		size,
		href,
		nativeType,
		loading,
		inverted,
		outlined,
		rounded,
		iconLeft,
		iconRight,
		iconPack,
		iconSize,
		props
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(14, $$props = assign(assign({}, $$props), $$new_props));
		if ("tag" in $$props) $$invalidate(0, tag = $$new_props.tag);
		if ("type" in $$props) $$invalidate(12, type = $$new_props.type);
		if ("size" in $$props) $$invalidate(13, size = $$new_props.size);
		if ("href" in $$props) $$invalidate(1, href = $$new_props.href);
		if ("nativeType" in $$props) $$invalidate(2, nativeType = $$new_props.nativeType);
		if ("loading" in $$props) $$invalidate(3, loading = $$new_props.loading);
		if ("inverted" in $$props) $$invalidate(4, inverted = $$new_props.inverted);
		if ("outlined" in $$props) $$invalidate(5, outlined = $$new_props.outlined);
		if ("rounded" in $$props) $$invalidate(6, rounded = $$new_props.rounded);
		if ("iconLeft" in $$props) $$invalidate(7, iconLeft = $$new_props.iconLeft);
		if ("iconRight" in $$props) $$invalidate(8, iconRight = $$new_props.iconRight);
		if ("iconPack" in $$props) $$invalidate(9, iconPack = $$new_props.iconPack);
		if ("iconSize" in $$props) $$invalidate(10, iconSize = $$new_props.iconSize);
		if ("props" in $$props) $$invalidate(11, props = $$new_props.props);
	};

	let props;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		 $$invalidate(11, props = {
			...omit($$props, "loading", "inverted", "nativeType", "outlined", "rounded", "type"),
			class: `button ${type} ${size} ${$$props.class || ""}`
		});

		if ($$self.$$.dirty & /*size*/ 8192) {
			 {
				if (!size || size === "is-medium") {
					$$invalidate(10, iconSize = "is-small");
				} else if (size === "is-large") {
					$$invalidate(10, iconSize = "is-medium");
				} else {
					$$invalidate(10, iconSize = size);
				}
			}
		}
	};

	$$props = exclude_internal_props($$props);

	return [
		tag,
		href,
		nativeType,
		loading,
		inverted,
		outlined,
		rounded,
		iconLeft,
		iconRight,
		iconPack,
		iconSize,
		props,
		type,
		size,
		$$props,
		$$scope,
		$$slots,
		click_handler,
		click_handler_1
	];
}

class Button extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			tag: 0,
			type: 12,
			size: 13,
			href: 1,
			nativeType: 2,
			loading: 3,
			inverted: 4,
			outlined: 5,
			rounded: 6,
			iconLeft: 7,
			iconRight: 8,
			iconPack: 9
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Button",
			options,
			id: create_fragment$1.name
		});
	}

	get tag() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set tag(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get href() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nativeType() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nativeType(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get loading() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set loading(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inverted() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inverted(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outlined() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outlined(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rounded() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rounded(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconLeft() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconLeft(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconRight() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconRight(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconPack() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconPack(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelma/src/components/Switch.svelte generated by Svelte v3.23.0 */

const file$2 = "node_modules/svelma/src/components/Switch.svelte";

function create_fragment$2(ctx) {
	let label_1;
	let input_1;
	let t0;
	let div;
	let div_class_value;
	let t1;
	let span;
	let label_1_class_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*$$slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

	const block = {
		c: function create() {
			label_1 = element("label");
			input_1 = element("input");
			t0 = space();
			div = element("div");
			t1 = space();
			span = element("span");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			label_1 = claim_element(nodes, "LABEL", { ref: true, class: true });
			var label_1_nodes = children(label_1);
			input_1 = claim_element(label_1_nodes, "INPUT", { type: true, class: true });
			t0 = claim_space(label_1_nodes);
			div = claim_element(label_1_nodes, "DIV", { class: true });
			children(div).forEach(detach_dev);
			t1 = claim_space(label_1_nodes);
			span = claim_element(label_1_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			if (default_slot) default_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			label_1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(input_1, "type", "checkbox");
			attr_dev(input_1, "class", "svelte-ejw4cs");
			add_location(input_1, file$2, 123, 2, 3602);
			attr_dev(div, "class", div_class_value = "check " + /*newBackground*/ ctx[4] + " svelte-ejw4cs");
			add_location(div, file$2, 125, 2, 3680);
			attr_dev(span, "class", "control-label svelte-ejw4cs");
			add_location(span, file$2, 127, 2, 3725);
			attr_dev(label_1, "ref", "label");
			attr_dev(label_1, "class", label_1_class_value = "switch " + /*size*/ ctx[1] + " svelte-ejw4cs");
			add_location(label_1, file$2, 122, 0, 3540);
		},
		m: function mount(target, anchor) {
			insert_dev(target, label_1, anchor);
			append_dev(label_1, input_1);
			input_1.checked = /*checked*/ ctx[0];
			/*input_1_binding*/ ctx[12](input_1);
			append_dev(label_1, t0);
			append_dev(label_1, div);
			append_dev(label_1, t1);
			append_dev(label_1, span);

			if (default_slot) {
				default_slot.m(span, null);
			}

			/*label_1_binding*/ ctx[13](label_1);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input_1, "change", /*input_1_change_handler*/ ctx[11]),
					listen_dev(input_1, "input", /*input_handler*/ ctx[9], false, false, false),
					listen_dev(input_1, "click", /*click_handler*/ ctx[10], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*checked*/ 1) {
				input_1.checked = /*checked*/ ctx[0];
			}

			if (!current || dirty & /*newBackground*/ 16 && div_class_value !== (div_class_value = "check " + /*newBackground*/ ctx[4] + " svelte-ejw4cs")) {
				attr_dev(div, "class", div_class_value);
			}

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 128) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
				}
			}

			if (!current || dirty & /*size*/ 2 && label_1_class_value !== (label_1_class_value = "switch " + /*size*/ ctx[1] + " svelte-ejw4cs")) {
				attr_dev(label_1, "class", label_1_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(label_1);
			/*input_1_binding*/ ctx[12](null);
			if (default_slot) default_slot.d(detaching);
			/*label_1_binding*/ ctx[13](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { checked = false } = $$props;
	let { type = "is-primary" } = $$props;
	let { size = "" } = $$props;
	let { disabled = false } = $$props;
	let label;
	let input;
	const writable_props = ["checked", "type", "size", "disabled"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Switch> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Switch", $$slots, ['default']);

	function input_handler(event) {
		bubble($$self, event);
	}

	function click_handler(event) {
		bubble($$self, event);
	}

	function input_1_change_handler() {
		checked = this.checked;
		$$invalidate(0, checked);
	}

	function input_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			$$invalidate(3, input = $$value);
		});
	}

	function label_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			$$invalidate(2, label = $$value);
		});
	}

	$$self.$set = $$props => {
		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
		if ("type" in $$props) $$invalidate(5, type = $$props.type);
		if ("size" in $$props) $$invalidate(1, size = $$props.size);
		if ("disabled" in $$props) $$invalidate(6, disabled = $$props.disabled);
		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		checked,
		type,
		size,
		disabled,
		label,
		input,
		newBackground
	});

	$$self.$inject_state = $$props => {
		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
		if ("type" in $$props) $$invalidate(5, type = $$props.type);
		if ("size" in $$props) $$invalidate(1, size = $$props.size);
		if ("disabled" in $$props) $$invalidate(6, disabled = $$props.disabled);
		if ("label" in $$props) $$invalidate(2, label = $$props.label);
		if ("input" in $$props) $$invalidate(3, input = $$props.input);
		if ("newBackground" in $$props) $$invalidate(4, newBackground = $$props.newBackground);
	};

	let newBackground;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*type*/ 32) {
			 $$invalidate(4, newBackground = type && type.replace(/^is-(.*)/, "has-background-$1") || "");
		}

		if ($$self.$$.dirty & /*input, disabled, label*/ 76) {
			 {
				if (input) {
					if (disabled) {
						label.setAttribute("disabled", "disabled");
						input.setAttribute("disabled", "disabled");
					} else {
						label.removeAttribute("disabled");
						input.removeAttribute("disabled");
					}
				}
			}
		}
	};

	return [
		checked,
		size,
		label,
		input,
		newBackground,
		type,
		disabled,
		$$scope,
		$$slots,
		input_handler,
		click_handler,
		input_1_change_handler,
		input_1_binding,
		label_1_binding
	];
}

class Switch extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			checked: 0,
			type: 5,
			size: 1,
			disabled: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Switch",
			options,
			id: create_fragment$2.name
		});
	}

	get checked() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set checked(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/Nav.svelte generated by Svelte v3.23.0 */
const file$3 = "src/components/Nav.svelte";

// (49:6) <Button tag="a" href="game">
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Play the Game!");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Play the Game!");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(49:6) <Button tag=\\\"a\\\" href=\\\"game\\\">",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let nav;
	let ul;
	let li0;
	let a0;
	let h1;
	let t0;
	let a0_aria_current_value;
	let t1;
	let li1;
	let t2;
	let li2;
	let a1;
	let t3;
	let a1_aria_current_value;
	let t4;
	let li3;
	let a2;
	let t5;
	let a2_aria_current_value;
	let t6;
	let li4;
	let t7;
	let li5;
	let current;

	const button = new Button({
			props: {
				tag: "a",
				href: "game",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			nav = element("nav");
			ul = element("ul");
			li0 = element("li");
			a0 = element("a");
			h1 = element("h1");
			t0 = text("Cellule Life");
			t1 = space();
			li1 = element("li");
			t2 = space();
			li2 = element("li");
			a1 = element("a");
			t3 = text("How it Works");
			t4 = space();
			li3 = element("li");
			a2 = element("a");
			t5 = text("High Scores");
			t6 = space();
			li4 = element("li");
			t7 = space();
			li5 = element("li");
			create_component(button.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			nav = claim_element(nodes, "NAV", { class: true });
			var nav_nodes = children(nav);
			ul = claim_element(nav_nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			li0 = claim_element(ul_nodes, "LI", { class: true });
			var li0_nodes = children(li0);

			a0 = claim_element(li0_nodes, "A", {
				class: true,
				"aria-current": true,
				href: true
			});

			var a0_nodes = children(a0);
			h1 = claim_element(a0_nodes, "H1", {});
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, "Cellule Life");
			h1_nodes.forEach(detach_dev);
			a0_nodes.forEach(detach_dev);
			li0_nodes.forEach(detach_dev);
			t1 = claim_space(ul_nodes);
			li1 = claim_element(ul_nodes, "LI", { class: true });
			children(li1).forEach(detach_dev);
			t2 = claim_space(ul_nodes);
			li2 = claim_element(ul_nodes, "LI", { class: true });
			var li2_nodes = children(li2);

			a1 = claim_element(li2_nodes, "A", {
				"aria-current": true,
				href: true,
				class: true
			});

			var a1_nodes = children(a1);
			t3 = claim_text(a1_nodes, "How it Works");
			a1_nodes.forEach(detach_dev);
			li2_nodes.forEach(detach_dev);
			t4 = claim_space(ul_nodes);
			li3 = claim_element(ul_nodes, "LI", { class: true });
			var li3_nodes = children(li3);

			a2 = claim_element(li3_nodes, "A", {
				"aria-current": true,
				href: true,
				class: true
			});

			var a2_nodes = children(a2);
			t5 = claim_text(a2_nodes, "High Scores");
			a2_nodes.forEach(detach_dev);
			li3_nodes.forEach(detach_dev);
			t6 = claim_space(ul_nodes);
			li4 = claim_element(ul_nodes, "LI", { class: true });
			children(li4).forEach(detach_dev);
			t7 = claim_space(ul_nodes);
			li5 = claim_element(ul_nodes, "LI", { class: true });
			var li5_nodes = children(li5);
			claim_component(button.$$.fragment, li5_nodes);
			li5_nodes.forEach(detach_dev);
			ul_nodes.forEach(detach_dev);
			nav_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file$3, 37, 3, 683);
			attr_dev(a0, "class", "nav-title-link svelte-qj39fg");
			attr_dev(a0, "aria-current", a0_aria_current_value = isSegmentActive(/*segment*/ ctx[1]));
			attr_dev(a0, "href", ".");
			add_location(a0, file$3, 36, 6, 602);
			attr_dev(li0, "class", "svelte-qj39fg");
			add_location(li0, file$3, 36, 2, 598);
			attr_dev(li1, "class", "spacer svelte-qj39fg");
			add_location(li1, file$3, 40, 2, 720);
			attr_dev(a1, "aria-current", a1_aria_current_value = isSegmentActive(/*segment*/ ctx[1], "how-it-works"));
			attr_dev(a1, "href", "how-it-works");
			attr_dev(a1, "class", "svelte-qj39fg");
			add_location(a1, file$3, 42, 6, 752);
			attr_dev(li2, "class", "svelte-qj39fg");
			add_location(li2, file$3, 42, 2, 748);
			attr_dev(a2, "aria-current", a2_aria_current_value = isSegmentActive(/*segment*/ ctx[1], "scores"));
			attr_dev(a2, "href", "scores");
			attr_dev(a2, "class", "svelte-qj39fg");
			add_location(a2, file$3, 44, 6, 862);
			attr_dev(li3, "class", "svelte-qj39fg");
			add_location(li3, file$3, 44, 2, 858);
			attr_dev(li4, "class", "spacer svelte-qj39fg");
			add_location(li4, file$3, 46, 2, 955);
			attr_dev(li5, "class", "svelte-qj39fg");
			add_location(li5, file$3, 48, 2, 983);
			attr_dev(ul, "class", "svelte-qj39fg");
			add_location(ul, file$3, 35, 1, 591);
			attr_dev(nav, "class", "svelte-qj39fg");
			add_location(nav, file$3, 34, 0, 584);
		},
		m: function mount(target, anchor) {
			insert_dev(target, nav, anchor);
			append_dev(nav, ul);
			append_dev(ul, li0);
			append_dev(li0, a0);
			append_dev(a0, h1);
			append_dev(h1, t0);
			append_dev(ul, t1);
			append_dev(ul, li1);
			append_dev(ul, t2);
			append_dev(ul, li2);
			append_dev(li2, a1);
			append_dev(a1, t3);
			append_dev(ul, t4);
			append_dev(ul, li3);
			append_dev(li3, a2);
			append_dev(a2, t5);
			append_dev(ul, t6);
			append_dev(ul, li4);
			append_dev(ul, t7);
			append_dev(ul, li5);
			mount_component(button, li5, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*segment*/ 2 && a0_aria_current_value !== (a0_aria_current_value = isSegmentActive(/*segment*/ ctx[1]))) {
				attr_dev(a0, "aria-current", a0_aria_current_value);
			}

			if (!current || dirty & /*segment*/ 2 && a1_aria_current_value !== (a1_aria_current_value = isSegmentActive(/*segment*/ ctx[1], "how-it-works"))) {
				attr_dev(a1, "aria-current", a1_aria_current_value);
			}

			if (!current || dirty & /*segment*/ 2 && a2_aria_current_value !== (a2_aria_current_value = isSegmentActive(/*segment*/ ctx[1], "scores"))) {
				attr_dev(a2, "aria-current", a2_aria_current_value);
			}

			const button_changes = {};

			if (dirty & /*$$scope*/ 4) {
				button_changes.$$scope = { dirty, ctx };
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
			if (detaching) detach_dev(nav);
			destroy_component(button);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function isSegmentActive(_segment, thisSegment) {
	if (!_segment && !thisSegment || _segment === thisSegment) {
		return "page";
	}
}

function instance$3($$self, $$props, $$invalidate) {
	let { segment } = $$props;
	const writable_props = ["segment"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Nav> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Nav", $$slots, []);

	$$self.$set = $$props => {
		if ("segment" in $$props) $$invalidate(1, segment = $$props.segment);
	};

	$$self.$capture_state = () => ({ Button, isSegmentActive, segment });

	$$self.$inject_state = $$props => {
		if ("segment" in $$props) $$invalidate(1, segment = $$props.segment);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [isSegmentActive, segment];
}

class Nav extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { isSegmentActive: 0, segment: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Nav",
			options,
			id: create_fragment$3.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[1] === undefined && !("segment" in props)) {
			console.warn("<Nav> was created without expected prop 'segment'");
		}
	}

	get isSegmentActive() {
		return isSegmentActive;
	}

	set isSegmentActive(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segment() {
		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

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

const setShouldShowUsernames = (newValue) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SHOULD_SHOW_USERNAMES_KEY, newValue);
  }
  shouldShowUsernames.set(newValue);
};

/* src/components/ProfanityFilter.svelte generated by Svelte v3.23.0 */
const file$4 = "src/components/ProfanityFilter.svelte";

// (43:4) <Switch       class="switch"       bind:checked={$shouldShowUsernames}       type="is-danger"     >
function create_default_slot_1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Show Usernames");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Show Usernames");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(43:4) <Switch       class=\\\"switch\\\"       bind:checked={$shouldShowUsernames}       type=\\\"is-danger\\\"     >",
		ctx
	});

	return block;
}

// (39:2) <Button     on:click={setShouldShowUsernames(!$shouldShowUsernames)}     size="is-large"   >
function create_default_slot$1(ctx) {
	let updating_checked;
	let current;

	function switch_1_checked_binding(value) {
		/*switch_1_checked_binding*/ ctx[2].call(null, value);
	}

	let switch_1_props = {
		class: "switch",
		type: "is-danger",
		$$slots: { default: [create_default_slot_1] },
		$$scope: { ctx }
	};

	if (/*$shouldShowUsernames*/ ctx[1] !== void 0) {
		switch_1_props.checked = /*$shouldShowUsernames*/ ctx[1];
	}

	const switch_1 = new Switch({ props: switch_1_props, $$inline: true });
	binding_callbacks.push(() => bind(switch_1, "checked", switch_1_checked_binding));

	const block = {
		c: function create() {
			create_component(switch_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(switch_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(switch_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_1_changes = {};

			if (dirty & /*$$scope*/ 16) {
				switch_1_changes.$$scope = { dirty, ctx };
			}

			if (!updating_checked && dirty & /*$shouldShowUsernames*/ 2) {
				updating_checked = true;
				switch_1_changes.checked = /*$shouldShowUsernames*/ ctx[1];
				add_flush_callback(() => updating_checked = false);
			}

			switch_1.$set(switch_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(switch_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(switch_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(switch_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$1.name,
		type: "slot",
		source: "(39:2) <Button     on:click={setShouldShowUsernames(!$shouldShowUsernames)}     size=\\\"is-large\\\"   >",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let div;
	let current;

	const button = new Button({
			props: {
				size: "is-large",
				$$slots: { default: [create_default_slot$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	button.$on("click", function () {
		if (is_function(setShouldShowUsernames(!/*$shouldShowUsernames*/ ctx[1]))) setShouldShowUsernames(!/*$shouldShowUsernames*/ ctx[1]).apply(this, arguments);
	});

	const block = {
		c: function create() {
			div = element("div");
			create_component(button.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, tabindex: true });
			var div_nodes = children(div);
			claim_component(button.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "filter-wrapper svelte-1pt8hu");
			attr_dev(div, "tabindex", "-1");
			add_location(div, file$4, 33, 0, 608);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(button, div, null);
			/*div_binding*/ ctx[3](div);
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			const button_changes = {};

			if (dirty & /*$$scope, $shouldShowUsernames*/ 18) {
				button_changes.$$scope = { dirty, ctx };
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
			if (detaching) detach_dev(div);
			destroy_component(button);
			/*div_binding*/ ctx[3](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let $shouldShowUsernames;
	validate_store(shouldShowUsernames, "shouldShowUsernames");
	component_subscribe($$self, shouldShowUsernames, $$value => $$invalidate(1, $shouldShowUsernames = $$value));
	let { container } = $$props;

	onMount(() => {
		document.body.appendChild(container);
	});

	const writable_props = ["container"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProfanityFilter> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("ProfanityFilter", $$slots, []);

	function switch_1_checked_binding(value) {
		$shouldShowUsernames = value;
		shouldShowUsernames.set($shouldShowUsernames);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			$$invalidate(0, container = $$value);
		});
	}

	$$self.$set = $$props => {
		if ("container" in $$props) $$invalidate(0, container = $$props.container);
	};

	$$self.$capture_state = () => ({
		onMount,
		Button,
		Switch,
		shouldShowUsernames,
		setShouldShowUsernames,
		container,
		$shouldShowUsernames
	});

	$$self.$inject_state = $$props => {
		if ("container" in $$props) $$invalidate(0, container = $$props.container);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [container, $shouldShowUsernames, switch_1_checked_binding, div_binding];
}

class ProfanityFilter extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { container: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ProfanityFilter",
			options,
			id: create_fragment$4.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*container*/ ctx[0] === undefined && !("container" in props)) {
			console.warn("<ProfanityFilter> was created without expected prop 'container'");
		}
	}

	get container() {
		throw new Error("<ProfanityFilter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set container(value) {
		throw new Error("<ProfanityFilter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/_layout.svelte generated by Svelte v3.23.0 */
const file$5 = "src/routes/_layout.svelte";

// (93:4) {:else}
function create_else_block(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text(/*segment*/ ctx[0]);
		},
		l: function claim(nodes) {
			t = claim_text(nodes, /*segment*/ ctx[0]);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*segment*/ 1) set_data_dev(t, /*segment*/ ctx[0]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(93:4) {:else}",
		ctx
	});

	return block;
}

// (91:4) {#if !segment }
function create_if_block_2$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Cellule Life");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "Cellule Life");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(91:4) {#if !segment }",
		ctx
	});

	return block;
}

// (98:4) {#if !segment }
function create_if_block_1$1(ctx) {
	let current;
	const default_slot_template = /*$$slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	const block = {
		c: function create() {
			if (default_slot) default_slot.c();
		},
		l: function claim(nodes) {
			if (default_slot) default_slot.l(nodes);
		},
		m: function mount(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(98:4) {#if !segment }",
		ctx
	});

	return block;
}

// (104:2) {#if segment }
function create_if_block$1(ctx) {
	let main;
	let t;
	let current;
	const default_slot_template = /*$$slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);
	const profanityfilter = new ProfanityFilter({ $$inline: true });

	const block = {
		c: function create() {
			main = element("main");
			if (default_slot) default_slot.c();
			t = space();
			create_component(profanityfilter.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			main = claim_element(nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			if (default_slot) default_slot.l(main_nodes);
			main_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			claim_component(profanityfilter.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			attr_dev(main, "class", "page svelte-1yzl5q2");
			add_location(main, file$5, 104, 3, 2256);
		},
		m: function mount(target, anchor) {
			insert_dev(target, main, anchor);

			if (default_slot) {
				default_slot.m(main, null);
			}

			insert_dev(target, t, anchor);
			mount_component(profanityfilter, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			transition_in(profanityfilter.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			transition_out(profanityfilter.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(main);
			if (default_slot) default_slot.d(detaching);
			if (detaching) detach_dev(t);
			destroy_component(profanityfilter, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(104:2) {#if segment }",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
	let div4;
	let div3;
	let div0;
	let video;
	let video_src_value;
	let t0;
	let t1;
	let div2;
	let h1;
	let t2;
	let div1;
	let t3;
	let div4_class_value;
	let current;

	const nav = new Nav({
			props: {
				class: "main-nav",
				segment: /*segment*/ ctx[0]
			},
			$$inline: true
		});

	function select_block_type(ctx, dirty) {
		if (!/*segment*/ ctx[0]) return create_if_block_2$1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = !/*segment*/ ctx[0] && create_if_block_1$1(ctx);
	let if_block2 = /*segment*/ ctx[0] && create_if_block$1(ctx);

	const block = {
		c: function create() {
			div4 = element("div");
			div3 = element("div");
			div0 = element("div");
			video = element("video");
			t0 = space();
			create_component(nav.$$.fragment);
			t1 = space();
			div2 = element("div");
			h1 = element("h1");
			if_block0.c();
			t2 = space();
			div1 = element("div");
			if (if_block1) if_block1.c();
			t3 = space();
			if (if_block2) if_block2.c();
			this.h();
		},
		l: function claim(nodes) {
			div4 = claim_element(nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div0 = claim_element(div3_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);

			video = claim_element(div0_nodes, "VIDEO", {
				loop: true,
				muted: true,
				autoplay: true,
				class: true,
				src: true
			});

			children(video).forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(div3_nodes);
			claim_component(nav.$$.fragment, div3_nodes);
			t1 = claim_space(div3_nodes);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			h1 = claim_element(div2_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			if_block0.l(h1_nodes);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			if (if_block1) if_block1.l(div1_nodes);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			t3 = claim_space(div3_nodes);
			if (if_block2) if_block2.l(div3_nodes);
			div3_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			video.loop = true;
			video.muted = true;
			video.autoplay = true;
			attr_dev(video, "class", "background svelte-1yzl5q2");
			if (video.src !== (video_src_value = "/cellulelife-2.mp4")) attr_dev(video, "src", video_src_value);
			add_location(video, file$5, 84, 3, 1859);
			attr_dev(div0, "class", "video-background-wrapper svelte-1yzl5q2");
			add_location(div0, file$5, 83, 2, 1817);
			attr_dev(h1, "class", "page-title svelte-1yzl5q2");
			add_location(h1, file$5, 89, 3, 2018);
			attr_dev(div1, "class", "home-page-route-wrapper svelte-1yzl5q2");
			add_location(div1, file$5, 96, 3, 2129);
			attr_dev(div2, "class", "title-wrapper svelte-1yzl5q2");
			add_location(div2, file$5, 88, 2, 1987);
			attr_dev(div3, "class", "hero-inner-wrapper svelte-1yzl5q2");
			add_location(div3, file$5, 82, 1, 1782);
			attr_dev(div4, "class", div4_class_value = "hero-wrapper " + (!/*segment*/ ctx[0] && "home") + " svelte-1yzl5q2");
			add_location(div4, file$5, 81, 0, 1732);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div4, anchor);
			append_dev(div4, div3);
			append_dev(div3, div0);
			append_dev(div0, video);
			append_dev(div3, t0);
			mount_component(nav, div3, null);
			append_dev(div3, t1);
			append_dev(div3, div2);
			append_dev(div2, h1);
			if_block0.m(h1, null);
			append_dev(div2, t2);
			append_dev(div2, div1);
			if (if_block1) if_block1.m(div1, null);
			append_dev(div3, t3);
			if (if_block2) if_block2.m(div3, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const nav_changes = {};
			if (dirty & /*segment*/ 1) nav_changes.segment = /*segment*/ ctx[0];
			nav.$set(nav_changes);

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(h1, null);
				}
			}

			if (!/*segment*/ ctx[0]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*segment*/ 1) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1$1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*segment*/ ctx[0]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*segment*/ 1) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block$1(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div3, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (!current || dirty & /*segment*/ 1 && div4_class_value !== (div4_class_value = "hero-wrapper " + (!/*segment*/ ctx[0] && "home") + " svelte-1yzl5q2")) {
				attr_dev(div4, "class", div4_class_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(nav.$$.fragment, local);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(nav.$$.fragment, local);
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div4);
			destroy_component(nav);
			if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	let { segment } = $$props;
	const writable_props = ["segment"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Layout", $$slots, ['default']);

	$$self.$set = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({ Nav, ProfanityFilter, segment });

	$$self.$inject_state = $$props => {
		if ("segment" in $$props) $$invalidate(0, segment = $$props.segment);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [segment, $$scope, $$slots];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { segment: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment$5.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[0] === undefined && !("segment" in props)) {
			console.warn("<Layout> was created without expected prop 'segment'");
		}
	}

	get segment() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/_error.svelte generated by Svelte v3.23.0 */

const { Error: Error_1$1 } = globals;
const file$6 = "src/routes/_error.svelte";

// (37:0) {#if dev && error.stack}
function create_if_block$2(ctx) {
	let pre;
	let t_value = /*error*/ ctx[1].stack + "";
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = claim_element(nodes, "PRE", {});
			var pre_nodes = children(pre);
			t = claim_text(pre_nodes, t_value);
			pre_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(pre, file$6, 37, 1, 426);
		},
		m: function mount(target, anchor) {
			insert_dev(target, pre, anchor);
			append_dev(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 2 && t_value !== (t_value = /*error*/ ctx[1].stack + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(37:0) {#if dev && error.stack}",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let title_value;
	let t0;
	let h1;
	let t1;
	let t2;
	let p;
	let t3_value = /*error*/ ctx[1].message + "";
	let t3;
	let t4;
	let if_block_anchor;
	document.title = title_value = /*status*/ ctx[0];
	let if_block = /*dev*/ ctx[2] && /*error*/ ctx[1].stack && create_if_block$2(ctx);

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text(/*status*/ ctx[0]);
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, /*status*/ ctx[0]);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t3 = claim_text(p_nodes, t3_value);
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-ibl7am");
			add_location(h1, file$6, 32, 0, 357);
			attr_dev(p, "class", "svelte-ibl7am");
			add_location(p, file$6, 34, 0, 376);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t3);
			insert_dev(target, t4, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*status*/ 1 && title_value !== (title_value = /*status*/ ctx[0])) {
				document.title = title_value;
			}

			if (dirty & /*status*/ 1) set_data_dev(t1, /*status*/ ctx[0]);
			if (dirty & /*error*/ 2 && t3_value !== (t3_value = /*error*/ ctx[1].message + "")) set_data_dev(t3, t3_value);

			if (/*dev*/ ctx[2] && /*error*/ ctx[1].stack) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props, $$invalidate) {
	let { status } = $$props;
	let { error } = $$props;
	const dev = "development" === "development";
	const writable_props = ["status", "error"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Error> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Error", $$slots, []);

	$$self.$set = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	$$self.$capture_state = () => ({ status, error, dev });

	$$self.$inject_state = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [status, error, dev];
}

class Error$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { status: 0, error: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Error",
			options,
			id: create_fragment$6.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*status*/ ctx[0] === undefined && !("status" in props)) {
			console.warn("<Error> was created without expected prop 'status'");
		}

		if (/*error*/ ctx[1] === undefined && !("error" in props)) {
			console.warn("<Error> was created without expected prop 'error'");
		}
	}

	get status() {
		throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1$1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1$1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.23.0 */

const { Error: Error_1$2 } = globals;

// (23:1) {:else}
function create_else_block$1(ctx) {
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*level1*/ ctx[4].props];
	var switch_value = /*level1*/ ctx[4].component;

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		var switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*level1*/ 16)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*level1*/ ctx[4].props)])
			: {};

			if (switch_value !== (switch_value = /*level1*/ ctx[4].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(23:1) {:else}",
		ctx
	});

	return block;
}

// (21:1) {#if error}
function create_if_block$3(ctx) {
	let current;

	const error_1 = new Error$1({
			props: {
				error: /*error*/ ctx[0],
				status: /*status*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(error_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(error_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(error_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const error_1_changes = {};
			if (dirty & /*error*/ 1) error_1_changes.error = /*error*/ ctx[0];
			if (dirty & /*status*/ 2) error_1_changes.status = /*status*/ ctx[1];
			error_1.$set(error_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(error_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(error_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(error_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(21:1) {#if error}",
		ctx
	});

	return block;
}

// (20:0) <Layout segment="{segments[0]}" {...level0.props}>
function create_default_slot$2(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$3, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*error*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$2.name,
		type: "slot",
		source: "(20:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let current;
	const layout_spread_levels = [{ segment: /*segments*/ ctx[2][0] }, /*level0*/ ctx[3].props];

	let layout_props = {
		$$slots: { default: [create_default_slot$2] },
		$$scope: { ctx }
	};

	for (let i = 0; i < layout_spread_levels.length; i += 1) {
		layout_props = assign(layout_props, layout_spread_levels[i]);
	}

	const layout = new Layout({ props: layout_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(layout.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(layout.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(layout, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layout_changes = (dirty & /*segments, level0*/ 12)
			? get_spread_update(layout_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][0] },
					dirty & /*level0*/ 8 && get_spread_object(/*level0*/ ctx[3].props)
				])
			: {};

			if (dirty & /*$$scope, error, status, level1*/ 147) {
				layout_changes.$$scope = { dirty, ctx };
			}

			layout.$set(layout_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(layout.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(layout.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(layout, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	const writable_props = ["stores", "error", "status", "segments", "level0", "level1", "notify"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("App", $$slots, []);

	$$self.$set = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	$$self.$capture_state = () => ({
		setContext,
		afterUpdate,
		CONTEXT_KEY,
		Layout,
		Error: Error$1,
		stores,
		error,
		status,
		segments,
		level0,
		level1,
		notify
	});

	$$self.$inject_state = $$props => {
		if ("stores" in $$props) $$invalidate(5, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("notify" in $$props) $$invalidate(6, notify = $$props.notify);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [error, status, segments, level0, level1, stores, notify];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
			stores: 5,
			error: 0,
			status: 1,
			segments: 2,
			level0: 3,
			level1: 4,
			notify: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment$7.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stores*/ ctx[5] === undefined && !("stores" in props)) {
			console.warn("<App> was created without expected prop 'stores'");
		}

		if (/*error*/ ctx[0] === undefined && !("error" in props)) {
			console.warn("<App> was created without expected prop 'error'");
		}

		if (/*status*/ ctx[1] === undefined && !("status" in props)) {
			console.warn("<App> was created without expected prop 'status'");
		}

		if (/*segments*/ ctx[2] === undefined && !("segments" in props)) {
			console.warn("<App> was created without expected prop 'segments'");
		}

		if (/*level0*/ ctx[3] === undefined && !("level0" in props)) {
			console.warn("<App> was created without expected prop 'level0'");
		}

		if (/*notify*/ ctx[6] === undefined && !("notify" in props)) {
			console.warn("<App> was created without expected prop 'notify'");
		}
	}

	get stores() {
		throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stores(value) {
		throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segments() {
		throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segments(value) {
		throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level0() {
		throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level0(value) {
		throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level1() {
		throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level1(value) {
		throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notify() {
		throw new Error_1$2("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notify(value) {
		throw new Error_1$2("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

// This file is generated by Sapper — do not edit it!

const ignore = [];

const components = [
	{
		js: () => import('./index.c2d9f598.js'),
		css: []
	},
	{
		js: () => import('./how-it-works.1009ac38.js'),
		css: []
	},
	{
		js: () => import('./[editCount].8017d166.js'),
		css: []
	},
	{
		js: () => import('./[slug].cfca7119.js'),
		css: []
	},
	{
		js: () => import('./scores.bb73b914.js'),
		css: []
	}
];

const routes = (d => [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// how-it-works.svelte
		pattern: /^\/how-it-works\/?$/,
		parts: [
			{ i: 1 }
		]
	},

	{
		// scores/[slug]/[editCount].svelte
		pattern: /^\/scores\/([^\/]+?)\/([^\/]+?)\/?$/,
		parts: [
			null,
			null,
			{ i: 2, params: match => ({ slug: d(match[1]), editCount: d(match[2]) }) }
		]
	},

	{
		// scores/[slug].svelte
		pattern: /^\/scores\/([^\/]+?)\/?$/,
		parts: [
			null,
			{ i: 3, params: match => ({ slug: d(match[1]) }) }
		]
	},

	{
		// scores.svelte
		pattern: /^\/scores\/?$/,
		parts: [
			{ i: 4 }
		]
	}
])(decodeURIComponent);

function goto(href, opts = { replaceState: false }) {
	const target = select_target(new URL(href, document.baseURI));

	if (target) {
		_history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
		return navigate(target, null).then(() => {});
	}

	location.href = href;
	return new Promise(f => {}); // never resolves
}

/** Callback to inform of a value updates. */



















function page_store(value) {
	const store = writable(value);
	let ready = true;

	function notify() {
		ready = true;
		store.update(val => val);
	}

	function set(new_value) {
		ready = false;
		store.set(new_value);
	}

	function subscribe(run) {
		let old_value;
		return store.subscribe((value) => {
			if (old_value === undefined || (ready && value !== old_value)) {
				run(old_value = value);
			}
		});
	}

	return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;

let ready = false;
let root_component;
let current_token;
let root_preloaded;
let current_branch = [];
let current_query = '{}';

const stores = {
	page: page_store({}),
	preloading: writable(null),
	session: writable(initial_data && initial_data.session)
};

let $session;
let session_dirty;

stores.session.subscribe(async value => {
	$session = value;

	if (!ready) return;
	session_dirty = true;

	const target = select_target(new URL(location.href));

	const token = current_token = {};
	const { redirect, props, branch } = await hydrate_target(target);
	if (token !== current_token) return; // a secondary navigation happened while we were loading

	await render(redirect, branch, props, target.page);
});

let prefetching


 = null;
function set_prefetching(href, promise) {
	prefetching = { href, promise };
}

let target;
function set_target(element) {
	target = element;
}

let uid = 1;
function set_uid(n) {
	uid = n;
}

let cid;
function set_cid(n) {
	cid = n;
}

const _history = typeof history !== 'undefined' ? history : {
	pushState: (state, title, href) => {},
	replaceState: (state, title, href) => {},
	scrollRestoration: ''
};

const scroll_history = {};

function extract_query(search) {
	const query = Object.create(null);
	if (search.length > 0) {
		search.slice(1).split('&').forEach(searchParam => {
			let [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
			if (typeof query[key] === 'string') query[key] = [query[key]];
			if (typeof query[key] === 'object') (query[key] ).push(value);
			else query[key] = value;
		});
	}
	return query;
}

function select_target(url) {
	if (url.origin !== location.origin) return null;
	if (!url.pathname.startsWith(initial_data.baseUrl)) return null;

	let path = url.pathname.slice(initial_data.baseUrl.length);

	if (path === '') {
		path = '/';
	}

	// avoid accidental clashes between server routes and page routes
	if (ignore.some(pattern => pattern.test(path))) return;

	for (let i = 0; i < routes.length; i += 1) {
		const route = routes[i];

		const match = route.pattern.exec(path);

		if (match) {
			const query = extract_query(url.search);
			const part = route.parts[route.parts.length - 1];
			const params = part.params ? part.params(match) : {};

			const page = { host: location.host, path, query, params };

			return { href: url.href, route, match, page };
		}
	}
}

function handle_error(url) {
	const { host, pathname, search } = location;
	const { session, preloaded, status, error } = initial_data;

	if (!root_preloaded) {
		root_preloaded = preloaded && preloaded[0];
	}

	const props = {
		error,
		status,
		session,
		level0: {
			props: root_preloaded
		},
		level1: {
			props: {
				status,
				error
			},
			component: Error$1
		},
		segments: preloaded

	};
	const query = extract_query(search);
	render(null, [], props, { host, path: pathname, query, params: {} });
}

function scroll_state() {
	return {
		x: pageXOffset,
		y: pageYOffset
	};
}

async function navigate(target, id, noscroll, hash) {
	if (id) {
		// popstate or initial navigation
		cid = id;
	} else {
		const current_scroll = scroll_state();

		// clicked on a link. preserve scroll state
		scroll_history[cid] = current_scroll;

		id = cid = ++uid;
		scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
	}

	cid = id;

	if (root_component) stores.preloading.set(true);

	const loaded = prefetching && prefetching.href === target.href ?
		prefetching.promise :
		hydrate_target(target);

	prefetching = null;

	const token = current_token = {};
	const { redirect, props, branch } = await loaded;
	if (token !== current_token) return; // a secondary navigation happened while we were loading

	await render(redirect, branch, props, target.page);
	if (document.activeElement) document.activeElement.blur();

	if (!noscroll) {
		let scroll = scroll_history[id];

		if (hash) {
			// scroll is an element id (from a hash), we need to compute y.
			const deep_linked = document.getElementById(hash.slice(1));

			if (deep_linked) {
				scroll = {
					x: 0,
					y: deep_linked.getBoundingClientRect().top + scrollY
				};
			}
		}

		scroll_history[cid] = scroll;
		if (scroll) scrollTo(scroll.x, scroll.y);
	}
}

async function render(redirect, branch, props, page) {
	if (redirect) return goto(redirect.location, { replaceState: true });

	stores.page.set(page);
	stores.preloading.set(false);

	if (root_component) {
		root_component.$set(props);
	} else {
		props.stores = {
			page: { subscribe: stores.page.subscribe },
			preloading: { subscribe: stores.preloading.subscribe },
			session: stores.session
		};
		props.level0 = {
			props: await root_preloaded
		};
		props.notify = stores.page.notify;

		// first load — remove SSR'd <head> contents
		const start = document.querySelector('#sapper-head-start');
		const end = document.querySelector('#sapper-head-end');

		if (start && end) {
			while (start.nextSibling !== end) detach$1(start.nextSibling);
			detach$1(start);
			detach$1(end);
		}

		root_component = new App({
			target,
			props,
			hydrate: true
		});
	}

	current_branch = branch;
	current_query = JSON.stringify(page.query);
	ready = true;
	session_dirty = false;
}

function part_changed(i, segment, match, stringified_query) {
	// TODO only check query string changes for preload functions
	// that do in fact depend on it (using static analysis or
	// runtime instrumentation)
	if (stringified_query !== current_query) return true;

	const previous = current_branch[i];

	if (!previous) return false;
	if (segment !== previous.segment) return true;
	if (previous.match) {
		if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
			return true;
		}
	}
}

async function hydrate_target(target)



 {
	const { route, page } = target;
	const segments = page.path.split('/').filter(Boolean);

	let redirect = null;

	const props = { error: null, status: 200, segments: [segments[0]] };

	const preload_context = {
		fetch: (url, opts) => fetch(url, opts),
		redirect: (statusCode, location) => {
			if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
				throw new Error(`Conflicting redirects`);
			}
			redirect = { statusCode, location };
		},
		error: (status, error) => {
			props.error = typeof error === 'string' ? new Error(error) : error;
			props.status = status;
		}
	};

	if (!root_preloaded) {
		root_preloaded = initial_data.preloaded[0] || preload.call(preload_context, {
			host: page.host,
			path: page.path,
			query: page.query,
			params: {}
		}, $session);
	}

	let branch;
	let l = 1;

	try {
		const stringified_query = JSON.stringify(page.query);
		const match = route.pattern.exec(page.path);

		let segment_dirty = false;

		branch = await Promise.all(route.parts.map(async (part, i) => {
			const segment = segments[i];

			if (part_changed(i, segment, match, stringified_query)) segment_dirty = true;

			props.segments[l] = segments[i + 1]; // TODO make this less confusing
			if (!part) return { segment };

			const j = l++;

			if (!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i) {
				return current_branch[i];
			}

			segment_dirty = false;

			const { default: component, preload } = await load_component(components[part.i]);

			let preloaded;
			if (ready || !initial_data.preloaded[i + 1]) {
				preloaded = preload
					? await preload.call(preload_context, {
						host: page.host,
						path: page.path,
						query: page.query,
						params: part.params ? part.params(target.match) : {}
					}, $session)
					: {};
			} else {
				preloaded = initial_data.preloaded[i + 1];
			}

			return (props[`level${j}`] = { component, props: preloaded, segment, match, part: part.i });
		}));
	} catch (error) {
		props.error = error;
		props.status = 500;
		branch = [];
	}

	return { redirect, props, branch };
}

function load_css(chunk) {
	const href = `client/${chunk}`;
	if (document.querySelector(`link[href="${href}"]`)) return;

	return new Promise((fulfil, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = href;

		link.onload = () => fulfil();
		link.onerror = reject;

		document.head.appendChild(link);
	});
}

function load_component(component)


 {
	// TODO this is temporary — once placeholders are
	// always rewritten, scratch the ternary
	const promises = (typeof component.css === 'string' ? [] : component.css.map(load_css));
	promises.unshift(component.js());
	return Promise.all(promises).then(values => values[0]);
}

function detach$1(node) {
	node.parentNode.removeChild(node);
}

function prefetch(href) {
	const target = select_target(new URL(href, document.baseURI));

	if (target) {
		if (!prefetching || href !== prefetching.href) {
			set_prefetching(href, hydrate_target(target));
		}

		return prefetching.promise;
	}
}

function start(opts

) {
	if ('scrollRestoration' in _history) {
		_history.scrollRestoration = 'manual';
	}
	
	// Adopted from Nuxt.js
	// Reset scrollRestoration to auto when leaving page, allowing page reload
	// and back-navigation from other pages to use the browser to restore the
	// scrolling position.
	addEventListener('beforeunload', () => {
		_history.scrollRestoration = 'auto';
	});

	// Setting scrollRestoration to manual again when returning to this page.
	addEventListener('load', () => {
		_history.scrollRestoration = 'manual';
	});

	set_target(opts.target);

	addEventListener('click', handle_click);
	addEventListener('popstate', handle_popstate);

	// prefetch
	addEventListener('touchstart', trigger_prefetch);
	addEventListener('mousemove', handle_mousemove);

	return Promise.resolve().then(() => {
		const { hash, href } = location;

		_history.replaceState({ id: uid }, '', href);

		const url = new URL(location.href);

		if (initial_data.error) return handle_error();

		const target = select_target(url);
		if (target) return navigate(target, uid, true, hash);
	});
}

let mousemove_timeout;

function handle_mousemove(event) {
	clearTimeout(mousemove_timeout);
	mousemove_timeout = setTimeout(() => {
		trigger_prefetch(event);
	}, 20);
}

function trigger_prefetch(event) {
	const a = find_anchor(event.target);
	if (!a || a.rel !== 'prefetch') return;

	prefetch(a.href);
}

function handle_click(event) {
	// Adapted from https://github.com/visionmedia/page.js
	// MIT license https://github.com/visionmedia/page.js#license
	if (which(event) !== 1) return;
	if (event.metaKey || event.ctrlKey || event.shiftKey) return;
	if (event.defaultPrevented) return;

	const a = find_anchor(event.target);
	if (!a) return;

	if (!a.href) return;

	// check if link is inside an svg
	// in this case, both href and target are always inside an object
	const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
	const href = String(svg ? (a).href.baseVal : a.href);

	if (href === location.href) {
		if (!location.hash) event.preventDefault();
		return;
	}

	// Ignore if tag has
	// 1. 'download' attribute
	// 2. rel='external' attribute
	if (a.hasAttribute('download') || a.getAttribute('rel') === 'external') return;

	// Ignore if <a> has a target
	if (svg ? (a).target.baseVal : a.target) return;

	const url = new URL(href);

	// Don't handle hash changes
	if (url.pathname === location.pathname && url.search === location.search) return;

	const target = select_target(url);
	if (target) {
		const noscroll = a.hasAttribute('sapper-noscroll');
		navigate(target, null, noscroll, url.hash);
		event.preventDefault();
		_history.pushState({ id: cid }, '', url.href);
	}
}

function which(event) {
	return event.which === null ? event.button : event.which;
}

function find_anchor(node) {
	while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode; // SVG <a> elements have a lowercase name
	return node;
}

function handle_popstate(event) {
	scroll_history[cid] = scroll_state();

	if (event.state) {
		const url = new URL(location.href);
		const target = select_target(url);
		if (target) {
			navigate(target, event.state.id);
		} else {
			location.href = location.href;
		}
	} else {
		// hashchange
		set_uid(uid + 1);
		set_cid(uid);
		_history.replaceState({ id: cid }, '', location.href);
	}
}

start({
  target: document.querySelector("#sapper"),
});

export { setShouldShowUsernames as $, get_spread_object as A, transition_in as B, transition_out as C, destroy_component as D, globals as E, onMount as F, afterUpdate as G, binding_callbacks as H, validate_each_argument as I, validate_store as J, shouldShowUsernames as K, component_subscribe as L, set_data_dev as M, destroy_each as N, check_outros as O, group_outros as P, create_slot as Q, createEventDispatcher as R, SvelteComponentDev as S, update_slot as T, null_to_empty as U, select_value as V, add_render_callback as W, select_option as X, listen_dev as Y, prop_dev as Z, Button as _, assign as a, svg_element as b, claim_element as c, dispatch_dev as d, exclude_internal_props as e, children as f, detach_dev as g, attr_dev as h, init as i, add_location as j, set_svg_attributes as k, insert_dev as l, append_dev as m, get_spread_update as n, noop as o, space as p, element as q, create_component as r, safe_not_equal as s, text as t, query_selector_all as u, validate_slots as v, claim_space as w, claim_text as x, claim_component as y, mount_component as z };
