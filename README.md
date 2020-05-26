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

## Type Aliases e Union

Podemos adotar estratégias para situações em que o tipo do valor pode se sobrepor, por exemplo
uma função onde o primeiro parâmetro pode ser uma `string` ou `number`.

Para esse caso existe o [union](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html), onde os tipos permitidos são separados por `|`:

```javascript
function logDetails(uuid: number | string, item: string) {
    console.log(`A product with ${uuid} has a title as ${item}`);
}
```

Também existem os [aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) onde definimos um "novo" para o typescript.

```javascript
type uuid = number | string;

function logDetails(uuid: uuid, item: string) {
    console.log(`A product with ${uuid} has a title as ${item}`);
}
```

De forma resumida criamos um atalho para uma variável que pode receber mais de um tipo primitivo.

Também podemos usar os [aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)
para receber um determinado valor:

```javascript
type platform = 'Windows' | 'Linux' | 'MacOS';

function logConsole(platform: platform) {
    console.log(platform);
}

logConsole('Windows');
logConsole('Ubuntu'); // Argument of type '"Ubuntu"' is not assignable to parameter of type 'platform'.ts(2345)
```

## Classes

O TypeScript pode ser usado tanto com paradigmas como Orientação a Objetos e também funcional.
Por conta disso, assim como no es6, ele conta com features como [classes](https://www.typescriptlang.org/docs/handbook/classes.html).

```javascript
class Employee {
    public empName: string;
    protected empCode: number;

    constructor(name: string, code: number){
        this.empName = name;
        this.empCode = code;
    }

    logDetails(): void {
        console.log(`empName: ${this.empName}, empCode: ${this.empCode}`);
    }
}

const employee = new Employee('maicon', 12);

employee.logDetails();

// empName: maicon, empCode: 12
```

Classes também podem ser extendidas:

```javascript
class SalesEmployee extends Employee{
    department: string;

    constructor(name: string, code: number, department: string) {
        super(name, code);

        this.department = department;
    }

        employeeDetails(): void {
        console.log(`
            empName    : ${this.empName},
            empCode    : ${this.empCode},
            departament: ${this.department}`
        );
    }
}

let emp = new SalesEmployee("John Smith", 123, "Sales");

emp.employeeDetails();

// empName: John Smith, empCode: 123, departament: Sales
```

### Data Modifiers

Na programação orientada a objetos, o conceito de 'Encapsulamento' é usado para tornar os membros da classe públicos ou privados, ou seja, uma classe pode controlar a visibilidade de seus atributos e métodos. Isso é feito usando modificadores de acesso.

Existem três tipos de modificadores de acesso no TypeScript: `public`, `private` e `protected`.

#### Public

Por padrão, todos os membros de uma classe no TypeScript são públicos. Todos os membros públicos podem ser acessados ​​em qualquer lugar, sem restrições.

```javascript
class Employee {
    public empCode: string;
    empName: string;
}

let emp = new Employee();

emp.empCode = 123;
emp.empName = "Swati";
```

#### Private

O modificador de acesso privado garante que os membros da classe sejam visíveis apenas para essa classe e não sejam acessíveis fora da classe que o contém.

```javascript
class Employee {
    private empCode: number;
    empName: string;
}

let emp = new Employee();

emp.empCode = 123; // Compiler Error
emp.empName = "Swati"; // OK
```

#### Protected

O modificador de acesso protegido é semelhante ao modificador de acesso privado, exceto que os membros protegidos podem ser acessados ​​usando suas classes derivadas.

```javascript
class Employee {
    public empName: string;
    protected empCode: number;

    constructor(name: string, code: number){
        this.empName = name;
        this.empCode = code;
    }
}

class SalesEmployee extends Employee{
    private department: string;

    constructor(name: string, code: number, department: string) {
        super(name, code);
        this.department = department;
    }
}

let emp = new SalesEmployee("John Smith", 123, "Sales");

emp.empCode; //Compiler Error
```

#### Readonly

O modificador de acesso leitura. Permite que um atributo seja acessível de fora da class, mas não pode ser alterado:

```javascript
class Employee {
    readonly empCode: number;
    empName: string;
}

let emp = new Employee();

emp.empCode = 123; // Compiler Error
```

## TypeScript Accessor

O TypeScript suporta getters/setters como uma maneira de interceptar acessos a um membro de um objeto. Isso fornece uma maneira de ter um controle mais refinado sobre como um membro é acessado em cada objeto.

Vamos converter uma classe simples para usar get e set. Primeiro, vamos começar com um exemplo sem utilizar `acessors`:

```javascript
class Employee {
  fullName: string;
}

let employee = new Employee();

employee.fullName = "Bob Smith";

if (employee.fullName) {
  console.log(employee.fullName);
}
```

Mudar ou recuperar atributos de uma classe de forma explícita pode ser conveniente, mas isso torna o código frágil.

Com getters e setters podemos definir regras ao settar um nome, e também preservar os atributos da class fornecendo-o através de um getter:

Nome exemplo a seguir o atributo _fullName é privado, e só pode ser definido seguindo uma regras de maxLenght:

```javascript
const fullNameMaxLength = 10;

class User {
    private _fullName: string;

    constructor(name: string) {
        this._fullName = name;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }

        this._fullName = newName;
    }
}

let user = new User('Denis Chambers');

console.log('constructor', user.fullName)

user.fullName = "Bob Smith";

console.log('setter', user.fullName);
```

Um detalhe é que o getter/setter não são chamados como um método ou função utilizando parênteses, mas apenas como atributo
do objeto:

```javascript
user.fullName = 'Maicon Silva'; // Setter
user.fullName; // Getter
```

## Classes abstratas

Classes abstratas são classes base das quais outras classes podem ser derivadas. Elas não podem ser instanciadas diretamente.

```javascript
abstract class Animal {
    abstract makeSound(): void;

    move(): void {
        console.log("roaming the earth...");
    }
}
```

São utilizadas como modelos para outras class, para serem extendidas e então instanciadas.