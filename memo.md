# ATOMパッケージ開発

## きっかけ

ATOMは便利なパッケージが充実していてとにかく便利なんじゃが、使いはじめた頃から「これがあったらいいのになぁ〜」と頭をよぎる機能があったとさ。
きっといつか、誰かが・・・待ちわびて幾星霜。
今朝やっと届いた神様から掲示は「自分でやりんしゃい・・・」と。。。

## 機能

### 名称

Clip Lines

### 概要

ATOMで開いたファイル内で行を選択し本機能を実行すると、選択した行のソースが行番号付きでいい感じにクリップボードにコピーされます。

### コンフィグ

- lineEndingCode

  規定値: \n

  コピーされるテキストの改行コードです。

- lineNumberSepalater

  規定値: |

  行番号と行テキストの区切り文字です。

- enableMarkDownFormat

  規定値: true

  コピーされるテキストをマークダウン形式に加工します。

### サンプル

```
path/to/openfile: 14-19

14| if (!e) {
15|   var e = window.event;
16| }
17| if (e.keyCode == 13) {
18|   return false;
19| }
```

## gitリポジトリ



## 参考

[10分で学ぶ！Atomパッケージ自作入門](https://qiita.com/akisame338/items/034476debbd0ae251c0f)

[Atomでパッケージを作ってみた その3](https://qiita.com/tajihiro/items/f6e987ce49f5714e76cd)

[Atom Documentation: instance-getSelectedScreenRange](https://flight-manual.atom.io/api/v1.9.4/TextEditor/#instance-getSelectedScreenRange)

[Atomのパッケージを作る(4) spec編](http://uraway.hatenablog.com/entry/2015/12/15/Atom%E3%81%AE%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%82%92%E4%BD%9C%E3%82%8B%EF%BC%88%EF%BC%94%EF%BC%89spec%E7%B7%A8)

[Atomパッケージのテストを書いてみよう](https://qiita.com/Kesin11/items/a66a2b49571b05deb430)
