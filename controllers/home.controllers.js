const ManagerFactory = require('../dao/managersMongo/manager.factory')

const productManager = ManagerFactory.getManagerInstance('products')
const cartManager = ManagerFactory.getManagerInstance('carts')
const purchaseManager = ManagerFactory.getManagerInstance('purchases')

const mailSenderService = require('../services/mail.sender.service')

class HomeController {

    async getHome (req, res) {

        let { query, page, limit, sort } = req.query
    
        if(sort == 'asc'){
            sort = 1
        } else if( sort == 'desc'){
            sort = -1
        }
    
        if(query){
            if (!query.startsWith('{"') || !query.endsWith('"}'))
            res.status(400).send({error: 'Query incorrecto.'})
    
            query = JSON.parse(query);
        }
    
        if(sort == 1 || sort == -1 || sort == "" || sort == undefined){
            sort
        } else {
            res.status(400).send({ error: 'Sort incorrecto.'})
        }
    
        const { docs: products, ...pageInfo } = await productManager.getProducts( page, limit, query, sort )
      
        if(query){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}` : ''
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}` : ''
        } else if (query && sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
        } else {
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}` : ''
        }
    
        if(sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&sort=${sort}` : ''
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&sort=${sort}` : ''
        } else if (query && sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
        } else{
            
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}` : ''
        
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}` : ''
        }
        
        const cart = await cartManager.getCartById(req.user.cart._id)

        res.render('home', {
            title: 'Home',
            user: req.user ? {
                ...req.user,
                isAdmin: req.user.role == 'admin',
                isPublic: req.user.role == 'Customer',
                isPremium: req.user.role == 'Premium'
            } : null,
            idCart: cart._id,
            products,
            pageInfo,
            style: 'home'
        })
    }

    async postHome (req, res) {
        let { sort } = req.body
        let { query, page, limit } = req.query
    
        if(sort == 'asc'){
            sort = 1
        } else if( sort == 'desc'){
            sort = -1
        }
    
        if(query){
            if (!query.startsWith('{"') || !query.endsWith('"}'))
            res.status(400).send({error: 'Query incorrecto.'})
    
            query = JSON.parse(query);
        }
    
        if(sort == 1 || sort == -1 || sort == "" || sort == undefined){
            sort
        } else {
            res.status(400).send({ error: 'Sort incorrecto.'})
        }
    
        const { docs: products, ...pageInfo } = await productManager.getProducts( page, limit, query, sort )
       
        if(query){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}` : ''
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}` : ''
        } else if (query && sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
        } else {
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}` : ''
        }
    
        if(sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&sort=${sort}` : ''
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&sort=${sort}` : ''
        } else if (query && sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
        } else{
            
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.prevPage}&limit=${pageInfo.limit}` : ''
        
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/?page=${pageInfo.nextPage}&limit=${pageInfo.limit}` : ''
        }
        
        const cart = await cartManager.getCartById(req.user.cart._id)
    
        res.render('home', {
            title: 'Home',
            user: req.user ? {
                ...req.user,
                isAdmin: req.user.role == 'admin',
                isPublic: req.user.role == 'Customer',
                isPremium: req.user.role == 'Premium'
            } : null,
            idCart: cart._id,
            products,
            pageInfo,
            style: 'home'
        })
    }

    async getRealTimeProducts (req, res) {

        let { query, page, limit, sort } = req.query
    
        if(query){
            if (!query.startsWith('{"') || !query.endsWith('"}'))
            res.status(400).send({error: 'Query incorrecto.'})
    
            query = JSON.parse(query);
        }
    
        if(sort == 1 || sort == -1 || sort == "" || sort == undefined){
            sort
        } else {
            res.status(400).send({ error: 'Sort incorrecto.'})
        }
    
        const { docs: products, ...pageInfo } = await productManager.getProducts( page, limit, query, sort)
      
        if(query){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}` : ''
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}` : ''
        } else if (query && sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
        } else {
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.prevPage}&limit=${pageInfo.limit}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.nextPage}&limit=${pageInfo.limit}` : ''
        }
    
        if(sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&sort=${sort}` : ''
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&sort=${sort}` : ''
        } else if (query && sort){
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.prevPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
    
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.nextPage}&limit=${pageInfo.limit}&query=${query}&sort=${sort}` : ''
        } else{
            
            pageInfo.prevLink = pageInfo.hasPrevPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.prevPage}&limit=${pageInfo.limit}` : ''
        
            pageInfo.nextLink = pageInfo.hasNextPage ? `https://proyectocoderhouse.up.railway.app/realtimeproducts?page=${pageInfo.nextPage}&limit=${pageInfo.limit}` : ''
        }
    
        const cart = await cartManager.getCartById(req.user.cart._id)
    
        res.render('realtimeproducts', {
            title: 'Products in Real Time',
            user: req.user ? {
                ...req.user,
                isAdmin: req.user.role == 'admin',
                isPublic: req.user.role == 'Customer',
                isPremium: req.user.role == 'Premium'
            } : null,
            idCart: cart._id,
            products,
            pageInfo,
            style: 'realtimeproducts'
        })
    }

    async getCartHome(req, res) {

        const { cid } = req.params
        
        let cart = await cartManager.getCartById({ _id: cid })
    
        cart = await cart.populate({ path: 'products.product', select: [ 'title', 'price', 'category' ] })
    
        const { products } = cart
    
        products.map(prod => {
            prod.product.price = prod.quantity * prod.product.price
        })
        
        const totalCarrito = products.reduce((ac, pr) => ac = ac+pr.product.price, 0)

        const cartId = await cartManager.getCartById(req.user.cart._id)
    
        res.render('carts', {   
            title: 'Carrito De Compras',
            user:  req.user ? {
                ...req.user,
                isAdmin: req.user.role == 'admin',
                isPublic: req.user.role == 'Customer',
                isPremium: req.user.role == 'Premium'
            } : null,
            products,
            falseCart: !cartId.products.length,
            cartLength: cartId.products.length,
            idCart: cartId._id,
            totalCarrito,
            style: 'carts'
        })
    }

    async getOrderHome(req, res) {

        const { cid } = req.params

        let cart = await cartManager.getCartById(cid)

        if(!cart) {
            return
        }

        const { products: productsInCart } = cart
        const products = [] 
        const productsDelete = []

        for (const { product: id, quantity } of productsInCart) {
            
            const p = await productManager.getProductById(id)

            if(!p.stock){

                const cartId = await cartManager.getCartById(req.user.cart._id)
                res.render('errorCarrito', {
                    title: '¡No hay mas stock de estos productos',
                    user: req.user ? {
                        ...req.user,
                        isAdmin: req.user.role == 'admin',
                        isPublic: req.user.role == 'Customer',
                        isPremium: req.user.role == 'Premium'
                    } : null,
                    idCart: cartId._id,
                    style: 'order'
                })

                await cartManager.deleteProductsCart(cid)
                return
            }

            const toBuy = p.stock >= quantity ? quantity : p.stock

            products.push({
                id: p._id,
                price: p.price,
                quantity: toBuy
            })
            
            if(quantity > p.stock){
                productsDelete.push({
                    id: p._id,
                    unPurchasedQuantity: quantity - p.stock
                })
            } 
            
            if(p.stock > quantity){
                await cartManager.deleteProductsCart(cid)
            }
            
            p.stock = p.stock - toBuy
            
            await p.save()          
        }

        for(const { id, unPurchasedQuantity } of productsDelete) {
            await cartManager.addProductCart(cid, id)
            await cartManager.updateProductCart(cid, {quantity: unPurchasedQuantity}, id)
        }

        cart = await cart.populate({ path: 'user', select: [ 'email', 'first_name', 'last_name' ] })

        const today = new Date()
        const hoy = today.toLocaleString()

        const order = {
            user: cart.user._id,
            code: Date.now(),
            total: products.reduce((total, { price, quantity }) => (price * quantity) + total, 0),
            products: products.map(({ id, quantity }) => {
                return {
                    product: id,
                    quantity
                }
            }),
            purchaser: cart.user.email,
            purchaseDate: hoy
        }

        purchaseManager.addOrder(order)

        const template = `
            <h2>¡Hola ${cart.user.first_name}!</h2>
            <h3>Tu compra fue realizada con exito. Aqui te dejamos el ticket de compra.</h3>
            <br>
            <div style="border: solid 1px black; width: 310px;">
                <h3 style="font-weight: bold; color: black; text-align: center;">Comprobante de Compra</h3>
                <ul style="list-style: none; color: black; font-weight: 500;">
                    <li>Nombre y Apellido: ${cart.user.first_name}, ${cart.user.last_name}</li>
                    <li>Codigo: ${order.code}</li>
                    <li>Catidad de Productos Comprados: ${order.products.length}</li>
                    <li>Total: $ ${order.total}</li>
                    <li>Fecha: ${order.purchaseDate}</li>
                </ul>
            </div>

            <h3>¡Muchas gracias, te esperamos pronto!</h3>
        `
        const subject = 'Compra realizada'

        mailSenderService.send(subject, order.purchaser, template)

        const cartId = await cartManager.getCartById(req.user.cart._id)

        res.render('order', {
            title: '¡Felicitaciones, Su compra se realizo con exito!',
            user: req.user ? {
                ...req.user,
                isAdmin: req.user.role == 'admin',
                isPublic: req.user.role == 'Customer',
                isPremium: req.user.role == 'Premium'
            } : null,
            idCart: cartId._id,
            style: 'order',
            order
        })
    }
}

module.exports = new HomeController()