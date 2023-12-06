const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requestor = supertest('http://localhost:8080')

describe('Integration - Tests', () => {

    describe('Product', () => {

        let adminSession

        beforeEach(async () => {
            const loginResponse = await requestor
                .post('/login')
                .send({
                    email: 'rmferreyra@gmail.com',
                    password: 'rodo1234'
                });

            adminSession = loginResponse.header['set-cookie'][0];
        });

        let idProduct

        it('Product - /POST', async () => {
            const product = {
                title: 'Vino',
                description: 'Caja de vinos',
                code: 'a525',
                price: 25000,
                stock: 20,
                category: 'Vinos',
                owner: 'admin'
            }

            const { statusCode, ok, _body: { payload } } = await requestor.post('/api/products').set('Cookie', adminSession).send(product)

            idProduct = payload._id
            expect(payload.status).to.be.true
            expect(statusCode).to.be.equal(201)

            console.log(`Este es el id del producto que luego se eliminara: ${idProduct}`)
        })

        it('Product - /GET', async () => {
            const { _body: { status, payload } } = await requestor.get('/api/products')

            expect(status).to.be.equal('success')
            expect(Array.isArray(payload)).to.be.true

        })

        it('Product - /DELETE', async () => {

            const response = await requestor.del(`/api/products/${idProduct}`).set('Cookie', adminSession)

            expect(response.statusCode).to.be.equal(200)

            const { _body: { payload } } = await requestor.get('/api/products')

            const productDeleted = payload.find(p => p._id == idProduct)

            expect(productDeleted).to.be.undefined

        })
    })

    describe('Cart', () => {

        let idCart

        it('Cart - /POST', async () => {

            const cart = {
                user: '6411e76c922311fc5fcbc50b',
                products: []
            }

            const { statusCode, ok, _body: { payload } } = await requestor.post('/api/carts').send(cart)

            idCart = payload._id
            expect(statusCode).to.be.equal(201)

            console.log(`Este es el id del carrito que luego se eliminara: ${idCart}`)
        })

        it('Cart - /GET', async () => {

            const { _body } = await requestor.get('/api/carts')

            expect(Array.isArray(_body)).to.be.true

        })

        it('Cart - /DELETE', async () => {

            const response = await requestor.del(`/api/carts/${idCart}/delete`)

            expect(response.statusCode).to.be.equal(202)

            const { _body }  = await requestor.get('/api/carts')

            const cartDeleted = _body.find(c => c._id == idCart)
            
            expect(cartDeleted).to.be.undefined

        })
    })

    describe('User', () => {
        let idUser
        const userFail = {
            first_name: 'Ernesto',
            last_name: 'Ferreyra',
            email: 'ernesto@gmail.com',
            age: 30,
            password: 'ernie1234',
        }
        const user = {
            first_name: 'Ernesto',
            last_name: 'Ferreyra',
            email: 'ernesto@gmail.com',
            role: 'Customer',
            age: 21,
            password: 'ernie1234',
        }

        it('User - /POST', async () => {

            const { statusCode, ok, _body: { payload } } = await requestor.post('/api/users').send(user)

            idUser = payload._id
            expect(statusCode).to.be.equal(201)

            console.log(`El usuario se creo con el id: ${idUser}`)
        })

        it('User - /POST - 400', async () => {

            const { statusCode } = await requestor.post('/api/users').send(userFail)

            expect(statusCode).to.be.equal(400)
        })

        it('User - /GET', async () => {

        const { _body } = await requestor.get('/api/users')

        expect(Array.isArray(_body)).to.be.true

        })

        it('User - /DELETE', async () => {

            const response = await requestor.del(`/api/users/${idUser}`)

            expect(response.statusCode).to.be.equal(202)

            const { _body }  = await requestor.get('/api/users')

            const userDeleted = _body.find(u => u._id == idUser)
            
            expect(userDeleted).to.be.undefined

        })
    })
})