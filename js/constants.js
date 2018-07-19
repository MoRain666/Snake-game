const FIELD_SIZE = 20;
const SNAKE_SIZE = 3;
const SPEED = 350;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
let borderArrayInit = () => {
    let array = []
    for (let i = 1; i < FIELD_SIZE * FIELD_SIZE; i += FIELD_SIZE) {
        array.push(i);
    }
    for (let i = 2; i < FIELD_SIZE; i++) {
        array.push(i)
    }
    for (let i = 20; i < FIELD_SIZE * FIELD_SIZE; i += FIELD_SIZE) {
        array.push(i)
    }
    for (let i = 382; i <= FIELD_SIZE * FIELD_SIZE; i++) {
        array.push(i)
    }
    return array;
}
const BORDER_ARRAY = borderArrayInit();