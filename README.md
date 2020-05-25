# O que é o TypeScript?

- É um superset do JavaScript
- Adicionar features como tipagem estática ao JavaScript
- Necessita de um transpilador, escrevemos o código em TS e no final transpilamos para JS

## Por que usar TypeScript?

JavaScript é uma linguagem dinamica, com isso podemos mudar o tipo da variável e obter retornos inesperados.

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