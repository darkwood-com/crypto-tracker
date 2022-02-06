## Crypto Tracker

This project aims to track you crypto portfolio amongs various exchanges. That way you can know what is your total portfolio composition. And this has an utility when filling tax formular. For instance in France, you have to pay taxes from your positive or negative gain value sas soon as you convert cryto to flat currency or your buy something from your crypto wallet.

## Resources

- Liste des adresses de plateformes : https://cryptoast.fr/formulaire-3916-bis-liste-adresses-plateformes-echanges/
- Reddit discution sur la déclaration d'impots : https://www.reddit.com/r/vosfinances/comments/kq919t/d%C3%A9claration_des_cryptomonnaies_aux_impots/
- Comment remplir le formulaire 3916-bis : https://bitcointalk.org/index.php?topic=5237853.0
- Fomulaire 3916-bis : https://www.impots.gouv.fr/portail/formulaire/3916-bis/declaration-par-un-resident-dun-compte-dactifs-numeriques-ouvert-detenu-utilise
- Quelles fiscalités pour les crypto monaies ? https://www.quechoisir.org/actualite-cryptomonnaies-quelle-fiscalite-pour-les-bitcoins-n91554/
- Impots faciles : https://lecollectif-crypto.fr/crypto-impots/
- App : https://github.com/EtherbitHQ/donut
- App : https://github.com/bitpay/wallet
- Formule de plus ou moins value = prix de cession – ((prix total d’acquisition*prix de cession)/valeur du portefeuille)
- Plateforme payante pour déclarer ses crypto monaies : https://koinly.io
- Déclaration d'actifs numériques : https://github.com/pgrimaud/declaration-actifs-numeriques

## Export accounts procedure

- gate : download export file at https://www.gate.io/myaccount/mypurselog
note : the document don't include withdraw fees and have to be included manually into a new Fee column
- swissborg : download export on iOS app : Account Statement
- uphold : download export file from https://wallet.uphold.com/dashboard/activity and generate report
- binance : https://www.binance.com/fr/my/wallet/history/deposit-crypto and "generate complete export"
- probit :
download deposit and withdrawal csv : https://www.probit.com/en-us/user-center/history/transfer
download trade history csv : https://www.probit.com/en-us/user-center/history/trade
- presearch : download export file from : https://keywords.presearch.org/account/tokens/savings
- coinmetro : download transaction history from dashboard : https://go.coinmetro.com/dashboard

## Import files

Put your import files into `data/import/exchange-name-*.ext`  
call http://localhost:8017/api/app/import  
Data will be processed and imported into `data/processed/exchange-name-*.ext`

## Api endpoints

Calculate wallet balances : http://localhost:8017/api/app/ballance