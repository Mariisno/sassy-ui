import * as React from 'react';
/** Lucide icon (stroke-based, 24×24 grid) rendered inline so it inherits currentColor. */
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Lucide icon name, e.g. "house", "check", "chevron-down", "leaf". See dist/icon/iconData.js for the full shipped set. */
  name: string;
  /** Pixel size. 16 in dense UI, 18 default, 20–24 for standalone. */
  size?: number;
  /** Stroke width. Sassy default is 1.75 (softer than Lucide's 2). */
  strokeWidth?: number;
  /** Accessible label. Omit for decorative icons. */
  title?: string;
}
export declare function Icon(props: IconProps): React.JSX.Element | null;
