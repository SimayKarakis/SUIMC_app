// src/pages/LoginPage.jsx
import React, { useMemo, useState } from "react";
import "./LoginPage.css";
import { createTranslator } from "../i18n";

const LoginPage = ({ lang = "tr", onLangChange, onGoRegister, onLoginSuccess }) => {
  const t = useMemo(() => createTranslator(lang), [lang]);

  // ✅ t(key) key'i aynen döndürüyorsa fallback kullan
  const tr = (key, fallbackTr, fallbackEn) => {
    const v = t(key);
    if (v === key) return lang === "en" ? fallbackEn : fallbackTr;
    return v;
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const canSubmit = useMemo(() => {
    return username.trim().length > 0 && password.trim().length > 0;
  }, [username, password]);

  const validateLogin = () => {
    const e = {};

    if (!username.trim()) {
      e.username = tr(
        "login.usernameRequired",
        "Kullanıcı adı zorunlu.",
        "Username is required."
      );
    }

    if (!password.trim()) {
      e.password = tr(
        "login.passwordRequired",
        "Şifre zorunlu.",
        "Password is required."
      );
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    // TODO: backend login varsa burada çağır
    onLoginSuccess?.();
  };

  const handleOpenReset = () => {
    setShowReset(true);
    setResetSent(false);
  };

  const handleSendReset = () => {
    if (!resetEmail.trim()) {
      alert(tr("login.enterEmail", "Lütfen e-posta girin.", "Please enter an email."));
      return;
    }
    setResetSent(true);
  };

  const handleCancelReset = () => {
    setShowReset(false);
    setResetEmail("");
    setResetSent(false);
  };

  return (
    <div className="login-page">
      <div className="login-page-inner">
        {/* Dil seçimi */}
        <div className="language-box">
          <div className="language-options">
            <button
              type="button"
              className={`language-option ${lang === "tr" ? "active" : ""}`}
              onClick={() => onLangChange?.("tr")}
            >
              <span className={`language-radio ${lang === "tr" ? "language-radio--active" : ""}`} />
              <span className="language-text">{tr("login.turkish", "Türkçe", "Turkish")}</span>
            </button>

            <button
              type="button"
              className={`language-option ${lang === "en" ? "active" : ""}`}
              onClick={() => onLangChange?.("en")}
            >
              <span className={`language-radio ${lang === "en" ? "language-radio--active" : ""}`} />
              <span className="language-text">{tr("login.english", "İngilizce", "English")}</span>
            </button>
          </div>
        </div>

        <div className="content-wrapper">
          {/* Logo */}
          <div className="logo-wrapper">
            <div className="logo-left">
              <span className="logo-su">SU</span>
              <span className="logo-bar" />
              <span className="logo-imc">IMC</span>
            </div>
            <div className="logo-right">
              <div className="logo-line">SABANCI UNIVERSITY</div>
              <div className="logo-line">INTEGRATED MANUFACTURING TECHNOLOGIES</div>
              <div className="logo-line">RESEARCH AND APPLICATION CENTER</div>
            </div>
          </div>

          {/* Card */}
          <div className="login-card">
            <div className="login-card-header">{tr("login.header", "Giriş", "Login")}</div>

            <form className="login-card-body" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  {tr("login.username", "Kullanıcı Adı", "Username")}
                </label>
                <input
                  id="username"
                  type="text"
                  className={`form-input ${errors.username ? "form-input--error" : ""}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={validateLogin}
                  autoComplete="username"
                />
                {errors.username && <div className="form-error">{errors.username}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  {tr("login.password", "Şifre", "Password")}
                </label>
                <input
                  id="password"
                  type="password"
                  className={`form-input ${errors.password ? "form-input--error" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validateLogin}
                  autoComplete="current-password"
                />
                {errors.password && <div className="form-error">{errors.password}</div>}
              </div>

              <div className="login-card-footer">
                <button className="btn btn-secondary" type="button" onClick={onGoRegister}>
                  {tr("login.register", "Kayıt", "Register")}
                </button>

                <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
                  {tr("login.signIn", "Giriş", "Sign in")}
                </button>
              </div>

              <button className="forgot-password" type="button" onClick={handleOpenReset}>
                {tr("login.forgot", "Parolanızı mı unuttunuz?", "Forgot password?")}
              </button>

              {showReset && (
                <div className="reset-box">
                  <div className="reset-title">
                    {tr("login.resetTitle", "Şifre Sıfırlama", "Reset Password")}
                  </div>
                  <p className="reset-description">
                    {tr("login.resetDescription", "E-posta adresinizi girin.", "Enter your email address.")}
                  </p>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reset-email">
                      {tr("login.emailLabel", "E-posta", "Email")}
                    </label>
                    <input
                      id="reset-email"
                      type="email"
                      className="form-input"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                  </div>

                  <div className="reset-actions">
                    <button type="button" className="btn btn-secondary" onClick={handleCancelReset}>
                      {tr("login.cancel", "İptal", "Cancel")}
                    </button>

                    <button type="button" className="btn btn-primary" onClick={handleSendReset}>
                      {tr("login.sendReset", "Gönder", "Send")}
                    </button>
                  </div>

                  {resetSent && (
                    <div className="reset-success">
                      {tr("login.resetSent", "Sıfırlama bağlantısı gönderildi.", "Reset link sent.")}
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
