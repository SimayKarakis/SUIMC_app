// src/App.jsx
import React, { useMemo, useState, useCallback } from "react";
import "./App.css";
import { createTranslator } from "./i18n";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Pages
import HomePage from "./pages/HomePage";
import RequestListPage from "./pages/RequestListPage";
import ReservationMakePage from "./pages/ReservationMakePage";
import ReservationListPage from "./pages/ReservationListPage";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";
import UserAddPage from "./pages/UserAddPage";
import DeviceListPage from "./pages/DeviceListPage";
import DeviceAddPage from "./pages/DeviceAddPage";
import SettingsPage from "./pages/SettingsPage";
import TestPricingPage from "./pages/TestPricingPage";
import TestPricingDetailPage from "./pages/TestPricingDetailPage";

// ===== mock users =====
const initialUsers = [
  {
    id: 1,
    firstName: "Ahmet",
    lastName: "Demirelli",
    username: "ahmetdemirelli",
    password: "",
    email: "ahmet.demirelli@sabanciuniv.edu",
    phone: "",
    address: "",
    customerType: "internal",
    projectCode: "",
    department: "",
    lastLogin: "",
    company: "Sabancı Ünivers...",
    companyName: "Sabancı University (Istanbul)",
    companyWebsite: "",
    companyIndustry: "education",
    companyType: "university",
    status: "active",
  },
  {
    id: 2,
    firstName: "Aslı",
    lastName: "Yarım",
    username: "asliyarim",
    password: "",
    email: "asli.yarim@kordsa.com",
    phone: "",
    address: "",
    customerType: "external",
    projectCode: "",
    department: "",
    lastLogin: "",
    company: "KordSA",
    companyName: "KordSA",
    companyWebsite: "",
    companyIndustry: "industry",
    companyType: "company",
    status: "active",
  },
  {
    id: 3,
    firstName: "Simay",
    lastName: "Karakış",
    username: "simaykarakis",
    password: "",
    email: "simay.karakis@sabanciuniv.edu",
    phone: "",
    address: "",
    customerType: "internal",
    projectCode: "",
    department: "",
    lastLogin: "",
    company: "Sabancı Ünivers...",
    companyName: "Sabancı University (Istanbul)",
    companyWebsite: "",
    companyIndustry: "education",
    companyType: "university",
    status: "passive",
  },
];

// ===== mock devices =====
const initialDevices = [
  {
    id: 1,
    name: "PCR Cihazı",
    model: "BioRad T100",
    serialNo: "SN-10001",
    suCode: "SU-001",
    ktmmCode: "KTMM-9001",
    certificateInfo: "ISO 17025",
    lab: "lab1",
  },
  {
    id: 2,
    name: "Mikroskop",
    model: "Olympus CX23",
    serialNo: "SN-20002",
    suCode: "SU-014",
    ktmmCode: "KTMM-9020",
    certificateInfo: "Kalibrasyon Var",
    lab: "lab2",
  },
  {
    id: 3,
    name: "Santrifüj",
    model: "Eppendorf 5424",
    serialNo: "SN-30003",
    suCode: "SU-021",
    ktmmCode: "KTMM-9102",
    certificateInfo: "Sertifika Yok",
    lab: "lab1",
  },
];

export default function App() {
  const [lang, setLang] = useState("tr");
  const t = useMemo(() => createTranslator(lang), [lang]);

  // ✅ auth flow
  const [isAuthed, setIsAuthed] = useState(false);
  const [page, setPage] = useState("login"); // ✅ start with login

  // shared state
  const [users, setUsers] = useState(initialUsers);
  const [devices, setDevices] = useState(initialDevices);

  // selected items
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTestPricing, setSelectedTestPricing] = useState(null);

  const onLogout = useCallback(() => {
    // gerçek projede token temizlersin; biz mock
    setIsAuthed(false);
    setSelectedUser(null);
    setSelectedTestPricing(null);
    setPage("login");
  }, []);

  const onLoginSuccess = useCallback(() => {
    setIsAuthed(true);
    setPage("home");
  }, []);

  // ===== sidebar menu =====
  const menu = useMemo(
    () => [
      { key: "home", label: t("home.menu.home") },
      {
        key: "usersRoot",
        label: t("home.menu.users"),
        children: [
          { key: "usersList", label: t("home.menu.userList") },
          { key: "addUser", label: t("home.menu.addUser") },
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
          { key: "logs", label: t("home.menu.logs"), disabled: true },
        ],
      },
    ],
    [t]
  );

  const [openGroups, setOpenGroups] = useState({
    usersRoot: true,
    requestsRoot: true,
    devicesRoot: true,
    reservationsRoot: true,
    costRoot: true,
    settingsRoot: true,
  });

  const toggleGroup = (k) => setOpenGroups((p) => ({ ...p, [k]: !p[k] }));

  // ===== users actions =====
  const handleViewUser = (u) => {
    setSelectedUser(u);
    setPage("userDetail");
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
  };

  const handleCreateUser = (newUser) => {
    setUsers((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1;
      return [{ ...newUser, id: nextId }, ...prev];
    });
  };

  // ===== devices actions =====
  const handleCreateDevice = useCallback((newDevice) => {
    setDevices((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1;
      return [{ ...newDevice, id: nextId }, ...prev];
    });
  }, []);

  // ===== content router (authed only) =====
  const content = useMemo(() => {
    if (page === "home") return <HomePage lang={lang} />;

    if (page === "usersList")
      return (
        <UserListPage
          lang={lang}
          users={users}
          onBack={() => setPage("home")}
          onLogout={onLogout}
          onViewUser={handleViewUser}
          onGoAddUser={() => setPage("addUser")}
          onDeleteUser={handleDeleteUser}
        />
      );

    if (page === "userDetail")
      return (
        <UserDetailPage
          lang={lang}
          onBack={() => setPage("usersList")}
          onLogout={onLogout}
          initialUser={selectedUser}
        />
      );

    if (page === "addUser")
      return (
        <UserAddPage
          lang={lang}
          onBack={() => setPage("usersList")}
          onLogout={onLogout}
          onCreateUser={(u) => {
            handleCreateUser(u);
            setPage("usersList");
          }}
        />
      );

    if (page === "requestList")
      return (
        <RequestListPage
          lang={lang}
          onBackHome={() => setPage("home")}
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

    if (page === "devicesList")
      return (
        <DeviceListPage
          lang={lang}
          devices={devices}
          onBack={() => setPage("home")}
          onLogout={onLogout}
          onGoAddDevice={() => setPage("addDevice")}
        />
      );

    if (page === "addDevice")
      return (
        <DeviceAddPage
          lang={lang}
          onBack={() => setPage("devicesList")}
          onLogout={onLogout}
          onCreateDevice={(d) => {
            handleCreateDevice(d);
            setPage("devicesList");
          }}
        />
      );

    if (page === "testPricing")
      return (
        <TestPricingPage
          lang={lang}
          onBack={() => setPage("home")}
          onLogout={onLogout}
          onViewDetail={(row) => {
            setSelectedTestPricing(row);
            setPage("testPricingDetail");
          }}
        />
      );

    if (page === "testPricingDetail")
      return (
        <TestPricingDetailPage
          lang={lang}
          initialRow={selectedTestPricing}
          onBack={() => setPage("testPricing")}
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

    return <HomePage lang={lang} />;
  }, [
    page,
    lang,
    users,
    devices,
    selectedUser,
    selectedTestPricing,
    onLogout,
    handleCreateDevice,
  ]);

  // ✅ AUTH ROUTER
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