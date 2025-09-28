// js/app.js
// Single global namespace. Never redeclare with let/const elsewhere.
window.DevCircleApp = window.DevCircleApp || {
  state: {
    posts: [],
    tags: []
  },
  events: {
    // simple event bus
    emit(name, detail) { document.dispatchEvent(new CustomEvent(name, { detail })); },
    on(name, handler) { document.addEventListener(name, handler); }
  }
};
