# DOCUMENTO DE DISEÑO DE JUEGO
**PROYECTO
MYERS-BRIGGS**
Diego Alonso
Luis Cabello
Samuel García
Luis Parres Sánchez
Julian Serrano
Versión 1.1 - 2 de Noviembre de 2023
Copyright © 2023 - Diego Alonso, Luis Cabello, Samuel García, Luis Parres, Julian Serrano
Todos los derechos reservados.
## ÍNDICE

* Ficha técnica
* Descripción
* Jugabilidad
* MECÁNICAS
    * Cámara y entorno de juego
    * Movimiento del personaje
    * Apuntado y disparo
    * Mapa de juego
    * Enemigos
    * Eliminación de enemigos
    * Tótem de mejoras
    * Estadísticas base del personaje
    * Mecánicas dicotómicas
        * Primera dicotomía
        * Segunda dicotomía
        * Tercera dicotomía
        * Cuarta dicotomía
* HUD in-game
* HUD menú tótem
* Visual
* Referencias
* Redes y enlaces

## FICHA TÉCNICA
* **Género:** Juego de acción de disparos y supervivencia por oleadas.
* **Plataforma:** Navegador web con ordenador.
* **Público objetivo:** +14 años. Público juvenil.
* **Estilo visual:** Juego 2D, con vista Top-Down. Gráficos vectoriales.

## DESCRIPCIÓN

Frenético juego de supervivencia donde el jugador tendrá que enfrentarse a las
interminables oleadas de enemigos mientras mejora su personaje y adapta las mecánicas
de juego acorde a su propia personalidad. A medida que el jugador vaya superando
oleadas, tendrá la oportunidad de personalizar el entorno de juego, y generar ciertas
dinámicas acorde a su forma de ser y de hacer las cosas.

## JUGABILIDAD

El jugador controla a un personaje en tercera persona, desde una vista superior, en un mapa limitado a lo alto y a lo ancho. El jugador debe acabar con las oleadas de enemigos que se le acercan desde diferentes puntos del mapa mientras evita que estas le puedan dañar a él. Eliminar estos enemigos le otorgan algunas mejoras de sus características base, además de permitirle “adaptar” algunas mecánicas del juego según la personalidad y estilo de juego del propio jugador.

El objetivo final es aguantar el mayor número de oleadas posible, mientras el jugador personaliza a su gusto no solo el personaje que controla, sino el propio entorno de juego y
sus mecánicas.

Cuando acaba la partida, se descomponen las decisiones del jugador según la forma en la que ha personalizado su experiencia de juego, recibiendo este un análisis preciso de su personalidad y porqué hace las cosas como las hace.

## MECÁNICAS

### CÁMARA Y ENTORNO DE JUEGO MECÁNICAS

El entorno de juego se percibe mediante una cámara Top-Down en dos dimensiones. En el centro de la cámara se encuentra el personaje principal. La cámara acompaña al personaje, imitando sus movimientos y manteniéndolo en el centro del plano.
El jugador puede ver cualquier entidad que se encuentre dentro del frame de la cámara.

### MOVIMIENTO DEL PERSONAJE MECÁNICAS

El personaje se mueve en el plano del suelo mediante las teclas A W S D, desplazandolo en
ocho ejes de dirección.

### APUNTADO Y DISPARO MECÁNICAS

El personaje apunta siempre en la dirección del ratón, y rota sobre sí mismo para encarar esa misma dirección.
Se efectúa el disparo de un proyectil mediante el click izquierdo del ratón, el cuál saldrá despedido desde el personaje en dirección al ratón. Si se mantiene presionado el click izquierdo, se disparan proyectiles a una velocidad determinada por la cadencia de disparo.
Este mismo efecto se puede conseguir activando el modo “disparo automático”, presionando una tecla determinada, de este modo también puede ser desactivado de la misma forma.
Los sistemas de movimiento con teclado y apuntado con ratón son independientes, y no se afectan entre sí.

##MAPA DE JUEGO MECÁNICAS
Solo existe un mapa principal en el juego, donde se desarrolla toda la acción. Este mapa es cerrado, y cuenta con algunos obstáculos y elementos decorativos.

