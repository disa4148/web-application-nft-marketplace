import Authorized from './Authorized';
import Unauthorized from './Unauthorized';

const HeaderLayout = () => {
  /**
   * @dev temporary option for development only
   */
  const isSignedIn = false;

  return <>{isSignedIn ? <Authorized /> : <Unauthorized />}</>;
};

export default HeaderLayout;
