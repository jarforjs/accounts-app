/**
 * Created by JetBrains WebStorm.
 * User: wb-ghb226150@alibaba-inc.com
 * Date: 2017-10-13 16:26
 * Describe:
 */
var makeSound = function (animal) {
    animal.sound();
};

var Dog = function () {

};

Dog.prototype.sound = function () {
    console.log('汪汪汪')
};

var Duck = function () {

};

Duck.prototype.sound = function () {
    console.log('嘎嘎嘎')
}

makeSound(new Dog());
makeSound(new Duck());