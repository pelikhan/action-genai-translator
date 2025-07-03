# Guía completa de la sintaxis de Markdown

Este documento demuestra todas las principales construcciones sintácticas disponibles en Markdown.

## Tabla de Contenidos

* [Encabezados](#headers)
* [Formateo de texto](#text-formatting)
* [Listas](#lists)
* [Enlaces e Imágenes](#links-and-images)
* [Código](#code)
* [Tablas](#tables)
* [Citas en bloque](#blockquotes)
* [Reglas horizontales](#horizontal-rules)
* [Saltos de línea](#line-breaks)
* [Elementos HTML](#html-elements)
* [Características avanzadas](#advanced-features)

## Encabezados

# Encabezado H1

## Encabezado H2

### Encabezado H3

#### Encabezado H4

##### Encabezado H5

###### Encabezado H6

# Alternativa H1

## Alternativa H2

## Formateo de texto

**Texto en negrita usando asteriscos**
**Texto en negrita usando guiones bajos**

*Texto en cursiva usando asteriscos*
*Texto en cursiva usando guiones bajos*

***Negrita y cursiva usando asteriscos***
***Negrita y cursiva usando guiones bajos***

~~Texto tachado~~

`Código en línea`

Texto regular con **negrita**, *cursiva* y `código` mezclados.

## Listas

### Listas no ordenadas

* Elemento 1
* Elemento 2
  * Elemento anidado 2.1
  * Elemento anidado 2.2
    * Elemento muy anidado 2.2.1
* Elemento 3

Sintaxis alternativa:

* Elemento A
* Elemento B
  * Elemento anidado B.1
  * Elemento anidado B.2

Otra alternativa:

* Elemento X
* Elemento Y
  * Elemento anidado Y.1

### Listas ordenadas

1. Primer elemento
2. Segundo elemento
   1. Elemento numerado anidado
   2. Otro elemento anidado
      1. Elemento muy anidado
3. Tercer elemento

Numeración alternativa:

1. Elemento uno
2. Elemento dos (numerado automáticamente)
3. Elemento tres (numerado automáticamente)

### Listas mixtas

1. Elemento ordenado
   * Elemento no ordenado anidado
   * Otro elemento no ordenado anidado
2. Otro elemento ordenado
   1. Elemento ordenado anidado
   2. Otro elemento ordenado anidado

### Listas de tareas

* [x] Tarea completada
* [ ] Tarea incompleta
* [x] Otra tarea completada
  * [x] Tarea completada anidada
  * [ ] Tarea incompleta anidada

## Enlaces e Imágenes

### Enlaces

[Enlace simple](https://www.example.com)

[Enlace con título](https://www.example.com "Example Website")

// TODO desactivar MDX
\< [https://www.autolink.com>](https://www.autolink.com>)

\[Enlace de referencia]\[ref1]

\[Otro enlace de referencia]\[ref2]

\[Enlace de referencia no sensible a mayúsculas]\[REF1]

También puedes enlazar a [archivos locales](./README.md).

### Imágenes

![Texto alternativo](https://via.placeholder.com/150x100 "Título de la imagen")

!\[Imagen de referencia]\[img1]

### Definiciones de referencia

[ref1]: https://www.reference1.com "Reference 1 Title"

[ref2]: https://www.reference2.com

[img1]: https://via.placeholder.com/200x150 "Reference Image"

## Código

### Código en línea

Usa `console.log()` para imprimir en la consola.

### Bloques de código

```
Simple code block without syntax highlighting
```

```javascript
// JavaScript code block
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet("World");
```

```python
# Python code block
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```bash
# Bash script
#!/bin/bash
echo "Hello, World!"
for i in {1..5}; do
    echo "Number: $i"
done
```

```json
{
    "name": "Sample JSON",
    "version": "1.0.0",
    "dependencies": {
        "express": "^4.18.0"
    }
}
```

Bloque de código indentado (4 espacios):
TODO: arreglar este problema de análisis

## Tablas

| Columna 1 | Columna 2   | Columna 3 |
| --------- | ----------- | --------- |
| Fila 1    | Datos       | Más datos |
| Fila 2    | Información | Detalles  |

### Tabla con alineación

| Alineado a la izquierda | Centrado | Alineado a la derecha |
| :---------------------- | :------: | --------------------: |
| Izquierda               |  Centro  |               Derecha |
| Texto                   |   Texto  |                 Texto |
| Más                     |   Datos  |                  Aquí |

### Tabla simple

| Primer encabezado    | Segundo encabezado   |
| -------------------- | -------------------- |
| Celda de contenido 1 | Celda de contenido 2 |
| Celda de contenido 3 | Celda de contenido 4 |

## Citas en bloque

> Esta es una cita en bloque simple.

> Esta es una cita en bloque
> que abarca varias líneas.

> Citas en bloque anidadas:
>
> > Esta es una cita en bloque anidada.
> >
> > > Y esta está profundamente anidada.

> ### Cita en bloque con otros elementos
>
> * Elemento de lista en cita en bloque
> * Otro elemento
>
> **Texto en negrita** en cita en bloque con `código en línea`.

## Reglas horizontales

***

***

***

***

***

***

## Saltos de línea

Esta es la primera línea.\
Esta es la segunda línea (dos espacios al final de la línea anterior).

Esta es la tercera línea.

Esta es la cuarta línea (una línea vacía crea salto de párrafo).

Esta es una línea con un\
salto de línea con barra invertida.

## Elementos HTML

Puedes usar <em>etiquetas HTML</em> en Markdown.

<strong>Negrita usando HTML</strong>

<code>Código en línea usando HTML</code>

<kbd>Ctrl</kbd> + <kbd>C</kbd>

<mark>Texto resaltado</mark>

<small>Texto pequeño</small>

<sub>Subíndice</sub> y <sup>Superíndice</sup>

<details>
  <summary>Sección expandible</summary>

  Este contenido está oculto por defecto y puede ser expandido.

  * Elemento de lista
  * Otro elemento

  ```javascript
  console.log("Code in details");
  ```
</details>

## Características avanzadas

### Notas al pie

Aquí hay una oración con una nota al pie\[^1].

Otra oración con una nota al pie\[^note].

[^1]: Esta es la primera nota al pie.

[^note]: Esta es una nota al pie nombrada con más detalles.

### Listas de definiciones

Término 1
:   Definición para el término 1

Término 2
:   Definición para el término 2
:   Otra definición para el término 2

### Abreviaturas

\*\[HTML]: Lenguaje de Marcado de Hipertexto
\*\[CSS]: Hojas de Estilo en Cascada

HTML y CSS son tecnologías web importantes.

### Matemáticas (si es compatible)

Matemáticas en línea: $E = mc^2$

Matemáticas en bloque:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### Caracteres de escape

Usa barras invertidas para escapar caracteres especiales:

\*No en cursiva\*
\#No es un encabezado
\[No es un enlace]
\`No es código\`

### Comentarios

TODO: Es necesario poder desactivar MDX.

### Emojis

\:smile: \:heart: \:thumbsup: \:rocket: \:computer:

😀 😍 👍 🚀 💻

***

## Conclusión

Este documento cubre la mayoría de la sintaxis estándar de Markdown. Algunas características como notas al pie, listas de definiciones, matemáticas y ciertos elementos HTML pueden no estar soportadas en todos los procesadores de Markdown, pero funcionan en muchas versiones extendidas como GitHub Flavored Markdown (GFM), CommonMark y otras.

**Nota**: La representación exacta de estos elementos puede variar dependiendo del procesador de Markdown que se use.
