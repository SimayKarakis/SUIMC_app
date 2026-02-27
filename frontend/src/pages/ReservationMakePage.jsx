// src/pages/ReservationMakePage.jsx
import React, { useMemo, useState } from "react";
import "./ReservationMakePage.css";
import { createTranslator } from "../i18n";

export default function ReservationMakePage({ lang = "tr", onBack, onLogout, onClose }) {
  const t = createTranslator(lang);

  const customers = useMemo(
    () => [
      { value: "murat-buyuk", label: "Murat Büyük" },
      { value: "asli-yarim", label: "Aslı Yarım" },
    ],
    []
  );

  const packages = useMemo(
    () => [
      { value: "tfp-2", label: "TFP Malzeme Karakterizasyonu2" },
      { value: "tfp-1", label: "TFP Malzeme Karakterizasyonu1" },
    ],
    []
  );

  const priorities = useMemo(
    () => [
      { value: "normal", label: t("reservations.make.priority.normal") },
      { value: "high", label: t("reservations.make.priority.high") },
    ],
    [t]
  );

  const experts = useMemo(
    () => [
      { value: "", label: t("reservations.make.select.expert") },
      { value: "uzman-1", label: "Uzman 1" },
      { value: "uzman-2", label: "Uzman 2" },
    ],
    [t]
  );

  const devices = useMemo(
    () => [
      { value: "", label: t("reservations.make.select.device") },
      { value: "cihaz-1", label: "Cihaz 1" },
      { value: "cihaz-2", label: "Cihaz 2" },
    ],
    [t]
  );

  const [headerForm, setHeaderForm] = useState({
    packageType: "work", // work | production
    customer: customers[0]?.value || "",
    pack: packages[0]?.value || "",
    priority: "normal",
  });

  const [selectAll, setSelectAll] = useState(false);

  const [rows, setRows] = useState([
    {
      id: "r1",
      checked: false,
      labText:
        "Mekanik Test ve Yapısal Sağlık İzleme Laboratuvarı\nKırılma Tokluğu Deney Hizmetleri",
      standard: "EN 6033 GIC",
      qty: 1,
      expert: "",
      minutes: 120,
      device: "",
      start: "",
      end: "",
    },
    {
      id: "r2",
      checked: false,
      labText:
        "Mekanik Test ve Yapısal Sağlık İzleme Laboratuvarı\nKırılma Tokluğu Deney Hizmetleri",
      standard: "EN 6034 GIC",
      qty: 1,
      expert: "",
      minutes: 120,
      device: "",
      start: "",
      end: "",
    },
  ]);

  const onToggleAll = (v) => {
    setSelectAll(v);
    setRows((prev) => prev.map((r) => ({ ...r, checked: v })));
  };

  const setRow = (id, patch) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const onCalendarClick = (rowId) => {
    // Şimdilik mock — hedef ekrandaki ikon gibi dursun
    // İstersen burada date-time picker açtırırız.
    setRow(rowId, {});
  };

  return (
    <div className="rm-page">
      {/* üst satır (hedef görselde solda breadcrumb, sağda logout var gibi) */}
      <div className="rm-topbar">
        <div className="rm-breadcrumb">
          <span className="rm-crumb link" onClick={() => onBack && onBack()}>
            {t("home.menu.home")}
          </span>
          <span className="rm-sep">/</span>
          <span className="rm-crumb">{t("reservations.breadcrumbRoot")}</span>
          <span className="rm-sep">/</span>
          <span className="rm-crumb active">{t("reservations.make.title")}</span>
        </div>

        <div className="rm-actionsTop">
          {onLogout && (
            <button className="rm-topBtn" type="button" onClick={onLogout}>
              {t("home.menu.logout")}
            </button>
          )}
        </div>
      </div>

      {/* yeşil status bar */}
      <div className="rm-statusBar">{t("reservations.make.statusOpen")}</div>

      {/* ana kart */}
      <div className="rm-topCard">
        <div className="rm-topRow">
          <div className="rm-field">
            <div className="rm-label">{t("reservations.make.fields.packageType")}</div>
            <div className="rm-radioRow">
              <label className="rm-radio">
                <input
                  type="radio"
                  name="pkgType"
                  checked={headerForm.packageType === "work"}
                  onChange={() => setHeaderForm((p) => ({ ...p, packageType: "work" }))}
                />
                {t("reservations.make.packageType.work")}
              </label>
              <label className="rm-radio">
                <input
                  type="radio"
                  name="pkgType"
                  checked={headerForm.packageType === "production"}
                  onChange={() =>
                    setHeaderForm((p) => ({ ...p, packageType: "production" }))
                  }
                />
                {t("reservations.make.packageType.production")}
              </label>
            </div>
          </div>

          <div className="rm-field">
            <div className="rm-label">{t("reservations.make.fields.customer")}</div>
            <select
              className="rm-select"
              value={headerForm.customer}
              onChange={(e) =>
                setHeaderForm((p) => ({ ...p, customer: e.target.value }))
              }
            >
              {customers.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rm-field">
            <div className="rm-label">{t("reservations.make.fields.pack")}</div>
            <select
              className="rm-select"
              value={headerForm.pack}
              onChange={(e) => setHeaderForm((p) => ({ ...p, pack: e.target.value }))}
            >
              {packages.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rm-field">
            <div className="rm-label">{t("reservations.make.fields.priority")}</div>
            <select
              className="rm-select"
              value={headerForm.priority}
              onChange={(e) =>
                setHeaderForm((p) => ({ ...p, priority: e.target.value }))
              }
            >
              {priorities.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rm-divider" />

        {/* select all satırı */}
        <div className="rm-selectAll">
          <label className="rm-checkbox">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => onToggleAll(e.target.checked)}
            />
            {t("reservations.make.selectAll")}
          </label>
          <span className="rm-batchCode">2004-35</span>
        </div>

        <div className="rm-divider" />

        {/* grup */}
        <div className="rm-group">
          <div className="rm-groupLeft">
            <div className="rm-badge">1</div>
            <div className="rm-groupText">
              <div className="rm-groupTitle">CFPA (0)</div>
              <div className="rm-groupSub">2004-035-005</div>
            </div>
          </div>
        </div>

        <div className="rm-divider" />

        {/* satırlar */}
        <div className="rm-rows">
          {rows.map((r) => (
            <div className="rm-row" key={r.id}>
              <div className="rm-cell check">
                <input
                  type="checkbox"
                  checked={r.checked}
                  onChange={(e) => {
                    const v = e.target.checked;
                    setRow(r.id, { checked: v });

                    setTimeout(() => {
                      setRows((prev) => {
                        const all = prev.every((x) => (x.id === r.id ? v : x.checked));
                        setSelectAll(all);
                        return prev;
                      });
                    }, 0);
                  }}
                />
              </div>

              <div className="rm-cell lab">
                <div className="rm-labText">{r.labText}</div>
              </div>

              <div className="rm-cell std">
                <div className="rm-stdText">{r.standard}</div>
              </div>

              <div className="rm-cell qty">
                <input
                  className="rm-miniInput"
                  value={r.qty}
                  onChange={(e) => setRow(r.id, { qty: e.target.value })}
                />
              </div>

              <div className="rm-cell expert">
                <select
                  className="rm-miniSelect"
                  value={r.expert}
                  onChange={(e) => setRow(r.id, { expert: e.target.value })}
                >
                  {experts.map((x) => (
                    <option key={x.value} value={x.value}>
                      {x.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rm-cell minutes">
                <div className="rm-minWrap">
                  <input
                    className="rm-miniInput"
                    value={r.minutes}
                    onChange={(e) => setRow(r.id, { minutes: e.target.value })}
                  />
                  <span className="rm-minLabel">|</span>
                </div>
              </div>

              <div className="rm-cell device">
                <select
                  className="rm-miniSelect"
                  value={r.device}
                  onChange={(e) => setRow(r.id, { device: e.target.value })}
                >
                  {devices.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ hedef ekrandaki küçük ikon kolonu */}
              <div className="rm-cell cal">
                <button
                  type="button"
                  className="rm-calBtn"
                  onClick={() => onCalendarClick(r.id)}
                  aria-label="calendar"
                  title="calendar"
                >
                  ▦
                </button>
              </div>

              <div className="rm-cell dt">
                <input
                  className="rm-dtInput"
                  placeholder={t("reservations.make.placeholders.start")}
                  value={r.start}
                  onChange={(e) => setRow(r.id, { start: e.target.value })}
                />
              </div>

              <div className="rm-cell dt">
                <input
                  className="rm-dtInput"
                  placeholder={t("reservations.make.placeholders.end")}
                  value={r.end}
                  onChange={(e) => setRow(r.id, { end: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>

        {/* sağ altta kapat */}
        <div className="rm-bottom">
          <button
            className="rm-closeBtn"
            type="button"
            onClick={() => onClose && onClose()}
          >
            {t("reservations.make.actions.close")}
          </button>
        </div>
      </div>
    </div>
  );
}