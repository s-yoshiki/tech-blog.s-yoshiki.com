---
title: "shields.ioで技術系のアイコンをたくさん作ってみる"
path: "/entry/150"
date: "2019-07-08 23:42:04"
coverImage: "../../../images/thumbnail/shieldsio.png"
author: "s-yoshiki"
tags: ["小ネタ","雑談","shields.io"]
---

## 概要

shields.ioを用いてテック系アイコンを量産しました。
とりあえず完成したのがこちらです。
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
<img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/82419/70ce5a6d-17b5-fb8a-b7db-1cbcb2df5611.png" alt="skills.png">
これでスキルマップを作ってみたらいい感じになりました。

アイコンジェネレータも作りました。
<blockquote class="twitter-tweet" data-lang="ja">
<p lang="ja" dir="ltr"><a href="https://t.co/6Xv6XIuzRm">https://t.co/6Xv6XIuzRm</a> で技術系アイコンを作るジェネレータを作りました。

デモはここに置いてます。<a href="https://t.co/Xua8v7WEwi">https://t.co/Xua8v7WEwi</a> <a href="https://t.co/SYzZY6lejb">pic.twitter.com/SYzZY6lejb</a>

— s-yoshiki | スクリプトカス ? (@s_yoshiki_dev) <a href="https://twitter.com/s_yoshiki_dev/status/1150040884106285062?ref_src=twsrc%5Etfw">2019年7月13日</a></blockquote>
<script async="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## shields.ioについて

<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=flat-square" height="50">
<a href="https://shields.io/">https://shields.io/</a>
GitHubのREADMEでよく見かけるアレです。
shields.ioはSVG形式のバッジサービスです。

### カスタムバッジを作る

特徴的な機能の1つとして
URLのパターンでカスタムバッジを作ることができます。

```shell
https://img.shields.io/badge/${subject}-${status}-${color}.svg

```

subject : バッジの左側に入る文言
status : バッジの右側に入る文言
color : 色

### Color

以下のようなものが用意されています。
<img width="456" alt="color.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/82419/5a9af505-f601-ef58-6efc-7d77b7d6a6c4.png">

16進数形式で指定することも可能です。

### カスタムスタイル

いくつかのスタイルが用意されています。
?style=plastic&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=plastic&logo=appveyor" height="30">
?style=flat&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=flat&logo=appveyor" height="30">
?style=flat-square&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=flat-square&logo=appveyor" height="30">
?style=for-the-badge&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=for-the-badge&logo=appveyor" height="30">
?style=popout&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=popout&logo=appveyor" height="60">
?style=popout-square&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=popout-square&logo=appveyor" height="60">
?style=social&logo=appveyor
<img src="https://img.shields.io/badge/shields-IO-cdCf71.svg?style=social&logo=appveyor" height="30">

### simpleicons

バッジではいくつかのアイコンが使えます。
これについてはsimpleiconsを参考になります。
<a href="https://simpleicons.org/">https://simpleicons.org/</a>
そして一例がこれです。
<img width="1228" alt=" 2019-07-08 1.41.11.png" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/82419/edf6c542-9c61-654c-3c18-03238fbd5869.png">

全部で数えたら648ありました。

## おすすめアイコンを作った

おすすめしたいアイコンを作りました。

### 言語系

<img src="https://img.shields.io/badge/PHP-ccc.svg?logo=php&style=flat" height="30"> <img src="https://img.shields.io/badge/Javascript-276DC3.svg?logo=javascript&style=flat" height="30"> <img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=flat" height="30"> <img src="https://img.shields.io/badge/-Python-F9DC3E.svg?logo=python&style=flat" height="30"> <img src="https://img.shields.io/badge/-CSS3-1572B6.svg?logo=css3&style=flat" height="30"> <img src="https://img.shields.io/badge/-HTML5-333.svg?logo=html5&style=flat" height="30">

### ライブラリ・フレームワーク

<img src="https://img.shields.io/badge/-CakePHP-D3DC43.svg?logo=cakephp&style=flat" height="30"> <img src="https://img.shields.io/badge/-Rails-CC0000.svg?logo=rails&style=flat" height="30"> <img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=flat" height="30"> <img src="https://img.shields.io/badge/-Flask-000000.svg?logo=flask&style=flat" height="30"> <img src="https://img.shields.io/badge/-Bootstrap-563D7C.svg?logo=bootstrap&style=flat" height="30"> <img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat" height="30"> <img src="https://img.shields.io/badge/-jQuery-0769AD.svg?logo=jquery&style=flat" height="30">

