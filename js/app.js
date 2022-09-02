// ===============load phones===============
const loadPhones = async (searchText, limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, limit)
}
// ==================display phones============
const displayPhones = (phones, limit) => {
    // console.log(phones)
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // ============show limited phones====== & ========show all button==========
    const showAll = document.getElementById('show-all')
    if (limit & phones.length > 15) {
        phones = phones.slice(0, 15);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    // ==============not found message==============
    const notFound = document.getElementById('not-found');
    if (phones.length === 0) {
        notFound.classList.remove('d-none')
    }
    else {
        notFound.classList.add('d-none')
    }
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card px-3 pt-3 pb-1">
                        <div class="h-50 w-full">
                            <img  src="${phone.image}" class="card-img-top" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-info px-4 py-1 text-white font-bold w-50 mx-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                        </div>
                    </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    });
    // =============loader end============
    loaderSection(false)
}

// ==============search process=======================
const searchProcess = (limit) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, limit)

    // ==========loader start===========
    loaderSection(true)
}
// =================search phone===================
document.getElementById('search-btn').addEventListener('click', function () {
    searchProcess(15)
    /* const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText)
    // ==========loader start===========
    loaderSection(true) */
})
//=============search by  input field event key handler============
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // console.log(e.key)
        searchProcess(15)
    }
});
// ===========togler/loader/spiner==========
const togleSpinner = document.getElementById('loader');

const loaderSection = isLoading => {
    if (isLoading) {
        togleSpinner.classList.remove('d-none')
    }
    else {
        togleSpinner.classList.add('d-none')
    }
}

/* 
==================button show all===================
==though this is not the best way to show all =============
*/
document.getElementById('btn-show-all').addEventListener('click', function () {
    searchProcess('')
})

// =================load phone details===============
const loadPhoneDetails = async (id) => {
    // console.log(id)
    const url = (`https://openapi.programming-hero.com/api/phone/${id}`)
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data)
}
// loadPhones('')