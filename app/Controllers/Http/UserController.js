'use strict'

const User = use('App/Models/User')

class UserController {
    async index({request, response}) {
        try {
            const users = await User.all()
            response.status(200).send(users)
        } catch (error) {
            response.status(500).send(error)
        }
    }

    async show({params, request, response}) {
        try {
            const user = await User.findOrFail(params.id)
            await user.load('posts')
            response.status(200).send(user)
        } catch (error) {
            response.status(500).send(error)
        }
    }
    
    async store({request, response}) {
        try {
            const data = request.all()
            const user = await User.create(data)
            response.status(200).send(user)
        } catch (error) {
            response.status(500).send(error)
        }
    }

    async update({params, request, response}) {
        try {
            const data = request.all()
            const user = await User.findOrFail(params.id)
            user.merge(data)
            await user.save()
            response.status(200).send(user)
        } catch (error) {
            response.status(500).send(error)
        }
    }

    async destroy({params, request, response}) {
        try {
            const user = await User.findOrFail(params.id)
            await user.delete()
            response.status(200).send({mensagem: "Usuário deletado com sucesso!"})
        } catch (error) {
            response.status(500).send(error)
        }
    }

    async getToken({request, response, auth}) {
        try {
            const {email, password} = request.all()
            const autenticate = await auth.attempt(email, password)
            response.status(200).send(autenticate)
        } catch (error) {
            response.status(500).send(error)
        }
    }
}

module.exports = UserController
