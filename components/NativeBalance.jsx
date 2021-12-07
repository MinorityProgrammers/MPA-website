import { useNativeBalance } from '../helpers/useNativeBalance';
import { n4 } from '../helpers/formatters';

const NativeBalance = function (props) {
  const { balance, nativeName } = useNativeBalance(props);

  return (
    <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
      {`${n4.format(
        balance.formatted,
      )} ${nativeName}`}
    </div>
  );
};

export default NativeBalance;
