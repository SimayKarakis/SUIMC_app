// src/pages/DeviceListPage.jsx
import React, { useMemo, useState } from "react";
import "./DeviceListPage.css";
import { createTranslator } from "../i18n";

const mockDevices = [
  {
    id: 1,
    name: "PCR Cihazı",
    model: "BioRad T100",
    serialNo: "SN-10001",
    suCode: "SU-001",
    ktmmCode: "KTMM-9001",
    certificateInfo: "ISO 17025",
    lab: "lab1"
  },
  {
    id: 2,
    name: "Mikroskop",
    model: "Olympus CX23",
    serialNo: "SN-20002",
    suCode: "SU-014",
    ktmmCode: "KTMM-9020",
    certificateInfo: "Kalibrasyon Var",
    lab: "lab2"
  },
  {
    id: 3,
    name: "Santrifüj",
    model: "Eppendorf 5424",
    serialNo: "SN-30003",
    suCode: "SU-021",
    ktmmCode: "KTMM-9102",
    certificateInfo: "Sertifika Yok",
    lab: "lab1"
  }
];

export default function DeviceListPage({ lang = "tr", devices, onBackHome, onBack, onLogout }) {
  const t = createTranslator(lang);

  const sourceDevices = Array.isArray(devices) ? devices : mockDevices;


  const [filters, setFilters] = useState({
    deviceName: "",
    deviceModel: "",
    serialNo: "",
    suCode: "",
    ktmmCode: "",
    lab: "all"
  });

  const filtered = useMemo(() => {
    const q = (s) => (s || "").trim().toLowerCase();

    return sourceDevices.filter((d) => {
      const okLab = filters.lab === "all" ? true : d.lab === filters.lab;

      const okName = q(filters.deviceName)
        ? d.name.toLowerCase().includes(q(filters.deviceName))
        : true;

      const okModel = q(filters.deviceModel)
        ? d.model.toLowerCase().includes(q(filters.deviceModel))
        : true;

      const okSerial = q(filters.serialNo)
        ? d.serialNo.toLowerCase().includes(q(filters.serialNo))
        : true;

      const okSu = q(filters.suCode)
        ? d.suCode.toLowerCase().includes(q(filters.suCode))
        : true;

      const okKtmm = q(filters.ktmmCode)
        ? d.ktmmCode.toLowerCase().includes(q(filters.ktmmCode))
        : true;

      return okLab && okName && okModel && okSerial && okSu && okKtmm;
    });
  }, [filters]);

  const onFilter = (e) => {
    e.preventDefault();
  };

  const onReset = () =>
    setFilters({
      deviceName: "",
      deviceModel: "",
      serialNo: "",
      suCode: "",
      ktmmCode: "",
      lab: "all"
    });

  const onExcel = () => alert(t("devices.list.excelNotReady"));

  return (
    <div className="dl-page">
      {/* Breadcrumb */}
      <div className="dl-header">
        <div className="dl-breadcrumb">
          <span className="dl-crumb">{t("devices.breadcrumbRoot")}</span>
          <span className="dl-sep">/</span>
          <span className="dl-crumb active">{t("devices.list.title")}</span>
        </div>

        <div className="dl-actionsTop">
          {(onBackHome || onBack) && (
            <button className="dl-topBtn" type="button" onClick={onBackHome || onBack}>
              ← {t("home.menu.home")}
            </button>
          )}
          {onLogout && (
            <button className="dl-topBtn" type="button" onClick={onLogout}>
              {t("home.menu.logout")}
            </button>
          )}
        </div>
      </div>

      <div className="dl-card">
        {/* Filters */}
        <form className="dl-form" onSubmit={onFilter}>
          <div className="dl-grid">
            <div className="dl-field">
              <label className="dl-label">{t("devices.list.filters.deviceName")}</label>
              <input
                className="dl-input"
                value={filters.deviceName}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, deviceName: e.target.value }))
                }
              />
            </div>

            <div className="dl-field">
              <label className="dl-label">{t("devices.list.filters.deviceModel")}</label>
              <input
                className="dl-input"
                value={filters.deviceModel}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, deviceModel: e.target.value }))
                }
              />
            </div>

            <div className="dl-field">
              <label className="dl-label">{t("devices.list.filters.serialNo")}</label>
              <input
                className="dl-input"
                value={filters.serialNo}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, serialNo: e.target.value }))
                }
              />
            </div>

            <div className="dl-field">
              <label className="dl-label">{t("devices.list.filters.suCode")}</label>
              <input
                className="dl-input"
                value={filters.suCode}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, suCode: e.target.value }))
                }
              />
            </div>

            <div className="dl-field">
              <label className="dl-label">{t("devices.list.filters.ktmmCode")}</label>
              <input
                className="dl-input"
                value={filters.ktmmCode}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, ktmmCode: e.target.value }))
                }
              />
            </div>

            <div className="dl-field">
              <label className="dl-label">{t("devices.list.filters.lab")}</label>
              <select
                className="dl-input"
                value={filters.lab}
                onChange={(e) => setFilters((p) => ({ ...p, lab: e.target.value }))}
              >
                <option value="all">{t("common.all")}</option>
                <option value="lab1">{t("devices.list.labOptions.lab1")}</option>
                <option value="lab2">{t("devices.list.labOptions.lab2")}</option>
              </select>
            </div>
          </div>

          <div className="dl-buttons">
            <button className="dl-btn filter" type="submit">
              {t("devices.list.actions.filter")}
            </button>
            <button className="dl-btn clear" type="button" onClick={onReset}>
              {t("devices.list.actions.clear")}
            </button>
            <button className="dl-btn excel" type="button" onClick={onExcel}>
              {t("common.excel")}
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="dl-tableWrap">
          <table className="dl-table">
            <thead>
              <tr>
                <th>{t("devices.list.table.name")}</th>
                <th>{t("devices.list.table.model")}</th>
                <th>{t("devices.list.table.certificate")}</th>
                <th>{t("devices.list.table.serialNo")}</th>
                <th>{t("devices.list.table.suCode")}</th>
                <th>{t("devices.list.table.ktmmCode")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="dl-empty">
                    {t("common.noResults")}
                  </td>
                </tr>
              ) : (
                filtered.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.model}</td>
                    <td>{d.certificateInfo}</td>
                    <td>{d.serialNo}</td>
                    <td>{d.suCode}</td>
                    <td>{d.ktmmCode}</td>
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