import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FaSearch,
  FaSlidersH,
  FaChevronDown,
  FaDownload,
  FaPlus,
  FaList,
  FaThLarge,
  FaEllipsisV,
  FaTimes,
  FaUpload,
  FaTrash,
  FaImage,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import "../styles/Ecommerce.css";

const initialProducts = [
  {
    id: 1,
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    number: "#790841",
    category: "Notebook",
    date: "12.09.20",
    price: 2500,
    status: "Available",
    image: null,
  },
  {
    id: 2,
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    number: "#790842",
    category: "Watch",
    date: "12.09.20",
    price: 2500,
    status: "Available",
    image: null,
  },
  {
    id: 3,
    name: "Apple iPhone 11 Pro Max 256GB Space Gray",
    number: "#790843",
    category: "Phone",
    date: "12.09.20",
    price: 2500,
    status: "Available",
    image: null,
  },
  {
    id: 4,
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    number: "#790844",
    category: "Watch",
    date: "12.09.20",
    price: 2500,
    status: "Available",
    image: null,
  },
  {
    id: 5,
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    number: "#790845",
    category: "Notebook",
    date: "12.09.20",
    price: 2500,
    status: "Disabled",
    image: null,
  },
  {
    id: 6,
    name: "Apple iPhone 11 Pro Max 64GB Midnight Green",
    number: "#790846",
    category: "Phone",
    date: "12.09.20",
    price: 2500,
    status: "Disabled",
    image: null,
  },
  {
    id: 7,
    name: "MacBook Pro 15 Retina Touch Bar MV902",
    number: "#790847",
    category: "Notebook",
    date: "12.09.20",
    price: 2500,
    status: "Available",
    image: null,
  },
  {
    id: 8,
    name: "Apple Watch Series 5 Edition GPS + Cellular",
    number: "#790848",
    category: "Watch",
    date: "12.09.20",
    price: 2500,
    status: "Available",
    image: null,
  },
];

const tabs = [
  "Information",
  "Images",
  "Pricing",
  "Inventory",
  "Shipping",
];

const emptyForm = {
  name: "Apple iPhone 11 Pro Max 64GB Midnight Green",
  description: "",
  category: "Phone",
  tags: "Apple, iPhone, 64GB",
  taxExcludedPrice: "2500",
  taxIncludedPrice: "0.00",
  taxRule: "US-AL Rate (4%)",
  unitPrice: "0.00",
  per: "0",
  sku: "0",
  quantity: "0",
  width: "0",
  height: "0",
  depth: "0",
  weight: "0",
  shippingFee: "0.00",
};

