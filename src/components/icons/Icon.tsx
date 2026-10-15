import { ICON_PATHS, ICON_VIEWBOX, type IconName } from "./paths";

type Props = {
  name: IconName;
  size?: number | string;
  className?: string;
  /** Provide a label only when the icon carries meaning on its own. */
  label?: string;
};

/** Flaticon UIcons (Regular Straight), rendered inline in currentColor. */
export function Icon({ name, size = "1em", className, label }: Props) {
  return (
    <svg
      viewBox={ICON_VIEWBOX}
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
