# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
## memo
### なぜSVGだけでなく、JSONもBase64化するのか？
Base64は、バイナリデータをテキストとして扱いたい場面で広く使用されている。

データの一貫性と安全性：

JSONデータには特殊文字（例：引用符、バックスラッシュ）が含まれる可能性があります。
これらの特殊文字は、データの解釈やストレージに問題を引き起こす可能性があります。
Base64エンコーディングにより、これらの特殊文字を安全に扱えるようになります。


スマートコントラクトとの互換性：

イーサリアムのスマートコントラクトは、複雑なデータ構造の直接的な保存や操作が難しいです。
Base64エンコードされた文字列として保存することで、複雑なJSONデータをシンプルな形で扱えます。


トークンURIの標準化：

data:application/json;base64,というプレフィックスを使用することで、このデータがBase64エンコードされたJSONであることを明示できます。
これにより、NFTプラットフォームやウォレットなどがこのデータを適切に解釈し、表示できるようになります。


ガス最適化の可能性：

場合によっては、Base64エンコードされたデータの方が、生のJSONよりもコンパクトになることがあります。
これにより、ブロックチェーン上でのストレージやトランザクションのガスコストを削減できる可能性があります。


オンチェーンメタデータの完全性：

すべてのデータ（SVGとJSONメタデータの両方）をエンコードし、チェーン上に保存することで、NFTの完全なオンチェーン表現が可能になります。
これにより、外部依存のないNFTが作成でき、長期的な永続性が保証されます。

### provider,signer

I. provider

// App.js
const provider = new ethers.providers.Web3Provider(ethereum);

providerを介して、ユーザーはブロックチェーン上に存在するイーサリアムノードに接続することができます。 MetaMask が提供するイーサリアムノードを使用して、デプロイされたコントラクトからデータを送受信するために上記の実装を行いました。

ethersのライブラリによりproviderのインスタンスを新規作成しています。

II. signer

// App.js
const signer = provider.getSigner();

signerは、ユーザーのウォレットアドレスを抽象化したものです。

providerを作成し、provider.getSigner()を呼び出すだけで、ユーザーはウォレットアドレスを使用してトランザクションに署名し、そのデータをイーサリアムネットワークに送信することができます。

provider.getSigner()は新しいsignerインスタンスを返すので、それを使って署名付きトランザクションを送信することができます。

III. コントラクトインスタンス

// App.js
const connectedContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  myEpicNft.abi,
  signer
);

ここでは、コントラクトへの接続を行っています。

新しいコントラクトインスタンス（＝ connectedContract ）を作成するには、以下 3 つの変数をethers.Contract関数に渡す必要があります。

CONTRACT_ADDRESS: コントラクトのデプロイ先のアドレス（ローカル、テストネット、またはイーサリアムメインネット）

myEpicNft.abi: コントラクトの ABI

signerもしくはprovider

コントラクトインスタンスでは、コントラクトに格納されているすべての関数を呼び出すことができます。

もしこのコントラクトインスタンスにproviderを渡すと、そのインスタンスは読み取り専用の機能しか実行できなくなります。

一方、signerを渡すと、そのインスタンスは読み取りと書き込みの両方の機能を実行できるようになります。

// App.js
console.log("Going to pop wallet now to pay gas...");

ここでは、ethers.Contractでコントラクトとの接続を行った後、承認が開始されることを通知しています。

次に、下記のコードを見ていきましょう。

// App.js
let nftTxn = await connectedContract.makeAnEpicNFT();
console.log("Mining...please wait.");

ここでは、makeAnEpicNFT関数をコントラクトから呼び出し、awaitを使用して、NFTの発行が承認（＝マイニング）されるまで、処理をやめています。

console.logでは、NFTを発行するためのトランザクションが「承認中」であることを通知しています。

次に、下記のコードを見ていきましょう。

// App.js
await nftTxn.wait();
console.log(
  `Mined, see transaction: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
);

承認が終わったら、await nftTxn.wait()が実行され、トランザクションの結果を取得します。コードが冗長に感じるかもしれませんが、大事な処理です。

console.logでは、取得したトランザクションの結果を、Etherscan URLとして出力しています。

### ABI ファイルを取得する
ABI（Application Binary Interface）はコントラクトの取り扱い説明書のようなものです。

Webアプリケーションがコントラクトと通信するために必要な情報が、ABIファイルに含まれています。

コントラクト1つ1つにユニークなABIファイルが紐づいており、その中には下記の情報が含まれています。

そのコントラクトに使用されている関数の名前

それぞれの関数にアクセスするために必要なパラメータとその型

関数の実行結果に対して返るデータ型の種類

ABIファイルは、コントラクトがコンパイルされた時に生成され、packages/contract/artifactsディレクトリに自動的に格納されます。