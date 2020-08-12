import { writable } from "svelte/store";

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

export const shouldShowUsernames = writable(_shouldShowUsernames);

export const setShouldShowUsernames = (newValue) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SHOULD_SHOW_USERNAMES_KEY, newValue);
  }
  shouldShowUsernames.set(newValue);
};
