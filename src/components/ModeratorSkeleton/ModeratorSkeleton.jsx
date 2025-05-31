import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import classes from './ModeratorSkeleton.module.css'

const ModeratorSkeleton = () => {
  return (
    <div className={classes.main_box}>
        <div className={classes.box_data}>
            <div className={classes.moder_nick}>
                <Skeleton variant="rectangular" animation="wave" height={60} width={1832} />
            </div>
        </div>
        <div className={classes.moder_info}>
            <div className={classes.moder_card}>
                <Skeleton variant="rectangular" animation="wave" height={626} width={300} />
            </div>
            <div className={classes.moder_info_full}>
            <Skeleton variant="rectangular" animation="wave" height={626} width={1510} />
            </div>
        </div>
    </div>
  )
}

// 1495x611

export default ModeratorSkeleton