import ProblemComponent from "../../components/ProblemComponent";
import { useParams } from "react-router-dom";

type ParamsType = {
  id: string;
};

function Problem() {
  const { id } = useParams<ParamsType>();
  return (
    id && (
      <ProblemComponent
        id={id}
        className="m-5"
      />
    )
  );
}

export default Problem;
