// src/pages/TestPricingPage.jsx
import React, { useMemo, useState } from "react";
import "./TestPricingPage.css";
import { createTranslator } from "../i18n";

export default function TestPricingPage({ lang = "tr", onBack, onLogout }) {
  const t = createTranslator(lang);

  // ✅ key aynen dönüyorsa fallback kullan
  const tt = (suffix, trFallback, enFallback) => {
    const key = `cost.testPricing.${suffix}`;
    const v = t(key);
    if (v === key) return lang === "en" ? enFallback : trFallback;
    return v;
  };

  const commonExcel = () => {
    const v = t("common.excel");
    if (v === "common.excel") return lang === "en" ? "Excel" : "Excel";
    return v;
  };

  const labOptions = useMemo(
    () => [
      { value: "", label: tt("filters.labPlaceholder", "Seçiniz", "Select") },
      { value: "lab-1", label: "Lab 1" },
      { value: "lab-2", label: "Lab 2" },
      { value: "lab-3", label: "Lab 3" },
    ],
    [lang]
  );

  const rows = useMemo(
    () => [
      { id: "1", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (70 C) - 0 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 747,64" },
      { id: "2", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (110 C) - 0 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 885,30" },
      { id: "3", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (180 C) - 0 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 1259,38" },
      { id: "4", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (200 C) - 0 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 1009,20" },
      { id: "5", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (350 C) - 0 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 1768,20" },
      { id: "6", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (70 C) - 90 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 747,64" },
      { id: "7", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (110 C) - 90 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 885,30" },
      { id: "8", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (180 C) - 90 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 1259,38" },
      { id: "9", category: "KRDS-C01", name: "ASTM D3039 Without SG With Chamber (200 C) - 90 Yönü - Tensile Strength/Modulus", batch: "1 Batch (5 Test Kuponu)", cost: "€ 1009,20" },
    ],
    []
  );

  const [filters, setFilters] = useState({ lab: "", keyword: "3039" });

  const onFilter = () => alert(tt("actions.filterMock", "Filtre (mock)", "Filter (mock)"));
  const onExcel = () => alert(tt("actions.excelMock", "Excel (mock)", "Excel (mock)"));
  const onAction = (type, row) => alert(`${type}: ${row.category}`);

  return (
    <div className="tp-page">
      {/* Breadcrumb + Buttons (solda, screenshot gibi) */}
      <div className="tp-header">
        <div className="tp-breadcrumb">
          <span className="tp-crumb">
            {t("home.menu.home") === "home.menu.home" ? "Anasayfa" : t("home.menu.home")}
          </span>
          <span className="tp-sep">/</span>
          <span className="tp-crumb">
            {t("home.menu.cost") === "home.menu.cost" ? "Maliyet" : t("home.menu.cost")}
          </span>
          <span className="tp-sep">/</span>
          <span className="tp-crumb active">
            {t("home.menu.testPricing") === "home.menu.testPricing" ? "Test Fiyatlandırma" : t("home.menu.testPricing")}
          </span>
        </div>

        <div className="tp-actionsTop">
          {onBack && (
            <button className="tp-topBtn" type="button" onClick={onBack}>
              ← {t("home.menu.home") === "home.menu.home" ? "Anasayfa" : t("home.menu.home")}
            </button>
          )}
          {onLogout && (
            <button className="tp-topBtn" type="button" onClick={onLogout}>
              {t("home.menu.logout") === "home.menu.logout" ? "Çıkış Yap" : t("home.menu.logout")}
            </button>
          )}
        </div>
      </div>

      {/* Filters panel */}
      <div className="tp-panel">
        <div className="tp-panelBar">
          <span className="tp-funnel" aria-hidden="true">⏷</span>
        </div>

        <div className="tp-strip">
          <div className="tp-stripInner">
            <div className="tp-field">
              <div className="tp-label">{tt("filters.lab", "Cihaz laboratuvarları", "Device labs")}</div>
              <select
                className="tp-select"
                value={filters.lab}
                onChange={(e) => setFilters((p) => ({ ...p, lab: e.target.value }))}
              >
                {labOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="tp-field wide">
              <div className="tp-label">{tt("filters.keyword", "Anahtar kelime", "Keyword")}</div>
              <input
                className="tp-input"
                value={filters.keyword}
                onChange={(e) => setFilters((p) => ({ ...p, keyword: e.target.value }))}
                placeholder={tt("filters.keywordPlaceholder", "", "")}
              />
            </div>

            <div className="tp-btns">
              <button className="tp-btn filter" type="button" onClick={onFilter}>
                {tt("actions.filter", "Filtre", "Filter")}
              </button>
              <button className="tp-btn excel" type="button" onClick={onExcel}>
                {commonExcel()}
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="tp-card">
          <div className="tp-cardTitle">
            {tt("table.title", "Test", "Test")}
          </div>

          <div className="tp-tableWrap">
            <table className="tp-table">
              <thead>
                <tr>
                  <th className="col-cat">{tt("table.deviceCategory", "Cihaz kategori", "Device category")}</th>
                  <th className="col-name">{tt("table.name", "Adı", "Name")}</th>
                  <th className="col-batch">{tt("table.batchInfo", "Batch bilgisi", "Batch info")}</th>
                  <th className="col-cost">{tt("table.cost", "Maliyet", "Cost")}</th>
                  <th className="col-actions" />
                </tr>
              </thead>

              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="col-cat">{r.category}</td>
                    <td className="col-name">{r.name}</td>
                    <td className="col-batch">{r.batch}</td>
                    <td className="col-cost">{r.cost}</td>
                    <td className="col-actions">
                      <div className="tp-actions">
                        <button type="button" className="tp-ico link" title="Link" onClick={() => onAction("link", r)}>
                          ⛓
                        </button>
                        <button type="button" className="tp-ico plus" title="Add" onClick={() => onAction("add", r)}>
                          ➕
                        </button>
                        <button type="button" className="tp-ico edit" title="Edit" onClick={() => onAction("edit", r)}>
                          ✎
                        </button>
                        <button type="button" className="tp-ico delete" title="Delete" onClick={() => onAction("delete", r)}>
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
