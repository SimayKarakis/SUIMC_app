// src/App.jsx
import React, { useMemo, useState, useCallback } from "react";
import "./App.css";
import { createTranslator } from "./i18n";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import HomePage from "./pages/HomePage";
import RequestListPage from "./pages/RequestListPage";
import ReservationMakePage from "./pages/ReservationMakePage";
import ReservationListPage from "./pages/ReservationListPage";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";
import DeviceListPage from "./pages/DeviceListPage";
import DeviceAddPage from "./pages/DeviceAddPage"; // ✅ EKLENDİ
import SettingsPage from "./pages/SettingsPage";
import TestPricingPage from "./pages/TestPricingPage";

export default function App() {
  const [lang, setLang] = useState("tr");
  const t = useMemo(() => createTranslator(lang), [lang]);

  const [isAuthed, setIsAuthed] = useState(false);
  const [page, setPage] = useState("login");
  const [selectedUser, setSelectedUser] = useState(null);

  const [openGroups, setOpenGroups] = useState({
    usersRoot: true,
    requestsRoot: true,
    devicesRoot: true,
    reservationsRoot: true,
    costRoot: true,
    settingsRoot: true,
  });

  const toggleGroup = useCallback((k) => {
    setOpenGroups((p) => ({ ...p, [k]: !p[k] }));
  }, []);

  const onLogout = useCallback(() => {
    setIsAuthed(false);
    setSelectedUser(null);
    setPage("login");
  }, []);

  const onLoginSuccess = useCallback(() => {
    setIsAuthed(true);
    setPage("home");
  }, []);

  const menu = useMemo(
    () => [
      { key: "home", label: t("home.menu.home") },
      {
        key: "usersRoot",
        label: t("home.menu.users"),
        children: [
          { key: "usersList", label: t("home.menu.userList") },
          { key: "addUser", label: t("home.menu.addUser"), disabled: true },
        ],
      },
      {
        key: "requestsRoot",
        label: t("home.menu.requests"),
        children: [{ key: "requestList", label: t("home.menu.requestList") }],
      },
      {
        key: "devicesRoot",
        label: t("home.menu.devices"),
        children: [
          { key: "devicesList", label: t("home.menu.deviceList") },
          // ✅ ARTIK TIKLANABİLİR
          { key: "addDevice", label: t("home.menu.addDevice") },
        ],
      },
      {
        key: "reservationsRoot",
        label: t("home.menu.reservations"),
        children: [
          { key: "reservationsList", label: t("home.menu.reservationList") },
          { key: "makeReservation", label: t("home.menu.makeReservation") },
        ],
      },
      {
        key: "costRoot",
        label: t("home.menu.cost"),
        children: [{ key: "testPricing", label: t("home.menu.testPricing") }],
      },
      {
        key: "settingsRoot",
        label: t("home.menu.system"),
        children: [
          { key: "settings", label: t("home.menu.settings") },
          { key: "rules", label: t("home.menu.rules"), disabled: true },
          { key: "languages", label: t("home.menu.languages"), disabled: true },
          { key: "logs", label: t("home.menu.logs"), disabled: true },
        ],
      },
    ],
    [t]
  );

  const content = useMemo(() => {
    if (page === "home") return <HomePage lang={lang} />;

    if (page === "requestList")
      return (
        <RequestListPage
          lang={lang}
          onBack={() => setPage("home")}
          onLogout={onLogout}
        />
      );

    if (page === "makeReservation")
      return (
        <ReservationMakePage
          lang={lang}
          onBack={() => setPage("home")}
          onLogout={onLogout}
          onClose={() => setPage("reservationsList")}
        />
      );

    if (page === "reservationsList")
      return (
        <ReservationListPage
          lang={lang}
          onBack={() => setPage("home")}
          onLogout={onLogout}
        />
      );

    if (page === "usersList")
      return (
        <UserListPage
          lang={lang}
          onBack={() => setPage("home")}
          onLogout={onLogout}
          onViewUser={(u) => {
            setSelectedUser(u);
            setPage("userDetail");
          }}
        />
      );

    if (page === "userDetail")
      return (
        <UserDetailPage
          lang={lang}
          user={selectedUser}
          onBack={() => setPage("usersList")}
          onLogout={onLogout}
        />
      );

    if (page === "devicesList")
      return (
        <DeviceListPage
          lang={lang}
          onBack={() => setPage("home")}
          onLogout={onLogout}
        />
      );

    // ✅ EKLENDİ: addDevice sayfası
    if (page === "addDevice")
      return (
        <DeviceAddPage
          lang={lang}
          onBack={() => setPage("devicesList")}
          onLogout={onLogout}
        />
      );

    if (page === "settings")
      return (
        <SettingsPage
          lang={lang}
          onBack={() => setPage("home")}
          onLogout={onLogout}
        />
      );

    if (page === "testPricing")
      return (
        <TestPricingPage
          lang={lang}
          onBack={() => setPage("home")}
          onLogout={onLogout}
        />
      );

    return <HomePage lang={lang} />;
  }, [page, lang, selectedUser, onLogout]);

  // ✅ NOT AUTHED
  if (!isAuthed) {
    if (page === "register") {
      return (
        <RegisterPage
          lang={lang}
          onLangChange={setLang}
          onBackToLogin={() => setPage("login")}
          onRegistered={() => setPage("login")}
        />
      );
    }

    return (
      <LoginPage
        lang={lang}
        onLangChange={setLang}
        onLoginSuccess={onLoginSuccess}
        onGoRegister={() => setPage("register")}
      />
    );
  }

  // ✅ AUTHED LAYOUT
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-sidebarTop">
          <div className="app-sidebarTitle">{t("home.pageTitle")}</div>

          <div className="app-langSwitch">
            <button
              type="button"
              className={`app-langBtn ${lang === "tr" ? "active" : ""}`}
              onClick={() => setLang("tr")}
            >
              TR
            </button>
            <button
              type="button"
              className={`app-langBtn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>

        <nav className="app-nav">
          {menu.map((item) => {
            if (!item.children) {
              return (
                <button
                  key={item.key}
                  className={`app-navItem ${page === item.key ? "active" : ""}`}
                  onClick={() => setPage(item.key)}
                  type="button"
                >
                  {item.label}
                </button>
              );
            }

            const isOpen = !!openGroups[item.key];

            return (
              <div key={item.key} className="app-navGroup">
                <button
                  type="button"
                  className="app-navGroupHeader"
                  onClick={() => toggleGroup(item.key)}
                >
                  <span>{item.label}</span>
                  <span className="app-navCaret">{isOpen ? "▾" : "▸"}</span>
                </button>

                {isOpen && (
                  <div className="app-navChildren">
                    {item.children.map((ch) => (
                      <button
                        key={ch.key}
                        type="button"
                        disabled={!!ch.disabled}
                        className={`app-navChild ${
                          page === ch.key ? "active" : ""
                        }`}
                        onClick={() => !ch.disabled && setPage(ch.key)}
                      >
                        {ch.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="app-sidebarBottom">
          <button className="app-logout" type="button" onClick={onLogout}>
            {t("home.menu.logout")}
          </button>
        </div>
      </aside>

      <main className="app-main">
        <div className="app-topbar">
          <div className="app-topbarSpacer" />
          <div className="app-avatar" title="User">
            S
          </div>
        </div>
        <div className="app-content">{content}</div>
      </main>
    </div>
  );
}
