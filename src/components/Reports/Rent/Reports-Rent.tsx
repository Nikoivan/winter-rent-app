import { cn } from '@bem-react/classname';
import { Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';
import moment from 'moment';
import { useAppSelector } from '../../../lib/redux/store.ts';
import { getReportsData } from '../../../lib/utils/reports.utils.ts';

const cnReports = cn('Reports');

const ReportsRent: FC = () => {
  const { rentItems } = useAppSelector(state => state.audit);

  const date = moment().format('DD-MM-YYYY');
  const {
    payedSumm,
    totalSumm,
    rentPieces: { snowboards, boots, tubings, jackets, pants, gloves, skis, glasses, helmets, quantity }
  } = getReportsData(rentItems);

  return (
      <div className={cnReports('Rent')}>
          <Card sx={{ mt: 2, backgroundColor: 'inherit', color: '#fff' }}>
              <CardContent>
                  <Typography sx={{ mt: 1 }}>
                      {`Отчет по прокату за ${date}`}
                  </Typography>
                  <Typography color='primary' sx={{ mt: 1 }}>
                      {`Сумма оплаченной выручки - ${payedSumm}`}
                  </Typography>
                  {payedSumm !== totalSumm && (
                  <Typography color='primary' sx={{ mt: 1 }}>
                      {`Сумма выручки - ${payedSumm}`}
                  </Typography>
          )}
                  {!!quantity && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат единиц - ${quantity}`}
                  </Typography>
          )}
                  {!!snowboards && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат сноубордов - ${snowboards}`}
                  </Typography>
          )}
                  {!!boots && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат ботинок - ${boots}`}
                  </Typography>
          )}

                  {!!tubings && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат плюшек - ${tubings}`}
                  </Typography>
          )}
                  {!!jackets && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат курток - ${jackets}`}
                  </Typography>
          )}
                  {!!pants && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат штанов - ${pants}`}
                  </Typography>
          )}
                  {!!gloves && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат перчаток - ${gloves}`}
                  </Typography>
          )}
                  {!!gloves && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат перчаток - ${gloves}`}
                  </Typography>
          )}
                  {!!helmets && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат шлемов - ${helmets}`}
                  </Typography>
          )}
                  {!!glasses && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат очков - ${glasses}`}
                  </Typography>
          )}
                  {!!skis && (
                  <Typography color='secondary' sx={{ mt: 1 }}>
                      {`Сдано в прокат лыж - ${skis}`}
                  </Typography>
          )}
              </CardContent>
          </Card>
      </div>
  );
};

export default ReportsRent;
