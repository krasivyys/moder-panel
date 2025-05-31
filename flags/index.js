// eslint-disable-next-line
export default {
    ModerWatchKpdAndLogsAndArchive: 1 << 1, // 2
    ModerAddOrDelWarnsAndVacation: 1 << 2, // 4
    ModerEditModerator: 1 << 3, // 8
    UserFlagSetFlags: 1 << 4, // 16
    ModerAddOrDelModer: 3 << 2, // 12

    Is: function(o, p) {
        return (o & p) === p
    }
}