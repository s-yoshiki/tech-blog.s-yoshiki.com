import React from 'react'
import PropTypes from 'prop-types'

import style from '../styles/badge.module.css'

  
const icons = {
  "500px": {
    "color": "0099E5",
    "colorIcon": true
  },
  "about.me": {
    "color": "00A98F",
    "colorIcon": true
  },
  "acm": {
    "color": "0085CA",
    "colorIcon": false
  },
  "addthis": {
    "color": "FF6550",
    "colorIcon": true
  },
  "adobe": {
    "color": "FF0000",
    "colorIcon": false
  },
  "adobe-acrobat-reader": {
    "color": "EE3F24",
    "colorIcon": true
  },
  "adobe-aftere-ffects": {
    "color": "D291FF",
    "colorIcon": true
  },
  "adobe-audition": {
    "color": "00E4BB",
    "colorIcon": true
  },
  "adobe-creative-cloud": {
    "color": "D41818",
    "colorIcon": false
  },
  "adobe-dreamweaver": {
    "color": "35FA00",
    "colorIcon": true
  },
  "adobe-illustrator": {
    "color": "FF7C00",
    "colorIcon": true
  },
  "adobe-indesign": {
    "color": "FD3F93",
    "colorIcon": true
  },
  "adobe-lightroom-cc": {
    "color": "3DF0F0",
    "colorIcon": true
  },
  "adobe-lightroom-classic": {
    "color": "ADD5EC",
    "colorIcon": true
  },
  "adobe-photoshop": {
    "color": "00C8FF",
    "colorIcon": true
  },
  "adobe-premiere": {
    "color": "EA77FF",
    "colorIcon": true
  },
  "adobe-typekit": {
    "color": "87EC00",
    "colorIcon": true
  },
  "adobe-xd": {
    "color": "FF2BC2",
    "colorIcon": true
  },
  "airbnb": {
    "color": "FF5A5F",
    "colorIcon": true
  },
  "allocine": {
    "color": "FECC00",
    "colorIcon": false
  },
  "amazon": {
    "color": "FF9900",
    "colorIcon": true
  },
  "amazon-aws": {
    "color": "232F3E",
    "colorIcon": false
  },
  "amd": {
    "color": "ED1C24",
    "colorIcon": false
  },
  "americanexpress": {
    "color": "2E77BC",
    "colorIcon": false
  },
  "android": {
    "color": "A4C639",
    "colorIcon": true
  },
  "angellist": {
    "color": "000000",
    "colorIcon": false
  },
  "angular": {
    "color": "DD0031",
    "colorIcon": false
  },
  "angularuniversal": {
    "color": "00ACC1",
    "colorIcon": false
  },
  "ansible": {
    "color": "EE0000",
    "colorIcon": false
  },
  "apache": {
    "color": "D22128",
    "colorIcon": false
  },
  "apple": {
    "color": "999999",
    "colorIcon": true
  },
  "apple-music": {
    "color": "000000",
    "colorIcon": false
  },
  "apple-pay": {
    "color": "000000",
    "colorIcon": false
  },
  "appveyor": {
    "color": "00B3E0",
    "colorIcon": true
  },
  "archiveofourown": {
    "color": "990000",
    "colorIcon": false
  },
  "archlinux": {
    "color": "1793D1",
    "colorIcon": false
  },
  "arduino": {
    "color": "00979D",
    "colorIcon": true
  },
  "artstation": {
    "color": "13AFF0",
    "colorIcon": true
  },
  "asana": {
    "color": "273347",
    "colorIcon": false
  },
  "at-and-t": {
    "color": "00A8E0",
    "colorIcon": false
  },
  "atlassian": {
    "color": "0052CC",
    "colorIcon": false
  },
  "atom": {
    "color": "66595C",
    "colorIcon": false
  },
  "audible": {
    "color": "F8991C",
    "colorIcon": true
  },
  "aurelia": {
    "color": "ED2B88",
    "colorIcon": true
  },
  "auth0": {
    "color": "EB5424",
    "colorIcon": true
  },
  "automatic": {
    "color": "7D8084",
    "colorIcon": true
  },
  "autotask": {
    "color": "E51937",
    "colorIcon": false
  },
  "aventrix": {
    "color": "0099DD",
    "colorIcon": true
  },
  "azure-devops": {
    "color": "0078D7",
    "colorIcon": false
  },
  "azure-pipelines": {
    "color": "2560E0",
    "colorIcon": false
  },
  "babel": {
    "color": "F9DC3E",
    "colorIcon": true
  },
  "baidu": {
    "color": "2319DC",
    "colorIcon": false
  },
  "bamboo": {
    "color": "0052CC",
    "colorIcon": false
  },
  "bandcamp": {
    "color": "408294",
    "colorIcon": true
  },
  "basecamp": {
    "color": "5ECC62",
    "colorIcon": true
  },
  "bathasu": {
    "color": "00A3E0",
    "colorIcon": false
  },
  "beats": {
    "color": "005571",
    "colorIcon": false
  },
  "behance": {
    "color": "1769FF",
    "colorIcon": false
  },
  "bigcartel": {
    "color": "222222",
    "colorIcon": false
  },
  "bing": {
    "color": "008373",
    "colorIcon": false
  },
  "bit": {
    "color": "73398D",
    "colorIcon": false
  },
  "bitbucket": {
    "color": "0052CC",
    "colorIcon": false
  },
  "bitcoin": {
    "color": "F7931A",
    "colorIcon": true
  },
  "bitdefender": {
    "color": "ED1C24",
    "colorIcon": false
  },
  "bitly": {
    "color": "EE6123",
    "colorIcon": true
  },
  "blender": {
    "color": "F5792A",
    "colorIcon": true
  },
  "blogger": {
    "color": "FF5722",
    "colorIcon": true
  },
  "boost": {
    "color": "F69220",
    "colorIcon": true
  },
  "bootstrap": {
    "color": "563D7C",
    "colorIcon": false
  },
  "bower": {
    "color": "EF5734",
    "colorIcon": true
  },
  "brand.ai": {
    "color": "0AA0FF",
    "colorIcon": true
  },
  "buddy": {
    "color": "1A86FD",
    "colorIcon": true
  },
  "buffer": {
    "color": "168EEA",
    "colorIcon": true
  },
  "buymeacoffee": {
    "color": "FF813F",
    "colorIcon": false
  },
  "buzzfeed": {
    "color": "EE3322",
    "colorIcon": true
  },
  "cakephp": {
    "color": "D33C43",
    "colorIcon": true
  },
  "campaignmonitor": {
    "color": "509CF6",
    "colorIcon": false
  },
  "canva": {
    "color": "00C4CC",
    "colorIcon": true
  },
  "cashapp": {
    "color": "00C244",
    "colorIcon": false
  },
  "castorama": {
    "color": "0078D7",
    "colorIcon": false
  },
  "castro": {
    "color": "00B265",
    "colorIcon": true
  },
  "cevo": {
    "color": "1EABE2",
    "colorIcon": true
  },
  "chase": {
    "color": "117ACA",
    "colorIcon": false
  },
  "circle": {
    "color": "8669AE",
    "colorIcon": true
  },
  "circleci": {
    "color": "343434",
    "colorIcon": false
  },
  "cirrusci": {
    "color": "212121",
    "colorIcon": false
  },
  "civicrm": {
    "color": "81C459",
    "colorIcon": true
  },
  "clockify": {
    "color": "03A9F4",
    "colorIcon": true
  },
  "clojure": {
    "color": "5881D8",
    "colorIcon": true
  },
  "cloudflare": {
    "color": "F38020",
    "colorIcon": true
  },
  "cmake": {
    "color": "064F8C",
    "colorIcon": false
  },
  "co-op": {
    "color": "00B1E7",
    "colorIcon": true
  },
  "codacy": {
    "color": "222F29",
    "colorIcon": false
  },
  "codecademy": {
    "color": "1F4056",
    "colorIcon": false
  },
  "codeclimate": {
    "color": "000000",
    "colorIcon": false
  },
  "codecov": {
    "color": "F01F7A",
    "colorIcon": true
  },
  "codeforces": {
    "color": "1F8ACB",
    "colorIcon": true
  },
  "codeigniter": {
    "color": "EE4623",
    "colorIcon": true
  },
  "codepen": {
    "color": "000000",
    "colorIcon": false
  },
  "coderwall": {
    "color": "3E8DCC",
    "colorIcon": true
  },
  "codesandbox": {
    "color": "000000",
    "colorIcon": false
  },
  "codeship": {
    "color": "3C4858",
    "colorIcon": false
  },
  "codewars": {
    "color": "AD2C27",
    "colorIcon": false
  },
  "codio": {
    "color": "4574E0",
    "colorIcon": true
  },
  "coffeescript": {
    "color": "2F2625",
    "colorIcon": false
  },
  "commonworkflowlanguage": {
    "color": "B5314C",
    "colorIcon": false
  },
  "compropago": {
    "color": "00AAEF",
    "colorIcon": true
  },
  "conda-forge": {
    "color": "000000",
    "colorIcon": false
  },
  "conekta": {
    "color": "414959",
    "colorIcon": false
  },
  "confluence": {
    "color": "172B4D",
    "colorIcon": false
  },
  "coursera": {
    "color": "2A73CC",
    "colorIcon": true
  },
  "cplusplus": {
    "color": "00599C",
    "colorIcon": false
  },
  "creativecommons": {
    "color": "EF9421",
    "colorIcon": false
  },
  "crunchbase": {
    "color": "0288D1",
    "colorIcon": false
  },
  "crunchyroll": {
    "color": "F47521",
    "colorIcon": true
  },
  "css3": {
    "color": "1572B6",
    "colorIcon": false
  },
  "csswizardry": {
    "color": "F43059",
    "colorIcon": false
  },
  "d3.js": {
    "color": "F9A03C",
    "colorIcon": true
  },
  "dailymotion": {
    "color": "0066DC",
    "colorIcon": false
  },
  "dazn": {
    "color": "F8F8F5",
    "colorIcon": true
  },
  "dblp": {
    "color": "004F9F",
    "colorIcon": false
  },
  "debian": {
    "color": "A81D33",
    "colorIcon": false
  },
  "deezer": {
    "color": "00C7F2",
    "colorIcon": false
  },
  "delicious": {
    "color": "3399FF",
    "colorIcon": true
  },
  "dell": {
    "color": "007DB8",
    "colorIcon": false
  },
  "deno": {
    "color": "000000",
    "colorIcon": false
  },
  "dependabot": {
    "color": "025E8C",
    "colorIcon": false
  },
  "designernews": {
    "color": "2D72D9",
    "colorIcon": false
  },
  "dev.to": {
    "color": "0A0A0A",
    "colorIcon": false
  },
  "deviantart": {
    "color": "05CC47",
    "colorIcon": true
  },
  "devrant": {
    "color": "F99A66",
    "colorIcon": true
  },
  "diaspora": {
    "color": "000000",
    "colorIcon": false
  },
  "digg": {
    "color": "000000",
    "colorIcon": false
  },
  "digitalocean": {
    "color": "0080FF",
    "colorIcon": true
  },
  "discord": {
    "color": "7289DA",
    "colorIcon": true
  },
  "discourse": {
    "color": "000000",
    "colorIcon": false
  },
  "discover": {
    "color": "FF6000",
    "colorIcon": true
  },
  "disqus": {
    "color": "2E9FFF",
    "colorIcon": true
  },
  "disroot": {
    "color": "50162D",
    "colorIcon": false
  },
  "django": {
    "color": "092E20",
    "colorIcon": false
  },
  "docker": {
    "color": "1488C6",
    "colorIcon": true
  },
  "docusign": {
    "color": "FFCC22",
    "colorIcon": true
  },
  "dot-net": {
    "color": "5C2D91",
    "colorIcon": false
  },
  "draugiem.lv": {
    "color": "FF6600",
    "colorIcon": true
  },
  "dribbble": {
    "color": "EA4C89",
    "colorIcon": true
  },
  "drone": {
    "color": "212121",
    "colorIcon": false
  },
  "dropbox": {
    "color": "0061FF",
    "colorIcon": false
  },
  "drupal": {
    "color": "0678BE",
    "colorIcon": false
  },
  "dtube": {
    "color": "FF0000",
    "colorIcon": false
  },
  "duckduckgo": {
    "color": "DE5833",
    "colorIcon": true
  },
  "ebay": {
    "color": "E53238",
    "colorIcon": true
  },
  "eclipseide": {
    "color": "2C2255",
    "colorIcon": false
  },
  "elastic": {
    "color": "005571",
    "colorIcon": false
  },
  "elasticcloud": {
    "color": "005571",
    "colorIcon": false
  },
  "elasticsearch": {
    "color": "005571",
    "colorIcon": false
  },
  "elasticstack": {
    "color": "005571",
    "colorIcon": false
  },
  "electron": {
    "color": "47848F",
    "colorIcon": true
  },
  "elementary": {
    "color": "64BAFF",
    "colorIcon": true
  },
  "ello": {
    "color": "000000",
    "colorIcon": false
  },
  "elsevier": {
    "color": "FF6C00",
    "colorIcon": true
  },
  "empirekred": {
    "color": "72BE50",
    "colorIcon": false
  },
  "envato": {
    "color": "81B441",
    "colorIcon": true
  },
  "epicgames": {
    "color": "313131",
    "colorIcon": false
  },
  "esea": {
    "color": "0E9648",
    "colorIcon": false
  },
  "eslint": {
    "color": "4B32C3",
    "colorIcon": false
  },
  "ethereum": {
    "color": "3C3C3D",
    "colorIcon": false
  },
  "etsy": {
    "color": "F16521",
    "colorIcon": true
  },
  "eventbrite": {
    "color": "F05537",
    "colorIcon": true
  },
  "eventstore": {
    "color": "5AB552",
    "colorIcon": false
  },
  "evernote": {
    "color": "00A82D",
    "colorIcon": true
  },
  "everplaces": {
    "color": "FA4B32",
    "colorIcon": true
  },
  "evry": {
    "color": "063A54",
    "colorIcon": false
  },
  "expertsexchange": {
    "color": "00AAE7",
    "colorIcon": false
  },
  "f-secure": {
    "color": "00BAFF",
    "colorIcon": true
  },
  "facebook": {
    "color": "4172B8",
    "colorIcon": true
  },
  "faceit": {
    "color": "FF5500",
    "colorIcon": true
  },
  "fandango": {
    "color": "FF7300",
    "colorIcon": true
  },
  "favro": {
    "color": "512DA8",
    "colorIcon": false
  },
  "feathub": {
    "color": "9B9B9B",
    "colorIcon": true
  },
  "fedora": {
    "color": "294172",
    "colorIcon": false
  },
  "feedly": {
    "color": "2BB24C",
    "colorIcon": true
  },
  "fidoalliance": {
    "color": "FFBF3B",
    "colorIcon": false
  },
  "figma": {
    "color": "F24E1E",
    "colorIcon": true
  },
  "filezilla": {
    "color": "BF0000",
    "colorIcon": false
  },
  "firebase": {
    "color": "FFCA28",
    "colorIcon": true
  },
  "fitbit": {
    "color": "00B0B9",
    "colorIcon": true
  },
  "flask": {
    "color": "000000",
    "colorIcon": false
  },
  "flattr": {
    "color": "000000",
    "colorIcon": false
  },
  "flickr": {
    "color": "0063DC",
    "colorIcon": false
  },
  "flipboard": {
    "color": "E12828",
    "colorIcon": false
  },
  "flutter": {
    "color": "02569B",
    "colorIcon": false
  },
  "fnac": {
    "color": "E1A925",
    "colorIcon": true
  },
  "foursquare": {
    "color": "F94877",
    "colorIcon": true
  },
  "framer": {
    "color": "0055FF",
    "colorIcon": false
  },
  "freebsd": {
    "color": "AB2B28",
    "colorIcon": false
  },
  "freecodecamp": {
    "color": "006400",
    "colorIcon": false
  },
  "furaffinity": {
    "color": "FAAF3A",
    "colorIcon": false
  },
  "furrynetwork": {
    "color": "2E75B4",
    "colorIcon": false
  },
  "garmin": {
    "color": "007CC3",
    "colorIcon": false
  },
  "gatsby": {
    "color": "663399",
    "colorIcon": false
  },
  "gauges": {
    "color": "2FA66A",
    "colorIcon": true
  },
  "geocaching": {
    "color": "00874D",
    "colorIcon": false
  },
  "gerrit": {
    "color": "EEEEEE",
    "colorIcon": true
  },
  "ghost": {
    "color": "738A94",
    "colorIcon": true
  },
  "git": {
    "color": "F05032",
    "colorIcon": true
  },
  "github": {
    "color": "181717",
    "colorIcon": false
  },
  "gitlab": {
    "color": "E24329",
    "colorIcon": true
  },
  "gitter": {
    "color": "ED1965",
    "colorIcon": false
  },
  "glassdoor": {
    "color": "0CAA41",
    "colorIcon": true
  },
  "gmail": {
    "color": "D14836",
    "colorIcon": true
  },
  "gnu": {
    "color": "A42E2B",
    "colorIcon": false
  },
  "gnusocial": {
    "color": "A22430",
    "colorIcon": false
  },
  "go": {
    "color": "76E1FE",
    "colorIcon": true
  },
  "gog.com": {
    "color": "86328A",
    "colorIcon": false
  },
  "goldenline": {
    "color": "F1B92B",
    "colorIcon": true
  },
  "goodreads": {
    "color": "663300",
    "colorIcon": false
  },
  "google": {
    "color": "4285F4",
    "colorIcon": true
  },
  "google-allo": {
    "color": "ECB842",
    "colorIcon": false
  },
  "google-analytics": {
    "color": "FFC107",
    "colorIcon": true
  },
  "google-chrome": {
    "color": "4285F4",
    "colorIcon": true
  },
  "google-cloud": {
    "color": "4285F4",
    "colorIcon": true
  },
  "google-drive": {
    "color": "4285F4",
    "colorIcon": true
  },
  "google-hangouts": {
    "color": "0C9D58",
    "colorIcon": true
  },
  "google-hangoutschat": {
    "color": "00897B",
    "colorIcon": false
  },
  "google-keep": {
    "color": "FFBB00",
    "colorIcon": true
  },
  "google-pay": {
    "color": "5F6368",
    "colorIcon": true
  },
  "google-play": {
    "color": "607D8B",
    "colorIcon": false
  },
  "google-plus": {
    "color": "DC4E41",
    "colorIcon": false
  },
  "google-podcasts": {
    "color": "4285F4",
    "colorIcon": true
  },
  "gov.uk": {
    "color": "005EA5",
    "colorIcon": false
  },
  "grafana": {
    "color": "F46800",
    "colorIcon": true
  },
  "graphcool": {
    "color": "27AE60",
    "colorIcon": true
  },
  "graphql": {
    "color": "E10098",
    "colorIcon": false
  },
  "grav": {
    "color": "221E1F",
    "colorIcon": false
  },
  "gravatar": {
    "color": "1E8CBE",
    "colorIcon": true
  },
  "greenkeeper": {
    "color": "00C775",
    "colorIcon": true
  },
  "groupon": {
    "color": "53A318",
    "colorIcon": true
  },
  "gulp": {
    "color": "DA4648",
    "colorIcon": true
  },
  "gumroad": {
    "color": "36A9AE",
    "colorIcon": true
  },
  "gumtree": {
    "color": "72EF36",
    "colorIcon": true
  },
  "hackaday": {
    "color": "1A1A1A",
    "colorIcon": false
  },
  "hackerearth": {
    "color": "323754",
    "colorIcon": false
  },
  "hackerrank": {
    "color": "2EC866",
    "colorIcon": true
  },
  "hackhands": {
    "color": "00ACBD",
    "colorIcon": true
  },
  "hackster": {
    "color": "1BACF7",
    "colorIcon": true
  },
  "hashnode": {
    "color": "2962FF",
    "colorIcon": false
  },
  "haskell": {
    "color": "5D4F85",
    "colorIcon": false
  },
  "hatenabookmark": {
    "color": "00A4DE",
    "colorIcon": false
  },
  "here": {
    "color": "48DAD0",
    "colorIcon": true
  },
  "heroku": {
    "color": "430098",
    "colorIcon": false
  },
  "hexo": {
    "color": "0E83CD",
    "colorIcon": true
  },
  "highly": {
    "color": "FF3C00",
    "colorIcon": true
  },
  "hipchat": {
    "color": "0052CC",
    "colorIcon": false
  },
  "hockeyapp": {
    "color": "009EE1",
    "colorIcon": true
  },
  "homify": {
    "color": "7DCDA3",
    "colorIcon": true
  },
  "hootsuite": {
    "color": "000000",
    "colorIcon": false
  },
  "houzz": {
    "color": "7AC142",
    "colorIcon": true
  },
  "html5": {
    "color": "E34F26",
    "colorIcon": true
  },
  "huawei": {
    "color": "FF0000",
    "colorIcon": false
  },
  "hubspot": {
    "color": "FF7A59",
    "colorIcon": true
  },
  "hulu": {
    "color": "3DBB3D",
    "colorIcon": true
  },
  "humblebundle": {
    "color": "CC2929",
    "colorIcon": false
  },
  "icloud": {
    "color": "3693F3",
    "colorIcon": true
  },
  "iconjar": {
    "color": "16A5F3",
    "colorIcon": true
  },
  "icq": {
    "color": "7EBD00",
    "colorIcon": true
  },
  "ifixit": {
    "color": "0071CE",
    "colorIcon": false
  },
  "imdb": {
    "color": "E6B91E",
    "colorIcon": true
  },
  "inkscape": {
    "color": "000000",
    "colorIcon": false
  },
  "instacart": {
    "color": "43B02A",
    "colorIcon": true
  },
  "instagram": {
    "color": "E4405F",
    "colorIcon": true
  },
  "instapaper": {
    "color": "1F1F1F",
    "colorIcon": false
  },
  "intel": {
    "color": "0071C5",
    "colorIcon": false
  },
  "intellijidea": {
    "color": "000000",
    "colorIcon": false
  },
  "intercom": {
    "color": "1F8DED",
    "colorIcon": true
  },
  "internetexplorer": {
    "color": "0076D6",
    "colorIcon": false
  },
  "invision": {
    "color": "FF3366",
    "colorIcon": true
  },
  "ionic": {
    "color": "3880FF",
    "colorIcon": true
  },
  "itch.io": {
    "color": "FA5C5C",
    "colorIcon": true
  },
  "jabber": {
    "color": "CC0000",
    "colorIcon": false
  },
  "java": {
    "color": "007396",
    "colorIcon": false
  },
  "javascript": {
    "color": "F7DF1E",
    "colorIcon": true
  },
  "jekyll": {
    "color": "CC0000",
    "colorIcon": false
  },
  "jenkins": {
    "color": "D24939",
    "colorIcon": true
  },
  "jest": {
    "color": "C21325",
    "colorIcon": false
  },
  "jira": {
    "color": "172B4D",
    "colorIcon": false
  },
  "joomla": {
    "color": "5091CD",
    "colorIcon": true
  },
  "jquery": {
    "color": "0769AD",
    "colorIcon": false
  },
  "jsdelivr": {
    "color": "E84D3D",
    "colorIcon": true
  },
  "jsfiddle": {
    "color": "4679A4",
    "colorIcon": true
  },
  "json": {
    "color": "000000",
    "colorIcon": false
  },
  "jupyter": {
    "color": "F37626",
    "colorIcon": true
  },
  "justgiving": {
    "color": "AD29B6",
    "colorIcon": false
  },
  "kaggle": {
    "color": "20BEFF",
    "colorIcon": true
  },
  "kaios": {
    "color": "6F02B5",
    "colorIcon": false
  },
  "kentico": {
    "color": "F05A22",
    "colorIcon": true
  },
  "keybase": {
    "color": "33A0FF",
    "colorIcon": true
  },
  "keycdn": {
    "color": "3686BE",
    "colorIcon": true
  },
  "khanacademy": {
    "color": "9DB63B",
    "colorIcon": false
  },
  "kibana": {
    "color": "005571",
    "colorIcon": false
  },
  "kickstarter": {
    "color": "2BDE73",
    "colorIcon": true
  },
  "kik": {
    "color": "82BC23",
    "colorIcon": true
  },
  "kirby": {
    "color": "FF0100",
    "colorIcon": false
  },
  "klout": {
    "color": "E44600",
    "colorIcon": true
  },
  "known": {
    "color": "333333",
    "colorIcon": false
  },
  "ko-fi": {
    "color": "F16061",
    "colorIcon": true
  },
  "kodi": {
    "color": "17B2E7",
    "colorIcon": true
  },
  "koding": {
    "color": "00B057",
    "colorIcon": true
  },
  "kotlin": {
    "color": "0095D5",
    "colorIcon": true
  },
  "kubernetes": {
    "color": "326CE5",
    "colorIcon": true
  },
  "lanyrd": {
    "color": "3C80CA",
    "colorIcon": false
  },
  "laravel": {
    "color": "E74430",
    "colorIcon": true
  },
  "laravelhorizon": {
    "color": "405263",
    "colorIcon": false
  },
  "last.fm": {
    "color": "D51007",
    "colorIcon": false
  },
  "launchpad": {
    "color": "F8C300",
    "colorIcon": true
  },
  "leetcode": {
    "color": "F89F1B",
    "colorIcon": true
  },
  "letsencrypt": {
    "color": "003A70",
    "colorIcon": false
  },
  "letterboxd": {
    "color": "00D735",
    "colorIcon": true
  },
  "lgtm": {
    "color": "FFFFFF",
    "colorIcon": false
  },
  "liberapay": {
    "color": "F6C915",
    "colorIcon": true
  },
  "librarything": {
    "color": "251A15",
    "colorIcon": false
  },
  "line": {
    "color": "00C300",
    "colorIcon": true
  },
  "linewebtoon": {
    "color": "00D564",
    "colorIcon": false
  },
  "linkedin": {
    "color": "0077B5",
    "colorIcon": false
  },
  "linux": {
    "color": "FCC624",
    "colorIcon": true
  },
  "linuxfoundation": {
    "color": "009BEE",
    "colorIcon": false
  },
  "linuxmint": {
    "color": "87CF3E",
    "colorIcon": false
  },
  "livejournal": {
    "color": "00B0EA",
    "colorIcon": true
  },
  "livestream": {
    "color": "CF202E",
    "colorIcon": false
  },
  "logstash": {
    "color": "005571",
    "colorIcon": false
  },
  "lua": {
    "color": "2C2D72",
    "colorIcon": false
  },
  "macys": {
    "color": "E21A2C",
    "colorIcon": false
  },
  "magento": {
    "color": "EE672F",
    "colorIcon": true
  },
  "magisk": {
    "color": "00AF9C",
    "colorIcon": true
  },
  "mail.ru": {
    "color": "168DE2",
    "colorIcon": true
  },
  "mailchimp": {
    "color": "FFE01B",
    "colorIcon": true
  },
  "makerbot": {
    "color": "FF1E0D",
    "colorIcon": false
  },
  "manjaro": {
    "color": "35BF5C",
    "colorIcon": true
  },
  "markdown": {
    "color": "000000",
    "colorIcon": false
  },
  "marketo": {
    "color": "5C4C9F",
    "colorIcon": false
  },
  "mastercard": {
    "color": "EB001B",
    "colorIcon": false
  },
  "mastodon": {
    "color": "3088D4",
    "colorIcon": true
  },
  "materialdesign": {
    "color": "757575",
    "colorIcon": false
  },
  "mathworks": {
    "color": "0076A8",
    "colorIcon": false
  },
  "matrix": {
    "color": "000000",
    "colorIcon": false
  },
  "matternet": {
    "color": "261C29",
    "colorIcon": false
  },
  "mediafire": {
    "color": "1299F3",
    "colorIcon": true
  },
  "mediatemple": {
    "color": "000000",
    "colorIcon": false
  },
  "medium": {
    "color": "12100E",
    "colorIcon": false
  },
  "meetup": {
    "color": "ED1C40",
    "colorIcon": false
  },
  "mega": {
    "color": "D9272E",
    "colorIcon": false
  },
  "messenger": {
    "color": "00B2FF",
    "colorIcon": true
  },
  "meteor": {
    "color": "DE4F4F",
    "colorIcon": true
  },
  "micro.blog": {
    "color": "FD8308",
    "colorIcon": true
  },
  "microgenetics": {
    "color": "FF0000",
    "colorIcon": false
  },
  "microsoft": {
    "color": "666666",
    "colorIcon": false
  },
  "microsoft-access": {
    "color": "BA141A",
    "colorIcon": false
  },
  "microsoft-azure": {
    "color": "0089D6",
    "colorIcon": true
  },
  "microsoft-edge": {
    "color": "0078D7",
    "colorIcon": false
  },
  "microsoft-excel": {
    "color": "217346",
    "colorIcon": false
  },
  "microsoft-onedrive": {
    "color": "094AB2",
    "colorIcon": false
  },
  "microsoft-onenote": {
    "color": "80397B",
    "colorIcon": false
  },
  "microsoft-outlook": {
    "color": "0072C6",
    "colorIcon": false
  },
  "microsoft-powerpoint": {
    "color": "D24726",
    "colorIcon": false
  },
  "microsoft-word": {
    "color": "2B579A",
    "colorIcon": false
  },
  "minutemailer": {
    "color": "3ABFE6",
    "colorIcon": true
  },
  "mix": {
    "color": "FF8126",
    "colorIcon": true
  },
  "mixcloud": {
    "color": "314359",
    "colorIcon": false
  },
  "mixer": {
    "color": "002050",
    "colorIcon": false
  },
  "monero": {
    "color": "FF6600",
    "colorIcon": true
  },
  "mongodb": {
    "color": "47A248",
    "colorIcon": true
  },
  "monkeytie": {
    "color": "FFC619",
    "colorIcon": false
  },
  "monogram": {
    "color": "FDB22A",
    "colorIcon": true
  },
  "monzo": {
    "color": "14233C",
    "colorIcon": false
  },
  "moo": {
    "color": "00945E",
    "colorIcon": false
  },
  "mozilla": {
    "color": "000000",
    "colorIcon": false
  },
  "mozilla-firefox": {
    "color": "FF9400",
    "colorIcon": true
  },
  "mxlinux": {
    "color": "000000",
    "colorIcon": false
  },
  "myspace": {
    "color": "030303",
    "colorIcon": false
  },
  "mysql": {
    "color": "4479A1",
    "colorIcon": true
  },
  "nativescript": {
    "color": "3655FF",
    "colorIcon": false
  },
  "neo4j": {
    "color": "008CC1",
    "colorIcon": true
  },
  "netflix": {
    "color": "E50914",
    "colorIcon": false
  },
  "netlify": {
    "color": "00C7B7",
    "colorIcon": true
  },
  "next.js": {
    "color": "000000",
    "colorIcon": false
  },
  "nextcloud": {
    "color": "0082C9",
    "colorIcon": false
  },
  "nextdoor": {
    "color": "00B246",
    "colorIcon": true
  },
  "nginx": {
    "color": "269539",
    "colorIcon": true
  },
  "nintendo": {
    "color": "8F8F8F",
    "colorIcon": true
  },
  "nintendo-gamecube": {
    "color": "6A5FBB",
    "colorIcon": true
  },
  "nintendo-switch": {
    "color": "E60012",
    "colorIcon": false
  },
  "node.js": {
    "color": "339933",
    "colorIcon": true
  },
  "nodemon": {
    "color": "76D04B",
    "colorIcon": true
  },
  "npm": {
    "color": "CB3837",
    "colorIcon": true
  },
  "nucleo": {
    "color": "766DCC",
    "colorIcon": true
  },
  "nuget": {
    "color": "004880",
    "colorIcon": false
  },
  "nuxt.js": {
    "color": "00C58E",
    "colorIcon": true
  },
  "nvidia": {
    "color": "76B900",
    "colorIcon": true
  },
  "ocaml": {
    "color": "EC6813",
    "colorIcon": true
  },
  "octopus-deploy": {
    "color": "2F93E0",
    "colorIcon": true
  },
  "oculus": {
    "color": "1C1E20",
    "colorIcon": false
  },
  "odnoklassniki": {
    "color": "F4731C",
    "colorIcon": true
  },
  "open-access": {
    "color": "F68212",
    "colorIcon": true
  },
  "openstreetmap": {
    "color": "7EBC6F",
    "colorIcon": true
  },
  "opensuse": {
    "color": "73BA25",
    "colorIcon": true
  },
  "opera": {
    "color": "FF1B2D",
    "colorIcon": false
  },
  "opsgenie": {
    "color": "172B4D",
    "colorIcon": false
  },
  "oracle": {
    "color": "F80000",
    "colorIcon": false
  },
  "origin": {
    "color": "F56C2D",
    "colorIcon": true
  },
  "osmc": {
    "color": "17394A",
    "colorIcon": false
  },
  "overcast": {
    "color": "FC7E0F",
    "colorIcon": true
  },
  "ovh": {
    "color": "123F6D",
    "colorIcon": true
  },
  "pagekit": {
    "color": "212121",
    "colorIcon": false
  },
  "pandora": {
    "color": "005483",
    "colorIcon": false
  },
  "pantheon": {
    "color": "EFD01B",
    "colorIcon": true
  },
  "patreon": {
    "color": "F96854",
    "colorIcon": true
  },
  "paypal": {
    "color": "00457C",
    "colorIcon": true
  },
  "periscope": {
    "color": "40A4C4",
    "colorIcon": true
  },
  "php": {
    "color": "777BB4",
    "colorIcon": true
  },
  "picarto.tv": {
    "color": "1DA456",
    "colorIcon": true
  },
  "pinboard": {
    "color": "0000FF",
    "colorIcon": false
  },
  "pingdom": {
    "color": "FFF000",
    "colorIcon": true
  },
  "pingup": {
    "color": "00B1AB",
    "colorIcon": true
  },
  "pinterest": {
    "color": "BD081C",
    "colorIcon": false
  },
  "pivotal-tracker": {
    "color": "517A9E",
    "colorIcon": true
  },
  "plangrid": {
    "color": "0085DE",
    "colorIcon": true
  },
  "player.me": {
    "color": "C0379A",
    "colorIcon": true
  },
  "playstation": {
    "color": "003791",
    "colorIcon": false
  },
  "playstation-3": {
    "color": "003791",
    "colorIcon": false
  },
  "playstation-4": {
    "color": "003791",
    "colorIcon": false
  },
  "plex": {
    "color": "E5A00D",
    "colorIcon": true
  },
  "pluralsight": {
    "color": "F15B2A",
    "colorIcon": true
  },
  "plurk": {
    "color": "FF574D",
    "colorIcon": true
  },
  "pocket": {
    "color": "EF3F56",
    "colorIcon": true
  },
  "podcasts": {
    "color": "9933CC",
    "colorIcon": false
  },
  "postgresql": {
    "color": "336791",
    "colorIcon": false
  },
  "postman": {
    "color": "FF6C37",
    "colorIcon": true
  },
  "powershell": {
    "color": "5391FE",
    "colorIcon": true
  },
  "prettier": {
    "color": "F7B93E",
    "colorIcon": true
  },
  "prismic": {
    "color": "484A7A",
    "colorIcon": false
  },
  "probot": {
    "color": "00B0D8",
    "colorIcon": true
  },
  "processwire": {
    "color": "EF145F",
    "colorIcon": false
  },
  "product-hunt": {
    "color": "DA552F",
    "colorIcon": true
  },
  "proto.io": {
    "color": "34A7C1",
    "colorIcon": true
  },
  "protonmail": {
    "color": "8B89CC",
    "colorIcon": true
  },
  "proxmox": {
    "color": "E57000",
    "colorIcon": true
  },
  "pypi": {
    "color": "3775A9",
    "colorIcon": true
  },
  "python": {
    "color": "3776AB",
    "colorIcon": true
  },
  "qiita": {
    "color": "55C500",
    "colorIcon": true
  },
  "qualcomm": {
    "color": "3253DC",
    "colorIcon": false
  },
  "quantcast": {
    "color": "1E262C",
    "colorIcon": false
  },
  "quantopian": {
    "color": "C50000",
    "colorIcon": false
  },
  "quora": {
    "color": "B92B27",
    "colorIcon": false
  },
  "qwiklabs": {
    "color": "F5CD0E",
    "colorIcon": true
  },
  "qzone": {
    "color": "FECE00",
    "colorIcon": true
  },
  "r": {
    "color": "276DC3",
    "colorIcon": false
  },
  "rails": {
    "color": "CC0000",
    "colorIcon": false
  },
  "raspberry-pi": {
    "color": "C51A4A",
    "colorIcon": false
  },
  "react": {
    "color": "61DAFB",
    "colorIcon": true
  },
  "read-the-docs": {
    "color": "8CA1AF",
    "colorIcon": true
  },
  "reason": {
    "color": "DD4B39",
    "colorIcon": true
  },
  "redbubble": {
    "color": "E41321",
    "colorIcon": false
  },
  "reddit": {
    "color": "FF4500",
    "colorIcon": true
  },
  "red-hat": {
    "color": "EE0000",
    "colorIcon": false
  },
  "redis": {
    "color": "D82C20",
    "colorIcon": true
  },
  "redux": {
    "color": "764ABC",
    "colorIcon": false
  },
  "renren": {
    "color": "217DC6",
    "colorIcon": true
  },
  "reverbnation": {
    "color": "E43526",
    "colorIcon": true
  },
  "riot": {
    "color": "368BD6",
    "colorIcon": true
  },
  "riseup": {
    "color": "5E9EE3",
    "colorIcon": true
  },
  "rollup.js": {
    "color": "EC4A3F",
    "colorIcon": true
  },
  "roots": {
    "color": "525DDC",
    "colorIcon": true
  },
  "rss": {
    "color": "FFA500",
    "colorIcon": true
  },
  "ruby": {
    "color": "CC342D",
    "colorIcon": false
  },
  "rubygems": {
    "color": "E9573F",
    "colorIcon": true
  },
  "runkeeper": {
    "color": "2DC9D7",
    "colorIcon": true
  },
  "rust": {
    "color": "000000",
    "colorIcon": false
  },
  "safari": {
    "color": "000000",
    "colorIcon": false
  },
  "salesforce": {
    "color": "00A1E0",
    "colorIcon": true
  },
  "samsung": {
    "color": "1428A0",
    "colorIcon": false
  },
  "samsung-pay": {
    "color": "1428A0",
    "colorIcon": false
  },
  "sap": {
    "color": "008FD3",
    "colorIcon": true
  },
  "sass": {
    "color": "CC6699",
    "colorIcon": true
  },
  "sauce-labs": {
    "color": "E2231A",
    "colorIcon": false
  },
  "scala": {
    "color": "DC322F",
    "colorIcon": false
  },
  "scaleway": {
    "color": "4F0599",
    "colorIcon": false
  },
  "scribd": {
    "color": "1A7BBA",
    "colorIcon": false
  },
  "scrutinizer-ci": {
    "color": "8A9296",
    "colorIcon": true
  },
  "sega": {
    "color": "0089CF",
    "colorIcon": true
  },
  "sellfy": {
    "color": "21B352",
    "colorIcon": true
  },
  "sensu": {
    "color": "89C967",
    "colorIcon": true
  },
  "sentry": {
    "color": "FB4226",
    "colorIcon": true
  },
  "serverfault": {
    "color": "E7282D",
    "colorIcon": true
  },
  "shazam": {
    "color": "0088FF",
    "colorIcon": true
  },
  "shopify": {
    "color": "7AB55C",
    "colorIcon": true
  },
  "signal": {
    "color": "2592E9",
    "colorIcon": true
  },
  "simple-icons": {
    "color": "111111",
    "colorIcon": false
  },
  "sina-weibo": {
    "color": "E6162D",
    "colorIcon": false
  },
  "sitepoint": {
    "color": "258AAF",
    "colorIcon": true
  },
  "skyliner": {
    "color": "2FCEA0",
    "colorIcon": true
  },
  "skype": {
    "color": "00AFF0",
    "colorIcon": true
  },
  "slack": {
    "color": "4A154B",
    "colorIcon": false
  },
  "slashdot": {
    "color": "026664",
    "colorIcon": false
  },
  "slickpic": {
    "color": "FF880F",
    "colorIcon": true
  },
  "slides": {
    "color": "E4637C",
    "colorIcon": true
  },
  "smashing-magazine": {
    "color": "E85C33",
    "colorIcon": true
  },
  "snapchat": {
    "color": "FFFC00",
    "colorIcon": true
  },
  "snapcraft": {
    "color": "82BEA0",
    "colorIcon": true
  },
  "snyk": {
    "color": "4C4A73",
    "colorIcon": false
  },
  "society6": {
    "color": "000000",
    "colorIcon": false
  },
  "sogou": {
    "color": "FB6022",
    "colorIcon": true
  },
  "songkick": {
    "color": "F80046",
    "colorIcon": false
  },
  "soundcloud": {
    "color": "FF3300",
    "colorIcon": true
  },
  "sourceforge": {
    "color": "535353",
    "colorIcon": true
  },
  "sourcegraph": {
    "color": "00B4F2",
    "colorIcon": true
  },
  "spacemacs": {
    "color": "9266CC",
    "colorIcon": true
  },
  "spacex": {
    "color": "005288",
    "colorIcon": false
  },
  "sparkfun": {
    "color": "E53525",
    "colorIcon": true
  },
  "sparkpost": {
    "color": "FA6423",
    "colorIcon": true
  },
  "spdx": {
    "color": "4398CC",
    "colorIcon": true
  },
  "speaker-deck": {
    "color": "339966",
    "colorIcon": true
  },
  "spotify": {
    "color": "1ED760",
    "colorIcon": true
  },
  "spotlight": {
    "color": "352A71",
    "colorIcon": false
  },
  "spreaker": {
    "color": "F5C300",
    "colorIcon": true
  },
  "sprint": {
    "color": "FFCE0A",
    "colorIcon": true
  },
  "squarespace": {
    "color": "000000",
    "colorIcon": false
  },
  "stackexchange": {
    "color": "1E5397",
    "colorIcon": true
  },
  "stackoverflow": {
    "color": "FE7A16",
    "colorIcon": true
  },
  "stackshare": {
    "color": "0690FA",
    "colorIcon": true
  },
  "stadia": {
    "color": "CD2640",
    "colorIcon": false
  },
  "statamic": {
    "color": "1F3641",
    "colorIcon": false
  },
  "staticman": {
    "color": "000000",
    "colorIcon": false
  },
  "statuspage": {
    "color": "172B4D",
    "colorIcon": false
  },
  "steam": {
    "color": "000000",
    "colorIcon": false
  },
  "steem": {
    "color": "4BA2F2",
    "colorIcon": true
  },
  "steemit": {
    "color": "06D6A9",
    "colorIcon": true
  },
  "stitcher": {
    "color": "000000",
    "colorIcon": false
  },
  "storify": {
    "color": "3A98D9",
    "colorIcon": true
  },
  "strava": {
    "color": "FC4C02",
    "colorIcon": true
  },
  "stripe": {
    "color": "008CDD",
    "colorIcon": true
  },
  "stubhub": {
    "color": "003168",
    "colorIcon": false
  },
  "styleshare": {
    "color": "212121",
    "colorIcon": false
  },
  "stylus": {
    "color": "333333",
    "colorIcon": false
  },
  "sublime-text": {
    "color": "272822",
    "colorIcon": true
  },
  "subversion": {
    "color": "809CC9",
    "colorIcon": true
  },
  "superuser": {
    "color": "2EACE3",
    "colorIcon": true
  },
  "swarm": {
    "color": "FFA633",
    "colorIcon": true
  },
  "swift": {
    "color": "FA7343",
    "colorIcon": true
  },
  "symfony": {
    "color": "000000",
    "colorIcon": false
  },
  "synology": {
    "color": "B6B5B6",
    "colorIcon": false
  },
  "t-mobile": {
    "color": "E20074",
    "colorIcon": false
  },
  "tails": {
    "color": "56347C",
    "colorIcon": false
  },
  "tapas": {
    "color": "FFCE00",
    "colorIcon": true
  },
  "teamviewer": {
    "color": "0E8EE9",
    "colorIcon": true
  },
  "ted": {
    "color": "E62B1E",
    "colorIcon": false
  },
  "teespring": {
    "color": "39ACE6",
    "colorIcon": true
  },
  "telegram": {
    "color": "2CA5E0",
    "colorIcon": true
  },
  "tencent-qq": {
    "color": "EB1923",
    "colorIcon": false
  },
  "tencent-weibo": {
    "color": "20B8E5",
    "colorIcon": true
  },
  "tesla": {
    "color": "CC0000",
    "colorIcon": false
  },
  "the-mighty": {
    "color": "D0072A",
    "colorIcon": false
  },
  "the-movie-database": {
    "color": "01D277",
    "colorIcon": true
  },
  "tidal": {
    "color": "000000",
    "colorIcon": false
  },
  "tik-tok": {
    "color": "000000",
    "colorIcon": false
  },
  "tinder": {
    "color": "FF6B6B",
    "colorIcon": true
  },
  "todoist": {
    "color": "E44332",
    "colorIcon": true
  },
  "toggl": {
    "color": "E01B22",
    "colorIcon": false
  },
  "topcoder": {
    "color": "29A8E0",
    "colorIcon": true
  },
  "toptal": {
    "color": "3863A0",
    "colorIcon": false
  },
  "tor": {
    "color": "7E4798",
    "colorIcon": false
  },
  "trainerroad": {
    "color": "E12726",
    "colorIcon": false
  },
  "trakt": {
    "color": "ED1C24",
    "colorIcon": false
  },
  "travis-ci": {
    "color": "3EAAAF",
    "colorIcon": false
  },
  "treehouse": {
    "color": "5FCF80",
    "colorIcon": true
  },
  "trello": {
    "color": "0079BF",
    "colorIcon": false
  },
  "tripadvisor": {
    "color": "00AF87",
    "colorIcon": true
  },
  "trulia": {
    "color": "53B50A",
    "colorIcon": true
  },
  "tumblr": {
    "color": "36465D",
    "colorIcon": false
  },
  "twilio": {
    "color": "F22F46",
    "colorIcon": true
  },
  "twitch": {
    "color": "6441A4",
    "colorIcon": true
  },
  "twitter": {
    "color": "1DA1F2",
    "colorIcon": true
  },
  "twoo": {
    "color": "FF7102",
    "colorIcon": true
  },
  "typescript": {
    "color": "007ACC",
    "colorIcon": false
  },
  "typo3": {
    "color": "FF8700",
    "colorIcon": true
  },
  "uber": {
    "color": "000000",
    "colorIcon": false
  },
  "ubisoft": {
    "color": "000000",
    "colorIcon": false
  },
  "ubuntu": {
    "color": "E95420",
    "colorIcon": true
  },
  "udacity": {
    "color": "01B3E3",
    "colorIcon": true
  },
  "udemy": {
    "color": "EC5252",
    "colorIcon": true
  },
  "uikit": {
    "color": "2396F3",
    "colorIcon": true
  },
  "umbraco": {
    "color": "00BEC1",
    "colorIcon": true
  },
  "unity": {
    "color": "000000",
    "colorIcon": false
  },
  "unsplash": {
    "color": "000000",
    "colorIcon": false
  },
  "untappd": {
    "color": "FFC000",
    "colorIcon": true
  },
  "upwork": {
    "color": "6FDA44",
    "colorIcon": true
  },
  "v8": {
    "color": "4B8BF5",
    "colorIcon": true
  },
  "vagrant": {
    "color": "1563FF",
    "colorIcon": false
  },
  "venmo": {
    "color": "3D95CE",
    "colorIcon": true
  },
  "verizon": {
    "color": "CD040B",
    "colorIcon": false
  },
  "viadeo": {
    "color": "F88D2D",
    "colorIcon": true
  },
  "viber": {
    "color": "665CAC",
    "colorIcon": true
  },
  "vim": {
    "color": "019733",
    "colorIcon": false
  },
  "vimeo": {
    "color": "1AB7EA",
    "colorIcon": true
  },
  "vine": {
    "color": "11B48A",
    "colorIcon": true
  },
  "virb": {
    "color": "0093DA",
    "colorIcon": true
  },
  "visa": {
    "color": "142787",
    "colorIcon": false
  },
  "visual-studio-code": {
    "color": "007ACC",
    "colorIcon": false
  },
  "vk": {
    "color": "6383A8",
    "colorIcon": true
  },
  "vlc-media-player": {
    "color": "FF8800",
    "colorIcon": true
  },
  "vsco": {
    "color": "000000",
    "colorIcon": false
  },
  "vue.js": {
    "color": "4FC08D",
    "colorIcon": true
  },
  "wattpad": {
    "color": "F68D12",
    "colorIcon": true
  },
  "weasyl": {
    "color": "990000",
    "colorIcon": false
  },
  "webcomponents.org": {
    "color": "29ABE2",
    "colorIcon": true
  },
  "webpack": {
    "color": "8DD6F9",
    "colorIcon": true
  },
  "webstorm": {
    "color": "00CDD7",
    "colorIcon": false
  },
  "wechat": {
    "color": "7BB32E",
    "colorIcon": true
  },
  "whatsapp": {
    "color": "25D366",
    "colorIcon": true
  },
  "when-i-work": {
    "color": "51A33D",
    "colorIcon": true
  },
  "wii": {
    "color": "8B8B8B",
    "colorIcon": true
  },
  "wii-u": {
    "color": "8B8B8B",
    "colorIcon": true
  },
  "wikipedia": {
    "color": "000000",
    "colorIcon": false
  },
  "windows": {
    "color": "0078D6",
    "colorIcon": false
  },
  "wire": {
    "color": "000000",
    "colorIcon": false
  },
  "wix": {
    "color": "FAAD4D",
    "colorIcon": false
  },
  "wolfram": {
    "color": "DD1100",
    "colorIcon": false
  },
  "wolfram-language": {
    "color": "DD1100",
    "colorIcon": false
  },
  "wolfram-mathematica": {
    "color": "DD1100",
    "colorIcon": false
  },
  "wordpress": {
    "color": "21759B",
    "colorIcon": false
  },
  "wpengine": {
    "color": "40BAC8",
    "colorIcon": false
  },
  "x-pack": {
    "color": "005571",
    "colorIcon": false
  },
  "xbox": {
    "color": "107C10",
    "colorIcon": false
  },
  "xcode": {
    "color": "1575F9",
    "colorIcon": true
  },
  "xero": {
    "color": "13B5EA",
    "colorIcon": true
  },
  "xing": {
    "color": "006567",
    "colorIcon": false
  },
  "xsplit": {
    "color": "0095DE",
    "colorIcon": true
  },
  "yahoo!": {
    "color": "440099",
    "colorIcon": false
  },
  "yammer": {
    "color": "0072C6",
    "colorIcon": false
  },
  "yandex": {
    "color": "FF0000",
    "colorIcon": false
  },
  "yarn": {
    "color": "2C8EBB",
    "colorIcon": true
  },
  "y-combinator": {
    "color": "F0652F",
    "colorIcon": true
  },
  "yelp": {
    "color": "D32323",
    "colorIcon": false
  },
  "youtube": {
    "color": "FF0000",
    "colorIcon": false
  },
  "zapier": {
    "color": "FF4A00",
    "colorIcon": true
  },
  "zeit": {
    "color": "000000",
    "colorIcon": false
  },
  "zendesk": {
    "color": "03363D",
    "colorIcon": false
  },
  "zerply": {
    "color": "9DBC7A",
    "colorIcon": true
  },
  "zillow": {
    "color": "0074E4",
    "colorIcon": false
  },
  "zorin": {
    "color": "0CC1F3",
    "colorIcon": true
  }
}


const Badge = ({ keyword }) => {
  let type = 'flat-square'
  let color = '2f2f2f'
  let logo = ''
  let data = null
  const reg = /[^a-z|^0-9]/gi
  while(1) {
    let key = keyword.toLowerCase()
    if (key in icons) {
      data = icons[key]
      data.logo = key
      break
    }
    key = keyword.replace(reg, '').toLowerCase()
    if (key in icons) {
      data = icons[key]
      data.logo = key
      break
    }
    break
  }
  if (data !== null) {
    logo = data.logo
    if (!data.colorIcon) {
      color = data.color
    }
  }
  keyword = encodeURI(keyword.split("-").join(" "))
  return (
    <>
      <img src={`https://img.shields.io/badge/${keyword}-${color}.svg?style=${type}&logo=${logo}`} className={style.badge} alt={keyword}/>
    </>
  )
}

Badge.propTypes = {
  keyword: PropTypes.string,
}

export default Badge

