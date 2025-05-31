import Router from "express"
import ModerController from "./ModerController.js"

const router = new Router()


router.get('/moderator/:id', ModerController.getModeratorById)

router.get('/getallinfo/:id', ModerController.getAllInfoModeratorById)

router.get('/moderators', ModerController.getAllModerators)

router.get('/me', ModerController.me)

router.get('/kpd', ModerController.kpd)

router.get('/logs', ModerController.logs)

router.get('/archive', ModerController.archive)

router.get('/servers', ModerController.servers)

router.get('/illegals/moderators', ModerController.getAllIllegalModerators)

router.get('/illegals/moderator/:id', ModerController.getIllegalModerator)

router.post('/authorization', ModerController.authorization)

router.post('/logout', ModerController.logout)

router.post('/moderator/inactive', ModerController.InactiveModeratorById)

router.post('/add-moderator', ModerController.addModerator)

router.post('/moderator/warn', ModerController.WarnModeratorById)

router.post('/illegals/kpd/update', ModerController.updateKpd)

router.post('/illegals/logs/update', ModerController.updateLogs)

router.delete('/moderator', ModerController.deleteModeratorById)

router.delete('/moderator/warn', ModerController.DelWarnModeratorById)

router.put('/moderator', ModerController.editModeratorById)


export default router