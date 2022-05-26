class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Producto</strong>: ${product.name}
          <strong>Precio</strong>: ${product.price}
          <strong>Año</strong>: ${product.year}
          <input type="button" value="Eliminar" name="delete" class="btn btn-danger">
        </div>
      </div>
    `;
    productList.appendChild(element);
    // se puede resetear el formulario desde aqui
    this.resetForm();
  }

  /**
   * Para limpiar el formulario al agregar un
   * nuevo producto
   */
  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      const mensaje = "Producto eliminado satisfactoriamente.";
      this.showMessage(mensaje, "info")
    }

  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    // mostrar en el documentoç
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

// DOM events

document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    const product = new Product(name, price, year);

    const ui = new UI();

    // validar campos vacios
    /**
    if (name === "" || price === "") {
      return ui.showMessage("Complete los campos requeridos.", "danger")
    }
    */


    ui.addProduct(product);
    // tambien se puede resetear el formulario desde acá
    // ui.resetForm();

    const mensaje = "Producto agregado satisfactoriamente.";
    ui.showMessage(mensaje, "success");

    e.preventDefault();
  });

document.getElementById("product-list").addEventListener("click", function (e) {
  const ui = new UI();
  //console.log(e.target)
  ui.deleteProduct(e.target);
});
