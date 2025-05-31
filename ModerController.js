import ModerService from "./ModerService.js"
import fetch from 'node-fetch'
import 'dotenv/config'
import flags from "./flags/index.js"

class ModerController {

    async getModeratorById(req, res) {
        try {
            const { id } = req.params
            if(!id){
                return res.json({message: "ID модератора не указан!"})
            }
            const moder = await ModerService.getModeratorById(id)
            if(moder.length == 0){
                res.json({info: "Пользователь с таким ID не найден"})
            } else {
                res.json({info: moder[0]})
            }
        } catch (e) {
            res.json(e.message)
        }
    }

    async getAllInfoModeratorById(req, res) {
        try {
            const { id } = req.params
            const { type } = req.query
            if(!id){
                return res.json({message: "ID модератора не указан!"})
            }
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            if(type && type === 'weekly') {
                const weeklyKpd = await ModerService.weeklyKpd(id)
                return res.json({info: weeklyKpd})
            }
            const { MainInfo, Warns, Inactive, Punish, Kpd } = await ModerService.getAllInfoModeratorById(id, token)
            res.json({MainInfo: MainInfo, 
                Warns: Warns, 
                Inactive: Inactive,
                Punish: Punish,
                Kpd: Kpd})
        } catch (e) {
            console.log(e)
            res.json(e.message)
        }
    }

    async getAllModerators(req, res) {
        try {
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const modersList = await ModerService.getAllModerators(token)
            res.json({info: modersList})
        } catch (e) {
            res.json(e.message)
        }
    }

