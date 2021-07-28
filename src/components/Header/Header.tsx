import { H1 } from './Header.styles';

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps): JSX.Element => <H1 data-testid="header">{text}</H1>;
export default Header;
