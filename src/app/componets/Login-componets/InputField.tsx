import styled from 'styled-components';

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: JSX.Element;
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const InputIcon = styled.div`
  margin-right: 10px;
  font-size: 1.2rem;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: none;
  flex-grow: 1;
`;

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, icon }) => (
  <InputWrapper>
    <InputIcon>{icon}</InputIcon>
    <Input type={type} placeholder={placeholder} />
  </InputWrapper>
);

export default InputField;
