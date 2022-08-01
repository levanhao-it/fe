import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import ButtonActive from 'components/component-custom/ButtonActive';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

ProductReviewForm.propTypes = {};

const useStyle = makeStyles((theme) => ({
  titleHeading: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px',
    },
  },

  titleSub: {
    fontSize: '14px',
    color: '#8d8d8d',
    marginTop: '4px',
    textAlign: 'center',
  },

  content: {
    marginTop: '30px',
  },

  titleContent: {
    fontSize: '14px',
  },

  containerContent: {
    marginTop: '20px',
    borderTop: '1px solid #ccc',
    paddingTop: '20px',
  },
  titleCheckbox: {
    fontSize: '14px',
    color: '#000',
    marginBottom: '10px',
  },
}));

const schema = yup.object().shape({
  content: yup.string().required('Please enter content'),
});

function ProductReviewForm(props) {
  const classes = useStyle();
  const [valueRating, setValueRating] = useState(2);

  const [sizeValue, setSizeValue] = useState('female');
  const [comfortValue, setComfortValue] = useState('Very Comfortable');
  const [durabilityValue, setDurabilityValue] = useState('female');

  const handleChangeSize = (event) => {
    setSizeValue(event.target.value);
  };

  const handleChangeComfort = (event) => {
    setComfortValue(event.target.value);
  };

  const handleChangeDurability = (event) => {
    setDurabilityValue(event.target.value);
  };

  const form = useForm({
    defaultValues: {
      content: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      values.rating = valueRating;
      values.content = `Size: ${sizeValue}\nComfort: ${comfortValue}\nDurability: ${durabilityValue}\n${values.content}`;
      // values.content = 'Sản phẩm tốt';

      // values.productId = 2;
      await onSubmit(values);
    }

    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(handelSubmit)}>
      <Typography variant="h4" className={classes.titleHeading}>
        Write a review
      </Typography>
      <Typography variant="p" component="p" className={classes.titleSub}>
        Please share your experience
      </Typography>

      <Grid container className={classes.content}>
        <Grid item sx={12} sm={4}>
          <Typography className={classes.titleContent}>My overall rating:</Typography>
        </Grid>

        <Grid item sx={12} sm={8}>
          <Rating
            size="small"
            name="simple-controlled"
            value={valueRating}
            onChange={(event, newValue) => {
              setValueRating(newValue);
            }}
          />
        </Grid>
      </Grid>

      <Grid container className={classes.containerContent} spacing={1}>
        <Grid xs={6} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.titleCheckbox}>
              Size:
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={sizeValue}
              onChange={handleChangeSize}
            >
              <FormControlLabel
                value="Runs Small"
                control={<Radio color="default" />}
                label="Runs Small"
                size="small"
              />
              <FormControlLabel
                value="Just Right"
                control={<Radio color="default" />}
                label="Just Right"
                size="small"
              />
              <FormControlLabel
                value="Runs Big"
                control={<Radio color="default" />}
                label="Runs Big"
                size="small"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid xs={6} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.titleCheckbox}>
              Comfort:
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={comfortValue}
              onChange={handleChangeComfort}
            >
              <FormControlLabel
                value="Uncomfortable"
                control={<Radio color="default" />}
                label="Uncomfortable"
                size="small"
              />
              <FormControlLabel
                value="Average"
                control={<Radio color="default" />}
                label="Average"
                size="small"
              />
              <FormControlLabel
                value="Very Comfortable"
                control={<Radio color="default" />}
                label="Very Comfortable"
                size="small"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid xs={6} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.titleCheckbox}>
              Durability:
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={durabilityValue}
              onChange={handleChangeDurability}
            >
              <FormControlLabel
                value="Not Durable"
                control={<Radio color="default" />}
                label="Not Durable"
                size="small"
              />
              <FormControlLabel
                value="Average"
                control={<Radio color="default" />}
                label="Average"
                size="small"
              />
              <FormControlLabel
                value="Very Durable"
                control={<Radio color="default" />}
                label=" Very Durable"
                size="small"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <InputField name="content" label="Review Content" multiline rows={4} form={form} />
      <ButtonActive content="Submit" disabled={isSubmitting} type="submit" />
    </form>
  );
}

export default ProductReviewForm;
