import { useEffect,useState,router } from "../lib";
const AdminProductEdit = ({id}) => {
    console.log(id)
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      });
  }, []);
  useEffect(() => {
    const form = document.getElementById("form-add");
    const productName = document.getElementById("product-name");
    const productImage = document.getElementById("product-img");
    const productDesc = document.getElementById("product-desc");
    const productCategories = document.getElementById("product-cat");
    const productPrice = document.getElementById("product-price");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const newProduct = {
        name: productName.value,
        desc: productDesc.value,
        image: productImage.value,
        categories: productCategories.value,
        price: productPrice.value,
        
      };
      fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }).then(() => router.navigate("/products"));
    });
  });


  return `
  <div class = "container">
  <h1>Thêm sản phẩm</h1>
<form action="" id="form-add">
  <div class="form-group mb-3">
      <label for="">Product Name</label>
      <input type="text" id="product-name" class="form-control" value = "${data.name}">
  </div>
  <div class="form-group mb-3">
      <label for="">Desc</label>
      <input type="text" id="product-desc" class="form-control" value = "${data.desc}">
  </div>
  <div class="form-group mb-3">
      <label for="">Image</label>
      <input type="file" id="product-img" class="form-control" value = "${data.gallery}">
  </div>
  <div class="form-group mb-3">
      <label for="">Categories</label>
      <input type="text" id="product-cat" class="form-control" value = "${data.categories}">
  </div>
  <div class="form-group mb-3">
      <label for="">Price</label>
      <input type="text" id="product-price" class="form-control" value = "${data.price}">
  </div>
  <div class="form-group">
      <button class="btn btn-primary">Update</button>
  </div>
</form>
  </div>`;
};

export default AdminProductEdit;
