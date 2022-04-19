// # 96 Практика
// Напишите класс Storage который будет создавать экземпляры для работы с localStorage
// Пример:
// const names = new Storage(’names’);
// names.get() - возвращает значение для ключа names в localStorage;
// names.set() - устанавливает значение для ключа names в localStorage;
// names.clear() - очищает значение для ключа names в localStorage;
// names.isEmpty() - вернет true если ключ names в localStorage имеет пустое значение (null || undefind);
// Создайте несколько экземпляров класса Storage и убедитесь что все они работают правильно
// для класса Storage добавьте пару опций в конструктор 
// 1. чтобы можно было выбирать local или session storage
// 2. возможность указать значение по-умолчанию (при создании экземпляра)
import { CARS, fruitsForm, getFruitsValue, clearFruitsData, inputFruitsValue, isEmptyFruits } from "./view.js";

class Storage {

    defaultStorage = 'defaultStorage';
    defaultStorageType = localStorage;

    constructor(name, storageType) {
        
        this.name = name ?? this.defaultStorage;
        this.storageType = storageType ?? sessionStorage;
        
        this.storageData = new Set();
    }

    set(value) {
        const data = JSON.parse(this.storageType.getItem(this.name));
        const restoredData = new Set(data);

        this.storageData = restoredData; 
        this.storageData.add(value);
       
        const storageDataJSON = JSON.stringify([...this.storageData]);
        this.storageType.setItem(this.name, storageDataJSON);
    }
    
    get() {
        const data = JSON.parse(this.storageType.getItem(this.name));
        alert(data);
    }
    
    clear() {
        this.storageData.clear();
        this.storageType.removeItem(this.name);
    }

    isEmpty() {
        const data = JSON.parse(this.storageType.getItem(this.name));
        const isEmpty = data ?? true;
        if (typeof isEmpty === 'boolean') {
            alert(true);
        }
    }
}

const carNames = new Storage('names');
const fruitsName = new Storage('fruits', sessionStorage);

function getInputValue() {
    const carName = CARS.inputValue.value;
    return carName;
}
CARS.Form.addEventListener('submit', (event) => {
    event.preventDefault();
});
CARS.Form.addEventListener('submit', () => {carNames.set(getInputValue())});
CARS.getValue.addEventListener('click', () => {carNames.get()});
CARS.clearData.addEventListener('click', () => {carNames.clear()});
CARS.isEmpty.addEventListener('click', () => {carNames.isEmpty()});


function getFruitValue() {
    const fruitName = inputFruitsValue.value;
    return fruitName;
}

fruitsForm.addEventListener('submit', (event) => {
    event.preventDefault();
});
fruitsForm.addEventListener('submit', () => {fruitsName.set(getFruitValue())});
getFruitsValue.addEventListener('click', () => {fruitsName.get()});
clearFruitsData.addEventListener('click', () => {fruitsName.clear()});
isEmptyFruits.addEventListener('click', () => {fruitsName.isEmpty()});
