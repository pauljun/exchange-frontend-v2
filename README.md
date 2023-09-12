get 方式
api/users/login 对应 api/login
status 对应 api/status
api/users/info 对应 user/info 需要在 head 传 token
api/game/active-games 对应 api/active_games
api/setup/supports 对应 api/setup_supports
api/game2/prize 对应 api/game2_prize
api/setup/wallet 对应 api/setup_wallet
api/users/history-wallet 对应 user/history_wallet 需要在 head 传 token
api/users/history-wallet-trade 对应 user/history_wallet_trade 需要在 head 传 token
api/users/balance-wallet 对应 user/balance_wallet 需要在 head 传 token
api/users/bo-statistics 对应 user/bo_statistics 需要在 head 传 token
api/users/history-order 对应 user/history_order 需要在 head 传 token

post 方式
api/users/createAccount 对应 api/createAccount
api/users/getListNotifi 对应 user/getListNotifi 需要在 head 传 token

/users/live-to-usdt        改为 post  user/live_to_usdt
/users/usdt-to-live        改为 post  user/usdt_to_live
/users/history-order-date  改为 get   user/history_order_date
/users/bank-info           改为 get   user/bank_info
/users/history-wallet-co   改为 get   user/history_wallet_co
