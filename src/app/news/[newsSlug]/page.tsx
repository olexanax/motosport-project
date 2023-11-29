//component
import ClientWrapper from "./components/ClientWrapper"


interface PostOverviewProps {
  params: {
    newsSlug: string;
  }
}


const NewsPage: React.FC<PostOverviewProps> = ({
  params: { newsSlug },
}) => {
  return (
    <ClientWrapper newsSlug={newsSlug} />
  );
};

export default NewsPage