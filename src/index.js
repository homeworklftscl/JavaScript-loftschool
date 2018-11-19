/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
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

export {
    delayPromise,
    loadAndSortTowns
};
