const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

//  --------------------------------------------------------------------------------------

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    // step-->1
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //  --------------------------------------------------------------------------------------

    // display show all button if there are more 
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll);
    // console.log(phones.length) 
    // display te koita item dekhabe seta dekhar jonno ei code    
    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    //  --------------------------------------------------------------------------------------
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
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        // step--> append child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}
// -------------------------------------------------------------------------
// show details 
const handleShowDetails = async (id) => {
    // console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;

    showPhoneDetails(phone)

}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-detail-container');

    showDetailsContainer.innerHTML = `
    <img src ="${phone.image}" alt=""/>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS</span>${phone?.others?.GPS}</p>
    
    `

    // show the modal
    show_details_modal.showModal()
}
//  --------------------------------------------------------------------------------------


// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    // console.log('search handle')
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

//  --------------------------------------------------------------------------------------

// handle search recap
// another search button

// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2')
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//  --------------------------------------------------------------------------------------

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();