function search(results) {
  const contenedor = document.querySelector(".content__results");
  const templateEl = document.querySelector("#content__template");

  for (const r of results) {
    const imgEl = templateEl.content.querySelector(
      ".content__results__item-img"
    );
    imgEl.src = r.thumbnail;

    const titleEl = templateEl.content.querySelector(
      ".content__results__item-content-title"
    );
    titleEl.textContent = r.title;
    titleEl.href = r.permalink;

    const countNumberEl = templateEl.content.querySelector(
      ".content__results__item-content-count-number"
    );
    countNumberEl.textContent = r.sold_quantity;

    const priceEl = templateEl.content.querySelector(
      ".content__results__item-price"
    );
    priceEl.textContent = "$" + r.price;

    const clone = document.importNode(templateEl.content, true);
    contenedor.appendChild(clone);
  }

}
function main() {
  const formEl = document.querySelector(".header__search-form");
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputQuery = e.target.buscar.value;
    const title = document.querySelector(".content");
    title.innerHTML = `
    <a href="./index.html" "content__h2-title-back"><h2 class="content__h2-title-back">Volver al inicio</h2></a>
    <h2 class="content__h2-title-resultados">Resultados:</h2>
    <ul class="content__results"></ul>
      <template id="content__template">

        <li class="content__results__item">
          <img url="" alt=" " class="content__results__item-img"/>

          <div class="content__results__item-content">
          <a href="" class="content__results__item-content-title"><h3 class="content__results__item-content-title" >Título</h3></a>
            <p class="content__results__item-content-count">
              Vendidos:
              <span class="content__results__item-content-count-number"></span>
            </p>
          </div>
          <div class="content__results__item-price"></div>
        </li>
      </template>
      `;
const limit = 4; 

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + inputQuery + "&limit=10")
      .then((response) => response.json())
      .then((data) => search(data.results));
  });
}
main();
