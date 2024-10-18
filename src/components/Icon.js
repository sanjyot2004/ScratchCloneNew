import React from "react";

export default function Symbol({
  label,
  dimension = 20,
  additionalClasses = "",
}) {
  return (
    <svg
      className={`fill-current ${additionalClasses}`}
      width={`${dimension}px`}
      height={`${dimension}px`}
    >
      <use xlinkHref={`/icons/solid.svg#${label}`} />
    </svg>
  );
}
