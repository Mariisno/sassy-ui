// Sassy 0.11.0. Compiled from the component sources, which are not in this package; do not edit.
// Classic script: needs window.React and window.ReactDOM first, then exposes window.SassyDesignSystem_a2c9b8.
var SassyDesignSystem_a2c9b8 = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // react.cjs
  var require_react = __commonJS({
    "react.cjs"(exports, module) {
      module.exports = window.React;
    }
  });

  // react-dom.cjs
  var require_react_dom = __commonJS({
    "react-dom.cjs"(exports, module) {
      module.exports = window.ReactDOM;
    }
  });

  // components/index.js
  var index_exports = {};
  __export(index_exports, {
    Alert: () => Alert,
    AppShell: () => AppShell,
    BackLink: () => BackLink,
    Badge: () => Badge,
    Button: () => Button,
    Card: () => Card,
    Checkbox: () => Checkbox,
    Dialog: () => Dialog,
    Disclosure: () => Disclosure,
    EmptyState: () => EmptyState,
    ErrorSummary: () => ErrorSummary,
    Field: () => Field,
    Fieldset: () => Fieldset,
    FileButton: () => FileButton,
    Heading: () => Heading,
    Icon: () => Icon,
    IconButton: () => IconButton,
    Input: () => Input,
    Link: () => Link,
    ListItem: () => ListItem,
    Menu: () => Menu,
    NyVersjon: () => NyVersjon,
    Popover: () => Popover,
    Progress: () => Progress,
    Radio: () => Radio,
    ScrollRow: () => ScrollRow,
    SegmentedControl: () => SegmentedControl,
    Select: () => Select,
    Skeleton: () => Skeleton,
    Spinner: () => Spinner,
    Stack: () => Stack,
    Sussi: () => Sussi,
    Swatch: () => Swatch,
    Switch: () => Switch,
    TabPanel: () => TabPanel,
    Tabs: () => Tabs,
    Tag: () => Tag,
    Text: () => Text,
    Textarea: () => Textarea,
    Toast: () => Toast,
    ToastStack: () => ToastStack,
    Tooltip: () => Tooltip,
    VisuallyHidden: () => VisuallyHidden,
    erOpptatt: () => erOpptatt,
    erSammeDag: () => erSammeDag,
    formatDato: () => formatDato,
    formatDatoTid: () => formatDatoTid,
    formatRelativ: () => formatRelativ,
    formatTid: () => formatTid,
    formatTidsrom: () => formatTidsrom,
    kunngjor: () => kunngjor,
    oppdater: () => oppdater,
    placePopover: () => placePopover,
    scrollEdges: () => scrollEdges,
    startOppdatering: () => startOppdatering,
    sussiPoseNames: () => sussiPoseNames,
    sussiPoses: () => sussiPoses,
    tilDato: () => tilDato,
    tilIsoDato: () => tilIsoDato,
    vedNyVersjon: () => vedNyVersjon
  });

  // components/buttons/Button.jsx
  var import_react2 = __toESM(require_react(), 1);

  // components/icon/Icon.jsx
  var import_react = __toESM(require_react(), 1);

  // components/icon/iconData.js
  var iconData = {
    "house": '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/> <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    "layout-grid": '<rect width="7" height="7" x="3" y="3" rx="1"/> <rect width="7" height="7" x="14" y="3" rx="1"/> <rect width="7" height="7" x="14" y="14" rx="1"/> <rect width="7" height="7" x="3" y="14" rx="1"/>',
    "layout-dashboard": '<rect width="7" height="9" x="3" y="3" rx="1"/> <rect width="7" height="5" x="14" y="3" rx="1"/> <rect width="7" height="9" x="14" y="12" rx="1"/> <rect width="7" height="5" x="3" y="16" rx="1"/>',
    "folder": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    "folder-open": '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
    "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/> <path d="M14 2v4a2 2 0 0 0 2 2h4"/> <path d="M10 9H8"/> <path d="M16 13H8"/> <path d="M16 17H8"/>',
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "x": '<path d="M18 6 6 18"/> <path d="m6 6 12 12"/>',
    "plus": '<path d="M5 12h14"/> <path d="M12 5v14"/>',
    "minus": '<path d="M5 12h14"/>',
    "search": '<circle cx="11" cy="11" r="8"/> <path d="m21 21-4.3-4.3"/>',
    "settings": '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/> <circle cx="12" cy="12" r="3"/>',
    "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/> <circle cx="12" cy="7" r="4"/>',
    "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/> <circle cx="9" cy="7" r="4"/> <path d="M22 21v-2a4 4 0 0 0-3-3.87"/> <path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    "bell": '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/> <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    "calendar": '<path d="M8 2v4"/> <path d="M16 2v4"/> <rect width="18" height="18" x="3" y="4" rx="2"/> <path d="M3 10h18"/>',
    "clock": '<circle cx="12" cy="12" r="10"/> <polyline points="12 6 12 12 16 14"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-up": '<path d="m18 15-6-6-6 6"/>',
    "arrow-right": '<path d="M5 12h14"/> <path d="m12 5 7 7-7 7"/>',
    "arrow-left": '<path d="m12 19-7-7 7-7"/> <path d="M19 12H5"/>',
    "arrow-up-right": '<path d="M7 7h10v10"/> <path d="M7 17 17 7"/>',
    "external-link": '<path d="M15 3h6v6"/> <path d="M10 14 21 3"/> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    "ellipsis": '<circle cx="12" cy="12" r="1"/> <circle cx="19" cy="12" r="1"/> <circle cx="5" cy="12" r="1"/>',
    "menu": '<line x1="4" x2="20" y1="12" y2="12"/> <line x1="4" x2="20" y1="6" y2="6"/> <line x1="4" x2="20" y1="18" y2="18"/>',
    "sun": '<circle cx="12" cy="12" r="4"/> <path d="M12 2v2"/> <path d="M12 20v2"/> <path d="m4.93 4.93 1.41 1.41"/> <path d="m17.66 17.66 1.41 1.41"/> <path d="M2 12h2"/> <path d="M20 12h2"/> <path d="m6.34 17.66-1.41 1.41"/> <path d="m19.07 4.93-1.41 1.41"/>',
    "moon": '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    "info": '<circle cx="12" cy="12" r="10"/> <path d="M12 16v-4"/> <path d="M12 8h.01"/>',
    "circle-alert": '<circle cx="12" cy="12" r="10"/> <line x1="12" x2="12" y1="8" y2="12"/> <line x1="12" x2="12.01" y1="16" y2="16"/>',
    "triangle-alert": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/> <path d="M12 9v4"/> <path d="M12 17h.01"/>',
    "circle-check": '<circle cx="12" cy="12" r="10"/> <path d="m9 12 2 2 4-4"/>',
    "circle-x": '<circle cx="12" cy="12" r="10"/> <path d="m15 9-6 6"/> <path d="m9 9 6 6"/>',
    "circle": '<circle cx="12" cy="12" r="10"/>',
    "trash-2": '<path d="M3 6h18"/> <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/> <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/> <line x1="10" x2="10" y1="11" y2="17"/> <line x1="14" x2="14" y1="11" y2="17"/>',
    "pencil": '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/> <path d="m15 5 4 4"/>',
    "copy": '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/> <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    "link": '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/> <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    "github": '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/> <path d="M9 18c-4.51 2-5-2-7-2"/>',
    "mail": '<rect width="20" height="16" x="2" y="4" rx="2"/> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "filter": '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    "list-todo": '<rect x="3" y="5" width="6" height="6" rx="1"/> <path d="m3 17 2 2 4-4"/> <path d="M13 6h8"/> <path d="M13 12h8"/> <path d="M13 18h8"/>',
    "star": '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    "bookmark": '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
    "tag": '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/> <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
    "hash": '<line x1="4" x2="20" y1="9" y2="9"/> <line x1="4" x2="20" y1="15" y2="15"/> <line x1="10" x2="8" y1="3" y2="21"/> <line x1="16" x2="14" y1="3" y2="21"/>',
    "code": '<polyline points="16 18 22 12 16 6"/> <polyline points="8 6 2 12 8 18"/>',
    "terminal": '<polyline points="4 17 10 11 4 5"/> <line x1="12" x2="20" y1="19" y2="19"/>',
    "git-branch": '<line x1="6" x2="6" y1="3" y2="15"/> <circle cx="18" cy="6" r="3"/> <circle cx="6" cy="18" r="3"/> <path d="M18 9a9 9 0 0 1-9 9"/>',
    "hard-hat": '<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/> <path d="M14 6a6 6 0 0 1 6 6v3"/> <path d="M4 15v-3a6 6 0 0 1 6-6"/> <rect x="2" y="15" width="20" height="4" rx="1"/>',
    "ruler": '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/> <path d="m14.5 12.5 2-2"/> <path d="m11.5 9.5 2-2"/> <path d="m8.5 6.5 2-2"/> <path d="m17.5 15.5 2-2"/>',
    "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/> <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    "sprout": '<path d="M7 20h10"/> <path d="M10 20c5.5-2.5.8-6.4 3-10"/> <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/> <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    "inbox": '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/> <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/> <polyline points="16 17 21 12 16 7"/> <line x1="21" x2="9" y1="12" y2="12"/>',
    "eye": '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/> <circle cx="12" cy="12" r="3"/>',
    "eye-off": '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/> <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/> <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/> <path d="m2 2 20 20"/>',
    "lock": '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/> <path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    "upload": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/> <polyline points="17 8 12 3 7 8"/> <line x1="12" x2="12" y1="3" y2="15"/>',
    "download": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/> <polyline points="7 10 12 15 17 10"/> <line x1="12" x2="12" y1="15" y2="3"/>',
    "sliders-horizontal": '<line x1="21" x2="14" y1="4" y2="4"/> <line x1="10" x2="3" y1="4" y2="4"/> <line x1="21" x2="12" y1="12" y2="12"/> <line x1="8" x2="3" y1="12" y2="12"/> <line x1="21" x2="16" y1="20" y2="20"/> <line x1="12" x2="3" y1="20" y2="20"/> <line x1="14" x2="14" y1="2" y2="6"/> <line x1="8" x2="8" y1="10" y2="14"/> <line x1="16" x2="16" y1="18" y2="22"/>',
    "panel-left": '<rect width="18" height="18" x="3" y="3" rx="2"/> <path d="M9 3v18"/>',
    "command": '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>',
    "brain": '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/> <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/> <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/> <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/> <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/> <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/> <path d="M19.938 10.5a4 4 0 0 1 .585.396"/> <path d="M6 18a4 4 0 0 1-1.967-.516"/> <path d="M19.967 17.484A4 4 0 0 1 18 18"/>',
    "notebook-pen": '<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/> <path d="M2 6h4"/> <path d="M2 10h4"/> <path d="M2 14h4"/> <path d="M2 18h4"/> <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>',
    "linkedin": '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/> <rect width="4" height="12" x="2" y="9"/> <circle cx="4" cy="4" r="2"/>',
    "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/> <circle cx="12" cy="10" r="3"/>',
    "sparkle": '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    "play": '<polygon points="6 3 20 12 6 21 6 3"/>',
    "pause": '<rect x="14" y="4" width="4" height="16" rx="1"/> <rect x="6" y="4" width="4" height="16" rx="1"/>',
    "skip-back": '<polygon points="19 20 9 12 19 4 19 20"/> <line x1="5" x2="5" y1="19" y2="5"/>',
    "skip-forward": '<polygon points="5 4 15 12 5 20 5 4"/> <line x1="19" x2="19" y1="5" y2="19"/>',
    "flame": '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    "timer": '<line x1="10" x2="14" y1="2" y2="2"/> <line x1="12" x2="15" y1="14" y2="11"/> <circle cx="12" cy="14" r="8"/>',
    "volume-2": '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/> <path d="M16 9a5 5 0 0 1 0 6"/> <path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>',
    "volume-x": '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/> <line x1="22" x2="16" y1="9" y2="15"/> <line x1="16" x2="22" y1="9" y2="15"/>',
    "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/> <path d="M3 3v5h5"/>',
    "book-open": '<path d="M12 7v14"/> <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    "heart": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    "list": '<path d="M3 12h.01"/> <path d="M3 18h.01"/> <path d="M3 6h.01"/> <path d="M8 12h13"/> <path d="M8 18h13"/> <path d="M8 6h13"/>',
    "maximize": '<path d="M8 3H5a2 2 0 0 0-2 2v3"/> <path d="M21 8V5a2 2 0 0 0-2-2h-3"/> <path d="M3 16v3a2 2 0 0 0 2 2h3"/> <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
    "archive": '<rect width="20" height="5" x="2" y="3" rx="1"/> <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/> <path d="M10 12h4"/>',
    "undo-2": '<path d="M9 14 4 9l5-5"/> <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
    "share-2": '<circle cx="18" cy="5" r="3"/> <circle cx="6" cy="12" r="3"/> <circle cx="18" cy="19" r="3"/> <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/> <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    "circle-user-round": '<path d="M18 20a6 6 0 0 0-12 0"/> <circle cx="12" cy="10" r="4"/> <circle cx="12" cy="12" r="10"/>',
    "image": '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/> <circle cx="9" cy="9" r="2"/> <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    "mic": '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/> <path d="M19 10v2a7 7 0 0 1-14 0v-2"/> <line x1="12" x2="12" y1="19" y2="22"/>',
    "sparkles": '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/> <path d="M20 3v4"/> <path d="M22 5h-4"/> <path d="M4 17v2"/> <path d="M5 18H3"/>',
    "scale": '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/> <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/> <path d="M7 21h10"/> <path d="M12 3v18"/> <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
    "mountain": '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    "activity": '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>',
    "cloud-sun": '<path d="M12 2v2"/> <path d="m4.93 4.93 1.41 1.41"/> <path d="M20 12h2"/> <path d="m19.07 4.93-1.41 1.41"/> <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/> <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
    "snowflake": '<line x1="2" x2="22" y1="12" y2="12"/> <line x1="12" x2="12" y1="2" y2="22"/> <path d="m20 16-4-4 4-4"/> <path d="m4 8 4 4-4 4"/> <path d="m16 4-4 4-4-4"/> <path d="m8 20 4-4 4 4"/>',
    "cloud-rain": '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/> <path d="M16 14v6"/> <path d="M8 14v6"/> <path d="M12 16v6"/>',
    "dumbbell": '<path d="M14.4 14.4 9.6 9.6"/> <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/> <path d="m21.5 21.5-1.4-1.4"/> <path d="M3.9 3.9 2.5 2.5"/> <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/>',
    "bike": '<circle cx="18.5" cy="17.5" r="3.5"/> <circle cx="5.5" cy="17.5" r="3.5"/> <circle cx="15" cy="5" r="1"/> <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
    "waves": '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/> <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/> <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
    "music": '<path d="M9 18V5l12-2v13"/> <circle cx="6" cy="18" r="3"/> <circle cx="18" cy="16" r="3"/>',
    "mountain-snow": '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/> <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/>',
    "person-standing": '<circle cx="12" cy="5" r="1"/> <path d="m9 20 3-6 3 6"/> <path d="m6 8 6 2 6-2"/> <path d="M12 10v4"/>',
    "yarn": '<circle cx="12" cy="12" r="9"/> <path d="M4.2 9.3c4.5.4 9.5 3 15.6 1.4"/> <path d="M3.6 14.4c4-1 8.6 1.4 12.6 6"/> <path d="M8.4 3.9c1 5 4 9.4 10 12.5"/>'
  };
  var iconNames = Object.keys(iconData);

  // components/icon/Icon.jsx
  var esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  function Icon({ name, size = 18, strokeWidth = 1.75, className, style, title, ...rest }) {
    const inner = iconData[name];
    if (!inner) return null;
    return /* @__PURE__ */ import_react.default.createElement("svg", { className: ["s-icon", className].filter(Boolean).join(" "), width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": title ? void 0 : true, role: title ? "img" : void 0, style, ...rest, dangerouslySetInnerHTML: { __html: (title ? "<title>" + esc(title) + "</title>" : "") + inner } });
  }

  // components/buttons/Button.jsx
  var cx = (...a) => a.filter(Boolean).join(" ");
  var Button = import_react2.default.forwardRef(function Button2({ variant = "primary", size = "md", iconLeft, iconRight, loading = false, fullWidth = false, as = "button", className, children, disabled, onClick, "aria-disabled": ariaDisabled, ...rest }, ref) {
    const Tag2 = as;
    const iconSize = size === "lg" ? 18 : 16;
    const off = loading || ariaDisabled === true || ariaDisabled === "true";
    const click = (e) => {
      if (off) {
        e.preventDefault();
        return;
      }
      if (onClick) onClick(e);
    };
    return /* @__PURE__ */ import_react2.default.createElement(Tag2, { ref, className: cx("s-btn", "s-btn--" + variant, size !== "md" && "s-btn--" + size, fullWidth && "s-btn--full", className), disabled: Tag2 === "button" ? disabled : void 0, "aria-disabled": off ? "true" : void 0, "aria-busy": loading || void 0, onClick: click, ...Tag2 === "button" && !rest.type ? { type: "button" } : {}, ...rest }, loading ? /* @__PURE__ */ import_react2.default.createElement("span", { className: "s-btn__spin" }) : iconLeft ? /* @__PURE__ */ import_react2.default.createElement(Icon, { name: iconLeft, size: iconSize }) : null, children, iconRight && !loading ? /* @__PURE__ */ import_react2.default.createElement(Icon, { name: iconRight, size: iconSize }) : null);
  });

  // components/buttons/IconButton.jsx
  var import_react3 = __toESM(require_react(), 1);
  var cx2 = (...a) => a.filter(Boolean).join(" ");
  var IconButton = import_react3.default.forwardRef(function IconButton2({ icon: icon2, label, variant = "ghost", size = "md", round = false, className, ...rest }, ref) {
    const s = size === "sm" ? 16 : size === "lg" ? 20 : 18;
    return /* @__PURE__ */ import_react3.default.createElement("button", { ref, type: "button", "aria-label": label, title: label, className: cx2("s-iconbtn", variant !== "ghost" && "s-iconbtn--" + variant, size !== "md" && "s-iconbtn--" + size, round && "s-iconbtn--round", className), ...rest }, /* @__PURE__ */ import_react3.default.createElement(Icon, { name: icon2, size: s }));
  });

  // components/buttons/FileButton.jsx
  var import_react4 = __toESM(require_react(), 1);
  var cx3 = (...a) => a.filter(Boolean).join(" ");
  var FileButton = import_react4.default.forwardRef(function FileButton2({ variant = "primary", size = "md", iconLeft, iconRight, fullWidth = false, accept, capture, multiple = false, disabled = false, onFiles, onChange, className, style, children, ...rest }, ref) {
    const iconSize = size === "lg" ? 18 : 16;
    const change = (e) => {
      const files = Array.from(e.target.files || []);
      onChange?.(e);
      if (files.length) onFiles?.(files);
      e.target.value = "";
    };
    return /* @__PURE__ */ import_react4.default.createElement("label", { className: cx3("s-btn", "s-btn--" + variant, size !== "md" && "s-btn--" + size, fullWidth && "s-btn--full", "s-filebtn", disabled && "s-filebtn--disabled", className), style }, /* @__PURE__ */ import_react4.default.createElement("input", { ref, type: "file", className: "s-filebtn__input", accept, capture, multiple, disabled, onChange: change, ...rest }), iconLeft ? /* @__PURE__ */ import_react4.default.createElement(Icon, { name: iconLeft, size: iconSize }) : null, children, iconRight ? /* @__PURE__ */ import_react4.default.createElement(Icon, { name: iconRight, size: iconSize }) : null);
  });

  // components/controls/Checkbox.jsx
  var import_react5 = __toESM(require_react(), 1);
  var cx4 = (...a) => a.filter(Boolean).join(" ");
  var Checkbox = import_react5.default.forwardRef(function Checkbox2({ label, description, indeterminate = false, disabled, className, style, ...rest }, ref) {
    const own = import_react5.default.useRef(null);
    import_react5.default.useEffect(() => {
      if (own.current) own.current.indeterminate = indeterminate;
    }, [indeterminate]);
    const setRefs = (el) => {
      own.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };
    return /* @__PURE__ */ import_react5.default.createElement("label", { className: cx4("s-check", disabled && "s-check--disabled", className), style }, /* @__PURE__ */ import_react5.default.createElement("input", { ref: setRefs, type: "checkbox", className: "s-check__input", disabled, ...rest }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "s-check__box" }, /* @__PURE__ */ import_react5.default.createElement(Icon, { name: indeterminate ? "minus" : "check", size: 13, strokeWidth: 2.75 })), label || description ? /* @__PURE__ */ import_react5.default.createElement("span", { className: "s-check__text" }, label, description ? /* @__PURE__ */ import_react5.default.createElement("span", { className: "s-check__desc" }, description) : null) : null);
  });

  // components/controls/Radio.jsx
  var import_react6 = __toESM(require_react(), 1);
  var cx5 = (...a) => a.filter(Boolean).join(" ");
  var Radio = import_react6.default.forwardRef(function Radio2({ label, description, disabled, className, style, ...rest }, ref) {
    return /* @__PURE__ */ import_react6.default.createElement("label", { className: cx5("s-check", "s-check--radio", disabled && "s-check--disabled", className), style }, /* @__PURE__ */ import_react6.default.createElement("input", { ref, type: "radio", className: "s-check__input", disabled, ...rest }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "s-check__box" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "s-check__dot" })), label || description ? /* @__PURE__ */ import_react6.default.createElement("span", { className: "s-check__text" }, label, description ? /* @__PURE__ */ import_react6.default.createElement("span", { className: "s-check__desc" }, description) : null) : null);
  });

  // components/controls/Switch.jsx
  var import_react7 = __toESM(require_react(), 1);
  var cx6 = (...a) => a.filter(Boolean).join(" ");
  var Switch = import_react7.default.forwardRef(function Switch2({ label, description, disabled, className, style, ...rest }, ref) {
    return /* @__PURE__ */ import_react7.default.createElement("label", { className: cx6("s-check", disabled && "s-check--disabled", className), style }, /* @__PURE__ */ import_react7.default.createElement("input", { ref, type: "checkbox", role: "switch", className: "s-check__input", disabled, ...rest }), /* @__PURE__ */ import_react7.default.createElement("span", { className: "s-switch__track" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "s-switch__thumb" })), label || description ? /* @__PURE__ */ import_react7.default.createElement("span", { className: "s-check__text" }, label, description ? /* @__PURE__ */ import_react7.default.createElement("span", { className: "s-check__desc" }, description) : null) : null);
  });

  // components/display/Badge.jsx
  var import_react8 = __toESM(require_react(), 1);
  var cx7 = (...a) => a.filter(Boolean).join(" ");
  function Badge({ tone = "neutral", dot = false, outline = false, mono = false, className, children, ...rest }) {
    return /* @__PURE__ */ import_react8.default.createElement("span", { className: cx7("s-badge", tone !== "neutral" && "s-badge--" + tone, outline && "s-badge--outline", mono && "s-badge--mono", className), ...rest }, dot ? /* @__PURE__ */ import_react8.default.createElement("span", { className: "s-badge__dot" }) : null, children);
  }

  // components/display/Card.jsx
  var import_react9 = __toESM(require_react(), 1);
  var cx8 = (...a) => a.filter(Boolean).join(" ");
  function Card({ variant = "outlined", padding = "md", interactive = false, as = "div", className, children, ...rest }) {
    const Tag2 = as;
    return /* @__PURE__ */ import_react9.default.createElement(Tag2, { className: cx8("s-card", "s-card--pad-" + padding, variant !== "outlined" && "s-card--" + variant, interactive && "s-card--interactive", className), ...rest }, children);
  }

  // components/display/ListItem.jsx
  var import_react10 = __toESM(require_react(), 1);
  var cx9 = (...a) => a.filter(Boolean).join(" ");
  function ListItem({ title, meta, icon: icon2, image, imageAlt = "", leading, trailing, href, onClick, disabled, className, children, ...rest }) {
    const El = href ? "a" : onClick ? "button" : "div";
    const opens = El !== "div";
    const lead = leading !== void 0 ? leading : image ? /* @__PURE__ */ import_react10.default.createElement("img", { className: "s-listitem__img", src: image, alt: imageAlt }) : icon2 ? /* @__PURE__ */ import_react10.default.createElement("span", { className: "s-listitem__icon" }, /* @__PURE__ */ import_react10.default.createElement(Icon, { name: icon2, size: 20 })) : null;
    const trail = trailing !== void 0 ? trailing : opens ? /* @__PURE__ */ import_react10.default.createElement(Icon, { name: "chevron-right", size: 18 }) : null;
    const props = El === "a" ? disabled ? { "aria-disabled": "true" } : { href, onClick } : El === "button" ? { type: "button", onClick, disabled } : {};
    return /* @__PURE__ */ import_react10.default.createElement(El, { className: cx9("s-listitem", opens && "s-listitem--opens", className), ...props, ...rest }, lead ? /* @__PURE__ */ import_react10.default.createElement("span", { className: "s-listitem__lead" }, lead) : null, /* @__PURE__ */ import_react10.default.createElement("span", { className: "s-listitem__body" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "s-listitem__title" }, title), meta ? /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, " ", /* @__PURE__ */ import_react10.default.createElement("span", { className: "s-listitem__meta" }, meta)) : null, children), trail ? /* @__PURE__ */ import_react10.default.createElement("span", { className: "s-listitem__trail" }, trail) : null);
  }

  // components/display/ScrollRow.jsx
  var import_react11 = __toESM(require_react(), 1);
  var cx10 = (...a) => a.filter(Boolean).join(" ");
  function scrollEdges({ scrollLeft, clientWidth, scrollWidth, overflowX = "auto" }) {
    if (overflowX !== "auto" && overflowX !== "scroll") return { start: false, end: false };
    return { start: scrollLeft > 1, end: scrollLeft + clientWidth < scrollWidth - 1 };
  }
  function ScrollRow({ label, className, children, ...rest }) {
    const ref = import_react11.default.useRef(null);
    const [edge, setEdge] = import_react11.default.useState({ start: false, end: false });
    import_react11.default.useEffect(() => {
      const el = ref.current;
      if (!el) return void 0;
      const measure = () => setEdge((was) => {
        const now = scrollEdges({ scrollLeft: Math.abs(el.scrollLeft), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, overflowX: getComputedStyle(el).overflowX });
        return now.start === was.start && now.end === was.end ? was : now;
      });
      measure();
      el.addEventListener("scroll", measure, { passive: true });
      const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
      if (ro) {
        ro.observe(el);
        if (el.firstElementChild) ro.observe(el.firstElementChild);
      }
      return () => {
        el.removeEventListener("scroll", measure);
        if (ro) ro.disconnect();
      };
    }, []);
    const region = label ? { role: "region", "aria-label": label, tabIndex: 0 } : {};
    return /* @__PURE__ */ import_react11.default.createElement("div", { ref, className: cx10("s-scrollrow", className), "data-fade-start": edge.start || void 0, "data-fade-end": edge.end || void 0, ...region, ...rest }, children);
  }

  // components/display/Swatch.jsx
  var import_react12 = __toESM(require_react(), 1);
  var cx11 = (...a) => a.filter(Boolean).join(" ");
  var LIGHT = ["#FAF8F4", "#FFFFFF"];
  var DARK = ["#161613", "#1E1E1A"];
  var lum = (hex) => [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4).reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
  var ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };
  function edges(color) {
    const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color || "");
    if (!m) return {};
    const hex = m[1].length === 3 ? m[1].replace(/./g, "$&$&") : m[1];
    const low = (bgs) => bgs.some((b) => ratio(hex, b.slice(1)) < 3);
    return { "data-edge-light": low(LIGHT) || void 0, "data-edge-dark": low(DARK) || void 0 };
  }
  function Swatch({ color, label, pressed, onClick, size = "md", disabled, className, style, ...rest }) {
    const dot = /* @__PURE__ */ import_react12.default.createElement("span", { className: "s-swatch__dot", style: { "--swatch": color } });
    const cls = cx11("s-swatch", "s-swatch--" + size, className);
    if (onClick) {
      return /* @__PURE__ */ import_react12.default.createElement(
        "button",
        {
          type: "button",
          className: cx11(cls, "s-swatch--button"),
          "aria-label": label,
          "aria-pressed": pressed === void 0 ? void 0 : !!pressed,
          title: label,
          disabled,
          onClick,
          style,
          ...edges(color),
          ...rest
        },
        dot
      );
    }
    return /* @__PURE__ */ import_react12.default.createElement("span", { className: cls, role: label ? "img" : void 0, "aria-label": label, "aria-hidden": label ? void 0 : "true", style, ...edges(color), ...rest }, dot);
  }

  // components/display/Tag.jsx
  var import_react13 = __toESM(require_react(), 1);
  var cx12 = (...a) => a.filter(Boolean).join(" ");
  function Tag({ icon: icon2, selected, onClick, onRemove, removeLabel, className, children, ...rest }) {
    const interactive = !!onClick || selected !== void 0;
    const toggle = interactive ? { type: "button", "aria-pressed": !!selected, onClick } : {};
    const content = /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, icon2 ? /* @__PURE__ */ import_react13.default.createElement(Icon, { name: icon2, size: 14 }) : null, children);
    if (!onRemove) {
      const El = interactive ? "button" : "span";
      return /* @__PURE__ */ import_react13.default.createElement(El, { className: cx12("s-tag", className), ...toggle, ...rest }, content);
    }
    const named = typeof children === "string" || typeof children === "number";
    const label = removeLabel || (named ? "Fjern " + children : "Fjern");
    return /* @__PURE__ */ import_react13.default.createElement("span", { className: cx12("s-tag", "s-tag--removable", selected && "s-tag--selected", className), ...rest }, interactive ? /* @__PURE__ */ import_react13.default.createElement("button", { className: "s-tag__main", ...toggle }, content) : content, /* @__PURE__ */ import_react13.default.createElement("button", { type: "button", className: "s-tag__x", "aria-label": label, onClick: (e) => {
      e.stopPropagation();
      onRemove(e);
    } }, /* @__PURE__ */ import_react13.default.createElement(Icon, { name: "x", size: 12, strokeWidth: 2 })));
  }

  // components/display/Disclosure.jsx
  var import_react14 = __toESM(require_react(), 1);
  var cx13 = (...a) => a.filter(Boolean).join(" ");
  var HEADING = /^h[1-6]$/;
  function Disclosure({ title, open, defaultOpen = false, onToggle, className, children, ...rest }) {
    const ref = import_react14.default.useRef(null);
    const controlled = open !== void 0;
    const [inner, setInner] = import_react14.default.useState(defaultOpen);
    const [, rerender] = import_react14.default.useReducer((n) => n + 1, 0);
    const isOpen = controlled ? open : inner;
    import_react14.default.useEffect(() => {
      if (ref.current && ref.current.open !== isOpen) ref.current.open = isOpen;
    });
    const toggle = (e) => {
      const now = e.currentTarget.open;
      if (now === isOpen) return;
      if (controlled) rerender();
      else setInner(now);
      onToggle?.(now);
    };
    return /* @__PURE__ */ import_react14.default.createElement("details", { ref, open: isOpen, onToggle: toggle, className: cx13("s-disclosure", className), ...rest }, /* @__PURE__ */ import_react14.default.createElement("summary", { className: "s-disclosure__summary" }, import_react14.default.isValidElement(title) && HEADING.test(title.type) ? import_react14.default.cloneElement(title, { className: cx13("s-disclosure__title", title.props.className) }) : /* @__PURE__ */ import_react14.default.createElement("span", { className: "s-disclosure__title" }, title), /* @__PURE__ */ import_react14.default.createElement(Icon, { name: "chevron-down", size: 18, className: "s-disclosure__chevron" })), /* @__PURE__ */ import_react14.default.createElement("div", { className: "s-disclosure__body" }, children));
  }

  // components/display/Heading.jsx
  var import_react15 = __toESM(require_react(), 1);
  var cx14 = (...a) => a.filter(Boolean).join(" ");
  var SIZES = ["display", "h1", "h2", "h3", "h4"];
  var Heading = import_react15.default.forwardRef(function Heading2({ level, size, className, children, ...rest }, ref) {
    const n = Math.min(6, Math.max(1, Math.round(Number(level)) || 2));
    const El = "h" + n;
    const look = SIZES.includes(size) ? size : n <= 4 ? "h" + n : "h4";
    return /* @__PURE__ */ import_react15.default.createElement(El, { ref, className: cx14("s-" + look, className), ...rest }, children);
  });

  // components/display/Text.jsx
  var import_react16 = __toESM(require_react(), 1);
  var cx15 = (...a) => a.filter(Boolean).join(" ");
  var Text = import_react16.default.forwardRef(function Text2({ as: El = "p", size = "body", tone = "default", mono = false, className, children, ...rest }, ref) {
    return /* @__PURE__ */ import_react16.default.createElement(El, { ref, className: cx15("s-text", size !== "body" && "s-text--" + size, tone !== "default" && "s-text--" + tone, mono && "s-text--mono", className), ...rest }, children);
  });

  // components/feedback/EmptyState.jsx
  var import_react17 = __toESM(require_react(), 1);
  var cx16 = (...a) => a.filter(Boolean).join(" ");
  function EmptyState({ icon: icon2, title, description, action, level = 2, framed = false, className, children, ...rest }) {
    const H = "h" + Math.min(Math.max(level, 2), 6);
    return /* @__PURE__ */ import_react17.default.createElement("div", { className: cx16("s-empty", framed && "s-empty--framed", className), ...rest }, icon2 ? /* @__PURE__ */ import_react17.default.createElement("span", { className: "s-empty__icon", "aria-hidden": "true" }, /* @__PURE__ */ import_react17.default.createElement(Icon, { name: icon2, size: 26 })) : null, /* @__PURE__ */ import_react17.default.createElement(H, { className: "s-empty__title" }, title), description ? /* @__PURE__ */ import_react17.default.createElement("p", { className: "s-empty__text" }, description) : null, children, action ? /* @__PURE__ */ import_react17.default.createElement("div", { className: "s-empty__action" }, action) : null);
  }

  // components/feedback/Progress.jsx
  var import_react18 = __toESM(require_react(), 1);
  var cx17 = (...a) => a.filter(Boolean).join(" ");
  function Progress({ variant = "bar", value, max = 100, label, valueText, size = 48, tone = "accent", className, style, children, ...rest }) {
    const known = typeof value === "number" && Number.isFinite(value);
    const fraction = known ? Math.min(1, Math.max(0, max > 0 ? value / max : 0)) : 0;
    const aria = {
      role: "progressbar",
      "aria-label": rest["aria-labelledby"] ? void 0 : label,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": known ? Math.min(max, Math.max(0, value)) : void 0,
      // ARIA wants it inside min–max; say more with valueText
      "aria-valuetext": valueText
    };
    const classes = cx17("s-progress", "s-progress--" + variant, tone !== "accent" && "s-progress--" + tone, !known && "s-progress--indeterminate", className);
    if (variant === "ring") {
      const stroke = Math.max(3, Math.round(size / 12));
      const r = (size - stroke) / 2 - 1;
      const c = 2 * Math.PI * r;
      return /* @__PURE__ */ import_react18.default.createElement("span", { className: classes, style: { width: size, height: size, ...style }, ...aria, ...rest }, /* @__PURE__ */ import_react18.default.createElement("svg", { className: "s-progress__svg", width: size, height: size, viewBox: `0 0 ${size} ${size}`, "aria-hidden": "true", focusable: "false" }, /* @__PURE__ */ import_react18.default.createElement("circle", { className: "s-progress__edge", cx: size / 2, cy: size / 2, r, strokeWidth: stroke + 2, fill: "none" }), /* @__PURE__ */ import_react18.default.createElement("circle", { className: "s-progress__track", cx: size / 2, cy: size / 2, r, strokeWidth: stroke, fill: "none" }), /* @__PURE__ */ import_react18.default.createElement("circle", { className: "s-progress__fill", cx: size / 2, cy: size / 2, r, strokeWidth: stroke, fill: "none", strokeDasharray: c, strokeDashoffset: known ? c * (1 - fraction) : c * 0.75, transform: `rotate(-90 ${size / 2} ${size / 2})` })), children ? /* @__PURE__ */ import_react18.default.createElement("span", { className: "s-progress__center" }, children) : null);
    }
    return /* @__PURE__ */ import_react18.default.createElement("span", { className: classes, style, ...aria, ...rest }, /* @__PURE__ */ import_react18.default.createElement("span", { className: "s-progress__track" }, /* @__PURE__ */ import_react18.default.createElement("span", { className: "s-progress__fill", style: known ? { width: fraction * 100 + "%" } : void 0 })));
  }

  // components/feedback/ErrorSummary.jsx
  var import_react19 = __toESM(require_react(), 1);
  var cx18 = (...a) => a.filter(Boolean).join(" ");
  var CONTROL = 'input:not([type="hidden"]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),a[href],[tabindex]:not([tabindex="-1"])';
  function focusTarget(el) {
    if (!el) return null;
    if (el.matches(CONTROL)) return el;
    return el.querySelector(CONTROL);
  }
  function ErrorSummary({ title = "Noe m\xE5 rettes f\xF8r du kan g\xE5 videre", errors = [], autoFocus = true, level = 2, id, className, style, children, ...rest }) {
    const ref = import_react19.default.useRef(null);
    const auto = "s" + import_react19.default.useId().replace(/:/g, "");
    const sid = id || auto;
    const titleId = sid + "-title";
    const H = "h" + Math.min(Math.max(level, 2), 6);
    import_react19.default.useEffect(() => {
      if (autoFocus && ref.current) ref.current.focus();
    }, [autoFocus]);
    const go = (e, targetId) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = e.currentTarget.ownerDocument.getElementById(targetId);
      const target = focusTarget(el);
      if (!target) return;
      e.preventDefault();
      target.focus();
      if (target !== el) el.scrollIntoView({ block: "nearest" });
    };
    return /* @__PURE__ */ import_react19.default.createElement("section", { ref, id: sid, tabIndex: -1, "aria-labelledby": titleId, className: cx18("s-errorsummary", className), style, ...rest }, /* @__PURE__ */ import_react19.default.createElement("div", { role: "alert" }, /* @__PURE__ */ import_react19.default.createElement(H, { id: titleId, className: "s-errorsummary__title" }, /* @__PURE__ */ import_react19.default.createElement(Icon, { name: "circle-alert", size: 20, className: "s-errorsummary__icon" }), title), children ? /* @__PURE__ */ import_react19.default.createElement("p", { className: "s-errorsummary__text" }, children) : null, errors.length ? /* @__PURE__ */ import_react19.default.createElement("ul", { className: "s-errorsummary__list" }, errors.map((err, i) => /* @__PURE__ */ import_react19.default.createElement("li", { key: `${err.id || ""}-${i}` }, err.id ? /* @__PURE__ */ import_react19.default.createElement("a", { href: "#" + err.id, className: "s-errorsummary__link", onClick: (e) => go(e, err.id) }, err.message) : /* @__PURE__ */ import_react19.default.createElement("span", { className: "s-errorsummary__item" }, err.message)))) : null));
  }

  // components/feedback/Alert.jsx
  var import_react20 = __toESM(require_react(), 1);
  var cx19 = (...a) => a.filter(Boolean).join(" ");
  var ICONS = { info: "info", success: "circle-check", warning: "triangle-alert", danger: "circle-alert" };
  var FOCUSABLE = 'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])';
  function focusBefore(el) {
    const all = [...el.ownerDocument.querySelectorAll(FOCUSABLE)].filter((f) => !el.contains(f) && f.offsetParent !== null);
    const before = all.filter((f) => el.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_PRECEDING);
    return before[before.length - 1] || all.find((f) => el.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING) || null;
  }
  function Alert({ tone = "info", title, urgent = false, actionLabel, onAction, actions, onClose, closeLabel = "Lukk", focusOnClose, className, style, children, ...rest }) {
    const ref = import_react20.default.useRef(null);
    const role = tone === "danger" && urgent ? "alert" : "status";
    const close = () => {
      const target = focusOnClose?.current || ref.current && focusBefore(ref.current);
      if (target && typeof target.focus === "function") target.focus();
      onClose?.();
    };
    return /* @__PURE__ */ import_react20.default.createElement("div", { ref, role, className: cx19("s-alert", "s-alert--" + tone, className), style, ...rest }, /* @__PURE__ */ import_react20.default.createElement(Icon, { name: ICONS[tone] || "info", size: 18, className: "s-alert__icon" }), /* @__PURE__ */ import_react20.default.createElement("div", { className: "s-alert__body" }, title ? /* @__PURE__ */ import_react20.default.createElement("div", { className: "s-alert__title" }, title) : null, children ? /* @__PURE__ */ import_react20.default.createElement("div", { className: "s-alert__text" }, children) : null, actionLabel || actions ? /* @__PURE__ */ import_react20.default.createElement("div", { className: "s-alert__actions" }, actionLabel ? /* @__PURE__ */ import_react20.default.createElement("button", { type: "button", className: "s-alert__action", onClick: onAction }, actionLabel) : null, actions) : null), onClose ? /* @__PURE__ */ import_react20.default.createElement(IconButton, { icon: "x", label: closeLabel, size: "sm", className: "s-alert__close", onClick: close }) : null);
  }

  // components/feedback/Spinner.jsx
  var import_react21 = __toESM(require_react(), 1);
  var cx20 = (...a) => a.filter(Boolean).join(" ");
  function Spinner({ size = "md", label, className, style, ...rest }) {
    const hidden = rest["aria-hidden"] === true || rest["aria-hidden"] === "true";
    return /* @__PURE__ */ import_react21.default.createElement("span", { role: hidden ? void 0 : "status", className: cx20("s-spinner", size !== "md" && "s-spinner--" + size, className), style, ...rest }, /* @__PURE__ */ import_react21.default.createElement("span", { className: "s-spinner__ring", "aria-hidden": "true" }), !hidden && label ? /* @__PURE__ */ import_react21.default.createElement("span", { className: "s-sr-only" }, label) : null);
  }

  // components/feedback/Skeleton.jsx
  var import_react22 = __toESM(require_react(), 1);
  var cx21 = (...a) => a.filter(Boolean).join(" ");
  function Skeleton({ variant = "text", lines = 1, width, height, size = 40, className, style, ...rest }) {
    if (variant === "text") {
      const n = Math.max(1, Math.floor(lines));
      const line = (i) => /* @__PURE__ */ import_react22.default.createElement("span", { key: i, className: cx21("s-skeleton", "s-skeleton--text", n > 1 && i === n - 1 && "s-skeleton--last") });
      if (n === 1) return /* @__PURE__ */ import_react22.default.createElement("span", { "aria-hidden": "true", className: cx21("s-skeleton", "s-skeleton--text", className), style: { width, ...style }, ...rest });
      return /* @__PURE__ */ import_react22.default.createElement("span", { "aria-hidden": "true", className: cx21("s-skeleton-lines", className), style: { width, ...style }, ...rest }, Array.from({ length: n }, (_, i) => line(i)));
    }
    const dims = variant === "circle" ? { width: size, height: size } : { width, height };
    return /* @__PURE__ */ import_react22.default.createElement("span", { "aria-hidden": "true", className: cx21("s-skeleton", "s-skeleton--" + variant, className), style: { ...dims, ...style }, ...rest });
  }

  // components/feedback/Toast.jsx
  var import_react23 = __toESM(require_react(), 1);
  var cx22 = (...a) => a.filter(Boolean).join(" ");
  var toastStackContext = import_react23.default.createContext(false);
  var InStack = toastStackContext;
  var ICONS2 = { neutral: "info", success: "circle-check", warning: "triangle-alert", danger: "circle-alert", info: "info" };
  var TOAST_MIN = 5e3;
  function toastDuration(duration, hasAction) {
    const ms = Number(duration);
    return ms > 0 && !hasAction ? Math.max(ms, TOAST_MIN) : 0;
  }
  var peker = null;
  var folger = false;
  function folgPeker() {
    if (folger || typeof document === "undefined") return;
    folger = true;
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "touch") peker = [e.clientX, e.clientY];
    }, { capture: true, passive: true });
  }
  function useToastTimer(duration, hasAction, onClose, ref) {
    const ms = toastDuration(duration, hasAction);
    const close = import_react23.default.useRef(onClose);
    close.current = onClose;
    const left = import_react23.default.useRef(ms);
    const done = import_react23.default.useRef(false);
    const [pointer, setPointer] = import_react23.default.useState(false);
    const [focus, setFocus] = import_react23.default.useState(false);
    const [hidden, setHidden] = import_react23.default.useState(false);
    import_react23.default.useEffect(() => {
      left.current = ms;
      done.current = false;
    }, [ms]);
    import_react23.default.useEffect(() => {
      if (!ms) return void 0;
      const sync = () => setHidden(document.visibilityState === "hidden");
      sync();
      folgPeker();
      const under = peker && document.elementFromPoint(peker[0], peker[1]);
      if (under && ref.current && ref.current.contains(under)) setPointer(true);
      const move = (e) => {
        if (e.pointerType !== "touch") setPointer(!!ref.current && ref.current.contains(e.target));
      };
      document.addEventListener("visibilitychange", sync);
      document.addEventListener("pointermove", move, { passive: true });
      return () => {
        document.removeEventListener("visibilitychange", sync);
        document.removeEventListener("pointermove", move);
      };
    }, [ms, ref]);
    const paused = pointer || focus || hidden;
    import_react23.default.useEffect(() => {
      if (!ms || paused || done.current) return void 0;
      const start = Date.now();
      const t = setTimeout(() => {
        left.current = 0;
        done.current = true;
        if (close.current) close.current();
      }, left.current);
      return () => {
        clearTimeout(t);
        left.current = Math.max(0, left.current - (Date.now() - start));
      };
    }, [ms, paused]);
    if (!ms) return null;
    return {
      onPointerEnter: () => setPointer(true),
      onPointerLeave: () => setPointer(false),
      onFocus: () => setFocus(true),
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
      }
    };
  }
  var both = (a, b) => a && b ? (e) => {
    a(e);
    b(e);
  } : a || b;
  function Toast({ tone = "neutral", title, description, actionLabel, onAction, onClose, closeLabel = "Lukk", duration, className, style, onPointerEnter, onPointerLeave, onFocus, onBlur, ...rest }) {
    const inStack = import_react23.default.useContext(InStack);
    const ref = import_react23.default.useRef(null);
    const timer = useToastTimer(duration, !!actionLabel, onClose, ref);
    return /* @__PURE__ */ import_react23.default.createElement("div", { ref, role: inStack ? void 0 : "status", className: cx22("s-toast", "s-toast--" + tone, className), style, onPointerEnter: both(timer?.onPointerEnter, onPointerEnter), onPointerLeave: both(timer?.onPointerLeave, onPointerLeave), onFocus: both(timer?.onFocus, onFocus), onBlur: both(timer?.onBlur, onBlur), ...rest }, /* @__PURE__ */ import_react23.default.createElement(Icon, { name: ICONS2[tone] || "info", size: 18, className: "s-toast__icon" }), /* @__PURE__ */ import_react23.default.createElement("div", { className: "s-toast__body" }, title ? /* @__PURE__ */ import_react23.default.createElement("div", { className: "s-toast__title" }, title) : null, description ? /* @__PURE__ */ import_react23.default.createElement("div", { className: "s-toast__desc" }, description) : null, actionLabel ? /* @__PURE__ */ import_react23.default.createElement("button", { type: "button", className: "s-toast__action", onClick: onAction }, actionLabel) : null), onClose ? /* @__PURE__ */ import_react23.default.createElement(IconButton, { icon: "x", label: closeLabel, size: "sm", onClick: onClose, style: { margin: "-6px -6px 0 0" } }) : null);
  }
  function ToastStack({ children, className, ...rest }) {
    import_react23.default.useEffect(() => {
      folgPeker();
    }, []);
    return /* @__PURE__ */ import_react23.default.createElement("div", { role: "status", "aria-live": "polite", "aria-relevant": "additions text", className: cx22("s-toast-stack", className), ...rest }, /* @__PURE__ */ import_react23.default.createElement(InStack.Provider, { value: true }, children));
  }

  // components/feedback/NyVersjon.jsx
  var import_react24 = __toESM(require_react(), 1);
  var cx23 = (...a) => a.filter(Boolean).join(" ");
  function NyVersjon({ open = false, onUpdate, onLater, updating = false, title = "Ny versjon", description, updateLabel = "Oppdater", laterLabel = "Senere", stack = true, stackProps, className, style, ...rest }) {
    const inStack = import_react24.default.useContext(toastStackContext);
    const toast = open ? /* @__PURE__ */ import_react24.default.createElement("div", { role: inStack || stack ? void 0 : "status", className: cx23("s-toast", "s-toast--info", "s-nyversjon", className), style, ...rest }, /* @__PURE__ */ import_react24.default.createElement(Icon, { name: "info", size: 18, className: "s-toast__icon" }), /* @__PURE__ */ import_react24.default.createElement("div", { className: "s-toast__body" }, /* @__PURE__ */ import_react24.default.createElement("div", { className: "s-toast__title" }, title), description ? /* @__PURE__ */ import_react24.default.createElement("div", { className: "s-toast__desc" }, description) : null, /* @__PURE__ */ import_react24.default.createElement("div", { className: "s-nyversjon__actions" }, /* @__PURE__ */ import_react24.default.createElement("button", { type: "button", className: "s-toast__action", onClick: onUpdate, disabled: updating || void 0, "aria-busy": updating || void 0 }, updateLabel), onLater ? /* @__PURE__ */ import_react24.default.createElement("button", { type: "button", className: "s-toast__action s-toast__action--quiet", onClick: onLater }, laterLabel) : null))) : null;
    if (!stack || inStack) return toast;
    return /* @__PURE__ */ import_react24.default.createElement(ToastStack, { ...stackProps, className: cx23("s-nyversjon-stack", stackProps && stackProps.className) }, toast);
  }

  // components/feedback/oppdatering.js
  var HVER = 30 * 60 * 1e3;
  var lyttere = /* @__PURE__ */ new Set();
  var ventende = false;
  var lastet = false;
  function oppdater() {
    if (lastet) return;
    lastet = true;
    location.reload();
  }
  function vedNyVersjon(lytter) {
    lyttere.add(lytter);
    if (ventende) lytter();
    return () => {
      lyttere.delete(lytter);
    };
  }
  function erOpptatt() {
    const a = document.activeElement;
    if (a && a !== document.body && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return true;
    if (document.querySelector('dialog[open], [aria-modal="true"]')) return true;
    const felt = document.querySelectorAll(
      'textarea, input:not([type]), input[type="text"], input[type="search"], input[type="number"], input[type="email"], input[type="url"], input[type="tel"]'
    );
    for (const f of felt) if (!f.readOnly && !f.disabled && f.value.trim()) return true;
    return false;
  }
  function startOppdatering(swUrl, { opptatt = () => false, hver = HVER } = {}) {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator) || location.protocol === "file:") return;
    const sw = navigator.serviceWorker;
    let hadde = !!sw.controller;
    sw.addEventListener("controllerchange", () => {
      if (!hadde) {
        hadde = true;
        return;
      }
      if (!erOpptatt() && !opptatt()) return oppdater();
      ventende = true;
      lyttere.forEach((l) => l());
    });
    sw.register(swUrl, { updateViaCache: "none" }).then((reg) => {
      const sjekk = () => {
        reg.update().catch(() => void 0);
      };
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") sjekk();
      });
      setInterval(sjekk, hver);
    }).catch(() => void 0);
  }

  // components/inputs/Input.jsx
  var import_react25 = __toESM(require_react(), 1);
  var cx24 = (...a) => a.filter(Boolean).join(" ");
  function useField(id, hint, error, extra, counted) {
    const auto = "s" + import_react25.default.useId().replace(/:/g, "");
    const fid = id || auto;
    const hintId = fid + "-hint";
    const countId = fid + "-count";
    const describedBy = [error || hint ? hintId : null, counted ? countId : null, extra].filter(Boolean).join(" ") || void 0;
    return { fid, hintId, countId, describedBy };
  }
  var COUNT_PAUSE = 1e3;
  var COUNT_TEXT = {
    nb: { locale: "nb-NO", of: "av", unit: "tegn", left: (r) => r + " igjen", over: (o) => o + " for mye", saidLeft: (r) => r + " tegn igjen", saidOver: (o) => o + " tegn for mye" },
    en: { locale: "en-GB", of: "of", unit: "characters", left: (r) => r + " left", over: (o) => o + " too many", saidLeft: (r) => r + (r === 1 ? " character left" : " characters left"), saidOver: (o) => o + (o === 1 ? " character too many" : " characters too many") }
  };
  function useCharCount({ count, maxLength, value, defaultValue, onChange, countLang }) {
    const max = Math.floor(Number(maxLength));
    const on = !!count && max > 0;
    const [own, setOwn] = import_react25.default.useState(() => String(defaultValue ?? "").length);
    const [said, setSaid] = import_react25.default.useState("");
    const timer = import_react25.default.useRef(null);
    const t = COUNT_TEXT[countLang] || COUNT_TEXT.nb;
    const n = value != null ? String(value).length : own;
    const left = max - n;
    const state = !on ? null : left < 0 ? "over" : n >= max * 0.9 ? "warn" : "ok";
    const latest = import_react25.default.useRef("");
    latest.current = on ? left < 0 ? t.saidOver(-left) : t.saidLeft(left) : "";
    import_react25.default.useEffect(() => () => clearTimeout(timer.current), []);
    if (!on) return { on, onChange, over: false };
    const fmt = (x) => new Intl.NumberFormat(t.locale).format(x);
    const handleChange = (e) => {
      if (value == null) setOwn(e.target.value.length);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setSaid(latest.current), COUNT_PAUSE);
      if (onChange) onChange(e);
    };
    const node = (countId) => /* @__PURE__ */ import_react25.default.createElement(import_react25.default.Fragment, null, /* @__PURE__ */ import_react25.default.createElement("span", { id: countId, className: cx24("s-field__count", state !== "ok" && "s-field__count--" + state) }, state === "over" ? /* @__PURE__ */ import_react25.default.createElement(Icon, { name: "circle-alert", size: 14, className: "s-field__count-icon" }) : null, /* @__PURE__ */ import_react25.default.createElement("span", null, fmt(n), " ", t.of, " ", fmt(max), /* @__PURE__ */ import_react25.default.createElement("span", { className: "s-sr-only" }, " " + t.unit), state === "warn" ? " \xB7 " + t.left(fmt(left)) : state === "over" ? " \xB7 " + t.over(fmt(-left)) : null)), /* @__PURE__ */ import_react25.default.createElement("span", { className: "s-sr-only", "aria-live": "polite" }, said));
    return { on, onChange: handleChange, over: state === "over", node };
  }
  var MODES = {
    number: { type: "text", inputMode: "numeric" },
    decimal: { type: "text", inputMode: "decimal" },
    phone: { type: "tel", inputMode: "tel", autoComplete: "tel" },
    email: { type: "email", inputMode: "email", autoComplete: "email" },
    url: { type: "url", inputMode: "url", autoComplete: "url" },
    search: { type: "search", inputMode: "search", enterKeyHint: "search" },
    date: { type: "date" },
    time: { type: "time" },
    password: { type: "password", autoComplete: "current-password" }
  };
  function Field({ label, hint, error, optional, optionalLabel = "Valgfritt", htmlFor, hintId, counter, children }) {
    const hid = hintId || (htmlFor ? htmlFor + "-hint" : void 0);
    const message = error ? /* @__PURE__ */ import_react25.default.createElement("span", { id: hid, role: "alert", className: "s-field__hint s-field__hint--error" }, error) : hint ? /* @__PURE__ */ import_react25.default.createElement("span", { id: hid, className: "s-field__hint" }, hint) : null;
    return /* @__PURE__ */ import_react25.default.createElement("div", { className: "s-field" }, label ? /* @__PURE__ */ import_react25.default.createElement("label", { className: "s-field__label", htmlFor }, label, optional ? /* @__PURE__ */ import_react25.default.createElement("span", { className: "s-field__opt" }, optionalLabel) : null) : null, children, counter ? /* @__PURE__ */ import_react25.default.createElement("div", { className: "s-field__foot" }, message, counter) : message);
  }
  var Input = import_react25.default.forwardRef(function Input2({ label, hint, error, optional, optionalLabel, icon: icon2, prefix, suffix, size = "md", mode, type: typeProp, passwordToggle = true, passwordToggleLabel = "Vis passord", count = false, countLang = "nb", maxLength, value, defaultValue, onChange, disabled, id, className, style, "aria-describedby": extra, ...rest }, ref) {
    const counted = useCharCount({ count, maxLength, value, defaultValue, onChange, countLang });
    const { fid, hintId, countId, describedBy } = useField(id, hint, error, extra, counted.on);
    const invalid = !!error || counted.over;
    const preset = MODES[mode] || {};
    const [shown, setShown] = import_react25.default.useState(false);
    const toggle = mode === "password" && passwordToggle;
    const type = toggle && shown ? "text" : typeProp ?? preset.type;
    return /* @__PURE__ */ import_react25.default.createElement(Field, { label, hint, error, optional, optionalLabel, htmlFor: fid, hintId, counter: counted.on ? counted.node(countId) : null }, /* @__PURE__ */ import_react25.default.createElement("div", { className: cx24("s-control", size !== "md" && "s-control--" + size, invalid && "s-control--invalid", disabled && "s-control--disabled", className), style }, icon2 ? /* @__PURE__ */ import_react25.default.createElement("span", { className: "s-control__affix" }, /* @__PURE__ */ import_react25.default.createElement(Icon, { name: icon2, size: 16 })) : prefix ? /* @__PURE__ */ import_react25.default.createElement("span", { className: "s-control__affix" }, prefix) : null, /* @__PURE__ */ import_react25.default.createElement("input", { ref, id: fid, className: "s-control__input", disabled, "aria-invalid": invalid || void 0, "aria-describedby": describedBy, maxLength: counted.on ? void 0 : maxLength, value, defaultValue, onChange: counted.onChange, ...preset, ...rest, type }), suffix ? /* @__PURE__ */ import_react25.default.createElement("span", { className: "s-control__affix s-control__affix--end" }, suffix) : null, toggle ? /* @__PURE__ */ import_react25.default.createElement("span", { className: "s-control__affix s-control__affix--action" }, /* @__PURE__ */ import_react25.default.createElement(IconButton, { size: size === "lg" ? "md" : "sm", icon: shown ? "eye-off" : "eye", label: passwordToggleLabel, "aria-pressed": shown, disabled, onClick: () => setShown((s) => !s) })) : null));
  });

  // components/inputs/SegmentedControl.jsx
  var import_react26 = __toESM(require_react(), 1);
  var cx25 = (...a) => a.filter(Boolean).join(" ");
  function SegmentedControl({ label, hint, options = [], name, value, defaultValue, onChange, fullWidth, disabled, id, className, style, "aria-describedby": extra, ...rest }) {
    const auto = "s" + import_react26.default.useId().replace(/:/g, "");
    const fid = id || auto;
    const hintId = fid + "-hint";
    const legendId = fid + "-legend";
    const [inner, setInner] = import_react26.default.useState(defaultValue);
    const cur = value !== void 0 ? value : inner;
    const describedBy = [hint ? hintId : null, extra].filter(Boolean).join(" ") || void 0;
    const pick = (v) => {
      if (value === void 0) setInner(v);
      onChange && onChange(v);
    };
    return /* @__PURE__ */ import_react26.default.createElement(
      "fieldset",
      {
        id: fid,
        role: "radiogroup",
        className: cx25("s-segmented", fullWidth && "s-segmented--full", className),
        style,
        disabled,
        "aria-labelledby": label ? legendId : void 0,
        "aria-describedby": describedBy,
        ...rest
      },
      label ? /* @__PURE__ */ import_react26.default.createElement("legend", { id: legendId, className: "s-segmented__legend" }, label) : null,
      /* @__PURE__ */ import_react26.default.createElement("div", { className: "s-segmented__track" }, options.map((o) => {
        const opt = typeof o === "string" ? { value: o, label: o } : o;
        return /* @__PURE__ */ import_react26.default.createElement("label", { key: opt.value, className: cx25("s-segmented__item", opt.disabled && "s-segmented__item--disabled") }, /* @__PURE__ */ import_react26.default.createElement("input", { type: "radio", className: "s-segmented__input", name: name || fid, value: opt.value, checked: cur === opt.value, disabled: opt.disabled, onChange: () => pick(opt.value) }), /* @__PURE__ */ import_react26.default.createElement("span", { className: "s-segmented__face" }, opt.icon ? /* @__PURE__ */ import_react26.default.createElement(Icon, { name: opt.icon, size: 16 }) : null, opt.label));
      })),
      hint ? /* @__PURE__ */ import_react26.default.createElement("span", { id: hintId, className: "s-field__hint s-segmented__hint" }, hint) : null
    );
  }

  // components/inputs/Fieldset.jsx
  var import_react27 = __toESM(require_react(), 1);
  var cx26 = (...a) => a.filter(Boolean).join(" ");
  function Fieldset({ legend, hint, error, optional, optionalLabel = "Valgfritt", layout = "column", id, className, style, children, "aria-describedby": extra, ...rest }) {
    const auto = "s" + import_react27.default.useId().replace(/:/g, "");
    const fid = id || auto;
    const hintId = fid + "-hint";
    const describedBy = [error || hint ? hintId : null, extra].filter(Boolean).join(" ") || void 0;
    return /* @__PURE__ */ import_react27.default.createElement("fieldset", { id: fid, className: cx26("s-fieldset", error && "s-fieldset--invalid", className), style, "aria-describedby": describedBy, ...rest }, /* @__PURE__ */ import_react27.default.createElement("legend", { className: "s-fieldset__legend" }, legend, optional ? /* @__PURE__ */ import_react27.default.createElement("span", { className: "s-field__opt" }, optionalLabel) : null), hint && !error ? /* @__PURE__ */ import_react27.default.createElement("span", { id: hintId, className: "s-field__hint s-fieldset__hint" }, hint) : null, /* @__PURE__ */ import_react27.default.createElement("div", { className: cx26("s-fieldset__items", layout === "row" && "s-fieldset__items--row") }, children), error ? /* @__PURE__ */ import_react27.default.createElement("span", { id: hintId, role: "alert", className: "s-field__hint s-field__hint--error s-fieldset__error" }, /* @__PURE__ */ import_react27.default.createElement(Icon, { name: "circle-alert", size: 14, className: "s-fieldset__error-icon" }), /* @__PURE__ */ import_react27.default.createElement("span", null, error)) : null);
  }

  // components/inputs/Select.jsx
  var import_react28 = __toESM(require_react(), 1);
  var cx27 = (...a) => a.filter(Boolean).join(" ");
  var Select = import_react28.default.forwardRef(function Select2({ label, hint, error, optional, optionalLabel, options = [], placeholder, size = "md", disabled, id, className, style, "aria-describedby": extra, ...rest }, ref) {
    const { fid, hintId, describedBy } = useField(id, hint, error, extra);
    return /* @__PURE__ */ import_react28.default.createElement(Field, { label, hint, error, optional, optionalLabel, htmlFor: fid, hintId }, /* @__PURE__ */ import_react28.default.createElement("div", { className: cx27("s-control", size !== "md" && "s-control--" + size, error && "s-control--invalid", disabled && "s-control--disabled", className), style }, /* @__PURE__ */ import_react28.default.createElement("select", { ref, id: fid, className: "s-control__input s-control__select", disabled, "aria-invalid": !!error || void 0, "aria-describedby": describedBy, ...rest }, placeholder ? /* @__PURE__ */ import_react28.default.createElement("option", { value: "" }, placeholder) : null, options.map((o) => {
      const v = typeof o === "string" ? { value: o, label: o } : o;
      return /* @__PURE__ */ import_react28.default.createElement("option", { key: v.value, value: v.value }, v.label);
    })), /* @__PURE__ */ import_react28.default.createElement(Icon, { name: "chevron-down", size: 16, className: "s-control__chev" })));
  });

  // components/inputs/Textarea.jsx
  var import_react29 = __toESM(require_react(), 1);
  var cx28 = (...a) => a.filter(Boolean).join(" ");
  var Textarea = import_react29.default.forwardRef(function Textarea2({ label, hint, error, optional, optionalLabel, rows = 4, count = false, countLang = "nb", maxLength, value, defaultValue, onChange, disabled, id, className, style, "aria-describedby": extra, ...rest }, ref) {
    const counted = useCharCount({ count, maxLength, value, defaultValue, onChange, countLang });
    const { fid, hintId, countId, describedBy } = useField(id, hint, error, extra, counted.on);
    const invalid = !!error || counted.over;
    return /* @__PURE__ */ import_react29.default.createElement(Field, { label, hint, error, optional, optionalLabel, htmlFor: fid, hintId, counter: counted.on ? counted.node(countId) : null }, /* @__PURE__ */ import_react29.default.createElement("div", { className: cx28("s-control", "s-control--area", invalid && "s-control--invalid", disabled && "s-control--disabled", className), style }, /* @__PURE__ */ import_react29.default.createElement("textarea", { ref, id: fid, rows, className: "s-control__input", disabled, "aria-invalid": invalid || void 0, "aria-describedby": describedBy, maxLength: counted.on ? void 0 : maxLength, value, defaultValue, onChange: counted.onChange, ...rest })));
  });

  // components/navigation/Tabs.jsx
  var import_react30 = __toESM(require_react(), 1);
  var cx29 = (...a) => a.filter(Boolean).join(" ");
  var tabId = (base, v) => base + "-tab-" + v;
  var panelId = (base, v) => base + "-panel-" + v;
  var TabsContext = import_react30.default.createContext(null);
  function Tabs({ items = [], value, defaultValue, onChange, variant = "underline", id, children, className, style, ...rest }) {
    const [inner, setInner] = import_react30.default.useState(defaultValue ?? (items[0] && items[0].id));
    const auto = "s" + import_react30.default.useId().replace(/:/g, "");
    const base = id || auto;
    const cur = value ?? inner;
    const refs = import_react30.default.useRef([]);
    const pick = (v) => {
      if (value === void 0) setInner(v);
      onChange && onChange(v);
    };
    const panels = /* @__PURE__ */ new Set();
    import_react30.default.Children.forEach(children, (c) => {
      if (c && c.type === TabPanel) panels.add(c.props.value);
    });
    const focusable = items.some((t) => t.id === cur) ? cur : items[0] && items[0].id;
    const onKeyDown = (e) => {
      const i = items.findIndex((t) => t.id === e.currentTarget.dataset.value);
      const last = items.length - 1;
      const to = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
      if (to === void 0) return;
      e.preventDefault();
      refs.current[to] && refs.current[to].focus();
      pick(items[to].id);
    };
    return /* @__PURE__ */ import_react30.default.createElement(TabsContext.Provider, { value: { base, cur } }, /* @__PURE__ */ import_react30.default.createElement("div", { role: "tablist", className: cx29("s-tabs", variant === "segmented" && "s-tabs--segmented", className), style, ...rest }, items.map((t, i) => /* @__PURE__ */ import_react30.default.createElement(
      "button",
      {
        key: t.id,
        ref: (el) => {
          refs.current[i] = el;
        },
        id: tabId(base, t.id),
        "data-value": t.id,
        role: "tab",
        type: "button",
        "aria-selected": cur === t.id,
        "aria-controls": panels.has(t.id) ? panelId(base, t.id) : void 0,
        tabIndex: t.id === focusable ? 0 : -1,
        className: "s-tab",
        onClick: () => pick(t.id),
        onKeyDown
      },
      t.icon ? /* @__PURE__ */ import_react30.default.createElement(Icon, { name: t.icon, size: 16 }) : null,
      t.label,
      t.count !== void 0 ? /* @__PURE__ */ import_react30.default.createElement("span", { className: "s-tab__count" }, t.count) : null
    ))), children);
  }
  function TabPanel({ value, children, className, style, ...rest }) {
    const ctx = import_react30.default.useContext(TabsContext);
    if (!ctx) return null;
    const selected = ctx.cur === value;
    return /* @__PURE__ */ import_react30.default.createElement(
      "div",
      {
        role: "tabpanel",
        id: panelId(ctx.base, value),
        "aria-labelledby": tabId(ctx.base, value),
        tabIndex: 0,
        hidden: !selected,
        className: cx29("s-tabpanel", className),
        style,
        ...rest
      },
      children
    );
  }

  // components/navigation/AppShell.jsx
  var import_react31 = __toESM(require_react(), 1);
  var cx30 = (...a) => a.filter(Boolean).join(" ");
  var icon = (it, size) => typeof it.icon === "string" ? /* @__PURE__ */ import_react31.default.createElement(Icon, { name: it.icon, size }) : typeof it.icon === "function" ? it.icon(size) : it.icon || null;
  function AppShell({ items = [], current, onNavigate, brand, footer, label = "Hovedmeny", moreLabel = "Mer", skipLabel = "Hopp til innholdet", mainId, contained = false, className, children }) {
    const [open, setOpen] = import_react31.default.useState(false);
    const moreBtn = import_react31.default.useRef(null);
    const list = import_react31.default.useRef(null);
    const main = import_react31.default.useRef(null);
    const id = "s" + import_react31.default.useId().replace(/:/g, "");
    const listId = id + "-more";
    const contentId = mainId || id + "-main";
    const overflow = items.length > 5;
    const shown = overflow ? items.slice(0, 4) : items;
    const rest = overflow ? items.slice(4) : [];
    import_react31.default.useEffect(() => {
      if (!open) return;
      const first = list.current.querySelector("a,button");
      if (first) first.focus();
      const outside = (e) => {
        if (!list.current.contains(e.target) && !moreBtn.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", outside);
      return () => document.removeEventListener("mousedown", outside);
    }, [open]);
    const close = () => {
      setOpen(false);
      moreBtn.current.focus();
    };
    const entry = (it, cls, inner, after) => {
      const props = {
        className: cls,
        "aria-current": it.id === current ? "page" : void 0,
        onClick: (e) => {
          if (onNavigate) {
            if (!it.href) e.preventDefault();
            onNavigate(it.id, e);
          }
          if (after) after();
        }
      };
      return it.href ? /* @__PURE__ */ import_react31.default.createElement("a", { key: it.id, href: it.href, ...props }, inner) : /* @__PURE__ */ import_react31.default.createElement("button", { key: it.id, type: "button", ...props }, inner);
    };
    const tab = (it) => entry(it, "s-shell__tab", /* @__PURE__ */ import_react31.default.createElement(import_react31.default.Fragment, null, /* @__PURE__ */ import_react31.default.createElement("span", { className: "s-shell__pill" }, icon(it, 22)), /* @__PURE__ */ import_react31.default.createElement("span", { className: "s-shell__label" }, it.label)));
    return /* @__PURE__ */ import_react31.default.createElement("div", { className: cx30("s-shell", contained && "s-shell--contained", className) }, /* @__PURE__ */ import_react31.default.createElement("a", { className: "s-shell__skip", href: "#" + contentId, onClick: (e) => {
      e.preventDefault();
      main.current.focus();
    } }, skipLabel), contained ? null : /* @__PURE__ */ import_react31.default.createElement("nav", { className: "s-shell__side", "aria-label": label }, brand ? /* @__PURE__ */ import_react31.default.createElement("div", { className: "s-shell__brand" }, brand) : null, items.map((it) => entry(it, "s-shell__item", /* @__PURE__ */ import_react31.default.createElement(import_react31.default.Fragment, null, icon(it, 18), it.label))), footer ? /* @__PURE__ */ import_react31.default.createElement("div", { className: "s-shell__foot" }, footer) : null), /* @__PURE__ */ import_react31.default.createElement("main", { ref: main, id: contentId, tabIndex: -1, className: "s-shell__main" }, children), /* @__PURE__ */ import_react31.default.createElement("nav", { className: "s-shell__tabbar", "aria-label": label }, shown.map(tab), overflow ? /* @__PURE__ */ import_react31.default.createElement(import_react31.default.Fragment, null, /* @__PURE__ */ import_react31.default.createElement(
      "div",
      {
        ref: list,
        id: listId,
        className: "s-shell__more",
        hidden: !open,
        onKeyDown: (e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            close();
          }
        },
        onBlur: (e) => {
          if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget) && e.relatedTarget !== moreBtn.current) setOpen(false);
        }
      },
      rest.map((it) => entry(it, "s-shell__moreitem", /* @__PURE__ */ import_react31.default.createElement(import_react31.default.Fragment, null, icon(it, 20), it.label), close))
    ), /* @__PURE__ */ import_react31.default.createElement(
      "button",
      {
        ref: moreBtn,
        type: "button",
        className: cx30("s-shell__tab", rest.some((it) => it.id === current) && "is-current"),
        "aria-expanded": open,
        "aria-controls": listId,
        onClick: () => setOpen((o) => !o),
        onKeyDown: (e) => {
          if (e.key === "Escape" && open) {
            e.stopPropagation();
            setOpen(false);
          }
        }
      },
      /* @__PURE__ */ import_react31.default.createElement("span", { className: "s-shell__pill" }, /* @__PURE__ */ import_react31.default.createElement(Icon, { name: "ellipsis", size: 22 })),
      /* @__PURE__ */ import_react31.default.createElement("span", { className: "s-shell__label" }, moreLabel)
    )) : null));
  }

  // components/navigation/Link.jsx
  var import_react32 = __toESM(require_react(), 1);
  var cx31 = (...a) => a.filter(Boolean).join(" ");
  var NEW_TAB_REL = ["noopener", "noreferrer"];
  var Link = import_react32.default.forwardRef(function Link2({ as: El = "a", to, variant = "inline", external, newTabLabel = "(\xE5pner i ny fane)", target, rel, className, children, ...rest }, ref) {
    const newTab = target === "_blank";
    const ext = external === void 0 ? newTab : external;
    const safeRel = newTab ? NEW_TAB_REL.concat((rel ? rel.split(/\s+/) : []).filter((r) => r && !NEW_TAB_REL.includes(r))).join(" ") : rel;
    return /* @__PURE__ */ import_react32.default.createElement(El, { ref, className: cx31("s-link", variant !== "inline" && "s-link--" + variant, ext && "s-link--external", className), to: El === "a" ? void 0 : to, target, rel: safeRel, ...rest }, children, ext ? /* @__PURE__ */ import_react32.default.createElement(import_react32.default.Fragment, null, "\u2060", /* @__PURE__ */ import_react32.default.createElement(Icon, { name: "external-link", size: 14, className: "s-link__icon" })) : null, newTab ? /* @__PURE__ */ import_react32.default.createElement("span", { className: "s-sr-only" }, " " + newTabLabel) : null);
  });

  // components/navigation/BackLink.jsx
  var import_react33 = __toESM(require_react(), 1);
  var cx32 = (...a) => a.filter(Boolean).join(" ");
  var BackLink = import_react33.default.forwardRef(function BackLink2({ className, children = "Tilbake", ...rest }, ref) {
    return /* @__PURE__ */ import_react33.default.createElement(Link, { ref, variant: "standalone", className: cx32("s-backlink", className), ...rest }, /* @__PURE__ */ import_react33.default.createElement(Icon, { name: "chevron-left", size: 18, className: "s-backlink__icon" }), children);
  });

  // components/layout/Stack.jsx
  var import_react34 = __toESM(require_react(), 1);
  var cx33 = (...a) => a.filter(Boolean).join(" ");
  var ALIGN = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" };
  var JUSTIFY = { start: "flex-start", center: "center", end: "flex-end", between: "space-between" };
  function Stack({ as: El = "div", direction = "column", gap = 4, wrap = false, align, justify, className, style, children, ...rest }) {
    const role = El === "ul" || El === "ol" ? "list" : void 0;
    return /* @__PURE__ */ import_react34.default.createElement(El, { role, className: cx33("s-stack", direction === "row" && "s-stack--row", wrap && "s-stack--wrap", className), style: { "--s-stack-gap": `var(--space-${gap})`, alignItems: ALIGN[align], justifyContent: JUSTIFY[justify], ...style }, ...rest }, children);
  }

  // components/layout/VisuallyHidden.jsx
  var import_react35 = __toESM(require_react(), 1);
  var cx34 = (...a) => a.filter(Boolean).join(" ");
  function VisuallyHidden({ as: El = "span", focusable = false, className, children, ...rest }) {
    return /* @__PURE__ */ import_react35.default.createElement(El, { className: cx34("s-sr-only", focusable && "s-sr-only--focusable", className), ...rest }, children);
  }

  // components/utils/kunngjor.js
  var PAUSE = 100;
  var FORSTE = 500;
  var TOM = 7e3;
  var SKJULT = "position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0";
  var regioner = {};
  function erModal(el) {
    if (el.getAttribute("aria-modal") === "true") return true;
    try {
      return el.matches(":modal");
    } catch {
      return false;
    }
  }
  function synlig(el) {
    if (!el.isConnected || el.closest('[aria-hidden="true"]')) return false;
    return typeof el.checkVisibility === "function" ? el.checkVisibility() : el.getClientRects().length > 0;
  }
  function vert() {
    const modale = [...document.querySelectorAll('dialog[open], [aria-modal="true"]')].filter((el) => erModal(el) && synlig(el));
    return modale[modale.length - 1] || document.body;
  }
  function skriv(r) {
    const host = vert();
    if (!r.el.isConnected || r.el.parentNode !== host) {
      host.appendChild(r.el);
      r.el.textContent = "";
      r.sett = setTimeout(() => skriv(r), FORSTE);
      return;
    }
    r.el.textContent = r.ventende.join(" ");
    r.ventende = [];
    r.tom = setTimeout(() => {
      r.el.textContent = "";
    }, TOM);
  }
  function kunngjor(melding, { haster = false } = {}) {
    if (typeof document === "undefined" || !document.body) return;
    const tekst = String(melding ?? "").trim();
    if (!tekst) return;
    const art = haster ? "assertive" : "polite";
    let r = regioner[art];
    if (!r || r.el.ownerDocument !== document) {
      const el = document.createElement("div");
      el.setAttribute("role", haster ? "alert" : "status");
      el.setAttribute("aria-live", art);
      el.setAttribute("aria-atomic", "true");
      el.setAttribute("data-s-kunngjor", art);
      el.style.cssText = SKJULT;
      r = regioner[art] = { el, sett: 0, tom: 0, ventende: [] };
    }
    const host = vert();
    const ny = r.el.parentNode !== host;
    if (ny) host.appendChild(r.el);
    clearTimeout(r.sett);
    clearTimeout(r.tom);
    r.ventende.push(tekst);
    r.el.textContent = "";
    r.sett = setTimeout(() => skriv(r), ny ? FORSTE : PAUSE);
  }

  // components/utils/dato.js
  var LOCALE = { nb: "nb-NO", en: "en-GB" };
  var formatters = /* @__PURE__ */ new Map();
  var formatter = (lang, options) => {
    const key = lang + JSON.stringify(options);
    let f = formatters.get(key);
    if (!f) {
      f = new Intl.DateTimeFormat(LOCALE[lang] || LOCALE.nb, options);
      formatters.set(key, f);
    }
    return f;
  };
  var DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?)?$/;
  function tilDato(verdi) {
    if (verdi instanceof Date) return Number.isNaN(verdi.getTime()) ? null : new Date(verdi.getTime());
    if (typeof verdi === "number") {
      const d = new Date(verdi);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    if (typeof verdi !== "string") return null;
    const m = DATE_ONLY.exec(verdi.trim());
    if (m) {
      const [, y, mo, d, h = 0, mi = 0, s = 0, ms = 0] = m;
      if (+h > 23 || +mi > 59 || +s > 59) return null;
      const date2 = new Date(+y, +mo - 1, +d, +h, +mi, +s, +String(ms).padEnd(3, "0"));
      return date2.getFullYear() === +y && date2.getMonth() === +mo - 1 && date2.getDate() === +d ? date2 : null;
    }
    const date = new Date(verdi);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  var pad = (n) => String(n).padStart(2, "0");
  function tilIsoDato(verdi) {
    const d = tilDato(verdi);
    return d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : "";
  }
  var dagnummer = (d) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5;
  function erSammeDag(a, b) {
    const da = tilDato(a), db = tilDato(b);
    return !!da && !!db && dagnummer(da) === dagnummer(db);
  }
  function formatDato(verdi, { lang = "nb", stil = "kort", aar = true, naa } = {}) {
    const d = tilDato(verdi);
    if (!d) return "";
    const withYear = aar === "auto" ? d.getFullYear() !== (tilDato(naa) || /* @__PURE__ */ new Date()).getFullYear() : aar !== false;
    return formatter(lang, { day: "numeric", month: stil === "lang" ? "long" : "short", ...withYear ? { year: "numeric" } : {} }).format(d);
  }
  function formatTid(verdi, { lang = "nb" } = {}) {
    const d = tilDato(verdi);
    return d ? formatter(lang, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d) : "";
  }
  function formatDatoTid(verdi, valg = {}) {
    const d = tilDato(verdi);
    if (!d) return "";
    const lang = valg.lang || "nb";
    return formatDato(d, valg) + (lang === "en" ? ", " : " kl. ") + formatTid(d, { lang });
  }
  function formatRelativ(verdi, { lang = "nb", naa, ...rest } = {}) {
    const d = tilDato(verdi);
    if (!d) return "";
    const now = tilDato(naa) || /* @__PURE__ */ new Date();
    const diff = dagnummer(d) - dagnummer(now);
    if (diff >= -1 && diff <= 1) return new Intl.RelativeTimeFormat(LOCALE[lang] || LOCALE.nb, { numeric: "auto" }).format(diff, "day");
    return formatDato(d, { lang, aar: "auto", naa: now, ...rest });
  }
  function formatTidsrom(fra, til, { lang = "nb", dato = false, ...rest } = {}) {
    const a = tilDato(fra), b = tilDato(til);
    if (!a) return "";
    if (!b) return dato ? formatDatoTid(a, { lang, ...rest }) : formatTid(a, { lang });
    if (dagnummer(a) === dagnummer(b)) {
      const range = formatTid(a, { lang }) + "\u2013" + formatTid(b, { lang });
      return dato ? formatDato(a, { lang, ...rest }) + (lang === "en" ? ", " : " kl. ") + range : range;
    }
    return formatDatoTid(a, { lang, ...rest }) + " \u2013 " + formatDatoTid(b, { lang, ...rest });
  }

  // components/overlays/Dialog.jsx
  var import_react36 = __toESM(require_react(), 1);
  var import_react_dom = __toESM(require_react_dom(), 1);
  var cx35 = (...a) => a.filter(Boolean).join(" ");
  var FOCUSABLE2 = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
  var focusables = (el) => Array.from(el.querySelectorAll(FOCUSABLE2)).filter((n) => n.getClientRects().length > 0 && !n.closest(".s-popover__panel"));
  var belongs = (el, node) => {
    for (let n = node; n; ) {
      if (el.contains(n)) return true;
      const panel = n.closest(".s-popover__panel");
      if (!panel || !panel.id) return false;
      n = document.querySelector(`[aria-controls="${panel.id}"]`);
    }
    return false;
  };
  var OPEN = [];
  var innermost = (el) => OPEN[OPEN.length - 1] === el;
  function Dialog({ open = true, onClose, title, description, children, footer, size = "md", variant = "dialog", inline = false, portal = false, closeLabel = "Lukk", initialFocus, className, ...rest }) {
    const panel = import_react36.default.useRef(null);
    const uid = import_react36.default.useId();
    const titleId = uid + "-title";
    const descId = uid + "-desc";
    const closeRef = import_react36.default.useRef(onClose);
    closeRef.current = onClose;
    import_react36.default.useEffect(() => {
      if (!open) return;
      const el = panel.current;
      const opener = document.activeElement;
      OPEN.push(el);
      const body = el.querySelector(".s-dialog__body");
      const target = initialFocus && initialFocus.current || el.querySelector("[autofocus],[data-autofocus]") || body && focusables(body)[0] || el;
      target.focus();
      const keepInside = (e) => {
        if (innermost(el) && !belongs(el, e.target)) (focusables(el)[0] || el).focus();
      };
      document.addEventListener("focusin", keepInside);
      const prevOverflow = document.body.style.overflow;
      if (!inline) document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("focusin", keepInside);
        OPEN.splice(OPEN.indexOf(el), 1);
        if (!inline) document.body.style.overflow = prevOverflow;
        if (opener && opener.focus && document.contains(opener)) opener.focus();
      };
    }, [open, inline, portal]);
    const onKeyDown = (e) => {
      const el = panel.current;
      if (!innermost(el)) return;
      if (e.key === "Escape" && closeRef.current) {
        e.stopPropagation();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables(el);
      if (!list.length) {
        e.preventDefault();
        el.focus();
        return;
      }
      const first = list[0], last = list[list.length - 1], cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === el)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && cur === last) {
        e.preventDefault();
        first.focus();
      }
    };
    if (!open) return null;
    const sheet = variant === "sheet";
    const node = /* @__PURE__ */ import_react36.default.createElement("div", { className: cx35("s-dialog-scrim", inline && "s-dialog-scrim--inline", sheet && "s-dialog-scrim--sheet"), onMouseDown: (e) => {
      if (e.target === e.currentTarget && onClose) {
        e.preventDefault();
        onClose();
      }
    } }, /* @__PURE__ */ import_react36.default.createElement("div", { ref: panel, role: "dialog", "aria-modal": "true", "aria-labelledby": title ? titleId : void 0, "aria-describedby": description ? descId : void 0, tabIndex: -1, onKeyDown, className: cx35("s-dialog", size === "lg" && "s-dialog--lg", sheet && "s-dialog--sheet", className), ...rest }, sheet ? /* @__PURE__ */ import_react36.default.createElement("div", { className: "s-dialog__handle", "aria-hidden": "true" }) : null, /* @__PURE__ */ import_react36.default.createElement("div", { className: "s-dialog__head" }, /* @__PURE__ */ import_react36.default.createElement("div", { style: { flex: 1, minWidth: 0 } }, title ? /* @__PURE__ */ import_react36.default.createElement("h2", { id: titleId, className: "s-dialog__title" }, title) : null, description ? /* @__PURE__ */ import_react36.default.createElement("p", { id: descId, className: "s-dialog__desc" }, description) : null), onClose ? /* @__PURE__ */ import_react36.default.createElement(IconButton, { icon: "x", label: closeLabel, size: "sm", onClick: onClose, style: { margin: "-4px -6px 0 0" } }) : null), children ? /* @__PURE__ */ import_react36.default.createElement("div", { className: "s-dialog__body" }, children) : null, footer ? /* @__PURE__ */ import_react36.default.createElement("div", { className: "s-dialog__foot" }, footer) : null));
    return portal && !inline && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(node, document.body) : node;
  }

  // components/overlays/Tooltip.jsx
  var import_react37 = __toESM(require_react(), 1);
  var cx36 = (...a) => a.filter(Boolean).join(" ");
  function Tooltip({ content, kbd, side = "top", open = false, children, className, id, ...rest }) {
    const auto = "s" + import_react37.default.useId().replace(/:/g, "");
    const tipId = id || auto + "-tip";
    const [hover, setHover] = import_react37.default.useState(false);
    const [focus, setFocus] = import_react37.default.useState(false);
    const [dismissed, setDismissed] = import_react37.default.useState(false);
    const active = hover || focus;
    import_react37.default.useEffect(() => {
      if (!active) return void 0;
      const onKey = (e) => {
        if (e.key === "Escape") setDismissed(true);
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [active]);
    const on = (set) => () => {
      set(true);
      setDismissed(false);
    };
    const off = (set) => (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) set(false);
    };
    const trigger = import_react37.default.isValidElement(children) ? import_react37.default.cloneElement(children, {
      title: void 0,
      "aria-describedby": [children.props["aria-describedby"], tipId].filter(Boolean).join(" ")
    }) : children;
    return /* @__PURE__ */ import_react37.default.createElement(
      "span",
      {
        className: cx36("s-tip", side === "bottom" && "s-tip--bottom", open && "s-tip--open", dismissed && !open && "s-tip--dismissed", className),
        onMouseEnter: on(setHover),
        onMouseLeave: off(setHover),
        onFocus: on(setFocus),
        onBlur: off(setFocus),
        ...rest
      },
      trigger,
      /* @__PURE__ */ import_react37.default.createElement("span", { id: tipId, role: "tooltip", className: "s-tip__bubble" }, content, kbd ? /* @__PURE__ */ import_react37.default.createElement("span", { className: "s-tip__kbd" }, kbd) : null)
    );
  }

  // components/overlays/Popover.jsx
  var import_react38 = __toESM(require_react(), 1);
  var import_react_dom2 = __toESM(require_react_dom(), 1);
  var cx37 = (...a) => a.filter(Boolean).join(" ");
  var FOCUSABLE3 = 'a[href]:not([tabindex="-1"]),button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';
  var focusables2 = (el) => Array.from(el.querySelectorAll(FOCUSABLE3)).filter((n) => n.getClientRects().length > 0 && n.getAttribute("tabindex") !== "-1");
  var GAP = 6;
  var PAD = 8;
  function placePopover(trigger, panel, viewport, { side = "bottom", align = "start" } = {}) {
    const below = viewport.height - trigger.bottom - GAP, above = trigger.top - GAP;
    let s = side;
    if (s === "bottom" && panel.height > below && above > below) s = "top";
    else if (s === "top" && panel.height > above && below > above) s = "bottom";
    let y = s === "bottom" ? trigger.bottom + GAP : trigger.top - GAP - panel.height;
    let x = align === "end" ? trigger.right - panel.width : trigger.left;
    x = Math.max(PAD, Math.min(x, viewport.width - PAD - panel.width));
    y = Math.max(PAD, Math.min(y, viewport.height - PAD - panel.height));
    return { side: s, x, y };
  }
  var useIsoLayoutEffect = typeof window === "undefined" ? import_react38.default.useEffect : import_react38.default.useLayoutEffect;
  var dev = typeof process === "undefined" || !process.env || true;
  var canTrigger = (trigger) => import_react38.default.isValidElement(trigger) && trigger.type !== import_react38.default.Fragment;
  var warnTrigger = (name, trigger) => {
    if (dev && typeof console !== "undefined") console.warn(`${name}: trigger must be one element that takes a ref, such as a Button or an IconButton; got ${trigger == null ? String(trigger) : typeof trigger === "string" ? "a string" : trigger.type === import_react38.default.Fragment ? "a fragment" : typeof trigger}.`);
  };
  var setRef = (ref, el) => {
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };
  var elementRef = (el) => "ref" in el.props ? el.props.ref : Number(import_react38.default.version.split(".")[0]) >= 19 ? null : el.ref;
  function Popover({ open: openProp, defaultOpen = false, onOpenChange, trigger, children, side = "bottom", align = "start", portal = false, autoFocus = true, panelRef, className, id, style, onKeyDown, ...rest }) {
    const [openState, setOpenState] = import_react38.default.useState(defaultOpen);
    const controlled = openProp !== void 0;
    const open = controlled ? openProp : openState;
    const triggerRef = import_react38.default.useRef(null);
    const panel = import_react38.default.useRef(null);
    const wrap = import_react38.default.useRef(null);
    const [pos, setPos] = import_react38.default.useState(null);
    const uid = "s" + import_react38.default.useId().replace(/:/g, "");
    const panelId2 = id || uid + "-panel";
    const change = import_react38.default.useRef(onOpenChange);
    change.current = onOpenChange;
    const setOpen = import_react38.default.useCallback((next, reason) => {
      if (!controlled) setOpenState(next);
      if (change.current) change.current(next, reason);
    }, [controlled]);
    const close = import_react38.default.useCallback((reason, focusTrigger) => {
      if (focusTrigger && triggerRef.current) triggerRef.current.focus();
      setOpen(false, reason);
    }, [setOpen]);
    useIsoLayoutEffect(() => {
      if (!open) {
        setPos(null);
        return void 0;
      }
      const place = () => {
        const t = triggerRef.current, p = panel.current;
        if (!t || !p) return;
        const r = placePopover(t.getBoundingClientRect(), p.getBoundingClientRect(), { width: window.innerWidth, height: window.innerHeight }, { side, align });
        if (!portal) {
          const w = wrap.current.getBoundingClientRect();
          r.x -= w.left;
          r.y -= w.top;
        }
        p.style.left = r.x + "px";
        p.style.top = r.y + "px";
        setPos((old) => old && old.x === r.x && old.y === r.y && old.side === r.side ? old : r);
      };
      place();
      if (autoFocus && panel.current && !panel.current.contains(document.activeElement)) (focusables2(panel.current)[0] || panel.current).focus();
      window.addEventListener("resize", place);
      document.addEventListener("scroll", place, true);
      return () => {
        window.removeEventListener("resize", place);
        document.removeEventListener("scroll", place, true);
      };
    }, [open, side, align, portal]);
    import_react38.default.useEffect(() => {
      if (!open) return void 0;
      const el = panel.current;
      const outside = (e) => {
        if (!el.contains(e.target) && !(triggerRef.current && triggerRef.current.contains(e.target))) close("outside", false);
      };
      document.addEventListener("pointerdown", outside);
      return () => document.removeEventListener("pointerdown", outside);
    }, [open, close]);
    const onPanelKeyDown = (e) => {
      if (onKeyDown) onKeyDown(e);
      if (e.defaultPrevented) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        e.preventDefault();
        close("escape", true);
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables2(panel.current);
      const cur = document.activeElement;
      const atEdge = !list.length || (e.shiftKey ? cur === list[0] || cur === panel.current : cur === list[list.length - 1] || cur === panel.current);
      if (atEdge) close("tab", true);
    };
    const onBlur = (e) => {
      const to = e.relatedTarget;
      if (open && to && !panel.current.contains(to) && !(triggerRef.current && triggerRef.current.contains(to))) close("blur", false);
    };
    const ok = canTrigger(trigger);
    import_react38.default.useEffect(() => {
      if (!ok) warnTrigger("Popover", trigger);
    }, [ok]);
    const tr = ok ? import_react38.default.cloneElement(trigger, {
      ref: (el) => {
        triggerRef.current = el;
        setRef(elementRef(trigger), el);
      },
      "aria-expanded": open,
      "aria-controls": open ? panelId2 : void 0,
      onClick: (e) => {
        if (trigger.props.onClick) trigger.props.onClick(e);
        if (!e.defaultPrevented) setOpen(!open, "trigger");
      },
      onKeyDown: (e) => {
        if (trigger.props.onKeyDown) trigger.props.onKeyDown(e);
        if (!e.defaultPrevented && e.key === "Escape" && open) {
          e.stopPropagation();
          e.preventDefault();
          close("escape", true);
        }
      }
    }) : trigger;
    const node = open ? /* @__PURE__ */ import_react38.default.createElement(
      "div",
      {
        ref: (el) => {
          panel.current = el;
          setRef(panelRef, el);
        },
        id: panelId2,
        tabIndex: -1,
        onKeyDown: onPanelKeyDown,
        className: cx37("s-popover__panel", portal && "s-popover__panel--portal", pos && pos.side === "top" && "s-popover__panel--top", className),
        style: { ...style, left: pos ? pos.x : 0, top: pos ? pos.y : 0 },
        ...rest
      },
      children
    ) : null;
    const usePortal = portal && typeof document !== "undefined";
    return /* @__PURE__ */ import_react38.default.createElement("span", { ref: wrap, className: "s-popover", onBlur }, tr, usePortal ? (0, import_react_dom2.createPortal)(node, document.body) : node);
  }

  // components/overlays/Menu.jsx
  var import_react39 = __toESM(require_react(), 1);
  var cx38 = (...a) => a.filter(Boolean).join(" ");
  var ITEMS = '[role="menuitem"],[role="menuitemcheckbox"]';
  var enabled = (el) => Array.from(el.querySelectorAll(ITEMS)).filter((n) => n.getAttribute("aria-disabled") !== "true");
  var text = (n) => (n.textContent || "").trim().toLowerCase();
  var isSep = (it) => it === "-" || it && it.separator;
  var isGroup = (it) => it && Array.isArray(it.items);
  function Menu({ trigger, items = [], label, triggerLabel = "Flere valg", onSelect, open: openProp, defaultOpen = false, onOpenChange, side, align = "start", portal = false, className, ...rest }) {
    const [openState, setOpenState] = import_react39.default.useState(defaultOpen);
    const controlled = openProp !== void 0;
    const open = controlled ? openProp : openState;
    const uid = "s" + import_react39.default.useId().replace(/:/g, "");
    const panel = import_react39.default.useRef(null);
    const triggerRef = import_react39.default.useRef(null);
    const start = import_react39.default.useRef("first");
    const change = import_react39.default.useRef(onOpenChange);
    change.current = onOpenChange;
    const setOpen = (next, reason) => {
      if (!controlled) setOpenState(next);
      if (change.current) change.current(next, reason);
    };
    const openAt = (where) => {
      start.current = where;
      setOpen(true, "keyboard");
    };
    import_react39.default.useEffect(() => {
      if (!open || !panel.current) return;
      const list = enabled(panel.current);
      const el = start.current === "last" ? list[list.length - 1] : list[0];
      (el || panel.current).focus();
      start.current = "first";
    }, [open]);
    const move = (e, pick) => {
      const list = enabled(panel.current);
      if (!list.length) return;
      const i = list.indexOf(document.activeElement);
      const next = pick(list, i);
      if (next) {
        e.preventDefault();
        next.focus();
      }
    };
    const onKeyDown = (e) => {
      const { key } = e;
      if (key === "ArrowDown") move(e, (l, i) => l[(i + 1) % l.length]);
      else if (key === "ArrowUp") move(e, (l, i) => l[(i - 1 + l.length) % l.length]);
      else if (key === "Home") move(e, (l) => l[0]);
      else if (key === "End") move(e, (l) => l[l.length - 1]);
      else if (key === "Enter" || key === " ") {
        const t = e.target.closest(ITEMS);
        if (t) {
          e.preventDefault();
          t.click();
        }
      } else if (key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey && key !== " ") {
        const c = key.toLowerCase();
        move(e, (l, i) => l.slice(i + 1).concat(l.slice(0, i + 1)).find((n) => text(n).startsWith(c)));
      }
    };
    const choose = (it, e) => {
      if (it.disabled) {
        e.preventDefault();
        return;
      }
      if (it.onSelect) it.onSelect(it.id, e);
      if (onSelect) onSelect(it.id, it, e);
      if (triggerRef.current) triggerRef.current.focus();
      setOpen(false, "select");
    };
    const item = (it, i) => {
      if (isSep(it)) return /* @__PURE__ */ import_react39.default.createElement("div", { key: "sep" + i, role: "separator", className: "s-menu__sep" });
      if (isGroup(it)) {
        const gid = uid + "-g" + i;
        return /* @__PURE__ */ import_react39.default.createElement("div", { key: "g" + i, role: "group", "aria-labelledby": gid }, /* @__PURE__ */ import_react39.default.createElement("div", { id: gid, className: "s-menu__group" }, it.label), it.items.map(item));
      }
      const check = typeof it.checked === "boolean";
      const props = {
        role: check ? "menuitemcheckbox" : "menuitem",
        tabIndex: -1,
        "aria-checked": check ? it.checked : void 0,
        "aria-disabled": it.disabled || void 0,
        className: cx38("s-menu__item", it.danger && "s-menu__item--danger", it.className),
        onClick: (e) => choose(it, e)
      };
      const inner = /* @__PURE__ */ import_react39.default.createElement(import_react39.default.Fragment, null, it.icon ? /* @__PURE__ */ import_react39.default.createElement("span", { className: "s-menu__icon" }, typeof it.icon === "string" ? /* @__PURE__ */ import_react39.default.createElement(Icon, { name: it.icon, size: 18 }) : it.icon) : null, /* @__PURE__ */ import_react39.default.createElement("span", { className: "s-menu__label" }, it.label), check ? /* @__PURE__ */ import_react39.default.createElement(Icon, { name: "check", size: 16, className: "s-menu__check" }) : null);
      const key = it.id || "i" + i;
      return it.href && !it.disabled ? /* @__PURE__ */ import_react39.default.createElement("a", { key, href: it.href, ...props }, inner) : /* @__PURE__ */ import_react39.default.createElement("button", { key, type: "button", ...props }, inner);
    };
    const ok = trigger === void 0 || canTrigger(trigger);
    import_react39.default.useEffect(() => {
      if (!ok) warnTrigger("Menu", trigger);
    }, [ok]);
    const base = ok && trigger !== void 0 ? trigger : /* @__PURE__ */ import_react39.default.createElement(IconButton, { icon: "ellipsis", label: triggerLabel });
    const triggerId = base.props.id || uid + "-btn";
    const tr = import_react39.default.cloneElement(base, {
      id: triggerId,
      "aria-haspopup": "menu",
      ref: (el) => {
        triggerRef.current = el;
        const r = elementRef(base);
        if (typeof r === "function") r(el);
        else if (r) r.current = el;
      },
      onKeyDown: (e) => {
        if (base.props.onKeyDown) base.props.onKeyDown(e);
        if (e.defaultPrevented) return;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          openAt("first");
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          openAt("last");
        }
      }
    });
    return /* @__PURE__ */ import_react39.default.createElement(
      Popover,
      {
        trigger: tr,
        open,
        onOpenChange: setOpen,
        side,
        align,
        portal,
        autoFocus: false,
        panelRef: panel,
        role: "menu",
        "aria-labelledby": label ? void 0 : triggerId,
        "aria-label": label,
        onKeyDown,
        className: cx38("s-menu", className),
        ...rest
      },
      items.map(item)
    );
  }

  // components/mascot/Sussi.jsx
  var import_react40 = __toESM(require_react(), 1);
  var INK = "var(--sussi-ink,#1F1D1B)";
  var FUR = "var(--sussi-fur,#FFFFFF)";
  var PINK = "var(--sussi-pink,#E9A3A0)";
  var EYE = "var(--sussi-eye,#6E6C3A)";
  function eye(cx39, cy, dir, id) {
    const cid = id + (dir > 0 ? "L" : "R");
    return `<clipPath id="${cid}"><path d="M${cx39 - 5.4} ${cy - 0.6} Q${cx39} ${cy - 2.1} ${cx39 + 5.4} ${cy - 0.6} L${cx39 + 5.4} ${cy + 5} L${cx39 - 5.4} ${cy + 5}Z"/></clipPath><g clip-path="url(#${cid})"><ellipse cx="${cx39}" cy="${cy}" rx="4.8" ry="3.2" fill="${EYE}"/><circle cx="${cx39}" cy="${cy - 0.2}" r="2.6" fill="${INK}"/><circle cx="${cx39 - 0.9}" cy="${cy - 0.6}" r=".65" fill="${FUR}" opacity=".9"/></g>`;
  }
  var HEAD_OUTLINE = "M32 17.5 C44.5 17.5 53.5 24 55.5 33.5 C57.2 37.5 56.8 42 54 45.5 C50 51.2 42 54.2 32 54.2 C22 54.2 14 51.2 10 45.5 C7.2 42 6.8 37.5 8.5 33.5 C10.5 24 19.5 17.5 32 17.5Z";
  function head(k) {
    const id = "__ID__h" + k;
    return `<defs><clipPath id="${id}"><path d="${HEAD_OUTLINE}"/></clipPath></defs><path d="M10.6 28.5 C10.2 21.5 11.2 15.4 13.8 11.4 C17.6 12.8 21.6 15.6 24.6 19Z M53.4 28.5 C53.8 21.5 52.8 15.4 50.2 11.4 C46.4 12.8 42.4 15.6 39.4 19Z" fill="${INK}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><path d="${HEAD_OUTLINE}" fill="${FUR}"/><g clip-path="url(#${id})"><path d="M4 14 L30.2 14 C29.4 20 27.4 26 25 31 C23.6 33.6 22.6 35.6 21 37.4 C18 39.8 14.6 40.2 11 39.6 L4 38.8Z M60 14 L33.8 14 C34.6 20 36.6 26 39 31 C40.4 33.6 41.6 35.2 43.4 36.6 C46 38.2 49.6 38.2 53 37.2 L60 36.2Z" fill="${INK}"/></g><path d="${HEAD_OUTLINE}" fill="none" stroke="${INK}" stroke-width="2.2"/>` + eye(19.8, 35, 1, id) + eye(44.4, 34.6, -1, id) + `<path d="M29.8 40.6 Q32 39.6 34.2 40.6 Q33.8 42.6 32 43.6 Q30.2 42.6 29.8 40.6Z" fill="${PINK}"/><path d="M32 43.6 Q31 46.4 28.4 45.8 M32 43.6 Q33 46.4 35.6 45.8" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>`;
  }
  var headAt = (x, y, s, k, rot = 0) => `<g transform="${rot ? `rotate(${rot} ${x} ${y}) ` : ""}translate(${x - 32 * s} ${y - 34 * s}) scale(${s})">${head(k)}</g>`;
  var paw = (cx39, cy, rx = 6, ry = 3.5) => `<ellipse cx="${cx39}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${FUR}" stroke="${INK}" stroke-width="2"/><circle cx="${cx39 - rx + 1.6}" cy="${cy}" r="1" fill="${PINK}"/>`;
  var clipped = (id, body, patches) => `<defs><clipPath id="__ID__${id}"><path d="${body}"/></clipPath></defs><path d="${body}" fill="${FUR}"/><g clip-path="url(#__ID__${id})"><path d="${patches}" fill="${INK}"/></g><path d="${body}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>`;
  var LIGGER_BODY = "M11 51.5 C10 45 14 39 22 35.5 C28 32.5 33 31 38 31 C50.5 30.5 58.5 36 59.5 44.5 C60 48.5 58.5 51.5 55.5 51.5Z";
  var SOVER_BODY = "M8 44 C6 30 17 18 32 18 C47 18 58 28 57 41 C56.5 48 51 52 44 52 L16 52 C11 52 8.6 49 8 44Z";
  var SITTER_BODY = "M18 58 C11 47 14 32 32 30 C50 32 53 47 46 58Z";
  var sussiPoses = {
    hode: () => head("a"),
    ligger: () => clipped("b", LIGGER_BODY, "M31 28 C35 27.5 40 27.5 43.5 28.5 C44.5 34 42.5 39.5 38 41.5 C34 42.5 31.5 38.5 31 28Z M49.5 29 C54 29.5 59 33 62 38.5 C58.5 42.5 53 42 51 38.5 C49.8 36 49.2 32 49.5 29Z") + `<path d="M58 45.5 C62.5 42 62 35.5 58.5 32.5" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` + paw(14.5, 52.2) + paw(24.5, 52.6) + headAt(19, 31, 0.56, "b"),
    titter: () => `<defs><clipPath id="__ID__t"><rect x="0" y="0" width="64" height="47"/></clipPath></defs><g clip-path="url(#__ID__t)"><g transform="translate(0 3.5)">${head("t")}</g></g><path d="M3 47 L61 47" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>` + paw(20, 45.4, 5.4, 3) + paw(44, 45.4, 5.4, 3),
    sover: () => `<path d="M10 47 C12 55 26 57.5 35 55" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>` + clipped("s", SOVER_BODY, "M20 15 C24 14 28.5 14 31.5 14.8 C32 22.5 30 30 25.5 35 C22 30.5 20.5 23 20 15Z") + paw(52, 53, 6.5, 3.4) + headAt(43, 40, 0.54, "s", -12),
    strekk: () => `<path d="M54.5 30 C60 26.5 61.5 20 58.5 15.5" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M22 39 L17 49" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M22 39 L17 49" stroke="${FUR}" stroke-width="3.6" stroke-linecap="round"/><circle cx="17" cy="49" r="1.2" fill="${PINK}"/><path d="M28 40.5 L27 51" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M28 40.5 L27 51" stroke="${FUR}" stroke-width="3.6" stroke-linecap="round"/><circle cx="27" cy="51" r="1.2" fill="${PINK}"/><path d="M44 40 L51 49" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M44 40 L51 49" stroke="${FUR}" stroke-width="3.6" stroke-linecap="round"/><circle cx="51" cy="49" r="1.2" fill="${PINK}"/><path d="M50 37.5 L58 44" stroke="${INK}" stroke-width="6.4" stroke-linecap="round"/><path d="M50 37.5 L58 44" stroke="${FUR}" stroke-width="3.6" stroke-linecap="round"/><circle cx="58" cy="44" r="1.2" fill="${PINK}"/><path d="M17 30 C19 22.5 30 20.5 42 22 C52 23.5 57 28 56 34 C55 40 48 42.2 40 41.8 L25 41.4 C19 41 16 36 17 30Z" fill="${FUR}" stroke="${INK}" stroke-width="2.3" stroke-linejoin="round"/><path d="M26 21.7 C30 20.6 36 20.8 39.5 22 C38.5 27.5 34 30 29 29 C26.5 28 25.5 24.5 26 21.7Z" fill="${INK}"/><path d="M46 23.2 C50.5 23.8 54 26 55.2 28.6 C52 31.8 47.5 31 45.6 28.2Z" fill="${INK}"/><circle cx="12.5" cy="34.5" r="9" fill="${FUR}" stroke="${INK}" stroke-width="2.3"/><path d="M5.5 29.5 L2 21.5 L10.5 26Z M11 25.6 L10.5 17 L17.5 25.2Z" fill="${INK}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><path d="M4.6 31.5 C6 27 10 25.4 14 25.6 C18 26 21 29 21.3 32.5 C19 34.2 16.5 33.6 15 31.5 L12.6 27.6 L10.2 31.8 C8.5 33.4 6 33.2 4.6 31.5Z" fill="${INK}"/><path d="M8 34.2 Q10.3 36 12.6 34.2" fill="none" stroke="${FUR}" stroke-width="1.8" stroke-linecap="round"/><path d="M4.4 38 L7.4 37.4 L6.4 40.2Z" fill="${PINK}" stroke="${PINK}" stroke-width="1.1" stroke-linejoin="round"/>`,
    sitter: () => `<path d="M46 52 C56 51 58 59 49 61 C42 62 34 61 28 58" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>` + clipped("i", SITTER_BODY, "M40 36 C46 35 51 40 50.5 47 C46 48.5 41 44 40 36Z") + paw(26, 58.4, 5, 3) + paw(38, 58.4, 5, 3) + headAt(32, 19, 0.56, "i")
  };
  var sussiPoseNames = Object.keys(sussiPoses);
  var esc2 = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function Sussi({ pose = "hode", size = 48, title, className, ...rest }) {
    const uid = import_react40.default.useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const inner = (title ? "<title>" + esc2(title) + "</title>" : "") + (sussiPoses[pose] || sussiPoses.hode)().split("__ID__").join("s" + uid + "_");
    return /* @__PURE__ */ import_react40.default.createElement(
      "svg",
      {
        className: ["s-sussi", className].filter(Boolean).join(" "),
        width: size,
        height: size,
        viewBox: "0 0 64 64",
        role: title ? "img" : void 0,
        "aria-hidden": title ? void 0 : true,
        ...rest,
        dangerouslySetInnerHTML: { __html: inner }
      }
    );
  }
  return __toCommonJS(index_exports);
})();
