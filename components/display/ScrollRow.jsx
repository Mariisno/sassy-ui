import React from 'react';
const cx = (...a) => a.filter(Boolean).join(' ');

// Is there more to see to the left or right? One pixel of slack for rounding on high-density screens.
// Only an element that can scroll fades; otherwise a negative margin would make the mask clip the ends.
export function scrollEdges({ scrollLeft, clientWidth, scrollWidth, overflowX = 'auto' }) {
  if (overflowX !== 'auto' && overflowX !== 'scroll') return { start: false, end: false };
  return { start: scrollLeft > 1, end: scrollLeft + clientWidth < scrollWidth - 1 };
}

// A horizontal row that scrolls without a scrollbar and fades at the edge where there is more to see,
// so it is clear something is cut off. With a label it is a named region that takes keyboard focus,
// so the arrow keys scroll it when the content itself has nothing to focus.
export function ScrollRow({ label, className, children, ...rest }) {
  const ref = React.useRef(null);
  const [edge, setEdge] = React.useState({ start: false, end: false });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setEdge((was) => {
      const now = scrollEdges({ scrollLeft: Math.abs(el.scrollLeft), clientWidth: el.clientWidth, scrollWidth: el.scrollWidth, overflowX: getComputedStyle(el).overflowX });
      return now.start === was.start && now.end === was.end ? was : now;
    });
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (ro) { ro.observe(el); if (el.firstElementChild) ro.observe(el.firstElementChild); }
    return () => { el.removeEventListener('scroll', measure); if (ro) ro.disconnect(); };
  }, []);
  const region = label ? { role: 'region', 'aria-label': label, tabIndex: 0 } : {};
  return (
    <div ref={ref} className={cx('s-scrollrow', className)} data-fade-start={edge.start || undefined} data-fade-end={edge.end || undefined} {...region} {...rest}>
      {children}
    </div>
  );
}
