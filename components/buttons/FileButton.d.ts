import * as React from 'react';
/**
 * A Button that opens the file chooser. Looks exactly like Button (same variants and sizes), but renders a
 * <label class="s-btn"> around a visually hidden <input type="file">, so the input keeps keyboard focus and
 * the label shows the focus ring. No built-in text: the label is the children ("Ta bilde", "Velg fil").
 * @startingPoint section="Actions" subtitle="A button that opens the file chooser" viewport="700x300"
 */
export interface FileButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'value' | 'children'> {
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name shown before the label (e.g. "image", "upload") */
  iconLeft?: string;
  /** Lucide icon name shown after the label */
  iconRight?: string;
  fullWidth?: boolean;
  /** What the chooser offers, e.g. "image/*" or ".json,application/json" */
  accept?: string;
  /** On phones: open the camera instead of the library. "environment" is the back camera, "user" the front. */
  capture?: 'user' | 'environment';
  multiple?: boolean;
  disabled?: boolean;
  /** The files picked, never empty. The input is reset after each pick, so picking the same file again calls this again. */
  onFiles?: (files: File[]) => void;
  /** Reaches the label, not the input */
  className?: string;
  /** Reaches the label, not the input */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
/** The ref reaches the native <input type="file">, so an app can open the chooser itself (`ref.current.click()`). */
export declare const FileButton: React.ForwardRefExoticComponent<FileButtonProps & React.RefAttributes<HTMLInputElement>>;
