import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonActive from 'components/component-custom/ButtonActive';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

OrderDetail.propTypes = {
  data: PropTypes.object,
};

const useSytle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    overflow: 'hidden',
  },

  titleDate: {
    color: '#999',
  },

  listProduct: {
    listStyle: 'none',
    padding: theme.spacing(2, 0),
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    margin: theme.spacing(1, 0),
  },

  product: {
    padding: theme.spacing(0.5, 0),
  },

  imgProduct: {
    borderRadius: '10px',
    border: '1px solid #ccc',
  },

  nameProduct: {
    fontSize: '16px',
  },

  colorProduct: {
    color: '#999',
  },

  quantityProduct: {
    color: '#999',
    marginLeft: theme.spacing(1),
  },

  priceProduct: {
    fontSize: '18px',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '16px',
    },
  },

  totalPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
  },

  boxContent: {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
}));

function OrderDetail({ data = {} }) {
  const classes = useSytle();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const handleOrderDetail = () => {
    history.push(`/checkout/${data.id}`);
  };
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box>
          <Typography component="p" variant="h6">
            Order number: {data.id}
          </Typography>
          <Box mt={0.5}>
            <Typography variant="body2" component="span" className={classes.titleDate}>
              Order date:{' '}
            </Typography>
            <Typography variant="body2" component="span" className={classes.date}>
              {moment(data.createDate).format('LLLL')}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box flex={1}>
          <Box component="ul" className={classes.listProduct}>
            {data.orderItemResponseList.map((x) => (
              <li key={x.id} className={classes.product}>
                <Box display="flex">
                  <img src={x.image} alt="" width="80px" className={classes.imgProduct} />
                  <Box className={classes.boxContent}>
                    <Box className={classes.boxInfo}>
                      <Typography variant="body2" component="p" className={classes.nameProduct}>
                        {x.nameProduct}
                      </Typography>
                      <Typography variant="body2" component="span" className={classes.colorProduct}>
                        {x.color}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        className={classes.quantityProduct}
                      >
                        {x.size}
                      </Typography>
                    </Box>

                    <Box className={classes.boxPrice}>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        className={classes.priceProduct}
                      >
                        ${x.salePrice}
                      </Typography>
                      <Typography variant="body2" component="p">
                        x{x.quantity}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </li>
            ))}
          </Box>

          <Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Subtotal:</Typography>
              <Typography variant="body2">${data.subtotal}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Discount:</Typography>
              <Typography variant="body2">
                {' '}
                {data.feeVoucher === 0 ? '-' : '- $' + data.feeVoucher}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="p" className={classes.totalPrice}>
                Total:
              </Typography>
              <Typography variant="p" className={classes.totalPrice}>
                ${data.total}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.btn}>
            <ButtonActive
              content="View detail"
              widthBtn={matches ? '100%' : '200px'}
              onClick={handleOrderDetail}
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderDetail;
