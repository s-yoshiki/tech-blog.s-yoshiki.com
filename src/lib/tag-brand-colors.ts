export interface BrandColor {
  name: string;
  /** hex without the leading `#`, taken from the brand's primary colour */
  color: string;
}

const brandColors: BrandColor[] = [
  {
    name: '500px',
    color: '0099E5',
  },
  {
    name: 'about.me',
    color: '00A98F',
  },
  {
    name: 'acm',
    color: '0085CA',
  },
  {
    name: 'addthis',
    color: 'FF6550',
  },
  {
    name: 'adobe',
    color: 'FF0000',
  },
  {
    name: 'adobe-acrobat-reader',
    color: 'EE3F24',
  },
  {
    name: 'adobe-aftere-ffects',
    color: 'D291FF',
  },
  {
    name: 'adobe-audition',
    color: '00E4BB',
  },
  {
    name: 'adobe-creative-cloud',
    color: 'D41818',
  },
  {
    name: 'adobe-dreamweaver',
    color: '35FA00',
  },
  {
    name: 'adobe-illustrator',
    color: 'FF7C00',
  },
  {
    name: 'adobe-indesign',
    color: 'FD3F93',
  },
  {
    name: 'adobe-lightroom-cc',
    color: '3DF0F0',
  },
  {
    name: 'adobe-lightroom-classic',
    color: 'ADD5EC',
  },
  {
    name: 'adobe-photoshop',
    color: '00C8FF',
  },
  {
    name: 'adobe-premiere',
    color: 'EA77FF',
  },
  {
    name: 'adobe-typekit',
    color: '87EC00',
  },
  {
    name: 'adobe-xd',
    color: 'FF2BC2',
  },
  {
    name: 'airbnb',
    color: 'FF5A5F',
  },
  {
    name: 'allocine',
    color: 'FECC00',
  },
  {
    name: 'amazon',
    color: 'FF9900',
  },
  {
    name: 'amazon-aws',
    color: '232F3E',
  },
  {
    name: 'amazon-ec2',
    color: 'FF9900',
  },
  {
    name: 'amazon-s3',
    color: '569A31',
  },
  {
    name: 'amazon-ecs',
    color: 'FF9900',
  },
  {
    name: 'amazon-eks',
    color: 'FF9900',
  },
  {
    name: 'amazon-pay',
    color: 'FF9900',
  },
  {
    name: 'amazon-rds',
    color: '527FFF',
  },
  {
    name: 'amazon-sqs',
    color: 'FF4F8B',
  },
  {
    name: 'amazon-dynamodb',
    color: '4053D6',
  },
  {
    name: 'amazon-cloudwatch',
    color: 'FF4F8B',
  },
  {
    name: 'amazon-api-gateway',
    color: 'FF4F8B',
  },
  {
    name: 'amazon-lightsail',
    color: '232F3E',
  },
  {
    name: 'aws-amplify',
    color: 'FF9900',
  },
  {
    name: 'aws-fargate',
    color: 'FF9900',
  },
  {
    name: 'aws-lambda',
    color: 'FF9900',
  },
  {
    name: 'amd',
    color: 'ED1C24',
  },
  {
    name: 'americanexpress',
    color: '2E77BC',
  },
  {
    name: 'android',
    color: 'A4C639',
  },
  {
    name: 'angellist',
    color: '000000',
  },
  {
    name: 'angular',
    color: 'DD0031',
  },
  {
    name: 'angularuniversal',
    color: '00ACC1',
  },
  {
    name: 'ansible',
    color: 'EE0000',
  },
  {
    name: 'apache',
    color: 'D22128',
  },
  {
    name: 'apple',
    color: '999999',
  },
  {
    name: 'apple-music',
    color: '000000',
  },
  {
    name: 'apple-pay',
    color: '000000',
  },
  {
    name: 'appveyor',
    color: '00B3E0',
  },
  {
    name: 'archiveofourown',
    color: '990000',
  },
  {
    name: 'archlinux',
    color: '1793D1',
  },
  {
    name: 'arduino',
    color: '00979D',
  },
  {
    name: 'artstation',
    color: '13AFF0',
  },
  {
    name: 'asana',
    color: '273347',
  },
  {
    name: 'at-and-t',
    color: '00A8E0',
  },
  {
    name: 'atlassian',
    color: '0052CC',
  },
  {
    name: 'atom',
    color: '66595C',
  },
  {
    name: 'audible',
    color: 'F8991C',
  },
  {
    name: 'aurelia',
    color: 'ED2B88',
  },
  {
    name: 'auth0',
    color: 'EB5424',
  },
  {
    name: 'automatic',
    color: '7D8084',
  },
  {
    name: 'autotask',
    color: 'E51937',
  },
  {
    name: 'aventrix',
    color: '0099DD',
  },
  {
    name: 'azure-devops',
    color: '0078D7',
  },
  {
    name: 'azure-pipelines',
    color: '2560E0',
  },
  {
    name: 'babel',
    color: 'F9DC3E',
  },
  {
    name: 'baidu',
    color: '2319DC',
  },
  {
    name: 'bamboo',
    color: '0052CC',
  },
  {
    name: 'bandcamp',
    color: '408294',
  },
  {
    name: 'basecamp',
    color: '5ECC62',
  },
  {
    name: 'bathasu',
    color: '00A3E0',
  },
  {
    name: 'beats',
    color: '005571',
  },
  {
    name: 'behance',
    color: '1769FF',
  },
  {
    name: 'bigcartel',
    color: '222222',
  },
  {
    name: 'bing',
    color: '008373',
  },
  {
    name: 'bit',
    color: '73398D',
  },
  {
    name: 'bitbucket',
    color: '0052CC',
  },
  {
    name: 'bitcoin',
    color: 'F7931A',
  },
  {
    name: 'bitdefender',
    color: 'ED1C24',
  },
  {
    name: 'bitly',
    color: 'EE6123',
  },
  {
    name: 'blender',
    color: 'F5792A',
  },
  {
    name: 'blogger',
    color: 'FF5722',
  },
  {
    name: 'boost',
    color: 'F69220',
  },
  {
    name: 'bootstrap',
    color: '563D7C',
  },
  {
    name: 'bower',
    color: 'EF5734',
  },
  {
    name: 'brand.ai',
    color: '0AA0FF',
  },
  {
    name: 'buddy',
    color: '1A86FD',
  },
  {
    name: 'buffer',
    color: '168EEA',
  },
  {
    name: 'buymeacoffee',
    color: 'FF813F',
  },
  {
    name: 'buzzfeed',
    color: 'EE3322',
  },
  {
    name: 'cakephp',
    color: 'D33C43',
  },
  {
    name: 'campaignmonitor',
    color: '509CF6',
  },
  {
    name: 'canva',
    color: '00C4CC',
  },
  {
    name: 'canvas',
    color: 'E34F26',
  },
  {
    name: 'cashapp',
    color: '00C244',
  },
  {
    name: 'castorama',
    color: '0078D7',
  },
  {
    name: 'castro',
    color: '00B265',
  },
  {
    name: 'centos',
    color: '262577',
  },
  {
    name: 'cevo',
    color: '1EABE2',
  },
  {
    name: 'chase',
    color: '117ACA',
  },
  {
    name: 'chatgpt',
    color: '412991',
  },
  {
    name: 'circle',
    color: '8669AE',
  },
  {
    name: 'circleci',
    color: '343434',
  },
  {
    name: 'cirrusci',
    color: '212121',
  },
  {
    name: 'civicrm',
    color: '81C459',
  },
  {
    name: 'clockify',
    color: '03A9F4',
  },
  {
    name: 'clojure',
    color: '5881D8',
  },
  {
    name: 'cloudflare',
    color: 'F38020',
  },
  {
    name: 'cmake',
    color: '064F8C',
  },
  {
    name: 'co-op',
    color: '00B1E7',
  },
  {
    name: 'codacy',
    color: '222F29',
  },
  {
    name: 'codecademy',
    color: '1F4056',
  },
  {
    name: 'codeclimate',
    color: '000000',
  },
  {
    name: 'codecov',
    color: 'F01F7A',
  },
  {
    name: 'codeforces',
    color: '1F8ACB',
  },
  {
    name: 'codeigniter',
    color: 'EE4623',
  },
  {
    name: 'codepen',
    color: '000000',
  },
  {
    name: 'coderwall',
    color: '3E8DCC',
  },
  {
    name: 'codesandbox',
    color: '000000',
  },
  {
    name: 'codeship',
    color: '3C4858',
  },
  {
    name: 'codewars',
    color: 'AD2C27',
  },
  {
    name: 'codio',
    color: '4574E0',
  },
  {
    name: 'coffeescript',
    color: '2F2625',
  },
  {
    name: 'commonworkflowlanguage',
    color: 'B5314C',
  },
  {
    name: 'composer',
    color: '885630',
  },
  {
    name: 'compropago',
    color: '00AAEF',
  },
  {
    name: 'conda-forge',
    color: '000000',
  },
  {
    name: 'conekta',
    color: '414959',
  },
  {
    name: 'confluence',
    color: '172B4D',
  },
  {
    name: 'coursera',
    color: '2A73CC',
  },
  {
    name: 'cplusplus',
    color: '00599C',
  },
  {
    name: 'creativecommons',
    color: 'EF9421',
  },
  {
    name: 'crunchbase',
    color: '0288D1',
  },
  {
    name: 'crunchyroll',
    color: 'F47521',
  },
  {
    name: 'css3',
    color: '1572B6',
  },
  {
    name: 'csswizardry',
    color: 'F43059',
  },
  {
    name: 'curl',
    color: '073551',
  },
  {
    name: 'd3.js',
    color: 'F9A03C',
  },
  {
    name: 'dailymotion',
    color: '0066DC',
  },
  {
    name: 'dazn',
    color: 'F8F8F5',
  },
  {
    name: 'dblp',
    color: '004F9F',
  },
  {
    name: 'debian',
    color: 'A81D33',
  },
  {
    name: 'deezer',
    color: '00C7F2',
  },
  {
    name: 'delicious',
    color: '3399FF',
  },
  {
    name: 'dell',
    color: '007DB8',
  },
  {
    name: 'deno',
    color: '000000',
  },
  {
    name: 'dependabot',
    color: '025E8C',
  },
  {
    name: 'designernews',
    color: '2D72D9',
  },
  {
    name: 'dev.to',
    color: '0A0A0A',
  },
  {
    name: 'deviantart',
    color: '05CC47',
  },
  {
    name: 'devrant',
    color: 'F99A66',
  },
  {
    name: 'diaspora',
    color: '000000',
  },
  {
    name: 'digg',
    color: '000000',
  },
  {
    name: 'digitalocean',
    color: '0080FF',
  },
  {
    name: 'discord',
    color: '7289DA',
  },
  {
    name: 'discourse',
    color: '000000',
  },
  {
    name: 'discover',
    color: 'FF6000',
  },
  {
    name: 'disqus',
    color: '2E9FFF',
  },
  {
    name: 'disroot',
    color: '50162D',
  },
  {
    name: 'django',
    color: '092E20',
  },
  {
    name: 'docker',
    color: '1488C6',
  },
  {
    name: 'docusign',
    color: 'FFCC22',
  },
  {
    name: 'dot-net',
    color: '5C2D91',
  },
  {
    name: 'draugiem.lv',
    color: 'FF6600',
  },
  {
    name: 'dribbble',
    color: 'EA4C89',
  },
  {
    name: 'drone',
    color: '212121',
  },
  {
    name: 'dropbox',
    color: '0061FF',
  },
  {
    name: 'drupal',
    color: '0678BE',
  },
  {
    name: 'dtube',
    color: 'FF0000',
  },
  {
    name: 'duckduckgo',
    color: 'DE5833',
  },
  {
    name: 'ebay',
    color: 'E53238',
  },
  {
    name: 'eclipseide',
    color: '2C2255',
  },
  {
    name: 'elastic',
    color: '005571',
  },
  {
    name: 'elasticcloud',
    color: '005571',
  },
  {
    name: 'elasticsearch',
    color: '005571',
  },
  {
    name: 'elasticstack',
    color: '005571',
  },
  {
    name: 'electron',
    color: '47848F',
  },
  {
    name: 'elementary',
    color: '64BAFF',
  },
  {
    name: 'ello',
    color: '000000',
  },
  {
    name: 'elsevier',
    color: 'FF6C00',
  },
  {
    name: 'empirekred',
    color: '72BE50',
  },
  {
    name: 'envato',
    color: '81B441',
  },
  {
    name: 'epicgames',
    color: '313131',
  },
  {
    name: 'esea',
    color: '0E9648',
  },
  {
    name: 'eslint',
    color: '4B32C3',
  },
  {
    name: 'ethereum',
    color: '3C3C3D',
  },
  {
    name: 'etsy',
    color: 'F16521',
  },
  {
    name: 'eventbrite',
    color: 'F05537',
  },
  {
    name: 'eventstore',
    color: '5AB552',
  },
  {
    name: 'evernote',
    color: '00A82D',
  },
  {
    name: 'everplaces',
    color: 'FA4B32',
  },
  {
    name: 'evry',
    color: '063A54',
  },
  {
    name: 'expertsexchange',
    color: '00AAE7',
  },
  {
    name: 'f-secure',
    color: '00BAFF',
  },
  {
    name: 'facebook',
    color: '4172B8',
  },
  {
    name: 'faceit',
    color: 'FF5500',
  },
  {
    name: 'fandango',
    color: 'FF7300',
  },
  {
    name: 'favro',
    color: '512DA8',
  },
  {
    name: 'feathub',
    color: '9B9B9B',
  },
  {
    name: 'fedora',
    color: '294172',
  },
  {
    name: 'feedly',
    color: '2BB24C',
  },
  {
    name: 'fidoalliance',
    color: 'FFBF3B',
  },
  {
    name: 'figma',
    color: 'F24E1E',
  },
  {
    name: 'filezilla',
    color: 'BF0000',
  },
  {
    name: 'firebase',
    color: 'FFCA28',
  },
  {
    name: 'fitbit',
    color: '00B0B9',
  },
  {
    name: 'flask',
    color: '000000',
  },
  {
    name: 'flattr',
    color: '000000',
  },
  {
    name: 'flickr',
    color: '0063DC',
  },
  {
    name: 'flipboard',
    color: 'E12828',
  },
  {
    name: 'flutter',
    color: '02569B',
  },
  {
    name: 'fnac',
    color: 'E1A925',
  },
  {
    name: 'foursquare',
    color: 'F94877',
  },
  {
    name: 'framer',
    color: '0055FF',
  },
  {
    name: 'freebsd',
    color: 'AB2B28',
  },
  {
    name: 'freecodecamp',
    color: '006400',
  },
  {
    name: 'furaffinity',
    color: 'FAAF3A',
  },
  {
    name: 'furrynetwork',
    color: '2E75B4',
  },
  {
    name: 'garmin',
    color: '007CC3',
  },
  {
    name: 'gatsby',
    color: '663399',
  },
  {
    name: 'gauges',
    color: '2FA66A',
  },
  {
    name: 'geocaching',
    color: '00874D',
  },
  {
    name: 'gerrit',
    color: 'EEEEEE',
  },
  {
    name: 'ghost',
    color: '738A94',
  },
  {
    name: 'git',
    color: 'F05032',
  },
  {
    name: 'github',
    color: '181717',
  },
  {
    name: 'gitlab',
    color: 'E24329',
  },
  {
    name: 'gitter',
    color: 'ED1965',
  },
  {
    name: 'glassdoor',
    color: '0CAA41',
  },
  {
    name: 'gmail',
    color: 'D14836',
  },
  {
    name: 'gnu',
    color: 'A42E2B',
  },
  {
    name: 'gnusocial',
    color: 'A22430',
  },
  {
    name: 'gnu-bash',
    color: '4EAA25',
  },
  {
    name: 'go',
    color: '76E1FE',
  },
  {
    name: 'gog.com',
    color: '86328A',
  },
  {
    name: 'goldenline',
    color: 'F1B92B',
  },
  {
    name: 'goodreads',
    color: '663300',
  },
  {
    name: 'google',
    color: '4285F4',
  },
  {
    name: 'google-allo',
    color: 'ECB842',
  },
  {
    name: 'google-analytics',
    color: 'FFC107',
  },
  {
    name: 'google-chrome',
    color: '4285F4',
  },
  {
    name: 'google-cloud',
    color: '4285F4',
  },
  {
    name: 'google-drive',
    color: '4285F4',
  },
  {
    name: 'google-hangouts',
    color: '0C9D58',
  },
  {
    name: 'google-hangoutschat',
    color: '00897B',
  },
  {
    name: 'google-keep',
    color: 'FFBB00',
  },
  {
    name: 'google-pay',
    color: '5F6368',
  },
  {
    name: 'google-play',
    color: '607D8B',
  },
  {
    name: 'google-plus',
    color: 'DC4E41',
  },
  {
    name: 'google-podcasts',
    color: '4285F4',
  },
  {
    name: 'gov.uk',
    color: '005EA5',
  },
  {
    name: 'grafana',
    color: 'F46800',
  },
  {
    name: 'graphcool',
    color: '27AE60',
  },
  {
    name: 'graphql',
    color: 'E10098',
  },
  {
    name: 'grav',
    color: '221E1F',
  },
  {
    name: 'gravatar',
    color: '1E8CBE',
  },
  {
    name: 'greenkeeper',
    color: '00C775',
  },
  {
    name: 'groupon',
    color: '53A318',
  },
  {
    name: 'gulp',
    color: 'DA4648',
  },
  {
    name: 'gumroad',
    color: '36A9AE',
  },
  {
    name: 'gumtree',
    color: '72EF36',
  },
  {
    name: 'hackaday',
    color: '1A1A1A',
  },
  {
    name: 'hackerearth',
    color: '323754',
  },
  {
    name: 'hackerrank',
    color: '2EC866',
  },
  {
    name: 'hackhands',
    color: '00ACBD',
  },
  {
    name: 'hackster',
    color: '1BACF7',
  },
  {
    name: 'hashnode',
    color: '2962FF',
  },
  {
    name: 'haskell',
    color: '5D4F85',
  },
  {
    name: 'hatenabookmark',
    color: '00A4DE',
  },
  {
    name: 'here',
    color: '48DAD0',
  },
  {
    name: 'heroku',
    color: '430098',
  },
  {
    name: 'hexo',
    color: '0E83CD',
  },
  {
    name: 'highly',
    color: 'FF3C00',
  },
  {
    name: 'hipchat',
    color: '0052CC',
  },
  {
    name: 'hockeyapp',
    color: '009EE1',
  },
  {
    name: 'homebrew',
    color: 'FBB040',
  },
  {
    name: 'homify',
    color: '7DCDA3',
  },
  {
    name: 'hootsuite',
    color: '000000',
  },
  {
    name: 'houzz',
    color: '7AC142',
  },
  {
    name: 'html',
    color: 'E34F26',
  },
  {
    name: 'html5',
    color: 'E34F26',
  },
  {
    name: 'huawei',
    color: 'FF0000',
  },
  {
    name: 'hubspot',
    color: 'FF7A59',
  },
  {
    name: 'hulu',
    color: '3DBB3D',
  },
  {
    name: 'humblebundle',
    color: 'CC2929',
  },
  {
    name: 'icloud',
    color: '3693F3',
  },
  {
    name: 'iconjar',
    color: '16A5F3',
  },
  {
    name: 'icq',
    color: '7EBD00',
  },
  {
    name: 'ifixit',
    color: '0071CE',
  },
  {
    name: 'imdb',
    color: 'E6B91E',
  },
  {
    name: 'inkscape',
    color: '000000',
  },
  {
    name: 'instacart',
    color: '43B02A',
  },
  {
    name: 'instagram',
    color: 'E4405F',
  },
  {
    name: 'instapaper',
    color: '1F1F1F',
  },
  {
    name: 'intel',
    color: '0071C5',
  },
  {
    name: 'intellijidea',
    color: '000000',
  },
  {
    name: 'intercom',
    color: '1F8DED',
  },
  {
    name: 'internetexplorer',
    color: '0076D6',
  },
  {
    name: 'invision',
    color: 'FF3366',
  },
  {
    name: 'ionic',
    color: '3880FF',
  },
  {
    name: 'itch.io',
    color: 'FA5C5C',
  },
  {
    name: 'jabber',
    color: 'CC0000',
  },
  {
    name: 'java',
    color: '007396',
  },
  {
    name: 'javascript',
    color: 'F7DF1E',
  },
  {
    name: 'jekyll',
    color: 'CC0000',
  },
  {
    name: 'jenkins',
    color: 'D24939',
  },
  {
    name: 'jest',
    color: 'C21325',
  },
  {
    name: 'jira',
    color: '172B4D',
  },
  {
    name: 'joomla',
    color: '5091CD',
  },
  {
    name: 'jquery',
    color: '0769AD',
  },
  {
    name: 'jsdelivr',
    color: 'E84D3D',
  },
  {
    name: 'jsfiddle',
    color: '4679A4',
  },
  {
    name: 'json',
    color: '000000',
  },
  {
    name: 'jupyter',
    color: 'F37626',
  },
  {
    name: 'justgiving',
    color: 'AD29B6',
  },
  {
    name: 'kaggle',
    color: '20BEFF',
  },
  {
    name: 'kaios',
    color: '6F02B5',
  },
  {
    name: 'kentico',
    color: 'F05A22',
  },
  {
    name: 'keybase',
    color: '33A0FF',
  },
  {
    name: 'keycdn',
    color: '3686BE',
  },
  {
    name: 'khanacademy',
    color: '9DB63B',
  },
  {
    name: 'kibana',
    color: '005571',
  },
  {
    name: 'kickstarter',
    color: '2BDE73',
  },
  {
    name: 'kik',
    color: '82BC23',
  },
  {
    name: 'kirby',
    color: 'FF0100',
  },
  {
    name: 'klout',
    color: 'E44600',
  },
  {
    name: 'known',
    color: '333333',
  },
  {
    name: 'ko-fi',
    color: 'F16061',
  },
  {
    name: 'kodi',
    color: '17B2E7',
  },
  {
    name: 'koding',
    color: '00B057',
  },
  {
    name: 'kotlin',
    color: '0095D5',
  },
  {
    name: 'kubernetes',
    color: '326CE5',
  },
  {
    name: 'lanyrd',
    color: '3C80CA',
  },
  {
    name: 'laravel',
    color: 'E74430',
  },
  {
    name: 'laravelhorizon',
    color: '405263',
  },
  {
    name: 'last.fm',
    color: 'D51007',
  },
  {
    name: 'launchpad',
    color: 'F8C300',
  },
  {
    name: 'leetcode',
    color: 'F89F1B',
  },
  {
    name: 'letsencrypt',
    color: '003A70',
  },
  {
    name: 'letterboxd',
    color: '00D735',
  },
  {
    name: 'lgtm',
    color: 'FFFFFF',
  },
  {
    name: 'liberapay',
    color: 'F6C915',
  },
  {
    name: 'librarything',
    color: '251A15',
  },
  {
    name: 'line',
    color: '00C300',
  },
  {
    name: 'linewebtoon',
    color: '00D564',
  },
  {
    name: 'linkedin',
    color: '0077B5',
  },
  {
    name: 'linux',
    color: 'FCC624',
  },
  {
    name: 'linuxfoundation',
    color: '009BEE',
  },
  {
    name: 'linuxmint',
    color: '87CF3E',
  },
  {
    name: 'livejournal',
    color: '00B0EA',
  },
  {
    name: 'livestream',
    color: 'CF202E',
  },
  {
    name: 'logstash',
    color: '005571',
  },
  {
    name: 'lua',
    color: '2C2D72',
  },
  {
    name: 'mac',
    color: '999999',
  },
  {
    name: 'macys',
    color: 'E21A2C',
  },
  {
    name: 'magento',
    color: 'EE672F',
  },
  {
    name: 'magisk',
    color: '00AF9C',
  },
  {
    name: 'mail.ru',
    color: '168DE2',
  },
  {
    name: 'mailchimp',
    color: 'FFE01B',
  },
  {
    name: 'makerbot',
    color: 'FF1E0D',
  },
  {
    name: 'manjaro',
    color: '35BF5C',
  },
  {
    name: 'mariadb',
    color: '003545',
  },
  {
    name: 'markdown',
    color: '000000',
  },
  {
    name: 'marketo',
    color: '5C4C9F',
  },
  {
    name: 'mastercard',
    color: 'EB001B',
  },
  {
    name: 'mastodon',
    color: '3088D4',
  },
  {
    name: 'materialdesign',
    color: '757575',
  },
  {
    name: 'mathworks',
    color: '0076A8',
  },
  {
    name: 'matrix',
    color: '000000',
  },
  {
    name: 'matternet',
    color: '261C29',
  },
  {
    name: 'mediafire',
    color: '1299F3',
  },
  {
    name: 'mediatemple',
    color: '000000',
  },
  {
    name: 'medium',
    color: '12100E',
  },
  {
    name: 'meetup',
    color: 'ED1C40',
  },
  {
    name: 'mega',
    color: 'D9272E',
  },
  {
    name: 'messenger',
    color: '00B2FF',
  },
  {
    name: 'meteor',
    color: 'DE4F4F',
  },
  {
    name: 'micro.blog',
    color: 'FD8308',
  },
  {
    name: 'microgenetics',
    color: 'FF0000',
  },
  {
    name: 'microsoft',
    color: '666666',
  },
  {
    name: 'microsoft-access',
    color: 'BA141A',
  },
  {
    name: 'microsoft-azure',
    color: '0089D6',
  },
  {
    name: 'microsoft-edge',
    color: '0078D7',
  },
  {
    name: 'microsoft-excel',
    color: '217346',
  },
  {
    name: 'microsoft-onedrive',
    color: '094AB2',
  },
  {
    name: 'microsoft-onenote',
    color: '80397B',
  },
  {
    name: 'microsoft-outlook',
    color: '0072C6',
  },
  {
    name: 'microsoft-powerpoint',
    color: 'D24726',
  },
  {
    name: 'microsoft-word',
    color: '2B579A',
  },
  {
    name: 'minutemailer',
    color: '3ABFE6',
  },
  {
    name: 'mix',
    color: 'FF8126',
  },
  {
    name: 'mixcloud',
    color: '314359',
  },
  {
    name: 'mixer',
    color: '002050',
  },
  {
    name: 'monero',
    color: 'FF6600',
  },
  {
    name: 'mongodb',
    color: '47A248',
  },
  {
    name: 'monkeytie',
    color: 'FFC619',
  },
  {
    name: 'monogram',
    color: 'FDB22A',
  },
  {
    name: 'monzo',
    color: '14233C',
  },
  {
    name: 'moo',
    color: '00945E',
  },
  {
    name: 'mozilla',
    color: '000000',
  },
  {
    name: 'mozilla-firefox',
    color: 'FF9400',
  },
  {
    name: 'mxlinux',
    color: '000000',
  },
  {
    name: 'myspace',
    color: '030303',
  },
  {
    name: 'mysql',
    color: '4479A1',
  },
  {
    name: 'nativescript',
    color: '3655FF',
  },
  {
    name: 'neo4j',
    color: '008CC1',
  },
  {
    name: 'nestjs',
    color: 'EA2845',
  },
  {
    name: 'netflix',
    color: 'E50914',
  },
  {
    name: 'netlify',
    color: '00C7B7',
  },
  {
    name: 'next.js',
    color: '000000',
  },
  {
    name: 'nextcloud',
    color: '0082C9',
  },
  {
    name: 'nextdoor',
    color: '00B246',
  },
  {
    name: 'nginx',
    color: '009639',
  },
  {
    name: 'nintendo',
    color: '8F8F8F',
  },
  {
    name: 'nintendo-gamecube',
    color: '6A5FBB',
  },
  {
    name: 'nintendo-switch',
    color: 'E60012',
  },
  {
    name: 'node.js',
    color: '339933',
  },
  {
    name: 'nodemon',
    color: '76D04B',
  },
  {
    name: 'npm',
    color: 'CB3837',
  },
  {
    name: 'nucleo',
    color: '766DCC',
  },
  {
    name: 'nuget',
    color: '004880',
  },
  {
    name: 'nuxt.js',
    color: '00C58E',
  },
  {
    name: 'nvidia',
    color: '76B900',
  },
  {
    name: 'ocaml',
    color: 'EC6813',
  },
  {
    name: 'octopus-deploy',
    color: '2F93E0',
  },
  {
    name: 'oculus',
    color: '1C1E20',
  },
  {
    name: 'odnoklassniki',
    color: 'F4731C',
  },
  {
    name: 'openai',
    color: '412991',
  },
  {
    name: 'openapi',
    color: '6BA539',
  },
  {
    name: 'opencv',
    color: '5C3EE8',
  },
  {
    name: 'open-access',
    color: 'F68212',
  },
  {
    name: 'openstreetmap',
    color: '7EBC6F',
  },
  {
    name: 'opensuse',
    color: '73BA25',
  },
  {
    name: 'opera',
    color: 'FF1B2D',
  },
  {
    name: 'opsgenie',
    color: '172B4D',
  },
  {
    name: 'oracle',
    color: 'F80000',
  },
  {
    name: 'origin',
    color: 'F56C2D',
  },
  {
    name: 'osmc',
    color: '17394A',
  },
  {
    name: 'overcast',
    color: 'FC7E0F',
  },
  {
    name: 'ovh',
    color: '123F6D',
  },
  {
    name: 'pagekit',
    color: '212121',
  },
  {
    name: 'pandora',
    color: '005483',
  },
  {
    name: 'pantheon',
    color: 'EFD01B',
  },
  {
    name: 'patreon',
    color: 'F96854',
  },
  {
    name: 'paypal',
    color: '00457C',
  },
  {
    name: 'periscope',
    color: '40A4C4',
  },
  {
    name: 'perl',
    color: '39457E',
  },
  {
    name: 'php',
    color: '777BB4',
  },
  {
    name: 'phpmyadmin',
    color: '6C78AF',
  },
  {
    name: 'picarto.tv',
    color: '1DA456',
  },
  {
    name: 'pinboard',
    color: '0000FF',
  },
  {
    name: 'pingdom',
    color: 'FFF000',
  },
  {
    name: 'pingup',
    color: '00B1AB',
  },
  {
    name: 'pinterest',
    color: 'BD081C',
  },
  {
    name: 'pivotal-tracker',
    color: '517A9E',
  },
  {
    name: 'plangrid',
    color: '0085DE',
  },
  {
    name: 'player.me',
    color: 'C0379A',
  },
  {
    name: 'playstation',
    color: '003791',
  },
  {
    name: 'playstation-3',
    color: '003791',
  },
  {
    name: 'playstation-4',
    color: '003791',
  },
  {
    name: 'plex',
    color: 'E5A00D',
  },
  {
    name: 'pluralsight',
    color: 'F15B2A',
  },
  {
    name: 'plurk',
    color: 'FF574D',
  },
  {
    name: 'pocket',
    color: 'EF3F56',
  },
  {
    name: 'podcasts',
    color: '9933CC',
  },
  {
    name: 'postgresql',
    color: '336791',
  },
  {
    name: 'postman',
    color: 'FF6C37',
  },
  {
    name: 'powershell',
    color: '5391FE',
  },
  {
    name: 'prettier',
    color: 'F7B93E',
  },
  {
    name: 'prisma',
    color: '2D3748',
  },
  {
    name: 'prismic',
    color: '484A7A',
  },
  {
    name: 'probot',
    color: '00B0D8',
  },
  {
    name: 'processwire',
    color: 'EF145F',
  },
  {
    name: 'product-hunt',
    color: 'DA552F',
  },
  {
    name: 'proto.io',
    color: '34A7C1',
  },
  {
    name: 'protonmail',
    color: '8B89CC',
  },
  {
    name: 'proxmox',
    color: 'E57000',
  },
  {
    name: 'pypi',
    color: '3775A9',
  },
  {
    name: 'python',
    color: '3776AB',
  },
  {
    name: 'qiita',
    color: '55C500',
  },
  {
    name: 'qualcomm',
    color: '3253DC',
  },
  {
    name: 'quantcast',
    color: '1E262C',
  },
  {
    name: 'quantopian',
    color: 'C50000',
  },
  {
    name: 'quora',
    color: 'B92B27',
  },
  {
    name: 'qwiklabs',
    color: 'F5CD0E',
  },
  {
    name: 'qzone',
    color: 'FECE00',
  },
  {
    name: 'r',
    color: '276DC3',
  },
  {
    name: 'rails',
    color: 'CC0000',
  },
  {
    name: 'raspberry-pi',
    color: 'C51A4A',
  },
  {
    name: 'react',
    color: '61DAFB',
  },
  {
    name: 'read-the-docs',
    color: '8CA1AF',
  },
  {
    name: 'reason',
    color: 'DD4B39',
  },
  {
    name: 'redbubble',
    color: 'E41321',
  },
  {
    name: 'reddit',
    color: 'FF4500',
  },
  {
    name: 'red-hat',
    color: 'EE0000',
  },
  {
    name: 'redis',
    color: 'D82C20',
  },
  {
    name: 'redux',
    color: '764ABC',
  },
  {
    name: 'renren',
    color: '217DC6',
  },
  {
    name: 'reverbnation',
    color: 'E43526',
  },
  {
    name: 'riot',
    color: '368BD6',
  },
  {
    name: 'riseup',
    color: '5E9EE3',
  },
  {
    name: 'rollup.js',
    color: 'EC4A3F',
  },
  {
    name: 'roots',
    color: '525DDC',
  },
  {
    name: 'rss',
    color: 'FFA500',
  },
  {
    name: 'ruby',
    color: 'CC342D',
  },
  {
    name: 'rubygems',
    color: 'E9573F',
  },
  {
    name: 'runkeeper',
    color: '2DC9D7',
  },
  {
    name: 'rust',
    color: '000000',
  },
  {
    name: 'safari',
    color: '000000',
  },
  {
    name: 'salesforce',
    color: '00A1E0',
  },
  {
    name: 'samsung',
    color: '1428A0',
  },
  {
    name: 'samsung-pay',
    color: '1428A0',
  },
  {
    name: 'sap',
    color: '008FD3',
  },
  {
    name: 'sass',
    color: 'CC6699',
  },
  {
    name: 'sauce-labs',
    color: 'E2231A',
  },
  {
    name: 'scala',
    color: 'DC322F',
  },
  {
    name: 'scaleway',
    color: '4F0599',
  },
  {
    name: 'scribd',
    color: '1A7BBA',
  },
  {
    name: 'scrutinizer-ci',
    color: '8A9296',
  },
  {
    name: 'sega',
    color: '0089CF',
  },
  {
    name: 'selenium',
    color: '43B02A',
  },
  {
    name: 'sellfy',
    color: '21B352',
  },
  {
    name: 'sensu',
    color: '89C967',
  },
  {
    name: 'sentry',
    color: 'FB4226',
  },
  {
    name: 'serverfault',
    color: 'E7282D',
  },
  {
    name: 'shazam',
    color: '0088FF',
  },
  {
    name: 'shopify',
    color: '7AB55C',
  },
  {
    name: 'signal',
    color: '2592E9',
  },
  {
    name: 'simple-icons',
    color: '111111',
  },
  {
    name: 'sina-weibo',
    color: 'E6162D',
  },
  {
    name: 'sitepoint',
    color: '258AAF',
  },
  {
    name: 'skyliner',
    color: '2FCEA0',
  },
  {
    name: 'skype',
    color: '00AFF0',
  },
  {
    name: 'slack',
    color: '4A154B',
  },
  {
    name: 'slashdot',
    color: '026664',
  },
  {
    name: 'slickpic',
    color: 'FF880F',
  },
  {
    name: 'slides',
    color: 'E4637C',
  },
  {
    name: 'smashing-magazine',
    color: 'E85C33',
  },
  {
    name: 'snapchat',
    color: 'FFFC00',
  },
  {
    name: 'snapcraft',
    color: '82BEA0',
  },
  {
    name: 'snyk',
    color: '4C4A73',
  },
  {
    name: 'society6',
    color: '000000',
  },
  {
    name: 'sogou',
    color: 'FB6022',
  },
  {
    name: 'songkick',
    color: 'F80046',
  },
  {
    name: 'soundcloud',
    color: 'FF3300',
  },
  {
    name: 'sourceforge',
    color: '535353',
  },
  {
    name: 'sourcegraph',
    color: '00B4F2',
  },
  {
    name: 'spacemacs',
    color: '9266CC',
  },
  {
    name: 'spacex',
    color: '005288',
  },
  {
    name: 'sparkfun',
    color: 'E53525',
  },
  {
    name: 'sparkpost',
    color: 'FA6423',
  },
  {
    name: 'spdx',
    color: '4398CC',
  },
  {
    name: 'speaker-deck',
    color: '339966',
  },
  {
    name: 'spotify',
    color: '1ED760',
  },
  {
    name: 'spotlight',
    color: '352A71',
  },
  {
    name: 'spreaker',
    color: 'F5C300',
  },
  {
    name: 'sprint',
    color: 'FFCE0A',
  },
  {
    name: 'sqlite',
    color: '003B57',
  },
  {
    name: 'squarespace',
    color: '000000',
  },
  {
    name: 'stackexchange',
    color: '1E5397',
  },
  {
    name: 'stackoverflow',
    color: 'FE7A16',
  },
  {
    name: 'stackshare',
    color: '0690FA',
  },
  {
    name: 'stadia',
    color: 'CD2640',
  },
  {
    name: 'statamic',
    color: '1F3641',
  },
  {
    name: 'staticman',
    color: '000000',
  },
  {
    name: 'statuspage',
    color: '172B4D',
  },
  {
    name: 'steam',
    color: '000000',
  },
  {
    name: 'steem',
    color: '4BA2F2',
  },
  {
    name: 'steemit',
    color: '06D6A9',
  },
  {
    name: 'stitcher',
    color: '000000',
  },
  {
    name: 'storify',
    color: '3A98D9',
  },
  {
    name: 'strapi',
    color: '2F2E8B',
  },
  {
    name: 'strava',
    color: 'FC4C02',
  },
  {
    name: 'stripe',
    color: '008CDD',
  },
  {
    name: 'stubhub',
    color: '003168',
  },
  {
    name: 'styleshare',
    color: '212121',
  },
  {
    name: 'stylus',
    color: '333333',
  },
  {
    name: 'sublime-text',
    color: '272822',
  },
  {
    name: 'subversion',
    color: '809CC9',
  },
  {
    name: 'superuser',
    color: '2EACE3',
  },
  {
    name: 'swarm',
    color: 'FFA633',
  },
  {
    name: 'swift',
    color: 'FA7343',
  },
  {
    name: 'symfony',
    color: '000000',
  },
  {
    name: 'synology',
    color: 'B6B5B6',
  },
  {
    name: 't-mobile',
    color: 'E20074',
  },
  {
    name: 'tails',
    color: '56347C',
  },
  {
    name: 'tailwind-css',
    color: '56347C',
  },
  {
    name: 'tapas',
    color: 'FFCE00',
  },
  {
    name: 'teamviewer',
    color: '0E8EE9',
  },
  {
    name: 'ted',
    color: 'E62B1E',
  },
  {
    name: 'teespring',
    color: '39ACE6',
  },
  {
    name: 'telegram',
    color: '2CA5E0',
  },
  {
    name: 'tencent-qq',
    color: 'EB1923',
  },
  {
    name: 'tencent-weibo',
    color: '20B8E5',
  },
  {
    name: 'tesla',
    color: 'CC0000',
  },
  {
    name: 'the-mighty',
    color: 'D0072A',
  },
  {
    name: 'the-movie-database',
    color: '01D277',
  },
  {
    name: 'tidal',
    color: '000000',
  },
  {
    name: 'tik-tok',
    color: '000000',
  },
  {
    name: 'tinder',
    color: 'FF6B6B',
  },
  {
    name: 'todoist',
    color: 'E44332',
  },
  {
    name: 'toggl',
    color: 'E01B22',
  },
  {
    name: 'topcoder',
    color: '29A8E0',
  },
  {
    name: 'toptal',
    color: '3863A0',
  },
  {
    name: 'tor',
    color: '7E4798',
  },
  {
    name: 'trainerroad',
    color: 'E12726',
  },
  {
    name: 'trakt',
    color: 'ED1C24',
  },
  {
    name: 'travis-ci',
    color: '3EAAAF',
  },
  {
    name: 'treehouse',
    color: '5FCF80',
  },
  {
    name: 'trello',
    color: '0079BF',
  },
  {
    name: 'tripadvisor',
    color: '00AF87',
  },
  {
    name: 'trulia',
    color: '53B50A',
  },
  {
    name: 'tumblr',
    color: '36465D',
  },
  {
    name: 'turborepo',
    color: 'EF4444',
  },
  {
    name: 'twilio',
    color: 'F22F46',
  },
  {
    name: 'twitch',
    color: '6441A4',
  },
  {
    name: 'twitter',
    color: '1DA1F2',
  },
  {
    name: 'twoo',
    color: 'FF7102',
  },
  {
    name: 'typescript',
    color: '007ACC',
  },
  {
    name: 'typo3',
    color: 'FF8700',
  },
  {
    name: 'uber',
    color: '000000',
  },
  {
    name: 'ubisoft',
    color: '000000',
  },
  {
    name: 'ubuntu',
    color: 'E95420',
  },
  {
    name: 'udacity',
    color: '01B3E3',
  },
  {
    name: 'udemy',
    color: 'EC5252',
  },
  {
    name: 'uikit',
    color: '2396F3',
  },
  {
    name: 'umbraco',
    color: '00BEC1',
  },
  {
    name: 'unity',
    color: '000000',
  },
  {
    name: 'unsplash',
    color: '000000',
  },
  {
    name: 'untappd',
    color: 'FFC000',
  },
  {
    name: 'upwork',
    color: '6FDA44',
  },
  {
    name: 'v8',
    color: '4B8BF5',
  },
  {
    name: 'vagrant',
    color: '1563FF',
  },
  {
    name: 'venmo',
    color: '3D95CE',
  },
  {
    name: 'vercel',
    color: '000000',
  },
  {
    name: 'verizon',
    color: 'CD040B',
  },
  {
    name: 'viadeo',
    color: 'F88D2D',
  },
  {
    name: 'viber',
    color: '665CAC',
  },
  {
    name: 'vim',
    color: '019733',
  },
  {
    name: 'vimeo',
    color: '1AB7EA',
  },
  {
    name: 'vine',
    color: '11B48A',
  },
  {
    name: 'virb',
    color: '0093DA',
  },
  {
    name: 'visa',
    color: '142787',
  },
  {
    name: 'visual-studio-code',
    color: '007ACC',
  },
  {
    name: 'vk',
    color: '6383A8',
  },
  {
    name: 'vlc-media-player',
    color: 'FF8800',
  },
  {
    name: 'vsco',
    color: '000000',
  },
  {
    name: 'vue.js',
    color: '4FC08D',
  },
  {
    name: 'wattpad',
    color: 'F68D12',
  },
  {
    name: 'weasyl',
    color: '990000',
  },
  {
    name: 'webassembly',
    color: '654FF0',
  },
  {
    name: 'webcomponents.org',
    color: '29ABE2',
  },
  {
    name: 'webpack',
    color: '8DD6F9',
  },
  {
    name: 'webstorm',
    color: '00CDD7',
  },
  {
    name: 'wechat',
    color: '7BB32E',
  },
  {
    name: 'whatsapp',
    color: '25D366',
  },
  {
    name: 'when-i-work',
    color: '51A33D',
  },
  {
    name: 'wii',
    color: '8B8B8B',
  },
  {
    name: 'wii-u',
    color: '8B8B8B',
  },
  {
    name: 'wikipedia',
    color: '000000',
  },
  {
    name: 'windows',
    color: '0078D6',
  },
  {
    name: 'wire',
    color: '000000',
  },
  {
    name: 'wix',
    color: 'FAAD4D',
  },
  {
    name: 'wolfram',
    color: 'DD1100',
  },
  {
    name: 'wolfram-language',
    color: 'DD1100',
  },
  {
    name: 'wolfram-mathematica',
    color: 'DD1100',
  },
  {
    name: 'wordpress',
    color: '21759B',
  },
  {
    name: 'wpengine',
    color: '40BAC8',
  },
  {
    name: 'x-pack',
    color: '005571',
  },
  {
    name: 'xbox',
    color: '107C10',
  },
  {
    name: 'xcode',
    color: '1575F9',
  },
  {
    name: 'xero',
    color: '13B5EA',
  },
  {
    name: 'xing',
    color: '006567',
  },
  {
    name: 'xsplit',
    color: '0095DE',
  },
  {
    name: 'yahoo!',
    color: '440099',
  },
  {
    name: 'yammer',
    color: '0072C6',
  },
  {
    name: 'yandex',
    color: 'FF0000',
  },
  {
    name: 'yarn',
    color: '2C8EBB',
  },
  {
    name: 'y-combinator',
    color: 'F0652F',
  },
  {
    name: 'yelp',
    color: 'D32323',
  },
  {
    name: 'youtube',
    color: 'FF0000',
  },
  {
    name: 'zapier',
    color: 'FF4A00',
  },
  {
    name: 'zeit',
    color: '000000',
  },
  {
    name: 'zendesk',
    color: '03363D',
  },
  {
    name: 'zenn',
    color: '3EA8FF',
  },
  {
    name: 'zerply',
    color: '9DBC7A',
  },
  {
    name: 'zig',
    color: 'F7A41D',
  },
  {
    name: 'zillow',
    color: '0074E4',
  },
  {
    name: 'zorin',
    color: '0CC1F3',
  },
  {
    name: '画像処理',
    color: '5C3EE8',
  },
];

const byName = new Map(brandColors.map((item) => [item.name, item]));

const normalize = (keyword: string) =>
  keyword.replace(/[^a-z0-9]/gi, '').toLowerCase();

/**
 * Resolves a tag to its brand colour, matching either the literal tag or a
 * punctuation-stripped form (`node.js` -> `nodejs`). Returns null for tags with
 * no known brand so the caller can fall back to a neutral pill.
 */
export const getTagColor = (keyword: string): string | null => {
  const match =
    byName.get(keyword.toLowerCase()) ?? byName.get(normalize(keyword));
  return match ? `#${match.color}` : null;
};
