---
title: "zplug 環境の構築とpromptの調整"
path: "/entry/293"
date: "2022-11-13 16:00"
coverImage: "../../../images/thumbnail/linux-logo.png"
author: "s-yoshiki"
tags: ["zsh", "mac", "linux"]
---

## Summary

zplug環境の構築を行なった際のメモです。

### Zplug について

[zplug/zplug: A next-generation plugin manager for zsh](https://github.com/zplug/zplug)

## Installation

homebrewを更新します。

```sh
brew update
```

zplugをhomebrewでインストールします。

```sh
brew install zplug
```

zplug環境構築で必要となるディレクトリを作成します。

```sh
# zsh関連のリソースを~/.zshに格納する
mkdir -p ~/.zsh
# zplugの構成を定義する
touch ~/.zsh/zplug.sh
```

`~/.zshrc`に次の内容を記載します。

**.zshrc**

```sh
# zplug
source "$HOME/.zsh/zplug.sh"
```

続いて、zplugの構成を定義する`~/.zsh/zplug.sh`を記載します。
以下のサンプルは、公式のものをほとんど流用してますが、
homebrewでインストールした場合のインストールパスだけ調整してあります。

**~/.zsh/zplug.sh**

```sh
# note: homebrewでインストールした場合を考慮
# source ~/.zplug/init.zsh
export ZPLUG_HOME=/usr/local/opt/zplug
source $ZPLUG_HOME/init.zsh

# Make sure to use double quotes
zplug "zsh-users/zsh-history-substring-search"

# Use the package as a command
# And accept glob patterns (e.g., brace, wildcard, ...)
zplug "Jxck/dotfiles", as:command, use:"bin/{histuniq,color}"

# Can manage everything e.g., other person's zshrc
zplug "tcnksm/docker-alias", use:zshrc

# Disable updates using the "frozen" tag
zplug "k4rthik/git-cal", as:command, frozen:1

# Grab binaries from GitHub Releases
# and rename with the "rename-to:" tag
zplug "junegunn/fzf", \
    from:gh-r, \
    as:command, \
    use:"*darwin*amd64*"

# Supports oh-my-zsh plugins and the like
zplug "plugins/git",   from:oh-my-zsh

# Also prezto
zplug "modules/prompt", from:prezto

# Load if "if" tag returns true
zplug "lib/clipboard", from:oh-my-zsh, if:"[[ $OSTYPE == *darwin* ]]"

# Run a command after a plugin is installed/updated
# Provided, it requires to set the variable like the following:
# ZPLUG_SUDO_PASSWORD="********"
zplug "jhawthorn/fzy", \
    as:command, \
    rename-to:fzy, \
    hook-build:"make && sudo make install"

# Supports checking out a specific branch/tag/commit
zplug "b4b4r07/enhancd", at:v1
zplug "mollifier/anyframe", at:4c23cb60

# Can manage gist file just like other packages
zplug "b4b4r07/79ee61f7c140c63d2786", \
    from:gist, \
    as:command, \
    use:get_last_pane_path.sh

# Support bitbucket
zplug "b4b4r07/hello_bitbucket", \
    from:bitbucket, \
    as:command, \
    use:"*.sh"

# Rename a command with the string captured with `use` tag
zplug "b4b4r07/httpstat", \
    as:command, \
    use:'(*).sh', \
    rename-to:'$1'

# Group dependencies
# Load "emoji-cli" if "jq" is installed in this example
zplug "stedolan/jq", \
    from:gh-r, \
    as:command, \
    rename-to:jq
zplug "b4b4r07/emoji-cli", \
    on:"stedolan/jq"
# Note: To specify the order in which packages should be loaded, use the defer
#       tag described in the next section

# Set the priority when loading
# e.g., zsh-syntax-highlighting must be loaded
# after executing compinit command and sourcing other plugins
# (If the defer tag is given 2 or above, run after compinit command)
zplug "zsh-users/zsh-syntax-highlighting", defer:2

# Can manage local plugins
zplug "~/.zsh", from:local

# Load theme file
zplug 'dracula/zsh', as:theme

# Install plugins if there are plugins that have not been installed
if ! zplug check --verbose; then
    printf "Install? [y/N]: "
    if read -q; then
        echo; zplug install
    fi
fi

# Then, source plugins and add commands to $PATH
zplug load --verbose
```

## Changing a Theme

テーマを変更します。
まずは、利用できるテーマを表示します。

```
$ prompt -l
agnoster cloud damoekri giddie kylewest minimal nicoulaj paradox peepcode powerlevel10k powerline pure skwp smiley sorin steeef adam1 adam2 bart bigfade clint default elite2 elite fade fire off oliver pws redhat restore suse walters zefram
```

`prompt ${テーマ名}` で適当なテーマを選択します。

```
prompt powerlevel10k
```

## Trouble shouting

インストールに際して次のようなエラーが発生しました。

```
[zplug] These hook-build were failed to run:
 - jhawthorn/fzy
```

fzyをインストールすることで修正できました。

```shell
brew install fzy fzf
```

## 参考にしたサイト

- [[☆4840] 快適、zplugでzshプラグイン管理](https://zenn.dev/kenghaya/articles/29c0c6d5902e1a)
