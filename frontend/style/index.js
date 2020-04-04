// this is the index file
console.log('client side javascript loaded but it is failing')
const button = document.querySelector('.button');
const text = document.querySelector('.text');
const one = document.querySelector('.firsttext');
const second = document.querySelector('.secondtext')
button.addEventListener('click', (e) => {
    e.preventDefault();
    let locations = text.value;
    one.textContent='Loading...';
    second.textContent='';
    fetch('/main?address='+locations).then((response) => {
    response.json().then((data) => {
        if(data.error){
            one.textContent=data.error;
        }
        else{
            one.textContent=data.placename;
            second.textContent=data.weatherreport;
            
           
        }
    })
})

    
})



