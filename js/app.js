const loadData = async (SearchText, limit) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${SearchText}`
  );
  const data = await res.json();
  displayPhone(data.data, limit);
};
const displayPhone = (phones, limit) => {
  const phoneContainer = document.getElementById("phone-container");
  const showMsg = document.getElementById("show-msg");
  const showMoreBtn = document.getElementById("show-more-btn");

  phoneContainer.innerHTML = "";

  if (limit && phones.length > 6) {
    phones = phones.slice(0, 6);
    showMoreBtn.classList.remove("hidden");
  }else{
    showMoreBtn.classList.add("hidden");

  }

  if (phones.length === 0) {
    showMsg.classList.remove("hidden");
    showMoreBtn.classList.add("hidden");
    toggleSpinner(false);
  } else {
    showMsg.classList.add("hidden");
    //
  }

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.innerHTML = `
        
        <div class="card w-full bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>Find latest official mobile phone in Bangladesh 2023</p>
                        <div class="card-actions">
                        <label onclick="showDetails('${phone.slug}')" for="my-modal-6" class="btn btn-primary">Show details</label>
                        </div>
                       
                    </div>
             </div>

        `;
    phoneContainer.appendChild(div);
    toggleSpinner(false);
  });
};
const toggleSpinner = (isShow) => {
  const showSpinner = document.getElementById("showSpinner");
  if (isShow) {
    showSpinner.classList.remove("hidden");
  } else {
    showSpinner.classList.add("hidden");
  }
};

const processSearch = (limit) => {
  toggleSpinner(true);
  const SearchText = document.getElementById("input-filed").value;
  loadData(SearchText, limit);
};

const searchPhone = () => {
  processSearch(10);
};
const searchWithEnter = () => {
  processSearch(10);

}
const showMore = () => {
  processSearch();
};
const showDetails = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(URL);
  const data = await res.json();
  const phone = data.data;
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <img class="w-[40%] mx-auto" src="${phone.image}" alt="">
    <h1 class="font-sans font-semibold text-lg my-2 text-center">${phone.name}</h1>
    <p ><span class="font-semibold">Chipset:</span> ${phone.mainFeatures.chipSet}</P>
    <p ><span class="font-semibold">DisplaySize:</span> ${phone.mainFeatures.displaySize}</P>
    <p ><span class="font-semibold">Memory:</span> ${phone.mainFeatures.memory}</P>
    
    `;
  modalContainer.appendChild(div);
};

loadData("apple",7);
