const express = require('express')
const app = express()

app.use(express.json())

const productos = [
    {
        id: 1,
        nombre: 'Teclado inalambrico',
        descripcion: 'Teclado 101 teclas idioma ingles',
        precio: 1500.00
    },
    {
        id: 2,
        nombre: 'Mouse inalambrico',
        descripcion: 'Mouse optico inalambrico.',
        precio: 600.00
    },
    {
        id: 3,
        nombre: 'Monitor 23.5 pulgadas full hd',
        descripcion: 'Monitor Full HD panel IPS',
        precio: 6500.00
    }
]

// GET - Listar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Obtener un producto por id
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    res.json(producto)
})


// ============================================================
// PRÁCTICA 6: Completa los siguientes métodos de la API
// ============================================================

// TODO: POST /productos - Crear nuevo producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body

    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({
            mensaje: 'Los campos nombre, descripcion y precio son obligatorios'
        })
    }

    const precioNumero = parseFloat(precio)
    if (Number.isNaN(precioNumero) || precioNumero <= 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un numero mayor que cero'
        })
    }

    const nuevoId = productos.length > 0
        ? Math.max(...productos.map(producto => producto.id)) + 1
        : 1

    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio: precioNumero
    }

    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto)
})

// TODO: PUT /productos/:id - Actualizar producto
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const posicion = productos.findIndex(producto => producto.id === id)

    if (posicion === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    const { nombre, descripcion, precio } = req.body

    if (!nombre || !descripcion || precio === undefined || precio === null || precio === '') {
        return res.status(400).json({
            mensaje: 'Los campos nombre, descripcion y precio son obligatorios'
        })
    }

    const precioNumero = parseFloat(precio)
    if (Number.isNaN(precioNumero) || precioNumero <= 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un numero mayor que cero'
        })
    }

    const productoActualizado = {
        id,
        nombre,
        descripcion,
        precio: precioNumero
    }

    productos[posicion] = productoActualizado
    res.status(200).json(productoActualizado)
})

// TODO: DELETE /productos/:id - Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const posicion = productos.findIndex(producto => producto.id === id)

    if (posicion === -1) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }

    const productoEliminado = productos.splice(posicion, 1)[0]
    res.status(200).json({
        mensaje: 'Producto eliminado',
        producto: productoEliminado
    })
})

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000')
})
