/**
 * js 类
 * 使用class关键字来创建Thermostat类
 * 它的构造函数应该可以接收华氏温度作为参数
 */

class Thermostat {
    constructor(temp) {
        this._temp = 5 / 9 * (temp - 32);
    }

    get temperature() {
        return this._temp;
    }

    set temperature(updatedTemp) {
        this._temp = updatedTemp;
    }
}

const thermos = new Thermostat(76);
let temp = thermos.temperature; // 24.44 in Celsius
thermos.temperature = 26;
temp = thermos.temperature; // 26 in Celsius
