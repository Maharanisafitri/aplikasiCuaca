console.log('Client side javascript file diproses')
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#pesan-1');
const messageTwo = document.querySelector('#pesan-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Sedang mencari lokasi...';
    messageTwo.textContent = '';

    fetch('infocuaca?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.lokasi;
                messageTwo.textContent = data.prediksiCuaca;
            }
        });
    });
});