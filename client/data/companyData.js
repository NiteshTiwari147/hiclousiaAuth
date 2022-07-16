const companyData = [
    {
        name: 'Facebook',
        position: 'SDE-2',
        slryRnge: '180k-270k',
        skills: '16',
        url: "https://cdn.cdnlogo.com/logos/f/83/facebook.svg"
    },
    {
        name: 'PayPal',
        position: 'SDE-2',
        slryRnge: '150k-230k',
        skills: '12',
        url: "data:image/png;base64,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"
    },
    {
        name: 'Apple',
        position: 'SDE-2',
        slryRnge: '170k-210k',
        skills: '15',
        url: 'https://www.freepnglogos.com/uploads/apple-logo-png/file-apple-logo-black-svg-wikimedia-commons-1.png'
    },
    {
        name: 'Amazon',
        position: 'SDE-2',
        slryRnge: '200k-260k',
        skills: '11',
        url: "https://cdn.cdnlogo.com/logos/a/77/amazon-dark.svg"
    },
    {
        name: 'MasterCard',
        position: 'SDE-3',
        slryRnge: '190k-260k',
        skills: '15',
        url: "https://cdn.cdnlogo.com/logos/m/33/mastercard.svg"
    },
    {
        name: 'Walmart',
        position: 'SDE-2',
        slryRnge: '120k-150k',
        skills: '13',
        url: "https://cdn.cdnlogo.com/logos/w/32/walmart.svg"
    },
    {
        name: 'Oracle',
        position: 'SDE-3',
        slryRnge: '180k-250k',
        skills: '18',
        url: "https://cdn.cdnlogo.com/logos/o/54/oracle.svg"
    },
    {
        name: 'Google',
        position: 'SDE-1',
        slryRnge: '110k-150k',
        skills: '8',
        url: "https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
    },
    {
        name: 'Twitter',
        position: 'SDE-2',
        slryRnge: '160k-220k',
        skills: '16',
        url: "https://cdn.cdnlogo.com/logos/t/39/twitter.svg"
    },
    {
        name: 'Zomato',
        position: 'SDE-2',
        slryRnge: '140k-190k',
        skills: '12',
        url:"https://cdn.cdnlogo.com/logos/z/41/zomato.png"
    },
    {
        name: 'Samsung',
        position: 'SDE-3',
        slryRnge: '240k-290k',
        skills: '21',
        url:"https://cdn.cdnlogo.com/logos/s/27/samsung.svg"
    },
    {
        name: 'Rivian',
        position: 'SDE-2',
        slryRnge: '220k-290k',
        skills: '19',
        url:"https://cdn.cdnlogo.com/logos/r/41/rivian-wordmark.svg"
    }
]

module.exports = { companyData }