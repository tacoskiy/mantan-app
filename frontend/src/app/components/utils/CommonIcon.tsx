"use client";

import { ReactSVG } from "react-svg";

interface CommonIconProps {
  type: string;
  color?: string;
  size?: string;
}

const CommonIcon = ({ type, color = "#000000", size = "20px" }: CommonIconProps) => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size, color: `var(--color-${color})`}}
    >
      <ReactSVG
        src={`/img/icons/${type}Icon.svg`}
        beforeInjection={(svg) => {
          svg.setAttribute("width", size);
          svg.setAttribute("height", size);
          svg.querySelectorAll("path").forEach((path) => {
            path.setAttribute("fill", "currentColor");
          });
        }}
      />
    </div>
  );
}

export default CommonIcon;