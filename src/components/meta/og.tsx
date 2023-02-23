interface TwitterCardProps {
  type: 'website' | 'article';
  url: string;
  title: string;
  description: string;
  siteName?: string;
  image?: string;
}

const TwitterCard = (props: TwitterCardProps) => {
  return (
    <>
      {/* <head prefix={`og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# ${props.type}: http://ogp.me/ns/${props.type}#`} /> */}
      <meta property='og:url' content={props.url} />
      <meta property='og:type' content={props.type} />
      <meta property='og:title' content={props.title} />
      <meta property='og:description' content={props.description} />
      <meta property='og:site_name' content={props.siteName} />
      <meta property='og:image' content={props.image} />
    </>
  );
};

export default TwitterCard;
