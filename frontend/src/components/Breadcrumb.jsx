import React from "react";
import "./Breadcrumb.css";

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="bc">
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        const clickable = typeof it.onClick === "function" && !isLast;

        return (
          <React.Fragment key={`${it.label}-${idx}`}>
            {clickable ? (
              <button className="bc-link" type="button" onClick={it.onClick}>
                {it.label}
              </button>
            ) : (
              <span className={`bc-text ${isLast ? "active" : ""}`}>
                {it.label}
              </span>
            )}
            {!isLast && <span className="bc-sep">/</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}