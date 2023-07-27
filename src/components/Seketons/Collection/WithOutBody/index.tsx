import { SlickSlider } from "../../../ReactSlick";
import CardWithOutBodySkeleton from '../Card/WithOutBody'

const Index = () => {
    return (
      <SlickSlider>
        {[...Array(4)]?.map((counter, _index) => (
            <CardWithOutBodySkeleton key={counter} />
        ))}
    </SlickSlider>
    );
  };

  export default Index;