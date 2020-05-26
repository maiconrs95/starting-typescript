// boolean (true / false)
let isOpened: boolean;
isOpened = false;
isOpened = 'false'; // Type '"false"' is not assignable to type 'boolean'.ts(2322)

// string ('foo', "foo", `foo`)
let message: string;
message = 'foo';

// number (int, float, hex, binary)
let total: number;
total = 10 + 10;

// array (type[])
let items: number[];
items = [10, 20, 30];

// array (Array<number>) - generic
let numbers: Array<number>;

// tuple ([type])
let title: [number, string];
title = [1, 'foo'];

// enum (key => value)
enum Colors {
    white = '#fff',
    black = '#000'
}

// any (qualquer tipo)
let value: any;
value = 'foo';
value = 10;
value = false;

// void (função sem retorno)
function logger() {
    console.log('hit');
}

// null | undefined
type myType = string | undefined;
let myValue: myType;

// never (nunca retorna)
throw new Error("error");

function error(): never {
    throw new Error("error");
}

// object
let people: object;

people = {
    name: 'Maicon',
}