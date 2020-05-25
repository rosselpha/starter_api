(async()  =>  {

    const router = require('express').Router()

    const Loto = require('../models/contest')
    const Pool = require('../models/pool')

    // creating a contest         
    //likes_count: req.body.like,

    /**
     * the goal is to get the contest and join a current contest pool
     * once the pool is joined  the user must fill out a form 
     *  
     */
    

    router.post('/contest', async (req, res, next) => {

        const loto  = await  new Loto({
            chalenge_post_link: req.body.chalenge_post_link,
            posted_at: new Date(),
            // userName: req.user
        })
        await loto.save()
        res.send(loto)
    })

    // the contest will display here with a join button for users to join 
    router.get('/contest', async (req, res) => {

        let loto = await Loto.find()

        res.json({'loto':loto})
    })

    router.get('/contest/:_id', async(req, res, next) =>{

        const loto = await Loto.findById(req.params._id)

        // Loto.updateOne(req.params._id)

        res.json({"id":req.params._id})
    })

    router.post('/pool', async(req, res, next) =>{

        const pool =  new Pool({
            participant_post_link: req.body.participant_post_link,
            likes_count: req.body.likes_count || 0
        })
        
        await pool.save().then( pool => {
            res.send(pool)
        }).catch(err => {
            res.send(err)
        })
    })

    router.post('/pool/:_id', (req, res) => {
        let id = req.params._id
        let like = req.body.likes_count

        Pool.findByIdAndUpdate(id).then(pool => {
            if(!pool) {
                const error =  new Error('could not find pool')
                error.statusCode = 404
                throw error
            }
            pool.likes_count += like
            pool.save()
            res.send('save')

        }).catch( err => {
            res.send(err)
        })
        
        
    })


    module.exports = router

})()
