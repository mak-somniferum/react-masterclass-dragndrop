import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { themeState } from '../atoms';

const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  font-size: 25px;
  padding: 0 0 5px 0;
  border: 0;
  border-radius: 50%;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.cardHoverColor};
  }
`;

function ToggleMode() {
  const [isDark, setIsDark] = useRecoilState(themeState);
  const toggleIsDark = () => setIsDark((prev) => !prev);

  return <ToggleBtn onClick={toggleIsDark}>{isDark ? '🌜' : '🌞'}</ToggleBtn>;
}

export default ToggleMode;
