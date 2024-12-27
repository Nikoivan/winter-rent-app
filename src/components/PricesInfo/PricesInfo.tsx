import { FC } from 'react';
import { cn } from '@bem-react/classname';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as sys from '../../assets/systemInfo.json';
import './PricesInfo.scss';

const prices = sys.prices;

const cnPricesInfo = cn('PricesInfo');

const PricesInfo: FC = () => (
    <div className={cnPricesInfo()}>
        {prices.map(({ title, price, description }) => (
            <Accordion className={cnPricesInfo('Accordion')} sx={{ backgroundColor: 'inherit' }} key={title}>
                <AccordionSummary expandIcon={<ExpandMoreIcon className={cnPricesInfo('AccordionIcon')} />}>
                    <Typography className={cnPricesInfo('Title')}>
                        {`${title} - ${price} ₽`}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography color='info'>
                        {description}
                    </Typography>
                </AccordionDetails>
            </Accordion>
    ))}
    </div>
);

export default PricesInfo;
