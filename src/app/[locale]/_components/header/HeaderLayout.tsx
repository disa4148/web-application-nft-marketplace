import Authorized from './Authorized';
import Unauthorized from './Unauthorized';

const HeaderLayout = () => {
  /**
   * @dev temporary option for development only
   */
  const isSignedIn = true;

  return <>{isSignedIn ? <Authorized /> : <Unauthorized />}</>;
};

export default HeaderLayout;
