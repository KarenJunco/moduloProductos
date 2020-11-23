let fs = require('fs'); 

let moduloProductos = { 

    leerJSON: function(){

        let listaDeProductos = fs.readFileSync('./productos.json', 'utf-8'); 
        let productos = JSON.parse(listaDeProductos); 
        return productos 

    },

    escribirJSON: (nombreProducto, precio)=>{ 

        let listaDeProductos = moduloProductos.leerJSON(); 
        let lastId = 1 
        
        listaDeProductos.map(function(producto){ 
            if(producto.id > lastId){ 
                lastId = producto.id 
            }
        });
        
        let Producto = function(id, name, price){ 
            this.id = id,
            this.name = name,
            this.price = price
        };
        
        let nuevoProducto = new Producto(lastId + 1, nombreProducto, precio); 
        listaDeProductos.push(nuevoProducto); 

        let productosActualizados = JSON.stringify(listaDeProductos); 
        fs.writeFileSync('./productos.json', productosActualizados, 'utf-8')
    },
    filtrarJSON: (precioMinimo, precioMaximo )=>{ 

        let listaDeProductos =  moduloProductos.leerJSON();

        let listaFiltrada = listaDeProductos.filter((producto)=>{ 
           return producto.price >= precioMinimo && producto.price <= precioMaximo
        })
         return listaFiltrada

    },
    cambiarPrecio: (id, nuevoPrecio)=>{ 

        let listaDeProductos = moduloProductos.leerJSON();

        let productoAModificar = listaDeProductos.filter((producto)=>{ 
            if(producto.id == id){ 
            producto.price = nuevoPrecio 
            }; 
            return listaDeProductos 
        })

        let productoModificado = JSON.stringify(productoAModificar); 
        fs.writeFileSync('./productos.json', productoModificado, 'utf-8') 
    },
    eliminar : (id)=>{ 

        let listaDeProductos = moduloProductos.leerJSON(); 
        let quitarProducto = listaDeProductos.filter(producto =>{ 
            return producto.id !== id 
        })
        
        let nuevaLista = JSON.stringify(quitarProducto);
        fs.writeFileSync('./productos.json', nuevaLista, 'utf-8') 
    },
    buscar : (busqueda)=>{ 
        let listaDeProductos = moduloProductos.leerJSON();

        let productoBuscado = listaDeProductos.filter(producto => {
            return producto.name.toLowerCase().includes(busqueda.toLowerCase()) 
        })
        return productoBuscado
    }
}

module.exports = moduloProductos