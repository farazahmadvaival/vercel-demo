import CardSkeleton from './Card'
import { SlickSlider } from "../../ReactSlick";

const Index = () => {
    return (
      <SlickSlider arrowsHidden={true}>
        {[...Array(4)]?.map((counter, _index) => (
            <CardSkeleton key={counter} />
        ))}
      </SlickSlider>
    );
  };

  export default Index;