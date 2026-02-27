// src/pages/RequestListPage.jsx
import React, { useMemo, useState } from "react";
import "./RequestListPage.css";
import { createTranslator } from "../i18n";

const mockRequests = [
  {
    id: 1,
    date: "03.11.2025",
    requestNo: "TLP-3112025-2001169550",
    customer: "KTMM Üretim",
    company: "Kordsa",
    projectCode: "Kordsa Global",
    offerNo: "Not formed",
    title: "2001 169550-FG0114009991 251-008",
    priority: "normal",
    type: "productionPackage",
    status: "waitingApprovalLeader"
  }
];

export default function RequestListPage({ lang = "tr", onBackHome, onLogout }) {
  const t = createTranslator(lang);

  const [filters, setFilters] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    userType: ""
  });

  const filtered = useMemo(() => {
    const q = filters.name.trim().toLowerCase();

    return mockRequests.filter((r) => {
      const matchesName =
        !q ||
        `${r.customer} ${r.company} ${r.projectCode} ${r.requestNo} ${r.title}`
          .toLowerCase()
          .includes(q);

      const matchesStatus = !filters.status || r.status === filters.status;
      const matchesUserType = !filters.userType || r.type === filters.userType;

      // tarih filtreleri (mock basit):
      const matchesStart = !filters.startDate || true;
      const matchesEnd = !filters.endDate || true;

      return (
        matchesName && matchesStatus && matchesUserType && matchesStart && matchesEnd
      );
    });
  }, [filters]);

  const onFilter = (e) => {
    e.preventDefault();
  };

  const onClear = () => {
    setFilters({
      name: "",
      startDate: "",
      endDate: "",
      status: "",
      userType: ""
    });
  };

  const onExcel = () => alert(t("requests.list.excelNotReady"));
  const onDetail = (id) =>
    alert(t("requests.list.actions.detail") + ` (id=${id})`);
  const onDelete = (id) =>
    alert(t("requests.list.actions.delete") + ` (id=${id})`);

  const statusLabel = (s) => {
    if (s === "waitingApprovalLeader")
      return t("requests.list.status.waitingApprovalLeader");
    return s;
  };

  const typeLabel = (tp) => {
    if (tp === "productionPackage")
      return t("requests.list.type.productionPackage");
    return tp;
  };

  const priorityLabel = (p) => {
    if (p === "normal") return t("requests.list.priority.normal");
    return p;
  };

  return (
    <div className="rl-page">
      <div className="rl-header">
        <div className="rl-breadcrumb">
          <span className="rl-crumb">{t("home.menu.home")}</span>
          <span className="rl-sep">/</span>
          <span className="rl-crumb active">{t("requests.list.title")}</span>
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
        <form className="rl-filterRow" onSubmit={onFilter}>
          <div className="rl-field">
            <label className="rl-label">{t("requests.list.filters.name")}</label>
            <input
              className="rl-input"
              value={filters.name}
              onChange={(e) => setFilters((p) => ({ ...p, name: e.target.value }))}
              placeholder={t("requests.list.filters.namePlaceholder")}
            />
          </div>

          <div className="rl-field">
            <label className="rl-label">{t("requests.list.filters.startDate")}</label>
            <input
              className="rl-input"
              value={filters.startDate}
              onChange={(e) =>
                setFilters((p) => ({ ...p, startDate: e.target.value }))
              }
              placeholder="dd.mm.yyyy"
            />
          </div>

          <div className="rl-field">
            <label className="rl-label">{t("requests.list.filters.endDate")}</label>
            <input
              className="rl-input"
              value={filters.endDate}
              onChange={(e) =>
                setFilters((p) => ({ ...p, endDate: e.target.value }))
              }
              placeholder="dd.mm.yyyy"
            />
          </div>

          <div className="rl-field">
            <label className="rl-label">{t("requests.list.filters.status")}</label>
            <select
              className="rl-select"
              value={filters.status}
              onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
            >
              <option value="">{t("common.choose")}</option>
              <option value="waitingApprovalLeader">
                {t("requests.list.status.waitingApprovalLeader")}
              </option>
            </select>
          </div>

          <div className="rl-field">
            <label className="rl-label">{t("requests.list.filters.userType")}</label>
            <input
              className="rl-input"
              value={filters.userType}
              onChange={(e) =>
                setFilters((p) => ({ ...p, userType: e.target.value }))
              }
              placeholder={t("requests.list.filters.userTypePlaceholder")}
            />
          </div>

          <div className="rl-buttons">
            <button className="rl-btn filter" type="submit">
              {t("common.filter")}
            </button>
            <button className="rl-btn clear" type="button" onClick={onClear}>
              {t("common.clearFilter")}
            </button>
            <button className="rl-btn excel" type="button" onClick={onExcel}>
              {t("common.excel")}
            </button>
          </div>
        </form>
      </div>

      <div className="rl-tableWrap">
        <table className="rl-table">
          <thead>
            <tr>
              <th>{t("requests.list.table.date")}</th>
              <th>{t("requests.list.table.requestNo")}</th>
              <th>{t("requests.list.table.customer")}</th>
              <th>{t("requests.list.table.company")}</th>
              <th>{t("requests.list.table.projectCode")}</th>
              <th>{t("requests.list.table.offerNo")}</th>
              <th>{t("requests.list.table.title")}</th>
              <th>{t("requests.list.table.priority")}</th>
              <th>{t("requests.list.table.type")}</th>
              <th>{t("requests.list.table.status")}</th>
              <th className="rl-actionsCol"></th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="rl-empty">
                  {t("common.noResults")}
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td className="rl-mono">{r.requestNo}</td>
                  <td>{r.customer}</td>
                  <td>{r.company}</td>
                  <td>{r.projectCode}</td>
                  <td>
                    <span className="rl-badge warn">{r.offerNo}</span>
                  </td>
                  <td className="rl-titleCell">{r.title}</td>
                  <td>{priorityLabel(r.priority)}</td>
                  <td>{typeLabel(r.type)}</td>
                  <td>{statusLabel(r.status)}</td>
                  <td className="rl-actionsCol">
                    <button
                      type="button"
                      className="rl-miniBtn detail"
                      onClick={() => onDetail(r.id)}
                    >
                      {t("requests.list.actions.detail")}
                    </button>
                    <button
                      type="button"
                      className="rl-miniBtn delete"
                      onClick={() => onDelete(r.id)}
                    >
                      {t("requests.list.actions.delete")}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="rl-pager">
          <button className="rl-pill" type="button">
            {"<<"} {t("common.prev")}
          </button>
          <span className="rl-pill green">{t("common.total")} 1 (1/1)</span>
          <button className="rl-pill" type="button">
            {t("common.next")} {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}