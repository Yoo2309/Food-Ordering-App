import { useParams } from "react-router-dom";
import IndexComponent from "../Component/IndexComponent";
import CutstomHome from "./CutstomHome";

const Index = () => {
  const { id } = useParams();
  if (id) {
    return <CutstomHome />;
  } else {
    return <IndexComponent />;
  }
};

export default Index;
