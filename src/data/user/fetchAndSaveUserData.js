import Network from "../../utils/network";
import { useAppContext } from "../../contexts/context";

export function useUserData() {
  const { setUserInfo } = useAppContext();
  const network = new Network();

  const fetchUserData = async () => {
    try {
      setUserInfo((prev) => ({
        ...prev,
        loading: { accounts: true, transactions: true },
      }));

      const response1 = await network.get("/accounts");
      const response2 = await network.get("/transactions");

      setUserInfo((prev) => ({
        ...prev,
        accounts: response1.data,
        transactions: response2.data,
      }));
    } catch (err) {
      console.log(err);
      setUserInfo((prev) => ({
        ...prev,
        error: { accounts: err, transactions: err },
      }));
    } finally {
      setUserInfo((prev) => ({
        ...prev,
        loading: { accounts: false, transactions: false },
      }));
    }
  };
  return fetchUserData;
}