##ENEMIGOS MECÁNICAS
Existen dos conjuntos de enemigos con los que el jugador se encuentra de forma recurrente durante toda la partida:
* **Enemigos pertenecientes a una oleada**: Son generados junto al resto de su oleada,
en un punto de instancia habilitado para ello. Pueden tener una IA propia, o tener
una “mente colmena” junto a otros integrantes de su oleada.
* **Enemigos aislados**: Pueden ser generados en cualquier momento, aunque el área
habilitada para su instanciación es relativa a la posición del jugador. Tienen IA
propia.
Existen distintos tipos de enemigos. Estos difieren entre sí según los siguientes factores:
* *Distintas estadísticas base* (vida, daño, velocidad…)
* *Distintas mecánicas de movimiento* (m.r.u, teletransporte, estático…)
* *Distintas mecánicas de ataque* (melé, distancia, AOE…)

##ELIMINACIÓN DE ENEMIGOS MECÁNICAS
El jugador debe disparar a los distintos enemigos que se acerquen dentro de su rango de alcance para eliminarlos. El proyectil disparado tiene un daño específico que será infringido al enemigo impactado. Si el proyectil tiene más daño que vida le falta al enemigo, el enemigo en cuestión será eliminado pero el proyectil seguirá su ruta, habiéndo reducido su daño de forma equivalente a la vida que le faltaba al enemigo eliminado.
Todos los enemigos, al morir, sueltan un material que podrá ser utilizado posteriormente para modificar y personalizar la experiencia de juego con respecto a las mecánicas dicotómicas.
Además, un enemigo aleatorio de cada oleada tiene la característica oculta de soltar un tótem de mejora al morir.

###TÓTEM DE MEJORA MECÁNICAS
El tótem de mejora se queda estático en el mapa allí donde murió el enemigo que lo soltaba. El jugador puede interactuar con él mediante la tecla E (botón de interacción).
Una vez el jugador interactúa con el tótem, el juego se pausa, y se abre el menú de mejoras. Este está formado por dos sectores bien diferenciados:
* **Sector superior**: Balanzas con las 4 dicotomías de las personalidades.
* **Sector inferior**: Cartas de mejora

__Sector superior__:
Este cuenta con cuatro elementos de UI similares a una balanza con aguja centrada.
Cualquiera de estas balanzas (originalmente equilibradas) puede ser descompensada
haciendo uso de los polvos. Al aplicar un desequilibrio en cualquiera de las cuatro
dicotomías (representadas por las balanzas), la mecánica relacionada con esa dicotomía
será modificada según la dirección del desequilibrio.
__Sector inferior__:
Reservado para la mecánica dicotómica de las cartas de mejora. Solo se puede
utilizar esta mecánica una vez por tótem de mejora.
Cada tótem tiene un solo uso, y desaparecerá cuando el jugador cierre el menú de mejoras
y se reanude el transcurso del juego.
El jugador no tiene porqué interactuar con el tótem según aparece en pantalla. Puede ser
utilizado en cualquier momento del juego, pudiendo incluso acumularse si el jugador así lo
considera.

###ESTADÍSTICAS BASE DEL PERSONAJE

* Vida máxima
* Daño base
* Armadura
* Resistencia mágica
* Velocidad
* Cadencia de disparo
* Regeneración de vida


## MECÁNICAS DICOTÓMICAS

La idea de juego gira alrededor de las cuatro dicotomías utilizadas como indicadores en el
test de Myers-Briggs. Estas dicotomías están definidas como pares opuestos entre ocho
categorías.6

### PRIMERA DICOTOMÍA
### Extroversión:
Característica propia de personas cuyo interés está centrado en el entorno y en las personas que le rodean. Personas que prefieren dirigir su energía hacia fuera, orientados a la acción, las cosas, otros individuos.
### Introversión:
Actitud típica que se caracteriza por la concentración del interés en los procesos internos del sujeto. Personas que prefieren dirigir su energía hacia dentro, orientados hacia ideas, información y pensamientos internos.
En relación a esta dicotomía se introduce la mecánica del ataque base. Cuando el jugador crea un desbalance hacia la extroversión, el personaje pierde rango de alcance, pero gana mdaño y área de acción. Si la dicotomía se desbalancea hacia la introversión, el personaje gana rango de alcance en sus ataques, pero pierde daño en cada disparo.
##SEGUNDA DICOTOMÍA
### Sensación:
Tipo de persona que prefiere tratar con hechos, detalles e información concreta. Hace uso de sus cinco sentidos para percibir y analizar la información.
### Intuición:
Tipo de persona que prefiere tratar con ideas, conceptos abstractos y teorías. Recibe y analiza la información a través de procesos internos de pensamiento.
Esta dicotomía se relaciona con la UI, y la información que aporta. Cuando el jugador crea un desbalance hacia la sensación, este recibirá más información a través de la UI, nuevos parámetros y características del estado de juego. Si el jugador desbalancea la dicotomía hacia la intuición, poco a poco se irán eliminando los elementos que conforman la UI, liberando el espacio visual del juego.

