// src/pages/HomePage.jsx
import React from "react";
import "./HomePage.css";
import { createTranslator } from "../i18n";

export default function HomePage({ lang = "tr" }) {
  const t = createTranslator(lang);

  return (
    <div className="home-content">
      <div className="home-breadcrumb">{t("home.breadcrumb")}</div>

      <div className="monitor-card">
        <div className="monitor-card-header">{t("home.kordsaMonitor")}</div>

        <div className="monitor-card-body">
          <div className="monitor-input-group">
            <label className="monitor-label">{t("home.counter")}</label>
            <input className="monitor-input" type="text" />
          </div>

          <div className="monitor-input-group">
            <label className="monitor-label">{t("home.date")}</label>
            <input className="monitor-input" type="text" />
          </div>

          <div className="monitor-last-update">
            {t("home.lastUpdate")} 8 {t("home.minutesAgo")}
          </div>

          <div className="monitor-actions">
            <button className="btn btn-primary" type="button">
              {t("home.update")}
            </button>
            <button className="btn btn-danger" type="button">
              {t("home.cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
