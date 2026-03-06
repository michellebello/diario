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
          budgets: true,
        },
      }));

      const response1 = await network.get("/accounts");
      const response3 = await network.get("/accounts/numbers");
      const response4 = await network.get("/accounts/balance");
      const accounts = response1.data;
      const accountNumbers = response3.data;
      const accountBalance = response4.data;

      setUserInfo((prev) => ({
        ...prev,
        accounts: accounts,
        accountNumbers: accountNumbers,
        accountBalance: accountBalance,
        loading: {
          ...prev.loading,
          accounts: false,
          accountNumbers: false,
          accountBalance: false,
        },
      }));

      const [resTransaction, resBudgets] = await Promise.all([
        network.get("/transactions"),
        network.get("/budgets"),
      ]);

      setUserInfo((prev) => ({
        ...prev,
        transactions: resTransaction.data,
        budgets: resBudgets.data,
        loading: { ...prev.loading, transactions: false, budgets: false },
      }));
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };
  return fetchUserData;
}
