let results;
async function movies(option) {
    let api, response;
    if (option == 'Now playing') api = 'now_playing';
    else if (option == 'Popular') api = 'popular';
    else if (option == 'Top Rated') api = 'top_rated';
    else if (option == 'Upcoming') api = 'upcoming';
    else api = 'trending';
    if (api == 'trending') {
        response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    } else {
        response = await fetch(`https://api.themoviedb.org/3/movie/${api}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1`);
    }
    let finalResponse = await response.json();
    results = finalResponse.results;
    display();
}
async function apiForSearch(movie) {
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1&include_adult=false&query=${movie}`);
    let finalResponse = await response.json();
    results = finalResponse.results;

    display();
}
function display() {
    let movies = document.getElementById('movies');
    let cartoona = ``;
    for (let i = 0; i < results.length; i++) {
        cartoona += `<div id="d" class="col-lg-4 col-md-6 p-4">
            <div class="movie position-relative">
                <img class="w-100" src="https://image.tmdb.org/t/p/w500${results[i].poster_path}" >
                <div class="content w-100 h-100 position-absolute d-flex flex-column justify-content-center align-items-center">
                    <h3>${results[i].original_title}</h3>
                    <p>${results[i].overview}</p>
                    <p>rate : ${results[i].vote_average}</p>
                    <p>${results[i].release_date}</p>
                </div>
            </div>
        
         </div>`;
    }
    movies.innerHTML = cartoona;
}

let firstH = $('#watch h6').eq(0).offset().top;

$('#watch h6').css({ 'position': 'relative', 'top': '50%' });

let types = document.querySelectorAll('.types');
let side = document.querySelectorAll('.side');
let typesWidth = $(types).outerWidth();
$(types).css({ left: -typesWidth });
$(side).css({ left: 0 });
$('.sideBtn').click(function () {
    if ($(side).css('left') == '0px') {
        $(types).animate({ left: 0 }, 500);
        $(side).animate({ left: typesWidth }, 500);
        $('.sideBtn').html('<i class="fas fa-times fa-2x"></i>');
        $('#watch h6').eq(0).css({ 'opacity': '1' });
        $('#watch h6').eq(0).animate({ 'top': firstH }, 300, function () {
            $('#watch h6').eq(1).css({ 'opacity': '1' });
            $('#watch h6').eq(1).animate({ 'top': firstH }, 100, function () {
                $('#watch h6').eq(2).css({ 'opacity': '1' });
                $('#watch h6').eq(2).animate({ 'top': firstH }, 100, function () {
                    $('#watch h6').eq(3).css({ 'opacity': '1' });
                    $('#watch h6').eq(3).animate({ 'top': firstH }, 100, function () {
                        $('#watch h6').eq(4).css({ 'opacity': '1' });
                        $('#watch h6').eq(4).animate({ 'top': firstH }, 100, function () {
                            $('#watch h6').eq(5).css({ 'opacity': '1' });
                            $('#watch h6').eq(5).animate({ 'top': firstH }, 100, function () {
                            });
                        });
                    });
                });
            });
        });
    } else {
        $(types).animate({ left: -typesWidth }, 500);
        $(side).animate({ left: 0 }, 500);
        $('.sideBtn').html(` <i class="fas fa-grip-lines line fa-2x"></i>
        <i class="fas fa-grip-lines fa-2x"></i>`);
        $('#watch h6').eq(0).css({ 'position': 'relative', 'top': '50%' });
        $('#watch h6').eq(1).css({ 'position': 'relative', 'top': '50%' });
        $('#watch h6').eq(2).css({ 'position': 'relative', 'top': '50%' });
        $('#watch h6').eq(3).css({ 'position': 'relative', 'top': '50%' });
        $('#watch h6').eq(4).css({ 'position': 'relative', 'top': '50%' });
        $('#watch h6').eq(5).css({ 'position': 'relative', 'top': '50%' });
        $('#watch h6').css({ 'opacity': '0' });
    }

})
movies('Now playing');
let contactH = $('#contacts').offset().top;
console.log(contactH);
let options = document.querySelectorAll('.type h6');
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', function (e) {

        if (e.target.innerHTML == 'Contact Us') {
            $('html,body').scrollTop(10000);
        } else {
            movies(e.target.innerHTML);
        }
    })
}
let search1 = document.getElementById('search1');
search1.addEventListener('keyup', function () {
    let movie = search1.value;
    apiForSearch(movie);
})
function searchForMovie(moviee) {
    let part = [];
    for (let i = 0; i < results.length; i++) {
        if (results[i].original_title != undefined) {
            if (results[i].original_title.toLowerCase().includes(moviee.toLowerCase())) {

                part.push(results[i]);
            }
        }
    }
    console.log(part);
    let searched = document.getElementById('searched');
    let cartoona = ``;
    for (let i = 0; i < part.length; i++) {
        cartoona += `<div id="d" class="col-lg-4 col-md-6 p-4">
            <div class="movie position-relative">
                <img class="w-100" src="https://image.tmdb.org/t/p/w500${part[i].poster_path}" >
                <div class="content w-100 h-100 position-absolute d-flex flex-column justify-content-center align-items-center">
                    <h3>${part[i].original_title}</h3>
                    <p>${part[i].overview}</p>
                    <p>rate : ${part[i].vote_average}</p>
                    <p>${part[i].release_date}</p>
                </div>
            </div>
        
         </div>`;
    }
    cartoona += `<div class="seprate"></div>`
    if (moviee == '') {
        document.getElementById('searched').innerHTML = null;
    } else {
        searched.innerHTML = cartoona;
    }

}
let search2 = document.getElementById('search2');
search2.addEventListener('keyup', function () {
    let moviee = search2.value;
    searchForMovie(moviee);
})

/**********Regex******** */
let regexName = /^[A-Z][a-z]{2,5}$/;
let regexEmail = /@[a-z]{3,7}\.[a-z]{1,3}/;
let regexAge = /^([1-8][0-9]|90)$/;
let regexPhone = /^01[0125][0-9]{8}$/;
let regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let valid1 = false, valid2 = false, valid3 = false, valid4 = false, valid5 = false, valid6 = false;
let namee = document.getElementById('name');
namee.addEventListener('keyup', function () {
    if (!regexName.test(namee.value)) {
        document.getElementById('alert1').classList.replace('d-none', 'd-block');
        valid1 = false;
    } else {
        document.getElementById('alert1').classList.replace('d-block', 'd-none');
        valid1 = true;
    }
    valid();
})
let email = document.getElementById('email');
email.addEventListener('keyup', function () {
    if (!regexEmail.test(email.value)) {
        document.getElementById('alert2').classList.replace('d-none', 'd-block');
        valid2 = false;
    } else {
        document.getElementById('alert2').classList.replace('d-block', 'd-none');
        valid2 = true;
    }
    valid();
})
let phone = document.getElementById('phone');
phone.addEventListener('keyup', function () {
    if (!regexPhone.test(phone.value)) {
        document.getElementById('alert3').classList.replace('d-none', 'd-block');
        valid3 = false;
    } else {
        document.getElementById('alert3').classList.replace('d-block', 'd-none');
        valid3 = true;
    }
    valid();
})
let age = document.getElementById('age');
age.addEventListener('keyup', function () {
    if (!regexAge.test(age.value)) {
        document.getElementById('alert4').classList.replace('d-none', 'd-block');
        valid4 = false;
    } else {
        valid4 = true;
        document.getElementById('alert4').classList.replace('d-block', 'd-none');
    }
    valid();
})
let pass = document.getElementById('pass');
pass.addEventListener('keyup', function () {
    if (!regexPass.test(pass.value)) {
        document.getElementById('alert5').classList.replace('d-none', 'd-block');
        valid5 = false;
    } else {
        valid5 = true;
        document.getElementById('alert5').classList.replace('d-block', 'd-none');
    }
    valid();
})
let pass2 = document.getElementById('pass2');
pass2.addEventListener('keyup', function () {
    if (pass2.value == pass.value) {
        valid6 = true;
        document.getElementById('alert6').classList.replace('d-block', 'd-none');
    } else {
        valid6 = false;
        document.getElementById('alert6').classList.replace('d-none', 'd-block');
    }
    valid();
})
function valid() {
    if (valid1 && valid2 && valid3 && valid4 && valid5 && valid6) {
        document.getElementById('mainBtn').classList.remove('disabled');
    } else {
        document.getElementById('mainBtn').classList.add('disabled');
    }
}
