// src/components/common/IconBadge.jsx
import React from "react";

const IconBadge = ({
  icon: Icon,
  as = "div",            // 'div' by default, pass "button" to make it clickable
  bgClass = "bg-gray-100",
  iconClass = "text-gray-700",
  size = 48,
  iconSize,
  className = "",
  onClick,
  type = "button",       // used only if as === "button"
  ...rest
}) => {
  const Tag = as;
  const inner = iconSize ?? Math.round(size * 0.5);

  // inline-flex + box-border ensures border included inside width/height and the shape is perfect
  const baseClasses = `inline-flex items-center justify-center rounded-full box-border ${bgClass} ${className}`;

  // If Tag is button, pass type and onClick; otherwise they are ignored.
  const tagProps =
    Tag === "button"
      ? { onClick, type, tabIndex: 0 }
      : { role: onClick ? "button" : undefined, onClick };

  return (
    <Tag
      className={baseClasses}
      style={{ width: size, height: size }}
      {...tagProps}
      {...rest}
    >
      {Icon ? (
        <Icon className={iconClass} style={{ width: inner, height: inner }} />
      ) : null}
    </Tag>
  );
};

export default IconBadge;
