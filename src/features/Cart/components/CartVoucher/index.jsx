import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, TextField } from "@material-ui/core";
import ButtonActive from "components/component-custom/ButtonActive";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "components/form-controls/InputField";
import voucherApi from "api/voucherApi";
import { useDispatch, useSelector } from "react-redux";
import { cartTotalPriceSelector } from "features/Cart/selector";
import { apply } from "features/Cart/voucherSlice";

CartVoucher.propTypes = {};

function CartVoucher(props) {
  const [vouchers, setVouchers] = useState([]);
  const cartTotalPrice = useSelector(cartTotalPriceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await voucherApi.getAll();
        setVouchers(data);
      } catch (error) {
        console.log("Failed to fetch vouchers", error);
      }
    })();
  }, []);

  const schema = yup.object().shape({
    voucher: yup
      .string()
      .test("voucher", "This voucher cannot be appied", (value) => {
        const voucher = vouchers.find((x) => x.code === value.trim()) || {};
        return (
          voucher.code === value && cartTotalPrice >= voucher.priceCondition
        );
      }),
  });

  const form = useForm({
    defaultValues: {
      voucher: "",
    },
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    console.log(values);
    const voucher =
      vouchers.find((x) => x.code === values.voucher.trim()) || {};
    const action = apply(voucher);
    dispatch(action);
    form.reset();
  };

  return (
    <Box>
      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <InputField
              label="Enter your promo code"
              name="voucher"
              form={form}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <ButtonActive content="Apply" type="submit" />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default CartVoucher;
