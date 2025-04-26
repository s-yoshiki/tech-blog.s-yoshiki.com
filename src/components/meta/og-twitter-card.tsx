interface TwitterCardProps {
  card: 'summary' | 'summary_large_image';
  site?: string;
  title: string;
  description: string;
  image: string;
}

const TwitterCard = (props: TwitterCardProps) => {
  return (
    <>
      <meta name="twitter:card" content={props.card} />
      <meta name="twitter:site" content={props.site} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </>
  );
};

export default TwitterCard;
