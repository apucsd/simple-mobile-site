const loadData = async(SearchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`);
    const data = await res.json();
    displayPhone(data.data);
}
const displayPhone =  (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    const showMsg = document.getElementById('show-msg');
    const showMoreBtn = document.getElementById('show-more-btn');
  
    phoneContainer.innerHTML = '';
    console.log(phones);
    if(phones.length > 10){
       phones.slice(0,10).forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card w-full bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone. phone_name}</h2>
                        <p>Find latest official mobile phone in Bangladesh 2023</p>
                        <div class="card-actions">
                        <label onclick="showDetails('${phone.slug}')" for="my-modal-6" class="btn btn-primary">Show details</label>
                        </div>
                       
                    </div>
             </div>

        `;
        phoneContainer.appendChild(div);
        showHide(false);
       })
       showMsg.classList.add('hidden')
       showMoreBtn.classList.remove('hidden')
      
    }
    else{
        console.log('10- phone')
        showMsg.classList.remove('hidden')
        showMoreBtn.classList.add('hidden');
        showHide(false)

    }
}
const showHide = (isShow) =>{
    const showSpinner = document.getElementById('showSpinner');
    if(isShow){
        showSpinner.classList.remove('hidden');

    }
    else{
        showSpinner.classList.add('hidden');

    }
} 

const searchPhone = () =>{
    showHide(true)
    const SearchText = document.getElementById('input-filed').value;
    document.getElementById('input-filed').value = '';
    console.log(SearchText)
    loadData(SearchText);
}
const showDetails = async (id) =>{
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(URL);
    const data = await res.json();
    const phone = data.data;
    console.log(phone);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="w-[40%] mx-auto" src="${phone.image}" alt="">
    <h1 class="font-sans font-semibold text-lg my-2 text-center">${phone.name}</h1>
    <p ><span class="font-semibold">Chipset:</span> ${phone.mainFeatures.chipSet}</P>
    <p ><span class="font-semibold">DisplaySize:</span> ${phone.mainFeatures.displaySize}</P>
    <p ><span class="font-semibold">Memory:</span> ${phone.mainFeatures.memory}</P>
    
    `;
    modalContainer.appendChild(div);
}

loadData('apple');