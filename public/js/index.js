const socket = io()

const listProducts = document.getElementById('list-products')
const listProductsCart = document.getElementById("productsInCart")

function addToCart (cartId) {
    socket.emit('productCart', cartId)
}

function deleteProductAdmin (productId) {

    socket.emit('deleteProduct', productId)

    const p = productId.toString()
    const div = document.getElementById(p)
    
    listProducts.removeChild(div)

}

function deleteProductCart (productId) {
    
    socket.emit('deleteProductCart', productId)

    setTimeout(() => {
        location.reload(true)
    }, 500)

}