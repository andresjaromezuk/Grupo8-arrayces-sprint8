const {User, Role} = require('../../database/models')

const userApiController = { 

	list: async  (req, res) => {

        const include = ['Role']
        let meta={status:'success', length:0 }

        try {
            let users = await User.findAndCountAll({include})
            meta.length = users.count
            
            let data = []
            
            users.rows.forEach(user =>{
                 data.push({
                    user,
                    url: `${process.env.HOST}/api/users/${user.id}`
                })
            })

            res.status(200).json({meta, data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
		 
    },
    detail: async  (req, res) => {

        let id = req.params.id

        try {
            let user = await User.findByPk(id)
            s
            delete user.password
            delete user.confirmPassword
            delete user.token

            data = {
                user,
                avatarUrl:`${process.env.HOST}/images/users/${user.avatar}`
            }
            res.status(200).json({data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
		 
    }
}

module.exports = userApiController