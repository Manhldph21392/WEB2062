import { router, useEffect } from "../lib";
import axios from "axios";
const AdminProductAdd = () => {
  useEffect(() => {
    const form = document.getElementById("form-add");
    const productName = document.getElementById("product-name");
    const productImage = document.getElementById("product-img");
    const productDesc = document.getElementById("product-desc");
    const productCategories = document.getElementById("product-cat");
    const productPrice = document.getElementById("product-price");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log(productImage.files)
      const urls = await uploadFiles(productImage.files);
      const newProduct = {
        name: productName.value,
        desc: productDesc.value,
        image: productImage.value,
        categories: productCategories.value,
        price: productPrice.value,
        gallery: urls,
        
      };
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }).then(() => router.navigate("/products"));
    });
  });

  const uploadFiles = async (files) => {
    if (files) {
      const CLOUD_NAME = "dfs9nuwom";
      const PRESET_NAME = "demo-upload";
      const FOLDER_NAME = "ECMA";
      const urls = [];
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);
      for (const file of files) {
        formData.append("file", file);
        const response = await axios.post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        urls.push(response.data.secure_url);
        return urls;
      }
    }
  };
  return /*html*/ `
    <div>
    <h1>Thêm sản phẩm</h1>
<form action="" id="form-add">
    <div class="form-group mb-3">
        <label for="">Product Name</label>
        <input type="text" id="product-name" class="form-control">
    </div>
    <div class="form-group mb-3">
        <label for="">Desc</label>
        <input type="text" id="product-desc" class="form-control">
    </div>
    <div class="form-group mb-3">
        <label for="">Image</label>
        <input type="file" id="product-img" class="form-control">
    </div>
    <div class="form-group mb-3">
        <label for="">Categories</label>
        <input type="text" id="product-cat" class="form-control">
    </div>
    <div class="form-group mb-3">
        <label for="">Price</label>
        <input type="text" id="product-price" class="form-control">
    </div>
    <div class="form-group">
        <button class="btn btn-primary">Add</button>
    </div>
</form>
    </div>`;
};

export default AdminProductAdd;