    async addModerator(req, res) {
        try {
            const newModer = req.body
            if(!newModer) {
                res.json({message: 'Заполнена не вся информация'})
            }
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 12)){
                return res.json({message: 'Отсутствует доступ'})
            }
            // if(checkRole[0].num >= 3){
            //     return res.json({message: 'Отсутствует доступ'})
            // }
            const addInfo = await ModerService.addModerator(newModer, checkRole[0].nick, token)
            if(!addInfo){
                return res.json({message: 'Модератор уже есть в базе данных'})
            }
            res.json({message: 'Модератор был успешно добавлен в базу данных'})
        } catch (e) {
            res.json(e.message)
        }
    }

    async deleteModeratorById(req, res) {
        try {
            const removeInfo = req.body
            if(!removeInfo) {
                return res.json({message: 'Не были переданы данные'})
            }
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 12)){
                return res.json({message: 'Отсутствует доступ'})
            }
            // if(checkRole[0].num >= 3){
            //     return res.json({message: 'Отсутствует доступ'})
            // }
            const delModer = await ModerService.deleteModeratorById(removeInfo, token, checkRole[0].nick)
            res.json({message: 'Модератор был снят'})
        } catch (e) {
            console.log(e)
            res.json(e.message)
        }
    }

    async editModeratorById(req, res) {
        try {
            const { info } = req.body
            if(!info) {
                return res.json({message: 'Не была передана информация'})
            }
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const { type } = req.query
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 8)){
                return res.json({message: 'Отсутствует доступ'})
            }
            const editModer = await ModerService.editModeratorById(info, token, type, checkRole[0].flags, checkRole[0].num)
            res.json({message: 'Информация была успешно изменена'})
        } catch (e) {
            res.json({message: e.message})
        }
    }

    async InactiveModeratorById(req, res) {
        try {
            const { id, reasonForm ,InactiveStart, InactiveEnd } = req.body
            if(!id || !reasonForm || !InactiveStart || !InactiveEnd){
                return res.json({message: 'Невалидные данные'})
            }
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 4)){
                return res.json({message: 'Отсутствует доступ'})
            }
            // if(checkRole[0].num >= 4){
            //     return res.json({message: 'Отсутствует доступ'})
            // }
            const inactive = await ModerService.inactive(id, reasonForm ,InactiveStart, InactiveEnd, checkRole[0].nick, token)
            res.json({message: 'Неактив выдан'})
        } catch (e) {
            res.json(e.message)
        }
    }

    async WarnModeratorById(req, res) {
        try {
            const { id, reasonForm } = req.body
            if(!id || !reasonForm) {
                return res.json({message: 'Невалидные данные'})
            }
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 4)){
                return res.json({message: 'Отсутствует доступ'})
            }
            // if(checkRole[0].num >= 4){
            //     return res.json({message: 'Отсутствует доступ'})
            // }
            const giveWarn = await ModerService.WarnModeratorById(id, reasonForm, checkRole[0].nick, token)
            if(!giveWarn){
                return res.json({message: 'Ошибка выдачи выговора'})
            }
            res.json({message: 'Выговор был успешно выдан'})
        } catch (e) {
            console.log(e)
            res.json(e.message)
        }
    }

    async DelWarnModeratorById(req, res) {
        try {
            const { id, reasonForm, moderId } = req.body
            if(!id || !reasonForm || !moderId) {
                return res.json({message: 'Невалидные данные'})
            }
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 4)){
                return res.json({message: 'Отсутствует доступ'})
            }
            if(checkRole[0].num >= 4){
                return res.json({message: 'Отсутствует доступ'})
            }
            const delWarn = await ModerService.DelWarnModeratorById(id, reasonForm, moderId, checkRole[0].nick, token)
            if(!delWarn){
                return res.json({message: 'Ошибка снятия выговора'})
            }
            res.json({message: 'Выговор был успешно снят'})
        } catch (e) {
            res.json(e.message)
        }
    }

    async authorization(req, res) {
        try {
            const { code } = req.query
            if(!code){
                res.json({message: "Code invalid"})
                return
            }
            const { server } = req.body
            if(!server){
                return res.json({message: 'Не переданы данные'})
            }
            const redirect_uri = 'http://moderators.etherealbot.pro/auth'
            // const redirect_uri = 'http://localhost:3000/auth'
            var url = 'https://discordapp.com/api/oauth2/token'
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            const params = new URLSearchParams();
                params.append('client_id', process.env.REACT_APP_CLIENT_ID);
                params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
                params.append('grant_type', 'authorization_code');
                params.append('code', code);
                params.append('redirect_uri', redirect_uri);
                params.append('scope', 'identify');
            var response = await fetch(url, {method: 'POST', body: params, headers: headers});
            var data = await response.json();
            const token = data['access_token'];

            var url = 'https://discord.com/api/users/@me'
            var headers = {
                "Authorization": "Bearer " + token
            }
            var response = await fetch(url, {method: 'GET', headers: headers})
            var data = await response.json();
            const info = {
                id: data['id'],
                username: data['username'],
                avatar: data['avatar']
            }
            const userData = await ModerService.getModeratorById(info.id, server)
            if (userData.length === 0){
                res.json({message: 'Пользователь с таким ID не найден'})
                return
            }
            const avatar = info.avatar ? info.avatar : 'Нет'
            const authToken = await ModerService.authorization(userData[0], avatar, server)
            res.cookie('token', authToken, {maxAge: 1*24*60*60*1000, httpOnly: true})
            res.json({message: 'Успешная авторизация'})
        } catch (e) {
            res.json(e.message)
            console.log(e.message)
        }
    }

    async me(req, res) {
        try {
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const { server } = req.body
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const infoModer = await ModerService.me(token)
            if(!infoModer){
                res.json({message: "Пользователь с таким ID не найден"})
            }
            res.json({info: infoModer[0]})
        } catch (e) {
            res.json({message: e.message})
        }
    }

    async logs(req, res) {
        try {
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 2)){
                return res.json({message: 'Отсутствует доступ'})
            }
            // if(checkRole[0].num >= 3){
            //     return res.json({message: 'Отсутствует доступ'})
            // }
            const Logs = await ModerService.logs(token)
            res.json({info: Logs})
        } catch (e) {
            res.json({message: e.message})
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('token')
            res.json({message: 'Успешный выход'})
        } catch (e) {
            res.json({message: 'Ошибка'})
        }
    }

    async archive(req, res) {
        try {
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 2)){
                return res.json({message: 'Отсутствует доступ'})
            }
            // if(checkRole[0].num >= 3){
            //     return res.json({message: 'Отсутствует доступ'})
            // }
            const archive = await ModerService.archive(token)
            res.json({info: archive})
        } catch (e) {
            console.log(e)
            res.json({message: e.message})
        }
    }

    async kpd(req, res){
        try {
            const access = req.headers.cookie
            if(!access){
                return res.json({message: 'User not Authorized'})
            }
            const token = access.split('token=')[1]
            const checkAccess = await ModerService.checkToken(token)
            if (!checkAccess) {
                return res.json({message: 'Token invalid'})
            }
            const checkRole = await ModerService.me(token)
            if(!flags.Is(checkRole[0].flags, 2)){
                return res.json({message: 'Отсутствует доступ'})
            }
            // if(checkRole[0].num >= 3){
            //     return res.json({message: 'Отсутствует доступ'})
            // }
            const KPD = await ModerService.kpd(token)
            res.json({info: KPD})
        } catch (e) {
            res.json({message: e.message})
        }
    }

    async updateKpd(req, res) {
        try {
            const {kpd} = req.body
            if(!kpd) {
                return res.json({error: 'Invalid body'})
            }
            const {token} = req.headers
            if(!token) {
                return res.json({error: 'Token is undefined'})
            }
            if(token !== process.env.UPDATE_KPD_ILLEGALS) {
                return res.json({error: 'Invalid token'})
            }
            const update = await ModerService.updateIllegalKpd(kpd)
            if(!update) {
                return res.json({error: 'Invalid error'})
            }
            res.json({message: 'КПД было обновлено'})
        } catch (e) {
            res.json({error: e.message})
        }
    }

    async getAllIllegalModerators(req, res) {
        try {
            const {token} = req.headers
            if(!token) {
                return res.json({error: 'Token is undefined'})
            }
            if(token !== process.env.UPDATE_KPD_ILLEGALS) {
                return res.json({error: 'Invalid token'})
            }
            const moderators = await ModerService.getIllegalsModerator()
            res.json({moderators})
        } catch (e) {
            res.json({error: e.message})
        }
    }

    async updateLogs(req, res) {
        try {
            const {logs} = req.body
            if(!logs) {
                return res.json({error: 'Invalid body'})
            }
            const {token} = req.headers
            if(!token) {
                return res.json({error: 'Token is undefined'})
            }
            if(token !== process.env.UPDATE_KPD_ILLEGALS) {
                return res.json({error: 'Invalid token'})
            }
            const update = await ModerService.updateIllegalLogs(logs)
            if(!update) {
                return res.json({error: 'Invalid error'})
            }
            res.json({message: 'Логи были обновлены'})
        } catch (e) {
            res.json({error: e.message})
        }
    }

    async getIllegalModerator(req, res) {
        try {
            const { id } = req.params
            if(!id) {
                return res.json({error: 'Invalid id moderator'})
            }
            const { token } = req.headers
            if(!token) {
                return res.json({error: 'Token is undefined'})
            }
            if(token !== process.env.UPDATE_KPD_ILLEGALS) {
                return res.json({error: 'Invalid token'})
            }
            const moderator = await ModerService.getOneModeratorIllegals(id)
            if(!moderator) {
                return res.json({error: 'Information not found'})
            }
            return res.json({moderator})
        } catch (e) {
            res.json({error: e.message})
        }
    }

    async servers(req, res) {
        try {
            const serverList = await ModerService.allServers()
            res.json({list: serverList})
        } catch (e) {
            res.json({message: e.message})
        } 
    }
}

export default new ModerController