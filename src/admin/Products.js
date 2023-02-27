import { useEffect, useState } from "../lib";
const AdminProductsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((respones) => respones.json())
      .then((data) => setData(data));
  },[]);
  useEffect(() => {
    const btns = document.querySelectorAll(".btn-remove");
    for (let btn of btns) {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        }).then(() => {
          const newProducts = data.filter((product) => product.id !== +id);
          setData(newProducts);
        });
      });
    }
  });
  //Hiển thị ra ngoài màn hình
  return `
    <div class = "container">
    <h1>Quản lí sản phẩm</h1>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Desc</th>
                <th>Categories</th>
                <th>Image</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
    ${data
      .map(
        (product, index) => `
    <tr>
    <td>${index + 1}</td>
    <td>${product.name}</td>
    <td>${product.desc}</td>
    <td>${product.categories}</td>
    <td><img src = "${product.gallery}" ></td>
    <td>
      <button data-id = "${
        product.id
      }" class="btn btn-danger btn-remove">Xóa</button>
      <a href="/products/${product.id}/edit">Update</a>
      </td>
  </tr>
    `
      )
      .join("")}
      
    </tbody>
    </table>
    </div>`;
};

export default AdminProductsPage;
