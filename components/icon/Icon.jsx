import React from 'react';
import { iconData } from './iconData.js';

// The title goes into raw SVG markup, so it is escaped: an app may pass user text (a project name).
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function Icon({ name, size = 18, strokeWidth = 1.75, className, style, title, ...rest }) {
  const inner = iconData[name];
  if (!inner) return null;
  return (
    <svg className={['s-icon', className].filter(Boolean).join(' ')} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} style={style} {...rest} dangerouslySetInnerHTML={{ __html: (title ? '<title>' + esc(title) + '</title>' : '') + inner }} />
  );
}
