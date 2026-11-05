import * as React from 'react';
export type SussiPose = 'hode' | 'ligger' | 'titter' | 'sover' | 'strekk' | 'sitter';
/**
 * Sussi, the mascot (the designer's cat). A white cat with black ears, mask, back patches and tail, and a pink nose.
 * Always black and white, whatever the app accent. Dark mode adds a thin light halo.
 * Poses: hode (logo, favicon, avatar), ligger, titter (empty states), sover (loading), strekk (play, 404), sitter (welcome).
 * @startingPoint section="Brand" subtitle="Sussi the mascot — six poses" viewport="700x220"
 */
export interface SussiProps extends Omit<React.SVGProps<SVGSVGElement>, 'dangerouslySetInnerHTML'> {
  pose?: SussiPose;
  /** Square size in px. `hode` reads down to 16; use 32+ for a full body. */
  size?: number;
  /** Accessible name. Omit when she is decorative (the usual case next to text). */
  title?: string;
}
export declare function Sussi(props: SussiProps): React.JSX.Element;
/** SVG markup per pose, with "__ID__" where a unique id goes. For favicons and static exports. */
export declare const sussiPoses: Record<SussiPose, () => string>;
export declare const sussiPoseNames: SussiPose[];
