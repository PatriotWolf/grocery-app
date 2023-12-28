import { Box, Button, TextField } from '@mui/material';

import {
  Formik,
  FormikProps,
  FormikHelpers,
  Field,
  FieldProps,
  getIn,
} from 'formik';
import { Product } from '../../types';
import { editSchedulingSchema, formList } from '../constans';
import { FormEntry } from '../types';

interface Props {
  product: Product;
  onSubmit: (
    values: Product,
    formikHelpers: FormikHelpers<Product>,
  ) => void | Promise<Product>;
}

const FormComponents = ({ product, onSubmit }: Props) => {
  return (
    <Formik<Product>
      initialValues={product}
      validationSchema={editSchedulingSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, submitForm }: FormikProps<Product>) => (
        <>
          {formList.map(({ label, name }: FormEntry) => (
            <Field name={name} key={'input' + label}>
              {({ field }: FieldProps<string, Product>) => (
                <Box mb={3}>
                  <TextField
                    fullWidth
                    id={name}
                    name={name}
                    label={label}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={getIn(touched, name) && Boolean(getIn(errors, name))}
                    helperText={getIn(touched, name) && getIn(errors, name)}
                  />
                </Box>
              )}
            </Field>
          ))}

          <Button type="submit" onClick={submitForm}>
            Save
          </Button>
          <Button variant="contained" color="warning" href="/">
            Cancel
          </Button>
        </>
      )}
    </Formik>
  );
};

export default FormComponents;
