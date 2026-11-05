import React from 'react';
import { Icon } from '../icon/Icon.jsx';
const cx = (...a) => a.filter(Boolean).join(' ');

// Tab and panel ids come from one base id, so a TabPanel can point back at its tab.
const tabId = (base, v) => base + '-tab-' + v;
const panelId = (base, v) => base + '-panel-' + v;
const TabsContext = React.createContext(null);

// Keyboard follows the WAI-ARIA tabs pattern: only the selected tab is in the Tab order
// (roving tabindex), ←/→ move to the previous/next tab and select it, Home/End jump to the ends.
// TabPanels passed as children are wired to their tab with aria-controls and aria-labelledby.
export function Tabs({ items = [], value, defaultValue, onChange, variant = 'underline', id, children, className, style, ...rest }) {
  const [inner, setInner] = React.useState(defaultValue ?? (items[0] && items[0].id));
  const auto = 's' + React.useId().replace(/:/g, '');
  const base = id || auto;
  const cur = value ?? inner;
  const refs = React.useRef([]);
  const pick = (v) => { if (value === undefined) setInner(v); onChange && onChange(v); };
  const panels = new Set();
  React.Children.forEach(children, (c) => { if (c && c.type === TabPanel) panels.add(c.props.value); });
  const focusable = items.some((t) => t.id === cur) ? cur : items[0] && items[0].id;
  const onKeyDown = (e) => {
    const i = items.findIndex((t) => t.id === e.currentTarget.dataset.value);
    const last = items.length - 1;
    const to = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    refs.current[to] && refs.current[to].focus();
    pick(items[to].id);
  };
  return (
    <TabsContext.Provider value={{ base, cur }}>
      <div role="tablist" className={cx('s-tabs', variant === 'segmented' && 's-tabs--segmented', className)} style={style} {...rest}>
        {items.map((t, i) => (
          <button key={t.id} ref={(el) => { refs.current[i] = el; }} id={tabId(base, t.id)} data-value={t.id} role="tab" type="button"
            aria-selected={cur === t.id} aria-controls={panels.has(t.id) ? panelId(base, t.id) : undefined}
            tabIndex={t.id === focusable ? 0 : -1} className="s-tab" onClick={() => pick(t.id)} onKeyDown={onKeyDown}>
            {t.icon ? <Icon name={t.icon} size={16} /> : null}
            {t.label}
            {t.count !== undefined ? <span className="s-tab__count">{t.count}</span> : null}
          </button>
        ))}
      </div>
      {children}
    </TabsContext.Provider>
  );
}

// The content for one tab. Render it as a child of Tabs; the others stay mounted but hidden, so form state survives.
// The panel itself is focusable, so Tab from the tab list lands in the content even when it has no links.
export function TabPanel({ value, children, className, style, ...rest }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) return null;
  const selected = ctx.cur === value;
  return (
    <div role="tabpanel" id={panelId(ctx.base, value)} aria-labelledby={tabId(ctx.base, value)} tabIndex={0} hidden={!selected}
      className={cx('s-tabpanel', className)} style={style} {...rest}>
      {children}
    </div>
  );
}
