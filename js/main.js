//CATALOGO DE PRODUCTOS
const productos=[
    //
    {
        id:"Tramites",
        titulo:"Tramites de control",  //marca del producto
        imagen:"./img/tramites.jpg",
        categoria:{
            nombre:"Tramites",
            id:"Tramites"    // campo clave para enlazar con index.html
        },
        precio:400000
    },
    {
        id:"Saneamiento",
        titulo:"Plan de saneamiento",  //marca del producto
        imagen:"./img/saneamiento.png",
        categoria:{
            nombre:"Saneamiento",
            id:"Saneamiento"    // campo clave para enlazar con index.html
        },
        precio:370000
    },
    {
        id:"Etiquetado",
        titulo:"Etiquetado y rotulado",  //marca del producto
        imagen:"./img/etiquetas-foto-alargada.jpg",
        categoria:{
            nombre:"Etiquetado",
            id:"Etiquetado"    // campo clave para enlazar con index.html
        },
        precio:800000
    },
    {
        id:"Elaboracion",
        titulo:"Elaboracion tablas nutricionales",  //marca del producto
        imagen:"./img/tabla-Nutricional.jpg",
        categoria:{
            nombre:"Elaboracion",
            id:"Elaboracion"    // campo clave para enlazar con index.html
        },
        precio:1200000
    },
    {
        id:"Asesoramiento",
        titulo:"Asesoramiento y acompañamiento profesional",  //marca del producto
        imagen:"./img/asesoramiento.jpg",
        categoria:{
            nombre:"Asesoramiento",
            id:"Asesoramiento"    // campo clave para enlazar con index.html
        },
        precio:1500000
    },
    {
        id:"Acompañamiemto",
        titulo:"Acompañamiento sanitario vehiculos",  //marca del producto
        imagen:"./img/vehiculos.jpg",
        categoria:{
            nombre:"Acompañamiento",
            id:"Acompañamiento"    // campo clave para enlazar con index.html
        },
        precio:1000000
    },
    {
        id:"Diseño",
        titulo:"Diseño plantas y/o productos",  //marca del producto
        imagen:"./img/planta.avif",
        categoria:{
            nombre:"Diseño",
            id:"Diseño"    // campo clave para enlazar con index.html
        },
        precio:2300000
    },
    {
        id:"Capacitacion",
        titulo:"Capacitacion continua",  //marca del producto
        imagen:"./img/capacitacion laboral.jpg",
        categoria:{
            nombre:"Capacitacion",
            id:"Capacitacion"    // campo clave para enlazar con index.html
        },
        precio:800000
    },
    {
        id:"Curso",
        titulo:"Curso manipulacion de alimentos",  //marca del producto
        imagen:"./img/manipulacion.jpg",
        categoria:{
            nombre:"Curso",
            id:"Curso"    // campo clave para enlazar con index.html
        },
        precio:80000
    },
     // al ultimo JSON se le quita la coma
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
