import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import QuantityField from 'components/form-controls/QuantityField';
import * as yup from 'yup';

CartQuantityForm.propTypes = {
  onSubmit: PropTypes.func,
  value: PropTypes.number,
  quantityMax: PropTypes.number,
};

function CartQuantityForm({ onSubmit = null, value: initialQuantity, quantityMax = 0 }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .max(quantityMax, 'Maximum value is ' + quantityMax)
      .min(1, 'Minimum value is 1')
      .integer('Quantity must be a valid number')
      .typeError('Please enter a number'),
  });

  const form = useForm({
    mode: 'onTouched',
    defaultValues: { quantity: initialQuantity },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const submitCallback = form.handleSubmit(handleFormSubmit);

  return (
    <form onSubmit={submitCallback} onBlur={submitCallback}>
      <QuantityField
        name="quantity"
        form={form}
        submitCallback={submitCallback}
        quantityMax={quantityMax}
      />
    </form>
  );
}

export default CartQuantityForm;
