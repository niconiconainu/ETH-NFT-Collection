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