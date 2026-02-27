// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import "./RegisterPage.css";
import { createTranslator } from "../i18n";

const RegisterPage = ({ lang = "tr", onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [customerType, setCustomerType] = useState(null);
  const t = createTranslator(lang);

  const handleTypeClick = (type) => {
    setCustomerType(type);
    setStep(2);
  };

  // STEP 1: Tip seç
  if (step === 1) {
    return (
      <div className="register-page">
        <div className="register-wrapper">
          <div className="register-type-card">
            <div className="register-type-header">
              {t("register.selectTypeHeader")}
            </div>

            <div className="register-type-body">
              <button
                type="button"
                className="type-button"
                onClick={() => handleTypeClick("dis")}
              >
                {t("register.externalCustomer")}
              </button>

              <button
                type="button"
                className="type-button"
                onClick={() => handleTypeClick("ic")}
              >
                {t("register.internalCustomer")}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="back-to-login-link"
            onClick={onBackToLogin}
          >
            {t("register.backToLogin")}
          </button>
        </div>
      </div>
    );
  }

  // STEP 2: Form
  return (
    <div className="register-page">
      <div className="register-form-wrapper">
        <div className="register-form-section">
          <div className="register-form-header">
            {t("register.selectTypeHeader")}
          </div>
        </div>

        <div className="register-form-section">
          <div className="register-form-subheader">{t("register.companySection")}</div>

          <div className="register-form-body">
            <div className="reg-form-group">
              <label className="reg-label">{t("register.companyName")}</label>
              <input className="reg-input" type="text" />
            </div>

            <div className="reg-form-group">
              <label className="reg-label">{t("register.companyWebsite")}</label>
              <input className="reg-input" type="text" />
            </div>

            <div className="reg-form-group">
              <label className="reg-label">{t("register.companyType")}</label>
              <select className="reg-input">
                <option>{t("register.choose")}</option>
              </select>
            </div>

            <div className="reg-form-group">
              <label className="reg-label">{t("register.companyIndustry")}</label>
              <select className="reg-input">
                <option>{t("register.choose")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="register-form-section">
          <div className="register-form-header">{t("register.regHeader")}</div>

          <div className="register-form-body">
            <div className="reg-form-group">
              <label className="reg-label">{t("register.firstName")}</label>
              <input className="reg-input" type="text" />
            </div>

            <div className="reg-form-group">
              <label className="reg-label">{t("register.lastName")}</label>
              <input className="reg-input" type="text" />
            </div>

            <div className="reg-form-group">
              <label className="reg-label">{t("register.email")}</label>
              <input className="reg-input" type="email" />
            </div>

            <div className="reg-form-group">
              <label className="reg-label">{t("register.phone")}</label>
              <input className="reg-input" type="tel" />
            </div>

            <div className="reg-form-group">
              <label className="reg-label">{t("register.universityOptional")}</label>
              <select className="reg-input">
                <option>{t("register.choose")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="register-bottom-actions">
          <button
            type="button"
            className="reg-back-button"
            onClick={() => setStep(1)}
          >
            {t("register.back")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;