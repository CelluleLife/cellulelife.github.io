const ENV = process.env.APP_ENV || "dev";
require("dotenv").config({ path: `./.environment.${ENV}` });

const { API_URL_SUBMIT_RESULT, API_URL_GET_HIGH_SCORES } = process.env;

import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";
import svelteSVG from "rollup-plugin-svelte-svg";

import sveltePreprocess from "svelte-preprocess";
const preprocess = sveltePreprocess({
  scss: {
    includePaths: ["src"],
  },
  postcss: {
    plugins: [require("autoprefixer")],
  },
});

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      json(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
        "process.env.APP_ENV": JSON.stringify(ENV),
        "process.env.API_URL_SUBMIT_RESULT": JSON.stringify(
          API_URL_SUBMIT_RESULT
        ),
        "process.env.API_URL_GET_HIGH_SCORES": JSON.stringify(
          API_URL_GET_HIGH_SCORES
        ),
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess,
      }),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          babelHelpers: "runtime",
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),

      svelteSVG({ dev }),
    ],
    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      json(),
      replace({
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(mode),
        "process.env.APP_ENV": JSON.stringify(ENV),
        "process.env.API_URL_SUBMIT_RESULT": JSON.stringify(
          API_URL_SUBMIT_RESULT
        ),
        "process.env.API_URL_GET_HIGH_SCORES": JSON.stringify(
          API_URL_GET_HIGH_SCORES
        ),
      }),
      svelte({
        generate: "ssr",
        dev,
        preprocess,
      }),
      postcss(),
      resolve({
        dedupe: ["svelte"],
      }),
      commonjs(),
      svelteSVG({ generate: "ssr", dev }),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),

    preserveEntrySignatures: "strict",
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
        "process.env.APP_ENV": JSON.stringify(ENV),
        "process.env.API_URL_SUBMIT_RESULT": JSON.stringify(
          API_URL_SUBMIT_RESULT
        ),
        "process.env.API_URL_GET_HIGH_SCORES": JSON.stringify(
          API_URL_GET_HIGH_SCORES
        ),
      }),
      commonjs(),
      !dev && terser(),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },
};
