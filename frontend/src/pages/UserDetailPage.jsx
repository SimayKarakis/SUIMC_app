// src/pages/UserDetailPage.jsx
import React, { useMemo, useState } from "react";
import "./UserDetailPage.css";
import { createTranslator } from "../i18n";

export default function UserDetailPage({ lang = "tr", user, onBack }) {
  const t = createTranslator(lang);

  const initial = useMemo(() => {
    const u = user || {};
    return {
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      username: u.username || "",
      password: "************",
      email: u.email || "simay.karakis@sabanciuniv.edu",
      customerType: u.customerType || "internal", // internal | external
      projectCode: "333444555",
      phone: "0(533)0000000",
      address: "Tuzla / İstanbul",
      allUnit: "Sabancı Üniversitesi (İstanbul)",
      department: "Yazılım Geliştirme",
      lastLogin: "17.11.2025 17:23:44",
      companyName: u.company || "Sabancı Üniversitesi",
      companyWebsite: "https://www.sabanciuniv.edu/tr",
      companyIndustry: "education", // education | industry | other
      companyType: "university" // university | company | other
    };
  }, [user]);

  const [form, setForm] = useState(initial);

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const onCancel = () => onBack && onBack();
  const onUpdate = () => alert(t("users.detail.updated"));

  return (
    <div className="ud-page">
      <div className="ud-header">
        <div className="ud-breadcrumb">
          <span className="ud-crumb">{t("sidebar.users")}</span>
          <span className="ud-sep">/</span>
          <span className="ud-crumb">{t("users.list.title")}</span>
          <span className="ud-sep">/</span>
          <span className="ud-crumb active">{t("users.detail.title")}</span>
        </div>
      </div>

      <div className="ud-card">
        {/* Row 1: Ad Soyad */}
        <div className="ud-row two">
          <div className="ud-label">{t("users.detail.fullName")}</div>
          <div className="ud-field twoFields">
            <input
              className="ud-input"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder={t("users.detail.firstName")}
            />
            <input
              className="ud-input"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder={t("users.detail.lastName")}
            />
          </div>
        </div>

        {/* Kullanıcı adı */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.username")}</div>
          <div className="ud-field">
            <input
              className="ud-input"
              value={form.username}
              onChange={(e) => update("username", e.target.value)}
            />
          </div>
        </div>

        {/* Şifre */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.password")}</div>
          <div className="ud-field">
            <input className="ud-input" value={form.password} readOnly />
          </div>
        </div>

        {/* Email */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.email")}</div>
          <div className="ud-field">
            <input
              className="ud-input"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>

        {/* Müşteri tipi */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.customerType")}</div>
          <div className="ud-field">
            <select
              className="ud-input"
              value={form.customerType}
              onChange={(e) => update("customerType", e.target.value)}
            >
              <option value="internal">
                {t("users.list.customerType.internal")}
              </option>
              <option value="external">
                {t("users.list.customerType.external")}
              </option>
            </select>
          </div>
        </div>

        {/* Proje kodu */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.projectCode")}</div>
          <div className="ud-field">
            <input
              className="ud-input"
              value={form.projectCode}
              onChange={(e) => update("projectCode", e.target.value)}
            />
          </div>
        </div>

        {/* Telefon */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.phone")}</div>
          <div className="ud-field">
            <input
              className="ud-input"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        </div>

        {/* Adres */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.address")}</div>
          <div className="ud-field">
            <input
              className="ud-input"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
        </div>

        {/* Tümü */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.all")}</div>
          <div className="ud-field">
            <select
              className="ud-input"
              value={form.allUnit}
              onChange={(e) => update("allUnit", e.target.value)}
            >
              <option value="Sabancı Üniversitesi (İstanbul)">
                {t("users.detail.allOption")}
              </option>
            </select>
          </div>
        </div>

        {/* Departman */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.department")}</div>
          <div className="ud-field">
            <input
              className="ud-input"
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
            />
          </div>
        </div>

        {/* Son giriş */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.lastLogin")}</div>
          <div className="ud-field">
            <input className="ud-input" value={form.lastLogin} readOnly />
          </div>
        </div>

        {/* Şirket bilgileri header */}
        <div className="ud-sectionTitle">{t("users.detail.companySection")}</div>

        {/* Şirket adı */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.companyName")}</div>
          <div className="ud-field">
            <input
              className="ud-input"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
            />
          </div>
        </div>

        {/* Web site */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.companyWebsite")}</div>
          <div className="ud-field">
            <input
              className="ud-input"
              value={form.companyWebsite}
              onChange={(e) => update("companyWebsite", e.target.value)}
            />
          </div>
        </div>

        {/* Endüstri */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.companyIndustry")}</div>
          <div className="ud-field">
            <select
              className="ud-input"
              value={form.companyIndustry}
              onChange={(e) => update("companyIndustry", e.target.value)}
            >
              <option value="education">
                {t("users.detail.industry.education")}
              </option>
              <option value="industry">
                {t("users.detail.industry.industry")}
              </option>
              <option value="other">{t("users.detail.industry.other")}</option>
            </select>
          </div>
        </div>

        {/* Şirket türü */}
        <div className="ud-row">
          <div className="ud-label">{t("users.detail.companyType")}</div>
          <div className="ud-field">
            <select
              className="ud-input"
              value={form.companyType}
              onChange={(e) => update("companyType", e.target.value)}
            >
              <option value="university">{t("users.detail.type.university")}</option>
              <option value="company">{t("users.detail.type.company")}</option>
              <option value="other">{t("users.detail.type.other")}</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="ud-actions">
          <button className="ud-btn cancel" type="button" onClick={onCancel}>
            {t("common.cancel")}
          </button>
          <button className="ud-btn update" type="button" onClick={onUpdate}>
            {t("common.update")}
          </button>
        </div>
      </div>
    </div>
  );
}