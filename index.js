const searchPhone = () =>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    const singelDiv = document.getElementById('singel-result')
    singelDiv.textContent = '';

    // clear the input
    searchField.value = '';

    // start with API
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data))
}

const displaySearchResult = datum =>{
    // console.log(datum.data);
    const dataArray = datum.data.slice(0,20);
    const searchResult = document.getElementById('search-result');
    // clearing the details card
    searchResult.textContent = '';

    // error handaling
    let error  = document.getElementById('error')
    if(dataArray.length == 0){
      error.innerText = 'Result Not Found'
      error.style.color = 'red'
      error.style.textAlign = 'center'
    }else{
      error.textContent = '';
    }


    dataArray.forEach(datas =>{
        console.log(datas);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="col m-5">
        <div class="card h-100 p-5 rounded-3 border-0 shadow">
          <img src="${datas.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title">${datas.brand}</h3>
            <h5>${datas.phone_name}</h5
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetail('${datas.slug}')" type="button" class="btn btn-success">Details</button>
          </div>
        </div>
      </div>
        `
        searchResult.appendChild(div)
    })
}

const loadPhoneDetail = phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data))
}

const displayPhoneDetail = phone =>{
    const singelResult = document.getElementById('singel-result')
    singelResult.textContent = '';
    const div = document.createElement('div')
    // div.classList.add('card')
    div.innerHTML = `
    <div class="row row-cols-1 row-cols-lg-1">
    <img src="${phone.data.image}" class="card-img-top p-5 mx-auto" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.data.brand}</h5>
      <h5>${phone.data.name}</h5>
      <h6>${phone?.data?.releaseDate ? phone.data.releaseDate: 'Release Date not available'}</h6>
      <p class="card-text">Chipset:  ${phone.data.mainFeatures.chipSet}<br>
      Display:  ${phone.data.mainFeatures.displaySize}<br>
      Ram:  ${phone.data.mainFeatures.memory}</p>
      <p>Sensors:  ${phone?.data?.mainFeatures?.sensors[0] ? phone.data.mainFeatures.sensors[0]: 'Data not available'},

        ${phone?.data?.mainFeatures?.sensors[1] ? phone.data.mainFeatures.sensors[1]: 'Data not available'},

          ${phone?.data?.mainFeatures?.sensors[2] ? phone.data.mainFeatures.sensors[2]: 'Data not available'},

            ${phone?.data?.mainFeatures?.sensors[3] ? phone.data.mainFeatures.sensors[3]: 'Data not available'},

              ${phone?.data?.mainFeatures?.sensors[4] ? phone.data.mainFeatures.sensors[4]: 'Data not available'},

              ${phone?.data?.mainFeatures?.sensors[5] ? phone.data.mainFeatures.sensors[5]: 'Data not available'}
      </p>
        <p>Others:<br>  
        Bluetooth:  ${phone?.data?.others?.Bluetooth ? phone.data.others.Bluetooth: 'Data not availabe'},<br>

        GPS:  ${phone?.data?.others?.GPS ? phone.data.others.GPS: 'Data not availabe'},<br>

        NFC:  ${phone?.data?.others?.NFC ? phone.data.others.NFC: 'Data not availabe'},<br>

        Radio:  ${phone?.data?.others?.Radio ? phone.data.others.Radio: 'Data not availabe'},<br>

        USB:  ${phone?.data?.others?.USB ? phone.data.others.USB: 'Data not availabe'},<br>

        WLAN:  ${phone?.data?.others?.WLAN ? phone.data.others.WLAN: 'Data not availabe'}
        </p>
    </div>
    </div>
    `
    singelResult.appendChild(div)
}