import React, { useState } from "react";
import "./RegisterPage.css";
import { createTranslator } from "../i18n";

const RegisterPage = ({ lang = "tr", onBackToLogin, onRegistered }) => {
  const t = createTranslator(lang);

  const [customerType, setCustomerType] = useState("dis");

  const [form, setForm] = useState({
    companyName: "",
    companyWebsite: "",
    companyType: "",
    companyIndustry: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    university: "",
  });

  const [errors, setErrors] = useState({});

  const update = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.companyName.trim())
      newErrors.companyName = t("register.validation.companyNameRequired");

    if (!form.companyWebsite.trim())
      newErrors.companyWebsite = t("register.validation.companyWebsiteRequired");

    if (!form.companyType)
      newErrors.companyType = t("register.validation.companyTypeRequired");

    if (!form.companyIndustry)
      newErrors.companyIndustry = t("register.validation.companyIndustryRequired");

    if (!form.firstName.trim())
      newErrors.firstName = t("register.validation.firstNameRequired");

    if (!form.lastName.trim())
      newErrors.lastName = t("register.validation.lastNameRequired");

    if (!form.email.trim())
      newErrors.email = t("register.validation.emailRequired");
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = t("register.validation.emailInvalid");

    if (!form.phone.trim())
      newErrors.phone = t("register.validation.phoneRequired");

    if (customerType === "ic" && !form.university)
      newErrors.university = t("register.validation.universityRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert(t("register.successMock"));

    if (onRegistered) onRegistered();
    else if (onBackToLogin) onBackToLogin();
  };

  return (
    <div className="register-page">
      <div className="register-form-wrapper">
        <div className="register-form-section">
          <div className="register-form-header">{t("register.selectTypeHeader")}</div>

          <div className="register-type-inline">
            <div className="type-with-tooltip">
              <button
                type="button"
                className={`type-button ${customerType === "ic" ? "active" : ""}`}
                onClick={() => setCustomerType("ic")}
              >
                {t("register.internalCustomer")}
              </button>
              <div className="type-tooltip">{t("register.internalHelp")}</div>
            </div>

            <div className="type-with-tooltip">
              <button
                type="button"
                className={`type-button ${customerType === "dis" ? "active" : ""}`}
                onClick={() => setCustomerType("dis")}
              >
                {t("register.externalCustomer")}
              </button>
              <div className="type-tooltip">{t("register.externalHelp")}</div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <div className="register-form-section">
            <div className="register-form-subheader">{t("register.companySection")}</div>

            <div className="register-form-body">
              {[
                ["companyName", t("register.companyName")],
                ["companyWebsite", t("register.companyWebsite")],
              ].map(([key, label]) => (
                <div className="reg-form-group" key={key}>
                  <label className="reg-label">{label}</label>
                  <input
                    className={`reg-input ${errors[key] ? "input-error" : ""}`}
                    value={form[key]}
                    onChange={(e) => update(key, e.target.value)}
                  />
                  {errors[key] && <span className="error-text">{errors[key]}</span>}
                </div>
              ))}

              <div className="reg-form-group">
                <label className="reg-label">{t("register.companyType")}</label>
                <select
                  className={`reg-input ${errors.companyType ? "input-error" : ""}`}
                  value={form.companyType}
                  onChange={(e) => update("companyType", e.target.value)}
                >
                  <option value="">{t("register.choose")}</option>
                  <option value="company">{t("register.companyTypeOpt.company")}</option>
                  <option value="university">{t("register.companyTypeOpt.university")}</option>
                  <option value="other">{t("register.companyTypeOpt.other")}</option>
                </select>
                {errors.companyType && <span className="error-text">{errors.companyType}</span>}
              </div>

              <div className="reg-form-group">
                <label className="reg-label">{t("register.companyIndustry")}</label>
                <select
                  className={`reg-input ${errors.companyIndustry ? "input-error" : ""}`}
                  value={form.companyIndustry}
                  onChange={(e) => update("companyIndustry", e.target.value)}
                >
                  <option value="">{t("register.choose")}</option>
                  <option value="education">{t("register.companyIndustryOpt.education")}</option>
                  <option value="industry">{t("register.companyIndustryOpt.industry")}</option>
                  <option value="other">{t("register.companyIndustryOpt.other")}</option>
                </select>
                {errors.companyIndustry && (
                  <span className="error-text">{errors.companyIndustry}</span>
                )}
              </div>
            </div>
          </div>

          <div className="register-form-section">
            <div className="register-form-header">{t("register.regHeader")}</div>

            <div className="register-form-body">
              {[
                ["firstName", t("register.firstName")],
                ["lastName", t("register.lastName")],
                ["email", t("register.email")],
                ["phone", t("register.phone")],
              ].map(([key, label]) => (
                <div className="reg-form-group" key={key}>
                  <label className="reg-label">{label}</label>
                  <input
                    className={`reg-input ${errors[key] ? "input-error" : ""}`}
                    value={form[key]}
                    onChange={(e) => update(key, e.target.value)}
                  />
                  {errors[key] && <span className="error-text">{errors[key]}</span>}
                </div>
              ))}

              {customerType === "ic" && (
                <div className="reg-form-group">
                  <label className="reg-label">{t("register.universityOptional")}</label>
                  <select
                    className={`reg-input ${errors.university ? "input-error" : ""}`}
                    value={form.university}
                    onChange={(e) => update("university", e.target.value)}
                  >
                    <option value="">{t("register.choose")}</option>
                    <option value="sabanci">{t("register.universityOpt.sabanci")}</option>
                  </select>
                  {errors.university && <span className="error-text">{errors.university}</span>}
                </div>
              )}

              <div className="register-bottom-actions">
                <button type="button" className="reg-back-button" onClick={onBackToLogin}>
                  {t("register.backToLogin")}
                </button>

                <button type="submit" className="reg-submit-button">
                  {t("register.submit")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;