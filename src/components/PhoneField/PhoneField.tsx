import { ChangeEvent, FC } from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

type PhoneFieldProps = {
  handleChangeInput(e: ChangeEvent<HTMLInputElement>): void;
} & TextFieldProps;

const PhoneField: FC<PhoneFieldProps> = ({ handleChangeInput, ...props }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      return;
    }

    handleChangeInput(e);
  };

  return <TextField onChange={onChange} {...props} />;
};

export default PhoneField;
