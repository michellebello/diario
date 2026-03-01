import {
  Landmark,
  BookCheck,
  Wallet,
  PiggyBank,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import "../../styles/accounts.css";

function EmptyBodyCard({ type, isAccount, showAddFormFunction }) {
  return (
    <div className="empty-account-content">
      <div className="empty-account-container">
        <div className="empty-account-top">
          <div className="empty-account-icon">
            {isAccount ? (
              <Landmark color="#333578" size="clamp(1.95rem, 3vw, 4rem)" />
            ) : (
              <BookCheck color="#333578" size="clamp(1.95rem, 3vw, 4rem)" />
            )}
          </div>
          <p className="empty-account-title">{`No ${type}s yet`}</p>
        </div>
        {isAccount ? (
          <p className="empty-account-message">
            Start managing your finances by adding your first account
          </p>
        ) : (
          <p className="empty-account-message">
            Start managing your spendings by setting up your monthly budget
          </p>
        )}

        {isAccount && (
          <div className="empty-account-all-account-types-container">
            <p className="empty-account-all-account-type-p">You can add:</p>
            <div className="empty-account-all-account-type-divs">
              <div className="empty-account-all-account-type-div">
                <Wallet
                  color="#333578"
                  className="empty-account-all-account-type-icon-div"
                />
                <span className="empty-account-message">Checking</span>
              </div>
              <div className="empty-account-all-account-type-div">
                <PiggyBank
                  color="#333578"
                  className="empty-account-all-account-type-icon"
                />
                <span className="empty-account-message">Savings</span>
              </div>
              <div className="empty-account-all-account-type-div">
                <CreditCard
                  color="#333578"
                  className="empty-account-all-account-type-icon"
                />
                <span className="empty-account-message">Credit</span>
              </div>
              <div className="empty-account-all-account-type-div">
                <TrendingUp
                  color="#333578"
                  className="empty-account-all-account-type-icon"
                />
                <span className="empty-account-message">Investment</span>
              </div>
            </div>
          </div>
        )}

        <div className="empty-account-button-container">
          <button
            className="empty-account-button"
            onClick={showAddFormFunction}
          >
            {`+ Add your first ${type}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmptyBodyCard;