### OS

<img src="https://img.shields.io/badge/-Linux-6C6694.svg?logo=linux&style=flat" height="30"> <img src="https://img.shields.io/badge/-Ubuntu-6F52B5.svg?logo=ubuntu&style=flat" height="30"> <img src="https://img.shields.io/badge/-Windows-0078D6.svg?logo=windows&style=flat" height="30"> <img src="https://img.shields.io/badge/-RedHat-EE0000.svg?logo=red-hat&style=flat" height="30">
<img src="https://img.shields.io/badge/-Debian-A81D33.svg?logo=debian&style=flat" height="30"> <img src="https://img.shields.io/badge/-Raspberry%20Pi-C51A4A.svg?logo=raspberry-pi&style=flat" height="30"> <img src="https://img.shields.io/badge/-Arch%20Linux-EEE.svg?logo=arch-linux&style=flat" height="30">

### ミドルウェア

<img src="https://img.shields.io/badge/-Apache-D22128.svg?logo=apache&style=flat" height="30"> <img src="https://img.shields.io/badge/-Nginx-bfcfcf.svg?logo=nginx&style=flat" height="30"> <img src="https://img.shields.io/badge/-Oracle-f80000.svg?logo=oracle&style=flat" height="30"> <img src="https://img.shields.io/badge/-Redis-D82C20.svg?logo=redis&style=flat" height="30"> <img src="https://img.shields.io/badge/-Elasticsearch-005571.svg?logo=elasticsearch&style=flat" height="30"> <img src="https://img.shields.io/badge/-PostgreSQL-336791.svg?logo=postgresql&style=flat" height="30">

### エディタ・IDE

<img src="https://img.shields.io/badge/-Visual%20Studio%20Code-007ACC.svg?logo=visual-studio-code&style=flat" height="30"> <img src="https://img.shields.io/badge/-Vim-019733.svg?logo=vim&style=flat" height="30"> <img src="https://img.shields.io/badge/-Emacs-EEE.svg?logo=spacemacs&style=flat" height="30"> <img src="https://img.shields.io/badge/-Atom-66595C.svg?logo=atom&style=flat" height="30"> <img src="https://img.shields.io/badge/-Xcode-EEE.svg?logo=xcode&style=flat" height="30"> <img src="https://img.shields.io/badge/-intellij%20IDEA-000.svg?logo=intellij-idea&style=flat" height="30">

### クラウド・他

<img src="https://img.shields.io/badge/-Amazon%20AWS-232F3E.svg?logo=amazon-aws&style=flat" height="30"> <img src="https://img.shields.io/badge/-Google%20Cloud-EEE.svg?logo=google-cloud&style=flat" height="30"> <img src="https://img.shields.io/badge/-Ansible-EE0000.svg?logo=ansible&style=flat" height="30"> <img src="https://img.shields.io/badge/-GitHub-181717.svg?logo=github&style=flat" height="30"> <img src="https://img.shields.io/badge/-Docker-EEE.svg?logo=docker&style=flat" height="30">

## アイコンジェネレータを作った。

アイコンジェネレータを作りました。
ロゴ名の設定などで一部自分で調整が必要なものがあります。

<iframe src="https://codesandbox.io/embed/icon-generator-shields-io-t8csp?fontsize=14" title="Icon generator -  shields io" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

<a href="https://codesandbox.io/s/icon-generator-shields-io-t8csp?fontsize=14">
<img alt="Edit Icon generator -  shields io" src="https://codesandbox.io/static/img/play-codesandbox.svg"></a>

<a href="https://codesandbox.io/s/icon-generator-shields-io-t8csp?fontsize=14"></a>

## 参考

<a href="https://tech-blog.s-yoshiki.com/2019/07/1406/">https://tech-blog.s-yoshiki.com/2019/07/1406/</a>

<a href="https://qiita.com/s-yoshiki/items/436bbe1f7160b610b05c">https://qiita.com/s-yoshiki/items/436bbe1f7160b610b05c</a>

## スクリプトで作りたい人向け

さらに大量生産したい人もいると思うので、アイコンと色(16進数)の組み合わせを貼っておきました。
何かの役に立つかと...

