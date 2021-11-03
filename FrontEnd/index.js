const myForm = document.getElementById("myForm");

myForm.addEventListener ('submit', (e) => {
    e.preventDefault();
    const email     = document.getElementById('emailLogin').value;
    const password  = document.getElementById('password').value;
    
    const loginData = {email, password };
    const urlLogin  = 'http://localhost:3000/api/signup';
    const response = sendingInformation(loginData, urlLogin);
    //TODO
});

function sendingInformation(data, url) {
 
    return fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
        }
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .then(response => {return response })
    .catch(err => console.log(err));
}