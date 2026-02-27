// src/pages/ReservationListPage.jsx
import React, { useMemo, useState } from "react";
import "./ReservationListPage.css";
import { createTranslator } from "../i18n";

export default function ReservationListPage({ lang = "tr", onBackHome, onLogout }) {
  const t = createTranslator(lang);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    keyword: "",
    status: "waiting"
  });

  const setF = (k, v) => setFilters((p) => ({ ...p, [k]: v }));

  const statusOptions = useMemo(
    () => [
      { value: "waiting", label: t("reservations.list.status.waiting") },
      { value: "approved", label: t("reservations.list.status.approved") },
      { value: "cancelled", label: t("reservations.list.status.cancelled") }
    ],
    [t]
  );

  const rows = useMemo(
    () => [
      {
        id: 1,
        workPackage: "0000047141-CH015100448",
        offerNo: "Not formed",
        projectCode: "Kordsa Global",
        barcode: "2511-005-001-001-C02",
        sampleName: "0000047141-CH015100448",
        deviceCategory: "KRDS-C02",
        test:
          "Viykozimetre-İzotermal 25°C ile 230°C aralığında tek sıcaklıkta (Spindle 1-3-6)-Master",
        expert: "Yaşar Güray",
        startDate: "03.11.2025 13:00",
        status: "waiting"
      }
    ],
    []
  );

  const filteredRows = useMemo(() => {
    let data = [...rows];

    if (filters.keyword.trim()) {
      const q = filters.keyword.trim().toLowerCase();
      data = data.filter(
        (r) =>
          r.workPackage.toLowerCase().includes(q) ||
          r.projectCode.toLowerCase().includes(q) ||
          r.expert.toLowerCase().includes(q) ||
          r.test.toLowerCase().includes(q)
      );
    }

    if (filters.status) {
      data = data.filter((r) => r.status === filters.status);
    }

    return data;
  }, [rows, filters.keyword, filters.status]);

  const onSearch = (e) => {
    e.preventDefault();
  };

  const onDetail = (id) =>
    alert(`${t("reservations.list.actions.detail")} (id=${id})`);
  const onDelete = (id) =>
    alert(`${t("reservations.list.actions.delete")} (id=${id})`);

  return (
    <div className="rl-page">
      {/* header / breadcrumb */}
      <div className="rl-header">
        <div className="rl-breadcrumb">
          <span className="rl-crumb">{t("reservations.breadcrumbRoot")}</span>
          <span className="rl-sep">/</span>
          <span className="rl-crumb active">{t("reservations.list.title")}</span>
        </div>

        <div className="rl-actionsTop">
          {onBackHome && (
            <button className="rl-topBtn" type="button" onClick={onBackHome}>
              ← {t("home.menu.home")}
            </button>
          )}
          {onLogout && (
            <button className="rl-topBtn" type="button" onClick={onLogout}>
              {t("home.menu.logout")}
            </button>
          )}
        </div>
      </div>

      <div className="rl-card">
        <div className="rl-cardHeader">{t("reservations.list.title")}</div>

        <form className="rl-filters" onSubmit={onSearch}>
          <div className="rl-filterRow">
            <div className="rl-field">
              <label className="rl-label">
                {t("reservations.list.filters.startDate")}
              </label>
              <input
                className="rl-input"
                value={filters.startDate}
                onChange={(e) => setF("startDate", e.target.value)}
                placeholder=""
              />
            </div>

            <div className="rl-dash">—</div>

            <div className="rl-field">
              <label className="rl-label">
                {t("reservations.list.filters.endDate")}
              </label>
              <input
                className="rl-input"
                value={filters.endDate}
                onChange={(e) => setF("endDate", e.target.value)}
              />
            </div>

            <div className="rl-field wide">
              <label className="rl-label">
                {t("reservations.list.filters.keyword")}
              </label>
              <input
                className="rl-input"
                value={filters.keyword}
                onChange={(e) => setF("keyword", e.target.value)}
                placeholder={t("reservations.list.filters.keywordPlaceholder")}
              />
            </div>

            <div className="rl-field">
              <label className="rl-label">
                {t("reservations.list.filters.status")}
              </label>
              <select
                className="rl-select"
                value={filters.status}
                onChange={(e) => setF("status", e.target.value)}
              >
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <button className="rl-searchBtn" type="submit">
              {t("common.search")}
            </button>
          </div>
        </form>

        <div className="rl-tableWrap">
          <table className="rl-table">
            <thead>
              <tr>
                <th>{t("reservations.list.table.workPackage")}</th>
                <th>{t("reservations.list.table.offerNo")}</th>
                <th>{t("reservations.list.table.projectCode")}</th>
                <th>{t("reservations.list.table.barcode")}</th>
                <th>{t("reservations.list.table.sampleName")}</th>
                <th>{t("reservations.list.table.deviceCategory")}</th>
                <th>{t("reservations.list.table.test")}</th>
                <th>{t("reservations.list.table.expert")}</th>
                <th>{t("reservations.list.table.startDate")}</th>
                <th className="rl-actionsCol"></th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td className="rl-empty" colSpan={10}>
                    {t("common.noResults")}
                  </td>
                </tr>
              ) : (
                filteredRows.map((r) => (
                  <tr key={r.id}>
                    <td className="rl-strong">{r.workPackage}</td>
                    <td>
                      <span className="rl-badgeRed">{r.offerNo}</span>
                    </td>
                    <td>{r.projectCode}</td>
                    <td>{r.barcode}</td>
                    <td className="rl-strong">{r.sampleName}</td>
                    <td>{r.deviceCategory}</td>
                    <td className="rl-test">{r.test}</td>
                    <td>{r.expert}</td>
                    <td>{r.startDate}</td>
                    <td className="rl-actions">
                      <button
                        type="button"
                        className="rl-btn detail"
                        onClick={() => onDetail(r.id)}
                      >
                        {t("reservations.list.actions.detail")}
                      </button>
                      <button
                        type="button"
                        className="rl-btn delete"
                        onClick={() => onDelete(r.id)}
                      >
                        {t("reservations.list.actions.delete")}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}