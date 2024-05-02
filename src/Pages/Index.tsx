import { useParams } from "react-router-dom";
import Home from "../Component/Home";
import IndexComponent from "../Component/IndexComponent";

const Index = () => {
  const { id } = useParams();
  if (id) {
    return <Home />;
  } else {
    return <IndexComponent />;
  }
};

export default Index;
