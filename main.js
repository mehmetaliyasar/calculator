//! buton ve inputları çekme
const spendingInput = document.querySelector("#spending-input");
const priceInput = document.querySelector("#price-input");
const formBtn = document.querySelector(".btn");
const list = document.querySelector(".list");
const totalInfo = document.querySelector("#total-info");
const statusCheck = document.querySelector("#status-input");
const selectFilter = document.querySelector("#filter-select");

//! olay izleyicisi
formBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

let total = 0;

function updateTotal(price) {
  // total değer ve girilen değeri toplama
  total += Number(price);
  // console.log(price)
  totalInfo.textContent = total;
  //console.log(total)
}

//! gider oluşturma
function addExpense(e) {
  e.preventDefault()
  //console.log("tıklandı")

  // Eski kullanım: priceInput === "";
  if (!priceInput.value || !spendingInput.value) {
    alert("Boş Gider Eklenemez!")
    // fonksiyonu durdurmak için
    return;
  }

  // 1) kullanıcı veri girdiğinde ve ekle dediğinde bir div oluştur.
  const spendingDiv = document.createElement("div");

  // 2) class ekleme
  spendingDiv.classList.add("spending");

  if (statusCheck.checked) {
    spendingDiv.classList.add("payed");
  }

  // 3) içeriğini ayarlama
  spendingDiv.innerHTML = `
    <h2>${spendingInput.value} =</h2>
    <h2 id="value">${priceInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="images/payment.png" alt="">
        <img id="remove" src="images/delete.png" alt="">
    </div>`;

  // 4) listeye eleman ekleme
  list.appendChild(spendingDiv);

  // toplamı güncele
  updateTotal(priceInput.value);

  // formu temizleme
  spendingInput.value = "";
  priceInput.value = "";

}

function handleClick(e) {
  const element = e.target

  if (element.id === "remove") {

    // tıklanılan elemanın kapsayıcısına ulaşma
    const wrapper = element.parentElement.parentElement

    // silineen elemanın fiyatını seçme
    const deletePrice = wrapper.querySelector("#value").innerText;
    Number(deletePrice.innerText);

    // silinenin fiyatını toplamdan çıkarma
    // updateTotal'i güncelleme
    updateTotal(-Number(deletePrice));

    // kapsayıcıyı kaldır
    wrapper.remove()

  }
}

/* filtreleme işlemleri */
function handleFilter(e) {
  console.log(e.target.value)


  //! childNodes
  // childNodes: parentElement elementin kapsayıcıya 
  // doğru değilde elemana doğru ilerleme
  const items = list.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex"
        break;

      case "payed":
        // yalnızca classında "payed" olanlar silinsin
        if (!item.classList.contains("payed")) {
          item.style.display = "none"
        } else {
          item.style.display = "flex"
        }
        break;
      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none"
        } else {
          item.style.display = "flex"
        }
        break;
    }
  });
}