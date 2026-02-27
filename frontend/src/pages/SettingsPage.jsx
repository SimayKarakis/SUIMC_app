// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import "./SettingsPage.css";
import { createTranslator } from "../i18n";

export default function SettingsPage({ lang = "tr", onBack, onLogout }) {
  const t = createTranslator(lang);

  const [form, setForm] = useState({
    email: "info.suimcapp@sabanciuniv.edu",
    emailPassword: "Xicellwe90",
    emailServer: "smtp.sabanciuniv.edu",
    port: "25",
    adminMail: "suimc.info@sabanciuniv.edu",
    urgencyRate: "0.00",
    euroRate: "47,41",
    usdRate: "26,08",
  });

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSave = (e) => {
    e.preventDefault();
    alert(t("settings.savedMock"));
  };

  return (
    <div className="st-page">
      {/* Top actions (breadcrumb YOK) */}
      <div className="st-actionsTop">
        {onBack && (
          <button type="button" className="st-topBtn" onClick={onBack}>
            ← {t("home.menu.home")}
          </button>
        )}
        {onLogout && (
          <button type="button" className="st-topBtn" onClick={onLogout}>
            {t("home.menu.logout")}
          </button>
        )}
      </div>

      <div className="st-topLine" />

      <form className="st-form" onSubmit={onSave}>
        <div className="st-gridTop">
          <div className="st-field">
            <label className="st-label">{t("settings.fields.email")}</label>
            <input
              className="st-input"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
            />
          </div>

          <div className="st-field">
            <label className="st-label">{t("settings.fields.emailPassword")}</label>
            <input
              className="st-input"
              value={form.emailPassword}
              onChange={(e) => setField("emailPassword", e.target.value)}
            />
          </div>

          <div className="st-field">
            <label className="st-label">{t("settings.fields.emailServer")}</label>
            <input
              className="st-input"
              value={form.emailServer}
              onChange={(e) => setField("emailServer", e.target.value)}
            />
          </div>

          <div className="st-field st-field--small">
            <label className="st-label">{t("settings.fields.port")}</label>
            <input
              className="st-input"
              value={form.port}
              onChange={(e) => setField("port", e.target.value)}
            />
          </div>

          <div className="st-field">
            <label className="st-label">{t("settings.fields.adminMail")}</label>
            <input
              className="st-input"
              value={form.adminMail}
              onChange={(e) => setField("adminMail", e.target.value)}
            />
          </div>
        </div>

        <div className="st-gridBottom">
          <div className="st-field">
            <label className="st-label">{t("settings.fields.urgencyRate")}</label>
            <input
              className="st-input"
              value={form.urgencyRate}
              onChange={(e) => setField("urgencyRate", e.target.value)}
            />
          </div>

          <div className="st-field">
            <label className="st-label">{t("settings.fields.euroRate")}</label>
            <input
              className="st-input"
              value={form.euroRate}
              onChange={(e) => setField("euroRate", e.target.value)}
            />
          </div>

          <div className="st-field">
            <label className="st-label">{t("settings.fields.usdRate")}</label>
            <input
              className="st-input"
              value={form.usdRate}
              onChange={(e) => setField("usdRate", e.target.value)}
            />
          </div>
        </div>

        <div className="st-actions">
          <button className="st-btnSave" type="submit">
            {t("settings.actions.save")}
          </button>

          {onLogout && (
            <button className="st-btnGhost" type="button" onClick={onLogout}>
              {t("home.menu.logout")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}