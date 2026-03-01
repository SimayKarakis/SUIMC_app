// src/pages/UserListPage.jsx
import React, { useMemo, useState } from "react";
import "./UserListPage.css";
import { createTranslator } from "../i18n";

export default function UserListPage({
  lang = "tr",
  users = [],
  onBack,
  onBackHome, // eski uyumluluk
  onLogout,
  onViewUser,
  onGoAddUser,
  onDeleteUser,
}) {
  const t = createTranslator(lang);

  const [filters, setFilters] = useState({
    userType: "all",
    status: "all",
    name: "",
  });

  const filteredUsers = useMemo(() => {
    const nameQuery = filters.name.trim().toLowerCase();

    return (users || []).filter((u) => {
      const matchesType =
        filters.userType === "all" ? true : u.customerType === filters.userType;

      const matchesStatus =
        filters.status === "all" ? true : u.status === filters.status;

      const matchesName =
        nameQuery.length === 0
          ? true
          : `${u.firstName} ${u.lastName} ${u.username} ${u.company || ""}`
              .toLowerCase()
              .includes(nameQuery);

      return matchesType && matchesStatus && matchesName;
    });
  }, [filters, users]);

  const onSearch = (e) => {
    e.preventDefault();
  };

  const onExcel = () => alert(t("users.list.excelNotReady"));

  const handleAddUser = () => {
    if (onGoAddUser) onGoAddUser();
    else alert(t("users.list.addUserNotReady"));
  };

  const handleDelete = (id) => {
    // istersen confirm ekleyebiliriz ama şimdilik direkt siliyor
    if (onDeleteUser) onDeleteUser(id);
  };

  const backHandler = onBack || onBackHome;

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
          {backHandler && (
            <button type="button" className="btn btnBack" onClick={backHandler}>
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

          <button type="button" className="btn btnAdd" onClick={handleAddUser}>
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
                    <td className="truncate" title={u.company || ""}>
                      {u.company || "-"}
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
                      <button
                        className="iconBtn eye"
                        onClick={() => onViewUser && onViewUser(u)}
                        aria-label={t("users.list.action.view")}
                        type="button"
                        title={t("users.list.action.view")}
                      >
                        👁
                      </button>

                      {/* ✅ edit removed */}

                      <button
                        className="iconBtn trash"
                        onClick={() => handleDelete(u.id)}
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