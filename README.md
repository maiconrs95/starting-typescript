# Introdução - O que é o TypeScript?

É um superset do JavaScript criado pela Microsoft. o TS adiciona features como tipagem estática ao JavaScript e necessita de ser transpilado para ser utilizado nos browser ou até mesmo no nodejs.

## Por que usar TypeScript?

JavaScript é uma linguagem dinamica, com isso podemos mudar o tipo das variáveis e obter retornos inesperados.

```javascript
function sum(a, b) {
    return a + b;
}

sum(10, 10); // 20
sum('2', '2'); // 22? concatenou a string :D
```

O TypeScript nos avisa em casos como esse e também em muitos outros.

Também podemos usar o TS como uma "documentação". Por exemplo, imagine uma propriedade em um objeto
que deve receber um array, mas esse array só pode ser preenchido com uma determinada string ou valor.
Para isso temos o `type`:

```javascript
type Platform = 'Windows' | 'Mac OS' | 'Linux';
type Feature = 'Single Player' | 'Multiplayer' | 'Co-op';

interface GameDetails {
    id: string;
    title: string;
    description: string;
    platforms: Platform[];
    features: Feature[];
}
```

platforms e features em `GameDetails` são arrays que esperam os valores presente em seus respectivos types.

## Primeiro código em TypeScript

Para transpilar o código TS para JS, utilizamos o [tsc](https://www.typescriptlang.org/#installation), então é necessário instala-lo:

```shell
npm install -g typescript
```

Vários editores são compatíveis com o TypeScript. O mais importante é a integração com a linguagem, para que o editor possa identificar os erros, ler as APIs etc.

Vamos usar um exemplo de uma página que soma dois números:

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sum</title>
</head>
<body>
    <input type="number" id="num1">
    <span>+</span>
    <input type="number" id="num2">

    <button id="button">Somar</button>

    <script src="./somar.js"></script>
</body>
</html>
```

`somar.js:`

```javascript
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
const button = document.getElementById('button');

function sum(a, b) {
    return a + b;
}

button.addEventListener('click', function() {
    console.log(sum(input1.value, input2.value));
});
```

A saída do click nunca vai ser a soma dos números, pois input.value retorna uma string. O retorno da função no exemplo acima são serão os valores concatenados, em vez de somados, como o esperado.

Agora o mesmo código em TypeScript:

> Arquivos em TypeScript devem possuir a extensão .TS

`somar.ts:`

```typescript
const input1 = document.getElementById('num1') as HTMLInputElement;
const input2 = document.getElementById('num2') as HTMLInputElement;
const button = document.getElementById('button');

function sum(a: number, b: number) {
    return a + b;
}

button.addEventListener('click', function() {
    console.log(sum(input1.value, input2.value));
});
```

Para acessar a propriedade value do input sem o TS detectar um erro, foi necessário tipar a variável `input1` e `input2` como um `HTMLInputElement`.

Também é possível ver a tipagem na função `sum`. O código acima irá retornar erro ao chamar a função `sum` passando `input.value`, pois são strings e a função espera receber números.

```typescript
console.log(sum(input1.value, input2.value));
```

se tentarmos compilar o código um exception será lançada:

> Para compilar um arquivo TypeScript utilizamos o comando `tsc filename.ts`

```shell
npx tsc 1-primeiro-código/somar.ts --watch

[9:58:25 PM] Starting compilation in watch mode...

1-primeiro-código/somar.ts:10:21 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

10     console.log(sum(input1.value, input2.value));
                       ~~~~~~~~~~~~

[9:58:27 PM] Found 1 error. Watching for file changes.
```

Para que o código compile é necessário converter a string retornada do input para Number:

```javascript
button.addEventListener('click', function() {
    console.log(sum(Number(input1.value), Number(input2.value)));
});
```

Após compilar, o TypeScript gera um arquivo `.js` que deve ser usado na aplicação. No caso, importado nVemos que pa `index.html`.

## TSconfig

TSconfig é o arquivo de configuração do TypeScript. Com ele é possível definir regras de compilação, outputs etc.

Para gerar o arquivo `tsconfig`:

```shell
tsc --init
```

O arquivo é criado no formato `.json` e contém várias as regras que podemos adicionar à nossa aplicação.

Na propriedade `outDir` do `tsconfig` é possível explicitar a saída do arquivo `js` que será gerado. E no `index.html` é necessário apontar pra esse arquivo de saída:

`tsconfig.json`:

```json
...
"outDir": "./dist",
...
```

`index.html`

```html
<script src="./dist/somar.js"></script>
```

Na raiz onde se encontra o `tsconfig`, basta compilar com o comando `tsc` para a pasta `dir` ser gerada com os respectivos arquivos `.js`.

## Recursos da linguagem - Types

A tipagem é uma das features mais importantes do TypeScript. Com ela podemos definir tipos das variáveis, retorno de funções etc.

Vamos ver os principais tipos presentes no TS:

### Any

Como o nome já diz, uma variável de tipo "qualquer":

```javascript
let value: any;

value = 'foo';
value = 10;
value = false;
```

### Boolean

Recebe `true` ou `false`:

```javascript
let isOpened: boolean;

isOpened = false;
isOpened = 'false'; // Type '"false"' is not assignable to type 'boolean'.ts(2322)
```

### Number

O tipo Number é um pouco diferente do que se vê em outras linguagens. O TypeScript não dispõe de números inteiros, sem sinal ou algo do tipo. Todos os números são definidos como números reais e podem ser representados, inclusive, por binários, hexadecimais etc. Número é número.

```javascript
let total: number;

total = 10 + 10;
total = 0.2;
total =
```

### String

A famosa sequência de caracteres:

```javascript
let message: string;

message = 'foo';
message = "foo";
message = `foo`;
```

### Array

Há duas formas de se utilizar uma array:

```javascript
let values: number[];
values = [10, 20, 30];

let numbers: Array<number>;
numbers = [10, 20, 30];
```

A primeira forma seria um "sugar syntax", já a segunda utiliza um recurso chamado Generics, muito comum em outras linguagens.

### Tuple

Outro tipo bem comum em outras linguagens são as tuples. É bem semelhante a um array, porém com tamanhos e valores de tipos bem definidos.

```javascript
let title: [number, string];

title = [1, 'foo'];
```

### Enum

São conjuntos ordenados de chaves e valores:

```javascript
enum Colors {
    white = '#fff',
    black = '#000'
}
```

### Void

Equivalente a uma função sem retorno:

```javascript
function logger() {
    console.log('hit');
}
```


### Null | Undefined

Muito utilizados ao criar um `type`, no exemplo uma variável que recebe uma `string` ou `undefined`:

```javascript
type myType = string | undefined;

let myValue: myType;
```

### Never

Nunca retorna. O código quando lança uma exception, ele nunca vai retornar nada, pois foi Interrompido. A função responsável por tratar e até disparar essa expection pode receber o type `never`:

```javascript
throw new Error("error");

function error(): never {
    throw new Error("error");
}
```

### Object

Estrutura de chave => valor, muito comum no `JS`:

```javascript
let people: object;

people = {
    name: 'Maicon',
};
```

## Type Inference

Ao declararmos uma variável e não informamos um tipo, o TypeScript vai utilizar o type inference, que define o tipo da variável como o do valor atribuido a ela.

```javascript
var text = 'foo'; // string
```

