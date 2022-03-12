import { useNavigate, useParams } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  // etc... other react-router-dom v6 hooks

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

export default withRouter;
