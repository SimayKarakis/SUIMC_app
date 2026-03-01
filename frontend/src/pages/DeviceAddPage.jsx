// src/pages/DeviceAddPage.jsx
import React, { useMemo, useState } from "react";
import "./DeviceAddPage.css";
import { createTranslator } from "../i18n";

export default function DeviceAddPage({ lang = "tr", onBack, onLogout, onCreateDevice, onSaved }) {
  const t = createTranslator(lang);

  const [form, setForm] = useState({
    name: "",
    model: "",
    serialNo: "",
    certificateInfo: "",
    suCode: "",
    ktmmCode: "",
  });

  const [touched, setTouched] = useState({});
  const [banner, setBanner] = useState(null); // { type: "error"|"success", title, message }

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const markTouched = (k) => setTouched((p) => ({ ...p, [k]: true }));

  const requiredFields = useMemo(
    () => [
      { key: "name", label: t("devices.add.fields.name") },
      { key: "model", label: t("devices.add.fields.model") },
      { key: "serialNo", label: t("devices.add.fields.serialNo") },
      { key: "certificateInfo", label: t("devices.add.fields.certificateInfo") },
      { key: "suCode", label: t("devices.add.fields.suCode") },
      { key: "ktmmCode", label: t("devices.add.fields.ktmmCode") },
    ],
    [lang]
  );

  const errors = useMemo(() => {
    const e = {};
    requiredFields.forEach(({ key }) => {
      const value = (form[key] ?? "").toString().trim();
      if (!value) e[key] = true;
    });
    return e;
  }, [form, requiredFields]);

  const hasErrors = Object.keys(errors).length > 0;

  const showAllErrors = () => {
    const next = {};
    requiredFields.forEach(({ key }) => (next[key] = true));
    setTouched(next);
  };

  const onSave = (e) => {
    e.preventDefault();
    setBanner(null);

    if (hasErrors) {
      showAllErrors();

      const missingLabels = requiredFields
        .filter(({ key }) => errors[key])
        .map(({ label }) => label);

      setBanner({
        type: "error",
        title: t("devices.add.validation.title"),
        message:
          t("devices.add.validation.required") + " " + missingLabels.join(", "),
      });
      return;
    }

    const payload = {
      name: form.name.trim(),
      model: form.model.trim(),
      serialNo: form.serialNo.trim(),
      certificateInfo: form.certificateInfo.trim(),
      suCode: form.suCode.trim(),
      ktmmCode: form.ktmmCode.trim(),
    };

    if (onCreateDevice) onCreateDevice(payload);

    setBanner({
      type: "success",
      title: t("devices.add.successTitle"),
      message: t("devices.add.savedMock"),
    });

    // After save, go back to list (slight delay so banner can be seen if you want)
    if (onSaved) onSaved();
  };

  const fieldErrorText = (k) => {
    if (!touched[k]) return "";
    if (!errors[k]) return "";
    return t("devices.add.validation.fieldRequired");
  };

  return (
    <div className="da-page">
      <div className="da-header">
        <div className="da-breadcrumb">
          <span className="da-crumb">{t("devices.breadcrumbRoot")}</span>
          <span className="da-sep">/</span>
          <span className="da-crumb active">{t("devices.add.title")}</span>
        </div>

        <div className="da-actionsTop">
          {onBack && (
            <button className="da-topBtn" type="button" onClick={onBack}>
              ← {t("home.menu.home")}
            </button>
          )}
          {onLogout && (
            <button className="da-topBtn" type="button" onClick={onLogout}>
              {t("home.menu.logout")}
            </button>
          )}
        </div>
      </div>

      <div className="da-card">
        <div className="da-cardHeader">{t("devices.add.cardTitle")}</div>

        {banner && (
          <div
            className={`da-banner ${
              banner.type === "error" ? "error" : "success"
            }`}
            role="alert"
          >
            <div className="da-bannerTitle">{banner.title}</div>
            <div className="da-bannerMsg">{banner.message}</div>
            <button
              type="button"
              className="da-bannerOk"
              onClick={() => setBanner(null)}
            >
              {t("common.ok")}
            </button>
          </div>
        )}

        <form className="da-form" onSubmit={onSave}>
          <div className="da-gridTop">
            <div className="da-field">
              <label className="da-label">
                {t("devices.add.fields.name")} *
              </label>
              <input
                className={`da-input ${
                  touched.name && errors.name ? "err" : ""
                }`}
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                onBlur={() => markTouched("name")}
              />
              <div className="da-error">{fieldErrorText("name")}</div>
            </div>

            <div className="da-field">
              <label className="da-label">
                {t("devices.add.fields.model")} *
              </label>
              <input
                className={`da-input ${
                  touched.model && errors.model ? "err" : ""
                }`}
                value={form.model}
                onChange={(e) => setField("model", e.target.value)}
                onBlur={() => markTouched("model")}
              />
              <div className="da-error">{fieldErrorText("model")}</div>
            </div>

            <div className="da-field">
              <label className="da-label">
                {t("devices.add.fields.serialNo")} *
              </label>
              <input
                className={`da-input ${
                  touched.serialNo && errors.serialNo ? "err" : ""
                }`}
                value={form.serialNo}
                onChange={(e) => setField("serialNo", e.target.value)}
                onBlur={() => markTouched("serialNo")}
              />
              <div className="da-error">{fieldErrorText("serialNo")}</div>
            </div>
          </div>

          <div className="da-gridBottom">
            <div className="da-field textarea">
              <label className="da-label">
                {t("devices.add.fields.certificateInfo")} *
              </label>
              <textarea
                className={`da-textarea ${
                  touched.certificateInfo && errors.certificateInfo ? "err" : ""
                }`}
                value={form.certificateInfo}
                onChange={(e) => setField("certificateInfo", e.target.value)}
                onBlur={() => markTouched("certificateInfo")}
              />
              <div className="da-error">{fieldErrorText("certificateInfo")}</div>
            </div>

            <div className="da-field">
              <label className="da-label">
                {t("devices.add.fields.suCode")} *
              </label>
              <input
                className={`da-input ${
                  touched.suCode && errors.suCode ? "err" : ""
                }`}
                value={form.suCode}
                onChange={(e) => setField("suCode", e.target.value)}
                onBlur={() => markTouched("suCode")}
              />
              <div className="da-error">{fieldErrorText("suCode")}</div>
            </div>

            <div className="da-field">
              <label className="da-label">
                {t("devices.add.fields.ktmmCode")} *
              </label>
              <input
                className={`da-input ${
                  touched.ktmmCode && errors.ktmmCode ? "err" : ""
                }`}
                value={form.ktmmCode}
                onChange={(e) => setField("ktmmCode", e.target.value)}
                onBlur={() => markTouched("ktmmCode")}
              />
              <div className="da-error">{fieldErrorText("ktmmCode")}</div>
            </div>
          </div>

          <div className="da-buttons">
            {/* ✅ disabled kaldırıldı */}
            <button className="da-btn save" type="submit">
              {t("devices.add.actions.save")}
            </button>
            <button className="da-btn cancel" type="button" onClick={onBack}>
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
