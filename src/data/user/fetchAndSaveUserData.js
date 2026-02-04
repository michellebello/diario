import Network from "../../utils/network";
import { useAppContext } from "../../contexts/context";

export function useUserData() {
  const { setUserInfo } = useAppContext();
  const network = new Network();

  const fetchUserData = async () => {
    try {
      setUserInfo((prev) => ({
        ...prev,
        loading: {
          accounts: true,
          transactions: true,
          accountNumbers: true,
          accountBalance: true,
        },
      }));

      const response1 = await network.get("/accounts");
      const response2 = await network.get("/transactions");
      const response3 = await network.get("/accounts/numbers");
      const response4 = await network.get("/accounts/balance");
      const accounts = response1.data;
      const transactions = response2.data;
      const accountNumbers = response3.data;
      const accountBalance = response4.data;

      setUserInfo((prev) => ({
        ...prev,
        accounts: accounts,
        transactions: transactions,
        accountNumbers: accountNumbers,
        accountBalance: accountBalance,
      }));
    } catch (err) {
      console.log(err);
      setUserInfo((prev) => ({
        ...prev,
        error: {
          accounts: err,
          transactions: err,
          accountNumbers: err,
          accountBalance: err,
        },
      }));
    } finally {
      setUserInfo((prev) => ({
        ...prev,
        loading: {
          accounts: false,
          transactions: false,
          accountNumbers: false,
          accountBalance: false,
        },
      }));
    }
  };
  return fetchUserData;
}
