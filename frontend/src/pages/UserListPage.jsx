// src/pages/UserListPage.jsx
import React, { useMemo, useState } from "react";
import "./UserListPage.css";
import { createTranslator } from "../i18n";

const mockUsers = [
  {
    id: 1,
    firstName: "Ahmet",
    lastName: "Demirelli",
    username: "ahmetdemirelli",
    company: "Sabancı Ünivers...",
    customerType: "internal",
    status: "active",
    email: "ahmet.demirelli@sabanciuniv.edu",
  },
  {
    id: 2,
    firstName: "Aslı",
    lastName: "Yarım",
    username: "asliyarim",
    company: "KordSA",
    customerType: "external",
    status: "active",
    email: "asli.yarim@kordsa.com",
  },
  {
    id: 3,
    firstName: "Simay",
    lastName: "Karakış",
    username: "simaykarakis",
    company: "Sabancı Ünivers...",
    customerType: "internal",
    status: "passive",
    email: "simay.karakis@sabanciuniv.edu",
  },
];

export default function UserListPage({
  lang = "tr",
  // ✅ App.jsx genelde onBack gönderiyor; eski kodla uyum için ikisini de destekliyoruz
  onBack,
  onBackHome,
  onLogout,
  onViewUser,
}) {
  const t = createTranslator(lang);

  const [filters, setFilters] = useState({
    userType: "all",
    status: "all",
    name: "",
  });

  const filteredUsers = useMemo(() => {
    const nameQuery = filters.name.trim().toLowerCase();

    return mockUsers.filter((u) => {
      const matchesType =
        filters.userType === "all" ? true : u.customerType === filters.userType;

      const matchesStatus =
        filters.status === "all" ? true : u.status === filters.status;

      const matchesName =
        nameQuery.length === 0
          ? true
          : `${u.firstName} ${u.lastName} ${u.username} ${u.company}`
              .toLowerCase()
              .includes(nameQuery);

      return matchesType && matchesStatus && matchesName;
    });
  }, [filters]);

  const onSearch = (e) => {
    e.preventDefault();
  };

  const onExcel = () => alert(t("users.list.excelNotReady"));
  const onAddUser = () => alert(t("users.list.addUserNotReady"));

  const onEdit = (id) => alert(t("users.list.action.edit") + ` (id=${id})`);
  const onDelete = (id) => alert(t("users.list.action.delete") + ` (id=${id})`);

  // ✅ tek noktadan geri dönüş (hangisi geldiyse)
  const handleBackHome = () => {
    if (onBack) return onBack();
    if (onBackHome) return onBackHome();
  };

  return (
    <div className="page">
      {/* Header / Breadcrumb */}
      <div className="pageHeader">
        <div className="breadcrumb">
          <span className="crumb">{t("sidebar.users")}</span>
          <span className="sep">/</span>
          <span className="crumb active">{t("users.list.title")}</span>
        </div>

        <div className="pageActions">
          {(onBack || onBackHome) && (
            <button
              type="button"
              className="btn btnBack"
              onClick={handleBackHome}
            >
              ← {t("home.menu.home")}
            </button>
          )}

          {onLogout && (
            <button type="button" className="btn btnLogout" onClick={onLogout}>
              {t("home.menu.logout")}
            </button>
          )}
        </div>
      </div>

      <div className="card">
        {/* Filter Row */}
        <form className="filterRow" onSubmit={onSearch}>
          <div className="filterGroup">
            <label className="srOnly" htmlFor="userType">
              {t("users.list.filters.userType")}
            </label>
            <select
              id="userType"
              className="select"
              value={filters.userType}
              onChange={(e) =>
                setFilters((p) => ({ ...p, userType: e.target.value }))
              }
            >
              <option value="all">{t("common.all")}</option>
              <option value="internal">
                {t("users.list.customerType.internal")}
              </option>
              <option value="external">
                {t("users.list.customerType.external")}
              </option>
            </select>
          </div>

          <div className="filterGroup">
            <label className="srOnly" htmlFor="status">
              {t("users.list.filters.status")}
            </label>
            <select
              id="status"
              className="select"
              value={filters.status}
              onChange={(e) =>
                setFilters((p) => ({ ...p, status: e.target.value }))
              }
            >
              <option value="all">{t("common.all")}</option>
              <option value="active">{t("common.active")}</option>
              <option value="passive">{t("common.passive")}</option>
            </select>
          </div>

          <div className="filterGroup grow">
            <label className="srOnly" htmlFor="name">
              {t("users.list.filters.name")}
            </label>
            <input
              id="name"
              className="input"
              placeholder={t("users.list.filters.namePlaceholder")}
              value={filters.name}
              onChange={(e) =>
                setFilters((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>

          <button type="submit" className="btn btnSearch">
            {t("common.search")}
          </button>

          <button type="button" className="btn btnExcel" onClick={onExcel}>
            {t("common.excel")}
          </button>

          <button type="button" className="btn btnAdd" onClick={onAddUser}>
            <span className="plus">+</span> {t("users.list.addUser")}
          </button>
        </form>

        {/* Table */}
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>{t("users.list.table.firstName")}</th>
                <th>{t("users.list.table.lastName")}</th>
                <th>{t("users.list.table.username")}</th>
                <th>{t("users.list.table.company")}</th>
                <th>{t("users.list.table.customerType")}</th>
                <th>{t("users.list.table.status")}</th>
                <th className="actionsCol">{t("users.list.table.actions")}</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty">
                    {t("common.noResults")}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.firstName}</td>
                    <td>{u.lastName}</td>
                    <td>{u.username}</td>
                    <td className="truncate" title={u.company}>
                      {u.company}
                    </td>
                    <td>
                      {u.customerType === "internal"
                        ? t("users.list.customerType.internal")
                        : t("users.list.customerType.external")}
                    </td>
                    <td>
                      {u.status === "active"
                        ? t("common.active")
                        : t("common.passive")}
                    </td>

                    <td className="actionsCol">
                      {/* ✅ VIEW -> UserDetailPage */}
                      <button
                        className="iconBtn eye"
                        onClick={() => onViewUser && onViewUser(u)}
                        aria-label={t("users.list.action.view")}
                        type="button"
                        title={t("users.list.action.view")}
                      >
                        👁
                      </button>

                      {/* (opsiyonel) EDIT */}
                      <button
                        className="iconBtn edit"
                        onClick={() => onEdit(u.id)}
                        aria-label={t("users.list.action.edit")}
                        type="button"
                        title={t("users.list.action.edit")}
                      >
                        ✎
                      </button>

                      <button
                        className="iconBtn trash"
                        onClick={() => onDelete(u.id)}
                        aria-label={t("users.list.action.delete")}
                        type="button"
                        title={t("users.list.action.delete")}
                      >
                        🗑
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