/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    let promise = fetch(
        'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
    )
        .then(response => {
            return response.text().then(data => {
                if (response.ok) {
                    return data;
                }

                return Promise.reject({ status: response.status, data });
            });
        })
        .then(data => {

            const towns = JSON.parse(data);
            let sortTowns = towns.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

            return new Promise((resolve) => {
                resolve(sortTowns);
            });
        })
        .catch(error => console.log('error:', error));

    return promise;
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let lowFull = full.toLowerCase();
    let lowChunk = chunk.toLowerCase();

    if (~lowFull.indexOf(lowChunk)) {
        return true;
    } 
    
    return false;
    
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let ul = document.createElement('ul');

filterResult.appendChild(ul);
loadTowns();
filterInput.addEventListener('keyup', function () {
    // это обработчик нажатия клавиш в текстовом поле
    let searchValue = filterInput.value;

    if (filterInput === '') {
        ul.innerHTML = '';
    }
    let abc = loadTowns().then(function (towns) {
        let arr = [];

        for (let i = 0; i < towns.length; i++) {
            arr.push(towns[i].name);
        }
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        while (searchValue) {
            ul.removeChild(ul.firstChild);
        }
        for (let i = 0; i < arr.length; i++) {
            if (isMatching(arr[i], searchValue)) {
                let li = document.createElement('li');

                li.innerHTML = arr[i];
                ul.appendChild(li);
            }
        }

    });

});

export {
    loadTowns,
    isMatching
};