function Ecommerce() {
  const fileInputRef = useRef(null);
  const pageRef = useRef(null);

  const [products, setProducts] =
    useState(initialProducts);

  const [activeStatus, setActiveStatus] =
    useState("All");

  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const [exportOpen, setExportOpen] =
    useState(false);

  const [actionsOpen, setActionsOpen] =
    useState(false);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [addProductOpen, setAddProductOpen] =
    useState(false);

  const [productTab, setProductTab] =
    useState("Information");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [itemsPerPage, setItemsPerPage] =
    useState(10);

  const [dragActive, setDragActive] =
    useState(false);

  const [filter, setFilter] = useState({
    category: "All",
    status: "All",
    fromDate: "",
    toDate: "",
    minPrice: 500,
    maxPrice: 5500,
  });

  const [form, setForm] = useState(emptyForm);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const closeMenus = (event) => {
      if (
        pageRef.current &&
        !pageRef.current.contains(event.target)
      ) {
        setExportOpen(false);
        setActionsOpen(false);
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);

    return () =>
      document.removeEventListener(
        "mousedown",
        closeMenus
      );
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.number.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesTab =
        activeStatus === "All" ||
        product.status === activeStatus;

      const matchesCategory =
        filter.category === "All" ||
        product.category === filter.category;

      const matchesStatus =
        filter.status === "All" ||
        product.status === filter.status;

      const matchesPrice =
        product.price >= Number(filter.minPrice) &&
        product.price <= Number(filter.maxPrice);

      return (
        matchesSearch &&
        matchesTab &&
        matchesCategory &&
        matchesStatus &&
        matchesPrice
      );
    });
  }, [
    products,
    search,
    activeStatus,
    filter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / itemsPerPage
    )
  );

  const safePage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safePage - 1) * itemsPerPage;

  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const suggestions = search.trim()
    ? products
        .filter((product) =>
          product.name
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const toggleProduct = (id) => {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleAll = () => {
    const ids = visibleProducts.map(
      (product) => product.id
    );

    const allSelected =
      ids.length > 0 &&
      ids.every((id) => selected.includes(id));

    if (allSelected) {
      setSelected((previous) =>
        previous.filter((id) => !ids.includes(id))
      );
    } else {
      setSelected((previous) => [
        ...new Set([...previous, ...ids]),
      ]);
    }
  };

  const updateSelectedStatus = (status) => {
    if (!selected.length) return;

    setProducts((previous) =>
      previous.map((product) =>
        selected.includes(product.id)
          ? { ...product, status }
          : product
      )
    );

    setSelected([]);
    setActionsOpen(false);
  };

  const deleteSelected = () => {
    if (!selected.length) return;

    setProducts((previous) =>
      previous.filter(
        (product) => !selected.includes(product.id)
      )
    );

    setSelected([]);
    setActionsOpen(false);
    setCurrentPage(1);
  };

  const createImageObjects = (files) => {
    const validFiles = Array.from(files).filter(
      (file) => file.type.startsWith("image/")
    );

    const newImages = validFiles.map(
      (file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        url: URL.createObjectURL(file),
        cover:
          images.length === 0 && index === 0,
      })
    );

    setImages((previous) => [
      ...previous,
      ...newImages,
    ]);
  };

  const handleFiles = (event) => {
    createImageObjects(event.target.files);

    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    createImageObjects(event.dataTransfer.files);
  };

  const deleteImage = (id) => {
    setImages((previous) => {
      const removed = previous.find(
        (image) => image.id === id
      );

      if (removed?.url) {
        URL.revokeObjectURL(removed.url);
      }

      let updated = previous.filter(
        (image) => image.id !== id
      );

      if (
        updated.length &&
        !updated.some((image) => image.cover)
      ) {
        updated = updated.map((image, index) => ({
          ...image,
          cover: index === 0,
        }));
      }

      return updated;
    });
  };

  const setCoverImage = (id) => {
    setImages((previous) =>
      previous.map((image) => ({
        ...image,
        cover: image.id === id,
      }))
    );
  };

  const closeProductModal = () => {
    setAddProductOpen(false);
    setProductTab("Information");
  };

  const handleSaveProduct = () => {
    if (!form.name.trim()) {
      setProductTab("Information");
      return;
    }

    const cover =
      images.find((image) => image.cover) ||
      images[0];

    const product = {
      id: Date.now(),
      name: form.name.trim(),
      number: `#${Math.floor(
        100000 + Math.random() * 900000
      )}`,
      category: form.category,
      date: new Date().toLocaleDateString(
        "en-GB"
      ),
      price:
        Number(form.taxExcludedPrice) || 0,
      status: "Available",
      image: cover?.url || null,
    };

    setProducts((previous) => [
      product,
      ...previous,
    ]);

    setForm(emptyForm);
    setImages([]);
    setSearch("");
    setActiveStatus("All");
    setCurrentPage(1);

    closeProductModal();
  };

  const exportRows = filteredProducts.map(
    (product) => ({
      "Product Name": product.name,
      "Product No": product.number,
      Category: product.category,
      Date: product.date,
      Price: product.price,
      Status: product.status,
    })
  );

  const exportCSV = () => {
    const sheet =
      XLSX.utils.json_to_sheet(exportRows);

    const csv = XLSX.utils.sheet_to_csv(sheet);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "products.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const exportExcel = () => {
    const sheet =
      XLSX.utils.json_to_sheet(exportRows);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      sheet,
      "Products"
    );

    XLSX.writeFile(workbook, "products.xlsx");
  };

  const exportPDF = () => {
    const document = new jsPDF();

    document.text("Products", 14, 15);

    autoTable(document, {
      startY: 22,
      head: [
        [
          "Product",
          "No.",
          "Category",
          "Date",
          "Price",
          "Status",
        ],
      ],
      body: filteredProducts.map((product) => [
        product.name,
        product.number,
        product.category,
        product.date,
        `$${product.price}`,
        product.status,
      ]),
    });

    document.save("products.pdf");
  };

  const handleExport = (type) => {
    setExportOpen(false);

    if (type === "Print") {
      window.print();
    }

    if (type === "Excel") {
      exportExcel();
    }

    if (type === "PDF") {
      exportPDF();
    }

    if (type === "CSV") {
      exportCSV();
    }
  };

  return (
    <div className="products-page" ref={pageRef}>
      <div className="products-title-row">
        <h1>Products</h1>

        <div className="products-title-actions">
          <div className="export-wrapper">
            <button
              type="button"
              className="export-button"
              onClick={() => {
                setExportOpen(!exportOpen);
                setActionsOpen(false);
              }}
            >
              <FaDownload />
              Export
              <FaChevronDown />
            </button>

            {exportOpen && (
              <div className="export-menu">
                {[
                  "Print",
                  "Excel",
                  "PDF",
                  "CSV",
                ].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() =>
                      handleExport(type)
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="add-product-button"
            onClick={() => {
              setAddProductOpen(true);
              setProductTab("Information");
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="products-tabs-row">
        <div className="products-status-tabs">
          {[
            "All",
            "Available",
            "Disabled",
          ].map((status) => (
            <button
              type="button"
              key={status}
              className={
                activeStatus === status
                  ? "active"
                  : ""
              }
              onClick={() => {
                setActiveStatus(status);
                setCurrentPage(1);
              }}
            >
              {status}

              <span>
                {status === "All"
                  ? products.length
                  : products.filter(
                      (product) =>
                        product.status === status
                    ).length}
              </span>
            </button>
          ))}
        </div>

        <div className="view-buttons">
          <button
            type="button"
            className={
              view === "list" ? "active" : ""
            }
            onClick={() => setView("list")}
          >
            <FaList />
          </button>

          <button
            type="button"
            className={
              view === "grid" ? "active" : ""
            }
            onClick={() => setView("grid")}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      <section className="products-content-card">
        <div className="products-toolbar">
          <div className="product-search-wrapper">
            <div className="product-search">
              <FaSearch />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                >
                  <FaTimes />
                </button>
              )}

              <button
                type="button"
                className="filter-trigger"
                onClick={() => {
                  setFilterOpen(!filterOpen);
                  setActionsOpen(false);
                }}
              >
                <FaSlidersH />
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((product) => (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() =>
                      setSearch(product.name)
                    }
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="export-wrapper">
            <button
              type="button"
              className="actions-button"
              onClick={() => {
                setActionsOpen(!actionsOpen);
                setFilterOpen(false);
              }}
            >
              Actions
              <FaChevronDown />
            </button>

            {actionsOpen && (
              <div className="export-menu">
                <button
                  type="button"
                  onClick={() =>
                    updateSelectedStatus(
                      "Available"
                    )
                  }
                >
                  Enable Selected
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateSelectedStatus("Disabled")
                  }
                >
                  Disable Selected
                </button>

                <button
                  type="button"
                  onClick={deleteSelected}
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          {filterOpen && (
            <div className="products-filter-panel">
              <h2>Filter</h2>

              <label>Category</label>

              <select
                value={filter.category}
                onChange={(event) =>
                  setFilter((previous) => ({
                    ...previous,
                    category: event.target.value,
                  }))
                }
              >
                <option>All</option>
                <option>Phone</option>
                <option>Watch</option>
                <option>Notebook</option>
              </select>

              <label>Status</label>

              <select
                value={filter.status}
                onChange={(event) =>
                  setFilter((previous) => ({
                    ...previous,
                    status: event.target.value,
                  }))
                }
              >
                <option>All</option>
                <option>Available</option>
                <option>Disabled</option>
              </select>

              <label>Date</label>

              <div className="filter-date-row">
                <input
                  type="date"
                  value={filter.fromDate}
                  onChange={(event) =>
                    setFilter((previous) => ({
                      ...previous,
                      fromDate:
                        event.target.value,
                    }))
                  }
                />

                <input
                  type="date"
                  value={filter.toDate}
                  onChange={(event) =>
                    setFilter((previous) => ({
                      ...previous,
                      toDate: event.target.value,
                    }))
                  }
                />
              </div>

              <label>Price</label>

              <input
                type="range"
                min="500"
                max="5500"
                value={filter.maxPrice}
                onChange={(event) =>
                  setFilter((previous) => ({
                    ...previous,
                    maxPrice: event.target.value,
                  }))
                }
              />

              <div className="filter-price-values">
                <span>$500</span>
                <span>${filter.maxPrice}</span>
              </div>

              <button
                type="button"
                className="filter-save-button"
                onClick={() => {
                  setCurrentPage(1);
                  setFilterOpen(false);
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>

        {view === "list" ? (
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        visibleProducts.length > 0 &&
                        visibleProducts.every(
                          (product) =>
                            selected.includes(
                              product.id
                            )
                        )
                      }
                      onChange={toggleAll}
                    />
                  </th>

                  <th>PRODUCT NAME</th>
                  <th>PRODUCT NO.</th>
                  <th>CATEGORY</th>
                  <th>DATE</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(
                          product.id
                        )}
                        onChange={() =>
                          toggleProduct(product.id)
                        }
                      />
                    </td>

                    <td>{product.name}</td>
                    <td>{product.number}</td>
                    <td>{product.category}</td>
                    <td>{product.date}</td>

                    <td>
                      $
                      {product.price.toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`product-status ${product.status.toLowerCase()}`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="product-more"
                      >
                        <FaEllipsisV />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!visibleProducts.length && (
              <div
                style={{
                  padding: "45px",
                  textAlign: "center",
                  color: "#9ca1aa",
                }}
              >
                No products found
              </div>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <article
                className={`product-grid-card ${
                  selected.includes(product.id)
                    ? "selected"
                    : ""
                }`}
                key={product.id}
                onClick={() =>
                  toggleProduct(product.id)
                }
              >
                <div className="grid-product-top">
                  <span
                    className={`product-status ${product.status.toLowerCase()}`}
                  >
                    {product.status}
                  </span>

                  <span className="grid-select-circle">
                    {selected.includes(product.id) && (
                      <FaCheck />
                    )}
                  </span>
                </div>

                <div className="grid-product-image">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <FaImage />
                  )}
                </div>

                <div className="grid-product-info">
                  <h3>{product.name}</h3>

                  <div>
                    <span>{product.date}</span>
                    <span>{product.category}</span>

                    <span>
                      $
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="products-pagination">
          <div className="pagination-info">
            <select
              value={itemsPerPage}
              onChange={(event) => {
                setItemsPerPage(
                  Number(event.target.value)
                );
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>

            <span>
              Showing{" "}
              {filteredProducts.length
                ? startIndex + 1
                : 0}{" "}
              -{" "}
              {Math.min(
                startIndex + itemsPerPage,
                filteredProducts.length
              )}{" "}
              of {filteredProducts.length}
            </span>
          </div>

          <div className="pagination-buttons">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
            >
              <FaChevronLeft />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                type="button"
                key={page}
                className={
                  safePage === page ? "active" : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {addProductOpen && (
        <div
          className="product-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProductModal();
            }
          }}
        >
          <div className="add-product-modal">
            <div className="product-modal-tabs">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  className={
                    productTab === tab
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setProductTab(tab)
                  }
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="product-modal-close"
              onClick={closeProductModal}
            >
              <FaTimes />
            </button>

            {productTab === "Information" && (
              <div className="product-tab-content">
                <h2>Information</h2>

                <label>Product Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                />

                <label>Description</label>

                <div className="description-editor">
                  <div className="editor-toolbar">
                    <span>A</span>
                    <strong>B</strong>
                    <em>I</em>
                    <u>U</u>
                    <span>☰</span>
                    <span>☷</span>
                  </div>

                  <textarea
                    name="description"
                    placeholder="Type something"
                    value={form.description}
                    onChange={handleFormChange}
                  />
                </div>

                <label>Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                >
                  <option>Phone</option>
                  <option>Watch</option>
                  <option>Notebook</option>
                </select>

                <label>Tags</label>

                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleFormChange}
                />
              </div>
            )}

            {productTab === "Images" && (
              <div className="product-tab-content">
                <h2>Images</h2>

                <div
                  className={`product-upload-box ${
                    dragActive ? "drag-active" : ""
                  }`}
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  onDragEnter={(event) => {
                    event.preventDefault();
                    setDragActive(true);
                  }}
                  onDragOver={(event) =>
                    event.preventDefault()
                  }
                  onDragLeave={() =>
                    setDragActive(false)
                  }
                  onDrop={handleDrop}
                >
                  <FaUpload />

                  <p>
                    Drag and Drop or{" "}
                    <span>Browse</span> to upload
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleFiles}
                  />
                </div>

                <div className="image-list-heading">
                  <span>Image</span>
                  <span>Position</span>
                  <span>Cover</span>
                  <span />
                </div>

                {images.map((image, index) => (
                  <div
                    className="uploaded-image-row"
                    key={image.id}
                  >
                    <div className="uploaded-image-preview">
                      <img
                        src={image.url}
                        alt={image.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "7px",
                        }}
                      />
                    </div>

                    <span>{index + 1}</span>

                    <button
                      type="button"
                      className={`cover-button ${
                        image.cover ? "active" : ""
                      }`}
                      onClick={() =>
                        setCoverImage(image.id)
                      }
                    >
                      {image.cover && <FaCheck />}
                    </button>

                    <button
                      type="button"
                      className="delete-image-button"
                      onClick={() =>
                        deleteImage(image.id)
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {productTab === "Pricing" && (
              <div className="product-tab-content">
                <h2>Pricing</h2>

                <label>Tax Excluded Price</label>

                <input
                  name="taxExcludedPrice"
                  value={form.taxExcludedPrice}
                  onChange={handleFormChange}
                />

                <label>Tax Included Price</label>

                <input
                  name="taxIncludedPrice"
                  value={form.taxIncludedPrice}
                  onChange={handleFormChange}
                />

                <div className="tax-label-row">
                  <label>Tax Rule</label>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((previous) => ({
                        ...previous,
                        taxRule: "Custom Tax",
                      }))
                    }
                  >
                    Create New Tax
                  </button>
                </div>

                <select
                  name="taxRule"
                  value={form.taxRule}
                  onChange={handleFormChange}
                >
                  <option>US-AL Rate (4%)</option>
                  <option>
                    US-CA Rate (7.25%)
                  </option>
                  <option>Custom Tax</option>
                </select>

                <div className="product-double-field">
                  <div>
                    <label>Unit Price</label>

                    <input
                      name="unitPrice"
                      value={form.unitPrice}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div>
                    <label>Per</label>

                    <input
                      type="number"
                      name="per"
                      value={form.per}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {productTab === "Inventory" && (
              <div className="product-tab-content">
                <h2>Inventory</h2>

                <label>SKU</label>

                <input
                  name="sku"
                  value={form.sku}
                  onChange={handleFormChange}
                />

                <label>Quantity</label>

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleFormChange}
                />
              </div>
            )}

            {productTab === "Shipping" && (
              <div className="product-tab-content">
                <h2>Shipping</h2>

                <div className="product-double-field">
                  <div>
                    <label>Width</label>

                    <input
                      name="width"
                      value={form.width}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div>
                    <label>Height</label>

                    <input
                      name="height"
                      value={form.height}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="product-double-field">
                  <div>
                    <label>Depth</label>

                    <input
                      name="depth"
                      value={form.depth}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div>
                    <label>Weight</label>

                    <input
                      name="weight"
                      value={form.weight}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <label>Extra Shipping Fee</label>

                <input
                  name="shippingFee"
                  value={form.shippingFee}
                  onChange={handleFormChange}
                />
              </div>
            )}

            <div className="product-modal-actions">
              <button
                type="button"
                className="product-save-button"
                onClick={handleSaveProduct}
              >
                Save
              </button>

              <button
                type="button"
                className="product-cancel-button"
                onClick={closeProductModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ecommerce;