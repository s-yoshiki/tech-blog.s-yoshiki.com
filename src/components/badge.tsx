import React from 'react';

interface BadgeProp {
  keyword: string;
  classNmae?: string;
}
interface BlandColor {
  name: string;
  color: string;
  colorIcon: boolean;
  defaultLogo?: string;
}

const iconsData: BlandColor[] = [
  {
    name: '500px',
    color: '0099E5',
    colorIcon: true,
  },
  {
    name: 'about.me',
    color: '00A98F',
    colorIcon: true,
  },
  {
    name: 'acm',
    color: '0085CA',
    colorIcon: false,
  },
  {
    name: 'addthis',
    color: 'FF6550',
    colorIcon: true,
  },
  {
    name: 'adobe',
    color: 'FF0000',
    colorIcon: false,
  },
  {
    name: 'adobe-acrobat-reader',
    color: 'EE3F24',
    colorIcon: true,
  },
  {
    name: 'adobe-aftere-ffects',
    color: 'D291FF',
    colorIcon: true,
  },
  {
    name: 'adobe-audition',
    color: '00E4BB',
    colorIcon: true,
  },
  {
    name: 'adobe-creative-cloud',
    color: 'D41818',
    colorIcon: false,
  },
  {
    name: 'adobe-dreamweaver',
    color: '35FA00',
    colorIcon: true,
  },
  {
    name: 'adobe-illustrator',
    color: 'FF7C00',
    colorIcon: true,
  },
  {
    name: 'adobe-indesign',
    color: 'FD3F93',
    colorIcon: true,
  },
  {
    name: 'adobe-lightroom-cc',
    color: '3DF0F0',
    colorIcon: true,
  },
  {
    name: 'adobe-lightroom-classic',
    color: 'ADD5EC',
    colorIcon: true,
  },
  {
    name: 'adobe-photoshop',
    color: '00C8FF',
    colorIcon: true,
  },
  {
    name: 'adobe-premiere',
    color: 'EA77FF',
    colorIcon: true,
  },
  {
    name: 'adobe-typekit',
    color: '87EC00',
    colorIcon: true,
  },
  {
    name: 'adobe-xd',
    color: 'FF2BC2',
    colorIcon: true,
  },
  {
    name: 'airbnb',
    color: 'FF5A5F',
    colorIcon: true,
  },
  {
    name: 'allocine',
    color: 'FECC00',
    colorIcon: false,
  },
  {
    name: 'amazon',
    color: 'FF9900',
    colorIcon: true,
  },
  {
    name: 'amazon-aws',
    color: '232F3E',
    colorIcon: false,
  },
  {
    name: 'amazon-ec2',
    color: 'FF9900',
    colorIcon: true,
  },
  {
    name: 'amazon-s3',
    color: '569A31',
    colorIcon: true,
  },
  {
    name: 'amazon-ecs',
    color: 'FF9900',
    colorIcon: true,
  },
  {
    name: 'amazon-eks',
    color: 'FF9900',
    colorIcon: false,
  },
  {
    name: 'amazon-pay',
    color: 'FF9900',
    colorIcon: false,
  },
  {
    name: 'amazon-rds',
    color: '527FFF',
    colorIcon: false,
  },
  {
    name: 'amazon-sqs',
    color: 'FF4F8B',
    colorIcon: false,
  },
  {
    name: 'amazon-dynamodb',
    color: '4053D6',
    colorIcon: false,
  },
  {
    name: 'amazon-cloudwatch',
    color: 'FF4F8B',
    colorIcon: false,
  },
  {
    name: 'amazon-api-gateway',
    color: 'FF4F8B',
    colorIcon: false,
  },
  {
    name: 'amazon-lightsail',
    color: '232F3E',
    colorIcon: false,
  },
  {
    name: 'aws-amplify',
    color: 'FF9900',
    colorIcon: true,
  },
  {
    name: 'aws-fargate',
    color: 'FF9900',
    colorIcon: true,
  },
  {
    name: 'aws-lambda',
    color: 'FF9900',
    colorIcon: true,
  },
  {
    name: 'amd',
    color: 'ED1C24',
    colorIcon: false,
  },
  {
    name: 'americanexpress',
    color: '2E77BC',
    colorIcon: false,
  },
  {
    name: 'android',
    color: 'A4C639',
    colorIcon: true,
  },
  {
    name: 'angellist',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'angular',
    color: 'DD0031',
    colorIcon: false,
  },
  {
    name: 'angularuniversal',
    color: '00ACC1',
    colorIcon: false,
  },
  {
    name: 'ansible',
    color: 'EE0000',
    colorIcon: false,
  },
  {
    name: 'apache',
    color: 'D22128',
    colorIcon: false,
  },
  {
    name: 'apple',
    color: '999999',
    colorIcon: true,
  },
  {
    name: 'apple-music',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'apple-pay',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'appveyor',
    color: '00B3E0',
    colorIcon: true,
  },
  {
    name: 'archiveofourown',
    color: '990000',
    colorIcon: false,
  },
  {
    name: 'archlinux',
    color: '1793D1',
    colorIcon: false,
  },
  {
    name: 'arduino',
    color: '00979D',
    colorIcon: true,
  },
  {
    name: 'artstation',
    color: '13AFF0',
    colorIcon: true,
  },
  {
    name: 'asana',
    color: '273347',
    colorIcon: false,
  },
  {
    name: 'at-and-t',
    color: '00A8E0',
    colorIcon: false,
  },
  {
    name: 'atlassian',
    color: '0052CC',
    colorIcon: false,
  },
  {
    name: 'atom',
    color: '66595C',
    colorIcon: false,
  },
  {
    name: 'audible',
    color: 'F8991C',
    colorIcon: true,
  },
  {
    name: 'aurelia',
    color: 'ED2B88',
    colorIcon: true,
  },
  {
    name: 'auth0',
    color: 'EB5424',
    colorIcon: true,
  },
  {
    name: 'automatic',
    color: '7D8084',
    colorIcon: true,
  },
  {
    name: 'autotask',
    color: 'E51937',
    colorIcon: false,
  },
  {
    name: 'aventrix',
    color: '0099DD',
    colorIcon: true,
  },
  {
    name: 'azure-devops',
    color: '0078D7',
    colorIcon: false,
  },
  {
    name: 'azure-pipelines',
    color: '2560E0',
    colorIcon: false,
  },
  {
    name: 'babel',
    color: 'F9DC3E',
    colorIcon: true,
  },
  {
    name: 'baidu',
    color: '2319DC',
    colorIcon: false,
  },
  {
    name: 'bamboo',
    color: '0052CC',
    colorIcon: false,
  },
  {
    name: 'bandcamp',
    color: '408294',
    colorIcon: true,
  },
  {
    name: 'basecamp',
    color: '5ECC62',
    colorIcon: true,
  },
  {
    name: 'bathasu',
    color: '00A3E0',
    colorIcon: false,
  },
  {
    name: 'beats',
    color: '005571',
    colorIcon: false,
  },
  {
    name: 'behance',
    color: '1769FF',
    colorIcon: false,
  },
  {
    name: 'bigcartel',
    color: '222222',
    colorIcon: false,
  },
  {
    name: 'bing',
    color: '008373',
    colorIcon: false,
  },
  {
    name: 'bit',
    color: '73398D',
    colorIcon: false,
  },
  {
    name: 'bitbucket',
    color: '0052CC',
    colorIcon: false,
  },
  {
    name: 'bitcoin',
    color: 'F7931A',
    colorIcon: true,
  },
  {
    name: 'bitdefender',
    color: 'ED1C24',
    colorIcon: false,
  },
  {
    name: 'bitly',
    color: 'EE6123',
    colorIcon: true,
  },
  {
    name: 'blender',
    color: 'F5792A',
    colorIcon: true,
  },
  {
    name: 'blogger',
    color: 'FF5722',
    colorIcon: true,
  },
  {
    name: 'boost',
    color: 'F69220',
    colorIcon: true,
  },
  {
    name: 'bootstrap',
    color: '563D7C',
    colorIcon: false,
  },
  {
    name: 'bower',
    color: 'EF5734',
    colorIcon: true,
  },
  {
    name: 'brand.ai',
    color: '0AA0FF',
    colorIcon: true,
  },
  {
    name: 'buddy',
    color: '1A86FD',
    colorIcon: true,
  },
  {
    name: 'buffer',
    color: '168EEA',
    colorIcon: true,
  },
  {
    name: 'buymeacoffee',
    color: 'FF813F',
    colorIcon: false,
  },
  {
    name: 'buzzfeed',
    color: 'EE3322',
    colorIcon: true,
  },
  {
    name: 'cakephp',
    color: 'D33C43',
    colorIcon: true,
  },
  {
    name: 'campaignmonitor',
    color: '509CF6',
    colorIcon: false,
  },
  {
    name: 'canva',
    color: '00C4CC',
    colorIcon: true,
  },
  {
    name: 'canvas',
    color: 'E34F26',
    colorIcon: true,
  },
  {
    name: 'cashapp',
    color: '00C244',
    colorIcon: false,
  },
  {
    name: 'castorama',
    color: '0078D7',
    colorIcon: false,
  },
  {
    name: 'castro',
    color: '00B265',
    colorIcon: true,
  },
  {
    name: 'centos',
    color: '262577',
    colorIcon: false,
  },
  {
    name: 'cevo',
    color: '1EABE2',
    colorIcon: true,
  },
  {
    name: 'chase',
    color: '117ACA',
    colorIcon: false,
  },
  {
    name: 'chatgpt',
    color: '412991',
    colorIcon: false,
  },
  {
    name: 'circle',
    color: '8669AE',
    colorIcon: true,
  },
  {
    name: 'circleci',
    color: '343434',
    colorIcon: false,
  },
  {
    name: 'cirrusci',
    color: '212121',
    colorIcon: false,
  },
  {
    name: 'civicrm',
    color: '81C459',
    colorIcon: true,
  },
  {
    name: 'clockify',
    color: '03A9F4',
    colorIcon: true,
  },
  {
    name: 'clojure',
    color: '5881D8',
    colorIcon: true,
  },
  {
    name: 'cloudflare',
    color: 'F38020',
    colorIcon: true,
  },
  {
    name: 'cmake',
    color: '064F8C',
    colorIcon: false,
  },
  {
    name: 'co-op',
    color: '00B1E7',
    colorIcon: true,
  },
  {
    name: 'codacy',
    color: '222F29',
    colorIcon: false,
  },
  {
    name: 'codecademy',
    color: '1F4056',
    colorIcon: false,
  },
  {
    name: 'codeclimate',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'codecov',
    color: 'F01F7A',
    colorIcon: true,
  },
  {
    name: 'codeforces',
    color: '1F8ACB',
    colorIcon: true,
  },
  {
    name: 'codeigniter',
    color: 'EE4623',
    colorIcon: true,
  },
  {
    name: 'codepen',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'coderwall',
    color: '3E8DCC',
    colorIcon: true,
  },
  {
    name: 'codesandbox',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'codeship',
    color: '3C4858',
    colorIcon: false,
  },
  {
    name: 'codewars',
    color: 'AD2C27',
    colorIcon: false,
  },
  {
    name: 'codio',
    color: '4574E0',
    colorIcon: true,
  },
  {
    name: 'coffeescript',
    color: '2F2625',
    colorIcon: false,
  },
  {
    name: 'commonworkflowlanguage',
    color: 'B5314C',
    colorIcon: false,
  },
  {
    name: 'composer',
    color: '885630',
    colorIcon: false,
  },
  {
    name: 'compropago',
    color: '00AAEF',
    colorIcon: true,
  },
  {
    name: 'conda-forge',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'conekta',
    color: '414959',
    colorIcon: false,
  },
  {
    name: 'confluence',
    color: '172B4D',
    colorIcon: false,
  },
  {
    name: 'coursera',
    color: '2A73CC',
    colorIcon: true,
  },
  {
    name: 'cplusplus',
    color: '00599C',
    colorIcon: false,
  },
  {
    name: 'creativecommons',
    color: 'EF9421',
    colorIcon: false,
  },
  {
    name: 'crunchbase',
    color: '0288D1',
    colorIcon: false,
  },
  {
    name: 'crunchyroll',
    color: 'F47521',
    colorIcon: true,
  },
  {
    name: 'css3',
    color: '1572B6',
    colorIcon: false,
  },
  {
    name: 'csswizardry',
    color: 'F43059',
    colorIcon: false,
  },
  {
    name: 'curl',
    color: '073551',
    colorIcon: false,
  },
  {
    name: 'd3.js',
    color: 'F9A03C',
    colorIcon: true,
  },
  {
    name: 'dailymotion',
    color: '0066DC',
    colorIcon: false,
  },
  {
    name: 'dazn',
    color: 'F8F8F5',
    colorIcon: true,
  },
  {
    name: 'dblp',
    color: '004F9F',
    colorIcon: false,
  },
  {
    name: 'debian',
    color: 'A81D33',
    colorIcon: false,
  },
  {
    name: 'deezer',
    color: '00C7F2',
    colorIcon: false,
  },
  {
    name: 'delicious',
    color: '3399FF',
    colorIcon: true,
  },
  {
    name: 'dell',
    color: '007DB8',
    colorIcon: false,
  },
  {
    name: 'deno',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'dependabot',
    color: '025E8C',
    colorIcon: false,
  },
  {
    name: 'designernews',
    color: '2D72D9',
    colorIcon: false,
  },
  {
    name: 'dev.to',
    color: '0A0A0A',
    colorIcon: false,
  },
  {
    name: 'deviantart',
    color: '05CC47',
    colorIcon: true,
  },
  {
    name: 'devrant',
    color: 'F99A66',
    colorIcon: true,
  },
  {
    name: 'diaspora',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'digg',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'digitalocean',
    color: '0080FF',
    colorIcon: true,
  },
  {
    name: 'discord',
    color: '7289DA',
    colorIcon: true,
  },
  {
    name: 'discourse',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'discover',
    color: 'FF6000',
    colorIcon: true,
  },
  {
    name: 'disqus',
    color: '2E9FFF',
    colorIcon: true,
  },
  {
    name: 'disroot',
    color: '50162D',
    colorIcon: false,
  },
  {
    name: 'django',
    color: '092E20',
    colorIcon: false,
  },
  {
    name: 'docker',
    color: '1488C6',
    colorIcon: true,
  },
  {
    name: 'docusign',
    color: 'FFCC22',
    colorIcon: true,
  },
  {
    name: 'dot-net',
    color: '5C2D91',
    colorIcon: false,
  },
  {
    name: 'draugiem.lv',
    color: 'FF6600',
    colorIcon: true,
  },
  {
    name: 'dribbble',
    color: 'EA4C89',
    colorIcon: true,
  },
  {
    name: 'drone',
    color: '212121',
    colorIcon: false,
  },
  {
    name: 'dropbox',
    color: '0061FF',
    colorIcon: false,
  },
  {
    name: 'drupal',
    color: '0678BE',
    colorIcon: false,
  },
  {
    name: 'dtube',
    color: 'FF0000',
    colorIcon: false,
  },
  {
    name: 'duckduckgo',
    color: 'DE5833',
    colorIcon: true,
  },
  {
    name: 'ebay',
    color: 'E53238',
    colorIcon: true,
  },
  {
    name: 'eclipseide',
    color: '2C2255',
    colorIcon: false,
  },
  {
    name: 'elastic',
    color: '005571',
    colorIcon: false,
  },
  {
    name: 'elasticcloud',
    color: '005571',
    colorIcon: false,
  },
  {
    name: 'elasticsearch',
    color: '005571',
    colorIcon: false,
  },
  {
    name: 'elasticstack',
    color: '005571',
    colorIcon: false,
  },
  {
    name: 'electron',
    color: '47848F',
    colorIcon: true,
  },
  {
    name: 'elementary',
    color: '64BAFF',
    colorIcon: true,
  },
  {
    name: 'ello',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'elsevier',
    color: 'FF6C00',
    colorIcon: true,
  },
  {
    name: 'empirekred',
    color: '72BE50',
    colorIcon: false,
  },
  {
    name: 'envato',
    color: '81B441',
    colorIcon: true,
  },
  {
    name: 'epicgames',
    color: '313131',
    colorIcon: false,
  },
  {
    name: 'esea',
    color: '0E9648',
    colorIcon: false,
  },
  {
    name: 'eslint',
    color: '4B32C3',
    colorIcon: false,
  },
  {
    name: 'ethereum',
    color: '3C3C3D',
    colorIcon: false,
  },
  {
    name: 'etsy',
    color: 'F16521',
    colorIcon: true,
  },
  {
    name: 'eventbrite',
    color: 'F05537',
    colorIcon: true,
  },
  {
    name: 'eventstore',
    color: '5AB552',
    colorIcon: false,
  },
  {
    name: 'evernote',
    color: '00A82D',
    colorIcon: true,
  },
  {
    name: 'everplaces',
    color: 'FA4B32',
    colorIcon: true,
  },
  {
    name: 'evry',
    color: '063A54',
    colorIcon: false,
  },
  {
    name: 'expertsexchange',
    color: '00AAE7',
    colorIcon: false,
  },
  {
    name: 'f-secure',
    color: '00BAFF',
    colorIcon: true,
  },
  {
    name: 'facebook',
    color: '4172B8',
    colorIcon: true,
  },
  {
    name: 'faceit',
    color: 'FF5500',
    colorIcon: true,
  },
  {
    name: 'fandango',
    color: 'FF7300',
    colorIcon: true,
  },
  {
    name: 'favro',
    color: '512DA8',
    colorIcon: false,
  },
  {
    name: 'feathub',
    color: '9B9B9B',
    colorIcon: true,
  },
  {
    name: 'fedora',
    color: '294172',
    colorIcon: false,
  },
  {
    name: 'feedly',
    color: '2BB24C',
    colorIcon: true,
  },
  {
    name: 'fidoalliance',
    color: 'FFBF3B',
    colorIcon: false,
  },
  {
    name: 'figma',
    color: 'F24E1E',
    colorIcon: true,
  },
  {
    name: 'filezilla',
    color: 'BF0000',
    colorIcon: false,
  },
  {
    name: 'firebase',
    color: 'FFCA28',
    colorIcon: true,
  },
  {
    name: 'fitbit',
    color: '00B0B9',
    colorIcon: true,
  },
  {
    name: 'flask',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'flattr',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'flickr',
    color: '0063DC',
    colorIcon: false,
  },
  {
    name: 'flipboard',
    color: 'E12828',
    colorIcon: false,
  },
  {
    name: 'flutter',
    color: '02569B',
    colorIcon: false,
  },
  {
    name: 'fnac',
    color: 'E1A925',
    colorIcon: true,
  },
  {
    name: 'foursquare',
    color: 'F94877',
    colorIcon: true,
  },
  {
    name: 'framer',
    color: '0055FF',
    colorIcon: false,
  },
  {
    name: 'freebsd',
    color: 'AB2B28',
    colorIcon: false,
  },
  {
    name: 'freecodecamp',
    color: '006400',
    colorIcon: false,
  },
  {
    name: 'furaffinity',
    color: 'FAAF3A',
    colorIcon: false,
  },
  {
    name: 'furrynetwork',
    color: '2E75B4',
    colorIcon: false,
  },
  {
    name: 'garmin',
    color: '007CC3',
    colorIcon: false,
  },
  {
    name: 'gatsby',
    color: '663399',
    colorIcon: false,
  },
  {
    name: 'gauges',
    color: '2FA66A',
    colorIcon: true,
  },
  {
    name: 'geocaching',
    color: '00874D',
    colorIcon: false,
  },
  {
    name: 'gerrit',
    color: 'EEEEEE',
    colorIcon: true,
  },
  {
    name: 'ghost',
    color: '738A94',
    colorIcon: true,
  },
  {
    name: 'git',
    color: 'F05032',
    colorIcon: true,
  },
  {
    name: 'github',
    color: '181717',
    colorIcon: false,
  },
  {
    name: 'gitlab',
    color: 'E24329',
    colorIcon: true,
  },
  {
    name: 'gitter',
    color: 'ED1965',
    colorIcon: false,
  },
  {
    name: 'glassdoor',
    color: '0CAA41',
    colorIcon: true,
  },
  {
    name: 'gmail',
    color: 'D14836',
    colorIcon: true,
  },
  {
    name: 'gnu',
    color: 'A42E2B',
    colorIcon: false,
  },
  {
    name: 'gnusocial',
    color: 'A22430',
    colorIcon: false,
  },
  {
    name: 'gnu-bash',
    color: '4EAA25',
    colorIcon: false,
  },
  {
    name: 'go',
    color: '76E1FE',
    colorIcon: true,
  },
  {
    name: 'gog.com',
    color: '86328A',
    colorIcon: false,
  },
  {
    name: 'goldenline',
    color: 'F1B92B',
    colorIcon: true,
  },
  {
    name: 'goodreads',
    color: '663300',
    colorIcon: false,
  },
  {
    name: 'google',
    color: '4285F4',
    colorIcon: true,
  },
  {
    name: 'google-allo',
    color: 'ECB842',
    colorIcon: false,
  },
  {
    name: 'google-analytics',
    color: 'FFC107',
    colorIcon: true,
  },
  {
    name: 'google-chrome',
    color: '4285F4',
    colorIcon: true,
  },
  {
    name: 'google-cloud',
    color: '4285F4',
    colorIcon: true,
  },
  {
    name: 'google-drive',
    color: '4285F4',
    colorIcon: true,
  },
  {
    name: 'google-hangouts',
    color: '0C9D58',
    colorIcon: true,
  },
  {
    name: 'google-hangoutschat',
    color: '00897B',
    colorIcon: false,
  },
  {
    name: 'google-keep',
    color: 'FFBB00',
    colorIcon: true,
  },
  {
    name: 'google-pay',
    color: '5F6368',
    colorIcon: true,
  },
  {
    name: 'google-play',
    color: '607D8B',
    colorIcon: false,
  },
  {
    name: 'google-plus',
    color: 'DC4E41',
    colorIcon: false,
  },
  {
    name: 'google-podcasts',
    color: '4285F4',
    colorIcon: true,
  },
  {
    name: 'gov.uk',
    color: '005EA5',
    colorIcon: false,
  },
  {
    name: 'grafana',
    color: 'F46800',
    colorIcon: true,
  },
  {
    name: 'graphcool',
    color: '27AE60',
    colorIcon: true,
  },
  {
    name: 'graphql',
    color: 'E10098',
    colorIcon: false,
  },
  {
    name: 'grav',
    color: '221E1F',
    colorIcon: false,
  },
  {
    name: 'gravatar',
    color: '1E8CBE',
    colorIcon: true,
  },
  {
    name: 'greenkeeper',
    color: '00C775',
    colorIcon: true,
  },
  {
    name: 'groupon',
    color: '53A318',
    colorIcon: true,
  },
  {
    name: 'gulp',
    color: 'DA4648',
    colorIcon: true,
  },
  {
    name: 'gumroad',
    color: '36A9AE',
    colorIcon: true,
  },
  {
    name: 'gumtree',
    color: '72EF36',
    colorIcon: true,
  },
  {
    name: 'hackaday',
    color: '1A1A1A',
    colorIcon: false,
  },
  {
    name: 'hackerearth',
    color: '323754',
    colorIcon: false,
  },
  {
    name: 'hackerrank',
    color: '2EC866',
    colorIcon: true,
  },
  {
    name: 'hackhands',
    color: '00ACBD',
    colorIcon: true,
  },
  {
    name: 'hackster',
    color: '1BACF7',
    colorIcon: true,
  },
  {
    name: 'hashnode',
    color: '2962FF',
    colorIcon: false,
  },
  {
    name: 'haskell',
    color: '5D4F85',
    colorIcon: false,
  },
  {
    name: 'hatenabookmark',
    color: '00A4DE',
    colorIcon: false,
  },
  {
    name: 'here',
    color: '48DAD0',
    colorIcon: true,
  },
  {
    name: 'heroku',
    color: '430098',
    colorIcon: false,
  },
  {
    name: 'hexo',
    color: '0E83CD',
    colorIcon: true,
  },
  {
    name: 'highly',
    color: 'FF3C00',
    colorIcon: true,
  },
  {
    name: 'hipchat',
    color: '0052CC',
    colorIcon: false,
  },
  {
    name: 'hockeyapp',
    color: '009EE1',
    colorIcon: true,
  },
  {
    name: 'homebrew',
    color: 'FBB040',
    colorIcon: true,
  },
  {
    name: 'homify',
    color: '7DCDA3',
    colorIcon: true,
  },
  {
    name: 'hootsuite',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'houzz',
    color: '7AC142',
    colorIcon: true,
  },
  {
    name: 'html',
    color: 'E34F26',
    colorIcon: true,
  },
  {
    name: 'html5',
    color: 'E34F26',
    colorIcon: true,
  },
  {
    name: 'huawei',
    color: 'FF0000',
    colorIcon: false,
  },
  {
    name: 'hubspot',
    color: 'FF7A59',
    colorIcon: true,
  },
  {
    name: 'hulu',
    color: '3DBB3D',
    colorIcon: true,
  },
  {
    name: 'humblebundle',
    color: 'CC2929',
    colorIcon: false,
  },
  {
    name: 'icloud',
    color: '3693F3',
    colorIcon: true,
  },
  {
    name: 'iconjar',
    color: '16A5F3',
    colorIcon: true,
  },
  {
    name: 'icq',
    color: '7EBD00',
    colorIcon: true,
  },
  {
    name: 'ifixit',
    color: '0071CE',
    colorIcon: false,
  },
  {
    name: 'imdb',
    color: 'E6B91E',
    colorIcon: true,
  },
  {
    name: 'inkscape',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'instacart',
    color: '43B02A',
    colorIcon: true,
  },
  {
    name: 'instagram',
    color: 'E4405F',
    colorIcon: true,
  },
  {
    name: 'instapaper',
    color: '1F1F1F',
    colorIcon: false,
  },
  {
    name: 'intel',
    color: '0071C5',
    colorIcon: false,
  },
  {
    name: 'intellijidea',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'intercom',
    color: '1F8DED',
    colorIcon: true,
  },
  {
    name: 'internetexplorer',
    color: '0076D6',
    colorIcon: false,
  },
  {
    name: 'invision',
    color: 'FF3366',
    colorIcon: true,
  },
  {
    name: 'ionic',
    color: '3880FF',
    colorIcon: true,
  },
  {
    name: 'itch.io',
    color: 'FA5C5C',
    colorIcon: true,
  },
  {
    name: 'jabber',
    color: 'CC0000',
    colorIcon: false,
  },
  {
    name: 'java',
    color: '007396',
    colorIcon: false,
  },
  {
    name: 'javascript',
    color: 'F7DF1E',
    colorIcon: true,
  },
  {
    name: 'jekyll',
    color: 'CC0000',
    colorIcon: false,
  },
  {
    name: 'jenkins',
    color: 'D24939',
    colorIcon: true,
  },
  {
    name: 'jest',
    color: 'C21325',
    colorIcon: false,
  },
  {
    name: 'jira',
    color: '172B4D',
    colorIcon: false,
  },
  {
    name: 'joomla',
    color: '5091CD',
    colorIcon: true,
  },
  {
    name: 'jquery',
    color: '0769AD',
    colorIcon: false,
  },
  {
    name: 'jsdelivr',
    color: 'E84D3D',
    colorIcon: true,
  },
  {
    name: 'jsfiddle',
    color: '4679A4',
    colorIcon: true,
  },
  {
    name: 'json',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'jupyter',
    color: 'F37626',
    colorIcon: true,
  },
  {
    name: 'justgiving',
    color: 'AD29B6',
    colorIcon: false,
  },
  {
    name: 'kaggle',
    color: '20BEFF',
    colorIcon: true,
  },
  {
    name: 'kaios',
    color: '6F02B5',
    colorIcon: false,
  },
  {
    name: 'kentico',
    color: 'F05A22',
    colorIcon: true,
  },
  {
    name: 'keybase',
    color: '33A0FF',
    colorIcon: true,
  },
  {
    name: 'keycdn',
    color: '3686BE',
    colorIcon: true,
  },
  {
    name: 'khanacademy',
    color: '9DB63B',
    colorIcon: false,
  },
  {
    name: 'kibana',
    color: '005571',
    colorIcon: false,
  },
  {
    name: 'kickstarter',
    color: '2BDE73',
    colorIcon: true,
  },
  {
    name: 'kik',
    color: '82BC23',
    colorIcon: true,
  },
  {
    name: 'kirby',
    color: 'FF0100',
    colorIcon: false,
  },
  {
    name: 'klout',
    color: 'E44600',
    colorIcon: true,
  },
  {
    name: 'known',
    color: '333333',
    colorIcon: false,
  },
  {
    name: 'ko-fi',
    color: 'F16061',
    colorIcon: true,
  },
  {
    name: 'kodi',
    color: '17B2E7',
    colorIcon: true,
  },
  {
    name: 'koding',
    color: '00B057',
    colorIcon: true,
  },
  {
    name: 'kotlin',
    color: '0095D5',
    colorIcon: true,
  },
  {
    name: 'kubernetes',
    color: '326CE5',
    colorIcon: true,
  },
  {
    name: 'lanyrd',
    color: '3C80CA',
    colorIcon: false,
  },
  {
    name: 'laravel',
    color: 'E74430',
    colorIcon: true,
  },
  {
    name: 'laravelhorizon',
    color: '405263',
    colorIcon: false,
  },
  {
    name: 'last.fm',
    color: 'D51007',
    colorIcon: false,
  },
  {
    name: 'launchpad',
    color: 'F8C300',
    colorIcon: true,
  },
  {
    name: 'leetcode',
    color: 'F89F1B',
    colorIcon: true,
  },
  {
    name: 'letsencrypt',
    color: '003A70',
    colorIcon: false,
  },
  {
    name: 'letterboxd',
    color: '00D735',
    colorIcon: true,
  },
  {
    name: 'lgtm',
    color: 'FFFFFF',
    colorIcon: false,
  },
  {
    name: 'liberapay',
    color: 'F6C915',
    colorIcon: true,
  },
  {
    name: 'librarything',
    color: '251A15',
    colorIcon: false,
  },
  {
    name: 'line',
    color: '00C300',
    colorIcon: true,
  },
  {
    name: 'linewebtoon',
    color: '00D564',
    colorIcon: false,
  },
  {
    name: 'linkedin',
    color: '0077B5',
    colorIcon: false,
  },
  {
    name: 'linux',
    color: 'FCC624',
    colorIcon: true,
  },
  {
    name: 'linuxfoundation',
    color: '009BEE',
    colorIcon: false,
  },
  {
    name: 'linuxmint',
    color: '87CF3E',
    colorIcon: false,
  },
  {
    name: 'livejournal',
    color: '00B0EA',
    colorIcon: true,
  },
  {
    name: 'livestream',
    color: 'CF202E',
    colorIcon: false,
  },
  {
    name: 'logstash',
    color: '005571',
    colorIcon: false,
  },
  {
    name: 'lua',
    color: '2C2D72',
    colorIcon: false,
  },
  {
    name: 'mac',
    color: '999999',
    colorIcon: true,
  },
  {
    name: 'macys',
    color: 'E21A2C',
    colorIcon: false,
  },
  {
    name: 'magento',
    color: 'EE672F',
    colorIcon: true,
  },
  {
    name: 'magisk',
    color: '00AF9C',
    colorIcon: true,
  },
  {
    name: 'mail.ru',
    color: '168DE2',
    colorIcon: true,
  },
  {
    name: 'mailchimp',
    color: 'FFE01B',
    colorIcon: true,
  },
  {
    name: 'makerbot',
    color: 'FF1E0D',
    colorIcon: false,
  },
  {
    name: 'manjaro',
    color: '35BF5C',
    colorIcon: true,
  },
  {
    name: 'mariadb',
    color: '003545',
    colorIcon: false,
  },
  {
    name: 'markdown',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'marketo',
    color: '5C4C9F',
    colorIcon: false,
  },
  {
    name: 'mastercard',
    color: 'EB001B',
    colorIcon: false,
  },
  {
    name: 'mastodon',
    color: '3088D4',
    colorIcon: true,
  },
  {
    name: 'materialdesign',
    color: '757575',
    colorIcon: false,
  },
  {
    name: 'mathworks',
    color: '0076A8',
    colorIcon: false,
  },
  {
    name: 'matrix',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'matternet',
    color: '261C29',
    colorIcon: false,
  },
  {
    name: 'mediafire',
    color: '1299F3',
    colorIcon: true,
  },
  {
    name: 'mediatemple',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'medium',
    color: '12100E',
    colorIcon: false,
  },
  {
    name: 'meetup',
    color: 'ED1C40',
    colorIcon: false,
  },
  {
    name: 'mega',
    color: 'D9272E',
    colorIcon: false,
  },
  {
    name: 'messenger',
    color: '00B2FF',
    colorIcon: true,
  },
  {
    name: 'meteor',
    color: 'DE4F4F',
    colorIcon: true,
  },
  {
    name: 'micro.blog',
    color: 'FD8308',
    colorIcon: true,
  },
  {
    name: 'microgenetics',
    color: 'FF0000',
    colorIcon: false,
  },
  {
    name: 'microsoft',
    color: '666666',
    colorIcon: false,
  },
  {
    name: 'microsoft-access',
    color: 'BA141A',
    colorIcon: false,
  },
  {
    name: 'microsoft-azure',
    color: '0089D6',
    colorIcon: true,
  },
  {
    name: 'microsoft-edge',
    color: '0078D7',
    colorIcon: false,
  },
  {
    name: 'microsoft-excel',
    color: '217346',
    colorIcon: false,
  },
  {
    name: 'microsoft-onedrive',
    color: '094AB2',
    colorIcon: false,
  },
  {
    name: 'microsoft-onenote',
    color: '80397B',
    colorIcon: false,
  },
  {
    name: 'microsoft-outlook',
    color: '0072C6',
    colorIcon: false,
  },
  {
    name: 'microsoft-powerpoint',
    color: 'D24726',
    colorIcon: false,
  },
  {
    name: 'microsoft-word',
    color: '2B579A',
    colorIcon: false,
  },
  {
    name: 'minutemailer',
    color: '3ABFE6',
    colorIcon: true,
  },
  {
    name: 'mix',
    color: 'FF8126',
    colorIcon: true,
  },
  {
    name: 'mixcloud',
    color: '314359',
    colorIcon: false,
  },
  {
    name: 'mixer',
    color: '002050',
    colorIcon: false,
  },
  {
    name: 'monero',
    color: 'FF6600',
    colorIcon: true,
  },
  {
    name: 'mongodb',
    color: '47A248',
    colorIcon: true,
  },
  {
    name: 'monkeytie',
    color: 'FFC619',
    colorIcon: false,
  },
  {
    name: 'monogram',
    color: 'FDB22A',
    colorIcon: true,
  },
  {
    name: 'monzo',
    color: '14233C',
    colorIcon: false,
  },
  {
    name: 'moo',
    color: '00945E',
    colorIcon: false,
  },
  {
    name: 'mozilla',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'mozilla-firefox',
    color: 'FF9400',
    colorIcon: true,
  },
  {
    name: 'mxlinux',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'myspace',
    color: '030303',
    colorIcon: false,
  },
  {
    name: 'mysql',
    color: '4479A1',
    colorIcon: true,
  },
  {
    name: 'nativescript',
    color: '3655FF',
    colorIcon: false,
  },
  {
    name: 'neo4j',
    color: '008CC1',
    colorIcon: true,
  },
  {
    name: 'nestjs',
    color: 'EA2845',
    colorIcon: false,
  },
  {
    name: 'netflix',
    color: 'E50914',
    colorIcon: false,
  },
  {
    name: 'netlify',
    color: '00C7B7',
    colorIcon: true,
  },
  {
    name: 'next.js',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'nextcloud',
    color: '0082C9',
    colorIcon: false,
  },
  {
    name: 'nextdoor',
    color: '00B246',
    colorIcon: true,
  },
  {
    name: 'nginx',
    color: '009639',
    colorIcon: false,
  },
  {
    name: 'nintendo',
    color: '8F8F8F',
    colorIcon: true,
  },
  {
    name: 'nintendo-gamecube',
    color: '6A5FBB',
    colorIcon: true,
  },
  {
    name: 'nintendo-switch',
    color: 'E60012',
    colorIcon: false,
  },
  {
    name: 'node.js',
    color: '339933',
    colorIcon: true,
  },
  {
    name: 'nodemon',
    color: '76D04B',
    colorIcon: true,
  },
  {
    name: 'npm',
    color: 'CB3837',
    colorIcon: true,
  },
  {
    name: 'nucleo',
    color: '766DCC',
    colorIcon: true,
  },
  {
    name: 'nuget',
    color: '004880',
    colorIcon: false,
  },
  {
    name: 'nuxt.js',
    color: '00C58E',
    colorIcon: true,
  },
  {
    name: 'nvidia',
    color: '76B900',
    colorIcon: true,
  },
  {
    name: 'ocaml',
    color: 'EC6813',
    colorIcon: true,
  },
  {
    name: 'octopus-deploy',
    color: '2F93E0',
    colorIcon: true,
  },
  {
    name: 'oculus',
    color: '1C1E20',
    colorIcon: false,
  },
  {
    name: 'odnoklassniki',
    color: 'F4731C',
    colorIcon: true,
  },
  {
    name: 'openai',
    color: '412991',
    colorIcon: false,
  },
  {
    name: 'openapi',
    color: '6BA539',
    colorIcon: false,
  },
  {
    name: 'opencv',
    color: '5C3EE8',
    colorIcon: false,
  },
  {
    name: 'open-access',
    color: 'F68212',
    colorIcon: true,
  },
  {
    name: 'openstreetmap',
    color: '7EBC6F',
    colorIcon: true,
  },
  {
    name: 'opensuse',
    color: '73BA25',
    colorIcon: true,
  },
  {
    name: 'opera',
    color: 'FF1B2D',
    colorIcon: false,
  },
  {
    name: 'opsgenie',
    color: '172B4D',
    colorIcon: false,
  },
  {
    name: 'oracle',
    color: 'F80000',
    colorIcon: false,
  },
  {
    name: 'origin',
    color: 'F56C2D',
    colorIcon: true,
  },
  {
    name: 'osmc',
    color: '17394A',
    colorIcon: false,
  },
  {
    name: 'overcast',
    color: 'FC7E0F',
    colorIcon: true,
  },
  {
    name: 'ovh',
    color: '123F6D',
    colorIcon: true,
  },
  {
    name: 'pagekit',
    color: '212121',
    colorIcon: false,
  },
  {
    name: 'pandora',
    color: '005483',
    colorIcon: false,
  },
  {
    name: 'pantheon',
    color: 'EFD01B',
    colorIcon: true,
  },
  {
    name: 'patreon',
    color: 'F96854',
    colorIcon: true,
  },
  {
    name: 'paypal',
    color: '00457C',
    colorIcon: true,
  },
  {
    name: 'periscope',
    color: '40A4C4',
    colorIcon: true,
  },
  {
    name: 'perl',
    color: '39457E',
    colorIcon: false,
  },
  {
    name: 'php',
    color: '777BB4',
    colorIcon: true,
  },
  {
    name: 'phpmyadmin',
    color: '6C78AF',
    colorIcon: true,
  },
  {
    name: 'picarto.tv',
    color: '1DA456',
    colorIcon: true,
  },
  {
    name: 'pinboard',
    color: '0000FF',
    colorIcon: false,
  },
  {
    name: 'pingdom',
    color: 'FFF000',
    colorIcon: true,
  },
  {
    name: 'pingup',
    color: '00B1AB',
    colorIcon: true,
  },
  {
    name: 'pinterest',
    color: 'BD081C',
    colorIcon: false,
  },
  {
    name: 'pivotal-tracker',
    color: '517A9E',
    colorIcon: true,
  },
  {
    name: 'plangrid',
    color: '0085DE',
    colorIcon: true,
  },
  {
    name: 'player.me',
    color: 'C0379A',
    colorIcon: true,
  },
  {
    name: 'playstation',
    color: '003791',
    colorIcon: false,
  },
  {
    name: 'playstation-3',
    color: '003791',
    colorIcon: false,
  },
  {
    name: 'playstation-4',
    color: '003791',
    colorIcon: false,
  },
  {
    name: 'plex',
    color: 'E5A00D',
    colorIcon: true,
  },
  {
    name: 'pluralsight',
    color: 'F15B2A',
    colorIcon: true,
  },
  {
    name: 'plurk',
    color: 'FF574D',
    colorIcon: true,
  },
  {
    name: 'pocket',
    color: 'EF3F56',
    colorIcon: true,
  },
  {
    name: 'podcasts',
    color: '9933CC',
    colorIcon: false,
  },
  {
    name: 'postgresql',
    color: '336791',
    colorIcon: false,
  },
  {
    name: 'postman',
    color: 'FF6C37',
    colorIcon: true,
  },
  {
    name: 'powershell',
    color: '5391FE',
    colorIcon: true,
  },
  {
    name: 'prettier',
    color: 'F7B93E',
    colorIcon: true,
  },
  {
    name: 'prisma',
    color: '2D3748',
    colorIcon: false,
  },
  {
    name: 'prismic',
    color: '484A7A',
    colorIcon: false,
  },
  {
    name: 'probot',
    color: '00B0D8',
    colorIcon: true,
  },
  {
    name: 'processwire',
    color: 'EF145F',
    colorIcon: false,
  },
  {
    name: 'product-hunt',
    color: 'DA552F',
    colorIcon: true,
  },
  {
    name: 'proto.io',
    color: '34A7C1',
    colorIcon: true,
  },
  {
    name: 'protonmail',
    color: '8B89CC',
    colorIcon: true,
  },
  {
    name: 'proxmox',
    color: 'E57000',
    colorIcon: true,
  },
  {
    name: 'pypi',
    color: '3775A9',
    colorIcon: true,
  },
  {
    name: 'python',
    color: '3776AB',
    colorIcon: true,
  },
  {
    name: 'qiita',
    color: '55C500',
    colorIcon: true,
  },
  {
    name: 'qualcomm',
    color: '3253DC',
    colorIcon: false,
  },
  {
    name: 'quantcast',
    color: '1E262C',
    colorIcon: false,
  },
  {
    name: 'quantopian',
    color: 'C50000',
    colorIcon: false,
  },
  {
    name: 'quora',
    color: 'B92B27',
    colorIcon: false,
  },
  {
    name: 'qwiklabs',
    color: 'F5CD0E',
    colorIcon: true,
  },
  {
    name: 'qzone',
    color: 'FECE00',
    colorIcon: true,
  },
  {
    name: 'r',
    color: '276DC3',
    colorIcon: false,
  },
  {
    name: 'rails',
    color: 'CC0000',
    colorIcon: false,
  },
  {
    name: 'raspberry-pi',
    color: 'C51A4A',
    colorIcon: false,
  },
  {
    name: 'react',
    color: '61DAFB',
    colorIcon: true,
  },
  {
    name: 'read-the-docs',
    color: '8CA1AF',
    colorIcon: true,
  },
  {
    name: 'reason',
    color: 'DD4B39',
    colorIcon: true,
  },
  {
    name: 'redbubble',
    color: 'E41321',
    colorIcon: false,
  },
  {
    name: 'reddit',
    color: 'FF4500',
    colorIcon: true,
  },
  {
    name: 'red-hat',
    color: 'EE0000',
    colorIcon: false,
  },
  {
    name: 'redis',
    color: 'D82C20',
    colorIcon: true,
  },
  {
    name: 'redux',
    color: '764ABC',
    colorIcon: false,
  },
  {
    name: 'renren',
    color: '217DC6',
    colorIcon: true,
  },
  {
    name: 'reverbnation',
    color: 'E43526',
    colorIcon: true,
  },
  {
    name: 'riot',
    color: '368BD6',
    colorIcon: true,
  },
  {
    name: 'riseup',
    color: '5E9EE3',
    colorIcon: true,
  },
  {
    name: 'rollup.js',
    color: 'EC4A3F',
    colorIcon: true,
  },
  {
    name: 'roots',
    color: '525DDC',
    colorIcon: true,
  },
  {
    name: 'rss',
    color: 'FFA500',
    colorIcon: true,
  },
  {
    name: 'ruby',
    color: 'CC342D',
    colorIcon: false,
  },
  {
    name: 'rubygems',
    color: 'E9573F',
    colorIcon: true,
  },
  {
    name: 'runkeeper',
    color: '2DC9D7',
    colorIcon: true,
  },
  {
    name: 'rust',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'safari',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'salesforce',
    color: '00A1E0',
    colorIcon: true,
  },
  {
    name: 'samsung',
    color: '1428A0',
    colorIcon: false,
  },
  {
    name: 'samsung-pay',
    color: '1428A0',
    colorIcon: false,
  },
  {
    name: 'sap',
    color: '008FD3',
    colorIcon: true,
  },
  {
    name: 'sass',
    color: 'CC6699',
    colorIcon: true,
  },
  {
    name: 'sauce-labs',
    color: 'E2231A',
    colorIcon: false,
  },
  {
    name: 'scala',
    color: 'DC322F',
    colorIcon: false,
  },
  {
    name: 'scaleway',
    color: '4F0599',
    colorIcon: false,
  },
  {
    name: 'scribd',
    color: '1A7BBA',
    colorIcon: false,
  },
  {
    name: 'scrutinizer-ci',
    color: '8A9296',
    colorIcon: true,
  },
  {
    name: 'sega',
    color: '0089CF',
    colorIcon: true,
  },
  {
    name: 'selenium',
    color: '43B02A',
    colorIcon: true,
  },
  {
    name: 'sellfy',
    color: '21B352',
    colorIcon: true,
  },
  {
    name: 'sensu',
    color: '89C967',
    colorIcon: true,
  },
  {
    name: 'sentry',
    color: 'FB4226',
    colorIcon: true,
  },
  {
    name: 'serverfault',
    color: 'E7282D',
    colorIcon: true,
  },
  {
    name: 'shazam',
    color: '0088FF',
    colorIcon: true,
  },
  {
    name: 'shopify',
    color: '7AB55C',
    colorIcon: true,
  },
  {
    name: 'signal',
    color: '2592E9',
    colorIcon: true,
  },
  {
    name: 'simple-icons',
    color: '111111',
    colorIcon: false,
  },
  {
    name: 'sina-weibo',
    color: 'E6162D',
    colorIcon: false,
  },
  {
    name: 'sitepoint',
    color: '258AAF',
    colorIcon: true,
  },
  {
    name: 'skyliner',
    color: '2FCEA0',
    colorIcon: true,
  },
  {
    name: 'skype',
    color: '00AFF0',
    colorIcon: true,
  },
  {
    name: 'slack',
    color: '4A154B',
    colorIcon: false,
  },
  {
    name: 'slashdot',
    color: '026664',
    colorIcon: false,
  },
  {
    name: 'slickpic',
    color: 'FF880F',
    colorIcon: true,
  },
  {
    name: 'slides',
    color: 'E4637C',
    colorIcon: true,
  },
  {
    name: 'smashing-magazine',
    color: 'E85C33',
    colorIcon: true,
  },
  {
    name: 'snapchat',
    color: 'FFFC00',
    colorIcon: true,
  },
  {
    name: 'snapcraft',
    color: '82BEA0',
    colorIcon: true,
  },
  {
    name: 'snyk',
    color: '4C4A73',
    colorIcon: false,
  },
  {
    name: 'society6',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'sogou',
    color: 'FB6022',
    colorIcon: true,
  },
  {
    name: 'songkick',
    color: 'F80046',
    colorIcon: false,
  },
  {
    name: 'soundcloud',
    color: 'FF3300',
    colorIcon: true,
  },
  {
    name: 'sourceforge',
    color: '535353',
    colorIcon: true,
  },
  {
    name: 'sourcegraph',
    color: '00B4F2',
    colorIcon: true,
  },
  {
    name: 'spacemacs',
    color: '9266CC',
    colorIcon: true,
  },
  {
    name: 'spacex',
    color: '005288',
    colorIcon: false,
  },
  {
    name: 'sparkfun',
    color: 'E53525',
    colorIcon: true,
  },
  {
    name: 'sparkpost',
    color: 'FA6423',
    colorIcon: true,
  },
  {
    name: 'spdx',
    color: '4398CC',
    colorIcon: true,
  },
  {
    name: 'speaker-deck',
    color: '339966',
    colorIcon: true,
  },
  {
    name: 'spotify',
    color: '1ED760',
    colorIcon: true,
  },
  {
    name: 'spotlight',
    color: '352A71',
    colorIcon: false,
  },
  {
    name: 'spreaker',
    color: 'F5C300',
    colorIcon: true,
  },
  {
    name: 'sprint',
    color: 'FFCE0A',
    colorIcon: true,
  },
  {
    name: 'sqlite',
    color: '003B57',
    colorIcon: false,
  },
  {
    name: 'squarespace',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'stackexchange',
    color: '1E5397',
    colorIcon: true,
  },
  {
    name: 'stackoverflow',
    color: 'FE7A16',
    colorIcon: true,
  },
  {
    name: 'stackshare',
    color: '0690FA',
    colorIcon: true,
  },
  {
    name: 'stadia',
    color: 'CD2640',
    colorIcon: false,
  },
  {
    name: 'statamic',
    color: '1F3641',
    colorIcon: false,
  },
  {
    name: 'staticman',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'statuspage',
    color: '172B4D',
    colorIcon: false,
  },
  {
    name: 'steam',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'steem',
    color: '4BA2F2',
    colorIcon: true,
  },
  {
    name: 'steemit',
    color: '06D6A9',
    colorIcon: true,
  },
  {
    name: 'stitcher',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'storify',
    color: '3A98D9',
    colorIcon: true,
  },
  {
    name: 'strapi',
    color: '2F2E8B',
    colorIcon: false,
  },
  {
    name: 'strava',
    color: 'FC4C02',
    colorIcon: true,
  },
  {
    name: 'stripe',
    color: '008CDD',
    colorIcon: true,
  },
  {
    name: 'stubhub',
    color: '003168',
    colorIcon: false,
  },
  {
    name: 'styleshare',
    color: '212121',
    colorIcon: false,
  },
  {
    name: 'stylus',
    color: '333333',
    colorIcon: false,
  },
  {
    name: 'sublime-text',
    color: '272822',
    colorIcon: true,
  },
  {
    name: 'subversion',
    color: '809CC9',
    colorIcon: true,
  },
  {
    name: 'superuser',
    color: '2EACE3',
    colorIcon: true,
  },
  {
    name: 'swarm',
    color: 'FFA633',
    colorIcon: true,
  },
  {
    name: 'swift',
    color: 'FA7343',
    colorIcon: true,
  },
  {
    name: 'symfony',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'synology',
    color: 'B6B5B6',
    colorIcon: false,
  },
  {
    name: 't-mobile',
    color: 'E20074',
    colorIcon: false,
  },
  {
    name: 'tails',
    color: '56347C',
    colorIcon: false,
  },
  {
    name: 'tailwind-css',
    color: '56347C',
    colorIcon: true,
  },
  {
    name: 'tapas',
    color: 'FFCE00',
    colorIcon: true,
  },
  {
    name: 'teamviewer',
    color: '0E8EE9',
    colorIcon: true,
  },
  {
    name: 'ted',
    color: 'E62B1E',
    colorIcon: false,
  },
  {
    name: 'teespring',
    color: '39ACE6',
    colorIcon: true,
  },
  {
    name: 'telegram',
    color: '2CA5E0',
    colorIcon: true,
  },
  {
    name: 'tencent-qq',
    color: 'EB1923',
    colorIcon: false,
  },
  {
    name: 'tencent-weibo',
    color: '20B8E5',
    colorIcon: true,
  },
  {
    name: 'tesla',
    color: 'CC0000',
    colorIcon: false,
  },
  {
    name: 'the-mighty',
    color: 'D0072A',
    colorIcon: false,
  },
  {
    name: 'the-movie-database',
    color: '01D277',
    colorIcon: true,
  },
  {
    name: 'tidal',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'tik-tok',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'tinder',
    color: 'FF6B6B',
    colorIcon: true,
  },
  {
    name: 'todoist',
    color: 'E44332',
    colorIcon: true,
  },
  {
    name: 'toggl',
    color: 'E01B22',
    colorIcon: false,
  },
  {
    name: 'topcoder',
    color: '29A8E0',
    colorIcon: true,
  },
  {
    name: 'toptal',
    color: '3863A0',
    colorIcon: false,
  },
  {
    name: 'tor',
    color: '7E4798',
    colorIcon: false,
  },
  {
    name: 'trainerroad',
    color: 'E12726',
    colorIcon: false,
  },
  {
    name: 'trakt',
    color: 'ED1C24',
    colorIcon: false,
  },
  {
    name: 'travis-ci',
    color: '3EAAAF',
    colorIcon: false,
  },
  {
    name: 'treehouse',
    color: '5FCF80',
    colorIcon: true,
  },
  {
    name: 'trello',
    color: '0079BF',
    colorIcon: false,
  },
  {
    name: 'tripadvisor',
    color: '00AF87',
    colorIcon: true,
  },
  {
    name: 'trulia',
    color: '53B50A',
    colorIcon: true,
  },
  {
    name: 'tumblr',
    color: '36465D',
    colorIcon: false,
  },
  {
    name: 'turborepo',
    color: 'EF4444',
    colorIcon: true,
  },
  {
    name: 'twilio',
    color: 'F22F46',
    colorIcon: true,
  },
  {
    name: 'twitch',
    color: '6441A4',
    colorIcon: true,
  },
  {
    name: 'twitter',
    color: '1DA1F2',
    colorIcon: true,
  },
  {
    name: 'twoo',
    color: 'FF7102',
    colorIcon: true,
  },
  {
    name: 'typescript',
    color: '007ACC',
    colorIcon: true,
  },
  {
    name: 'typo3',
    color: 'FF8700',
    colorIcon: true,
  },
  {
    name: 'uber',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'ubisoft',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'ubuntu',
    color: 'E95420',
    colorIcon: true,
  },
  {
    name: 'udacity',
    color: '01B3E3',
    colorIcon: true,
  },
  {
    name: 'udemy',
    color: 'EC5252',
    colorIcon: true,
  },
  {
    name: 'uikit',
    color: '2396F3',
    colorIcon: true,
  },
  {
    name: 'umbraco',
    color: '00BEC1',
    colorIcon: true,
  },
  {
    name: 'unity',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'unsplash',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'untappd',
    color: 'FFC000',
    colorIcon: true,
  },
  {
    name: 'upwork',
    color: '6FDA44',
    colorIcon: true,
  },
  {
    name: 'v8',
    color: '4B8BF5',
    colorIcon: true,
  },
  {
    name: 'vagrant',
    color: '1563FF',
    colorIcon: false,
  },
  {
    name: 'venmo',
    color: '3D95CE',
    colorIcon: true,
  },
  {
    name: 'vercel',
    color: '000000',
    colorIcon: true,
  },
  {
    name: 'verizon',
    color: 'CD040B',
    colorIcon: false,
  },
  {
    name: 'viadeo',
    color: 'F88D2D',
    colorIcon: true,
  },
  {
    name: 'viber',
    color: '665CAC',
    colorIcon: true,
  },
  {
    name: 'vim',
    color: '019733',
    colorIcon: false,
  },
  {
    name: 'vimeo',
    color: '1AB7EA',
    colorIcon: true,
  },
  {
    name: 'vine',
    color: '11B48A',
    colorIcon: true,
  },
  {
    name: 'virb',
    color: '0093DA',
    colorIcon: true,
  },
  {
    name: 'visa',
    color: '142787',
    colorIcon: false,
  },
  {
    name: 'visual-studio-code',
    color: '007ACC',
    colorIcon: false,
  },
  {
    name: 'vk',
    color: '6383A8',
    colorIcon: true,
  },
  {
    name: 'vlc-media-player',
    color: 'FF8800',
    colorIcon: true,
  },
  {
    name: 'vsco',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'vue.js',
    color: '4FC08D',
    colorIcon: true,
  },
  {
    name: 'wattpad',
    color: 'F68D12',
    colorIcon: true,
  },
  {
    name: 'weasyl',
    color: '990000',
    colorIcon: false,
  },
  {
    name: 'webassembly',
    color: '654FF0',
    colorIcon: true,
  },
  {
    name: 'webcomponents.org',
    color: '29ABE2',
    colorIcon: true,
  },
  {
    name: 'webpack',
    color: '8DD6F9',
    colorIcon: true,
  },
  {
    name: 'webstorm',
    color: '00CDD7',
    colorIcon: false,
  },
  {
    name: 'wechat',
    color: '7BB32E',
    colorIcon: true,
  },
  {
    name: 'whatsapp',
    color: '25D366',
    colorIcon: true,
  },
  {
    name: 'when-i-work',
    color: '51A33D',
    colorIcon: true,
  },
  {
    name: 'wii',
    color: '8B8B8B',
    colorIcon: true,
  },
  {
    name: 'wii-u',
    color: '8B8B8B',
    colorIcon: true,
  },
  {
    name: 'wikipedia',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'windows',
    color: '0078D6',
    colorIcon: false,
  },
  {
    name: 'wire',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'wix',
    color: 'FAAD4D',
    colorIcon: false,
  },
  {
    name: 'wolfram',
    color: 'DD1100',
    colorIcon: false,
  },
  {
    name: 'wolfram-language',
    color: 'DD1100',
    colorIcon: false,
  },
  {
    name: 'wolfram-mathematica',
    color: 'DD1100',
    colorIcon: false,
  },
  {
    name: 'wordpress',
    color: '21759B',
    colorIcon: false,
  },
  {
    name: 'wpengine',
    color: '40BAC8',
    colorIcon: false,
  },
  {
    name: 'x-pack',
    color: '005571',
    colorIcon: false,
  },
  {
    name: 'xbox',
    color: '107C10',
    colorIcon: false,
  },
  {
    name: 'xcode',
    color: '1575F9',
    colorIcon: true,
  },
  {
    name: 'xero',
    color: '13B5EA',
    colorIcon: true,
  },
  {
    name: 'xing',
    color: '006567',
    colorIcon: false,
  },
  {
    name: 'xsplit',
    color: '0095DE',
    colorIcon: true,
  },
  {
    name: 'yahoo!',
    color: '440099',
    colorIcon: false,
  },
  {
    name: 'yammer',
    color: '0072C6',
    colorIcon: false,
  },
  {
    name: 'yandex',
    color: 'FF0000',
    colorIcon: false,
  },
  {
    name: 'yarn',
    color: '2C8EBB',
    colorIcon: true,
  },
  {
    name: 'y-combinator',
    color: 'F0652F',
    colorIcon: true,
  },
  {
    name: 'yelp',
    color: 'D32323',
    colorIcon: false,
  },
  {
    name: 'youtube',
    color: 'FF0000',
    colorIcon: false,
  },
  {
    name: 'zapier',
    color: 'FF4A00',
    colorIcon: true,
  },
  {
    name: 'zeit',
    color: '000000',
    colorIcon: false,
  },
  {
    name: 'zendesk',
    color: '03363D',
    colorIcon: false,
  },
  {
    name: 'zenn',
    color: '3EA8FF',
    colorIcon: false,
  },
  {
    name: 'zerply',
    color: '9DBC7A',
    colorIcon: true,
  },
  {
    name: 'zig',
    color: 'F7A41D',
    colorIcon: true,
  },
  {
    name: 'zillow',
    color: '0074E4',
    colorIcon: false,
  },
  {
    name: 'zorin',
    color: '0CC1F3',
    colorIcon: true,
  },
  {
    name: '画像処理',
    color: '5C3EE8',
    colorIcon: false,
  },
];

const icons = new Map<string, BlandColor>();
for (const item of iconsData) {
  icons.set(item.name, item);
}

const Badge = ({ keyword, classNmae }: BadgeProp) => {
  let type = 'flat-square';
  let color = '2f2f2f';
  let logo = '';
  let data = null;
  const reg = /[^a-z|^0-9]/gi;
  while (1) {
    let key = keyword.toLowerCase();
    if (icons.has(key)) {
      data = icons.get(key);
      if (!data) {
        data = null;
        break;
      }
      data.defaultLogo = key;
      break;
    }
    key = keyword.replace(reg, '').toLowerCase();
    if (icons.has(key)) {
      data = icons.get(key);
      if (!data) {
        data = null;
        break;
      }
      data.defaultLogo = key;
      break;
    }
    break;
  }
  if (data !== null && data.defaultLogo) {
    logo = data.defaultLogo;
    if (!data.colorIcon) {
      color = data.color;
    }
  }
  keyword = encodeURI(keyword.split('-').join(' '));
  const src = `https://img.shields.io/badge/${keyword}-${color}.svg?style=${type}&logo=${logo}`;
  return (
    <img className={classNmae + ' m-1 rounded h-5'} src={src} alt={keyword} />
  );
};

export default Badge;
