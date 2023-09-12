export default [
  {
    url: null,
    name: 'Dashboard',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: '/analytics',
        name: 'Analytics',
        slug: 'admin-analytics',
        i18n: 'Analytics'
      }
    ]
  },
  {
    header: 'Tài khoản',
    icon: 'PackageIcon',
    i18n: 'Account',
    items: [
      {
        url: '/account/list-all-account',
        name: 'Tất cả',
        icon: 'UsersIcon',
        slug: 'list-all-account',
        i18n: 'All'
      },
      {
        url: '/account/list-agency-account',
        name: 'Đại lý (VIP)',
        icon: 'UserXIcon',
        slug: 'list-agency-account',
        i18n: 'AgentVip'
      }
    ]
  },
  {
    header: 'Danh sách lịch sử',
    icon: 'PackageIcon',
    i18n: 'HistoryList',
    items: [
      {
        url: '/history/data-list/list-deposit-view',
        name: 'Nạp tiền',
        icon: 'DollarSignIcon',
        slug: 'list-history-deposit',
        i18n: 'Recharge'
      },
      {
        url: '/history/data-list/list-withdrawal-view',
        name: 'Rút tiền',
        icon: 'DollarSignIcon',
        slug: 'list-history-withdrawal',
        i18n: 'Withdraw'
      },
      {
        url: '/history/data-list/list-trade-view',
        name: 'Tổng giao dịch',
        icon: 'RepeatIcon',
        slug: 'list-history-trade',
        i18n: 'TotalTransactions'
      },
      {
        url: '/history/data-list/list-bet-view',
        name: 'Đặt cược',
        icon: 'TrendingUpIcon',
        slug: 'list-bet-trade',
        i18n: 'PlaceBet'
      },
      {
        url: '/history/data-list/list-exchange-view',
        name: 'Đổi tiền',
        icon: 'RepeatIcon',
        slug: 'list-history-exchange',
        i18n: 'MoneyChange'
      },
      {
        url: '/history/data-list/list-addmoney',
        name: 'Thêm tiền',
        icon: 'DollarSignIcon',
        slug: 'list-history-addmoney',
        i18n: 'MoreMoney'
      }
    ]
  },
  {
    header: 'Công cụ',
    icon: 'PackageIcon',
    i18n: 'Tools',
    items: [
      {
        url: '/tool/data-tool/edit-commission',
        name: 'Hoa hồng',
        icon: 'PercentIcon',
        slug: 'tool-edit-commission',
        i18n: 'Rose'
      },
      {
        url: '/tool/data-tool/add-money',
        name: 'Trừ tiền tài khoản',
        icon: 'DollarSignIcon',
        slug: 'tool-add-money',
        i18n: 'DeductFromAccount'
      },
      {
        url: '/tool/data-tool/edit-bet',
        name: 'Bẻ cầu Cược',
        icon: 'TrendingUpIcon',
        slug: 'tool-edit-bet',
        i18n: 'BreakBridgeBet'
      },
      {
        url: '/tool/data-tool/setting',
        name: 'Cài đặt',
        icon: 'SettingsIcon',
        slug: 'tool-setting',
        i18n: 'Setting'
      }
    ]
  }
];
