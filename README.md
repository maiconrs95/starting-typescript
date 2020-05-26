# Introdução - O que é o TypeScript?

- É um superset do JavaScript
- Adiciona features como tipagem estática ao JavaScript
- Necessita de um transpilador, escrevemos o código em TS e no final transpilamos para JS

## Por que usar TypeScript?

JavaScript é uma linguagem dinamica, com isso podemos mudar o tipo das variáveis e obter retornos inesperados.

```javascript
function sum(a, b) {
    return a + b;
}

sum(1, 2); // 3
sum('1', '2'); // 12? concatenou a string :D
```

O TypeScript nos avisa em casos como esse e também em muitos outros.

Também funciona como uma "documentação":

```typescript
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

platforms e features em ```GameDetails``` são arrays que esperam os valores presente em seus respectivos types.

## Primeiro código em TypeScript

Para transpilar o código TS para JS, utilizamos o [tsc](https://www.typescriptlang.org/#installation), então é necessário
te-lo instalado de forma global ou no projeto.

Vamos usar um exemplo de uma página que soma dois números:

```index.html```

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

```somar.js:```

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

A saída disso nunca vai ser a soma dos números, pois input.value retorna uma string. O retorno da função no exemplo acima são os valores concatenados.

Agora o mesmo código em TypeScript:

> Arquivos em TypeScript devem possuir a extensão .TS

```somar.ts:```

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

Vemos que para acessar a propriedade value do input, foi necessário tipar a variável ```input1``` e ```input2``` como um ```HTMLInputElement```.

Também é possível ver a tipagem na função ```sum```. O código acima irá retornar erro ao chamar a função ```sum``` passando ```input.value```, pois são strings e a função espera receber números.

```typescript
console.log(sum(input1.value, input2.value));
```

se tentarmos compilar o código um exceṕtion será lançada:

```shell
npx tsc 1-primeiro-código/somar.ts --watch

[9:58:25 PM] Starting compilation in watch mode...

1-primeiro-código/somar.ts:10:21 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

10     console.log(sum(input1.value, input2.value));
                       ~~~~~~~~~~~~

[9:58:27 PM] Found 1 error. Watching for file changes.
```

Para que o código compile é necessário converter a string retornada do input para Number:

```typescript
button.addEventListener('click', function() {
    console.log(sum(Number(input1.value), Number(input2.value)));
});
```

Após compilar, o TypeScript gera um arquivo .JS que deve ser usado na aplicação. No cas, importado na ```index.html```.