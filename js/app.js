// ===============load phones===============
const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data)
}
// ==================display phones============
const displayPhones = phones => {
    // console.log(phones)
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // ============show limited phones==========
    phones = phones.slice(0, 15);

    // ==============not found message==============
    const notFound = document.getElementById('not-found');
    if (phones.length === 0) {
        notFound.classList.remove('d-none')
    }
    else {
        notFound.classList.add('d-none')
    }
    phones.forEach(phone => {
        console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3">
                        <div class="h-50 w-full">
                            <img  src="${phone.image}" class="card-img-top" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
        `;
        phonesContainer.appendChild(phoneDiv)
    });
    // =============loader end============
    loaderSection(false)
}
// =================search phone===================
document.getElementById('search-btn').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText)

    // ==========loader start===========
    loaderSection(true)
})

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

// loadPhones()