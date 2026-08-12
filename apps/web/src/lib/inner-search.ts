export const search = (value: string) => {
  const query = encodeURI(
    ['site:tech-blog.s-yoshiki.com', ...value.split(' ')].join('+'),
  );
  const url = `https://www.google.co.jp/search?client=ubuntu&channel=fs&ie=utf-8&oe=utf-8&hl=ja&q=${query}`;
  window.location.href = url;
};
