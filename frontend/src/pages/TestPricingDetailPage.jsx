// src/pages/TestPricingDetailPage.jsx
import React, { useMemo, useState } from "react";
import "./TestPricingDetailPage.css";
import { createTranslator } from "../i18n";

export default function TestPricingDetailPage({
  lang = "tr",
  onBack,
  onLogout,
  initialRow,
}) {
  const t = createTranslator(lang);

  const initial = useMemo(
    () => ({
      category: initialRow?.category || "KRDS-C01",
      name: initialRow?.name || "",
      batchInfo: initialRow?.batchInfo || "",
      kordsaCodes: ["KRD/5"],
      kordsaMethod: "",
      factors: {
        contribution: true,
        profitMargin: true,
        accreditationMargin: false,
      },
      profitValue: "1,9500",
      imageFileName: "",
    }),
    [initialRow]
  );

  const [form, setForm] = useState(initial);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const toggleFactor = (k) =>
    setForm((p) => ({ ...p, factors: { ...p.factors, [k]: !p.factors[k] } }));

  const removeCode = (idx) =>
    setForm((p) => ({
      ...p,
      kordsaCodes: p.kordsaCodes.filter((_, i) => i !== idx),
    }));

  const onSave = () => {
    alert(t("cost.testPricing.detail.savedMock"));
    if (onBack) onBack();
  };

  return (
    <div className="tpd-page">
      <div className="tpd-header">
        <div className="tpd-breadcrumb">
          <span className="tpd-crumb link" onClick={() => onBack && onBack()}>
            {t("home.menu.home")}
          </span>
          <span className="tpd-sep">/</span>
          <span className="tpd-crumb">{t("cost.breadcrumbRoot")}</span>
          <span className="tpd-sep">/</span>
          <span className="tpd-crumb link" onClick={() => onBack && onBack()}>
            {t("cost.testPricing.title")}
          </span>
          <span className="tpd-sep">/</span>
          <span className="tpd-crumb active">{t("cost.testPricing.detail.title")}</span>
        </div>

        <div className="tpd-actionsTop">
          {onBack && (
            <button className="tpd-topBtn" type="button" onClick={onBack}>
              ← {t("home.menu.home")}
            </button>
          )}
          {onLogout && (
            <button className="tpd-topBtn" type="button" onClick={onLogout}>
              {t("home.menu.logout")}
            </button>
          )}
        </div>
      </div>

      <div className="tpd-card">
        <div className="tpd-cardTitle">{t("cost.testPricing.detail.sectionTitle")}</div>

        {/* Device Category */}
        <div className="tpd-row">
          <div className="tpd-label green">{t("cost.testPricing.detail.fields.deviceCategory")}</div>
          <input className="tpd-input" value={form.category} onChange={(e)=>setField("category", e.target.value)} />
        </div>

        {/* Name */}
        <div className="tpd-row">
          <div className="tpd-label green">{t("cost.testPricing.detail.fields.name")}</div>
          <input className="tpd-input" value={form.name} onChange={(e)=>setField("name", e.target.value)} />
        </div>

        {/* Batch + Image */}
        <div className="tpd-grid2">
          <div className="tpd-row">
            <div className="tpd-label orange">{t("cost.testPricing.detail.fields.batchInfo")}</div>
            <input className="tpd-input" value={form.batchInfo} onChange={(e)=>setField("batchInfo", e.target.value)} />
          </div>

          <div className="tpd-row">
            <div className="tpd-label orange">{t("cost.testPricing.detail.fields.image")}</div>
            <div className="tpd-fileWrap">
              <input
                className="tpd-file"
                type="file"
                onChange={(e) =>
                  setField("imageFileName", e.target.files?.[0]?.name || "")
                }
              />
              {form.imageFileName && (
                <div className="tpd-fileName">{form.imageFileName}</div>
              )}
            </div>
          </div>
        </div>

        {/* Codes + Method */}
        <div className="tpd-grid2">
          <div className="tpd-row">
            <div className="tpd-label green">{t("cost.testPricing.detail.fields.kordsaCode")}</div>
            <div className="tpd-tags">
              {form.kordsaCodes.map((c, idx) => (
                <span key={`${c}-${idx}`} className="tpd-tag">
                  {c}
                  <button
                    type="button"
                    className="tpd-tagX"
                    onClick={() => removeCode(idx)}
                    aria-label="remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input className="tpd-input" value="" readOnly placeholder="" />
          </div>

          <div className="tpd-row">
            <div className="tpd-label green">{t("cost.testPricing.detail.fields.kordsaMethod")}</div>
            <input className="tpd-input" value={form.kordsaMethod} onChange={(e)=>setField("kordsaMethod", e.target.value)} />
          </div>
        </div>

        {/* Factors */}
        <div className="tpd-row">
          <div className="tpd-label green">{t("cost.testPricing.detail.fields.factors")}</div>
          <div className="tpd-checks">
            <label className="tpd-check">
              <input
                type="checkbox"
                checked={form.factors.contribution}
                onChange={() => toggleFactor("contribution")}
              />
              {t("cost.testPricing.detail.fields.contribution")}
            </label>
            <label className="tpd-check">
              <input
                type="checkbox"
                checked={form.factors.profitMargin}
                onChange={() => toggleFactor("profitMargin")}
              />
              {t("cost.testPricing.detail.fields.profitMargin")}
            </label>
            <label className="tpd-check">
              <input
                type="checkbox"
                checked={form.factors.accreditationMargin}
                onChange={() => toggleFactor("accreditationMargin")}
              />
              {t("cost.testPricing.detail.fields.accreditationMargin")}
            </label>
          </div>
        </div>

        {/* Profit value */}
        <div className="tpd-row">
          <div className="tpd-label green">{t("cost.testPricing.detail.fields.profitValue")}</div>
          <input className="tpd-input" value={form.profitValue} onChange={(e)=>setField("profitValue", e.target.value)} />
        </div>

        <div className="tpd-actions">
          <button type="button" className="tpd-btn save" onClick={onSave}>
            {t("cost.testPricing.detail.actions.save")}
          </button>
          <button type="button" className="tpd-btn close" onClick={onBack}>
            {t("cost.testPricing.detail.actions.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