## TERCERA DICOTOMÍA
### Racional:
Persona que prefiere tomar decisiones desde un punto de vista independiente, utilizando la razón y la lógica para sacar conclusiones. No se precipita en su parecer, y no se deja llevar por impulsos primitivos.
### Emocional:
Persona que juzga desde un punto de vista interno y sentimental. Siente con más intensidad, y se deja llevar por las emociones, lo que dificulta su toma de decisiones.
En relación a esta dicotomía se crea una nueva mecánica: Rabia / Eureka. El jugador dispone en todo momento de dos barras de medición. La barra correspondiente a la rabia (emocional) se rellena cuando el jugador es dañado por un enemigo. La barra correspondiente al eureka (racional) se rellena cuando el jugador daña a un enemigo.
Al completar la barra de rabia, el personaje gana un bonus multiplicativo de daño y obtiene un porcentaje de robo de vida, pero también recibe más daño de los enemigos. Este estado de rabia tiene un tiempo de duración.
Al completar la barra de eureka, el jugador consigue una ventaja específica puntual, como una limpieza de enemigos de pantalla o un tótem de mejora extra.
## CUARTA DICOTOMÍA
### Juicio:
Característica de las personas que prefieren experiencias planificadas y bien estructuradas. Construyen un proceso mental paso a paso, prefiriendo el orden y el control sobre los sucesos futuros.
### Percepción:
Actitud típica de las personas flexibles, que se adaptan al medio y que prefieren dejarse llevar por la corriente. Son personas espontáneas, de circuito corto, que improvisan en tiempo presente.
En relación a esta dicotomía se presenta la mecánica de las cartas de mejora. Cuando el jugador interactúa con un tótem, este tendrá acceso a una serie de cartas de mejora, que sirven para aumentar las estadísticas base del personaje, teniendo que elegir cuales desea
obtener de entre las cartas que se le presentan.
Al desbalancear la dicotomía hacia el juicio, un mayor número de cartas son presentadas al jugador, aunque la mejora resultante de cada carta individual será un poco peor.
Si la dicotomía es desbalanceada hacia la percepción, el jugador podrá elegir entre muchas menos cartas, dependiendo pues de la suerte de cada momento, aunque cada una de ellas individualmente otorgará una mejora más sustancial.


## VISUAL [^1]

Para el apartado visual usamos principalmente assets con licencia CC0 o con licencia adquirida, obtenidos a través de páginas especializadas en internet. También usamos nuestros propios assets cuando buscamos un gráfico muy específico, o modificamos los adquiridos (cuya licencia no tenga un atributo ND) para satisfacer nuestras necesidades concretas.
El estilo visual es con gráficos vectorizados y colores planos. Esta decisión de diseño se basa en la naturaleza del juego, cuyo ritmo frenético y mecánicas skill-based solo funcionan si se da al jugador un feedback claro e inteligible. Este feedback se vuelve gratificante mediante la incorporación de mecanismos como VFX o camera-shake.
[^1]: Las referencias visuales se encuentran en un documento de google no accesible al público 

## REFERENCIAS

* *VAMPIRE SURVIVOR*
Juego de acción y supervivencia por oleadas utilizado para crear la base del proyecto.
Las mecánicas de cámara, movimiento, enemigos y dinámica de juego se basan en este título u otros títulos de estilo similar.
* *REIGNS*
Juego con una mecánica vertebral de toma de decisiones. Referencia importante a la hora de decidir cómo íbamos a crear un juego en torno a las 16 Personalidades. El concepto de las 4 dicotomías del test de Myers-Briggs ha sido introducido en el juego teniendo muy en cuenta el funcionamiento de Reigns y las dinámicas que genera el juego.
* *DIEP.IO*
Juego de navegador cuyo sistema de evoluciones modifica la mecánica básica de disparo.
Estas modificaciones generan nuevas dinámicas y estrategias en el juego. La forma que tiene el jugador de adaptar y personalizar las mecánicas de juego gracias a las cuatro dicotomías recuerda a este título multijugador casual.
## REDES Y ENLACES

https://www.instagram.com/_scriptedgames/
https://twitter.com/_scriptedgames
https://github.com/Lparres2000/JuegoPVLI
Proyecto Myers-Briggs - Documento de diseño de juego 12
