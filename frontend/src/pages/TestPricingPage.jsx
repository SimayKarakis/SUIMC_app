// src/pages/TestPricingPage.jsx
import React, { useMemo, useState } from "react";
import "./TestPricingPage.css";
import { createTranslator } from "../i18n";

export default function TestPricingPage({
  lang = "tr",
  onBack,
  onLogout,
  onViewDetail, // ✅ detail sayfasına geçiş için
}) {
  const t = createTranslator(lang);

  const labOptions = useMemo(
    () => [
      { value: "", label: t("cost.testPricing.filters.labPlaceholder") },
      { value: "lab-1", label: "Lab 1" },
      { value: "lab-2", label: "Lab 2" },
      { value: "lab-3", label: "Lab 3" },
    ],
    [t]
  );

  // ✅ rows artık state (silme çalışacak)
  const [rows, setRows] = useState([
    {
      id: "1",
      category: "KRDS-C01",
      name: "ASTM D3039 Without SG With Chamber (70 C) - 0 Yönü - Tensile Strength/Modulus",
      batchInfo: "1 Batch (5 Test Kuponu)",
      cost: "€ 747,64",
    },
    {
      id: "2",
      category: "KRDS-C01",
      name: "ASTM D3039 Without SG With Chamber (110 C) - 0 Yönü - Tensile Strength/Modulus",
      batchInfo: "1 Batch (5 Test Kuponu)",
      cost: "€ 885,30",
    },
    {
      id: "3",
      category: "KRDS-C01",
      name: "ASTM D3039 Without SG With Chamber (180 C) - 0 Yönü - Tensile Strength/Modulus",
      batchInfo: "1 Batch (5 Test Kuponu)",
      cost: "€ 1259,38",
    },
  ]);

  const [filters, setFilters] = useState({
    lab: "",
    keyword: "",
  });

  const onFilter = () => {
    // mock (istersen filtrelemeyi de bağlarız)
  };

  const onExcel = () => {
    alert(t("cost.testPricing.excelNotReady") || t("common.excel"));
  };

  // ✅ row action handler (delete burada gerçek)
  const onAction = (type, row) => {
    if (type === "delete") {
      // confirm istersen açarız; şimdilik direkt siliyor
      setRows((prev) => prev.filter((x) => x.id !== row.id));
      return;
    }

    if (type === "edit") {
      if (onViewDetail) onViewDetail(row);
      return;
    }

    // diğerleri mock
    if (type === "link") alert(t("cost.testPricing.rowActions.link"));
    if (type === "copy") alert(t("cost.testPricing.rowActions.copy"));
  };

  return (
    <div className="tp-page">
      {/* Breadcrumb + Top Right buttons */}
      <div className="tp-header">
        <div className="tp-breadcrumb">
          <span className="tp-crumb link" onClick={() => onBack && onBack()}>
            {t("home.menu.home")}
          </span>
          <span className="tp-sep">/</span>
          <span className="tp-crumb">{t("cost.breadcrumbRoot")}</span>
          <span className="tp-sep">/</span>
          <span className="tp-crumb active">{t("cost.testPricing.title")}</span>
        </div>

        <div className="tp-actionsTop">
          {onBack && (
            <button className="tp-topBtn" type="button" onClick={onBack}>
              ← {t("home.menu.home")}
            </button>
          )}
          {onLogout && (
            <button className="tp-topBtn" type="button" onClick={onLogout}>
              {t("home.menu.logout")}
            </button>
          )}
        </div>
      </div>

      {/* Filter bar */}
      <div className="tp-strip">
        <div className="tp-stripInner">
          <div className="tp-field">
            <div className="tp-label">{t("cost.testPricing.filters.lab")}</div>
            <select
              className="tp-select"
              value={filters.lab}
              onChange={(e) =>
                setFilters((p) => ({ ...p, lab: e.target.value }))
              }
            >
              {labOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="tp-field wide">
            <div className="tp-label">{t("cost.testPricing.filters.keyword")}</div>
            <input
              className="tp-input"
              value={filters.keyword}
              onChange={(e) =>
                setFilters((p) => ({ ...p, keyword: e.target.value }))
              }
              placeholder={t("cost.testPricing.filters.keywordPlaceholder")}
            />
          </div>

          <div className="tp-btns">
            <button className="tp-btn filter" type="button" onClick={onFilter}>
              {t("cost.testPricing.actions.filter")}
            </button>
            <button className="tp-btn excel" type="button" onClick={onExcel}>
              {t("cost.testPricing.actions.excel")}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="tp-card">
        <div className="tp-cardTitle">{t("cost.testPricing.title")}</div>

        <div className="tp-tableWrap">
          <table className="tp-table">
            <thead>
              <tr>
                <th className="col-cat">{t("cost.testPricing.table.deviceCategory")}</th>
                <th className="col-name">{t("cost.testPricing.table.name")}</th>
                <th className="col-batch">{t("cost.testPricing.table.batchInfo")}</th>
                <th className="col-cost">{t("cost.testPricing.table.cost")}</th>
                <th className="col-actions" />
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="col-cat">{r.category}</td>
                  <td className="col-name">{r.name}</td>
                  <td className="col-batch">{r.batchInfo}</td>
                  <td className="col-cost">{r.cost}</td>

                  <td className="col-actions">
                    <div className="tp-actions">
                      <button
                        type="button"
                        className="tp-ico link"
                        title={t("cost.testPricing.rowActions.link")}
                        onClick={() => onAction("link", r)}
                      >
                        ⛓
                      </button>
                      <button
                        type="button"
                        className="tp-ico copy"
                        title={t("cost.testPricing.rowActions.copy")}
                        onClick={() => onAction("copy", r)}
                      >
                        ⎘
                      </button>

                      {/* ✎ = detail sayfası */}
                      <button
                        type="button"
                        className="tp-ico edit"
                        title={t("cost.testPricing.rowActions.edit")}
                        onClick={() => onAction("edit", r)}
                      >
                        ✎
                      </button>

                      {/* 🗑 = gerçek sil */}
                      <button
                        type="button"
                        className="tp-ico delete"
                        title={t("cost.testPricing.rowActions.delete")}
                        onClick={() => onAction("delete", r)}
                      >
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
  );
}