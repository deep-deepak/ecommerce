import { useParams, useHistory } from "react-router-dom";
const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useHistory();
  // etc... other react-router-dom v6 hooks
  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};
export default withRouter;