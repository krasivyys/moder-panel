import connection from "./connectDataBase.js"
import util from 'util'
import jwt from 'jsonwebtoken';
import fetch from "node-fetch";
import dayjs from "dayjs";
const { sign, verify } = jwt;
import 'dotenv/config'
const database = util.promisify(connection.query).bind(connection)
import flags from "./flags/index.js";

class ModerService {

    async getModeratorById(id, server) {
        const query = util.promisify(connection.query).bind(connection)
        const q = 'SELECT * FROM moderators WHERE user_id=? AND server=?'
        const moder = await query(q, [id, server])
        return moder
    }

    async getAllInfoModeratorById(id, token) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const info = 'SELECT * FROM moderators WHERE user_id=? AND server=?'
        const warns = 'SELECT * FROM reprimands WHERE moder=? AND server=?'
        const inactive = 'SELECT * FROM inactives WHERE moder=? AND server=?'
        const punish = 'SELECT * FROM punishlog WHERE moder_id=? AND server=?'
        const kpd = 'SELECT * FROM weeklyKpd WHERE user_id=? AND server=?'
        const query = util.promisify(connection.query).bind(connection)
        const MainInfo = await query(info, [id, serverId])
        const Warns = await query(warns, [id, serverId])
        const Inactive = await query(inactive, [id, serverId])
        const Punish = await query(punish, [id, serverId])
        const Kpd = await query(kpd, [id, serverId])
        return { MainInfo, Warns, Inactive, Punish, Kpd }
    }

    async weeklyKpd(id) {
        const weeklyQuery = 'SELECT * FROM weeksKpd WHERE user_id=?'
        const query = util.promisify(connection.query).bind(connection)
        const weeklyKpd = await query(weeklyQuery, [id])
        return weeklyKpd

    }

    async logs(token) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const LogsQuery = 'SELECT * FROM punishlog WHERE server=?'
        const query = util.promisify(connection.query).bind(connection)
        const Logs = await query(LogsQuery, [serverId])
        return Logs
    }

    async getAllModerators(token) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        if(!serverId) {
            return false
        }
        const q = 'SELECT * FROM moderators WHERE server=? ORDER BY num ASC'
        const query = util.promisify(connection.query).bind(connection)
        const ModersList = await query(q, [serverId])
        return ModersList
    }

    async addModerator(newInfo, admin, token) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const queryAdd = 'INSERT INTO moderators(nick, user_id, vk, vk_name, role, role_eng, prefix, age, city, date, date_up, last_upd, add_user, num, server) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        if(/https:\/\/vk\.com\/[a-zA-Z]+/gm.test(newInfo.vk)){
            var vk = newInfo.vk.match(/\w+/gm)[3]
        } else if (/https:\/\/vk\.com\/id\d+/gm.test(newInfo.vk)){
            var vk = newInfo.vk.match(/\d+/gm)
        } else if(/\d+/gm.test(newInfo.vk)){
            var vk = newInfo.vk
        }
        var url = `https://api.vk.com/method/users.get?PARAMS&access_token=${process.env.VK_TOKEN}&user_ids=${vk}&v=5.131`
        const vkInfo = await fetch(url)
        const Vk_Info = await vkInfo.json()
        const VkId = Vk_Info.response[0].id
        const VkName = `${Vk_Info.response[0].first_name} ${Vk_Info.response[0].last_name}`
        const query = util.promisify(connection.query).bind(connection)
        if(newInfo.age == 'kurator'){
            var role = 'Куратор'
            var num = 3
        } else if(newInfo.age == 'support'){
            var role = 'Support Team'
            var num = 4
        } else if(newInfo.age == 'stmoder') {
            var role = 'Старший Модератор'
            var num = 5
        } else if(newInfo.age == 'moder'){
            var role = 'Модератор'
            var num = 6
        }
        const checkDublicate = await this.getModeratorById(newInfo.discord)
        if(checkDublicate.length !== 0){
            return false
        }
        const strDate = await this.getDateNow()
        const addModer = await query(queryAdd, [newInfo.nick, newInfo.discord, VkId, VkName, role, newInfo.age, newInfo.prefix, newInfo.yearold, newInfo.city, strDate, strDate, strDate, admin, num, serverId])
        return true
    }

    async deleteModeratorById(delinfo, token, admin) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const moderator = delinfo.moderator
        const dateAdd = await this.getDateNow()
        const RemoveInfo = `Ник модератора который был снят: ${moderator.nick}\nВозраст: ${moderator.age}\nГород проживания: ${moderator.city}\nVK: ${moderator.vk}\nDiscord: ${moderator.user_id}\nЗа что был снят[Полное описание причины снятия]: ${delinfo.reason}\nПериод модерирования: С ${moderator.date} по ${delinfo.DateNow}`
        if(serverId == 18) {
            await fetch('https://discord.com/api/webhooks/1009853145553309716/lXjP7faqHmf1OQPAyFpi6i8rnR4_X65aKi8MYEflXu3JNxsNrh5H7OvsypBDncuJG9Mm', {method: "POST", headers: {'content-type' : 'application/json'}, body: JSON.stringify({"content": RemoveInfo})})
        } else if(serverId == 181) {
            await fetch('https://discord.com/api/webhooks/1105476603229769758/WqUFhjbSzFYIpqGdAXD2W9qghLZGpoYGl5IAGOPfCTGnt2QbAT5Qt2Gw_tEqE_zY91aP', {method: "POST", headers: {'content-type' : 'application/json'}, body: JSON.stringify({"content": RemoveInfo})})
        }
        var query = util.promisify(connection.query).bind(connection)
        const addReasonQuery = 'UPDATE moderators SET reason=?, ws=?, admin=?, dateAdd=? WHERE id=? AND server=?'
        const delQuery = 'DELETE FROM moderators WHERE id=? AND server=?'
        const addArchive = 'INSERT INTO archives SELECT * FROM moderators WHERE id=? AND server=?'
        await query(addReasonQuery, [delinfo.reason, 0, admin, dateAdd, moderator.id, serverId])
        await query(addArchive, [moderator.id, serverId])
        await query(delQuery, [moderator.id, serverId])
        return true
    }

    async editModeratorById(newInfo, token, type, flagsAdmin, numAdmin) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        var query = util.promisify(connection.query).bind(connection)
        const prevModeratorInfo = await query('SELECT * FROM moderators WHERE id=?', [newInfo.id])
        if(prevModeratorInfo[0].flags !== newInfo.flags) {
            if(!flags.Is(flagsAdmin, 30)) return false
        }
        // console.log(prevModeratorInfo[0]);
        // if(prevModeratorInfo[0].num > numAdmin) return false
        // console.log('here');
        // console.log(prevModeratorInfo[0].num, numAdmin);
        if(newInfo.role == '' && !type){
            if(/https:\/\/vk\.com\/[a-zA-Z]+/gm.test(newInfo.vk)){
                var vk = newInfo.vk.match(/\w+/gm)[3]
            } else if (/https:\/\/vk\.com\/id\d+/gm.test(newInfo.vk)){
                var vk = newInfo.vk.match(/\d+/gm)
            } else if(/\d+/gm.test(newInfo.vk)){
                var vk = newInfo.vk
            }
            var url = `https://api.vk.com/method/users.get?PARAMS&access_token=${process.env.VK_TOKEN}&user_ids=${vk}&v=5.131`
            const vkInfo = await fetch(url)
            const Vk_Info = await vkInfo.json()
            const VkId = Vk_Info.response[0].id
            const VkName = `${Vk_Info.response[0].first_name} ${Vk_Info.response[0].last_name}`
            const queryEdit = 'UPDATE moderators SET nick=?, user_id=?, vk=?, vk_name=?, prefix=?, age=?, city=?, flags=? WHERE id=? AND server=?'
            let editModer = await query(queryEdit, [newInfo.nick, newInfo.discord, VkId, VkName, newInfo.prefix, newInfo.age, newInfo.city, newInfo.flags, newInfo.id, serverId])
            return true
        } else {
            if(/https:\/\/vk\.com\/[a-zA-Z]+/gm.test(newInfo.vk)){
                var vk = newInfo.vk.match(/\w+/gm)[3]
            } else if (/https:\/\/vk\.com\/id\d+/gm.test(newInfo.vk)){
                var vk = newInfo.vk.match(/\d+/gm)
            } else if(/\d+/gm.test(newInfo.vk)){
                var vk = newInfo.vk
            }
            var url = `https://api.vk.com/method/users.get?PARAMS&access_token=${process.env.VK_TOKEN}&user_ids=${vk}&v=5.131`
            const vkInfo = await fetch(url)
            const Vk_Info = await vkInfo.json()
            const VkId = Vk_Info.response[0].id
            const VkName = `${Vk_Info.response[0].first_name} ${Vk_Info.response[0].last_name}`
            if(newInfo.role == 'gm'){
                var role = 'Главный Модератор'
                var num = 1
            }
            if(newInfo.role == 'zgm'){
                var role = 'Зам. Главного Модератора'
                num = '2'
            }
            if(newInfo.role == 'kurator'){
                var role = 'Куратор'
                var num = 3
            } else if(newInfo.role == 'support'){
                var role = 'Support Team'
                var num = 4
            } else if(newInfo.role == 'commerce'){
                var role = 'Следящий за коммерцией'
                var num = 4
            } else if(newInfo.role == 'stmoder') {
                var role = 'Старший Модератор'
                var num = 5
            } else if(newInfo.role == 'mp'){
                var role = 'Следящий за мероприятиями'
                var num = 5
            }else if(newInfo.role == 'moder'){
                var role = 'Модератор'
                var num = 6
            }
            const queryEdit = 'UPDATE moderators SET nick=?, user_id=?, vk=?, vk_name=?, role=?, role_eng=?, prefix=?, age=?, city=?, num=?, flags=? WHERE id=? AND server=?'
            let editModer = await query(queryEdit, [newInfo.nick, newInfo.discord, VkId, VkName, role, newInfo.role, newInfo.prefix, newInfo.age, newInfo.city, num, newInfo.flags, newInfo.id, serverId])
            return true
        }
    }

    async DelWarnModeratorById(RepId, reason, moderId, admin, token) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const queryDelWarn = 'UPDATE reprimands SET date2=?, reason2=?, admindel=?,status="Погашен" WHERE id=?'
        const query = util.promisify(connection.query).bind(connection)
        const date = await this.getDateNow()
        const delWarn = await query(queryDelWarn, [date, reason, admin, RepId])
        const delWarnMainTable = await query('UPDATE moderators SET ws=ws-1 WHERE user_id=? AND server=?', [moderId, serverId])
        return true
    }

    async WarnModeratorById(id, reason, admin, token) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const date = await this.getDateNow()
        const query = util.promisify(connection.query).bind(connection)
        const giveWarn = await query('INSERT INTO reprimands(admin, date, moder, reason, server) VALUES(?, ?, ?, ?, ?)', [admin, date, id, reason, serverId])
        const giveWarnMainTable = await query('UPDATE moderators SET ws=ws+1 WHERE user_id=? AND server=?', [id, serverId])
        return true
    }

    async authorization(moderData, avatar, server) {
        const accessToken = sign({id: moderData.user_id, serverId: server}, process.env.SECRET_KEY, {expiresIn: '1440m'})
        const check = util.promisify(connection.query).bind(connection)
        await check('UPDATE moderators SET avatarUrl=? WHERE user_id=? AND server=?', [avatar, moderData.user_id, server])
        return accessToken
    }

    async checkToken(token) {
        var { id, serverId } = verify(token, process.env.SECRET_KEY)
        if(!id || !serverId) {
            return false
        }
        var check = await this.getModeratorById(id, serverId)
        if(check.length == 0){
            return false
        } else {
            return true
        }
    }

    async me (token){
        var { id, serverId } = verify(token, process.env.SECRET_KEY)
        if(!id || !serverId) {
            return false
        }
        var info = await this.getModeratorById(id, serverId)
        if(info.length == 0){
            return false
        } else {
            return info
        }
    }

    async getDateNow() {
        const date = dayjs().format("YYYY-MM-DD HH:mm:ss")
        return date
    }

    async archive(token){
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const check = util.promisify(connection.query).bind(connection)
        const archiveQuery = 'SELECT * FROM archives WHERE server=?'
        const archive = await check(archiveQuery, [serverId])
        return archive
    }

    async inactive(user_id, reasonForm , InactiveStart, InactiveEnd, admin, token) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const check = util.promisify(connection.query).bind(connection)
        const inactive = await check('UPDATE moderators SET neakt=? WHERE user_id=? AND server=?', [InactiveEnd, user_id, serverId])
        const writeInactive = await check('INSERT INTO inactives(admin, moder, date1, date2, reason, server) VALUES (?,?,?,?,?, ?)', [admin, user_id, InactiveStart, InactiveEnd, reasonForm, serverId])
        return true
    }

    async kpd(token) {
        var { serverId } = verify(token, process.env.SECRET_KEY)
        const kpdQuery = 'SELECT * FROM kpd WHERE server=?'
        const check = util.promisify(connection.query).bind(connection)
        const KPD = await check(kpdQuery, [serverId])
        return KPD
    }

    async allServers() {
        const serversTemp = await database('SELECT server_id, server_category, server_name, server_index FROM servers')
        const serverGroup = await database('SELECT DISTINCT server_category FROM servers')
        return {servers: serversTemp, groups: serverGroup}
    }

    async updateIllegalKpd(array) {
        if(!array.length) return false
        const del = await database('DELETE FROM kpd WHERE server = ?', [181])
        for(let i in array) {
            const addKpd = await database('INSERT INTO kpd(name, user_id, coin, mute, un_mute, prison, un_prison, un_frac, message, server ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [array[i].nick, array[i].id, 0, array[i].mute, 0, array[i].prison, 0, 0, array[i].message, 181])
            const updateModer = await database('UPDATE moderators SET last_upd = ? WHERE user_id = ? AND server = ?', [await this.getDateNow(), array[i].id, 181])
        }
        return true
    }

    async getIllegalsModerator() {
        const query = util.promisify(connection.query).bind(connection)
        const ModersList = await query('SELECT * FROM moderators WHERE server = ?', [181])
        return ModersList
    }

    async updateIllegalLogs(array) {
        if(!array.length) return false
        const del = await database('DELETE FROM punishlog WHERE server=?', [181])
        for(let i in array) {
            const addLogs = await database(`INSERT INTO punishlog(moder_id, moder_name, punishType, user_id, timePunish, timeget, reason, server) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, 
            [array[i].moder_id, array[i].moder_name, array[i].punishType.toUpperCase(), array[i].user_id, array[i].timePunish, array[i].timeget, array[i].reason, 181])
        }
        return true
    }

    async getOneModeratorIllegals(id) {
        const moderator = await database('SELECT * FROM moderators WHERE user_id = ?', [id])
        if(!moderator.length) return false
        return moderator[0]
    }
}

export default new ModerService()