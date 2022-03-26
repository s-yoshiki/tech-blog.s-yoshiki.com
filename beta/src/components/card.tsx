import Link from "next/link"
import Badge from "./badge"

interface CardProps {
  src: string;
  title: string;
  date: string;
  description: string;
  href: string;
  tags: string[];
}

const getYMD = (arg: string) => {
  return arg.split(' ')[0]
}

const Card = (props: CardProps) => {
  const tags = props.tags.slice(0, 3)
  return (
    <div className="mx-auto bg-white shadow-md border border-gray-200 rounded-lg items-stretch w-full">
      <div className="
          hidden
          sm:hidden
          md:hidden
          lg:block
          xl:block"
          >

        <Link href={props.href}>
          <img
            className="
                rounded-tl-lg
                rounded-tr-lg
                h-28
                max-h-28
              "
            src={props.src}
            width={480}
            height={200}
            style={{ objectFit: 'cover' }}
            onError={() => '/images/thumbnail/no-image.png'}
          />
        </Link>
      </div>
      <div className="p-2">
        <div className='
            flex
            flex-wrap
            max-h-14
            '>
          <Link href={props.href}>
            <span className="
                text-gray-800 
                font-semibold
                text-sm
                tracking-tight
                mb-1">
              {props.title.slice(0, 45)}
              {props.title.length > 45 && '...'}
            </span>
          </Link>
        </div>
        <div className="text-sm text-slate-500">{getYMD(props.date)}</div>
        <div className='
            flex
            flex-wrap'>
          {tags.map((tag: string) => (
            <Link href={`/tags/${tag}/1`}>
              <div>
                <Badge keyword={tag} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
