import React, { useState } from "react";
import ProductInsert from "../../components/ProductInsert/ProductInsert";
import ProductUpdate from "../../components/ProductUpdate/ProductUpdate";
import "./ProductAdminPage.css"

const ProductAdminPage = () => {
  const [view, setView] = useState("insert");

  return (
    <div>
      <h1 className="header1">Product Management</h1>
      <div className="admin-page">
        <button
          className={view === "insert" ? "active" : ""}
          onClick={() => setView("insert")}
        >
          Insert
        </button>
        <button
          className={view === "update" ? "active" : ""}
          onClick={() => setView("update")}
        >
          Update
        </button>
      </div>
      {view === "insert" && <ProductInsert />}
      {view === "update" && <ProductUpdate />}
    </div>
  );
};

export default ProductAdminPage;