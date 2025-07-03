# Guía Integral de Sintaxis Markdown

Este documento demuestra todas las principales construcciones sintácticas disponibles en Markdown.

## Tabla de Contenidos

* [Encabezados](#headers)
* [Formato de Texto](#text-formatting)
* [Listas](#lists)
* [Enlaces e Imágenes](#links-and-images)
* [Código](#code)
* [Tablas](#tables)
* [Citas](#blockquotes)
* [Reglas Horizontales](#horizontal-rules)
* [Saltos de Línea](#line-breaks)
* [Elementos HTML](#html-elements)
* [Características Avanzadas](#advanced-features)

## Encabezados

# Encabezado H1

## Encabezado H2

### Encabezado H3

#### Encabezado H4

##### Encabezado H5

###### Encabezado H6

# Alternativa H1

## Alternativa H2

## Formato de Texto

**Texto en negrita usando asteriscos**
**Texto en negrita usando guiones bajos**

*Texto en cursiva usando asteriscos*
*Texto en cursiva usando guiones bajos*

***Negrita y cursiva usando asteriscos***
***Negrita y cursiva usando guiones bajos***

~~Texto tachado~~

`Código en línea`

Texto normal con **negrita**, *cursiva* y `código` mezclados.

## Listas

### Listas desordenadas

* Elemento 1
* Elemento 2
  * Elemento anidado 2.1
  * Elemento anidado 2.2
    * Elemento anidado profundamente 2.2.1
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
      1. Elemento profundamente anidado
3. Tercer elemento

Numeración alternativa:

1. Elemento uno
2. Elemento dos (numeración automática)
3. Elemento tres (numeración automática)

### Listas mixtas

1. Elemento ordenado
   * Elemento anidado desordenado
   * Otro elemento anidado desordenado
2. Otro elemento ordenado
   1. Elemento ordenado anidado
   2. Otro elemento ordenado anidado

### Listas de tareas

* [x] Tarea completada
* [ ] Tarea incompleta
* [x] Otra tarea completada
  * [x] Tarea anidada completada
  * [ ] Tarea anidada incompleta

## Enlaces e Imágenes

### Enlaces

[Enlace simple](https://www.example.com)

[Enlace con título](https://www.example.com "Example Website")

// TODO desactivar MDX
< [https://www.autolink.com>](https://www.autolink.com>)

\[Enlace de referencia]\[ref1]

\[Otro enlace de referencia]\[ref2]

\[Enlace de referencia insensible a mayúsculas]\[REF1]

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
TODO: solucionar este problema de análisis

## Tablas

| Columna 1 | Columna 2 | Columna 3 |
| --------- | --------- | --------- |
| Fila 1    | Dato      | Más datos |
| Fila 2    | Info      | Detalles  |

### Tabla con alineación

| Alineado a la izquierda | Alineado al centro | Alineado a la derecha |
| :---------------------- | :----------------: | --------------------: |
| Izquierda               |       Centro       |               Derecha |
| Texto                   |        Texto       |                 Texto |
| Más                     |        Dato        |                  Aquí |

### Tabla simple

| Primer Encabezado    | Segundo Encabezado   |
| -------------------- | -------------------- |
| Celda de contenido 1 | Celda de contenido 2 |
| Celda de contenido 3 | Celda de contenido 4 |

## Citas

> Esta es una cita simple.

> Esta es una cita
> que abarca varias líneas.

> Citas anidadas:
>
> > Esta es una cita anidada.
> >
> > > Y esta está profundamente anidada.

> ### Cita con otros elementos
>
> * Elemento de lista en cita
> * Otro elemento
>
> **Texto en negrita** en cita con `código en línea`.

## Reglas Horizontales

***

***

***

***

***

***

## Saltos de Línea

Esta es la primera línea.\
Esta es la segunda línea (dos espacios al final de la línea anterior).

Esta es la tercera línea.

Esta es la cuarta línea (una línea vacía crea un salto de párrafo).

Esta es una línea con una\
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
<summary>Expandable section</summary>

Este contenido está oculto por defecto y puede expandirse.

* Elemento de lista
* Otro elemento

```javascript
console.log("Code in details");
```

</details>

## Características Avanzadas

### Notas al pie

Esta es una frase con una nota al pie\[^1].

Otra frase con una nota al pie\[^note].

[^1]: Esta es la primera nota al pie.

[^note]: Esta es una nota al pie con nombre y más detalles.

### Listas de definición

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

Utiliza barras invertidas para escapar caracteres especiales:

\*No cursiva\*
\#No es un encabezado
\[No es un enlace]
\`No es código\`

### Comentarios

### Emojis

\:smile: \:heart: \:thumbsup: \:rocket: \:computer:

😀 😍 👍 🚀 💻

***

## Conclusión

Este documento cubre la mayoría de la sintaxis estándar de Markdown. Algunas funciones como las notas al pie, listas de definición, matemáticas y ciertos elementos HTML pueden no estar soportados en todos los procesadores de Markdown, pero funcionan en muchas versiones extendidas como GitHub Flavored Markdown (GFM), CommonMark y otras.

**Nota**: La representación exacta de estos elementos puede variar dependiendo del procesador de Markdown que se utilice.
