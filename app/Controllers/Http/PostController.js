'use strict'

const Post = use('App/Models/Post')

class PostController {
    async index({request, response}){
        try {
            const posts = await Post.all()
            response.status(200).send(posts)
        } catch (error) {
            response.status(500).send(error)
        }
    }
    async show({params, request, response}){
        try {
            const post = await Post.findOrFail(params.id)
            await post.load('user')
            response.status(200).send(post)
        } catch (error) {
            response.status(500).send(error)
        }
    }
    async store({request, response}){
        try {
            const data = request.all()
            const post = await Post.create(data)
            response.status(200).send(post)
        } catch (error) {
            response.status(500).send(error)
        }
    }
    async update({params, request, response}){
        try {
            const data = request.all()
            const post = findOrFail(params.id)
            post.merge(data)
            await post.save()
            response.status(200).send(post)
        } catch (error) {
            response.status(500).send(error)
        }
    }
    async destroy({params, request, response}){
        try {
            const post = findOrFail(params.id)
            await post.delete()
            response.status(200).send({mensagem: "Postagem deletada com sucesso!"})
        } catch (error) {
            response.status(500).send(error)
        }
    }
}

module.exports = PostController
