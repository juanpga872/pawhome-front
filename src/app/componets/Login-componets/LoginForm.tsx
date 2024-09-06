import styled from 'styled-components';
import InputField from './InputField';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { DogAdoptionButton } from '../ui/Button/button.ui';

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const LoginForm = () => {
  return (
    <FormWrapper>
      <InputField type="email" placeholder="Email" icon={<FaEnvelope />} />
      <InputField type="password" placeholder="Password" icon={<FaLock />} />
      <DogAdoptionButton>Sing in</DogAdoptionButton>
    </FormWrapper>
  );
};

export default LoginForm;