```js
gatsby,#663399
scaleway,#4F0599
adobeaftereffects,#D291FF
kaios,#6F02B5
tor,#7E4798
podcasts,#9933CC
bit,#73398D
adobepremiere,#EA77FF
justgiving,#AD29B6
gog-dot-com,#86328A
slack,#4A154B
microsoftonenote,#80397B
adobexd,#FF2BC2
player-dot-me,#C0379A
graphql,#E10098
sass,#CC6699
t-mobile,#E20074
aurelia,#ED2B88
adobeindesign,#FD3F93
codecov,#F01F7A
disroot,#50162D
dribbble,#EA4C89
gitter,#ED1965
processwire,#EF145F
raspberrypi,#C51A4A
songkick,#F80046
foursquare,#F94877
invision,#FF3366
commonworkflowlanguage,#B5314C
angular,#DD0031
slides,#E4637C
csswizardry,#F43059
instagram,#E4405F
debian,#A81D33
themighty,#D0072A
meetup,#ED1C40
stadia,#CD2640
autotask,#E51937
pocket,#EF3F56
pinterest,#BD081C
jest,#C21325
sinaweibo,#E6162D
mastercard,#EB001B
twilio,#F22F46
gnusocial,#A22430
opera,#FF1B2D
macys,#E21A2C
nintendoswitch,#E60012
livestream,#CF202E
redbubble,#E41321
apache,#D22128
mega,#D9272E
netflix,#E50914
tencentqq,#EB1923
airbnb,#FF5A5F
microsoftaccess,#BA141A
cakephp,#D33C43
verizon,#CD040B
toggl,#E01B22
ebay,#E53238
serverfault,#E7282D
amd,#ED1C24
bitdefender,#ED1C24
trakt,#ED1C24
gulp,#DA4648
adobe,#FF0000
dtube,#FF0000
huawei,#FF0000
kirby,#FF0100
microgenetics,#FF0000
yandex,#FF0000
youtube,#FF0000
tinder,#FF6B6B
archiveofourown,#990000
weasyl,#990000
npm,#CB3837
filezilla,#BF0000
humblebundle,#CC2929
quantopian,#C50000
jabber,#CC0000
jekyll,#CC0000
rails,#CC0000
tesla,#CC0000
yelp,#D32323
meteor,#DE4F4F
adobecreativecloud,#D41818
flipboard,#E12828
trainerroad,#E12726
udemy,#EC5252
ko-fi,#F16061
ansible,#EE0000
redhat,#EE0000
itch-dot-io,#FA5C5C
oracle,#F80000
gnu,#A42E2B
freebsd,#AB2B28
codewars,#AD2C27
quora,#B92B27
ruby,#CC342D
scala,#DC322F
last-dot-fm,#D51007
plurk,#FF574D
redis,#D82C20
saucelabs,#E2231A
makerbot,#FF1E0D
ted,#E62B1E
rollup-dot-js,#EC4A3F
todoist,#E44332
wolfram,#DD1100
wolframlanguage,#DD1100
wolframmathematica,#DD1100
reverbnation,#E43526
jsdelivr,#E84D3D
sparkfun,#E53525
buzzfeed,#EE3322
googleplus,#DC4E41
reason,#DD4B39
jenkins,#D24939
gmail,#D14836
laravel,#E74430
patreon,#F96854
everplaces,#FA4B32
addthis,#FF6550
gitlab,#E24329
rubygems,#E9573F
adobeacrobatreader,#EE3F24
sentry,#FB4226
eventbrite,#F05537
git,#F05032
codeigniter,#EE4623
bower,#EF5734
soundcloud,#FF3300
hubspot,#FF7A59
microsoftpowerpoint,#D24726
producthunt,#DA552F
duckduckgo,#DE5833
html5,#E34F26
highly,#FF3C00
blogger,#FF5722
smashingmagazine,#E85C33
figma,#F24E1E
postman,#FF6C37
ubuntu,#E95420
auth0,#EB5424
pluralsight,#F15B2A
reddit,#FF4500
kentico,#F05A22
swift,#FA7343
zapier,#FF4A00
ycombinator,#F0652F
klout,#E44600
magento,#EE672F
bitly,#EE6123
origin,#F56C2D
sparkpost,#FA6423
sogou,#FB6022
strava,#FC4C02
faceit,#FF5500
etsy,#F16521
buymeacoffee,#FF813F
devrant,#F99A66
discover,#FF6000
jupyter,#F37626
blender,#F5792A
draugiem-dot-lv,#FF6600
monero,#FF6600
ocaml,#EC6813
crunchyroll,#F47521
odnoklassniki,#F4731C
elsevier,#FF6C00
mix,#FF8126
twoo,#FF7102
stackoverflow,#FE7A16
grafana,#F46800
fandango,#FF7300
cloudflare,#F38020
viadeo,#F88D2D
overcast,#FC7E0F
adobeillustrator,#FF7C00
proxmox,#E57000
slickpic,#FF880F
goodreads,#663300
openaccess,#F68212
micro-dot-blog,#FD8308
typo3,#FF8700
vlcmediaplayer,#FF8800
boost,#F69220
wattpad,#F68D12
d3-dot-js,#F9A03C
creativecommons,#EF9421
bitcoin,#F7931A
swarm,#FFA633
audible,#F8991C
wix,#FAAD4D
mozillafirefox,#FF9400
amazon,#FF9900
leetcode,#F89F1B
furaffinity,#FAAF3A
rss,#FFA500
monogram,#FDB22A
prettier,#F7B93E
fidoalliance,#FFBF3B
plex,#E5A00D
googleallo,#ECB842
fnac,#E1A925
goldenline,#F1B92B
googlekeep,#FFBB00
untappd,#FFC000
googleanalytics,#FFC107
monkeytie,#FFC619
firebase,#FFCA28
linux,#FCC624
docusign,#FFCC22
imdb,#E6B91E
launchpad,#F8C300
allocine,#FECC00
sprint,#FFCE0A
liberapay,#F6C915
spreaker,#F5C300
qzone,#FECE00
tapas,#FFCE00
qwiklabs,#F5CD0E
babel,#F9DC3E
pantheon,#EFD01B
mailchimp,#FFE01B
javascript,#F7DF1E
pingdom,#FFF000
snapchat,#FFFC00
dazn,#F8F8F5
khanacademy,#9DB63B
android,#A4C639
icq,#7EBD00
nvidia,#76B900
kik,#82BC23
wechat,#7BB32E
envato,#81B441
adobetypekit,#87EC00
zerply,#9DBC7A
opensuse,#73BA25
linuxmint,#87CF3E
groupon,#53A318
houzz,#7AC142
trulia,#53B50A
qiita,#55C500
civicrm,#81C459
sensu,#89C967
shopify,#7AB55C
gumtree,#72EF36
empirekred,#72BE50
nodemon,#76D04B
upwork,#6FDA44
adobedreamweaver,#35FA00
wheniwork,#51A33D
instacart,#43B02A
openstreetmap,#7EBC6F
eventstore,#5AB552
freecodecamp,#006400
xbox,#107C10
node-dot-js,#339933
mongodb,#47A248
hulu,#3DBB3D
line,#00C300
basecamp,#5ECC62
nginx,#269539
feedly,#2BB24C
letterboxd,#00D735
evernote,#00A82D
manjaro,#35BF5C
treehouse,#5FCF80
glassdoor,#0CAA41
vim,#019733
sellfy,#21B352
deviantart,#05CC47
cashapp,#00C244
hackerrank,#2EC866
whatsapp,#25D366
spotify,#1ED760
nextdoor,#00B246
kickstarter,#2BDE73
microsoftexcel,#217346
esea,#0E9648
picarto-dot-tv,#1DA456
graphcool,#27AE60
linewebtoon,#00D564
homify,#7DCDA3
snapcraft,#82BEA0
speakerdeck,#339966
koding,#00B057
gauges,#2FA66A
googlehangouts,#0C9D58
vue-dot-js,#4FC08D
geocaching,#00874D
castro,#00B265
themoviedatabase,#01D277
greenkeeper,#00C775
moo,#00945E
skyliner,#2FCEA0
vine,#11B48A
nuxt-dot-js,#00C58E
tripadvisor,#00AF87
steemit,#06D6A9
adobeaudition,#00E4BB
about-dot-me,#00A98F
bing,#008373
googlehangoutschat,#00897B
magisk,#00AF9C
netlify,#00C7B7
here,#48DAD0
slashdot,#026664
pingup,#00B1AB
xing,#006567
adobelightroomcc,#3DF0F0
umbraco,#00BEC1
canva,#00C4CC
travisci,#3EAAAF
gumroad,#36A9AE
arduino,#00979D
fitbit,#00B0B9
webstorm,#00CDD7
runkeeper,#2DC9D7
wpengine,#40BAC8
hackhands,#00ACBD
angularuniversal,#00ACC1
zendesk,#03363D
electron,#47848F
probot,#00B0D8
deezer,#00C7F2
proto-dot-io,#34A7C1
appveyor,#00B3E0
adobephotoshop,#00C8FF
go,#76E1FE
bandcamp,#408294
minutemailer,#3ABFE6
udacity,#01B3E3
zorin,#0CC1F3
react,#61DAFB
java,#007396
tencentweibo,#20B8E5
beats,#005571
elastic,#005571
elasticcloud,#005571
elasticsearch,#005571
elasticstack,#005571
kibana,#005571
logstash,#005571
x-pack,#005571
periscope,#40A4C4
at-and-t,#00A8E0
kodi,#17B2E7
co-op,#00B1E7
vimeo,#1AB7EA
xero,#13B5EA
livejournal,#00B0EA
sourcegraph,#00B4F2
f-secure,#00BAFF
hatenabookmark,#00A4DE
bathasu,#00A3E0
expertsexchange,#00AAE7
skype,#00AFF0
kaggle,#20BEFF
sitepoint,#258AAF
neo4j,#008CC1
cevo,#1EABE2
salesforce,#00A1E0
artstation,#13AFF0
compropago,#00AAEF
messenger,#00B2FF
ghost,#738A94
mathworks,#0076A8
yarn,#2C8EBB
topcoder,#29A8E0
webcomponents-dot-org,#29ABE2
hockeyapp,#009EE1
evry,#063A54
wordpress,#21759B
gravatar,#1E8CBE
dell,#007DB8
kotlin,#0095D5
virb,#0093DA
telegram,#2CA5E0
superuser,#2EACE3
aventrix,#0099DD
clockify,#03A9F4
dependabot,#025E8C
linkedin,#0077B5
archlinux,#1793D1
sega,#0089CF
sap,#008FD3
xsplit,#0095DE
teespring,#39ACE6
500px,#0099E5
webpack,#8DD6F9
osmc,#17394A
googleplay,#607D8B
pandora,#005483
garmin,#007CC3
docker,#1488C6
acm,#0085CA
nextcloud,#0082C9
crunchbase,#0288D1
microsoftazure,#0089D6
linuxfoundation,#009BEE
iconjar,#16A5F3
hackster,#1BACF7
spdx,#4398CC
trello,#0079BF
adobelightroomclassic,#ADD5EC
stripe,#008CDD
brand-dot-ai,#0AA0FF
drupal,#0678BE
codeforces,#1F8ACB
hexo,#0E83CD
twitter,#1DA1F2
spacex,#005288
keycdn,#3686BE
scribd,#1A7BBA
venmo,#3D95CE
typescript,#007ACC
visualstudiocode,#007ACC
storify,#3A98D9
plangrid,#0085DE
teamviewer,#0E8EE9
mediafire,#1299F3
codecademy,#1F4056
jquery,#0769AD
css3,#1572B6
microsoftoutlook,#0072C6
yammer,#0072C6
readthedocs,#8CA1AF
nuget,#004880
cplusplus,#00599C
gov-dot-uk,#005EA5
intel,#0071C5
chase,#117ACA
azuredevops,#0078D7
castorama,#0078D7
microsoftedge,#0078D7
windows,#0078D6
octopusdeploy,#2F93E0
mail-dot-ru,#168DE2
buffer,#168EEA
stackshare,#0690FA
elementary,#64BAFF
paypal,#00457C
mysql,#4479A1
cmake,#064F8C
pypi,#3775A9
flutter,#02569B
coderwall,#3E8DCC
renren,#217DC6
ifixit,#0071CE
internetexplorer,#0076D6
signal,#2592E9
uikit,#2396F3
shazam,#0088FF
disqus,#2E9FFF
keybase,#33A0FF
pivotaltracker,#517A9E
postgresql,#336791
jsfiddle,#4679A4
python,#3776AB
furrynetwork,#2E75B4
joomla,#5091CD
mastodon,#3088D4
riot,#368BD6
intercom,#1F8DED
steem,#4BA2F2
letsencrypt,#003A70
americanexpress,#2E77BC
laravelhorizon,#405263
digitalocean,#0080FF
delicious,#3399FF
ovh,#123F6D
dblp,#004F9F
zillow,#0074E4
icloud,#3693F3
riseup,#5E9EE3
buddy,#1A86FD
stubhub,#003168
r,#276DC3
lanyrd,#3C80CA
dailymotion,#0066DC
campaignmonitor,#509CF6
vk,#6383A8
stackexchange,#1E5397
coursera,#2A73CC
flickr,#0063DC
mixcloud,#314359
facebook,#4172B8
mixer,#002050
toptal,#3863A0
xcode,#1575F9
tumblr,#36465D
microsoftword,#2B579A
atlassian,#0052CC
bamboo,#0052CC
bitbucket,#0052CC
hipchat,#0052CC
designernews,#2D72D9
dropbox,#0061FF
confluence,#172B4D
jira,#172B4D
opsgenie,#172B4D
statuspage,#172B4D
playstation,#003791
playstation3,#003791
playstation4,#003791
subversion,#809CC9
microsoftonedrive,#094AB2
v8,#4B8BF5
ionic,#3880FF
google,#4285F4
googlechrome,#4285F4
googlecloud,#4285F4
googledrive,#4285F4
googlepodcasts,#4285F4
behance,#1769FF
powershell,#5391FE
framer,#0055FF
vagrant,#1563FF
fedora,#294172
clojure,#5881D8
azurepipelines,#2560E0
kubernetes,#326CE5
codio,#4574E0
hashnode,#2962FF
discord,#7289DA
qualcomm,#3253DC
nativescript,#3655FF
visa,#142787
samsung,#1428A0
samsungpay,#1428A0
roots,#525DDC
prismic,#484A7A
php,#777BB4
lua,#2C2D72
pinboard,#0000FF
protonmail,#8B89CC
baidu,#2319DC
snyk,#4C4A73
nucleo,#766DCC
viber,#665CAC
nintendogamecube,#6A5FBB
eslint,#4B32C3
spotlight,#352A71
marketo,#5C4C9F
eclipseide,#2C2255
haskell,#5D4F85
favro,#512DA8
twitch,#6441A4
redux,#764ABC
bootstrap,#563D7C
heroku,#430098
spacemacs,#9266CC
circle,#8669AE
yahoo,#440099
dot-net,#5C2D91
tails,#56347C
lgtm,#FFFFFF
gerrit,#EEEEEE
synology,#B6B5B6
feathub,#9B9B9B
apple,#999999
scrutinizerci,#8A9296
nintendo,#8F8F8F
wiiu,#8B8B8B
wii,#8B8B8B
automatic,#7D8084
materialdesign,#757575
microsoft,#666666
googlepay,#5F6368
atom,#66595C
sourceforge,#535353
conekta,#414959
codeship,#3C4858
hackerearth,#323754
ethereum,#3C3C3D
asana,#273347
stylus,#333333
known,#333333
circleci,#343434
statamic,#1F3641
epicgames,#313131
amazonaws,#232F3E
coffeescript,#2F2625
monzo,#14233C
codacy,#222F29
sublimetext,#272822
quantcast,#1E262C
matternet,#261C29
styleshare,#212121
pagekit,#212121
grav,#221E1F
drone,#212121
cirrusci,#212121
bigcartel,#222222
oculus,#1C1E20
librarything,#251A15
instapaper,#1F1F1F
django,#092E20
hackaday,#1A1A1A
github,#181717
simpleicons,#111111
medium,#12100E
dev-dot-to,#0A0A0A
myspace,#030303
zeit,#000000
wire,#000000
wikipedia,#000000
vsco,#000000
unsplash,#000000
unity,#000000
ubisoft,#000000
uber,#000000
tiktok,#000000
tidal,#000000
symfony,#000000
stitcher,#000000
steam,#000000
staticman,#000000
squarespace,#000000
society6,#000000
safari,#000000
rust,#000000
next-dot-js,#000000
mxlinux,#000000
mozilla,#000000
mediatemple,#000000
matrix,#000000
markdown,#000000
json,#000000
intellijidea,#000000
inkscape,#000000
hootsuite,#000000
flattr,#000000
flask,#000000
ello,#000000
discourse,#000000
digg,#000000
diaspora,#000000
deno,#000000
conda-forge,#000000
codesandbox,#000000
codepen,#000000
codeclimate,#000000
applepay,#000000
applemusic,#000000
angellist,#000000
```
