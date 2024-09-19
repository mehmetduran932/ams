const roles = require('../common/enums/roles');

const getRoles = async (req, res) => {
    try{
        res.status(200).json(roles.RolesEnum);
    }catch(err){
        errorHandle.errorHandle(res, "", 404, "Roller bulunamadı : ");
    }
}

module.exports = {
    getRoles
}