const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    console.log(phones);
    // step-->1
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more 
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    // console.log(phones.length)
    // display te koita item dekhabe seta dekhar jonno ei code
    // display only first 12 phones
    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        // console.log(phone);
        //step--> 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        // step--> 3: set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        // step--> append child
        phoneContainer.appendChild(phoneCard);
    })

}
// handle search button
const handleSearch = () => {
    // console.log('search handle')
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

// another search button
const handleSearch2 = () => {
    const searchField = document.getElementById('search-field2')
    const searchText = searchField.value;
    loadPhone(searchText);
}

// loadPhone();