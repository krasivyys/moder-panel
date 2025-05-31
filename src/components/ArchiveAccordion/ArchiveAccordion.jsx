import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ArchiveAccordion = ({archiveList = []}) => {
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)

    };


  return (
    <>
        {archiveList.length <= 0
        ? <Typography variant='h6' component={'span'} sx={{color: 'white'}}>Архивов нет!</Typography>
        : archiveList.map(archive => (
            <Accordion key={archive.id} expanded={expanded === `panel${archive.id}`} onChange={handleChange(`panel${archive.id}`)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelbh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {archive.nick}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{archive.dateAdd.split('T')[0]} {`(${archive.reason})`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <span>{`Ник модератора который был снят: ${archive.nick}`}</span>
                <br />
                <span>{`Возраст: ${archive.age}`}</span>
                <br />
                <span>{`Город проживания: ${archive.city}`}</span>
                <br />
                <span>{`VK: ${archive.vk}`}</span>
                <br />
                <span>{`Discord: ${archive.user_id}`}</span>
                <br />
                <span>{`За что был снят[Полное описание причины снятия]: ${archive.reason}`}</span>
                <br />
                <span>{`Период модерирования: С ${archive.date} по ${archive.dateAdd.split('T')[0]}`}</span>
                <br />
                <span>{`Снял: ${archive.admin}`}</span>
                </AccordionDetails>
            </Accordion>
        ))}
    </>
  )
}

export default ArchiveAccordion