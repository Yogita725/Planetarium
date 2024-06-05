let seats = JSON.parse(localStorage.getItem('seats')) || [];
// const seats = [];
if (seats.length === 0) {
    for (let i = 0; i < 60; i++) {
        seats.push({ seatNumber: i + 1, userName: '', emailId: '', status: false });
    }
}

let localSeat = [];
// let reservedSeat = [];

let seatContainer = document.querySelector('.seats');
let bookingModal = document.querySelector('#bookingModal');
let currentSeatNum = null;
let isClicked = false;

let submitBtn = document.querySelector('.submitBtn');
let seatNumber = document.getElementById('seatNumber');
// seatNumber.innerText = currentSeatNum;

bookSeat=(seatNum)=>{
    seatNum = parseInt(seatNum);
    currentSeatNum = seatNum;
    if(isClicked == false){
        bookingModal.classList.remove('hidden');
        isClicked = true;
    }
    else{
        bookingModal.classList.add('hidden');
        isClicked=false;
    }
    seatNumber.innerText = seatNum;
    // bookingModal.classList.add('bookingModal');
    let userName = document.getElementById('userName');
    let emailId = document.getElementById('emailId');

    if(seats[currentSeatNum - 1].status){
        userName.value = seats[currentSeatNum-1].userName;
        emailId.value = seats[currentSeatNum-1].emailId
    }
    else{
        userName.value='';
        emailId.value='';
    }

    function checkFields() {
        if (userName.value==='' && emailId.value==='') {
            submitBtn.disabled = true;
            submitBtn.classList.add('disable')
        } else {
            submitBtn.disabled = false;
            submitBtn.classList.remove('disable')
        }
    }

    userName.addEventListener('input', checkFields);
    emailId.addEventListener('input', checkFields);

    // Initial check in case the fields are pre-filled
    checkFields();
}

function renderingLocalSeat(){
    localSeat = JSON.parse(localStorage.getItem('seats'));
    let reservedSeat = localSeat.filter((seat)=>seat.status == true);
    localStorage.setItem('reservedSeat',JSON.stringify(reservedSeat));
    return reservedSeat;
}


function userExist(email){
    let booked = JSON.parse(localStorage.getItem('seats'));
    if(booked == null){
        return false;
    }
    else{
        let reserveSeat = [];
        reserveSeat = booked.filter(seat=>seat.emailId == email);
        if(reserveSeat.length >= 1){
            return true;
        }
        return false;
    }
}

submitBtn.addEventListener('click',()=>{
    if(currentSeatNum != null){
        let userName = document.getElementById('userName');
        let emailId = document.getElementById('emailId');

        let exist = userExist(emailId.value);

        if(exist){
            alert('User exist, please check the email')
        }
        else{
            seats[currentSeatNum - 1]={
                seatNumber:currentSeatNum,
                userName:userName.value,
                emailId:emailId.value,
                status:true
            }
        }

        bookingModal.classList.add('hidden');
        renderSeats();
        localStorage.setItem('seats',JSON.stringify(seats));

        let housefull = document.querySelector('.housefull');
        let reserveSeat = renderingLocalSeat();
        if(reserveSeat.length == seats.length){
            housefull.classList.remove('hidden');
        }

    }
})



function deleteInfo(seatNum){
    let confirm = prompt('Are you sure, you want to cancel the booking?','Yes');
    console.log(confirm);

    if(confirm === 'Yes' && confirm!=null){
        seats[seatNum - 1]={
            seatNumber: seatNum,
            userName: '',
            emailId: '', 
            status: false
        };
    localStorage.setItem('seats',JSON.stringify(seats));
    }
    renderSeats();
}

let bookTable = document.getElementById('bookTable');

function addSeat(){
    bookTable.innerHTML='';
    let tr1 = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    th1.classList.add('th');
    th2.classList.add('th');
    th3.classList.add('th');
    bookTable.appendChild(tr1);
    th1.innerText='Seat Number';
    th2.innerText='Name';
    th3.innerText='Email Id';
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3);
    
    let reserveSeat = renderingLocalSeat();
    reserveSeat.map((seat)=>{
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td1.classList.add('td');
        td2.classList.add('td');
        td3.classList.add('td');
        td1.innerText = seat.seatNumber;
        td2.innerText = seat.userName;
        td3.innerText = seat.emailId;
        bookTable.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
    })
}

let showList = document.querySelector('.showList');
let sideImage = document.querySelector('#sideImage');
showList.addEventListener('click',()=>{
    let bookingList = document.querySelector('.bookingList');
    bookingList.classList.remove('hidden');
    // bookingList.classList.add('list');
    // bookingList.classList.remove('backList');
    sideImage.classList.add('hidden');
    showList.classList.add('hidden');
    addSeat();
})

let refresh = document.querySelector('.refresh');
refresh.addEventListener('click',addSeat);

let back = document.querySelector('.back');
back.addEventListener('click',()=>{
    let bookingList = document.querySelector('.bookingList');
    bookingList.classList.add('hidden');
    // bookingList.classList.add('backList');
    // bookingList.classList.remove('list');
    sideImage.classList.remove('hidden');
    showList.classList.remove('hidden');
})



renderSeats=()=>{
    seatContainer.innerHTML = '';
        seats.map((seat)=>{
            let button = document.createElement('button');
            button.classList.add('seat');
            button.innerText=seat.seatNumber;
            if(seat.status === true){
                button.classList.remove('seat');
                button.classList.add('seat-booked')
                let deleteBtn = document.createElement('button');
                    // deleteBtn.innerText='X';
                    deleteBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
  </svg>
`;
                    deleteBtn.classList.add('deleteBtn');
                    deleteBtn.addEventListener('click',(e)=>{
                        e.stopPropagation();
                        deleteInfo(seat.seatNumber);
                        button.classList.add('seat');
                        button.classList.remove('seat-booked');
                    })
                    button.appendChild(deleteBtn);
            }
            else{
                button.addEventListener('click',(e)=>{
                    let seatNum = e.target.innerText;
                    bookSeat(seatNum);
                })
            }
    
            seatContainer.appendChild(button);
        })
}

renderSeats();


