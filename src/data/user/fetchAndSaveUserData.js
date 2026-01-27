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
      const accounts = response1.data;
      const transactions = response2.data;

      const idToNumber = new Map();
      // making a map from account id to account number;
      accounts.forEach((acc) => {
        const displayAccountNum = `${acc.name}  xxxx${acc.number.slice(acc.number.length - 5, acc.number.length - 1)}`;
        idToNumber.set(acc.id, displayAccountNum);
      });

      const transactionWithAccNum = transactions.map((t) => ({
        ...t,
        accountNumber: idToNumber.get(t.accountId) || null,
      }));

      setUserInfo((prev) => ({
        ...prev,
        accounts: accounts,
        transactions: transactionWithAccNum,
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
