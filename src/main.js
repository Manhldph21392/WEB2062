import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import AdminProductAdd from "./admin/Product-add";
import AdminProductEdit from "./admin/Product-edit";
import AdminProductsPage from "./admin/Products";
import { render, router } from "./lib";

const app = document.querySelector("#app");
router.on("/products", () => render(AdminProductsPage, app));
router.on("/products/add", () => render(AdminProductAdd, app));
router.on("/products/:id/edit", ({ data }) => render(() => AdminProductEdit(data), app));



router.resolve();
